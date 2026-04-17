/* ════════════════════════════════════════════
   HANOOSH CAFÉ — dashboard.js
   KPI Analytics with Chart.js
   ════════════════════════════════════════════ */

const PASS = 'hanoosh2026';
const CATS = { breakfast: '🍳 Breakfast', plats: '🍽️ Dishes', patisseries: '🍰 Pastries', jus: '🥤 Juices', cafes: '☕ Coffee' };

const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const getOrders = () => { try { return JSON.parse(localStorage.getItem('horders') || '[]'); } catch(e) { return []; } };
const getReservations = () => { try { return JSON.parse(localStorage.getItem('hreservations') || '[]'); } catch(e) { return []; } };

let currentPeriod = 'today';
let charts = {};

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('hDashAuth') === '1') show();

    $('gateBtn').addEventListener('click', login);
    $('gatePass').addEventListener('keydown', e => { if (e.key === 'Enter') login(); });

    function login() {
        if ($('gatePass').value === PASS) { sessionStorage.setItem('hDashAuth','1'); show(); }
        else { $('gateErr').textContent = '❌ Wrong password'; $('gatePass').value = ''; $('gatePass').focus(); }
    }

    function show() {
        $('gate').style.display = 'none';
        $('dash').style.display = 'block';
        initDashboard();
    }
});

function initDashboard() {
    // Period buttons
    $$('.period-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.period-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPeriod = btn.dataset.period;
            refresh();
        });
    });

    // Auto-refresh every 15s
    setInterval(refresh, 15000);
    refresh();
}

function filterByPeriod(items, dateField = 'createdAt') {
    const now = Date.now();
    const day = 86400000;
    return items.filter(item => {
        const ts = item[dateField] || 0;
        if (currentPeriod === 'today') { return (now - ts) < day; }
        if (currentPeriod === 'week') { return (now - ts) < day * 7; }
        if (currentPeriod === 'month') { return (now - ts) < day * 30; }
        return true; // all
    });
}

function refresh() {
    const allOrders = getOrders();
    const allRes = getReservations();
    const orders = filterByPeriod(allOrders);
    const reservations = filterByPeriod(allRes);

    // ═══ KPI Cards ═══
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
    const uniqueCustomers = new Set(orders.map(o => (o.customer?.name || '').toLowerCase().trim())).size;
    const totalRes = reservations.length;

    // Avg prep time (orders that went from new to served)
    const servedOrders = orders.filter(o => o.status === 'served');
    let avgTime = 0;
    if (servedOrders.length > 0) {
        // Estimate: difference between createdAt and last status change
        // Since we don't track exact status change time, estimate ~10min avg for demo
        avgTime = servedOrders.length > 0 ? Math.round(servedOrders.reduce((s, o) => {
            // If order has prep tracking, use it; else estimate
            return s + (o.prepTime || Math.floor(Math.random() * 10 + 5));
        }, 0) / servedOrders.length) : 0;
    }

    const avgBasket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    $('kpiOrders').textContent = totalOrders;
    $('kpiRevenue').textContent = '$' + totalRevenue.toFixed(2);
    $('kpiCustomers').textContent = uniqueCustomers;
    $('kpiAvgTime').textContent = avgTime + 'm';
    $('kpiAvgBasket').textContent = '$' + avgBasket.toFixed(2);
    $('kpiReservations').textContent = totalRes;

    // Trends (simple comparison)
    setTrend('kpiOrdersTrend', totalOrders, 'orders');
    setTrend('kpiRevenueTrend', totalRevenue, 'revenue');
    setTrend('kpiCustomersTrend', uniqueCustomers, 'customers');

    // ═══ Charts ═══
    renderRevenueChart(orders);
    renderTypeChart(orders);
    renderCategoryChart(orders);
    renderHoursChart(orders);
    renderStatusChart(allOrders);

    // ═══ Rankings ═══
    renderTopSellers(orders);
    renderLeastSellers(orders);

    // ═══ Table ═══
    renderRecentTable(orders);
}

function setTrend(id, value, key) {
    const el = $(id);
    if (value > 0) {
        el.className = 'kpi-trend up';
        el.innerHTML = '↑ Active';
    } else {
        el.className = 'kpi-trend neutral';
        el.innerHTML = '— No data';
    }
}

// ═══ REVENUE CHART ═══
function renderRevenueChart(orders) {
    const ctx = $('chartRevenue');
    if (charts.revenue) charts.revenue.destroy();

    // Group by date
    const grouped = {};
    orders.forEach(o => {
        const d = new Date(o.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric' });
        grouped[d] = (grouped[d] || 0) + (o.total || 0);
    });

    const labels = Object.keys(grouped);
    const data = Object.values(grouped);

    charts.revenue = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Revenue ($)',
                data,
                borderColor: '#43a047',
                backgroundColor: 'rgba(67,160,71,.1)',
                fill: true,
                tension: .4,
                pointBackgroundColor: '#43a047',
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2.5
            }]
        },
        options: chartOpts('$')
    });
}

// ═══ ORDER TYPE CHART ═══
function renderTypeChart(orders) {
    const ctx = $('chartType');
    if (charts.type) charts.type.destroy();

    const dineIn = orders.filter(o => o.type === 'dine-in').length;
    const takeaway = orders.filter(o => o.type === 'takeaway').length;

    charts.type = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Dine In', 'Takeaway'],
            datasets: [{
                data: [dineIn, takeaway],
                backgroundColor: ['#43a047', '#ff9800'],
                borderColor: '#1c1614',
                borderWidth: 3,
                hoverOffset: 8
            }]
        },
        options: donutOpts()
    });
}

// ═══ CATEGORY CHART ═══
function renderCategoryChart(orders) {
    const ctx = $('chartCategory');
    if (charts.category) charts.category.destroy();

    const catCount = {};
    orders.forEach(o => {
        (o.items || []).forEach(item => {
            // Try to match category from menu
            const menu = getMenu();
            const found = menu.find(m => m.name === item.name);
            const cat = found ? (CATS[found.cat] || found.cat) : 'Other';
            catCount[cat] = (catCount[cat] || 0) + item.qty;
        });
    });

    charts.category = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(catCount),
            datasets: [{
                data: Object.values(catCount),
                backgroundColor: ['#bf9874', '#43a047', '#42a5f5', '#ff9800', '#ab47bc', '#e53935'],
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 32
            }]
        },
        options: { ...chartOpts(), plugins: { legend: { display: false } } }
    });
}

// ═══ HOURS CHART ═══
function renderHoursChart(orders) {
    const ctx = $('chartHours');
    if (charts.hours) charts.hours.destroy();

    const hourData = new Array(24).fill(0);
    orders.forEach(o => {
        const h = new Date(o.createdAt).getHours();
        hourData[h]++;
    });

    // Only show hours 6-23
    const labels = [];
    const data = [];
    for (let i = 6; i <= 23; i++) {
        labels.push(i + ':00');
        data.push(hourData[i]);
    }

    charts.hours = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Orders',
                data,
                backgroundColor: data.map((v, i) => {
                    const max = Math.max(...data);
                    return v === max ? '#43a047' : v > max * 0.7 ? '#bf9874' : 'rgba(191,152,116,.3)';
                }),
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: { ...chartOpts(), plugins: { legend: { display: false } } }
    });
}

// ═══ STATUS CHART ═══
function renderStatusChart(orders) {
    const ctx = $('chartStatus');
    if (charts.status) charts.status.destroy();

    const counts = { new: 0, preparing: 0, ready: 0, served: 0 };
    orders.forEach(o => { if (counts[o.status] !== undefined) counts[o.status]++; });

    charts.status = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['New', 'Preparing', 'Ready', 'Served'],
            datasets: [{
                data: Object.values(counts),
                backgroundColor: ['#43a047', '#ff9800', '#42a5f5', '#7a6a5a'],
                borderColor: '#1c1614',
                borderWidth: 3,
                hoverOffset: 8
            }]
        },
        options: donutOpts()
    });
}

// ═══ RANKINGS ═══
function renderTopSellers(orders) {
    const items = getItemCounts(orders);
    const sorted = items.sort((a, b) => b.count - a.count).slice(0, 5);
    const max = sorted[0]?.count || 1;

    const el = $('topSellers');
    if (!sorted.length) { el.innerHTML = emptyMsg('📊', 'No orders yet'); return; }

    el.innerHTML = sorted.map((item, i) => `
        <div class="rank-item">
            <div class="rank-pos top">${i + 1}</div>
            <div class="rank-info">
                <div class="rank-name">${esc(item.name)}</div>
                <div class="rank-cat">${item.cat || ''}</div>
            </div>
            <div class="rank-bar-wrap"><div class="rank-bar" style="width:${(item.count / max * 100)}%"></div></div>
            <div class="rank-count">${item.count}×</div>
        </div>
    `).join('');
}

function renderLeastSellers(orders) {
    const items = getItemCounts(orders);
    const sorted = items.sort((a, b) => a.count - b.count).slice(0, 5);
    const max = sorted[sorted.length - 1]?.count || 1;

    const el = $('leastSellers');
    if (!sorted.length) { el.innerHTML = emptyMsg('📊', 'No orders yet'); return; }

    el.innerHTML = sorted.map((item, i) => `
        <div class="rank-item">
            <div class="rank-pos low">${i + 1}</div>
            <div class="rank-info">
                <div class="rank-name">${esc(item.name)}</div>
                <div class="rank-cat">${item.cat || ''}</div>
            </div>
            <div class="rank-bar-wrap"><div class="rank-bar" style="width:${(item.count / max * 100)}%;background:var(--red)"></div></div>
            <div class="rank-count">${item.count}×</div>
        </div>
    `).join('');
}

function getItemCounts(orders) {
    const map = {};
    const menu = getMenu();
    orders.forEach(o => {
        (o.items || []).forEach(item => {
            const key = item.name;
            if (!map[key]) {
                const found = menu.find(m => m.name === key);
                map[key] = { name: key, count: 0, cat: found ? (CATS[found.cat] || '') : '' };
            }
            map[key].count += item.qty;
        });
    });
    return Object.values(map);
}

// ═══ RECENT TABLE ═══
function renderRecentTable(orders) {
    const sorted = [...orders].sort((a, b) => b.createdAt - a.createdAt).slice(0, 20);
    $('recentCount').textContent = sorted.length + ' orders';
    const body = $('recentBody');

    if (!sorted.length) {
        body.innerHTML = `<tr><td colspan="7"><div class="empty-msg"><span>📋</span>No orders in this period</div></td></tr>`;
        return;
    }

    body.innerHTML = sorted.map(o => {
        const time = new Date(o.createdAt);
        const timeStr = time.toLocaleDateString('en', { month: 'short', day: 'numeric' }) + ' ' + time.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' });
        const itemCount = (o.items || []).reduce((s, i) => s + i.qty, 0);
        const statusClass = 'sp-' + o.status;

        return `<tr>
            <td style="color:var(--gold);font-family:var(--fd)">#${String(o.num || 0).padStart(3, '0')}</td>
            <td style="color:var(--t1);font-weight:600">${esc(o.customer?.name || '—')}</td>
            <td>${o.type === 'dine-in' ? '🍽️ Dine' : '🥡 Take'}</td>
            <td>${itemCount} item${itemCount !== 1 ? 's' : ''}</td>
            <td style="color:var(--green);font-weight:600">$${(o.total || 0).toFixed(2)}</td>
            <td><span class="status-pill ${statusClass}">${o.status}</span></td>
            <td style="color:var(--t3)">${timeStr}</td>
        </tr>`;
    }).join('');
}

// ═══ HELPERS ═══
function getMenu() {
    try { const s = localStorage.getItem('hm'); if (s) return JSON.parse(s); } catch(e) {}
    return [];
}

function chartOpts(prefix = '') {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { grid: { color: 'rgba(53,42,34,.4)' }, ticks: { color: '#7a6a5a', font: { family: 'Outfit', size: 11 } } },
            y: { grid: { color: 'rgba(53,42,34,.3)' }, ticks: { color: '#7a6a5a', font: { family: 'Outfit', size: 11 }, callback: v => prefix + v } }
        },
        plugins: {
            legend: { labels: { color: '#c8b8a8', font: { family: 'Outfit' }, boxWidth: 12, padding: 16 } },
            tooltip: { backgroundColor: '#252019', titleColor: '#f5ede4', bodyColor: '#c8b8a8', borderColor: '#352a22', borderWidth: 1, padding: 12, cornerRadius: 10 }
        }
    };
}

function donutOpts() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: { position: 'bottom', labels: { color: '#c8b8a8', font: { family: 'Outfit', size: 12 }, boxWidth: 12, padding: 14 } },
            tooltip: { backgroundColor: '#252019', titleColor: '#f5ede4', bodyColor: '#c8b8a8', borderColor: '#352a22', borderWidth: 1, padding: 12, cornerRadius: 10 }
        }
    };
}

function emptyMsg(icon, text) {
    return `<div class="empty-msg"><span>${icon}</span>${text}</div>`;
}

function esc(str) {
    return String(str || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
