// This file contains all the bone-related parameters.
// Functions in this file DON'T CHANGE parameters in other files.

var info = {

    getBoneParameters : function(bone) {
        switch (bone) {
            case 'none':
                return {
                    colorCode : [0.0, 0.0, 0.0, 0.0],
                    title : 'Welcome!',
                    content : "Use the panel on the right to show some info about human bones.",
                    worldMatrix : [0.25, 0.00, 0.00, 0.00, 0.00, 0.25, 0.00, 0.00, 0.00, 0.00, 0.25, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, -40.00, 1.00],
                }
            case 'skull':
                return {
                    colorCode : [0.2, 0.0, 0.0, 1.0],
                    title : 'Skull',
                    content : "The human skull is the bony structure that forms the head in the human skeleton. It supports the structures of the face and forms a cavity for the brain. It protects the brain from injury.",
                    worldMatrix : [1.00, 0.00, -0.35, 0.00, 0.00, 1.06, 0.00, 0.00, 0.35, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, -29.40, -40.00, 1.00],
                }
            case 'spinal-cord':
                return {
                    colorCode : [0.4, 0.0, 0.0, 1.0],
                    title : 'Spinal cord',
                    content : "The spinal cord is a long, thin, tubular structure made up of nervous tissue. It encloses the central canal of the spinal cord, which contains cerebrospinal fluid. It is around 45 cm long in men and around 43 cm long in women.",
                    worldMatrix : [-0.32, 0.00, -0.32, 0.00, 0.00, 0.45, 0.00, 0.00, 0.32, 0.00, -0.32, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, -4.60, -40.00, 1.00],
                }
            case 'humerus':
                return {
                    colorCode : [0.6, 0.0, 0.0, 1.0],
                    title : 'Humerus',
                    content : "The humerus is a long bone in the arm that runs from the shoulder to the elbow. It connects the scapula and the two bones of the lower arm, the radius and ulna.",
                    worldMatrix : [0.35, 0.00, -0.48, 0.00, 0.00, 0.59, 0.00, 0.00, 0.48, 0.00, 0.35, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 1.60, -8.20, -40.00, 1.00],
                }
            case 'ribs':
                return {
                    colorCode : [0.8, 0.0, 0.0, 1.0],
                    title : 'Ribs',
                    content : "The rib cage, also known as the thoracic cage, is a bony and cartilaginous structure which surrounds the thoracic cavity and supports the shoulder girdle to form the core part of the human skeleton. A typical human rib cage consists of 24 ribs in 12 pairs.",
                    worldMatrix : [0.70, 0.00, 0.00, 0.00, 0.00, 0.70, 0.00, 0.00, 0.00, 0.00, 0.70, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, -9.40, -40.00, 1.00],
                }
            case 'femur-bones':
                return {
                    colorCode : [0.2, 0.2, 0.0, 1.0],
                    title : 'Femur bones',
                    content : "The femur is the only bone in the upper leg. It is the longest and the strongest bone in the human body. The femur length on average is 26.74% of a person's height, a ratio found in both men and women.",
                    worldMatrix : [0.44, 0.00, -0.33, 0.00, 0.00, 0.55, 0.00, 0.00, 0.33, 0.00, 0.44, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 7.00, -40.00, 1.00],
                }
            case 'jawbone':
                return {
                    colorCode : [0.4, 0.2, 0.0, 1.0],
                    title : 'Jawbone',
                    content : "The jawbone is the largest, strongest and lowest bone in the human facial skeleton. It forms the lower jaw and holds the lower teeth in place.",
                    worldMatrix : [0.92, 0.00, 0.63, 0.00, 0.00, 1.11, 0.00, 0.00, -0.63, 0.00, 0.92, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, -31.40, -40.00, 1.00],
                }
            case 'clavicle':
                return {
                    colorCode : [0.6, 0.2, 0.0, 1.0],
                    title : 'Clavicle',
                    content : "The clavicle is a long bone that serves as a strut between the shoulder blade and the sternum. The clavicle is the only long bone in the body that lies horizontally. It is a touchable bone, and in people who have less fat in this region, the location of the bone is clearly visible, as it creates a bulge in the skin.",
                    worldMatrix : [0.68, -0.24, 0.25, 0.00, 0.00, 0.55, 0.53, 0.00, -0.34, -0.47, 0.49, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, -12.60, -40.00, 1.00],
                }
            case 'shoulder-blade':
                return {
                    colorCode : [0.8, 0.2, 0.0, 1.0],
                    title : 'Shoulder blade',
                    content : "The shoulder blade is the bone that connects the humerus with the clavicle. Like their connected bones, the scapulae are paired, with each scapula on either side of the body being roughly a mirror image of the other.",
                    worldMatrix : [-0.79, 0.00, -0.53, 0.00, 0.00, 0.96, 0.00, 0.00, 0.53, 0.00, -0.79, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, -17.00, -40.00, 1.00],
                }
            case 'ulna':
                return {
                    colorCode : [0.2, 0.4, 0.0, 1.0],
                    title : 'Ulna',
                    content : "The ulna is a long bone found in the forearm that stretches from the elbow to the smallest finger. It runs parallel to the radius, the other long bone in the forearm. The ulna is usually slightly longer than the radius, but the radius is thicker. Therefore the radius is considered to be the larger of the two.",
                    worldMatrix : [-0.22, 0.00, 0.58, 0.00, 0.00, 0.62, 0.00, 0.00, -0.58, 0.00, -0.22, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 1.20, -3.60, -40.00, 1.00],
                }
            case 'radius':
                return {
                    colorCode : [0.4, 0.4, 0.0, 1.0],
                    title : 'Radius',
                    content : "The radius is one of the two large bones of the forearm, the other being the ulna. It extends from the lateral side of the elbow to the thumb side of the wrist and runs parallel to the ulna. It is a long bone, prism-shaped and slightly curved longitudinally.",
                    worldMatrix : [0.38, 0.00, 0.55, 0.00, 0.00, 0.67, 0.00, 0.00, -0.55, 0.00, 0.38, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, -2.60, -4.60, -40.00, 1.00],
                }
            case 'sternum':
                return {
                    colorCode : [0.6, 0.4, 0.0, 1.0],
                    title : 'Sternum',
                    content : "The sternum is a long flat bone located in the central part of the chest. It connects to the ribs via cartilage and forms the front of the rib cage, thus helping to protect the heart, lungs, and major blood vessels from injury. Shaped roughly like a necktie, it is one of the largest and longest flat bones of the body.",
                    worldMatrix : [0.82, 0.00, 0.00, 0.00, 0.00, 0.82, 0.00, 0.00, 0.00, 0.00, 0.82, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, -13.00, -40.00, 1.00],
                }
            case 'pelvis':
                return {
                    colorCode : [0.8, 0.4, 0.0, 1.0],
                    title : 'Pelvis',
                    content : "The pelvic skeleton is formed posteriorly by the sacrum and the coccyx, and laterally and anteriorly by a pair of hip bones. Each hip bone consists of 3 sections, ilium, ischium, and pubis. During childhood, these sections are separate bones, joined by the triradiate cartilage. During puberty, they fuse together to form a single bone.",
                    worldMatrix : [0.83, 0.00, -0.44, 0.00, 0.00, 0.94, 0.00, 0.00, 0.44, 0.00, 0.83, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, -40.00, 1.00],
                }
            case 'tibia':
                return {
                    colorCode : [0.2, 0.6, 0.0, 1.0],
                    title : 'Tibia',
                    content : "The tibia is the larger, stronger, and anterior of the two bones in the leg below the knee in humans (the other being the fibula), and it connects the knee with the ankle bones.",
                    worldMatrix : [0.44, 0.00, 0.30, 0.00, 0.00, 0.54, 0.00, 0.00, -0.30, 0.00, 0.44, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 16.60, -40.00, 1.00],
                }
            case 'fibula':
                return {
                    colorCode : [0.4, 0.6, 0.0, 1.0],
                    title : 'Fibula',
                    content : "The fibula is a leg bone on the lateral side of the tibia, to which it is connected above and below. It is the smaller of the two bones and, in proportion to its length, the slenderest of all the long bones.",
                    worldMatrix : [-0.31, 0.00, 0.41, 0.00, 0.00, 0.51, 0.00, 0.00, -0.41, 0.00, -0.31, 0.00, 0.00, 0.00, 0.00, 1.00],
                    viewMatrix : [1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 15.60, -40.00, 1.00],
                }

            default:
                console.error('Cannot handle selection');
                break;
        }
    },
}