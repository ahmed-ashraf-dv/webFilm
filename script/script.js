let btnser      = document.querySelector(".contain .text button"),
    inp         = document.querySelector(".contain .text input"),
    span        = document.querySelector(".contain h1 span"),
    divForSel   = document.querySelector(".lang-btn .lang"),
    selectBox   = document.querySelector(".lang .dropDown"),
    lis         = document.querySelectorAll(".dropDown ul li"),
    box         = document.querySelector(".contain .net"),
    DropSpan    = document.querySelector(".lang span"),
    nav         = document.querySelector("#nav");

// BackGround Nav On Scroll
window.addEventListener("scroll", function (){
    this.scrollY > 70 ? nav.style.backgroundColor = 'black'
     : nav.style.backgroundColor = 'transparent';
     setInterval(() => {cond()},10);
})
// If Scroll Becuse Animation
function cond(){
    if(window.scrollY >= 555){
        let arts = document.querySelectorAll(".net article");
        arts.forEach((art,index) =>{
            art.style.animation = `showArt 1s ease-in-out forwards alternate ${ 0.2 * index}s`
        })
      }  
}
// Click Btn If Inp != '' Scroll To #Show && Fecth Api
btnser.onclick = ()=>{
    if(inp.value !== ''){
        // Emp The Box
        box.innerHTML = "";
        // Fecth Api Page 1
        fetch(`https://www.omdbapi.com/?s=${inp.value}&?i=tt3896198&apikey=c3d23a7b`)
        .then(res => res.json())
        .then(data => {
            if(data.Response !== 'False'){
                data.Search.forEach(film =>{
                    box.innerHTML += `
                    <article>
                        <img src="${film.Poster}" alt="">
                        <p>${film.Title}</p>
                    </article>
                    `;
                })
            }else{
                // Error
                console.clear();
                box.innerHTML = `<p><span style='color:red'>${inp.value}</span> Not Found</p>`;
            }
    }).then(
        // Fecth Api Page 2
        fetch(`https://www.omdbapi.com/?s=${inp.value}&page=2&?i=tt3896198&apikey=c3d23a7b`)
        .then(res => res.json())
        .then(data => {
            if(data.Response !== 'False'){
                data.Search.forEach(film =>{
                    box.innerHTML += `
                    <article>
                        <img src="${film.Poster}" alt="">
                        <p>${film.Title}</p>
                    </article>
                    `;
                })
            }else{
                // Error
                console.clear();
                box.innerHTML = `<p><span style='color:red'>${inp.value}</span> Not Found</p>`;
            }
    })
    ).then(()=>{
        // Scroll To Box
        setTimeout(() => {
            window.scrollTo({top:555,behavior:"smooth"});
            span.textContent = inp.value;
        }, 1000);
    })
    }
}
// Custom Slect Box Acttive Class
divForSel.onclick = () =>{selectBox.classList.toggle("acctive")};
// Span Content
lis.forEach(li =>{li.addEventListener("click",() => DropSpan.textContent = li.textContent)});
// Press Enter To Search
window.onkeyup = e => e.keyCode === 13 ? btnser.click() : "";
// Show Films In Home
function Film() {
    fetch(`https://www.omdbapi.com/?s=wood&?i=tt3896198&apikey=c3d23a7b`)
        .then(res => res.json())
        .then(data => {
            data.Search.forEach(film =>{
                box.innerHTML += `
                <article>
                    <img src="${film.Poster}" alt="">
                    <p>${film.Title}</p>
                </article>
                `;
            })
    }).then(
        fetch(`https://www.omdbapi.com/?s=play&?i=tt3896198&apikey=c3d23a7b`)
        .then(res => res.json())
        .then(data => {
            data.Search.forEach(film =>{
                box.innerHTML += `
                <article>
                    <img src="${film.Poster}" alt="">
                    <p>${film.Title}</p>
                </article>
                `;
            })
    })).then(
        fetch(`https://www.omdbapi.com/?s=batman&?i=tt3896198&apikey=c3d23a7b`)
        .then(res => res.json())
        .then(data => {
            data.Search.forEach(film =>{
                box.innerHTML += `
                <article>
                    <img src="${film.Poster}" alt="">
                    <p>${film.Title}</p>
                </article>
                `;
            })
    }))
};
Film();