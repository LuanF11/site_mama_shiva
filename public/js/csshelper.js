const navbar = document.querySelector('.navbar');
const navbarLogo = document.querySelector('.navbar--logo');
const navbarHamburger = document.querySelector('.navbar--hamburger');
const windowHeight = window.innerHeight;
const logoHeight = navbarLogo.offsetHeight;


// Esconde a logo quando o scroll ultrapassa o fold
window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset;
  const logoTop = navbarLogo.getBoundingClientRect().top + scrollTop;

  if (logoTop > windowHeight) {
    navbar.style.justifyContent = "end";
    navbarLogo.style.display = "none"
    navbarHamburger.classList.add("navbar--hamburger-background");
} else {
    navbar.style.justifyContent = "space-between";
    navbarLogo.style.display = "block"
    navbarHamburger.classList.remove("navbar--hamburger-background");
  }
});
