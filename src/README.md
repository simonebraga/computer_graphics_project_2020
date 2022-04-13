Third party libraries used in the project are listed below:

[TWGL](https://twgljs.org/)  
[webgl-obj-loader](https://github.com/frenchtoast747/webgl-obj-loader)

The identification of bones on the model is done using an additional texture that encodes the bones by employing their color.
Only values 0.2, 0.4, 0.6, 0.8 are used for RGB, since they are not approximated when normalizing from [0, 255] range to [0, 1] range.  
Color-to-bone mapping is the following:

* [0.0, 0.0, 0.0, 0.0] None
* [0.2, 0.0, 0.0, 1.0] Skull
* [0.4, 0.0, 0.0, 1.0] Spinal cord
* [0.6, 0.0, 0.0, 1.0] Humerus
* [0.8, 0.0, 0.0, 1.0] Ribs
* [0.2, 0.2, 0.0, 1.0] Femur bones
* [0.4, 0.2, 0.0, 1.0] Jawbone
* [0.6, 0.2, 0.0, 1.0] Clavicle
* [0.8, 0.2, 0.0, 1.0] Shoulder blade
* [0.2, 0.4, 0.0, 1.0] Ulna
* [0.4, 0.4, 0.0, 1.0] Radius
* [0.6, 0.4, 0.0, 1.0] Sternum
* [0.8, 0.4, 0.0, 1.0] Pelvis
* [0.2, 0.6, 0.0, 1.0] Tibia
* [0.4, 0.6, 0.0, 1.0] Fibula

Additional stats about `skeleton.obj` that can be used to manipulate the model at runtime:  
X Size - 45.19  
Y Size - 73.02  
Z Size - 10.98
