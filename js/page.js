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

  var menuVisible = false;  
  var animateSpeed = 500; 

  $('#menu-button').click(function () {
    if (menuVisible) {
      menuVisible = false;
      $('#content-container').animate({ 'padding-left': '0' }, animateSpeed);
      $('#nav-container').animate({ 'width': '0' }, animateSpeed);
    } else {
      menuVisible = true;
      $('#content-container').animate({ 'padding-left': '300px' }, animateSpeed);
      $('#nav-container').animate({ 'width': '300px' }, animateSpeed);
    }
    
  }); 
});

$(window).bind("load", function () {
  $('#content-cover').fadeToggle(1000);
});

