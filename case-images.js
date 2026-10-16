/* Case study images.
   Each image is written as <img data-src="images/projects/ux4ux/ux4ux01"> without a file ending:
   this script tries .jpg, .png, .webp, .jpeg, .gif and .svg and uses the first one that exists.
   A normal <img src="..."> also works. The cover is taken from site.js (cover: "...") and,
   if that is empty, from images/projects/<id>/cover.* automatically. */
(function(){
  "use strict";
  var EXT=["jpg","png","webp","jpeg","gif","svg"];
  function load(base, ok, fail){
    var i=0;
    (function next(){
      if(i>=EXT.length){ fail(); return; }
      var url=base+"."+EXT[i++], t=new Image();
      t.onload=function(){ ok(url); };
      t.onerror=next;
      t.src=url;
    })();
  }
  document.querySelectorAll("img[data-src]").forEach(function(img){
    var base=img.getAttribute("data-src");
    load(base, function(url){ img.src=url; }, function(){
      var box=document.createElement("div");
      box.className="img-missing";
      box.innerHTML="<div><b>Image not added yet</b>"+base+".jpg / .png / .webp</div>";
      img.replaceWith(box);
    });
  });
  var cover=document.getElementById("cover"), id=document.body.getAttribute("data-project");
  if(cover && id && !cover.querySelector("img")){
    load("images/projects/"+id+"/cover", function(url){
      var im=new Image(); im.src=url; im.alt=""; im.className="auto-cover";
      cover.innerHTML=""; cover.appendChild(im);
    }, function(){ /* keep the coloured placeholder */ });
  }

  // gentle zoom-out while each image scrolls into view (like the cover)
  if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    var imgs=[].slice.call(document.querySelectorAll(".full-shot .frame"));
    var ticking=false;
    function update(){
      ticking=false;
      var vh=window.innerHeight;
      imgs.forEach(function(fr){
        var im=fr.querySelector("img"); if(!im) return;
        var r=fr.getBoundingClientRect();
        var p=Math.min(1,Math.max(0,(vh-r.top)/(vh+r.height)));   // 0 = just below the screen, 1 = just above
        im.style.transform="scale("+(1.08-0.08*Math.min(1,p*1.6)).toFixed(4)+") translateY("+((0.5-p)*24).toFixed(1)+"px)";
      });
    }
    function onScroll(){ if(!ticking){ ticking=true; requestAnimationFrame(update); } }
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",onScroll);
    update();
  }
})();
