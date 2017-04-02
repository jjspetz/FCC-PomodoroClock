$(document).ready(function(){
var current_break = 5;
var current_session = 25;
var stop = false;

// hide show because only start or show should ever be visible
$('#stop').hide();

// sets clock to default time
$('#timer').html(current_session);

// adjust times for break and session
$("#break_plus").click(function(){
  if (current_break < 60) {
    current_break++;
  }
  $("#break_time").html(current_break);
})

$("#break_minus").click(function(){
  if (current_break > 0) {
    current_break--;
  }
  $("#break_time").html(current_break);
})

$("#session_plus").click(function(){
  if (current_session < 60) {
    current_session++;
  }
  $('#session_time').html(current_session);
})

$("#session_minus").click(function(){
  if (current_session > 0) {
    current_session--;
  }
  $('#session_time').html(current_session);
})

// COUNTDOWN LOGIC
// when start is pressed an infinite loop starts alternating between
// session and break count downs.
$('#start').click(function(){
  // hide start button
  $('#start').hide();
  $('#stop').show();

  // declare variables
  var counter;
  stop = false;

  // session time
  function sessionTimer(countdown) {
    // check to see if clock has reached zero
    counter = setInterval(function(){
      if (stop) {
        clearInterval(counter);
      }
      if (countdown == 0) {
        clearInterval(counter);
        $('#timer').html(current_break)
        return loop(false);
      }
      $('#timer').html(countdown);
      countdown--;
  }, 1000);

  }
  // break time
  function breakTimer(countdown) {
    // check to see if clock has reached zero
    counter = setInterval(function(){
      if (stop) {
        clearInterval(counter);
      }
      if (countdown == 0) {
        clearInterval(counter);
        $('#timer').html(current_session)
        return loop(true);
      }
      $('#timer').html(countdown);
      countdown--;
    }, 1000);
  }
  // this loop swicthes in between sessionTimer and breakTimer
  function loop(active) {
    if (!stop) {
      if (active) {
        sessionTimer(current_session-1);
      }
      else {
        breakTimer(current_break-1);
      }
    }
  }
    loop(true);
})

$('#stop').click(function(){
  // kill loop function
  stop = true;

  // replaces stop with start
  $('#stop').hide();
  $('#start').show();

  // figure out how to reset timer
  // conver seconds to minutes
  // pretty up the page
  // add fill to circle

})
});
