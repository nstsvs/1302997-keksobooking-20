'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var offsetTop = mainPin.offsetTop;
      var offsetLeft = mainPin.offsetLeft;

      var mainPinX = offsetLeft - shift.x + window.pin.WIDTH / 2;
      var mainPinY = offsetTop - shift.y + window.pin.HEIGHT;

      if (mainPinY >= window.data.MAP_Y_MIN && mainPinY <= window.data.MAP_Y_MAX) {
        mainPin.style.top = (offsetTop - shift.y) + 'px';
      }
      if (mainPinX >= window.data.MAP_X_MIN && mainPinX <= window.data.MAP_X_MAX) {
        mainPin.style.left = (offsetLeft - shift.x) + 'px';
      }
      window.form.addMainPinAddress(true);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
