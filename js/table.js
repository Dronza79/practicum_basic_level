export {generateStringClientData}

// {
//   id: '1234567890',
//   createdAt: '2021-02-03T13:07:29.554Z',
//   updatedAt: '2021-02-03T13:07:29.554Z',
//   name: 'Василий',
//   surname: 'Пупкин',
//   lastName: 'Васильевич',
//   contacts: [
//   {
//     type: 'тел.',
//     value: '+71234567890'
//   }]
// }

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
// function getReplacedValue(stringContact) {
//   const result = [
//     ['тел.', 'phone'], ['моб.', 'mobile'],
//     ['E-почта', 'email'], ['ВКонтакте', 'vk'],
//     ['Телеграм', 'tg']].find((el) => {
//     return el.includes(stringContact);
//   });
//   return String(result.splice(result.indexOf(stringContact), 1));
// }
//
// console.log("моб.=", getReplacedValue('моб.'));
// console.log("mobile=", getReplacedValue('mobile'));
// console.log("ВКонтакте=", getReplacedValue('ВКонтакте'));
// console.log("tg=", getReplacedValue('tg'));

function getReplacedValue(stringContact) {
  const result = [
    ['тел.', 'phone'], ['моб.', 'mobile'],
    ['E-почта', 'email'], ['ВКонтакте', 'vk'],
    ['Телеграм', 'tg']].find((el) => {
      return el.includes(stringContact);
  });
  return String(result.splice(result.indexOf(stringContact), 1));
}

// https://snipp.ru/html-css/arrow-blocks#link-strelki-sverhu блок со стрелкой
// https://learn.javascript.ru/mousemove-mouseover-mouseout-mouseenter-mouseleave наведение мышью

function createCellTableContacts(contacts) {
  const cell = document.createElement('td');
  const contact = document.createElement('div');
  const icon = document.createElement('img');
  const tooltip = document.createElement('div');
  const tooltipType = document.createElement('span');
  const tooltipValue = document.createElement('span');
  
  contact.className = 'contact_data';
  tooltip.classList.add('ref_contact_data', 'hidden');
  tooltip.innerHTML = ':&nbsp;';
  tooltipType.style.color = '#FFFFFF';
  tooltipValue.style.color = '#B89EFF';
  icon.style.opacity = '0.7';
  tooltip.prepend(tooltipType);
  tooltip.append(tooltipValue);
  contact.append(tooltip, icon);
  
  if (!contacts) return cell;
  for (let dataCont of contacts) {
    let copyContact = contact.cloneNode(true);
    copyContact.children[0].children[0].textContent = getReplacedValue(dataCont.type);
    copyContact.children[0].children[1].textContent = dataCont.value;
    copyContact.children[1].style.width = '16px';
    // let tableBody = document.getElementById('t-body');
    ['тел.', 'моб.'].includes(dataCont.type)
      ? copyContact.children[1].src = 'img/phone.png'
      : ['email'].includes(dataCont.type)
        ? copyContact.children[1].src = 'img/mail.svg'
        : ['Vk'].includes(dataCont.type)
          ? copyContact.children[1].src = 'img/vk.svg'
          : ['telegram'].includes(dataCont.type)
            ? copyContact.children[1].src = 'img/telegram.svg'
            : copyContact.children[1].src = 'img/other.svg';
    // console.log(copyContact.parentNode.parentNode.parentNode)
    copyContact.addEventListener('mouseenter', (event) => {
      copyContact.children[0].classList.remove('hidden');
      copyContact.children[1].style.opacity = '1';

      // console.log(copyContact.parentNode)
      let table = copyContact.parentNode.parentNode.parentNode; // получение родительской таблицы
      let str = copyContact.parentNode.parentNode; // получение родительской строки
      // console.log(table.children[0] === str);
      if (table.children[0] === str) table.classList.add('margin-top');
    });
    copyContact.addEventListener('mouseleave', (event) => {
      copyContact.children[0].classList.add('hidden');
      copyContact.children[1].style.opacity = '0.7';
      console.log('event.target=', event.target);
      console.log('event.relatedTarget=', event.relatedTarget);
      let table = copyContact.parentNode.parentNode.parentNode; // получение родительской таблицы
      let str = copyContact.parentNode.parentNode; // получение родительской строки
      let timeout = setTimeout(() => table.classList.remove('margin-top'), 2000);
      if (table.children[0] === str) clearTimeout(timeout);
    });
    cell.append(copyContact);
  }
  return cell;
}

function generateStringClientData(clientData) {
  const stringTable = document.createElement('tr');
  const cellID = document.createElement('td');
  const username = document.createElement('td');
  const createAt = createCellTableDate(clientData.createdAt);
  const updateAt = createCellTableDate(clientData.updatedAt);
  const contacts = createCellTableContacts(clientData.contacts);
  const actions = document.createElement('td');
  const btnEdit = document.createElement('button');
  const btnDelete = document.createElement('button');

  cellID.textContent = clientData.id;
  username.textContent = `${clientData.surname} ${clientData.name} ${clientData.lastName}`
  btnEdit.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '<path id="Vector" d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/>\n' +
    '</svg>\n';
  btnDelete.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '<path id="Vector" d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="red"/>\n' +
    '</svg>\n';
  btnEdit.append('Редактировать');
  btnDelete.append('Удалить');

  stringTable.className = 'string_data';
  cellID.className = 'cell_5';
  username.className = 'cell_25';
  createAt.className = 'cell_15';
  updateAt.className = 'cell_15';
  contacts.className = 'cell_13';
  actions.className = 'cell_25';
  btnEdit.className = 'table_btn';
  btnDelete.className = 'table_btn';
  btnEdit.style.marginRight = '30px';

  actions.append(btnEdit, btnDelete);
  stringTable.append(cellID, username, createAt, updateAt, contacts, actions);
  // console.log(contacts);
  return {stringTable, contacts};
  }
  
