var menuBtn = document.getElementById("menuBtn");
var nav = document.getElementById("gnb");
var navLinkList = document.querySelectorAll(".navLink");
var header = document.querySelector(".header");
var showItemList = document.querySelectorAll(".section, .textCard, .skillCard, .workCard, .contactCard, .profileCard");

var HEADER_SCROLL_POINT = 10;
var ACTIVE_OFFSET = 140;

function toggleMenu() {
  if (nav.classList.contains("open")) {
    nav.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "메뉴 열기");
  } else {
    nav.classList.add("open");
    menuBtn.classList.add("open");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", "메뉴 닫기");
  }
}

function closeMenu() {
  nav.classList.remove("open");
  menuBtn.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "메뉴 열기");
}

function updateHeader() {
  if (window.scrollY > HEADER_SCROLL_POINT) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function updateActiveLink() {
  var i;
  var currentId = "";

  for (i = 0; i < navLinkList.length; i++) {
    var targetId = navLinkList[i].getAttribute("href");
    var section = document.querySelector(targetId);

    if (section) {
      var sectionTop = section.offsetTop - ACTIVE_OFFSET;
      var sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentId = targetId;
      }
    }
  }

  for (i = 0; i < navLinkList.length; i++) {
    navLinkList[i].classList.remove("active");

    if (navLinkList[i].getAttribute("href") === currentId) {
      navLinkList[i].classList.add("active");
    }
  }
}

function showOnScroll() {
  var i;

  for (i = 0; i < showItemList.length; i++) {
    var itemTop = showItemList[i].getBoundingClientRect().top;
    var windowPoint = window.innerHeight * 0.88;

    if (itemTop < windowPoint) {
      showItemList[i].classList.add("show");
    }
  }
}

function handleLinkClick() {
  var i;

  for (i = 0; i < navLinkList.length; i++) {
    navLinkList[i].addEventListener("click", function () {
      closeMenu();
    });
  }
}

function initPage() {
  updateHeader();
  updateActiveLink();
  showOnScroll();
  handleLinkClick();
}

menuBtn.addEventListener("click", toggleMenu);

window.addEventListener("scroll", function () {
  updateHeader();
  updateActiveLink();
  showOnScroll();
});

window.addEventListener("load", initPage);
window.addEventListener("resize", updateActiveLink);