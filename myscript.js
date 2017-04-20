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
var canX = new Array();
var canY = new Array();

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var canvasWidth = "300px";
var canvasHeight = "100px";
var context;
var contentArray = [];

var count=0;
var currPos=0;
var curentpos=0;
$(function() {


				// Cross-browsser function to get text selected (there is only one selection at a time in each window)
				function getSelection() {
					return (!!document.getSelection) ? document.getSelection() : (!!window.getSelection) ? window.getSelection() : document.selection.createRange().text;
				}


				function displayProblem(){
					var problemDisplay = document.getElementById('problem-display');
					var composedProblemStr = '';
					for (i=0; i < lineCounter; i++){
						composedProblemStr = composedProblemStr + ' ' + lineArray[i];
					}
					problemDisplay.innerHTML = composedProblemStr;
				}


				function manageArray(arr,element,type){
                    var content="";
                    switch (type) {
                        case "TEXT":
                            content = $('#'+element).val();
                            break;
                        case "FORMULA":
                            content = $('#'+element).text();
                            break;
                        case "SHAPE":
                             content = "SHAPE";
                         break;
                    }
                    id=count;

                    arr.push(App.createObj(type, content,id));
                    count++;
                    // console.log(arr);
				}

                var isAdd=true,pos=0;
				$('a#textact').on("click", function(e) {
					e.preventDefault();
					var textareaElem = $("#textlines");
					var textAreaContent = textareaElem.val();
					var textLength=0;
                    //if(isAdd){
                    manageArray(contentArray,"textlines","TEXT");
					textLength = count;
					$("#problem-display").append("<div class='display-text' id=text-"+textLength+"  data-pos="+(count-1)+"><span style='margin-right:8px;'><button id='editText' style='margin:4px;'>Edit</button><button class='deleteText' style='margin:4px;'>Delete</button></span><span></span></div>");
					//}
					//else if(!isAdd){
                        $("#textact").text("Add a line of text to Problem Composition");
					    //textLength=parseInt(pos)+1;
					    //for (i = 0; i <= contentArray.length; i++) {
                          // if(contentArray[i].id==pos){
                                // contentArray[i].content=$('#textlines').val();
                                 //break;
                               //}
                          //}

					    //isAdd=true;
					//}
					$("#text-"+textLength+" span:last-child").text(textAreaContent);
					textareaElem.val("");
					return false;
				});


				$('#problem-display').on('click', '.deleteText', function() {
				    var index=$(this).closest(".display-text").attr('data-pos');
                     for (i = 0; i <= contentArray.length; i++) {
                            if(contentArray[i].id==index){
                                contentArray.splice(i,1);
                                     break;
                            }
                       }
                     $(this).closest(".display-text").remove();

                     console.log(contentArray);
                });

				$('#problem-display').on('click', '#editText', function() {
				showContent('textline');
				   $("#textlines").focus();
				   //$(this).addClass("active");
                      $("#edit-formula").removeClass("active");
                      mathField.latex('');
                		pos=$(this).closest(".display-text").attr('data-pos');
                            for (i = 0; i <= contentArray.length; i++) {
                               if(contentArray[i].id==pos){
                                      $('#textlines').val(contentArray[i].content);
                                      isAdd=false;
                                      $("#textlines").focus();
                                      $("#textact").text("Update");
                                        break;
                                  }
                                       }

                   });


				$('a#addformula').on("click", function(e) {
					e.preventDefault();
					var answerSpan = document.getElementById('static-math');
					var problemDisplay = $('#problem-display');
					var noOfFormulas = count + 1;
					//if(isAdd){
                    manageArray(contentArray,"latex1","FORMULA");
					var content = $("<div class='display-formula' id='display-formula-"+noOfFormulas+"'></div>")
					$("#problem-display").append(content);
					var fContent = $("<div id='formula-"+noOfFormulas+"'></div>")
					var editButton = $("<button id='edit-formula' data-pos='"+ (count-1) +"'>Edit</button>")
					var deleteButton = $("<button class='delete-formula' data-pos='"+ (count-1) +"'>Delete</button>")
                    $("#display-formula-"+noOfFormulas).append(fContent);
                    $("#display-formula-"+noOfFormulas).append(editButton);
                    $("#display-formula-"+noOfFormulas).append(deleteButton);
					var latexContent = $("#latex1").text();
			        var staticMath = document.getElementById('formula-'+noOfFormulas);
                    staticMath.textContent = $("#latex1").text();
					MQ.StaticMath(staticMath);
					lineCounter++;
					//}
//					else{
                      $("#addformula").text("Add Formula to Problem Composition");
//                        //contentArray.forEach(function(item){
//                            //if(item.id == currPos){
//                              //  var staticMath = document.getElementById('formula-' + (currPos+1));
//                                // item.content = $("#latex1").text();
//                                 staticMath.textContent = item.content;
//                                 MQ.StaticMath(staticMath);
//                                 currPos = 0;
//                            }
//                        });
//					    isAdd=true;
//					}
					mathField.latex('');
					return false;
				});

				$('#problem-display').on('click', '#edit-formula', function() {
				showContent('controls');
				$("#math-field1").focus();
                  $("#editText").removeClass("active");
                   $("#textlines").val('');
                    var pos = $(this).attr('data-pos');
                    currPos = parseInt(pos);
                    contentArray.forEach(function(item){
                        if(item.id == pos){
                            mathField.latex(item.content);
                            $("#addformula").text("Update");
                            isAdd=false;
                        }
                    });
               });

				$('#problem-display').on('click', '.delete-formula', function() {
                    var pos = $(this).attr('data-pos');
                    contentArray.forEach(function(item){
                        if(item.id == pos){
                            var index = contentArray.indexOf(item);
                            contentArray.splice(index,1);
                            $("#display-formula-"+(parseInt(pos)+1)).remove();
                        }
                    });
               });

				$('a#addshape').on("click", function(e) {
					e.preventDefault();
//					var formulaContent = "EXTRACT KEY-STROKES FROM CANVAS ELEMENT AND ADD THEM AS LINE";
//					lineArray[lineCounter] = 'SHAPE:\t' + formulaContent;
//					lineCounter++;
					//displayProblem();
//					contentArray.push(App.createObj("SHAPE", "SHAPE"));
                    if(isAdd){
                    manageArray(contentArray,"SHAPE","SHAPE");
					App.clearCanvas();
					var canvasLength = count;
					$("#problem-display").append("<div class='display-canvas' id=display-canvas-"+canvasLength+"></div>");
					var fshape = $("<div id='canvas-"+canvasLength+"'></div>")
                    var EditButton = $("<button class='edit-shape' data-pos='"+ (count-1) +"'>Edit</button>")
                    var DeleteButton = $("<button class='delete-shape' data-pos='"+ (count-1) +"'>Delete</button>")
                    $("#display-canvas-"+canvasLength).append(fshape);
                    $("#display-canvas-"+canvasLength).append(EditButton);
                    $("#display-canvas-"+canvasLength).append(DeleteButton);

					App.drawCanvasAt("canvas-"+canvasLength);
					}
					else if(!isAdd){
                      $("#addshape").text("Add geometric shape to Problem Composition");
                      canvasLength=parseInt(curentpos)+1;
                     //for (i = 0; i <= contentArray.length; i++) {
                      contentArray.forEach(function(item){
                      if(item.id == curentpos){
                        contentArray[id].content=$('#myCanvas').val();
					    App.editCanvasAt("canvas-"+(contentArray[id].id+1), contentArray[id]);//break;
                        App.clearCanvas();
                        curentpos=0;
                      }
                    });
                    	isAdd=true;
                    }
                     return false;
				});
				$('#problem-display').on('click', '.delete-shape', function() {
                    var pos=$(this).attr('data-pos');
                    curentpos=parseInt(pos);
                     for (i = 0; i <= contentArray.length; i++) {
                            if(contentArray[i].id==pos){
                                contentArray.splice(i,1);
                                     break;
                            }
                       }
                     $(this).closest(".display-canvas").remove();

                });

                $('#problem-display').on('click', '.edit-shape', function() {
                    showContent('shapes');
                    $("#myCanvas").focus();
                    //pos=$(this).closest(".display-canvas").attr('data-pos');
                    pos=$(this).attr('data-pos');
                    for (i = 0; i <= contentArray.length; i++) {
                       if(contentArray[i].id==pos){
                          App.editCanvasAt("myCanvas",contentArray[i]);
                          $('#myCanvas').val(contentArray[i].content);
                          isAdd=false;
                          $("#myCanvas").focus();
                          $("#addshape").text("Update");
                          isAdd=false;
                          break;
                       }
                    }
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
var mathFieldSpan = document.getElementById('math-field1');
var latexSpan = document.getElementById('latex1');
var resultMathML = document.getElementById('result-mathml');
var mathField;
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
	    mathField = MQ.MathField(mathFieldSpan, {
		  spaceBehavesLikeTab: true, // configurable
		  handlers: {
		    spaceBehavesLikeTab : false,
			edit: function() { // useful event handlers
			  latexSpan.textContent = mathField.latex(); // simple API
              resultMathML.textContent = TeXZilla.toMathMLString(mathField.latex());
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
				//var $staticElement=$("#static-math");
				//var staticMathField= MQ.MathField($staticElement[0]);
                //$(staticMathField).attr("readonly",true);
				mathField.cmd(data);
				//staticMathField.cmd(data);
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
	    var canvasDiv = document.getElementById('myCanvas');
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
          App.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
          App.redraw();
        });
        $('#canvas').mousemove(function(e){
          if(paint){
            App.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            App.redraw();
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

	},


    addClick : function (x, y, dragging){
      clickX.push(x);
      clickY.push(y);
      canX = clickX;
      canY = clickY;
      clickDrag.push(dragging);
    },

    redraw : function (){
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
    },

    clearCanvas : function(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        clickX = [];
        clickY = [];
    },

    drawCanvasAt : function(input){
	    var canvasDiv = document.getElementById(input);
        canvas = document.createElement('canvas');
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvasDiv.appendChild(canvas);
        if(typeof G_vmlCanvasManager != 'undefined') {
        	canvas = G_vmlCanvasManager.initElement(canvas);
        }
        var context = canvas.getContext("2d");
        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 5;
        for(var i=0; i < canX.length; i++) {
            context.beginPath();
            if(clickDrag[i] && i){
                context.moveTo(canX[i-1], canY[i-1]);
            }else{
                context.moveTo(canX[i]-1, canY[i]);
            }
            context.lineTo(canX[i], canY[i]);
            context.closePath();
            context.stroke();
        }
    },

    editCanvasAt : function(input, content){
        var canvas = $("#"+input).children("canvas");
        if(typeof G_vmlCanvasManager != 'undefined') {
        	canvas = G_vmlCanvasManager.initElement(canvas);
        }
        var context = canvas[0].getContext('2d');;
        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 5;
        var canX = content.canX;
        var canY = content.canY;
        for(var i=0; i < canX.length; i++) {
            context.beginPath();
            if(clickDrag[i] && i){
                context.moveTo(canX[i-1], canY[i-1]);
            }else{
                context.moveTo(canX[i]-1, canY[i]);
            }
            context.lineTo(canX[i], canY[i]);
            context.closePath();
            context.stroke();
        }
        clickX = canX;
        clickY = canY;
    },


    createObj : function(type, content,id){
        var obj = new Object();
        obj.type = type;
        if(type == "TEXT" || type == "FORMULA"){
            obj.content = content;
        }
        else if(type == "SHAPE"){
            obj.canX = canX;
            obj.canY = canY;
        }
        obj.id=id;
        return obj;
    },
}
