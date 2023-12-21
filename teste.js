// Definindo a cena, câmera, renderizador e luzes...
// ...

// Inicializa o loader para a fonte e o modelo
const fontLoader = new FontLoader();
const gltfLoader = new GLTFLoader();

// Carrega a fonte e cria o texto
fontLoader.load('/fonts/helvetiker_regular.typeface.json', function (font) {
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
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.set(-30, 0, 0); // Ajuste a posição conforme necessário
    scene.add(textMesh);

    // Agora que o texto está na cena, carrega os corações
    gltfLoader.load('/models/heart.glb', function (gltf) {
        const heartGeometry = gltf.scene.children[0].geometry;
        const heartMaterial = new THREE.MeshStandardMaterial({ color: 0xff69b4 });

        for (let i = 0; i < 100; i++) {
            // Clona o modelo
            const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);

            // Posiciona cada coração aleatoriamente em volta do texto
            // ...

            scene.add(heartMesh);
        }

        render();
    });
});

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (controls) controls.update();
}

animate();


// versao anterior
import './style.css'
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';




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
controls.enableDamping = true; // Opcional: adiciona amortecimento (inércia)
controls.dampingFactor = 0.25;

function render() {
  renderer.render(scene, camera); // re-renderiza a cena quando os controles mudam
}

// Carregar a fonte e adicionar o texto
const loader = new FontLoader();
const loaderHeart = new GLTFLoader();

loader.load('/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('Tete, eu Te amo !', {
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




loaderHeart.load('/models/heart.glb', function (gltf) {
    for (let i = 0; i < 1000; i++) {
        // Clona o modelo
        const heart = gltf.scene.clone();

        // Varia a posição aleatoriamente
        heart.position.set(
            (Math.random() - 0.5) * 100, // x
            (Math.random() - 0.5) * 100, // y
            (Math.random() - 0.5) * 100  // z
        );

        // Varia a rotação aleatoriamente
        heart.rotation.set(
            Math.random() * Math.PI, // x
            Math.random() * Math.PI, // y
            Math.random() * Math.PI  // z
        );

        // Varia o tamanho aleatoriamente
        const scale = Math.random() * 0.5 + 0.5; // Entre 0.5 e 1.5
        heart.scale.set(scale, scale, scale);

        // Adiciona o coração na cena
        scene.add(heart);
    }

    // Re-renderiza a cena
    render();
}, undefined, function (error) {
    console.error(error);
});

// ...[restante do seu código]...

// Carregador de texturas
const textureLoader = new THREE.TextureLoader();

// Carregar a imagem de fundo
const backgroundImage = textureLoader.load('/img/tete-na-foz.jpg', function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
});

// Criar a geometria do plano
const planeGeometry = new THREE.PlaneGeometry(30, 15); // Ajuste o tamanho conforme necessário

// Criar o material com a textura
const planeMaterial = new THREE.MeshBasicMaterial({ map: backgroundImage, side: THREE.DoubleSide });

// Criar o plano e adicionar à cena
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, 0, -20); // Ajuste a posição conforme necessário
plane.rotation.y = Math.PI / 4; // Rotacionar para criar efeito de perspectiva
scene.add(plane);

// ...[restante do seu código]...



// Função de animação
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    controls.update();
}

// Iniciar a animação
animate();

