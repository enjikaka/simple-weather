/* globals $, chrome */
/* exported updateBadge, isEmpty, noCity */

function updateBadge () {
  let location = window.localStorage.weatherLocation;
  if (!location) return;

  location = location.split(',');

  $.ajax({
    type: 'GET',
    url: `http://api.met.no/weatherapi/locationforecast/1.9/?lat=${location[0]};lon=${location[1]}`,
    dataType: 'xml',
    success: function () {
      /*$(this).find('location').each(function () {
        $('#weather').attr('title', $(this).attr('data'));
        chrome.browserAction.setTitle({title: $(this).attr('data') + ' - ' + city});
      });*/
    }
  });

  setTimeout(updateBadge, 300000);
}

function isEmpty (s) {
  if (s == null || s === '') { return true; }
  s = s.replace(/^\s+|\s+$/, '');
  if (s.length === 0) { return true; }
  return false;
}

function noCity () {
  var notification = webkitNotifications.createNotification('http://apps.enji.se/weather/48.png', 'There is a problem...', 'We couldn\'t find the city you entered. Go to the settings page and try to add more information to your location (if you have "City" try "City, Country") or try another location near you.');
  notification.show();
}

function updateColor () {
  return;
  var c = window.localStorage.weatherTheme;
  if (isEmpty(c)) { c = '11115C'; }
  $('body').css('color', '#' + c);
  $('*').css('border-color', '#' + c);
}

function fcap (s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function ctof (s) {
  return Math.round(parseInt(s) * 1.8 + 32);
}

function getIcon (i) {
  switch (i) {
    case 'LightCloud':
    case 'PartlyCloud':
    case 'LightCloud':
      i = 'H';
      break;
    case 'Cloud':
      i = 'N';
      break;
    case 'LightSnowSun':
    case 'SnowSun':
    case 'HeavysnowSun':
      i = 'V';
      break;
    case 'Snow':
    case 'LightSnow':
    case 'HeavySnow':
      i = 'W';
      break;
    case 'LightSleet':
      i = 'U';
      break;
    case 'LightSleet':
    case 'Sleet':
    case 'HeavySleet':
      i = 'X';
      break;
    case 'LightRainSun':
    case 'LightRainThunderSun':
      i = 'Q';
      break;
    case 'LightRain':
    case 'Rain':
    case 'storm':
      i = 'R';
      break;
    case 'rain_snow':
      i = 'X';
      break;
    case 'RainThunder':
      i = '0';
      break;
    case 'Fog':
    case 'smoke':
    case 'hazy':
    case 'dusty':
      i = 'M';
      break;
    case 'icy':
      i = 'V';
      break;
    case 'Sun':
      i = 'B';
      break;
  }
  return i;
}
