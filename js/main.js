(() => {
  // Получение всех элементов на странице
  function getHTMLElement() {
    const tHead = Array.from(document.querySelectorAll('.table_head td')).slice(0, 4);
    const sch = document.querySelector('.search_form');
    const addBtn = document.getElementById('add-btn');
    const tBody = document.getElementById('t-body');
    return {tHead, sch, addBtn, tBody};
  }



  document.addEventListener("DOMContentLoaded", () => {
    // createModalConfirm();

  });
})();