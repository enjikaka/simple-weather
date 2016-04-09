/* globals isEmpty, updateColor, updateBadge, noCity, ctof, getIcon, fcap $ */
window.onload = function () {
  if (isEmpty(window.localStorage.weatherLocation)) {
    $('section').html('We have no idea where you are! You haven\'t set a location yet. Go to the <a href="s.html" title="Go to settings">settings page</a> and put it in.');
    return;
  }

  updateColor();
  updateBadge();
  loadWeather();
};

window.onclick = function (e) {
  if (e.target.id === 'opt') {
    document.location.href = 's.html';
  }
};

function loadWeather () {
  var city = window.localStorage.weatherLocation;
  var tv = window.localStorage.weatherTempVer;

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

  /*$.ajax({
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
          $('.current .info').html($(this).attr('data'));
        });

        $(this).find('icon').each(function () {
          var icon = $(this).attr('data');
          icon = icon.split('/');
          icon = icon[icon.length - 1];
          icon = icon.split('.');
          icon = icon[0];
          icon = icon.toLowerCase();
          $('.current .icon').html(getIcon(icon));
        });
      });

      $(xml).find('forecast_conditions').each(function () {
        var thisid;

        $(this).find('day_of_week').each(function () {
          $('.forecasts').append('<article class="forecast_' + $(this).attr('data') + '"><h3>' + fcap($(this).attr('data')) + '</h3><span class="icon">N</span><span class="temp">11</span><span class="info">Mulet</span></article>');
          thisid = $(this).attr('data');
        });

        var h = 0;
        var l = 0;

        $(this).find('high').each(function () {
          h = parseInt($(this).attr('data'), 10);
        });

        $(this).find('low').each(function () {
          l = parseInt($(this).attr('data'), 10);
        });

        var temp = Math.round((l + h) / 2);

        if (tv === 'f') temp = ctof(temp);

        $('.forecast_' + thisid + ' .temp').html(temp + '°' + tv.toUpperCase());

        $(this).find('icon').each(function () {
          var icon = $(this).attr('data');
          icon = icon.split('/');
          icon = icon[icon.length - 1];
          icon = icon.split('.');
          icon = icon[0];
          icon = icon.toLowerCase();
          $('.forecast_' + thisid + ' .icon').html(getIcon(icon));
        });

        $(this).find('condition').each(function () {
          $('.forecast_' + thisid + ' .info').html($(this).attr('data'));
        });
      });

      $('#city').html(city);
      $('#current').html('Now');
    }
  });*/
}

// Copyright © 2012 Jeremy Karlsson hello@enji.se
