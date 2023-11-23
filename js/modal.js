import {icons} from "./icons.js";

export {createModalConfirm, createModalClient, removeModalVisible, makeTextBlack}

// Функция скрытия модального окна
function removeModalVisible(windowModal, modalBackGround) {
	windowModal.classList.remove('win-active');
	modalBackGround.classList.remove('modal-visible');
	document.body.style.overflow = 'inherit';
}

// Создание шаблона модального окна
function createModalWindowTemplate() {
	const winTemplate = document.createElement('div');
	const btnClose = document.createElement('button');
	const btnMain = document.createElement('button');
	const btnCancel = document.createElement('button');
	const title = document.createElement('h3');
	const bgM = document.getElementById('bgModal');

	btnClose.innerHTML = icons.close;
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

	function closeModalWindow() {
		let temp = document.querySelector('.marked-for-delete');
		if (temp) temp.classList.remove('marked-for-delete');
		removeModalVisible(winTemplate, bgM);
		document.removeEventListener('keydown', handlerEscape);
		if (location.hash) {
			location.href = '';
		}
	}

	function handlerTarget(event) {
		// event.preventDefault();
		// console.log(event.target);
		if (event.target === this) closeModalWindow();
	}

	function handlerEscape(event) {
		// event.preventDefault();
		// console.log(event);
		if (event.key === 'Escape') closeModalWindow();
	}
	
	btnCancel.addEventListener('mousedown', handlerTarget);
	btnClose.addEventListener('click', () => closeModalWindow());
	bgM.addEventListener('mousedown', handlerTarget);
	document.addEventListener('keydown', handlerEscape);

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
		inputElement.value = `+7(${value}`;
	} else if (2 < value.length && value.length <= 4) {
		inputElement.value = `+${value.slice(0, 1)}(${value.slice(1)}`;
	} else if (4 < value.length && value.length <= 7) {
		inputElement.value = `+${value.slice(0, 1)}(${value.slice(1, 4)})${value.slice(4)}`;
	} else if (7 < value.length && value.length <= 9) {
		inputElement.value = `+${value.slice(0, 1)}(${value.slice(1, 4)})${value.slice(4, 7)}-${value.slice(7)}`;
	} else {
		inputElement.value = `+${value.slice(0, 1)}(${value.slice(1, 4)})${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`;
	}
}

// Функция маски вконтакте
function createVkMask(event) {
	const inputElement = event.target;
	const value = inputElement.value.replace(/^.+\/|[.,*+?^${}()]/g, '');
	if (value.length === 0) {
		inputElement.value = '';
	} else	inputElement.value = `vk.com/${value}`;
}

// Функция маски телеграм
function createTgMask(event) {
	const inputElement = event.target;
	const value = inputElement.value.replace(/^.+\/|[.,*+?^${}()]/g, '');
	if (value.length === 0) {
		inputElement.value = '';
	} else	inputElement.value = `t.me/${value}`;
}

// Функция связи элемента выбора и поля ввода. Добавление базовой валидации поля ввода
function addMaskPairInput(groupElem) {
	const selectElem = groupElem.querySelector('select');
	const inputElem = groupElem.querySelector('input');

	selectElem.addEventListener('change', () => {
		const selectedOption = selectElem.value;
		inputElem.disabled = false;
		if (['phone', 'mobile'].includes(selectedOption)) {
			inputElem.type = 'tel';
			inputElem.addEventListener('input', createTelephoneMask);
			inputElem.removeEventListener('input', createVkMask);
			inputElem.removeEventListener('input', createTgMask);
		} else if (selectedOption === 'email') {
			inputElem.removeEventListener('input', createTelephoneMask);
			inputElem.type = 'email';
			inputElem.removeEventListener('input', createVkMask);
			inputElem.removeEventListener('input', createTgMask);
		} else if (selectedOption === 'vk') {
			inputElem.removeEventListener('input', createTelephoneMask);
			inputElem.removeEventListener('input', createTgMask);
			inputElem.addEventListener('input', createVkMask);
			inputElem.removeAttribute('type');
		} else if (selectedOption === 'tg') {
			inputElem.removeEventListener('input', createTelephoneMask);
			inputElem.removeEventListener('input', createVkMask);
			inputElem.addEventListener('input', createTgMask);
			inputElem.removeAttribute('type');
		}
	});
}

// Функция закрытия ненужного типа контакта
function addEventCloseContact(groupElement, btnAddGE) {
	const button = groupElement.querySelector('button');

	button.addEventListener('click', () => {
		const wrapper = groupElement.parentNode;
		let count = wrapper.getElementsByClassName('group-input').length;
		// console.log('wrapper=', wrapper);
		// console.log('count=', count);
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
	btnCloseContact.innerHTML = icons.cancel;
	choices.name = 'type';
	inputContact.name = 'value'
	addButtonContact.innerHTML = icons.addContact;
	addButtonContact.append('Добавить контакт');
	inputContact.placeholder = 'Введите данные контакта';
	inputContact.disabled = true;

	inputGroupWrapper.append(choices, inputContact, btnCloseContact);
	if (!client || client.contacts.length < 10) divWrapper.append(addButtonContact);
	
	choices.className = 'choice-input-contact'
	inputContact.classList.add('input-contact');
	divWrapper.classList.add('section-add-contact');
	addButtonContact.className = 'btn-add-contact';
	addButtonContact.type = 'button';
	inputGroupWrapper.className = 'group-input';
	btnCloseContact.className = 'btn-close-contact';
	btnCloseContact.type = 'button';

	if (client) {
		let fragment = new DocumentFragment();
		if (client.contacts.length) divWrapper.classList.add('padding-divWrapper');
		for (let contact of client.contacts) {
			let copyIGW = inputGroupWrapper.cloneNode(true);
			let option = Array.from(copyIGW.children[0].children).find((el) => el.value ? el.value === contact.type : false);
			option.setAttribute('selected', 'selected');
			copyIGW.children[1].value = contact.value;
			copyIGW.children[1].classList.add('black');
			copyIGW.children[1].disabled = false;
			addMaskPairInput(copyIGW);
			addEventCloseContact(copyIGW, addButtonContact);
			fragment.append(copyIGW);
		}
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
	divErrors.className = 'server-errors';
	let oldMess = document.querySelector('.server-errors');
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
	const clientID = document.createElement('a');
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
		clientID.className = 'client-id';
		form.className = 'form';
		form.append(label, input);
		makeTextBlack(input);
	}
	if (dataClient) {
		clientID.textContent = 'ID:' + dataClient.id;
		clientID.href = location.href + `#${dataClient.id}`
		clientID.target = '_blank';
	}
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
