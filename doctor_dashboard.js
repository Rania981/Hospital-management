const doctorViews = {
    'dashboard': 'Doctor Dashboard',
    'schedule': 'My Schedule',
    'patients': 'My Patients',
    'patient-profile': 'Digital Patient Profile',
    'consultation': 'Digital Consultation Workspace',
    'e-prescription': 'Create E-Prescription',
    'lab-request': 'Request Laboratory Test',
    'records': 'Medical Records',
    'notifications': 'Notifications',
    'profile': 'Doctor Profile'
};

document.addEventListener('DOMContentLoaded', () => {
    // Navigation binding
    const navItems = document.querySelectorAll('[data-view]');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const viewName = item.getAttribute('data-view');
            switchDoctorView(viewName);
        });
    });

    // Mock Notifications interactions
    const notifyBtn = document.getElementById('notify-btn');
    if (notifyBtn) {
        notifyBtn.addEventListener('click', () => {
            switchDoctorView('notifications');
        });
    }

    // Interactive buttons feedback
    const actionBtns = document.querySelectorAll('.btn-primary');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Check if it's the save prescription or lab request
            if (this.innerText.includes('Issue') || this.innerText.includes('Send Digital')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="ph ph-check"></i> Success';
                this.style.background = 'var(--color-success)';

                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                    switchDoctorView('dashboard');
                }, 1500);
            }
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

function switchDoctorView(viewName) {
    if (!viewName) return;

    // Title
    const titleEl = document.getElementById('page-title');
    if (doctorViews[viewName]) {
        titleEl.textContent = doctorViews[viewName];
    }

    // Sidebar active state (only sidebar nav items)
    document.querySelectorAll('.sidebar .nav-item').forEach(el => {
        el.classList.remove('active');
        if (el.getAttribute('data-view') === viewName) {
            el.classList.add('active');
        }
    });

    // Hide all views, show targeted
    document.querySelectorAll('.page-content .view').forEach(el => {
        el.classList.remove('active');
    });

    const targetView = document.getElementById('view-' + viewName);
    if (targetView) {
        targetView.classList.add('active');
    }
}
