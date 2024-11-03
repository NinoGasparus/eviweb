function showAdminPanel(role) {
    const panel = document.getElementById("admin-panel");
    panel.style.display = 'block';

    renderSidebar(role);
}

function renderSidebar(role) {
    const sidebarLinks = document.querySelector(".nav-links");

    sidebarLinks.innerHTML = '';

    const sidebarConfig = {
        'admin': [
            { icon: 'bx-grid-alt', name: 'Dashboard', link: 'subpages/admin_dashboard.html' },
            { icon: 'bx-box', name: 'Subjects', link: 'subpages/subjects.html' },
            { icon: 'bx-list-ul', name: 'Teachers', link: 'subpages/teachers.html' },
            { icon: 'bx-pie-chart-alt-2', name: 'Students', link: 'subpages/students.html' },
            { icon: 'bx-a', name: 'Grades', link: 'subpages/grades.html' },
            { icon: 'bx-b', name: 'Timetables', link: 'subpages/timetables.html' },
            { icon: 'bx-c', name: 'Absences', link: 'subpages/absences.html' },
            { icon: 'bx-d', name: 'Exams', link: 'subpages/exams.html' },
            { icon: 'bx-e', name: 'Settings', link: 'subpages/settings.html' }
        ],
        'teacher': [
            { icon: 'bx-grid-alt', name: 'Teacher Dashboard', link: '' },
            { icon: 'bx-book', name: 'Manage Subjects', link: 'subpages/subjects.html' },
            { icon: 'bx-a', name: 'Grades', link: 'subpages/grades.html' },
            { icon: 'bx-c', name: 'Attendance', link: 'subpages/absences.html' } 
        ],
        'student': [
            { icon: 'bx-grid-alt', name: 'Student Dashboard', link: '' },
            { icon: 'bx-book', name: 'My Courses', link: 'subpages/subjects.html' },
            { icon: 'bx-c', name: 'My Grades', link: 'subpages/grades.html' },
            { icon: 'bx-calendar', name: 'Schedule', link: 'subpages/timetables.html' }
        ],
        'parent': [
            { icon: 'bx-grid-alt', name: 'Parent Dashboard', link: '' },
            { icon: 'bx-book', name: 'Children’s Grades', link: 'subpages/grades.html' },
            { icon: 'bx-calendar', name: 'Schedule', link: 'subpages/timetables.html' }
        ]
    };

    const links = sidebarConfig[role] || [];

    links.forEach(link => {
        sidebarLinks.innerHTML += `
            <li>
              <a href="${link.link}">
                <i class='bx ${link.icon}'></i>
                <span class="links_name">${link.name}</span>
              </a>
            </li>
        `;
    });

    sidebarLinks.innerHTML += `
        <li class="log_out">
          <a href="#" onclick="logout();">
            <i class='bx bx-log-out'></i>
            <span class="links_name">Logout</span>
          </a>
        </li>
    `;
}
