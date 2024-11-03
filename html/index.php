<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>Home</title>

    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="main.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/3.5.0/remixicon.css" rel="stylesheet" />
    <link href="components/nav/nav.css" rel="stylesheet"/>
    <link href="components/root/root.css" rel="stylesheet"/>
    <link href="components/sidePanel/side.css" rel="stylesheet"/>

    <script>
      <?php 
        include "renderer.php"; 
        injectHTML("scripts/env.js"); 
      ?>
    </script>
    <script src="scripts/main.js"></script>
    <script src="scripts/login.js"></script>
    <script src="scripts/setCookie.js"></script>
    <script src="scripts/navbar.js"></script>
</head>

<body>
    <?php
      injectHTML("components/nav/nav.html");
      injectHTML("components/login/login.html");
      injectHTML("components/sidePanel/side.html");
    ?>



    <script>
     document.addEventListener('DOMContentLoaded', function () {
    const sidebarLinks = document.querySelectorAll('.nav-links a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();  
            const pageUrl = link.getAttribute('href');  
            loadPageContent(pageUrl);  // Load the content
        });
    });

    function loadPageContent(pageUrl) {
        document.getElementById('main-content').innerHTML = '<p>Loading...</p>'; 
        fetch(pageUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById('main-content').innerHTML = html;  
            })
            .catch(error => {
                console.error('Error loading page:', error);
                document.getElementById('main-content').innerHTML = `<p>Error loading page: ${error.message}</p>`;
            });
    }
});

    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>
</html>
