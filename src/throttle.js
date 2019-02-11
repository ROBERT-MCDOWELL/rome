'use strict';

module.exports = function throttle (fn, boundary) {
  var last = -Infinity;
  var timer;
  return function bounced () {
    function unbound () {
      try{
        clearTimeout(timer);
        timer = null;
        var next = last + boundary;
        var now = +new Date();
        if (now > next) {
          last = now;
          fn.apply(this, arguments);
        } else {
          timer = setTimeout(unbound, next - now);
        }
      }catch(e){}
    }
    if (timer) {
      return;
    }
    unbound();
  };
};
