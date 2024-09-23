function showNavbar(role) {
    const navbar = document.querySelector('.navbar-nav');
    
    navbar.innerHTML = '';

    if (role === 'admin') {
        navbar.innerHTML += `
            <li class="nav-item">
                <a class="nav-link" href="#">Admin Dashboard</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Manage Users</a>
            </li>
        `;
    } else if (role === 'ucitelj') {
        navbar.innerHTML += `
            <li class="nav-item">
                <a class="nav-link" href="#">Teacher Dashboard</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Manage Subjects</a>
            </li>
        `;
    } else if (role === 'dijak') {
        navbar.innerHTML += `
            <li class="nav-item">
                <a class="nav-link" href="#">Student Dashboard</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">My Courses</a>
            </li>
        `;
    } else if (role === 'starsi') {
        navbar.innerHTML += `
            <li class="nav-item">
                <a class="nav-link" href="#">Parent Dashboard</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">My Children's Grades</a>
            </li>
        `;
    }

    navbar.innerHTML += `
        <li class="nav-item">
            <a class="nav-link" href="#" onclick="logout();">Log Out</a>
        </li>
    `;
}
