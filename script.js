function change_empty_input(fare, amount, passengers)
{
    var i = 0;
    var obj;
    while (i < 3)
    {
        (i == 0) ? obj = fare : obj = obj; 
        (i == 1) ? obj = amount : obj = obj;
        (i == 2) ? obj = passengers : obj = obj;
        if (obj.value == null || obj.value =="")
            obj.style.border = "1.5px solid red";
        i++;
    }
}

function onfocuss(obj){
    obj.style.border = "1px solid lightgray";
    add_comment('', 'TaxiMath', 'gray', 'white', 'front seat');
}

function calculate() {
    var fare = document.getElementById('fare');
    var amount = document.getElementById('amount');
    var passengers = document.getElementById('passengers');
    
    if (fare.value == null || fare.value == "", amount.value == null || amount.value == "", passengers.value == null || passengers.value == ""){
        change_empty_input(fare, amount, passengers);
        add_comment('can\'t be ', 'empty', 'red', 'white', 'front seat');
        clear_inputs();
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
        add_comment("Not enough money for " + passengers + " people, short: ", "R"+(change * -1), 'red', 'red', 'short');
        clear_inputs();
        return;
    }
    add_comment("change is: ", "R"+change, "rgb(12, 240, 12)", "greenyellow", "change");
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
    if (ascii > 31 && (ascii != 46 &&(ascii < 48 || ascii > 57)))
        return false;
    return true;
}