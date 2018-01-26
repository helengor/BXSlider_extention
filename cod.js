var setBXSliders = function () {

            // слайдер

            var setBXSliderElem = function (slider_card) {
                var slider_wrapper = slider_card.parents('.slider-card-wrapper');
                var slider_item = slider_card.find('.slider-cart-item:first-child');
                var slider_item_width = slider_item.width();
                var slider_margin = slider_item.outerWidth(true) - slider_item.outerWidth();

                var slider = slider_card.bxSlider({
                    minSlides: 1,
                    maxSlides: 10,
                    controls: false,
                    slideWidth: slider_item_width,
                    slideMargin: slider_margin,
                    responsive: slider_card.hasClass('responsive_cart'),
                    moveSlides: 1,
                    pager: false
                });

                slider_wrapper.find('.slider-left').click(function () {
                    slider.goToPrevSlide();
                });

                slider_wrapper.find('.slider-right').click(function () {
                    slider.goToNextSlide();
                });

                return slider;
            };

            // Установка правильной ширины области слайдера, чтобы не было видно обрезанных карточек
            var setSliderWrapperWidth = function (block_wrapper) {
                var slider_wrapper = block_wrapper.find('.slider-card-wrapper');
                var slider_item = block_wrapper.find('.slider-cart-item:first-child');
                var cart_wrapper = Math.floor(block_wrapper.width() / slider_item.outerWidth(true)) * slider_item.outerWidth(true) - (slider_item.outerWidth(true) - slider_item.outerWidth());

                slider_wrapper.width(cart_wrapper);
                slider_wrapper.css('max-width', block_wrapper.find('.bx-wrapper').css('max-width'));
            };


            var InitSliderIfWidthCheck = function(block_wrapper){
                var slider = null;
                var block_wrapper_width = block_wrapper.width();
                var slider_item = block_wrapper.find('.slider-cart-item:first-child');
                var slider_items_width = slider_item.outerWidth(true) * block_wrapper.find('.slider-cart-item').length - (slider_item.outerWidth(true) - slider_item.outerWidth());

                if(block_wrapper_width <= slider_items_width) {
                    block_wrapper.find('.slider-left').css('display', 'block');
                    block_wrapper.find('.slider-right').css('display', 'block');
                    slider = setBXSliderElem(block_wrapper.find('.slider-card'));
                    setSliderWrapperWidth(block_wrapper);
                }

                return slider;
            };

            $('.slider-card').each(function () {
                var block_wrapper = $(this).parents('.block_wrapper');
                var slider = InitSliderIfWidthCheck(block_wrapper);

                $(window).resize(function () {
                    if(slider !== null){
                        slider.destroySlider();
                        block_wrapper.find('.slider-card-wrapper').css('max-width', 'none').css('width','auto');
                        block_wrapper.find('.slider-left, .slider-right').css('display', 'none').off();
                    }
                    slider = InitSliderIfWidthCheck(block_wrapper);
                });
            });
        };
