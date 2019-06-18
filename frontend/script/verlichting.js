// #region Algemeen
/* const IP = prompt('geef publiek IP', '172.30.248.45'); */
const IP = window.location.hostname + ':5000';
const socket = io.connect(IP);
let lampaan = 0;
let waarde;

const veranderKleur = function() {
	waarde = document.querySelector('#kleur1').value;

	if (lampaan == 1) {
		document.getElementById('vulling').setAttribute('fill', waarde);
		socket.emit('change', waarde);
	}
};
const init = function() {
	lamp = document.querySelector('.fancy-bulb');
	waarde = document.querySelector('#kleur1').value;
	kleur = document
		.querySelector('#kleur1')
		.addEventListener('input', veranderKleur);
	sendbtn = document
		.querySelector('.button')
		.addEventListener('click', function() {
			if (lampaan == 0) {
				lamp.classList.add('active');
				lampaan = 1;
				socket.emit('change', waarde);

				document.getElementById('vulling').setAttribute('fill', waarde);
			} else if (lampaan == 1) {
				lamp.classList.remove('active');
				lampaan = 0;
				socket.emit('off');
			}
		});
};

document.addEventListener('DOMContentLoaded', function() {
	console.info('DOM geladen');
	init();
});

// #endregion
