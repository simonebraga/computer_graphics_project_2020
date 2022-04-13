// This file contains functions that handle the interaction with the user through mouse and keyboard.
// Parameters in this file should be accessed from the animation function in the main script.
// Functions in this file DON'T CHANGE parameters in other files.

var keys = [];
var horizontalMovement = 0.0, verticalMovement = 0.0;
var xRotation = 0.0, yRotation = 0.0, zRotation = 0.0;
var scale = 0.0;

function keyFunctionDown(event) {
    if(!keys[event.keyCode]) {
        keys[event.keyCode] = true;
        switch(event.keyCode) {
            case 65: // A
                horizontalMovement = horizontalMovement - 1.0;
                break;
            case 68: // D
                horizontalMovement = horizontalMovement + 1.0;
                break;
            case 69: // E
                yRotation = yRotation + 1.0;
                break;
            case 70: // F
                xRotation = xRotation + 1.0;
                break;
            case 73: // I
                scale = scale + 1.0;
                break;
            case 79: // O
                scale = scale - 1.0;
                break;
            case 81: // Q
                yRotation = yRotation - 1.0;
                break;
            case 82: // R
                xRotation = xRotation - 1.0;
                break;
            case 83: // S
                verticalMovement = verticalMovement - 1.0;
                break;
            case 87: // W
                verticalMovement = verticalMovement + 1.0;
                break;
            case 88: // X
                zRotation = zRotation - 1.0;
                break;
            case 90: // Z
                zRotation = zRotation + 1.0;
                break;
        }
    }
}

function keyFunctionUp(event) {
    if(keys[event.keyCode]) {
        keys[event.keyCode] = false;
        switch(event.keyCode) {
            case 65: // A
                horizontalMovement = horizontalMovement + 1.0;
                break;
            case 68: // D
                horizontalMovement = horizontalMovement - 1.0;
                break;
            case 69: // E
                yRotation = yRotation - 1.0;
                break;
            case 70: // F
                xRotation = xRotation - 1.0;
                break;
            case 73: // I
                scale = scale - 1.0;
                break;
            case 79: // O
                scale = scale + 1.0;
                break;
            case 81: // Q
                yRotation = yRotation + 1.0;
                break;
            case 82: // R
                xRotation = xRotation + 1.0;
                break;
            case 83: // S
                verticalMovement = verticalMovement + 1.0;
                break;
            case 87: // W
                verticalMovement = verticalMovement - 1.0;
                break;
            case 88: // X
                zRotation = zRotation + 1.0;
                break;
            case 90: // Z
                zRotation = zRotation - 1.0;
        }
    }
}