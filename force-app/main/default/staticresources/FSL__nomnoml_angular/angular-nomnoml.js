(function(angular, nomnoml) {

	angular.module('ngNomnoml', []);
	angular.module('ngNomnoml').directive('nomnoml', ['$window','$document', nomnomlDirective]);

	function nomnomlDirective($window, $document){
		return {
			restrict:'A',
			scope: {
				nomnomlSource: '@',
				nomnomlModel: '=nomnomlModel'
			},
			link: function(scope, elm, attrs,ngModel) {
				console.log(scope);
				var superSampling = $window.devicePixelRatio || 1;
				var viewport = $window;

				var canvas = elm[0];
				var graphics = skanaar.Canvas(canvas, {});

				function getConfig(d){
					var userStyles = {}
					_.each(d, function (styleDef, key){
						if (key[0] != '.') return
						userStyles[key.substring(1).toUpperCase()] = {
							center: _.contains(styleDef, 'center'),
							bold: _.contains(styleDef, 'bold'),
							underline: _.contains(styleDef, 'underline'),
							italic: _.contains(styleDef, 'italic'),
							dashed: _.contains(styleDef, 'dashed'),
							empty: _.contains(styleDef, 'empty'),
							fill: _.last(styleDef.match('fill=([^ ]*)')),
							visual: _.last(styleDef.match('visual=([^ ]*)')) || 'box'
						}
					})

					return {
						arrowSize: +d.arrowSize || 1,
						bendSize: +d.bendSize || 0.3,
						direction: {down: 'TB', right: 'LR'}[d.direction] || 'TB',
						gutter: +d.gutter || 5,
						edgeMargin: (+d.edgeMargin) || 0,
						edges: {hard: 'hard', rounded: 'rounded'}[d.edges] || 'rounded',
						fill: (d.fill || '#eee8d5;#fdf6e3;#eee8d5;#fdf6e3').split(';'),
						fillArrows: d.fillArrows === 'true',
						font: d.font || 'Calibri',
						fontSize: (+d.fontSize) || 12,
						leading: (+d.leading) || 1.25,
						lineWidth: (+d.lineWidth) || 3,
						padding: (+d.padding) || 8,
						spacing: (+d.spacing) || 40,
						stroke: d.stroke || '#33322E',
						zoom: +d.zoom || 1
					}
				}

				function fitCanvasSize(rect, scale, superSampling){
					var w = rect.width * scale;
					var h = rect.height * scale;
					canvas.width = superSampling * w;
					canvas.height = superSampling * h;
					canvas.style.width = w;
					canvas.style.height = h;
				}

				function setFont(config, isBold, isItalic){
					var style = (isBold === 'bold' ? 'bold ' : '');
					if (isItalic) style = 'italic ' + style;
					graphics.ctx.font = style+config.fontSize+'pt '+config.font+', Helvetica, sans-serif'
				}

				function parseAndRender(superSampling) {
					var ast = nomnoml.parse(scope.nomnomlModel ? scope.nomnomlModel.toString() : scope.nomnomlSource);
					var config = getConfig(ast.directives);

					var measurer = {
						setFont: setFont,
						textWidth: function (s){ return graphics.ctx.measureText(s).width },
						textHeight: function (s){ return config.leading * config.fontSize }
					};

					var layout = nomnoml.layout(measurer, config, ast);
					fitCanvasSize(layout, config.zoom, superSampling);
					config.zoom *= superSampling;
					nomnoml.render(graphics, config, layout, setFont);
				}

				scope.$watch('nomnomlModel', function(newValue) {
					parseAndRender(superSampling);
				});

				parseAndRender(superSampling);
			},
			template: '<canvas></canvas>',
			replace: true

		};
	};

})(angular, nomnoml);
