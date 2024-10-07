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
            { icon: 'bx-grid-alt', name: 'Nadzorna plošča', link: '' },
            { icon: 'bx-box', name: 'Urejanje predmetov', link: '' },
            { icon: 'bx-list-ul', name: 'Urejanje učiteljev', link: '' },
            { icon: 'bx-pie-chart-alt-2', name: 'Urejanje učencev', link: '' },
            { icon: 'bx-a', name: 'Ocene', link: '' },
            { icon: 'bx-b', name: 'Urniki', link: '' },
            { icon: 'bx-c', name: 'Odsotnosti', link: 'subpages/odsotnost.html' }, 
            { icon: 'bx-d', name: 'Nastavitve', link: '' }
        ],
        'ucitelj': [
            { icon: 'bx-grid-alt', name: 'Teacher Dashboard', link: '' },
            { icon: 'bx-book', name: 'Manage Subjects', link: '' },
            { icon: 'bx-a', name: 'Grades', link: '' },
            { icon: 'bx-c', name: 'Attendance', link: '' } 
        ],
        'dijak': [
            { icon: 'bx-grid-alt', name: 'Student Dashboard', link: '' },
            { icon: 'bx-book', name: 'My Courses', link: '' },
            { icon: 'bx-c', name: 'My Grades', link: '' },
            { icon: 'bx-calendar', name: 'Schedule', link: '' }
        ],
        'starsi': [
            { icon: 'bx-grid-alt', name: 'Parent Dashboard', link: '' },
            { icon: 'bx-book', name: 'My Children\'s Grades', link: '' },
            { icon: 'bx-calendar', name: 'Schedule', link: '' }
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
            <span class="links_name">Odjava</span>
          </a>
        </li>
    `;
}
