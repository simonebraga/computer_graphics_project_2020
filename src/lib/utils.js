// This file contains some short functions that make the main script more readable.
// Functions in this file DON'T CHANGE parameters in other files.

var utils = {

	get_objstr : async function(url){
        var response = await fetch(url);
        if (!response.ok) {
            alert('Response was not ok.\n' + url + ' cannot be found.');
            return;
        }
        var objstr = await response.text();
        return objstr;
    },
    
    createShader : function(gl, type, shaderText) {

        var shader = gl.createShader(type);
        gl.shaderSource(shader, shaderText);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Could not compile shader!\n' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return;
        }

        return shader;
    },

    createProgram : function(gl, vertexShader, fragmentShader) {

        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Could not link program!\n' + gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return;
        }

        return program;
    },

    clamp : function(val, min, max) {
        return Math.min(Math.max(val, min), max);
    },

    sub3x3from4x4 : function(m){
		out = [];
		out[0] = m[0]; out[1] = m[1]; out[2] = m[2];
		out[3] = m[4]; out[4] = m[5]; out[5] = m[6];
		out[6] = m[8]; out[7] = m[9]; out[8] = m[10];
		return out;
	},

	multiplyMatrix3Vector3 : function(m, a) {
	
		out = [];
		var x = a[0], y = a[1], z = a[2];
		out[0] = x * m[0] + y * m[1] + z * m[2];
		out[1] = x * m[3] + y * m[4] + z * m[5];
		out[2] = x * m[6] + y * m[7] + z * m[8];
		return out;
	},
}