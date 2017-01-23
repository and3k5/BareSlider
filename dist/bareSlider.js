(function($) {
    var elementClick = function() {
        setSelected.call(this, true);
    };
    function setSelected(userEvent) {
        var $this = $(this);
        var $slider = $this.data("bareSlider");
        if ($slider.elements.indexOf(this) == $slider.selectedIndex) return;
        $slider.selectedIndex = $slider.elements.indexOf(this);
        if (typeof $slider.options.onchange != "function") return;
        $($slider.elements).each(function(i, e) {
            $slider.options.onchange.call(e, $this[0] == e, userEvent);
        });
    }
    $.fn.bareSlider = function(options) {
        var $slider = this.first();
        if (this.length == 0) return this;
        if (this.length > 1) return this.each(function(i, e) {
            $(e).bareSlider(options);
        });
        var object = {};
        $slider.data("bareSlider", object);
        object.options = options;
        object.element = this;
        object.reloadSlider = function() {
            $(this.elements).each(function(i, e) {
                e.removeData("bareSlider");
                e.unbind("click", elementClick);
            });
            this.elements = $(object.options.childSelector).each(function(i, e) {
                var $e = $(e);
                $e.data("bareSlider", object);
                $e.bind("click", elementClick);
            }).toArray();
            (options.onlayout || function() {}).call(this);
        };
        object.selectIndex = function(i) {
            setSelected.call(this.elements[i], false);
        };
        object.selectValue = function(v) {
            if (typeof this.options.getItemValue != "function") return;
            var obj = this;
            var match = $(this.elements.filter(function(a) {
                return obj.options.getItemValue.call(a) == v;
            })).first();
            if (match.length != 1) return;
            setSelected.call(match[0], false);
        };
        object.reloadSlider();
        return this;
    };
})(jQuery);