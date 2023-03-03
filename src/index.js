// @ts-nocheck
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const directionalLight = new THREE.DirectionalLight("#000", 0.5);
scene.add(directionalLight);
const material = new THREE.MeshBasicMaterial({ color: "#BBBBBB" });
scene.background = new THREE.Color("#ccc");

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

const controls = new OrbitControls(camera, renderer.domElement);

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

function createGeometry() {
  let geometry;
  let mesh;
  let randomXPos;
  let randomYPos;
  switch (document.getElementById("select").value) {
    case "cube":
      geometry = new THREE.BoxGeometry(inputVal, inputVal, inputVal);
      mesh = new THREE.Mesh(geometry, material);
      randomXPos = Math.floor(Math.random() * 6);
      randomYPos = Math.floor(Math.random() * 4);
      scene.add(mesh);
      mesh.position.setX(randomXPos);
      mesh.position.setY(randomYPos);
      break;

    case "sphere":
      geometry = new THREE.SphereGeometry(inputVal);
      mesh = new THREE.Mesh(geometry, material);
      randomXPos = Math.floor(Math.random() * 6);
      randomYPos = Math.floor(Math.random() * 4);
      scene.add(mesh);
      mesh.position.setX(randomXPos);
      mesh.position.setY(randomYPos);
      break;

    case "cone":
      geometry = new THREE.ConeGeometry(5, 20, 32);
      mesh = new THREE.Mesh(geometry, material);
      randomXPos = Math.floor(Math.random() * 6);
      randomYPos = Math.floor(Math.random() * 4);
      scene.add(mesh);
      break;
    default:
      alert("Choose geometry from select!");
  }

  document.querySelector(".geometries-list").textContent = "";
  scene.children.map((geometry) => {
    if (geometry.type === "Mesh") {
      const div = document.createElement("div");
      div.classList.add("list-item");
      const span = document.createElement("span");
      const spanText = document.createTextNode(geometry.uuid);
      span.appendChild(spanText);
      const btn = document.createElement("button");
      const btnText = document.createTextNode("X");
      btn.appendChild(btnText);
      btn.addEventListener("click", () => {
        if (scene.remove) {
          scene.remove(geometry);
          document.querySelector(".geometries-list").removeChild(div);
        }
        renderer.render(scene, camera);
      });
      div.append(span);
      div.append(btn);
      document.querySelector(".geometries-list").appendChild(div);
    }
  });

  controls.addEventListener("change", () => {
    renderer.render(scene, camera);
  });
  renderer.render(scene, camera);
  controls.update();
  console.log(scene.children);
}

document.getElementById("btn").addEventListener("click", () => {
  createGeometry();
});
