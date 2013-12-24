!function(window){
	//"use strict";

	if (!("__proto__" in {})) return;

	var width = getWidth(),
		height = getHeight(),
		flakeCount = 50,
		gravity = 0.7,
		windSpeed = 20,
		flakes = [],
		currentFlake = 0,
		snowglobe = document.querySelector("body"),
		flake,
		newFlake;

	addCss('.flake{position:absolute;width:1px;height:1px;color:rgba(100,149,237,0);text-shadow:0 0 3px rgba(100,149,237,1);');

	while (currentFlake < flakeCount) {
		flake = document.createElement("div");
		flake.className = 'flake';
		flake.style.fontSize = getRandom(12, 24) + 'px';
		flake.style.top = getRandom(0, height) + 'px';
		flake.style.left = getRandom(0, width) + 'px';
		flake.innerHTML = "&#8226;";
		newFlake = snowglobe.appendChild(flake);
		newFlake.speed = getRandom(1, 100);
		flakes.push(newFlake);
		currentFlake++;
	}

	setInterval(doAnimation, 10);

	window.onresize = function(event) {
		width = getWidth();
		height = getHeight();
	}
	
	function getWidth() {
		var x = 0;
		if (self.innerHeight) {
			x = self.innerWidth;
		}
		else if (document.documentElement && document.documentElement.clientHeight) {
			x = document.documentElement.clientWidth;
		}
		else if (document.body) {
			x = document.body.clientWidth;
		}
		return x;
	}

	function getHeight() {
		var y = 0;
		if (self.innerHeight) {
			y = self.innerHeight;
		}
		else if (document.documentElement && document.documentElement.clientHeight) {
			y = document.documentElement.clientHeight;
		}
		else if (document.body) {
			y = document.body.clientHeight;
		}
		return y;
	}

	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function doAnimation() {
		for (var i = 0; i < flakes.length; i++) {
			newX = false;
			newY = false;
			// Calculate Y position
			newY = parseFloat(flakes[i].style.top) + (flakes[i].speed / 100) * gravity;
			if (newY > height) {
				newY = 0 - parseInt(flakes[i].style.fontSize);
				// If Y is at bottom, randomize X
				newX = getRandom(0, width);
			}
			// Calculate X position if it hasn't been set randomly
			if (!newX) newX = parseFloat(flakes[i].style.left) + Math.sin(newY / windSpeed);
			if (newX < -20) newX = width + 20;
			if (newX > width + 20) newX = -20;
			// Set new position
			flakes[i].style.top = newY + 'px';
			flakes[i].style.left = newX + 'px';
		}
	}

	function addCss(css){
		if (css.join) css = css.join('');

		var styleBlock = document.getElementById("j-tutu-dynamic-css");

		if (!styleBlock){
			styleBlock = document.createElement("style");
			styleBlock.type = "text/css";
			styleBlock.setAttribute('id', 'j-tutu-dynamic-css');
			document.getElementsByTagName("head")[0].appendChild(styleBlock);
			styleBlock.innerHTML = css;
		}
		else {
			styleBlock.innerHTML += css;
		}

		return styleBlock;
	}

}(window);