/**
 * 
 * Manipulating the DOM.
 * Programmatically building navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport 
 * upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

// Build menu
function buildNav() {
    const sections = document.querySelectorAll('section');
    const fragment = document.createDocumentFragment();
    for (let section of sections) {
        const listItem = document.createElement('li');
        const aItem = document.createElement('a');
        aItem.href = "#" + section.dataset.nav.toLowerCase().replace(/\s+/g, '');
        aItem.textContent = section.dataset.nav.slice(0,3) + " " + section.dataset.nav.slice(-1);

        listItem.appendChild(aItem);
        listItem.classList.add('menu__link');
        listItem.classList.add('.menu__link:hover');
        fragment.appendChild(listItem);
    }
    document.querySelector('#navbar__list').appendChild(fragment);
}

buildNav();

// Set sections as active
function distanceBottomToTop(elem) {
    let distance = elem.getBoundingClientRect().bottom;
    if (distance >= 0) {
        return distance;
    }
    else {
        // if distance is negative return very large number
        return Infinity;
    }
}

function toggleActiveSection() {
    const sections = document.querySelectorAll('section');
    let distances = [];
    for (let section of sections) {
        distances.push(distanceBottomToTop(section));
    }

    // get index of smalles positive distance 
    let idx = distances.indexOf(Math.min(...distances));
    
    for (let i = 0; i < sections.length; i++) {
        if (i == idx) {
            // add active class
            if (!sections[idx].classList.contains('active-class')) {
                sections[idx].classList.add('active-class');
            }
        }
        else {
            if (sections[i].classList.contains('active-class')) {
                sections[i].classList.remove('active-class');
            }
        }
    }
    distances = [];   
}

document.addEventListener('scroll', function(){
    toggleActiveSection();
});

/*
// Alternative
window.onscroll = function() {
    toggleActiveSection();
};
*/

// Scroll to section on link click
// Highlight active menu item on scroll
// code taken from: https://codepen.io/joxmar/pen/NqqMEg

// Cache selectors
let lastId;
const topMenu = $("#navbar__list");
const topMenuHeight = topMenu.outerHeight()+1;
// All list items
const menuItems = topMenu.find("a");
// Anchors corresponding to menu items
const scrollItems = menuItems.map(function(){
   var item = $($(this).attr("href"));
    if (item.length) { return item; }
});

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
    const href = $(this).attr("href");
    const offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 850);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
    // Get container scroll position
    const fromTop = $(this).scrollTop()+topMenuHeight;
    
    // Get id of current scroll item
    let cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
        return this;
    });
    
    // Get the id of the current element
    cur = cur[cur.length-1];
    const id = cur && cur.length ? cur[0].id : "";
    
    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
        .parent().removeClass("active")
        .end().filter("[href=#"+id+"]").parent().addClass("active");
    }
});