var myApp = angular.module('myApp', []);

myApp.controller ('QuestionsListCtrl',function ($scope, $http) {
	 $http.get('json/text.json')
	 .success(function(data){  
			$scope.questions = data;$scope.current = data[0].text; } );
			var features = ['sociable','gullible', 'lucky', 'rich', 'confused', 'attentive', 'superstitious'];
			var i = 0;
    
	this.clickAnswer = function(e){ 
		 var number = $(e.currentTarget).data('number');
		 var character = $(e.currentTarget).data('character');
		 if ($.inArray(character,features)!= -1){
			 //по id ыопроса
			 $scope.current = $scope.questions[i].yes[number-1];
			 $scope.imagesBlockStyle = {'display': 'none'}; 
			 $scope.goStyle = {'display': 'block'};
			 
			// $('#go').fadeIn();
		 }
		 else {
			$scope.current = $scope.questions[i].no[number-1];
			$scope.tryStyle = {'display': 'block'};
			$scope.imagesBlockStyle = {'display': 'none'}; 
			
		 } 
		 
	}
	this.continueGame = function(){
		$scope.imagesBlockStyle = {'display': 'block'}; 
		$scope.current = $scope.questions[++i].text;
		var j = 0;
		angular.forEach($scope.imagesVariants, function(value, key){
				 angular.element($scope.imagesVariants[key]).attr('data-character' ,$scope.questions[i].character[j]);
				 angular.element($scope.imagesVariants[key]).children().attr('ng-src' ,$scope.questions[i].variants[j++]);
				// console.log($scope.questions[i].variants[j++]);
			 });
		 
	}
	this.tryAgain = function(){
		location.reload();
	} 
	
	angular.forEach($scope.imagesVariants, function(value, key){
				 angular.element($scope.imagesVariants[key]).attr('data-character' ,$scope.questions[0].character[j++]);
				 angular.element($scope.imagesVariants[key]).attr('ng-src' ,$scope.questions[0].variants[j++]);;
				 
			});
     
});

myApp.directive('imagesVariants', function($http){ //наверное не отдельную директиву , а после нажатия кнопки -продолжить
	return {
		restrict:'EA',
			controller: 'QuestionsListCtrl',
		link: function (scope, element,attribure){
			var j = 0;
			this.imagesVariants = element.children(); 
			 
		}
	}
});

myApp.directive('addCanvas', function($http){
	
	return{
		restrict:'EA',
		controller: 'QuestionsListCtrl',
		link: function (scope, element,attribure){
	    var context = element[0].getContext('2d');
			context.beginPath();
			context.rect(0,75,960,500);
			context.fillStyle = 'gray';
			context.fill();
			var topOffset =  element.offset().top + context.canvas.clientHeight/1.4 ;
			scope.buttonsStyle = {'margin-top':topOffset};
		  
			$( window ).resize(function() {
				var topOffset =  element.offset().top ;
				scope.buttonsStyle = {'margin-top':topOffset + context.canvas.clientHeight/1.4};
			});		
				 
			scope.$watch('current',function(){
				 
				var tablo = element[0].getContext('2d'),
				            maxWidth = 870;
				            lineHeight = 25;
				            x = (1000 - maxWidth) / 2;
				            y = 160;
				            text =  scope.current;
				drawPanel();	
                drawInnerShadow()				
				function drawPanel(){
					tablo.beginPath();
					tablo.fillStyle = '#A3CCCC';
					tablo.rect(37,100,884,230);
					tablo.lineWidth = 3;
					tablo.strokeStyle = '#537373';
					tablo.stroke();
					tablo.fill();	 
				}		
				
				function drawInnerShadow(){
					tablo.beginPath();
					tablo.rect(37,100,884,230);
					tablo.clip();
					tablo.beginPath();
					tablo.lineWidth = 5;
					tablo.shadowBlur = 15;
					tablo.shadowColor = 'black';
					tablo.shadowOffsetX = 0;
					tablo.shadowOffsetY = 0;
					tablo.rect(34,97,890,236);
					tablo.stroke();
					tablo.shadowBlur = 0; //для текста делаем 0 размытость
					tablo.font = '16pt Calibri';
					tablo.fillStyle = '#000000';
				}
				 
			 
				 if (text != undefined){
					   wrapText(tablo, text, x, y, maxWidth, lineHeight);
				 }
			  
				function wrapText(context, text, x, y, maxWidth, lineHeight) {
					var words = text.split(' '),
					    currentLine = '', textLine, textWidth;
					for(var n = 0; n < words.length; n++) {
						textLine = currentLine + words[n] + ' ';
						textWidth  = context.measureText(textLine).width;
						// if (textWidth > maxWidth measureText&& n > 0) {
						if (textWidth > maxWidth) {
							context.fillText(currentLine, x, y);
							currentLine = words[n] + ' ';
							y += lineHeight;
						}
						else {
						    currentLine = textLine;
						}
					}
					context.fillText(currentLine, x, y);
				}
			});
		 }
		 
			/*function getPosition(e,ctx) {
			var x,y;
		    x = e.pageX;
			y = e.pageY;
			console.log(x, y);
			yOff =  $('#controlPanel').offset().top;
			xOff =  $('#controlPanel').offset().left;
			console.log(xOff, yOff);
		   
			//if (((154 + xOff) > x) && ((70 + xOff) < x ) &&  (y > (yOff + 300)) && (y < (350 + yOff))){
			if (((154 + xOff) > x)   && (y > (yOff + 300)) && (y < (350 + yOff))){
				 ctx.fillStyle = 'red';
			}
		}*/ 
		 
		 
	}; 
	
    
	
}); 