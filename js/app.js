/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
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


// Add class 'active' to section when near top of viewport
function distanceBottomToTop(elem) {
    let distance = elem.getBoundingClientRect().bottom;
    if (distance >= 0) {
        return distance;
    }
    else {
        // if distance is negative return very large positive number
        return Infinity;
    }
}

function toggleActiveSection() {
    let distances = [];
    for (let section of sections) {
        distances.push(distanceBottomToTop(section));
    }

    //console.log(...distances);

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
            if (sections[i].classList.contains('classactive-')) {
                sections[idx].classList.remove('active-class');
            }
        }
    }    
}

window.onscroll = toggleActiveSection();
// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


