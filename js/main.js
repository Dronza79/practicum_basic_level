(() => {

  // Получение всех готовых элементов со страницы
  function getHTMLElement() {
    const tHead = Array.from(document.querySelectorAll('.table_head td')).slice(0, 4);
    const sch = document.querySelector('.search_form');
    const addBtn = document.getElementById('add-btn');
    const tBody = document.getElementById('t-body');
    return {tHead, sch, addBtn, tBody};
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const html = getHTMLElement();
    
    // Обработка нажатия кнопки "Добавить клиента"
    html.addBtn.addEventListener('click',  async (event) => {
      event.preventDefault();
      const {createModalNewClient} = await import('./modal.js');
      createModalNewClient(); // Создание нового клиента в модальном окне
      
      
    });

  });
})();