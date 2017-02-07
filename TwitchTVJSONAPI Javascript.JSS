var twitchUsers =  ["Sincerelylyn","pokimane","Yuukinachan","nl_Kripparian", "brunofin", "comster404","kuuwhip","arcwerd","explicitLi","kynetiq"];

var onlineStatus = [];
var channelURL = [];
var channelName = [];
var logo = [];
var nowPlaying = [];


function twitchStreams(i) {
	$.ajax({
		type: 'GET',
		url: 'https://wind-bow.gomix.me/twitch-api/streams/' + twitchUsers[i]  + '?callback=?',
		dataType: 'jsonp',
		success: function(result) {

			if (result.stream === null) {
				nowPlaying[i] = "----";
				onlineStatus[i] = "offline";
			} else if (result.stream === undefined) {
				nowPlaying[i] = "Account Closed";
				onlineStatus[i] = "offline";
			} else {
				nowPlaying[i] = result.stream.game;
				onlineStatus[i] = "online";
			};
			//console.log(onlineStatus[i] + ' streams ' + i);
		}
	});
}


function twitchChannels(i) {
	$.ajax({
		type: 'GET',
		url: 'https://wind-bow.gomix.me/twitch-api/channels/' + twitchUsers[i]  + '?callback=?',
		dataType: 'jsonp',
		success: function(data) {
			//console.log(onlineStatus[i] + ' onlineStatus ' + i);
			channelURL[i] = data.url;

			if (data.display_name != undefined){
				channelName[i] = data.display_name;
				logo[i] = data.logo;
			}else{
				channelName[i] = twitchUsers[i];
				nowPlaying[i] = "<strong style='color: red;'>Account Closed</strong>";
				logo[i] = "http://3.bp.blogspot.com/-OTIH2HfAGXo/TkNDhucUSzI/AAAAAAAAASo/xo8_lMbNmlg/s1600/prohibido.png";
			}

			$("ul").append('<a class="well list-anchor drop-shadow" target="_blank" href="' +
										 channelURL[i] + '">' + '<li><h3><img  src="' +
										 logo[i] + '" alt="Twitch.tv Status Viewer by SpoonerTuner.com" height="42" width="42">&nbsp;&nbsp;&nbsp;'  +
										 channelName[i] + '</h3><h6>' +
										 nowPlaying[i] + '</h6>' + '<div>' +
									 onlineStatus[i] + '</div></li></a>'
										);
		}
	});
}


function twitchTVinfo() {
	for (var i=0; i < twitchUsers.length; ++i) {
		twitchStreams(i);
	}
	setTimeout(function(){
		for (var i=0; i < twitchUsers.length; ++i) {
			twitchChannels(i)
		}},700);
}


$(document).ready(function() {
	$("#getResult").on("click", function() {
		$("ul").empty();
		twitchTVinfo();

	});
});
