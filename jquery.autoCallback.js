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
            this.domManip(arguments, function( elem ) {
                var that = this;
                if(i > 4) {
                    $(elem).autoCallback(that);
                } else {
                    $(that).autoCallback(elem);
                }
            });
            return $.domEvents[name].apply(this, arguments);
        };
    });
    $.autoCallback = {
    };
    $.fn.autoCallback = function(elem) {
        var that = this;
        $.each($.autoCallback, function() {
            this.require(that, elem) && this.callback(that, elem);
        });
    };
    $(function() {
        $.each($.autoCallback, function(i, name) {
            var that = this,
            obj = $(document);
            that.domready && that.callback(obj, that);
        });
    })
})(jQuery);

(function($) {
    $.autoCallback.demo = {
        domready: true,
        require: function(obj, elem) {
            return ($(obj).is("body") && $(elem).is("a"));
        },
        callback: function(obj, elem) {
            $(elem).on("click", function() {
                console.log($(this).text());
                return false;
            });
        }
    };
})(jQuery);