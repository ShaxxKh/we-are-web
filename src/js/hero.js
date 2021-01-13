let heroTextCarousel = $(".carousel-text");
let heroImgCarousel = $(".carousel-images");

$(document).ready(function(){
    heroTextCarousel.owlCarousel( {
        items:1,
        margin: 100,
        autoplay: true,
        loop: true,
        autoplayTimeout: 3000,
        stageClass: 'hero__carousel-text',
        animateOut: 'fadeOut',
        animateIn: 'animate__fadeIn',
    });
    heroImgCarousel.owlCarousel({
      items:1,
        margin: 100,
        autoplay: true,
        loop: true,
        autoplayTimeout: 3000,
        stageClass: 'hero__carousel-images',
        animateOut: 'animate__fadeOutUp',
    })
  });

  function contacts() {
      let contactsBtnOpen = document.querySelectorAll('.contacts--open');
      let contactsBtnClose = document.querySelectorAll('.contacts--close');
      let socialMediaLinks = document.querySelectorAll('.social-media__link');
      contactsBtnOpen.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          socialMediaLinks.forEach((link) => {
            link.style.opacity = '1';
            link.style.pointerEvents = 'auto';
          })
          contactsBtnClose.forEach((closeBtn) => {
            closeBtn.style.opacity = '1';
            closeBtn.style.zIndex = '1';
          })
        });
      });
      contactsBtnClose.forEach((btn) => {
        btn.addEventListener('click', () => {
          socialMediaLinks.forEach((link) => {
            link.style.opacity = '0';
            link.style.pointerEvents = 'none';
          })
          btn.style.opacity = '0';
          btn.style.zIndex = '-1';
        })
      })
  }

  let hero = document.querySelector('.hero');
  let catalogue = document.querySelector('.catalogue');
  hero.addEventListener('wheel', (e) => {
    let delta = null
    let direction
    if (e.wheelDelta) {
      delta = e.wheelDelta / 60;
    }
    if (delta !== null) {
      direction = delta > 0 ? 'up' : 'down'; 
    }

    if (direction === 'down') {
      hero.style.transform = "translate3d(0, -100%, 0)";
    }
  });

  catalogue.addEventListener('wheel', (e) => {
    let delta = null
    let direction
    if (e.wheelDelta) {
      delta = e.wheelDelta / 60;
    }
    if (delta !== null) {
      direction = delta > 0 ? 'up' : 'down'; 
    }

    if (direction === 'down') {
      catalogue.style.transform = "translate3d(0, -100%, 0)";
    } else if (direction === 'up') {
      hero.style.transform = "translate3d(0, 0, 0)";
    }
  });
  
  console.log($('body').scrollTop());
  console.log($('.catalogue').height())
  contacts();
