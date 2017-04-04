//TODO keep all the keys and values of the expression of mathjax
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
$(function() {


				// Cross-browsser function to get text selected (there is only one selection at a time in each window)
				function getSelection() {
					return (!!document.getSelection) ? document.getSelection() : (!!window.getSelection) ? window.getSelection() : document.selection.createRange().text;
				}


				function displayProblem(){
					var problemDisplay = document.getElementById('problem-display');
					var composedProblemStr = '';
					for (i=0; i < lineCounter; i++){
						composedProblemStr = composedProblemStr + '<br>' + lineArray[i];
					}
					problemDisplay.innerHTML = composedProblemStr;
				}



				$('a#textact').on("click", function(e) {
					e.preventDefault();
					var textareaElem = document.getElementById("textlines");
					var textAreaContent = textareaElem.value;
					lineArray[lineCounter] = 'TEXT:\t' + textAreaContent;
					lineCounter++;
					displayProblem();
					return false;
				});

				$('a#addformula').on("click", function(e) {
					e.preventDefault();
					var MQ = MathQuill.getInterface(2);
					var answerSpan = document.getElementById('math-field1');
					var answerMathField = MQ.MathField(answerSpan);
					var formulaContent = answerMathField.latex();
					lineArray[lineCounter] = 'FORMULA:\t' + formulaContent;
					lineCounter++;
					displayProblem();
					return false;
				});

				$('a#addshape').on("click", function(e) {
					e.preventDefault();
					var formulaContent = "EXTRACT KEY-STROKES FROM CANVAS ELEMENT AND ADD THEM AS LINE";
					lineArray[lineCounter] = 'SHAPE:\t' + formulaContent;
					lineCounter++;
					displayProblem();
					return false;
				});
				$('a#pm').on("click", function(e) {
					e.preventDefault();
					//alert('Enter PM...');
					var mathFieldSpan = document.getElementById('math-field1');
					var editMathField = MQ.MathField(mathFieldSpan);
					editMathField.focus();
					editMathField.cmd('\\pm');
					//alert('Exit PM...');
					return false;
				});

				$('a#sqrt').on("click", function(e) {
					e.preventDefault();
					//alert('Enter SQRT...');
					var mathFieldSpan = document.getElementById('math-field1');
					var editMathField = MQ.MathField(mathFieldSpan);
					editMathField.focus();
					editMathField.cmd('\\sqrt');
					//alert('Exit SQRT...');
					return false;
				});

				$('a#square').on("click", function(e) {
					e.preventDefault();
					//alert('Enter SQUARE...');
					var mathFieldSpan = document.getElementById('math-field1');
					var editMathField = MQ.MathField(mathFieldSpan);
					editMathField.focus();
					editMathField.write('^{2}');
					//alert('Exit SQUARE...');
					return false;
				});

				$('a#power').on("click", function(e) {
					e.preventDefault();
					//alert('Enter POWER...');
					var mathFieldSpan = document.getElementById('math-field1');
					var editMathField = MQ.MathField(mathFieldSpan);
					editMathField.focus();
					editMathField.write('^{}');
					editMathField.keystroke('Left');
					//alert('Exit POWER...');
					return false;
				});

				$('a#denom').on("click", function(e) {
					e.preventDefault();
					//alert('Enter Add Denominator...');
					var mathFieldSpan = document.getElementById('math-field1');
					var editMathField = MQ.MathField(mathFieldSpan);
					alert('Selection:[' + getSelection() + ']');
					// not working
					editMathField.focus();
					editMathField.cmd('/');
					editMathField.focus();
					//alert('Exit Add Denominator...');
					return false;
				});
})
function toMathML(jax, callback) {
				var mml;
				try {
					mml = jax.root.toMathML("");
				} catch(err) {
					if (!err.restart) {
						throw err
					}// an actual error
					return MathJax.Callback.After([toMathML, jax, callback], err.restart);
				}
				MathJax.Callback(callback)(mml);
			}
var MQ = MathQuill.getInterface(2);
var App = {
    init: function() {
        $("#include-html").load("basic.html");
        App.initMath();
        App.manageKeys();
        App.manageDeleteEquation();
        App.manageMathOptions();
    },

	initMath : function(){
		var MQ = MathQuill.getInterface(2); // for backcompat
		var mathFieldSpan = document.getElementById('math-field1');
		var latexSpan = document.getElementById('latex1');
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
                var $element = $("#math-field1");
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
}