
(function ($) {

    $.fn.expandableTextbox = function (options) {

        var defaults = {
            minWidth: 100,
            maxWidth: 768,
            complete: function () { }
        };

        if (typeof (options) === 'object') {
            options = $.extend(defaults, options);
        } else {
            var tempOptions = {};
            tempOptions.minWidth = arguments[0] || defaults.minWidth;
            tempOptions.maxWidth = arguments[1] || defaults.maxWidth;
            tempOptions.complete = arguments[2] || defaults.complete;
            options = tempOptions;
        }

        return this.each(function () {

            $(this).on('input', function () {
                var tempSpan = $('<span/>', {
                    text: '.' + $(this).val() + '.',
                    css: {
                        visibility: 'hidden',
                        whiteSpace: 'pre',
                        fontSize: $(this).css('font-size'),
                        fontFamily: $(this).css('font-family')
                    }
                });
                $('body').append(tempSpan);

                if (tempSpan.width() > options.maxWidth) {
                    $(this).css({ width: options.maxWidth + 'px' });
                } else if (tempSpan.width() > options.minWidth) {
                    $(this).css({ width: tempSpan.width() + 'px' });
                } else {
                    $(this).css({ width: options.minWidth + 'px' });
                }

                options.complete.call(this, tempSpan.width());

                tempSpan.remove();
            });
        });
    };

}(jQuery));