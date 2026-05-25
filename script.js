window.addEventListener("scroll", function(){

  const header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 50);

});

console.log("AG-AIDBRIDGE GLOBAL LTD WEBSITE READY");
