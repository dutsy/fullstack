let input;
let gets = false; //temp value to help filling the ordered list
let submit = document.getElementById("clear");
document.getElementById("claculate").addEventListener("click", addItem);//clculate main function
document.getElementById("clear").addEventListener("click", clearOrder);//clear canvas
var width = document.getElementById('canvas').width;
var height = document.getElementById('canvas').height;
let volume;
var temp;
//add new canvas
function addItem() {
    document.getElementById("error").innerHTML = "";
    input = document.getElementById("myText").value;
    document.getElementById("myText").value = "";
    //if checkInput is true means input is illegal else legal.
    if (checkInput(input)) {
        return true;
    }
    volume = claculatevolume(input);
    drowcircle(volume);
}

function claculatevolume(input) {
    var volume;
    var radius = input;
    radius = Math.abs(radius);
    volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    volume = volume.toFixed(4);
    document.getElementById('output').innerHTML = volume;
    return volume;
}
//to clear the canvas
function clearOrder() {
    temp.clearRect(0, 0, width, height);
    document.getElementById('output').innerHTML = "";
}

function drowcircle(radius) {
    console.log(volume);
    temp = canvas.getContext('2d');
    if (radius > width / 2) {
        alert("the radius is too big");
    }
    else {
        temp.beginPath();
        temp.arc(500, 500, radius, 0, 2 * Math.PI);
        temp.stroke();
    }
}

//check input if legal
function checkInput(array) {
    function isEmpty(array) {
        return array.trim() == '' || array == null;
        return true;
    }
    if (isEmpty(array)) {
        alertBox.show('Please enter non-empty TODO');
        return true;
    }
    if ((isNaN(array))) {
        alert("enter a number");
        return true;
    }
    return false;
}