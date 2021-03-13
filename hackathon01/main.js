var cells = document.getElementsByClassName("date")
var input = document.getElementById("cal-input")
var color = document.getElementById("cal-color")
var button = document.getElementById("cal-button")
input.value = ''
color.value = '#b0b0b0'
var currentDate = cells[0]

const setTDStyles = (date) => {
    console.log(currentDate);
    currentDate.classList.remove('date-clicked');
    currentDate = date;
    currentDate.classList.add('date-clicked');
    // currentDate.className = "date-clicked";
}

const addToCalendar = (text) => {
    let prev = currentDate.innerHTML.split('<br>');
    currentDate.innerHTML = prev[0] + '<br><span style="color:' + color.value + '">' + text + '<\span>';
};

input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13 && input.value.trim() !== "") {
        addToCalendar(input.value.trim());
        input.value = "";
    }
});
button.addEventListener('click', () => {
    if (input.value.trim() !== "") {
        addToCalendar(input.value.trim());
        input.value = "";
    }
});

//Sets the page's theme. No need to modify
var themeButton = document.getElementsByClassName("ChooseTheme")
for(var i=0; i<themeButton.length; ++i) {
    themeButton[i].addEventListener('click', e => {
        document.body.setAttribute('class', e.target.id)
    }, false)
}

for (var j = 0; j < cells.length; ++j) {
    cells[j].addEventListener('click', (e) => {
        setTDStyles(e.target);
    });
}

window.addEventListener('load', () => { currentDate.classList.add('date-clicked');; });