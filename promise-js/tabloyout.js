document.addEventListener("DOMContentLoaded", function() {
  const tabs = document.querySelectorAll(".kittle-tab");
  const contents = document.querySelectorAll(".kittle-tab-content");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      const transitionType = document.documentElement.style.getPropertyValue('--kittle-tab-transition') || "fade";

      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => {
        c.classList.remove("active", "fade", "slide", "scale");
        c.style.opacity = "0"; 
      });

      tab.classList.add("active");
      contents[index].classList.add("active", transitionType);
      setTimeout(() => {
        contents[index].style.opacity = "1";
      }, 50);
    });
  });
});