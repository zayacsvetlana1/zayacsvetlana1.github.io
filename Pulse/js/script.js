$(document).ready(function(){
	$('.carousel__inner').slick({
		speed: 1000,
		// adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					dots: true,
					arrows: false
				}
			}
		]
	});

	
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		 	.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		 	.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});
	

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
	
			});
		});
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');



	// modal

	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn('slow');
	});

	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	}); 

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	$(document).on('click', function(e) {
		if (!(
			($(e.target).parents('.modal').length) || ($(e.target).hasClass('modal')) || ($(e.target).hasClass('button')))
		) {
			$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
		}
	});



	// validate

	function validateForms (form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите имя",
					minlength: jQuery.validator.format("Введите минимум {0} символа")
				},
				phone: "Пожалуйста, введите номер телефона",
				email: {
				  required: "Пожалуйста, введите E-mail",
				  email: "Неверный формат E-mail"
				}
			}
		});
	}
	
	validateForms('#consultation-form');
	validateForms('#consultation form');
	validateForms('#order form');
	


	// Masked Input Phone

	$('input[name=phone]').mask("+7 (999) 999-99-99");



	// mailer

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});



	// smooth scroll and pageup

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1400){
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href=#up]").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});



	// smooth scroll to catalog

	$('.promo__link a').on('click', function() {

		let href = $(this).attr('href'), //забираем идентификатор блока с атрибута href
			top = $(href).offset().top;  //узнаем высоту от начала страницы до блока на который ссылается якорь

		$('body,html').animate({scrollTop: top}, 1000); //анимируем переход на расстояние - top за 1000 мс
	});
	
	





});