/* Hamburger Navigation Menu*/
function toggleMenu() {
    let getMenu = document.querySelector(".mainMenu");
    getMenu.classList.toggle("hamburger");
}
let getHamburger = document.querySelector("#toggle-bar");

getHamburger.addEventListener("click", toggleMenu);

/*End HB Nav Menu*/


//SCROLL TO TOP BTN
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


/* Q1 onClick Check My Answer */
function pirateFunction() {
    document.getElementById("pirate").innerHTML = "Dread Pirate Roberts";
    document.getElementById("pirate").style.backgroundColor = "#32c0e3";
}

/* Q2 onClick Check My Answer */
function humperdinkFunction() {
    document.getElementById("humperdink").innerHTML = "Prince Humperdink";
    document.getElementById("humperdink").style.backgroundColor = "#32c0e3";
}

/* Q3 onClick Check My Answer */
function guilderFunction() {
    document.getElementById("guilder").innerHTML = "Guilder, The sworn enemy of Florin";
    document.getElementById("guilder").style.backgroundColor = "#32c0e3";
}
/* Q4 RHYME */
function rhymeFunction() {
    document.getElementById("rhyme").style.backgroundColor = "#32c0e3";
    alert("You can rhyme, almost anytime!");
}

/* Q5 onClick Answers */
function eelFunction() {
    document.getElementById("eel").innerHTML = "I suppose you think you're brave, don't ya";
    document.getElementById("eel").style.backgroundColor = "#32c0e3";

}

function sitFunction() {
    document.getElementById("sit-and-wait").innerHTML = "AS YOU WISH--we will sit and wait";
    document.getElementById("sit-and-wait").style.backgroundColor = "#32c0e3";
    /*var audio = new Audio('audio/asyouwish.mp3');
    audio.play();*/
}

function fightFunction() {
    document.getElementById("fight").
    innerHTML = "INCONCEIVABLE--You are but a small stature woman with no weapons BUT Fezzik wishes to do no harm";
    document.getElementById("fight").style.backgroundColor = "#32c0e3";
    /*var audio = new Audio('audio/inconceivable.mp3');
    audio.play();*/
} /*End Q5 */