// This file contains critical functions that act both on the page and on the global variables.
// All the references to the HTML code should be kept inside the functions in this file.
// Functions in this file DO CHANGE parameters in other files and elements in HTML page.

var page = {

    getCanvas :  function() {
        return document.getElementById('canvas-surface');
    },

    updateTextBox : function(element) {
        var title = document.getElementById('gui-title');
        var content = document.getElementById('gui-content');
    
        title.innerHTML = info.getBoneParameters(element).title.bold();
        content.innerHTML = info.getBoneParameters(element).content;
    },

    updateView : function(element) {
        worldMatrix = info.getBoneParameters(element).worldMatrix;
        viewMatrix = info.getBoneParameters(element).viewMatrix;
    },
    
    updateSelectedBone : function() {
        var selection = document.getElementById('highlight-selection');
        var element = selection.options[selection.selectedIndex].value;
    
        this.updateTextBox(element);

        if(element != 'none') {
            document.getElementById('gui-popup').style.visibility = 'visible';
            this.updateView(element);
        } else
            document.getElementById('gui-popup').style.visibility = 'hidden';
    
        highlightCode = info.getBoneParameters(element).colorCode;
    },
    
    getLightParameters : function() {
        return {
            horizontal : -1 + 2 * document.getElementById('horizontal-rotation').value,
            vertical : -1 + 2 * document.getElementById('vertical-rotation').value,
        }
    },

    enableLightParameters : function(enable) {
        if(enable) {
            document.getElementById('light-direction-panel').style.visibility = 'visible';
            customLighting = true;
        } else {
            document.getElementById('light-direction-panel').style.visibility = 'hidden';
            customLighting = false;
        }
    },

    resizeCanvas : function(increase) {
        var resizeRatio = 1.1;

        if(increase) {
            canvas.width *= resizeRatio;
            canvas.height *= resizeRatio;
        } else if((canvas.width <= 800) || (canvas.height <= 600)) {
            return;
        } else {
            canvas.width /= resizeRatio;
            canvas.height /= resizeRatio;
        }

        var topPosition = canvas.height - 180;
        document.getElementById('gui-popup').style.top = topPosition.toString() + "px";
        gl.viewport(0, 0, canvas.width, canvas.height);
        twgl.m4.perspective(fov, canvas.width / canvas.height, nearPlane, farPlane, projMatrix);
    },
}