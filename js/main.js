(() => {

  // Получение всех готовых элементов со страницы
  function getHTMLElement() {
    const tHead = Array.from(document.querySelectorAll('.table_head td')).slice(0, 4);
    const sch = document.querySelector('.search_form');
    const addBtn = document.getElementById('add-btn');
    const tBody = document.getElementById('t-body');
    return {tHead, sch, addBtn, tBody};
  }
  
  
  function parseFormData(form) {
    const data = new FormData(form);
    const person = {contacts: []};
    console.log(form);
    for (const pair of data.entries()) {
      person[pair[0]] = pair[1]
      console.log(pair[0], pair[1]);
    }
    console.log(person);
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    const html = getHTMLElement();
    const {createModalNewClient} = await import('./modal.js');
    
    html.addBtn.addEventListener('click',  (event) => {
      event.preventDefault();
      let modalForm = createModalNewClient();
      modalForm.btnMain.addEventListener('click', () => {
        parseFormData(modalForm.form);
      });
    });

  });
})();