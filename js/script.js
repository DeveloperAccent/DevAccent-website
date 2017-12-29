const loveCount = document.querySelector('.love-count');
const submitLove = document.querySelector('.send-love-btn');
const showLoveForm = document.querySelector('.show-love-form');

// Add event listener for love btn
submitLove.addEventListener('click', sendLove);

var ajax = new XMLHttpRequest();
ajax.onload = getSubmissionCount;
ajax.onerror = failedAttempt;
ajax.open("GET", "https://api.netlify.com/api/v1/forms/5a3e7682494c5852683421de?access_token=976354873ebb7e74404f9fabe81e493ca236627a1d95c91b92577428aee803fe", true);
ajax.send();

var xhr = new XMLHttpRequest();

function sendLove(e) {
	e.preventDefault();
	var number;
	var url = showLoveForm.getAttribute('action');
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	xhr.send(number);

	getSubmissionCount();
}

function getSubmissionCount() {
	if (ajax.status == 200) { // request succeeded
		// do something with this.responseText;
		var json = JSON.parse(ajax.responseText);
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