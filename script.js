function docID(element) {return document.getElementById(element);}
Array.prototype.average = function() {
    if (this.length === 0) return 0;
    let sum = this.reduce((total, i) => total + i, 0);
    return sum / this.length;
};

// WALLLLL

let puffy = docID("puffy");
let mouseX, mouseY;
let puffyRect = puffy.getBoundingClientRect();
let prevMovements = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

puffy.onclick = () => {
	puffy.style.position = "absolute";
	console.log(puffyRect.x);
	puffy.style.top = puffyRect.y + "px";
	puffy.style.left = puffyRect.x + "px";

	let puffyEat = setInterval(() => {
		let absRot = Math.atan2(mouseY, mouseX);
		let flip = absRot > Math.PI / 2 || absRot < Math.PI / -2;
		puffy.style.rotate = absRot - (flip ?  Math.PI : 0) + "rad";
		puffy.style.scale = (flip ? -1 : 1) + " 1";
		
		puffy.style.left = Number(puffy.style.left.slice(0, -2)) - Math.cos(absRot) + "px";
		puffy.style.top = Number(puffy.style.top.slice(0, -2)) - Math.sin(absRot) + "px";
	}, 5);
	
	puffy.onmouseenter = () => {
		clearInterval(puffyEat);
		document.body.style.cursor = "none";
		puffy.style.rotate = "0rad";
		puffy.style.pointerEvents = "none";
		document.body.onmousemove = (e) => {
			prevMovements.forEach((i, j) => {
				i.shift();
				i.push(j == 0 ? -e.movementX : -e.movementY);
			});
			console.log(prevMovements[1].average());
			let absRot = Math.atan2(prevMovements[1].average(), prevMovements[0].average());
			//let absRot = Math.atan2(-e.movementY, -e.movementX);
			let flip = absRot > Math.PI / 2 || absRot < Math.PI / -2;
			puffy.style.rotate = absRot - (flip ?  Math.PI : 0) + "rad";
			puffy.style.scale = (flip ? -1 : 1) + " 1";
			
			puffy.style.top = e.y - (puffyRect.height / 2) + "px";
			puffy.style.left = e.x - (puffyRect.width / 2) + "px";
		}
	}
	
	puffy.onclick = null;
}

document.body.onmousemove = (e) => {
	mouseX = Number(puffy.style.left.slice(0, -2)) - e.x + (puffyRect.width / 2);
	mouseY = Number(puffy.style.top.slice(0, -2)) - e.y + (puffyRect.height / 2);
}