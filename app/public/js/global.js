var countToasts = 0;
const THEME = {
    DEFAULT: 'theme-default',
    DARK: 'theme-dark',
    RED: 'theme-red',
    GREEN: 'theme-green',
    BLUE: 'theme-blue'
}

const themeColors = [
    { type: THEME.RED, name: 'Red', color: 'red' },
    { type: THEME.GREEN, name: 'Green', color: 'green' },
    { type: THEME.BLUE, name: 'Blue', color: 'blue' }
]

const openSidebar = (event) => {
    document.getElementsByClassName("sidebar")[0].classList.remove("sidebar-hide");
    stopPropagation(event);
}
  
const closeSideBar = (event) => {
    document.getElementsByClassName("sidebar")[0].classList.add("sidebar-hide");
    stopPropagation(event);
}

const stopPropagation = (event) => {
    if(event) {
        event.stopPropagation();
    }
}

const setActiveMenuItem = () => {
    let splitPath = window.location.pathname.split("/");
    let path = (splitPath[splitPath.length - 1]).replace(".html", "");

    if(path == "index") {
        document.getElementById("form-item").classList.add("active");
    } else {
        document.getElementById("listusers-item").classList.add("active");
    }
}

const clickOutsideMenu = () => {
    document.getElementsByTagName("html")[0].addEventListener("click", function() { 
        closeSideBar();
    });

    document.getElementsByTagName("body")[0].addEventListener("click", function() { 
        closeSideBar();
    });
}

const showLoading = () => {
    let button = document.querySelector("form button");
    button.classList.add("loading");
}

const hideLoading = () => {
    let button = document.querySelector("form button");
    button.classList.remove("loading");
}

const showToast = (message) => {
    let toast = document.querySelector(".toast-success");
    let toastMessage = document.querySelector(".toast-success .toast-message");
    toastMessage.innerText = message;

    toast.classList.remove("toast-hide");
    countToasts += 1;

    setTimeout(() => {
        if(countToasts === 1) {
            hideToast();
        }

        countToasts -= 1;
    }, 2000);
}

const hideToast = () => {
    let toast = document.querySelector(".toast-success");
    toast.classList.add("toast-hide");
}

document.addEventListener("DOMContentLoaded", (event) => {
    setActiveMenuItem();
    clickOutsideMenu();

    let sidebar = document.getElementsByTagName('nav')[0];
    let menuIconSidebar = document.querySelector('.sidebar .menu-icon i');
    let menuIconHeader = document.querySelector('header .menu-icon i');
    
    menuIconSidebar.addEventListener("click", (event) => {
        closeSideBar(event);
    })

    menuIconHeader.addEventListener("click", (event) => {
        openSidebar(event)
    })

    sidebar.addEventListener("click", (event) => {
        stopPropagation(event)
    })
})

const checkSwicth = (element) => {
    if (element.checked) {
        changeAttributeDataTheme(THEME.DARK);
    } else {
        changeAttributeDataTheme(THEME.DEFAULT);
    } 
}

const initSwitch = (element) => {
    let theme = localStorage.getItem('data-theme');

    if(!theme || theme == THEME.DEFAULT) {
        element.checked = false;
    } else {
        element.checked = true;
    }
}

const generateDropdownTheme = (element) => {
    const dropdownThemeContent = document.querySelector('#theme-colors .dropdown-content');

    themeColors.forEach((theme) => {
        let dropdownItemElement = document.createElement('a');
        dropdownItemElement.addEventListener('click', (e) => {
            changeAttributeDataTheme(theme.type);
            changeThemeSwitch(document.querySelector('.toggle-switch input[type="checkbox"]'), true);
        }, false);
        dropdownItemElement.innerText = theme.name;

        dropdownThemeContent.appendChild(dropdownItemElement);
    })
}

function changeAttributeDataTheme(themeType) {
    document.documentElement.setAttribute('data-theme', themeType || THEME.DEFAULT);
    localStorage.setItem('data-theme', themeType || THEME.DEFAULT);
}

function changeThemeSwitch(element, hasChangeCustomTheme) {
    if(hasChangeCustomTheme) {
        element.checked = false;
    } else {
        checkSwicth(element);
    }
}

function loadTheme() {
    const themeType = localStorage.getItem('data-theme');
    changeAttributeDataTheme(themeType);

    if(themeType == THEME.DEFAULT || themeType == THEME.DARK) {
        initSwitch(document.querySelector('.toggle-switch input[type="checkbox"]'));
    }
}

module.exports = {
    showLoading: showLoading,
    hideLoading: hideLoading,
    showToast: showToast,
    hideToast: hideToast
}