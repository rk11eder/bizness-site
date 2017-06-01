'use strict';

/*exemplo controller*/
biznessApp.animation('.slide-animation-titulo', ['$rootScope', function ($rootScope) {
    var i = 0;
    return {
        addClass: function (element, className, done) {

            var numeroRepeticoes = $rootScope.destaques.length;
            if($rootScope.contador_animation>=numeroRepeticoes){
                if (className == 'ng-hide' ) {
                    TweenMax.set(element,{css:{zIndex:0}});
                    TweenMax.to(element, 2, {right: element.parent().width(), onComplete: done });
                    console.log("log1");
                }
                else {
                    console.log("log2");
                    done();
                }

            }else{
                console.log("log3");
                TweenMax.set(element,{right:-(element.parent().width()*2)});
            }

            $rootScope.contador_animation++;
        },
        removeClass: function (element, className, done) {

            if (className == 'ng-hide' ) {
                console.log("log4");
                element.removeClass('ng-hide');

                /*TweenMax.set(element, { left: element.parent().width() });
                TweenMax.to(element, 0.5, {left: 0, onComplete: done });*/
                TweenMax.set(element,{css:{zIndex:1}});
                // console.log(element.prev().width());

                TweenMax.fromTo(element, 2, { right: -element.parent().width()}, {right: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
}]);
biznessApp.animation('.slide-animation', ['$rootScope', function ($rootScope) {
    var i = 0;
    return {
        addClass: function (element, className, done) {

            var numeroRepeticoes = $rootScope.destaques.length;
            if($rootScope.contador_animation>=numeroRepeticoes){
                if (className == 'ng-hide' ) {
                    TweenMax.set(element,{css:{zIndex:0}});
                    TweenMax.to(element, 2, {left: -(element.parent().width()), onComplete: done });
                }
                else {
                    done();
                }

            }else{
                TweenMax.set(element,{left:(element.parent().width())});
            }

        },
        removeClass: function (element, className, done) {

            if (className == 'ng-hide' ) {
                element.removeClass('ng-hide');

                /*TweenMax.set(element, { left: element.parent().width() });
                 TweenMax.to(element, 0.5, {left: 0, onComplete: done });*/
                TweenMax.set(element,{css:{zIndex:$rootScope.contador_animation}});
                // TweenMax.fromTo(element, 2, { left: element.parent().width() }, {left: 0, onComplete: done });
                TweenMax.fromTo(element, 2, { left: element.parent().width() }, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
}]);