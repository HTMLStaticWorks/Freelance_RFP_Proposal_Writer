/* 
    Dashboard JavaScript
    Freelance RFP Proposal Writer Platform
*/

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle for Mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('dashboardSidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 992) {
                if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('show');
                }
            }
        });
    }

    // Chart.js initialization (if added later)
    // For now, we simulate dashboard interactions
    
    // File Upload Simulation
    const uploadArea = document.querySelector('.border-dashed');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('bg-primary', 'bg-opacity-10');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('bg-primary', 'bg-opacity-10');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('bg-primary', 'bg-opacity-10');
            alert('File uploaded successfully! (Simulated)');
        });
    }

    // Notification mark as read
    const notifications = document.querySelectorAll('.dropdown-item');
    notifications.forEach(note => {
        note.addEventListener('click', function() {
            this.classList.remove('border-bottom');
            this.style.opacity = '0.7';
            const badge = document.querySelector('.badge');
            if (badge) {
                let count = parseInt(badge.innerText);
                if (count > 0) badge.innerText = count - 1;
                if (count - 1 === 0) badge.remove();
            }
        });
    });
});
