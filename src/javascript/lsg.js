/* global $, hljs */

'use strict';

var lsg = window.lsg || {};

lsg.nav = function nav() {

  // DOM
  var $lsg = $('.lsg');
  var $toggle = $('.lsg-nav-toggle');
  var $nav = $('.lsg-nav');
  var $navLinks = $nav.find('.lsg-nav-content a');
  var $iframe = $('#ish-viewport');

  var openMenu = function openMenu() {
    if ($toggle.hasClass('lsg-nav-sticky')) return;

    $lsg.addClass('lsg-nav-open');
  };

  var closeMenu = function closeMenu() {
    if ($toggle.hasClass('lsg-nav-sticky')) return;

    $lsg.removeClass('lsg-nav-open');
  };

  var toggleStickyMenu = function toggleStickyMenu() {
    $toggle.toggleClass('lsg-nav-sticky');
  };

  var openLink = function openLink(e) {
    e.preventDefault();
    var $link = $(this);

    if ($iframe.length) {
      $navLinks.removeClass('is-current');
      $link.addClass('is-current');
      $iframe.attr('src', $link.attr('href'));

      var hashes = window.location.hash.split('#');
      if (hashes[1]) {
        hashes[1] = $link.attr('href');
        window.location.hash = hashes.join('#');
      }
      else {
        window.location.hash += '#'+$link.attr('href');
      }
    }
    else {
      var href = "";
      href += window.location.origin;
      href += "/ish.html#";
      href += $link.attr('href');

      window.location.href = href;
    }
  };

  // events
  $navLinks.on({
    click: openLink
  });

  $toggle.on({
    mouseenter: openMenu,
    mouseleave: closeMenu,
    click: toggleStickyMenu
  });

  $nav.on({
    mouseleave: closeMenu,
    mouseenter: openMenu,
    transitionend: function() {
      if (lsg.ish) lsg.ish.resizeWindow();
    }
  });
};


lsg.location = function location($iframe) {
  var hashes = window.location.hash.split('#');

  if (hashes[1]) {
    $iframe.attr('src', hashes[1]);
    $('.lsg-nav a[href="'+hashes[1]+'"]').addClass('is-current');
  }
  else {
    window.location.href = window.location.origin;
  }

  lsg.ish.init(window);
};


lsg.highlight = function highlight($modules) {
  var tpl = $('<pre class="prism language-markup"><code></code></pre>');

  $modules.each(function() {
    var $module = $(this);
    var node = tpl.clone();
    var code = $.trim($module.html());

    node.find('code').text(window.html_beautify(code));
    $module.next('pre.prism[class*="language-"]').after(node);
  });

  if (window.Prism) {
    window.Prism.highlightAll();
  }

  // set code display
  var show = $(parent.document.body).find('#code-toggle').hasClass('active');
  $('pre.prism').toggle(show);
};


/**
 * Initialization
 */

lsg.init = function init() {

  if ($('body').hasClass('lsg')) {
    lsg.nav();
  }
  var $iframe = $('#ish-viewport');
  if ($iframe.length) {
    lsg.location($iframe);
  }
  var $modules = $(".lsg-elem, .lsg-module");
  if ($modules.length) {
    lsg.highlight($modules);
  }
};

document.addEventListener("DOMContentLoaded", lsg.init);
