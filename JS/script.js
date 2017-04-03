$(document).ready(function(){
var current_break = 5;
var current_session = 25;
var stop = false;

// hide show because only start or show should ever be visible
$('#stop, #break, #session').hide();

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
})

$("#session_minus").click(function(){
  if (current_session > 1) {
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
  var min;
  var sec;
  stop = false;

  // session time
  function sessionTimer(countdown) {
    $('#session').show();
    $('#break, #filler').hide();
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
    $('#break').show();
    $('#session, #filler').hide();
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

$('#stop').click(function(){
  // kill loop function
  stop = true;

  // replaces stop with start
  $('#stop').hide();
  $('#start').show();
  // hides break and session
  $('#session, #break').hide();
  $('#filler').show();
})

function displayTime(time) {
  //calculates and formats time
  time = time * 60;
  min = Math.floor(time / 60);
  sec = String("0" + (time % 60)).slice(-2);

  return "<div>" + min + ":" + sec + "</div>";
}

  // add sound
  // pretty up the page
  // add fill to circle

});
