class Kittle3D extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Load Three.js (CDN)
    this.loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", () => {
      this.loadScript("https://cdn.jsdelivr.net/npm/three@0.128/examples/js/loaders/OBJLoader.js", () => {
        this.init();
      });
    });

    // Create Canvas Container
    this.container = document.createElement("div");
    this.container.style.width = "100%";
    this.container.style.height = "100%";
    this.shadowRoot.appendChild(this.container);
  }

  loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }

  init() {
    // Konfigurasi Scene, Kamera, Renderer
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.clientWidth / this.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.clientWidth, this.clientHeight);
    this.container.appendChild(this.renderer.domElement);

    // Light & Shadow
    this.addLighting();

    // Load Model 3D
    this.modelUrl = this.getAttribute("src");
    if (this.modelUrl) {
      this.loadModel(this.modelUrl);
    }

    // Responsive Resize
    window.addEventListener("resize", () => this.onResize());

    // Start Rendering
    this.animate();
  }

  addLighting() {
    const light = new THREE.AmbientLight(0xffffff, 1); // Cahaya utama
    this.scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
  }

  loadModel(url) {
    const loader = new THREE.OBJLoader();
    loader.load(
      url,
      (object) => {
        this.scene.add(object);
      },
      (xhr) => console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`),
      (error) => console.error("Error loading model:", error)
    );
  }

  onResize() {
    this.camera.aspect = this.clientWidth / this.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.clientWidth, this.clientHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}

customElements.define("kittle-3d", Kittle3D);