const artPieces = [
    { id: 1, title: "Minimalist Quotation", artist: "Virgil Abloh", emoji: "🔤", description: "Deconstructed typeface celebrating words and negative space. Signature Abloh quotation marks frame the void." },
    { id: 2, title: "Diagonal Disruption", artist: "Neo-Expressionist", emoji: "⚡", description: "Bold diagonal lines cut through structured grids. Symbolizes collision of order and chaos in urban spaces." },
    { id: 3, title: "Industrial Bloom", artist: "Keith Haring", emoji: "🌸", description: "Organic shapes dance with mechanical elements. Celebrates movement and vitality in contemporary design." },
    { id: 4, title: "Deconstructed Reality", artist: "KAWS", emoji: "👾", description: "Faces fragmenting into abstract geometric forms. Commentary on identity in the digital age." },
    { id: 5, title: "Urban Archaeology", artist: "NYC Street Collective", emoji: "🏙️", description: "Layered text and imagery creating depth. Love letter to artists who make cities sing." },
    { id: 6, title: "Luxury Contradiction", artist: "Off-White Philosophy", emoji: "💎", description: "Fine and crude aesthetics collide. Gold meets grit with ironic quotation marks." }
];

let scene, camera, renderer, models = [], currentModelIndex = 0, autoRotate = true;

function initThreeJS() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 4;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    createModels();
    animate();
}

function createModels() {
    const g1 = new THREE.BoxGeometry(1, 1.5, 0.2);
    const m1 = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xff6b35, shininess: 100 });
    const model1 = new THREE.Mesh(g1, m1);
    model1.castShadow = true;
    scene.add(model1);
    models.push({ mesh: model1, name: "Minimalist Quotation" });

    const g2 = new THREE.ConeGeometry(1, 2, 4);
    const m2 = new THREE.MeshPhongMaterial({ color: 0x00d9ff, emissive: 0x8338ec, shininess: 100 });
    const model2 = new THREE.Mesh(g2, m2);
    model2.castShadow = true;
    scene.add(model2);
    model2.visible = false;
    models.push({ mesh: model2, name: "Geometric Disruption" });

    const g3 = new THREE.IcosahedronGeometry(1, 4);
    const m3 = new THREE.MeshPhongMaterial({ color: 0xffbe0b, emissive: 0xff006e, shininess: 100 });
    const model3 = new THREE.Mesh(g3, m3);
    model3.castShadow = true;
    scene.add(model3);
    model3.visible = false;
    models.push({ mesh: model3, name: "Urban Bloom" });
}

function animate() {
    requestAnimationFrame(animate);
    if (autoRotate && models[currentModelIndex]) {
        models[currentModelIndex].mesh.rotation.x += 0.005;
        models[currentModelIndex].mesh.rotation.y += 0.01;
    }
    if (renderer) renderer.render(scene, camera);
}

function switchModel(index) {
    if (models[currentModelIndex]) models[currentModelIndex].mesh.visible = false;
    currentModelIndex = index % models.length;
    models[currentModelIndex].mesh.visible = true;
    updateModelInfo();
}

function updateModelInfo() {
    document.getElementById('model-title').textContent = models[currentModelIndex]?.name || 'Model';
    document.getElementById('model-description').textContent = artPieces[currentModelIndex]?.description || '';
}

function loadGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = '';
    artPieces.forEach(piece => {
        const div = document.createElement('div');
        div.className = 'art-piece';
        div.innerHTML = `
            <div class="art-piece-image">${piece.emoji}</div>
            <h3 class="art-piece-title">${piece.title}</h3>
            <p class="art-piece-artist">${piece.artist}</p>
            <p class="art-piece-description">${piece.description}</p>
        `;
        grid.appendChild(div);
    });
}

function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
            const section = document.getElementById(btn.dataset.section);
            if (section) section.classList.remove('hidden');
        });
    });
}

function setupModelControls() {
    document.getElementById('prev-model')?.addEventListener('click', () => switchModel(currentModelIndex - 1));
    document.getElementById('next-model')?.addEventListener('click', () => switchModel(currentModelIndex + 1));
    document.getElementById('rotate-toggle')?.addEventListener('click', function() { 
        autoRotate = !autoRotate; 
        this.textContent = autoRotate ? '⟲ Auto Rotate' : '⏸ Paused'; 
    });
}

function setupDonation() {
    document.querySelectorAll('.donate-btn').forEach(btn => {
        btn.addEventListener('click', () => alert(`Thank you for your $${btn.dataset.amount} donation! ❤️`));
    });
    document.getElementById('custom-donate-btn')?.addEventListener('click', () => {
        const amount = document.getElementById('custom-amount').value;
        if (amount && amount > 0) {
            alert(`Thank you for your $${amount} donation! ❤️`);
        } else {
            alert('Please enter a valid amount');
        }
    });
}

function init() {
    loadGallery();
    setupNavigation();
    setupModelControls();
    setupDonation();
    setTimeout(() => { 
        if (document.getElementById('canvas-container')) initThreeJS(); 
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
