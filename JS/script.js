$(document).ready(function(){
var current_break = 5;
var current_session = 25;

// adjust times for break and session
$("#break_plus").click(function(){
  current_break++;
  $("#break_time").html(current_break);
})

$("#break_minus").click(function(){
  current_break--;
  $("#break_time").html(current_break);
})

$("#session_plus").click(function(){
  current_session++;
  $('#session_time').html(current_session);
})

$("#session_minus").click(function(){
  current_session--;
  $('#session_time').html(current_session);
})

// manipulates the clock circle
var s_minutes = current_session;
var b_minutes = current_break;


});
