/* globals chrome */
/* exported updateBadge, isEmpty, noCity, dqs, getIcon */

const dqs = (q) => {
  return document.querySelector(q);
};

function isEmpty (s) {
  if (s == null || s === '') { return true; }
  s = s.replace(/^\s+|\s+$/, '');
  if (s.length === 0) { return true; }
  return false;
}

function noCity () {
  const notificationOptions = {
    iconUrl: '48.png',
    type: 'basic',
    title: 'Simple Weather',
    message: `We don't kow where you are. Please go to the options page and set your location`,
    buttons: [
      {
        title: 'Open settings'
      }
    ]
  };

  chrome.notifications.create('swn-noCity', notificationOptions);

  chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
     if (notificationId === 'swn-noCity' && buttonIndex === 0) {
      window.open('settings.html');
      chrome.notifications.clear('swn-noCity');
     }
  });
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
