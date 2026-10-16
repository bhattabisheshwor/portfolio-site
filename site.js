/* Shared data, components and motion for every page.

   EDITING CHEAT SHEET
   - Project cards + covers: set cover:"images/projects/<id>/cover.jpg" on a project below.
     Empty cover ("") shows the coloured mockup instead.
   - New project: copy one object in PROJECTS, give it a new id and cats (any of "ui", "ux", "brand", "graphic"),
     then duplicate a project page of the same kind (e.g. ux4ux.html) as <id>.html and change data-project.
   - Art & photo gallery: each ART row is [type, colour, title, label, height ratio, image path].
     type is "art" or "photo". Put the image path last, e.g. "images/art/street-01.jpg".
   - Email, socials, services and testimonials are the lists right below.
   - Colours available for color:/tints: violet, butter, mint, sky, pink, peach. */
(function(){
"use strict";

/* ---------- data ---------- */
const PROJECTS = [
  {"id": "icolux", "name": "ICO-LUX", "cats": ["ui", "ux", "graphic"], "sub": "Digital design, research and illustration", "mock": "brand", "color": "butter", "services": ["UI Design", "UX Research", "Mascot Design", "Merch Design", "2D Illustration", "2D Animation"], "platform": "Web, Print, Motion", "type": "Digital & illustration", "featured": true, "caseLine": "UI design and UX research for ICO-LUX, with a mascot that carries through merch, illustration and 2D animation.", "live": "https://www.ico-lux.de/en", "case": true, "cover": "images/projects/icolux/cover.jpg", "tags": ["UI design", "UX research", "Graphic design"]},
  {"id": "saalebrands", "name": "Saalebrands", "cats": ["brand"], "sub": "Brand identity", "mock": "mark", "mono": "S", "color": "violet", "services": ["Brand Identity", "Logo Design"], "platform": "Brand", "type": "Branding", "featured": true, "cover": "images/projects/saalebrands/cover.jpg", "tags": ["Branding"]},
  {"id": "ux4ux", "name": "UX4UX", "cats": ["ui", "ux"], "sub": "Globally recognized ed-tech platform", "mock": "browser", "head": "Learn UX<br>the real way.", "color": "sky", "services": ["Website Design", "UX Research", "User-Centered Design", "User Study", "Illustration"], "platform": "Web", "type": "Ed-tech", "featured": true, "caseLine": "A learning platform for UX designers, shaped by user studies with learners and turned into a website with its own illustration style.", "case": true, "cover": "images/projects/ux4ux/cover.jpg", "tags": ["UI design", "UX research"]},
  {"id": "notar-trenck", "name": "Notar baron von der Trenck", "short": "Notar von der Trenck", "cats": ["brand"], "sub": "Brand identity for a notary office", "mock": "mark", "mono": "T", "color": "mint", "services": ["Brand Identity", "Logo Design"], "platform": "Brand", "type": "Notary", "featured": true, "cover": "images/projects/notar-trenck/cover.jpg", "tags": ["Branding"]},
  {"id": "mm-fraesen", "name": "MM Fräsen", "cats": ["brand"], "sub": "Brand identity for a milling company", "mock": "mark", "mono": "MM", "color": "peach", "services": ["Brand Identity", "Logo Design"], "featured": true, "platform": "Brand", "type": "Milling", "cover": "images/projects/mm-fraesen/cover.jpg", "tags": ["Branding"]},
  {"id": "buw", "name": "BUW App", "cats": ["ui", "ux"], "sub": "Bauhaus University app visualization", "mock": "phone", "color": "mint", "services": ["Mobile App", "UI/UX Case Study", "University App", "Student Guide"], "platform": "iOS & Android", "featured": true, "type": "Education", "caseLine": "A concept app that guides students through university life, from schedules to campus orientation, in one place.", "case": true, "cover": "images/projects/buw/cover.jpg", "tags": ["UI design", "UX research"]},
  {"id": "mst", "name": "mySecondTeacher", "cats": ["ui"], "sub": "Globally recognized ed-tech platform", "mock": "tv", "color": "sky", "services": ["Web App", "Website Design", "Responsive Design", "TV App Design", "Illustration"], "platform": "Web, TV", "type": "Ed-tech", "cover": "images/projects/mst/cover.jpg", "tags": ["UI design"]},
  {"id": "mero", "name": "meromomma", "cats": ["ui"], "sub": "All-purpose e-commerce for baby and mother", "mock": "phone", "color": "pink", "services": ["Website", "Mobile App", "Responsive Design", "UX Audit", "E-commerce"], "platform": "Web, Mobile", "type": "E-commerce", "cover": "images/projects/mero/cover.jpg", "tags": ["UI design"]},
  {"id": "midc", "name": "MIDC", "cats": ["ui"], "sub": "Reconstructing the website of construction", "mock": "browser", "head": "Built to<br>last.", "color": "peach", "services": ["Website Design", "Mobile App", "Microinteraction", "Responsive Design", "Website Redesign"], "platform": "Web, Mobile", "type": "Construction", "cover": "images/projects/midc/cover.jpg", "tags": ["UI design"]},
  {"id": "xuno", "name": "XUNO", "cats": ["ui"], "sub": "UI design", "mock": "browser", "head": "XUNO", "color": "violet", "services": ["UI Design"], "platform": "Digital", "type": "Digital product", "cover": "images/projects/xuno/cover.jpg", "tags": ["UI design"]},
  {"id": "jurtenmanufaktur", "name": "Jurtenmanufaktur", "cats": ["brand"], "sub": "Brand identity for a yurt maker", "mock": "mark", "mono": "J", "color": "butter", "services": ["Brand Identity", "Logo Design"], "platform": "Brand", "type": "Yurt making", "cover": "images/projects/jurtenmanufaktur/cover.jpg", "tags": ["Branding"]},
  {"id": "iisiichaa", "name": "IISIICHAA", "cats": ["brand", "ui"], "sub": "Brand and UI design for a community-driven company", "mock": "mark", "mono": "II", "color": "pink", "services": ["Brand Identity", "Voice & Tone", "UI Design"], "platform": "Brand, Digital", "type": "Community", "cover": "images/projects/iisiichaa/cover.jpg", "tags": ["Branding", "UI design"]},
  {"id": "sentry", "name": "Sentry Cyber", "cats": ["brand"], "sub": "A fresh logo and identity for a cyber security company", "mock": "logo", "color": "sky", "services": ["Logo Design", "Brand Identity"], "platform": "Brand", "type": "Cyber security", "cover": "images/projects/sentry/cover.jpg", "tags": ["Branding"]},
  {"id": "little-panda", "name": "Little Panda Studio", "cats": ["brand"], "sub": "Brand identity", "mock": "mark", "mono": "LP", "color": "mint", "services": ["Brand Identity", "Logo Design"], "platform": "Brand", "type": "Studio", "cover": "images/projects/little-panda/cover.jpg", "tags": ["Branding"]}
];
const CATS = {
  ui:{label:"UI design", anchor:"ui-design", line:"Websites, web apps, mobile and TV apps designed around real users."},
  ux:{label:"UX research", anchor:"ux-research", line:"User studies, audits and flows that shape what gets designed."},
  brand:{label:"Branding", anchor:"branding", line:"Logos and identities that give companies a recognisable face."},
  graphic:{label:"Graphic design", anchor:"graphic-design", line:"Mascots, merch and illustration that bring a brand to life."}
};
const ART = [
  ["photo","sky","Eagle of Metal","Split",1.25,"images/art/plane.jpg"],
  ["photo","pink","Into the flzing box","Split",.8,"images/art/aboard.jpg"],
  ["photo","mint","Bamberg Altstadt","Bamberg",.75,"images/art/bamberg.jpg"],
  ["photo","butter","Beauty of Rothenburg","Rothenburg",1,"images/art/rothenburg.jpg"],
  ["photo","violet","Sunset love","Split",1.3,"images/art/sunset.jpg"],
  ["photo","peach","Bamberg Rathaus","Bamberg",1.1,"images/art/bamberg_rathaus.jpg"],
  ["photo","mint","Small boat port","Zadar",.9,"images/art/port.jpg"],
  ["photo","violet","Roman Gladiator","Split",.85,"images/art/gladiator.jpg"],
  ["photo","peach","Bavarian House","Rothenburg",1.2,"images/art/bavarian_haus.jpg"],
  ["photo","butter","Bavarian roofline","Bamberg",.8,"images/art/bamberg_roof.jpg"],
  ["photo","sky","Coastal cafe","Split",1,"images/art/cafe.jpg"],
];
/* Image slider under the hero (Home). One entry per image, in order.
   src: your image, e.g. "images/slider/01.jpg" (empty = coloured project mockup)
   ar:  image width/height, e.g. "16/10", "4/3", or a wide strip like "4148/906"
   project: the project page it opens (an id from PROJECTS) */
const SLIDES = [
  {project:"nepse", src:"images/slider/slide01.jpg", ar:"4/3"},
  {project:"midc", src:"images/slider/slide05.jpg", ar:"4/3"},
  {project:"sabha", src:"images/slider/slide02.jpg", ar:"4/3"},
  {project:"wonder", src:"images/slider/slide06.jpg", ar:"4/3"},
  {project:"mst", src:"images/slider/slide03.jpg", ar:"4/3"},
  {project:"xuno", src:"images/slider/slide07.jpg", ar:"4/3"},
  {project:"mero", src:"images/slider/slide04.jpg", ar:"4/3"},
  {project:"xuno", src:"images/slider/slide08.jpg", ar:"4/3"},
  {project:"kirana", src:"images/slider/slide09.jpg", ar:"4/3"},
];
const SERVICES = [
  /* [icon, colour, title, line, detail, image path ("" = mockup)] */
  ["ui","violet","UI/UX Design","Design the platform your users come back to.","Websites, web apps, mobile apps and SaaS applications","images/services/ui.jpg"],
  ["audit","mint","UX Audit","Get your platform audited and revamped.","Improve the user experience and interface of your platform","images/services/audit.jpg"],
  ["brand","butter","Brand Design","Design and build a brand of your own.","From brand name brainstorming to making it public","images/services/brand.jpg"],
  ["illus","pink","Illustration","Custom illustration for your product.","Personalised illustration that speaks in your product's voice","images/services/illus.jpg"]
];
const QUOTES = [
  ["Bisheshwor has perfectly captured the voice and tone of our product to represent us as a community driven company.","Ishan Dongol","Founder, IISIICHAA · Nepal","violet"],
  ["He has branded our company to give it a fresh new look and I have been hearing very good response about the logo from our clients too.","Anurag Adhikari","Co-Founder, Sentry Cyber · Australia","mint"],
  ["I recommend Bisheshwor for any UI/UX or Product design position. During our collaboration at Innovate Tech, I was consistently amazed by his talent and enthusiasm.","Sandeep Shrestha","Founder, Spacechimp · Nepal","butter"]
];
const EMAIL = "bhattabisheshwor@gmail.com";
const SOCIALS = [["Dribbble","https://dribbble.com/Bisheshwor"],["LinkedIn","https://www.linkedin.com/in/bisheshwor-bhatta-4a58bb138/"],["Medium","https://medium.com/@bisheshwor"]];

/* ---------- helpers ---------- */
const $ = (s,r=document)=>r.querySelector(s), $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const page = document.body.dataset.page || "home";
const arrow = (c="↗")=>`<span class="arr"><span>${c}</span><span>${c}</span></span>`;
const tintVars = c=>`--tint:var(--t-${c});--strong:var(--t-${c}-s)`;

function art(p){
  if(p.cover) return `<div class="art"><img src="${p.cover}" alt="${p.name} cover" loading="lazy"></div>`;
  let inner="";
  if(p.mock==="browser"){
    inner=`<span class="blob" style="width:40%;aspect-ratio:1;left:-10%;top:-14%"></span>
    <div class="mk mk-browser"><div class="mk-bar"><i></i><i></i><i></i><b></b></div>
      <div class="mk-body"><div class="mk-h">${p.head||p.name}</div><div class="mk-l" style="width:62%"></div><div class="mk-l" style="width:40%"></div><div class="mk-btn"></div>
      <div class="mk-row"><div></div><div></div><div></div></div></div></div>`;
  } else if(p.mock==="phone"){
    const ph=`<div class="notch"></div><div class="ph-hero"></div><div class="it"><span></span></div><div class="it"><span></span></div><div class="it"><span></span></div><div class="it"><span></span></div>`;
    inner=`<span class="blob" style="width:46%;aspect-ratio:1;right:-12%;bottom:-18%"></span><div class="mk mk-phone p1">${ph}</div><div class="mk mk-phone p2">${ph}</div>`;
  } else if(p.mock==="tv"){
    inner=`<span class="blob" style="width:36%;aspect-ratio:1;right:-8%;top:-12%"></span>
    <div class="mk mk-tv"><div class="play">▶</div><div class="side"><div class="mk-l" style="width:90%"></div><div class="mk-l" style="width:70%"></div><div class="mk-l" style="width:80%"></div><div class="mk-btn" style="width:60%"></div></div></div>`;
  } else if(p.mock==="logo"){
    inner=`<div class="brand"><svg viewBox="0 0 100 100" style="width:34%;filter:drop-shadow(0 24px 30px rgba(20,21,43,.25))"><path d="M50 6 88 20v28c0 24-16 40-38 46C28 88 12 72 12 48V20Z" fill="var(--strong)"/><path d="M34 50l11 11 22-24" stroke="var(--surface)" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <div class="word">${p.name}</div><div class="sw"><i style="background:var(--strong)"></i><i style="background:var(--ink)"></i><i style="background:var(--surface)"></i></div></div>`;
  } else if(p.mock==="mark"){
    const word=p.short||p.name;
    inner=`<div class="brand"><div class="mono">${p.mono||p.name[0]}</div><div class="word${word.length>14?" long":""}">${word}</div>
    <div class="sw"><i style="background:var(--strong)"></i><i style="background:var(--ink)"></i><i style="background:var(--surface)"></i></div></div>`;
  } else if(p.mock==="illus"){
    inner=`<span style="position:absolute;width:52%;aspect-ratio:1;border-radius:40% 60% 55% 45%;background:var(--strong);left:14%;top:16%"></span>
    <span style="position:absolute;width:26%;aspect-ratio:1;border-radius:50%;background:var(--surface);right:16%;top:22%"></span>
    <span style="position:absolute;width:30%;aspect-ratio:1;border-radius:14px;background:var(--ink);right:22%;bottom:14%;transform:rotate(14deg)"></span>
    <span style="position:absolute;left:10%;bottom:16%;width:30%;height:4px;border-radius:2px;background:var(--ink)"></span>`;
  } else {
    inner=`<div class="brand"><div class="mascot"><i></i></div><div class="word">${p.name.split(" ")[0]}</div>
    <div class="sw"><i style="background:var(--strong)"></i><i style="background:var(--ink)"></i><i style="background:var(--surface)"></i></div></div>`;
  }
  return `<div class="art">${inner}</div>`;
}

function card(p,{w="",d=0}={}){
  return `<a class="card ${w} rv rv-img" href="${p.id}.html" aria-label="${p.name}: view project" data-id="${p.id}" data-cursor style="${tintVars(p.color)};--d:${d}s">
    <div class="cover">${art(p)}<div class="tagbar">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div><span class="open" aria-hidden="true">↗</span></div>
    <div class="meta"><div><h3>${p.name}</h3><p>${p.sub}</p></div><span class="yr">${p.type}</span></div>
  </a>`;
}

function caseRow(p){
  return `<article class="case rv" style="${tintVars(p.color)}">
    <a class="cover rv-img" data-cursor href="${p.id}.html" aria-label="${p.name} case study">${art(p)}</a>
    <div class="case-body">
      <span class="kind">${p.type} · ${p.platform}</span>
      <h3>${p.name}</h3><p>${p.caseLine}</p>
      <div class="scope">${p.services.map(s=>`<span>${s}</span>`).join("")}</div>
      <dl class="facts"><div><dt>Role</dt><dd>Lead designer</dd></div><div><dt>Platform</dt><dd>${p.platform}</dd></div><div><dt>Focus</dt><dd>${p.services[0]}</dd></div></dl>
      <div><a class="btn mag" href="${p.id}.html">Read case study ${arrow("→")}</a></div>
    </div></article>`;
}

const ICONS = {
  ui:'<rect x="3" y="4" width="18" height="14" rx="3"/><path d="M3 8h18M8 21h8"/>',
  audit:'<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5M8.5 11l2 2 3-3.5"/>',
  brand:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
  illus:'<path d="M4 20c4-1 6-3 8-7l5-8 2 1-4 9c-2 4-5 5-11 5z"/><path d="M14 9l2 1"/>'
};
const SVC_MOCK={ui:["browser","ux4ux"],audit:["wire","mero"],brand:["construction","icolux"],illus:["illus","ux4ux"]};
const serviceCards = ()=>SERVICES.map(([ic,c,h,p,f,img],i)=>{
  const [kind,pid]=SVC_MOCK[ic]; const pr={...(PROJECTS.find(x=>x.id===pid)||PROJECTS[0]),color:c,cover:""};
  return `<div class="svc rv" style="${tintVars(c)};--d:${(i%2)*.08}s">
    <div class="svc-art">${img?`<img src="${img}" alt="${h}" loading="lazy">`:mock(kind,pr)}</div>
    <div class="svc-txt"><span class="ic"><svg viewBox="0 0 24 24">${ICONS[ic]}</svg></span><h3>${h}</h3><p>${p}</p><span class="for">${f}</span></div>
  </div>`}).join("");
const quoteCards = ()=>QUOTES.map(([q,n,r,c],i)=>`
  <figure class="q rv" style="${tintVars(c)};margin:0;--d:${i*.08}s"><blockquote>${q}</blockquote>
  <footer><i>${n.split(" ").map(w=>w[0]).join("")}</i><div><strong>${n}</strong><span>${r}</span></div></footer></figure>`).join("");

function artPic([type,c,title,,ratio,src],i,forceRatio){
  const r=forceRatio||`1/${ratio}`;
  if(src) return `<img class="pic" src="${src}" alt="${title}" loading="lazy" style="aspect-ratio:${r}">`;
  if(type==="photo"){
    return `<div class="pic" style="${tintVars(c)};aspect-ratio:${r};background:linear-gradient(180deg,var(--tint) 0%,var(--tint) 55%,color-mix(in srgb,var(--strong) 55%,var(--tint)) 55%,var(--strong) 100%);position:relative">
      <span style="position:absolute;width:22%;aspect-ratio:1;border-radius:50%;background:var(--surface);left:${20+(i*7)%50}%;top:22%"></span>
      <span style="position:absolute;left:0;right:0;bottom:30%;height:22%;background:color-mix(in srgb,var(--strong) 75%,var(--ink));clip-path:polygon(0 100%,18% 30%,34% 70%,55% 0,78% 60%,100% 25%,100% 100%)"></span></div>`;
  }
  return `<div class="pic" style="${tintVars(c)};aspect-ratio:${r};background:var(--tint);position:relative;overflow:hidden">
    <span style="position:absolute;width:60%;aspect-ratio:1;border-radius:${i%2?"50%":"40% 60% 55% 45%"};background:var(--strong);left:20%;top:18%;opacity:.9"></span>
    <span style="position:absolute;width:30%;aspect-ratio:1;border-radius:12px;background:var(--surface);right:12%;bottom:14%;transform:rotate(${i*9}deg)"></span>
    <span style="position:absolute;left:12%;top:12%;width:46%;height:3px;border-radius:2px;background:var(--ink);opacity:.6"></span></div>`;
}
const artTile = (a,i)=>`<figure class="tile rv" tabindex="0" role="button" aria-label="View ${a[2]}" data-i="${i}" data-t="${a[0]}" data-cursor style="--tint:var(--t-${a[1]});margin-inline:0;--d:${(i%3)*.06}s">
  ${artPic(a,i)}<figcaption>${a[2]}<small>${a[3]}</small></figcaption></figure>`;

/* ---------- shell: nav, footer, curtain ---------- */
const NAV = [["work","Work","work.html"],["art","Art & Photo","art.html"],["about","About","about.html"]];
$("#nav-slot").outerHTML = `
<div class="progress" id="progress"></div>
<div class="cursor" id="cursor" aria-hidden="true"><span>View</span></div>
<div class="curtain" aria-hidden="true"></div>
<div class="wrap"><nav class="nav" id="nav" aria-label="Main"><div class="nav-in">
  <a href="index.html" class="logo" aria-label="Bisheshwor Bhatta, home"><img src="favicon.svg" alt="" width="28" height="28">Bisheshwor</a>
  <div class="links" id="links"><span class="pill-ind" id="ind"></span>
    ${NAV.map(([k,l,h])=>`<a href="${h}"${k===page||(k==="work"&&page==="project")?' aria-current="page" class="on"':""}>${l}</a>`).join("")}
    <a href="contact.html" class="only-mobile${page==="contact"?' on" aria-current="page':""}">Contact</a>
  </div>
  <a href="contact.html" class="btn sm nav-cta mag">Let's talk ${arrow()}</a>
  <button class="menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="links"><span></span><span></span></button>
</div></nav></div>`;

const footSlot=$("#foot-slot");
if(footSlot) footSlot.outerHTML = `
<footer class="contact-band site-foot2" id="ctaCard">
  <span class="ring" style="width:620px;height:620px;right:-180px;top:-240px"></span>
  <span class="ring" style="width:380px;height:380px;right:-60px;top:-120px"></span>
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-left rv">
        ${page!=="contact"?`<span class="eyebrow">Contact</span>
        <h2>Got an idea? Let's make it real.</h2>
        <div class="cta-row">
          <button class="btn copy-email mag" type="button" data-copy-email aria-live="polite">
            <span class="ce-ic" aria-hidden="true"><svg viewBox="0 0 24 24" class="i-copy"><rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg><svg viewBox="0 0 24 24" class="i-ok"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
            <span class="ce-label">Copy email</span>
          </button>
          <a class="btn ghost mag" href="contact.html">Start a project ${arrow("→")}</a>
        </div>`:""}
        <div class="find2"><span class="eyebrow">Find me on</span>
          <div class="find-links">${SOCIALS.map(([n,u])=>`<a href="${u}" target="_blank" rel="noopener">${n} <span aria-hidden="true">↗</span></a>`).join("")}</div>
        </div>
      </div>
      <a class="foot-logo rv" href="index.html" aria-label="Bisheshwor Bhatta, home" style="--d:.1s"><img src="favicon.svg" alt=""></a>
    </div>
    <div class="foot">
      <span>© 2026 Bisheshwor Bhatta</span>
      <span style="display:flex;gap:18px;flex-wrap:wrap"><a href="index.html">Home</a>${NAV.map(([,l,h])=>`<a href="${h}">${l}</a>`).join("")}<a href="contact.html">Contact</a></span>
    </div>
  </div>
</footer>
<dialog class="drawer" id="drawer" aria-labelledby="drTitle"><div class="dr-in" id="drBody"></div></dialog>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;

/* ---------- page renderers ---------- */
const R = {};
R.home = ()=>{
  const f=PROJECTS.filter(p=>p.featured);
  $("#grid").innerHTML = f.map((p,i)=>card(p,{d:(i%2)*.08})).join("");
  $("#cases-list").innerHTML = PROJECTS.filter(p=>p.case).map(caseRow).join("");
  $("#svc").innerHTML = serviceCards();
  $("#artStrip").innerHTML = ART.slice(0,4).map((a,i)=>artTile(a,i)).join("");
  $("#quotes").innerHTML = quoteCards();
  $("#workCount").textContent = PROJECTS.length;
  const sl=$("#slider");
  if(sl){
    const one=SLIDES.map(s=>{const p=PROJECTS.find(x=>x.id===s.project)||PROJECTS[0];
      const inner=s.src?`<img src="${s.src}" alt="${p.name}" loading="lazy">`:art({...p,cover:""});
      return `<a class="slide" href="${p.id}.html" style="${tintVars(p.color)};--ar:${s.ar||"16/10"}" data-cursor><div class="cover">${inner}</div><span class="slide-tag">${p.name}</span></a>`}).join("");
    sl.innerHTML = one + one.replace(/<a class="slide"/g,'<a class="slide" aria-hidden="true" tabindex="-1"');
       const band=sl.closest(".slider-band"); let target=1, rate=1, raf=0;
   const step=()=>{const a=sl.getAnimations()[0]; rate+=(target-rate)*.08; if(a) a.playbackRate=rate;
     if(Math.abs(target-rate)>.005) raf=requestAnimationFrame(step); else {rate=target; if(a) a.playbackRate=rate; raf=0;}};
   const go=t=>{target=t; if(!raf) raf=requestAnimationFrame(step);};
   band.addEventListener("pointerenter",()=>go(.3));
   band.addEventListener("pointerleave",()=>go(1));
  }
  $("#artStrip").addEventListener("click",()=>{location.href="art.html"});
};

R.work = ()=>{
  $("#total").textContent = PROJECTS.length;
  const keys=Object.keys(CATS);
  const tabs=[["all","All",PROJECTS.length],...keys.map(k=>[k,CATS[k].label,PROJECTS.filter(p=>p.cats.includes(k)).length])];
  $("#catTabs").innerHTML = tabs.map(([k,l,n])=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k==="all"}">${l} <small>${n}</small></button>`).join("");
  $("#cats").innerHTML = `<div class="list-grid" id="workGrid">${PROJECTS.map((p,i)=>card(p,{d:(i%2)*.07})).join("")}</div>`;
  const grid=$("#workGrid"), bar=$("#catTabs");
  function pick(k,scroll){
    bar.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c.dataset.k===k));
    $$(".card",grid).forEach(c=>{const p=PROJECTS.find(x=>x.id===c.dataset.id);const show=k==="all"||p.cats.includes(k);
      c.classList.toggle("out",!show);
      if(show&&!reduce) c.animate([{transform:"translateY(20px) scale(.98)",opacity:.4},{transform:"none",opacity:1}],{duration:550,easing:"cubic-bezier(.22,1,.36,1)"});});
    const anc=k==="all"?"":CATS[k].anchor;
    try{history.replaceState(null,"",anc?"#"+anc:location.pathname)}catch(_){}
    if(scroll) $(".subnav").scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
  }
  bar.addEventListener("click",e=>{const b=e.target.closest(".chip");if(b)pick(b.dataset.k,false)});
  const fromHash=keys.find(k=>"#"+CATS[k].anchor===location.hash);
  if(fromHash) pick(fromHash,true);
};

R.art = ()=>{
  const mas=$("#masonry");
  mas.innerHTML = ART.map((a,i)=>artTile(a,i)).join("");
  $("#artCount").textContent = ART.length;
  const counts={all:ART.length,art:ART.filter(a=>a[0]==="art").length,photo:ART.filter(a=>a[0]==="photo").length};
  const aF=$("#artFilters");
  aF.innerHTML=[["all","Everything"],["art","Art"],["photo","Photography"]].map(([k,l],i)=>`<button class="chip" type="button" aria-pressed="${i===0}" data-f="${k}">${l} <small>${counts[k]}</small></button>`).join("");
  aF.addEventListener("click",e=>{
    const b=e.target.closest(".chip"); if(!b) return;
    aF.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c===b));
    $$(".tile",mas).forEach(t=>{const s=b.dataset.f==="all"||t.dataset.t===b.dataset.f;t.classList.toggle("out",!s);if(s&&!reduce)t.animate([{transform:"scale(.96)",opacity:.4},{transform:"none",opacity:1}],{duration:500,easing:"ease-out"})});
  });
  // lightbox
  const lb=$("#lightbox"); let cur=0;
  const visible=()=>$$(".tile:not(.out)",mas).map(t=>+t.dataset.i);
  function show(i){cur=i;const a=ART[i];
    $("#lbBody").innerHTML=`${artPic(a,i,"16/10")}<div class="lb-bar"><div><h3>${a[2]}</h3><small>${a[3]}</small></div>
    <div class="lb-nav"><button type="button" data-step="-1" aria-label="Previous">←</button><button type="button" data-step="1" aria-label="Next">→</button><button type="button" data-close aria-label="Close">×</button></div></div>`;}
  function step(n){const v=visible();const k=v.indexOf(cur);show(v[(k+n+v.length)%v.length]);}
  mas.addEventListener("click",e=>{const t=e.target.closest(".tile");if(!t)return;show(+t.dataset.i);lb.showModal();});
  mas.addEventListener("keydown",e=>{const t=e.target.closest(".tile");if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();show(+t.dataset.i);lb.showModal();}});
  lb.addEventListener("click",e=>{if(e.target===lb||e.target.closest("[data-close]"))return lb.close();const s=e.target.closest("[data-step]");if(s)step(+s.dataset.step);});
  lb.addEventListener("keydown",e=>{if(e.key==="ArrowRight")step(1);if(e.key==="ArrowLeft")step(-1);});
};

R.about = ()=>{
  $("#svc").innerHTML = serviceCards();
  $("#quotes").innerHTML = quoteCards();
};

R.contact = ()=>{
  $("#email").textContent = EMAIL;
  $("#socialList").innerHTML = SOCIALS.map(([n,u])=>`<a href="${u}" target="_blank" rel="noopener">${n} ↗</a>`).join("");
  const form=$("#form"), out=$("#formDone");
  form.addEventListener("submit",e=>{
    e.preventDefault();
    let ok=true;
    $$("[required]",form).forEach(el=>{const err=el.parentElement.querySelector(".err");const bad=!el.value.trim()||(el.type==="email"&&!/^\S+@\S+\.\S+$/.test(el.value));err.hidden=!bad;if(bad){ok=false;}});
    if(!ok){const first=$$("[required]",form).find(el=>!el.parentElement.querySelector(".err").hidden);first&&first.focus();return;}
    const d=new FormData(form);
    const subject=`Project enquiry: ${d.get("type")||"General"}`;
    const body=`Hi Bisheshwor,\n\n${d.get("message")}\n\nName: ${d.get("name")}\nEmail: ${d.get("from")}\nProject type: ${d.get("type")||"Not sure yet"}`;
    $("#mailLink").href=`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $("#draft").textContent=body;
    form.hidden=true; out.hidden=false; $("#doneTitle").focus();
  });
  $("#editBtn").addEventListener("click",()=>{out.hidden=true;form.hidden=false;});
  $("#copyDraft").addEventListener("click",()=>copyText($("#draft").textContent,$("#draft"),"Message copied"));
};


/* ---------- mockup library for case study image slots ----------
   <figure class="shot" data-kind="browser" data-label="Homepage"><div class="frame"></div></figure>
   Put an <img src="..."> inside .frame and the mockup is skipped. */
function lines(n,w=[80,60,70,50]){return Array.from({length:n},(_,i)=>`<div class="ln-s" style="width:${w[i%w.length]}%"></div>`).join("")}
function pageMock(p,head){return `<div class="pg"><div class="pg-top"><div class="tx"><div class="pg-h">${head||p.name}</div>${lines(2)}<div class="pill-s"></div></div><div class="blk s" style="aspect-ratio:1.3"></div></div>
  <div class="pg-cards"><div class="blk"></div><div class="blk m"></div><div class="blk"></div></div></div>`}
function phone(v=0){const rows=Array.from({length:4+v%2},()=>`<div class="rw"><span></span></div>`).join("");
  return `<div class="dv dv-phone"><div class="nt"></div><div class="hd"${v===1?' style="aspect-ratio:2"':""}></div>${rows}<div class="tb"><i></i><i></i><i></i><i></i></div></div>`}
const masc=(mood="",s="")=>`<div class="masc ${mood}"${s?` style="--s:${s}"`:""}><i></i></div>`;
const tee=`<svg viewBox="0 0 120 120"><path d="M38 14 18 24 6 46l18 8 6-10v66h60V44l6 10 18-8-12-22-20-10c-4 8-12 12-20 12s-16-4-20-12Z" fill="var(--mock-bg)"/><circle cx="60" cy="62" r="17" fill="var(--strong)"/><circle cx="54" cy="58" r="2.6" fill="var(--ink)"/><circle cx="66" cy="58" r="2.6" fill="var(--ink)"/><path d="M54 66q6 6 12 0" stroke="var(--ink)" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg>`;
const tote=`<svg viewBox="0 0 120 120"><path d="M42 34c0-16 36-16 36 0" stroke="var(--ink)" stroke-width="4" fill="none"/><path d="M24 34h72l-6 80H30Z" fill="var(--strong)"/><circle cx="60" cy="72" r="16" fill="var(--mock-bg)"/><circle cx="54" cy="68" r="2.4" fill="var(--ink)"/><circle cx="66" cy="68" r="2.4" fill="var(--ink)"/><path d="M54 76q6 5 12 0" stroke="var(--ink)" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`;
const mug=`<svg viewBox="0 0 120 120"><path d="M86 52h8a12 12 0 0 1 0 24h-8" stroke="var(--mock-bg)" stroke-width="7" fill="none"/><rect x="26" y="40" width="62" height="70" rx="8" fill="var(--mock-bg)"/><circle cx="57" cy="74" r="14" fill="var(--strong)"/><circle cx="52" cy="71" r="2.2" fill="var(--ink)"/><circle cx="62" cy="71" r="2.2" fill="var(--ink)"/></svg>`;
function mock(kind,p){
  switch(kind){
    case "browser": return `<div class="mx"><div class="dv dv-browser"><div class="bar"><i></i><i></i><i></i><b></b></div>${pageMock(p,p.head)}</div></div>`;
    case "browser-alt": return `<div class="mx"><div class="dv dv-browser"><div class="bar"><i></i><i></i><i></i><b></b></div><div class="pg" style="grid-template-rows:auto auto 1fr"><div class="pg-h" style="font-size:clamp(11px,1.6vw,22px)">Explore</div><div style="display:flex;gap:6px"><span class="c-chip" style="background:var(--strong);color:var(--surface)">All</span><span class="c-chip" style="background:var(--tint)">New</span><span class="c-chip" style="background:var(--tint)">Popular</span></div><div class="pg-cards" style="grid-template-columns:repeat(4,1fr)"><div class="blk m"></div><div class="blk"></div><div class="blk"></div><div class="blk s"></div></div></div></div></div>`;
    case "wire": return `<div class="mx wire"><div class="dv dv-browser"><div class="bar"><i></i><i></i><i></i><b></b></div>${pageMock(p,"Headline")}</div></div>`;
    case "wire-phones": return `<div class="mx wire"><div class="phones">${phone(0)}${phone(1)}${phone(2)}</div></div>`;
    case "phones": return `<div class="mx"><div class="phones">${phone(0)}${phone(1)}${phone(2)}</div></div>`;
    case "phone": return `<div class="mx"><div class="phones">${phone(1)}</div></div>`;
    case "tablet": return `<div class="mx"><div class="dv dv-tablet">${pageMock(p,p.head)}</div></div>`;
    case "tv": return `<div class="mx"><div class="dv dv-tv"><div class="play">▶</div><div class="rail">${lines(3,[90,70,80])}<div class="pill-s" style="width:60%"></div></div></div></div>`;
    case "flow": return `<div class="mx"><div class="flow"><div class="node">Landing</div><span class="ar"></span><div class="node">Browse</div><span class="ar"></span><div class="node k">Key task</div><span class="ar"></span><div class="node">Confirm</div></div></div>`;
    case "persona": return `<div class="mx"><div class="persona"><div class="av"></div><div style="display:grid;gap:8px;align-content:center"><div class="pg-h" style="font-size:clamp(12px,1.6vw,20px)">Primary user</div>${lines(2)}</div><div class="q">“A quote from your research goes here.”</div></div></div>`;
    case "palette": return `<div class="mx"><div class="swatches"><div style="background:var(--strong);color:var(--surface)">Primary</div><div style="background:var(--ink);color:var(--bg)">Ink</div><div style="background:var(--tint);color:var(--ink)">Tint</div><div style="background:var(--mock-bg);color:var(--ink)">Surface</div><div style="background:var(--accent);color:var(--accent-ink)">Accent</div></div></div>`;
    case "type": return `<div class="mx"><div class="spec"><div class="aa">Aa</div><div class="sc"><span style="font-size:clamp(20px,2.8vw,36px);font-weight:800">Display</span><span style="font-size:clamp(16px,2vw,24px);font-weight:700">Heading</span><span style="font-size:clamp(12px,1.3vw,16px);font-family:var(--f-body)">Body text for long reading</span><span style="font-size:11px;font-family:var(--f-mono);color:var(--muted)">CAPTION · 12PX</span></div></div></div>`;
    case "components": return `<div class="mx"><div class="comps"><div class="r"><span class="c-btn">Primary</span><span class="c-btn o">Secondary</span><span class="c-tog"></span></div><div class="r"><span class="c-chip">Filter</span><span class="c-chip">Tag</span><span class="c-chip">Label</span></div><div class="c-in"></div></div></div>`;
    case "logo": return art({...p,cover:"",mock:["logo","mark"].includes(p.mock)?p.mock:"brand"});
    case "construction": return `<div class="mx"><div class="constr">${p.mock==="brand"?masc():`<div class="mono">${p.mono||p.name[0]}</div>`}</div></div>`;
    case "poses": return `<div class="mx"><div class="poses">${masc()}${masc("wink")}${masc("wow")}${masc("sad")}</div></div>`;
    case "merch": return `<div class="mx"><div class="merch">${tee}${tote}${mug}</div></div>`;
    case "cards": return `<div class="mx"><div class="bcards"><div></div><div style="flex-direction:column;align-items:flex-start;justify-content:flex-end;gap:4px">${p.name.split(" ")[0]}<span style="font-family:var(--f-body);font-weight:500;font-size:clamp(9px,1vw,12px);color:var(--muted)">hello@brand.com</span></div></div></div>`;
    case "stickers": return `<div class="mx"><div class="stickers"><div class="st">${masc()}</div><div class="st" style="background:var(--strong)">${masc("wink")}</div><div class="st">${masc("wow")}</div></div></div>`;
    case "frames": return `<div class="mx"><div class="frames">${["01","02","03","04"].map((n,i)=>`<div data-n="${n}"><div class="masc ${["","wink","wow",""][i]}" style="transform:translateY(${[10,-6,-14,4][i]}%) rotate(${[-6,0,6,0][i]}deg)"><i></i></div></div>`).join("")}</div></div>`;
    case "illus": return art({...p,cover:"",mock:"illus"});
    case "mascot": return `<div class="mx">${masc("blink","44%")}</div>`;
    default: return art({...p,cover:""});
  }
}
function fillShots(p){
  $$(".shot").forEach(f=>{
    const fr=$(".frame",f); if(!fr||fr.querySelector("img")) return;
    fr.innerHTML = mock(f.dataset.kind,p) + `<span class="add-hint">Replace with image</span>`;
    if(f.dataset.ar) fr.style.setProperty("--ar",f.dataset.ar);
  });
}
R.project = ()=>{
  const p=PROJECTS.find(x=>x.id===document.body.dataset.project); if(!p) return;
  document.body.style.cssText+=";"+tintVars(p.color);
  const cv=$("#cover"); if(cv) cv.innerHTML=art(p);
  fillShots(p);
  const i=PROJECTS.indexOf(p), nx=PROJECTS[(i+1)%PROJECTS.length], pv=PROJECTS[(i-1+PROJECTS.length)%PROJECTS.length];
  const pn=(q,dir)=>`<a class="pn pn-${dir} rv" href="${q.id}.html" style="${tintVars(q.color)}" data-cursor>
      <div class="thumb">${art(q)}</div>
      <div class="pn-txt"><small>${dir==="prev"?"Previous project":"Next project"}</small><h3>${q.name}</h3><p>${q.cats.map(k=>CATS[k].label).join(" · ")}</p></div></a>`;
  $("#next").outerHTML = `<div class="sec-head" style="margin-bottom:24px"><div class="rv"><span class="eyebrow">Keep exploring</span><h2>More projects</h2></div><a class="link-arrow rv" href="work.html">All work <span>→</span></a></div>
    <nav class="prevnext2" aria-label="Other projects">${pn(pv,"prev")}${pn(nx,"next")}</nav>`;
};

/* ---------- shared behaviour ---------- */
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
(R[page]||(()=>{}))();

// project drawer
const dlg=$("#drawer"), drBody=$("#drBody");
function openProject(id){
  const p=PROJECTS.find(x=>x.id===id); if(!p||!dlg) return;
  drBody.innerHTML=`
    <div class="dr-top"><span class="eyebrow">${CATS[p.cats[0]].label} · ${p.type}</span><button class="x" type="button" aria-label="Close" data-x>×</button></div>
    <div class="cover" style="${tintVars(p.color)}">${art(p)}</div>
    <div><h3 id="drTitle">${p.name}</h3><p class="sub" style="margin-top:8px">${p.caseLine||p.sub}</p></div>
    <div class="scope" style="${tintVars(p.color)}">${p.services.map(s=>`<span>${s}</span>`).join("")}</div>
    <div class="dr-list"><div><span>Category</span><span>${CATS[p.cats[0]].label}</span></div><div><span>Platform</span><span>${p.platform}</span></div><div><span>Industry</span><span>${p.type}</span></div></div>
    <p class="note">Full case study with process, research and final screens goes here.</p>
    ${p.link?`<a class="btn mag" href="${p.link}" target="_blank" rel="noopener" style="justify-self:start">Visit live site ${arrow()}</a>`:""}`;
  dlg.showModal();
}
if(dlg) dlg.addEventListener("click",e=>{if(e.target===dlg||e.target.closest("[data-x]"))dlg.close()});
document.addEventListener("click",e=>{
  const o=e.target.closest("[data-open]"); if(o) return openProject(o.dataset.open);
});
// deep link: work.html#ux4ux opens that project

// copy email + toast
const toast=$("#toast");
function say(t){if(!toast)return;toast.textContent=t;toast.classList.add("show");clearTimeout(say.t);say.t=setTimeout(()=>toast.classList.remove("show"),2200)}
function selectEl(el){const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r)}
function copyText(v,el,msg){
  const fail=()=>{selectEl(el);say("Press ⌘C / Ctrl+C to copy")};
  try{navigator.clipboard.writeText(v).then(()=>say(msg),fail)}catch(e){fail()}
}
document.addEventListener("click",e=>{const b=e.target.closest("[data-copy]");if(!b)return;
  const el=b.parentElement.querySelector(".email-txt,#email");copyText(EMAIL,el,"Email copied to clipboard");
  b.textContent="Copied";setTimeout(()=>b.textContent="Copy",1800);});
// "Copy email" button: copies the address without showing it on the page
document.addEventListener("click",e=>{const b=e.target.closest("[data-copy-email]");if(!b)return;
  const lbl=b.querySelector(".ce-label");
  const done=()=>{b.classList.add("ok");lbl.textContent="Email copied";say("Email copied to clipboard");
    clearTimeout(b._t);b._t=setTimeout(()=>{b.classList.remove("ok");lbl.textContent="Copy email"},2000)};
  const fail=()=>say("Couldn't copy. My email is "+EMAIL);
  try{navigator.clipboard.writeText(EMAIL).then(done,fail)}catch(_){fail()}
});

// mobile menu
const nav=$("#nav"), mb=$("#menuBtn");
mb.addEventListener("click",()=>{const o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o)});

// nav pill sits under the current page link
const ind=$("#ind"), curLink=$("#links a[aria-current='page']");
function placeInd(a){if(!a){ind.style.opacity=0;return}ind.style.opacity=1;ind.style.left=a.offsetLeft+"px";ind.style.width=a.offsetWidth+"px"}
placeInd(curLink);
$$("#links a").forEach(a=>{a.addEventListener("mouseenter",()=>placeInd(a));});
$("#links").addEventListener("mouseleave",()=>placeInd(curLink));
addEventListener("resize",()=>placeInd(curLink));
document.fonts&&document.fonts.ready.then(()=>placeInd(curLink));

// scroll progress
const prog=$("#progress");
function onScroll(){const h=document.documentElement;prog.style.transform=`scaleX(${h.scrollTop/(h.scrollHeight-h.clientHeight||1)})`}
addEventListener("scroll",onScroll,{passive:true});onScroll();

if(reduce) return;
const root=document.documentElement;
root.classList.add("motion");

// page transition: curtain covers on leave, lifts on arrival
let arrived=false; try{arrived=sessionStorage.getItem("pt")==="1";sessionStorage.removeItem("pt")}catch(e){}
if(arrived){root.classList.add("entering");setTimeout(()=>root.classList.remove("entering"),700)}
addEventListener("pageshow",e=>{if(e.persisted)root.classList.remove("leaving","entering")});
document.addEventListener("click",e=>{
  const a=e.target.closest("a[href]"); if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target==="_blank") return;
  const h=a.getAttribute("href"); if(!/^[a-z0-9-]+\.html$/.test(h)) return;
  if(h===location.pathname.split("/").pop()&&!location.hash) {e.preventDefault();scrollTo({top:0,behavior:"smooth"});return;}
  e.preventDefault(); try{sessionStorage.setItem("pt","1")}catch(_){}
  root.classList.add("leaving"); setTimeout(()=>{location.href=h},420);
});

// reveal on scroll (position only; content stays visible at rest)
const rvObs=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");rvObs.unobserve(en.target)}}),{rootMargin:"0px 0px -8% 0px"});
$$(".rv,.rv-img").forEach(el=>rvObs.observe(el));

// CTA rings drift on scroll
const cta=$("#ctaCard");
if(cta){const rings=$$(".ring",cta);addEventListener("scroll",()=>{const r=cta.getBoundingClientRect();const p=(innerHeight-r.top)/(innerHeight+r.height);rings.forEach((g,i)=>g.style.transform=`translate(${(p-.5)*-60*(i+1)}px,${(p-.5)*40*(i+1)}px)`)},{passive:true});}

// project cover parallax
const pc=$("#cover .art");
if(pc){addEventListener("scroll",()=>{const y=Math.min(scrollY,900);pc.style.transform=`translateY(${y*.03}px) scale(${1+y*.00008})`},{passive:true});}

if(!fine) return;

// hero parallax
const stage=$("#stage");
if(stage){const fl=$$(".float",stage);$(".hero").addEventListener("pointermove",e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;fl.forEach(f=>{const d=+f.dataset.depth;f.style.transform=`translate(${-x*d}px,${-y*d}px)`})});}

// card tilt
$$(".card .cover,.case .cover,.shot .frame").forEach(cv=>{
  cv.addEventListener("pointermove",e=>{const r=cv.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;cv.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`});
  cv.addEventListener("pointerleave",()=>cv.style.transform="");
});
// magnetic buttons
$$(".mag").forEach(b=>{
  b.addEventListener("pointermove",e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});
  b.addEventListener("pointerleave",()=>b.style.transform="");
});
// cursor
const cur=$("#cursor");let mx=0,my=0,cx=0,cy=0;
addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;cur.style.opacity=1});
document.addEventListener("pointerleave",()=>cur.style.opacity=0);
document.addEventListener("pointerover",e=>{cur.classList.toggle("big",!!e.target.closest("[data-cursor]"))});
(function loop(){cx+=(mx-cx)*.2;cy+=(my-cy)*.2;cur.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(loop)})();
})();
(function(){document.documentElement.classList.remove("entering");var n=document.getElementById("nav");if(n&&n.parentNode)n.parentNode.style.visibility="hidden";var s=document.createElement("script");s.src="nav.js";document.body.appendChild(s);})();