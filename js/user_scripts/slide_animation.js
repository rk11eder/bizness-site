'use strict';

/*exemplo controller*/
biznessApp.animation('.slide-animation', function () {
    return {
        beforeAddClass: function (element, className, done) {

            if (className == 'ng-hide') {
                TweenMax.to(element, 2, {left: -element.parent().width(), onComplete: done });
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {

            if (className == 'ng-hide') {
                element.removeClass('ng-hide');

                /*TweenMax.set(element, { left: element.parent().width() });
                TweenMax.to(element, 0.5, {left: 0, onComplete: done });*/
                TweenMax.fromTo(element, 2, { left: element.parent().width() }, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
});