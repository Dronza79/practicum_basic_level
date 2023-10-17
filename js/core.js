export {parseFormData, getListClients};

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
	
	console.log('person=', person);
	// let json = JSON.stringify(person);
	let response = await fetch('http://localhost:3000/api/clients', {
		method: 'POST',
		body: JSON.stringify(person),
		headers: {'Content-Type': 'application/json; charset=utf-8'}
	});
	console.log(response.ok);
	console.log(response.status);
	let errors = await response.json()
	// console.log(err);
	return {ok: response.ok, errors};
}

async function getListClients() {
	let response = await fetch('http://localhost:3000/api/clients');
	let listClients = await response.json();
	console.log(listClients);
	console.log(Array.isArray(listClients));
}