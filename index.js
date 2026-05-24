document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Load custom course configuration if available
  const loadCourseConfig = () => {
    try {
      const config = JSON.parse(localStorage.getItem("hsr_course_config"));
      if (config) {
        // 1. Poster Image
        if (config.posterBase64) {
          const heroPosterImg = document.getElementById("heroPosterImg");
          const mainPosterImg = document.getElementById("mainPosterImg");
          const lightboxImg = document.getElementById("lightboxImg");
          if (heroPosterImg) heroPosterImg.src = config.posterBase64;
          if (mainPosterImg) mainPosterImg.src = config.posterBase64;
          if (lightboxImg) lightboxImg.src = config.posterBase64;
        }
        
        // 2. Course Dates
        if (config.courseDate) {
          const infoDate = document.getElementById("infoDate");
          if (infoDate) infoDate.textContent = config.courseDate;
        }
        if (config.courseDay) {
          const infoDay = document.getElementById("infoDay");
          if (infoDay) infoDay.textContent = config.courseDay;
        }
        
        // 3. Timings
        if (config.time1) {
          const infoTime1 = document.getElementById("infoTime1");
          if (infoTime1) infoTime1.textContent = config.time1;
        }
        if (config.time2) {
          const infoTime2 = document.getElementById("infoTime2");
          if (infoTime2) infoTime2.textContent = config.time2;
        }
        
        // 4. Venue / Address
        if (config.venue) {
          const infoVenue = document.getElementById("infoVenue");
          if (infoVenue) infoVenue.textContent = config.venue;
        }
        if (config.venueSub) {
          const infoVenueSub = document.getElementById("infoVenueSub");
          if (infoVenueSub) infoVenueSub.textContent = config.venueSub;
        }
        if (config.fullAddress) {
          const contactAddress = document.getElementById("contactAddress");
          const footerAddress = document.getElementById("footerAddress");
          if (contactAddress) contactAddress.innerHTML = config.fullAddress.replace(/\n/g, "<br>");
          if (footerAddress) footerAddress.textContent = config.fullAddress.replace(/\n/g, ", ");
        }
        
        // 5. Phone / WhatsApp
        if (config.phone) {
          const infoPhone = document.getElementById("infoPhone");
          const contactPhone = document.getElementById("contactPhone");
          const footerPhone = document.getElementById("footerPhone");
          if (infoPhone) infoPhone.textContent = config.phone;
          if (contactPhone) contactPhone.textContent = "Phone: " + config.phone;
          if (footerPhone) footerPhone.textContent = config.phone;

          // Update WhatsApp Links
          const cleanPhone = config.phone.replace(/[^0-9]/g, "");
          const phoneWithCountry = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
          
          const floatBtn = document.getElementById("whatsappFloatBtn");
          if (floatBtn) {
            floatBtn.href = `https://wa.me/${phoneWithCountry}?text=Hi%2C%20I'm%20interested%20in%20the%20Art%20of%20Living%20Happiness%20Program%20in%20HSR%20Layout.%20Could%20you%20please%20share%20more%20details%3F`;
          }

          const heroWABtn = document.getElementById("heroWhatsAppBtn");
          if (heroWABtn) {
            heroWABtn.href = `https://wa.me/${phoneWithCountry}?text=Hi%20teacher%2C%20I%20have%20a%20few%20questions%20about%20the%20upcoming%20Happiness%20Program%20in%20HSR%20Layout...`;
          }

          const routeWABtn = document.getElementById("whatsappDirectionBtn");
          if (routeWABtn) {
            routeWABtn.href = `https://wa.me/${phoneWithCountry}?text=Hi%2C%20I%20would%20like%20to%20know%20how%20to%20reach%20Gurukul%20HSR%20center...`;
          }
        }
        
        // 6. Email
        if (config.email) {
          const contactEmail = document.getElementById("contactEmail");
          const footerEmail = document.getElementById("footerEmail");
          if (contactEmail) contactEmail.textContent = "Email: " + config.email;
          if (footerEmail) footerEmail.textContent = config.email;
        }
        
        // 7. Map iframe embed src
        if (config.mapSrc) {
          const mapIframe = document.getElementById("mapIframe");
          if (mapIframe) mapIframe.src = config.mapSrc;
        }
      }
    } catch (err) {
      console.error("Error loading course configuration:", err);
    }
  };

  loadCourseConfig();

  // DOM Elements
  const header = document.getElementById("header");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const faqItems = document.querySelectorAll(".faq-item");
  const successToast = document.getElementById("successToast");
  
  // Lightbox DOM Elements
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeLightboxBtn = document.getElementById("closeLightboxBtn");
  const heroPosterPreview = document.getElementById("heroPosterPreview");
  const mainPosterPreview = document.getElementById("mainPosterPreview");

  // Sticky Navigation Header on Scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    updateActiveNavLink();
  });

  // Mobile Menu Toggle
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Active Link Highlighting on Scroll
  function updateActiveNavLink() {
    let current = "";
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY + 120; // Offset for header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // FAQ Accordion Toggle
  faqItems.forEach(item => {
    const headerElement = item.querySelector(".faq-header");
    const contentElement = item.querySelector(".faq-content");

    headerElement.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other FAQ items first
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-content").style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
        contentElement.style.maxHeight = null;
      } else {
        item.classList.add("active");
        // Set max-height to its scrollHeight for smooth transition
        contentElement.style.maxHeight = contentElement.scrollHeight + "px";
      }
    });
  });

  // Lightbox Modal for Poster
  const openLightbox = () => {
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent page scrolling
  };

  const closeLightbox = () => {
    lightbox.style.display = "none";
    document.body.style.overflow = null; // Re-enable page scrolling
  };

  if (heroPosterPreview) {
    heroPosterPreview.addEventListener("click", openLightbox);
  }

  if (mainPosterPreview) {
    mainPosterPreview.addEventListener("click", openLightbox);
  }

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener("click", closeLightbox);
  }

  // Close lightbox if user clicks background overlay
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Escape key closes lightbox
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });

  // Registration / Inquiry Form Validation & Submission
  const registrationForm = document.getElementById("registrationForm");
  
  if (registrationForm) {
    registrationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const phoneNumber = document.getElementById("phoneNumber").value.trim();
      const emailAddress = document.getElementById("emailAddress").value.trim();
      const preferredBatch = document.getElementById("preferredBatch").value;
      const userComments = document.getElementById("userComments").value.trim();

      // Simple Validation
      if (!fullName) {
        showFormError("fullName", "Full name is required");
        return;
      }
      
      if (!phoneNumber || phoneNumber.length < 10) {
        showFormError("phoneNumber", "Please enter a valid 10-digit phone number");
        return;
      }

      if (emailAddress && !validateEmail(emailAddress)) {
        showFormError("emailAddress", "Please enter a valid email address");
        return;
      }

      if (!preferredBatch) {
        showFormError("preferredBatch", "Please select a preferred batch");
        return;
      }

      // Success logic
      const leadData = {
        fullName,
        phoneNumber,
        emailAddress,
        preferredBatch,
        userComments,
        submittedAt: new Date().toISOString()
      };

      // Save inquiry to localStorage (offline registry)
      saveInquiryToLocalStorage(leadData);

      // Trigger premium feedback: Toast Notification
      showToastNotification();

      // Reset form controls
      registrationForm.reset();
    });
  }

  // Utility: Show Custom Toast
  function showToastNotification() {
    successToast.classList.add("show");
    
    // Auto-hide toast after 4.5 seconds
    setTimeout(() => {
      successToast.classList.remove("show");
    }, 4500);
  }

  // Utility: Error handler alert
  function showFormError(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    field.focus();
    
    // Create temporary error element
    const originalBorderColor = field.style.borderColor;
    field.style.borderColor = "#f44336";
    
    alert(errorMessage);
    
    setTimeout(() => {
      field.style.borderColor = originalBorderColor;
    }, 3000);
  }

  // Utility: Email Validator
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Local Storage lead helper
  function saveInquiryToLocalStorage(lead) {
    try {
      let inquiries = JSON.parse(localStorage.getItem("hsr_inquiries")) || [];
      inquiries.push(lead);
      localStorage.setItem("hsr_inquiries", JSON.stringify(inquiries));
      console.log("Inquiry saved locally:", lead);
    } catch (e) {
      console.error("Local storage error:", e);
    }
  }
});
