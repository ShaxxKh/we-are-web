let preloadCarousel = $(".preload-carousel")
$(document).ready(function(){
    preloadCarousel.owlCarousel( {
        items:1,
        margin: 100,
        autoplay: true,
        loop: true,
        autoplayTimeout: 2000,
        stageClass: 'preload-carousel',
        animateIn:'animate__fadeIn',
        animateOut: 'animate__fadeOut',
    });
  });

let count = 0;
const percent = document.getElementById('loaded-percent');
const preloadPage = document.getElementById('preload-page');
const nav = document.querySelector('.nav');
const carousel = document.querySelector('.carousel-images');
const backgroundFirstText = document.querySelector('.background-text__first');
const backgroundSecondText = document.querySelector('.background-text__second');
const backgroundThirdText = document.querySelector('.background-text__third');

function timer() {
    setTimeout(() => {
        if(count !== 100) {
            count += 1;
            timer()
        } else {
            preloadPage.style.transform = "translate3d(0, -100%, 0)"
            setTimeout(() => {
                nav.style.opacity = '1';
                carousel.style.opacity = '1';
                backgroundThirdText.style.opacity = '1';
            }, 1000);
            setTimeout(() => {
                backgroundSecondText.style.opacity = '1';
            }, 1500);
            setTimeout(() => {
                backgroundFirstText.style.opacity = '1';
            }, 2000);
        }
    }, 50);
    if (count < 10) {
        percent.textContent = `0${count}%`;    
    } else {
        percent.textContent = `${count}%`;
    }
}

timer();
export { timer, preloadCarousel };
