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
	
var keys = {
	'sqrt' : '\sqrt',
	'plusminus' : '\pm',
	'minusplus' : '\mp',
	'frac' : '/',
	'power' : '^',
	'cdot' : '\cdot',
	'lt' : '\lt',
	'gt' : '\gt',
	'le' : '\le',
	'ge' : '\ge',
	'space' : '\qquad',
	'backspace' : 'Backspace',
	'[' : '[',
	']' : ']',
	'(' : '(',
	')' : ')',
	'{' : '{',
	'}' : '}',
	'alpha' : '\alpha',
	'delta' : '\delta',
	'gamma' : '\gamma',
	'epsilon': '\epsilon',
	'9' : '9',
	'8' : '8',
	'7' : '7',
	'6' : '6',
	'5' : '5',
	'4' : '4',
	'3' : '3',
	'2' : '2',
	'1' : '1',
	'0' : '0',

};
var MQ = MathQuill.getInterface(2); 
var App = {
    init: function() {
        $("#include-html").load("basic.html");
        App.initMath();
        App.manageKeys();
        App.manageDeleteEquation();
        App.manageMathOptions();
        App.initCanvas();
    },

	initMath : function(){
		var MQ = MathQuill.getInterface(2); // for backcompat
		var mathFieldSpan = document.getElementById('math-field');
		var latexSpan = document.getElementById('latex');
	    var mathField = MQ.MathField(mathFieldSpan, {
		  spaceBehavesLikeTab: true, // configurable
		  handlers: {
		    spaceBehavesLikeTab : false,
			edit: function() { // useful event handlers
			  latexSpan.textContent = mathField.latex(); // simple API
			}
		  }
		});
	},

    manageKeys: function() {
        var selector = $(".char-btn");
        selector.each(function() {
            var self = $(this);
            self.click(function() {
                var $element = $("#math-field");
                //TODO In html maintain the data-char and keys object key as same and value with latex code
                var data = keys[self.attr("data-char")];
				var mathField = MQ.MathField($element[0]);
				if(data === '\\bs'){
					mathField.keystroke("Backspace");
					return;
				}
				mathField.cmd(data);
				mathField.focus();
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
	manageMathOptions : function (){
	    $("#math-options").change(function(){
	        var self = $(this);
	        $("#include-html").load(self.val()+".html");
	    });
    },
	initCanvas : function (){
	    var canvasWidth = "500px";
	    var canvasHeight = "500px";
	    var context;
	    var canvasDiv = document.getElementById('canvasDiv');
        canvas = document.createElement('canvas');
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.setAttribute('id', 'canvas');
        canvasDiv.appendChild(canvas);
        if(typeof G_vmlCanvasManager != 'undefined') {
        	canvas = G_vmlCanvasManager.initElement(canvas);
        }
        context = canvas.getContext("2d");

        $('#canvas').mousedown(function(e){
          var mouseX = e.pageX - this.offsetLeft;
          var mouseY = e.pageY - this.offsetTop;

          paint = true;
          addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
          redraw();
        });
        $('#canvas').mousemove(function(e){
          if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
          }
        });
        $('#canvas').mouseup(function(e){
          paint = false;
        });
        $('#canvas').mouseleave(function(e){
          paint = false;
        });
        $('#clear-canvas').click(function(e){
	        context.clearRect(0, 0, canvasWidth, canvasHeight);
        });

        var clickX = new Array();
        var clickY = new Array();
        var clickDrag = new Array();
        var paint;

        function addClick(x, y, dragging)
        {
          clickX.push(x);
          clickY.push(y);
          clickDrag.push(dragging);
        }

        function redraw(){
          context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

          context.strokeStyle = "#df4b26";
          context.lineJoin = "round";
          context.lineWidth = 5;

          for(var i=0; i < clickX.length; i++) {
            context.beginPath();
            if(clickDrag[i] && i){
              context.moveTo(clickX[i-1], clickY[i-1]);
             }else{
               context.moveTo(clickX[i]-1, clickY[i]);
             }
             context.lineTo(clickX[i], clickY[i]);
             context.closePath();
             context.stroke();
          }
        }
    },
}