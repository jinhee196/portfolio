'use strict';

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


// Nav menu click
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
       if(link == null) {
           return;
       }
       navbarMenu.classList.remove('open');
       scrollIntoView(link);
});

//Navbar toggle button for small screen
const navToggleBtn = document.querySelector('.navbar__toggle-btn');
navToggleBtn.addEventListener('click', () => { 
    navbarMenu.classList.toggle('open');
});

// HomeContactBtn Click
const contact_btn = document.querySelector('.home__contact');
contact_btn.addEventListener('click', () => {
    scrollIntoView('#contact');
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
}


// Transparent Home
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;

    // //window.scrollY 가 0 일때, 즉 스크롤이 안됐을때:
    //     homeHeight이 800이라고 가정하면, 0 / 800 = 0,  1-0 = 1
    //     즉, opacity는 1이 된다.(불투명)

    // //window.scrollY 가 400일떄, 스크롤 중간) :
    //     400/800= 0.5, 1-0.5= 0.5, opacity = 0.5

    // //window.scrollY 가 800일때, 스크롤이 homeHeight밑으로 내려올때,
    //     800/800=1, 1-1=0, opacity = 0(완전투명)
    //     그 이후의 값도 마이너스가 되므로 계속 투명임.
    
    upScroll();
});

//Show "arrow up" button when scrolling down
const up = document.querySelector('#top');
function upScroll() {
    if(window.scrollY > homeHeight / 2) {
         up.classList.add('visible');
    } else {
        up.classList.remove('visible');
    }
}

//Handle click on the "arrow up" button
up.addEventListener('click', () => {
    scrollIntoView('#home');
});



//Projects
const workBtnCategories = document.querySelector('.work__categories');
const workProjects = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnCategories.addEventListener('click', (e) => {
    
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    // count button(span)을 누르면 undefined가 나오는 것 방지
    if(filter == null) {
        return;
    }

    //Remove selection from the previous item and select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');
    
    workProjects.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        workProjects.classList.remove('anim-out');
    }, 300);
   
});


