export {createModalConfirm, createModalClient, removeModalVisible}

// Функция скрытия модального окна
function removeModalVisible(windowModal, modalBackGround) {
	windowModal.classList.remove('win-active');
	modalBackGround.classList.remove('modal-visible');
	document.body.style.overflow = 'inherit';
}

// Создание шаблона модального окна
function createModalWindowTemplate() {
	const winTemplate = document.createElement('div');
	const btnClose = document.createElement('img');
	const btnMain = document.createElement('button');
	const btnCancel = document.createElement('button');
	const title = document.createElement('h3');
	const bgM = document.getElementById('bgModal');

	btnClose.src = 'img/close.svg';
	btnCancel.textContent = 'Отмена';
	title.classList.add('modal-title');
	btnClose.classList.add('modal-btnClose');
	btnMain.classList.add('btn');
	btnCancel.classList.add('modal-btnCancel');
	bgM.classList.add('modal-visible');
	winTemplate.classList.add('win-active', 'modal-window');
	
	winTemplate.append(title, btnClose, btnMain, btnCancel);
	bgM.textContent = '';
	bgM.append(winTemplate);
	
	document.body.style.overflow = 'hidden';
	
	function funRMV(event) {
		event.preventDefault();
		if (event.target === this) {
			let temp = document.querySelector('.marked_for_delete');
			if (temp) temp.classList.remove('marked_for_delete');
			removeModalVisible(winTemplate, bgM);
		}
	}
	
	btnCancel.addEventListener('click', funRMV);
	btnClose.addEventListener('click', funRMV);
	bgM.addEventListener('click', funRMV);
	return {winTemplate, title, btnMain, btnCancel, bgM};
}

// Создание модального окна подтверждения удаления
function createModalConfirm() {
	const descr = document.createElement('p');
	const templateModal = createModalWindowTemplate();
	
	descr.classList.add('modal-descr');
	descr.textContent = 'Вы действительно хотите удалить данного клиента';
	templateModal.winTemplate.classList.add('win-confirm');
	templateModal.title.textContent = 'Удалить клиента';
	templateModal.btnMain.textContent = 'Удалить';
	
	templateModal.title.after(descr);
	
	return {
		btn: templateModal.btnMain,
		window: templateModal.winTemplate,
		bgM: templateModal.bgM
	}
}

// Изменение цвета текста в поле ввода
function makeTextBlack(item) {
	item.addEventListener('input', () => {
		item.classList.add('black');
		if (!item.value) item.classList.remove('black');
	});
}

//Функция набора номера согласно маске
function createTelephoneMask(event) {
	const inputElement = event.target;
	const value = inputElement.value.replace(/\D/g, '');
	if (value.length === 0) {
		inputElement.value = '';
	} else if (value.length <= 2) {
		inputElement.value = `+7 (${value}`;
	} else if (2 < value.length && value.length <= 4) {
		inputElement.value = `+${value.slice(0, 1)} (${value.slice(1)}`;
	} else if (4 < value.length && value.length <= 7) {
		inputElement.value = `+${value.slice(0, 1)} (${value.slice(1, 4)}) ${value.slice(4)}`;
	} else if (7 < value.length && value.length <= 9) {
		inputElement.value = `+${value.slice(0, 1)} (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7)}`;
	} else {
		inputElement.value = `+${value.slice(0, 1)} (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`;
	}
}

// Функция связи элемента выбора и поля ввода. Добавление базовой валидации поля ввода
function addMaskPairInput(groupElem) {
	const selectElem = groupElem.querySelector('select');
	const inputElem = groupElem.querySelector('input');
	
	inputElem.disabled = true;
	
	selectElem.addEventListener('change', () => {
		const selectedOption = selectElem.value;
		if (['phone', 'mobile'].includes(selectedOption)) {
			inputElem.type = 'tel';
			inputElem.disabled = false;
			inputElem.title = 'Телефон должен быть в 10-ти значном формате';
			inputElem.removeAttribute('pattern');
			inputElem.addEventListener('input', createTelephoneMask);
		} else if (selectedOption === 'email') {
			inputElem.removeEventListener('input', createTelephoneMask);
			inputElem.disabled = false;
			inputElem.type = 'email';
			inputElem.removeAttribute('title');
			inputElem.removeAttribute('pattern');
		} else if (selectedOption === 'vk') {
			inputElem.removeEventListener('input', createTelephoneMask);
			inputElem.disabled = false;
			inputElem.pattern = '^(vk\.com)\/[a-z0-9]+';
			inputElem.title = 'Должно быть в формате vk.com/XXXXXX'
		} else if (selectedOption === 'tg') {
			inputElem.removeEventListener('input', createTelephoneMask);
			inputElem.disabled = false;
			inputElem.pattern = '^(t\.me)\/[a-z0-9]+';
			inputElem.title = 'Должно быть в формате t.me/XXXXXX'
		}
	});
}

// Функция закрытия ненужного типа контакта
function addEventCloseContact(groupElement, btnAddGE) {
	const button = groupElement.querySelector('button');

	button.addEventListener('click', () => {
		const wrapper = groupElement.parentNode;
		let count = wrapper.getElementsByClassName('group-input').length;
		console.log('wrapper=', wrapper);
		console.log('count=', count);
		groupElement.classList.remove('margin-0');
		if (count > 9) {
			wrapper.children[9].classList.remove('margin-0');
			wrapper.append(btnAddGE);
		}
		if (count === 1) {
			groupElement.replaceWith(btnAddGE);
			wrapper.classList.remove('padding-divWrapper');
		} else groupElement.remove();

	})
}

// Создание секции добавления контактов
function createContactData(client) {
	const divWrapper = document.createElement('div');
	const addButtonContact = document.createElement('button');
	const plusImg = document.createElement('img');
	const inputGroupWrapper = document.createElement('div');
	const choices = document.createElement('select');
	const inputContact = document.createElement('input');
	const btnCloseContact = document.createElement('button');
	
	const listContact = [
		["Тип контакта", ''], ['Телефон', 'phone'], ['Мобильный', 'mobile'],
		['E-почта', 'email'], ['ВКонтакте', 'vk'], ['Телеграм', 'tg']];
	for (let val of listContact) {
		let option = document.createElement('option');
		option.value = val[1];
		option.textContent = val[0];
		choices.append(option);
	}
	// btnCloseContact.innerHTML = '<img src="../img/cancel.svg"/>';
	btnCloseContact.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
		'<path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="currentColor"/>\n' +
		'</svg>';
	choices.name = 'type';
	inputContact.name = 'value'
	plusImg.src = 'img/add_circle_outline.svg';
	addButtonContact.textContent = 'Добавить контакт';
	inputContact.placeholder = 'Введите данные контакта';

	addButtonContact.prepend(plusImg);
	inputGroupWrapper.append(choices, inputContact, btnCloseContact);
	if (!client || client.contacts.length < 10) divWrapper.append(addButtonContact);
	
	choices.className = 'choice-input-contact'
	inputContact.classList.add('input-contact');
	divWrapper.className = 'section_add_contact';
	addButtonContact.className = 'btn_add_contact';
	addButtonContact.type = 'button';
	inputGroupWrapper.className = 'group-input';
	btnCloseContact.className = 'btn_close_contact';
	btnCloseContact.type = 'button';

	if (client) {
		let fragment = new DocumentFragment();
		for (let contact of client.contacts) {
			let copyIGW = inputGroupWrapper.cloneNode(true);
			let option = Array.from(copyIGW.children[0].children).find((el) => el.value ? el.value === contact.type : false);
			addMaskPairInput(copyIGW);
			option.setAttribute('selected', 'true');
			copyIGW.children[1].disabled = false;
			copyIGW.children[1].value = contact.value;
			copyIGW.children[1].classList.add('black');
			fragment.append(copyIGW);
			addEventCloseContact(copyIGW, addButtonContact);
		}
		if (client.contacts >= 1) divWrapper.classList.add('padding-divWrapper');
		divWrapper.prepend(fragment);
		if (client.contacts.length === 10) divWrapper.children[9].classList.add('margin-0');
	}
	
	addButtonContact.addEventListener('click', (event) => {
		event.preventDefault();
		divWrapper.classList.add('padding-divWrapper');
		let collection = divWrapper.getElementsByClassName('group-input');
		if (collection && collection.length < 9) {
			let copyIGW = inputGroupWrapper.cloneNode(true);
			makeTextBlack(copyIGW.children[1]);
			addMaskPairInput(copyIGW);
			addEventCloseContact(copyIGW, addButtonContact);
			addButtonContact.before(copyIGW);
		} else {
			makeTextBlack(inputGroupWrapper.children[1]);
			addButtonContact.before(inputGroupWrapper);
			inputGroupWrapper.classList.add('margin-0');
			addMaskPairInput(inputGroupWrapper);
			addEventCloseContact(inputGroupWrapper, addButtonContact);
			addButtonContact.remove();
		}
	});
	return {divWrapper};
}

// вывод ошибок с сервера
function displayListErrors(response, mainBtn) {
	let divErrors = document.createElement('div');
	divErrors.style.color = 'red';
	divErrors.className = 'server_errors';
	let oldMess = document.querySelector('.server_errors');
	if (oldMess) oldMess.remove();
	let data = '';
	console.log('result.errors', response.errors.errors);
	for (let err of response.errors.errors) {
		data += '\n' + err.message;
	}
	divErrors.innerText = data;
	mainBtn.before(divErrors);
}

// Создание модального окна нового клиента
function createModalClient(dataClient) {
	const modal = createModalWindowTemplate();
	const sectionContact = createContactData(dataClient);
	const form = document.createElement('form');
	const btnWaiting = document.createElement('img');
	const clientID = document.createElement('span');
	const username = [
		{type: 'surname', val: 'Фамилия*'},
		{type: 'name', val: 'Имя*'},
		{type: 'lastName', val: 'Отчество'}
	];
	for (let obj of username) {
		let label = document.createElement('label');
		let input = document.createElement('input');
		input.placeholder = obj.val;
		input.id = obj.type;
		input.name = obj.type;
		if (dataClient) {
			input.value = dataClient[obj.type] ? dataClient[obj.type] : '';
			label.textContent = obj.val;
			input.classList.add('black');
		}
		label.htmlFor = obj.type;
		input.classList.add('input-form');
		if (dataClient) label.className = 'label-input';
		clientID.className = 'client_id';
		form.className = 'form';
		form.append(label, input);
		makeTextBlack(input);
	}
	if (dataClient) clientID.textContent = 'ID:' + dataClient.id;
	btnWaiting.src = 'img/waiting_sm.svg';
	btnWaiting.className = 'await-animation';

	modal.winTemplate.classList.add('modal-client');
	modal.title.classList.add('title-client');
	if (dataClient) modal.title.classList.add('flex-start');
	modal.btnMain.textContent = 'Сохранить';
	modal.title.textContent = dataClient ? 'Изменить данные ' : 'Новый клиент';
	form.append(sectionContact.divWrapper, modal.btnMain);
	modal.title.append(clientID);
	modal.title.after(form);

	modal.btnMain.addEventListener('click', async (event) => {
		event.preventDefault();
		modal.btnMain.prepend(btnWaiting);
		const {parseFormData} = await import('./core.js');
		let id = dataClient ? dataClient.id : null;
		// console.log('form=', form)
		let result = await parseFormData(form, id);
		if (result.ok) {
			btnWaiting.remove();
			removeModalVisible(modal.winTemplate, modal.bgM);
		} else {
			displayListErrors(result, modal.btnMain);
			btnWaiting.remove();
		}
	});
}
