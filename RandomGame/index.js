function mainPage(){
  window.location.href = "https://gomida05.github.io"
}

let userChoice = window.confirm("You have 30seconds to guess the random number");
if (userChoice) {
  console.log("User clicked OK (Yes).");
  startTimer()
} else {
  console.log("User clicked Cancel (No).");
}



const answer= Math.round(Math.random() * (100-1+1))
console.log(Math.round(answer))
let attempts= 0;
let guess;

function checkKey(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      play();
    }
}
function play(){
    document.getElementById("ans").textContent= "please enter a valid number"
    guess= document.getElementById("txt") //window.prompt(`Guess a number between ${minNum} - ${maxNum}`)
    guess= Number(guess.value);
    console.log(txt, answer)
    //console.log(typeof guess, guess)

    if (isNaN(guess)) {
        // window.alert("please enter a valid number")
        document.getElementById("ans").textContent= "please enter a valid number"
    }else if(guess< 1 || guess >100){
        document.getElementById("ans").textContent= "Please enter numbers between 0-100."
        // window.alert("please enter a valid number")
    }
    else{
        attempts++;
        if (guess==answer){
            document.getElementById("ans").textContent= `CORRECT! The aswer was ${answer}. It took you ${attempts} attempts`
            let userChoice = window.confirm("Do you want to play more?");
            if (userChoice) {
              console.log("User clicked OK (Yes).");
              startTimer()
              play()
            } else {
              console.log("User clicked Cancel (No).");
            }
        } else if (guess===0) {
            document.getElementById("ans").textContent= "please enter a valid number"
    }
        else if (guess < answer){
            document.getElementById("ans").textContent= "Too Low! try agian!"
            // window.alert("Too Low! try agian!")
        }
        else if (guess > answer){
            document.getElementById("ans").textContent= "Too High! try agian!"
            // window.alert("Too High! try agian!")
        }

    }
}






function startTimer(){
    var countDownDate = new Date().getTime()+30000+2000;
    
    var x = setInterval(function() {
    
      var now = new Date().getTime();
        
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
      // Output the result in an element with id="demo"
      document.getElementById("demo").innerHTML =seconds + "s ";
    
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").textContent = "Time Up!";
      }
    }, 1000);
}