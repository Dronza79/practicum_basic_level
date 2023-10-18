export {generateClientData}

// {
//   id: '1234567890',
//   createdAt: '2021-02-03T13:07:29.554Z',
//   updatedAt: '2021-02-03T13:07:29.554Z',
//   name: 'Василий',
//   surname: 'Пупкин',
//   lastName: 'Васильевич',
//   contacts: [
//   {
//     type: 'Телефон',
//     value: '+71234567890'
//   }]
// }

function generateClientData(clientData) {
  const stringTable = document.createElement('tr');
  const cellID = document.createElement('td');
  const username = document.createElement('td');
  const createAt = createCellTableDate(clientData.createdAt);
  const updateAt = createCellTableDate(clientData.updatedAt);
  const contacts = createCellTableContacts(clientData.contacts);
  const actions = document.createElement('td');
  const btnEdit = document.createElement('button');
  const btnDelete = document.createElement('button');

  actions.append(btnEdit, btnDelete);
  stringTable.append(cellID, username, createAt, updateAt, contacts, actions);
  return [stringTable, btnEdit, btnDelete];
  }
  
