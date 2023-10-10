export {parseFormData};

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
	// let json = JSON.stringify(person);
	let response = await fetch('http://localhost:3000/api/clients', {
		method: 'POST',
		body: JSON.stringify(person),
		headers: {'Content-Type': 'application/json; charset=utf-8'}
	});
	console.log(response.ok);
	console.log(response.status);
	return response.ok;
}

let cli = {
	surname: "Иванов",
	name: "Иван",
	lastName: "Васильевич",
	contacts: [
		{type: "Телефон", value: "123654789"},
		{type: "Email", value: "ivanov@mail.ru"},
		{type: "Vk", value: "vk.com/id1223"},
	]
}