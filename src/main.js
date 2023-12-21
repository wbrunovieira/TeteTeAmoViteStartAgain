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
controls.enableDamping = true;
controls.dampingFactor = 0.25;

function render() {
  renderer.render(scene, camera);
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

    textMesh.position.set(-30, 0, 0);
    scene.add(textMesh);
});

// Material único para todos os corações
const heartMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4 });

// Carregar e adicionar corações
loaderHeart.load('/models/heart.glb', function (gltf) {
    for (let i = 0; i < 700; i++) {
        const heart = gltf.scene.clone();

        heart.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100
        );

        heart.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        const scale = Math.random() * 0.5 + 0.5;
        heart.scale.set(scale, scale, scale);

        // Aplicar o material único para cada coração
        heart.traverse(function (node) {
            if (node.isMesh) {
                node.material = heartMaterial;
            }
        });

        scene.add(heart);
    }

    render();
}, undefined, function (error) {
    console.error(error);
});

const animatedHeartsGroup = new THREE.Group();


// Carregar e adicionar corações animados
loaderHeart.load('/models/heart.glb', function (gltf) {
  for (let i = 0; i < 40; i++) {
      const hearta = gltf.scene.clone();

      hearta.position.set(
          (Math.random() - 0.5) * 150 +15 , // Posicionamento mais próximo do texto
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20
      );

      hearta.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
      );

      const scale = Math.random() * 4.5 + 0.2; // Tamanhos menores
      hearta.scale.set(scale, scale, scale);

      hearta.traverse(function (node) {
          if (node.isMesh) {
              node.material = heartMaterial;
          }
      });

      // Adiciona animação
      hearta.userData = {
          rotationSpeed: new THREE.Vector3(
              (Math.random() - 0.5) * 0.7, 
              (Math.random() - 0.5) * 0.7, 
              (Math.random() - 0.5) * 0.7
          )
      };

      animatedHeartsGroup.add(hearta);
  }

  scene.add(animatedHeartsGroup);
  render();
}, undefined, function (error) {
  console.error(error);
});


// Função de animação
function animate() {
  requestAnimationFrame(animate);

  // Aplicando a animação aos corações animados
  animatedHeartsGroup.children.forEach(hearta => {
      hearta.rotation.x += hearta.userData.rotationSpeed.x;
      hearta.rotation.y += hearta.userData.rotationSpeed.y;
      hearta.rotation.z += hearta.userData.rotationSpeed.z;
  });

  renderer.render(scene, camera);
  controls.update();

}

// Iniciar a animação
animate();
