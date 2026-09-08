document.addEventListener('DOMContentLoaded', function () {
    // Current date
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // Sidebar Toggling
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const views = document.querySelectorAll('.page-content .view');
    const pageTitle = document.getElementById('page-title');

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active to clicked nav item
            this.classList.add('active');

            // Hide all views
            views.forEach(view => view.classList.remove('active'));

            // Show target view
            const targetId = this.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active');
            } else {
                // If it doesn't exist yet, we will fetch/generate it. For now, just change the title
            }

            // Update Page Title
            if (pageTitle) {
                pageTitle.textContent = this.textContent.trim();
            }
        });
    });

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            window.location.href = 'login.html';
        });
    }
});

// Global showView method for buttons
window.showView = function (viewId) {
    const navItem = document.querySelector(`.sidebar-nav .nav-item[data-target="${viewId}"]`);
    if (navItem) {
        navItem.click();
    }
};

// Modals and Toasts Interactions
document.addEventListener('DOMContentLoaded', function () {

    // Toast setup
    const toastElList = [].slice.call(document.querySelectorAll('.toast'))
    const toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl, { delay: 3000 });
    });

    const showToast = (message) => {
        const toastBody = document.querySelector('#liveToast .toast-body');
        if (toastBody) toastBody.textContent = message;
        toastList[0].show();
    };

    // View Prescription Modal logic
    const viewButtons = document.querySelectorAll('.btn-view-prescription');
    const prescriptionModal = new bootstrap.Modal(document.getElementById('prescriptionModal'));

    viewButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            prescriptionModal.show();
        });
    });

    // Dispense Action (Loading state simulation)
    const btnDispense = document.getElementById('btn-dispense');
    if (btnDispense) {
        btnDispense.addEventListener('click', function () {
            const originalText = this.innerHTML;
            this.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Dispensing...`;
            this.disabled = true;

            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                prescriptionModal.hide();
                showToast("Prescription has been dispensed successfully!");
            }, 1000);
        });
    }

    // Generic view buttons to trigger toasts (simulation)
    const genericActionBtns = document.querySelectorAll('.btn-add-stock, .dropdown-item, .btn-success');
    genericActionBtns.forEach(btn => {
        if (btn.id !== 'btn-dispense' && !btn.classList.contains('btn-view-prescription')) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                showToast("Action menu selected.");
            });
        }
    });
});
