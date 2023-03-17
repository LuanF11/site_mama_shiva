const navbarHeroHamburger = document.querySelector('.navbar--hamburger');
const navbarFixed = document.querySelector('.navbar--fixed');
const aside = document.querySelector('.aside--body');
const asideCloseButton = document.querySelector('.aside--close');
const asideLink = document.querySelectorAll('.aside--item');
const faq = document.querySelectorAll('.informations--faq-card-header');
const windowHeight = window.innerHeight;

const openAside = () => {
  aside.classList.remove("hidden")
}

const closeAside = () => {
  aside.classList.add("hidden")
}

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;

  if (scrollTop > windowHeight) {
    // Após o fold
    navbarFixed.classList.remove("hidden")
  } else {
    // Antes do fold
    navbarFixed.classList.add("hidden")
  }
});

navbarHeroHamburger.addEventListener('click', () => { openAside() })
navbarFixed.addEventListener('click', () => { openAside() })

