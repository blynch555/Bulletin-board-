$(document).ready(function(){
	// Active zone
		$('.form-input.nav-input.mask-input').each(function(){
			if($(this).val() != ''){
				var textVal = $(this).val();
				$(this).parent().find('.nav-menu').append('<li><a class="active-cat" href="javascript:void(0);"><span>'+textVal+'</span></a></li>');

				$(this).parent().find('.active-ct').trigger( "click" );
			}
		});
		setTimeout(function(){
			$('.active-cat').trigger( "click" );
			$('.active-ct').trigger( "click" );
		},500)
		$('.nav-input').keydown(function(){
			if (event.which == 13){
				$(this).trigger("focusout");
			}
		});

// notice's filters
if ($('.multifilters-wrap').length) {

	// multifilters info
	var infoTextDefault = 'пустая подсказка';
	$('.multifilters-in').each(function(){
		$(this).children('.multifilters-info-wrap').find('span').text();
	});
	
	$('.multifilters-info').hover(function(){
		var _infoText = $(this).text();
		$(this).parents('.multifilters-in').children('.multifilters-info-wrap').show().find('span').text(_infoText);
	}, function(){
		$(this).parents('.multifilters-in').children('.multifilters-info-wrap').hide().find('span').text(infoTextDefault);
	});

	function checkOutfiltersHeight() {
		if ($('.outfilters-wrap').css('display') == 'none') {
			// holder
		} else {
			if (170 < $('.outfilters').outerHeight()) {
				$('.all-filter-btn').fadeIn();
			} else {
				$('.all-filter-btn').fadeOut();
			}
		}
	}

	var defaultValues = [];
	var defaultValuesIndex = 0;
	var textIndex = 0;
	// fill array
	$('.nav-btn').each(function(){
		defaultValues[defaultValuesIndex] = $(this).children('span').text();
		defaultValuesIndex++;
	});

	// fill data-mask-text nav-menu
	$('.multifilters-input .nav-menu li').each(function(){
		if ( ($(this).parents('.nav-menu').siblings('.nav-btn').attr('data-mask-text') !== undefined) && ($(this).parents('.nav-menu').siblings('.nav-btn').attr('data-mask-text') !== false) ) {
			if ($(this).index() != 0) {
				$(this).find('span').before($(this).parents('.nav-menu').siblings('.nav-btn').attr('data-mask-text') + ' ');
			}
		}
	});

	// fill select
		$('.multifilters-select .nav-menu li:first-child').addClass('is-active');

	// fill checkbox
		$('.multifilters-checkbox .nav-menu li:first-child input').on('ifCreated', function(){
			$(this).iCheck('check');
		});

	// click button - show nav
	$('.nav-btn').on('click', function(){
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		if ($(this).hasClass('is-active')) {
			$(this).removeClass('is-active').siblings('.nav-menu').hide();
		} else {
			$(this).addClass('is-active').siblings('.nav-menu').show();
			$(this).parents('.multifilters-in').siblings('li').children('.nav-btn').removeClass('is-active').siblings('.nav-menu').hide();
		}
		return false;
	});

	// click input - show nav
	$('.multifilters-input .nav-btn').on('click', function(){
		var _this = $(this).siblings('.nav-input');
		var _indMask = false;
		_this.show().focus();
		_this.siblings('.nav-btn').hide();
		if (_this.hasClass('mask-input')) {
			if (_this.attr('data-mask-character') == 'number') {
				_this.keydown(function(e) {
					{
						if( !(event.keyCode == 8                                // backspace
						|| (event.keyCode >= 48 && event.keyCode <= 57)     // numbers on keyboard
						|| (event.keyCode >= 96 && event.keyCode <= 105))   // number on keypad
						) {
							event.preventDefault();     // Prevent character input
						}
					}
				});
				_this.keyup(function(e) {
					if (_this.val().length) {
						_this.parents('.multifilters-in').addClass('is-active');
						_this.siblings('.clear-filter-btn').show();
					} else {
						_this.parents('.multifilters-in').removeClass('is-active');
						_this.siblings('.clear-filter-btn').hide();
					}
				});
			}
		}
		return false;
		defaultValuesIndex = _this.parents('.multifilters-in').index();
		_this.siblings('.nav-menu').show();
		_this.parents('.multifilters-in').siblings('li').children('.nav-btn').removeClass('is-active').siblings('.nav-menu').hide();
	});

	// input focusOut
	$('.multifilters-input .nav-input').focusout(function(event){
		var _indCategory = false;
		var _indOutfilters = $('.outfilters-in').length;
		var _this = $(this);
		if (_this.val().length) {
			if ( (_this.siblings('.nav-btn').attr('data-mask-text') !== undefined) && (_this.siblings('.nav-btn').attr('data-mask-text') !== false) ) {
				_indMask = true;
				_this.siblings('.nav-btn').children('span').text(_this.siblings('.nav-btn').attr('data-mask-text') + ' ' + _this.val());
				_this.siblings('.clear-filter-btn').show();
			} else {
				_this.siblings('.nav-btn').children('span').text(_this.val());
			}
			// check both
			if (_this.parents('.multifilters-in').hasClass('multifilters-both')) {
				if (_this.parents('.multifilters-in').prev().hasClass('is-active')) {
					if (parseInt(_this.val()) < parseInt(_this.parents('.multifilters-in').prev().find('input').val())) {
						_this.val('');
						_this.siblings('.nav-menu').hide().siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
						_this.siblings('.nav-menu').siblings('.clear-filter-btn').hide();
						_this.parents('.multifilters-in').removeClass('is-active');
						_this.siblings('.nav-menu').find('li').removeClass('is-active');
						_this.siblings('.nav-menu').find('li:first-child').addClass('is-active');
						_this.siblings('.nav-btn').show();
						_this.hide();
						$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]').remove();
						checkOutfiltersHeight();
						return;
					}
				}
			}
			// check both
			if (_this.parents('.multifilters-in').next().hasClass('multifilters-both')) {
				if (_this.parents('.multifilters-in').next().hasClass('is-active')) {
					if (parseInt(_this.val()) > parseInt(_this.parents('.multifilters-in').next().find('input').val())) {
						_this.val('');
						_this.siblings('.nav-menu').hide().siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
						_this.siblings('.nav-menu').siblings('.clear-filter-btn').hide();
						_this.parents('.multifilters-in').removeClass('is-active');
						_this.siblings('.nav-menu').find('li').removeClass('is-active');
						_this.siblings('.nav-menu').find('li:first-child').addClass('is-active');
						_this.siblings('.nav-btn').show();
						_this.hide();
						$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]').remove();
						checkOutfiltersHeight();
						return;
					}
				}
			}
			// outfilters
			if ($('.outfilters-wrap').css('display') == 'none') {
				$('.outfilters-wrap').slideDown();
			}
			$('.outfilters-in').each(function(){
				if ($(this).attr('data-category-index') == defaultValuesIndex) {
					_indCategory = true;
				}
			});
			if (_indCategory) {
				// holder
				$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]')
					.children('.outfilters-list')
					.children('li')
					.attr('data-text-index', textIndex)
					.find('span')
					.text(_this.val());
				if (_indMask) {
					$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"] li span').prepend(_this.siblings('.nav-btn').attr('data-mask-text') + ' ');
				}
			} else {
				var _position = false;
				if (_indOutfilters) {
					$('.outfilters-in').each(function(){
						if (defaultValuesIndex > $(this).attr('data-category-index')) {
							_position = $(this).attr('data-category-index');
						}
					});
					if (_position) {
						$('.outfilters')
							.find('.outfilters-in[data-category-index="'+_position+'"]')
							.after('<li class="outfilters-in" data-category-index="'+defaultValuesIndex+'"></li>')
							.siblings('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]')
							.append('<p class="outfilters-title"></p>')
							.children('.outfilters-title')
							.text(defaultValues[defaultValuesIndex])
							.after('<ul class="outfilters-list"></ul>')
							.siblings('.outfilters-list')
							.append('<li><button class="outfilters-cancel"><i class="fa fa-times" aria-hidden="true"></i></button><span></span></li>')
							.children('li')
							.attr('data-text-index', textIndex)
							.find('span')
							.text(_this.val());
						if (_indMask) {
							$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"] li span').prepend(_this.siblings('.nav-btn').attr('data-mask-text') + ' ');
						}
					} else {
						$('.outfilters')
							.children('.outfilters-in:first-child')
							.before('<li class="outfilters-in" data-category-index="'+defaultValuesIndex+'"></li>')
							.siblings('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]')
							.append('<p class="outfilters-title"></p>')
							.children('.outfilters-title')
							.text(defaultValues[defaultValuesIndex])
							.after('<ul class="outfilters-list"></ul>')
							.siblings('.outfilters-list')
							.append('<li><button class="outfilters-cancel"><i class="fa fa-times" aria-hidden="true"></i></button><span></span></li>')
							.children('li')
							.attr('data-text-index', textIndex)
							.find('span')
							.text(_this.val());
						if (_indMask) {
							$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"] li span').prepend(_this.siblings('.nav-btn').attr('data-mask-text') + ' ');
						}
					}
				} else {
					$('.outfilters')
						.append('<li class="outfilters-in"></li>')
						.children('.outfilters-in')
						.attr('data-category-index', defaultValuesIndex)
						.append('<p class="outfilters-title"></p>')
						.children('.outfilters-title')
						.text(defaultValues[defaultValuesIndex])
						.after('<ul class="outfilters-list"></ul>')
						.siblings('.outfilters-list')
						.append('<li><button class="outfilters-cancel"><i class="fa fa-times" aria-hidden="true"></i></button><span></span></li>')
						.children('li')
						.attr('data-text-index', textIndex)
						.find('span')
						.text(_this.val());
					if (_indMask) {
						$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"] li span').prepend(_this.siblings('.nav-btn').attr('data-mask-text') + ' ');
					}
				}
			}
		} else {
			_this.siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
			// outfilters
			$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]').remove();
				_indOutfilters = $('.outfilters-in').length;
				if (!_indOutfilters) {
					$('.outfilters-wrap').slideUp();
			}
		}
		_this.siblings('.nav-btn').show();
		_this.hide();
		checkOutfiltersHeight();
	});
	
	// category
	$('.multifilters-category .nav-menu li a').on('click', function(){
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		var _indexOption = $(this).parents('.nav-menu > li').index();
		var _chosenValue = $(this).find('span').text();
		if (_indexOption != 0) {
			$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text(_chosenValue);
			$(this).parents('.nav-menu').siblings('.nav-input').val(_chosenValue);
			$(this).parents('.multifilters-in').addClass('is-active');
		} else {
			$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
			$(this).parents('.nav-menu').siblings('.nav-input').val('');
			$(this).parents('.multifilters-in').removeClass('is-active');
		}
		$(this).parents('.multifilters-in').find('li').removeClass('is-active');
		$(this).parentsUntil($('.nav-menu'), 'li').addClass('is-active');
		$('.nav-btn').removeClass('is-active');
		return false;
	});

	// select
	$('.multifilters-select .nav-menu li a').on('click', function(){
		var _indOutfilters = $('.outfilters-in').length;
		var _indCategory = false;
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		textIndex = $(this).parent('li').index();
		var _indexOption = $(this).parents('.nav-menu > li').index();
		var _chosenValue = $(this).find('span').text();
		if (_indexOption != 0) {
			$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text(_chosenValue);
			$(this).parents('.nav-menu').siblings('.nav-input').val(_chosenValue);
			$(this).parents('.nav-menu').siblings('.clear-filter-btn').show();
			$(this).parents('.multifilters-in').addClass('is-active');
			// outfilters
			if ($('.outfilters-wrap').css('display') == 'none') {
				$('.outfilters-wrap').slideDown();
			}
			$('.outfilters-in').each(function(){
				if ($(this).attr('data-category-index') == defaultValuesIndex) {
					_indCategory = true;
				}
			});
			if(_indCategory) {
				$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]')
					.children('.outfilters-list')
					.children('li')
					.attr('data-text-index', textIndex)
					.find('span')
					.text(_chosenValue);
			} else {
				var _position = false;
				if (_indOutfilters) {
					$('.outfilters-in').each(function(){
						if (defaultValuesIndex > $(this).attr('data-category-index')) {
							_position = $(this).attr('data-category-index');
						}
					});
					if (_position) {
						$('.outfilters')
							.find('.outfilters-in[data-category-index="'+_position+'"]')
							.after('<li class="outfilters-in" data-category-index="'+defaultValuesIndex+'"></li>')
							.siblings('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]')
							.append('<p class="outfilters-title"></p>')
							.children('.outfilters-title')
							.text(defaultValues[defaultValuesIndex])
							.after('<ul class="outfilters-list"></ul>')
							.siblings('.outfilters-list')
							.append('<li><button class="outfilters-cancel"><i class="fa fa-times" aria-hidden="true"></i></button><span></span></li>')
							.children('li')
							.attr('data-text-index', textIndex)
							.find('span')
							.text(_chosenValue);
					} else {
						$('.outfilters')
							.children('.outfilters-in:first-child')
							.before('<li class="outfilters-in" data-category-index="'+defaultValuesIndex+'"></li>')
							.siblings('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]')
							.append('<p class="outfilters-title"></p>')
							.children('.outfilters-title')
							.text(defaultValues[defaultValuesIndex])
							.after('<ul class="outfilters-list"></ul>')
							.siblings('.outfilters-list')
							.append('<li><button class="outfilters-cancel"><i class="fa fa-times" aria-hidden="true"></i></button><span></span></li>')
							.children('li')
							.attr('data-text-index', textIndex)
							.find('span')
							.text(_chosenValue);
					}
				} else {
					$('.outfilters')
						.append('<li class="outfilters-in"></li>')
						.children('.outfilters-in')
						.attr('data-category-index', defaultValuesIndex)
						.append('<p class="outfilters-title"></p>')
						.children('.outfilters-title')
						.text(defaultValues[defaultValuesIndex])
						.after('<ul class="outfilters-list"></ul>')
						.siblings('.outfilters-list')
						.append('<li><button class="outfilters-cancel"><i class="fa fa-times" aria-hidden="true"></i></button><span></span></li>')
						.children('li')
						.attr('data-text-index', textIndex)
						.find('span')
						.text(_chosenValue);
				}
			}
		} else {
			$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
			$(this).parents('.nav-menu').siblings('.nav-input').val('');
			$(this).parents('.nav-menu').siblings('.clear-filter-btn').hide();
			$(this).parents('.multifilters-in').removeClass('is-active');
			// outfilters
			$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]').remove();
			_indOutfilters = $('.outfilters-in').length;
			if (!_indOutfilters) {
				$('.outfilters-wrap').slideUp();
			}
		}
		$(this).parents('.multifilters-in').find('li').removeClass('is-active');
		$(this).parentsUntil($('.nav-menu'), 'li').addClass('is-active');
		$('.nav-btn').removeClass('is-active');
		checkOutfiltersHeight();
		return false;
	});
	
	// outfilters cancel buttons
	$('.outfilters').on('click', '.outfilters-cancel', function(){
		var _indOutfilters = true;
		defaultValuesIndex = $(this).parents('.outfilters-in').attr('data-category-index');
		textIndex = $(this).parent('li').attr('data-text-index');
		$(this).parent('li').remove();
		var _indCategoryOut = true;
		_indCategoryOut = $('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]').find('li').length;
		if (!_indCategoryOut) {
			$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]').remove();
		}
		_indOutfilters = $('.outfilters-in').length;
		if (!_indOutfilters) {
			$('.outfilters-wrap').slideUp();
		}
		if ($('.multifilters-in').eq(defaultValuesIndex).hasClass('multifilters-select')) {
			$('.multifilters-in').eq(defaultValuesIndex).children('.nav-input').val('');
			$('.multifilters-in').eq(defaultValuesIndex).children('.clear-filter-btn').hide();
			$('.multifilters-in').eq(defaultValuesIndex).children('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
			$('.multifilters-in').eq(defaultValuesIndex).children('.nav-menu').children('li').removeClass('is-active').eq(0).addClass('is-active');
			$('.multifilters-in').eq(defaultValuesIndex).removeClass('is-active');
		}
		if ($('.multifilters-in').eq(defaultValuesIndex).hasClass('multifilters-checkbox')) {
			$('.multifilters-in').eq(defaultValuesIndex).find('.nav-menu > li').eq(textIndex).find('input').iCheck('uncheck');
		}
		if ($('.multifilters-in').eq(defaultValuesIndex).hasClass('multifilters-input')) {
			$('.multifilters-in').eq(defaultValuesIndex).children('.nav-input').val('');
			$('.multifilters-in').eq(defaultValuesIndex).children('.clear-filter-btn').hide();
			$('.multifilters-in').eq(defaultValuesIndex).children('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
			$('.multifilters-in').eq(defaultValuesIndex).children('.nav-menu').children('li').removeClass('is-active').eq(0).addClass('is-active');
			$('.multifilters-in').eq(defaultValuesIndex).removeClass('is-active');
		}
		checkOutfiltersHeight();
	});

	// checkbox
	$('.multifilters-checkbox .nav-menu li label').on('click', function(){
		$(this).find('input').iCheck('uncheck');
		$(this).parent('li').siblings('li').find('input').iCheck('uncheck');
		$($(this)).parents('.nav-menu').hide();
		$('.nav-btn').removeClass('is-active');
	});

	// checkbox checked
	$('.multifilters-checkbox .nav-menu li input').on('ifChecked', function(){
		var _indOutfilters = $('.outfilters-in').length;
		var _indCategory = false;
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		textIndex = $(this).parents('.nav-menu > li').index();
		var _chosenValue = $(this).parent().siblings('span').text();
		var _parent = $(this).parentsUntil($('.nav-menu'), 'li');
		if (_parent.index() == 0) {
			_parent.siblings('li').find('input').iCheck('uncheck');
			$(this).parents('.nav-menu').siblings('.clear-filter-btn').hide();
			$(this).parents('.multifilters-in').removeClass('is-active');

		} else {
			$(this).parents('.nav-menu').find('li').eq(0).iCheck('uncheck');
			textIndex = $(this).parents('.nav-menu > li').index();
			$(this).parents('.nav-menu').siblings('.clear-filter-btn').show();
			$(this).parents('.multifilters-in').addClass('is-active');
			// outfilters
			if ($('.outfilters-wrap').css('display') == 'none') {
				$('.outfilters-wrap').slideDown();
			}
			$('.outfilters-in').each(function(){
				if ($(this).attr('data-category-index') == defaultValuesIndex) {
					_indCategory = true;
				}
			});
			if(_indCategory) {
				var _positionCheckbox = false;
				$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"] li').each(function(){
					if (textIndex > $(this).attr('data-text-index')) {
						_positionCheckbox = $(this).attr('data-text-index');
					}
				});
				if (_positionCheckbox) {
					$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]')
						.children('.outfilters-list')
						.find('li[data-text-index="'+_positionCheckbox+'"]')
						.after('<li data-text-index="'+textIndex+'"><button class="outfilters-cancel"><i class="fa fa-times" aria-hidden="true"></i></button><span></span></li>')
						.siblings('li[data-text-index="'+textIndex+'"]')
						.find('span')
						.text(_chosenValue);
				} else {
					$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]')
						.children('.outfilters-list')
						.find('li:first-child')
						.before('<li data-text-index="'+textIndex+'"><button class="outfilters-cancel"><i class="fa fa-times" aria-hidden="true"></i></button><span></span></li>')
						.siblings('li[data-text-index="'+textIndex+'"]')
						.find('span')
						.text(_chosenValue);
				}
			} else {
				if (_indOutfilters) {
					var _position = false;
					$('.outfilters-in').each(function(){
						if (defaultValuesIndex > $(this).attr('data-category-index')) {
							_position = $(this).attr('data-category-index');
						}
					});
					if (_position) {
						$('.outfilters')
							.find('.outfilters-in[data-category-index="'+_position+'"]')
							.after('<li class="outfilters-in" data-category-index="'+defaultValuesIndex+'"></li>')
							.siblings('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]')
							.append('<p class="outfilters-title"></p>')
							.children('.outfilters-title')
							.text(defaultValues[defaultValuesIndex])
							.after('<ul class="outfilters-list"></ul>')
							.siblings('.outfilters-list')
							.append('<li><button class="outfilters-cancel"><i class="fa fa-times" aria-hidden="true"></i></button><span></span></li>')
							.children('li')
							.attr('data-text-index', textIndex)
							.find('span')
							.text(_chosenValue);
					} else {
						$('.outfilters')
							.children('.outfilters-in:first-child')
							.before('<li class="outfilters-in" data-category-index="'+defaultValuesIndex+'"></li>')
							.siblings('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]')
							.append('<p class="outfilters-title"></p>')
							.children('.outfilters-title')
							.text(defaultValues[defaultValuesIndex])
							.after('<ul class="outfilters-list"></ul>')
							.siblings('.outfilters-list')
							.append('<li><button class="outfilters-cancel"><i class="fa fa-times" aria-hidden="true"></i></button><span></span></li>')
							.children('li')
							.attr('data-text-index', textIndex)
							.find('span')
							.text(_chosenValue);
					}
				} else {
					$('.outfilters')
						.append('<li class="outfilters-in"></li>')
						.children('.outfilters-in')
						.attr('data-category-index', defaultValuesIndex)
						.append('<p class="outfilters-title"></p>')
						.children('.outfilters-title')
						.text(defaultValues[defaultValuesIndex])
						.after('<ul class="outfilters-list"></ul>')
						.siblings('.outfilters-list')
						.append('<li><button class="outfilters-cancel"><i class="fa fa-times" aria-hidden="true"></i></button><span></span></li>')
						.children('li')
						.attr('data-text-index', textIndex)
						.find('span')
						.text(_chosenValue);
				}
			}
		}
		checkOutfiltersHeight();
	});
		
	// disable checkbox uncheck
	$('.multifilters-checkbox .nav-menu li:first-child input').on('ifClicked', function(){
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		setTimeout(function(){
			$('.multifilters-in').eq(defaultValuesIndex).find('.nav-menu li:first-child input').iCheck('check');
		},1);
	});

	// checkbox unchecked
	$('.multifilters-checkbox .nav-menu li input').on('ifUnchecked', function(){
		var _indCheck = false;
		var _indOutfilters = true;
		textIndex = $(this).parents('.nav-menu > li').index();
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"] li[data-text-index="'+textIndex+'"]').remove();
		setTimeout(function(){
			$('.multifilters-in').eq(defaultValuesIndex).find('label > div').each(function(){
				if ($(this).hasClass('checked')) {
					_indCheck = true;
				}
			});
			if (!_indCheck) {
				$('.multifilters-in').eq(defaultValuesIndex).find('.nav-menu li:first-child input').iCheck('check');
			}
		},1);
		_indCategoryOut = $('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]').find('li').length;
		if (!_indCategoryOut) {
			$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]').remove();
		}
		setTimeout(function(){
		_indOutfilters = $('.outfilters-in').length;
			if (!_indOutfilters) {
				$('.outfilters-wrap').slideUp();
			}
		},1);
		checkOutfiltersHeight();
	});
	
	// input-select
	$('.multifilters-input .nav-menu li a').on('click', function(){
		var _indOutfilters = $('.outfilters-in').length;
		var _indCategory = false;
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		textIndex = $(this).parent('li').index();
		var _indexOption = $(this).parents('.nav-menu > li').index();
		var _chosenValue = $(this).find('span').text();
		var _indMask = false;
		if (_indexOption != 0) {
			if ( ($(this).parents('.nav-menu').siblings('.nav-btn').attr('data-mask-text') !== undefined) && ($(this).parents('.nav-menu').siblings('.nav-btn').attr('data-mask-text') !== false) ) {
				_indMask = true;
				$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text($(this).parents('.nav-menu').hide().siblings('.nav-btn').attr('data-mask-text') + ' ' + _chosenValue);
			} else {
				$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text(_chosenValue);
			}
			$(this).parents('.nav-menu').siblings('.nav-input').val(_chosenValue);
			$(this).parents('.nav-menu').siblings('.clear-filter-btn').show();
			$(this).parents('.multifilters-in').addClass('is-active');
			// check both
			if ($(this).parents('.multifilters-in').hasClass('multifilters-both')) {
				if ($(this).parents('.multifilters-in').prev().hasClass('is-active')) {
					if (parseInt(_chosenValue) < parseInt($(this).parents('.multifilters-in').prev().find('input').val())) {
						$(this).parents('.nav-menu').siblings('.nav-input').val('');
						$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
						$(this).parents('.nav-menu').siblings('.clear-filter-btn').hide();
						$(this).parents('.multifilters-in').removeClass('is-active');
						$(this).parents('.nav-menu').find('li').removeClass('is-active');
						$(this).parents('.nav-menu').find('li:first-child').addClass('is-active');
						$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]').remove();
						checkOutfiltersHeight();
						return;
					}
				}
			}
			// check both
			if ($(this).parents('.multifilters-in').next().hasClass('multifilters-both')) {
				if ($(this).parents('.multifilters-in').next().hasClass('is-active')) {
					if (parseInt(_chosenValue) > parseInt($(this).parents('.multifilters-in').next().find('input').val())) {
						$(this).parents('.nav-menu').siblings('.nav-input').val('');
						$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
						$(this).parents('.nav-menu').siblings('.clear-filter-btn').hide();
						$(this).parents('.multifilters-in').removeClass('is-active');
						$(this).parents('.nav-menu').find('li').removeClass('is-active');
						$(this).parents('.nav-menu').find('li:first-child').addClass('is-active');
						$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]').remove();
						checkOutfiltersHeight();
						return;
					}
				}
			}
			// outfilters
			if ($('.outfilters-wrap').css('display') == 'none') {
				$('.outfilters-wrap').slideDown();
			}
			$('.outfilters-in').each(function(){
				if ($(this).attr('data-category-index') == defaultValuesIndex) {
					_indCategory = true;
				}
			});
			if(_indCategory) {
				$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]')
					.children('.outfilters-list')
					.children('li')
					.attr('data-text-index', textIndex)
					.find('span')
					.text(_chosenValue);
				if (_indMask) {
					$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"] li span').prepend($(this).parents('.nav-menu').siblings('.nav-btn').attr('data-mask-text') + ' ');
				}
			} else {
				var _position = false;
				if (_indOutfilters) {
					$('.outfilters-in').each(function(){
						if (defaultValuesIndex > $(this).attr('data-category-index')) {
							_position = $(this).attr('data-category-index');
						}
					});
					if (_position) {
						$('.outfilters')
							.find('.outfilters-in[data-category-index="'+_position+'"]')
							.after('<li class="outfilters-in" data-category-index="'+defaultValuesIndex+'"></li>')
							.siblings('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]')
							.append('<p class="outfilters-title"></p>')
							.children('.outfilters-title')
							.text(defaultValues[defaultValuesIndex])
							.after('<ul class="outfilters-list"></ul>')
							.siblings('.outfilters-list')
							.append('<li><button class="outfilters-cancel"><i class="fa fa-times" aria-hidden="true"></i></button><span></span></li>')
							.children('li')
							.attr('data-text-index', textIndex)
							.find('span')
							.text(_chosenValue);
						if (_indMask) {
							$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"] li span').prepend($(this).parents('.nav-menu').siblings('.nav-btn').attr('data-mask-text') + ' ');
						}
					} else {
						$('.outfilters')
							.children('.outfilters-in:first-child')
							.before('<li class="outfilters-in" data-category-index="'+defaultValuesIndex+'"></li>')
							.siblings('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]')
							.append('<p class="outfilters-title"></p>')
							.children('.outfilters-title')
							.text(defaultValues[defaultValuesIndex])
							.after('<ul class="outfilters-list"></ul>')
							.siblings('.outfilters-list')
							.append('<li><button class="outfilters-cancel"><i class="fa fa-times" aria-hidden="true"></i></button><span></span></li>')
							.children('li')
							.attr('data-text-index', textIndex)
							.find('span')
							.text(_chosenValue);
						if (_indMask) {
							$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"] li span').prepend($(this).parents('.nav-menu').siblings('.nav-btn').attr('data-mask-text') + ' ');
						}
					}
				} else {
					$('.outfilters')
						.append('<li class="outfilters-in"></li>')
						.children('.outfilters-in')
						.attr('data-category-index', defaultValuesIndex)
						.append('<p class="outfilters-title"></p>')
						.children('.outfilters-title')
						.text(defaultValues[defaultValuesIndex])
						.after('<ul class="outfilters-list"></ul>')
						.siblings('.outfilters-list')
						.append('<li><button class="outfilters-cancel"><i class="fa fa-times" aria-hidden="true"></i></button><span></span></li>')
						.children('li')
						.attr('data-text-index', textIndex)
						.find('span')
						.text(_chosenValue);
					if (_indMask) {
						$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"] li span').prepend($(this).parents('.nav-menu').siblings('.nav-btn').attr('data-mask-text') + ' ');
					}
				}
			}
		} else {
			$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
			$(this).parents('.nav-menu').siblings('.nav-input').val('');
			$(this).parents('.nav-menu').siblings('.clear-filter-btn').hide();
			$(this).parents('.multifilters-in').removeClass('is-active');
			// outfilters
			$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]').remove();
				_indOutfilters = $('.outfilters-in').length;
				if (!_indOutfilters) {
					$('.outfilters-wrap').slideUp();
			}
		}
		$(this).parents('.multifilters-in').find('li').removeClass('is-active');
		$(this).parentsUntil($('.nav-menu'), 'li').addClass('is-active');
		$('.nav-btn').removeClass('is-active');
		checkOutfiltersHeight();
	});

	// hide location-wrap on outer click
	if ($('.nav-menu').length) {
		$(document).click(function(e) {
			if ( $(e.target).closest('.nav-menu, .nav-btn, .nav-input').length === 0) {
				$('.nav-menu').hide().siblings('.nav-btn').removeClass('is-active');
			}
		});
	}

	// clear select
	$('.multifilters-select .clear-filter-btn').on('click', function(){
		var _indOutfilters = true;
		$(this).hide();
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		$(this).siblings('.nav-input').val('');
		$(this).siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
		$(this).siblings('.nav-menu').children('li').removeClass('is-active').eq(0).addClass('is-active');
		$(this).parent().removeClass('is-active');
		// outfilters
		$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]').remove();
		_indOutfilters = $('.outfilters-in').length;
		if (!_indOutfilters) {
			$('.outfilters-wrap').slideUp();
		}
		checkOutfiltersHeight();
	});

	// clear checkbox
	$('.multifilters-checkbox .clear-filter-btn').on('click', function(){
		var _indOutfilters = true;
		$(this).hide();
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		$(this).siblings('.nav-menu').find('input').iCheck('uncheck');
		$(this).siblings('.nav-menu').find('li:first-child').find('input').iCheck('check');
		// outfilters
		$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]').remove();
		_indOutfilters = $('.outfilters-in').length;
		if (!_indOutfilters) {
			$('.outfilters-wrap').slideUp();
		}
		checkOutfiltersHeight();
	});

	// clear input
	$('.multifilters-input .clear-filter-btn').on('click', function(){
		$(this).hide();
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		$(this).siblings('.nav-input').val('');
		$(this).siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
		$(this).siblings('.nav-menu').children('li').removeClass('is-active').eq(0).addClass('is-active');
		$(this).parent().removeClass('is-active');
		// outfilters
		$('.outfilters-in[data-category-index="'+defaultValuesIndex+'"]').remove();
			_indOutfilters = $('.outfilters-in').length;
			if (!_indOutfilters) {
				$('.outfilters-wrap').slideUp();
		}
		checkOutfiltersHeight();
	});

	// outfilters main clear button
	$('.outfilters-wrap .cancel-btn').on('click', function(){
		$(this).parent().siblings('.outfilters-container').find('.outfilters-in').remove();
		$('.outfilters-wrap').slideUp();
		$('.multifilters-in').removeClass('is-active');
		$('.multifilters-in').find('.nav-input').val('');
		defaultValuesIndex = 0;
		$('.multifilters-in .nav-btn').each(function(){
			if ($(this).parent().index() != 0) {
				$(this).removeClass('is-active').children('span').text(defaultValues[defaultValuesIndex]);
				$(this).siblings('.clear-filter-btn').hide();
				$(this).siblings('.nav-menu').find('input[type="checkbox"]').iCheck('uncheck');
				$('.multifilters-checkbox .nav-menu li:first-child input').iCheck('check');
			}
			defaultValuesIndex++;
		});
		$('.multifilters-select, .multifilters-input').each(function(){
			$(this).children('.nav-menu').children('li').removeClass('is-active').eq(0).addClass('is-active');
		});
		$('.all-filter-btn').hide();
	});

	// show all filter
	$('.all-filter-btn').on('click', function(){
		if ($(this).hasClass('is-active')) {
			$('.outfilters-container').css('height', '162px');
			$(this).removeClass('is-active');
			$(this).children('span').text('показать весь фильтр');
		} else {
			$('.outfilters-container').css('height', 'auto');
			$(this).addClass('is-active');
			$(this).children('span').text('свернуть фильтр');
		}
	});

} // end multifilters
});