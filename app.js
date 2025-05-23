// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create nodes (people) and connections (relationships)
const nodes = [];
const connections = [];

// Create sample data
const people = [
    { name: "Alice", color: 0xff0000 },
    { name: "Bob", color: 0x00ff00 },
    { name: "Charlie", color: 0x0000ff }
];

// Create nodes
people.forEach((person, i) => {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: person.color });
    const sphere = new THREE.Mesh(geometry, material);
    
    // Position in a circle
    const angle = (i / people.length) * Math.PI * 2;
    sphere.position.x = Math.cos(angle) * 5;
    sphere.position.z = Math.sin(angle) * 5;
    
    scene.add(sphere);
    nodes.push(sphere);
});

// Create connections
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const lineGeometry = new THREE.BufferGeometry();

// Connect all nodes to each other for demo
for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
        const points = [];
        points.push(nodes[i].position);
        points.push(nodes[j].position);
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        scene.add(line);
        connections.push(line);
    }
}

// Position camera
camera.position.y = 5;
camera.position.z = 10;
camera.lookAt(0, 0, 0);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate nodes slightly
    nodes.forEach(node => {
        node.rotation.x += 0.01;
        node.rotation.y += 0.01;
    });
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();