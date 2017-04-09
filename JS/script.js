$(document).ready(function(){
var current_break = 5;
var current_session = 25;
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
  stop = false;
  start = true;

  // session time
  function sessionTimer(countdown) {

    /*******************************
    * RESET AND STARTS CLOCK HAND FOR EACH NEW SESSION
    * The invisble-clock dive is created and then distroyed each time in order to
    * fully stop and restart the animation. Without it the hand jumped around on
    * start of new session.
    * The "hand rotates around the clock once per sesssion time.
    ********************************/
    $('#inv-clo-con').html('<div id="invisible-clock"><div id="hand"></div><div id="hand2"></div></div>');
    $('#invisible-clock').css("animation",  "countdown "+ (countdown + 1) +"s linear infinite reverse");

    // displays "session" inside clock
    $('#session').show();
    $('#break, #start').hide();

    /*********
    *  sets an interval of one second.
    *  The code runs every second counting down from the user inputed session time and displays the remaining time
    *  When time remaining (var countdown) reaches 0 the loop is broken and a breaktime loop begins
    ***********/
    counter = setInterval(function(){

      // check to see if "stop" button has been pressed if so infinite loop is broken
      if (stop) {
        clearInterval(counter);
        return loop(3);
      }
      // check to see if clock has reached zero
      if (countdown == 0) {
        $('#inv-clo-con').html(); // deletes all divs inside this container to elemenate any time bleed
        clearInterval(counter);
        $('#timer').html(displayTime(current_break)); // displays the time for breaks
        return loop(2); // switches infinite loop to display and countdown break time
      }
      $('#timer').html(displayTime(countdown/60)); // displays current time (formated in minutes)
      countdown--;
  }, 1000);

  }
  // break time functions similarly to session time
  // but takes the user inputed length of breaks
  function breakTimer(countdown) {
    // start clock hand moving
    $('#inv-clo-con').html('<div id="invisible-clock"><div id="hand"></div><div id="hand2"></div></div>');
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
        $('#inv-clo-con').html()
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
      displayTime(current_session);
      sessionTimer(current_session * 60 - 1);
    }
    else if (path == 2) {
      displayTime(current_break);
      breakTimer(current_break * 60 - 1);
    }
    else {
      $('#timer').html(displayTime(current_session));
    }
  }

    // starts the infinite loop on session countdown
    loop(1);
})

// hands what happens when "stop" is clicked
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
