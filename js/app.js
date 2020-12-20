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
        listItem.textContent = section.dataset.nav;
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
const navi = document.querySelector('#navbar__list');
navi.addEventListener('click', function(event) {
    let id = event.target.textContent.toLowerCase().replace(/\s+/g, '');
    document.getElementById(id).scrollIntoView({
        behaviour: "smooth"
    });
});

