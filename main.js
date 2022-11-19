console.log('Sullana Express');

let currentIndex = '0';
let sliderBusy = false;
let sliderAutomatic = false;
let slideAutomaticTimeId = 0;

function onSlideTransitionEnd(params, evt) {
  let slideNew = params[0];
  let slideCurrent = params[1];

  slideNew.removeEventListener('transitionend', slideNew.__transitionEndBinded);
  slideNew.__transitionEndBinded = null;

  slideNew.classList.remove('slide-transition');
  slideNew.classList.remove('from-left');
  slideNew.classList.remove('from-right');
  slideCurrent.classList.remove('active');

  sliderBusy = false;
  sliderAutomatic = false;

  sliderAutomaticStart();
}

function onPaginatorClick(evt) {
  if (sliderBusy) return;
  sliderBusy = true;

  clearTimeout(slideAutomaticTimeId);

  let dot = evt.target;
  let index = dot.getAttribute('data-index');
  let direction = sliderAutomatic || parseInt(index) > parseInt(currentIndex) ? 'right' : 'left';

  let slideNew = document.querySelector(`.hero-slider .slide-${index}`);
  let slideCurrent = document.querySelector(`.hero-slider .slide-${currentIndex}`);
  currentIndex = index;

  slideNew.classList.add(`from-${direction}`);

  setTimeout(function () {
    slideNew.classList.add('slide-transition');
    slideNew.__transitionEndBinded = onSlideTransitionEnd.bind(this, [slideNew, slideCurrent]);
    slideNew.addEventListener('transitionend', slideNew.__transitionEndBinded);

    setTimeout(function () {
      slideNew.classList.add('active');
    }, 100);
  }, 100);

  document.querySelector('.hero-slider .slider__paginator > span.active').classList.remove('active');
  dot.classList.add('active');
}

const paginator = document.querySelector('.hero-slider .slider__paginator');
document.querySelectorAll('.hero-slider .slide').forEach(function (slide, index) {
  let dot = document.createElement('span');
  dot.setAttribute('data-index', '' + index);
  paginator.appendChild(dot);
});
let dot = document.querySelector('.hero-slider .slider__paginator > span:first-child');
dot.classList.add('active');



const dots = document.querySelectorAll('.hero-slider .slider__paginator > span');

dots.forEach(function (dot) {
  console.log('ok');
  dot.addEventListener('click', onPaginatorClick);
});


function sliderAutomaticStart() {
  slideAutomaticTimeId = setTimeout(function () {
    if (sliderBusy) return;

    sliderAutomatic = true;

    let dotCurrent = document.querySelector('.hero-slider .slider__paginator > span.active');
    let dotNew = dotCurrent.nextElementSibling || dotCurrent.parentElement.firstElementChild;
    dotNew.click();
  }, 5000);
};

sliderAutomaticStart();
