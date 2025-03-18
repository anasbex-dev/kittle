// ***** AnasBex/Anazu copyright 2025 *****
// === DO NOT EDIT THIS SECTION IT HIGHLY AFFECTS KITTLE HTML ATTRIBUTES! ===

// Kittle Core
class Kittle {
  static define(name, component) {
    customElements.define(name, component);
  }
}

export default Kittle;

// == COMPONENTS ==
const components = [
  "kittle-switchv1",
  "kittle-img",
  "kittle-textview",
  "kittle-table",
  "kittle-p",
  "kittle-radiobutton",
  "kittle-cardsocial",
  "kittle-textarea",
  "kittle-iframe",
  "kittle-floatingwindow",
  "kittle-content",
  "kittle-footer",
  "kittle-tooltip",
  "kittle-angker",
  "kittle-navbaremo",
  "kittle-input",
  "kittle-animation",
  "kittle-shimmer",
  "kittle-loading",
  "kittle-switch",
  "kittle-alert",
  "kittle-dropdown",
  "kittle-navbar",
  "kittle-card",
  "kittle-button",
  "kittle-grid",
  "kittle-overscroll",
  "kittle-bottomnavigation",
  "kittle-menubottom",
  "kittle-badge",
  "kittle-modal",
  "kittle-togglemenu",
  "kittle-accordions",
];

// == MODULES ==
const modules = [
  "kittle.anim.js",
  "style.config",
  "kittle-guard",
  "kittle-layout",
  "kittle-2dcanvas",
  "kittle-3d",
];

// Fungsi untuk mengimpor komponen secara dinamis
async function loadComponents() {
  const promises = components.map(component => 
    import(`./components/js/${component}.js`)
  );
  await Promise.all(promises);
  console.log("✅ Semua komponen Kittle berhasil dimuat!");
}

// Fungsi untuk mengimpor modul secara dinamis
async function loadModules() {
  const promises = modules.map(module => 
    import(`./module/js/${module}.js`)
  );
  await Promise.all(promises);
  console.log("✅ Semua modul Kittle berhasil dimuat!");
}

// Mulai memuat semua komponen dan modul
(async () => {
  await Promise.all([loadComponents(), loadModules()]);
})();