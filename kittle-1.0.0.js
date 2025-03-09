function loadScript(src) {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(src + " loaded");
        script.onerror = () => reject(src + " failed to load");
        document.head.appendChild(script);
    });
}

// Memuat semua file JS satu per satu
Promise.all([
    loadScript("kittle.config.js"),
    loadScript("promise-js/toggle.js")
]).then(messages => {
    console.log("Semua script berhasil dimuat:");
    console.log(messages);
}).catch(error => {
    //console.error("Error memuat script:", error);
});


document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".kittle-navbar");
  const toggleBtn = document.querySelector(".navbar-toggle");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      navbar.classList.toggle("open");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const accordionItems = document.querySelectorAll(".kittle-accordion-item");

  accordionItems.forEach((item) => {
    const title = item.querySelector(".kittle-accordion-title");

    title.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Tutup semua yang lain dulu (Auto-Close)
      accordionItems.forEach((el) => el.classList.remove("active"));

      // Jika sebelumnya tidak aktif, aktifkan
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});

function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}


function updateCircularProgress(element, percent) {
  let circle = element.querySelector(".bar");
  let text = element.querySelector("span");
  
  let radius = circle.getAttribute("r");
  let circumference = 2 * Math.PI * radius;
  let offset = circumference * (1 - percent / 100);
  
  circle.style.strokeDashoffset = offset;
  text.innerText = percent + "%";
}

// Contoh penggunaan:
let circleProgress = document.querySelector(".kittle-progress-circle");
setTimeout(() => {
  updateCircularProgress(circleProgress, 90);
}, 1000);