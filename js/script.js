const loveCount = document.querySelector('.love-count');
const submitLove = document.querySelector('.send-love-btn');
const showLoveForm = document.querySelector('.show-love-form');

submitLove.addEventListener('click', sendForm);
// submitLove.addEventListener('submit', submitFunc);

var ajax = new XMLHttpRequest();
ajax.onload = getSubmissionCount;
ajax.onerror = failedAttempt;
ajax.open("GET", "https://api.netlify.com/api/v1/forms/5a3e7682494c5852683421de?access_token=976354873ebb7e74404f9fabe81e493ca236627a1d95c91b92577428aee803fe", true);
ajax.send();

function sendForm(e) {
	e.preventDefault();

	const xhr = new XMLHttpRequest();
	const FD = new FormData();
	// showLoveForm.innerHTML += "<input type='hidden' name='form-name' value='love' />";
	const url = showLoveForm.getAttribute('action');

	xhr.addEventListener('load', function (event) {
		alert('Yeah! Data sent and response loaded.');
	});

	// Define what happens in case of error
	xhr.addEventListener('error', function (event) {
		alert('Oups! Something went wrong.');
	});

	xhr.open('GET', url, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	xhr.send(FD);
}

// function submitFunc() {
// 	alert("Submitted!");
// }

function getSubmissionCount() {
	if (this.status == 200) { // request succeeded
		// do something with this.responseText;
		var json = JSON.parse(this.responseText);
		var subCount = json.submission_count;
		loveCount.innerText = subCount;
	} else {
		// handle more HTTP response codes here;
	}
}

function failedAttempt(e) {
	// console.log(this);
	// console.error(e);
	// do something with this.status, this.statusText
}