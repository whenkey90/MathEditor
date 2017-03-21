//TODO keep all the keys and values of the expression of mathjax
var charObj = {
    "a2b2": '<mrow><msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2</mn></msup><mo>=</mo><msup><mi>c</mi><mn>2</mn></msup></mrow>',
    "a2b3": '<mrow><mi>A</mi><mo>=</mo><mfenced open="[" close="]"><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mi>z</mi></mtd><mtd><mi>w</mi></mtd></mtr></mtable></mfenced></mrow>',
    "a2b4": '<msqrt><mn>64</mn></msqrt>',
    "area": '<mi>A</mi><mo>=</mo><mfrac><mrow><mi>h</mi><mo>*</mo><mi>b</mi></mrow><mn>2</mn></mfrac>',
    "rectarea": '<mi>A</mi><mo>=</mo><mi>l</mi><mo>&#xD7;</mo><mi>b</mi>',
    "open": '<mo>(</mo>',
    "close": '<mo>)</mo>',
    "w": '<mi contentEditable="true">W</mo>',
    "x": '<mi contentEditable="true">X</mo>',
    "y": '<mi contentEditable="true">Y</mo>',
    "z": '<mi contentEditable="true">Z</mo>',
    };
	
var keys = [];

var App = {
    init: function() {
        App.initMath();
        App.manageKeys();
        App.manageDeleteEquation();
    },

	initMath : function(){
		var MQ = MathQuill.getInterface(2); // for backcompat
		var mathFieldSpan = document.getElementById('math-field');
		var latexSpan = document.getElementById('latex');
	    var mathField = MQ.MathField(mathFieldSpan, {
		  spaceBehavesLikeTab: true, // configurable
		  handlers: {
			edit: function() { // useful event handlers
			  latexSpan.textContent = mathField.latex(); // simple API
			}
		  }
		});
		//End
		
	  //var fillInTheBlank = MQ.StaticMath(document.getElementById('fill-in-the-blank'));
	  //fillInTheBlank.innerFields[0].latex() // => 'x'
	  //fillInTheBlank.innerFields[1].latex() // => 'y'
	  //var mathField1 =  MQ.mathField($("#fill-in-the-blank")[0]);
	  //mathField1.focus();
	  var mathFieldSpan = $("#fill-in-the-blank");
		console.log(mathFieldSpan);
		console.log(mathFieldSpan[0]);
		console.log(mathFieldSpan[1]);
		var mathField = MQ.MathField(mathFieldSpan[0]);
		console.log(mathField);
//		mathFieldSpan.appendTo(document.body);
		//mathField.focus();
		var x1 = $("var mathquill-command-id");
		// var mathField = MQ.MathField(x1);
		// mathField.focus();
		var parent = document.getElementsByTagName('var')[0];
		// getElementsByAttribute('mathquill-command-id', parent);
		console.log();
		console.log(x1);
		console.log(x1[0]);
		function getElementsByAttribute(attribute, context) {
		  var nodeList = (context || document).getElementsByTagName('*');
		  var nodeArray = [];
		  var iterator = 0;
		  var node = null;

		  while (node = nodeList[iterator++]) {
			if (node.getAttribute(attribute)) nodeArray.push(node);
		  }
		  return nodeArray;
		}
		var mathFieldSpan = $(getElementsByAttribute('mathquill-command-id')[2]);
		var mathField = MQ.MathField(mathFieldSpan[0]);
		mathField.focus();
		
		//mathFieldSpan.appendTo(document.body);
		//mathField.reflow();
		
	},
    manageKeys: function() {
        var selector = $(".char-btn");
        selector.each(function() {
            var self = $(this);
            self.click(function() {
                var $element = $("#math-field");
                var data = self.attr("data-char");
				keys.push(data);
//                if (charObj.hasOwnProperty(data)) {
//                    $("#main-text").append(App.getMathKey(charObj[data]));
//                } else {
//                    $("#main-text").append(data);
//                }
				console.log($element.text());
				$element.text($element.text()+data);
				//App.insertAtCaret("math-field");
				App.initMath();
				//$("#math-field").addClass("mq-focused");
				//$(".mq-root-block").addClass("mq-hasCursor");
				//$(".mq-root-block").append("<span class=\"mq-cursor\">&#8203</span>");

            });
        });

        $("#submit-btn").click(function() {
            alert("Expression : " + $("#main-text").html());
        });
    },
	
	insertAtCaret : function (areaId, text) {
		var txtarea = document.getElementById(areaId);
		if (!txtarea) { return; }

		var scrollPos = txtarea.scrollTop;
		var strPos = 0;
		var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
			"ff" : (document.selection ? "ie" : false ) );
		if (br == "ie") {
			txtarea.focus();
			var range = document.selection.createRange();
			range.moveStart ('character', -txtarea.value.length);
			strPos = range.text.length;
		} else if (br == "ff") {
			strPos = txtarea.selectionStart;
		}

		var front = (txtarea.value).substring(0, strPos);
		var back = (txtarea.value).substring(strPos, txtarea.value.length);
		txtarea.value = front + text + back;
		strPos = strPos + text.length;
		if (br == "ie") {
			txtarea.focus();
			var ieRange = document.selection.createRange();
			ieRange.moveStart ('character', -txtarea.value.length);
			ieRange.moveStart ('character', strPos);
			ieRange.moveEnd ('character', 0);
			ieRange.select();
		} else if (br == "ff") {
			txtarea.selectionStart = strPos;
			txtarea.selectionEnd = strPos;
			txtarea.focus();
		}

		txtarea.scrollTop = scrollPos;
	},

    manageDeleteEquation: function() {
        $("#delete-btn").click(function() {
            var str = $("#main-text").html();
            $("#main-text").html(str.substring(0, str.length - 1));
            console.log("Expression : " + $("#main-text").html());
        });
    },

    getMathKey : function(key){
        return '<math xmlns="http://www.w3.org/1998/Math/MathML">'+ key + '</math>'
    },

	doSet : function () {
      editor.setMathML("<math><mfrac><mn>1</mn><mi>x</mi></mfrac></math>");
    },
	doGet : function (){
      alert(editor.getMathML());
    },
}