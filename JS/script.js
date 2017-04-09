$(document).ready(function(){
var current_break = 1;
var current_session = 1;
var stop = false;
var start = false;

// hides alternate buttons
$('#break, #session').hide();

// sets clock to default time
$('#timer').html(displayTime(current_session));

// adjust times for break and session
$("#break_plus").click(function(){
  if (current_break < 59) {
    current_break++;
  }
  $("#break_time").html(current_break);
})

$("#break_minus").click(function(){
  if (current_break > 1) {
    current_break--;
  }
  $("#break_time").html(current_break);
})

$("#session_plus").click(function(){
  if (current_session < 59) {
    current_session++;
  }
  $('#session_time').html(current_session);
  if (!start) {
    $('#timer').html(displayTime(current_session));
  }
})

$("#session_minus").click(function(){
  if (current_session > 1) {
    current_session--;
  }
  $('#session_time').html(current_session);
  if (!start) {
    $('#timer').html(displayTime(current_session));
  }
})

// COUNTDOWN LOGIC
// when start is pressed an infinite loop starts alternating between
// session and break count downs.
$('#start').click(function(){

  // declare variables
  var counter;
  var min;
  var sec;
  stop = false;
  start = true;

  // session time
  function sessionTimer(countdown) {
    // start clock hand moving
    $('#invisible-clock').css("animation",  "countdown "+ (countdown + 1) +"s linear infinite reverse");
    // displays "session" inside clock
    $('#session').show();
    $('#break, #start').hide();
    // check to see if stop has been pressed
    counter = setInterval(function(){
      if (stop) {
        clearInterval(counter);
        return loop(3);
      }
      // check to see if clock has reached zero
      if (countdown == 0) {
        clearInterval(counter);
        $('#timer').html(displayTime(current_break));
        return loop(2);
      }
      $('#timer').html(displayTime(countdown/60));
      countdown--;
  }, 1000);

  }
  // break time
  function breakTimer(countdown) {
    // start clock hand moving
    $('#invisible-clock').css("animation",  "countdown "+ (countdown + 1) +"s linear infinite reverse");
    // displays "break" in the clock
    $('#break').show();
    $('#session, #start').hide();
    counter = setInterval(function(){
      if (stop) {
        clearInterval(counter);
        return loop(3);
      }
      // check to see if clock has reached zero
      if (countdown == 0) {
        clearInterval(counter);
        $('#timer').html(displayTime(current_session));
        return loop(1);
      }
      $('#timer').html(displayTime(countdown/60));
      countdown--;
    }, 1000);
  }
  // this loop swicthes in between sessionTimer, breakTimer, and break
  function loop(path) {
    if (path == 1) {
      displayTime(current_session)
      sessionTimer(current_session * 60 - 1);
    }
    else if (path == 2) {
      displayTime(current_break)
      breakTimer(current_break * 60 - 1);
    }
    else {
      $('#timer').html(displayTime(current_session));
    }
  }

    // starts the infinite loop on session countdown
    loop(1);
})

// hands what happens when stop is clicked
$('#session, #break').click(function(){
  // kill loop function
  stop = true;
  start = false;

  // hides break and session
  $('#session, #break').hide();
  $('#start').show();

  // resets clock hand
  $('#invisible-clock').css("animation",  "none");
})

function displayTime(time) {
  //calculates and formats time
  time = Math.round(time * 60);
  min = Math.floor(time / 60);
  sec = String("0" + (time % 60)).slice(-2);

  return "<div>" + min + ":" + sec + "</div>";
}
});
