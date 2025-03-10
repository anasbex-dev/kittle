document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".kittle-nav-item");
  const contents = document.querySelectorAll(".kittle-nav-content");

  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const transitionType = document.documentElement.style.getPropertyValue("--kittle-nav-transition") || "fade";

      navItems.forEach(i => i.classList.remove("active"));
      contents.forEach(c => {
        c.classList.remove("active", "fade", "slide-up", "scale");
        c.style.opacity = "0";
      });

      item.classList.add("active");
      contents[index].classList.add("active", transitionType);
      setTimeout(() => {
        contents[index].style.opacity = "1";
      }, 50);
    });
  });
});