/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.5
 * 
 * @license MIT, see http://github.com/asvd/intence
 * @copyright 2015 asvd <heliosframework@gmail.com> 
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove;
    var mouseup;
    var mousedown;

    if (typeof window.ontouchstart !== 'undefined') {
       mousedown = 'touchstart';
       mousemove = 'touchmove';
       mouseup = 'touchend';
    } else {
       mousemove = 'mousemove';
       mouseup = 'mouseup';
       mousedown = 'mousedown';
    }
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;

    var dragged = [];
    var reset = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }

        dragged = _document.getElementsByClassName('dragscroll');
        for (i = 0; i < dragged.length;) {
            (function(el, lastClientX, lastClientY, pushed){
                el[addEventListener](
                    'mousedown',
                    el.md = function(e) {
                        pushed = 1;
                        if (e.targetTouches && (e.targetTouches.length >= 1)) {
                          lastClientY = e.targetTouches[0].clientY;
                        } else {
                          lastClientY = e.clientY;
                          e.preventDefault();
                          e.stopPropagation();
                        }
                    }, 0
                );

                 _window[addEventListener](
                     'mouseup', el.mu = function() {pushed = 0;}, 0
                 );

                _window[addEventListener](
                    'mousemove',
                    el.mm = function(e, scroller) {
                        scroller = el.scroller||el;
                        if (pushed) {
                           if (e.targetTouches && (e.targetTouches.length >= 1)) {
                               scroller.scrollTop -=
                                 (- lastClientY + (lastClientY=e.targetTouches[0].clientY));
                               e.preventDefault();
                           } else {
                               scroller.scrollTop -=
                                 (- lastClientY + (lastClientY=e.clientY));
                           }
                        }
                    }, 0
                );

                el[addEventListener]('wheel',
                    el.mw = function(e, scroller) {
                        scroller = el.scroller||el;
                        scroller.scrollTop += e.deltaY/3;
                    }, 0
                );
             })(dragged[i++]);
        }
    }

    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));

