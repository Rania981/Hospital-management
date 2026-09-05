document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item, .sidebar-footer .nav-item');
    const views = document.querySelectorAll('.view');
    const pageTitle = document.getElementById('page-title');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            if (!targetId) return;

            // Remove active from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active to clicked nav item
            if(!item.style.display) { // don't add active to hidden profile button
                item.classList.add('active');
            } else {
                // If profile was clicked from header or footer, maybe highlight dashboard or nothing.
            }

            // Hide all views
            views.forEach(view => view.classList.remove('active'));

            // Show target view
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active');
                
                // Update Page Title based on sidebar text
                const text = item.textContent.trim();
                if(text) {
                    pageTitle.textContent = text;
                } else if (targetId === 'profile-view') {
                    pageTitle.textContent = 'Admin Profile';
                }
            }
        });
    });

    // --- Sub-Tabs Logic ---
    const tabNavs = document.querySelectorAll('.tabs-nav');
    tabNavs.forEach(nav => {
        const tabs = nav.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                // Normally you would filter content here
            });
        });
    });

    // --- Chart.js Initialization ---
    // Only initialize if Chart is defined
    if (typeof Chart !== 'undefined') {
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.color = "#667085";

        // Hospital Activity Chart (Line)
        const ctxActivity = document.getElementById('activityChart');
        if (ctxActivity) {
            new Chart(ctxActivity, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'Appointments',
                            data: [65, 78, 90, 87, 102, 115, 85],
                            borderColor: '#3B82C4',
                            backgroundColor: 'rgba(59, 130, 196, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Registrations',
                            data: [20, 35, 40, 25, 45, 50, 30],
                            borderColor: '#38A169',
                            backgroundColor: 'transparent',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                boxWidth: 8
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(229, 237, 246, 0.5)'
                            },
                            border: {
                                display: false
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            border: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Appointment Status Chart (Doughnut)
        const ctxAppt = document.getElementById('appointmentChart');
        if (ctxAppt) {
            new Chart(ctxAppt, {
                type: 'doughnut',
                data: {
                    labels: ['Confirmed', 'Completed', 'Cancelled', 'Pending'],
                    datasets: [{
                        data: [45, 30, 10, 15],
                        backgroundColor: [
                            '#3B82C4', // Confirmed - Primary
                            '#38A169', // Completed - Success
                            '#E53E3E', // Cancelled - Error
                            '#DD6B20'  // Pending - Warning
                        ],
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '75%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 20
                            }
                        }
                    }
                }
            });
        }
    }
});
