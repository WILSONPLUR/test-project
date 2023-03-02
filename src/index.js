// @ts-nocheck
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const light = new THREE.DirectionalLight(0x404040, 0.5);
const material = new THREE.MeshBasicMaterial({ color: "#BBBBBB" });
scene.background = new THREE.Color("#ccc");

scene.add(light);
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// camera.position.z = 10;
// camera.position.x = 2;

const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;
// controls.maxPolarAngle = Math.PI / 2;

camera.position.set(2, 2, 2);
controls.target.set(0, 0, 0);

document.getElementById("select").addEventListener("change", (e) => {
  document.getElementById("select").value = e.target.value;
  console.log(document.getElementById("select").value);
});

let inputVal;

document.getElementById("scale").addEventListener("input", (e) => {
  inputVal = e.target.value;
});

function createObject() {
  if (document.getElementById("select").value === "cube") {
    const geometry = new THREE.BoxGeometry(inputVal, inputVal, inputVal);
    const cube = new THREE.Mesh(geometry, material);
    const randomXPos = Math.floor(Math.random() * 6);
    const randomYPos = Math.floor(Math.random() * 4);
    scene.add(cube);
    cube.position.setX(randomXPos);
    cube.position.setY(randomYPos);
    //     document.querySelector(".geometries-list").innerHTML =
    //       scene.children.map((obj) => {
    //         return `
    // <div class='list-item'>
    // <span>${obj.uuid}</span>
    // <button onclick=${scene.remove(obj)}>X</button>
    // </div>
    // `;
    //       });
  } else if (document.getElementById("select").value === "sphere") {
    var mesh = new THREE.Mesh(new THREE.SphereGeometry(inputVal), material);
    //const sphere = new THREE.Mesh(geometry, material)
    const randomXPos = Math.floor(Math.random() * 6);
    const randomYPos = Math.floor(Math.random() * 2);
    const randomZPos = Math.floor(Math.random() * 2);
    scene.add(mesh);
    mesh.position.set(randomXPos + 1, randomYPos, randomZPos);
    //     document.querySelector(".geometries-list").innerHTML =
    //       scene.children.map((obj) => {
    //         return `
    // <div class='list-item'>
    // <span>${obj.uuid}</span>
    // <button onclick=${scene.remove(obj)}>X</button>
    // </div>
    // `;
    //       });
  } else if (document.getElementById("select").value === "circle") {
    const object = new THREE.Mesh(
      new THREE.RingGeometry(10, 50, 20, 5, 0, Math.PI * 2),
      material
    );
    scene.add(object);
  }

  controls.addEventListener("change", () => {
    renderer.render(scene, camera);
  });
  controls.update();
}

document.getElementById("btn").addEventListener("click", () => {
  createObject();
});

// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );

// camera.position.z = 5;

// const scale = document.getElementById("scale");
// const input = document.getElementById("scale");
// const list = document.querySelector(".geometries-list");
// const btn = document.getElementById("btn");
// const select = document.getElementById("select");
// let inputVal = null;

// const createObjectByParams = (obj) => {
//   const renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);
//   let geometryObj = null;
//   if (obj === "sphere") {
//     const geometry = new THREE.SphereGeometry(
//       inputVal,
//       inputVal,
//       inputVal
//     );
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const sphere = new THREE.Mesh(geometry, material);
//     geometryObj = sphere;
//   } else if (obj === "cube") {
//     const geometry = new THREE.BoxGeometry(inputVal, inputVal, inputVal);
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const cube = new THREE.Mesh(geometry, material);
//     geometryObj = cube;
//   }
//   scene.add(geometryObj);
//   list.innerHTML = scene.children.map((obj) => {
//     return `
//           <div class='list-item'>
//               <span>${obj.uuid}</span>
//               <button onclick=${scene.remove(obj)}>X</button>
//           </div>
//       `;
//   });
//   renderer.render(scene, camera);
//   console.log(geometryObj);
// };

// btn.addEventListener("click", () => {
//   createObjectByParams("cube");
// });

// input.addEventListener("input", (e) => {
//   inputVal = e.target.value;
// });

// //   select.addEventListener("change", (e) => {
// //     handleSelect(e.target.value);
// //   });
