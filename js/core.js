import {createModalClient} from "./modal.js";

export {parseFormData, createBodyTable, deleteClientToServer, getClientData, searchDataClientsFromServer};

const SERVER = 'http://localhost:3000/api/clients';

// Функция составления клиента из формы
async function parseFormData(form, clientID) {
	let data = new FormData(form);
	const person = {};
	const contacts = [];
	const contType = data.getAll('type');
	const contVal = data.getAll('value');
	// console.log('contType=', contType);
	// console.log('contVal=', contVal);
	person.surname = data.get('surname');
	person.name = data.get('name');
	person.lastName = data.get('lastName');
	for (let i = 0; i < contType.length; i++) {
		const obj = {type: contType[i], value: contVal[i]};
		contacts.push(obj);
	}
	person.contacts = contacts;
	if (clientID) person.id = clientID;
	// console.log(person);
	if (!clientID) {
		let response = await fetch(SERVER, {
			method: 'POST',
			body: JSON.stringify(person),
			headers: {'Content-Type': 'application/json; charset=utf-8'}
		});
		if (response.ok) await createBodyTable()
		
		let errors = await response.json()
		return {ok: response.ok, errors};
	} else {
		let response = await fetch(SERVER + `/${clientID}`, {
			method: 'PATCH',
			body: JSON.stringify(person),
			headers: {'Content-Type': 'application/json; charset=utf-8'}
		});
		if (response.ok) await createBodyTable()
		let errors = await response.json()
		return {ok: response.ok, errors};
	}
}

// Функция проведения сортировки полученного списка клиентов
function getSortedList(listClients, typeSorted) {
	let arg = typeSorted.split('_');
	if (arg[0] === 'username') {
		listClients.sort((a, b) => {
			if (a.surname === b.surname) {
				if (a.name === b.name) {
					if (a.lastName > b.lastName) {
						return 1;
					} else return -1;
				} else if (a.name > b.name) {
					return 1;
				} else return -1;
			} else if (a.surname > b.surname) {
				return 1;
			} else return -1;
		});
	} else if (arg[0] === 'id') {
		listClients.sort((a, b) => Number(a.id) - Number(b.id));
	} else listClients.sort((a, b) => Date.parse(a[arg[0]]) - Date.parse(b[arg[0]]));
	if (arg[1] === 'up') listClients.reverse();
	return listClients;
}

// Функция отрисовки таблицы с учетом выбранной сортировки
async function createBodyTable(sorted) {
	const htmlElement = document.getElementById('t-body');
	let response = await fetch(SERVER);
	let listClients = await response.json();
	if (sorted) listClients = getSortedList(listClients, sorted);
	let tableBody = document.createElement('table');
	const {generateStringClientData} = await import('./table.js');
	
	tableBody.className = 'table_clients';
	htmlElement.innerHTML = '';
	
	for (const client of listClients) {
		let stringClient = generateStringClientData(client);
		tableBody.append(stringClient); // Добавление строки с данными клиента
	}
	htmlElement.append(tableBody);
}

// Функция удаления выбранного клиента с сервера
async function deleteClientToServer(IdClient) {
	const {createModalConfirm} = await import('./modal.js');
	let confirmDelete = createModalConfirm().btn;
	const btnWaiting = document.createElement('img');
	btnWaiting.src = 'img/waiting_sm.svg';
	btnWaiting.className = 'await-animation';
	
	confirmDelete.addEventListener('click', async () => {
		confirmDelete.prepend(btnWaiting);
		let response = await fetch(SERVER + `/${IdClient}`, {
			method: 'DELETE'
		});
		if (response.ok) {
			btnWaiting.remove();
			const {removeModalVisible} = await import('./modal.js');
			removeModalVisible(confirmDelete.parentNode, confirmDelete.parentNode.parentNode);
			await createBodyTable();
		}
	});
}

async function getClientData(IdClient) {
	let response = await fetch(SERVER + `/${IdClient}`);
	let dataClient = await response.json();
	createModalClient(dataClient);
}

async function searchDataClientsFromServer(searchString){
	const htmlElement = document.getElementById('t-body');
	let tableBody = document.createElement('table');
	const {generateStringClientData} = await import('./table.js');
	let response = await fetch(SERVER + `?search=${searchString}`);
	let result = await response.json();
	
	tableBody.className = 'table_clients';
	htmlElement.innerHTML = '';
	if (result.length) {
		for (const client of result) {
			let stringClient = generateStringClientData(client);
			tableBody.append(stringClient); // Добавление строки с данными клиента
		}
		htmlElement.append(tableBody);
	}
}

