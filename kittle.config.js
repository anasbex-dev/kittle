//***** AnasBex/Anazu copyright 2025 *****

// === DO NOT EDIT THIS SECTION IT HIGHLY AFFECTS KITTLE HTML ATTRIBUTES! ===

// Kittle Core
class Kittle {
  static define(name, component) {
    customElements.define(name, component);
  }
}

export default Kittle;

// == COMPONENTS ==
import "./components/@components/kittle-navbar.js";
import "./components/@components/kittle-card.js";
import "./components/@components/kittle-button.js";
import "./components/@components/kittle-grid.js";
import "./components/@components/kittle-overscroll.js";

// == MODULE ==
import "./module/@module/kittle-layout.js";