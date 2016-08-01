$(document).ready(function(){     
	//START: открыть lightbox
	$('.empty-rubric').on('click',function(){
		$('.lightbox-rubric').show();
	});
	//END

	//START: скрывать lightbox при клика на верхнюю панель
	$('.lgbox-title').on('click',function(){
		$('.lightbox-rubric').hide();
	});
 //END

 //START: клик в первом всплывающем окне "lgbox-rubric-block"
	$('.lgbox-rubric-block li a').on('click',function(){
		$('.lg-rubric-cat li').removeClass('active-cat');
		$(this).addClass('active-cat');
		var textrubric = $(this).find('p').html();
		var clickId = this.id;
		$('.lg-rubric-cat li').each(function(){
		   	if($(this).find('p').html() == textrubric){
		   		$(this).addClass('active-cat');
		   	}
		   });
		$('div[lgname="subcat"]').html(textrubric);
		$('.lgbox-rubric-block').hide();
		$('.lgbox-rubric-subcat').show();
		$('.lg-rubric-subcat[subcat="'+clickId+'"]').show();

		if( $('.lg-rubric-subcat[subcat="'+clickId+'"]').css('display') == undefined){
			$('.lightbox-rubric').hide();
			var setСategory = $(this).find('p').html();
			$('.rubric-tov').val(setСategory);
		 	}
	});
	//END

	//START: клик во втором окне "lg-rubric-cat", первая категория
	$('.lg-rubric-cat li').on('click',function(){
		$('.lg-rubric-cat li').removeClass('active-cat');
		$(this).addClass('active-cat');
			var textrubric2 = $(this).html();
	    var clickId2 = this.id;
 	    $('div[lgname="subcat"]').html(textrubric2);
			$('.lg-rubric-subcat').hide();
			$('.lg-rubric-subname').hide();
		 	$('.lg-rubric-subcat[subcat="'+clickId2+'"]').show();

			if( $('.lg-rubric-subcat[subcat="'+clickId2+'"]').css('display') == undefined){
				$('.lightbox-rubric').hide();
				var setСategory = $(this).find('p').html();
				$('.rubric-tov').val(setСategory);
		 	 }
	});
	//END

	//START: клик во втором окне "lg-rubric-cat", вторая категория
	$('.lg-rubric-subcat li').on('click',function(){
		$('.lg-rubric-subcat li').removeClass('active-cat');
		$(this).addClass('active-cat');
	    var clickIdSub = this.id;
		$('.lg-rubric-subname').hide();
		$('.lg-rubric-subname[subcat="'+clickIdSub+'"]').show();

			if( $('.lg-rubric-subname[subcat="'+clickIdSub+'"]').css('display') == undefined){
				$('.lightbox-rubric').hide();
				var setСategory = $(this).find('p').html();
				$('.rubric-tov').val(setСategory);
		 	 }    
	});
	//END

	//START: клик во втором окне "lg-rubric-cat", третя категория и она последняя
	$('.lg-rubric-subname li').on('click',function(){
		$('.lightbox-rubric').hide();
		$('.body-branding .service-1,.body-branding .service-2,.body-branding .banner-1').show();
		var setСategory = $(this).find('p').html();
		$('.rubric-tov').val(setСategory);
 	});
});

