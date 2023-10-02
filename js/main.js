(() => {
	
	function getHTMLElement() {
		const bgM = document.createElement('div');
		bgM.classList.add('bgModal', 'modal-hidden');
		document.body.append(bgM);
		const tHead = Array.from(document.querySelectorAll('.table_head td'));
		console.log(tHead);
		return {bgM};
	}
	
	document.addEventListener("DOMContentLoaded", () => {
		const html = getHTMLElement();
	});
})();