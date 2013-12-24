!function(){
	"use strict";

	if (!("__proto__" in {})) return;

	var init = false,
		$banner = $('<div style="cursor: pointer"><div class="ny2013-d1" style="font-size:16px;color:#6699cc"></div><div class="ny2013-d2" style="font-size:14px;color:#ссс"></div></div>'),
		snow = {
			stop : function(){},
			start: function(){}
		},
		play = {
			play : function(){},
			pause: function(){}
		},
		interval;

	$('.b-commersant_banner').after($banner);

	loadScript('http://tuturu.majorov.su/tutuny2013/jrumble.min.js', function(){
		$banner.
			find('.ny2013-d1').html('Tutu.ru настроение').end().
			find('.ny2013-d2').html('Хочу новогоднее настроение!').end().
			jrumble({
				x: 1,
				y: 2,
				rotation: 1,
				speed: 3,
				opacity: true,
				opacityMin: .05
			}).
			hover(
				function(){ $(this).trigger('startRumble') },
				function(){ $(this).trigger('stopRumble') }
			)
	});

	$banner.on('click', function(){
			if (false === init){
				setTimer();
				loadScript('http://tuturu.majorov.su/tutuny2013/snowstorm.js', function(){
					clearInterval(interval);
					nyMessage();
					snow = loadSnow();
					snow.start();
				});
				play = loadPlayer();
				document.body.style.overflow = 'hidden';
			}

			switch (init) {
				case 2:
					init = 3;

					$banner.
						find('.ny2013-d1').html('Tutu.ru поздравляет').end().
						find('.ny2013-d2').html('Вас с наступающими праздниками и желает Вам легкой дороги и хорошего путешествия!');

					snow.stop();
					play.pause();
					break;

				case 1:
					init = 2;
					nyMessage();
					snow.start();
					play.play();
					break;

				case 3:
					window.location.reload();
					break;

				default:
					init = 2;
			}

			return false;
	});

	function nyMessage() {
		$banner.
			find('.ny2013-d1').html('Поздравляем').end().
			find('.ny2013-d2').html('С новым 2014 годом!');
	}

	function setTimer(){
		var i = 10;
		interval = setInterval(function(){
			$banner.find('.ny2013-d2').html('Начинаем через ' + (--i));
			if (i < 0) {
				clearInterval(interval);
				nyMessage();
			}
		}, 1000)
	}

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

		audioElement.setAttribute('src', 'http://tuturu.majorov.su/tutuny2013/fslis.mp3');
		audioElement.setAttribute('preload', 'auto');
		audioElement.setAttribute('loop', 'loop');
		audioElement.load();
		audioElement.play();

		return audioElement;
	}
}();