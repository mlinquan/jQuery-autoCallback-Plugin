/**
 * jQuery-autoCallback-Plugin
 * https://github.com/mlinquan/jQuery-autoCallback-Plugin
 *
 * @version
 * 0.0.2 (May 25, 2015)
 *
 * @copyright
 * Copyright (C) 2015 LinQuan.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
 (function($) {
    $.domEvents = {};
    $.each(['append', 'prepend', 'before', 'after', 'replaceWith'], function(i, name) {
        $.domEvents[name] = $.fn[name];
        $.fn[name] = function() {
            var back_elem;
            this.domManip(arguments, function( elem ) {
                var that = this;
                if(!elem.jquery) {
                    elem = $(elem);
                }
                back_elem = elem;
            });
            $.domEvents[name].apply(this, back_elem)
            return this.autoCallback(back_elem);
        };
    });
    $.pendingCallback = {
    };
    $.autoCallback = {
        add: function(name, opitons) {
            if(!$.pendingCallback[name]) {
                $.pendingCallback[name] = opitons;
            }
            $.autoCallback.once(name);
        },
        once: function(name) {
            var pending = $.pendingCallback[name];
            var obj = $(document);
            if(pending.domready && !pending.runed) {
                $.pendingCallback[name].runed = true;
                pending.callback(obj);
            }
        }
    };
    $.fn.autoCallback = function(elem) {
        var that = $(this);
        elem = $(elem);
        $.each($.pendingCallback, function() {
            this.require(that, elem) && this.callback(that, elem);
        });
    };
})(jQuery);