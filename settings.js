/* globals chrome, $, dqs */

function fillOutLocation (value) {
  window.localStorage.weatherLocation = value;
  dqs('#my_loc').value = value;
  updateMap();
}

function updateMap () {
  dqs('#my_map').src = 'http://maps.googleapis.com/maps/api/staticmap?center=' + window.localStorage.weatherLocation + '&zoom=11&size=409x175&maptype=roadmap&sensor=false';
}

dqs('#find-me-button').addEventListener('click', function () {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      fillOutLocation(`${position.coords.latitude},${position.coords.longitude}`);
    });
  } else {
    window.alert(`We can't find you, sorry.`);
  }
});

window.onload = function () {
  $('#my_loc').val(window.localStorage.weatherLocation || '');
  $('#my_temp').val(window.localStorage.weatherTempVer || 'c');
  $('#my_theme').val(window.localStorage.weatherTheme || '');

  updateMap();
};

window.onclick = function (e) {
  if (e.target.id === 'save') {
    window.localStorage.weatherLocation = $('#my_loc').val();
    window.localStorage.weatherTempVer = $('#my_temp').val() || 'c';
    window.localStorage.weatherTheme = $('#my_theme').val();

    updateMap();

    const notificationOptions = {
      iconUrl: '48.png',
      type: 'basic',
      title: 'Simple Weather',
      message: 'Settings saved.'
    };

    chrome.notifications.create('swn-settingsSaved', notificationOptions);
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
