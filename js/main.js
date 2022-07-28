// ##################################################################
// show setting-box
let settingBox = document.querySelector(".setting-box");
let toggleSetting = document.querySelector(".toggle-setting");
let settingIcon = document.querySelector(".setting-box i");
toggleSetting.addEventListener("click", () => {
    settingBox.classList.toggle("open");
    settingIcon.classList.toggle("fa-spin");
});
// ##################################################################

// create li-colors list changing the main color in the page
let numberLi = 10;
let colorsDiv = document.querySelector(
    ".setting-box .setting-container .option-box .colors .colors-list"
);
let colorsList = [
    "#ff9800",
    "#f44336",
    "#e91e63",
    "#8bc34a",
    "#9c27b0",
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

for (let i = 0; i < numberLi; i++) {
    let li = document.createElement("li");
    li.classList.add(`color-${i}`);
    li.style.backgroundColor = colorsList[i];
    colorsDiv.appendChild(li);
}


//select li-color
let liColor = document.querySelectorAll(
    ".setting-box .setting-container .option-box .colors .colors-list li"
);
//check if active-color local storge is exist or not 
//add loacl storge to save colors
let activeColor = window.localStorage.getItem("active-color");
if (activeColor) {
    if (activeColor > numberLi) {
        activeColor = 0;
    }
    liColor[activeColor].classList.add("active");
    document.documentElement.style.setProperty('--main-color', colorsList[activeColor]);
} else {
    liColor[0].classList.add("active");
    window.localStorage.setItem("active-color", 0)
    document.documentElement.style.setProperty('--main-color', colorsList[0]);
}
// click li to select change the main color
liColor.forEach((li, j) => {
    li.addEventListener("click", () => {
        console.log(j)
        liColor.forEach((e) => {
            e.classList.remove("active");
        });
        li.classList.toggle("active");
        window.localStorage.setItem("active-color", j); //add the selected li to loacal storge
        document.documentElement.style.setProperty('--main-color', colorsList[j]);
    });
});
// ##################################################################
// random backgrund image
// check random background option in local storge

let landingPage = document.querySelector(".landing-page");
let randowmLi = document.querySelectorAll(".setting-box .setting-container .option-box .random-background ul.random-list li");
let randomOption = window.localStorage.getItem("randomOption");
let backgroundSetNo = window.localStorage.getItem("backgroundSetNo");
let setIntervalDuration = 10000;
let randomBackg;
let randomNumber;
let imgesBackground;
const randomBackground = (randomOption) => {
    if (randomOption === "NO") {
        clearInterval(randomBackg);
        return 0;
    }
    randomNumber = Math.floor(Math.random() * 5);
    backgroundSetNo = randomNumber;
    window.localStorage.setItem("backgroundSetNo", backgroundSetNo);
    imgesBackground = `./../imgs/1920x1080/0${backgroundSetNo}.jpg`;
    landingPage.style.backgroundImage = `url(${imgesBackground})`;
    landingPage.style.transition = " 0.3s";
}

if (randomOption === null || randomOption === "YES") {
    randowmLi[0].classList.add("active");
    randowmLi[1].classList.remove("active");
    window.localStorage.setItem("randomOption", "YES");

    randomOption = "YES";
    randomBackg = setInterval(randomBackground, setIntervalDuration, randomOption);

} else {
    randowmLi[1].classList.add("active");
    randowmLi[0].classList.remove("active");
    imgesBackground = `./../imgs/1920x1080/0${(backgroundSetNo) || 1 }.jpg`;
    landingPage.style.backgroundImage = `url(${imgesBackground})`;
    landingPage.style.transition = " 0.3s";

    window.localStorage.setItem("randomOption", "NO");
    randomOption = "NO";
}
randowmLi[0].addEventListener("click", () => {
    randowmLi[0].classList.add("active");
    randowmLi[1].classList.remove("active");
    window.localStorage.setItem("randomOption", "YES");
    randomOption = "YES";
    randomBackg = setInterval(randomBackground, setIntervalDuration, randomOption);
})
randowmLi[1].addEventListener("click", () => {
    randowmLi[1].classList.add("active");
    randowmLi[0].classList.remove("active");
    window.localStorage.setItem("randomOption", "NO");

    randomOption = "NO";
    clearInterval(randomBackg)
    console.log("back number ", backgroundSetNo);
    setTimeout(() => {
        location.reload();
    }, 2000);

});
// ##################################################################