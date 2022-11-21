import { Controller } from "@hotwired/stimulus"
import * as THREE from "three";
// Connects to data-controller="threejs"

export default class extends Controller {
  	connect() {
		function addSphere() 
		{
			let geometry = new THREE.SphereGeometry( 1, 32, 16 );
			let material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
			let sphere = new THREE.Mesh( geometry, material );
			return sphere;
		}
		function basicRotation(Mesh ,x_value ,y_value)
		{
			Mesh.rotation.x += x_value;
			Mesh.rotation.y += y_value;
		}

		function onWindowResize() 
		{

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, window.innerHeight );

		}

		function animate() 
		{
			requestAnimationFrame( animate );
			basicRotation(sphere, 0.001, 0.001);
			basicRotation(sphere2, 0.001, 0.001);
			renderer.render( scene, camera );
		}

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );


		const sphere = addSphere();
		sphere.position.set(0, -1, -2);
		scene.add( sphere );

		const sphere2  = addSphere();
		sphere2.position.set(4, -1, 1);
		scene.add( sphere2 );
		


		camera.position.z = 10;
		camera.position.y = 0;
		camera.position.x = 0;

		window.addEventListener( 'resize', onWindowResize );
		animate();
}

}
