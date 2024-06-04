document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
  
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  
    const slides = document.querySelectorAll('.slides img');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const indicators = document.querySelector('.indicators');
  
    let currentSlide = 0;
  
    slides.forEach((_, index) => {
      const span = document.createElement('span');
      span.addEventListener('click', () => goToSlide(index));
      indicators.appendChild(span);
    });
  
    function showSlide(n) {
      slides[currentSlide].style.display = 'none';
      indicators.children[currentSlide].classList.remove('active');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].style.display = 'block';
      slides[currentSlide].style.transform = 'translateX(0)';
      indicators.children[currentSlide].classList.add('active');
    }
  
    function goToSlide(n) {
      const direction = n > currentSlide ? 1 : -1;
      slides[currentSlide].style.transform = `translateX(${-direction * 100}%)`;
      showSlide(n);
    }
  
    prev.addEventListener('click', () => goToSlide(currentSlide - 1));
    next.addEventListener('click', () => goToSlide(currentSlide + 1));
  
    setInterval(() => goToSlide(currentSlide + 1), 5000);
  
    showSlide(0);
  });