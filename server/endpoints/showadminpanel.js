function showAdminPanel(role) {
    const adminPanel = document.getElementById("admin-panel");
    adminPanel.style.display = 'block';
    renderSidebar(role);
}

function renderSidebar(role) {
    const sidebarLinks = document.querySelector(".nav-links");

    sidebarLinks.innerHTML = '';

    const sidebarConfig = {
        'admin': [
            { icon: 'bx-grid-alt', name: 'Nadzorna plošča' },
            { icon: 'bx-box', name: 'Urejanje predmetov' },
            { icon: 'bx-list-ul', name: 'Urejanje učiteljev' },
            { icon: 'bx-pie-chart-alt-2', name: 'Urejanje učencev' },
            { icon: 'bx-a', name: 'Ocene' },
            { icon: 'bx-b', name: 'Urniki' },
            { icon: 'bx-c', name: 'Odsotnosti' },
            { icon: 'bx-d', name: 'Nastavitve' }
        ],
        'ucitelj': [
            { icon: 'bx-grid-alt', name: 'Teacher Dashboard' },
            { icon: 'bx-book', name: 'Manage Subjects' },
            { icon: 'bx-a', name: 'Grades' },
            { icon: 'bx-c', name: 'Attendance' }
        ],
        'dijak': [
            { icon: 'bx-grid-alt', name: 'Student Dashboard' },
            { icon: 'bx-book', name: 'My Courses' },
            { icon: 'bx-c', name: 'My Grades' },
            { icon: 'bx-calendar', name: 'Schedule' }
        ],
        'starsi': [
            { icon: 'bx-grid-alt', name: 'Parent Dashboard' },
            { icon: 'bx-book', name: 'My Children\'s Grades' },
            { icon: 'bx-calendar', name: 'Schedule' }
        ]
    };

    const links = sidebarConfig[role] || [];

    links.forEach(link => {
        sidebarLinks.innerHTML += `
            <li>
              <a href="#">
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
            <span class="links_name">Odjava</span>
          </a>
        </li>
    `;
}
