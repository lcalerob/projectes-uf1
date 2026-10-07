const movies = [
 {title:"The Last Show", genre:"drama", meta:"Drama · 124 min", cls:"m1", sessions:["17:30","20:00","22:30"]},
 {title:"Horizonte", genre:"scifi", meta:"Ciencia ficción · 118 min", cls:"m2", sessions:["16:45","19:15","21:50"]},
 {title:"Wild Hearts", genre:"animation", meta:"Animación · 96 min", cls:"m3", sessions:["16:00","18:20","20:40"]},
 {title:"Neon City", genre:"action", meta:"Acción · 110 min", cls:"m4", sessions:["17:10","19:40","22:10"]},
 {title:"Después de abril", genre:"drama", meta:"Drama · 105 min", cls:"m5", sessions:["18:00","20:30"]},
 {title:"Orbit", genre:"scifi", meta:"Ciencia ficción · 130 min", cls:"m6", sessions:["17:20","21:00"]},
 {title:"Velocidad", genre:"action", meta:"Acción · 112 min", cls:"m7", sessions:["16:30","19:00","22:20"]},
 {title:"Moonlight", genre:"animation", meta:"Animación · 101 min", cls:"m8", sessions:["15:50","18:15","20:55"]}
];

const grid = document.getElementById("movieGrid");
function renderMovies(filter="all"){
  grid.innerHTML = movies.filter(m=>filter==="all"||m.genre===filter).map(m=>`
    <article class="movie">
      <div class="poster ${m.cls}"><span class="poster-title">${m.title}</span></div>
      <div class="movie-info">
        <h3>${m.title}</h3>
        <div class="meta"><span>${m.meta}</span><span>·</span><span>+12</span></div>
        <div class="sessions">${m.sessions.map(s=>`<button class="session" data-session="${s}" data-movie="${m.title}">${s}</button>`).join("")}</div>
      </div>
    </article>`).join("");
}
renderMovies();

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active"); renderMovies(btn.dataset.filter);
  });
});
document.querySelectorAll(".day").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".day").forEach(b=>b.classList.remove("active")); btn.classList.add("active");
    showToast("Cartelera actualizada para "+btn.querySelector("span").textContent);
  });
});

const modal=document.getElementById("modal");
function openModal(){modal.classList.add("open")}
document.getElementById("locationBtn").onclick=openModal;
document.getElementById("citySelect").onclick=openModal;
document.getElementById("closeModal").onclick=()=>modal.classList.remove("open");
modal.addEventListener("click",e=>{if(e.target===modal) modal.classList.remove("open")});
document.addEventListener("click",e=>{
  if(e.target.classList.contains("session")) showToast(`${e.target.dataset.movie} · ${e.target.dataset.session} — demo de compra`);
});
document.getElementById("promoBtn").onclick=()=>showToast("Aquí iría el listado completo de promociones.");
document.getElementById("newsletterForm").addEventListener("submit",e=>{
  e.preventDefault(); showToast("¡Suscripción realizada! (demo)");
  e.target.reset();
});
function showToast(msg){
 const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show");
 clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>t.classList.remove("show"),2600);
}
