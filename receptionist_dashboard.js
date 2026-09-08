const receptionistViews = {
    'dashboard': 'Receptionist Dashboard',
    'register-patient': 'Register New Patient',
    'patients': 'Find Patient',
    'patient-profile': 'Digital Patient Profile',
    'book-appointment': 'Book Appointment',
    'check-in': 'Patient Check-In',
    'appointments': 'Appointments',
    'doctors': 'Doctor Availability',
    'departments': 'Hospital Departments',
    'billing': 'Billing Overview',
    'notifications': 'Notifications',
    'profile': 'My Profile'
};

document.addEventListener('DOMContentLoaded', () => {
    // Basic navigation binding
    const navItems = document.querySelectorAll('[data-view]');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const viewName = item.getAttribute('data-view');
            switchReceptionistView(viewName);
        });
    });

    // Mock Booking Flow Interactions
    const btnSteps = document.querySelectorAll('.wizard-btn-next');
    let currentStep = 1;
    btnSteps.forEach(btn => {
        btn.addEventListener('click', function () {
            if (currentStep < 5) {
                // hide current
                document.getElementById(`book-step-${currentStep}`).style.display = 'none';
                document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('completed');
                document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');

                // show next
                currentStep++;
                document.getElementById(`book-step-${currentStep}`).style.display = 'block';
                document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
            }
        });
    });

    const resetBooking = document.getElementById('btn-confirm-appointment');
    if (resetBooking) {
        resetBooking.addEventListener('click', function () {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="ph ph-check"></i> Appointment Booked';
            this.style.background = 'var(--color-success)';
            this.style.borderColor = 'var(--color-success)';

            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
                this.style.borderColor = '';

                // Reset wizard
                document.getElementById(`book-step-${currentStep}`).style.display = 'none';
                currentStep = 1;
                document.getElementById(`book-step-1`).style.display = 'block';

                document.querySelectorAll('.step').forEach(s => {
                    s.classList.remove('completed');
                    s.classList.remove('active');
                    if (s.getAttribute('data-step') === '1') s.classList.add('active');
                });

                switchReceptionistView('dashboard');
            }, 1500);
        });
    }

    // Card selections logic inside wizard
    document.querySelectorAll('.card-selectable').forEach(card => {
        card.addEventListener('click', function () {
            // Deselect siblings
            let siblings = this.parentElement.querySelectorAll('.card-selectable');
            siblings.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Time slots logic
    document.querySelectorAll('.time-slot:not(.unavailable)').forEach(slot => {
        slot.addEventListener('click', function () {
            let siblings = this.parentElement.querySelectorAll('.time-slot');
            siblings.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Check-in Interaction Mock
    const checkInBtns = document.querySelectorAll('.checkin-btn');
    checkInBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            this.innerHTML = '<i class="ph ph-check"></i> Checked In';
            this.style.background = 'var(--color-success)';
            this.style.color = 'white';
            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-primary');
            // visually update table row status
            const statusBadge = this.parentElement.parentElement.querySelector('.status-waiting');
            if (statusBadge) {
                statusBadge.className = 'status-badge status-checkedin';
                statusBadge.textContent = 'Checked In';
            }
        });
    });

    // Form success mock for register patient
    const regBtn = document.getElementById('register-patient-btn');
    if (regBtn) {
        regBtn.addEventListener('click', function () {
            this.innerHTML = '<i class="ph ph-check"></i> Patient Successfully Registered';
            this.style.background = 'var(--color-success)';
            setTimeout(() => {
                switchReceptionistView('patient-profile');
                this.innerHTML = 'Create Patient Record';
                this.style.background = '';
            }, 1200);
        });
    }

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

function switchReceptionistView(viewName) {
    if (!viewName) return;

    // Title
    const titleEl = document.getElementById('page-title');
    if (receptionistViews[viewName]) {
        titleEl.textContent = receptionistViews[viewName];
    }

    // Sidebar active state 
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
