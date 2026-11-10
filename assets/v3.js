if("scrollRestoration" in history)history.scrollRestoration="manual";
(function(){function top(){if(location.hash&&location.hash.length>1)return;window.scrollTo(0,0);var b=document.body&&document.body.firstElementChild;if(b&&b.scrollIntoView){try{b.scrollIntoView({block:"start"})}catch(e){b.scrollIntoView(true)}}}
document.addEventListener("DOMContentLoaded",top);window.addEventListener("load",top);window.addEventListener("pageshow",top)})();
/* Amazing Grace Luxury · V3 · shared script (all pages) */
(function(){
  var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
  var A=window.AGR||{}, EN=A.lang==="en", T=function(fr,en){return EN?en:fr};
  var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  var RATE=655.957;
  var preview=false;try{preview=window.self!==window.top}catch(e){preview=true}
  function fc(n){return n==null?T("Sur demande","On request"):String(n).replace(/\B(?=(\d{3})+(?!\d))/g," ")+" FCFA"}
  function eur(n){return n==null?"":"≈ "+Math.round(n/RATE).toLocaleString(EN?"en-GB":"fr-FR")+" €"}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function iso(d){var z=new Date(d.getTime()-d.getTimezoneOffset()*6e4);return z.toISOString().slice(0,10)}
  function abs(p){return location.href.replace(/[#?].*$/,"").replace(/[^\/]*$/,"")+p}
  var R=A.rooms||[], byId={};R.forEach(function(r){byId[r.id]=r});

  /* ── header: name appears letter by letter, solid after the hero ── */
  var hd=$("#hd"),cr=$(".hd .crest"),nm=$("#nm"),hero=$(".hero,.phero");
  if(nm){var wi=0,word=function(w){var k=wi++;return '<span class="wd" style="--k:'+k+'"><span class="ini">'+w[0]+'</span><span class="rest">'+w.slice(1).split("").map(function(c,i){return '<span class="l" style="--i:'+i+'">'+c+'</span>'}).join("")+'</span></span>'};
    nm.innerHTML=nm.textContent.trim().split(" ").map(word).join('<span class="sp"> </span>');
    var rsn=$("#rs"),lx=$("#lx");if(rsn)rsn.innerHTML=word(rsn.textContent.trim());if(lx)lx.innerHTML=word(lx.textContent.trim())}
  function play(){if(!cr)return;cr.classList.remove("go");void cr.offsetWidth;cr.classList.add("go")}
  requestAnimationFrame(play);
  var was=null,plain=document.body.classList.contains("plain");
  function hs(){var lim=hero?Math.max(80,hero.offsetHeight*0.6):-1;var s=plain||scrollY>lim;hd.classList.toggle("solid",s);if(was!==null&&s!==was&&!reduce)play();was=s}
  addEventListener("scroll",hs,{passive:true});hs();

  /* ── full-screen menu ── */
  var ov=$("#ov"),ob=$("#open");
  function om(o){ov.classList.toggle("open",o);ob.setAttribute("aria-expanded",o);document.body.style.overflow=o?"hidden":"";if(o)$("#close").focus({preventScroll:true});else ob.focus({preventScroll:true})}
  if(ov){ob.onclick=function(){om(true)};$("#close").onclick=function(){om(false)};
    $$("#ov nav a").forEach(function(a){a.addEventListener("click",function(){om(false)})});
    addEventListener("keydown",function(e){if(e.key==="Escape"&&ov.classList.contains("open"))om(false)})}

  /* ── date pickers (booking bars, room cards, reservation) ── */
  function pairDates(ci,co,defIn,defLen){
    if(!ci||!co)return;var t=new Date();t.setHours(12,0,0,0);
    ci.min=iso(t);if(!ci.value){var d=new Date(t.getTime()+(defIn||0)*864e5);ci.value=iso(d)}
    function fix(){var d=new Date(ci.value+"T12:00");if(isNaN(d))return;var m=new Date(d.getTime()+864e5);co.min=iso(m);if(!co.value||co.value<=ci.value)co.value=iso(new Date(d.getTime()+(defLen||2)*864e5))}
    fix();ci.addEventListener("change",fix);
  }
  $$("form.bkbar,form.rbook").forEach(function(f){pairDates($("[name=arrivee]",f),$("[name=depart]",f),0,2)});

  /* steppers */
  $$(".step").forEach(function(g){var o=$("output",g),h=$("input[type=hidden]",g),mn=+g.dataset.min,mx=+g.dataset.max;
    $$("button",g).forEach(function(b){b.addEventListener("click",function(){var v=Math.max(mn,Math.min(mx,+o.value+ +b.dataset.d));o.value=v;o.textContent=v;h.value=v;h.dispatchEvent(new Event("change",{bubbles:true}))})})});

  /* ── offers filter ── */
  $$(".tabs[data-filter]").forEach(function(tb){var sel=tb.dataset.filter;
    $$("button[data-f]",tb).forEach(function(b){b.addEventListener("click",function(){$$("button[data-f]",tb).forEach(function(x){x.setAttribute("aria-pressed",x===b)});var f=b.dataset.f;$$(sel).forEach(function(c){c.hidden=!(f==="all"||c.dataset.c===f)})})})});

  /* ── numbered carousels ── */
  $$(".car").forEach(function(box){
    var id=box.id,tr=$(".track",box),sl=$$(".sl",tr),ct=$('[data-for="'+id+'"]');if(!ct||!sl.length)return;
    var cur=$(".cur",ct),bar=$(".bar i",ct),pv=$(".prev",ct),nx=$(".next",ct),n=sl.length,chips=$('[data-chips="'+id+'"]');
    $(".tot",ct).textContent=String(n).padStart(2,"0");
    function idx(){var w=sl[0].offsetWidth+parseFloat(getComputedStyle(tr).columnGap||20);return Math.round(tr.scrollLeft/w)}
    function last(){return tr.scrollLeft>=tr.scrollWidth-tr.clientWidth-4}
    function upd(){var i=last()?n-1:idx();cur.textContent=String(i+1).padStart(2,"0");bar.style.width=((i+1)/n*100)+"%";pv.disabled=tr.scrollLeft<4;nx.disabled=last();if(chips)$$("button",chips).forEach(function(c,k){c.setAttribute("aria-current",k===i)})}
    function go(i){i=Math.max(0,Math.min(n-1,i));tr.scrollTo({left:sl[i].offsetLeft-sl[0].offsetLeft,behavior:reduce?"auto":"smooth"})}
    pv.onclick=function(){go(idx()-1)};nx.onclick=function(){go(idx()+1)};
    tr.addEventListener("scroll",function(){requestAnimationFrame(upd)},{passive:true});addEventListener("resize",upd);
    if(chips)sl.forEach(function(s,k){var b=document.createElement("button");b.type="button";b.textContent=s.dataset.n;b.onclick=function(){go(k)};chips.appendChild(b)});
    upd();
  });

  /* ── rooms showcase: Rooms / Suites tabs with crossfading photos ── */
  var stage=$("#stage");
  if(stage){
    var sets={ch:R.filter(function(r){return r.set==="ch"&&r.img}),su:R.filter(function(r){return r.set==="su"&&r.img})};
    $("#n-ch").textContent=sets.ch.length;$("#n-su").textContent=sets.su.length;
    var panel=$("#panel"),thumbs=$("#thumbs"),cs="ch",ci=0,timer=null,imgs={};
    R.forEach(function(r){if(!r.img)return;var im=new Image();im.src="assets/img/"+r.img;im.alt=r.n+", "+r.cat;im.decoding="async";stage.insertBefore(im,$("#s-ttl"));imgs[r.id]=im});
    var render=function(first){
      var list=sets[cs],r=list[ci];
      for(var k in imgs)imgs[k].classList.toggle("on",k===r.id);
      $("#s-ttl small").textContent=r.cat;$("#s-ttl span").textContent=r.n;
      function fill(){
        $("#s-cur").textContent=String(ci+1).padStart(2,"0");$("#s-tot").textContent=String(list.length).padStart(2,"0");
        $("#s-cat").textContent=r.cat;$("#s-name").textContent=r.n;$("#s-atout").textContent=r.at;
        $("#s-feats").innerHTML=r.f.concat([T("Petit-déjeuner inclus","Breakfast included")]).map(function(x){return"<li>"+esc(x)+"</li>"}).join("");
        $("#s-price").innerHTML=r.p==null?T("Sur demande","On request"):T("Dès ","From ")+fc(r.p)+" <small>/ "+T("nuit","night")+"</small>";
        $("#s-book").href=r.url;$("#s-more").href=r.url;
        $("#s-bar").style.width=((ci+1)/list.length*100)+"%";panel.classList.remove("out");
      }
      if(first||reduce)fill();else{panel.classList.add("out");setTimeout(fill,280)}
      thumbs.innerHTML="";list.forEach(function(x,k){var b=document.createElement("button");b.type="button";b.setAttribute("aria-label",x.n);b.setAttribute("aria-current",k===ci);b.innerHTML='<img src="assets/img/'+x.img+'" alt="">';b.onclick=function(){ci=k;render();restart()};thumbs.appendChild(b)});
    };
    var step=function(d){var n=sets[cs].length;ci=(ci+d+n)%n;render()};
    var restart=function(){clearInterval(timer);if(!reduce)timer=setInterval(function(){step(1)},6000)};
    $("#s-prev").onclick=function(){step(-1);restart()};$("#s-next").onclick=function(){step(1);restart()};
    $$(".rtabs button").forEach(function(b){b.addEventListener("click",function(){$$(".rtabs button").forEach(function(x){x.setAttribute("aria-selected",x===b)});cs=b.dataset.set;ci=0;render();restart()})});
    var sh=$(".show");sh.addEventListener("mouseenter",function(){clearInterval(timer)});sh.addEventListener("mouseleave",restart);sh.addEventListener("focusin",function(){clearInterval(timer)});
    var sx=null;stage.addEventListener("touchstart",function(e){sx=e.touches[0].clientX},{passive:true});stage.addEventListener("touchend",function(e){if(sx==null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40){step(dx<0?1:-1);restart()}sx=null});
    render(true);restart();
  }

  /* ── stone switcher: colour, title and photo crossfade per room ── */
  var sw=$("#sw:not(.solo)");
  if(sw&&R.length){
    var tb=$("#sw-t"),pics=$("#sw-i"),inf=$(".info",sw),si=0,stimer=null,els=[];
    R.forEach(function(r,k){
      var el;
      if(r.img){el=new Image();el.src="assets/img/"+r.img;el.alt=r.n+", "+r.cat;el.decoding="async";el.loading=k?"lazy":"eager"}
      else{el=document.createElement("div");el.className="soon2";el.innerHTML='<img src="assets/img/logo-icon-navy.png" alt=""><span>'+T("Photos à venir","Photos coming soon")+'</span>'}
      pics.appendChild(el);els.push(el);
      var b=document.createElement("button");b.type="button";b.setAttribute("role","tab");b.id="swt-"+r.id;
      b.innerHTML='<i style="--d:'+r.dot+'"></i>'+esc(r.n);
      b.addEventListener("click",function(){sshow(k);srestart()});tb.appendChild(b);
    });
    tb.addEventListener("keydown",function(e){var d=e.key==="ArrowRight"?1:e.key==="ArrowLeft"?-1:0;if(!d)return;e.preventDefault();sshow((si+d+R.length)%R.length);$$("button",tb)[si].focus();srestart()});
    var sshow=function(k,first){
      si=k;var r=R[k];
      sw.style.setProperty("--pbg",r.pbg);sw.style.setProperty("--ac",r.ac);
      els.forEach(function(e,j){e.classList.toggle("on",j===k)});
      $$("button",tb).forEach(function(b,j){b.setAttribute("aria-selected",j===k);b.tabIndex=j===k?0:-1});
      function fill(){
        $("#sw-c").textContent=r.cat;$("#sw-n").textContent=r.n;$("#sw-g").textContent=r.gem;$("#sw-d").textContent=r.at.replace(/\.$/,"")+". "+T("Idéal pour : ","Ideal for: ")+r.ideal;
        $("#sw-p").innerHTML=r.p==null?T("Tarif sur demande","Rate on request"):T("Dès ","From ")+fc(r.p)+" <small>/ "+T("nuit","night")+"</small>";
        $("#sw-l").href=r.url;$("#sw-b").href=r.url;inf.classList.remove("out");
      }
      if(first||reduce)fill();else{inf.classList.add("out");setTimeout(fill,260)}
    };
    var srestart=function(){clearInterval(stimer);if(!reduce)stimer=setInterval(function(){sshow((si+1)%R.length)},7000)};
    sw.addEventListener("mouseenter",function(){clearInterval(stimer)});sw.addEventListener("mouseleave",srestart);sw.addEventListener("focusin",function(){clearInterval(stimer)});
    var tx=null;pics.addEventListener("touchstart",function(e){tx=e.touches[0].clientX},{passive:true});pics.addEventListener("touchend",function(e){if(tx==null)return;var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>40){sshow((si+(dx<0?1:-1)+R.length)%R.length);srestart()}tx=null});
    sshow(0,true);srestart();
  }

  /* ── footer: accordions closed on phones ── */
  if(innerWidth<=760)$$(".ft details.fd").forEach(function(d){d.open=false});

  /* ── all rooms grid + compare (up to 3) ── */
  var grid=$("#grid");
  if(grid){
    grid.innerHTML=R.map(function(r){
      var fig=r.img?'<a href="'+r.url+'" class="fig"><figure style="background:'+r.pbg+'"><img src="assets/img/'+r.img+'" alt="'+esc(r.n)+'" loading="lazy"></figure></a>':'<a href="'+r.url+'" class="fig"><figure class="soon" style="background:'+r.pbg+'"><img src="assets/img/logo-big.png" alt=""><span>'+T("Photos à venir","Photos coming soon")+'</span></figure></a>';
      return '<article class="rc" id="rc-'+r.id+'" data-t="'+r.t+'" data-sea="'+(r.sea?1:0)+'">'+fig+'<span class="cat">'+esc(r.cat)+'</span><h3><a href="'+r.url+'">'+esc(r.n)+'</a></h3>'+(r.sea?'<span class="seab">'+T("Face à la mer","Facing the sea")+'</span>':'')+'<p class="at">'+esc(r.at)+'</p><dl><dt>'+T("Couchage","Sleeping")+'</dt><dd>'+esc(r.bed)+'</dd><dt>'+T("Cuisine","Kitchen")+'</dt><dd>'+esc(r.kit)+'</dd><dt>'+T("Idéal pour","Ideal for")+'</dt><dd>'+esc(r.ideal)+'</dd></dl><div class="ft2"><span class="pr">'+(r.p==null?T("Sur demande","On request"):fc(r.p)+' <small>/ '+T("nuit","night")+'</small>')+'</span><a class="lnk" href="'+r.url+'">'+T("Réserver","Book")+'</a></div><label class="chk"><input type="checkbox" value="'+r.id+'"> '+T("Comparer","Compare")+'</label></article>';
    }).join("");
    $$("#rf button").forEach(function(b){b.addEventListener("click",function(){$$("#rf button").forEach(function(x){x.setAttribute("aria-pressed",x===b)});var f=b.dataset.f;$$(".rc").forEach(function(c){c.hidden=!(f==="all"||c.dataset.t===f||(f==="sea"&&c.dataset.sea==="1"))})})});
    var sel=[],tray=$("#tray"),dlg=$("#cmp");
    var paint=function(){
      $$(".rc .chk input").forEach(function(i){i.checked=sel.indexOf(i.value)>-1;i.disabled=!i.checked&&sel.length>=3});
      var h=sel.map(function(id){return '<span>'+esc(byId[id].n)+'<button type="button" data-rm="'+id+'" aria-label="'+T("Retirer ","Remove ")+esc(byId[id].n)+'">✕</button></span>'}).join("");
      for(var k=sel.length;k<3;k++)h+='<span><em>'+T("Chambre ","Room ")+(k+1)+'</em></span>';
      $("#tsel").innerHTML=h;$("#tgo").disabled=sel.length<2;tray.classList.toggle("on",sel.length>0);
      $$("[data-rm]").forEach(function(b){b.onclick=function(){sel=sel.filter(function(x){return x!==b.dataset.rm});paint()}});
    };
    grid.addEventListener("change",function(e){var i=e.target;if(!i.matches(".chk input"))return;if(i.checked){if(sel.length<3)sel.push(i.value)}else sel=sel.filter(function(x){return x!==i.value});paint()});
    $("#tclear").onclick=function(){sel=[];paint()};
    $("#tgo").onclick=function(){
      var rs=sel.map(function(id){return byId[id]});
      var prices=rs.filter(function(r){return r.p!=null}).map(function(r){return r.p}),min=Math.min.apply(null,prices);
      var rows=[[T("Catégorie","Category"),function(r){return esc(r.cat)}],[T("Atout","Highlight"),function(r){return esc(r.at)}],[T("Idéal pour","Ideal for"),function(r){return esc(r.ideal)}],[T("Prix / nuit","Price / night"),function(r){return fc(r.p)+(r.p===min&&prices.length>1?'<span class="best">'+T("Meilleur prix","Best price")+'</span>':"")}],[T("Couchage","Sleeping"),function(r){return esc(r.bed)}],[T("Cuisine","Kitchen"),function(r){return esc(r.kit)}],[T("Salon","Lounge"),function(r){return esc(r.sal)}],[T("Petit-déjeuner","Breakfast"),function(){return T("Inclus","Included")}],["",function(r){return '<a class="btn" href="'+r.url+'" style="min-height:44px;padding:0 18px">'+T("Réserver","Book")+'</a>'}]];
      $("#cmp-body").innerHTML='<table><colgroup><col class="c0">'+rs.map(function(){return'<col>'}).join("")+'</colgroup><thead><tr><th></th>'+rs.map(function(r){return '<th>'+(r.img?'<img src="assets/img/'+r.img+'" alt="">':'')+'<a href="'+r.url+'">'+esc(r.n)+'</a></th>'}).join("")+'</tr></thead><tbody>'+rows.map(function(x){return '<tr><th scope="row">'+x[0]+'</th>'+rs.map(function(r){return '<td>'+x[1](r)+'</td>'}).join("")+'</tr>'}).join("")+'</tbody></table>';
      if(dlg.showModal)dlg.showModal();else dlg.setAttribute("open","");
    };
    $("#cmp-x").onclick=function(){dlg.close()};dlg.addEventListener("click",function(e){if(e.target===dlg)dlg.close()});
    paint();
  }

  /* ── lightbox for any [data-lb] group ── */
  var lb=$("#lb");
  if(lb){
    var gb=$$("[data-lb]"),li=$("#lb-i"),lc=$("#lb-c"),gi=0;
    var show=function(i){gi=(i+gb.length)%gb.length;var im=$("img",gb[gi]);li.src=gb[gi].dataset.lb||im.src;li.alt=im.alt;lc.textContent=im.alt+"  ·  "+(gi+1)+" / "+gb.length};
    gb.forEach(function(b,i){b.addEventListener("click",function(){show(i);lb.showModal()})});
    $("#lb-x").onclick=function(){lb.close()};$("#lb-p").onclick=function(){show(gi-1)};$("#lb-n").onclick=function(){show(gi+1)};
    lb.addEventListener("click",function(e){if(e.target===lb)lb.close()});
    lb.addEventListener("keydown",function(e){if(e.key==="ArrowLeft")show(gi-1);if(e.key==="ArrowRight")show(gi+1)});
  }

  /* ── FAQ open/close all ── */
  $$("[data-faq]").forEach(function(b){b.addEventListener("click",function(){var o=b.dataset.faq==="open";$$(".faq details").forEach(function(d){d.open=o})})});

  /* ── email forms (FormSubmit): absolute thank-you URL, preview guard ── */
  $$("form[data-mail]").forEach(function(f){
    var nx=$("[name=_next]",f);if(nx)nx.value=abs(A.merci);
    f.addEventListener("submit",function(e){
      var bad=$$("[required]",f).filter(function(i){return i.type==="checkbox"?!i.checked:!String(i.value).trim()||(i.type==="email"&&!/^\S+@\S+\.\S+$/.test(i.value))});
      var er=$(".err",f);
      if(bad.length){e.preventDefault();if(er)er.textContent=T("Merci de compléter les champs obligatoires.","Please fill in the required fields.");bad[0].focus();return}
      if(er)er.textContent="";
      if(f.dataset.before&&window[f.dataset.before])window[f.dataset.before]();
      if(preview){e.preventDefault();var n=$(".pv-note",f);if(n)n.hidden=false}
    });
  });

  /* ── reservation page ── */
  var rf=$("#rform");
  if(rf){
    var q=new URLSearchParams(location.search),ci=$("#f-in"),co=$("#f-out"),rs=$("#f-room");
    if(q.get("arrivee"))ci.value=q.get("arrivee");if(q.get("depart"))co.value=q.get("depart");
    ["adultes","enfants","chambres"].forEach(function(k){var v=q.get(k),el=$("#f-"+k);if(v&&el){el.value=v}});
    if(q.get("chambre")&&byId[q.get("chambre")])rs.value=q.get("chambre");
    pairDates(ci,co,14,3);
    var calc=function(){
      var cv=rs.value||"",cat=cv.indexOf("cat:")===0?cv.slice(4):null,cr=cat?R.filter(function(x){return x.cat===cat&&x.p!=null}).sort(function(x,y){return x.p-y.p})[0]:null,r=cat?cr:byId[cv],a=new Date(ci.value+"T12:00"),b=new Date(co.value+"T12:00"),n=Math.round((b-a)/864e5),rooms=+($("#f-chambres").value||1);
      if(!(n>0))n=0;
      var opts=$$(".opts input:checked").map(function(i){return i.dataset.opt});
      var hol=n>=7&&a<new Date("2027-01-10T12:00")&&b>new Date("2026-12-15T12:00");
      $("#rc-img").innerHTML=r&&r.img?'<img src="assets/img/'+r.img+'" alt="">':'';
      $("#rc-cat").textContent=r?r.cat:T("Chambre à choisir","Room to choose");$("#rc-name").textContent=cat?T("Une chambre ","Any ")+cat.toLowerCase()+T(" libre"," available"):(r?r.n:T("Choisissez une chambre","Choose a room"));
      var fmt=function(d){return isNaN(d)?"—":d.toLocaleDateString(EN?"en-GB":"fr-FR",{day:"numeric",month:"short",year:"numeric"})};
      $("#rc-dates").textContent=fmt(a)+" → "+fmt(b);
      $("#rc-nights").textContent=n+" "+(n>1?T("nuits","nights"):T("nuit","night"))+(rooms>1?" · "+rooms+" "+T("chambres","rooms"):"");
      $("#rc-guests").textContent=$("#f-adultes").value+" "+T("adulte(s)","adult(s)")+(+$("#f-enfants").value?" · "+$("#f-enfants").value+" "+T("enfant(s)","child(ren)"):"");
      
      $("#rc-opts").textContent=opts.length?opts.join(", "):"—";
      $("#rc-flag").hidden=!hol;
      var lg=n>30;var tot=r&&r.p!=null&&n&&!lg?r.p*n*rooms:null;$("#rc-rate").textContent=lg?T("Sur devis","On quote"):(r?(cat?T("dès ","from "):"")+fc(r.p):"—");
      $("#rc-total").textContent=tot!=null?fc(tot):(lg?T("Sur devis : notre équipe évalue le tarif","On quote: our team prices your stay"):T("Total confirmé par la réception","Total confirmed by reception"));
      $("#rc-eur").textContent=tot!=null?T("estimation, petit-déjeuner compris","estimate, breakfast included"):"";
      $("#h-nights").value=n;$("#h-total").value=tot!=null?fc(tot):T("À confirmer","To be confirmed");
      $("#h-room").value=cat?T("Catégorie ","Category ")+cat:(r?r.n+" · "+r.cat:"");$("#h-holiday").value=hol?T("Oui (7 nuits ou plus pendant les fêtes)","Yes (7+ nights over the holidays)"):T("Non","No");
    };
    rf.addEventListener("change",calc);rf.addEventListener("input",calc);calc();
  }

  /* ── room page: booking card goes to reservation with the room ── */
  /* (plain GET form, nothing to do) */

  /* ── gift voucher ── */
  var gf=$("#gform");
  if(gf){
    var gt="amount";
    var gsum=function(){
      var s,vis;if(gt==="amount"){var fr=+($("#g-free").value||0),c=$("[name=Montant]:checked",gf);s=fr>0?fc(fr):(c?fc(+c.dataset.amount):"—");vis=s}
      else{var r=byId[$("#g-room").value],n=Math.max(1,+$("#g-n").value||1);s=n+" "+(n>1?T("nuits","nights"):T("nuit","night"))+" · "+r.n+" ("+fc(r.p*n)+")";vis=n+" "+(n>1?T("nuits","nights"):T("nuit","night"))+" · "+r.n}
      $("#v-amount").textContent=vis;$("#g-summary").value=s;if(window.AGRcur)window.AGRcur.apply($("#v-amount").parentNode);
      $("#v-to").textContent=T("Pour : ","For: ")+($("#g-to").value||"…");$("#v-from").textContent=T("De la part de : ","From: ")+($("#g-fromname").value||"…");
    };
    $$(".gtype",gf).forEach(function(b){b.addEventListener("click",function(){gt=b.dataset.gtype;$$(".gtype",gf).forEach(function(x){x.setAttribute("aria-pressed",x===b)});$("#g-amount").hidden=gt!=="amount";$("#g-nights").hidden=gt==="amount";gsum()})});
    var gfree=$("#g-free");if(gfree){gfree.addEventListener("input",function(){if(gfree.value)$$("[name=Montant]",gf).forEach(function(x){x.checked=false})});$$("[name=Montant]",gf).forEach(function(x){x.addEventListener("change",function(){gfree.value=""})})}
    var gq=new URLSearchParams(location.search).get("chambre");if(gq&&byId[gq]&&$("#g-room")){$("#g-room").value=gq;var nb=$('.gtype[data-gtype="nights"]',gf);if(nb)nb.click()}
    gf.addEventListener("input",gsum);gf.addEventListener("change",gsum);gsum();
  }

  /* ── hero video: pause button, no autoplay with reduced motion ── */
  var hv=$(".hvid"),vb=$("#vctl");
  if(hv&&vb){
    var setB=function(){var on=hv.paused;vb.textContent=on?T("Lecture","Play"):T("Pause","Pause");vb.setAttribute("aria-pressed",on)};
    if(reduce){hv.removeAttribute("autoplay");hv.pause()}
    vb.onclick=function(){if(hv.paused){var p=hv.play();if(p&&p.catch)p.catch(function(){})}else hv.pause()};
    hv.addEventListener("play",setB);hv.addEventListener("pause",setB);setB();
  }

  /* ── video tour: plays (muted) only while on screen ── */
  $$(".phone video").forEach(function(v){
    if(reduce||!("IntersectionObserver" in window))return;
    new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){v.preload="auto";var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})},{threshold:.4}).observe(v);
  });

  /* ── reveal on scroll ── */
  if("IntersectionObserver" in window&&!reduce){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target)}})},{rootMargin:"0px 0px -8% 0px"});$$(".rv").forEach(function(el){io.observe(el)})}else{$$(".rv").forEach(function(el){el.classList.add("in")})}
})();

/* bandeau d’annonce : messages en alternance */
(function(){var a=document.getElementById("ann");if(!a)return;var ls=[].slice.call(a.querySelectorAll("a"));if(ls.length<2)return;var k=0;
  setInterval(function(){a.classList.add("fade");setTimeout(function(){ls[k].hidden=true;k=(k+1)%ls.length;ls[k].hidden=false;a.classList.remove("fade")},450)},5500)})();

/* ── devise d’affichage (indicatif) ── */
(function(){
  var RATES={XOF:1,EUR:655.957,USD:570,GBP:765,CAD:415,CHF:700};
  var EN=(window.AGR||{}).lang==="en",sel=document.getElementById("cur"),code="XOF";
  try{code=localStorage.getItem("agr-cur")||"XOF"}catch(e){}
  if(!RATES[code])code="XOF";
  var RX=/(\d{1,3}(?:[   ,]\d{3})+|\d+)\s?FCFA/g;
  function wrap(root){
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode;if(!p||/^(SCRIPT|STYLE|OPTION|TEXTAREA|SELECT)$/.test(p.nodeName)||p.closest&&p.closest(".px"))return 2;return RX.test(n.nodeValue)?(RX.lastIndex=0,1):2}}),ns=[],n;
    while(n=w.nextNode())ns.push(n);
    ns.forEach(function(t){var f=document.createDocumentFragment(),s=t.nodeValue,last=0;s.replace(RX,function(m,num,i){f.appendChild(document.createTextNode(s.slice(last,i)));var sp=document.createElement("span");sp.className="px";sp.textContent=m;f.appendChild(sp);last=i+m.length});f.appendChild(document.createTextNode(s.slice(last)));t.parentNode.replaceChild(f,t)});
  }
  function show(root){
    [].forEach.call((root||document).querySelectorAll(".px"),function(sp){
      if(!sp.dataset.v){var m=sp.textContent.replace(/[^\d]/g,"");if(!m)return;sp.dataset.v=m;sp.dataset.o=sp.textContent}
      var v=+sp.dataset.v;
      if(code==="XOF"){sp.textContent=sp.dataset.o;sp.removeAttribute("title");return}
      var x=v/RATES[code];
      sp.textContent="≈ "+new Intl.NumberFormat(EN?"en-GB":"fr-FR",{style:"currency",currency:code,maximumFractionDigits:0}).format(x);
      sp.title=sp.dataset.o+(EN?" · indicative rate":" · taux indicatif");
    });
    document.documentElement.classList.toggle("cur-x",code!=="XOF");
  }
  window.AGRcur={apply:function(root){root=root||document.body;wrap(root);show(root)}};
  if(sel){sel.value=code;sel.addEventListener("change",function(){code=sel.value;try{localStorage.setItem("agr-cur",code)}catch(e){}show(document)})}
  function go(){window.AGRcur.apply(document.body)}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go();
  setTimeout(go,1200);
})();

/* ── mini-chat WhatsApp ── */
(function(){
  var b=document.getElementById("waf"),p=document.getElementById("wachat");if(!b||!p)return;
  var body=document.getElementById("wc-b"),f=document.getElementById("wc-f"),inp=document.getElementById("wc-i"),num="2290148841111";
  function open(o){p.hidden=!o;b.classList.toggle("on",o);b.setAttribute("aria-expanded",o);if(o)setTimeout(function(){inp.focus()},50)}
  b.addEventListener("click",function(e){e.preventDefault();open(p.hidden)});
  p.querySelector(".wc-x").onclick=function(){open(false)};
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!p.hidden)open(false)});
  function send(t){t=t.trim();if(!t)return;var m=document.createElement("div");m.className="wc-m out";m.textContent=t;body.appendChild(m);body.scrollTop=body.scrollHeight;
    var pre=((window.AGR||{}).lang==="en"?"Hello Amazing Grace Luxury, ":"Bonjour Amazing Grace Luxury, ");
    window.open("https://wa.me/"+num+"?text="+encodeURIComponent(pre+t),"_blank","noopener");inp.value=""}
  f.addEventListener("submit",function(e){e.preventDefault();send(inp.value)});
  [].forEach.call(p.querySelectorAll(".wc-q button"),function(q){q.onclick=function(){inp.value=q.textContent+" : ";inp.focus()}});
})();

/* ── Réservation instantanée : page « Chambres disponibles » + page Réserver ── */
(function(){
  var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
  var A=window.AGR||{}, EN=A.lang==="en", T=function(fr,en){return EN?en:fr};
  var R=(A.rooms||[]).filter(function(r){return r.id}), byId={};R.forEach(function(r){byId[r.id]=r});
  var UNITS={"sweet-home":["opale","topaze"]};
  function units(id){return UNITS[id]||[id]}
  function fc(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g," ")+" FCFA"}
  function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function nights(a,d){return Math.round((new Date(d+"T12:00")-new Date(a+"T12:00"))/864e5)}
  function fdate(s){var d=new Date(s+"T12:00");return d.toLocaleDateString(EN?"en-GB":"fr-FR",{weekday:"short",day:"numeric",month:"long",year:"numeric"})}
  function overlap(rs,a,d){return (rs||[]).some(function(x){return x.st!=="annulee"&&x.a<d&&x.d>a})}
  function mkref(p){var c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",s="";for(var i=0;i<6;i++)s+=c[Math.floor(Math.random()*c.length)];return (p||"AGR")+"-"+s}
  function cur(el){if(window.AGRcur)window.AGRcur.apply(el)}
  function nn(n){return n+" "+(n>1?T("nuits","nights"):T("nuit","night"))}
  var CATS=[];R.forEach(function(r){if(!UNITS[r.id]&&CATS.indexOf(r.cat)<0)CATS.push(r.cat)});
  var db=null,uid=null,SHEET=null;
  var api=window.AGRbook={ready:false};

  /* options : départ tardif (heure) + navette (véhicule) — affichage des sous-champs */
  function wireOpts(root){
    $$("[data-reveal]",root).forEach(function(cb){var box=$("#"+cb.dataset.reveal);if(!box)return;var f=function(){box.hidden=!cb.checked;$$("select,input",box).forEach(function(x){x.disabled=!cb.checked})};cb.addEventListener("change",f);f()});
  }
  api.wireOpts=wireOpts;wireOpts(document);

  function fetchDispo(){
    if(SHEET)return fetch(SHEET,{cache:"no-store"}).then(function(r){return r.json()}).then(function(j){if(!j||!j.ok)throw {};return j.ranges||{}});
    var timer;return Promise.race([db.collection("dispo").get(),new Promise(function(_,rej){timer=setTimeout(function(){rej({code:"timeout"})},10000)})]).then(function(q){clearTimeout(timer);var m={};q.docs.forEach(function(s){m[s.id]=(s.data()||{}).ranges||[]});return m});
  }
  function freeFor(m,id,a,d){return units(id).every(function(u){return !overlap(m[u],a,d)})}
  /* choisit les chambres réelles pour une liste de choix {room|cat} */
  function resolve(picks,m,a,d){
    var used=[],out=[];
    picks.forEach(function(p){
      var cands=p.room?[byId[p.room]]:R.filter(function(r){return r.cat===p.cat&&!UNITS[r.id]&&r.p!=null}).sort(function(x,y){return x.p-y.p});
      var ok=cands.filter(function(r){return r&&freeFor(m,r.id,a,d)&&units(r.id).every(function(u){return used.indexOf(u)<0})})[0];
      if(!ok)throw {taken:p.room?byId[p.room].n:p.cat};
      units(ok.id).forEach(function(u){used.push(u)});out.push({id:ok.id,viaCat:!p.room?p.cat:null});
    });
    return {rooms:out,units:used};
  }
  function saveResa(item){var d=db.doc("resa/"+uid);return d.get().then(function(s){var items=(s.exists&&(s.data().items||[]))||[];return d.set({items:items.concat([item])})}).then(function(){notify(item);return item})}
  function notify(it){
    try{var b=new FormData();b.append("_subject",(it.st==="devis"?"Demande de devis ":"Nouvelle réservation ")+it.ref+" · Amazing Grace Luxury");b.append("_template","table");b.append("_captcha","false");
      ["ref","st","a","d","nuits","adultes","enfants","nom","tel","email","msg"].forEach(function(k){b.append(k,it[k]==null?"":it[k])});
      b.append("chambres",(it.rooms||[]).map(function(id){return (byId[id]||{}).n||id}).join(" + "));b.append("total",it.total==null?"Sur devis":fc(it.total));
      b.append("options",(it.options||[]).join(" ; "));
      fetch("https://formsubmit.co/ajax/"+(A.mail||"liroykd@gmail.com"),{method:"POST",body:b,headers:{Accept:"application/json"}}).catch(function(){});
    }catch(e){}
  }
  /* réservation : verrous, re-vérification, écriture */
  function sheetBook(o){
    var n=nights(o.a,o.d),LG=n>30;
    var picks=o.picks.map(function(p){
      if(p.room)return {candidates:[p.room],label:byId[p.room].n};
      return {candidates:R.filter(function(r){return r.cat===p.cat&&!UNITS[r.id]&&r.p!=null}).sort(function(x,y){return x.p-y.p}).map(function(r){return r.id}),label:p.cat}});
    var est=o.picks.reduce(function(s,p){var r=p.room?byId[p.room]:R.filter(function(x){return x.cat===p.cat&&!UNITS[x.id]&&x.p!=null}).sort(function(x,y){return x.p-y.p})[0];return s+(r&&r.p||0)*n},0);
    var body={picks:picks,a:o.a,d:o.d,ad:o.ad,en:o.en,options:o.options||[],who:o.who,devis:LG,lang:A.lang,total:LG?"":fc(est)};
    return fetch(SHEET,{method:"POST",body:JSON.stringify(body),headers:{"Content-Type":"text/plain;charset=utf-8"}}).then(function(r){return r.json()}).then(function(j){
      if(!j||!j.ok)throw (j&&j.taken?{taken:j.taken}:{});
      var tot=LG?null:j.rooms.reduce(function(s,id){return s+(byId[id]&&byId[id].p||0)*n},0);
      return {ref:j.ref,rooms:j.rooms,a:o.a,d:o.d,nuits:n,adultes:o.ad,enfants:o.en,total:tot,options:o.options,st:LG?"devis":"confirmee"};
    });
  }
  api.book=function(o){ /* o: {picks,a,d,ad,en,who,options,late} */
    if(SHEET)return sheetBook(o);
    var n=nights(o.a,o.d),LG=n>30,ref=mkref(LG?"DEV":"AGR");
    if(LG){var m0={};return fetchDispo().then(function(m){m0=m;var r=resolve(o.picks,m,o.a,o.d);
        return saveResa({ref:ref,rooms:r.rooms.map(function(x){return x.id}),a:o.a,d:o.d,nuits:n,adultes:o.ad,enfants:o.en,total:null,options:o.options,nom:o.who.nom,tel:o.who.tel,email:o.who.email,msg:o.who.msg,lang:A.lang,st:"devis",at:new Date().toISOString()})})}
    var res,holder=uid+":"+ref,allU=[];
    return fetchDispo().then(function(m){res=resolve(o.picks,m,o.a,o.d);allU=res.units;
      return Promise.all(allU.map(function(u){return db.doc("locks/"+u).acquire({holder:holder,ttlMs:8000})}))
    }).then(function(ls){
      if(ls.some(function(l){return !l.acquired}))throw {taken:T("une des chambres","one of the rooms")};
      return Promise.all(allU.map(function(u){return db.doc("dispo/"+u).get()}));
    }).then(function(snaps){
      var cur0={};snaps.forEach(function(s,i){cur0[allU[i]]=(s.exists&&(s.data().ranges||[]))||[]});
      var busy=allU.filter(function(u){return overlap(cur0[u],o.a,o.d)});
      if(busy.length)throw {taken:busy.map(function(u){return byId[u].n}).join(", ")};
      return allU.reduce(function(p,u){return p.then(function(){return db.doc("dispo/"+u).set({ranges:cur0[u].concat([{a:o.a,d:o.d,ref:ref,src:"site",st:"confirmee"}])})})},Promise.resolve());
    }).then(function(){
      var ids=res.rooms.map(function(x){return x.id});
      var tot=ids.reduce(function(s,id){return s+(byId[id].p||0)*n},0);
      return saveResa({ref:ref,rooms:ids,parCategorie:res.rooms.filter(function(x){return x.viaCat}).map(function(x){return x.viaCat}),a:o.a,d:o.d,nuits:n,adultes:o.ad,enfants:o.en,total:tot,options:o.options,nom:o.who.nom,tel:o.who.tel,email:o.who.email,msg:o.who.msg,lang:A.lang,st:"confirmee",at:new Date().toISOString()});
    });
  };
  api.request=function(o){ /* hors Claude : la demande part par email, la réception confirme */
    var n=nights(o.a,o.d),LG=n>30,ref=mkref(LG?"DEV":"DEM");
    var ids=o.picks.map(function(p){return p.room||null}).filter(Boolean),cats=o.picks.filter(function(p){return p.cat}).map(function(p){return p.cat});
    var tot=LG?null:o.picks.reduce(function(s,p){var r=p.room?byId[p.room]:R.filter(function(x){return x.cat===p.cat&&!UNITS[x.id]&&x.p!=null}).sort(function(x,y){return x.p-y.p})[0];return s+(r&&r.p||0)*n},0);
    var it={ref:ref,rooms:ids,cats:cats,a:o.a,d:o.d,nuits:n,adultes:o.ad,enfants:o.en,total:tot,options:o.options,nom:o.who.nom,tel:o.who.tel,email:o.who.email,msg:o.who.msg,st:LG?"devis":"demande"};
    var b=new FormData();b.append("_subject",(LG?"Demande de devis ":"Demande de réservation ")+ref+" · Amazing Grace Luxury");b.append("_template","table");b.append("_captcha","false");
    b.append("_cc","reception.agrluxury@gmail.com");
    [["Référence",ref],["Chambres",ids.map(function(id){return byId[id].n}).concat(cats.map(function(c){return T("Catégorie ","Category ")+c})).join(" + ")],["Arrivée",o.a],["Départ",o.d],["Nuits",n],["Adultes",o.ad],["Enfants",o.en],["Total estimé",tot==null?"Sur devis":fc(tot)],["Options",(o.options||[]).join(" ; ")],["Nom",o.who.nom],["Téléphone",o.who.tel],["email",o.who.email],["Message",o.who.msg]].forEach(function(x){b.append(x[0],x[1]==null?"":x[1])});
    return fetch("https://formsubmit.co/ajax/"+(A.mail||"liroykd@gmail.com"),{method:"POST",body:b,headers:{Accept:"application/json"}}).then(function(r){if(!r.ok)throw {};return it});
  };
  api.done=function(box,it){
    if(it.st==="demande"){
      box.innerHTML='<div class="avl-done"><span class="ok">✓</span><h2>'+T("Demande de réservation envoyée","Booking request sent")+'</h2><p class="refn">'+T("Référence :","Reference:")+' <b>'+it.ref+'</b></p>'+
      '<p>'+it.rooms.map(function(id){return esc(byId[id].n)}).concat((it.cats||[]).map(function(c){return T("Une chambre ","Any ")+esc(c.toLowerCase())})).join(" + ")+' · '+fdate(it.a)+' → '+fdate(it.d)+' · '+nn(it.nuits)+'</p>'+
      (it.total!=null?'<p class="tot"><span class="px">'+fc(it.total)+'</span> <small>'+T("estimation, petit-déjeuner inclus","estimate, breakfast included")+'</small></p>':'')+
      '<p class="avl-note">'+T("La réception vérifie la disponibilité et vous confirme votre réservation très vite, sur WhatsApp ou par email.","Reception checks availability and confirms your booking very soon, on WhatsApp or by email.")+'</p>'+
      '<p style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><a class="btn" target="_blank" rel="noopener" href="https://wa.me/2290148841111?text='+encodeURIComponent(T("Bonjour, je viens d’envoyer une demande de réservation. Référence : ","Hello, I have just sent a booking request. Reference: ")+it.ref)+'">'+T("Écrire à la réception","Message reception")+'</a><a class="btn ghost" href="'+(EN?"index-en.html":"index.html")+'">'+T("Retour à l’accueil","Back to home")+'</a></p></div>';
      cur(box);box.scrollIntoView({block:"start"});return}
    var dv=it.st==="devis";
    box.innerHTML='<div class="avl-done"><span class="ok">✓</span><h2>'+(dv?T("Demande de devis envoyée","Quote request sent"):T("Votre réservation est confirmée","Your booking is confirmed"))+'</h2><p class="refn">'+T("Référence :","Reference:")+' <b>'+it.ref+'</b></p>'+
      '<p>'+it.rooms.map(function(id){return esc(byId[id].n)}).join(" + ")+' · '+fdate(it.a)+' → '+fdate(it.d)+' · '+nn(it.nuits)+'</p>'+
      (dv?'':'<p class="tot"><span class="px">'+fc(it.total)+'</span> <small>'+T("petit-déjeuner inclus · à régler à la réception","breakfast included · paid at reception")+'</small></p>')+
      (it.options&&it.options.length?'<p class="avl-note">'+esc(it.options.join(" · "))+'</p>':'')+
      '<p class="avl-note">'+(dv?T("Notre équipe évalue le tarif de votre séjour et vous adresse un devis sur WhatsApp ou par email.","Our team will price your stay and send you a quote on WhatsApp or by email."):T("Votre chambre vous attend. La réception vous contacte sur WhatsApp ou par email pour préparer votre arrivée.","Your room is waiting for you. Reception will contact you on WhatsApp or by email to prepare your arrival."))+'</p>'+
      '<p style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><a class="btn" target="_blank" rel="noopener" href="https://wa.me/2290148841111?text='+encodeURIComponent(T("Bonjour, je viens de réserver sur le site. Référence : ","Hello, I have just booked on the website. Reference: ")+it.ref)+'">'+T("Écrire à la réception","Message reception")+'</a><a class="btn ghost" href="'+(EN?"index-en.html":"index.html")+'">'+T("Retour à l’accueil","Back to home")+'</a></p></div>';
    cur(box);box.scrollIntoView({block:"start"});
  };
  function errMsg(e){return e&&e.taken?T("Désolé, ","Sorry, ")+e.taken+T(" n’est plus libre à ces dates. Choisissez une autre chambre."," is no longer available for these dates. Please choose another room."):T("La réservation n’a pas pu être enregistrée. Réessayez ou écrivez-nous sur WhatsApp.","The booking could not be saved. Try again or message us on WhatsApp.")}
  function readOpts(f){
    var o=[];
    if(f.navette&&f.navette.checked)o.push(T("Navette aéroport","Airport shuttle")+" ("+f.vehicule.value+(f.vol&&f.vol.value.trim()?", "+f.vol.value.trim():"")+")");
    if(f.tardif&&f.tardif.checked)o.push(T("Départ tardif","Late check-out")+" : "+f.heure.value+" ("+T("supplément","extra charge")+")");
    $$("input[data-xopt]:checked",f).forEach(function(x){o.push(x.dataset.xopt)});
    return o;
  }
  function validate(f,err){
    var bad=$$("[required]",f).filter(function(i){return !i.disabled&&(i.type==="checkbox"?!i.checked:!String(i.value).trim()||(i.type==="email"&&!/^\S+@\S+\.\S+$/.test(i.value)))});
    if(bad.length){err.textContent=T("Merci de compléter les champs obligatoires.","Please fill in the required fields.");bad[0].focus();return false}return true;
  }

  function goContact(o){
    var st={picks:o.picks,a:o.a,d:o.d,ad:o.ad,en:o.en,options:o.options||[],back:location.pathname.split("/").pop()+location.search};
    try{sessionStorage.setItem("agr-sel",JSON.stringify(st))}catch(e){}
    location.href=A.contact+"?s="+encodeURIComponent(JSON.stringify(st));
  }
  /* ===== page « Chambres disponibles » ===== */
  function results(){
    var page=$("#res-wrap");if(!page)return;
    var q=new URLSearchParams(location.search),sf=$("form.bkbar",page.parentNode)||$("form.bkbar");
    var st={a:q.get("arrivee"),d:q.get("depart"),ad:+q.get("adultes")||2,en:+q.get("enfants")||0,nr:+q.get("chambres")||1,room:q.get("chambre")};
    if(sf){if(st.a)sf.arrivee.value=st.a;if(st.d)sf.depart.value=st.d;["chambres","adultes","enfants"].forEach(function(k){var i=sf.querySelector("[name="+k+"]");var v=q.get(k);if(i&&v){i.value=v;var o=i.parentNode.querySelector("output");if(o)o.textContent=v}})}
    var list=$("#res-list"),sum=$("#res-sum");
    if(!st.a||!st.d||st.d<=st.a){sum.textContent=T("Choisissez vos dates d’arrivée et de départ pour voir les chambres libres.","Choose your check-in and check-out dates to see the available rooms.");return}
    var n=nights(st.a,st.d),LG=n>30;
    sum.innerHTML='<b>'+fdate(st.a)+' → '+fdate(st.d)+'</b> · '+nn(n)+' · '+st.ad+' '+T(st.ad>1?"adultes":"adulte",st.ad>1?"adults":"adult")+(st.en?' · '+st.en+' '+T(st.en>1?"enfants":"enfant",st.en>1?"children":"child"):'')+(st.nr>1?' · '+st.nr+' '+T("chambres","rooms"):'');
    list.innerHTML='<p class="avl-load">'+T("Recherche des chambres libres…","Finding available rooms…")+'</p>';
    var OFF=!api.ready;
    (OFF?Promise.resolve({}):fetchDispo()).then(function(m){
      var h='';if(LG)h+='<p class="avl-lg">'+T("Pour un séjour de plus d’un mois, le tarif est établi sur devis : notre équipe l’évalue selon la durée et la chambre, puis revient vers vous.","For stays over one month, the rate is set on quote: our team prices it by length and room, then gets back to you.")+'</p>';
      var anyFree=false;
      CATS.concat(["__sweet"]).forEach(function(cat){
        var rooms=cat==="__sweet"?R.filter(function(r){return UNITS[r.id]}):R.filter(function(r){return r.cat===cat&&!UNITS[r.id]});
        if(!rooms.length)return;
        var free=rooms.filter(function(r){return freeFor(m,r.id,st.a,st.d)}),bookable=free.filter(function(r){return r.p!=null||LG});
        if(free.length)anyFree=true;
        var title=cat==="__sweet"?T("Pour les familles","For families"):cat;
        h+='<section class="rg-cat"><div class="rg-h"><h2>'+esc(title)+'</h2><span>'+(OFF?rooms.length+" "+T(rooms.length>1?"chambres":"chambre",rooms.length>1?"rooms":"room"):(free.length?free.length+" "+T(free.length>1?"chambres libres":"chambre libre",free.length>1?"rooms available":"room available"):T("Complet à ces dates","Fully booked for these dates")))+'</span></div><div class="avl-list">';
        if(bookable.length>1&&cat!=="__sweet"){var mn=Math.min.apply(null,bookable.map(function(r){return r.p||0}));
          h+='<label class="avl-r anycat"><span class="ph">✦</span><span class="t"><span class="c">'+T("Peu importe la chambre","Any room")+'</span><span class="n">'+T("Une chambre ","Any ")+esc(cat.toLowerCase())+T(" libre",""+" available")+'</span><span class="s">'+T("Nous vous attribuons la meilleure chambre libre de cette catégorie.","We assign you the best available room in this category.")+'</span></span><span class="p">'+(LG?'<b>'+T("Sur devis","On quote")+'</b>':'<b>'+T("dès ","from ")+'<span class="px">'+fc(mn*n)+'</span></b><small><span class="px">'+fc(mn)+'</span> × '+nn(n)+'</small>')+'</span><input type="checkbox" data-cat="'+esc(cat)+'"><span class="ck" aria-hidden="true"></span></label>'}
        rooms.forEach(function(r){var ok=freeFor(m,r.id,st.a,st.d),bk=ok&&(r.p!=null||LG);
          var tot=LG?'<b>'+T("Sur devis","On quote")+'</b>':r.p!=null?'<b><span class="px">'+fc(r.p*n)+'</span></b><small><span class="px">'+fc(r.p)+'</span> × '+nn(n)+'</small>':'<b>'+T("Sur demande","On request")+'</b>';
          h+='<label class="avl-r'+(ok?"":" off")+'" style="--pbg:'+r.pbg+';--ac:'+r.ac+'">'+(r.img?'<img src="assets/img/'+r.img+'" alt="" loading="lazy">':'<span class="ph"></span>')+
          '<span class="t"><span class="c">'+esc(r.cat)+'</span><span class="n"><a href="'+r.url+'" target="_blank" rel="noopener">'+esc(r.n)+'</a>'+(r.sea?' <span class="seab">'+T("Face à la mer","Facing the sea")+'</span>':'')+'</span><span class="s">'+(ok?(bk?(OFF?T("Disponibilité confirmée par la réception","Availability confirmed by reception"):'✓ '+T("Libre à ces dates","Available for these dates")):T("Libre · tarif sur demande","Available · rate on request")):T("Indisponible à ces dates","Unavailable for these dates"))+'</span></span>'+
          '<span class="p">'+(ok?tot:'')+'</span>'+(bk?'<input type="checkbox" data-room="'+r.id+'"'+(st.room===r.id?" checked":"")+'><span class="ck" aria-hidden="true"></span>':(ok&&r.p==null?'<a class="lnk" href="'+A.resv+'?chambre='+r.id+'&arrivee='+st.a+'&depart='+st.d+'">'+T("Demander","Ask")+'</a>':'<span></span>'))+'</label>'});
        h+='</div></section>';
      });
      if(!anyFree)h='<p class="avl-none">'+T("Aucune chambre n’est libre à ces dates. Essayez d’autres dates ou écrivez-nous sur WhatsApp.","No room is available for these dates. Try other dates or message us on WhatsApp.")+'</p>'+h;
      list.innerHTML=h;cur(list);
      if(st.room){var c=$('input[data-room="'+st.room+'"]',list);var lab=c&&c.closest(".avl-r");if(lab)setTimeout(function(){lab.scrollIntoView({block:"center"})},200);
        if(!c){var off=$$(".avl-r.off a",list).filter(function(a){return a.href.indexOf("chambre-"+st.room)>-1})[0];if(off)$("#res-note").innerHTML='<p class="avl-lg">'+T("Cette chambre n’est pas libre à ces dates. Voici les autres chambres disponibles.","This room isn’t available for these dates. Here are the other available rooms.")+'</p>'}}
      var f=$("#res-f");
      function picks(){return $$("input[data-room]:checked,input[data-cat]:checked",list).map(function(i){return i.dataset.room?{room:i.dataset.room}:{cat:i.dataset.cat}})}
      function sel(){var p=picks();f.hidden=!p.length;$("#res-bar").hidden=!p.length;if(!p.length)$("#res-bar").classList.remove("open");
        if(!p.length)return p;
        var tot=0,lab=p.map(function(x){if(x.room){tot+=(byId[x.room].p||0)*n;return byId[x.room].n}var mn=Math.min.apply(null,R.filter(function(r){return r.cat===x.cat&&!UNITS[r.id]&&r.p!=null&&freeFor(m,r.id,st.a,st.d)}).map(function(r){return r.p}));tot+=mn*n;return T("Une chambre ","Any ")+x.cat.toLowerCase()});
        var s=lab.join(" + ")+' · '+nn(n)+' · <b>'+(LG?T("Sur devis","On quote"):'<span class="px">'+fc(tot)+'</span>')+'</b>';
        $("#res-sum2").innerHTML=s;$("#res-bar-t").innerHTML=s+' <i class="rb-up" aria-hidden="true">▴</i>';cur(f);cur($("#res-bar"));
        var pop=$("#res-pop");if(pop){var tt=0;pop.innerHTML='<p class="kick">'+T("Votre sélection","Your selection")+'</p>'+p.map(function(x){var r=x.room?byId[x.room]:R.filter(function(y){return y.cat===x.cat&&!UNITS[y.id]&&y.p!=null&&freeFor(m,y.id,st.a,st.d)}).sort(function(a2,b2){return a2.p-b2.p})[0];tt+=(r&&r.p||0)*n;
            return '<div class="rp-r">'+(r&&r.img?'<img src="assets/img/'+r.img+'" alt="">':'<span class="ph">✦</span>')+'<span><b>'+(x.room?esc(r.n):T("Une chambre ","Any ")+esc(x.cat.toLowerCase()))+'</b><small>'+esc(r?r.cat:x.cat)+'</small></span><span class="pp">'+(LG?T("Sur devis","On quote"):'<span class="px">'+fc((r&&r.p||0)*n)+'</span>')+'</span><button type="button" class="rp-x" data-un="'+(x.room?'room:'+x.room:'cat:'+esc(x.cat))+'" aria-label="'+T("Retirer","Remove")+'">✕</button></div>'}).join("")+
            '<div class="rp-d"><span>'+fdate(st.a)+' → '+fdate(st.d)+'</span><span>'+nn(n)+' · '+st.ad+' '+T(st.ad>1?"adultes":"adulte",st.ad>1?"adults":"adult")+(st.en?' · '+st.en+' '+T(st.en>1?"enfants":"enfant",st.en>1?"children":"child"):'')+'</span></div>'+
            '<div class="rp-t"><span>Total · '+T("petit-déjeuner inclus","breakfast included")+'</span><b>'+(LG?T("Sur devis","On quote"):'<span class="px">'+fc(tt)+'</span>')+'</b></div>';
          cur(pop);
          $$("[data-un]",pop).forEach(function(bx){bx.onclick=function(){var v=bx.dataset.un,k=v.indexOf(":"),ty=v.slice(0,k),val=v.slice(k+1);var inp=ty==="room"?$('input[data-room="'+val+'"]',list):$$("input[data-cat]",list).filter(function(z){return z.dataset.cat===val})[0];if(inp){inp.checked=false;inp.dispatchEvent(new Event("change"))}}})}
        $("#res-go").textContent=T("Continuer vers mes coordonnées","Continue to my details");
        return p}
      $$("input[data-room],input[data-cat]",list).forEach(function(i){i.addEventListener("change",sel)});sel();
      $("#res-bar-go").onclick=function(){$("#res-bar").classList.remove("open");f.scrollIntoView({behavior:"smooth",block:"start"})};
      $("#res-bar-t").onclick=function(){$("#res-bar").classList.toggle("open")};
      document.addEventListener("click",function(ev){var bar=$("#res-bar");if(bar&&bar.classList.contains("open")&&!bar.contains(ev.target)&&!ev.target.closest("[data-un]"))bar.classList.remove("open")});
      if("IntersectionObserver" in window){var vis=false;new IntersectionObserver(function(es){vis=es[0].isIntersecting;$("#res-bar").classList.toggle("away",vis)}).observe(f)}
      f.onsubmit=function(e){e.preventDefault();var p=sel(),err=$("#res-err");err.textContent="";if(!p.length){err.textContent=T("Choisissez au moins une chambre.","Choose at least one room.");return}
        goContact({picks:p,a:st.a,d:st.d,ad:st.ad,en:st.en,options:readOpts(f)})};
    },function(){list.innerHTML='<p class="avl-none">'+T("Impossible de vérifier les disponibilités pour le moment.","Availability can’t be checked right now.")+' <a href="'+A.resv+'?arrivee='+st.a+'&depart='+st.d+'">'+T("Envoyer une demande","Send a request")+'</a></p>'});
  }

  /* ===== page Réserver : réservation instantanée quand la base est là ===== */
  function resvPage(){
    var f=$("#rform");if(!f)return;
    f.addEventListener("submit",function(e){
      if(!api.ready)return; /* sinon : envoi classique par email */
      e.preventDefault();e.stopImmediatePropagation();
      var err=$(".err",f);err.textContent="";if(!validate(f,err))return;
      var a=f.querySelector("#f-in").value,d=f.querySelector("#f-out").value;if(!a||!d||d<=a){err.textContent=T("Vérifiez vos dates.","Check your dates.");return}
      var v=$("#f-room").value,nr=+($("#f-chambres").value||1),p=[];for(var k=0;k<nr;k++)p.push(v.indexOf("cat:")===0?{cat:v.slice(4)}:(k===0?{room:v}:{cat:byId[v].cat}));
      var go=$("button[type=submit]",f),lbl=go.textContent;go.disabled=true;go.textContent=T("Un instant…","One moment…");
      api.book({picks:p,a:a,d:d,ad:+$("#f-adultes").value||2,en:+$("#f-enfants").value||0,options:readOpts(f),who:{nom:$("#f-nm").value.trim(),tel:$("#f-tel").value.trim(),email:$("#f-em").value.trim(),msg:$("#f-msg").value.trim()}})
        .then(function(it){api.done($(".resv"),it)},function(e2){go.disabled=false;go.textContent=lbl;
          err.innerHTML=errMsg(e2)+(e2&&e2.taken?' <a href="'+A.avail+'?arrivee='+a+'&depart='+d+'&adultes='+$("#f-adultes").value+'&enfants='+$("#f-enfants").value+'">'+T("Voir les chambres libres","See available rooms")+'</a>':'')})
    },true);
  }

  /* ===== fiche chambre : étape de confirmation ===== */
  function roomPage(){
    var f=$("#rbook"),sec=$("#confirmer"),cf=$("#cf-f");if(!f||!sec||!cf)return;
    var id=f.chambre.value,r=byId[id],st=null,msg=$("#rb-msg");
    function opts(){return readOpts(cf)}
    function recap(){if(!st)return;var n=nights(st.a,st.d),LG=n>30;
      $("#cf-dates").textContent=fdate(st.a)+" → "+fdate(st.d);$("#cf-n").textContent=nn(n);
      $("#cf-g").textContent=st.ad+" "+T(st.ad>1?"adultes":"adulte",st.ad>1?"adults":"adult")+(st.en?" · "+st.en+" "+T(st.en>1?"enfants":"enfant",st.en>1?"children":"child"):"");
      $("#cf-rate").innerHTML=LG?T("Sur devis","On quote"):(r.p!=null?'<span class="px">'+fc(r.p)+'</span>':T("Sur demande","On request"));
      $("#cf-tot").innerHTML=LG?T("Sur devis","On quote"):(r.p!=null?'<span class="px">'+fc(r.p*n)+'</span>':T("Confirmé par la réception","Confirmed by reception"));
      var o=opts();$("#cf-opts").textContent=o.length?o.join(" · "):"—";
      $("#cf-go").textContent=LG?T("Envoyer ma demande de devis","Send my quote request"):(api.ready?T("Confirmer ma réservation","Confirm my booking"):T("Je réserve dès maintenant","Book now"));
      cur(sec)}
    cf.addEventListener("change",recap);cf.addEventListener("input",recap);
    $("#cf-edit").onclick=function(e){e.preventDefault();f.scrollIntoView({behavior:"smooth",block:"center"})};
    f.addEventListener("submit",function(e){e.preventDefault();msg.textContent="";
      var a=f.arrivee.value,d=f.depart.value;if(!a||!d||d<=a){msg.textContent=T("Choisissez vos dates d’arrivée et de départ.","Choose your check-in and check-out dates.");return}
      st={a:a,d:d,ad:+f.adultes.value||2,en:+f.enfants.value||0};
      var go=$("button[type=submit]",f),lbl=go.textContent;
      function show(){sec.hidden=false;recap();setTimeout(function(){sec.scrollIntoView({behavior:"smooth",block:"start"})},50)}
      if(!api.ready){show();return}
      go.disabled=true;go.textContent=T("Vérification…","Checking…");
      fetchDispo().then(function(m){go.disabled=false;go.textContent=lbl;
        if(freeFor(m,id,a,d)){show();return}
        sec.hidden=true;msg.innerHTML=T("Cette chambre est indisponible à ces dates. ","This room is unavailable for these dates. ")+'<a href="'+A.avail+'?arrivee='+a+'&depart='+d+'&adultes='+st.ad+'&enfants='+st.en+'">'+T("Voir les autres chambres libres","See other available rooms")+'</a>';
      },function(){go.disabled=false;go.textContent=lbl;show()});
    });
    cf.addEventListener("submit",function(e){e.preventDefault();if(!st)return;goContact({picks:[{room:id}],a:st.a,d:st.d,ad:st.ad,en:st.en,options:opts()})});
  }
  /* ===== page « Vos coordonnées » ===== */
  function coordPage(){
    var f=$("#co-f");if(!f)return;var box=$("#co-sum"),st=null;
    try{st=JSON.parse(new URLSearchParams(location.search).get("s")||"null")}catch(e){}
    if(!st){try{st=JSON.parse(sessionStorage.getItem("agr-sel")||"null")}catch(e){}}
    if(!st||!st.picks||!st.picks.length||!st.a||!st.d){$("#co-wrap").innerHTML='<p class="avl-none">'+T("Aucune sélection en cours. ","No selection in progress. ")+'<a href="'+(EN?"chambres-en.html":"chambres.html")+'">'+T("Choisir une chambre","Choose a room")+'</a></p>';return}
    var n=nights(st.a,st.d),LG=n>30,tot=0,first=null;
    var rows=st.picks.map(function(p){var r=p.room?byId[p.room]:R.filter(function(x){return x.cat===p.cat&&!UNITS[x.id]&&x.p!=null}).sort(function(x,y){return x.p-y.p})[0];if(!first)first=r;tot+=(r&&r.p||0)*n;
      return '<div class="row"><span>'+(p.room?esc(r.n):T("Une chambre ","Any ")+esc(p.cat.toLowerCase()))+'</span><span>'+(LG?T("Sur devis","On quote"):(r&&r.p!=null?(p.room?'':T("dès ","from "))+'<span class="px">'+fc(r.p*n)+'</span>':T("Sur demande","On request")))+'</span></div>'}).join("");
    box.innerHTML=(first&&first.img?'<img src="assets/img/'+first.img+'" alt="">':'')+'<div class="b"><p class="kick">'+T("Votre sélection","Your selection")+'</p>'+rows+
      '<div class="row"><span>Dates</span><span>'+fdate(st.a)+' → '+fdate(st.d)+'</span></div><div class="row"><span>'+T("Durée","Length")+'</span><span>'+nn(n)+'</span></div>'+
      '<div class="row"><span>'+T("Voyageurs","Guests")+'</span><span>'+st.ad+' '+T(st.ad>1?"adultes":"adulte",st.ad>1?"adults":"adult")+(st.en?' · '+st.en+' '+T(st.en>1?"enfants":"enfant",st.en>1?"children":"child"):'')+'</span></div>'+
      '<div class="row"><span>'+T("Petit-déjeuner","Breakfast")+'</span><span>'+T("Inclus","Included")+'</span></div>'+
      '<div class="row"><span>Options</span><span>'+(st.options&&st.options.length?esc(st.options.join(" · ")):"—")+'</span></div>'+
      '<div class="tot"><span>Total</span><b>'+(LG?T("Sur devis","On quote"):'<span class="px">'+fc(tot)+'</span>')+'</b></div>'+
      (st.back?'<a class="lnk" href="'+esc(st.back)+'">'+T("Modifier ma sélection","Change my selection")+'</a>':'')+'</div>';
    cur(box);
    $("#co-go").textContent=LG?T("Envoyer ma demande de devis","Send my quote request"):(api.ready?T("Confirmer ma réservation","Confirm my booking"):T("Je réserve dès maintenant","Book now"));
    f.addEventListener("submit",function(e){e.preventDefault();var err=$("#co-err");err.textContent="";if(!validate(f,err))return;
      var go=$("#co-go"),lbl=go.textContent;go.disabled=true;go.textContent=T("Un instant…","One moment…");
      var nom=(f.prenom.value.trim()+" "+f.nom.value.trim()).trim(),m0=f.msg.value.trim(),py=f.pays.value.trim(),msg=m0+(py?(m0?" · ":"")+T("Pays : ","Country: ")+py:"");
      (api.ready?api.book:api.request)({picks:st.picks,a:st.a,d:st.d,ad:st.ad,en:st.en,options:st.options,who:{nom:nom,tel:f.tel.value.trim(),email:f.email.value.trim(),msg:msg}})
        .then(function(it){try{sessionStorage.removeItem("agr-sel")}catch(e){}api.done($("#co-wrap"),it)},function(e2){go.disabled=false;go.textContent=lbl;err.innerHTML=errMsg(e2)+(e2&&e2.taken?' <a href="'+A.avail+'?arrivee='+st.a+'&depart='+st.d+'">'+T("Voir les chambres libres","See available rooms")+'</a>':'')})});
  }
  function start(){results();resvPage();roomPage();coordPage()}
  function noDb(){if(A.api){SHEET=A.api;api.ready=true}start()}
  if(!window.claude||!window.claude.use){noDb();return}
  Promise.all([window.claude.use("db"),window.claude.use("user")]).then(function(x){
    db=x[0];var user=x[1];if(!db||!user){noDb();return}
    return user.id().then(function(id){uid=id;api.ready=!!uid;start()});
  }).catch(function(){noDb()});
})();

/* ── Espace réception ── */
(function(){
  var box=document.getElementById("recep");if(!box)return;
  var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
  var A=window.AGR||{}, R=(A.rooms||[]), byId={};R.forEach(function(r){byId[r.id]=r});
  var UNITS={"sweet-home":["opale","topaze"]};function units(id){return UNITS[id]||[id]}
  var PHYS=R.map(function(r){return r.id}).filter(function(id){return !UNITS[id]});
  function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function fc(n){return n==null?"—":String(n).replace(/\B(?=(\d{3})+(?!\d))/g," ")+" FCFA"}
  function fd(s){return new Date(s+"T12:00").toLocaleDateString("fr-FR",{day:"numeric",month:"short"})}
  function iso(d){var z=new Date(d.getTime()-d.getTimezoneOffset()*6e4);return z.toISOString().slice(0,10)}
  var msg=$("#rc-msg",box);
  if(!window.claude||!window.claude.use){msg.textContent="L’espace réception fonctionne uniquement dans la page publiée sur claude.ai.";return}
  var db,dispo={},resa=[];
  Promise.all([claude.use("db"),claude.use("user")]).then(function(x){
    db=x[0];var user=x[1];
    if(!db||!user){msg.textContent="Connexion à la base indisponible.";return}
    return user.canEdit().then(function(ok){
      if(!ok){msg.textContent="Accès réservé à la réception (propriétaire ou éditeur de la page).";return}
      msg.hidden=true;$("#rc-app",box).hidden=false;
      var t1=setTimeout(function(){msg.hidden=false;msg.textContent="Les données mettent du temps à arriver…"},10000);
      db.collection("dispo").onSnapshot(function(q){clearTimeout(t1);if(!q.metadata.fromCache)msg.hidden=true;dispo={};q.docs.forEach(function(s){dispo[s.id]=(s.data()||{}).ranges||[]});draw()},function(e){msg.hidden=false;msg.textContent="Erreur de lecture ("+e.code+")."});
      db.collection("resa").onSnapshot(function(q){resa=[];q.docs.forEach(function(s){((s.data()||{}).items||[]).forEach(function(it,i){resa.push({doc:s.id,i:i,it:it})})});draw()},function(){});
    });
  });
  function draw(){
    // calendar 28 days
    var t=new Date();t.setHours(12,0,0,0);var days=[];for(var k=0;k<28;k++)days.push(iso(new Date(t.getTime()+k*864e5)));
    var h='<div class="cal"><div class="cr chd"><span></span>'+days.map(function(d){var x=new Date(d+"T12:00");return '<span class="'+(x.getDay()%6===0?"we":"")+'">'+x.getDate()+'</span>'}).join("")+'</div>';
    PHYS.forEach(function(id){var rs=(dispo[id]||[]).filter(function(x){return x.st!=="annulee"});
      h+='<div class="cr"><span class="nm">'+esc(byId[id].n)+'</span>'+days.map(function(d){var o=rs.filter(function(x){return x.a<=d&&x.d>d})[0];return '<button type="button" class="'+(o?(o.src==="reception"?"bl":"oc"):"")+'" data-day="'+id+'|'+d+'" title="'+esc(byId[id].n)+' · '+fd(d)+(o?" · "+esc(o.ref||o.note||""):" · libre (cliquer pour bloquer)")+'"></button>'}).join("")+'</div>'});
    $("#rc-cal",box).innerHTML=h+'</div>';
    $$("[data-day]",box).forEach(function(c){c.onclick=function(){var p=c.dataset.day.split("|");toggleDay(p[0],p[1])}});
    // reservations
    var list=resa.slice().sort(function(a,b){return a.it.a<b.it.a?-1:1});
    $("#rc-n",box).textContent=list.filter(function(x){return x.it.st!=="annulee"}).length;
    $("#rc-list",box).innerHTML=list.length?list.map(function(x){var it=x.it,c=it.st==="annulee"||it.st==="devis-traite",dv=it.st==="devis"||it.st==="devis-traite";
      return '<tr class="'+(c?"cx":"")+'"><td><b>'+esc(it.ref)+'</b>'+(it.at&&(Date.now()-new Date(it.at))<1728e5&&!c?' <span class="nw">Nouveau</span>':'')+'<br><small>'+({annulee:"Annulée",confirmee:"Confirmée",devis:"Devis à établir","devis-traite":"Devis traité"}[it.st]||it.st)+'</small></td><td>'+(it.rooms||[]).map(function(id){return esc((byId[id]||{}).n||id)}).join(" + ")+'</td><td>'+fd(it.a)+' → '+fd(it.d)+'<br><small>'+it.nuits+' nuit(s) · '+it.adultes+' ad. '+(it.enfants?'· '+it.enfants+' enf.':'')+'</small></td><td>'+esc(it.nom)+'<br><small><a href="https://wa.me/'+esc(String(it.tel).replace(/\D/g,""))+'" target="_blank" rel="noopener">'+esc(it.tel)+'</a> · <a href="mailto:'+esc(it.email)+'">'+esc(it.email)+'</a></small>'+(it.options&&it.options.length?'<br><small><b>'+esc(it.options.join(' · '))+'</b></small>':'')+(it.parCategorie&&it.parCategorie.length?'<br><small>Attribuée par catégorie : '+esc(it.parCategorie.join(', '))+'</small>':'')+(it.msg?'<br><small>« '+esc(it.msg)+' »</small>':'')+'</td><td>'+(dv?"Sur devis":fc(it.total))+'</td><td>'+(c?'':'<button type="button" class="lnk" data-cx="'+x.doc+'|'+x.i+'">'+(dv?"Devis traité":"Annuler et libérer")+'</button>')+'</td></tr>'}).join(""):'<tr><td colspan="6">Aucune réservation pour le moment.</td></tr>';
    $$("[data-cx]",box).forEach(function(b){b.onclick=function(){var p=b.dataset.cx.split("|");cancel(p[0],+p[1])}});
    // blocks
    var bl=[];PHYS.forEach(function(id){(dispo[id]||[]).forEach(function(x,i){if(x.src==="reception"&&x.st!=="annulee")bl.push({id:id,i:i,x:x})})});
    $("#rc-bl",box).innerHTML=bl.length?bl.map(function(b){return '<li><b>'+esc(byId[b.id].n)+'</b> · '+fd(b.x.a)+' → '+fd(b.x.d)+(b.x.note?' · '+esc(b.x.note):'')+' <button type="button" class="lnk" data-fr="'+b.id+'|'+b.i+'">Libérer</button></li>'}).join(""):'<li>Aucune date bloquée.</li>';
    $$("[data-fr]",box).forEach(function(b){b.onclick=function(){var p=b.dataset.fr.split("|");var rs=(dispo[p[0]]||[]).slice();rs.splice(+p[1],1);db.doc("dispo/"+p[0]).set({ranges:rs})}});
  }
  function nextDay(d){var x=new Date(d+"T12:00");x.setDate(x.getDate()+1);return iso(x)}
  function toggleDay(id,d){
    var rs=(dispo[id]||[]).slice(),k=-1;
    rs.forEach(function(x,i){if(x.st!=="annulee"&&x.a<=d&&x.d>d)k=i});
    if(k<0){rs.push({a:d,d:nextDay(d),src:"reception",st:"bloquee",note:"Bloqué depuis le calendrier",ref:"BLOC-"+Date.now().toString(36).toUpperCase()});return db.doc("dispo/"+id).set({ranges:rs})}
    var x=rs[k];
    if(x.src!=="reception"){alertMsg("Cette nuit fait partie de la réservation "+x.ref+". Utilisez « Annuler » dans la liste pour la libérer.");return}
    /* libère seulement cette nuit : coupe la plage en deux si besoin */
    var parts=[];if(x.a<d)parts.push(Object.assign({},x,{d:d}));if(nextDay(d)<x.d)parts.push(Object.assign({},x,{a:nextDay(d),ref:x.ref+"b"}));
    rs.splice.apply(rs,[k,1].concat(parts));return db.doc("dispo/"+id).set({ranges:rs});
  }
  function alertMsg(t){msg.hidden=false;msg.textContent=t;clearTimeout(alertMsg.t);alertMsg.t=setTimeout(function(){msg.hidden=true},6000)}
  function cancel(doc,i){
    var x=resa.filter(function(y){return y.doc===doc&&y.i===i})[0];if(!x)return;
    if(x.it.st==="devis"){db.doc("resa/"+doc).get().then(function(s){var items=((s.data()||{}).items||[]).map(function(y){return y.ref===x.it.ref?Object.assign({},y,{st:"devis-traite"}):y});return db.doc("resa/"+doc).set({items:items})});return}
    var it=x.it,us=[];(it.rooms||[]).forEach(function(id){units(id).forEach(function(u){if(us.indexOf(u)<0)us.push(u)})});
    us.reduce(function(p,u){return p.then(function(){var rs=(dispo[u]||[]).map(function(r){return r.ref===it.ref?Object.assign({},r,{st:"annulee"}):r});return db.doc("dispo/"+u).set({ranges:rs})})},Promise.resolve())
    .then(function(){return db.doc("resa/"+doc).get()}).then(function(s){var items=((s.data()||{}).items||[]).map(function(y){return y.ref===it.ref?Object.assign({},y,{st:"annulee"}):y});return db.doc("resa/"+doc).set({items:items})});
  }
  var bf=$("#rc-block",box);
  bf.chambre.innerHTML=PHYS.map(function(id){return '<option value="'+id+'">'+esc(byId[id].n)+'</option>'}).join("");
  bf.addEventListener("submit",function(e){e.preventDefault();var id=bf.chambre.value,a=bf.a.value,d=bf.d.value;if(!a||!d||d<=a)return;
    var rs=(dispo[id]||[]).slice();rs.push({a:a,d:d,src:"reception",st:"bloquee",note:bf.note.value.trim(),ref:"BLOC-"+Date.now().toString(36).toUpperCase()});
    db.doc("dispo/"+id).set({ranges:rs}).then(function(){bf.reset()})});
})();
