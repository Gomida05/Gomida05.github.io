textBoxr=document.getElementById("textBox");
toTempId=document.getElementById("toTempId");
toCelr=document.getElementById("form");
temp=0;
function checkKey(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      convert();
    }
}
function mainPage(){
    // go back to main page
    window.location.href = "https://gomida05.github.io/";
}

function convert() {
    if (toTempId.checked) {
        temp= Number(textBoxr.value);
        temp=temp* 9 / 5 + 32;
        document.getElementById("result").textContent= temp.toFixed(1)+"°F";
        
    }else if(toCelr.checked) {
        temp= Number(textBoxr.value);
        temp=(temp- 32)* (5 / 9);
        document.getElementById("result").textContent= temp.toFixed(1)+"°C";
    }
    else {
        document.getElementById("result").textContent= "Please Select a unit";
    }
}
