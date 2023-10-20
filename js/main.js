(() => {
  
  // Получение всех готовых элементов со страницы
  function getHTMLElement() {
    const tHead = Array.from(document.querySelectorAll('.table_head td')).slice(0, 4);
    const sch = document.querySelector('.search_form');
    const addBtn = document.getElementById('add-btn');
    return {tHead, sch, addBtn};
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    const html = getHTMLElement();
    const {createBodyTable} = await import('./core.js');
    await createBodyTable(); // Формирование тела таблицы клиентов на основании списка
    
    // Обработка нажатия кнопки "Добавить клиента"
    html.addBtn.addEventListener('click',  async (event) => {
      event.preventDefault();
      const {createModalNewClient} = await import('./modal.js');
      createModalNewClient(); // Создание нового клиента в модальном окне
    });
  });
})();
