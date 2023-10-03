(() => {

  function getHTMLElement() {
    const tHead = Array.from(document.querySelectorAll('.table_head td')).slice(0, 4);
    const sch = document.querySelector('.search_form');
    const addBtn = document.getElementById('add-btn');
    const tBody = document.getElementById('t-body');
    return {tHead, sch, addBtn, tBody};
  }

	function createBgModal() {
		const bgM = document.createElement('div');
		bgM.classList.add('bgModal');
		document.body.append(bgM);

		window.addEventListener('click', (event) => {
			if (event.target === bgM) {
				bgM.classList.remove('modal-visible');
				bgM.innerHTML = '';
				bgM.remove();
			}
		});
		return {bgM};
	}

  function createModalConfirm() {
    const winConfirm = document.createElement('div');
    const btnClose = document.createElement('button');
    const btnConfirm = document.createElement('button');
    const btnCancel = document.createElement('button');
    const title = document.createElement('h3');
    const descr = document.createElement('p');
    const img = document.createElement('img');

    // win.classList.add('win-confirm', 'win-active');
    winConfirm.classList.add('win-confirm');
    title.classList.add('modal-title');
    btnClose.classList.add('modal-btnClose');
    btnConfirm.classList.add('modal-btnConfirm', 'btn');
    btnCancel.classList.add('modal-btnCancel');
    descr.classList.add('modal-descr');

    title.textContent = 'Удалить клиента';
    descr.textContent = 'Вы действительно хотите удалить данного клиента';
    btnConfirm.textContent = 'Удалить';
    btnCancel.textContent = 'Отмена';
    img.src = 'img/close.svg';

    btnClose.append(img);
    winConfirm.append(title, btnClose, descr, btnConfirm, btnCancel);

		const html = createBgModal();
    html.bgM.classList.add('modal-visible');
    html.bgM.append(winConfirm);
    document.body.style.overflow = 'hidden';

    function removeModalVisible() {
      html.bgM.classList.remove('modal-visible');
      html.bgM.innerHTML = '';
      html.bgM.remove();
      document.body.style.overflow = 'auto';
    }

    btnConfirm.addEventListener('click', removeModalVisible);
    btnCancel.addEventListener('click', removeModalVisible);
    btnClose.addEventListener('click', removeModalVisible);

    return {btnConfirm}
  }

  document.addEventListener("DOMContentLoaded", () => {
    const html = getHTMLElement();
    let conf = createModalConfirm();

		conf.btnConfirm.addEventListener('click', () => {
			console.log('сработало');
		})
  });
})();