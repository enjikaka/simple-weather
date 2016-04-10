/* globals isEmpty, updateColor, updateBadge, ctof, getIcon $ */
window.onload = function () {
  if (!window.localStorage.weatherLocation) {
    $('section').html('We have no idea where you are! You haven\'t set a location yet. Go to the <a href="settings.html" title="Go to settings">settings page</a> and put it in.');
    return;
  }

  loadWeather();
};

window.onclick = function (e) {
  if (e.target.id === 'opt') {
    document.location.href = 'settings.html';
  }
};

function loadWeather () {
  let tv = window.localStorage.weatherTempVer;
  let location = window.localStorage.weatherLocation;

  if (!location) return;

  location = location.split(',');

  $.ajax({
    type: 'GET',
    url: `http://api.met.no/weatherapi/locationforecast/1.9/?lat=${location[0]};lon=${location[1]}`,
    dataType: 'xml',
    success: function (xml) {
      console.debug(xml);
      $(xml).find('[datatype="forecast"]').each(function (index) {
        let from = $(this).attr('from');

        if (index === 0 || !$('.current').attr('data-forecast')) {
          $('.current').attr('data-forecast', from);
        }

        $(this).find('temperature').each(function () {
          var temp = $(this).attr('value');

          if (tv === 'f') {
            temp = ctof(temp);
          }

          $('.current .temp').html(temp + '°' + tv.toUpperCase());
        });

        $(this).find('symbol').each(function (i, e) {
          if ($('.current').attr('data-forecast') !== from) return;

          console.debug(e);
          console.debug($('.current').attr('data-forecast'), from);

          var icon = $(this).attr('id');
          $('.current .icon').html(getIcon(icon));

          console.debug(icon, getIcon(icon));
        });
      });
    }
  });
}

// Copyright © 2012 Jeremy Karlsson hello@enji.se
