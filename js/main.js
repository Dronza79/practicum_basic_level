(() => {
	
	// Получение всех готовых элементов со страницы
	function getHTMLElement() {
		const tHead = Array.from(document.querySelectorAll('.filter'));
		const sch = document.querySelector('.search_form');
		const addBtn = document.getElementById('add-btn');
		const searchInput = document.getElementById('search');
		return {tHead, sch, addBtn, searchInput};
	}

	// Функция обработки сортировки данных
	function addEventSortTableHead(listTableHead) {
		for (let colum of listTableHead) {
			const arrow = document.createElement('img');
			const route = document.createElement('span');
			route.style.cssText = 'color: #9873FF; font-size: 10px; font-weight: 600';
			route.style.color = '#9873FF';
			
			colum.append(arrow);
			if (colum.classList.contains('table_username')) colum.append(route);
			let timer;
			colum.addEventListener('click', async () => {
				clearTimeout(timer);
				timer = setTimeout(() => {
					colum.dataset.sorted = '';
					colum.querySelector('img').src = '';
					if (colum.querySelector('span')) colum.querySelector('span').textContent = '';
				}, 5000);
				if (!colum.dataset.sorted) {
					clearTimeout(timer);
					listTableHead.map((el) => {
						if (el.dataset.sorted) {
							el.dataset.sorted = '';
							el.querySelector('img').src = '';
							if (el.querySelector('span')) el.querySelector('span').textContent = '';
						}
					});
					colum.querySelector('img').src = 'img/arrow_dwn.svg';
					if (colum.querySelector('span')) colum.querySelector('span').textContent = 'А-Я';
					colum.dataset.sorted = 'dwn';
				} else if (colum.dataset.sorted === 'dwn') {
					
					colum.querySelector('img').src = 'img/arrow_up.svg';
					if (colum.querySelector('span')) colum.querySelector('span').textContent = 'Я-А';
					colum.dataset.sorted = 'up';
				} else {
					colum.querySelector('img').src = 'img/arrow_dwn.svg';
					if (colum.querySelector('span')) colum.querySelector('span').textContent = 'А-Я';
					colum.dataset.sorted = 'dwn';
				}
				const {createBodyTable} = await import('./core.js');
				await createBodyTable(`${colum.id}_${colum.dataset.sorted}`); // Формирование тела таблицы клиентов на основании списка
				
			});
		}
	}
	
	document.addEventListener("DOMContentLoaded", async () => {
		const html = getHTMLElement();
		const {createBodyTable} = await import('./core.js');
		await createBodyTable(); // Формирование тела таблицы клиентов на основании списка
		const {makeTextBlack} = await import('./modal.js');
		makeTextBlack(html.searchInput);

		addEventSortTableHead(html.tHead); // Добавление обработки сортировки списка клиентов

		html.sch.addEventListener('submit', async (event) => {
			event.preventDefault();
			console.log(html.searchInput.value);
			const {searchDataClientsFromServer} = await import('./core.js');
			await searchDataClientsFromServer(html.searchInput.value);
		});
		
		// Обработка нажатия кнопки "Добавить клиента"
		html.addBtn.addEventListener('click', async (event) => {
			event.preventDefault();
			const {createModalClient} = await import('./modal.js');
			createModalClient(); // Создание нового клиента в модальном окне
		});
	});
})();
