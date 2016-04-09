window.onload = function () {
  $('#my_loc').val(localStorage.weatherLocation);
  $('#my_temp').val(localStorage.weatherTempVer);
  updateColor();
  $('#my_theme').val(localStorage.weatherTheme);
  $('#my_map').attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center=' + localStorage.weatherLocation + '&zoom=11&size=409x175&maptype=roadmap&sensor=false');
  updateBadge();
};
window.onclick = function (e) {
  if (e.target.id == 'save') {
    localStorage.weatherLocation = $('#my_loc').val();
    localStorage.weatherTempVer = $('#my_temp').val();
    localStorage.weatherTheme = $('#my_theme').val();
    $('#my_map').attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center=' + localStorage.weatherLocation + '&zoom=11&size=409x175&maptype=roadmap&sensor=false');
    var notification = webkitNotifications.createNotification('http://apps.enji.se/weather/48.png', 'Woho!', 'Your settings are saved.');
    notification.show();
    updateBadge();
    updateColor();
  }
  else if (e.target.id == 'my_map') {window.open('http://maps.google.com/maps?f=q&q=' + localStorage.weatherLocation); }
  else if (e.target.id == 'opt') { document.location.href = 'd.html'; }
  else if (e.target.id == 'reset') {
    localStorage.weatherLocation = '';
    localStorage.weatherTempVer = 'c';
    localStorage.weatherTheme = '';
    document.location.href = 's.html';
  }
};
