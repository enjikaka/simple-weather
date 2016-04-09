/* globals updateColor, updateBadge, isEmpty, chrome, noCity, $, getIcon */

window.onload = function () {
  if (isEmpty(window.localStorage.weatherLocation)) {
    window.close();
    window.open('settings.html');
  }
  loadWeather();
  updateColor();
  updateBadge();
};

window.onclick = function () {
  window.open('dashboard.html');
};

function loadWeather () {
  var city = window.localStorage.weatherLocation;
  var tv = window.localStorage.weatherTempVer;

  $.ajax({
    type: 'GET',
    url: 'http://www.google.com/ig/api?weather=' + encodeURIComponent(city),
    dataType: 'xml',
    success: function (xml) {
      $(xml).find('problem_cause').each(function () {
        noCity();

        return;
      });

      $(xml).find('current_conditions').each(function () {
        $(this).find('condition').each(function () {
          $('#weather').attr('title', $(this).attr('data'));
          chrome.browserAction.setTitle({title: $(this).attr('data') + ' - ' + city});
        });

        $(this).find('temp_' + tv).each(function () {
          $('#temp').html($(this).attr('data') + '°' + tv.toUpperCase());
        });

        $(this).find('icon').each(function () {
          var icon = $(this).attr('data');

          icon = icon.split('/');
          icon = icon[icon.length - 1];
          icon = icon.split('.');
          icon = icon[0];
          icon = icon.toLowerCase();

          $('#weather').html(getIcon(icon));
        });
      });

      $('#city').html(city);
      updateBadge();
    }
  });
}
