/* =========================================================
   CERTIFICATIONS.JS
   Portfolio Alex_DDA
========================================================= */


/* =========================================================
   ATTENDRE QUE LA PAGE SOIT CHARGÉE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       CHARGER LE THEME SAUVEGARDE
    ===================================================== */

    const savedTheme = localStorage.getItem("theme");

    const themeToggle = document.getElementById("theme-toggle");


    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

    }


    /* =====================================================
       BOUTON DE CHANGEMENT DE THEME
    ===================================================== */

    if (themeToggle) {

        const themeIcon = themeToggle.querySelector("i");


        /* Mettre la bonne icône au démarrage */

        if (themeIcon && savedTheme === "light") {

            themeIcon.classList.remove("bx-sun");

            themeIcon.classList.add("bx-moon");

        }


        /* Cliquer sur le bouton */

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light-theme");


            const lightMode =
                document.body.classList.contains("light-theme");


            if (lightMode) {

                /* MODE CLAIR */

                localStorage.setItem("theme", "light");


                if (themeIcon) {

                    themeIcon.classList.remove("bx-sun");

                    themeIcon.classList.add("bx-moon");

                }

            } else {

                /* MODE SOMBRE */

                localStorage.setItem("theme", "dark");


                if (themeIcon) {

                    themeIcon.classList.remove("bx-moon");

                    themeIcon.classList.add("bx-sun");

                }

            }

        });

    }



    /* =====================================================
       CAROUSEL
    ===================================================== */

    const carousel = document.getElementById("carousel");

    const next = document.getElementById("next");

    const prev = document.getElementById("prev");

    const dotsContainer = document.getElementById("dots");

    const cards = document.querySelectorAll(".card");


    let current = 0;

    let autoPlay = null;



    /* =====================================================
       VERIFIER QUE LE CAROUSEL EXISTE
    ===================================================== */

    if (!carousel || cards.length === 0) {

        console.warn("Carousel ou certifications introuvables.");

        return;

    }



    /* =====================================================
       CREATION DES DOTS
    ===================================================== */

    if (dotsContainer) {

        cards.forEach((card, index) => {

            const dot = document.createElement("span");

            dot.classList.add("dot");


            if (index === 0) {

                dot.classList.add("active");

            }


            dot.addEventListener("click", () => {

                current = index;

                scrollToCard(index);

                updateDots();

            });


            dotsContainer.appendChild(dot);

        });

    }


    const dots =
        dotsContainer
            ? dotsContainer.querySelectorAll(".dot")
            : [];



    /* =====================================================
       ALLER VERS UNE CERTIFICATION
    ===================================================== */

    function scrollToCard(index) {

        const card = cards[index];


        if (!card) {

            return;

        }


        carousel.scrollTo({

            left: card.offsetLeft - 10,

            behavior: "smooth"

        });

    }



    /* =====================================================
       ACTUALISER LES DOTS
    ===================================================== */

    function updateDots() {

        dots.forEach(dot => {

            dot.classList.remove("active");

        });


        if (dots[current]) {

            dots[current].classList.add("active");

        }

    }



    /* =====================================================
       CERTIFICATION SUIVANTE
    ===================================================== */

    if (next) {

        next.addEventListener("click", () => {

            current++;


            if (current >= cards.length) {

                current = 0;

            }


            scrollToCard(current);

            updateDots();

        });

    }



    /* =====================================================
       CERTIFICATION PRECEDENTE
    ===================================================== */

    if (prev) {

        prev.addEventListener("click", () => {

            current--;


            if (current < 0) {

                current = cards.length - 1;

            }


            scrollToCard(current);

            updateDots();

        });

    }



    /* =====================================================
       DEFILEMENT AUTOMATIQUE
    ===================================================== */

    function startAutoPlay() {

        clearInterval(autoPlay);


        autoPlay = setInterval(() => {

            current++;


            if (current >= cards.length) {

                current = 0;

            }


            scrollToCard(current);

            updateDots();

        }, 4000);

    }



    /* =====================================================
       ARRETER LE DEFILEMENT
    ===================================================== */

    function stopAutoPlay() {

        clearInterval(autoPlay);

        autoPlay = null;

    }



    /* =====================================================
       DEMARRER LE CAROUSEL
    ===================================================== */

    startAutoPlay();



    /* =====================================================
       PAUSE AU SURVOL
    ===================================================== */

    carousel.addEventListener("mouseenter", () => {

        stopAutoPlay();

    });



    /* =====================================================
       REPRENDRE APRES LE SURVOL
    ===================================================== */

    carousel.addEventListener("mouseleave", () => {

        startAutoPlay();

    });



    /* =====================================================
       TOUCHES / TELEPHONE
       GLISSEMENT DU CAROUSEL
    ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    carousel.addEventListener("touchstart", (event) => {

        touchStartX = event.changedTouches[0].screenX;

        stopAutoPlay();

    }, { passive: true });


    carousel.addEventListener("touchend", (event) => {

        touchEndX = event.changedTouches[0].screenX;

        handleSwipe();

        startAutoPlay();

    }, { passive: true });


    function handleSwipe() {

        const difference = touchStartX - touchEndX;


        /* Glissement vers la gauche */

        if (difference > 50) {

            current++;


            if (current >= cards.length) {

                current = 0;

            }


            scrollToCard(current);

            updateDots();

        }


        /* Glissement vers la droite */

        if (difference < -50) {

            current--;


            if (current < 0) {

                current = cards.length - 1;

            }


            scrollToCard(current);

            updateDots();

        }

    }



    /* =====================================================
       MODALE CERTIFICAT
    ===================================================== */

    const certificateModal =
        document.getElementById("certificateModal");


    const certificateViewer =
        document.getElementById("certificateViewer");


    const closeCertificateButton =
        document.querySelector(".close-certificate");



    /* =====================================================
       OUVRIR UN CERTIFICAT
    ===================================================== */

    window.openCertificate = function(file) {

        if (!certificateModal || !certificateViewer) {

            console.error("Fenêtre du certificat introuvable.");

            return;

        }


        /* Charger le fichier */

        certificateViewer.src = file;


        /* Afficher la fenêtre */

        certificateModal.classList.add("active");


        /* Bloquer uniquement le scroll de la page */

        document.body.classList.add("modal-open");


        /* Arrêter le carousel */

        stopAutoPlay();

    };



    /* =====================================================
       FERMER LE CERTIFICAT
    ===================================================== */

    window.closeCertificate = function() {

        if (!certificateModal || !certificateViewer) {

            return;

        }


        /* Fermer la fenêtre */

        certificateModal.classList.remove("active");


        /* Supprimer le PDF */

        certificateViewer.src = "";


        /* Réactiver le scroll */

        document.body.classList.remove("modal-open");


        /* Reprendre le carousel */

        startAutoPlay();

    };



    /* =====================================================
       BOUTON X
    ===================================================== */

    if (closeCertificateButton) {

        closeCertificateButton.addEventListener(
            "click",
            () => {

                window.closeCertificate();

            }
        );

    }



    /* =====================================================
       CLIQUER EN DEHORS DU CERTIFICAT
    ===================================================== */

    if (certificateModal) {

        certificateModal.addEventListener("click", (event) => {

            if (event.target === certificateModal) {

                window.closeCertificate();

            }

        });

    }



    /* =====================================================
       TOUCHE ESC
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            certificateModal &&
            certificateModal.classList.contains("active")
        ) {

            window.closeCertificate();

        }

    });



    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuIcon =
        document.getElementById("menu-icon");


    const navbar =
        document.querySelector(".navbar");


    if (menuIcon && navbar) {

        menuIcon.addEventListener("click", () => {

            navbar.classList.toggle("active");

        });


        /* Fermer le menu après avoir
           cliqué sur un lien */

        document.querySelectorAll(".navbar a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navbar.classList.remove("active");

                });

            });

    }



    /* =====================================================
       FERMER LE MENU AVEC ESC
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (navbar) {

                navbar.classList.remove("active");

            }

        }

    });



    /* =====================================================
       FERMER LE MENU SI ON AGRANDIT LA FENETRE
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768 && navbar) {

            navbar.classList.remove("active");

        }

    });

});