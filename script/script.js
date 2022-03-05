// Helper Function
const toggleActiveClass = (el) => el.classList.toggle("active");

const navBar = document.querySelector("#nav");
const showNavBtn = document.querySelector("#toggleBtn");
const hideNavBtn = navBar.querySelector(".lang-btn > span");
const langBtn = navBar.querySelector(".lang-btn");

// Show navBar
showNavBtn.addEventListener("click", () => toggleActiveClass(langBtn));

// Hide navBar
hideNavBtn.addEventListener("click", () => toggleActiveClass(langBtn));

const onScrollHandelar = () => {
  // Get Cards
  let Cards = document.querySelectorAll(".net article");

  // Set Animate
  const setAnimate = (idx) =>
    `showArt 1s ease-in-out forwards alternate ${0.2 * idx}s`;

  // Add Animate to Card With Condition
  window.scrollY >= 555 &&
    Cards.forEach((Card, idx) => (Card.style.animation = setAnimate(idx)));

  // Change nav Bar backgroundColor
  const changeBackground = (value) => (navBar.style.backgroundColor = value);

  window.scrollY > 70
    ? changeBackground("black")
    : changeBackground("transparent");
};

// onScrollHandelar
window.addEventListener("scroll", onScrollHandelar);

// Call Some Login Onload
window.addEventListener("load", () => setApiHandelar("Home", onScrollHandelar));

// Set API Data Handelar
const viewSection = document.querySelector("#Show");
const cardsBox = document.querySelector(".contain .net");
const searchContent = document.querySelector(".contain h1 span");

const setApiHandelar = (searchValue, CB) => {
  // Some HTML
  const errorMsg = (value) =>
    (cardsBox.innerHTML = `<p><span style='color:red'>${value}</span> Not Found</p>`);

  const article = (Poster, Title) =>
    (cardsBox.innerHTML += `<article> <img src="${Poster}" alt=""> <p>${Title}</p> </article>`);

  // Check Search Vlue
  if (!searchValue) return errorMsg("Please Type Something");

  // First Page
  const APILink = `https://www.omdbapi.com/?s=${searchValue}&?i=tt3896198&apikey=c3d23a7b`;

  // Get Data
  fetch(APILink)
    .then((res) => res.json())
    .then((data) => {
      // Empty The Box
      cardsBox.innerHTML = "";

      // Check The Search Input
      data.Search
        ? data.Search.forEach(({ Poster, Title }) => article(Poster, Title))
        : errorMsg(searchValue);

      // Call Back Function
      CB?.();
    });
};

// Search Handelar
const searchForm = document.querySelector("#home form.text");

searchForm.addEventListener("submit", (e) => {
  // Stop Reload
  e.preventDefault();

  // Set Data
  setApiHandelar(searchForm.SearchInput.value, () => {
    viewSection.scrollIntoView({ behavior: "smooth" });
    searchContent.textContent = searchValue;
  });
});

// Custom Slect Box
const dropDownBtn = document.querySelector(".lang-btn .lang");
const dropDown = document.querySelector(".lang .dropDown");
const dropDownList = document.querySelectorAll(".dropDown ul li");
const dropDownSpan = document.querySelector(".lang span");

// Add Active Class
dropDownBtn.addEventListener("click", () => toggleActiveClass(dropDown));
// Selected
dropDownList.forEach((li) => {
  li.addEventListener("click", () => {
    dropDownSpan.textContent = li.textContent;
  });
});
