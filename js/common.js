$(document).ready(function(){

// Window Scroll - (header, banners)
$(window).scroll(function () {
	var bodyHeight = $('.wrapper').height();
	var foot = $('.footer').height();
	var WindowHeight = $(window).height();
	var heightTop = $(document).scrollTop();

	if (heightTop >= 220) {
	  $('.header').addClass('is-fixed');
		$('.location-wrap').css('margin-top','10px');
		$('.location-wrap').css('padding-top','10px');
		$('.search-city').css('display','none');
	} else {
	  $('.header').removeClass('is-fixed');
		$('.location-wrap').css('margin-top','-1px');
		$('.location-wrap').css('padding-top','0px');
	}

	if(heightTop >= 470){
		$('.body-branding .banner-1').css('position','fixed');
		$('.body-branding .banner-1').css('top','45px');
	}
	else{
		$('.body-branding .banner-1').css('position','absolute');
		$('.body-branding .banner-1').css('top','519px');
	}

	if(heightTop > bodyHeight-foot*2.3){
		$('.body-branding .banner-1').css('position','absolute');
		$('.body-branding .banner-1').css('top','auto');
		$('.body-branding .banner-1').css('bottom',foot-295);
		$('.service-1').css({'position':'absolute','top':'auto','bottom':foot+50});
		$('.service-2').css({'position':'absolute','top':'auto','bottom':foot-295});
	}else{
		$('.service-1').css({'position':'fixed','bottom':'auto','top': '50px'});
		$('.service-2').css({'position':'fixed','bottom':'auto','top': '400px'});
	}

	if(heightTop > 600){
		$('.arrow-to-top').css('display','block');
	}
	else{
		$('.arrow-to-top').hide();
	}
});

//банера
	$('.close-banner').on('click', function(){
		$(".banner-top").hide();
	});
	$('.close-banner-fix').on('click', function(){
		$(this).parent().hide();
	});

// Selectric
	$('.selecters').selectric();

//навигацыя по сайту
 	$(".arrow-to-top a").mPageScroll2id({
	  scrollSpeed: 900,
	  offset: 60
	});

//Main Nav
	$('.nav-tabs li').on('click', function(){
		$(".nav-tabs li").removeClass('is-active');
		$(this).addClass('is-active');
	});

// nav close button
	$('.nav-close-btn').on('click', function(){
		$(this).parents(".tab-pane").removeClass("active");
		$(".nav-tabs li").removeClass('is-active');
	});

// Поиск города
	$('#cityBox').keyup(function(){
		var city = $(this);
		var cityVal = city.val();
		var citylength = cityVal.length;
				//big first latter
				cityVal = cityVal.charAt(0).toUpperCase() + cityVal.substr(1)
				city.val(cityVal);
				//start block
				if(citylength >= 1){
					$('.region-wrap').hide();
					$('.find-city').show();
				}else{
					$('.region-wrap').show();
					$('.find-city').hide();
				}
				//find city
				$('.city-list li').each(function(){
					var cityList = $(this).html();
					var colCitySrc = cityList.slice(0, citylength);
					if(cityVal === colCitySrc) {
						$('.find-city').empty();
						$('.find-city').append('<li>'+ $(this).html() +'</li>')
					}
				});
				$('.find-city li').on('click', function(){
					$('#cityCurrent').val($(this).text()).siblings('.clear-input').show();
					$('.location-wrap').hide();
					$('.location-wrap input').val('');
					$('.location-wrap .clear-input').hide();
					$(".find-city").hide();
					$('.region-wrap').show();
				});	
			});

//Телефон в форме 
	if($('#advertPhone').length != 0){
			document.getElementById("advertPhone").onkeypress= function(event){
				event= event || window.event;
				if (event.charCode && (event.charCode < 48 || event.charCode > 57))
					return false;
			}
			$('#advertPhone').keyup(function(){
				var thisTel = $(this);
				var tel = thisTel.val();
				var lengthTel = tel.length;
				if(lengthTel === 3 || lengthTel === 7 || lengthTel === 10 || lengthTel === 18 || lengthTel === 22 || lengthTel === 25){
					var numbTel = tel;
					thisTel.val( numbTel+' ');
					return false;
				}
				if(lengthTel === 13 || lengthTel === 28){
					var numbTel = tel;
					thisTel.val( numbTel+', ');
					return false;
				}
			})
		}	

// Show phone number "advert-page"
		$('.show-number').on('click', function(){
			var authorPhone = $(this).parent().find('.author-phone').attr('data-phone');
			$(this).parent().find('.author-phone').text(authorPhone);
			 authorPhone = $(this).parent().find('.author-phone').html();
			var strPhone = authorPhone;
			if (strPhone.length > 15) authorPhone = authorPhone.slice(0, 15) + '<br>' + authorPhone.slice(-14);
			$(this).parent().find('.author-phone').html(authorPhone);
		});

//check all list "my-order"
	$('.ad-is-date .check-all input').on('ifChanged', function(){
		if($('.ad-is-date .icheckbox_square-orange').hasClass('checked')){
			$('.ad-is-data .icheckbox_square-orange').removeClass('checked');
		}
		else{
			$('.ad-is-data .icheckbox_square-orange').addClass('checked');
		}
	});

//add active "help-page"
	$('.help-aside .nav>li>a').click(function(){
		$('.help-aside .nav>li').removeClass('is-active');
		$(this).parent().addClass('is-active');
	});

// Validation
	$.validate({
		validateOnBlur : true,
		scrollToTopOnError : false,
		validateOnEvent: true,
		modules: 'security'
	});

// custom checkbox
	$('input').iCheck({
		checkboxClass: 'icheckbox_square-orange',
		radioClass: 'iradio_square-orange',
		increaseArea: '20%' // optional
	});

//Clear placeholder
	$('input,textarea').focus(function(){
		if (!$(this).hasClass('nav-input')) {;
			$(this).data('placeholder',$(this).attr('placeholder'))
			$(this).attr('placeholder','');
		}
	});
	$('input,textarea').blur(function(){
		if (!$(this).hasClass('nav-input')) {;
			$(this).attr('placeholder',$(this).data('placeholder'));
		}
	});

// Панель поиска локации
	
 	//HOVER
	 $('#cityCurrent').hover(function(){
	 	if ($(".location-wrap").css("display") === "block"){
	 		$('.search-city').hide();
	 	}else{
	 		$('.search-city').show();
	 	}
	 });

	// hide location-wrap on outer click
	if ($('.location-wrap').length) {
		$(document).click(function(e) {
			if ( ($(e.target).closest('.location-wrap').length === 0) && ($(e.target).closest('#cityCurrent').length === 0) ) {
				$('.location-wrap').hide();
			}
		});
	}

	//input blur
	$('.header input').blur(function(){
		if ($(this).val()) {
			$(this).siblings('.clear-input').show();
		}else{
			$(this).siblings('.clear-input').hide();
		}
	});

	// clear-input button
	$('.clear-input').on('click', function(){
		$(this).siblings('input').val('');
		$(this).hide();
		return false;
	});

	// location-all button
	$('.location-title-all, .location-title-region').on('click', function(){
		$('#cityCurrent').val($(this).text()).siblings('.clear-input').show();
		$('.location-wrap').hide();
		$('.location-wrap input').val('');
		$('.location-wrap .clear-input').hide();
		$('.region-wrap').show();
		$('.city-wrap').hide();
	});

	// location-title-back button
	$('.location-title-back').on('click', function(){
		$('.city-wrap').hide();
		$('.region-wrap').show();
		$('.location-title-region').hide();
		$(this).hide();
	});

	// location-title-region
	$('.location-title-region').on('click', function(){
		$('.location-title-back').hide();
		$(this).hide();
	});

	// region list
	$('.region-list li').on('click', function(){
		$('.region-wrap').hide();
		var redId = $(this).attr('id');
		$('.city-wrap#'+redId+'').show();
		$('.location-title-region').show();
		$('.location-title-back').show();
	});
	$('.city-list li').on('click', function(){
		$('#cityCurrent').val($(this).text()).siblings('.clear-input').show();
		$('.location-wrap').hide();
		$('.location-wrap input').val('');
		$('.location-wrap .clear-input').hide();
		$('.city-wrap').hide();				
		$('.region-wrap').show();
		$('.location-title-region').hide();
		$('.location-title-back').hide();
	});
	
	$('.exit-location-wrap').click(function(){
		$('.location-wrap').hide();
	});
	$('.search-city .take-searchForm').focus(function(){
		$('.location-wrap').show();
		$('.search-city').hide();
	});
	$('.take-city').click(function(){
		$('#cityCurrent').val($(this).text()).siblings('.clear-input').show();
		$('.search-city').hide();
	});
	$('.search-city .close-city').click(function(){
		$('.search-city').hide();
	});

// noticeisement Slider

	// FIX fancybox clones
	var indexMax = 0,
		indexCurrent,
		indexMark;
	$('.notice-slider').on('init', function(event, slick){

		$('.notice-slider .slick-slide').each(function(){
			indexCurrent = parseInt($(this).attr('data-slick-index'));
			if (indexCurrent > indexMax) {
				indexMax = indexCurrent;
			}
		});
		indexMax -= 5;

		$('.notice-slider .slick-slide.slick-active').each(function(){
			$(this).find('.notice-fancybox').attr('data-fancybox-group', 'notice-gallery');
		});

		$('.notice-slider .slick-slide').each(function(){
			if (($(this).attr('data-slick-index') >= 0) && ($(this).attr('data-slick-index') <= indexMax)) {
				$(this).find('.notice-fancybox').attr('data-fancybox-group', 'notice-gallery');
			}
		});
	});
	$('.notice-slider').on('afterChange', function(event, slick, currentSlider){
		$('.notice-slider .slick-active').each(function(){
			$(this).find('.notice-fancybox').attr('data-fancybox-group', 'notice-gallery');
		});
		$('.notice-slider .slick-cloned.slick-active').each(function(){
			$(this).find('.notice-fancybox').attr('data-fancybox-group', 'notice-gallery');
			indexMark = parseInt($(this).attr('data-slick-index'));
			indexMark -= indexMax + 1;
			$('.notice-slider .slick-slide').each(function(){
				if (parseInt($(this).attr('data-slick-index')) == indexMark) {
					$(this).find('.notice-fancybox').attr('data-fancybox-group', '');
				}
			});
		});
	});

// slider
	$('.notice-slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 2000,
		slidesToShow: 5,
		slidesToScroll: 2,
		dots: false
	});

// notice fancybox
	$('.notice-fancybox').fancybox({
		maxHeight: '70%',
		theme: 'light',
		padding: 5,
		openEffect	: 'drop',
		closeEffect	: 'drop',
		prevEffect: 'none',
		nextEffect: 'none',
		caption : {
			type : 'outside'
		},
		helpers: {
			thumbs: true
		},
		locked: true,
		locale: 'ru',
		locales: {
			'ru': {
				CLOSE: 'закрыть',
				NEXT: 'вперед',
				PREV: 'назад',
				EXPAND: 'показать в полном размере'
			}
		},
		beforeShow: function(){
			wh = $(window).height()/this.height;
			ww = $(window).width()/this.width;
			if (wh<ww) {
				this.height = this.height*wh;
				this.width = this.width*wh;
			} else {
				this.height = this.height*ww;
				this.width = this.width*ww;
			}
		}
	});

// calculator
	$('.payment-list input').on('ifChecked', function(){
		$(this).parents('.payment-list .payment-item').addClass('is-active');
		var _totalPrice = 0;
		if ($('.paytype-list .paytype-item.is-active').length) {
			$('.paytype-container button[type="submit"]').show();
		}
		$(this).parents('.payment-list').find('.payment-item.is-active').each(function(){
			_totalPrice += parseInt($(this).find('.field-price').find('span').text());
		});
		$('.paytype-total .total-number').text(_totalPrice);
	});

	$('.payment-list input').on('ifUnchecked', function(){
		$(this).parents('.payment-list .payment-item').removeClass('is-active');
	});

	$('.paytype-list input').on('ifChecked', function(){
		$(this).parents('.paytype-list .col-xs-3').siblings('.col-xs-3').find('input').iCheck('uncheck');
		$(this).parents('.paytype-list .paytype-item').addClass('is-active');
	});
	$('.paytype-list input').on('ifUnchecked', function(){
		$(this).parents('.paytype-list .paytype-item').removeClass('is-active');
	});

// Payment checkbox
	$('.paytype-list input, .payment-list input').on('ifChanged', function(){
		setTimeout(function(){
			if ($('.paytype-list .paytype-item.is-active').length && $('.payment-list .payment-item.is-active').length) {
				$('.paytype-container .paybutton').show();
			} else {
				$('.paytype-container .paybutton').hide();
			}
			},1);
	});

// reset
	$('.paytype-container .reset').on('click', function(){
		$('.payment-list input').each(function(){
			$(this).iCheck('uncheck');
		});
		$('.paytype-list .paytype-item.is-active input').iCheck('uncheck');
		return false;
	});

// show/hide regions map button
		$('.regions-title button').on('click', function(){
				$(this).toggleClass('is-active');
			if ($(this).hasClass('is-active')) {
				$(this).text("скрыть").append('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
				
			} else {
				$(this).text("показать все").append('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
			}
		});

// altertanive unload file
	$('.alternativ-but span').on('click',function(){
		$('.photoload').addClass("alternativ-load");
		$('.photoload-el').hide();
		$('.photoload-in input[type="file"]').show();
		$(this).parent().hide();
	});

//selectric
	var placeText = $('.selects').attr('textPlace');
	  $(".selects1").select2( { placeholder: "укажите Область"});
	 	$(".selects2").select2( { placeholder: 'укажите Город'});

});

// fixed notice aside
	$(window).load(function(){
		if ($('.notice-el').length) {
			noticeStart = $('.notice-el').offset().top - 2;
			noticeStop = $('.notice-wrap').height() + noticeStart - $('.notice-el').height() + $('.notice-el-map').outerHeight();
			$(window).scroll(function(){
				if (($(document).scrollTop() >= noticeStart) && ($(document).scrollTop() < noticeStop)) {
					$('.notice-el').addClass('is-fixed');
				} else {
					$('.notice-el').removeClass('is-fixed');
				}
				if ($(document).scrollTop() >= noticeStart) {
					$('.notice-el-map').slideUp();
				} else {
					$('.notice-el-map').slideDown();
				}
				if ($(document).scrollTop() >= noticeStop) {
					$('.notice-el').css({
						'top': 'auto',
						'bottom': '50px',
						'right': '0'
					}).addClass('is-active');
				} else {
					$('.notice-el').css({
						'top': '0',
						'bottom': 'auto',
						'right': 'auto'
					}).removeClass('is-active');
					$('.notice-el.is-fixed').css('top', '60px');
				}
			});
		}
	});
