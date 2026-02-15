// ================================
// REFORMAS MARTÍ GRANOLLERS
// JavaScript Principal
// ================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========== MENU MÓVIL ==========
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      menuToggle.textContent = isOpen ? '✕' : '☰';
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Cerrar menú al hacer clic en un enlace (excepto dropdown toggle)
    const navLinks = navMenu.querySelectorAll('a:not(.dropdown-toggle)');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.nav') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // ========== MENÚ DESPLEGABLE ==========
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const dropdown = this.closest('.nav-dropdown');
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // En móvil, toggle del dropdown
        dropdown.classList.toggle('active');
      }
      // En desktop, el hover CSS maneja el dropdown
    });
  });
  
  // ========== HEADER SCROLL ==========
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Añadir sombra al hacer scroll
    if (currentScroll > 50) {
      header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
      header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
  });
  
  // ========== ANIMACIÓN AL SCROLL ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observar elementos animables
  const animateElements = document.querySelectorAll('.card, .testimonial-card');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // ========== FORMULARIO DE CONTACTO ==========
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validación básica
      const nombre = document.getElementById('nombre');
      const telefono = document.getElementById('telefono');
      const email = document.getElementById('email');
      const mensaje = document.getElementById('mensaje');
      
      let isValid = true;
      let errorMessage = '';
      
      // Validar nombre
      if (nombre && nombre.value.trim().length < 2) {
        isValid = false;
        errorMessage += 'Por favor, introduce tu nombre.\n';
        nombre.classList.add('error');
      } else if (nombre) {
        nombre.classList.remove('error');
      }
      
      // Validar teléfono
      const telefonoRegex = /^[0-9]{9}$/;
      if (telefono && !telefonoRegex.test(telefono.value.replace(/\s/g, ''))) {
        isValid = false;
        errorMessage += 'Por favor, introduce un teléfono válido (9 dígitos).\n';
        telefono.classList.add('error');
      } else if (telefono) {
        telefono.classList.remove('error');
      }
      
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email.value)) {
        isValid = false;
        errorMessage += 'Por favor, introduce un email válido.\n';
        email.classList.add('error');
      } else if (email) {
        email.classList.remove('error');
      }
      
      // Validar mensaje
      if (mensaje && mensaje.value.trim().length < 10) {
        isValid = false;
        errorMessage += 'Por favor, describe tu proyecto (mínimo 10 caracteres).\n';
        mensaje.classList.add('error');
      } else if (mensaje) {
        mensaje.classList.remove('error');
      }
      
      if (!isValid) {
        alert(errorMessage);
        return;
      }
      
      // Aquí se enviaría el formulario
      // Por ahora mostramos mensaje de éxito
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      console.log('Datos del formulario:', data);
      
      // Mostrar mensaje de éxito
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success';
      successMessage.innerHTML = `
        <div style="background-color: #27AE60; color: white; padding: 1.5rem; border-radius: 8px; text-align: center; margin-top: 1rem;">
          <h3 style="color: white; margin-bottom: 0.5rem;">✓ ¡Mensaje enviado con éxito!</h3>
          <p style="color: white; margin: 0;">Te contactaremos en menos de 24 horas.</p>
        </div>
      `;
      
      contactForm.insertAdjacentElement('afterend', successMessage);
      contactForm.reset();
      
      // ========== ANALYTICS: FORMULARIO ENVIADO ==========
      console.log('📧 Formulario enviado correctamente');
      
      // Google Analytics 4 (gtag.js)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          'event_category': 'Contact',
          'event_label': 'Contact Form',
          'form_name': 'contact_form'
        });
      }
      
      // Google Tag Manager (dataLayer)
      if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push({
          'event': 'form_submit',
          'eventCategory': 'Contact',
          'eventLabel': 'Contact Form Submission',
          'formName': 'contact_form'
        });
      }
      
      // Eliminar mensaje después de 5 segundos
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    });
  }
  
  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========== LAZY LOADING DE IMÁGENES ==========
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // ========== BOTÓN FLOTANTE ==========
  const floatingBtn = document.querySelector('.floating-call-btn');
  
  if (floatingBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        floatingBtn.style.opacity = '1';
        floatingBtn.style.visibility = 'visible';
      } else {
        floatingBtn.style.opacity = '0';
        floatingBtn.style.visibility = 'hidden';
      }
    });
    
    // Inicialmente oculto
    if (window.pageYOffset <= 300) {
      floatingBtn.style.opacity = '0';
      floatingBtn.style.visibility = 'hidden';
    }
  }
  
  // ========== FORMATEAR NÚMEROS DE TELÉFONO ==========
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 9) value = value.slice(0, 9);
      
      // Formatear: 711 270 568
      if (value.length > 6) {
        value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
      } else if (value.length > 3) {
        value = value.slice(0, 3) + ' ' + value.slice(3);
      }
      
      e.target.value = value;
    });
  });
  
  // ========== MARCAR PÁGINA ACTIVA EN NAVEGACIÓN ==========
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPage === linkPath || 
        (currentPage === '/' && linkPath === '/') ||
        (currentPage.includes(linkPath) && linkPath !== '/')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // ========== ANALYTICS DE CLICS EN TELÉFONO ==========
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
      console.log('📞 Clic en teléfono:', this.href);
      
      // Google Analytics 4 (gtag.js)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_call_click', {
          'event_category': 'Contact',
          'event_label': this.href,
          'phone_number': this.href.replace('tel:', '')
        });
      }
      
      // Google Tag Manager (dataLayer)
      if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push({
          'event': 'phone_call_click',
          'eventCategory': 'Contact',
          'eventLabel': 'Phone Call',
          'phoneNumber': this.href.replace('tel:', '')
        });
      }
    });
  });
  
  // ========== PREVENCIÓN DE SPAM EN FORMULARIOS ==========
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // Añadir campo honeypot (oculto para usuarios, visible para bots)
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.style.display = 'none';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    form.appendChild(honeypot);
    
    // Validar en submit
    form.addEventListener('submit', function(e) {
      if (honeypot.value !== '') {
        e.preventDefault();
        console.log('Posible spam detectado');
        return false;
      }
    });
  });
  
  console.log('✓ Scripts de Pintor Matadepera cargados correctamente');
});

// ========== FUNCIÓN PARA VALIDAR EMAIL ==========
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ========== FUNCIÓN PARA VALIDAR TELÉFONO ESPAÑOL ==========
function isValidPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 9 && /^[6-9]/.test(cleaned);
}

// ================================
// COMPARISON SLIDER LOGIC (CUSTOM DRAG)
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.comparison-container');
    
    sliders.forEach(slider => {
        const imgAfter = slider.querySelector('.img-after'); // Top layer (clipped)
        const handle = slider.querySelector('.slider-handle');
        
        if(!imgAfter || !handle) return;
        
        let isDragging = false;
        
        // Function to update slider position
        const updateSlider = (x) => {
            const rect = slider.getBoundingClientRect();
            // Calculate percentage (0 to 100)
            let percentage = ((x - rect.left) / rect.width) * 100;
            
            // Clamp value between 0 and 100
            percentage = Math.max(0, Math.min(100, percentage));
            
            // Update handle position
            // Using requestAnimationFrame for smooth UI updates
            requestAnimationFrame(() => {
                handle.style.left = `${percentage}%`;
                
                // Update clip-path of the Top Layer (After Image)
                // We want "Before" (bottom) on Left, "After" (top) on Right.
                // So "After" is clipped on the LEFT side by the percentage.
                // inset(top right bottom left)
                // inset(0 0 0 50%) means 50% from left is hidden (so right half is visible)
                imgAfter.style.clipPath = `inset(0 0 0 ${percentage}%)`;
            });
        };
        
        // Mouse Events
        const onMouseDown = (e) => {
            isDragging = true;
            updateSlider(e.clientX);
            slider.style.cursor = 'grabbing';
            handle.style.cursor = 'grabbing';
        };
        
        const onMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent selection
            updateSlider(e.clientX);
        };
        
        const onMouseUp = () => {
            isDragging = false;
            slider.style.cursor = 'col-resize';
            handle.style.cursor = 'col-resize';
        };
        
        // Touch Events
        const onTouchStart = (e) => {
            isDragging = true;
            updateSlider(e.touches[0].clientX);
        };
        
        const onTouchMove = (e) => {
            if (!isDragging) return;
            // e.preventDefault(); // Optional: prevent scrolling while dragging horizontally
            updateSlider(e.touches[0].clientX);
        };
        
        const onTouchEnd = () => {
            isDragging = false;
        };
        
        // Event Listeners on the Slider Container
        slider.addEventListener('mousedown', onMouseDown);
        slider.addEventListener('touchstart', onTouchStart, { passive: true });
        
        // Global events to handle dragging outside container
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd);
        
        // Initial State (50%)
        // We can just set styles directly or call updateSlider with center point
        // But simpler to just set initial styles in CSS (already done) or JS
        // imgAfter.style.clipPath = 'inset(0 0 0 50%)';
        // handle.style.left = '50%';
    });
});
