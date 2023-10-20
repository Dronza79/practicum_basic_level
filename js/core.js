export {parseFormData, createBodyTable, deleteClientToServer};

const SERVER = 'http://localhost:3000/api/clients';

async function parseFormData(form) {
	let data = new FormData(form);
	const person = {};
	const contacts = [];
	const contType = data.getAll('type');
	const contVal = data.getAll('value');
	
	person.surname = data.get('surname');
	person.name = data.get('name');
	person.lastName = data.get('lastName');
	for (let i = 0; i < contType.length; i++) {
		const obj = {type: contType[i], value: contVal[i]};
		contacts.push(obj);
	}
	person.contacts = contacts;
	
	// console.log('person=', person);
	let response = await fetch(SERVER, {
		method: 'POST',
		body: JSON.stringify(person),
		headers: {'Content-Type': 'application/json; charset=utf-8'}
	});
	console.log(response.ok);
	if (response.ok) await createBodyTable()
	console.log(response.status);
	let errors = await response.json()
	return {ok: response.ok, errors};
}

async function createBodyTable() {
	const htmlElement = document.getElementById('t-body');
	let response = await fetch(SERVER);
	let listClients = await response.json();
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
		// console.log(response.ok);
	});
}

