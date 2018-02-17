const loveCount = document.querySelector('.love-count');
const submitLove = document.querySelector('.send-love-btn');
const showLoveForm = document.querySelector('.show-love-form');
var formControl = document.querySelectorAll('.form-control');
var lineFocusContent = document.querySelectorAll('.line-focus-content');
var body = document.querySelector('body');
var signupbtn = document.getElementById("contact-submit");
signupbtn.disabled = true;

var ajax = new XMLHttpRequest();
ajax.onload = getSubmissionCount;
ajax.onerror = failedAttempt;
ajax.open("GET", "https://api.netlify.com/api/v1/forms/5a3e7682494c5852683421de?access_token=976354873ebb7e74404f9fabe81e493ca236627a1d95c91b92577428aee803fe", true);
ajax.send();

body.addEventListener("click", function(e){
    if (e.target != searchFormControl(e.target)){
        checkEmptyFieldAndUpdate ();
    }
});

for (var x=0; x<formControl.length; x++){
    formControl[x].addEventListener("click", function(){
       var sibling = this.nextElementSibling.firstElementChild.style;
       checkEmptyFieldAndUpdate ();
       sibling.width = "100%";
       sibling.transition = "1s";

        if (this.tagName == "TEXTAREA"){
            formControl[2].style.height = "150px";
            formControl[2].style.transition = "1s";
        }
    });

    formControl[x].addEventListener("input", function(){
        if (formControl[0].value =="" || formControl[1].value =="" || formControl[2].value ==""){
            signupbtn.disabled = true;
        }else{
            signupbtn.disabled = false;
            }
    });
}

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

// Search to check if trigered event Element is in FormControl Node List
function searchFormControl(item){
    for (var x=0; x<formControl.length; x++){
        if(item == formControl[x]){
            return formControl[x];
        }
    }
}

// Check If input Field is Empty when it is not onfocus
function checkEmptyFieldAndUpdate (){
    for (var x=0; x<formControl.length; x++){
        if (formControl[x].value === ""){
            formControl[x].nextElementSibling.firstElementChild.style.width = "0%";
            formControl[x].nextElementSibling.firstElementChild.style.transition = ".5s";
        }
    }

    if (formControl[2].value ===""){
        formControl[2].style.height = "60px";
        formControl[2].style.transition = ".5s";
    }


}
