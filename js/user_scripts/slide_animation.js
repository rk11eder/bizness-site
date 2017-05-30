'use strict';

/*exemplo controller*/
biznessApp.animation('.slide-animation', ['$rootScope', function ($rootScope) {
    var i = 0;
    return {
        addClass: function (element, className, done) {

            var numeroRepeticoes = $rootScope.destaques.length*2;
            if($rootScope.contador_animation>numeroRepeticoes){
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

            $rootScope.contador_animation++;
        },
        removeClass: function (element, className, done) {

            if (className == 'ng-hide' ) {
                element.removeClass('ng-hide');

                /*TweenMax.set(element, { left: element.parent().width() });
                TweenMax.to(element, 0.5, {left: 0, onComplete: done });*/
                TweenMax.set(element,{css:{zIndex:1}});
                TweenMax.fromTo(element, 2, { left: element.parent().width() }, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
}]);