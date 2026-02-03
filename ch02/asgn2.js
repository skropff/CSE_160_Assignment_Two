var VSHADER_SOURCE = `
  attribute vec4 aPosition;
  uniform mat4 u_ModelMatrix; // Add this matrix
    void main() { gl_Position = u_ModelMatrix * aPosition; }
	`
// Fragment shader program
/*
var FSHADER_SOURCE = `
  void main() { gl_FragColor = vec4(0.0, 0.5, 1.0, 1.0); } // Blue
 `*/

var FSHADER_SOURCE = 'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  // uniform変数
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';

globalThis.shapes = [];
globalThis.colors = [];
globalThis.rotation = 0;
globalThis.leg_position = true;
globalThis.dimensions = [];
globalThis.body_types = [];
globalThis.tail_up = true;
globalThis.last_x = 0;
globalThis.last_y = 0;
 
function 	main()		{
	//console.log("start");
	globalThis.dimensions.push(null);
	globalThis.dimensions.push(null);
	x1 = 0.5;
	y1 = 0.3;
	z1 = 0.8; // Example dimensions
	x = x1;
	y = y1;
	z = z1;
const vertices = new Float32Array([
  // Front face
  -x, -y,  z,   x, -y,  z,   x,  y,  z,
  -x, -y,  z,   x,  y,  z,  -x,  y,  z,
  // Back face
  -x, -y, -z,  -x,  y, -z,   x,  y, -z,
  -x, -y, -z,   x,  y, -z,   x, -y, -z,
  // Top face
  -x,  y, -z,  -x,  y,  z,   x,  y,  z,
  -x,  y, -z,   x,  y,  z,   x,  y, -z,
  // Bottom face
  -x, -y, -z,   x, -y, -z,   x, -y,  z,
  -x, -y, -z,   x, -y,  z,  -x, -y,  z,
  // Right face
   x, -y, -z,   x,  y, -z,   x,  y,  z,
   x, -y, -z,   x,  y,  z,   x, -y,  z,
  // Left face
  -x, -y, -z,  -x, -y,  z,  -x,  y,  z,
  -x, -y, -z,  -x,  y,  z,  -x,  y, -z,
]);
	angle = document.getElementById("rotation");
	angle.addEventListener("change", () => {
		globalThis.rotation = angle.value;
		draw_prism(null, gl, null, u_FragColor);
	})


	first_joint = document.getElementById("first joint");
	first_joint.addEventListener("change", () => {
		draw_prism(null, gl, null, u_FragColor);
	})
	
	second_joint = document.getElementById("second joint");
	second_joint.addEventListener("change", () => {
		draw_prism(null, gl, null, u_FragColor);
	})
	
	 var canvas = document.getElementById('webgl');
	 

  // Get the rendering context for WebGL
	 var gl = getWebGLContext(canvas);
	 gl.enable(gl.DEPTH_TEST);
     if (!gl) {
		console.log('Failed to get the rendering context for WebGL');
		return;
	 }

  // Initialize shaders
     if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.log('Failed to intialize shaders.');
		return;
	}
	/*
	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	
	var aPosition = gl.getAttribLocation(gl.program, 'aPosition');
	gl.enableVertexAttribArray(aPosition);
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
  
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');

// Create a rotation matrix (Example: rotate 30 degrees on X and Y)
	var modelMatrix = new Matrix4(); // Assumes use of a utility library like cuon-matrix.js
	modelMatrix.setRotate(30, 1, 0, 0); // Rotate 30 deg around X-axis
	modelMatrix.rotate(30, 0, 1, 0);    // Rotate 30 deg around Y-axis

// Pass the matrix to the vertex shader
	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  
  gl.drawArrays(gl.TRIANGLES, 0, 36);
  */
  
  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  
  draw_prism(vertices, gl, [0, 0, 1, 1], u_FragColor, "body");
  x = 0.1;
  /*
  tail = new Float32Array([
  // Front face
  -x, y,  z  + 0.1,   x, y,  z + 0.1,   x,  y + 0.2,  z + 0.1,
  -x, y,  z + 0.1,   x,  y + 0.2,  z + 0.1,  -x,  y + 0.2,  z + 0.1,
  // Back face
  -x, y, z,  -x,  y + 0.2, z,   x,  y + 0.2, z,
  -x, y, z,   x,  y + 0.2, z,   x, y, z,
  // Top face
  -x,  y + 0.2, z,  -x,  y + 0.2,  z  + 0.1,   x,  y + 0.2,  z  + 0.1,
  -x,  y + 0.2, z,   x,  y + 0.2,  z + 0.1,   x,  y + 0.2, z,
  // Bottom face
  -x, y, z,   x, y, z,   x, y,  z  + 0.1,
  -x, y, z,   x, y,  z  + 0.1,  -x, y,  z  + 0.1,
  // Right face
   x, y, z,   x,  y + 0.2, z,   x,  y + 0.2,  z  + 0.1,
   x, y, z,   x,  y + 0.2,  z  + 0.1,   x, y,  z  + 0.1,
  // Left face
  -x, y, z,  -x, y,  z + 0.1,  -x,  y + 0.2,  z + 0.1,
  -x, y, z,  -x,  y + 0.2,  z + 0.1,  -x,  y + 0.2, z,
]);
*/
	 
	 //draw_prism(tail, gl);
	 
	 head = createRectPrism(-0.1, 0.3, 0.8, 0.1, 0.1, 0.1);
	 draw_prism(head, gl, [0, 1, 0, 1], u_FragColor, "head");
	
	 
	 //console.log("a");
	 
	 leg_x = -0.4;
	 leg_y = -1;
	 leg_z = -0.8;
	 x_length = 0.1;
	 y_length = 0.7;
	 z_length = 0.1;
	//leg = createRectPrism(-0.4, -1, -0.8, 0.1, 0.7, 0.1);
	leg = createRectPrism(leg_x, leg_y, leg_z, x_length, y_length, z_length);
	globalThis.dimensions.push([leg_y + y_length, leg_z + 0.5 * z_length]);
	draw_prism(leg, gl, [0, 1, 0, 1], u_FragColor, "leg");
	leg = createRectPrism(-leg_x, leg_y, leg_z, -x_length, y_length, z_length);
	globalThis.dimensions.push([-(leg_y  + y_length), leg_z + 0.5 * z_length]);
	draw_prism(leg, gl, [0, 1, 0, 1], u_FragColor, "leg");
	leg = createRectPrism(-leg_x, leg_y, -leg_z, -x_length, y_length, -z_length);
	globalThis.dimensions.push([-(leg_y  + y_length), -(leg_z + 0.5 * z_length)]);
	draw_prism(leg, gl, [0, 1, 0, 1], u_FragColor, "leg");
	//leg = createRectPrism(leg_x, leg_y, -leg_z, x_length, y_length, -z_length);
	for (let i = 0; i < 4; i = i + 1) {
		leg = createRectPrism(leg_x, leg_y + 0.25 * y_length * i, -leg_z, x_length, 0.25 * y_length, -z_length);
		globalThis.dimensions.push([leg_y + y_length, -(leg_z + 0.5 * z_length)]);
		draw_prism(leg, gl, [0, 1, 0, 1], u_FragColor, "leg_section");
	}
	
	//animation_loop();
	/*
	while (true) {
		draw_prism(null, gl, null, u_FragColor);
	}
	*/
	on_state = document.getElementById("animation on/off");
	on_state.addEventListener("change", () => {
		animation_loop(gl, u_FragColor);
	})
	 
	 tail = createRectPrism(-0.1, 0.3, -0.8, 0.1, 0.4, -0.1);
	 draw_prism(tail, gl, [0, 1, 0, 1], u_FragColor, "tail");
	 
	 canvas.addEventListener('click', (event) => {
		if (event.shiftKey) {
			globalThis.tail_up = !(globalThis.tail_up);
			draw_prism(null, gl, null, u_FragColor, null);
		}
		else {
			 var rect = event.target.getBoundingClientRect();

			 var x = event.clientX; // x coordinate of a mouse pointer
			 var y = event.clientY; // y coordinate of a mouse pointer
			 x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
			 y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  // Calculate the x and y coordinates relative to the canvas


			globalThis.last_x = ((x + 1) / 2) * 360;
			globalThis.last_y = ((y + 1) / 2) * 360;
			draw_prism(null, gl, null, u_FragColor, null);
			
		}
	 })
	 
	 horn1 = createPyramid(-0.075, 0.3, 0.8, 0.05, 0.3);
	 draw_prism(horn1, gl, [1, 0, 0, 1], u_FragColor, "pyramid");
	 
	 horn2 = createPyramid(-0.025, 0.3, 0.8, 0.05, 0.3);
	 draw_prism(horn2, gl, [1, 0, 0, 1], u_FragColor, "pyramid");
		 
}

function draw_prism(list1, gl, rgba, u_FragColor, body_part) {
	start = Date.now();
	if (list1 != null) {
		globalThis.shapes.push(list1);
		globalThis.colors.push(rgba);
		//console.log(body_part);
		globalThis.body_types.push(body_part);
	}
	/*
	console.log("g1:");
	console.log(gl);
	console.log(list1);
	console.log(rgba);
	*/
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	joint_count = 0;
	for (let i = 0; i < globalThis.shapes.length; i = i + 1) {
		//console.log("i:");
		//console.log(i);
		const positionBuffer = gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		//console.log(globalThis.shapes[i]);
		gl.bufferData(gl.ARRAY_BUFFER, globalThis.shapes[i], gl.STATIC_DRAW);
	
		var aPosition = gl.getAttribLocation(gl.program, 'aPosition');
		gl.enableVertexAttribArray(aPosition);
	
  
	gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
  
	var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');

// Create a rotation matrix (Example: rotate 30 degrees on X and Y)
		var modelMatrix = new Matrix4(); // Assumes use of a utility library like cuon-matrix.js
		modelMatrix.setRotate(30 + globalThis.last_x, 1, 0, 0); // Rotate 30 deg around X-axis
		modelMatrix.rotate(30 + globalThis.last_y, 0, 1, 0);    // Rotate 30 deg around Y-axis
		modelMatrix.rotate(globalThis.rotation, 0, 1, 0);
		
		
		if (globalThis.body_types[i] == "leg" || globalThis.body_types[i] == "leg_section") {
			//console.log("is_leg");
			modelMatrix.translate(0, globalThis.dimensions[i][0], globalThis.dimensions[i][1]);
			if (globalThis.leg_position == true) {
				//globalThis.leg_position = false;
				modelMatrix.rotate(30, 1, 0, 0);
			}
			else {
				//globalThis.leg_position = true;
				modelMatrix.rotate(-30, 1, 0, 0);
			}

			if (joint_count == 1 && globalThis.body_types[i] == "leg_section") {
				modelMatrix.translate(0, -0.75 * 0.7, 0);
				first_joint = document.getElementById("first joint");
				first_joint = first_joint.value;
				modelMatrix.rotate(-first_joint, 1, 0, 0);
				modelMatrix.translate(0, 0.75 * 0.7, 0);
			}
			
			if (joint_count > 1 && globalThis.body_types[i] == "leg_section") {
				/*
				modelMatrix.translate(0, 0.05, 0);
				first_joint = document.getElementById("first joint");
				first_joint = first_joint.value;
				second_joint = document.getElementById("second joint");
				second_joint = second_joint.value;

				
				
				
				modelMatrix.rotate(-first_joint - second_joint, 1, 0, 0);
				modelMatrix.translate(0, -0.05, 0);
				*/
				second_joint = document.getElementById("second joint");
				second_joint = second_joint.value;
				
				modelMatrix.translate(0, -0.5 * 0.7, 0);
				modelMatrix.rotate(-second_joint, 1, 0, 0);
				modelMatrix.translate(0, 0.5 * 0.7, 0);
				
				
				modelMatrix.translate(0, -0.75 * 0.7, 0);
				first_joint = document.getElementById("first joint");
				first_joint = first_joint.value;
				modelMatrix.rotate(-first_joint, 1, 0, 0);
				modelMatrix.translate(0, 0.75 * 0.7, 0);
				
			}
			
			if (globalThis.body_types[i] == "leg_section") {
				joint_count = joint_count + 1;
			}
			
			modelMatrix.translate(0, - (globalThis.dimensions[i][0]), - globalThis.dimensions[i][1]);
			
			if (globalThis.body_types[i] != "leg_section") {
				joint_count = 0;
			}
		}
		
		if (globalThis.body_types[i] == "tail" && !(globalThis.tail_up)) {
			modelMatrix.translate(0, 0.3, -0.85);
			modelMatrix.rotate(180, 1, 0, 0);
			modelMatrix.translate(0, -0.3, 0.85);
		}

// Pass the matrix to the vertex shader
		gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
	
	gl.uniform4f(u_FragColor, globalThis.colors[i][0], globalThis.colors[i][1], globalThis.colors[i][2], globalThis.colors[i][3]);
	if (globalThis.body_types[i] != "pyramid") {
		gl.drawArrays(gl.TRIANGLES, 0, 36);
	}
	else {
		gl.drawArrays(gl.TRIANGLES, 0, 18);
	}

	}
	globalThis.leg_position = !(globalThis.leg_position);
	end = Date.now();
	console.log(1 / ((end-start)/1000));
}
function createRectPrism(xMin, yMin, zMin, xLen, yLen, zLen) {
    const xMax = xMin + xLen;
    const yMax = yMin + yLen;
    const zMax = zMin + zLen;

    // Define 36 vertices (6 faces, 2 triangles per face)
    // Each vertex is x, y, z
    const vertices = new Float32Array([
        // Front face
        xMin, yMin, zMax, xMax, yMin, zMax, xMax, yMax, zMax,
        xMin, yMin, zMax, xMax, yMax, zMax, xMin, yMax, zMax,
        // Back face
        xMin, yMin, zMin, xMax, yMin, zMin, xMax, yMax, zMin,
        xMin, yMin, zMin, xMax, yMax, zMin, xMin, yMax, zMin,
        // Top face
        xMin, yMax, zMin, xMax, yMax, zMin, xMax, yMax, zMax,
        xMin, yMax, zMin, xMax, yMax, zMax, xMin, yMax, zMax,
        // Bottom face
        xMin, yMin, zMin, xMax, yMin, zMin, xMax, yMin, zMax,
        xMin, yMin, zMin, xMax, yMin, zMax, xMin, yMin, zMax,
        // Right face
        xMax, yMin, zMin, xMax, yMax, zMin, xMax, yMax, zMax,
        xMax, yMin, zMin, xMax, yMax, zMax, xMax, yMin, zMax,
        // Left face
        xMin, yMin, zMin, xMin, yMax, zMin, xMin, yMax, zMax,
        xMin, yMin, zMin, xMin, yMax, zMax, xMin, yMin, zMax
    ]);

    return vertices;
}
/*
function rotation_change(list1, gl, rgba, u_FragColor, ev) {
	
}
*/
function animation_loop(gl, u_FragColor) {
	setTimeout( function() {
		draw_prism(null, gl, null, u_FragColor, null);
		on_state = document.getElementById("animation on/off");
		if (on_state.value == 1) {
			animation_loop(gl, u_FragColor);
		}
	}, 2000)
}
/*
function createPyramid(centerX, centerY, centerZ, sideLength, height) {
    const s = sideLength / 2;
    const h = height;

    // 5 vertices: 0=Apex, 1=FL, 2=FR, 3=BR, 4=BL
    const positions = new Float32Array([
        // Apex
        centerX, centerY + h, centerZ,
        // Base vertices
        centerX - s, centerY, centerZ + s, // 1: Front Left
        centerX + s, centerY, centerZ + s, // 2: Front Right
        centerX + s, centerY, centerZ - s, // 3: Back Right
        centerX - s, centerY, centerZ - s  // 4: Back Left
    ]);

    // Indices for triangles: 4 sides + 2 triangles for the base
    const indices = new Uint16Array([
        0, 1, 2, // Side 1 (Front)
        0, 2, 3, // Side 2 (Right)
        0, 3, 4, // Side 3 (Back)
        0, 4, 1, // Side 4 (Left)
        // Base (two triangles)
        1, 3, 2,
        1, 4, 3
    ]);

    return positions;
}
*/


function createPyramid(centerX, centerY, centerZ, sideLength, height) {
    const halfSide = sideLength / 2;
    
    // Define the 5 vertices of the pyramid
    const v0 = [centerX - halfSide, centerY, centerZ - halfSide]; // Base 1
    const v1 = [centerX + halfSide, centerY, centerZ - halfSide]; // Base 2
    const v2 = [centerX + halfSide, centerY, centerZ + halfSide]; // Base 3
    const v3 = [centerX - halfSide, centerY, centerZ + halfSide]; // Base 4
    const vTop = [centerX, centerY + height, centerZ]; // Apex

    // Define 6 triangles (18 vertices) using GL_TRIANGLES
    // Base: 2 triangles (v0, v1, v2) and (v0, v2, v3)
    // Sides: 4 triangles connecting base edges to top
    return new Float32Array([
        // Base (two triangles)
        ...v0, ...v1, ...v2,
        ...v0, ...v2, ...v3,
        // Sides (four triangles)
        ...v0, ...v1, ...vTop, // Front
        ...v1, ...v2, ...vTop, // Right
        ...v2, ...v3, ...vTop, // Back
        ...v3, ...v0, ...vTop  // Left
    ]);
}