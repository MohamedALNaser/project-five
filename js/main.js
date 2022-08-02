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
let liInputNumberValue = document.querySelector(".setting-box .setting-container .option-box .colors h4 span input");
let liColorsLength = Number(liInputNumberValue.value);
let setLiColorsNumberValueBtn = document.querySelector(".setting-box .setting-container .option-box .colors h4 span.setValueButton")

// ##################################################################
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
            console.log()
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
    window.localStorage.setItem("active-color-index", activeLiColor);
    document.documentElement.style.setProperty('--main-color', colorsList[activeLiColor]);
    // click li to select change the main color
    liColor.forEach((li, j) => {
        li.addEventListener("click", () => {
            console.log(j)
            liColor.forEach((e) => {
                e.classList.remove("active");
            });
            li.classList.toggle("active");
            window.localStorage.setItem("active-color-index", j); //add the selected li to loacal storge
            document.documentElement.style.setProperty('--main-color', colorsList[j]);
        });
    });

}
addLiColorsOption(liColorsLength);
setLiColorsNumberValueBtn.addEventListener("click", () => {
    LicolorsOptionList.innerHTML = "";
    liColorsLength = Number(liInputNumberValue.value);
    addLiColorsOption(liColorsLength);
})

// ##################################################################
// random backgrund image
// check random background option in local storge

let landingPage = document.querySelector(".landing-page");
let randowmLi = document.querySelectorAll(".setting-box .setting-container .option-box .random-background ul.random-list li");
let randomOption = window.localStorage.getItem("randomOption");
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
    randowmLi[0].classList.add("active");
    randowmLi[1].classList.remove("active");
    window.localStorage.setItem("randomOption", "YES");
    randomOption = "YES";
    randomBackg = setInterval(randomBackground, setIntervalDuration, randomOption);

} else {
    randowmLi[1].classList.add("active");
    randowmLi[0].classList.remove("active");
    imgesBackground = `imgs/0${(bgForOptNo) || 1 }.jpg`;
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
    console.log("back number ", bgForOptNo);

});
// ##################################################################