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

function createCellTableDate(dateString) {
  const cell = document.createElement('td');
  const date = document.createElement('span');
  const time = document.createElement('span');
  const parseDate = new Date(String(dateString.slice(0, 10)));
  const formater = new Intl.DateTimeFormat();
  
  date.textContent = formater.format(parseDate);
  time.textContent = dateString.slice(12, 16);
  
  date.style.color = '#333';
  time.style.color = '#B0B0B0';
  
  cell.append(date, time);
  return cell;
}

// https://snipp.ru/html-css/arrow-blocks#link-strelki-sverhu блок со стрелкой
// https://learn.javascript.ru/mousemove-mouseover-mouseout-mouseenter-mouseleave наведение мышью

function createCellTableContacts(contacts) {
  const cell = document.createElement('td');
  const contact = document.createElement('div');
  const icon = document.createElement('img');
  const reference = document.createElement('div');
  const typeData = document.createElement('span');
  const valueData = document.createElement('span');
  
  contact.className = 'contact_data';
  reference.classList.add('ref_contact_data', 'hidden');
  reference.innerHTML = ':&nbsp;';
  typeData.style.color = '#FFFFFF';
  valueData.style.color = '#B89EFF';
  reference.prepend(typeData);
  reference.append(valueData);
  contact.append(reference, icon);
  
  if (!contacts) return cell;
  for (let dataCont of contacts) {
    let copyContact = contact.cloneNode(true);
    if (['Телефон', 'Мобильный'].includes(dataCont.type)) {
      copyContact.children[1].src = 'img/'
    }
  }
  
  return cell;
}

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
  
