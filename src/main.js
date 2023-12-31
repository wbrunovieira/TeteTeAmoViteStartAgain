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

    const textGeometry2 = new TextGeometry('Ass. teu pai', {
      font: font,
      size: 1,
      height: 2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 5
  });

    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    scene.add(light);
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial);
    textMesh.position.set(-30, 0, 0);
    textMesh2.position.set(-30, -30, 0);
    scene.add(textMesh, textMesh2);
});

// Material único para todos os corações
const heartMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4 });

// Carregar e adicionar corações
loaderHeart.load('/models/heart.glb', function (gltf) {
    for (let i = 0; i < 200; i++) {
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
          (Math.random() - 0.5) * 40
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
              (Math.random() - 0.5) * 0.1, 
              (Math.random() - 0.5) * 0.1, 
              (Math.random() - 0.5) * 0.1
          )
      };

      animatedHeartsGroup.add(hearta);
  }

  scene.add(animatedHeartsGroup);
  render();
}, undefined, function (error) {
  console.error(error);
});

//foto 1

// Carregador de texturas
const textureLoader = new THREE.TextureLoader();

// Carregar a imagem de fundo
const backgroundImage = textureLoader.load('/img/tete-na-foz.jpeg', function (texture) {
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

//foto 2

// Carregador de texturas
const textureLoader2 = new THREE.TextureLoader();

// Carregar a imagem de fundo
const backgroundImage2 = textureLoader2.load('/img/tete-na-praia.jpeg', function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
});

// Criar a geometria do plano
const planeGeometry2 = new THREE.PlaneGeometry(30, 15); // Ajuste o tamanho conforme necessário

// Criar o material com a textura
const planeMaterial2 = new THREE.MeshBasicMaterial({ map: backgroundImage2, side: THREE.DoubleSide });

// Criar o plano e adicionar à cena
const plane2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
plane2.position.set(10, 20, 20); // Ajuste a posição conforme necessário
plane2.rotation.y = Math.PI / 4; // Rotacionar para criar efeito de perspectiva
scene.add(plane2);

// criar particulas

const particleGeometry = new THREE.BufferGeometry();
const particlesCount = 1500; // Ajuste o número de partículas
const posArray = new Float32Array(particlesCount * 3); // x, y, z para cada partícula

for (let i = 0; i < particlesCount * 3; i++) {
    // Valores aleatórios para as posições das partículas
    posArray[i] = (Math.random() - 0.5) * 200;
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particleMaterial = new THREE.PointsMaterial({
  size: 0.1,
  color: 0xffffff
});
const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleMesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xff0000, 2, 100);
pointLight1.position.set(50, 50, 50);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x0000ff, 2, 100);
pointLight2.position.set(-50, -50, -50);
scene.add(pointLight2);



let floatTime = 0
// Função de animação
function animate() {

 
  requestAnimationFrame(animate);
  
  floatTime += 0.1;
  // Aplicando a animação aos corações animados
  animatedHeartsGroup.children.forEach(hearta => {
      hearta.rotation.x += hearta.userData.rotationSpeed.x;
      hearta.rotation.y += hearta.userData.rotationSpeed.y;
      hearta.rotation.z += hearta.userData.rotationSpeed.z;
  });

  // Animação de flutuação para a imagem
  plane.position.y = 5 + Math.sin(floatTime) * 0.15; // Ajuste os valores conforme necessário
  plane.rotation.z = Math.sin(floatTime) * 0.15; // Ajuste para adicionar rotação

  particleMesh.rotation.y += 0.001;

  renderer.render(scene, camera);
  controls.update();

}

// Iniciar a animação
animate();
