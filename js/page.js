$(document).ready(function () {
  //Disable auto scroll if the browser supports it.
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  $('.container').mouseenter(function () {
    $('.container').animate({ 'background-color': 'rgba(250, 250, 250, 0.95)' }, 250);
  }).mouseleave(function () {
    $('.container').animate({ 'background-color': 'rgba(250, 250, 250, 0.9)' }, 250);
  });

  $('[data-toggle="tooltip"]').tooltip({placement: "bottom"});

});

$(window).bind("load", function () {
  $('#content-cover').fadeToggle(1000);
});

