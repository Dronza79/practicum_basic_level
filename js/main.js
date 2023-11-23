import {icons} from "./icons.js";
import {createBodyTable, searchDataClientsFromServer} from "./core.js";
import {createModalClient, makeTextBlack} from "./modal.js";

(() => {
	// Получение всех готовых элементов со страницы
	function getHTMLElement() {
		const tHead = Array.from(document.querySelectorAll('.head-table-btn'));
		const sch = document.querySelector('.search-form');
		const addBtn = document.getElementById('add-btn');
		const searchInput = document.getElementById('search');
		return {tHead, sch, addBtn, searchInput};
	}

	// Функция обработки сортировки данных
	function addEventSortTableHead(listTableHead) {
		for (let colum of listTableHead) {
			const arrow = document.createElement('span');
			const route = document.createElement('span');
			colum.dataset.sorted = '';
			route.style.cssText = 'font-size: 10px; font-weight: 600';
			route.textContent = 'А-Я';
			arrow.innerHTML = icons.arrow_dwn;
			colum.append(arrow);
			if (colum.id === 'username') colum.append(route);
			if (colum.id === 'id') {
				colum.classList.add('filter');
				colum.dataset.sorted = 'dwn';
			}

			colum.addEventListener('click', async () => {
				listTableHead.map(el => {
					el.classList.remove('filter');
					if (el !== colum) el.dataset.sorted = '';
				});
				colum.classList.add('filter');
				if (colum.dataset.sorted !== 'dwn') {
					colum.dataset.sorted = 'dwn';
					arrow.innerHTML = icons.arrow_dwn;
					if (route) route.textContent = 'А-Я';
				} else {
					colum.dataset.sorted = 'up';
					arrow.innerHTML = icons.arrow_up;
					if (route) route.textContent = 'Я-А';
				}
				await createBodyTable(`${colum.id}_${colum.dataset.sorted}`); // Формирование тела таблицы клиентов на основании списка
			});
		}
	}
	
	document.addEventListener("DOMContentLoaded", async () => {
		const html = getHTMLElement();
		await createBodyTable(); // Формирование тела таблицы клиентов на основании списка
		makeTextBlack(html.searchInput);

		addEventSortTableHead(html.tHead); // Добавление обработки сортировки списка клиентов

		html.sch.addEventListener('submit', async (event) => {
			event.preventDefault();
			await searchDataClientsFromServer(html.searchInput.value);
		});
		
		// Обработка нажатия кнопки "Добавить клиента"
		html.addBtn.addEventListener('click', async (event) => {
			event.preventDefault();
			createModalClient(); // Создание нового клиента в модальном окне
		});
	});
})();
