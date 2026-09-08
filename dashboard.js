// Navigation state mapping to Title
const pageTitles = {
    'dashboard': 'Good Morning, Rania 👋',
    'appointments': 'My Appointments',
    'find-doctor': 'Find a Doctor',
    'records': 'My Medical Records',
    'prescriptions': 'My Prescriptions',
    'lab-results': 'Latest Lab Results',
    'bills': 'Bills & Payments',
    'documents': 'My Documents',
    'notifications': 'Notifications',
    'settings': 'Settings',
    'profile': 'My Profile'
};

document.addEventListener('DOMContentLoaded', () => {
    // Setup Navigation bindings
    const navItems = document.querySelectorAll('.nav-item[data-view]');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const viewName = item.getAttribute('data-view');
            switchView(viewName);
        });
    });

    // Logout handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.clear();
            localStorage.removeItem('rani_active_user');
            window.location.href = 'login.html';
        });
    }
});

function switchView(viewName) {
    if (!viewName) return;

    // Update Top Title
    const titleEl = document.getElementById('page-title');
    if (pageTitles[viewName]) {
        titleEl.textContent = pageTitles[viewName];
    } else {
        // Fallback for custom views
        titleEl.textContent = viewName.charAt(0).toUpperCase() + viewName.slice(1);
    }

    // Update Sidebar Active state
    document.querySelectorAll('.sidebar .nav-item').forEach(el => {
        el.classList.remove('active');
        if (el.getAttribute('data-view') === viewName) {
            el.classList.add('active');
        }
    });

    // Update Views
    document.querySelectorAll('.page-content .view').forEach(el => {
        el.classList.remove('active');
    });

    const targetView = document.getElementById('view-' + viewName);
    if (targetView) {
        targetView.classList.add('active');
    }
}
