/* globals updateColor, updateBadge, $ */

window.onload = function () {
  $('#my_loc').val(window.localStorage.weatherLocation);
  $('#my_temp').val(window.localStorage.weatherTempVer);
  updateColor();
  $('#my_theme').val(window.localStorage.weatherTheme);
  $('#my_map').attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center=' + window.localStorage.weatherLocation + '&zoom=11&size=409x175&maptype=roadmap&sensor=false');
  updateBadge();
};

window.onclick = function (e) {
  if (e.target.id === 'save') {
    window.localStorage.weatherLocation = $('#my_loc').val();
    window.localStorage.weatherTempVer = $('#my_temp').val();
    window.localStorage.weatherTheme = $('#my_theme').val();
    $('#my_map').attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center=' + window.localStorage.weatherLocation + '&zoom=11&size=409x175&maptype=roadmap&sensor=false');
    /* var notification = webkitNotifications.createNotification('http://apps.enji.se/weather/48.png', 'Woho!', 'Your settings are saved.');
    notification.show(); */
    updateBadge();
    updateColor();
  } else if (e.target.id === 'my_map') {
    window.open('http://maps.google.com/maps?f=q&q=' + window.localStorage.weatherLocation);
  } else if (e.target.id === 'opt') {
    document.location.href = 'dashboard.html';
  } else if (e.target.id === 'reset') {
    window.localStorage.weatherLocation = '';
    window.localStorage.weatherTempVer = 'c';
    window.localStorage.weatherTheme = '';
    document.location.href = 'settings.html';
  }
};
