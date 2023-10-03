(() => {

  function getHTMLElement() {
    const tHead = Array.from(document.querySelectorAll('.table_head td')).slice(0, 4);
    const sch = document.querySelector('.search_form');
    const addBtn = document.getElementById('add-btn');
    const tBody = document.getElementById('t-body');
	  const bgM = document.createElement('div');
	  bgM.classList.add('bgModal');
	  document.body.append(bgM);
		return {bgM, tHead, sch, addBtn, tBody};
  }
	
	function removeModalVisible(windowModal, modalBackGround) {
		windowModal.classList.remove('win-active');
		modalBackGround.classList.remove('modal-visible');
		document.body.style.overflow = 'inherit';
	}
	
	function createModalWindowTemplate() {
		const winTemplate = document.createElement('div');
		const btnClose = document.createElement('button');
		const btnMain = document.createElement('button');
		const btnCancel = document.createElement('button');
		const title = document.createElement('h3');
		const img = document.createElement('img');
		const html = getHTMLElement();
		
		img.src = 'img/close.svg';
		btnCancel.textContent = 'Отмена';
		title.classList.add('modal-title');
		btnClose.classList.add('modal-btnClose');
		btnMain.classList.add('btn');
		btnCancel.classList.add('modal-btnCancel');
		
		btnClose.append(img);
		winTemplate.append(title, btnClose, btnMain, btnCancel);
		
		html.bgM.classList.add('modal-visible');
		html.bgM.append(winTemplate);
		winTemplate.classList.add('win-active');
		document.body.style.overflow = 'hidden';
		
		function funRMV() {
			removeModalVisible(winTemplate, html.bgM);
		}
		
		btnMain.addEventListener('click', funRMV);
		btnCancel.addEventListener('click', funRMV);
		btnClose.addEventListener('click', funRMV);
		window.addEventListener('click', (event) => {
			if (event.target === html.bgM) {
				funRMV();
			}
		});
		return {winTemplate, title, btnMain};
	}
	
	function createModalConfirm() {
    const descr = document.createElement('p');
		const templateModal = createModalWindowTemplate();
		
		templateModal.winTemplate.classList.add('win-confirm');
    descr.classList.add('modal-descr');
		
		templateModal.title.textContent = 'Удалить клиента';
    descr.textContent = 'Вы действительно хотите удалить данного клиента';
		templateModal.btnMain.textContent = 'Удалить';
		
		templateModal.title.after(descr);

    return {btnMain: templateModal.btnMain}
  }

  document.addEventListener("DOMContentLoaded", () => {
    createModalConfirm();

  });
})();