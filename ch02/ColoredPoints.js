// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  // uniform変数
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';




globalThis.shape_type = "Squares";
globalThis.red1 = 0;
globalThis.blue1 = 0;
globalThis.green1 = 0;
globalThis.size = 0.5;
globalThis.array1 = [];
globalThis.array2 = [];
globalThis.red_array = [];
globalThis.green_array = [];
globalThis.blue_array = [];
globalThis.size_array = [];
globalThis.is_held = false;


function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }
  
  
  var canvas1 = document.getElementById('my_drawing');

  // Get the rendering context for WebGL
  var g2 = getWebGLContext(canvas1);
  if (!g2) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(g2, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  var a_Position1 = g2.getAttribLocation(g2.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  var u_FragColor1 = g2.getUniformLocation(g2.program, 'u_FragColor');
  if (!u_FragColor1) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  draw_my_drawing(g2, canvas1, a_Position1, u_FragColor1);
  

  // Register function (event handler) to be called on a mouse press
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  
  gl.clear(gl.COLOR_BUFFER_BIT);
  canvas.onmousedown = function(ev){ click(ev, gl, canvas, a_Position, u_FragColor, globalThis.shape_type) };
  /*
  canvas.addEventListener('mousedown', function(e) {
	 console.log("down");
	 globalThis.is_held  = true;
  })
  */
  
  canvas.addEventListener('mouseup', function(e) {
	 globalThis.is_held  = false;
  })
  
  canvas.addEventListener('mousemove', function(e) {
	if (globalThis.is_held  == true) {	
		click(e, gl, canvas, a_Position, u_FragColor, globalThis.shape_type);
	}
  })
  
  
  const buttons = document.querySelectorAll('input[type="button"]');
  buttons.forEach(button => {	
	button.addEventListener('click', (event) => {
		if (event.target.id != "Clear Canvas") {	
			globalThis.shape_type = event.target.id;
		}
	})
  })
  
  const red = document.getElementById("red");
  red.addEventListener("change", () => {
	  globalThis.red1 = red.value;
  })
  const green = document.getElementById("green");
  green.addEventListener("change", () => {
	  globalThis.green1 = green.value;
  })
  const blue = document.getElementById("blue");
  blue.addEventListener("change", () => {
	  globalThis.blue1 = blue.value;
  })
  
  clear_button = document.getElementById("Clear Canvas");
  clear_button.addEventListener("click", () => {
	  globalThis.array1 = [];
	  globalThis.array2 = [];
      globalThis.red_array = [];
      globalThis.green_array = [];
      globalThis.blue_array = [];
      globalThis.size_array = [];
	   // Specify the color for clearing <canvas>
	  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
      gl.clear(gl.COLOR_BUFFER_BIT);
  })
  
 
}

function draw_my_drawing(gl, canvas, a_Position, u_FragColor) {
	shape_list = []
	color_list = [];
	
	positions = new Float32Array([
		0,  0.9,  
		0, -0.9,
		0.25, -0.9
	]);
	shape_list.push(positions);
	color_list.push([150, 75, 0]);
	
	positions = new Float32Array([
		0,  0.9,  
		0.25, 0.9,
		0.25, -0.9
	]);
	shape_list.push(positions);
	color_list.push([150, 75, 0]);
	
	positions = new Float32Array([
		0-0.75+0.125,  0.9,  
		0.25-0.75+0.125, 0.9,
		0.25-0.75+0.125, -0.9
	]);
	shape_list.push(positions);
	color_list.push([150, 75, 0]);
	
	positions = new Float32Array([
		0-0.75+0.125,  0.9,  
		0-0.75+0.125, -0.9,
		0.25-0.75+0.125, -0.9
	]);
	shape_list.push(positions);
	color_list.push([150, 75, 0]);
	
	positions = new Float32Array([
		-0.5,  -0.9,  // Top
		-0.75, -0.5,  // Bottom Left
		-0.25, -0.5  // Bottom Right
	]);
	shape_list.push(positions);
	color_list.push([0, 255, 0]);
	
	positions = new Float32Array([
		-0.5,  0.9,  // Top
		-0.75, 0.5,  // Bottom Left
		-0.25, 0.5  // Bottom Right
	]);
	shape_list.push(positions);
	color_list.push([0, 255, 0]);
	
	positions = new Float32Array([
		-0.25,  -0.5,  
		-0.5, -0.5,
		-0.5, 0.5
	]);
	shape_list.push(positions);
	color_list.push([0, 255, 0]);
	
	positions = new Float32Array([
		-0.75,  0.5,  
		-0.5, -0.5,
		-0.5, 0.5
	]);
	shape_list.push(positions);
	color_list.push([0, 255, 0]);
	
	/*
	positions = new Float32Array([
		-0.25,  -0.5,  
		-0.5, -0.5,
		-0.5, 0.5
	]);
	shape_list.push(positions);
	color_list.push([0, 255, 0]);
	*/
	
	
	
	
	
	
	positions = new Float32Array([
		0,  0,  
		0, 0.9,
		0.75, 0.9
	]);
	shape_list.push(positions);
	color_list.push([0, 255, 0]);
	
	positions = new Float32Array([
		0,  0,  
		0, -0.9,
		0.75, -0.9
	]);
	shape_list.push(positions);
	color_list.push([0, 255, 0]);
	
	gl.clearColor(0, 0, 0, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);
	for (let i = 0; i < shape_list.length; i = i + 1) {
		positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, shape_list[i], gl.STATIC_DRAW);



//program = gl.createProgram();
/*
const shader = gl.createShader(gl.VERTEX_SHADER); // Correct declaration
gl.attachShader(program, shader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
}

// Get attribute location for 'aPosition'
const positionAttributeLocation = gl.getAttribLocation(program, 'aPosition');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0); // 2 components per vertex
*/

//gl.useProgram(program);

//gl.clear(gl.DEPTH_BUFFER_BIT); 

		gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(a_Position);
		gl.uniform4f(u_FragColor, color_list[i][0] / 255, color_list[i][1] / 255, color_list[i][2] / 255, 1.0);
		gl.drawArrays(gl.TRIANGLES, 0, 3); 
	}
	
}

	

var g_points = [];  // The array for the position of a mouse press
var g_colors = [];  // The array to store the color of a point
function click(ev, gl, canvas, a_Position, u_FragColor, shape) {
  globalThis.is_held = true;
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();
  shape_size = document.getElementById("shape size");
  shape_size = shape_size.valueAsNumber;
  
  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  // Store the coordinates to g_points array
/*
	g_points.push([x, y]);
	if (shape == "Squares") {
		
  // Store the coordinates to g_points array 
  if (x >= 0.0 && y >= 0.0) {      // First quadrant
    g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red
  } else if (x < 0.0 && y < 0.0) { // Third quadrant
    g_colors.push([0.0, 1.0, 0.0, 1.0]);  // Green
  } else {                         // Others
    g_colors.push([1.0, 1.0, 1.0, 1.0]);  // White
  }

  

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_points.length;
  for(var i = 0; i < len; i++) {
    var xy = g_points[i];
    var rgba = g_colors[i];

    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }

  console.log(canvas);
  ctx = canvas.getContext('2d');
  console.log(ctx);
  ctx.fillRect(x, y, 10, 10);
  */
    //console.log(globalThis.shape_type);
	if (globalThis.shape_type == "Triangles") {
		positions = new Float32Array([
			x + 0.0,  y + 0.5,  // Top
			x - 0.5 * shape_size, y - 0.5 * shape_size,  // Bottom Left
			x + 0.5 * shape_size, y - 0.5 * shape_size   // Bottom Right
		]);
	}

	if (globalThis.shape_type == "Squares") {
		positions = new Float32Array([
			x - 0.5 * shape_size,  y + 0.5 * shape_size,  // Top Left
			x + 0.5 * shape_size, y + 0.5 * shape_size, //Top Right
			x - 0.5 * shape_size, y - 0.5 * shape_size,  // Bottom Left
			x + 0.5 * shape_size, y - 0.5 * shape_size   // Bottom Right
		]);
	}
	
	if 	(globalThis.shape_type != "Circles") {
		(globalThis.array2).push(shape);
		(globalThis.array1).push(positions);
		 globalThis.red_array.push(globalThis.red1);
		 globalThis.blue_array.push(globalThis.blue1);
         globalThis.green_array.push(globalThis.green1);
		 globalThis.size_array.push();
	}
	
	if (globalThis.shape_type == "Circles") {
		sides1 = document.getElementById("sides");
		sides = sides1.valueAsNumber; // Hexagon
		radius = 0.5 * shape_size;
		/*
		const radius = 0.5;
		const centerX = x, centerY = y;
		vertices = [];
		console.log("Circles");
		console.log(sides);

	// 2. Generate vertices
	// For TRIANGLE_FAN, the first point is the center
		vertices.push(centerX, centerY); 

		for (let i = 0; i <= sides; i++) {
			const angle = (i * 2 * Math.PI) / sides;
			vertices.push(
				centerX + radius * Math.cos(angle),
				centerY + radius * Math.sin(angle)
			);
		}
		positions = new Float32Array(vertices);
		console.log("Positions:");
		console.log(positions);
		*/
		cx = x;
		cy = y;
		//console.log("Sides:");
		//console.log(sides);
		for (let i = 0; i < sides; i++) {
			//console.log("angle: ");
			points = [];
			angle = (i / sides) * 2 * Math.PI;
			//console.log(angle);
			next_angle = ((i + 1) / sides) * 2 * Math.PI;
			points.push(
				cx, 
				cy
			);
			points.push(
				cx + radius * Math.cos(angle),
				cy + radius * Math.sin(angle)
			);
			points.push(
				cx + radius * Math.cos(next_angle),
				cy + radius * Math.sin(next_angle)
			)
			positions = new Float32Array(points);
			(globalThis.array1).push(positions);
			(globalThis.array2).push("Triangles");
			 globalThis.red_array.push(globalThis.red1);
			globalThis.blue_array.push(globalThis.blue1);
			globalThis.green_array.push(globalThis.green1);
		}
		
		/*
		for (let i = 1; i < sides - 1; i++) {
        // Triangle: (Point 0, Point i, Point i+1)
			positions.push(points[0].x, points[0].y);
			positions.push(points[i].x, points[i].y);
			positions.push(points[i+1].x, points[i+1].y);
		}
		*/
		//console.log("Circle positions");
		//console.log(positions);
	}
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);


	for (let i = 0; i < (globalThis.array1).length; i = i + 1) {
		positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, (globalThis.array1)[i], gl.STATIC_DRAW);



//program = gl.createProgram();
/*
const shader = gl.createShader(gl.VERTEX_SHADER); // Correct declaration
gl.attachShader(program, shader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
}

// Get attribute location for 'aPosition'
const positionAttributeLocation = gl.getAttribLocation(program, 'aPosition');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0); // 2 components per vertex
*/

//gl.useProgram(program);

//gl.clear(gl.DEPTH_BUFFER_BIT); 

		//console.log(x);
		//console.log(y);
		gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(a_Position);
		gl.uniform4f(u_FragColor, globalThis.red_array[i], globalThis.green_array[i], globalThis.blue_array[i], 1.0);
		//console.log(globalThis.blue_array[i]);
		if 	((globalThis.array2)[i] == "Triangles") {
			gl.drawArrays(gl.TRIANGLES, 0, 3); 
		}
		if ((globalThis.array2)[i] == "Squares") {
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); 
		}
		/*
		if ((globalThis.array2)[i] == "Circles") {
			console.log("drawing circle");
			console.log(sides);
			gl.drawArrays(gl.TRIANGLES, 0, (sides) * 3);
			console.log("done drawing circle");
		}
		*/
	}
	
}

