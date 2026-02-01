// DrawTriangle.js (c) 2012 matsuda
function drawVector(v, color) {
	var canvas = document.getElementById('example');  
	if (!canvas) { 
		console.log('Failed to retrieve the <canvas> element');
		return false; 
	} 
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(20 * (v.elements)[0], 20 * (v.elements)[1]);
	ctx.strokeStyle = color;
	ctx.stroke();
	//console.log(color);
	//console.log('Completed');
	//console.log((v.elements)[0]);
	//console.log((v.elements)[1]);
	//console.log(v);
}

function firstDrawButton() {
	textInputX = document.getElementById('x');
	textInputY = document.getElementById('y');
	x = textInputX.valueAsNumber; 
	y = textInputY.valueAsNumber;
			//console.log("done reading data");
				element1 = document.getElementById('example'); 
				ctx = element1.getContext('2d');
				ctx.clearRect(0, 0, element1.width, element1.height);
				element1.style.backgroundColor = "black";
  // Get the rendering context for 2DCG
				v1 = new Vector3([x, y, 0]);
				v2 = v1;
  // console.log(v1[0]);
  // console.log(v1[1]);
				drawVector(v1, "red");
				textInputX = document.getElementById('x2');
				textInputY = document.getElementById('y2')
				x = textInputX.valueAsNumber; 
				y = textInputY.valueAsNumber;
				v1 = new Vector3([x, y, 0]);
				drawVector(v1, "blue");
				return [v2, v1];
}

function angleBetween(v1, v2) {
	cosine = Vector3.dot(v1, v2) / (v1.magnitude()) / (v2.magnitude());
	//console.log("Cosine:");
	//console.log(cosine);
	return Math.acos(cosine);
}

function areaTriangle(v1, v2) {
	cross_product = Vector3.cross(v1, v2);
	return 0.5 * (cross_product.magnitude());
}

function run1() {
	//console.log("about to read data 1");
  //const form = document.querySelector('#button');
  const submitBtn = document.getElementById('button');
  //while (1 == 1) {
	const buttons = document.querySelectorAll('input[type="button"]');
	buttons.forEach(button => {
		/*
		submitBtn.addEventListener('click',  function(event) {
	// Access data here...
	//const formData = new FormData(event.target);
	//const value = formData.get("button1");
	//const data = Object.fromEntries(formData.entries());
			x = textInputX.valueAsNumber; 
			y = textInputY.valueAsNumber;
			console.log("done reading data");
			element1 = document.getElementById('example'); 
			element1.style.backgroundColor = "black";
  // Get the rendering context for 2DCG
			v1 = new Vector3([x, y, 0]);
  // console.log(v1[0]);
  // console.log(v1[1]);
			drawVector(v1, "red");
			run1();
		})
		*/
		button.addEventListener('click', (event) => {
			if (event.target.id == "button") {
	// Access data here...
	//const formData = new FormData(event.target);
	//const value = formData.get("button1");
	//const data = Object.fromEntries(formData.entries());
				firstDrawButton();
				run1();
			}
			else {
				vectors = firstDrawButton();
				selectElement = document.getElementById('selector');
				selectedValue = selectElement.value;
				scalar1 = document.getElementById("scalar");
				scalar = scalar1.valueAsNumber;
				if (selectedValue == "addition") {
					vectors[0] = (vectors[0]).add(vectors[1]);
				}
				if (selectedValue == "subtraction") {
					vectors[0] = (vectors[0]).sub(vectors[1]); 
				}
				if (selectedValue == "multiplication") {
					vectors[0] = (vectors[0]).mul(scalar);
					vectors[1] = (vectors[1]).mul(scalar);
				}
				if (selectedValue == "division") {
					vectors[0] = (vectors[0]).div(scalar);
					vectors[1] = (vectors[1]).div(scalar);
				}
				if (selectedValue == "magnitude") {
					num = (vectors[0]).magnitude();
					console.log(num);
					num = (vectors[1]).magnitude();
					console.log(num);
				}
				if (selectedValue == "normalize") {
					vectors[0] = (vectors[0]).normalize();
					vectors[1] = (vectors[1]).normalize();
				}
				if (selectedValue == "Angle between") {
					console.log(angleBetween(vectors[0], vectors[1]));
				}
				if (selectedValue == "Area") {
					console.log(areaTriangle(vectors[0], vectors[1]));
				}
				if (selectedValue != "magnitude" && selectedValue != "Area" && selectedValue != "Angle between") {	
					drawVector(vectors[0], "green");
					if (selectedValue != "addition" && selectedValue != "subtraction") {
						drawVector(vectors[1], "green");
					}
				}
					
				run1();
			}
		})
	})
		
  //}
}

function main() {  
  // Retrieve <canvas> element 
  run1();
}
