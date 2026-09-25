document.addEventListener("DOMContentLoaded", () => {
    // 1. Theme Toggle & Session Storage Logic
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const htmlElement = document.documentElement;

    const savedTheme = sessionStorage.getItem("ttarm_theme") || "light";
    if (savedTheme === "dark") {
        htmlElement.classList.remove("light");
        htmlElement.classList.add("dark");
        themeIcon.className = "fa-solid fa-sun text-lg";
    }

    themeToggle.addEventListener("click", () => {
        if (htmlElement.classList.contains("dark")) {
            htmlElement.classList.remove("dark");
            htmlElement.classList.add("light");
            sessionStorage.setItem("ttarm_theme", "light");
            themeIcon.className = "fa-solid fa-moon text-lg";
        } else {
            htmlElement.classList.remove("light");
            htmlElement.classList.add("dark");
            sessionStorage.setItem("ttarm_theme", "dark");
            themeIcon.className = "fa-solid fa-sun text-lg";
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    document.querySelectorAll(".mobile-link").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    });

    // 3. Fetch JSON Data and Populate via HTML <template> elements
    fetch("content.json")
        .then(response => {
            if (!response.ok) throw new Error("Could not load content.json");
            return response.json();
        })
        .then(data => {
            populateServices(data.services);
            populateBrands(data.brands);
            populatePortfolio(data.portfolio);
        })
        .catch(error => {
            console.error("Error loading JSON content:", error);
        });

    function populateServices(services) {
        const grid = document.getElementById("servicesGrid");
        const template = document.getElementById("serviceTemplate");

        services.forEach(service => {
            const clone = template.content.cloneNode(true);
            clone.querySelector(".service-img").src = service.image;
            clone.querySelector(".service-img").alt = service.title;
            clone.querySelector(".service-badge").textContent = service.badge;
            clone.querySelector(".service-icon").className = `fa-solid ${service.icon}`;
            clone.querySelector(".service-title").textContent = service.title;
            clone.querySelector(".service-desc").textContent = service.description;
            clone.querySelector(".service-meta").textContent = service.meta;
            grid.appendChild(clone);
        });
    }

    function populateBrands(brands) {
        const grid = document.getElementById("brandsGrid");
        const template = document.getElementById("brandTemplate");

        brands.forEach(brand => {
            const clone = template.content.cloneNode(true);
            clone.querySelector(".brand-icon").className = `fa-solid ${brand.icon} text-4xl text-slate-700 dark:text-slate-300 group-hover:text-brand-600 mb-3 transition-colors`;
            clone.querySelector(".brand-name").textContent = brand.name;
            clone.querySelector(".brand-sub").textContent = brand.sub;
            grid.appendChild(clone);
        });
    }

    function populatePortfolio(portfolioItems) {
        const grid = document.getElementById("portfolioGrid");
        const template = document.getElementById("portfolioTemplate");

        portfolioItems.forEach(item => {
            const clone = template.content.cloneNode(true);
            clone.querySelector(".portfolio-img").src = item.image;
            clone.querySelector(".portfolio-img").alt = item.title;
            clone.querySelector(".portfolio-category").textContent = item.category;
            clone.querySelector(".portfolio-title").textContent = item.title;
            clone.querySelector(".portfolio-desc").textContent = item.description;
            grid.appendChild(clone);
        });
    }

    // 4. Consultation Form Handler
    const consultationForm = document.getElementById("consultationForm");
    consultationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("clientName").value;
        alert(`Thank you, ${name}! Your request has been sent to TTARM LLC. An engineer will contact you shortly.`);
        consultationForm.reset();
    });
});