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

// Global variable
const naviHeight = $("#navbar__list").outerHeight() + 10 + 1; // 10 margin + 1

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
    // set default first nav item to active
    fragment.firstChild.classList.add('active');

    document.querySelector('#navbar__list').appendChild(fragment);
}

buildNav();

// Set <sections> as active as well as corresponding menu item
function distanceBottomToTop(elem) {
    let distance = elem.getBoundingClientRect().bottom - naviHeight;
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
    const navItems = document.querySelector('#navbar__list').childNodes;
    let distances = [];

    for (let section of sections) {
        distances.push(distanceBottomToTop(section));
    }

    // get index of smallest positive distance 
    let idx = distances.indexOf(Math.min(...distances));
    
    for (let i = 0; i < sections.length; i++) {
        if (i == idx) {
            // add active class
            if (!sections[idx].classList.contains('active-class')) {
                sections[idx].classList.add('active-class');
                navItems[idx].classList.add('active');
            }
        }
        else {
            if (sections[i].classList.contains('active-class')) {
                sections[i].classList.remove('active-class');
                navItems[i].classList.remove('active');
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
