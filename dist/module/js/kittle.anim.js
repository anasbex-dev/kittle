class KittleAnim {
  constructor(target) {
    this.elements = typeof target === "string" ? document.querySelectorAll(target) : [target];
    this.animations = new Map();
  }

  _applyStyle(el, properties) {
    Object.entries(properties).forEach(([prop, value]) => {
      el.style[prop] = value;
    });
  }

  to(properties, duration = 1000, easing = "linear", delay = 0, onComplete = null) {
    this.elements.forEach(el => {
      el.style.transition = `all ${duration}ms ${easing} ${delay}ms`;
      this._applyStyle(el, properties);
      if (onComplete) setTimeout(() => onComplete(el), duration + delay);
    });
    return this;
  }

  from(properties, duration = 1000, easing = "linear", delay = 0) {
    this.elements.forEach(el => {
      Object.entries(properties).forEach(([prop, value]) => {
        el.style[prop] = value;
      });
      setTimeout(() => this.to(properties, duration, easing, delay), 10);
    });
    return this;
  }

  fromTo(fromProps, toProps, duration = 1000, easing = "linear", delay = 0) {
    return this.from(fromProps, 0).to(toProps, duration, easing, delay);
  }

  bezier(properties, duration = 1000, bezier = [0.25, 0.1, 0.25, 1], delay = 0) {
    this.elements.forEach(el => {
      el.style.transition = `all ${duration}ms cubic-bezier(${bezier.join(",")}) ${delay}ms`;
      this._applyStyle(el, properties);
    });
    return this;
  }

  spring(properties, stiffness = 100, damping = 10) {
    this.elements.forEach(el => {
      let velocity = 0;
      let targetValues = {};
      Object.entries(properties).forEach(([prop, value]) => {
        targetValues[prop] = parseFloat(value);
      });

      function animateSpring() {
        let stop = true;
        Object.entries(targetValues).forEach(([prop, target]) => {
          let current = parseFloat(getComputedStyle(el)[prop]) || 0;
          let force = (target - current) * (stiffness / 100);
          velocity += force;
          velocity *= 1 - damping / 100;
          el.style[prop] = current + velocity + "px";
          if (Math.abs(target - current) > 0.1 || Math.abs(velocity) > 0.1) stop = false;
        });

        if (!stop) requestAnimationFrame(animateSpring);
      }
      animateSpring();
    });
    return this;
  }

  path(pathString, duration = 2000, easing = "linear") {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathString);

    this.elements.forEach(el => {
      let length = path.getTotalLength();
      el.style.position = "absolute";

      let start = null;
      function animatePath(timestamp) {
        if (!start) start = timestamp;
        let progress = Math.min((timestamp - start) / duration, 1);
        let point = path.getPointAtLength(progress * length);
        el.style.transform = `translate(${point.x}px, ${point.y}px)`;
        
        if (progress < 1) requestAnimationFrame(animatePath);
      }
      requestAnimationFrame(animatePath);
    });
    return this;
  }

  sequence(animations) {
    let promise = Promise.resolve();
    animations.forEach(anim => {
      promise = promise.then(() => new Promise(resolve => {
        this.to(anim.properties, anim.duration, anim.easing, anim.delay, resolve);
      }));
    });
    return this;
  }

  loop(properties, duration = 1000, easing = "linear", delay = 0, repeat = 2) {
    let count = 0;
    const animate = () => {
      if (count < repeat) {
        this.to(properties, duration, easing, delay, () => {
          count++;
          animate();
        });
      }
    };
    animate();
    return this;
  }

  pause() {
    this.elements.forEach(el => {
      el.style.animationPlayState = "paused";
      el.style.transition = "none";
    });
    return this;
  }

  resume() {
    this.elements.forEach(el => {
      el.style.animationPlayState = "running";
    });
    return this;
  }
}

// ✅ Fix agar bisa dipanggil tanpa `new`
window.KittleAnim = function (target) {
  return new KittleAnim(target);
};