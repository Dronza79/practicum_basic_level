(() => {
	
	function getHTMLElement() {
		const bgM = document.createElement('button');
		bgM.classList.add('bgModal', 'modal-hidden');
		document.body.append(bgM);
		const tHead = Array.from(document.querySelectorAll('.table_head td')).slice(0, 4);
		const sch = document.querySelector('.search_form');
		const addBtn = document.getElementById('add-btn');
		const tBody = document.getElementById('t-body');
		return {bgM, tHead, sch, addBtn, tBody};
	}
	
	function createModalConfirm(html) {
		const win = document.createElement('div');
		const btnClose = document.createElement('button');
		const btnConfirm = document.createElement('button');
		const btnCancel = document.createElement('button');
		const title = document.createElement('h3');
		const descr = document.createElement('p');
		const img = document.createElement('img');
		
		win.classList.add('win-confirm');
		
		title.textContent = 'Удалить клиента';
		descr.textContent = 'Вы действительно хотите удалить данного клиента';
		btnConfirm.textContent = 'Удалить';
		btnCancel.textContent = 'Отмена';
		img.src = 'img/close.svg';
		
		btnClose.append(img);
		win.append(title, btnClose, descr, btnConfirm, btnCancel);
		
		html.bgM.append(win);
	}
	
	document.addEventListener("DOMContentLoaded", () => {
		const html = getHTMLElement();
		createModalConfirm(html);
	});
})();