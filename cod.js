var setBXSliders = function () {

            // слайдер

            var setBXSliderElem = function (elem) {
                var section = elem.parents('section');
                var elem_wrapper = elem.parents('.slider-card-wrapper');
                var slider_width = elem.find('.slider-cart-item').width();
                var slider_margin = elem.find('.slider-cart-item:first-child').outerWidth(true) - elem.find('.slider-cart-item:first-child').outerWidth();

                var slider = elem.bxSlider({
                    minSlides: 1,
                    maxSlides: 10,
                    controls: false,
                    slideWidth: slider_width,
                    slideMargin: slider_margin,
                    responsive: elem.hasClass('responsive_cart'),
                    moveSlides: 1,
                    pager: false
                });

                elem_wrapper.find('.slider-left').click(function () {
                    slider.goToPrevSlide();
                });

                elem_wrapper.find('.slider-right').click(function () {
                    slider.goToNextSlide();
                });

                return slider;
            };

            // Установка правильной ширины области слайдера, чтобы не было видно обрезанных карточек
            var setSliderWrapperWidth = function (elem) {
                var elem_wrapper = elem.find('.slider-card-wrapper');
                var elem_item = elem.find('.slider-cart-item:first-child');
                var cart_wrapper = Math.floor(elem.width() / elem_item.outerWidth(true)) * elem_item.outerWidth(true) - (elem_item.outerWidth(true) - elem_item.outerWidth());

                elem_wrapper.width(cart_wrapper);
                elem_wrapper.css('max-width', elem.find('.bx-wrapper').css('max-width'));
            };

            //Проверяем помещаются ли элементы по ширине секции, или надо иницировать слайдер
            //return slider if width small, or null            
            var InitSliderIfWidthCheck = function(section){
                var elem_item = section.find('.slider-cart-item:first-child');
                var elem_wrapper_width = section.find('.section-wrap').width();
                var elem_items_width = elem_item.outerWidth(true) * section.find('.slider-cart-item').length - (elem_item.outerWidth(true) - elem_item.outerWidth());
                var slider = null;

                if(elem_wrapper_width <= elem_items_width) {
                    section.find('.slider-left').css('display', 'block');
                    section.find('.slider-right').css('display', 'block');
                    slider = setBXSliderElem(section.find('.slider-card'));
                    setSliderWrapperWidth(section);
                }

                return slider;
            };

            $('.slider-card').each(function () {
                var section = $(this).parents('section');
                var slider = InitSliderIfWidthCheck(section);

                //Переопределяем слайдер при ресайзе
                $(window).resize(function () {
                    if(slider !== null){
                        slider.destroySlider();
                        section.find('.slider-card-wrapper').css('max-width', 'none').css('width','auto');
                        section.find('.slider-left, .slider-right').css('display', 'none').off();
                    }
                    slider = InitSliderIfWidthCheck(section);
                });
            });
        };
