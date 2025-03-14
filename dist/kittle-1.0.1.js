// === LOCAL ACCESS ===
import "./kittle.config.js";

// === Jsdelivr ACCESS ===
class Kittle {
  static define(name, component) {
    customElements.define(name, component);
  }
}

export default Kittle;

(async function loadKittleModules() {
  try {
    // Ambil daftar file dari JSON
    const response = await fetch("https://cdn.jsdelivr.net/gh/anasbex-dev/kittle@latest/dist/kittle-manifest.json");
    const data = await response.json();

    // Loop setiap folder dan file untuk membentuk URL lengkap
    data.folders.forEach(folder => {
      data.files.forEach(file => {
        const scriptUrl = `${data.basePath}${folder}${file}`;
        const scriptElement = document.createElement("script");
        scriptElement.src = scriptUrl;
        scriptElement.type = "module"; // Untuk mendukung ES Module
        document.head.appendChild(scriptElement);
      });
    });

    console.log("✅ Semua komponen Kittle berhasil dimuat!");
  } catch (error) {
    console.error("❌ Gagal memuat Kittle:", error);
  }
})();