(function () {
'use strict';

angular.module('alAngularHeroRamjet', ['ngAnimate'])
    .animation('.hero-ramjet-transition', [function () {

        var _fromScreen, _toScreen, _doneList, _startTimer, _movingList;

        // Capture the screen that is transitioning in
        var enter = function enter(screen, done) {
            _toScreen = screen;
            _doneList.push(done);
            return tryStart();
        };

        // Capture the screen that is transitioning out
        var leave = function leave(screen, done) {
            _fromScreen = screen;
            _doneList.push(done);

            screen.addClass('hero-leave');
            return tryStart();
        };

        // If we have both screens then trigger the transition
        var tryStart = function tryStart() {
            if (!_fromScreen || !_toScreen) {
                // Allow time to get a second screen, or else cancel
                _startTimer = setTimeout(function () { finish(true); });
                return null;
            } else {
                if (_startTimer) clearTimeout(_startTimer);

                // Both screens, so start now
                setTimeout(start);

                // Return a cancel function, which should only call clear once
                var cancelled = false;
                return function () {
                    if (!cancelled) {
                        cancelled = true;
                        clear();
                    }
                };
            }
        };

        // Start the hero transitions
        var start = function start() {
            _fromScreen.addClass('hero-ramjet-leave');
            _toScreen.addClass('hero-ramjet-enter');

            // Get hero elements from both screens
            var fromHeros = _fromScreen[0].getElementsByClassName("hero-ramjet");
            var toHeros = _toScreen[0].getElementsByClassName("hero-ramjet");

            for (var m = 0; m < toHeros.length; m++) {
                angular.element(toHeros[m]).addClass('hero-ramjet-inactive');
            }

            // Find all the matching pairs
            var pairs = [];
            for (var n = 0; n < fromHeros.length; n++) {
                for (var m = 0; m < toHeros.length; m++) {
                    if (fromHeros[n].getAttribute('hero-id') === toHeros[m].getAttribute('hero-id')) {
                        angular.element(toHeros[m]).removeClass('hero-ramjet-inactive');
                        pairs.push({ from: fromHeros[n], to: toHeros[m] });
                    }
                }
            }

            // Trigger the animation for each pair
            pairs.forEach(function (pair) {
                animateHero(pair.from, pair.to);
            });

            finish();
        };

        // Animate a hero element from one position to another
        var animateHero = function animateHero(fromHero, toHero) {
          ramjet.hide(fromHero);
          ramjet.hide(toHero);
          var handler = {
            complete: false,
            onComplete: function() {
              handler.complete = true;
              finish();
            },
            remove: function() {
              ramjet.show(fromHero);
              ramjet.show(toHero);
            }
          };
          _movingList.push(handler);
          ramjet.transform(fromHero, toHero, {
            done: handler.onComplete
          });
        };

        // Finish up if all elements have finished animating
        var finish = function finish(cancelled) {
            // Check that all the moving elements are complete
            var allComplete = true;
            if (!cancelled) {
                _movingList.forEach(function (m) { allComplete = allComplete && m.complete; });
            }

            if (allComplete) {
                // Call "done" on both screens (which may call "clear" so clone the array)
                var doneCallbacks = _doneList.slice(0);
                doneCallbacks.forEach(function (done) { done(); });
                // Make sure we've cleared for the next time
                clear();
            }
        };

        // Clear everything down and initialise for next time
        var clear = function clear() {
            if (_fromScreen) {
                _fromScreen.removeClass('hero-ramjet-leave');
            }
            if (_toScreen) {
                _toScreen.removeClass('hero-ramjet-enter');
            }

            // TODO(timgreen): remove class 'hero-ramjet-inactive'

            _fromScreen = null;
            _toScreen = null;
            _doneList = [];

            // Call remove for each animating hero element
            if (_movingList) _movingList.forEach(function (m) { m.remove(); });
            _movingList = [];
        };
        clear();

        // Definition of the AngularJS animation
        return {
            enter: function (element, done) {
                return enter(element, done);
            },
            leave: function (element, done) {
                return leave(element, done);
            }
        };
    }]);
})();
