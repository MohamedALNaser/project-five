// ##################################################################
// show setting-box
let settingBox = document.querySelector(".setting-box");
let toggleSetting = document.querySelector(".toggle-setting");
let settingIcon = document.querySelector(".setting-box i");
toggleSetting.addEventListener("click", () => {
    settingBox.classList.toggle("open");
    settingIcon.classList.toggle("fa-spin");
});

let liInputNumberValue = document.querySelector(".setting-box .setting-container .option-box .colors .colors-head  span input");
let liColorsLength = Number(liInputNumberValue.value);
let liColorsLengthLocal = window.localStorage.getItem("li-colors-length");
let setLiColorsNumberValueBtn = document.querySelector(".setting-box .setting-container .option-box .colors .colors-head span.setValueButton")

// create li-colors list changing the main color in the page
let LicolorsOptionList = document.querySelector(
    ".setting-box .setting-container .option-box .colors .colors-list"
);


const addLiColorsOption = function(liColorsLength) {
    let colorsList = [
        "#ff9800",
        "#f44336",
        "#e91e63",
        "#8bc34a",
        "#9c27b0",
        "#ca8e00",
        "#3f51b5",
        "#009688",
        "#2196f3",
        "#03a9f4",
        "#00bcd4",
        "#ff5722",
        "#009688",
        "#673ab7",
        "#4caf50",
        "#cddc39",
        "#ffeb3b",
        "#ffc107",
        "#795548",
        "#9e9e9e",
        "#607d8b",
        "#7b5300",
        "#0f3a48",
        "#19576c",
        "#b2aba1",
        "#50051d",
        "#3391ffd1",
        "#404400d6",
        "#8c9506d6"
    ];

    //check if active-color local storge is exist or not 
    //add loacl storge to save colors
    let activeLiColor = Number(window.localStorage.getItem("active-color-index"));

    if (activeLiColor) {
        if (+activeLiColor >= +liColorsLength) {
            // let temp = +activeLiColor + 1; // 2 is one item 

            // liColorsLength = temp;
            // liInputNumberValue.value = temp;
            // activeLiColor = temp - 1;
            activeLiColor = liColorsLength - 1;

        }
    } else {
        activeLiColor = 0;
    }

    for (let i = 0; i < liColorsLength; i++) {
        let li = document.createElement("li");
        li.classList.add(`color-${i}`);
        li.style.backgroundColor = colorsList[i];
        LicolorsOptionList.appendChild(li);
    }



    //select li-color
    let liColor = document.querySelectorAll(
        ".setting-box .setting-container .option-box .colors .colors-list li"
    );
    liColor[activeLiColor].classList.add("active");
    active(liColor, liColor[activeLiColor]);
    window.localStorage.setItem("active-color-index", activeLiColor);
    document.documentElement.style.setProperty('--main-color', colorsList[activeLiColor]);
    // click li to select change the main color
    liColor.forEach((li, j) => {
        li.addEventListener("click", () => {
            active(liColor, li);
            window.localStorage.setItem("active-color-index", j); //add the selected li to loacal storge
            document.documentElement.style.setProperty('--main-color', colorsList[j]);
        });
    });

}

if (liColorsLengthLocal !== null) {
    liInputNumberValue.value = liColorsLengthLocal;
    liColorsLength = liColorsLengthLocal;
} else {
    liColorsLength = Number(liInputNumberValue.value);
    liColorsLengthLocal = liColorsLength;
    window.localStorage.setItem("li-colors-length", liColorsLengthLocal);
}

addLiColorsOption(liColorsLength);
setLiColorsNumberValueBtn.addEventListener("click", () => {
    LicolorsOptionList.innerHTML = "";
    liColorsLength = Number(liInputNumberValue.value);
    liColorsLengthLocal = liColorsLength;
    window.localStorage.setItem("li-colors-length", liColorsLengthLocal);
    addLiColorsOption(liColorsLength);
})

// random backgrund image
// check random background option in local storge

let landingPage = document.querySelector(".landing-page");

let randowmLi = document.querySelectorAll(".setting-box .setting-container .option-box .random-background ul.random-list li");
let randomOption = window.localStorage.getItem("randomOption");

let bulletsOption = window.localStorage.getItem("bulletsOption");
let bulletsLi = document.querySelectorAll(".setting-box .setting-container .option-box .bullets-option ul.bullets-list li");

let resetOption = document.querySelector(".setting-box .setting-container .option-box .reset-option ul.reset-list li");

let bgForOptNo = window.localStorage.getItem("bgForOptNo");
let setIntervalDuration = 10000;
let randomBackg;
let randomNumber;
let imgesBackground;
const randomBackground = (randomOption) => {
    if (randomOption === "NO") {
        window.localStorage.setItem("bgForOptNo", bgForOptNo || 1);
        clearInterval(randomBackg);

        return 0;
    }
    randomNumber = Math.floor(Math.random() * 5);
    bgForOptNo = randomNumber;
    window.localStorage.setItem("bgForOptNo", bgForOptNo);
    imgesBackground = `imgs/0${bgForOptNo}.jpg`;
    landingPage.style.backgroundImage = `url(${imgesBackground})`;
    landingPage.style.transition = " 0.3s";
}

if (randomOption === null || randomOption === "YES") {
    active(randowmLi, randowmLi[0]);
    window.localStorage.setItem("randomOption", "YES");
    randomOption = "YES";
    randomBackg = setInterval(randomBackground, setIntervalDuration, randomOption);

} else {
    active(randowmLi, randowmLi[1]);
    imgesBackground = `imgs/0${(bgForOptNo) || 1 }.jpg`;
    landingPage.style.backgroundImage = `url(${imgesBackground})`;
    landingPage.style.transition = " 0.3s";

    window.localStorage.setItem("randomOption", "NO");
    randomOption = "NO";
}

randowmLi[0].addEventListener("click", () => {
    active(randowmLi, randowmLi[0]);
    window.localStorage.setItem("randomOption", "YES");
    randomOption = "YES";
    randomBackg = setInterval(randomBackground, setIntervalDuration, randomOption);
})
randowmLi[1].addEventListener("click", () => {
    active(randowmLi, randowmLi[1]);
    window.localStorage.setItem("randomOption", "NO");
    randomOption = "NO";
    clearInterval(randomBackg)

});


let bulletSection = document.querySelector(".bullets");


if (bulletsOption === "YES" || bulletsOption === null) {
    window.localStorage.setItem("bulletsOption", "YES");
    active(bulletsLi, bulletsLi[0]);
    bulletSection.style.display = "flex";
} else {
    window.localStorage.setItem("bulletsOption", "NO");
    active(bulletsLi, bulletsLi[1]);
    bulletSection.style.display = "none";
}

bulletsLi[0].addEventListener("click", () => {
    active(bulletsLi, bulletsLi[0]);
    bulletSection.style.display = "flex";
    window.localStorage.setItem("bulletsOption", "YES");
})
bulletsLi[1].addEventListener("click", () => {
    active(bulletsLi, bulletsLi[1]);
    bulletSection.style.display = "none";
    window.localStorage.setItem("bulletsOption", "NO");
})
if (localStorage.length !== 0) {
    resetOption.classList.add("active");

}
resetOption.onclick = () => {
    window.localStorage.clear();
    window.location.reload();
}

// ##################################################################
let bullets = document.querySelectorAll(".bullets .nav-bullet");
let links = document.querySelectorAll(".links a");

function scrollToSection(sections) {
    sections.forEach((section) => {
        section.addEventListener("click", (e) => {
            e.preventDefault();
            if (section.dataset.section !== undefined) {
                document.querySelector(`.${section.dataset.section}`).scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest"
                });
            }
        })
    })
}

scrollToSection(bullets);
scrollToSection(links);

// ##################################################################

/// our skills animation
let skills = document.querySelector(".skills");
let spans = document.querySelectorAll(".skills .container .skill-box .percentage span");
window.onscroll = function() {
    // console.log((skills.offsetTop + skills.offsetHeight - this.innerHeight) + "===" + window.scrollY);
    if (window.scrollY >= (skills.offsetTop + (0.5 * skills.offsetHeight) - this.innerHeight)) {
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.width = span.dataset.precet;
                span.innerHTML = span.dataset.precet;
            }, index * 1500);
        })
    }
}

// ##################################################################

/// our Gallery popup box 
// let GAllery= document.querySelector(".Gallery");
let GalleryImages = document.querySelectorAll(".Gallery .Gallery-box img");
GalleryImages.forEach((img, i) => {
    img.addEventListener("click", (e) => {
        let overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        let popupBox = document.createElement("div");
        popupBox.classList.add("popup-box");

        let popupImgTitle = document.createElement("h3");
        popupImgTitle.innerHTML = img.alt || "default";

        let popupImg = document.createElement("img");
        popupImg.src = img.src;

        let closeBotton = document.createElement("span");
        closeBotton.textContent = "X";
        closeBotton.classList.add("close-botton");
        let leftBotton = document.createElement("span");
        leftBotton.textContent = "<";
        leftBotton.classList.add("left-botton");
        let rightBotton = document.createElement("span");
        rightBotton.textContent = ">";
        rightBotton.classList.add("right-botton");

        if (i === GalleryImages.length - 1) {
            rightBotton.style.opacity = "0.6";
        }
        if (i === 0) {
            leftBotton.style.opacity = "0.6";
        }
        closeBotton.onclick = () => {
            closeBotton.parentElement.parentElement.remove();
        }
        leftBotton.onclick = () => {
            rightBotton.style.opacity = "1";
            if (i - 1 >= 0) {
                popupImg.src = GalleryImages[i - 1].src;
                popupImgTitle.innerHTML = GalleryImages[i - 1].alt || "default";
                leftBotton.style.opacity = "1";
                i -= 1;
            }
            if (i === 0) {
                leftBotton.style.opacity = "0.6";

            }
        }
        rightBotton.onclick = () => {
            leftBotton.style.opacity = "1";
            if (i + 1 < GalleryImages.length) {
                rightBotton.style.opacity = "1";
                popupImg.src = GalleryImages[i + 1].src;
                popupImgTitle.innerHTML = GalleryImages[i + 1].alt || "default";
                i += 1;
                if (i + 1 >= GalleryImages.length) {
                    rightBotton.style.opacity = "0.6";
                }
            }
        }
        popupBox.appendChild(popupImgTitle);
        popupBox.appendChild(closeBotton);
        popupBox.appendChild(leftBotton);
        popupBox.appendChild(rightBotton);
        popupBox.appendChild(popupImg);
        overlay.appendChild(popupBox);
        document.body.appendChild(overlay);
    })
})

// ##################################################################


function active(arr, item) {
    arr.forEach((e) => {
        e.classList.remove("active");
    });
    item.classList.toggle("active");

}


// ##################################################################

let menutogglePerant = document.querySelector(".landing-page .container .header-area .links-container ");
let menutoggle = document.querySelector(".landing-page .container .header-area .links-container .nav-icon");

let menu = document.createElement("div");
menu.classList.add("menu");

let linkItems = document.querySelectorAll(".landing-page .container .header-area .links-container li");

let linkItems576 = document.querySelectorAll(".landing-page .container .header-area .links-container .links li");
let linkItems786 = document.querySelectorAll(".landing-page .container .header-area .links-container .links li:nth-child(n+4):not(:last-child) ");
let loginItems992 = document.querySelectorAll(".landing-page .container .header-area .sign-up.login-btn li");


menutogglePerant.appendChild(menu);

function toggleMenu() {
    menu.classList.toggle("active");
}
menutoggle.addEventListener("click", toggleMenu);

function menuToggleItem(arr, arr2) {
    menu.innerHTML = "";
    arr2.forEach((item2) => {
        item2.classList.remove("hiden-menu-item");
    })
    arr.forEach((item) => {
        item.classList.add("hiden-menu-item");
    })
    let hidenMenuItems = document.querySelectorAll(".landing-page .container .header-area .links-container li.hiden-menu-item");

    hidenMenuItems.forEach((item) => {
        menu.appendChild(item.cloneNode(true));
    });
    let menuLinks = document.querySelectorAll(".landing-page .container .header-area .links-container .menu li.hiden-menu-item a");

    scrollToSection(menuLinks);

}
let flag = 0;

function addHidenMenu(windowWidth) {
    if (windowWidth < 576 && flag !== 1) {
        menuToggleItem(linkItems576, []);
        menuToggleItem(loginItems992, []);
        flag = 1;
    }
    if (windowWidth < 768 && windowWidth >= 576 && flag !== 2) {
        menuToggleItem(linkItems786, linkItems576);
        menuToggleItem(loginItems992, []);
        flag = 2;
    }
    if (windowWidth < 992 && windowWidth >= 768 && flag !== 3) {
        menuToggleItem(loginItems992, linkItems576);
        flag = 3;
    }
    if (windowWidth >= 992 && flag !== 0) {
        flag = 0;
        menuToggleItem([], linkItems576);
        menuToggleItem([], loginItems992);
    }


}

addHidenMenu(window.innerWidth);

window.addEventListener('resize', (e) => {
    addHidenMenu(window.innerWidth);

});

// ##################################################################