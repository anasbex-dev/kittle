// Kittle Core - Registrasi Komponen
class Kittle {
  static define(name, component) {
    customElements.define(name, component);
  }
}

export default Kittle;
// == COMPONENTS ==

import "./components/button.js";
import "./components/@components/navbar.js";
import "./components/switch.js";