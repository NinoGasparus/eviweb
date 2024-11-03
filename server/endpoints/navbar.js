function showNavbar(role) {
    const navbar = document.querySelector('.navbar-nav');
    navbar.innerHTML = '';

    const navItems = {
        'admin': `<li class="nav-item"><a class="nav-link" href="#">Admin Dashboard</a></li>`,
        'teacher': `<li class="nav-item"><a class="nav-link" href="#">Teacher Dashboard</a></li>`,
        'student': `<li class="nav-item"><a class="nav-link" href="#">Student Dashboard</a></li>`,
        'parent': `<li class="nav-item"><a class="nav-link" href="#">Parent Dashboard</a></li>`
    };

    navbar.innerHTML = navItems[role] || '';
    navbar.innerHTML += `<li class="nav-item"><a class="nav-link" href="#" onclick="logout();">Log Out</a></li>`;
}