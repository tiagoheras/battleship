(()=>{var e={82:(e,t,a)=>{const n=a(112),i=a(758),r=a(547),o=function(){let e,t;const a=()=>{s.clearBoards(),s.renderPlayerBoard(e),s.renderPlayerBoard(t)};return{initialize:()=>{const a=n(),o=n();e=i(o,!1),t=i(a,!0),s.renderShipPlacementScreen(o,[r(5),r(4),r(3),r(3),r(2),r(2)]),a.placeShipsRandomly([r(5),r(4),r(3),r(3),r(2),r(2)])},playRound:n=>{e.attack(t.getPlayerGameboard(),n),t.randomAttack(e.getPlayerGameboard()),a(),e.getPlayerGameboard().areAllShipsSunk()&&!t.getPlayerGameboard().areAllShipsSunk()?s.displayResult("computer wins"):!e.getPlayerGameboard().areAllShipsSunk()&&t.getPlayerGameboard().areAllShipsSunk()?s.displayResult("player wins"):e.getPlayerGameboard().areAllShipsSunk()&&t.getPlayerGameboard().areAllShipsSunk()&&s.displayResult("tie")},renderBoards:a}}(),s=function(){const e=document.getElementById("player-board"),t=document.getElementById("computer-board"),a=e=>{let t=JSON.parse(e.target.dataset.position);o.playRound(t)};return{renderPlayerBoard:n=>{n.getPlayerGameboard().getBoard().forEach((i=>{const r=document.createElement("div");r.className="box",i.hasBeenHit&&(r.innerText="x"),n.getIsComputer()?(i.hasBeenHit||r.addEventListener("click",a),r.dataset.position=JSON.stringify(i.position),i.hasBeenHit&&i.ship&&r.classList.add("occupied"),t.appendChild(r)):(i.ship&&(console.log(i.ship.getHits()),console.log(i.ship.isSunk()),i.ship.isSunk()?r.classList.add("occupied"):r.classList.add("ship")),e.appendChild(r))}))},clearBoards:()=>{e.innerHTML="",t.innerHTML=""},displayResult:e=>{const t=document.createElement("div");t.id="result-container";const a=document.createElement("h1"),n=document.createElement("button");a.innerText=e,n.innerText="Play Again",n.addEventListener("click",(()=>{t.remove(),o.initialize()})),t.appendChild(a),t.appendChild(n),document.body.appendChild(t)},renderShipPlacementScreen:(e,t)=>{const a=document.createElement("div"),n=document.createElement("div");a.id="placing-board-container",n.className="board";let i="x";const r=document.createElement("button");r.innerText="Toggle Axis",r.addEventListener("click",(()=>{i="x"===i?"y":"x"}));let s=0;e.getBoard().forEach((r=>{const l=document.createElement("div");l.className="box",l.dataset.position=JSON.stringify(r.position),l.addEventListener("click",(n=>{const r=JSON.parse(n.target.dataset.position);e.placeShip(t[s],r,i)instanceof Error?alert("Invalid position"):(e.placeShip(t[s],r,i),e.getBoard().filter((e=>e.ship)).forEach((e=>{document.querySelector(`[data-position='${JSON.stringify(e.position)}']`).style.backgroundColor="#00ff00"})),s++),s===t.length&&(a.remove(),o.renderBoards())})),n.appendChild(l)})),a.appendChild(n),a.appendChild(r),document.body.appendChild(a)}}}();e.exports={Game:o,UI:s}},112:(e,t,a)=>{a(547),e.exports=function(){let e=[];const t=()=>{for(let t=0;t<10;t++)for(let a=0;a<10;a++)e.push({position:{x:a,y:t},hasBeenHit:!1})};t();const a=(e,t)=>e.x===t.x&&e.y===t.y,n=(t,n,i)=>{let o=[n];for(let e=t.getLength();e>1;e--){let e={};Object.assign(e,o[o.length-1]),e[i]++,o.push(e)}if(!o.every((e=>r(e))))return new Error("Position occupied.");{let n=[...e];o.map((t=>e.findIndex((e=>a(e.position,t))))).forEach((e=>n[e].ship=t)),e=n}},i=e=>{let t=s().map((e=>e.position)),a=t[Math.floor(Math.random()*t.length)],r=["x","y"][Math.round(Math.random())];n(e,a,r)instanceof Error?i(e):n(e,a,r)},r=t=>s().some((n=>a(n.position,t)&&!(t=>!!(t=>{const n=[{x:t.x+1,y:t.y},{x:t.x-1,y:t.y},{x:t.x,y:t.y+1},{x:t.x,y:t.y-1},{x:t.x+1,y:t.y+1},{x:t.x-1,y:t.y-1},{x:t.x+1,y:t.y-1},{x:t.x-1,y:t.y+1}].filter((e=>o(e)));return e.filter((e=>n.some((t=>a(t,e.position)))))})(t).some((e=>e.ship)))(t))),o=t=>e.some((e=>a(e.position,t))),s=()=>e.filter((e=>!e.ship));return{placeShip:n,initialize:t,getBoard:()=>e,recieveAttack:t=>{const n=e.find((e=>a(e.position,t)));if(n.hasBeenHit)return new Error("Position has already been hit.");n.ship&&n.ship.hit(),n.hasBeenHit=!0},areAllShipsSunk:()=>e.filter((e=>e.ship)).every((e=>e.ship.isSunk())),getMissedAttacks:()=>e.filter((e=>e.hasBeenHit&&!e.ship)),getAvailableBoxes:()=>e.filter((e=>!e.hasBeenHit)),getEmptyBoxes:s,placeShipsRandomly:e=>{e.forEach((e=>{i(e)}))}}}},758:e=>{e.exports=function(e,t){const a=()=>e,n=()=>t;return t?{randomAttack:e=>{let t=e.getAvailableBoxes().map((e=>e.position)),a=Math.floor(Math.random()*t.length);e.recieveAttack(t[a])},getPlayerGameboard:a,getIsComputer:n}:{attack:(e,t)=>e.recieveAttack(t),getPlayerGameboard:a,getIsComputer:n}}},547:e=>{e.exports=function(e){let t=0;return{getLength:()=>e,hit:()=>t++,isSunk:()=>t===e,getHits:()=>t}}}},t={};function a(n){var i=t[n];if(void 0!==i)return i.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,a),r.exports}(()=>{const{Game:e,UI:t}=a(82);e.initialize()})()})();