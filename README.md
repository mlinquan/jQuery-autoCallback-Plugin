# jQuery-autoCallback-Plugin
jQuery-autoCallback-Plugin

##Usage
```javascript
(function($) {
    $.autoCallback.add('demo', {
        domready: false,
        require: function(obj, elem) {
            return $(elem).is("li");
        },
        callback: function(obj, elem) {
            $("a", elem).on("click", function() {
                console.log($(this).text());
                return false;
            });
            $("span", elem).on("click", function() {
                $(this).parent("li").css({"background":"#ff0"}).fadeOut("500", function() {
                      $(this).remove();
                });
                return false;
            });
        }
    });
})(jQuery);
```
