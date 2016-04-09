/* globals updateColor, updateBadge, isEmpty, ctof, $, getIcon */

window.onload = function () {
  if (!window.localStorage.weatherLocation) {
    noCity();
    return;
  }

  loadWeather();
  updateColor();
  updateBadge();
};

window.onclick = function () {
  window.open('dashboard.html');
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

        if (index === 0 || !$('#content').attr('data-forecast')) {
          $('#content').attr('data-forecast', from);
        }

        $(this).find('temperature').each(function () {
          var temp = $(this).attr('value');

          if (tv === 'f') {
            temp = ctof(temp);
          }

          $('#temp').html(temp + '°' + tv.toUpperCase());
        });

        $(this).find('symbol').each(function () {
          if ($('#content').attr('data-forecast') !== from) return;

          var icon = $(this).attr('id');
          $('#weather').html(getIcon(icon));

          console.debug(icon, getIcon(icon));
        });
      });
    }
  });
}
