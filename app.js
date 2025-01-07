const sliderFun = function () {
  let images = document.querySelectorAll(".slide");
  const rightBtn = document.querySelector(".right-side-btn");
  const leftBtn = document.querySelector(".left-side-btn");
  const dotContainer = document.querySelector(".dots");
  const slider = document.querySelector(".slider");
  let curr = 0;

  //Functions
  const moveSlide = function (curr) {
    images.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - curr)}%)`;
    });
  };

  const nextSlide = function () {
    curr++;
    if (curr == images.length) curr = 0;
    moveSlide(curr);
    activateDot(curr);
  };
  const previousSlide = function () {
    if (curr === 0) curr = images.length;
    curr--;
    moveSlide(curr);
    activateDot(curr);
  };

  const createDots = function () {
    images.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="btn-dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".btn-dot")
      .forEach((dot) => dot.classList.remove("dot-active"));
    document
      .querySelector(`.btn-dot[data-slide="${slide}"]`)
      .classList.add("dot-active");
  };
  const init = function () {
    moveSlide(curr);
    createDots();
    activateDot(curr);
  };

  init();
  rightBtn.addEventListener("click", nextSlide);
  leftBtn.addEventListener("click", previousSlide);

  // Keyboard Event
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") previousSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-dot")) {
      curr = Number(e.target.dataset.slide);
      moveSlide(curr);
      activateDot(curr);
    }
  });

  //Auto play: Slider
  let slides;
  const startInterval = function () {
    slides = setInterval(() => {
      curr++;
      if (curr == images.length) curr = 0;
      moveSlide(curr);
      activateDot(curr);
    }, 3000);
  };
  startInterval();
  stopInterval = function () {
    clearInterval(slides);
  };

  slider.addEventListener("mouseover", stopInterval);
  slider.addEventListener("mouseout", startInterval);
};

sliderFun();
