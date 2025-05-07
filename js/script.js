// script.js

document.addEventListener("DOMContentLoaded", function () {

  // tilt
  $('.js-tilt').tilt({
    scale: 1.2
})
  // efek navbar skrol
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Animasi Scroling yang halus
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });

        // tutup menu mobile kalo di buka
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });

  // Portfolio filtering - fungsi baru
  function simplePortfolioFilter() {
    // Dapatkan semua tab kategori
    const teachingTab = document.querySelector("#teaching .row");
    const videosTab = document.querySelector("#videos .row");
    const editingTab = document.querySelector("#editing .row");

    // Bersihkan konten tab kategori
    if (teachingTab) teachingTab.innerHTML = "";
    if (videosTab) videosTab.innerHTML = "";
    if (editingTab) editingTab.innerHTML = "";

    // Ambil semua item portfolio dari tab "All"
    const allItems = document.querySelectorAll("#all .portfolio-item");

    // Distribusikan ke tab yang sesuai berdasarkan data-category
    allItems.forEach((item) => {
      const category = item.getAttribute("data-category");
      const parentCol = item.closest(".col-md-4, .col-md-6"); // Ambil elemen kolom parent

      if (!parentCol) return; // Skip jika tidak ada parent column

      // Clone item ke tab yang sesuai
      const clone = parentCol.cloneNode(true);

      if (category === "teaching" && teachingTab) {
        teachingTab.appendChild(clone);
      } else if (category === "videos" && videosTab) {
        videosTab.appendChild(clone);
      } else if (category === "editing" && editingTab) {
        editingTab.appendChild(clone);
      }
    });
  }

  // Panggil fungsi filtering portfolio
  simplePortfolioFilter();

  // Tambahkan event listener untuk tab Bootstrap
  document
    .querySelectorAll('#portfolio-tab button[data-bs-toggle="pill"]')
    .forEach((button) => {
      button.addEventListener("shown.bs.tab", simplePortfolioFilter);
    });

  // Testimonial carousel
  const testimonialCarousel = document.getElementById("testimonialCarousel");
  if (testimonialCarousel) {
    const carousel = new bootstrap.Carousel(testimonialCarousel, {
      interval: 5000,
      pause: "hover",
    });
  }

  // isian form kontak 
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get nilai form
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const service = this.querySelector("select").value;
      const message = this.querySelector("textarea").value;
      const subscribe = this.querySelector("#newsletter").checked;

      // validasi sederhana
      if (!name || !email || !message) {
        showAlert("Please fill in all required fields.", "danger");
        return;
      }

      // Here you would typically send the form data to a server
      // For demo purposes, we'll just show a success message
      showAlert(
        "Thank you for your message! I will get back to you soon.",
        "success"
      );

      // Reset form
      this.reset();

      // Log the data (in a real app, you'd send this to your backend)
      console.log({
        name,
        email,
        service,
        message,
        subscribe,
      });
    });
  }

  // Newsletter subscription
  const newsletterForm = document.querySelector("footer form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;

      if (!email) {
        showAlert("Please enter your email address.", "danger");
        return;
      }

      // Here you would typically send the email to your newsletter service
      // For demo purposes, we'll just show a success message
      showAlert("Thank you for subscribing to my newsletter!", "success");

      // Reset form
      this.reset();

      // Log the email (in a real app, you'd send this to your backend)
      console.log("Newsletter subscription:", email);
    });
  }

  // Booking calendar button
  const calendarBtn = document.querySelector(".btn-outline-primary");
  if (calendarBtn) {
    calendarBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // In a real implementation, this would open a calendar/scheduling modal
      showAlert(
        "This would open a booking calendar in a real implementation.",
        "info"
      );
    });
  }

  // Helper function to show alerts
  function showAlert(message, type) {
    // Remove any existing alerts
    const existingAlert = document.querySelector(".custom-alert");
    if (existingAlert) {
      existingAlert.remove();
    }

    // Create alert element
    const alert = document.createElement("div");
    alert.className = `custom-alert alert alert-${type} alert-dismissible fade show`;
    alert.role = "alert";
    alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

    // Style the alert
    alert.style.position = "fixed";
    alert.style.top = "20px";
    alert.style.right = "20px";
    alert.style.zIndex = "9999";
    alert.style.maxWidth = "400px";

    // Add to document
    document.body.appendChild(alert);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      if (typeof bootstrap !== "undefined") {
        const bsAlert = new bootstrap.Alert(alert);
        bsAlert.close();
      } else {
        alert.remove();
      }
    }, 5000);
  }

  // Animation on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".portfolio-item, .card, .certificate-item"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animated elements
  document
    .querySelectorAll(".portfolio-item, .card, .certificate-item")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

  // Run on load and scroll
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);

  // Video modal for portfolio items
  document.querySelectorAll(".portfolio-overlay a").forEach((link) => {
    if (!link) return;

    link.addEventListener("click", function (e) {
      e.preventDefault();

      const portfolioItem = this.closest(".portfolio-item");
      if (!portfolioItem) return;

      const title = portfolioItem.querySelector("h3")?.textContent || "";
      const description = portfolioItem.querySelector("p")?.textContent || "";

      // Create modal content based on what was clicked
      let modalContent = "";
      if (
        this.textContent.includes("Watch") ||
        this.textContent.includes("View")
      ) {
        modalContent = `
                    <div class="ratio ratio-16x9">
                        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                                title="${title}" 
                                allowfullscreen></iframe>
                    </div>
                    <div class="mt-3">
                        <h5>${title}</h5>
                        <p>${description}</p>
                    </div>
                `;
      } else {
        const imgSrc = portfolioItem.querySelector("img")?.src || "";
        modalContent = `
                    <div class="text-center">
                        <img src="${imgSrc}" 
                             alt="${title}" 
                             class="img-fluid mb-3">
                        <h5>${title}</h5>
                        <p>${description}</p>
                    </div>
                `;
      }

      // Check if Bootstrap is available
      if (typeof bootstrap === "undefined") {
        console.error("Bootstrap is not available.");
        return;
      }

      // Create and show the modal
      const modal = new bootstrap.Modal(modalElement);
      modal.show();

      // Clean up modal after it's closed
      modalElement.addEventListener("hidden.bs.modal", function () {
        document.body.removeChild(modalElement);
      });
    });
  });
});
