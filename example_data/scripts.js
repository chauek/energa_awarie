"use strict";

/* eslint-disable no-useless-escape */
/* eslint-disable no-var */
/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
// document.addEventListener('DOMContentLoaded', fuction () {
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (d) {
  "function" === typeof define && define.amd ? define(["jquery"], d) : d(jQuery);
})(function (d) {
  function m(a) {
    return a;
  }
  function n(a) {
    return decodeURIComponent(a.replace(j, " "));
  }
  function k(a) {
    0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
    try {
      return e.json ? JSON.parse(a) : a;
      // eslint-disable-next-line no-empty
    } catch (c) {}
  }
  var j = /\+/g,
    e = d.cookie = function (a, c, b) {
      if (void 0 !== c) {
        b = d.extend({}, e.defaults, b);
        if ("number" === typeof b.expires) {
          var g = b.expires,
            f = b.expires = new Date();
          f.setDate(f.getDate() + g);
        }
        c = e.json ? JSON.stringify(c) : String(c);
        return document.cookie = [e.raw ? a : encodeURIComponent(a), "=", e.raw ? c : encodeURIComponent(c), b.expires ? "; expires=" + b.expires.toUTCString() : "", b.path ? "; path=" + b.path : "", b.domain ? "; domain=" + b.domain : "", b.secure ? "; secure" : ""].join("");
      }
      c = e.raw ? m : n;
      b = document.cookie.split("; ");
      for (var g = a ? void 0 : {}, f = 0, j = b.length; f < j; f++) {
        var h = b[f].split("="),
          l = c(h.shift()),
          h = c(h.join("="));
        if (a && a === l) {
          g = k(h);
          break;
        }
        a || (g[l] = k(h));
      }
      return g;
    };
  e.defaults = {};
  d.removeCookie = function (a, c) {
    return void 0 !== d.cookie(a) ? (d.cookie(a, "", d.extend(c, {
      expires: -1
    })), !0) : !1;
  };
});

/*!
 * netPR.pl Cookie Policy Plugin
 */
var NETPR_COOK = NETPR_COOK || {};
(function (d) {
  var b = {
    name: null,
    detect: function detect() {
      var h = navigator.appName,
        g = navigator.userAgent,
        f;
      var i = g.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
      if (i && (f = g.match(/version\/([\.\d]+)/i)) !== null) {
        i[2] = f[1];
      }
      i = i ? [i[1]] : [h];
      this.name = i;
    },
    lang: "pl",
    cookieUrl: function cookieUrl() {
      var f = {
        pl: {
          Chrome: "http://support.google.com/chrome/bin/answer.py?hl=pl&answer=95647",
          Firefox: "http://support.mozilla.org/pl/kb/W%C5%82%C4%85czanie%20i%20wy%C5%82%C4%85czanie%20obs%C5%82ugi%20ciasteczek",
          Opera: "http://help.opera.com/Linux/9.60/pl/cookies.html",
          Safari: "http://support.apple.com/kb/ph5042",
          MSIE: "http://windows.microsoft.com/pl-pl/windows7/how-to-manage-cookies-in-internet-explorer-9"
        },
        en: {
          Chrome: "http://support.google.com/chrome/bin/answer.py?hl=en&answer=95647",
          Firefox: "http://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences",
          Opera: "http://help.opera.com/Linux/9.60/en/cookies.html",
          Safari: "http://support.apple.com/kb/ph5042",
          MSIE: "http://windows.microsoft.com/en-gb/internet-explorer/delete-manage-cookies"
        }
      };
      return f[this.lang][this.name];
    }
  };
  function a() {
    try {
      return "localStorage" in window && window.localStorage !== null;
    } catch (f) {
      return false;
    }
  }
  function e() {
    var f = new Date().getTime();
    if (a()) {
      localStorage.setItem("netprCooAgr", f);
    } else {
      d.cookie("netprCooAgr", f, {
        expires: 3650,
        path: "/"
      });
    }
    $("#cookiePolicy").hide();
  }
  function c(h) {
    var f = false;
    if (a()) {
      if (localStorage.getItem("netprCooAgr")) {
        f = true;
      }
    } else {
      if (d.cookie("netprCooAgr")) {
        f = true;
      }
    }
    if (!f) {
      var g = h.html;
      if (d.isArray(g)) {
        g = g.join("");
      }
      if (g.indexOf("{{settings}}") !== -1) {
        g = g.split("{{settings}}");
        g = g[0] + b.cookieUrl() + g[1];
      }
      if (d.isFunction(h.insert)) {
        h.insert(g);
      } else {
        d("body").prepend(g);
      }
    }
    if (d.isFunction(h.callback)) {
      h.callback();
    }
  }
  NETPR_COOK.init = function (f) {
    if (f.language) {
      b.lang = f.language.toLowerCase();
    }
    b.detect();
    c(f);
    d("#cookieDismiss").on("click", function (g) {
      g.preventDefault();
      e();
    });
  };
  NETPR_COOK.cookieDismiss = e;
})(jQuery);
$(function () {
  var cookieText = 'Strona korzysta z plików cookies w celu realizacji usług i zgodnie z <a href="/o-serwisie/polityka-cookies" target="_blank" title ="Polityka ochrony prywatności">Polityką Plików Cookies</a>. Możesz określić warunki przechowywania lub dostępu do plików cookies w ustawieniach przeglądarki.';
  var iframeToEmbeded = document.querySelector(".iframeToEmbed-js");
  if (!iframeToEmbeded) {
    NETPR_COOK.init({
      callback: function callback() {
        $(".square").on("click", function (e) {
          e.preventDefault();
          NETPR_COOK.cookieDismiss();
        });
      },
      html: ['<div class="row">', '<div class="small-12 columns">', '<div class="cookies" id="cookiePolicy">', '<div class="good-width cookie-wrap">', '<p class="cookie-text">', cookieText, "</p>", '<span id="cookieDismiss">Rozumiem</span>', "</div>", "</div>", "</div>", "</div>"],
      insert: function insert(o) {
        $("body").append(o);
      }
    });
  }
});

// });
"use strict";

/* eslint-disable no-unused-vars */
// https://medium.com/@im_rahul/focus-trapping-looping-b3ee658e5177
/**
 * Selectors for all focusable elements
 * @type {string}
 */
var FOCUSABLE_ELEMENT_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]';
var KEY_CODE_MAP = {
  TAB: 9
};

/**
 * A stateless keyboard utility to -
 * - Trap focus,
 * - Focus the correct Element
 * @param config {
 *   el: HTMLElement. The Parent element, within which the focus should be trapped
 *   focusElement: <Optional> HTMLElement. If Not provided, focus is put to the first focusable element
 *  escCallback: function to perform on esc
 * }
 * @return {Function} Function. The cleanup function. To undo everything done for handling A11Y
 */
function loopFocus(config) {
  if (!config) {
    throw new Error("Could not initialize focus-trapping - Config Missing");
  }
  var el = config.el,
    escCallback = config.escCallback,
    focusElement = config.focusElement;
  if (!el) {
    throw new Error("Could not initialize focus-trapping - Element Missing");
  }
  if (escCallback && !(escCallback instanceof Function)) {
    throw new Error("Could not initialize focus-trapping - `config.escCallback` is not a function");
  }
  var focusableElements = el.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS);
  var keyboardHandler;

  //There can be containers without any focusable element
  if (focusableElements.length > 0) {
    var firstFocusableEl = focusableElements[0],
      lastFocusableEl = focusableElements[focusableElements.length - 1],
      elementToFocus = focusElement ? focusElement : firstFocusableEl;
    // najprawdopodobniej przez brak widzialnego elementu w DOM, nie może ustawić focusa na elemencie
    // dokumentacja jQuery
    // Attempting to set focus to a hidden element causes an error in Internet Explorer. Take care to only use .focus() on elements that are visible. To run an element's focus event handlers without setting focus to the element, use .triggerHandler( "focus" ) instead of .focus().
    setTimeout(function () {
      elementToFocus.focus();
    }, 100);
    keyboardHandler = function keyboardHandler(e) {
      if (e.keyCode === KEY_CODE_MAP.TAB) {
        //Rotate Focus
        if (e.shiftKey && document.activeElement === firstFocusableEl) {
          e.preventDefault();
          lastFocusableEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusableEl) {
          e.preventDefault();
          firstFocusableEl.focus();
        }
      }
    };
    el.addEventListener("keydown", keyboardHandler);
  }

  //The cleanup function. Put future cleanup tasks inside this.
  return function cleanUp() {
    if (keyboardHandler) {
      el.removeEventListener("keydown", keyboardHandler);
    }
    config.escCallback();
  };
}
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/* eslint-disable no-empty */
var isDevelopment = window.location.origin.includes("secure");
var url = document.body.dataset.translations;
var translations = sessionStorage.getItem("i18n") ? JSON.parse(sessionStorage.getItem("i18n")) : null;
function getTranslations() {
  return _getTranslations.apply(this, arguments);
}
function _getTranslations() {
  _getTranslations = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var response, data, dataToString;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(isDevelopment && !translations)) {
            _context.next = 3;
            break;
          }
          _context.next = 13;
          break;
        case 3:
          if (translations) {
            _context.next = 13;
            break;
          }
          _context.next = 6;
          return fetch(url);
        case 6:
          response = _context.sent;
          _context.next = 9;
          return response.json();
        case 9:
          data = _context.sent;
          dataToString = JSON.stringify(data);
          translations = data;
          sessionStorage.setItem("i18n", dataToString);
        case 13:
          return _context.abrupt("return", translations);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getTranslations.apply(this, arguments);
}
getTranslations();
"use strict";

(function () {
  var fls = false;
  var flsElem = $(".flsMobile");
  var topOffsetSize = 0;
  function ifItsFls() {
    if (flsElem.length > 0) {
      fls = true;
    } else {
      fls = false;
    }
  }
  function flsAction() {
    if (fls) {
      // Faktycznie że może na scrolu nie ma sensu sprawdzać szerokości do zmiany
      if ($(window).innerWidth() < 640) {
        changeIconView();
      } else {
        if (flsElem.hasClass("fls__main")) {
          flsElem.removeClass("fls__main");
        }
      }
    }
  }
  function changeIconView() {
    topOffsetSize = $(window).scrollTop();
    if (topOffsetSize > 80 && flsElem.hasClass("fls__main")) {
      flsElem.removeClass("fls__main");
    } else {
      if (topOffsetSize <= 80) {
        flsElem.addClass("fls__main");
      }
    }
  }
  ifItsFls();
  flsAction();
  $(window).on("scroll resize", function () {
    flsAction();
  });
})();
"use strict";

/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
/**
 * jQuery Typographer
 * Copyright (C) 2011 by mirz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function ($, window, document, undefined) {
  "use strict";

  var plugin = {
    ns: "typographer",
    name: "common"
  };
  var quoteSpecialCharsRegex = /([.?*+^$[\]\\(){}|-])/g;
  plugin.fullName = plugin.ns + "_" + plugin.name;
  $[plugin.fullName] = $[plugin.fullName] || {};
  $[plugin.fullName].normalizeTagNames = function (tags) {
    return $.map(tags, function (tagName) {
      return tagName.toLowerCase();
    });
  };
  $[plugin.fullName].getTextNodesIn = function (node, includeWhitespaceNodes) {
    var textNodes = [],
      onlyWhitespaces = /^\s*$/;
    var TEXT_NODE = 3;
    function getTextNodes(node) {
      if (node.nodeType == TEXT_NODE) {
        if (includeWhitespaceNodes || !onlyWhitespaces.test(node.nodeValue)) {
          textNodes.push(node);
        }
      } else {
        for (var i = 0, len = node.childNodes.length; i < len; ++i) {
          getTextNodes(node.childNodes[i]);
        }
      }
    }
    getTextNodes(node);
    return textNodes;
  };
  $[plugin.fullName].shouldIgnore = function (node, stopNode, options) {
    while (node !== stopNode) {
      if (node.tagName && $.inArray(node.tagName.toLowerCase(), options.ignoreTags) > -1) {
        return true;
      }
      if ($(node).hasClass(options.ignoreClass)) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };
  $[plugin.fullName].quoteRegex = function (str) {
    return (str + "").replace(quoteSpecialCharsRegex, "\\$1");
  };
})(jQuery, window, document);
"use strict";

/* eslint-disable no-shadow-restricted-names */
/**
 * jQuery Typographer
 * Copyright (C) 2011 by mirz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function ($, window, document, undefined) {
  "use strict";

  var plugin = {
    name: "typographer"
  };
  function Typographer(context, options) {
    this.context = context;
    this.$context = $(context);
    this.options = $.extend({}, $.fn[plugin.name].defaults, options);
    this.init();
  }
  Typographer.prototype.init = function () {
    this.$context.addClass(this.options.contextClass);
    this.execute();
  };
  Typographer.prototype.execute = function () {
    var self = this;
    $.each(self.options.modules, function (i, moduleName) {
      if (isValidModule(moduleName)) {
        var moduleFullName = Typographer.getModuleFullName(moduleName);
        self.$context[moduleFullName].call(self.$context, self.options[moduleName]);
      } else {
        $.error("Module " + moduleName + " does not exist!");
      }
    });
  };
  Typographer.getModuleFn = function (name) {
    var moduleFullName = Typographer.getModuleFullName(name);
    return $.fn[moduleFullName];
  };
  Typographer.getModuleFullName = function (name) {
    return plugin.name + "_" + name;
  };
  function isValidModule(name) {
    var fn = Typographer.getModuleFn(name);
    return fn !== undefined && typeof fn === "function";
  }
  $.fn[plugin.name] = function (options) {
    return this.each(function () {
      if (!$.data(this, plugin.name)) {
        $.data(this, plugin.name, new Typographer(this, options));
      }
    });
  };
  $.fn[plugin.name].defaults = {
    contextClass: "jquery-" + plugin.name,
    modules: []
  };
})(jQuery, window, document);
"use strict";

/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
/**
 * jQuery Typographer
 * Copyright (C) 2011 by mirz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function ($, window, document, undefined) {
  "use strict";

  var plugin = {
    ns: "typographer",
    name: "orphan"
  };
  plugin.fullName = plugin.ns + "_" + plugin.name;
  function Deorphanator(context, options) {
    this.context = context;
    this.$context = $(context);
    this.options = $.extend({}, $.fn[plugin.fullName].defaults, options);
    this.init();
  }
  Deorphanator.prototype.init = function () {
    this.options.ignoreTags = Utils.normalizeTagNames(this.options.ignoreTags);
    this.$context.addClass(this.options.contextClass);
    compileRegex(this.options);
    this.execute();
  };
  Deorphanator.prototype.execute = function () {
    var orphanAtTheEnd = false;
    var textNodes = Utils.getTextNodesIn(this.context, false);
    var self = this;
    $.each(textNodes, function () {
      if (Utils.shouldIgnore(this, self.context, self.options)) {
        return true;
      }
      var text = this.nodeValue;
      text = Deorphanator.deorphanize(text, this.options);
      if (orphanAtTheEnd) {
        text = text.replace(/^\s+/, Entities.nbsp);
        orphanAtTheEnd = false;
      }
      if (Deorphanator.orphanAtTheEndRegex.test(text)) {
        orphanAtTheEnd = true;
      }
      this.nodeValue = text;
    });
  };
  Deorphanator.deorphanize = function (text, options) {
    options = $.extend({}, $.fn[plugin.fullName].defaults, options);
    if (!Deorphanator.findOrphanRegex) {
      compileRegex(options);
    }
    text = text.replace(Deorphanator.findOrphanRegex, function ($0, $1, pos) {
      var preMatchChar = text.substring(pos - 1, pos);
      if (preMatchChar !== " " && preMatchChar !== "") {
        return $0;
      } else {
        return $1 + Entities.nbsp;
      }
    });
    return text;
  };
  function compileRegex(options) {
    var forbiddenAlt = options.forbidden.join("|");
    var findOrphanPattern = "(" + forbiddenAlt + ")(?:\\n|\\s)+";
    Deorphanator.findOrphanRegex = new RegExp(findOrphanPattern, "gi");
    var orphanAtTheEndPattern = "\\s+(" + forbiddenAlt + ")$";
    Deorphanator.orphanAtTheEndRegex = new RegExp(orphanAtTheEndPattern, "i");
  }
  $.fn[plugin.fullName] = function (options) {
    return this.each(function () {
      if (!$.data(this, plugin.fullName)) {
        $.data(this, plugin.fullName, new Deorphanator(this, options));
      }
    });
  };
  $.fn[plugin.fullName].entities = {
    nbsp: "\xA0"
  };
  $.fn[plugin.fullName].defaults = {
    contextClass: "jquery-" + plugin.ns + "-" + plugin.name,
    forbidden: ["a", "i", "o", "u", "w", "z"],
    ignoreTags: ["pre", "code"],
    ignoreClass: "ignore-" + plugin.name
  };
  $[plugin.fullName] = {
    deorphanize: Deorphanator.deorphanize
  };
  var Utils = $.typographer_common;
  var Entities = $.fn[plugin.fullName].entities;
})(jQuery, window, document);
"use strict";

/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
/**
 * jQuery Typographer
 * Copyright (C) 2011 by mirz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function ($, window, document, undefined) {
  "use strict";

  var plugin = {
    ns: "typographer",
    name: "punctuation"
  };
  plugin.fullName = plugin.ns + "_" + plugin.name;
  function Punctuation(context, options) {
    this.context = context;
    this.$context = $(context);
    this.options = $.extend({}, $.fn[plugin.fullName].defaults, options);
    this.init();
  }
  Punctuation.prototype.init = function () {
    this.options.ignoreTags = Utils.normalizeTagNames(this.options.ignoreTags);
    this.$context.addClass(this.options.contextClass);
    this.execute();
  };
  Punctuation.prototype.execute = function () {
    var textNodes = Utils.getTextNodesIn(this.context, false);
    var self = this;
    $.each(textNodes, function () {
      if (Utils.shouldIgnore(this, self.context, self.options)) {
        return true;
      }
      var text = this.nodeValue;
      if ($.inArray("quotes", self.options.correction) > -1) {
        text = Punctuation.correctQuotes(text);
      }
      if ($.inArray("ellipsis", self.options.correction) > -1) {
        text = Punctuation.correctEllipsis(text);
      }
      if ($.inArray("apostrophe", self.options.correction) > -1) {
        text = Punctuation.correctApostrophe(text);
      }
      if ($.inArray("dash", self.options.correction) > -1) {
        text = Punctuation.correctDash(text);
      }
      this.nodeValue = text;
    });
  };
  Punctuation.correctQuotes = function (text) {
    // zamiana cudzysłowów prostych na drukarskie
    text = text.replace(/(\s|^)"(\S)/gi, "$1" + Entities.bdquo + "$2");
    text = text.replace(/(\S)"(\s|$|[.,?!;:])/gi, "$1" + Entities.rdquo + "$2");

    // korekta cudzysłowów francuskich
    var raquoRegex = new RegExp(Entities.raquo + "([a-ząćęłńóśżź0-9])", "gi");
    var laquoRegex = new RegExp("([a-ząćęłńóśżź0-9])" + Entities.laquo, "gi");
    text = text.replace(raquoRegex, Entities.laquo + "$1");
    text = text.replace(laquoRegex, "$1" + Entities.raquo);
    return text;
  };
  Punctuation.correctEllipsis = function (text) {
    text = text.replace(/\.\.\./gi, Entities.hellip);
    return text;
  };
  Punctuation.correctApostrophe = function (text) {
    text = text.replace(/'/gi, Entities.rsquo);
    return text;
  };
  Punctuation.correctDash = function (text) {
    text = text.replace(/(\d)\s*-\s*(\d)/gi, "$1" + Entities.ndash + "$2");
    text = text.replace(/(\d)\s+(?:\u2012|\u2013)\s+(\d)/gi, "$1" + Entities.ndash + "$2");
    text = text.replace(/\s+-\s+/gi, " " + Entities.ndash + " ");
    text = text.replace(/([a-ząćęłńóśżź])(?:\u2012|\u2013)([a-ząćęłńóśżź])/gi, "$1-$2");
    return text;
  };
  $.fn[plugin.fullName] = function (options) {
    return this.each(function () {
      if (!$.data(this, plugin.fullName)) {
        $.data(this, plugin.fullName, new Punctuation(this, options));
      }
    });
  };
  $.fn[plugin.fullName].entities = {
    bdquo: "\u201E",
    // &bdquo; cudzysłów otwierający
    rdquo: "\u201D",
    // &rdquo; cudzysłów zamykający
    laquo: "\xAB",
    // &laquo; cudzysłów otwierający francuski
    raquo: "\xBB",
    // &raquo; cudzysłów zamykający francuski
    hellip: "\u2026",
    // &hellip; wielokropek
    rsquo: "\u2019",
    // &rsquo; apostrof
    ndash: "\u2013",
    // &ndash; półpauza
    mdash: "\u2014" // &ndash; pauza
  };
  $.fn[plugin.fullName].defaults = {
    correction: ["quotes", "ellipsis", "dash", "apostrophe"],
    contextClass: "jquery-" + plugin.ns + "-" + plugin.name,
    ignoreTags: ["pre", "code"],
    ignoreClass: "ignore-" + plugin.name
  };
  $[plugin.fullName] = {
    correctQuotes: Punctuation.correctQuotes,
    correctEllipsis: Punctuation.correctEllipsis,
    correctDash: Punctuation.correctDash,
    correctApostrophe: Punctuation.correctApostrophe
  };
  var Utils = $.typographer_common;
  var Entities = $.fn[plugin.fullName].entities;
})(jQuery, window, document);
"use strict";
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var NetprAccordion = /*#__PURE__*/function () {
  function NetprAccordion() {
    _classCallCheck(this, NetprAccordion);
  }
  return _createClass(NetprAccordion, [{
    key: "init",
    value: function init(accordionContainer) {
      var _this = this;
      var headers = accordionContainer.querySelectorAll(".accordionItemButton-js");
      headers.forEach(function (header) {
        header.addEventListener("click", function () {
          return _this.toggle(header);
        });
        header.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            _this.toggle(header);
          }
        });
      });
    }
  }, {
    key: "toggle",
    value: function toggle(header) {
      var contentId = header.getAttribute("aria-controls");
      var content = document.getElementById(contentId); // żeby nie zaiwaniać przy init po DOM, to grzebię w nim tylko na kliku
      var expanded = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", String(!expanded));
      content.hidden = expanded;
      if (!expanded) content.focus();
    }
  }, {
    key: "goToContentSectionId",
    value: function goToContentSectionId(regionId) {
      var destElement = document.getElementById(regionId);
      if (destElement) {
        var accordionItem = destElement.closest(".accordionItem-js");
        var button = accordionItem.querySelector(".accordionItemButton-js");
        this.toggle(button);
        setTimeout(function () {
          window.scrollTo({
            top: destElement.offsetTop - 75,
            behavior: "smooth"
          });
        }, 200);
      }
    }
  }]);
}();
window.NetprAccordion = NetprAccordion;
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var NetprShutdownList = /*#__PURE__*/function () {
  function NetprShutdownList() {
    _classCallCheck(this, NetprShutdownList);
    this.departmentList = {
      2: "gdansk",
      3: "kalisz",
      4: "koszalin",
      5: "olsztyn",
      6: "plock",
      8: "torun"
    };
    this.endOfDay = new Date().setHours(23, 59, 59, 999);
    this.currentTime = new Date();
  }
  return _createClass(NetprShutdownList, [{
    key: "escapeHtml",
    value: function escapeHtml(string) {
      return String(string).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
  }, {
    key: "getJSON",
    value: function () {
      var _getJSON = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
        var errorMsg,
          response,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              errorMsg = _args.length > 1 && _args[1] !== undefined ? _args[1] : "fetch zawiódł";
              _context.next = 3;
              return fetch(url);
            case 3:
              response = _context.sent;
              if (response.ok) {
                _context.next = 6;
                break;
              }
              throw new Error("".concat(errorMsg, " (").concat(response.status, ")"));
            case 6:
              return _context.abrupt("return", response.json());
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getJSON(_x) {
        return _getJSON.apply(this, arguments);
      }
      return getJSON;
    }()
  }, {
    key: "isPlanned",
    value: function isPlanned(data, shutdownType) {
      var startDate = new Date(data);
      return startDate > this.endOfDay && shutdownType === 2;
    }

    // Zwraca boolean czy wydarzenie jest bieżące
  }, {
    key: "isCurrent",
    value: function isCurrent(start, end) {
      var dateStart = new Date(start);
      var dateEnd = new Date(end);
      return this.currentTime >= dateStart && dateEnd >= this.currentTime || this.currentTime <= dateStart && dateStart <= this.endOfDay || this.currentTime <= dateEnd && dateEnd <= this.endOfDay;
    }
  }, {
    key: "groupBy",
    value: function groupBy(data, property) {
      return data.reduce(function (group, shutdown) {
        var key = shutdown[property];
        if (!group[key]) {
          group[key] = [];
        }
        group[key].push(shutdown);
        return group;
      }, {});
    }

    // Przepisuję ty wyłączenia bo targeo inaczej interpretuje niż dokumentacja EOP
  }, {
    key: "rewriteType",
    value: function rewriteType() {
      // eslint-disable-next-line no-undef
      return new Map([[1, 2], [2, 1], [3, 3]]);
    }
  }, {
    key: "isSameDay",
    value: function isSameDay(firstDate, secondDate) {
      var date1 = new Date(firstDate).setHours(0, 0, 0, 0);
      var date2 = new Date(secondDate).setHours(0, 0, 0, 0);
      return date1 === date2;
    }
  }, {
    key: "createListElement",
    value: function createListElement(region) {
      var listElement = document.createElement("li");
      var listElementLink = document.createElement("a");
      listElement.append(listElementLink);
      listElementLink.href = "#d".concat(region[0].deptId, "r").concat(region[0].regionId);
      listElementLink.textContent = "Region ".concat(region[0].regionName);
      return listElement;
    }
  }, {
    key: "formatDate",
    value: function formatDate(date) {
      var onlyTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var newDate = new Date(date);
      var year = newDate.getFullYear();
      var month = (newDate.getMonth() + 1).toString().padStart(2, 0);
      var day = newDate.getDate().toString().padStart(2, 0);
      var hour = newDate.getHours().toString().padStart(2, 0);
      var minute = newDate.getMinutes().toString().padStart(2, 0);
      return onlyTime ? "".concat(hour, ":").concat(minute) : "".concat(day, ".").concat(month, ".").concat(year, " ").concat(hour, ":").concat(minute);
    }
  }, {
    key: "dataRangesHtml",
    value: function dataRangesHtml(hoursArray, onlyCurrentShutdowns) {
      var _this = this;
      var hoursString = "";
      var startDatesSet = new Set();
      var onlyCurrentHours = onlyCurrentShutdowns && hoursArray.filter(function (hours) {
        return _this.isCurrent(hours.fromDate, hours.toDate);
      });
      var currentOrAllHours = onlyCurrentShutdowns ? onlyCurrentHours : hoursArray;
      if (onlyCurrentShutdowns && currentOrAllHours.length === 0) {
        return "Trwa lokalizowanie uszkodzenia";
      }
      var hoursArraySorted = currentOrAllHours.sort(function (a, b) {
        return new Date(a.fromDate) - new Date(b.fromDate);
      });
      hoursArraySorted.forEach(function (hours) {
        var startDate = new Date(hours.fromDate);
        var endDate = new Date(hours.toDate);
        var startDataToCompare = new Date(hours.fromDate).setHours(0, 0, 0, 0);
        var isSameDay = _this.isSameDay(startDate, endDate);
        var showOnlyHours = isSameDay ? startDatesSet.has(startDataToCompare) : false;
        hoursString += "".concat(_this.formatDate(startDate, showOnlyHours), "\u2013").concat(_this.formatDate(endDate, isSameDay), "<br>");
        startDatesSet.add(startDataToCompare);
      });
      return hoursString;
    }
  }, {
    key: "createShutdownFragment",
    value: function createShutdownFragment(message, dataRange, shutdownType) {
      var onlyCurrentShutdowns = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var template = document.createElement("template");

      // <polygon points="13 2 3 14 11 14 9 22 21 8 13 8 13 2" fill="none" stroke="white" stroke-width="1.5" />
      if (onlyCurrentShutdowns) {
        template.innerHTML = "\n        <div class=\"breakdown__area-message breakdown__area-message--left-space\">\n          <div class=\"breakdown__area-message--icon breakdown__area-message--icon--".concat(shutdownType === 1 ? "alert" : "warning", "\">\n            <svg width=\"24\" height=\"28\" viewBox=\"0 0 24 28\" aria-hidden=\"true\" focusable=\"false\">\n              <polygon points=\"6 1.5 5 16 11 15 9 28 22 8 13 8 16 1.5\" fill=\"none\" stroke=\"white\" stroke-width=\"1.5\"/>\n            </svg>\n          </div>\n          <b>").concat(message, "</b><br>Wy\u0142\u0105czenie ").concat(shutdownType === 2 ? "planowe" : "awaryjne", "\n        </div>\n        <div class=\"breakdown__area-date shutdownAccordionDate-js\">").concat(dataRange, "</div>\n    ").trim();
      } else {
        template.innerHTML = "\n          <div class=\"breakdown__area-message\">".concat(message, "</div>\n          <div class=\"breakdown__area-date shutdownAccordionDate-js\">").concat(dataRange, "</div>\n    ").trim();
      }
      return template.content.cloneNode(true);
    }
  }, {
    key: "createAreaFragment",
    value: function createAreaFragment(areaName, contentFragment) {
      var template = document.createElement("template");
      template.innerHTML = "\n    <div class=\"breakdown__area shutdownAccordionArea-js\">\n        <h4 class=\"breakdown__area-name shutdownAccordionAreaName-js\">".concat(areaName, "</h4>\n    </div>\n  ").trim();
      var clonedNode = template.content.cloneNode(true);
      clonedNode.querySelector(".shutdownAccordionArea-js").append(contentFragment);
      return clonedNode;
    }
  }, {
    key: "createRegionFragment",
    value: function createRegionFragment(regionName, regionIdContent, contentFragment) {
      var template = document.createElement("template");
      template.innerHTML = "\n    <div class=\"breakdown__region shutdownAccordionRegion-js\">\n        <h3 class=\"breakdown__region-name shutdownAccordionRegionName-js\" id=\"".concat(regionIdContent, "\">Region ").concat(regionName, "</h3>\n    </div>\n  ").trim();
      var clonedNode = template.content.cloneNode(true);
      clonedNode.querySelector(".shutdownAccordionRegion-js").append(contentFragment);
      return clonedNode;
    }
  }, {
    key: "createAccordionItemFragment",
    value: function createAccordionItemFragment(id, deptName) {
      var template = document.createElement("template");
      template.innerHTML = "\n    <div class=\"accordion-item breakdown__item is-active accordionItem-js\">\n      <button\n        class=\"accordion-header accordion-heading breakdown__headings accordionItemButton-js\"\n        aria-expanded=\"false\"\n        aria-controls=\"".concat(id, "\"\n        id=\"planned-shutdown").concat(id, "\"\n        style=\"line-height: 1.5; width: calc(100% - 22px); text-align: left; cursor: pointer;\"\n      >\n        Oddzia\u0142 ").concat(deptName, "\n        <span class=\"accordion-arrow\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\">\n  <polyline points=\"1 6 12 17 23 6\" fill=\"none\" stroke-width=\"1.5\"/>\n</svg></span>\n      </button>\n      <div\n        class=\"accordion-contenta breakdown__department accordionItemContent-js\"\n        id=\"").concat(id, "\"\n        role=\"region\"\n        aria-labelledby=\"planned-shutdown").concat(id, "\"\n        hidden\n      >\n        <ul class=\"breakdown__region-list no-bullet shutdownTableContentsRegions-js\">\n        </ul>\n      </div>\n    </div>\n  ").trim();
      return template.content.cloneNode(true);
    }
  }, {
    key: "makeAreaGroup",
    value: function makeAreaGroup(region) {
      var _this2 = this;
      var onlyCurrentShutdowns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var areas = region.reduce(function (group, shutdown) {
        if (!group[shutdown.areas[0]]) {
          group[shutdown.areas[0]] = [];
        }
        group[shutdown.areas[0]].push(shutdown);
        return group;
      }, {});
      var areaFragment = new DocumentFragment();
      Object.entries(areas).sort(function (a, b) {
        return a[0].localeCompare(b[0], "pl", {
          sensitivity: "base"
        });
      }).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          areaName = _ref2[0],
          shutdowns = _ref2[1];
        var shutdownFragment = new DocumentFragment();
        shutdowns.forEach(function (shutdown) {
          shutdownFragment.append(_this2.createShutdownFragment(shutdown.message, _this2.dataRangesHtml(shutdown.hours, onlyCurrentShutdowns), shutdown.shutdownType, onlyCurrentShutdowns));
        });
        areaFragment.append(_this2.createAreaFragment(areaName, shutdownFragment));
      });
      return areaFragment;
    }
  }, {
    key: "makeRegionGroup",
    value: function makeRegionGroup(department) {
      var _this3 = this;
      var onlyCurrentShutdowns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var regions = this.groupBy(department, "regionName");
      var regionsFragment = new DocumentFragment();
      var tableContentsDocFragment = new DocumentFragment();
      Object.entries(regions).sort().forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          regionName = _ref4[0],
          regionsArray = _ref4[1];
        var regionIdContent = "d".concat(regionsArray[0].deptId, "r").concat(regionsArray[0].regionId);
        regionsFragment.append(_this3.createRegionFragment(regionName, regionIdContent, _this3.makeAreaGroup(regionsArray, onlyCurrentShutdowns)));
        tableContentsDocFragment.append(_this3.createListElement(regionsArray));
      });
      return {
        regions: regionsFragment,
        tableContents: tableContentsDocFragment
      };
    }
  }, {
    key: "makeAccordionItem",
    value: function makeAccordionItem(department, deptName) {
      var onlyCurrentShutdowns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var accordionItem = this.createAccordionItemFragment("planned".concat(department[0].deptId), deptName);
      var itemContent = accordionItem.querySelector(".accordionItemContent-js");
      var itemTableContents = accordionItem.querySelector(".shutdownTableContentsRegions-js");
      var regionGroups = this.makeRegionGroup(department, onlyCurrentShutdowns);
      itemContent.append(regionGroups.regions);
      itemTableContents.append(regionGroups.tableContents);
      return accordionItem;
    }
  }, {
    key: "handleAnchorClick",
    value: function handleAnchorClick(event) {
      var targetId = event.target.getAttribute("href");
      if (!targetId || targetId === "#") return;
      var targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 75,
          behavior: "smooth"
        });
      }
    }
  }]);
}();
window.NetprShutdownList = NetprShutdownList;
"use strict";

//

(function () {
  $(document).foundation();

  //Aktywna pozycja menu
  var pagePath = window.location.pathname;

  //wyłączenie podświetlania przy braku pathname (strona główna)
  if (pagePath !== "/") {
    $(".menuLink-js").each(function () {
      var link = $(this).attr("href");
      if (link === pagePath) {
        $(this).addClass("is-active");

        //sprawdzanie czy link jest z drugiego rzędu
        var parentSubmenu = $(this).parents(".submenu");
        if (parentSubmenu.length) {
          parentSubmenu.addClass("open");
          parentSubmenu.prev().addClass("is-active");
        }

        //otwieranie submenu
        var submenu = $(this).next();
        if (submenu) {
          submenu.addClass("open");
        }
        return false;
      }
    });
  }

  // aktywny etap
  $(".stage-item__container").each(function () {
    var link = $(this).attr("href");

    // eslint-disable-next-line no-undef
    if (pgurl.indexOf(link) !== -1) {
      $(this).addClass("is-active");
    }
  });

  // dot dot dot
  function dot() {
    $(".ellipsis").dotdotdot({
      watch: true
    });
    $(".ellipsisLong").dotdotdot({
      watch: true
    });
    $(".ellipsisPerson").dotdotdot({
      watch: true
    });
  }
  $(".typo-js").typographer({
    modules: ["orphan", "punctuation"]
  });
  dot();

  /*==========================================================
   =            Dociąganie                                   =
   ==========================================================*/
  var currentContainer = document.querySelector(".NPContainer");
  var buttonNext;
  if ($(".NPButton").length) {
    buttonNext = document.querySelector(".NPButton");
  }
  /*NEXT PAGE*/
  function showContent(url, element) {
    $.ajax({
      url: url,
      dataType: "json",
      success: function success(result) {
        parseData(result.data, element);
        changeNPlink(result.paging.next, element);
        dot();
      }
    });
  }
  function parseData(data) {
    var content = document.createDocumentFragment();
    var content2 = document.createDocumentFragment();
    var elem = document.createElement("div");
    var elArray;
    elem.innerHTML = data;
    content.appendChild(elem);
    elArray = content.querySelectorAll(".NPElement");
    var elArrLength = elArray.length;
    if (elArrLength) {
      for (var i = 0; i < elArrLength; i++) {
        content2.appendChild(elArray[i]);
      }
    }
    addDataToContainer(currentContainer, content2);
  }

  //ukrywanie buttonu żeby kontent nie był dodawany za buttonem
  function hideButton() {
    buttonNext.classList.add(".hidden");
  }
  function showButton() {
    currentContainer.appendChild(buttonNext);
  }
  function addDataToContainer(element, data) {
    hideButton();
    element.appendChild(data);
    showButton();
  }
  function changeNPlink(link, element) {
    if (link.length > 0) {
      element.dataset.nextPage = String(link);
    } else {
      element.remove();
    }
  }
  $(".nextPage-js").on("click", function (e) {
    e.preventDefault();
    if (this.dataset.nextPage) {
      showContent(this.dataset.nextPage, this);
    } else {
      this.remove();
    }
  });

  //Mobilne tablice
  if ($("table").length > 0) {
    jQuery.each($("table"), function () {
      $("table").wrap("<div class='table-scroll'></div>");
    });
  }

  //Wideo w treści na 100% szzerokości
  if ($("iframe").length > 0) {
    jQuery.each($("iframe"), function () {
      if (!this.classList.contains("map-js")) {
        // $('iframe').wrap('<div class=\'responsive-embed\'></div>');
        $("iframe").wrap("<div class='responsive-embed widescreen'></div>");
      }
    });
  }
  var someImages = $(".fit-image");
  // eslint-disable-next-line no-undef
  objectFitImages(someImages);
  $(".showChat-js").on("click", function () {
    // eslint-disable-next-line no-undef
    openPopupContener();
  });
  function msieversion() {
    var currentUserAgent = window.navigator.userAgent;
    var msie = currentUserAgent.indexOf("MSIE ");
    var infoWindow = "<div class=\"popup-msie__overlay popUpMsie-js\">\n    <div class=\"popup-msie\">\n        <h2>Uwaga</h2>\n        <a class=\"close closeMsie-js\">&times;</a>\n        <div class=\"content\">\n        Mapa wy\u0142\u0105cze\u0144 nie wy\u015Bwietli si\u0119 poprawnie w przegl\u0105darce Internet Explorer. Odwied\u017A serwis korzystaj\u0105c z innej \n        przegl\u0105darki w jej najbardziej aktualnej wersji.\n        </div>\n    </div>\n</div>";

    // eslint-disable-next-line no-useless-escape
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      $("body").append(infoWindow);
      $(".closeMsie-js").on("click", function () {
        $(".popUpMsie-js").remove();
      });
    }
    return false;
  }
  if ($(".shutdown-map").length > 0) {
    msieversion();
  }
  var iframeWithoutTitle = $("iframe:not([title])");
  iframeWithoutTitle.each(function () {
    var src = $(this).attr("src");
    var domain = src.split("/")[2];
    $(this).attr("title", "Ramka z ".concat(domain));
  });
})();
"use strict";

/* eslint-disable no-unused-vars */
(function () {
  //Wyszukiwarka
  $(".search").bind("click", function () {
    $(".form-form").submit();
  });
  $(".search-button-mobile").bind("click", function () {
    $(".search__container").toggleClass("open");
  });
  $(".menuLink-js").typographer_orphan();

  //Aktywna pozycja menu
  function prepareUrlString(urlString) {
    if (urlString.indexOf("www") !== -1) {
      return urlString.split("://www.")[1];
    } else {
      return urlString.split("://")[1];
    }
  }
  $(".main-nav-link").hover(function () {
    // Mouse enter: Show submenu
    $(this).attr("aria-expanded", true);
  }, function () {
    // Mouse leave: Hide submenu
    $(this).attr("aria-expanded", false);
  });
  var pgurl = prepareUrlString(window.location.href);
  $(".menuLink-js").each(function () {
    var link = prepareUrlString($(this).attr("href"));
    if (pgurl.indexOf(link) !== -1) {
      $(this).addClass("is-active");
      $(this).next().addClass("open");
      if ($(this).parents(".submenu")) {
        $(this).parents(".submenu").addClass("open");
        $(this).parents(".submenu").prev().addClass("is-active");
      }
    }
  });
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  var highContrast = false;
  var bigSize = false;
  if (getCookie("high-contrast") === "true") {
    $("body").addClass("high-contrast");
    highContrast = true;
  }
  if (getCookie("big-size") === "true") {
    $("html").addClass("big-size");
    // halfSize('.logo');
    bigSize = true;
  }
  function halfSize(className) {
    var element = $(className);
    var elementHeight = element.height();
    var elementWidth = element.width();
    if (bigSize === false) {
      element.css({
        height: elementHeight / 2,
        width: elementWidth / 2
      });
    } else {
      element.removeAttr("style");
    }
  }
  $(".toggleContrast-js").click(function () {
    $("body").toggleClass("high-contrast");
    if (highContrast === false) {
      setCookie("high-contrast", "true");
      highContrast = true;
    } else if (highContrast === true) {
      setCookie("high-contrast", "false");
      highContrast = false;
    }
  });
  $(".toggleSize-js").on("click", function () {
    $("html").toggleClass("big-size");
    // halfSize('.logo');
    if (bigSize === false) {
      setCookie("big-size", "true");
      bigSize = true;
    } else if (bigSize === true) {
      setCookie("big-size", "false");
      bigSize = false;
    }
  });
  var appsMenuItems = document.querySelectorAll(".main-nav-link>a.menuLink-js.jquery-typographer-orphan");
  var subMenuItems = document.querySelectorAll(".vertical.menu .main-nav-link ul li, .vertical.medium-horizontal.menu .main-nav-link ul li");
  var keys = {
    tab: 9,
    enter: 13,
    esc: 27,
    space: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40
  };
  var currentIndex, subIndex;
  var gotoIndex = function gotoIndex(idx) {
    if (idx == appsMenuItems.length) {
      idx = 0;
    } else if (idx < 0) {
      idx = appsMenuItems.length - 1;
    }
    appsMenuItems[idx].focus();
    currentIndex = idx;
  };
  var gotoSubIndex = function gotoSubIndex(menu, idx) {
    var items = menu.querySelectorAll("li");
    if (idx == items.length) {
      idx = 0;
    } else if (idx < 0) {
      idx = items.length - 1;
    }
    items[idx].focus();
    subIndex = idx;
  };
  $(".menu.desctop .main-nav-link").removeAttr("tabindex");
  appsMenuItems.forEach(function (el, i) {
    el.setAttribute("tabindex", "0");
    el.addEventListener("focus", function () {
      currentIndex = i;
      Array.prototype.forEach.call(appsMenuItems, function (el) {
        el.parentNode.setAttribute("aria-expanded", "false");
      });
    });
    var openSubmenu = function openSubmenu(event) {
      var isExpanded = this.parentNode.getAttribute("aria-expanded") == "true";
      this.parentNode.setAttribute("aria-expanded", !isExpanded);
      event.preventDefault();
    };
    el.addEventListener("keydown", function (event) {
      var prevdef = false;
      switch (event.keyCode) {
        case keys.right:
          gotoIndex(currentIndex + 1);
          prevdef = true;
          break;
        case keys.left:
          gotoIndex(currentIndex - 1);
          prevdef = true;
          break;
        case keys.down:
          openSubmenu.call(this, event);
          gotoSubIndex(this.parentNode.querySelector("ul"), 0);
          prevdef = true;
          break;
        case keys.up:
          {
            openSubmenu.call(this, event);
            var submenu = this.querySelector("ul");
            subIndex = submenu.querySelectorAll("li").length - 1;
            gotoSubIndex(submenu, subIndex);
            prevdef = true;
            break;
          }
        case keys.esc:
          // Adjust the selector for the escape target if necessary
          document.querySelector(".close-button").focus();
          prevdef = true;
          break;
        case keys.enter:
          {
            var link = this;
            if (link) {
              window.location.href = link.getAttribute("href");
            } else {
              openSubmenu.call(this, event); // For menu items without a direct link, maintain existing behavior
              subIndex = 0;
              gotoSubIndex(this.querySelector("ul"), 0);
            }
            prevdef = true;
            break;
          }
      }
      if (prevdef) {
        event.preventDefault();
      }
    });
  });
  subMenuItems.forEach(function (el) {
    el.setAttribute("tabindex", "-1");
    el.addEventListener("keydown", function (event) {
      var prevdef = false;
      switch (event.keyCode) {
        case keys.tab:
          if (event.shiftKey) {
            gotoIndex(currentIndex - 1);
          } else {
            gotoIndex(currentIndex + 1);
          }
          prevdef = true;
          break;
        case keys.right:
          gotoIndex(currentIndex + 1);
          prevdef = true;
          break;
        case keys.left:
          gotoIndex(currentIndex - 1);
          prevdef = true;
          break;
        case keys.esc:
          gotoIndex(currentIndex);
          prevdef = true;
          break;
        case keys.down:
          gotoSubIndex(this.parentNode, subIndex + 1);
          prevdef = true;
          break;
        case keys.up:
          gotoSubIndex(this.parentNode, subIndex - 1);
          prevdef = true;
          break;
        case keys.enter:
        case keys.space:
          {
            var link = this.querySelector("a");
            if (link) {
              window.location.href = link.getAttribute("href");
            } else {
              alert(this.innerText); // Keep existing functionality for non-link items
            }
            prevdef = true;
            break;
          }
      }
      if (prevdef) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  });
})();
"use strict";

(function () {
  var massCountiesContainers = document.querySelectorAll(".breakdownInfoCounties-js");
  if (!massCountiesContainers) return;
  var counties = {
    213: "milicki",
    214: "oleśnicki",
    401: "aleksandrowski",
    402: "brodnicki",
    404: "chełmiński",
    405: "golubsko-dobrzyński",
    406: "grudziądzki",
    407: "inowrocławski",
    408: "lipnowski",
    409: "mogileński",
    411: "radziejowski",
    412: "rypiński",
    413: "sępoleński",
    414: "świecki",
    415: "toruński",
    416: "tucholski",
    417: "wąbrzeski",
    418: "włocławski",
    462: "Grudziądz",
    463: "Toruń",
    464: "Włocławek",
    1002: "kutnowski",
    1004: "łęczycki",
    1005: "łowicki",
    1011: "poddębicki",
    1014: "sieradzki",
    1017: "wieluński",
    1018: "wieruszowski",
    1020: "zgierski",
    1402: "ciechanowski",
    1404: "gostyniński",
    1408: "legionowski",
    1411: "makowski",
    1413: "mławski",
    1414: "nowodworski",
    1419: "płocki",
    1420: "płoński",
    1422: "przasnyski",
    1424: "pułtuski",
    1427: "sierpecki",
    1428: "sochaczewski",
    1437: "żuromiński",
    1462: "Płock",
    1608: "oleski",
    2201: "bytowski",
    2202: "chojnicki",
    2203: "człuchowski",
    2204: "gdański",
    2205: "kartuski",
    2206: "kościerski",
    2207: "kwidzyński",
    2208: "lęborski",
    2209: "malborski",
    2210: "nowodworski",
    2211: "pucki",
    2212: "słupski",
    2213: "starogardzki",
    2214: "tczewski",
    2215: "wejherowski",
    2216: "sztumski",
    2261: "Gdańsk",
    2262: "Gdynia",
    2263: "Słupsk",
    2264: "Sopot",
    2801: "bartoszycki",
    2802: "braniewski",
    2803: "działdowski",
    2804: "elbląski",
    2806: "giżycki",
    2807: "iławski",
    2808: "kętrzyński",
    2809: "lidzbarski",
    2810: "mrągowski",
    2811: "nidzicki",
    2812: "nowomiejski",
    2814: "olsztyński",
    2815: "ostródzki",
    2816: "piski",
    2817: "szczycieński",
    2819: "węgorzewski",
    2861: "Elbląg",
    2862: "Olsztyn",
    3003: "gnieźnieński",
    3004: "gostyński",
    3006: "jarociński",
    3007: "kaliski",
    3008: "kępiński",
    3009: "kolski",
    3010: "koniński",
    3012: "krotoszyński",
    3017: "ostrowski",
    3018: "ostrzeszowski",
    3020: "pleszewski",
    3023: "słupecki",
    3025: "średzki",
    3027: "turecki",
    3030: "wrzesiński",
    3031: "złotowski",
    3061: "Kalisz",
    3062: "Konin",
    3201: "białogardzki",
    3202: "choszczeński",
    3203: "drawski",
    3205: "gryficki",
    3208: "kołobrzeski",
    3209: "koszaliński",
    3213: "sławieński",
    3215: "szczecinecki",
    3216: "świdwiński",
    3218: "łobeski",
    3261: "Koszalin"
  };
  function makeMassContent(element) {
    var _element$dataset;
    var supportedCounties = element === null || element === void 0 || (_element$dataset = element.dataset) === null || _element$dataset === void 0 || (_element$dataset = _element$dataset.counties) === null || _element$dataset === void 0 ? void 0 : _element$dataset.split(",").filter(function (item) {
      return counties[item];
    }).map(function (item) {
      return counties[item];
    });
    if ((supportedCounties === null || supportedCounties === void 0 ? void 0 : supportedCounties.length) > 20) {
      element.classList.add("breakdown-info__counties--columns");

      // Grupowanie po literach
      var groupedNames = supportedCounties.reduce(function (groups, name) {
        if (groups && name) {
          var firstLetter = name[0].toUpperCase();
          if (!groups[firstLetter]) {
            groups[firstLetter] = [];
          }
          groups[firstLetter].push(name);
          return groups;
        }
      }, {});
      var sortedLetterKeys = Object.keys(groupedNames).sort(function (a, b) {
        return a.localeCompare(b, "pl");
      });
      var container = document.createElement("div");
      sortedLetterKeys.forEach(function (letter) {
        var header = document.createElement("h5");
        header.textContent = letter;
        container.appendChild(header);
        var list = document.createElement("ul");
        var sortedGroupedNames = groupedNames[letter].sort(function (a, b) {
          return a.localeCompare(b, "pl");
        });
        sortedGroupedNames.forEach(function (countyName) {
          var listItem = document.createElement("li");
          listItem.textContent = countyName;
          list.appendChild(listItem);
        });
        container.appendChild(list);
      });
      element.appendChild(container);
    } else {
      element.textContent = supportedCounties.join(", ");
    }
  }
  massCountiesContainers.forEach(function (element) {
    makeMassContent(element);
  });
})();
"use strict";

(function () {
  $("#changeCategory").on("change", function () {
    var url = $(this).val();
    if (url) {
      window.location = url;
      return false;
    }
  });
})();
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  var currentShutdownsContainer, netprShutdownHelpers, netprAccordion, shutdownsGroupedByDept, locationHash, isExistShutdowns, hoursHasCurrentRange, getShutdownsGroupedByDept, _getShutdownsGroupedByDept, appendShutdownsToDOM, idFromHash, clearId;
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        appendShutdownsToDOM = function _appendShutdownsToDOM(shutdownsData) {
          Object.entries(shutdownsData).sort().forEach(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
              deptName = _ref3[0],
              department = _ref3[1];
            var regionAccordion = netprShutdownHelpers.makeAccordionItem(department, deptName, true);
            currentShutdownsContainer.append(regionAccordion);
          });
          isExistShutdowns = !!(currentShutdownsContainer !== null && currentShutdownsContainer !== void 0 && currentShutdownsContainer.children.length);
        };
        _getShutdownsGroupedByDept = function _getShutdownsGroupedB2() {
          _getShutdownsGroupedByDept = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var shutdownsData, response;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  shutdownsData = null;
                  _context.prev = 1;
                  _context.next = 4;
                  return netprShutdownHelpers.getJSON(currentShutdownsContainer.dataset.shutdowns, "Nie udało się pobrać danych o wyłączeniach");
                case 4:
                  response = _context.sent;
                  shutdownsData = response.document.payload.shutdowns.filter(function (shutdown) {
                    return hoursHasCurrentRange(shutdown.hours) || shutdown.shutdownType === 1 && !shutdown.endDate;
                  });
                  _context.next = 12;
                  break;
                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](1);
                  console.error(_context.t0);
                  shutdownsData = [];
                case 12:
                  return _context.abrupt("return", netprShutdownHelpers.groupBy(shutdownsData, "deptName"));
                case 13:
                case "end":
                  return _context.stop();
              }
            }, _callee, null, [[1, 8]]);
          }));
          return _getShutdownsGroupedByDept.apply(this, arguments);
        };
        getShutdownsGroupedByDept = function _getShutdownsGroupedB() {
          return _getShutdownsGroupedByDept.apply(this, arguments);
        };
        hoursHasCurrentRange = function _hoursHasCurrentRange(hours) {
          return hours.some(function (hoursRange) {
            return netprShutdownHelpers.isCurrent(hoursRange.fromDate, hoursRange.toDate);
          });
        };
        currentShutdownsContainer = document.querySelector(".currentShutdown-js");
        if (!((currentShutdownsContainer === null || currentShutdownsContainer === void 0 ? void 0 : currentShutdownsContainer.dataset.shutdowns) === undefined)) {
          _context2.next = 7;
          break;
        }
        return _context2.abrupt("return");
      case 7:
        netprShutdownHelpers = window.netprShutdownHelpers || new window.NetprShutdownList();
        netprAccordion = new window.NetprAccordion();
        _context2.next = 11;
        return getShutdownsGroupedByDept();
      case 11:
        shutdownsGroupedByDept = _context2.sent;
        locationHash = window.location.hash;
        isExistShutdowns = false;
        appendShutdownsToDOM(shutdownsGroupedByDept);
        netprAccordion.init(currentShutdownsContainer);
        if (!isExistShutdowns) {
          currentShutdownsContainer.innerHTML = "<h2>W chili obecnej nie s\u0105 prowadzone prace remontowe lub naprawcze, oraz nie mamy informacji o problemach z dost\u0119pno\u015Bci\u0105 us\u0142ug.</h2>";
        }
        //   ---------------------------------

        if (isExistShutdowns && locationHash !== "") {
          idFromHash = netprShutdownHelpers.escapeHtml(locationHash);
          clearId = idFromHash.startsWith("#") ? idFromHash.slice(1) : idFromHash;
          netprAccordion.goToContentSectionId(clearId);
        }
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
          anchor.addEventListener("click", netprShutdownHelpers.handleAnchorClick);
          anchor.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
              netprShutdownHelpers.handleAnchorClick(event);
            }
          });
        });
      case 19:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
}))();
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  var plannedShutdownsContainer, netprShutdownHelpers, netprAccordion, shutdownsGroupedByDept, locationHash, isExistShutdowns, hoursHasPlannedHoursRange, getShutdownsGroupedByDept, _getShutdownsGroupedByDept, appendShutdownsToDOM, idFromHash, clearId;
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        appendShutdownsToDOM = function _appendShutdownsToDOM(shutdownsData) {
          Object.entries(shutdownsData).sort().forEach(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
              deptName = _ref3[0],
              department = _ref3[1];
            var regionAccordion = netprShutdownHelpers.makeAccordionItem(department, deptName);
            plannedShutdownsContainer.append(regionAccordion);
          });
          isExistShutdowns = !!(plannedShutdownsContainer !== null && plannedShutdownsContainer !== void 0 && plannedShutdownsContainer.children.length);
        };
        _getShutdownsGroupedByDept = function _getShutdownsGroupedB2() {
          _getShutdownsGroupedByDept = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var plannedShutdownsData, response;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  plannedShutdownsData = null;
                  _context.prev = 1;
                  _context.next = 4;
                  return netprShutdownHelpers.getJSON(plannedShutdownsContainer.dataset.shutdowns, "Nie udało się pobrać danych o planowanych wyłączeniach");
                case 4:
                  response = _context.sent;
                  plannedShutdownsData = response.document.payload.shutdowns.filter(function (shutdown) {
                    return hoursHasPlannedHoursRange(shutdown.hours, shutdown.shutdownType);
                  });
                  _context.next = 12;
                  break;
                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](1);
                  console.error(_context.t0);
                  plannedShutdownsData = [];
                case 12:
                  return _context.abrupt("return", netprShutdownHelpers.groupBy(plannedShutdownsData, "deptName"));
                case 13:
                case "end":
                  return _context.stop();
              }
            }, _callee, null, [[1, 8]]);
          }));
          return _getShutdownsGroupedByDept.apply(this, arguments);
        };
        getShutdownsGroupedByDept = function _getShutdownsGroupedB() {
          return _getShutdownsGroupedByDept.apply(this, arguments);
        };
        hoursHasPlannedHoursRange = function _hoursHasPlannedHours(hours, shutdownType) {
          return hours.some(function (hoursRange) {
            return netprShutdownHelpers.isPlanned(hoursRange.fromDate, shutdownType);
          });
        };
        plannedShutdownsContainer = document.querySelector(".plannedShutdown-js");
        if (!((plannedShutdownsContainer === null || plannedShutdownsContainer === void 0 ? void 0 : plannedShutdownsContainer.dataset.shutdowns) === undefined)) {
          _context2.next = 7;
          break;
        }
        return _context2.abrupt("return");
      case 7:
        netprShutdownHelpers = window.netprShutdownHelpers || new window.NetprShutdownList();
        netprAccordion = new window.NetprAccordion();
        _context2.next = 11;
        return getShutdownsGroupedByDept();
      case 11:
        shutdownsGroupedByDept = _context2.sent;
        locationHash = window.location.hash;
        isExistShutdowns = false;
        appendShutdownsToDOM(shutdownsGroupedByDept);
        netprAccordion.init(plannedShutdownsContainer);
        if (!isExistShutdowns) {
          plannedShutdownsContainer.innerHTML = "<h2>W chili obecnej nie s\u0105 planowane prace remontowe lub naprawcze, oraz nie mamy informacji o problemach z dost\u0119pno\u015Bci\u0105 us\u0142ug.</h2>";
        }
        //   ---------------------------------
        if (isExistShutdowns && locationHash !== "") {
          idFromHash = netprShutdownHelpers.escapeHtml(locationHash);
          clearId = idFromHash.startsWith("#") ? idFromHash.slice(1) : idFromHash;
          netprAccordion.goToContentSectionId(clearId);
        }
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
          anchor.addEventListener("click", netprShutdownHelpers.handleAnchorClick);
          anchor.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
              netprShutdownHelpers.handleAnchorClick(event);
            }
          });
        });
      case 19:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
}))();
"use strict";

(function () {
  function ifItsMobile() {
    if ($(window).innerWidth() < 640) {
      return true;
    } else {
      return false;
    }
  }
  function fireOffSection() {
    if (ifItsMobile()) {
      if ($(".off-section").length || $(".helpline-mobile").length) {
        var offSectionHeight;
        if ($(".off-section").length) {
          offSectionHeight = $(".off-section").height();
        } else if ($(".helpline-mobile")) {
          offSectionHeight = $(".helpline-mobile").height();
        }
        $("header.main-header").css("margin-bottom", offSectionHeight + 56 + 15);
      }
    } else {
      $("header.main-header").css("margin-bottom", 0);
    }
  }
  $(window).on("resize", function () {
    fireOffSection();
  });
  fireOffSection();
})();
"use strict";

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Kod do refaktoryzacji pisany na szybko
$(function () {
  var dataElement = document.getElementById("nPrMap");
  function netprMapInit() {
    var targeoCss = document.createElement("link");
    var parentElement = document.querySelector(".shutdown-map");
    var roller = document.querySelector(".lds-roller");
    var powerCuts = dataElement.dataset.powerCuts; // Url do dokumentu z obiektem wyłączeń bieżących
    var massBreakdowns = dataElement.dataset.massBreakdown; // Url do dokumentu z obiektem awarii masowych
    var massBreakdownIds = []; // tu trafią wszystkie id awarii masowych aktywnych
    var allCurrentPowerCuts = {}; // tu trafią wszystkie wył planowe i awaryjne spełniające kryteria wyświetlania
    var futurePowerCutsByTopologyId = {}; // do tego obiektu trafią wszystkie wyłączenia planowe w kolejnych dniach
    var pointIndex = 0; // tu counter nadający id dla punktów na mapie
    var totalCustomersOff = 0; // przechowują sumę użytkowników bez prądu z awarii masowych
    var totalStationsOff = 0; // przechowują sumę wyłączonych stacji z awarii masowych

    targeoCss.setAttribute("rel", "stylesheet");
    targeoCss.setAttribute("type", "text/css");
    targeoCss.setAttribute("href", "https://mapa.targeo.pl/__apps/energa/css/ol.css");
    document.getElementsByTagName("head")[0].appendChild(targeoCss);

    // eslint-disable-next-line no-undef
    Targeo.app.setMapContainer("mb-map");
    var getJSON = function getJSON(url) {
      var errorMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "fetch zawiódł";
      return fetch(url).then(function (response) {
        if (!response.ok) throw new Error("".concat(errorMsg, " (").concat(response.status, ")"));
        return response.json();
      });
    };

    /*
    Wskazane przez energę punkty na mapie gdzie ma się pojawić
    znacznik awarii masowej używane przy dodawaniu punktu awarii na mapie
     */
    var massDeptIdGeo = {
      2: [18.2904296124102, 54.1692683258098],
      3: [17.8817522834035, 51.9155016326853],
      4: [16.6475483103956, 54.0729004184782],
      5: [20.0477911634669, 53.9212294800468],
      6: [19.9473455276126, 52.8609406694513],
      8: [18.8761341415398, 53.104038399145]
    };

    // Zmapowanie deptId do lokalizacji - wyświetlane na dymku awarii masowej
    var deptIdToApropriteDeptName = {
      2: ["Gdansk", "gdansk"],
      3: ["Kalisz", "kalisz"],
      4: ["Koszalin", "koszalin"],
      5: ["Olsztyn", "olsztyn"],
      6: ["Plock", "plock"],
      8: ["Torun", "torun"]
    };

    // przekazanie do modelu punktu targeo odpowiednio sformatowanej daty i godziny którą rozumie api targeo
    var parseHours = function parseHours(date) {
      var newDate = new Date(date);
      return "".concat(newDate.getFullYear(), "-").concat(newDate.getMonth() + 1 < 10 ? "0" + (newDate.getMonth() + 1) : newDate.getMonth() + 1, "-").concat(newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate(), " ").concat(newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours(), ":").concat(newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes());
    };

    // sprawdza czy data wydarzenia jest po dniu dzisiejszym - na mapie powinny być wyłączenia tylko z danego dnia
    var isDateAfterToday = function isDateAfterToday(compareDate) {
      var selectedDate = new Date(compareDate);
      var now = new Date();

      /* sprawdzam czy data z parametru jest po aktualnej i czy dzień miesiąca jest
      różny - otrzymuję true dla wyłączeń z kolejnych dni */
      return selectedDate > now && selectedDate.getDate() !== now.getDate() ? true : false;
    };
    var isDateAfterNow = function isDateAfterNow(compareDate) {
      var selectedDate = new Date(compareDate);
      var now = new Date();

      //sprawdzam czy data z parametru jest po aktualnej i czy dzień miesiąca jest
      // różny - otrzymuję true dla wyłączeń z kolejnych dni
      return selectedDate > now ? true : false;
    };

    // Tworzy niepowtarzalny ciąg znaków na podstawie wszystkich topologyId
    // w ramach topologyElements - wykorzystywany jako klucz obiektu dla wyłączeń dla dokładnie tego samego
    //  obszaru i w kolejnych dniach, dzięki czemu mogę zweryfikować istnienie przyszłych
    //  wydarzeń i wyświetlić stosowny komunikat z linkiem na dymku
    var createKeyFromTopologyIds = function createKeyFromTopologyIds(obj) {
      var newTopologyKey = ""; // tu będzie generowany klucz dla obiektu futurePowerCutsByTopologyId

      // tworzenie klucza dla futurePowerCutsByTopologyId
      for (var key in obj) {
        newTopologyKey = newTopologyKey + "".concat(String(obj[key].topologyId), "T");
      }
      return newTopologyKey;
    };

    // dodatkowa informacja z linkiem używana gdy w przyszłości są
    // wyłączenia planowe dla obszaru wedle klucza createKeyFromTopologyIds
    var creatrMessageButtonToFuture = function creatrMessageButtonToFuture(element) {
      return "<br><br>Uwaga: wkr\xF3tce kolejne wy\u0142\u0105czenia. <br>Zobacz\n       <a href=\"/uslugi/awarie-i-wylaczenia/wylaczenia-planowane#d".concat(element.deptId, "r").concat(element.regionId, "\">\n       <b>wy\u0142\u0105czenia planowe</b></a></div>");
    };

    // NOWA FUNKCJONALNOŚĆ
    var removeWronDateFromTable = function removeWronDateFromTable(arr) {
      var arrLenght = arr.length;
      var newArrayHours = [];
      for (var i = 0; i < arrLenght; i++) {
        var element = arr[i];
        if (isDateAfterNow(element.toDate) && !isDateAfterToday(element.fromDate)) {
          newArrayHours.push(element);
        }
      }
      return newArrayHours;
    };
    // NOWA FUNKCJONALNOŚĆ

    // Dodawanie do mapy wyłączeń planowych i awaryjnych przemielonych przez makePowerCuts
    var addPowerCutsToMap = function addPowerCutsToMap() {
      for (var key in allCurrentPowerCuts) {
        if (Object.hasOwnProperty.call(allCurrentPowerCuts, key)) {
          var powerCut = allCurrentPowerCuts[key];
          pointIndex++;
          if (powerCut.convexHull) {
            var hoursIndex = 0;
            if (powerCut.hours === null) {
              console.warn("NetPr - Brak hours dla wy\u0142\u0105czenia o guid: ".concat(powerCut.guid, " - wy\u0142\u0105czenie \n                POJAWI SI\u0118 na mapce, w\u0142a\u015Bciwo\u015Bci dla wy\u0142\u0105czenia to"), powerCut);

              // eslint-disable-next-line no-undef
              Targeo.app.addEOPPoint({
                id: "".concat(pointIndex, "-h").concat(hoursIndex),
                type: powerCut.shutdownType === 1 ? 2 : 1,
                locality: powerCut.areas.join(", "),
                coords: powerCut.convexHull.centroid.coordinates,
                polygon: powerCut.convexHull.poly.coordinates,
                timeFrom: parseHours(powerCut.startDate),
                timeTo: parseHours(powerCut.endDate),
                region: deptIdToApropriteDeptName[powerCut.deptId][1],
                desc: "<div class=\"popup-content-desc\" style=\"display: block;\">".concat(powerCut.message, " ").concat(isDateAfterToday(powerCut.endDate) ? creatrMessageButtonToFuture(powerCut) : "", "</div>"),
                link: "/uslugi/awarie-i-wylaczenia/wylaczenia-biezace/".concat(deptIdToApropriteDeptName[powerCut.deptId][1])
              });
              hoursIndex++;
            } else {
              var parsedHoursArray = removeWronDateFromTable(powerCut.hours);
              for (var i = 0; i < parsedHoursArray.length; i++) {
                var hour = parsedHoursArray[i];
                // wyświetlić tylko wyłączenia które jeszcze się nie skończyły,
                // a zakres godzinowy jest z bieżącego dnia - zmiana operowania z godzin wyłączenia na hours
                Targeo.app.addEOPPoint({
                  id: "".concat(pointIndex, "-h").concat(hoursIndex),
                  type: powerCut.shutdownType === 1 ? 2 : 1,
                  locality: powerCut.areas.join(", "),
                  coords: powerCut.convexHull.centroid.coordinates,
                  polygon: powerCut.convexHull.poly.coordinates,
                  timeFrom: parseHours(hour.fromDate),
                  timeTo: parseHours(hour.toDate),
                  region: deptIdToApropriteDeptName[powerCut.deptId][1],
                  desc: "<div class=\"popup-content-desc\" style=\"display: block;\">\n                  ".concat(powerCut.message, "\n                   ").concat(isDateAfterToday(powerCut.endDate) ? creatrMessageButtonToFuture(powerCut) : "", "</div>"),
                  link: "/uslugi/awarie-i-wylaczenia/wylaczenia-biezace/".concat(deptIdToApropriteDeptName[powerCut.deptId][1])
                });
                hoursIndex++;
              }
            }
          } else {
            console.warn("NetPr - Brak convexHull dla wy\u0142\u0105czenia o guid: ".concat(powerCut.guid, " - wy\u0142\u0105czenie NIE POJAWI SI\u0118 na mapce, w\u0142a\u015Bciwo\u015Bci dla wy\u0142\u0105czenia to"), powerCut);
          }
        }
      }
    };

    // Przemielenie danych z dokumentu wyłączenia planowe i awaryjne spełniające kryteria wyświetlania
    var makePowerCuts = function makePowerCuts(data) {
      var deptObject = data.document.payload.departments;
      for (var key in deptObject) {
        if (Object.hasOwnProperty.call(deptObject, key)) {
          var regionsObjects = deptObject[key].regions;
          for (var _key in regionsObjects) {
            if (Object.hasOwnProperty.call(regionsObjects, _key)) {
              var areasObjects = regionsObjects[_key].areas;
              for (var _key2 in areasObjects) {
                if (Object.hasOwnProperty.call(areasObjects, _key2)) {
                  var shoutdownObjects = areasObjects[_key2].shutdownInfos;
                  for (var _key3 in shoutdownObjects) {
                    if (Object.hasOwnProperty.call(shoutdownObjects, _key3)) {
                      var powerCut = shoutdownObjects[_key3];
                      var newKey = powerCut.guid; // stworzenie klucza wyłączenia na podstawie guida - takie wymuszone trochę ale zostawiam
                      var topologyList = powerCut.topologyElements; // wszystkie topologyElements dla bieżącego wyłączenia

                      // dodawać do obiektu futurePowerCutsByTopologyId jeżel
                      // i wyłączenie z przyszłości na podstawie daty rozpoczęcia i przy użyciu wyżej wygenerowanego klucza
                      if (isDateAfterToday(powerCut.startDate)) {
                        futurePowerCutsByTopologyId[createKeyFromTopologyIds(topologyList)] = powerCut;
                      }

                      /*
                        dodawanie do obiektu z dzisiejszymi wyłączeniami do późniejszej iteracji i tworzenia punktów na mapie
                        Założenia:
                          - pokazywać tylko dzisiejsze wyłączenia
                          - jeżeli na danym obszarze jest awaria masowa to nie pokazywać wyłączeń planowych id 1
                      */

                      // TODO - zmienić sposób działania na biorący pod uwagę tablicę hours
                      if (!isDateAfterToday(powerCut.startDate) && (!massBreakdownIds.includes(powerCut.deptId) || powerCut.shutdownType !== 2)) {
                        allCurrentPowerCuts[newKey] = powerCut;
                        allCurrentPowerCuts[newKey].topologyIdsKey = createKeyFromTopologyIds(topologyList);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      addPowerCutsToMap();
    };

    // Przemielenie danych z dokumentu awarii masowych
    var makeMassBreakdown = function makeMassBreakdown() {
      $.ajax({
        url: massBreakdowns,
        success: function success(data) {
          var massList = data.data;
          for (var key in massList) {
            if (Object.hasOwnProperty.call(massList, key)) {
              var massPayload = massList[key].payload;
              if (massPayload.active) {
                massBreakdownIds.push(massPayload.deptId);
                pointIndex++;

                // Aktualizacja zmiennych sumujących poszczególne dane awarii
                totalCustomersOff += massPayload.customer, totalStationsOff += massPayload.station, Targeo.app.addEOPPoint({
                  id: pointIndex,
                  type: 3,
                  locality: massPayload.deptId ? deptIdToApropriteDeptName[massPayload.deptId][0] : "",
                  massID: deptIdToApropriteDeptName[massPayload.deptId][1],
                  coords: massDeptIdGeo[massPayload.deptId],
                  polygon: null,
                  timeFrom: null,
                  timeTo: massPayload.cancelDate ? parseHours(massPayload.cancelDate) : null,
                  desc: "<div class=\"popup-content-desc\" style=\"display: block;\">".concat(massPayload.message, "</div>"),
                  link: "/uslugi/awarie-i-wylaczenia/wylaczenia-biezace/".concat(deptIdToApropriteDeptName[massPayload.deptId][1])
                });
              }
            }
          }
          // dodaję na stronę element z kalkulacją informacji na temat awarii masowych
          if (totalCustomersOff > 0 || totalStationsOff > 0) {
            massBreakdownCalculation();
          }
        },
        error: function error(_error) {
          // eslint-disable-next-line no-console
          console.log(_error);
        }
      }).always(function () {
        getJSON(powerCuts).then(function (data) {
          makePowerCuts(data);
        }).then(function () {
          $.getScript("https://mapa.targeo.pl/Targeo.html?vn=2_5_1&v=mobi&k=YjU4ZjI0YzFjOThhYThiY2I5OWU3ZmRiM2RmZTA4MzhhNzg3MmI5NA==&f=Targeo.app.initMobi&local=1");
          roller.style.display = "none";
          if (window.innerWidth > 600) {
            setTimeout(function () {
              $(".mb-zoom-in").trigger("click");
            }, 1000);
          }
        });
      });
    };
    var massBreakdownCalculation = function massBreakdownCalculation() {
      var content = "<table class=\"shutdown-map__info-user\"> <caption>Zestawienie danych dotycz\u0105cych awarii masowych:</caption> <thead> <tr> <th>Niezasilonych odbiorc\xF3w:</th> <th>Niezasilone stacje:</th> </tr> </thead> <tbody> <tr> <td>".concat(totalCustomersOff, "</td> <td>").concat(totalStationsOff, "</td> </tr> </tbody> </table>");
      parentElement.insertAdjacentHTML("beforeend", content);
    };

    /*
     funkcja do testowania problematycznych wyłączeń
     należy wprowadzić dane testowe do addEOPPoint oraz koordynaty punktu/ów w 'data' oraz buffer
     następnie aby mapka pokazała problematyczne wyłączenia w miejscu wywołania makePowerCuts(data) wstawić wywołanie makePowerCutsHard()
     */
    var makePowerCutsHard = function makePowerCutsHard() {
      $.ajax({
        method: "POST",
        dataType: "json",
        url: "https://apps.targeo.pl/eop/v1/Convex/generateConvexHull",
        data: JSON.stringify({
          buffer: "250",
          points: [[19.84561, 53.422]]
        }),
        async: true,
        success: function success(data) {
          Targeo.app.addEOPPoint({
            id: 1,
            type: 2,
            locality: "gmina wiejska Iława",
            coords: data.result.the_centroid.coordinates,
            polygon: data.result.the_poly.coordinates,
            timeFrom: "2021-09-20 13:01",
            timeTo: "2021-09-20 15:15",
            desc: '<div class="popup-content-desc" style="display: block;">Truszczyny</div>',
            link: "/uslugi/awarie-i-wylaczenia/wylaczenia-biezace/torun"
          });
        }
      });
    };
    makeMassBreakdown();
  }
  if (dataElement) {
    netprMapInit();
  }
});
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var Targeo = window.Targeo;
var mapElement = document.getElementById("nPrMap2024");
var includeTargeoCss = function includeTargeoCss() {
  var targeoCss = document.createElement("link");
  targeoCss.setAttribute("rel", "stylesheet");
  targeoCss.setAttribute("type", "text/css");
  targeoCss.setAttribute("href", "https://mapa.targeo.pl/__apps/energa/css/ol.css");
  document.getElementsByTagName("head")[0].appendChild(targeoCss);
};

// A to zrobiłem sobie z tych dwóch powyżej przy pomocy getCenterFromCoordPair ZOSTAJE i korzystam z tego
var countiesProperties = {
  213: {
    centroid: [17.3183271, 51.5175994],
    name: "milicki"
  },
  214: {
    centroid: [17.5088542, 51.2640635],
    name: "oleśnicki"
  },
  401: {
    centroid: [18.7322296, 52.7980454],
    name: "aleksandrowski"
  },
  402: {
    centroid: [19.4282571, 53.2617038],
    name: "brodnicki"
  },
  404: {
    centroid: [18.5170502, 53.3011213],
    name: "chełmiński"
  },
  405: {
    centroid: [19.0305121, 53.1028717],
    name: "golubsko-dobrzyński"
  },
  406: {
    centroid: [18.9562018, 53.4777091],
    name: "grudziądzki"
  },
  407: {
    centroid: [18.2992458, 52.7943636],
    name: "inowrocławski"
  },
  408: {
    centroid: [19.2382345, 52.8146848],
    name: "lipnowski"
  },
  409: {
    centroid: [18.0718239, 52.6380133],
    name: "mogileński"
  },
  411: {
    centroid: [18.6093296, 52.5848236],
    name: "radziejowski"
  },
  412: {
    // centroid: [19.4161747, 53.0477557],
    centroid: [19.416174731181552, 53.04775568155107],
    name: "rypiński"
  },
  413: {
    centroid: [17.5277094, 53.422781],
    name: "sępoleński"
  },
  414: {
    centroid: [18.4017669, 53.5115763],
    name: "świecki"
  },
  415: {
    centroid: [18.6551774, 53.0426806],
    name: "toruński"
  },
  416: {
    centroid: [17.939425, 53.58148],
    name: "tucholski"
  },
  417: {
    centroid: [18.934435, 53.2790571],
    name: "wąbrzeski"
  },
  418: {
    centroid: [19.0304052, 52.52615],
    name: "włocławski"
  },
  462: {
    centroid: [18.773438, 53.4721814],
    name: "Grudziądz"
  },
  463: {
    centroid: [18.6189007, 53.0211021],
    name: "Toruń"
  },
  464: {
    centroid: [19.0572036, 52.6609495],
    name: "Włocławek"
  },
  1002: {
    centroid: [19.3906393, 52.2423515],
    name: "kutnowski"
  },
  1004: {
    centroid: [19.1801437, 52.0940219],
    name: "łęczycki"
  },
  1005: {
    centroid: [19.8654755, 52.1134384],
    name: "łowicki"
  },
  1011: {
    centroid: [18.9039123, 51.8912185],
    name: "poddębicki"
  },
  1014: {
    centroid: [18.6003394, 51.5855011],
    name: "sieradzki"
  },
  1017: {
    centroid: [18.630335, 51.232645],
    name: "wieluński"
  },
  1018: {
    centroid: [18.2894438, 51.3034482],
    name: "wieruszowski"
  },
  1020: {
    centroid: [19.426237, 51.9249847],
    name: "zgierski"
  },
  1402: {
    centroid: [20.6066056, 52.8580146],
    name: "ciechanowski"
  },
  1404: {
    centroid: [19.5711602, 52.3781601],
    name: "gostyniński"
  },
  1408: {
    centroid: [20.959942, 52.4482553],
    name: "legionowski"
  },
  1411: {
    centroid: [21.2035109, 52.9245091],
    name: "makowski"
  },
  1413: {
    centroid: [20.363497, 53.0514626],
    name: "mławski"
  },
  1414: {
    centroid: [20.677096, 52.4585036],
    name: "nowodworski"
  },
  1419: {
    centroid: [19.8396388, 52.5500534],
    name: "płocki"
  },
  1420: {
    centroid: [20.354502, 52.6274781],
    name: "płoński"
  },
  1422: {
    centroid: [20.9137158, 53.1388393],
    name: "przasnyski"
  },
  1424: {
    centroid: [21.042152, 52.6767191],
    name: "pułtuski"
  },
  1427: {
    centroid: [19.6948172, 52.8292361],
    name: "sierpecki"
  },
  1428: {
    centroid: [20.2128908, 52.2673801],
    name: "sochaczewski"
  },
  1437: {
    centroid: [19.906042, 53.0291689],
    name: "żuromiński"
  },
  1462: {
    centroid: [19.701586, 52.537548],
    name: "Płock"
  },
  1608: {
    centroid: [18.4621332, 50.909755],
    name: "oleski"
  },
  2201: {
    centroid: [17.3229973, 54.141216],
    name: "bytowski"
  },
  2202: {
    centroid: [17.6865333, 53.809663],
    name: "chojnicki"
  },
  2203: {
    centroid: [17.1689729, 53.7288255],
    name: "człuchowski"
  },
  2204: {
    centroid: [18.5996103, 54.2226232],
    name: "gdański"
  },
  2205: {
    centroid: [18.0769447, 54.3125054],
    name: "kartuski"
  },
  2206: {
    centroid: [18.0038585, 54.0475462],
    name: "kościerski"
  },
  2207: {
    centroid: [19.018648, 53.7290681],
    name: "kwidzyński"
  },
  2208: {
    centroid: [17.6883005, 54.5809555],
    name: "lęborski"
  },
  2209: {
    centroid: [19.0139522, 54.0747419],
    name: "malborski"
  },
  2210: {
    centroid: [19.1919028, 54.2758255],
    name: "nowodworski"
  },
  2211: {
    centroid: [18.2858015, 54.7296143],
    name: "pucki"
  },
  2212: {
    centroid: [17.1661828, 54.4684026],
    name: "słupski"
  },
  2213: {
    centroid: [18.4120863, 53.8779487],
    name: "starogardzki"
  },
  2214: {
    centroid: [18.7338571, 53.9324661],
    name: "tczewski"
  },
  2215: {
    centroid: [18.060019, 54.5941086],
    name: "wejherowski"
  },
  2216: {
    centroid: [19.2300928, 53.9133708],
    name: "sztumski"
  },
  2261: {
    centroid: [18.6359481, 54.3597989],
    name: "Gdańsk"
  },
  2262: {
    centroid: [18.6173341, 54.5286839],
    name: "Gdynia"
  },
  2263: {
    centroid: [17.0318125, 54.4650259],
    name: "Słupsk"
  },
  2264: {
    centroid: [18.5627186, 54.4436331],
    name: "Sopot"
  },
  2801: {
    centroid: [20.7577895, 54.2476889],
    name: "bartoszycki"
  },
  2802: {
    centroid: [19.973093, 54.2997235],
    name: "braniewski"
  },
  2803: {
    centroid: [20.0226041, 53.2701896],
    name: "działdowski"
  },
  2804: {
    centroid: [19.5777431, 54.1266919],
    name: "elbląski"
  },
  2806: {
    centroid: [21.8440949, 53.998812],
    name: "giżycki"
  },
  2807: {
    centroid: [19.5474597, 53.6546706],
    name: "iławski"
  },
  2808: {
    centroid: [21.3148038, 54.1462286],
    name: "kętrzyński"
  },
  2809: {
    centroid: [20.4076181, 54.1136658],
    name: "lidzbarski"
  },
  2810: {
    centroid: [21.3653617, 53.8133792],
    name: "mrągowski"
  },
  2811: {
    centroid: [20.4738636, 53.3644979],
    name: "nidzicki"
  },
  2812: {
    centroid: [19.526419, 53.4381814],
    name: "nowomiejski"
  },
  2814: {
    centroid: [20.554649, 53.8075985],
    name: "olsztyński"
  },
  2815: {
    centroid: [19.959601, 53.7475008],
    name: "ostródzki"
  },
  2816: {
    centroid: [21.8415331, 53.661576],
    name: "piski"
  },
  2817: {
    centroid: [21.017461, 53.5429409],
    name: "szczycieński"
  },
  2819: {
    centroid: [21.7701263, 54.2137581],
    name: "węgorzewski"
  },
  2861: {
    centroid: [19.4392544, 54.1904624],
    name: "Elbląg"
  },
  2862: {
    centroid: [20.4741586, 53.7817266],
    name: "Olsztyn"
  },
  3003: {
    centroid: [17.5976454, 52.5383043],
    name: "gnieźnieński"
  },
  3004: {
    centroid: [17.062298, 51.8297894],
    name: "gostyński"
  },
  3006: {
    centroid: [17.5159262, 51.9911731],
    name: "jarociński"
  },
  3007: {
    centroid: [18.2175277, 51.7961695],
    name: "kaliski"
  },
  3008: {
    centroid: [17.9631144, 51.2396295],
    name: "kępiński"
  },
  3009: {
    centroid: [18.7664574, 52.2377277],
    name: "kolski"
  },
  3010: {
    centroid: [18.2642553, 52.2800782],
    name: "koniński"
  },
  3012: {
    centroid: [17.430609, 51.7435784],
    name: "krotoszyński"
  },
  3017: {
    centroid: [17.8029065, 51.6151954],
    name: "ostrowski"
  },
  3018: {
    centroid: [18.024492, 51.4501086],
    name: "ostrzeszowski"
  },
  3020: {
    centroid: [17.8108866, 51.9175068],
    name: "pleszewski"
  },
  3023: {
    centroid: [17.9178336, 52.3082969],
    name: "słupecki"
  },
  3025: {
    centroid: [17.3181774, 52.1776038],
    name: "średzki"
  },
  3027: {
    centroid: [18.508887, 52.0018246],
    name: "turecki"
  },
  3030: {
    centroid: [17.591541, 52.2524203],
    name: "wrzesiński"
  },
  3031: {
    centroid: [16.9227512, 53.4100966],
    name: "złotowski"
  },
  3061: {
    centroid: [18.0760814, 51.7439455],
    name: "Kalisz"
  },
  3062: {
    centroid: [18.2621437, 52.2553365],
    name: "Konin"
  },
  3201: {
    centroid: [16.059874, 53.9758884],
    name: "białogardzki"
  },
  3202: {
    centroid: [15.58205, 53.1382993],
    name: "choszczeński"
  },
  3203: {
    centroid: [15.9927919, 53.4731841],
    name: "drawski"
  },
  3205: {
    centroid: [15.2271652, 53.955173],
    name: "gryficki"
  },
  3208: {
    centroid: [15.6019606, 54.070478],
    name: "kołobrzeski"
  },
  3209: {
    centroid: [16.3755255, 54.1142914],
    name: "koszaliński"
  },
  3213: {
    centroid: [16.5928035, 54.3745221],
    name: "sławieński"
  },
  3215: {
    centroid: [16.5813051, 53.735087],
    name: "szczecinecki"
  },
  3216: {
    centroid: [15.879664, 53.7978509],
    name: "świdwiński"
  },
  3218: {
    centroid: [15.4840517, 53.651024],
    name: "łobeski"
  },
  3261: {
    centroid: [16.2059747, 54.2020418],
    name: "Koszalin"
  }
};
var departmentList = {
  2: "gdansk",
  3: "kalisz",
  4: "koszalin",
  5: "olsztyn",
  6: "plock",
  8: "torun"
};

// Przepisuję ty wyłączenia bo targeo inaczej interpretuje niż dokumentacja EOP
// eslint-disable-next-line no-undef
var rewriteType = new Map([[1, 2], [2, 1], [3, 3]]);
var getJSON = function getJSON(url) {
  var errorMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "fetch zawiódł";
  return fetch(url).then(function (response) {
    if (!response.ok) throw new Error("".concat(errorMsg, " (").concat(response.status, ")"));
    return response.json();
  });
};
function netPrEopMapInit() {
  return _netPrEopMapInit.apply(this, arguments);
}
function _netPrEopMapInit() {
  _netPrEopMapInit = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var parentElement, loader, shutdownDataUrl, massBreakdownsDataUrl, currentTime, endOfDay, totalCustomersOff, totalStationsOff, shutdownsArray, massShutdowns, groupIdsSet, futureShutdownTopologyIds, groupIdExist, formatDate, isValidDate, getMaxDate, getMinDate, isOngoingDateRange, isMultiDayShutdown, getStartEndDates, updatePropertyFuture, addShutdown, modifyShutdown, makeShutdownsArray, makeMassArray, addMassShutdownToMap, addShutdownToMap, addShutdownPointsToMap, insertMassShutdownCalculationHTML, loadTargeoScript;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          makeMassArray = function _makeMassArray(data) {
            var _iterator3 = _createForOfIteratorHelper(data),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var massItem = _step3.value;
                massShutdowns.push(massItem.payload);
                // massShutdowns.push(massItem);
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          };
          isOngoingDateRange = function _isOngoingDateRange(start, end) {
            var dateStart = new Date(start);
            var dateEnd = new Date(end);
            return currentTime >= dateStart && dateEnd >= currentTime || currentTime <= dateStart && dateStart <= endOfDay || currentTime <= dateEnd && dateEnd <= endOfDay;
          };
          parentElement = document.querySelector(".shutdown-map-2024"); // mapa
          loader = document.querySelector(".lds-roller"); // loader graficzny mapy
          shutdownDataUrl = mapElement.dataset.shutdowns; // Url do dokumentu z obiektem wyłączeń bieżących
          massBreakdownsDataUrl = mapElement.dataset.mass; // Url do dokumentu z obiektem awarii masowych
          currentTime = new Date();
          endOfDay = new Date().setHours(23, 59, 59, 999);
          totalCustomersOff = 0; // przechowują sumę użytkowników bez prądu z awarii masowych
          totalStationsOff = 0; // przechowują sumę wyłączonych stacji z awarii masowych
          shutdownsArray = []; // tablica obiektów wyłączeń bez dubli z ujednoliconymi wyłączeniami w ramach groupId
          massShutdowns = [];
          groupIdsSet = new Set(); // przechowuje niepowtarzalne group id na potrzeby eliminacji dubli
          // przechowuje wszystkie topology id dla komunikatu o kolejnych wyłączeniach w przyszłości w przypadku match
          futureShutdownTopologyIds = new Set(); // Sprawdza czy groupId istnieje w już zdefiniowanym set
          groupIdExist = function groupIdExist(groupIdValue) {
            return groupIdsSet.has(groupIdValue);
          }; // Formatowanie daty do akceptowalnej przez targeo
          formatDate = function formatDate(date) {
            var newDate = new Date(date);
            var year = newDate.getFullYear();
            var month = (newDate.getMonth() + 1).toString().padStart(2, 0);
            var day = newDate.getDate().toString().padStart(2, 0);
            var hour = newDate.getHours().toString().padStart(2, 0);
            var minute = newDate.getMinutes().toString().padStart(2, 0);
            return "".concat(day, "-").concat(month, "-").concat(year, " ").concat(hour, ":").concat(minute);
          };
          isValidDate = function isValidDate(date) {
            return !isNaN(date);
          };
          getMaxDate = function getMaxDate(datesArray) {
            var validDatesArray = datesArray.filter(isValidDate);
            return Math.max.apply(Math, _toConsumableArray(validDatesArray));
          };
          getMinDate = function getMinDate(datesArray) {
            var validDatesArray = datesArray.filter(isValidDate);
            return Math.min.apply(Math, _toConsumableArray(validDatesArray));
          }; // Zwraca boolean czy wydarzenie jest bieżące
          isMultiDayShutdown = function isMultiDayShutdown(startDate, endDate) {
            var start = new Date(startDate).setHours(0, 0, 0, 0);
            var end = new Date(endDate).setHours(0, 0, 0, 0);
            return start !== end;
          };
          getStartEndDates = function getStartEndDates(hoursRanges) {
            var onGoingHoursRange = hoursRanges.filter(function (hoursRange) {
              return isOngoingDateRange(hoursRange.fromDate, hoursRange.toDate);
            });
            if (onGoingHoursRange.length) {
              var toDatesArray = onGoingHoursRange.map(function (hoursRange) {
                return new Date(hoursRange.toDate);
              });
              var fromDatesArray = onGoingHoursRange.map(function (hoursRange) {
                return new Date(hoursRange.fromDate);
              });
              return {
                startDate: getMinDate(fromDatesArray),
                endDate: getMaxDate(toDatesArray)
              };
            }
            return false;
          }; // Ustawia właściwość wyłączenia świadczącą o posiadaniu w przyszłości wyłączeń dla zbieżnych topologyElements
          updatePropertyFuture = function updatePropertyFuture(shutdown) {
            shutdown.futureShutdown = shutdown.futureShutdown || Boolean(futureShutdownTopologyIds.intersection(new Set(shutdown.topologyElements)).size);
          }; // Dodaje wyłączenie do własnej tablicy niepowtarzalnych (groupId) wyłączeń)
          addShutdown = function addShutdown(shutdown) {
            if (shutdown.groupId) {
              groupIdsSet.add(shutdown.groupId);
              shutdown.groupShutdownCounter = 0;
            }
            if (shutdown.hours.length > 1) {
              var startEndDates = getStartEndDates(shutdown.hours, shutdown);
              shutdown.startDate = startEndDates.startDate;
              shutdown.endDate = startEndDates.endDate;
              shutdown.isOngoing = isOngoingDateRange(shutdown.startDate, shutdown.endDate);
              if (isMultiDayShutdown(shutdown.startDate, shutdown.endDate)) {
                var upcomingHoursRange = shutdown.hours.filter(function (hoursRange) {
                  return hoursRange.fromDate >= currentTime;
                });
                if (upcomingHoursRange.length) {
                  shutdown.hasManyHoursRange = true;
                }
              }
              updatePropertyFuture(shutdown);
            } else {
              shutdown.isOngoing = isOngoingDateRange(shutdown.startDate, shutdown.endDate);
            }
            shutdownsArray.push(shutdown);
          }; // W przypadku match dla groupId modyfikuje już istniejące wyłączenie z "shutdownsArray"
          modifyShutdown = function modifyShutdown(existingShutdown, shutdown) {
            var startEndDates = getStartEndDates([].concat(_toConsumableArray(existingShutdown.hours), _toConsumableArray(shutdown.hours)));
            existingShutdown.groupShutdownCounter = 1;
            existingShutdown.startDate = startEndDates.startDate;
            existingShutdown.endDate = startEndDates.endDate;
            existingShutdown.topologyElements = new Set([].concat(_toConsumableArray(existingShutdown.topologyElements), _toConsumableArray(shutdown.topologyElements)));
            existingShutdown.areas = new Set([].concat(_toConsumableArray(existingShutdown.areas), _toConsumableArray(shutdown.areas)));
            existingShutdown.isOngoing = isOngoingDateRange(existingShutdown.startDate, existingShutdown.endDate);
            updatePropertyFuture(shutdown);
          }; // Wypełnianie danymi własnej tablicy "shoutdownsArray"
          makeShutdownsArray = function makeShutdownsArray(shutdowns) {
            var _iterator = _createForOfIteratorHelper(shutdowns),
              _step;
            try {
              var _loop = function _loop() {
                var shutdown = _step.value;
                var groupIdExists = groupIdExist(shutdown.groupId);
                var startDate = new Date(shutdown.startDate);
                if (startDate > endOfDay) {
                  // Update seta  przyszłych wyłączeń o topologyElements z wyłączenia tylko dla wyłączeń w kolejnych dniach
                  //  .... tu można się przyczepić że nie biorę pod uwagę trwających w przyszłości
                  var _iterator2 = _createForOfIteratorHelper(shutdown.topologyElements),
                    _step2;
                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      var topologyId = _step2.value;
                      futureShutdownTopologyIds.add(topologyId);
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }
                } else {
                  var existingShutdown = shutdownsArray.find(function (_ref) {
                    var groupId = _ref.groupId;
                    return groupId === shutdown.groupId;
                  });
                  if (groupIdExists && existingShutdown) {
                    modifyShutdown(existingShutdown, shutdown);
                  } else {
                    addShutdown(shutdown);
                  }
                }
              };
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                _loop();
              }

              // Jeszcze raz weryfikuje po całym eachu czy w mojej tablicy są wyłączenia posiadające w najbliższym czasie kolejne wyłączenia
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            for (var _i = 0, _shutdownsArray = shutdownsArray; _i < _shutdownsArray.length; _i++) {
              var shutdown = _shutdownsArray[_i];
              if (!shutdown.futureShutdown) {
                updatePropertyFuture(shutdown);
              }
            }
          }; // Uzupełnia danymi tablicę awarii masowych
          addMassShutdownToMap = function addMassShutdownToMap(shutdown, county, index) {
            if (countiesProperties[county]) {
              Targeo.app.addEOPPoint({
                id: "id".concat(index),
                type: 3,
                locality: countiesProperties[county].name,
                massID: county,
                coords: countiesProperties[county].centroid,
                polygon: null,
                timeFrom: null,
                timeTo: shutdown.cancelDate ? formatDate(shutdown.cancelDate) : null,
                desc: "".concat(shutdown.message),
                link: "/uslugi/awarie-i-wylaczenia/wylaczenia-biezace/".concat(departmentList[shutdown.deptId])
              });
            } else {
              console.warn("brak powiatu na liście obsługiwanych");
            }
          };
          addShutdownToMap = function addShutdownToMap(shutdown, index) {
            var groupMessage = "";
            if (groupIdExist(shutdown.groupId) && shutdown.groupShutdownCounter) {
              groupMessage = "<p style='text-align:center'>Wiele wyłączeń w tym obszarze</p>";
            }
            var futureShutdownMessage = shutdown.futureShutdown || shutdown.hasManyHoursRange ? "<p style='text-align:center'>Uwaga: wkr\xF3tce kolejne wy\u0142\u0105czenia. <br>Zobacz <a href='/uslugi/awarie-i-wylaczenia/wylaczenia-planowane#d".concat(shutdown.deptId, "r").concat(shutdown.regionId, "'><b>wy\u0142\u0105czenia planowe</b></a><p>") : "";
            var message = "".concat(groupMessage, " ").concat(futureShutdownMessage);
            var deptValue = departmentList[shutdown.deptId];
            Targeo.app.addEOPPoint({
              id: "id".concat(index),
              type: rewriteType.get(shutdown.shutdownType),
              locality: _toConsumableArray(shutdown.areas).join(", "),
              coords: shutdown.polygon.centroid.coordinates,
              polygon: shutdown.polygon.poly.coordinates,
              timeFrom: formatDate(shutdown.startDate).toString(),
              timeTo: formatDate(shutdown.endDate).toString(),
              region: deptValue,
              desc: message,
              link: "/uslugi/awarie-i-wylaczenia/wylaczenia-biezace/".concat(deptValue)
            });
          }; // Dodawanie wyłączeń na mapę targeo
          addShutdownPointsToMap = function addShutdownPointsToMap() {
            // przechowuje counties dla których trwa awaria masowa (nie pokazujemy na masowej wyłączeń planowanych)
            var countiesOff = new Set();
            var shutdownIndex = 0; // index wyłączenia na potrzeby id metody addEOPPoint

            // Masowe
            for (var _i2 = 0, _massShutdowns = massShutdowns; _i2 < _massShutdowns.length; _i2++) {
              var shutdown = _massShutdowns[_i2];
              if (shutdown.counties) {
                totalCustomersOff += shutdown.customer;
                totalStationsOff += shutdown.station;

                // for (const county of shutdown.counties) {
                var _iterator4 = _createForOfIteratorHelper(shutdown.counties),
                  _step4;
                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    var county = _step4.value;
                    countiesOff.add(county);
                    shutdownIndex++;
                    addMassShutdownToMap(shutdown, county, shutdownIndex);
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }
              }
            }
            var onGoingEvent = shutdownsArray.filter(function (_ref2) {
              var isOngoing = _ref2.isOngoing;
              return isOngoing;
            });

            // Awaryjne i planowe
            var _iterator5 = _createForOfIteratorHelper(onGoingEvent),
              _step5;
            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var _shutdown = _step5.value;
                if (countiesOff.isDisjointFrom(new Set(_shutdown.counties)) || countiesOff.intersection(new Set(_shutdown.counties)) && _shutdown.shutdownType === 1) {
                  shutdownIndex++;
                  addShutdownToMap(_shutdown, shutdownIndex);
                }
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          }; // dodaję na stronę element z kalkulacją informacji na temat awarii masowych
          insertMassShutdownCalculationHTML = function insertMassShutdownCalculationHTML() {
            if (totalCustomersOff > 0 || totalStationsOff > 0) {
              var content = "<table class=\"shutdown-map__info-user\"> <caption>Zestawienie danych dotycz\u0105cych awarii masowych:</caption> <thead> <tr> <th>Niezasilonych odbiorc\xF3w:</th> <th>Niezasilone stacje:</th> </tr> </thead> <tbody> <tr> <td>".concat(totalCustomersOff, "</td> <td>").concat(totalStationsOff, "</td> </tr> </tbody> </table>");
              parentElement.insertAdjacentHTML("beforeend", content);
            }
          };
          loadTargeoScript = function loadTargeoScript() {
            return new Promise(function (resolve, reject) {
              try {
                var scriptEle = document.createElement("script");
                scriptEle.type = "text/javascript";
                scriptEle.async = true;
                scriptEle.src = "https://mapa.targeo.pl/Targeo.html?vn=2_5_1&v=mobi&k=YjU4ZjI0YzFjOThhYThiY2I5OWU3ZmRiM2RmZTA4MzhhNzg3MmI5NA==&f=Targeo.app.initMobi&local=1";
                scriptEle.addEventListener("load", function () {
                  resolve({
                    status: true
                  });
                });
                scriptEle.addEventListener("error", function () {
                  reject({
                    status: false,
                    message: "Failed to load the script Targeo.html"
                  });
                });
                document.body.appendChild(scriptEle);
              } catch (error) {
                reject(error);
              }
            });
          };
          includeTargeoCss();
          Targeo.app.setMapContainer("mb-map");
          if (!massBreakdownsDataUrl) {
            _context.next = 35;
            break;
          }
          _context.next = 35;
          return getJSON(massBreakdownsDataUrl).then(function (data) {
            makeMassArray(data.data);
          });
        case 35:
          _context.next = 37;
          return getJSON(shutdownDataUrl).then(function (data) {
            makeShutdownsArray(data.document.payload.shutdowns);
          });
        case 37:
          _context.next = 39;
          return loadTargeoScript().then(function () {
            loader.style.display = "none";
            if (window.innerWidth > 600) {
              setTimeout(function () {
                Targeo.app.theMap.getView().setCenter(
                // eslint-disable-next-line no-undef
                new ol.proj.fromLonLat([19.233908508737777, 52.92339494932792]));
                Targeo.app.theMap.getView().setZoom(7.2);
              }, 1000);
            }
          });
        case 39:
          addShutdownPointsToMap();
          insertMassShutdownCalculationHTML();
        case 41:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _netPrEopMapInit.apply(this, arguments);
}
if (mapElement) {
  netPrEopMapInit();
}
"use strict";

$(function () {
  var modal = {
    containerElem: $(".modalContainer-js"),
    closeElems: $(".closeModal-js"),
    modalOpener: $(".modalOpener-js"),
    modalWrapper: $(".modalWrapper-js")
  };

  // otwieranie
  modal.modalWrapper.on("click", function (e) {
    e.stopPropagation();
  });
  modal.modalOpener.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    modal.containerElem.addClass("is-open");
  });

  // Zamykanie
  $(document).on("click", function () {
    modal.containerElem.removeClass("is-open");
  });
  modal.closeElems.on("click", function () {
    modal.containerElem.removeClass("is-open");
  });
  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      //27
      modal.containerElem.removeClass("is-open");
    }
  });
});
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Shutdown = /*#__PURE__*/function () {
  function Shutdown(node) {
    _classCallCheck(this, Shutdown);
    this.container = node;
    this.init();
  }
  return _createClass(Shutdown, [{
    key: "mainContainer",
    get: function get() {
      return document.getElementById("shutdown-js");
    }
  }, {
    key: "templateTypeNode",
    get: function get() {
      return document.querySelector("#type");
    }
  }, {
    key: "templateRegionNode",
    get: function get() {
      return document.querySelector("#region");
    }
  }, {
    key: "templateAreaNode",
    get: function get() {
      return document.querySelector("#area");
    }
  }, {
    key: "templateShutdownNode",
    get: function get() {
      return document.querySelector("#shutdown");
    }
  }, {
    key: "externalDocumentUrl",
    get: function get() {
      return this.mainContainer.dataset.url;
    }
  }, {
    key: "selectedDeptId",
    get: function get() {
      return Number(this.mainContainer.dataset.dept);
    }
  }, {
    key: "currentTime",
    get: function get() {
      return new Date();
    }
  }, {
    key: "endOfDay",
    get: function get() {
      return new Date().setHours(23, 59, 59, 999);
    }
  }, {
    key: "isCurrent",
    value: function isCurrent(start, end) {
      var dateStart = new Date(start);
      var dateEnd = new Date(end);
      var result = this.currentTime <= dateStart && dateStart <= this.endOfDay || this.currentTime >= dateStart && dateEnd >= this.currentTime;
      return result;
    }
  }, {
    key: "emergencyClass",
    value: function emergencyClass(shutdownType) {
      return shutdownType === 1 ? "alert" : "warning";
    }
  }, {
    key: "isSameDay",
    value: function isSameDay(dateFrom, dateTo) {
      var startDate = new Date(dateFrom).setHours(0, 0, 0, 0);
      var endDate = new Date(dateTo).setHours(0, 0, 0, 0);
      return startDate === endDate;
    }
  }, {
    key: "dateFormat",
    value: function dateFormat(timestamp) {
      return new Date(timestamp).toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
    }
  }, {
    key: "dateTimeFormat",
    value: function dateTimeFormat(timestamp) {
      return new Date(timestamp).toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
  }, {
    key: "timeFormat",
    value: function timeFormat(timestamp) {
      return new Date(timestamp).toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit"
      });
    }
  }, {
    key: "getTimeRangeString",
    value: function getTimeRangeString(startDate, endDate) {
      var showOnlyHours = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var string = "";
      if (showOnlyHours && this.isSameDay(startDate, endDate)) {
        string += "".concat(this.timeFormat(startDate), " - ").concat(this.timeFormat(endDate));
      } else if (this.isSameDay(startDate, endDate)) {
        string += "".concat(this.dateTimeFormat(startDate), " - ").concat(this.timeFormat(endDate));
      } else {
        string += "".concat(this.dateTimeFormat(startDate), " - ").concat(this.dateTimeFormat(endDate));
      }
      return string;
    }
  }, {
    key: "getTimeRangeStringFromArray",
    value: function getTimeRangeStringFromArray(hours) {
      var dateSet = new Set();
      var dateTimeSet = new Set();
      var dateTimeString = "";
      var _iterator = _createForOfIteratorHelper(hours),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var hoursPair = _step.value;
          if (new Date(hoursPair.toDate) >= this.currentTime) {
            var theSameDate = dateSet.has(this.dateFormat(hoursPair.fromDate));
            dateSet.add(this.dateFormat(hoursPair.fromDate));
            dateTimeSet.add(this.getTimeRangeString(hoursPair.fromDate, hoursPair.toDate, theSameDate));
            dateTimeSet.add;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      dateTimeString = _toConsumableArray(dateTimeSet).join("<br>").replaceAll(",", " ");
      return dateTimeString;
    }
  }, {
    key: "insertShutdown",
    value: function insertShutdown(shutdowns) {
      var fragment = new DocumentFragment();
      var _iterator2 = _createForOfIteratorHelper(shutdowns),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var shoutdown = _step2.value;
          var cloneTemplate = this.templateShutdownNode.content.cloneNode(true);
          var message = cloneTemplate.querySelector(".shutdownMessage-js");
          var timeRange = cloneTemplate.querySelector(".shutdownTimeRange-js");
          message.textContent = shoutdown.message;
          timeRange.innerHTML = "".concat(shoutdown.hours.length ? this.getTimeRangeStringFromArray(shoutdown.hours) : this.getTimeRangeString(shoutdown.startDate, shoutdown.endDate));
          fragment.appendChild(cloneTemplate);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return fragment;
    }
  }, {
    key: "insertArea",
    value: function insertArea(region) {
      var _this = this;
      var fragment = new DocumentFragment();
      // eslint-disable-next-line no-undef
      var newMapByArea = new Map();
      var sortedRegioAreas = region.sort(function (a, b) {
        return a.regionName.charAt(0).localeCompare(b.regionName.charAt(0));
      });
      var _iterator3 = _createForOfIteratorHelper(sortedRegioAreas),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var shutdown = _step3.value;
          var _iterator4 = _createForOfIteratorHelper(shutdown.areas),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var area = _step4.value;
              var shutdowns = newMapByArea.has(area) ? [].concat(_toConsumableArray(newMapByArea.get(area)), [shutdown]) : [shutdown];
              newMapByArea.set(area, shutdowns);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      newMapByArea.forEach(function (value, key) {
        var cloneTemplate = _this.templateAreaNode.content.cloneNode(true);
        var name = cloneTemplate.querySelector(".areaName-js");
        var shutdowns = cloneTemplate.querySelector(".areaShutdowns-js");
        var shutdownTemplate = _this.insertShutdown(value);
        shutdowns.classList.add(_this.emergencyClass(value[0].shutdownType));
        name.textContent = key;
        shutdowns.appendChild(shutdownTemplate);
        fragment.appendChild(cloneTemplate);
      });
      return fragment;
    }
  }, {
    key: "insertRegions",
    value: function insertRegions(shutdownObj) {
      var sortedList = Object.keys(shutdownObj).sort(function (a, b) {
        var firstElement = shutdownObj[a][0].regionName;
        var secondElement = shutdownObj[b][0].regionName;
        return firstElement.localeCompare(secondElement);
      });
      var fragment = new DocumentFragment();
      var _iterator5 = _createForOfIteratorHelper(sortedList),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var key = _step5.value;
          var region = shutdownObj[key];
          var cloneTemplate = this.templateRegionNode.content.cloneNode(true);
          var name = cloneTemplate.querySelector(".regionName-js");
          var areas = cloneTemplate.querySelector(".regionAreas-js");
          var areaTemplate = this.insertArea(region);
          name.textContent = "Region ".concat(region[0].regionName);
          areas.appendChild(areaTemplate);
          fragment.appendChild(cloneTemplate);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return fragment;
    }
  }, {
    key: "insertTypeTemplate",
    value: function insertTypeTemplate(data) {
      var _this2 = this;
      var currentShutdownsFromSelectedDepartment = data.filter(function (shutdown) {
        return _this2.isCurrent(shutdown.startDate, shutdown.endDate) && shutdown.deptId === _this2.selectedDeptId;
      });
      var groupedByType = Object.groupBy(currentShutdownsFromSelectedDepartment, function (_ref) {
        var shutdownType = _ref.shutdownType;
        return shutdownType;
      });
      for (var key in groupedByType) {
        var region = groupedByType[key];
        var groupedByRegionId = Object.groupBy(region, function (_ref2) {
          var regionId = _ref2.regionId;
          return regionId;
        });
        var cloneTemplate = this.templateTypeNode.content.cloneNode(true);
        var item = cloneTemplate.querySelector(".typeItem-js");
        var icon = cloneTemplate.querySelector(".typeItemIcon-js");
        var header = cloneTemplate.querySelector(".typeItemHeader-js");
        var regions = cloneTemplate.querySelector(".typeItemRegions-js");
        var regionsTemplate = this.insertRegions(groupedByRegionId);
        item === null || item === void 0 || item.classList.add(this.emergencyClass(region[0].shutdownType));
        icon === null || icon === void 0 || icon.classList.add(this.emergencyClass(region[0].shutdownType));
        header === null || header === void 0 || header.classList.add(this.emergencyClass(region[0].shutdownType));
        header.textContent = region[0].shutdownType === 1 ? "Wyłączenia awaryjne" : "Wyłączenia planowe";
        regions.appendChild(regionsTemplate);
        this.mainContainer.appendChild(cloneTemplate);
      }
    }
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!this.mainContainer) {
                _context.next = 3;
                break;
              }
              _context.next = 3;
              return fetch(this.externalDocumentUrl).then(function (response) {
                if (!response.ok) throw new Error(response.status);
                return response.json();
              }).then(function (data) {
                _this3.insertTypeTemplate(data.document.payload.shutdowns);
              }).catch();
            case 3:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }]);
}();
new Shutdown();
"use strict";

$(function () {
  var customer = $(".countCustomer-js");
  var station = $(".countStation-js");
  if (customer.length > 0 && station.length > 0) {
    var totalCustomer = customer.data("customer").reduce(function (pv, cv) {
      return pv + (parseFloat(cv) || 0);
    }, 0);
    var totalStation = station.data("station").reduce(function (pv, cv) {
      return pv + (parseFloat(cv) || 0);
    }, 0);
    customer.html(totalCustomer);
    station.html(totalStation);
  }

  /* let inDoc = {}

    let mapPoints = inDoc.document.payload.departments;
    let guidlist = [];
    let pointList = [];
    let indexs = 0;
    function PoinMap (
        guid,
        circleRadius,
        points,
        id,
        type,
        locality,
        coords,
        polygon,
        timeFrom,
        timeTo,
        region,
        desc,
        link
    ) {
        this.guid = guid;
        this.circleRadius = circleRadius;
        this.points = points;
        this.id = id;
        this.type = type;
        this.locality = locality;
        this.coords = coords;
        this.polygon = polygon;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
        this.region = region;
        this.desc = desc;
        this.link = link;
    }
    for (let i = 0; i < mapPoints.length; i++) {
        for (let region in mapPoints[i].regions) {
            for (let j = 0; j < mapPoints[i].regions[region].areas.length; j++) {
                for (let shutdownInfo in mapPoints[i].regions[region].areas[j].shutdownInfos) {
                    let guid = mapPoints[i].regions[region].areas[j].shutdownInfos[shutdownInfo].guid;
                    let deptNameCorect = mapPoints[i].regions[region].areas[j].shutdownInfos[shutdownInfo].deptName.toLowerCase().replace(/ę/ig, 'e').replace(/ż/ig, 'z').replace(/ó/ig, 'o').replace(/ł/ig, 'l').replace(/ć/ig, 'c').replace(/ś/ig, 's').replace(/ź/ig, 'z').replace(/ń/ig, 'n').replace(/ą/ig, 'a');
                     if (guidlist.indexOf(guid) === -1) {
                        guidlist.push(guid);
                         pointList.push(new PoinMap(
                            guid,
                            mapPoints[i].regions[region].areas[j].shutdownInfos[shutdownInfo].circleRadius,
                            mapPoints[i].regions[region].areas[j].shutdownInfos[shutdownInfo].topologyElements,
                            indexs++,
                            mapPoints[i].regions[region].areas[j].shutdownInfos[shutdownInfo].shutdownType === 1 ? 2 : 1,
                            mapPoints[i].regions[region].areas[j].shutdownInfos[shutdownInfo].areas.join(', '),
                            'coords',
                            'polygon',
                            new Date(mapPoints[i].regions[region].areas[j].shutdownInfos[shutdownInfo].hours[0].fromDate),
                            new Date(mapPoints[i].regions[region].areas[j].shutdownInfos[shutdownInfo].hours[0].toDate),
                            deptNameCorect,
                            mapPoints[i].regions[region].areas[j].shutdownInfos[shutdownInfo].message,
                            '/uslugi/awarie-i-wylaczenia/wylaczenia-biezace/'+deptNameCorect
                        ));
                        console.log(pointList);
                    }
                }
            }
        }
    } */
});
"use strict";

(function () {
  // $('.main-slider').owlCarousel({
  //     loop:false,
  //     nav:false,
  //     dot:true,
  //     nestedItemSelector: 'slide',
  //     margin:0,
  //     items:1
  // });
  var mainSlider = $(".main-slider");
  var elementsWithAutoPlaySettings = $(".main-slider .autoplay-js");

  // console.log("autoplay", elementsWithAutoPlaySettings.length ? true : false, elementsWithAutoPlaySettings.length);
  mainSlider.owlCarousel({
    loop: true,
    autoplay: elementsWithAutoPlaySettings.length ? true : false,
    autoplayHoverPause: true,
    video: true,
    margin: 0,
    nav: false,
    dots: true,
    dotsData: false,
    nestedItemSelector: "slide",
    items: 1,
    lazyLoad: true,
    navText: [$(".am-next"), $(".am-prev")],
    responsiveClass: true,
    responsive: {
      0: {
        nav: false
      },
      600: {
        nav: false
      },
      1200: {
        nav: true
      }
    }
  });
  var dots = $(".owl-dot");
  var slides = $(".slide");

  // Function to update tabindex
  function updateTabIndex(element, isActive) {
    var tabIndexValue = isActive ? "0" : "-1";
    element.find(".slide__title, .button").attr("tabindex", tabIndexValue);
  }

  // Set aria-labels for dots
  dots.each(function (index, dot) {
    var slide = slides[index];
    var title = $(slide).find(".slide__title").text();
    $(dot).attr("aria-label", "Slide ".concat(index + 1, " ").concat(title));
  });
  var owlItems = $(".owl-item");

  // Mutation observer for owl items
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === "class") {
        var target = $(mutation.target);
        var isActive = target.hasClass("active");
        updateTabIndex(target, isActive);
      }
    });
  });

  // Initialize observer and set initial tabindex
  owlItems.each(function (index, item) {
    observer.observe(item, {
      attributes: true
    });
    var isActive = $(item).hasClass("active");
    updateTabIndex($(item), isActive);
  });
  var prevButton = mainSlider.find(".owl-prev");
  var nextButton = mainSlider.find(".owl-next");

  // Set aria-labels for prev and next buttons
  prevButton.attr("aria-label", "Poprzedni slajd");
  nextButton.attr("aria-label", "Następny slajd");

  // Set aria-role for prev and next buttons
  prevButton.attr("role", "button");
  nextButton.attr("role", "button");
})();
"use strict";

(function () {
  //Element z atrybutami data
  var sliderContainer = $(".slider-container-tv");
  //Refresh page - pobieramy w minutach

  var refreshTime = sliderContainer.data("refresh-page") * 60 * 1000;
  if (sliderContainer.length > 0) {
    setTimeout(function () {
      window.location.reload(true);
    }, refreshTime);
  }
  //Change slide - pobieramy w sekundach
  var changeSlide = sliderContainer.data("change-slide") * 1000;
  $(".slider-container-tv").owlCarousel({
    loop: true,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: changeSlide,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });

  //ograniczenie liczby znaków contentu

  //pobranie kontenera contentu danego slajdu
  var contentContainer = $(".publication-tv__content");
  //iterowanie po slajdach
  for (var i = 0; i < contentContainer.length; i++) {
    //przypisanie slajdu do zmiennej
    var content = contentContainer[i];
    //pobranie dzieci w których jest treść
    var contentChildren = content.children;
    //zmienna do konkatenacji tekstu
    var textOnSlide = "";
    for (var j = 0; j < contentChildren.length; j++) {
      if (textOnSlide.length + contentChildren[j].textContent.length <= 1288) {
        textOnSlide += contentChildren[j].textContent;
      } else {
        if (textOnSlide.length > 1288) {
          contentChildren[j].innerHTML = "";
        } else {
          var newContent = contentChildren[j].textContent;
          textOnSlide += contentChildren[j].textContent;
          contentChildren[j].textContent = "";

          //ograniczenie do 1288 znaków
          newContent = newContent.slice(0, 1288 - textOnSlide.length);
          //ograniczenie do ostatniej kropki

          newContent = newContent.slice(0, newContent.lastIndexOf(".") + 1);
          contentChildren[j].textContent = newContent;
        }
      }
    }
  }

  //ograniczenie liczby znaków tytułu
  var titles = document.querySelectorAll(".publication-tv__title");
  titles.forEach(function (title) {
    var titleText = title.textContent.trim();
    titleText = titleText.slice(0, 69);
    title.textContent = titleText;
  });

  //schowanie scrollbara
  if (screen.width > 1400) {
    var sliderTV = $(".slider-background");
    var body = document.querySelector("body");
    if (sliderTV.parent()[0] == body) {
      body.style.overflow = "hidden";
    }
  }
})();
"use strict";

(function () {
  $(".attInfo-js").on("click", function () {
    var rodzic = $(this).parent();
    rodzic.find(".title").toggleClass("hide");
    rodzic.find(".description").toggleClass("show");
  });
})();
"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/*
  -
  - version: c.form 0.0.1
  -
  -
  - Opis

  -
  -
*/
(function () {
  // pola pliku
  var fileInputs = document.querySelectorAll(".formFieldFileInput-js");
  // buttony pliku
  var fileButton = document.querySelectorAll(".formFieldFileButton-js");
  if (fileInputs.length) {
    // obsłużenie klawiatury
    var _iterator = _createForOfIteratorHelper(fileButton),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var button = _step.value;
        button.addEventListener("keyup", function (event) {
          if (event.keyCode === 32 || event.keyCode === 13) {
            event.preventDefault();
            var currentParent = event.target.closest(".formFieldFile-js");
            currentParent.querySelector(".formFieldFileInput-js").click();
          }
        });
      }

      // Obsługa event po załączeniu plików - pokazanie ilości i nazwy dodanych plików dla czytników stron (wizualnie ilość widocznego tekstu ograniczona)
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var _iterator2 = _createForOfIteratorHelper(fileInputs),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var fileInput = _step2.value;
        fileInput.addEventListener("change", function (event) {
          var currentParent = event.target.closest(".formFieldFile-js"); // główny tag obejmujący kliknięty field
          var inputWithPlaceholder = currentParent.querySelector(".fieldFilePlaceholder-js"); //widoczny element z informacją o wgranych plikach
          var fileList = event.target.files; // pobranie listy dodanych plików
          var fileNames = ["".concat(fileList.length > 0 ? fileList.length : "")]; // tablica na nazwy załączonych plików
          var form = event.target.closest("form");

          // zbudowanie tablicy z listą nazw dodanych plików
          var _iterator3 = _createForOfIteratorHelper(fileList),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var file = _step3.value;
              fileNames.push(file.name);
            }

            // podmiana placeholder na nazwy wgranych plików
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          inputWithPlaceholder.setAttribute("placeholder", fileNames.join(", "));

          // nadanie klasy do rozróżnienia w jaki sposób formularz powinien być wysyłany.
          form.classList.add("addedFile-js");
        });
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
})();
"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/*
  -
  - version: c.form 0.0.1
  -
  -
  - Opis
    To trzeba poprawić ewentualnie przemyśleć czy dajemy takie rozwiązanie bo to jest jednak ingerencja w treść
  -
  -
*/
(function () {
  // treść klauzuli
  var clauseContent = document.querySelectorAll(".accordionClause-js");
  if (!clauseContent.length) return;
  function beautyClause() {
    var _iterator = _createForOfIteratorHelper(clauseContent),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var clause = _step.value;
        var allElements = clause.childNodes; //wszystkie elementy kontenera klauzuli
        var fragment = document.createDocumentFragment(); //document fragment który zastąpi obecną formę klauzuli
        var accordionItemHtml = void 0;
        var accordionContent = void 0;
        var _iterator3 = _createForOfIteratorHelper(allElements),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var nodeElement = _step3.value;
            if (nodeElement.nodeName !== "INPUT" && nodeElement.nodeName !== "#text") {
              if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(nodeElement.nodeName)) {
                nodeElement.className = "form__clause-button";
                accordionItemHtml = document.createElement("div");
                accordionItemHtml.className = "form__clause-accordion-item";
                accordionContent = document.createElement("div");
                accordionContent.className = "form__clause-panel";
                accordionItemHtml.appendChild(nodeElement);
                accordionItemHtml.appendChild(accordionContent);
                fragment.appendChild(accordionItemHtml);
              } else {
                if (accordionContent) {
                  accordionContent.appendChild(nodeElement);
                }
              }
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        clause.appendChild(fragment);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var allAccordionButton = document.getElementsByClassName("form__clause-button");
    var _iterator2 = _createForOfIteratorHelper(allAccordionButton),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var tab = _step2.value;
        tab.addEventListener("click", function () {
          var singleAccordContent = this.nextElementSibling;
          this.classList.toggle("active");
          singleAccordContent.classList.toggle("show");
        });
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  beautyClause();
})();
"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/*
  -
  - version: form-inline-validation 0.0.2
  -
  -
  - Opis
    To jest niedokończone
  -
  -
  - Historia zmian
    - 0.0.2:
      - zmiana nazwy wersji c.form na form-inline-validation
      - poprawa selektora na właściwy
  -
  -
*/

(function () {
  // sprawdzenie poprawności wypełnienia pola po jego opuszczeniu, działa na zasadzie zmiany styli dla pola ze zdefiniowanym pattern bądź wymaganym
  var inputs = document.querySelectorAll("input, textarea, select");
  var _iterator = _createForOfIteratorHelper(inputs),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      item.addEventListener("blur", function (event) {
        event.target.classList.add("check-field");
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
})();
"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/*
  -
  - version: c.form 0.0.1
  -
  -
  - Opis

  -
  -
*/

(function () {
  var passwordField = document.querySelectorAll(".checkPassword-js");
  var _iterator = _createForOfIteratorHelper(passwordField),
    _step;
  try {
    var _loop = function _loop() {
      var elem = _step.value;
      var passwordParent = elem.parentElement;
      var passwordTooltip = passwordParent.querySelector(".tooltipDetails-js");
      var infoLowerCase = passwordParent.querySelector(".passwordLetter-js");
      var infoUpperCase = passwordParent.querySelector(".passwordCapital-js");
      var infoNumber = passwordParent.querySelector(".passwordNumber-js");
      var infoCount = passwordParent.querySelector(".passwordLength-js");
      var checkRequirements = function checkRequirements(valid, infoElem) {
        infoElem.classList.toggle("invalid", !valid);
      };
      elem.addEventListener("focus", function () {
        passwordTooltip.toggleAttribute("open");
      });
      elem.addEventListener("blur", function () {
        passwordTooltip.toggleAttribute("open");
      });
      elem.onkeyup = function () {
        var lowerCaseRegex = /[a-z]/g;
        var upperCaseRegex = /[A-Z]/g;
        var numbersRegex = /[0-9]/g;
        checkRequirements(elem.value.match(lowerCaseRegex), infoLowerCase); // małe
        checkRequirements(elem.value.match(upperCaseRegex), infoUpperCase); // Duże
        checkRequirements(elem.value.match(numbersRegex), infoNumber); // Cyfry
        checkRequirements(elem.value.length >= 8, infoCount); // długość
      };
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
})();
"use strict";

/*
  -
  - version: c.form 0.0.1
  -
  -
  - Opis

  -
  -
*/
var tooltipDetails = document.querySelectorAll(".tooltipDetails-js");
var showHideDetails = function showHideDetails() {
  this.toggleAttribute("open");
};
if (tooltipDetails.length) {
  tooltipDetails.forEach(function (item) {
    item.addEventListener("focusin", showHideDetails);
    item.addEventListener("focusout", showHideDetails);
    item.addEventListener("mouseenter", showHideDetails);
    item.addEventListener("mouseleave", showHideDetails);
  });
}
"use strict";

function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable indent */
// import MasterDetail from "./master-detail.js";
/*
  -
  - version: c.form 0.0.3
  -
  -
  - Opis
    Uwagę należy zwrócić na klasy które nie są *-js ogólnie skończyły mi się pomysły jak to zrobić bez klas albo zwykłych obiektów
  -
  -
  - Historia zmian
    - 0.0.2:
      - eliminacja przycisku wypełniania ponownie formularza
    - 0.0.3:
      - dodanie obsługi masterDetail
  -
  -
*/

// -------------------------
function toggleContainerVisibility(container, show) {
  container.style.display = show ? "" : "none";
  var mustBeRequired = container.getAttribute("data-required") === "true";
  var inputs = container.querySelectorAll("input, select, textarea");
  if (show && mustBeRequired) {
    inputs.forEach(function (input) {
      input.setAttribute("required", "true");
      input.setAttribute("aria-required", "true");
    });
  } else {
    inputs.forEach(function (input) {
      input.removeAttribute("required");
      input.removeAttribute("aria-required");
    });
  }
}
function repairConditionSource(fieldContainerNode, counter) {
  var _fieldContainerNode$q, _regex$exec;
  var fieldName = (_fieldContainerNode$q = fieldContainerNode.querySelector("[name]")) === null || _fieldContainerNode$q === void 0 ? void 0 : _fieldContainerNode$q.name;
  var regex = new RegExp(/^field\d+:\d+:/, "g");
  var prefix = fieldName && ((_regex$exec = regex.exec(fieldName)) === null || _regex$exec === void 0 ? void 0 : _regex$exec[0]);
  if (prefix) {
    if (counter) {
      prefix = prefix.replace(/:\d+:/, ":".concat(counter, ":"));
    }
    var initialConditionSourceValue = fieldContainerNode.dataset.conditionSource;
    var destConditionSourceValue = prefix.concat(initialConditionSourceValue);
    fieldContainerNode.setAttribute("data-condition-source", destConditionSourceValue);
  }
}
function validateChildrenMinMaxLength(elementContainer) {
  var formElementWithMinMax = elementContainer.querySelectorAll("[minlength], [maxlength]");
  formElementWithMinMax.forEach(function (formElement) {
    formElement.addEventListener("change", function (e) {
      return e.target.reportValidity();
    });
  });
}

// ----------------------------
var MasterDetail = /*#__PURE__*/function () {
  function MasterDetail(element) {
    _classCallCheck(this, MasterDetail);
    this.container = element;
    this.input = element.querySelector(".masterDetailInput-js");
    this.isInputInitValue = !!this.input.value;
    this.masterFields = _toConsumableArray(element.querySelectorAll(".masterDetailField-js"));
    this.viewType = element.dataset.viewType;
    this.valueColumn = element.dataset.valueColumn;
    this.additionalColumn = Number(escapeHtml(element.dataset.additionalColumn));
    this.jsonUrl = element.dataset.docUrl;
    this.loaderMask = null;
    this.usedSheetIndexArray = []; // tablica przezchowująca indexy kolumn w arkuszu
    this.parsedSheetData = []; // zoptymalizowane dane arkusza na potrzeby użycia w kodzie
    this.masterDetailResultValueObj = {
      selection: [],
      value: ""
    };
  }
  return _createClass(MasterDetail, [{
    key: "makeLoaderMask",
    value: function makeLoaderMask() {
      var htmlElement = document.createElement("div");
      htmlElement.classList.add("mask");
      var spinner = document.createElement("div");
      spinner.classList.add("mask__loader");
      htmlElement.appendChild(spinner);
      this.loaderMask = htmlElement;
    }
  }, {
    key: "addLoaderMask",
    value: function addLoaderMask() {
      if (!this.loaderMask) {
        this.makeLoaderMask();
      }
      this.container.appendChild(this.loaderMask);
    }
  }, {
    key: "removeMask",
    value: function removeMask() {
      this.container.querySelector(".mask").remove();
    }
  }, {
    key: "addErrorMask",
    value: function addErrorMask() {
      var htmlElement = document.createElement("div");
      htmlElement.classList.add("mask");
      var content = document.createElement("p");
      content.classList.add("mask__content");
      content.textContent = "Błąd pobierania danych prosimy spróbować ponownie później";
      htmlElement.appendChild(content);
      this.container.appendChild(htmlElement);
    }
  }, {
    key: "parseDataSheet",
    value: function parseDataSheet(sheetData) {
      var resultArray = [];
      var arrLength = this.usedSheetIndexArray.length;
      var _iterator = _createForOfIteratorHelper(sheetData),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _element$this$additio;
          var element = _step.value;
          var flatArray = element.map(function (arrElem) {
            return arrElem.value;
          });
          var destObj = {
            selection: [],
            value: this.valueColumn ? flatArray[this.valueColumn] : "",
            selected: false,
            additionalColumnValue: this.additionalColumn && ((_element$this$additio = element[this.additionalColumn]) === null || _element$this$additio === void 0 ? void 0 : _element$this$additio.value)
          };
          for (var index = 0; index < arrLength; index++) {
            if (flatArray[this.usedSheetIndexArray[index]] !== "") {
              destObj.selection.push(flatArray[this.usedSheetIndexArray[index]]);
            }
          }
          if (this.input.value && this.compareResultSelectionWith(destObj.selection)) {
            destObj.selected = true;
          }
          resultArray.push(destObj);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.parsedSheetData = resultArray;
    }
  }, {
    key: "buildTree",
    value: function buildTree() {
      var root = [];
      this.parsedSheetData.forEach(function (_ref, index) {
        var selection = _ref.selection,
          selected = _ref.selected;
        var selectionIndex = index;
        var path = selection.filter(Boolean);
        if (!path.length) return;
        var currentLevel = root;
        path.forEach(function (segment, idx) {
          if (idx === path.length - 1) {
            currentLevel.push({
              name: segment,
              isRadio: true,
              children: [],
              selectionIndex: selectionIndex,
              checked: selected
            });
          } else {
            var node = currentLevel.find(function (n) {
              return n.name === segment && !n.isRadio;
            });
            if (!node) {
              node = {
                name: segment,
                isRadio: false,
                children: [],
                selectionIndex: selectionIndex,
                checked: selected // ???
              };
              currentLevel.push(node);
            }
            currentLevel = node.children;
          }
        });
      });
      return root;
    }
  }, {
    key: "radioElement",
    value: function radioElement(labelValue, baseId, index, isChecked) {
      var _this = this;
      var destValueForMasterDetailInput = this.parsedSheetData[index];
      var radio = document.createElement("div");
      radio.classList.add("custom-field");
      var input = document.createElement("input");
      input.type = "radio";
      input.name = "help".concat(baseId);
      input.id = "".concat(baseId, "-").concat(index);
      input.setAttribute("data-selection-index", index);
      input.classList.add("sr-only");
      input.checked = isChecked;
      var label = document.createElement("label");
      label.classList.add("custom-field__label", "custom-field__label--radio");
      label.htmlFor = "".concat(baseId, "-").concat(index);
      label.innerHTML = '<svg viewBox="0 0 100 100" class="radio-circle"> <circle class="circle" cx="50" cy="50" r="48"></circle> <circle class="circle circle--checked" cx="50" cy="49" r="28"></circle></svg>';
      label.appendChild(document.createTextNode(escapeHtml(labelValue)));
      radio.append(input, label);
      input.addEventListener("change", function () {
        delete destValueForMasterDetailInput.selected;
        delete destValueForMasterDetailInput.additionalColumnValue;
        _this.input.value = JSON.stringify(destValueForMasterDetailInput);
        _this.input.dispatchEvent(new Event("change", {
          bubbles: true
        }));
      });
      return radio;
    }
  }, {
    key: "radioGroup",
    value: function radioGroup(children, baseId) {
      var _this2 = this;
      var docFragment = new DocumentFragment();
      children.forEach(function (element) {
        if (element.isRadio) {
          docFragment.append(_this2.radioElement(element.name, baseId, element.selectionIndex, element.checked));
        } else {
          var groupContainer = document.createElement("fieldset");
          var legend = document.createElement("legend");
          legend.textContent = element.name;
          var radioContainer = document.createElement("div");
          radioContainer.classList.add("form__radio-list");
          radioContainer.appendChild(_this2.radioGroup(element.children, baseId));
          groupContainer.append(legend, radioContainer);
          docFragment.append(groupContainer);
        }
      });
      return docFragment;
    }
  }, {
    key: "compareResultSelectionWith",
    value: function compareResultSelectionWith(arr) {
      var _this3 = this;
      if (arr.length === this.masterDetailResultValueObj.selection.length) {
        return arr.every(function (element, index) {
          return element === _this3.masterDetailResultValueObj.selection[index];
        });
      }
      return false;
    }
  }, {
    key: "updateLabelRange",
    value: function updateLabelRange(formElement, minValue, maxValue) {
      var initialLabelValue = formElement.labels[0].textContent.split("(zakres")[0];
      formElement.labels[0].textContent = "".concat(initialLabelValue, " (zakres ").concat(minValue, " - ").concat(maxValue, ")");
      formElement.addEventListener("change", function (e) {
        e.target.reportValidity();
      });
    }
  }, {
    key: "updateMinMaxAttribute",
    value: function updateMinMaxAttribute(formElement, minValue, maxValue) {
      formElement.min = minValue;
      formElement.max = maxValue;
    }

    // Hak energowy
  }, {
    key: "isMatchingObject",
    value: function isMatchingObject(parseDataSingeObj) {
      var inputName = this.input.name;
      var conditionContainers = document.querySelectorAll("[data-condition-source='".concat(inputName, "']"));
      if (parseDataSingeObj) {
        if (this.additionalColumn) {
          var _parseDataSingeObj$ad;
          var selector = "[data-condition-source=\"".concat(inputName, "\"] input[name*=\"field9929038\"]");
          var conditionSourceInput = document.querySelector(selector);
          var minMaxArgs = (_parseDataSingeObj$ad = parseDataSingeObj.additionalColumnValue) === null || _parseDataSingeObj$ad === void 0 || (_parseDataSingeObj$ad = _parseDataSingeObj$ad.trim()) === null || _parseDataSingeObj$ad === void 0 ? void 0 : _parseDataSingeObj$ad.split("-");
          if (conditionSourceInput && minMaxArgs) {
            var _minMaxArgs = _slicedToArray(minMaxArgs, 2),
              min = _minMaxArgs[0],
              max = _minMaxArgs[1];
            this.updateMinMaxAttribute(conditionSourceInput, min, max);
            this.updateLabelRange(conditionSourceInput, min, max);
          }
          conditionContainers.forEach(function (element) {
            toggleContainerVisibility(element, false);
          });
        }
        this.input.dispatchEvent(new Event("change", {
          bubbles: true
        }));
      } else {
        conditionContainers.forEach(function (element) {
          toggleContainerVisibility(element, false);
        });
      }
    }
  }, {
    key: "updateMasterInputValue",
    value: function updateMasterInputValue(index, value) {
      var _this4 = this;
      var modifyIndex = ["--- wybierz ---", ""].includes(value) ? index : index + 1;
      this.masterDetailResultValueObj.selection[index] = value;
      this.masterDetailResultValueObj.selection.splice(modifyIndex);
      var matchingObject = this.parsedSheetData.find(function (item) {
        return _this4.compareResultSelectionWith(item.selection);
      });
      this.masterDetailResultValueObj.value = (matchingObject === null || matchingObject === void 0 ? void 0 : matchingObject.value) || "";
      this.input.value = JSON.stringify(this.masterDetailResultValueObj);
      this.isMatchingObject(matchingObject);
    }
  }, {
    key: "getColumnValues",
    value: function getColumnValues(index, phrase) {
      var elementMatchedArray = phrase ? this.parsedSheetData.filter(function (element) {
        return element.selection[index] === phrase;
      }) : this.parsedSheetData;
      // eslint-disable-next-line no-undef
      var values = new Set();
      var filterIndex = phrase ? index + 1 : index;
      elementMatchedArray.forEach(function (element) {
        if (element.selection[filterIndex]) {
          values.add(element.selection[filterIndex]);
        }
      });

      // eslint-disable-next-line no-undef
      return values;
    }
  }, {
    key: "showField",
    value: function showField(element) {
      element.removeAttribute("disabled");
      element.classList.remove("hidden");
    }
  }, {
    key: "hideField",
    value: function hideField(element) {
      element.innerHTML = "";
      element.setAttribute("disabled", true);
      element.classList.add("hidden");
    }
  }, {
    key: "clearFieldsAfter",
    value: function clearFieldsAfter(currentFieldElement) {
      var _this5 = this;
      if (!currentFieldElement) {
        return;
      }
      var currentIndex = this.masterFields.findIndex(function (element) {
        return element.id === currentFieldElement.id;
      });
      this.masterFields.forEach(function (element, index) {
        if (index > currentIndex) {
          _this5.hideField(element);
        }
      });
    }
  }, {
    key: "selectOnChange",
    value: function selectOnChange(event, thisClass) {
      var index = Number(event.target.dataset.index);
      var isNextSelectElementInDom = index + 1 < this.masterFields.length;
      var nextSelectElement = isNextSelectElementInDom ? thisClass.masterFields[index + 1] : false;
      var clearSelectAfter = event.target.value === "" ? event.target : nextSelectElement;
      if (clearSelectAfter) {
        thisClass.clearFieldsAfter(clearSelectAfter); // przy zmianie wybranej wyżej opcji czyszczę wszysktkie kolejne wypelnione już pola
      }
      if (event.target.value && nextSelectElement) {
        nextSelectElement.innerHTML = "";
        thisClass.addOptionsTo(nextSelectElement, event.target.value);
        var fieldOption = nextSelectElement.options;
        if (fieldOption.length) {
          this.showField(nextSelectElement);
        } else {
          this.hideField(nextSelectElement);
        }
      }
      thisClass.updateMasterInputValue(index, event.target.value);
    }
  }, {
    key: "addOptionsTo",
    value: function addOptionsTo(destSelect, filterValue) {
      var _this6 = this;
      var initValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var destSelectIndex = Number(destSelect.dataset.index);
      var prevIndex = destSelectIndex - 1 >= 0 ? destSelectIndex - 1 : 0;
      var options = this.getColumnValues(prevIndex, filterValue);
      var isOnlyEmptyValue = options.size === 1 && options.keys().next().value === "";
      var selectValueFromInputObj = this.masterDetailResultValueObj.selection.length && this.masterDetailResultValueObj.selection[destSelectIndex]; // czy pole masterDetail jest uzupełnione i posiada wartość dla indexu bieżącego selecta

      if (options.size && !isOnlyEmptyValue) {
        destSelect.add(new Option("--- wybierz ---"), null);
        var _iterator2 = _createForOfIteratorHelper(options),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var option = _step2.value;
            var safeOptionValue = escapeHtml(option);
            var isChosen = selectValueFromInputObj === safeOptionValue;
            destSelect.add(new Option(safeOptionValue, safeOptionValue, false, isChosen));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      destSelect.addEventListener("change", function (event) {
        return _this6.selectOnChange(event, _this6);
      });
      if (initValue) {
        this.masterFields.forEach(function (element, index) {
          if (index > destSelectIndex && (_this6.masterDetailResultValueObj.selection[index] || _this6.masterDetailResultValueObj.selection[index] === "")) {
            _this6.addOptionsTo(element, _this6.masterDetailResultValueObj.selection[index - 1]);
            _this6.showField(element);
          }
        });
        var matchingObject = this.parsedSheetData.find(function (item) {
          return _this6.compareResultSelectionWith(item.selection);
        });
        if (!matchingObject) {
          var conditionContainer = document.querySelectorAll("[data-condition-source]");
          conditionContainer.forEach(function (element) {
            if (element.dataset.conditionSource === _this6.input.name) {
              toggleContainerVisibility(element, false);
            }
          });
        } else {
          this.isMatchingObject(matchingObject);
        }
      }
    }
  }, {
    key: "fetchData",
    value: function fetchData() {
      var _this7 = this;
      this.addLoaderMask();
      fetch(this.jsonUrl).then(function (response) {
        if (!response.ok) {
          // ERROR wyświetlić
          throw new Error("Network response was not ok");
        }
        return response.json();
      }).then(function (data) {
        if (_this7.input.value) {
          _this7.masterDetailResultValueObj = JSON.parse(_this7.input.value);
        }
        if (_this7.viewType === "list") {
          var _destRadioContainer$d;
          var destRadioContainer = _this7.masterFields[0];
          _this7.usedSheetIndexArray = (_destRadioContainer$d = destRadioContainer.dataset.columnIds) === null || _destRadioContainer$d === void 0 ? void 0 : _destRadioContainer$d.split(","); // Uzupełniam tablicę z indexami użytych pól arkusza w formularzu

          _this7.parseDataSheet(data.document.data.map.data);
          destRadioContainer.appendChild(_this7.radioGroup(_this7.buildTree(), destRadioContainer.dataset.fieldId));
        } else {
          var firstSelect = _this7.masterFields[0];
          var _iterator3 = _createForOfIteratorHelper(_this7.masterFields),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var field = _step3.value;
              _this7.usedSheetIndexArray.push(field.dataset.columnId); // Uzupełniam tablicę z indexami użytych pól arkusza w formularzu
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          _this7.parseDataSheet(data.document.data.map.data);
          _this7.addOptionsTo(firstSelect, null, _this7.isInputInitValue);
        }
        _this7.removeMask();
        return;
      }).catch(function (e) {
        _this7.removeMask();
        _this7.addErrorMask();
        console.error(e);
      });
    }
  }]);
}();
var MultipleGroups = /*#__PURE__*/function () {
  function MultipleGroups(duplicateButtonNode) {
    var _this$groupContainer, _this$groupContainer$;
    _classCallCheck(this, MultipleGroups);
    _defineProperty(this, "repairConditionSourceForMultiGroup", repairConditionSource);
    this.triggerButton = duplicateButtonNode;
    this.prefix = duplicateButtonNode.dataset.prefix;
    this.minOccurs = duplicateButtonNode.dataset.minOccurs;
    this.maxOccurs = duplicateButtonNode.dataset.maxOccurs || 999; //jak obliczyć ilość wstawionych już obiektów
    this.maxReachedMessage = duplicateButtonNode.dataset.maxReached;
    this.groupContainer = duplicateButtonNode.previousElementSibling;
    this.groupFormElements = (_this$groupContainer = this.groupContainer) === null || _this$groupContainer === void 0 ? void 0 : _this$groupContainer.querySelectorAll("input[name^='".concat(this.prefix, "'], select[name^='").concat(this.prefix, "'], textarea[name^='").concat(this.prefix, "']"));
    this.redyGroupToAppend = null;
    this.currentOccurs = Number((_this$groupContainer$ = this.groupContainer.children[this.groupContainer.childElementCount - 1].querySelector("[name]").name.match(/:(\d+)/)) === null || _this$groupContainer$ === void 0 ? void 0 : _this$groupContainer$[1]) + 1;
    this.counter = this.currentOccurs || this.minOccurs + 1;
  }
  return _createClass(MultipleGroups, [{
    key: "makeGroupTemplate",
    value: function makeGroupTemplate() {
      if (this.groupFormElements) {
        var docFragment = new DocumentFragment();
        this.groupFormElements.forEach(function (field) {
          docFragment.append(field.closest(".form__element").cloneNode(true));
        });
        this.redyGroupToAppend = docFragment;
      } else {
        // eslint-disable-next-line no-console
        console.error("Nie znaleziono szablonu dla data-prefix: ".concat(this.prefix));
        return;
      }
    }
  }, {
    key: "updateAttributes",
    value: function updateAttributes(docFragment) {
      var _this8 = this;
      var elements = docFragment.querySelectorAll("[id], [name], [for], .masterDetailField-js, [data-condition-source]");
      elements.forEach(function (el) {
        if (el.id) {
          el.id = el.id.replace(/:\d+/, ":".concat(_this8.counter));
        }
        if (el.name) {
          el.name = el.name.replace(/:\d+/, ":".concat(_this8.counter));
        }
        if (el.hasAttribute("for")) {
          el.setAttribute("for", el.getAttribute("for").replace(/:\d+/, ":".concat(_this8.counter)));
        }
        if (el.dataset.fieldId) {
          // TODO to chyba poprawić na wzór conditional source
          el.dataset.fieldId = el.dataset.fieldId.replace(/:\d+/, ":".concat(_this8.counter));
        }
        if (el.dataset.conditionSource) {
          _this8.repairConditionSourceForMultiGroup(el, _this8.counter);
        }
        if (el.value) {
          el.value = "";
        }
      });
    }
  }, {
    key: "changeButtonState",
    value: function changeButtonState() {
      this.triggerButton.disabled = true;
      var messageElement = document.createElement("p");
      messageElement.textContent = this.maxReachedMessage;
      this.triggerButton.before(messageElement);
    }
  }, {
    key: "watchButton",
    value: function watchButton() {
      var _this9 = this;
      this.triggerButton.addEventListener("click", function (event) {
        event.preventDefault();
        _this9.addGroup();
      });
    }
  }, {
    key: "fireMasterDetail",
    value: function fireMasterDetail(docFragment) {
      var masterDetailInGroup = docFragment.querySelectorAll(".masterDetailContainer-js");
      masterDetailInGroup.forEach(function (element) {
        var masterFormElement = element.closest(".form__element");
        if (masterFormElement.classList.contains("form__element-error")) {
          masterFormElement.classList.remove("form__element-error");
        }
        new MasterDetail(element).fetchData();
      });
    }
  }, {
    key: "addGroup",
    value: function addGroup() {
      if (this.counter <= this.maxOccurs) {
        var newGroup = this.redyGroupToAppend.cloneNode(true);
        this.updateAttributes(newGroup);
        this.fireMasterDetail(newGroup);
        validateChildrenMinMaxLength(newGroup);
        this.groupContainer.append(newGroup);
        this.counter++;
        if (this.counter === Number(this.maxOccurs)) {
          this.changeButtonState();
        }
      } else if (!this.triggerButton.disabled) {
        this.changeButtonState();
      }
    }
  }, {
    key: "init",
    value: function init() {
      if (!this.prefix) {
        // eslint-disable-next-line no-console
        console.error("Brak atrybutu data-prefix w przycisku!", this.triggerButton);
        return;
      }
      if (!this.groupContainer.classList.contains("itemlist-js")) {
        console.error("Nie znaleziono elementu .itemlist-js obok przycisku! ", this.triggerButton);
        return;
      }
      this.makeGroupTemplate();
      this.watchButton();
    }
  }]);
}();
function escapeHtml(string) {
  return String(string).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
(function () {
  var allFormOnSite = document.querySelectorAll(".form-js form"); // wszystkie formularze na stronie (uwzględniając wykluczenia formularzy z poza form edytora. np search)
  var allRequiredClause = document.querySelectorAll(".requiredClauseInput-js"); // wymagane klauzule w formularzach
  var anyReCaptchaElement = document.querySelector(".g-recaptcha"); // jakikolwiek istniejący element captcha
  var captchaVersion = (anyReCaptchaElement === null || anyReCaptchaElement === void 0 ? void 0 : anyReCaptchaElement.dataset.size) || ""; // wersja captcha [normal - checkbox; invisible - wiadomo]
  var captchaFormFail = document.querySelector(".captchaFormFail-js"); // klasa nadawana w hbs dla kontenera wysłanego formularza
  var masterDetailElements = document.querySelectorAll(".masterDetailContainer-js");
  var insertedCaptcha = false; // flaga dodania skryptu google recaptcha na stronie
  var formToSendElement; // Wypełniony formularz do wysyłki po weryfikacji captcha
  var fileUploadXhr;
  var isAnyCaptchaFormWithoutClause = false; // flaga istnienia na stronie formularza bez klauzul z captcha
  var duplicateButtons = document.querySelectorAll(".duplicateFields-js");
  duplicateButtons.forEach(function (element) {
    new MultipleGroups(element).init();
  });

  /*
    Modyfikacja submit formularza
    W zależności od sposobu i zawartości formularza wysyłany jest w inny sposób
  */
  function addError(fieldItem) {
    var closestNodeElement = fieldItem.closest(".form__element");
    closestNodeElement.classList.add("form__element-error");
  }
  function submitListener(event) {
    event.preventDefault();
    var form = event.target;
    var itemListGroup = document.querySelectorAll(".itemListContainer-js");
    var emptyItemList = [];
    itemListGroup.forEach(function (element) {
      var elementsInGroup = element.querySelectorAll("[name]");
      var hasAnyValue = false;
      elementsInGroup.forEach(function (item) {
        if (item.value) {
          hasAnyValue = true;
        } else if (item.required) {
          addError(item);
        }
      });
      if (!hasAnyValue) {
        var closestNodeElement = element.closest(".form__element");
        emptyItemList.push(closestNodeElement);
        closestNodeElement.classList.add("form__element-error");
      }
    });
    if (!emptyItemList.length) {
      if (captchaVersion === "invisible" && insertedCaptcha) {
        // Dla formularzy z captcha wywoływany jest callback na submit
        formToSendElement = form;
        grecaptcha.reset();
        grecaptcha.execute();
      } else {
        if (form.classList.contains("addedFile-js")) {
          // Wysyłanie plików
          sendFormWithFiles(form);
        } else {
          // Wysyłanie w tle lub zwykły submit
          form.classList.contains("sendAsync-js") ? sendInBackground(form) : form.submit();
        }
      }
    } else {
      emptyItemList[0].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
    }
  }

  /** *****************
  CAPTCHA
  *******************/
  /*
  Wczytywanie skryptu recaptcha. Obejmuje:
    - przypisanie do roota callbacków niezbędnych dla funkcjonowania recaptcha
    - stworzenie tagu script z odpowiednim source i dodanie do head
  */

  // callback submit dla recaptcha invisible z parametru w form-submit.hbs po pozytywnej weryfikacji
  function captchaSubmit() {
    if (formToSendElement.classList.contains("addedFile-js")) {
      // Wysyłka formularza z plikami
      sendFormWithFiles(formToSendElement);
    } else {
      // Wysyłka formularza asynchronicznie bądź zwykły submit
      formToSendElement.classList.contains("sendAsync-js") ? sendInBackground(formToSendElement) : formToSendElement.submit();
    }
  }

  // Callback po wczytaniu recaptcha - odblokowuje przycisk submit formularza
  function unlockSubmitButtons() {
    var allSubmitButtons = document.querySelectorAll(".submitButton-js"); // buttony wysyłające formularz

    // usunięcie atrybutu disabled (dodawana dla buttona w hbs gdy recaptcha w formularzu została użyta)
    allSubmitButtons.forEach(function (element) {
      return element.removeAttribute("disabled");
    });
  }

  // Wstawia script z linkiem recaptcha
  function insertCaptchaScript() {
    window.captchaSubmit = captchaSubmit;
    window.unlockSubmitButtons = unlockSubmitButtons;
    var siteLanguage = (anyReCaptchaElement === null || anyReCaptchaElement === void 0 ? void 0 : anyReCaptchaElement.dataset.lang) || ""; // Język strony na potrzeby captcha-y
    var script = document.createElement("script"); // zbudowanie tagu script

    script.src = "https://www.google.com/recaptcha/api.js?onload=unlockSubmitButtons&hl=".concat(siteLanguage); // nadanie src dla tagu script
    document.head.appendChild(script); // wstawienie fragmentu dokumentu script do head strony
    insertedCaptcha = true; // zmiana statusu flagi wczytania skryptu google
  }

  /** *****************
  KONIEC CAPTCHA
  *******************/

  /*
  Sprawdza wymagane klauzule z checkbox-em wskazanego formularza.
    - Z założenia właściciel witryny w klauzulach powinien zawrzeć informację o sposobie działania recaptcha
      dlatego sprawdzane są wszystkie wymagane z checkbox
    - służy do weryfikacji czy wczytać recaptcha.
    - zwraca true jeżeli wszystkie wymagane zostaną zaznaczone
  */
  function areRequiredClausesChecked(form) {
    var allRequiredClauseInForm = form.querySelectorAll(".requiredClauseInput-js");
    var _iterator4 = _createForOfIteratorHelper(allRequiredClauseInForm),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var clause = _step4.value;
        if (!clause.checked) {
          return false;
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return true;
  }

  /** *****************
   Aktualizacja formularza
  *******************/

  // Dodaje nagłówek do formularza z informacją o statusie wysyłki i ewentualnymi błędami globalnymi
  function appendHeader(data, form) {
    var _data$action, _data$action2;
    var errorStatusText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var formParent = form.parentElement; // czy tu dawać closest z klasą form
    var formErrorHeading = form.dataset.headerContent;
    var formErrorMessage = form.dataset.messageContent;
    var isHeader = document.querySelector(".formSentHeader-js");
    var header = document.createElement("div");
    var message = data !== null && data !== void 0 && (_data$action = data.action) !== null && _data$action !== void 0 && _data$action.message ? data === null || data === void 0 || (_data$action2 = data.action) === null || _data$action2 === void 0 ? void 0 : _data$action2.message : form.dataset.i18nFormSentSuccess;
    var sendSuccess = (data === null || data === void 0 ? void 0 : data.success) || false;
    var headingContent = sendSuccess ? message : formErrorHeading;
    var content = "";

    // Tworzy html listy błędów z serwera wstawianej w nagłówku informacyjnym formularza
    function createGlobalErrorHtml(errorObj) {
      var items = "";
      var _iterator5 = _createForOfIteratorHelper(errorObj),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var item = _step5.value;
          items += "<li>".concat(item.defaultMessage, "</li>");
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return "<ul class=\"form__global-error-list\">".concat(items, "</ul>");
    }
    if (sendSuccess) {
      content = "<h2>".concat(headingContent, "</h2>");
    } else {
      if (errorStatusText) {
        content = "\n            <div class=\"subscribe__heading\" role=\"alert\">\n              <div class=\"callout alert\">\n                <h2>".concat(headingContent, "</h2>\n                <p>").concat(errorStatusText, "</p>\n              </div>\n            </div>\n          ");
      } else {
        var isInputErrors = Object.keys(data.errors.fields).length;
        var isGlobalErrors = data.errors.global.length;
        var errorsContent = "";
        if (isGlobalErrors) {
          errorsContent += "".concat(createGlobalErrorHtml(data.errors.global));
        }
        if (isInputErrors) {
          errorsContent += "<p>".concat(formErrorMessage, "</p>");
        }
        content = "\n        <div class=\"subscribe__heading\" role=\"alert\">\n          <div class=\"callout ".concat(sendSuccess ? "success" : "alert", "\">\n            <h2>").concat(headingContent, "</h2>\n            ").concat(errorsContent, "\n          </div>\n        </div>\n        ");
      }
    }
    header.classList.add("formSentHeader-js");
    header.innerHTML = content;

    /*
    usunięcie dodanego przez js nagłówka błędu, aby w przypadku kolejnego nie powstał nowy element
    Zastanawiałem się nad sposobem dłubania w już istniejącym komunikacie błędu ale uznałem że chyba tak będzie czytelniej i prościej
     */
    if (isHeader) {
      isHeader.remove();
    }

    // dodanie nowego nagłówka
    formParent.prepend(header);
  }

  // Przesuwa widok okna do nagłówka z informacją o statusie wysyłki formularza
  function scrollToHeader() {
    var sentMessage = document.querySelector(".formSentHeader-js");
    if (sentMessage) {
      sentMessage.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
    }
  }

  // Wstawianie błędu do pól formularzy
  function updateFieldErrors(errorsJson, form) {
    var fieldContainerClass = ".form__element"; // klasa kontenera zawierającego wszystkie elementy pojedynczego field`a
    var errorFieldContainerClass = "form__element-error"; // nazwa klasy błędu dla kontenera field`a
    var errorsListForFieldClass = "form__error-list"; // nazwa klasy kontenera zawierającego listę błędów pola

    function createErrorHtml(errorsList) {
      var fragment = new DocumentFragment();
      var element = document.createElement("ul");
      element.classList.add(errorsListForFieldClass);
      fragment.appendChild(element);
      var _iterator6 = _createForOfIteratorHelper(errorsList),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var error = _step6.value;
          var item = document.createElement("li");
          item.innerHTML = "".concat(error.defaultMessage);
          element.appendChild(item);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      return fragment;
    }
    function removeErrors(form) {
      var fieldsWithError = form.querySelectorAll(".".concat(errorFieldContainerClass));
      var _iterator7 = _createForOfIteratorHelper(fieldsWithError),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var errorFieldContainer = _step7.value;
          errorFieldContainer.classList.remove(errorFieldContainerClass);
          errorFieldContainer.querySelector(".".concat(errorsListForFieldClass)).remove();
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    }

    // jeżeli jakieś błędy istnieją to je usuwam, żeby nie wyświetlać ewentualnie nieaktualnych
    removeErrors(form);
    for (var key in errorsJson) {
      if (Object.hasOwnProperty.call(errorsJson, key)) {
        var selectorString = "*[name = \"".concat(key, "\"]"); // Budowanie selektora błędnego field
        var inputWithError = form.querySelector(selectorString); // field z błędem
        var fieldType = inputWithError.type; // odczyt typu field z błędem
        var fieldContainer = inputWithError.closest(fieldContainerClass); // kontener całego pola formularza - do dodania klasy błędu
        var fieldLabel = void 0;
        if (fieldType === "radio") {
          fieldLabel = fieldContainer.querySelector("fieldset");
        } else {
          fieldLabel = fieldContainer.querySelector(".form__label-container"); // dobranie się do kontenera z label
        }
        fieldContainer.classList.add(errorFieldContainerClass); // dodanie klasy błędu dla całego field
        fieldLabel.appendChild(createErrorHtml(errorsJson[key])); // dodanie html błędu do field
      }
    }
  }

  // Aktualizuje zawartość formularza, nagłówka i progressBar
  function updateForm(data, form, errorStatusText) {
    function hideAndChangeProgressBar() {
      var progressBar = form.querySelector(".progressBar-js");
      if (progressBar) {
        progressBar.classList.remove("show");
        progressBar.querySelector(".progressBarFill-js").style.width = 0;
        progressBar.querySelector(".progressBarContent-js").innerHTML = "";
      }
    }

    // Przywraca formularz do formy początkowej (z przed wypełnienia)
    function listenerResetForm(form) {
      // Wyszukuje elementy do zmiany
      var formHeader = form.closest(".form-js").querySelector(".formSentHeader-js");
      var resetButton = formHeader.querySelector(".reset-js");
      if (resetButton) {
        resetButton.addEventListener("click", function () {
          updateFieldErrors(null, form); // usunięcie dodanych w html błędów
          form.reset(); // reset pól formularza
          // TODO: nie czyści pola pliku readonly
          formHeader.remove(); // usunięcie dodanych nagłówków/callout

          // Ukrycie i reset paska postępu
          hideAndChangeProgressBar();

          // pokazanie wyczyszczonego formularza
          form.style.display = "block";
        });
      }
    }

    // Wstawienie nagłówka z informacją o statusie wysyłki formularza
    if (errorStatusText) {
      appendHeader(data, form, errorStatusText);
      hideAndChangeProgressBar();
    } else {
      appendHeader(data, form);
    }

    // Dodanie błędów lub ukrycie formularza
    if (data && data.success) {
      form.style.display = "none"; // Ukrycie formularza
      listenerResetForm(form); // listener na reset wartości formularza do ponownego pokazania jeżeli po sukcesie został dodany button (a powinien zostać dodany)
    } else {
      // Wstawianie nowych błędów
      if (data && data.errors) {
        updateFieldErrors(data.errors.fields, form);
      }
    }
    scrollToHeader();
  }

  /** *****************
   Wysyłanie Formularza
  *******************/
  function uploadFiles(form) {
    var progress = form.querySelector(".progressBar-js");
    var progresContentBox = progress.querySelector(".progressBarContent-js");
    var progressFill = progress.querySelector(".progressBarFill-js");
    var i18nUnknownError = form.dataset.i18nUnknownError;
    var i18nTimeout = form.dataset.i18nTimeout;
    function requestError(event) {
      var status = event.target.statusText || i18nUnknownError;
      updateForm(false, form, status);
    }
    function requestTimeout() {
      updateForm(false, form, i18nTimeout);
    }
    function uploadProgress(event) {
      var percent = 100 * event.loaded / event.total;
      var progressContent = progress.dataset.i18nProgress;
      progressFill.style.width = percent.toFixed(2) + "%";
      progresContentBox.innerHTML = progressContent + ": " + percent.toFixed(2) + "%";
    }
    function requestStage(event) {
      var eventTarget = event.target;
      if (eventTarget.readyState === 4) {
        var status = eventTarget.status;
        if ((status === 0 || status >= 200 && status < 400) && eventTarget.response !== "") {
          var responseJson = JSON.parse(eventTarget.response);
          updateForm(responseJson, form);
        } else if (status !== 0 && eventTarget.statusText) {
          updateForm(null, form, eventTarget.statusText);
        } else {
          updateForm(null, form, status);
        }
      } else if (eventTarget.readyState === 3) {
        progresContentBox.innerHTML = progress.dataset.i18nProgressResponse;
      }
    }

    // Request
    fileUploadXhr.addEventListener("loadstart", function () {
      progress.classList.add("show");
    }, false);
    fileUploadXhr.addEventListener("load", function () {
      progresContentBox.innerHTML = progress.dataset.i18nProgressComplete;
    }, false);
    fileUploadXhr.addEventListener("readystatechange", requestStage);
    fileUploadXhr.addEventListener("error", requestError, false);
    fileUploadXhr.addEventListener("timeout", requestTimeout, false);

    // Upload
    fileUploadXhr.upload.addEventListener("progress", uploadProgress, false);
  }
  function sendFormWithFiles(form) {
    fileUploadXhr = new XMLHttpRequest();
    var formDataElem = new FormData(form);

    // Jeżeli formularz nie był wysyłany wysyłaj pliki i utwórz progress bar
    if (!form.querySelector(".formSentHeader-js")) {
      uploadFiles(form);
    }

    // posting the form with the same method and action as specified by the HTML markup
    fileUploadXhr.open(form.getAttribute("method"), window.location.href, true);
    fileUploadXhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    fileUploadXhr.send(formDataElem);
  }
  function sendInBackground(form) {
    var dataForm = new FormData(form);
    var i18nTryAgainLater = form.dataset.i18nTryAgainLater;
    fetch(window.location.href, {
      method: "POST",
      body: dataForm,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      },
      credentials: "same-origin"
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.errors) {
        updateForm(data, form, null);
      } else {
        updateForm(data, form);
      }
      return;
    }).catch(function (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      updateForm(null, form, i18nTryAgainLater);
    });
  }

  /** *****************
   Odpalanie skryptów
  *******************/
  if (anyReCaptchaElement && allRequiredClause) {
    /*
    dla każdej wymaganej klauzuli dodaję event zmiany,
    przy każdej zmianie sprawdzam czy:
      - captcha została już wczytana czy nie, jeżeli tak to nie ma sensu nic robić
      - wszystkie wymagane w danym formularzu zgody zostały zaznaczone
    jeżeli nie ma wczytanej captcha i wszystkie wymagane klauzule w formularzu zostały zaznaczone wstawiam captcha
    */
    var insertCaptchaScriptIfShould = function insertCaptchaScriptIfShould(event) {
      var currentForm = event.target.closest("form");

      // wczytanie recaptcha jeżeli wymagane klauzule formularza zostały zaznaczone
      if (!insertedCaptcha && areRequiredClausesChecked(currentForm)) {
        insertCaptchaScript();
      }
    };
    var _iterator8 = _createForOfIteratorHelper(allRequiredClause),
      _step8;
    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var clause = _step8.value;
        clause.addEventListener("change", insertCaptchaScriptIfShould);
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
  }
  var _iterator9 = _createForOfIteratorHelper(allFormOnSite),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var form = _step9.value;
      validateChildrenMinMaxLength(form);

      // modyfikacja event submit formularzy
      form.addEventListener("submit", submitListener);

      // Weryfikacja czy istnieje na stronie formularz z captcha bez wymaganych klauzul
      if (!form.querySelector(".requiredClauseInput-js")) {
        isAnyCaptchaFormWithoutClause = true;
      }
    }

    /*
      Należy wczytać od razu captcha, jeżeli którykolwiek formularz ma włączoną captcha.
      Pod warunkiem, że nie istnieją wymagane klauzule (wymagane zaznaczenie wszystkich wymaganych), bądź refresh strony formularza nie wynika ze zwrotki po błędzie z serwera.
    */
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
  if (anyReCaptchaElement && (captchaFormFail || isAnyCaptchaFormWithoutClause)) {
    insertCaptchaScript();
  }

  // MasterDetail
  var _iterator10 = _createForOfIteratorHelper(masterDetailElements),
    _step10;
  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var element = _step10.value;
      new MasterDetail(element).fetchData();
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
  }
  scrollToHeader();

  // Conditional fields
  function handleConditionsInForm(form) {
    var conditionalFields = form.querySelectorAll("[data-condition-source]");
    conditionalFields.forEach(function (field) {
      return repairConditionSource(field);
    });
    function getSourceValue(sourceName) {
      var groupDiv = form.querySelector("[data-checkbox-group=\"".concat(sourceName, "\"]"));
      if (groupDiv) {
        var checkboxes = groupDiv.querySelectorAll('input[type="checkbox"]');
        var checkedValues = Array.from(checkboxes).filter(function (ch) {
          return ch.checked;
        }).map(function (ch) {
          return ch.value;
        });
        return checkedValues;
      }
      var field = form[sourceName];
      if (!field) return null;
      if (field.type !== "checkbox" && field.type !== "radio") {
        return field.value;
      }
      return field.checked ? field.value : null;
    }
    function updateDependents(sourceName) {
      var conditionalFields = form.querySelectorAll("[data-condition-source]");
      var sourceValue = getSourceValue(sourceName);
      var hasFocusedNewContainer = false;
      conditionalFields.forEach(function (container) {
        var conditionSourceName = container.getAttribute("data-condition-source");
        if (conditionSourceName !== sourceName) return;
        var expectedValue = container.getAttribute("data-condition-value");
        var wasHidden = container.style.display === "none";
        var shouldShow = false;
        if (expectedValue === "") {
          if (Array.isArray(sourceValue)) {
            shouldShow = sourceValue.length > 0;
          } else {
            shouldShow = sourceValue !== null && sourceValue !== "";
          }
        } else {
          if (Array.isArray(expectedValue)) {
            shouldShow = expectedValue.includes(sourceValue);
          } else {
            shouldShow = sourceValue === expectedValue;
          }
        }
        toggleContainerVisibility(container, shouldShow);
        if (wasHidden && shouldShow && !hasFocusedNewContainer) {
          var firstInput = container.querySelector("input, select, textarea");
          if (firstInput) {
            firstInput.focus();
            hasFocusedNewContainer = true;
          }
        }
      });
    }
    var sourceNames = new Set(Array.from(conditionalFields).map(function (container) {
      return container.getAttribute("data-condition-source");
    }));
    form.addEventListener("change", function (e) {
      var conditionalFields = form.querySelectorAll("[data-condition-source]");
      var sourceNames = new Set(Array.from(conditionalFields).map(function (container) {
        return container.getAttribute("data-condition-source");
      }));
      var changedEl = e.target;
      var groupDiv = changedEl.closest("[data-checkbox-group]");
      if (groupDiv) {
        var groupName = groupDiv.getAttribute("data-checkbox-group");
        if (sourceNames.has(groupName)) {
          updateDependents(groupName);
        }
      } else if (changedEl.name && sourceNames.has(changedEl.name)) {
        updateDependents(changedEl.name);
      }
    });
    sourceNames.forEach(function (name) {
      updateDependents(name);
    });
  }
  allFormOnSite.forEach(function (form) {
    return handleConditionsInForm(form);
  });
})();
// /* eslint-disable  */
// $(function () {

//     const fileInputs = $(".formFieldFileInput-js")
//     const fileButton = $('.formFieldFileButton-js');

//     // obsługa klawiatury
//     fileButton.bind('keypress', function(e) {
//         if(e.which === 32 || e.which === 13){
//             e.preventDefault();
//             let currentParent = e.target.closest('.formFieldFile-js');
//             $(currentParent).find('.formFieldFileInput-js').click();
//         }
//     });

//     // Obsługa eventu załączenia plików
//     fileInputs.change(function(e) {
//         const currentParent = e.target.closest('.formFieldFile-js'); // główny tag wrapujący kliknięty field
//         const inputWithPlaceholder = $(currentParent).find('.fieldFilePlaceholder-js'); //widoczny element z informacją o wgranych plikach
//         const fileList = e.target.files; // pobranie listy dodanych plików
//         const fileNames = []; // tablica na nazwy załączonych plików

//         // zbudowanie tablicy z listą nazw dodanych plików
//         for (let i = 0; i < fileList.length; i++) {
//             const element = fileList[i];
//             fileNames.push(element.name)
//         }

//         inputWithPlaceholder.attr('placeholder', fileNames.join(',')); // podmiana placeholera na nazwy wgranych plików
//         inputWithPlaceholder.focus(); //focus na element
//     });

// });
"use strict";
"use strict";

/* eslint-disable  */
$(function () {
  var nameInput = document.querySelectorAll("input");
  var nameTextarea = document.querySelectorAll("textarea");
  var nameInputLenght = nameInput.length;
  var nameTextareaLenght = nameTextarea.length;
  for (var i = 0; i < nameInputLenght; i++) {
    var element = nameInput[i];
    element.addEventListener("focusout", function (event) {
      event.target.classList.add("check-field");
    });
  }
  for (var _i = 0; _i < nameTextareaLenght; _i++) {
    var _element = nameTextarea[_i];
    _element.addEventListener("focusout", function (event) {
      event.target.classList.add("check-field");
    });
  }
  var tooltipButtons = document.querySelectorAll(".tooltipButton-js");
  var tooltipButtonsLenght = tooltipButtons.length;
  var showHideTooltip = function showHideTooltip(event) {
    var element = document.getElementById(this.getAttribute("aria-describedby"));
    switch (event.type) {
      case "mouseenter":
      case "focusin":
        element.classList.add("show");
        element.setAttribute("aria-hidden", "false");
        break;
      case "mouseleave":
      case "focusout":
        element.setAttribute("aria-hidden", "true");
        element.classList.remove("show");
        break;
      default:
        element.classList.toggle("show");
        if (element.getAttribute("aria-hidden") === "true") {
          element.setAttribute("aria-hidden", "false");
        } else {
          element.setAttribute("aria-hidden", "true");
        }
        break;
    }
  };
  for (var _i2 = 0; _i2 < tooltipButtonsLenght; _i2++) {
    var _element2 = tooltipButtons[_i2];
    _element2.addEventListener("focusin", showHideTooltip, true);
    _element2.addEventListener("focusout", showHideTooltip, true);
    _element2.addEventListener("mouseenter", showHideTooltip);
    _element2.addEventListener("mouseleave", showHideTooltip);
  }
  var form = document.querySelector('form[method="POST"]');
  if (form) {
    var submitButton = form.querySelector('button[type="submit"]');
    var formInputs = form.querySelectorAll('input');
    var formTextareas = form.querySelectorAll('textarea');
    submitButton.addEventListener('click', function () {
      formInputs.forEach(function (input) {
        input.classList.add("check-field");
      });
      formTextareas.forEach(function (textarea) {
        textarea.classList.add("check-field");
      });
    });
  }
});
"use strict";

var sentMessage = $(".scroll-sent-js");
if (sentMessage.length) {
  $("html, body").animate({
    scrollTop: sentMessage.offset().top
  });
}
"use strict";

/*
  -
  - version: c.picture 1.0.2
  -
  -
*/

(function () {
  // Tu będzie wczytywanie lazy zdjęć, jakiś loader, fade in itp, na razie puszczam bez tego
  // coś na wzór https://levelup.gitconnected.com/enhancing-html-5-lazy-loading-with-css-and-minimal-javascript-afe274088f0b
})();
/**
 * Przejście ze skip linku do pola szukania dostępnego dopiero po wywołaniu go akcją click na przycisku szukajki
 *  */
// window.addEventListener("load", function () {
//   const searchShowBtn = document.querySelector(".input-field.search-field");

//   const skipLinkToSearch = document.querySelector(".skip-link-search-js");
//   if (skipLinkToSearch) {
//     skipLinkToSearch.addEventListener("click", function () {
//       searchShowBtn.focus();
//     });
//   }
// });
"use strict";