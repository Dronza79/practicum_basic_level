export {createModalConfirm, createModalNewClient}

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
  const img = document.createElement('img');
  const bgM = document.getElementById('bgModal');

  img.src = 'img/close.svg';
  btnCancel.textContent = 'Отмена';
  title.classList.add('modal-title');
  btnClose.classList.add('modal-btnClose');
  btnMain.classList.add('btn');
  btnCancel.classList.add('modal-btnCancel');
  bgM.classList.add('modal-visible');
  winTemplate.classList.add('win-active', 'modal-window');

  btnClose.append(img);
  winTemplate.append(title, btnClose, btnMain, btnCancel);
  bgM.textContent = '';
  bgM.append(winTemplate);

  document.body.style.overflow = 'hidden';

  function funRMV(event) {
    event.preventDefault();
    removeModalVisible(winTemplate, bgM);
  }

  // btnMain.addEventListener('click', funRMV);
  btnCancel.addEventListener('click', funRMV);
  btnClose.addEventListener('click', funRMV);
  window.addEventListener('click', (event) => {
    // console.log(event.target);
    if (event.target === bgM) {
      funRMV(event);
    }
  }, {'once': true});
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
  return {btnMain: templateModal.btnMain}
}

// Изменение цвета текста в поле ввода
function makeTextBlack(item) {
  item.addEventListener('input', () => {
    item.classList.add('black');
    if (!item.value) item.classList.remove('black');
  });
}

function addMaskInput() {
  console.log('функция нашлась');
}

function addMaskPairInput(groupElem) {
  const selectElem = groupElem.querySelector('select');
  const inputElem = groupElem.querySelector('input');

  // console.log('groupElem=', groupElem);
  // console.log('selectElem=', selectElem);
  // console.log('inputElem=', inputElem);

  selectElem.addEventListener('change', () => {
    // const selectedOption = event.target.value;
    const selectedOption = selectElem.value;
    console.log(selectedOption);
  });
}

// Создание секции добавления контактов
function createContactData() {
  const divWrapper = document.createElement('div');
  const addButtonContact = document.createElement('button');
  const plusImg = document.createElement('img');
  const inputGroupWrapper = document.createElement('div');
  const choices = document.createElement('select');
  const inputContact = document.createElement('input');

  const listContact = ["Тип контакта", 'Телефон', 'Доп. телефон', 'Email', 'Vk', 'Facebook'];
  for (let val of listContact) {
    let option = document.createElement('option');
    option.value = val !== 'Тип контакта' ?  val : '';
    // if (val === 'Email') option.setAttribute('selected', 'true');
    option.textContent = val;
    choices.append(option);
  }
  choices.name = 'type';
  inputContact.name = 'value'
  plusImg.src = 'img/add_circle_outline.svg';
  addButtonContact.textContent = 'Добавить контакт';
  inputContact.placeholder = 'Введите данные контакта';
  // inputContact.required = true;

  addButtonContact.prepend(plusImg);
  inputGroupWrapper.append(choices, inputContact);
  divWrapper.append(addButtonContact);

  choices.className = 'choice-input-contact'
  inputContact.classList.add('input-contact');
  divWrapper.className = 'section_add_contact';
  addButtonContact.className = 'btn_add_contact';
  inputGroupWrapper.className = 'group-input';

  addButtonContact.addEventListener('click', (event) => {
    event.preventDefault();
    divWrapper.classList.add('padding-divWrapper');
    let collection = divWrapper.getElementsByClassName('group-input');
    if (collection && collection.length < 9) {
      let copyIGW = inputGroupWrapper.cloneNode(true);
      makeTextBlack(copyIGW.children[1]);
      addMaskPairInput(copyIGW);
      addButtonContact.before(copyIGW);
    } else {
      makeTextBlack(inputGroupWrapper.children[1]);
      addButtonContact.before(inputGroupWrapper);
      addMaskPairInput(inputGroupWrapper);
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
function createModalNewClient() {
  const modal = createModalWindowTemplate();
  const sectionContact = createContactData();
  const form = document.createElement('form');
  const btnWaiting = document.createElement('img');
  const username = [
    {type: 'surname', val: 'Фамилия*'},
    {type: 'name', val: 'Имя*'},
    {type: 'lastName', val: 'Отчество'}
  ];
  for (let obj of username) {
    let label = document.createElement('label');
    let input = document.createElement('input');
    input.placeholder = obj.val;
    // input.required = obj.type !== 'lastName';
    input.id = obj.type;
    input.name = obj.type;
    label.htmlFor = obj.type;
    input.className = 'input-form';
    label.className = 'label-input';
    form.className = 'form';
    form.append(label, input);
    makeTextBlack(input);
  }
  btnWaiting.src = 'img/waiting_sm.svg';
  btnWaiting.className = 'await-animation';

  modal.winTemplate.classList.add('modal-client');
  modal.title.classList.add('title-client');
  modal.btnMain.textContent = 'Сохранить';
  modal.title.textContent = 'Новый клиент';
  form.append(sectionContact.divWrapper, modal.btnMain);
  modal.title.after(form);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    modal.btnMain.prepend(btnWaiting);
    const {parseFormData} = await import('./core.js');
    let result = await parseFormData(form);
    if (result.ok) {
      btnWaiting.remove();
      removeModalVisible(modal.winTemplate, modal.bgM);
    } else {
      displayListErrors(result, modal.btnMain);
      btnWaiting.remove();
    }
  });
}
