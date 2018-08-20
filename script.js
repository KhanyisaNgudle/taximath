window.onload = initialise();

var homeIcon;
var sumIcon;
var home;
var sum;

function initialise() {
    document.getElementById('home-ico').addEventListener('click', showHome);
    document.getElementById('sum-ico').addEventListener('click', showSummary);

    homeIcon = document.getElementById('home-ico');
    sumIcon = document.getElementById('sum-ico');
    home = document.getElementById('home');
    sum = document.getElementById('summary');
}

function showHome() {
    home.style.display = 'block';
    sum.style.display = 'none';
    sumIcon.style.color = 'gray';
    homeIcon.style.color = 'dodgerblue';
}

function showSummary() {
    sum.style.display = 'block';
    home.style.display = 'none';
    sumIcon.style.color = 'dodgerblue';
    homeIcon.style.color = 'gray';
    add_comment('', 'TaxiMath', 'gray', 'white', 'front seat');
}

function change_empty_input(fare, amount, passengers)
{
    var i = 0;
    var obj;
    while (i < 3)
    {
        (i == 0) ? obj = fare : obj = obj; 
        (i == 1) ? obj = amount : obj = obj;
        (i == 2) ? obj = passengers : obj = obj;
        if (obj.value.toString().length < 1)
            obj.style.border = "1.5px solid red";
        console.log(obj.value.toString().length);
        i++;
    }
}

function onfocuss(obj){
    obj.style.border = "1px solid lightgray";
    add_comment('', 'TaxiMath', 'gray', 'white', 'front seat');
}
var driver = 0;
function calculate() {
    var fare = document.getElementById('fare');
    var amount = document.getElementById('amount');
    var passengers = document.getElementById('passengers');
    
    if (fare.value.length < 1 || amount.value === null || amount.value === "" || passengers.value == null || passengers.value === ""){
        change_empty_input(fare, amount, passengers);
        add_comment('Can\'t be ', 'empty', 'red', 'white', 'front seat');
        return;
    }

    if (fare.checkValidity() && amount.checkValidity() && passengers.checkValidity()){
        console.log('input validated');
    } 
    else{
        add_comment('input not valid', 'TaxiMath', 'red', 'white', 'front seat');
        console.log('not valid');
        return;
    }
    fare = fare.value;
    amount = amount.value;
    passengers = passengers.value;

    var change = amount - (fare * passengers);
    if (change < 0)
    {
        var per;
        (passengers == 1) ? per = "person" : per = "people";
        add_comment("Not enough money for " + passengers + " " + per + ", short: ", "R"+(change.toFixed(2) * -1), 'red', 'red', 'short');
        clear_inputs();
        return;
    }
    driver += fare * passengers;
    document.getElementById('driver-total').innerHTML = "R" + driver.toFixed(2);
    add_comment("Change is: ", "R"+change.toFixed(2), "rgb(12, 240, 12)", "greenyellow", "change");
    clear_inputs();
}

function add_comment(comment, change, colour, colourH, desc){
    document.getElementById('comment').innerHTML = comment + change;
    document.getElementById('comment').style.color = colour;
    document.getElementById('change').innerHTML = change;
    document.getElementById('change').style.color = colourH;
    document.getElementById('desc').innerHTML = desc;
}

function clear_inputs() {
    document.getElementById('amount').value = "";
    document.getElementById('passengers').value = "";
}

function isNumber(val, k) {
    if (val.value.length >= 5)
    {
        val.value = val.value.substring(0, 5);
        return;
    }

    var ascii = (k.which) ? k.which : k.keyCode;
    var pas = document.getElementById('passengers');
    if (val == pas &&  ascii > 31 &&(ascii < 48 || ascii > 57))
        return false;

    if (val != pas && ascii > 31 && (ascii != 46 &&(ascii < 48 || ascii > 57)))
        return false;
    return true;
}