'use strice';

//Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

const navbarMenu = document.querySelector('.navbar__menu');
const contact_btn = document.querySelector('.home__contact');
const contact = document.querySelector('#contact');

navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
       if(link == null) {
           return;
       }
       const scrollTo = document.querySelector(link);
       scrollTo.scrollIntoView({behavior: 'smooth'});

});
contact_btn.addEventListener('click', () => {
    // window.scrollTo({top: 200, behavior: 'smooth'});
    contact.scrollIntoView({behavior: 'smooth'});
});
