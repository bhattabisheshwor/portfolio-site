/* Case study pages.
   1) TEXT: if case-studies/<id>.txt exists (e.g. case-studies/saalebrands.txt), the case study is built
      from that file: title, snapshot card, sections, images and captions. Edit the .txt, not the HTML.
      If the .txt is missing, the page stays exactly as it is in the HTML.
   2) IMAGES: <img data-src="images/projects/ux4ux/ux4ux01"> without a file ending: this script tries
      .jpg .JPG .png .PNG .webp .jpeg .gif .svg and uses the first that exists.
   3) COVER: images/projects/<id>/cover.* is picked up automatically.
   4) DRAFT: put "Status: draft" at the top of the .txt (above the first == section) and the page shows
      only the images that are already uploaded. All text and [brackets] stay hidden; missing images are
      skipped. Filled-in Title, Summary, Tags and snapshot lines still show. Delete the line (or write
      "Status: ready") when the case study is finished.
   Note: the .txt is read with fetch(), so preview with Live Server (not by double-clicking the .html). */
(function(){
  "use strict";
  var id=document.body.getAttribute("data-project");
  var root=document.documentElement;
  var main=document.querySelector("main");

  /* ---------- helpers ---------- */
  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  // inline formatting: **bold**, [link text](https://...), and [anything in brackets] = unfinished note (highlighted)
  function inline(s){
    var links=[];
    s=s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,function(_,t,u){ links.push([t,u]); return "\u0000"+(links.length-1)+"\u0000"; });
    s=esc(s);
    s=s.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>");
    s=s.replace(/\[([^\]]+)\]/g,'<mark class="todo" title="Replace this with the real detail">[$1]</mark>');
    s=s.replace(/\u0000(\d+)\u0000/g,function(_,i){ var l=links[+i], ext=/^https?:/i.test(l[1]);
      return '<a href="'+esc(l[1])+'"'+(ext?' target="_blank" rel="noopener"':'')+'>'+esc(l[0])+'</a>'; });
    return s;
  }
  function imgPath(name){
    name=name.trim();
    return name.indexOf("/")>-1 ? name : "images/projects/"+id+"/"+name;
  }

  /* ---------- parse the .txt ---------- */
  function parse(text){
    var meta=[], sections=[], cur=null;
    text.replace(/\r/g,"").split("\n").forEach(function(line){
      if(/^\s*#/.test(line)) return;                                   // # note lines are ignored
      var h=line.match(/^\s*==+\s*(.+?)\s*=*\s*$/);
      if(h){ cur={title:h[1],lines:[]}; sections.push(cur); return; }
      if(!cur){ var m=line.match(/^\s*([A-Za-z][\w &\/-]*?)\s*:\s*(.*)$/); if(m&&m[2]) meta.push([m[1].trim(),m[2].trim()]); return; }
      cur.lines.push(line);
    });
    sections.forEach(function(s){ s.blocks=blocks(s.lines); });
    return {meta:meta, sections:sections};
  }
  function blocks(lines){
    var out=[], para=[], list=null, quote=null;
    function flush(){
      if(para.length){ out.push({t:"p",text:para.join(" ")}); para=[]; }
      if(list){ out.push(list); list=null; }
      if(quote){ out.push(quote); quote=null; }
    }
    lines.forEach(function(raw){
      var line=raw.trim();
      if(!line){ flush(); return; }
      var media=line.match(/^\[\s*(image|images|gif)\s*:\s*(.+)\]$/i);
      if(media){
        flush();
        var parts=media[2].split("|").map(function(x){ return x.trim(); });
        var kind=media[1].toLowerCase();
        if(kind==="images"){ out.push({t:"media",kind:"pair",srcs:parts[0].split(",").map(function(x){ return x.trim(); }).filter(Boolean),cap:parts[1]||""}); }
        else{ var bg=(parts.slice(1).filter(function(x){ return /^#[0-9a-f]{3,8}$/i.test(x); })[0])||"";
              var cap=parts.slice(1).filter(function(x){ return x!==bg; })[0]||"";
              out.push({t:"media",kind:kind,src:parts[0],cap:cap,bg:bg}); }
        return;
      }
      var q=line.match(/^>\s?(.*)$/);
      if(q){ if(para.length||list) flush(); quote=quote||{t:"quote",lines:[],cite:""};
             if(/^(—|–|--)\s*/.test(q[1])) quote.cite=q[1].replace(/^(—|–|--)\s*/,""); else quote.lines.push(q[1]); return; }
      var li=line.match(/^[-•*]\s+(.*)$/);
      if(li){ if(para.length||quote) flush(); list=list||{t:"list",items:[]}; list.items.push(li[1]); return; }
      if(list||quote) flush();
      para.push(line);
    });
    flush();
    return out;
  }

  /* ---------- build the page ---------- */
  function figure(b){
    var cap=b.cap?'<figcaption>'+inline(b.cap)+'</figcaption>':'';
    if(b.kind==="pair"){
      return '<figure class="shot full-shot pair rv"><div class="pair-grid">'+b.srcs.map(function(s){
        return '<div class="frame"><img data-src="'+esc(imgPath(s))+'" alt="'+esc(b.cap||"")+'"></div>'; }).join("")+'</div>'+cap+'</figure>';
    }
    var color=b.bg||(b.kind==="gif"?"#6B1D2A":"");
    return '<figure class="shot full-shot rv"><div class="frame'+(color?' on-color" style="--frame-bg:'+esc(color):'')+'">'+
           '<img data-src="'+esc(imgPath(b.src))+'" alt="'+esc(b.cap||"")+'"></div>'+cap+'</figure>';
  }
  function textBlock(b, hyp){
    if(b.t==="p") return hyp ? '<p class="hypo-text">'+inline(b.text)+'</p>' : '<p>'+inline(b.text)+'</p>';
    if(b.t==="list") return '<ul>'+b.items.map(function(i){ return '<li>'+inline(i)+'</li>'; }).join("")+'</ul>';
    if(b.t==="quote") return '<blockquote class="cs-quote"><p>'+inline(b.lines.join(" "))+'</p>'+(b.cite?'<cite>'+inline(b.cite)+'</cite>':'')+'</blockquote>';
    return "";
  }
  function build(data){
    var M={}; data.meta.forEach(function(kv){ var k=kv[0].toLowerCase(); (M[k]=M[k]||[]).push(kv[1]); });
    var first=function(k){ return M[k]?M[k][0]:""; };
    // draft mode: "Status: draft" -> images only; anything still in [brackets] is left out
    var draft=/^(draft|not ready|wip|hidden)$/i.test(first("status"));
    var todo=function(s){ return /\[[^\]]*\]/.test(s||""); };
    var use=function(s){ return s && !(draft&&todo(s)); };
    if(M.link){ M.link=M.link.filter(function(l){ return !/example\.com/i.test(l); }); if(!M.link.length) delete M.link; }  // the template's sample link never shows
    if(draft){ ["title","summary","subtitle","tags","link"].forEach(function(k){ if(M[k]){ M[k]=M[k].filter(use); if(!M[k].length) delete M[k]; } }); }

    // hero
    var hero=document.querySelector(".pj-hero");
    if(hero){
      var title=first("title");
      var h1=hero.querySelector("h1 .ln>span")||hero.querySelector("h1");
      if(title&&h1) h1.textContent=title;
      if(title) document.title=title+" · Bisheshwor Bhatta";
      var lead=hero.querySelector(".lead"), sum=first("summary")||first("subtitle");
      if(lead&&sum) lead.innerHTML=inline(sum);
      if(M.tags){ var kind=hero.querySelector(".pj-kind");
        if(kind) kind.innerHTML=M.tags.join(",").split(",").map(function(t){ t=t.trim(); return t?'<span>'+esc(t)+'</span>':''; }).join(""); }
      var act=hero.querySelector(".pj-actions");
      if(act&&M.link){ M.link.forEach(function(l){ var p=l.split("|"), txt=(p[1]?p[0]:"Visit live project").trim(), url=(p[1]||p[0]).trim();
        act.insertAdjacentHTML("beforeend",' <a class="btn ghost mag" href="'+esc(url)+'" target="_blank" rel="noopener">'+esc(txt)+' <span class="arr"><span>↗</span><span>↗</span></span></a>'); }); }
      // snapshot card: every line above the first == section, except the ones used in the hero
      var skip={title:1,subtitle:1,summary:1,tags:1,link:1,status:1};
      var facts=data.meta.filter(function(kv){ return !skip[kv[0].toLowerCase()] && use(kv[1]); });
      var strip=hero.querySelector(".facts-strip");
      if(facts.length){
        if(!strip){ strip=document.createElement("dl"); strip.className="facts-strip rv"; hero.querySelector(".wrap").appendChild(strip); }
        strip.classList.add("snapshot");
        strip.innerHTML=facts.map(function(kv){ return '<div><dt>'+esc(kv[0])+'</dt><dd>'+inline(kv[1])+'</dd></div>'; }).join("");
      }
    }

    // remove the old sections and images
    var olds=main.querySelectorAll(":scope > section.cs, :scope > .full-gallery");
    var spot=document.createElement("div"); spot.className="cs-spot";
    if(olds.length) olds[0].before(spot);
    else{ var nx=document.getElementById("next"), hold=nx?nx.closest("main > *"):null;
          if(!hold){ var kids=[].slice.call(main.children).filter(function(k){ return !k.classList.contains("pj-hero"); }); hold=kids[kids.length-1]||null; }
          if(hold) hold.before(spot); else main.appendChild(spot); }
    olds.forEach(function(el){ el.remove(); });

    // sections: text goes in the two-column layout, images break out to full width
    var html="";
    if(draft){
      // draft: collect every image from all sections, drop unfinished captions, no text at all
      var media=[];
      data.sections.forEach(function(s){ s.blocks.forEach(function(b){
        if(b.t!=="media") return;
        if(todo(b.cap)) b.cap="";
        if(b.kind==="pair"){ b.srcs=b.srcs.filter(function(x){ return !todo(x); }); if(!b.srcs.length) return; }
        else if(todo(b.src)) return;
        media.push(b);
      }); });
      if(media.length) html='<div class="full-gallery cs-draft">'+media.map(figure).join("")+'</div>';
      data.sections=[];
    }
    data.sections.forEach(function(s,i){
      var no=String(i+1).padStart(2,"0");
      var hyp=/hypothes/i.test(s.title);
      var slug=s.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
      var groups=[], g=null;
      s.blocks.forEach(function(b){ var isM=b.t==="media";
        if(!g||g.media!==isM){ g={media:isM,items:[]}; groups.push(g); } g.items.push(b); });
      if(!groups.length||groups[0].media) groups.unshift({media:false,items:[]});   // heading always comes first
      var labelled=false;
      groups.forEach(function(gr,gi){
        if(gr.media){ html+='<div class="full-gallery">'+gr.items.map(figure).join("")+'</div>'; return; }
        var label=labelled?'<div class="cs-label"></div>':'<div class="cs-label rv"><span class="no">'+no+'</span><h2>'+esc(s.title)+'</h2></div>';
        var body=gr.items.map(function(b){ return textBlock(b,hyp); }).join("");
        if(hyp) body='<div class="hypo">'+body+'</div>';
        html+='<section class="cs wrap'+(labelled?' cs-cont':'')+(hyp?' cs-hypo':'')+'"'+(labelled?'':' id="'+(i===0?"overview":slug)+'"')+'><div class="cs-row">'+label+
              '<div class="cs-body"><div class="prose rv">'+body+'</div></div></div></section>';
        labelled=true;
      });
    });
    spot.insertAdjacentHTML("beforebegin",html); spot.remove();
    var read=document.querySelector('.pj-actions a[href="#overview"]'); if(read&&!document.getElementById("overview")) read.remove();

    // scroll reveal for the new content
    if("IntersectionObserver" in window){
      var ob=new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); ob.unobserve(en.target); } }); },{rootMargin:"0px 0px -8% 0px"});
      main.querySelectorAll(".rv:not(.in)").forEach(function(el){ ob.observe(el); });
    } else main.querySelectorAll(".rv").forEach(function(el){ el.classList.add("in"); });
  }

  /* ---------- images ---------- */
  var EXT=["jpg","JPG","png","PNG","webp","jpeg","JPEG","gif","svg"];
  function load(base, ok, fail){
    if(/\.[a-z0-9]{3,4}$/i.test(base)){ var t0=new Image(); t0.onload=function(){ ok(base); }; t0.onerror=fail; t0.src=base; return; }
    var i=0;
    (function next(){
      if(i>=EXT.length){ fail(); return; }
      var url=base+"."+EXT[i++], t=new Image();
      t.onload=function(){ ok(url); };
      t.onerror=next;
      t.src=url;
    })();
  }
  function images(){
    document.querySelectorAll("img[data-src]").forEach(function(img){
      var base=img.getAttribute("data-src"); img.removeAttribute("data-src");
      load(base, function(url){ img.src=url; }, function(){
        // draft pages: an image that isn't uploaded yet is simply left out
        var gal=img.closest(".cs-draft");
        if(gal){
          var fig=img.closest("figure"), fr=img.closest(".frame");
          if(fig&&fig.querySelector(".pair-grid")&&fig.querySelectorAll(".frame").length>1){
            fr.remove(); fig.querySelector(".pair-grid").style.gridTemplateColumns="1fr";
          } else if(fig) fig.remove();
          if(!gal.querySelector("figure")) gal.remove();
          return;
        }
        var box=document.createElement("div");
        box.className="img-missing";
        box.innerHTML="<div><b>Image not added yet</b>"+esc(base)+(/\.[a-z0-9]{3,4}$/i.test(base)?"":".jpg / .png / .webp / .gif")+"</div>";
        img.replaceWith(box);
      });
    });
    var cover=document.getElementById("cover");
    if(cover && id && !cover.querySelector("img")){
      load("images/projects/"+id+"/cover", function(url){
        var im=new Image(); im.src=url; im.alt=""; im.className="auto-cover";
        cover.innerHTML=""; cover.appendChild(im);
      }, function(){ /* keep the coloured placeholder */ });
    }
    // gentle zoom-out while each image scrolls into view (like the cover); not on GIF colour panels
    if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      var frames=[].slice.call(document.querySelectorAll(".full-shot .frame:not(.on-color)"));
      var ticking=false;
      function update(){
        ticking=false;
        var vh=window.innerHeight;
        frames.forEach(function(fr){
          var im=fr.querySelector("img"); if(!im) return;
          var r=fr.getBoundingClientRect();
          var p=Math.min(1,Math.max(0,(vh-r.top)/(vh+r.height)));
          im.style.transform="scale("+(1.08-0.08*Math.min(1,p*1.6)).toFixed(4)+") translateY("+((0.5-p)*24).toFixed(1)+"px)";
        });
      }
      function onScroll(){ if(!ticking){ ticking=true; requestAnimationFrame(update); } }
      window.addEventListener("scroll",onScroll,{passive:true});
      window.addEventListener("resize",onScroll);
      update();
    }
  }

  /* ---------- go ---------- */
  if(!id||!main){ images(); return; }
  root.classList.add("cs-loading");
  fetch("case-studies/"+id+".txt",{cache:"no-cache"})
    .then(function(r){ if(!r.ok) throw 0; return r.text(); })
    .then(function(t){ try{ build(parse(t)); }catch(e){ console.error("Case study text could not be read:",e); } })
    .catch(function(){ /* no .txt for this project: keep the HTML version */ })
    .then(function(){ root.classList.remove("cs-loading"); images(); });
})();
