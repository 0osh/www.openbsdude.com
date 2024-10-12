function docID(element) {return document.getElementById(element);}

// WALLLLL

let puffy = docID("puffy");
let mouseX, mouseY;
let puffyRect = puffy.getBoundingClientRect();

document.body.onmousemove = (e) => {
	mouseX = Number(puffy.style.left.slice(0, -2)) - e.x + (puffyRect.width / 2);
	mouseY = Number(puffy.style.top.slice(0, -2)) - e.y + (puffyRect.height / 2);
}

let puffyEat = setInterval(() => {
	let absRot = Math.atan2(mouseY, mouseX);
	let flip = absRot > Math.PI / 2 || absRot < Math.PI / -2;
	puffy.style.rotate = absRot - (flip ?  Math.PI : 0) + "rad";
	puffy.style.scale = (flip ? -1 : 1) + " 1";
	
	puffy.style.left = Number(puffy.style.left.slice(0, -2)) - Math.cos(absRot) + "px";
	puffy.style.top = Number(puffy.style.top.slice(0, -2)) - Math.sin(absRot) + "px";
}, 5);

puffy.onmouseover = () => {
	clearInterval(puffyEat);
	document.body.style.cursor = "none";
	puffy.style.rotate = "0rad";
	puffy.style.pointerEvents = "none";
	document.body.onmousemove = (e) => {
		let absRot = Math.atan2(-e.movementY, -e.movementX);
		let flip = absRot > Math.PI / 2 || absRot < Math.PI / -2;
		puffy.style.rotate = absRot - (flip ?  Math.PI : 0) + "rad";
		puffy.style.scale = (flip ? -1 : 1) + " 1";
		
		puffy.style.top = e.y - (puffyRect.height / 2) + "px";
		puffy.style.left = e.x - (puffyRect.width / 2) + "px";
	}
}