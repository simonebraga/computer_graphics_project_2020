"use strict";

var vertexShaderText = `#version 300 es

in vec3 vertPosition;
in vec2 vertTexCoord;
in vec3 vertNormal;

uniform mat4 worldViewProjMatrix;

out vec2 fragTexCoord;
out vec3 fragNormal;

void main()
{
    fragTexCoord = vertTexCoord;
    fragNormal = vertNormal;
    gl_Position = worldViewProjMatrix * vec4(vertPosition, 1.0);
}
`

var fragmentShaderText = `#version 300 es
precision mediump float;

in vec2 fragTexCoord;
in vec3 fragNormal;

uniform vec4 highlightCode;
uniform vec4 highlightColor;

uniform sampler2D originalTexture;
uniform sampler2D boneMap;

uniform bool customLighting;
uniform vec3 ambientLightColor;
uniform vec3 directionalLightColor;
uniform vec3 directionalLightDirection;

out vec4 outColor;

void main()
{
    vec4 texel;
    if(texture(boneMap, fragTexCoord) == highlightCode)
        texel = highlightColor;
    else
        texel = texture(originalTexture, fragTexCoord);

    if(customLighting) {
        vec3 lambertColor = directionalLightColor * clamp(dot(normalize(fragNormal), directionalLightDirection), 0.0, 1.0);
        outColor = vec4(clamp(texel.rgb * (ambientLightColor + lambertColor), 0.0, 1.0), texel.a);
    } else {
        outColor = texel;
    }
}
`

var skeletonModelSrc = "src/assets/skeleton.obj";
var originalTextureSrc = "src/assets/texture.png";
var boneMapSrc = "src/assets/bone_colors.png";
var highlightColor = [1.0, 0.0, 0.0, 1.0];
var ambientLightColor = [0.2, 0.2, 0.2];
var directionalLightColor = [0.8, 0.8, 0.8];
var fov = Math.PI / 6;
var nearPlane = 0.1;
var farPlane = 1000.0;

var canvas;
var gl;
var skeletonModel;
var highlightCode = [0.0, 0.0, 0.0, 0.0];
var customLighting = false;

var worldMatrix = new Float32Array(16);
var viewMatrix = new Float32Array(16);
var projMatrix = new Float32Array(16);

var main = function() {

    //
    // General setup
    //

    window.addEventListener('keyup', keyFunctionUp, false);
    window.addEventListener('keydown', keyFunctionDown, false);

    canvas = page.getCanvas();
    gl = canvas.getContext('webgl2');
    
    if(!gl) {
        alert('Your browser does not support WebGL 2.0');
    }

    gl.clearColor(0.8, 0.9, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var elementVertices = skeletonModel.vertices;
    var elementIndices = skeletonModel.indices;
    var elementTexCoords = skeletonModel.textures;
    var elementNormals = skeletonModel.vertexNormals;

    // The following cycle moves the local origin of the object, and allows better rotations later;
    for(var i = 0 ; i < elementVertices.length ; i = i + 3) {
        elementVertices[i + 1] -= 36.5;
    }

    //
    // Create shaders & program
    //

    var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, vertexShaderText);
    var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderText);
    var program = utils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    var texCoordAttribLocation = gl.getAttribLocation(program, 'vertTexCoord');
    var vertNormalAttribLocation = gl.getAttribLocation(program, 'vertNormal');
    var worldViewProjMatrixUniformLocation = gl.getUniformLocation(program, 'worldViewProjMatrix');
    var highlightCodeUniformLocarion = gl.getUniformLocation(program, 'highlightCode');
    var highlightColorUniformLocation = gl.getUniformLocation(program, 'highlightColor')
    var originalTextureUniformLocation = gl.getUniformLocation(program, 'originalTexture');
    var boneMapUniformLocation = gl.getUniformLocation(program, 'boneMap');
    var customLightingUniformLocation = gl.getUniformLocation(program, 'customLighting');
    var ambientLightColorUniformLocation = gl.getUniformLocation(program, 'ambientLightColor');
    var directionalLightColorUniformLocation = gl.getUniformLocation(program, 'directionalLightColor');
    var directionalLightDirectionUniformLocation = gl.getUniformLocation(program, 'directionalLightDirection');

    //
    // Create buffers
    //

    var elementVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, elementVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(elementVertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

    var elementIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(elementIndices), gl.STATIC_DRAW);

    var elementTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, elementTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(elementTexCoords), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(texCoordAttribLocation);
    gl.vertexAttribPointer(texCoordAttribLocation, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);

    var elementNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, elementNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(elementNormals), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(vertNormalAttribLocation);
    gl.vertexAttribPointer(vertNormalAttribLocation, 3, gl.FLOAT, gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

    //
    // Create textures
    //

    var originalTexture = gl.createTexture();
    var originalTextureImage = new Image();
    originalTextureImage.src = originalTextureSrc;
    originalTextureImage.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, originalTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, originalTextureImage);
    };

    var boneMap = gl.createTexture();
    var boneMapImage = new Image();
    boneMapImage.src = boneMapSrc;
    boneMapImage.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, boneMap);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, boneMapImage);
    }

    //
    // Create transformations
    //

    var scalingMatrix = new Float32Array(16);
    var rotationMatrix = new Float32Array(16);
    var translationMatrix = new Float32Array(16);

    // Those values are set to centrate the model w.r.t. object space
    twgl.m4.scaling([0.25, 0.25, 0.25], scalingMatrix);
    twgl.m4.identity(rotationMatrix);
    twgl.m4.identity(translationMatrix);

    // worldMatrix, viewMatrix and projMatrix moved in global scope, since needed in wider scope

    // Those values are set to show the full shape of the model with minimum distortion (FOV 60°)
    twgl.m4.multiply(scalingMatrix, twgl.m4.multiply(rotationMatrix, translationMatrix), worldMatrix);
    twgl.m4.inverse(twgl.m4.lookAt([0.0, 0.0, 40.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]), viewMatrix);    // Builds the view matrix instead of the look-at matrix
    twgl.m4.perspective(fov, canvas.width / canvas.height, nearPlane, farPlane, projMatrix);

    var worldViewMatrix = new Float32Array(16);
    var worldViewProjMatrix = new Float32Array(16);

    twgl.m4.multiply(worldMatrix, viewMatrix, worldViewMatrix);
    twgl.m4.multiply(worldViewMatrix, projMatrix, worldViewProjMatrix);

    //
    // Main render loop
    //

    var directionalLightDirection = new Float32Array(3);;
    var directionalLightDirectionCorrected = new Float32Array(3);

    //Those uniforms are bound outside the loop since they don't change at runtime
    gl.uniform4fv(highlightColorUniformLocation, highlightColor);
    gl.uniform3fv(ambientLightColorUniformLocation, ambientLightColor);
    gl.uniform3fv(directionalLightColorUniformLocation, directionalLightColor);

    var animate = function() {
        
        twgl.m4.scale(worldMatrix, [1.0 + scale / 100, 1.0 + scale / 100, 1.0 + scale / 100], worldMatrix);

        twgl.m4.rotateX(worldMatrix, xRotation / 60, worldMatrix);
        twgl.m4.rotateY(worldMatrix, yRotation / 60, worldMatrix);
        twgl.m4.rotateZ(worldMatrix, zRotation / 60, worldMatrix);

        twgl.m4.translate(viewMatrix, [horizontalMovement / 5, verticalMovement / 5, 0.0], viewMatrix);

        twgl.m4.multiply(worldMatrix, viewMatrix, worldViewMatrix);
        twgl.m4.multiply(worldViewMatrix, projMatrix, worldViewProjMatrix);
    }

    var loop = function() {
        animate();

        gl.uniformMatrix4fv(worldViewProjMatrixUniformLocation, gl.FALSE, worldViewProjMatrix);
        gl.uniform4fv(highlightCodeUniformLocarion, highlightCode);
        gl.uniform1i(originalTextureUniformLocation, 0);
        gl.uniform1i(boneMapUniformLocation, 1);
        gl.uniform1i(customLightingUniformLocation, customLighting);

        directionalLightDirection = [page.getLightParameters().horizontal, page.getLightParameters().vertical, 1.0];
        // Move the light direction from world space to object space
        twgl.v3.normalize(utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(worldMatrix), directionalLightDirection), directionalLightDirectionCorrected);
        gl.uniform3fv(directionalLightDirectionUniformLocation, directionalLightDirectionCorrected);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, originalTexture);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, boneMap);

        gl.drawElements(gl.TRIANGLES, elementIndices.length, gl.UNSIGNED_SHORT, 0);

        window.requestAnimationFrame(loop);
    }

    window.requestAnimationFrame(loop);

}

var init = async function() {
    page.updateTextBox('none');

    var skeletonModelSerialized = await utils.get_objstr(skeletonModelSrc);
    skeletonModel = new OBJ.Mesh(skeletonModelSerialized);

    main();
}
