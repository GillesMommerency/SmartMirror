const IP = window.location.hostname + ':5000';
let socket;

const getSocketConnection = function() {
	socket = io(IP);

	socket.on('temperatuur', function(data) {
		graden = data.value;
		graden = Math.round(graden * 100) / 100;
		html = `${graden} °C`;
		temp.innerHTML = html;
	});

	socket.on('luchtvochtigheid', function(data) {
		console.log(data);
		html = `${data.value} %`;
		lucht.innerHTML = html;
	});

	socket.on('ip', function(data) {
		console.log(data);
		html = `${data.value}`;
		ip.innerHTML = html;
	});
};

const init = function() {
	getSocketConnection();
	begroeting = document.querySelector('.welcome');
	tijd = document.querySelector('.uur');
	datum = document.querySelector('.datum');
	temp = document.querySelector('.dataTemp');
	lucht = document.querySelector('.dataLucht');
	ip = document.querySelector('.ip');
	socket.emit('data');
	displayDatumTijd();
	setInterval(reload, 60000);
};

const displayDatumTijd = function() {
	// Initialize date
	let mydate = new Date();
	let year = mydate.getYear() + 1900;
	let day = mydate.getDay();
	let month = mydate.getMonth();
	let daym = mydate.getDate();
	// Preparing to spit on the document :)

	let dayarray = new Array(
		'Zondag',
		'Maandag',
		'Dinsdag',
		'Woensdag',
		'Donderdag',
		'Vrijdag',
		'Zaterdag'
	);
	let montharray = new Array(
		'Januari',
		'Februari',
		'Maart',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Augustus',
		'September',
		'Oktober',
		'November',
		'December'
	);
	datum.innerHTML = `${dayarray[day]} <br>  ${daym} ${
		montharray[month]
	} ${year} <br>`;
	// End Date Init

	// Initialize time to be able to salute People
	let currentTime = new Date();
	let h = currentTime.getHours();
	hourarray = [
		'Het Is Middernacht',
		'Goeie Nacht',
		'Goedenacht',
		'Goedenacht',
		'Goedenacht',
		'Goeiemorgen',
		'Goeiemorgen',
		'Goeiemorgen',
		'Goeiemorgen',
		'Goeiemorgen',
		'Goeiemorgen',
		'Goeiemorgen',
		'Het Is Lunchtijd',
		'Goeiemiddag',
		'Goeiemiddag',
		'Goeiemiddag',
		'Goeiemiddag',
		'Goeiemiddag',
		'Goeiemiddag',
		'Fijne Avond',
		'Fijne Avond',
		'Fijne Avond',
		'Fijne Avond',
		'Goeie Nacht'
	];
	begroeting.innerHTML += `<span>${hourarray[h]} </span>`;

	// End Salute

	// Display the Local time with the magic of this method (toLocaleTimeString()) and set the interval to 1second
	let myVar = setInterval(myTimer, 1000);
	function myTimer() {
		let d = new Date();
		tijd.innerHTML = d.toLocaleTimeString().substring(0, 5);
	}
};
document.addEventListener('DOMContentLoaded', function() {
	console.info('DOM geladen');
	init();
});
setInterval(function() {
	socket.emit('beweging');
}, 1000);

const reload = function() {
	if (!window.location.hash) {
		window.location = window.location + '#loaded';
		window.location.reload();
	}
};
