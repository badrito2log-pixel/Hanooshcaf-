/* ════════════════════════════════════════════
   HANOOSH CAFÉ — settings.js
   Admin dashboard logic
   ════════════════════════════════════════════ */

const PASS = 'hanoosh2026';

const CATS = {
    breakfast: '🍳 Breakfast',
    plats: '🍽️ Dishes',
    patisseries: '🍰 Pastries',
    jus: '🥤 Juices',
    cafes: '☕ Coffee'
};

const DEF_MENU = [
    { id: 'b1', cat: 'breakfast', name: 'Hanoosh Full Breakfast', desc: 'Eggs, toast, salad, beans & coffee.', price: '$8', img: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80', badge: 'Morning Fav' },
    { id: 'b2', cat: 'breakfast', name: 'Fluffy Pancakes', desc: 'Golden pancakes with honey & fruits.', price: '$6', img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80', badge: '' },
    { id: 'b3', cat: 'breakfast', name: "Chef's Omelette", desc: 'Three-egg omelette with herbs.', price: '$7', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80', badge: '' },
    { id: 'd1', cat: 'plats', name: 'Hanoosh Special Platter', desc: 'Grilled meat, fries, bread & sauce.', price: '$12', img: 'images/hanoosh-plat.jpg', badge: 'Signature' },
    { id: 'd2', cat: 'plats', name: 'Bariis Iskukaris', desc: 'Somali spiced rice with meat.', price: '$10', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', badge: '' },
    { id: 'd3', cat: 'plats', name: 'Grilled Chicken Salad', desc: 'Chicken, greens, chips & dressing.', price: '$9', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', badge: '' },
    { id: 'p1', cat: 'patisseries', name: 'Hanoosh Dessert Selection', desc: 'Colorful house-made desserts.', price: '$6', img: 'images/hanoosh-desserts.jpg', badge: 'Best Seller' },
    { id: 'p2', cat: 'patisseries', name: 'Chocolate Fondant', desc: 'Dark chocolate cake, molten center.', price: '$5.50', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80', badge: '' },
    { id: 'p3', cat: 'patisseries', name: 'Berry Cheesecake', desc: 'Creamy cheesecake, berry compote.', price: '$5', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80', badge: '' },
    { id: 'j1', cat: 'jus', name: 'Fresh Orange Juice', desc: 'Freshly squeezed, no sugar.', price: '$3.50', img: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&q=80', badge: 'Fresh' },
    { id: 'j2', cat: 'jus', name: 'Mango Smoothie', desc: 'Mango, passion fruit, banana.', price: '$4.50', img: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=600&q=80', badge: '' },
    { id: 'j3', cat: 'jus', name: 'Mint Lemonade', desc: 'Lemon, mint, honey.', price: '$3', img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80', badge: '' },
    { id: 'c1', cat: 'cafes', name: 'Hanoosh Cappuccino', desc: 'Espresso, steamed milk, cocoa.', price: '$3.50', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80', badge: 'Signature' },
    { id: 'c2', cat: 'cafes', name: 'Vanilla Latte', desc: 'Espresso, milk, natural vanilla.', price: '$4', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', badge: '' },
    { id: 'c3', cat: 'cafes', name: 'Shaah (Somali Tea)', desc: 'Spiced tea, cardamom, cinnamon.', price: '$2.50', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80', badge: '' },
];

const DEF_GALLERY = [
    { id: 'g1', img: 'images/hanoosh-interior-2.webp', label: 'Our Space', tall: true },
    { id: 'g2', img: 'images/hanoosh-plat.jpg', label: 'Signature Dish', tall: false },
    { id: 'g3', img: 'images/hanoosh-desserts.jpg', label: 'Desserts', tall: false },
    { id: 'g4', img: 'images/hanoosh-interior-1.webp', label: 'The Lounge', tall: true },
    { id: 'g5', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', label: 'Coffee Art', tall: false },
    { id: 'g6', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', label: 'Evening Vibes', tall: false },
];

// Storage helpers
const getMenu = () => { try { const s = localStorage.getItem('hm'); if (s) return JSON.parse(s); } catch (e) { } localStorage.setItem('hm', JSON.stringify(DEF_MENU)); return [...DEF_MENU]; };
const saveMenu = m => localStorage.setItem('hm', JSON.stringify(m));
const getGallery = () => { try { const s = localStorage.getItem('hg'); if (s) return JSON.parse(s); } catch (e) { } localStorage.setItem('hg', JSON.stringify(DEF_GALLERY)); return [...DEF_GALLERY]; };
const saveGallery = g => localStorage.setItem('hg', JSON.stringify(g));
const getHours = () => localStorage.getItem('hh') || 'Open daily 7 AM – 11 PM';
const saveHours = h => localStorage.setItem('hh', h);
const gid = () => 'i' + Date.now() + Math.random().toString(36).slice(2, 6);

const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

// Toast
let toastTimer;
const toast = (msg, type = 'success') => {
    const t = $('toast');
    t.textContent = msg;
    t.className = 'toast show' + (type === 'error' ? ' error' : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
};

// Confirm modal
let confirmCallback = null;
const askConfirm = (title, msg, cb) => {
    $('confirmTitle').textContent = title;
    $('confirmMsg').textContent = msg;
    $('confirmOverlay').classList.add('active');
    confirmCallback = cb;
};
const closeConfirm = () => { $('confirmOverlay').classList.remove('active'); confirmCallback = null; };

document.addEventListener('DOMContentLoaded', () => {

    // Check session
    if (sessionStorage.getItem('hAuth') === '1') {
        showDashboard();
    }

    // ═══ LOGIN ═══
    $('btnLogin').addEventListener('click', doLogin);
    $('adminPass').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

    function doLogin() {
        const val = $('adminPass').value;
        if (val === PASS) {
            sessionStorage.setItem('hAuth', '1');
            showDashboard();
        } else {
            $('loginError').textContent = '❌ Incorrect password. Try again.';
            $('adminPass').value = '';
            $('adminPass').focus();
        }
    }

    function showDashboard() {
        $('loginGate').style.display = 'none';
        $('dashboard').style.display = 'flex';
        initDashboard();
    }

    // Logout
    $('btnLogout').addEventListener('click', () => {
        sessionStorage.removeItem('hAuth');
        location.reload();
    });

    // Confirm modal bindings
    $('confirmCancel').addEventListener('click', closeConfirm);
    $('confirmOverlay').addEventListener('click', e => { if (e.target === $('confirmOverlay')) closeConfirm(); });
    $('confirmOk').addEventListener('click', () => {
        if (confirmCallback) confirmCallback();
        closeConfirm();
    });

    // Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeConfirm();
    });

});

// ════════════════════════════════════════════
// DASHBOARD INITIALIZATION
// ════════════════════════════════════════════
function initDashboard() {

    // ─── Sidebar navigation ───
    const viewTitles = {
        overview: { title: 'Overview', sub: "Welcome back, here's your restaurant at a glance." },
        menu: { title: 'Menu Items', sub: 'Add, edit or remove items from your menu.' },
        gallery: { title: 'Gallery', sub: 'Manage the photos shown in your site gallery.' },
        hours: { title: 'Opening Hours', sub: 'Set when your café is open to customers.' }
    };

    const switchView = view => {
        $$('.side-item').forEach(b => b.classList.toggle('active', b.dataset.view === view));
        $$('.view').forEach(v => v.classList.remove('active'));
        const target = $('view' + view.charAt(0).toUpperCase() + view.slice(1));
        if (target) target.classList.add('active');
        const info = viewTitles[view];
        if (info) {
            $('viewTitle').textContent = info.title;
            $('viewSub').textContent = info.sub;
        }
        // Close mobile sidebar
        $('sidebar')?.classList.remove('open');
        document.querySelector('.sidebar')?.classList.remove('open');
        // Refresh data on demand
        if (view === 'overview') refreshOverview();
        if (view === 'menu') renderItems();
        if (view === 'gallery') renderGalleryAdmin();
        if (view === 'hours') $('hoursText').value = getHours();
    };

    $$('.side-item').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    // Quick-action cards navigate too
    $$('.quick-card').forEach(btn => {
        btn.addEventListener('click', () => {
            switchView(btn.dataset.go);
            if (btn.dataset.go === 'menu') {
                // Switch to Add subview
                $$('.v-tab').forEach(t => t.classList.toggle('active', t.dataset.subview === 'add'));
                $$('.subview').forEach(s => s.classList.toggle('active', s.id === 'subAdd'));
                clearItemForm();
            }
        });
    });

    // Mobile sidebar toggle
    const sidebar = document.querySelector('.sidebar');
    $('mobileMenuBtn').addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // ═══════════════════════════
    // OVERVIEW
    // ═══════════════════════════
    function refreshOverview() {
        const menu = getMenu();
        const gallery = getGallery();
        const hours = getHours();
        const hMatch = hours.match(/(\d+\s*[AP]M\s*[–-]\s*\d+\s*[AP]M)/i);

        $('overMenu').textContent = menu.length;
        $('overGallery').textContent = gallery.length;
        $('overHours').textContent = hMatch ? hMatch[1] : (hours.length > 22 ? hours.slice(0, 22) + '…' : hours);
        $('countMenu').textContent = menu.length;
        $('countGallery').textContent = gallery.length;
    }
    refreshOverview();

    // ═══════════════════════════
    // MENU — SUBVIEW TABS
    // ═══════════════════════════
    $$('.v-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const sv = tab.dataset.subview;
            $$('.v-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            $$('.subview').forEach(s => s.classList.remove('active'));
            $('sub' + sv.charAt(0).toUpperCase() + sv.slice(1)).classList.add('active');
            if (sv === 'add') clearItemForm();
            if (sv === 'list') renderItems();
        });
    });

    // ═══════════════════════════
    // MENU — FILTER/SEARCH
    // ═══════════════════════════
    const filterCat = $('filterCat');
    filterCat.innerHTML = '<option value="all">All categories</option>' +
        Object.entries(CATS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');

    filterCat.addEventListener('change', renderItems);
    $('searchItem').addEventListener('input', renderItems);

    function renderItems() {
        const menu = getMenu();
        const fv = filterCat.value;
        const q = $('searchItem').value.toLowerCase().trim();
        let filtered = fv === 'all' ? menu : menu.filter(x => x.cat === fv);
        if (q) filtered = filtered.filter(x => (x.name + ' ' + x.desc).toLowerCase().includes(q));

        const list = $('itemsList');
        if (!filtered.length) {
            list.innerHTML = `
                <div class="empty-state">
                    <span class="empty-emoji">🍽️</span>
                    <p>No items found.</p>
                </div>`;
            return;
        }
        list.innerHTML = filtered.map(i => `
            <div class="item-row">
                <div class="item-thumb"><img src="${i.img || ''}" onerror="this.style.display='none'"></div>
                <div class="item-info">
                    <h4>${escape(i.name)}</h4>
                    <div class="item-info-row">
                        <span class="item-cat-pill">${CATS[i.cat] || i.cat}</span>
                        ${i.badge ? `<span class="item-badge-pill">${escape(i.badge)}</span>` : ''}
                    </div>
                </div>
                <div class="item-price">${escape(i.price)}</div>
                <div class="item-acts">
                    <button class="btn-act-edit" onclick="editItem('${i.id}')" title="Edit">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="btn-act-del" onclick="deleteItem('${i.id}')" title="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </div>
            </div>
        `).join('');
    }
    renderItems();

    // ═══════════════════════════
    // MENU — ADD/EDIT FORM
    // ═══════════════════════════
    let uploadData = '';
    const itemFile = $('itemFile');
    const uploadPreview = $('uploadPreview');

    $('btnUploadImg').addEventListener('click', () => itemFile.click());
    itemFile.addEventListener('change', async e => {
        const f = e.target.files[0];
        if (!f) return;
        if (f.size > 5e6) { toast('Image too large (max 5MB)', 'error'); return; }
        const reader = new FileReader();
        reader.onload = () => {
            uploadData = reader.result;
            uploadPreview.innerHTML = `<img src="${uploadData}">`;
            $('itemImg').value = '';
        };
        reader.readAsDataURL(f);
    });

    // URL input live preview
    $('itemImg').addEventListener('input', e => {
        const url = e.target.value.trim();
        if (url && /^https?:\/\//.test(url)) {
            uploadData = '';
            uploadPreview.innerHTML = `<img src="${url}" onerror="this.parentElement.innerHTML=''">`;
        }
    });

    $('btnSaveItem').addEventListener('click', () => {
        const name = $('itemName').value.trim();
        const desc = $('itemDesc').value.trim();
        const price = $('itemPrice').value.trim();
        const cat = $('itemCat').value;
        const url = $('itemImg').value.trim();
        const badge = $('itemBadge').value.trim();
        const editId = $('itemEditId').value;

        if (!name) { toast('Please enter a name', 'error'); return; }
        if (!price) { toast('Please enter a price', 'error'); return; }

        const img = uploadData || url;
        let menu = getMenu();

        if (editId) {
            menu = menu.map(x => x.id === editId ? { ...x, name, desc, price, cat, img: img || x.img, badge } : x);
            toast('Item updated');
        } else {
            menu.push({ id: gid(), cat, name, desc, price, img, badge });
            toast('Item added');
        }

        saveMenu(menu);
        clearItemForm();
        refreshOverview();

        // Return to list
        $$('.v-tab').forEach(t => t.classList.toggle('active', t.dataset.subview === 'list'));
        $$('.subview').forEach(s => s.classList.toggle('active', s.id === 'subList'));
        renderItems();
    });

    $('btnCancelEdit').addEventListener('click', () => {
        clearItemForm();
        $$('.v-tab').forEach(t => t.classList.toggle('active', t.dataset.subview === 'list'));
        $$('.subview').forEach(s => s.classList.toggle('active', s.id === 'subList'));
    });

    function clearItemForm() {
        ['itemName', 'itemDesc', 'itemPrice', 'itemImg', 'itemBadge'].forEach(x => $(x).value = '');
        $('itemEditId').value = '';
        $('itemCat').value = 'breakfast';
        $('btnSaveLabel').textContent = 'Save Item';
        $('formTitle').textContent = 'Add a new item';
        uploadData = '';
        uploadPreview.innerHTML = '';
        itemFile.value = '';
    }

    // Global edit/delete
    window.editItem = id => {
        const item = getMenu().find(x => x.id === id);
        if (!item) return;
        $('itemCat').value = item.cat;
        $('itemName').value = item.name;
        $('itemDesc').value = item.desc;
        $('itemPrice').value = item.price;
        $('itemImg').value = '';
        $('itemBadge').value = item.badge || '';
        $('itemEditId').value = item.id;
        $('btnSaveLabel').textContent = 'Update Item';
        $('formTitle').textContent = 'Edit "' + item.name + '"';
        uploadData = '';
        uploadPreview.innerHTML = item.img ? `<img src="${item.img}">` : '';

        // Switch to add subview
        $$('.v-tab').forEach(t => t.classList.toggle('active', t.dataset.subview === 'add'));
        $$('.subview').forEach(s => s.classList.toggle('active', s.id === 'subAdd'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.deleteItem = id => {
        const item = getMenu().find(x => x.id === id);
        if (!item) return;
        askConfirm('Delete item?', `"${item.name}" will be permanently removed from the menu.`, () => {
            saveMenu(getMenu().filter(x => x.id !== id));
            renderItems();
            refreshOverview();
            toast('Item deleted');
        });
    };

    // ═══════════════════════════
    // GALLERY
    // ═══════════════════════════
    let galUploadData = '';
    const galFile = $('galFile');
    const galPreview = $('galPreview');

    $('btnGalUpload').addEventListener('click', () => galFile.click());
    galFile.addEventListener('change', async e => {
        const f = e.target.files[0];
        if (!f) return;
        if (f.size > 5e6) { toast('Image too large (max 5MB)', 'error'); return; }
        const reader = new FileReader();
        reader.onload = () => {
            galUploadData = reader.result;
            galPreview.innerHTML = `<img src="${galUploadData}">`;
            $('galImgUrl').value = '';
        };
        reader.readAsDataURL(f);
    });

    $('galImgUrl').addEventListener('input', e => {
        const url = e.target.value.trim();
        if (url && /^https?:\/\//.test(url)) {
            galUploadData = '';
            galPreview.innerHTML = `<img src="${url}" onerror="this.parentElement.innerHTML=''">`;
        }
    });

    $('btnAddGalImg').addEventListener('click', () => {
        const url = $('galImgUrl').value.trim();
        const label = $('galImgLabel').value.trim() || 'Photo';
        const tall = $('galImgTall').checked;
        const img = galUploadData || url;

        if (!img) { toast('Please add an image', 'error'); return; }

        const gallery = getGallery();
        gallery.push({ id: gid(), img, label, tall });
        saveGallery(gallery);
        renderGalleryAdmin();
        refreshOverview();

        $('galImgUrl').value = '';
        $('galImgLabel').value = '';
        $('galImgTall').checked = false;
        galUploadData = '';
        galPreview.innerHTML = '';
        galFile.value = '';

        toast('Photo added to gallery');
    });

    function renderGalleryAdmin() {
        const gallery = getGallery();
        $('galleryCountInline').textContent = gallery.length;
        const grid = $('galleryGridAdmin');
        if (!gallery.length) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column:1/-1">
                    <span class="empty-emoji">📷</span>
                    <p>No photos yet. Add your first one above.</p>
                </div>`;
            return;
        }
        grid.innerHTML = gallery.map(g => `
            <div class="gal-item">
                <img src="${g.img}" alt="${escape(g.label)}" onerror="this.src='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=60'">
                ${g.tall ? '<span class="gal-tall-badge">TALL</span>' : ''}
                <button class="gal-del" onclick="deleteGalImg('${g.id}')" title="Remove">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div class="gal-label">${escape(g.label)}</div>
            </div>
        `).join('');
    }

    window.deleteGalImg = id => {
        const item = getGallery().find(x => x.id === id);
        if (!item) return;
        askConfirm('Remove photo?', `"${item.label}" will be removed from the gallery.`, () => {
            saveGallery(getGallery().filter(x => x.id !== id));
            renderGalleryAdmin();
            refreshOverview();
            toast('Photo removed');
        });
    };
    renderGalleryAdmin();

    // ═══════════════════════════
    // HOURS
    // ═══════════════════════════
    $('hoursText').value = getHours();

    $$('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $('hoursText').value = btn.dataset.preset;
            $('hoursText').focus();
        });
    });

    $('btnSaveHours').addEventListener('click', () => {
        const h = $('hoursText').value.trim();
        if (!h) { toast('Please enter opening hours', 'error'); return; }
        saveHours(h);
        refreshOverview();
        toast('Opening hours updated');
    });
}

// Helpers
function escape(str) {
    return String(str || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
