/* =========================================================
   AGROFUTURO ECUADOR
   JavaScript
========================================================= */


/* =========================================================
   1. MENÚ RESPONSIVE
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Cerrar menú"
                : "Abrir menú"
        );

        menuToggle.textContent =
            isOpen ? "✕" : "☰";
    });


    /* Cerrar menú al seleccionar una opción */

    const navLinks =
        mainNav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );

            menuToggle.textContent = "☰";
        });

    });

}


/* =========================================================
   2. FILTRO DE CULTIVOS
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const cropCards =
    document.querySelectorAll(".crop-card");

const noResults =
    document.querySelector(".no-results");


/*
    Normaliza el texto para evitar problemas
    con mayúsculas, espacios y tildes.
*/

function normalizeText(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

}


function filterCrops(region) {

    const selectedRegion =
        normalizeText(region);

    let visibleCards = 0;


    cropCards.forEach(card => {

        const cardRegion =
            normalizeText(
                card.dataset.region || ""
            );


        /*
            Si seleccionamos "todos",
            mostramos todas las tarjetas.
        */

        const shouldShow =
            selectedRegion === "todos" ||
            cardRegion === selectedRegion;


        if (shouldShow) {

            card.hidden = false;

            visibleCards++;

            /*
                Reinicia la animación
                para que la tarjeta aparezca
                suavemente.
            */

            card.style.animation = "none";

            void card.offsetWidth;

            card.style.animation =
                "cardAppear 0.45s ease";

        } else {

            card.hidden = true;

        }

    });


    /*
        Mostrar mensaje cuando
        no existen resultados.
    */

    if (noResults) {

        noResults.hidden =
            visibleCards !== 0;

    }

}


/*
    Eventos de los botones
*/

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /*
            Quitar estado activo
            de todos los botones.
        */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        /*
            Activar botón seleccionado.
        */

        button.classList.add("active");


        /*
            Obtener región.
        */

        const region =
            button.dataset.region;


        /*
            Filtrar tarjetas.
        */

        filterCrops(region);

    });

});


/*
    Mostrar todos los cultivos
    al cargar la página.
*/

filterCrops("todos");


/* =========================================================
   3. QUIZ
========================================================= */

const quizOptions =
    document.querySelectorAll(".quiz-option");

const quizResult =
    document.querySelector(".quiz-result");


quizOptions.forEach(option => {

    option.addEventListener("click", () => {

        /*
            Quitar estilos anteriores
            de todas las respuestas.
        */

        quizOptions.forEach(item => {

            item.classList.remove("correct");
            item.classList.remove("incorrect");

        });


        const answer =
            option.dataset.answer;


        if (answer === "correcta") {

            option.classList.add("correct");

            if (quizResult) {

                quizResult.hidden = false;

                quizResult.textContent =
                    "✓ ¡Respuesta correcta! Los sensores agrícolas pueden medir la humedad del suelo y ayudar a tomar mejores decisiones.";

            }

        } else {

            option.classList.add("incorrect");

            if (quizResult) {

                quizResult.hidden = false;

                quizResult.textContent =
                    "✗ Respuesta incorrecta. Intenta nuevamente. Los sensores agrícolas permiten conocer la humedad del suelo.";

            }

        }

    });

});


/* =========================================================
   4. FORMULARIO
========================================================= */

const participationForm =
    document.querySelector("#participation-form");

const formMessage =
    document.querySelector("#form-message");

const nameInput =
    document.querySelector("#name");

const emailInput =
    document.querySelector("#email");

const provinceInput =
    document.querySelector("#province");


/*
    Validación sencilla del correo.
*/

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/*
    Mostrar mensaje.
*/

function showFormMessage(message, type) {

    if (!formMessage) {
        return;
    }


    formMessage.hidden = false;

    formMessage.textContent = message;


    if (type === "error") {

        formMessage.style.background =
            "#f5e5e2";

        formMessage.style.color =
            "#814640";

    } else {

        formMessage.style.background =
            "#e3f0e7";

        formMessage.style.color =
            "#315c45";

    }

}


/*
    Enviar formulario.
*/

if (participationForm) {

    participationForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const province =
                provinceInput.value;


            /*
                Validar nombre.
            */

            if (name.length < 3) {

                showFormMessage(
                    "Por favor, escribe un nombre válido.",
                    "error"
                );

                nameInput.focus();

                return;
            }


            /*
                Validar correo.
            */

            if (!isValidEmail(email)) {

                showFormMessage(
                    "Por favor, introduce un correo electrónico válido.",
                    "error"
                );

                emailInput.focus();

                return;
            }


            /*
                Validar provincia.
            */

            if (!province) {

                showFormMessage(
                    "Por favor, selecciona una provincia.",
                    "error"
                );

                provinceInput.focus();

                return;
            }


            /*
                Validar interés.
            */

            const selectedInterest =
                document.querySelector(
                    'input[name="interes"]:checked'
                );


            if (!selectedInterest) {

                showFormMessage(
                    "Por favor, selecciona un tema de interés.",
                    "error"
                );

                return;
            }


            /*
                Si todo está correcto.
            */

            showFormMessage(
                "✓ ¡Gracias por participar! Tu información fue registrada correctamente.",
                "success"
            );


            /*
                Limpiar formulario
                después de mostrar el mensaje.
            */

            participationForm.reset();

        }
    );

}


/* =========================================================
   5. EFECTO SUAVE PARA LOS ENLACES INTERNOS
========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (target) {

            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================================
   6. MENSAJE DE CONSOLA
========================================================= */

console.log(
    "AgroFuturo Ecuador cargado correctamente."
);