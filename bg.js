function updateBadge() {
	var city=localStorage.weatherLocation;
	if (isEmpty(city)) { return; }
	$.ajax({
		type:'GET',
		url:'http://www.google.com/ig/api?weather='+encodeURIComponent(city),
		dataType:'xml',
		success:function(xml) {
			$(this).find('condition').each(function(){
				$('#weather').attr('title',$(this).attr('data'));
				chrome.browserAction.setTitle({title:$(this).attr('data')+' - '+city});
			});
		}
	});
	setTimeout("updateBadge()",300000);
}
function isEmpty(s) {
	if (s==null||s=="") { return true; }
	s=s.replace(/^\s+|\s+$/,'');
	if (s.length==0) { return true; }
	return false;
}
function noCity() {
	var notification=webkitNotifications.createNotification('http://apps.enji.se/weather/48.png','There is a problem...','We couldn\'t find the city you entered. Go to the settings page and try to add more information to your location (if you have "City" try "City, Country") or try another location near you.');
	notification.show();
}
function updateColor() {
	var c=localStorage.weatherTheme;
	if (isEmpty(c)) { c='11115C'; }
	$('body').css('color','#'+c);
	$('*').css('border-color','#'+c);
}
function fcap(s) { 
	return s.charAt(0).toUpperCase()+s.slice(1);
}
function ctof(s) {
	return Math.round(parseInt(s)*1.8+32);
}
function getIcon(i) {
	switch (i) {
		case 'mostly_cloudy':i='H';break;
		case 'partly_cloudy':i='H';break;
		case 'mostly_sunny':i='H';break;
		case 'cloudy':i='N';break;
		case 'chance_of_snow':i='V';break;
		case 'snow':i='W';break;
		case 'flurries':i='U';break;
		case 'sleet':i='X';break;
		case 'chance_of_rain':i='Q';break;
		case 'chance_of_storm':i='Q';break;
		case 'mist':i='R';break;
		case 'showers':i='R';break;
		case 'rain':i='R';break;
		case 'storm':i='R';break;
		case 'rain_snow':i='X';break;
		case 'thunderstorm':i='0';break;
		case 'fog':i='M';break;
		case 'foggy':i='M';break;
		case 'smoke':i='M';break;
		case 'hazy':i='M';break;
		case 'dusty':i='M';break;
		case 'icy':i='V';break;
		case 'sunny':i='B';break;
	}
	return i;
}