$(function() {
				// Cross-browsser function to get text selected (there is only one selection at a time in each window)
				function getSelection() {
					return (!!document.getSelection) ? document.getSelection() : (!!window.getSelection) ? window.getSelection() : document.selection.createRange().text;
				}

				$('a#pm').on("click", function(e) {
					e.preventDefault();
					//alert('Enter PM...');
					var mathFieldSpan = document.getElementById('math-field');
					var editMathField = MQ.MathField(mathFieldSpan);
					editMathField.focus();
					editMathField.cmd('\\pm');
					//alert('Exit PM...');
					return false;
				});
				$('a#mp').on("click", function(e) {
					e.preventDefault();
					//alert('Enter PM...');
					var mathFieldSpan = document.getElementById('math-field');
					var editMathField = MQ.MathField(mathFieldSpan);
					editMathField.focus();
					editMathField.cmd('\\mp');
					//alert('Exit PM...');
					return false;
				});


				$('a#sqrt').on("click", function(e) {
					e.preventDefault();
					//alert('Enter SQRT...');
					var mathFieldSpan = document.getElementById('math-field');
					var editMathField = MQ.MathField(mathFieldSpan);
					editMathField.focus();
					editMathField.cmd('\\sqrt');
					//alert('Exit SQRT...');
					return false;
				});

				$('a#square').on("click", function(e) {
					e.preventDefault();
					//alert('Enter SQUARE...');
					var mathFieldSpan = document.getElementById('math-field');
					var editMathField = MQ.MathField(mathFieldSpan);
					editMathField.focus();
					editMathField.write('^{2}');
					//alert('Exit SQUARE...');
					return false;
				});

				$('a#power').on("click", function(e) {
					e.preventDefault();
					//alert('Enter POWER...');
					var mathFieldSpan = document.getElementById('math-field');
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
					var mathFieldSpan = document.getElementById('math-field');
					var editMathField = MQ.MathField(mathFieldSpan);
					//alert('Selection:[' + getSelection() + ']'); // not working
					editMathField.focus();
					editMathField.cmd('/');
					editMathField.focus();
					//alert('Exit Add Denominator...');
					return false;
				});
				$('a#open').on("click", function(e) {
					e.preventDefault();
					//alert('Enter Add Denominator...');
					var mathFieldSpan = document.getElementById('math-field');
					var editMathField = MQ.MathField(mathFieldSpan);
					//alert('Selection:[' + getSelection() + ']'); // not working
					editMathField.focus();
					editMathField.write('[]');
					editMathField.focus();

					//alert('Exit Add Denominator...');
					return false;
				});
				$('a#braces').on("click", function(e) {
					e.preventDefault();
					//alert('Enter Add Denominator...');
					var mathFieldSpan = document.getElementById('math-field');
					var editMathField = MQ.MathField(mathFieldSpan);
					//alert('Selection:[' + getSelection() + ']'); // not working
					editMathField.focus();
					editMathField.write('()');
					editMathField.focus();
					//alert('Exit Add Denominator...');
					return false;
				});
				$('a#space').on("click", function(e) {
					e.preventDefault();
					//alert('Enter Add Denominator...');
					var mathFieldSpan = document.getElementById('math-field');
					var editMathField = MQ.MathField(mathFieldSpan);
					//alert('Selection:[' + getSelection() + ']'); // not working
					editMathField.focus();
					editMathField.write('\\qquad');
					editMathField.keystroke('spacebar');
					//alert('Exit Add Denominator...');
					return false;
				});
				$('a#backspace').on("click", function(e) {
                					e.preventDefault();
                					//alert('Enter Add Denominator...');
                					var mathFieldSpan = document.getElementById('math-field');
                					var editMathField = MQ.MathField(mathFieldSpan);
                					//alert('Selection:[' + getSelection() + ']'); // not working
                					editMathField.focus();
                					editMathField.write('\\bs');
                					editMathField.keystroke('Backspace');
                					//alert('Exit Add Denominator...');
                					return false;
                				});
				$('a#seven').on("click", function(e) {
					e.preventDefault();
					//alert('Enter Add Denominator...');
					var mathFieldSpan = document.getElementById('math-field');
					var editMathField = MQ.MathField(mathFieldSpan);
					//alert('Selection:[' + getSelection() + ']'); // not working
					editMathField.focus();
					editMathField.write('7');
					editMathField.focus();
					//alert('Exit Add Denominator...');
					return false;
				});





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
			MathJax.Hub.Config({
			tex2jax: {inlineMath: [["$","$"],["\\\\(","\\\\)"]]}
			});
			MathJax.Hub.Queue(
			function () {
			var jax = MathJax.Hub.getAllJax();
			for (var i = 0; i < jax.length; i++) {
			toMathML(jax[i],function (mml) {
			// alert(jax[i].originalText + "\n\n=>\n\n"+ mml);
			});
			}
			}
			);




			var answerSpan = document.getElementById('math-field');
			var latexSpan = document.getElementById('latex');
			var staticMath = document.getElementById('static-math');
			var resultMathML = document.getElementById('result-mathml');

			var MQ = MathQuill.getInterface(2);
			var answerMathField = MQ.MathField(answerSpan, {
				spaceBehavesLikeTab : true,
				handlers : {
					edit : function() {
						var latexString = answerMathField.latex();
						latexSpan.textContent = latexString;
						var MathMLString = TeXZilla.toMathMLString(latexString);
						resultMathML.textContent = MathMLString;
						staticMath.textContent = latexString;
						MQ.StaticMath(staticMath);
					}
				}
			});
});