var protocol_begin = function()
{
	/* IOS fixes for touch */
	document.addEventListener("touchstart", function() {},false);



	var socket = io();
	var my_player_id = null;

	//socket.emit('player message', $('#message').val());
	//

	var click_start = ((document.ontouchstart!==null)?'mousedown':'touchstart');
	var click_end   = ((document.ontouchend!==null)?'mouseup':'touchend');

	$('#key').on(click_start, function()
	{
		$('#tone').get(0).play();
	});

	$('#key').on(click_end, function()
	{
		$('#tone').get(0).pause();
	});

	socket.on('disconnect', function()
	{
		$('#messages').html('');
	});

	socket.on('connect', function()
	{
		my_player_id = socket.id;
	});

	socket.on('player remove', function(player)
	{
		var player_element = "#"+player;
		$(player_element).remove();
	});

	socket.on('broadcast player message', function(player, message)
	{
		var player_element = "#"+player;
		var player_image = "http://www.gravatar.com/avatar/"+md5(player)+"?d=retro&f=y&s=64";
		var player_html  = "<div class='box'><img src='"+player_image+"'></div> "+"<div class='box' style='background-color:"+message+";'>&nbsp;</div><div class='clear'></div>";

		if($(player_element).length > 0)
		{
			$(player_element).html(player_html);
		}
		else
		{
			$('#messages').append($('<li id='+player+'>').html(player_html));
		}
	});
};
