import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


// Criar a cena
const scene = new THREE.Scene();

// Configurar a câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

// Configurar o renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render); 

function render() {
  renderer.render(scene, camera); // re-renderiza a cena quando os controles mudam
}

// Carregar a fonte e adicionar o texto
const loader = new FontLoader();
loader.load('/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('Tete eu Te amo !', {
        font: font,
        size: 5,
        height: 2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0.5,
        bevelOffset: 0,
        bevelSegments: 5
    });

    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    scene.add(light);
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.set(-30, 0, 0); // Ajuste a posição conforme necessário
    scene.add(textMesh);
});

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Iniciar a animação
animate();
