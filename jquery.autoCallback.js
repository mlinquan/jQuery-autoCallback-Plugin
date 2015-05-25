/**
 * jQuery-autoCallback-Plugin
 * https://github.com/mlinquan/jQuery-autoCallback-Plugin
 *
 * @version
 * 0.0.1 (May 25, 2015)
 *
 * @copyright
 * Copyright (C) 2015 LinQuan.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
 (function($) {
    $.domEvents = {};
    $.each(['append', 'prepend', 'before', 'after', 'replaceWith', 'appendTo', 'prependTo', 'insertBefore', 'insertAfter', 'replaceAll'], function(i, name) {
        $.domEvents[name] = $.fn[name];
        $.fn[name] = function() {
            var back_elem;
            this.domManip(arguments, function( elem ) {
                var that = this;
                if(!elem.jquery) {
                    elem = $(elem);
                }
                if(i > 4) {
                    $(elem).autoCallback(this);
                } else {
                    $(this).autoCallback(elem);
                }
                back_elem = elem;
            });
            return $.domEvents[name].apply(this, back_elem);
        };
    });
    $.autoCallback = {
    };
    $.fn.autoCallback = function(elem) {
        var that = $(this);
        elem = $(elem);
        $.each($.autoCallback, function() {
            this.require(that, elem) && this.callback(that, elem);
        });
    };
    $(function() {
        $.each($.autoCallback, function(i, name) {
            var that = $(this),
            obj = $(document);
            that.domready && that.callback(obj, that);
        });
    })
})(jQuery);