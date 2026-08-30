const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = ()=> {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}
/* =========================
   CHANGEMENT DE THEME
========================= */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");


/* Vérifier le thème sauvegardé */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light-theme");

    themeIcon.classList.remove("bx-sun");
    themeIcon.classList.add("bx-moon");

}


/* Changement de thème */

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {

        /* Mode clair */

        localStorage.setItem("theme", "light");

        themeIcon.classList.remove("bx-sun");
        themeIcon.classList.add("bx-moon");

    } else {

        /* Mode sombre */

        localStorage.setItem("theme", "dark");

        themeIcon.classList.remove("bx-moon");
        themeIcon.classList.add("bx-sun");

    }

});
localStorage.getItem("theme")