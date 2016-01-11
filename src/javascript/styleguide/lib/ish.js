'use strict';

var lsg = window.lsg || {};

lsg.ish = (function() {

  var fullMode = false;
  var discoMode;
  var hayMode;
  var bodySize = 16;
  var minViewportWidth = 240;
  var maxViewportWidth = 2600;
  var viewportResizeHandleWidth = $('#ish-rightpull').width();

  /* RESIZE */

  function resizeViewport(size) {
    var sizeInt = parseInt(size);
    if (!isNaN(sizeInt)) {
      toggleSizeButton();
      sizeIframe(sizeInt, false);
      setHashWithSize(sizeInt);
      return;
    }

    var sw = $('#ish-vp-wrap').width() - viewportResizeHandleWidth;
    switch (size) {
      case "s":
        sizeIframe(getRandom(minViewportWidth, 500));
        break;
      case "m":
        sizeIframe(getRandom(500, 800));
        break;
      case "l":
        sizeIframe(getRandom(800, 1200));
        break;
      case "random":
        sizeIframe(getRandom(minViewportWidth, sw));
        break;
      case "disco":
        discoMode = setInterval(function() {
          sizeIframe(getRandom(minViewportWidth, sw));
        }, 1000);
        break;
      case "hay":
        var $ishWrapper = $('#ish-container');
        var $ishViewport = $('#ish-viewport');

        if (!hayMode) {
          $ishWrapper
            .removeClass('vp-animate')
            .width(minViewportWidth + viewportResizeHandleWidth);
          $ishViewport
            .removeClass('vp-animate')
            .width(minViewportWidth);

          window.setTimeout(function(){
            $ishWrapper
              .addClass('hay-mode')
              .width(sw + viewportResizeHandleWidth);
            $ishViewport
              .addClass('hay-mode')
              .width(sw);

            hayMode = setInterval(function() {
              updateSizeReading($ishViewport.width());
            }, 100);
          }, 200);
        }
        else {
          hayMode = false;
          sizeIframe($('#ish-viewport').width(), false);
          toggleSizeButton();
          setHashWithSize();
          return;
        }
        break;
      // full
      default:
        sizeIframe(sw, !fullMode);
        fullMode = true;
        break;
    }

    toggleSizeButton($('.ish-size-options a[data-size="'+size+'"]'));
    setHashWithSize(size);
  }

  function resizeWindow() {
    if (fullMode) {
      resizeViewport('full');
    }
  }

  function sizeIframe(size, animate) {
    animate = (typeof animate !== 'undefined') ? animate : true;

    if (size > maxViewportWidth) {
      size = maxViewportWidth;
    }
    else if (size < minViewportWidth) {
      size = minViewportWidth;
    }

    $('#ish-container')
      .toggleClass('vp-animate', animate)
      .width(size + viewportResizeHandleWidth);
    $('#ish-viewport')
      .toggleClass('vp-animate', animate)
      .width(size);

    updateSizeReading(size);
  }

  /* SIZE INPUTS */

  function updateSizeReading(size, unit) {
    var pxSize, emSize;

    if (unit === 'em') {
      emSize = size;
      pxSize = em2px(size);
    }
    else {
      pxSize = size;
      emSize = px2em(size);
    }

    var $sizePx = $('.ish-input[data-unit="px"]');
    var $sizeEm = $('.ish-input[data-unit="em"]');

    if (unit === 'em') {
      $sizePx.val(pxSize);
    }
    else if (unit === 'px') {
      $sizeEm.val(emSize.toFixed(2));
    }
    else {
      $sizeEm.val(emSize.toFixed(2));
      $sizePx.val(pxSize);
    }
  }

  function keydownSizeInput(e) {
    var $input = $(this);
    var val = Math.floor($input.val());

    if (isNaN(val)) return;

    resetModes();

    var isEm = ($input.data('unit') === 'em');

    // up arrow
    if (e.keyCode === 38) {
      val++;
      val = isEm ? em2px(val) : val;
      resizeViewport(val);
    }
    // down arrow
    else if (e.keyCode === 40) {
      val--;
      val = isEm ? em2px(val) : val;
      resizeViewport(val);
    }
    // enter
    else if (e.keyCode === 13) {
      e.preventDefault();
      val = isEm ? em2px(val) : val;
      resizeViewport(val);

      $input.blur();
    }

    toggleSizeButton();
  }

  function keyupSizeInput() {
    var $input = $(this);
    var val = Math.floor($input.val());

    if (isNaN(val)) return;

    updateSizeReading(val, $input.data('unit'));
  }

  function toggleSizeButton(link) {
    $('.ish-size-options a').removeClass('active');

    if (link) {
      link.addClass('active');
    }
  }

  /* SIZE BUTTONS */

  function clickSizeButton(e) {
    e.preventDefault();

    var $sizeButton = $(this);
    var size = $sizeButton.data('size');

    resetModes(size);

    if (discoMode && (size === 'disco')) {
      discoMode = false;
      toggleSizeButton();
      setHashWithSize();
      return;
    }

    resizeViewport(size);
  }

  /* CODE BUTTONS */

  function clickCodeButton(e) {
    e.preventDefault();

    displayCode(!$(this).hasClass('active'));
  }

  function displayCode(show) {
    var $codeButton = $('#code-toggle');
    var $codes = $('#ish-viewport').contents().find('pre.prism');

    $codeButton.toggleClass('active', show);
    $codes.toggle(show);
    sessionStorage.setItem('codeDisplay', show);
  }

  /* SIZE HANDLE */

  function mousedownSizePullBar(e) {
    var origClientX = e.clientX;
    var origViewportWidth = $('#ish-viewport').width();

    resetModes();

    $('#ish-cover')
      // show the cover
      .show()
      // add the mouse move event and capture data. also update the viewport width
      .on('mousemove', function(event) {
        var viewportWidth = (origClientX > event.clientX)
                            ? origViewportWidth - ((origClientX - event.clientX)*2)
                            : origViewportWidth + ((event.clientX - origClientX)*2);

        if (viewportWidth > minViewportWidth) {
          resizeViewport(viewportWidth);
        }
      });
  }

  function mouseupBody() {
    $('#ish-cover')
      .hide()
      .off('mousemove');
  }

  function init(w) {
    // window resize
    $(w).resize(resizeWindow);

    // size input
    $('.ish-input').on({
      keydown: keydownSizeInput,
      keyup: keyupSizeInput
    });

    // size buttons
    $('.ish-size-options a').on('click', clickSizeButton);

    // code button
    $('#code-toggle').on('click', clickCodeButton);

    var show;
    try { show = JSON.parse(sessionStorage.getItem('codeDisplay')); }
    catch(e) { show = true; sessionStorage.setItem('codeDisplay', show); }
    displayCode(show);

    // handles widening the "viewport" :
    //   1. on "mousedown" store the click location
    //   2. make a hidden div visible so that it can track mouse movements
    //      and make sure the pointer doesn't get lost in the iframe
    //   3. on "mousemove" calculate the math, save the results to a cookie,
    //      and update the viewport
    $('#ish-rightpull').on('mousedown', mousedownSizePullBar);

    // unbind mouse event on cover
    $('body').on('mouseup', mouseupBody);

    // resize viewport on hash
    resizeViewport(getSizeFromHash());
  }

  /* UTILS */
  function resetModes(size) {
    fullMode = false;

    if (discoMode) {
      clearInterval(discoMode);
      discoMode = (size === 'disco');
    }

    if (hayMode) {
      var $ishWrapper = $('#ish-container');
      var $ishViewport = $('#ish-viewport');

      // fix width
      $ishWrapper.width($ishWrapper.width());
      $ishViewport.width($ishViewport.width());

      clearInterval(hayMode);
      hayMode = (size === 'hay');
      $ishWrapper.removeClass('hay-mode');
      $ishViewport.removeClass('hay-mode');
    }
  }

  function getSizeFromHash() {
    var hashes = window.location.hash.split('#');

    if (hashes.length > 2) {
      return hashes[hashes.length-1];
    }

    return "full";
  }
  function setHashWithSize(size) {
    var hashes = window.location.hash.split('#');

    if (hashes.length > 2) {
      if (!size) {
        hashes.pop();
      }
      else {
        hashes[hashes.length-1] = size;
      }
      window.location.hash = hashes.join('#');
    }
    else {
      window.location.hash += '#'+size;
    }
  }

  function getRandom(min, max) {
    var num = Math.random() * (max - min) + min;

    return parseInt(num);
  }

  function em2px(em) {
    return Math.floor(em * bodySize);
  }
  function px2em(px) {
    return px/bodySize;
  }

  return {
    resizeViewport: resizeViewport,
    resizeWindow: resizeWindow,
    displayCode: displayCode,
    init: init
  };
})();
