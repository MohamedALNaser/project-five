let landingPage = document.querySelector('.landing-page');
setInterval(() => {
    let randomNumber = Math.floor(Math.random() * 10);

    let imgesBackground = `./../imgs/1920x1080/0${randomNumber}.jpg`;
    landingPage.style.backgroundImage = `url(${imgesBackground})`;
    landingPage.style.transition = ' 0.5s';
}, 30000);

let settingBox = document.querySelector('.setting-box');
let toggleSetting = document.querySelector('.toggle-setting');
let settingIcon = document.querySelector('.setting-box i');
toggleSetting.addEventListener('click', () => {
    settingBox.classList.toggle('open');
    settingIcon.classList.toggle('fa-spin');
})