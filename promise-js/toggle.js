document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.querySelector(".kittle-navbar");
  const toggleBtn = document.querySelector(".navbar-toggle");
  
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function() {
      navbar.classList.toggle("open");
    });
  }
});