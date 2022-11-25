import { Controller } from "@hotwired/stimulus"
import * as THREE from "three";
import { OrbitControls } from './OrbitControls'
// Connects to data-controller="threejs"

export default class extends Controller {
  	connect() {
		function addSphere(chosen_color) 
		{
			let geometry = new THREE.SphereGeometry( 1, 32, 16 );
			let material = new THREE.MeshLambertMaterial( { color: chosen_color, wireframe:true } );
			let sphere = new THREE.Mesh( geometry, material );
			//group.add(sphere);
			return sphere;
		}
		function addSun(chosen_color)
		{
			let geometry = new THREE.SphereGeometry( 1, 32, 16 );
			let material = new THREE.MeshLambertMaterial( { color: chosen_color, wireframe:true, emissive: "red", emissiveIntensity: "40" } );
			let sphere = new THREE.Mesh( geometry, material );
			return sphere;
		}
		function basicRotation(Mesh ,x_value ,y_value)
		{ 
			Mesh.rotation.x += x_value;
			Mesh.rotation.y += y_value;
		}
		function BasicMovement(Mesh, speed)
		{
			Mesh.position.x += speed;
		}
		function CircleMovement(Center, Mesh, speed, degree)
		{
			//0 = counter clockwise , 1 = clockwise
			let offset = speed*degree*1;
			 let length_x = (Math.abs(Center.position.x) + Math.abs(Mesh.position.x));
			 let length_y = (Math.abs(Center.position.y) + Math.abs(Mesh.position.y));
			 length = Math.sqrt(Math.pow(length_x,2) + Math.pow(length_y, 2));
			//console.log(length_x);
			//console.log(length_y);
			 Mesh.position.x = Math.cos(offset)*length;
			 Mesh.position.y = Math.sin(offset)*length;
			return degree
		}
		function onWindowResize() 
		{

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, window.innerHeight );

		}
		function CameraUpdate()
		{
			console.log("camera x pos:" + camera.position.x);
			console.log("camera y pos:" + camera.position.y);
			console.log("camera z pos:" + camera.position.z);
		}
		function CreateGrid()
		{
			let points = [];
			let points1 = [];
			for (let i = -25 ; i <=25 ; i++)
			{
			points.push( new THREE.Vector3( i, -50, -2 ) );
			points.push( new THREE.Vector3( i, 50, -2 ) );
			//console.log(i);
			let geometry = new THREE.BufferGeometry().setFromPoints( points );
			let Dashmaterial = new THREE.LineDashedMaterial( 
			{
				color: 0x2a0c42,
				linewidth: 1,
				scale: 2,
				dashSize: 1,
				gapSize: 0.1,
			}
			);
			let line = new THREE.Line(geometry, Dashmaterial );
			line.computeLineDistances();
			scene.add( line );
			points = [];
			}
			for (let j = -25 ; j <=25 ; j++)
			{
			points1.push( new THREE.Vector3( -50, j, -2 ) );
			points1.push( new THREE.Vector3( 50, j, -2 ) );
			let geometry1 = new THREE.BufferGeometry().setFromPoints( points1 );
			let Dashmaterial1 = new THREE.LineDashedMaterial( 
			{
				color: 0x2a0c42,
				linewidth: 1,
				scale: 2,
				dashSize: 1,
				gapSize: 0.1,
			}
			)
			let line1 = new THREE.Line(geometry1, Dashmaterial1 );
			line1.computeLineDistances();
			scene.add( line1 );
			points1 = [];
			}

		}
		function animate() 
		{

			requestAnimationFrame( animate );
			basicRotation(sphere, 0.001, 0.001);
			basicRotation(sphere2, 0.001, 0.001);
			//BasicMovement(sphere2, 0.01);
			controls.update();
			renderer.render( scene, camera );
			degree = CircleMovement(sphere, sphere2 , 1 , degree);
			degree = CircleMovement(sphere, sphere3 , 2 , degree);
			degree += 0.001;
		}
		var degree = 5;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );
		const group = new THREE.Group();
		const controls = new OrbitControls( camera, renderer.domElement );

		const sphere = addSun("#ff1100");
		sphere.position.set(0, 0, -2);
		scene.add( sphere );


		const sphere2  = addSphere("green");
		sphere2.position.set(4, 0, -2);
		scene.add( sphere2 );

		const sphere3 = addSphere("yellow");
		sphere3.position.set(7, 0, -2);
		scene.add ( sphere3 );

		camera.position.z = 10;
		camera.position.y = 0;
		camera.position.x = 0;
		controls.update();
		window.addEventListener( 'resize', onWindowResize );
		window.addEventListener('click', CameraUpdate );
		window.addEventListener('wheel', CameraUpdate );
		CreateGrid();
		animate();
}

}
