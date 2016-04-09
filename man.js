/* jshint undef: true,strict:true,trailing:true,loopfunc:true */
/* global document,window,HTMLElement,Element */

(function() {

  'use strict';

  // prevent duplicate declaration
  if (window.Man) { return; }

  var

  //
  VERSION = '0.0.1',

  /*
   * Generate a unique string suitable for id attributes
   *
   * @param basename (String)
   * @return string
   */
  guid = function(basename) {
    return basename + '-' + parseInt(Math.random() * 100, 10) + '-' + parseInt(Math.random() * 1000, 10);
  },

  /*
   * Merge two objects into one, values in b take precedence over values in a
   *
   * @param a {Object}
   * @param b {Object}

   * @return Object
   */
  merge = function(a, b) {
    var o = {};
    for (var i in a) {
      o[i] = a[i];
    }
    if (! b) { return o; }
    for (i in b) {
      o[i] = b[i];
    }
    return o;
  },

  /*
   * Convert an array-like thing (ex: NodeList or arguments object) into a proper array
   *
   * @param list (array-like thing)
   * @return Array
   */
  arr = function(list) {
    var ret = [], i = 0;

    if (! list.length) { return ret; }

    for (i = 0; i < list.length; i++) {
      ret.push(list[i]);
    }

    return ret;
  },

  /*
   * Create an element with a set of attributes/values
   *
   * @param type (String)
   * @param attrs {Object}
   *
   * @return HTMLElement
   */
  makeElement = function(type, attrs) {
     var
     n = document.createElement(type),
     i = null;

     for (i in attrs) {
       n.setAttribute(i, attrs[i]);
     }
     return n;
  },

  /*
   * Retrieve an object containing { top : xx, left : xx, bottom: xx, right: xx, width: xx, height: xx }
   *
   * @param node (DOMNode)
   */
  getRect = function(node) {

    var
    rect = node.getBoundingClientRect(),
    ret = { top : rect.top, left : rect.left, bottom: rect.bottom, right : rect.right }; // create a new object that is not read-only

    ret.top += window.pageYOffset;
    ret.left += window.pageXOffset;

    ret.bottom += window.pageYOffset;
    ret.right += window.pageYOffset;

    ret.width = rect.right - rect.left;
    ret.height = rect.bottom - rect.top;

    return ret;
  },

  /*
   *
   * @param node {HTMLElement}
   * @param styles {Object}
   */
  setStyles = function(node, styles) {
    for (var i in styles) {
      node.style[i] = styles[i];
    }
  },

  /*
   *
   * @param node {HTMLElement}
   * @param styles {Object}
   */
  selectorMatches = function (node, selector) {

    var
    p = Element.prototype,
    f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
      return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    };

    return f.call(node, selector);
  },

  /*
   *
   * @param node {HTMLElement}
   * @param styles {Object}
   */
  ancestor = function (node, selector, includeSelf) {

    if (arguments.length == 2) { includeSelf = true; }
  
    var n = includeSelf ? node : node.parentNode;

    while (n && ! selectorMatches(n, selector)) {
      if (n.parentNode) {
        n = n.parentNode;
      }
      else {
        break;
      }
    }

     if (selectorMatches(n, selector)) { return n; }

    return null;
  },

  highlightRows = function(tds, updateState) {

    var
    i = 0,
    current = arr(document.querySelectorAll('pre tr.highlighted')),
    pre = null;

    for (i = 0; i < current.length; i++) {
      current[i].classList.remove('highlighted');
    }

    if (! tds || ! tds.length) {
      if (updateState) {
        document.location.hash = '';
      }
      return;
    }

    for (i = 0; i < tds.length; i++) {
      if (! tds[i]) { continue; }
      ancestor(tds[i], 'tr', true).classList.add('highlighted');
    }

    pre = ancestor(tds[0], 'pre');
    if (updateState) {
      document.location = '#man-' + pre.getAttribute('id') + '-' + tds[0].getAttribute('data-line-number');
    } else {
      tds[0].scrollIntoView(true);
    }
  };

  /**
   *
   *
   * @param node (node, optional) - the root element containing all elements with attached popovers
   * @param options (Object, optional) method to retrieve the popover's data for a given node
   */
  window.Man = function(config, defaults) {

    var
    $ = this,
    nodes,
    i = 0,
    n,
    node,
    over,
    defaultConfig = {},
    defaultProperties = { };

    config = merge(defaultConfig, config);
    this.defaults = merge(defaultProperties, defaults);

    node = document.body;

    if (! config.pre) { return; }

    nodes = arr(node.querySelectorAll('pre'));

    for (i = 0; i < nodes.length; i++) {

      var
      j = 0,
      idBase = '',
      pre = nodes[i],
      lines = pre.innerHTML.split("\n"),
      buf = '<table><tbody>';

      if (! pre.getAttribute('id')) {
        pre.setAttribute('id', 'pre-man-' + i);
      }

      if (lines.length <= 1 || pre.hasAttribute('data-no-lines')) { continue; }

      pre.classList.add('lines');

      for (j = 0; j < lines.length; j++) {
        idBase = 'man-' + pre.getAttribute('id') + '-' + (j + 1);
        buf += '<tr><td id="' + (idBase) + '-line" class="col" data-line-number="' + (j + 1) + '"></td><td id="' + (idBase) + '-code" data-line-number="' + (j + 1) + '">' + lines[j] + '</td></tr>';
      }

      buf += '</tbody></table>';
      pre.innerHTML = buf;
    }

    document.body.addEventListener('click',function(e) {

      if (e.target.matches('td.col')) {
        highlightRows([e.target], true);
      }
      else if (e.target.matches('a.hash')) {
        highlightRows(null, true);
      }

    });

    if (this.debug) { window.console.log(this.toString()); }

    var
    re = /#man-([^\d]*)-(\d*)-?(\d*)?/,
    matches = document.location.hash.match(re),
    id,
    td,
    i = 0,
    rows = [];

    if (! matches) { return; }

    if (! matches[3]) {
      rows = [document.getElementById('man-' + matches[1] + '-' + matches[2] + '-line')];
    } else {
      for (i = parseInt(matches[2]); i <= parseInt(matches[3]); i++) {

        id = 'man-' + matches[1] + '-' + i + '-line';
        td = document.getElementById(id);
        if (td) {
          rows.push(document.getElementById(id));
        }
      }
    } 

    highlightRows(rows, false);
  };

  /**
   * Return a string representation of the instance
   *
   * @return {String}
   */
  window.Man.prototype.toString = function() {
    return 'Man'; // + JSON.stringify({root : '' + this.root, enabled : this.enabled, delay : this.delay, debug : this.debug});
  };

}());


