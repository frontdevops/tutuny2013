!function(){
	"use strict";

	if (!("__proto__" in {})) return;

	var init = false,
		$banner = $([
				'<div style="cursor: pointer">',
					'<div class="ny2013-d1" style="font-size:16px;color:#6699cc">Tutu.ru ����������</div>',
					'<div class="ny2013-d2" style="font-size:14px;color:#���">���� ����������� ����������!</div>',
				'</div>'
		].join('')),
		play,
		snow = {
			stop: function(){},
			start: function(){}
		};

	$('.b-commersant_banner').after($banner);

	$banner.
		jrumble({
			x: 1,
			y: 2,
			rotation: 1,
			speed: 5,
			opacity: true,
			opacityMin: .05
		}).
		hover(
			function(){ $(this).trigger('startRumble') },
			function(){ $(this).trigger('stopRumble') }
	).
	on('click', function(){
			if (false === init){
				loadScript('snowstorm.js')?>', function(){
					snow = loadSnow();
					snow.start();
				});
				play = loadPlayer();
			}

			switch (init) {
				case 2:
					init = 1;

					$banner.
						find('.ny2013-d1').html('Tutu.ru ����������').end().
						find('.ny2013-d2').html('���� ���! =)');

					snow.stop();
					play.pause();
					break;
				default:
					init = 2;

					$banner.
						find('.ny2013-d1').html('�����������').end().
						find('.ny2013-d2').html('� �����, 2014, �����!');

					snow.start();
					play.play();
			}

			return false;
	});

	function loadScript(src, cb){
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = src;
		script.onload = cb;
		document.querySelector('head').appendChild(script);
	}

	function loadSnow() {
		return new window.SnowStorm()
	}

	function loadPlayer() {
		var audioElement = document.createElement('audio');

		audioElement.setAttribute('src', 'http://tuturu.majorov.su/fslis.mp3');
		audioElement.setAttribute('loop', 'loop');
		audioElement.load();
		audioElement.play();

		return audioElement;
	}
}();