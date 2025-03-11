// Kittle Core - Registrasi Komponen
class Kittle {
  static define(name, component) {
    customElements.define(name, component);
  }
}

export default Kittle;
// == COMPONENTS ==

import "./components/@components/kittle-navbar.js";
import "./components/@components/kittle-card.js";