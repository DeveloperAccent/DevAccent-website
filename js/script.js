const loveCount = document.querySelector('.love-count');
const submitLove = document.querySelector('.send-love-btn');
const showLoveForm = document.querySelector('.show-love-form');

submitLove.addEventListener('click', showLoveForm.submit(function(e) {
	e.preventDefault();
	showLoveForm.innerHTML += "<input type='hidden' name='form-name' value='love' />";
	const url = showLoveForm.getAttribute('action');
	ajax.open('GET', 'url', true);
	ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	ajax.send();
}));

var ajax = new XMLHttpRequest();
ajax.onload = getSubmissionCount;
ajax.onerror = failedAttempt;
ajax.open("GET", "https://api.netlify.com/api/v1/forms/5a3e7682494c5852683421de?access_token=976354873ebb7e74404f9fabe81e493ca236627a1d95c91b92577428aee803fe", true);
ajax.send();

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