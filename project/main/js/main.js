function scrollHeader() {
  const header = document.getElementById('header');

  if (this.scrollY >= 50) header.classList.add('scroll-header');
  else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

let swiperPopular = new Swiper('.popular__container', {
  spaceBetween: 32,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.add('active-link');
    } else {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');

  if (this.scrollY >= 350) scrollUp.classList.add('show-scroll');
  else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
});

sr.reveal(
  `.home__title, .popular__container, .subscribe__container, .footer__container`
);
sr.reveal(`.home__description, .footer__info`, { delay: 500 });
sr.reveal(`.home__search`, { delay: 600 });
sr.reveal(`.home__value`, { delay: 700 });
sr.reveal(`.home__images`, { delay: 800, origin: 'bottom' });
sr.reveal(`.logos__img`, { interval: 100 });
sr.reveal(`.value__images, .contact__content`, { origin: 'left' });
sr.reveal(`.value__content, .contact__images`, { origin: 'right' });
