(()=>{"use strict";const t={inherits(t,e){t.prototype=Object.create(e.prototype),t.constructor=t},randomVec(t){const e=2*Math.PI*Math.random();return[Math.cos(e),Math.sin(e)]},wrap:(t,e)=>t>e?t%e:t<0?e-t%e:t,dist(t,e){const s=Math.abs(t[0]-e[0]),i=Math.abs(t[1]-e[1]);return Math.sqrt(s*s+i*i)}};class e{constructor(t){this.pos=t.pos,this.radius=t.radius,this.color=t.color,this.speed=t.speed,this.direction=t.direction,this.game=t.game}draw(t){t.fillStyle=this.color,t.beginPath(),t.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI),t.fill(),t.closePath()}move(t){t=t/10||1;const e=this.pos[0]+this.direction[0]*this.speed*t,s=this.pos[1]+this.direction[1]*this.speed*t;this.pos=[e,s],this.game.outOfBound(this.pos,this.radius)&&(this.wrappable?this.pos=this.game.wrap([e,s]):this.remove())}isCollidingWith(e){return t.dist(this.pos,e.pos)<this.radius+e.radius}remove(){this.game.remove(this)}collide(t){}}e.prototype.wrappable=!0;const s=e;class i extends s{constructor(t={}){t.speed=6,t.color="#00c1d1",t.radius=3,t.direction=[...t.game.ship.face];const e=t.game.ship.pos;t.pos=[e[0]+10*t.direction[0],e[1]+10*t.direction[1]],super(t)}}i.prototype.wrappable=!1;const o=i;class n extends s{constructor(t={}){t.speed=1.5,t.color=t.color||"white",t.radius=20,t.pos=t.pos||[window.innerWidth/2,(window.innerHeight-200)/2],t.direction=t.direction||[0,0],super(t),this.face=[1,0]}relocate(){this.pos=g.randomPos()}power(t){this.direction[0]=1.5*t[0],this.direction[1]=1.5*t[1],0==t[0]&&0==t[1]||(this.face=t)}draw(t){const e=this.pos;t.drawImage(n.image,e[0]-25,e[1]-25,50,50)}fireBullet(){const t=new o({game:this.game});this.game.addBullet(t)}}const a=new Image;a.src="./assets/ship.png",n.image=a;const d=n;class r extends s{constructor(e={}){e.speed=e.speed||1,e.color="#5cdb94",e.radius=25,e.direction=e.direction||t.randomVec(),e.pos=e.pos||g.randomPos(),super(e),this.speed=this.speed||1}draw(t){const e=this.pos;t.drawImage(r.image,e[0]-25,e[1]-25,50,50)}}const l=new Image;l.src="./assets/cell3.png",r.image=l;const c=r;class h extends s{constructor(e={}){e.speed=e.speed||1,e.color="#c90579",e.radius=25,e.direction=e.direction||t.randomVec(),e.pos=e.pos||g.randomPos(),super(e)}draw(t){const e=this.pos;t.drawImage(h.image,e[0]-25,e[1]-25,50,50)}collide(t){t instanceof h&&this.bounce(this,t),t instanceof c&&t.remove(),t instanceof d&&t.remove(),t instanceof o&&this.remove()}bounce(t,e){let[s,i]=[t.direction,e.direction],[o,n]=[t.pos,e.pos],a=n[0]-o[0],d=n[1]-o[1],r=Math.sqrt(Math.pow(e.pos[0]-t.pos[0],2)+Math.pow(e.pos[1]-t.pos[1],2)),l=a/r,c=d/r,h=(s[0]-i[0])*l+(s[1]-i[1])*c;h<0||(t.direction[0]-=h*l,t.direction[1]-=h*c,e.direction[0]+=h*l,e.direction[1]+=h*c)}}const p=new Image;p.src="./assets/virus.png",h.image=p;const u=h;class m{constructor(t=3,e=10,s=1,i=3,o){this.coronas=[],this.cells=[],this.coronaCount=t,this.cellCount=e,this.speed=s,this.over=!1,this.bullets=[],this.lives=i,this.ship=new d({game:this}),setTimeout((()=>{this.addCoronas(),this.addCells()}),"preview"===o?0:4e3)}addCoronas(){for(let t=0;t<this.coronaCount;t++){const t=new u({game:this,speed:this.speed});this.coronas.push(t)}}addCells(){for(let t=0;t<this.cellCount;t++){const t=new c({game:this,speed:this.speed});this.cells.push(t)}}updateSpeed(t){this.speed=t,this.coronas.forEach((t=>{t.speed=this.speed})),this.cells.forEach((t=>{t.speed=this.speed}))}addBullet(t){this.bullets.push(t)}static randomPos(){return[Math.floor(Math.random()*(window.innerWidth-30))+15,Math.floor(Math.random()*(window.innerHeight-230))+115]}draw(t){t.clearRect(0,0,window.innerWidth,window.innerHeight-200),t.fillStyle=m.BG_COLOR,t.fillRect(0,0,window.innerWidth,window.innerHeight-200);var e=t.createRadialGradient(600,400,10,600,400,600);(e=t.createLinearGradient(0,0,0,window.innerHeight)).addColorStop(0,"#184065"),e.addColorStop(1,"#000000"),t.fillStyle=e,t.fill(),t.fillRect(0,0,window.innerWidth,window.innerHeight),this.allObjects().forEach((e=>e.draw(t)))}moveObjects(t){this.allObjects().forEach((e=>e.move(t)))}remove(t){if(t instanceof u){const e=this.coronas.indexOf(t);this.coronas.splice(e,1),this.coronas.length||setTimeout((()=>{this.over="win",this.bullets=[]}),500)}else if(t instanceof c){const e=this.cells.indexOf(t);this.cells.splice(e,1);const s=new u({game:this,pos:t.pos,speed:this.speed});this.coronas.push(s),this.cells.length||(this.over="lose",this.bullets=[])}else if(t instanceof d)this.lives-=1,t.relocate(),0===this.lives&&(this.over="killed");else if(t instanceof o){const e=this.bullets.indexOf(t);this.bullets.splice(e,1)}}outOfBound(t,e){return t[0]<0+e||t[1]<0+e||t[0]>window.innerWidth-e||t[1]>window.innerHeight-200-e}wrap(e){return[t.wrap(e[0],window.innerWidth),t.wrap(e[1],window.innerHeight-200)]}allObjects(){return[].concat(this.coronas,this.ship,this.bullets,this.cells)}checkCollisions(){let t=this.allObjects();for(let e=0;e<t.length-1;e++)for(let s=e+1;s<t.length;s++)t[e].isCollidingWith(t[s])&&t[e].collide(t[s])}step(t){this.moveObjects(t),this.checkCollisions()}moveShip(t){this.ship.power(t)}fire(){this.ship.fireBullet()}}m.BG_COLOR="#000000",m.DIM_X=1200,m.DIM_Y=800,m.FPS=32;const g=m;class w{constructor(t){this.game=null,this.ctx=t,this.startGame("preview"),this.startDialog({intro:!0}),$(".restart").on("click",(()=>{this.game=null,$(".dialog").remove(),this.startDialog({intro:!1})})),$(".info").on("click",(()=>{if($(".attribute").length)return;const t=$("<p class='attribute'>Game icons downloaded from www.flaticon.com</p>");$(".iconContainer").append(t),setTimeout((()=>{$(".attribute").remove()}),3e3)}))}startDialog(t){const e=$("<p class='dialogMission'>YOU ARE A WHITE BLOOD CELL. KILL ALL THE CORONA VIRUSES BEFORE THEY INFECT THE HEALTHY CELLS!</p><p class='dialogInstructions'>MOVE: <span class='dialogInstructionsColor'>W, A, S, D </span>   &   SHOOT: <span class='dialogInstructionsColor'>SPACE</span></p>");this.createDialog("COVID KILLER",e,"START GAME",t)}startGame(t){let e=parseInt($("#corona").val());e=isNaN(e)?3:e;let s=parseInt($("#cell").val());s=isNaN(s)?10:s;let i,o=1;"preview"!==t?(i=$(".dialog").find(".selected").attr("id"),"easy"===i?o=.25:"hard"===i&&(o=3),this.countdown(3)):o=.001,this.game=new g(e,s,o,3,t),this.bindKeyHandlers(),this.lastTime=0,$(".dialog").remove(),$("#difficulty").children().length&&$("#difficulty").children().remove();const n=this.difficultyButtons("game",i);$("#difficulty").append(n),$(document).on("click",".diffButt-game",(t=>{$(".diffButt-game").removeClass("selected");let e=t.target.id,s=1;"easy"===e?s=.25:"hard"===e&&(s=3),$(event.target).addClass("selected"),this.game.updateSpeed(s)})),$("#stats").removeClass("hidden"),$("#difficultyContainer").removeClass("hidden"),this.updateStats(),requestAnimationFrame(this.animate.bind(this))}countdown(t){const e=$("<h1></h1>").addClass("countdown").text(t);$("body").append(e);const s=setInterval((()=>{t--,e.text(t),t<=0&&(clearInterval(s),e.text("KILL THE CORONA!"),setTimeout((()=>{e.remove()}),1e3))}),1e3)}step(t){this.game.step(t),this.game.draw(this.ctx)}animate(t){const e=t-this.lastTime;this.step(e),this.lastTime=t,this.updateStats(),this.game.over?this.gameOver():requestAnimationFrame(this.animate.bind(this));const s=[0,0];for(const t of Object.keys(w.MOVES)){const e=w.MOVES[t];key.isPressed(t)&&(s[0]+=e[0],s[1]+=e[1])}this.game.moveShip(s)}updateStats(){$("#lives").text(this.game.lives),$("#cells").text(this.game.cells.length),$("#coronas").text(this.game.coronas.length)}gameOver(){const t="win"===this.game.over?"YOU BEAT CORONA !":"CORONA BEAT YOU !";let e;switch(this.game.over){case"win":e="YOU DESTROYED ALL THE CORONA VIRUSES! :)";break;case"lose":e="ALL THE HEALTHY CELLS WERE INFECTED! :(";break;default:e="YOU WERE KILLED BEFORE SAVING THE HEALTHY CELLS! :("}const s=$("<p></p>").text(e);this.createDialog(t,s,"PLAY AGAIN",{intro:!1})}createDialog(t,e,s,{intro:i}){if($(".dialog").length)return;const o=$("<div></div>").addClass("dialog"),n=$("<h1></h1>").addClass("dialogTitle").text(t);if(o.append(n),o.append("<br/>"),o.append(e),!i){const t=$("<div></div>").addClass("inputs"),e=$("<div></div>").addClass("inputContainer"),s=$("<p>CORONA VIRUSES:</p>"),i=$('<input type="number" min="1" max="100" value="3" id="corona"></p>');e.append(s).append(i);const n=$("<div></div>").addClass("inputContainer"),a=$("<p>HEALTHY CELLS:</p>"),d=$('<input type="number" min="1" max="100" value="10" id="cell"></p>');n.append(a).append(d),t.append(e).append(n),o.append(t)}const a=$("<button></button>").addClass("dialogButton").text(s),d=this.difficultyButtons("dialog");o.append(d),$(document).on("click",".diffButt-dialog",(t=>{$(".diffButt-dialog").removeClass("selected"),$(event.target).addClass("selected")})),a.on("click",this.startGame.bind(this)),o.append("<br/>"),o.append(a),$("body").append(o)}difficultyButtons(t,e="normal"){const s=$("<div></div>").addClass("difficultyButtons"),i=$("<p>DIFFICULTY:</p>"),o=$("<button></button>").addClass(`diffButt-${t}`).attr("id","easy").text("SHELTER IN PLACE"),n=$("<button></button>").addClass(`diffButt-${t}`).attr("id","normal").text("NORMAL"),a=$("<button></button>").addClass(`diffButt-${t}`).attr("id","hard").text("TRUMP RALLY");return"easy"===e?o.addClass("selected"):"hard"===e?a.addClass("selected"):n.addClass("selected"),s.append(i).append(o).append(n).append(a),s}bindKeyHandlers(){const t=this.game;key("space",(function(){t.fire()}))}}w.MOVES={w:[0,-1],a:[-1,0],s:[0,1],d:[1,0]};const f=w;console.log("Webpack is working!"),window.addEventListener("DOMContentLoaded",(()=>{const t=document.getElementsByTagName("canvas")[0];t.height=window.innerHeight-200,t.width=window.innerWidth;const e=t.getContext("2d");new f(e),$(window).on("resize",(()=>{t.height=window.innerHeight-200,t.width=window.innerWidth}))}))})();
//# sourceMappingURL=main.js.map