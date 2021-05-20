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


const circles = document.querySelectorAll('.circle');
const homeRect = home.getBoundingClientRect();
window.addEventListener('load', () => {

    circles.forEach((circle) => {
        const sizeInt = getRandomInt(10, 150);
        circle.style.width = `${sizeInt}px`;
        circle.style.height = `${sizeInt}px`;
        // const circleRect = circle.getBoundingClientRect();
        // const coorXInt = getRandomInt(homeRect.width, circleRect.width); 
        // const coorYInt = getRandomInt(homeRect.height, circleRect.height); 
        // circle.style.transform = `translate(${coorXInt}px, ${coorYInt}px)`;

        circle.addEventListener('mouseenter', () => {
            // circle.style.backgroundColor = `rgb(${getRandomInt(0,255)}, ${getRandomInt(0,255)}, ${getRandomInt(0,255)})`

            circle.style.borderColor = `rgb(${getRandomInt(0,255)}, ${getRandomInt(0,255)}, ${getRandomInt(0,255)})`;
        });
      
    });
});


  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
   }








//1.모든 섹션 요소들과 메뉴아이템들을 가지고 온다
//2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.


const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];
 const sections = sectionIds.map(id => document.querySelector(id));
 const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
console.log(sections);
console.log(navItems);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}


function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        console.log(entry.target.id);
        if(!entry.isIntersecting && entry.intersectionRatio > 0) { //진입하지 않을떄
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // console.log(index);
     
            
            if(entry.boundingClientRect.y < 0) { //스크롤링이 아래로 되어서 페이지가 올라옴
                selectedNavIndex = index + 1;
            } else { //y가 플러스일떄,
                selectedNavIndex = index - 1;
            }
          
        } 
    });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    // console.log(window.scrollY);
    // console.log(window.innerHeight);
    // console.log(document.body.clientHeight);
    if(window.scrollY === 0) { //첫번째와 마지막 섹션이 안집히는 것 해결
        selectedNavIndex = 0;
    } else if (Math.ceil(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
        selectedNavIndex = navItems.length - 1; //5
    }
    selectNavItem(navItems[selectedNavIndex]);
});