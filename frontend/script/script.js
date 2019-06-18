// #region Algemeen
/* const IP = prompt('geef publiek IP', '172.30.248.45'); */
const IP = window.location.hostname + ':5000';
const socket = io.connect(IP);
let lampaan = 0;

//const veranderKleur = function() {};

socket.on('temperatuur', function(data) {
	graden = data.value;
	graden = Math.round(graden * 100) / 100;
	temp.innerHTML = `${graden}\xa0°C`;
	socket.emit('storeTemp', { value: data.value });
});

socket.on('luchtvochtigheid', function(data) {
	console.log('jipla');
	html = `${data.value} %`;
	lucht.innerHTML = html;
	socket.emit('storeLucht', { value: data.value });
});

const init = function() {
	console.log(IP);
	temp = document.querySelector('.dataTemp');
	btn = document.querySelector('.button');
	tijd = document.querySelector('.dataTijd');
	lucht = document.querySelector('.dataLucht');
	setTijd();
	btn.addEventListener('click', function() {
		refresh();
	});
	socket.emit('data');
};
const refresh = function() {
	socket.emit('data');
};
document.addEventListener('DOMContentLoaded', function() {
	console.info('DOM geladen');
	init();
});

const setTijd = function() {
	let myVar = setInterval(myTimer, 1000);
	function myTimer() {
		let d = new Date();
		tijd.innerHTML = d.toLocaleTimeString().substring(0, 5);
	}
};
// #endregion
