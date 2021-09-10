import Model from "./Model";
import * as THREE from "three";
import {Lut} from "three/examples/jsm/math/Lut";
import {GUI} from "three/examples/jsm/libs/dat.gui.module";

export default Model;

/*
let container;
let perpCamera, orthoCamera, renderer, lut;
let mesh, sprite;
let scene, uiScene;
let params;

init();

function init() {

    container = document.getElementById( 'container' );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    uiScene = new THREE.Scene();

    lut = new Lut();

    const width = 700;
    const height = 400;

    perpCamera = new THREE.PerspectiveCamera( 60, width / height, 1, 100 );
    perpCamera.position.set( 0, 0, 10 );
    scene.add( perpCamera );
    orthoCamera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 1, 2 );
    orthoCamera.position.set( 0.5, 0, 1 );



    sprite = new THREE.Sprite( new THREE.SpriteMaterial( {
        map: new THREE.CanvasTexture( lut.createCanvas() )
    } ) );
    sprite.scale.x = 0.125;
    uiScene.add( sprite );



    mesh = new THREE.Mesh( undefined, new THREE.MeshLambertMaterial( {
        side: THREE.DoubleSide,
        color: 0x222444,
        vertexColors: true
    } ) );
    scene.add( mesh );

    params	= {
        colorMap: 'rainbow',
    };
    loadModel( );


    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.autoClear = false;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    //------------------------------------
    const modelWin = document.getElementById("root");
    if (modelWin) {
        const oldChild = document.getElementById('model-canvas');
        if (oldChild) modelWin.removeChild(oldChild);
        renderer.domElement.id = 'model-canvas';
        modelWin.appendChild(renderer.domElement);
    }


    const gui = new GUI();
    gui.add( params, 'colorMap', [ 'rainbow',
        'cooltowarm', 'blackbody', 'grayscale', "лул" ] ).onChange( function () {
        updateColors();
        render();
    } ); //фигня для выбора цвета, при изменении дергаем изменение

}


// function render() { //перегружаем все че есть
//     renderer.clear();
//     renderer.render( scene, perpCamera );
//     renderer.render( uiScene, orthoCamera );
// }


function loadModel( ) {

    const loader = new THREE.BufferGeometryLoader();
    loader.load( 'models/json/pressure.json', function ( geometry ) {

        geometry.center();
        geometry.computeVertexNormals();

        // default color attribute
        const colors = [];

        for ( let i = 0, n = geometry.attributes.position.count; i < n; ++ i ) {
            colors.push( 1, 1, 1 );

        }

        geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

        mesh.geometry = geometry;
        updateColors();

        render();

    } );

}

function updateColors() {

    lut.setColorMap( params.colorMap ); //приделываем цвет, который выборали

    lut.setMax( 2000 ); //шо это
    lut.setMin( 0 );

    const geometry = mesh.geometry;
    const pressures = geometry.attributes.pressure;


    const colors = geometry.attributes.color;

    for ( let i = 0; i < pressures.array.length; i++ ) {

        const colorValue = pressures.array[ i ];
        const color = lut.getColor( colorValue );

        if ( color === undefined ) {
            console.log( 'Unable to determine color for value:', colorValue );
        } else {
            colors.setXYZ( i, color.r, color.g, color.b );
        }

    }

    colors.needsUpdate = true;

    const map = sprite.material.map;
    lut.updateCanvas( map.image );
    map.needsUpdate = true;

}
*/
