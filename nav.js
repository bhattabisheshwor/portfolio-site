/* New navigation, menu page and back-to-top button.
   Loaded by the last line of site.js. Edit MENU below to change the menu items. */
(function(){
  "use strict";
  var MENU=[
    ["Home","index.html","home"],
    ["Work","work.html","work"],
    ["Art & Photo","art.html","art"],
    ["Services","index.html#services","services"],
    ["About","about.html","about"],
    ["Contact","contact.html","contact"]
  ];
  var page=document.body.getAttribute("data-page")||"home";
  if(page==="project") page="work";

  // styles first: the new bar is only added once nav.css has loaded, so nothing ever shows unstyled
  // (that was the big logo flashing after the purple page transition)
  document.documentElement.classList.remove("entering");
  var oldNav=document.getElementById("nav"); if(oldNav&&oldNav.parentNode) oldNav.parentNode.style.visibility="hidden";
  var css=document.createElement("link"); css.rel="stylesheet"; css.href="nav.css";
  var started=false;
  function start(){ if(started) return; started=true; init(); }
  css.onload=start; css.onerror=start; setTimeout(start,2500);
  document.head.appendChild(css);

  function init(){

  // keep whatever logo file the old navbar used (favicon.svg by default), then remove the old navbar
  var old=document.getElementById("nav");
  var logoSrc=(old&&old.querySelector(".logo img")&&old.querySelector(".logo img").getAttribute("src"))||"favicon.svg";
  if(old){ (old.closest(".wrap")||old).remove(); }

  var bar=document.createElement("header");
  bar.className="topbar";
  bar.innerHTML=
    '<a class="tb-logo" href="index.html" aria-label="Bisheshwor Bhatta, home"><img src="'+logoSrc+'" alt="" width="72" height="72"></a>'+
    '<div class="tb-right">'+
      '<a class="tb-cta" href="contact.html">Contact me</a>'+
      '<button class="tb-burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="menuPage"><span></span><span></span><span></span></button>'+
    '</div>';
  var menu=document.createElement("nav");
  menu.className="menu-page"; menu.id="menuPage"; menu.setAttribute("aria-label","Menu");
  menu.innerHTML='<ul class="menu-grid">'+MENU.map(function(m,i){
      return '<li><a href="'+m[1]+'" style="--i:'+i+'"'+(m[2]===page?' aria-current="page"':'')+'>'+m[0]+'</a></li>';
    }).join("")+'</ul><div class="menu-foot">© Bisheshwor Bhatta · <a href="contact.html">Let\'s work together</a></div>';
  var top=document.createElement("button");
  top.className="to-top"; top.type="button"; top.setAttribute("aria-label","Back to top");
  top.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg><span class="tt-label">Back to top</span>';
  document.body.prepend(menu); document.body.prepend(bar); document.body.appendChild(top);

  // menu open / close
  var burger=bar.querySelector(".tb-burger"), root=document.documentElement;
  function setMenu(open){
    root.classList.toggle("menu-open",open);
    document.body.classList.toggle("menu-lock",open);
    burger.setAttribute("aria-expanded",open);
    burger.setAttribute("aria-label",open?"Close menu":"Open menu");
    if(open){ var f=menu.querySelector("a"); setTimeout(function(){ f&&f.focus({preventScroll:true}); },300); }
  }
  burger.addEventListener("click",function(){ setMenu(!root.classList.contains("menu-open")); });
  menu.addEventListener("click",function(e){
    var a=e.target.closest("a"); if(!a) return;
    // "Services" on the home page: just close the menu and scroll there
    if(a.getAttribute("href")==="index.html#services" && page==="home"){ e.preventDefault(); setMenu(false); var s=document.getElementById("services"); s&&s.scrollIntoView({behavior:"smooth"}); return; }
    // link to the page you're already on: just close the menu
    var cur=location.pathname.split("/").pop()||"index.html";
    if(a.getAttribute("href")===cur){ setMenu(false); return; }
    // going to another page: leave the menu up underneath the purple transition, so nothing behind it shows through
  });
  // coming back with the browser's back button: start with the menu closed
  window.addEventListener("pageshow",function(e){ if(e.persisted) setMenu(false); });
  document.addEventListener("keydown",function(e){ if(e.key==="Escape"&&root.classList.contains("menu-open")) setMenu(false); });

  // logo dims once the hero has scrolled away; back-to-top appears further down
  var hero=document.querySelector(".hero, .pj-hero, .page-head");
  function onScroll(){
    var limit=hero?hero.offsetTop+hero.offsetHeight-90:200;
    bar.classList.toggle("dim",window.scrollY>limit);
    top.classList.toggle("show",window.scrollY>600);
  }
  window.addEventListener("scroll",onScroll,{passive:true}); onScroll();
  top.addEventListener("click",function(){
    var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({top:0,behavior:reduce?"auto":"smooth"});
  });

  // arriving on index.html#services from another page
  if(location.hash==="#services"){ var sv=document.getElementById("services"); if(sv) setTimeout(function(){ sv.scrollIntoView(); },60); }
  }
})();
