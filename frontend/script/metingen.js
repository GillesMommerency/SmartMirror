const handleData = function(url, callback, method = 'GET', body = null) {
	fetch(url, {
		method: method,
		body: body,
		headers: { 'content-type': 'application/json' }
	})
		.then(function(response) {
			if (!response.ok) {
				throw Error(
					`Probleem bij de fetch(). Status Code: ${response.status}`
				);
			} else {
				console.info('Er is een response teruggekomen van de server');
				return response.json();
			}
		})
		.then(function(jsonObject) {
			console.info('json object is aangemaakt');
			console.info('verwerken data');
			callback(jsonObject);
		})
		.catch(function(error) {
			console.error(`fout bij verwerken json ${error}`);
		});
};

const getMetingDagen = function() {
	handleData(
		`http://` + window.location.hostname + `:5000/metingen`,
		showMetingen
	);
};
const getMetingenData = function(datum) {
	handleData(
		`http://` + window.location.hostname + `:5000/metingen/${datum}`,
		toonMetingen
	);
};

const showMetingen = function(data) {
	console.log(data);
	let toInsert = '';
	for (let meting of data) {
		toInsert += `<div class="button dag" datum="${meting.Jaar}-${
			meting.Maand
		}-${meting.Dag}">${meting.DagNaam} ${meting.Dag}-${meting.Maand}-${
			meting.Jaar
		}</div>`;
	}
	document.querySelector('.row').innerHTML = toInsert;
	listenToMetingen();
};

const listenToMetingen = function() {
	let children = document.querySelectorAll('.dag');
	for (let child of children) {
		child.addEventListener('click', function() {
			datum = child.getAttribute('datum');
			console.log(datum);
			getMetingenData(datum);
		});
	}
};

const toonMetingen = function(data) {
	console.log(data);
	tabel = document.querySelector('.outputDiv');
	let toInsert = `<table><tr><td><img class="tablehead" src="images/small-clock-icon-19.jpg"></td><td><img class="tablehead" src="images/684641_tools_512x512.png"></td><td><img class="tablehead" src="images/684486_weather_512x512.png"></td></tr>`;
	for (let meting of data) {
		tijd = meting.datumTijd;

		tijd = tijd.substring(tijd.indexOf(' GMT') - 8, tijd.indexOf(' GMT'));
		toInsert += `<tr><td>${tijd}</td><td>${meting.sensorID}</td><td>${
			meting.waarde
		}</td></tr>`;
	}
	toInsert += `</table>`;
	tabel.innerHTML = toInsert;
};
const init = function() {
	getMetingDagen();
};

document.addEventListener('DOMContentLoaded', function() {
	console.info('DOM geladen');
	init();
});
