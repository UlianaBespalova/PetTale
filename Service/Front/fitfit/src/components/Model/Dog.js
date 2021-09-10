import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import maleObj from './dogModel/dogModel.obj';
import textureDog from './dogModel/dogModel_dif.jpg';


let winX = 720;
let winY = 480;
let winOldX =  window.innerWidth;

let camera, scene, renderer;
let object;
let chestCylinder, neckCylinder, backCylinder;

const indicateColors = {
    colorBad: 0xFF4359,
    colorWarning: 0xffdb25,
    colorOk: 0x139c9c,
}
const colorOpacity = 0.25;


export const init = () => {

    camera = new THREE.PerspectiveCamera(45, winX/winY, 1, 2000);
    camera.position.z = 2;
    camera.position.x = -2;

    scene = new THREE.Scene();
    // scene.background = new THREE.Color(colorBackground);

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xFFEECA, 0.5);
    camera.add(pointLight);

    // const lightt = new THREE.DirectionalLight(0x550000);
    // lightt.position.set (5, 5, 5);
    // lightt.target.position.set(0,0,0);
    //
    // lightt.shadow.camera.top = 5;
    // lightt.shadow.camera.bottom = 1;
    // lightt.shadow.camera.left = -4;
    // lightt.shadow.camera.right = 1;
    //  lightt.shadow.camera.near = 8;
    //  lightt.shadow.camera.far = 15;//000000000000000000000000
    // lightt.castShadow = true;
    //  scene.add(lightt);
    //  scene.add(new THREE.DirectionalLightHelper(lightt));
    //  scene.add(new THREE.CameraHelper(lightt.shadow.camera));

    scene.add(camera);


    function loadModel() {
        object.traverse( function (child) {
            if (child.isMesh) {
                child.material.map = texture;
            }
        });
        // object.receiveShadow = true;
        // object.castShadow = true;

        object.scale.x = 0.05;
        object.scale.y = 0.05;
        object.scale.z = 0.05;
        object.position.y = -0.7;
        object.rotation.x = -Math.PI/1.9;

        scene.add(object);


        //-----------ПОДСВЕТКА-------------------
        //-----------сфера/грудь
        const chestGeometry = new THREE.Shape();
        const chestCoef = 3.4;
        const chestR = 0.02;
        chestGeometry.moveTo(0,0);
        chestGeometry.quadraticCurveTo(chestR, 0, chestR, chestR*chestCoef);
        chestGeometry.quadraticCurveTo(chestR, 2*chestR*chestCoef, 0, 2*chestR*chestCoef);
        chestGeometry.quadraticCurveTo(-chestR, 2*chestR*chestCoef, -chestR, chestR*chestCoef);
        chestGeometry.quadraticCurveTo(-chestR, 0, 0, 0);

        const chestOpt = {
            steps: 1,
            depth: 0.21,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.2,
            bevelSegments: 2,
        }
        const chestGeom = new THREE.ExtrudeGeometry(chestGeometry, chestOpt);
        const chestMaterial = new THREE.MeshBasicMaterial({
            color: indicateColors.colorOk,
            opacity: colorOpacity,
            transparent: true
        });
        chestCylinder = new THREE.Mesh(chestGeom, chestMaterial);
        chestCylinder.position.y=-0.06;
        chestCylinder.position.z=0.29;
        chestCylinder.rotation.x=-Math.PI/10;
        scene.add(chestCylinder);


        //---------спина-------------
        const backGeometry = new THREE.Shape();
        const backCoef = 1.2;
        const backR = 0.1;
        backGeometry.moveTo(-backR, backR*backCoef);
        backGeometry.quadraticCurveTo(0, backR, backR, backR*backCoef);
        backGeometry.quadraticCurveTo(backR, 2*backR*backCoef, 0, 2*backR*backCoef);
        backGeometry.quadraticCurveTo(-backR, 2*backR*backCoef, -backR, backR*backCoef);

        const backOpt = {
            steps: 1,
            depth: 0,
            bevelEnabled: true,
            bevelThickness: 0.6,
            bevelSize: 0.11,
            bevelSegments: 2,
        }
        const backGeom = new THREE.ExtrudeGeometry(backGeometry, backOpt);
        const backMaterial = new THREE.MeshBasicMaterial({
            color: indicateColors.colorOk,
            opacity: colorOpacity,
            transparent: true
        });
        backCylinder = new THREE.Mesh(backGeom, backMaterial);
        backCylinder.position.y=-0.09;
        backCylinder.position.z=0.05;
        backCylinder.rotation.x=-Math.PI/30;
        scene.add(backCylinder);
        //----------------------


        //----------шея
        const neckGeometry = new THREE.Shape();
        const neckR = 0.15;
        const neckCoef=1.3;
        neckGeometry.moveTo(0,0);
        neckGeometry.quadraticCurveTo(neckR, 0, neckR, neckR*neckCoef);
        neckGeometry.quadraticCurveTo(neckR, 2*neckR*neckCoef, 0, 2*neckR*neckCoef);
        neckGeometry.quadraticCurveTo(-neckR, 2*neckR*neckCoef, -neckR, neckR*neckCoef);
        neckGeometry.quadraticCurveTo(-neckR, 0, 0, 0);
        const neckOpt = {
            steps: 1,
            depth: 0.05,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.02,
            bevelSegments: 2,
        }
        const neckGeom = new THREE.ExtrudeGeometry(neckGeometry, neckOpt);
        const neckMaterial = new THREE.MeshBasicMaterial({
            color: indicateColors.colorOk,
            opacity: colorOpacity,
            transparent: true
        });
        neckCylinder = new THREE.Mesh(neckGeom, neckMaterial);
        neckCylinder.position.y=0.04;
        neckCylinder.position.z=0.67;
        neckCylinder.rotation.x=-Math.PI/3.1;
        scene.add(neckCylinder);
    }

    const manager = new THREE.LoadingManager(loadModel);
    const textureLoader = new THREE.TextureLoader(manager);
    const texture = textureLoader.load(textureDog);

    //-------------------------------------------------------ground--
    // const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 100, 100),
    //     new THREE.MeshLambertMaterial({ color: 0x888888 }));
    // mesh.position.y = -0.75;
    // mesh.rotation.x = -Math.PI / 2;
    // mesh.receiveShadow = true;
    // // mesh.castShadow = true;
    // scene.add(mesh);


    function onProgress (x) {
        if (x.lengthComputable) {
            const per = x.loaded / x.total * 100;
            console.log('model', per, '%');
        }
    }

    const loader = new OBJLoader(manager);
    loader.load(maleObj, function (obj) {
        object = obj;

    }, onProgress, (error)=>{
        console.log("error", error)
    });


    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(winX, winY);
    renderer.setClearColor(0x000000, 0);
    //renderer.shadowMap.enabled = true; //000000000000000000000000
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const modelWin = document.getElementById("model-window");
    if (modelWin) {
        const oldChild = document.getElementById('model-canvas');
        if (oldChild) modelWin.removeChild(oldChild);
        renderer.domElement.id = 'model-canvas';
        modelWin.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2.1;
    controls.maxDistance = 4;
    controls.maxPolarAngle = Math.PI/2; //максимальный круть (поправить потом)
}


export const onWindowResize = () => {
    if (winOldX === window.innerWidth) return;
    winOldX = window.innerWidth;

    const modelWin = document.getElementById("model-window");
    if (!modelWin) return;

    camera.aspect = modelWin.offsetWidth/modelWin.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(modelWin.offsetWidth, modelWin.offsetHeight);
}


export const animate = () => {
    requestAnimationFrame(animate);
    render();
}

export const render = () => {
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}


export const updateColor = (partName, color) => {

    let part = null;
    if (partName === 'chest') part = chestCylinder;
    if (partName === 'neck') part = neckCylinder;
    if (partName === 'back') part = backCylinder;
    if (!part) return;

    part.material = new THREE.MeshBasicMaterial({
        color: indicateColors[color],
        opacity: colorOpacity,
        transparent: true
    });
    part.material.needsUpdate = true;
}





