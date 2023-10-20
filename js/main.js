(() => {
  
  // Получение всех готовых элементов со страницы
  function getHTMLElement() {
    const tHead = Array.from(document.querySelectorAll('.filter'));
    const sch = document.querySelector('.search_form');
    const addBtn = document.getElementById('add-btn');
    return {tHead, sch, addBtn};
  }
  
  function addEventSortTableHead(listTableHead) {
    for (let colum of listTableHead) {
      const arrow = document.createElement('img');
      const route = document.createElement('span');
      route.style.cssText = 'color: #9873FF; font-size: 10px; font-weight: 600';
      route.style.color = '#9873FF';
      
      colum.append(arrow);
      if (colum.classList.contains('table_username')) colum.append(route);
      
      colum.addEventListener('click', () => {
        arrow.src = arrow.src ? 'img/arrow_up.svg': 'img/arrow_dwn.svg';
        route.textContent = route.textContent ? 'Я-А': "А-Я";
      });
    }
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    const html = getHTMLElement();
    const {createBodyTable} = await import('./core.js');
    await createBodyTable(); // Формирование тела таблицы клиентов на основании списка
    
    addEventSortTableHead(html.tHead);
    
    // Обработка нажатия кнопки "Добавить клиента"
    html.addBtn.addEventListener('click',  async (event) => {
      event.preventDefault();
      const {createModalNewClient} = await import('./modal.js');
      createModalNewClient(); // Создание нового клиента в модальном окне
    });
  });
})();
