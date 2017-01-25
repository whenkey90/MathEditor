//TODO keep all the keys and values of the expression of mathjax
var charObj = {
    "a2b2": '<mrow><msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2</mn></msup><mo>=</mo><msup><mi>c</mi><mn>2</mn></msup></mrow>',
    "a2b3": '<mrow><mi>A</mi><mo>=</mo><mfenced open="[" close="]"><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mi>z</mi></mtd><mtd><mi>w</mi></mtd></mtr></mtable></mfenced></mrow>',
    "a2b4": '<msqrt><mn>64</mn></msqrt>'
};

var App = {
    init: function() {
        App.manageKeys();
        App.manageDeleteEquation();
    },

    manageKeys: function() {
        var selector = $(".char-btn");
        selector.each(function() {
            var self = $(this);
            self.click(function() {
                var data = self.attr("data-char");
                if (charObj.hasOwnProperty(data)) {
                    $("#main-text").append(App.getMathKey(charObj[data]));
                } else {
                    $("#main-text").append(data);
                }

            });
        });

        $("#submit-btn").click(function() {
            alert("Expression : " + $("#main-text").html());
        });
    },

    manageDeleteEquation: function() {
        $("#delete-btn").click(function() {
            var str = $("#main-text").val();
            $("#main-text").val(str.substring(0, str.length - 1));
            console.log("Expression : " + $("#main-text").val());
        });
    },

    getMathKey : function(key){
        return '<math xmlns="http://www.w3.org/1998/Math/MathML">'+ key + '</math>'
    }
}