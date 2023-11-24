const INDEX_TRIGGER_SIZE = 110;
const wrap = document.querySelector(".table-wrap");
const head = wrap.querySelector(".table-heading");

wrap.addEventListener("scroll", () => {
  if (head.offsetTop > INDEX_TRIGGER_SIZE) {
    head.style.zIndex = "3";
  } else {
    head.style = "";
  }
});
