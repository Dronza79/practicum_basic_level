const {deleteClientToServer, getClientData} = await import("./core.js");
import { icons } from "./icons.js"

export {generateStringClientData}

// Функция генерации данных в ячейках, связанных с датами
function createCellTableDate(dateString) {
  const cell = document.createElement('td');
  const date = document.createElement('span');
  const time = document.createElement('span');
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,});
  const parseDate = formatter.format(new Date(String(dateString)));
  
  date.textContent = parseDate.slice(0, 10);
  time.textContent = parseDate.slice(12);
  
  date.style.color = '#333';
  date.style.marginRight = '10px';
  time.style.color = '#B0B0B0';
  
  cell.append(date, time);
  return cell;
}

// Функция предоставления соответствия типа контакта
function getReplacedValue(stringContact) {
  const result = [
    ['телефон.', 'phone'], ['мобильный', 'mobile'],
    ['электронная почта', 'email'], ['Вконтакте', 'vk'],
    ['Телеграм', 'tg']].find((el) => el.includes(stringContact));
  if (result) result.splice(result.indexOf(stringContact), 1);
  return result ? String(result): 'no-type';
}

// Функция генерации ячейки с контактами клиента
function createCellTableContacts(contacts) {
  const cell = document.createElement('td');
  const wrapperContact = document.createElement('div');
  const count = document.createElement('button');
  const tooltip = document.querySelector('.ref_contact_data');
  const tooltipType = document.createElement('span');
  const tooltipValue = document.createElement('span');

  wrapperContact.className = 'wrapper-contacts';
  tooltip.classList.add('ref_contact_data', 'hidden');
  count.classList.add('contact_data', 'count_contact', 'sm-display');
  count.style.cursor = 'pointer';
  tooltip.innerHTML = ':&nbsp;';
  tooltipType.style.color = '#FFFFFF';
  tooltipValue.style.color = '#B89EFF';
  tooltip.prepend(tooltipType);
  tooltip.append(tooltipValue);
  cell.append(wrapperContact);

  if (!contacts) return cell;
  for (let dataCont of contacts) {
    const newContact = document.createElement("button");
    newContact.className = 'contact_data';
    newContact.innerHTML = icons[dataCont.type];

    newContact.addEventListener('focus', (event) => {
      tooltip.children[0].textContent = getReplacedValue(dataCont.type);
      tooltip.children[1].textContent = dataCont.value;
      let loc = newContact.getBoundingClientRect();
      let tooltipDim = tooltip.getBoundingClientRect();
      tooltip.style.left = `${window.scrollX + loc.left - tooltipDim.width / 2 + loc.width / 2}px`;
      tooltip.style.top = `${window.scrollY + loc.top - tooltipDim.height - 9}px`;
      tooltip.classList.remove('hidden');
    });
    newContact.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        tooltip.classList.add('hidden');
        event.target.blur();
      }
    });
    wrapperContact.append(newContact);
  }
  if (wrapperContact.children.length > 5) {
    count.textContent = `+${wrapperContact.children.length - 4}`;
    wrapperContact.append(count);
    Array.from(wrapperContact.children).map((el, id) => {
      if (id > 3) el.classList.add('collection');
    });
  }
  count.addEventListener('click', () => {
    Array.from(document.querySelectorAll('.collection')).map(el => el.classList.toggle('sm-display'));
    setTimeout(() => {
      Array.from(document.querySelectorAll('.collection')).map(el => el.classList.toggle('sm-display'));
    }, 5000);
  });
  return cell;
}

// Функция генерации строки с данными клиента
function generateStringClientData(clientData) {
  const stringTable = document.createElement('tr');
  const cellID = document.createElement('td');
  const username = document.createElement('td');
  const createAt = createCellTableDate(clientData.createdAt);
  const updateAt = createCellTableDate(clientData.updatedAt);
  const contacts = createCellTableContacts(clientData.contacts);
  const actions = document.createElement('td');
  const btnWrapper = document.createElement('div');
  const btnEdit = document.createElement('button');
  const btnDelete = document.createElement('button');

  cellID.textContent = clientData.id;
  username.textContent = `${clientData.surname} ${clientData.name} ${clientData.lastName}`
  btnEdit.innerHTML = icons.edit;
  btnDelete.innerHTML = icons.delete;
  btnEdit.append('Редактировать');
  btnDelete.append('Удалить');

  stringTable.className = 'string_data';
  cellID.className = 'cell_5';
  username.className = 'cell_25';
  createAt.className = 'cell_15';
  updateAt.className = 'cell_15';
  contacts.className = 'cell_13';
  actions.className = 'cell_actions';
  btnWrapper.className = 'tb_btn_wrapper';
  btnEdit.className = 'table_btn';
  btnDelete.className = 'table_btn';

  btnWrapper.append(btnEdit, btnDelete);
  actions.append(btnWrapper);
  stringTable.append(cellID, username, createAt, updateAt, contacts, actions);
  
  btnDelete.addEventListener('click', () => {
    deleteClientToServer(clientData.id).then(r => r);
    stringTable.classList.add('marked_for_delete');
  });
  btnEdit. addEventListener('click', () => {
    getClientData(clientData.id).then(r => r);
  });
  // stringTable.addEventListener("click", (event) => {
  //   if (event.target !== btnEdit && event.target !== btnDelete) console.log(event.target);
  // });
  return stringTable;
  }
  
