(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-front-front-module"],{

/***/ "./node_modules/gsap/CSSPlugin.js":
/*!****************************************!*\
  !*** ./node_modules/gsap/CSSPlugin.js ***!
  \****************************************/
/*! exports provided: CSSPlugin, default, _getBBox, _createElement, checkPrefix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSSPlugin", function() { return CSSPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CSSPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getBBox", function() { return _getBBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_createElement", function() { return _createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkPrefix", function() { return _checkPropPrefix; });
/* harmony import */ var _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gsap-core.js */ "./node_modules/gsap/gsap-core.js");
/*!
 * CSSPlugin 3.0.1
 * https://greensock.com
 *
 * Copyright 2008-2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */


var _win,
    _doc,
    _docElement,
    _pluginInitted,
    _tempDiv,
    _tempDivStyler,
    _recentSetterPlugin,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _transformProps = {},
    _RAD2DEG = 180 / Math.PI,
    _DEG2RAD = Math.PI / 180,
    _atan2 = Math.atan2,
    _bigNum = 1e8,
    _capsExp = /([A-Z])/g,
    _numWithUnitExp = /[-+=\.]*\d+[\.e-]*\d*[a-z%]*/g,
    _horizontalExp = /(?:left|right|width|margin|padding|x)/i,
    _complexExp = /[\s,\(]\S/,
    _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
},
    _renderCSSProp = function _renderCSSProp(ratio, data) {
  return data.set(data.t, data.p, ~~((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : ~~((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
  return data.set(data.t, data.p, ratio ? ~~((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
},
    //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
},
    _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
},
    _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
},
    _setterCSSStyle = function _setterCSSStyle(target, property, value) {
  return target.style[property] = value;
},
    _setterCSSProp = function _setterCSSProp(target, property, value) {
  return target.style.setProperty(property, value);
},
    _setterTransform = function _setterTransform(target, property, value) {
  return target._gsap[property] = value;
},
    _setterScale = function _setterScale(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
},
    _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
},
    _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
},
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _supports3D,
    _createElement = function _createElement(type, ns) {
  var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

  return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
},
    _getComputedProperty = function _getComputedProperty(target, property) {
  var cs = getComputedStyle(target);
  return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property); //css variables may not need caps swapped out for dashes and lowercase.
},
    _checkPropPrefix = function _checkPropPrefix(property, element) {
  var e = element || _tempDiv,
      s = e.style,
      i = 5,
      a = "O,Moz,ms,Ms,Webkit".split(",");

  if (property in s) {
    return property;
  }

  property = property.charAt(0).toUpperCase() + property.substr(1);

  while (i-- && !(a[i] + property in s)) {}

  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? a[i] : "") + property;
},
    _initCore = function _initCore() {
  if (_windowExists()) {
    _win = window;
    _doc = _win.document;
    _docElement = _doc.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _tempDivStyler = _createElement("div");
    _transformProp = _checkPropPrefix(_transformProp);
    _transformOriginProp = _checkPropPrefix(_transformOriginProp);
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

    _supports3D = !!_checkPropPrefix("perspective");
    _pluginInitted = 1;
  }
},
    _getBBoxHack = function _getBBoxHack(swapIfPossible) {
  //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
  var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
      oldParent = this.parentNode,
      oldSibling = this.nextSibling,
      oldCSS = this.style.cssText,
      bbox;

  _docElement.appendChild(svg);

  svg.appendChild(this);
  this.style.display = "block";

  if (swapIfPossible) {
    try {
      bbox = this.getBBox();
      this._gsapBBox = this.getBBox; //store the original

      this.getBBox = _getBBoxHack;
    } catch (e) {}
  } else if (this._gsapBBox) {
    bbox = this._gsapBBox();
  }

  if (oldSibling) {
    oldParent.insertBefore(this, oldSibling);
  } else {
    oldParent.appendChild(this);
  }

  _docElement.removeChild(svg);

  this.style.cssText = oldCSS;
  return bbox;
},
    _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
  var i = attributesArray.length;

  while (i--) {
    if (target.hasAttribute(attributesArray[i])) {
      return target.getAttribute(attributesArray[i]);
    }
  }
},
    _getBBox = function _getBBox(target) {
  var bounds;

  try {
    bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
  } catch (error) {
    bounds = _getBBoxHack.call(target, true);
  } //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.


  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]),
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]),
    width: 0,
    height: 0
  } : bounds;
},
    _isSVG = function _isSVG(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
},
    //reports if the element is an SVG on which getBBox() actually works
_removeProperty = function _removeProperty(target, property) {
  if (property) {
    var style = target.style;

    if (property in _transformProps) {
      property = _transformProp;
    }

    if (style.removeProperty) {
      if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
        //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
        property = "-" + property;
      }

      style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
    } else {
      //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
      style.removeAttribute(property);
    }
  }
},
    _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["PropTween"](plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt;
  pt.b = beginning;
  pt.e = end;

  plugin._props.push(property);

  return pt;
},
    _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
},
    //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
_convertToUnit = function _convertToUnit(target, property, value, unit) {
  var curValue = parseFloat(value),
      curUnit = (value + "").substr((curValue + "").length) || "px",
      style = _tempDiv.style,
      horizontal = _horizontalExp.test(property),
      isRootSVG = target.tagName.toLowerCase() === "svg",
      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
      amount = 100,
      toPixels = unit === "px",
      px,
      parent,
      cache,
      isSVG;

  if (unit === curUnit || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }

  isSVG = target.getCTM && _isSVG(target);

  if (unit === "%" && _transformProps[property]) {
    //transforms are relative to the size of the element itself!
    return Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(curValue / (isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty]) * amount);
  }

  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }

  if (!parent || parent === _doc || !parent.appendChild) {
    parent = _doc.body;
  }

  cache = parent._gsap;

  if (cache && unit === "%" && cache.width && horizontal && cache.time === _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_ticker"].time) {
    px = cache.width * curValue / amount;
  } else {
    parent.appendChild(_tempDiv);
    px = _tempDiv[measureProperty];
    parent.removeChild(_tempDiv);

    if (horizontal && unit === "%") {
      cache = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_getCache"])(parent);
      cache.time = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_ticker"].time;
      cache.width = px / curValue * amount;
    }
  }

  return Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(toPixels ? px * curValue / amount : amount / px * curValue);
},
    _get = function _get(target, property, unit, uncache) {
  var value;

  if (!_pluginInitted) {
    _initCore();
  }

  if (property in _propertyAliases) {
    property = _propertyAliases[property];

    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }

  if (_transformProps[property]) {
    value = _parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + value.zOrigin + "px";
  } else {
    value = target.style[property];

    if (!value || value === "auto" || uncache) {
      value = _getComputedProperty(target, property) || Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_getProperty"])(target, property);
    }
  }

  return unit ? _convertToUnit(target, property, value, unit) + unit : value;
},
    _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
  //note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  var pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["PropTween"](this._pt, target.style, prop, 0, 1, _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_renderComplexString"]),
      index = 0,
      matchIndex = 0,
      a,
      result,
      startValues,
      startNum,
      color,
      startValue,
      endValue,
      endNum,
      chunk,
      endUnit,
      startUnit,
      relative,
      endValues;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (end === "auto") {
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    target.style[prop] = start;
  }

  a = [start, end];

  Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_colorStringFilter"])(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.


  start = a[0];
  end = a[1];
  startValues = start.match(_numWithUnitExp) || [];
  endValues = end.match(_numWithUnitExp) || [];

  if (endValues.length) {
    while (result = _numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index, result.index);

      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(") {
        color = 1;
      }

      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        relative = endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;

        if (relative) {
          endValue = endValue.substr(2);
        }

        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index = _numWithUnitExp.lastIndex - endUnit.length;

        if (!endUnit) {
          //if something like "perspective:300" is passed in and we must add a unit to the end
          endUnit = endUnit || _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_config"].units[prop] || startUnit;

          if (index === end.length) {
            end += endUnit;
            pt.e += endUnit;
          }
        }

        if (startUnit !== endUnit) {
          startNum = _convertToUnit(target, prop, startValue, endUnit);
        } //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: relative ? relative * endNum : endNum - startNum,
          m: color && color < 4 ? Math.round : 0
        };
      }
    }

    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
  } else {
    pt.r = prop === "display" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }

  if (_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_relExp"].test(end)) {
    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
  }

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
},
    _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
  var split = value.split(" "),
      x = split[0],
      y = split[1] || "50%";

  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
    //the user provided them in the wrong order, so flip them
    split = x;
    x = y;
    y = split;
  }

  split[0] = _keywordToPercent[x] || x;
  split[1] = _keywordToPercent[y] || y;
  return split.join(" ");
},
    _renderClearProps = function _renderClearProps(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t,
        style = target.style,
        props = data.u,
        prop,
        clearTransforms,
        i;

    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i = props.length;

      while (--i > -1) {
        prop = props[i];

        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
        }

        _removeProperty(target, prop);
      }
    }

    if (clearTransforms) {
      _removeProperty(target, _transformProp);

      clearTransforms = target._gsap;

      if (clearTransforms) {
        if (clearTransforms.svg) {
          target.removeAttribute("transform");
        }

        delete clearTransforms.x;
      }
    }
  }
},
    // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
_specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    var pt = plugin._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["PropTween"](plugin._pt, target, property, 0, 0, _renderClearProps);
    pt.u = endValue;
    pt.pr = -10;
    pt.tween = tween;

    plugin._props.push(property);

    return 1;
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */

},

/*
 * --------------------------------------------------------------------------------------
 * TRANSFORMS
 * --------------------------------------------------------------------------------------
 */
_identity2DMatrix = [1, 0, 0, 1, 0, 0],
    _rotationalProperties = {},
    _isNullTransform = function _isNullTransform(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
},
    _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
  var matrixString = _getComputedProperty(target, _transformProp);

  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_numExp"]).map(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"]);
},
    _getMatrix = function _getMatrix(target, force2D) {
  var cache = target._gsap,
      style = target.style,
      matrix = _getComputedTransformMatrixAsArray(target),
      parent,
      nextSibling,
      temp,
      addedToDOM;

  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;

    if (!parent || !target.offsetParent) {
      addedToDOM = 1; //flag

      nextSibling = target.nextSibling;

      _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

    }

    matrix = _getComputedTransformMatrixAsArray(target);

    if (temp) {
      style.display = temp;
    } else {
      _removeProperty(target, "display");
    }

    if (addedToDOM) {
      if (nextSibling) {
        parent.insertBefore(target, nextSibling);
      } else if (parent) {
        parent.appendChild(target);
      } else {
        _docElement.removeChild(target);
      }
    }
  }

  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
},
    _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap,
      matrix = matrixArray || _getMatrix(target, true),
      xOriginOld = cache.xOrigin || 0,
      yOriginOld = cache.yOrigin || 0,
      xOffsetOld = cache.xOffset || 0,
      yOffsetOld = cache.yOffset || 0,
      a = matrix[0],
      b = matrix[1],
      c = matrix[2],
      d = matrix[3],
      tx = matrix[4],
      ty = matrix[5],
      originSplit = origin.split(" "),
      xOrigin = parseFloat(originSplit[0]) || 0,
      yOrigin = parseFloat(originSplit[1]) || 0,
      bounds,
      determinant,
      x,
      y;

  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
    //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
    xOrigin = x;
    yOrigin = y;
  }

  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset += tx * a + ty * c - tx;
    cache.yOffset += tx * b + ty * d - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }

  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;

  if (pluginToAddPropTweensTo) {
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }
},
    _parseTransform = function _parseTransform(target, uncache) {
  var cache = target._gsap || new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["GSCache"](target);

  if ("x" in cache && !uncache) {
    return cache;
  }

  var style = target.style,
      invertedScaleX = cache.scaleX < 0,
      xOrigin = cache.xOrigin || 0,
      yOrigin = cache.yOrigin || 0,
      px = "px",
      deg = "deg",
      origin = _getComputedProperty(target, _transformOriginProp) || "0",
      x,
      y,
      z,
      scaleX,
      scaleY,
      rotation,
      rotationX,
      rotationY,
      skewX,
      skewY,
      perspective,
      matrix,
      angle,
      cos,
      sin,
      a,
      b,
      c,
      d,
      a12,
      a22,
      t1,
      t2,
      t3,
      a13,
      a23,
      a33,
      a42,
      a43,
      a32;
  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));
  matrix = _getMatrix(target, cache.svg);

  if (cache.svg) {
    _applySVGOrigin(target, origin, cache.originIsAbsolute, cache.smooth !== false, matrix);
  }

  if (matrix !== _identity2DMatrix) {
    a = matrix[0]; //a11

    b = matrix[1]; //a21

    c = matrix[2]; //a31

    d = matrix[3]; //a41

    x = a12 = matrix[4];
    y = a22 = matrix[5]; //2D matrix

    if (matrix.length === 6) {
      scaleX = Math.sqrt(a * a + b * b);
      scaleY = Math.sqrt(d * d + c * c);
      rotation = a || b ? _atan2(b, a) * _RAD2DEG : cache.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : cache.skewX || 0;

      if (cache.svg) {
        x -= xOrigin - (xOrigin * a + yOrigin * c);
        y -= yOrigin - (xOrigin * b + yOrigin * d);
      } //3D matrix

    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x = matrix[12];
      y = matrix[13];
      z = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG; //rotationX

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t2 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t2;
        a32 = t3;
      } //rotationY


      angle = _atan2(-c, a33);
      rotationY = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a * cos - a13 * sin;
        t2 = b * cos - a23 * sin;
        t3 = c * cos - a33 * sin;
        a43 = d * sin + a43 * cos;
        a = t1;
        b = t2;
        c = t3;
      } //rotationZ


      angle = _atan2(b, a);
      rotation = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a * cos + b * sin;
        t2 = a12 * cos + a22 * sin;
        b = b * cos - a * sin;
        a22 = a22 * cos - a12 * sin;
        a = t1;
        a12 = t2;
      }

      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }

      scaleX = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(Math.sqrt(a * a + b * b + c * c));
      scaleY = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }

    if (cache.svg) {
      //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
      matrix = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
      matrix && target.setAttribute("transform", matrix);
    }
  }

  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }

  cache.x = ((cache.xPercent = x && Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0) ? 0 : x) + px;
  cache.y = ((cache.yPercent = y && Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0) ? 0 : y) + px;
  cache.z = z + px;
  cache.scaleX = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(scaleX);
  cache.scaleY = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(scaleY);
  cache.rotation = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(rotation) + deg;
  cache.rotationX = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(rotationX) + deg;
  cache.rotationY = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;

  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }

  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_config"].force3D;
  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  return cache;
},
    _firstTwoOnly = function _firstTwoOnly(value) {
  return (value = value.split(" "))[0] + " " + value[1];
},
    //for handling transformOrigin values, stripping out the 3rd dimension
_addPxTranslate = function _addPxTranslate(target, start, value) {
  var unit = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["getUnit"])(start);
  return Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
},
    _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;

  _renderCSSTransforms(ratio, cache);
},
    _zeroDeg = "0deg",
    _zeroPx = "0px",
    _endParenthesis = ") ",
    _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
  var _ref = cache || this,
      xPercent = _ref.xPercent,
      yPercent = _ref.yPercent,
      x = _ref.x,
      y = _ref.y,
      z = _ref.z,
      rotation = _ref.rotation,
      rotationY = _ref.rotationY,
      rotationX = _ref.rotationX,
      skewX = _ref.skewX,
      skewY = _ref.skewY,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      transformPerspective = _ref.transformPerspective,
      force3D = _ref.force3D,
      target = _ref.target,
      zOrigin = _ref.zOrigin,
      transforms = "",
      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD,
        a13 = Math.sin(angle),
        a33 = Math.cos(angle),
        cos;

    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
  }

  if (xPercent || yPercent) {
    transforms = "translate(" + xPercent + "%, " + yPercent + "%) ";
  }

  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
  }

  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }

  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }

  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }

  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }

  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }

  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }

  target.style[_transformProp] = transforms || "translate(0, 0)";
},
    _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
  var _ref2 = cache || this,
      xPercent = _ref2.xPercent,
      yPercent = _ref2.yPercent,
      x = _ref2.x,
      y = _ref2.y,
      rotation = _ref2.rotation,
      skewX = _ref2.skewX,
      skewY = _ref2.skewY,
      scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      target = _ref2.target,
      xOrigin = _ref2.xOrigin,
      yOrigin = _ref2.yOrigin,
      xOffset = _ref2.xOffset,
      yOffset = _ref2.yOffset,
      forceCSS = _ref2.forceCSS,
      tx = parseFloat(x),
      ty = parseFloat(y),
      a11,
      a21,
      a12,
      a22,
      temp;

  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);

  if (skewY) {
    //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }

  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;

    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;

      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }

    a11 = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(a11);
    a21 = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(a21);
    a12 = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(a12);
    a22 = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }

  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
    tx = _convertToUnit(target, "x", x, "px");
    ty = _convertToUnit(target, "y", y, "px");
  }

  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }

  if (xPercent || yPercent) {
    //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
    temp = target.getBBox();
    tx = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(tx + xPercent / 100 * temp.width);
    ty = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_round"])(ty + yPercent / 100 * temp.height);
  }

  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);

  if (forceCSS) {
    //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the  transform attribute changes!)
    target.style[_transformProp] = temp;
  }
},
    _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue, relative) {
  var cap = 360,
      isString = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_isString"])(endValue),
      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
      change = relative ? endNum * relative : endNum - startNum,
      finalValue = startNum + change + "deg",
      direction,
      pt;

  if (isString) {
    direction = endValue.split("_")[1];

    if (direction === "short") {
      change %= cap;

      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }

    if (direction === "cw" && change < 0) {
      change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
    }
  }

  plugin._pt = pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["PropTween"](plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  pt.u = "deg";

  plugin._props.push(property);

  return pt;
},
    _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
  //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
  var style = _tempDivStyler.style,
      startCache = target._gsap,
      endCache,
      p,
      startValue,
      endValue,
      startNum,
      endNum,
      startUnit,
      endUnit;
  style.cssText = getComputedStyle(target).cssText + ";position:absolute;display:block;"; //%-based translations will fail unless we set the width/height to match the original target (and padding/borders can affect it)

  style[_transformProp] = transforms;

  _doc.body.appendChild(_tempDivStyler);

  endCache = _parseTransform(_tempDivStyler, 1);

  for (p in _transformProps) {
    startValue = startCache[p];
    endValue = endCache[p];

    if (startValue !== endValue && p !== "perspective") {
      //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
      startUnit = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["getUnit"])(startValue);
      endUnit = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["getUnit"])(endValue);
      startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["PropTween"](plugin._pt, startCache, p, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit;

      plugin._props.push(p);
    }
  }

  _doc.body.removeChild(_tempDivStyler);
};

var CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init(target, vars, tween, index, targets) {
    var props = this._props,
        style = target.style,
        startValue,
        endValue,
        endNum,
        startNum,
        type,
        specialProp,
        p,
        startUnit,
        endUnit,
        relative,
        isTransformRelated,
        transformPropTween,
        cache,
        smooth,
        hasPriority;

    if (!_pluginInitted) {
      _initCore();
    }

    for (p in vars) {
      if (p === "autoRound") {
        continue;
      }

      endValue = vars[p];

      if (_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_plugins"][p] && Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_checkPlugin"])(p, vars, tween, index, target, targets)) {
        //plugins
        continue;
      }

      type = typeof endValue;
      specialProp = _specialProps[p];

      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }

      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_replaceRandom"])(endValue);
      }

      if (specialProp) {
        if (specialProp(this, target, p, endValue, tween)) {
          hasPriority = 1;
        }
      } else if (p.substr(0, 2) === "--") {
        //CSS variable
        this.add(style, "setProperty", getComputedStyle(target).getPropertyValue(p) + "", endValue + "", index, targets, 0, 0, p);
      } else {
        startValue = _get(target, p);
        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;

        if (relative) {
          endValue = endValue.substr(2);
        }

        endNum = parseFloat(endValue);

        if (p in _propertyAliases) {
          if (p === "autoAlpha") {
            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
              startNum = 0;
            }

            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }

          if (p !== "scale") {
            p = _propertyAliases[p];

            if (~p.indexOf(",")) {
              p = p.split(",")[0];
            }
          }
        }

        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

        if (isTransformRelated) {
          if (!transformPropTween) {
            cache = target._gsap;
            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["PropTween"](this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
          }

          if (p === "scale") {
            this._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["PropTween"](this._pt, target, "scale", startNum, relative ? relative * endNum : endNum - startNum, 0, 0, _setterScale);
            props.push("scale");
            continue;
          } else if (p === "transformOrigin") {
            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]); //handle the zOrigin separately!

              if (endUnit !== cache.zOrigin) {
                _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
              }

              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }

            continue;
          } else if (p === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);

            continue;
          } else if (p in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p, startNum, endValue, relative);

            continue;
          } else if (p === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

            continue;
          } else if (p === "force3D") {
            cache[p] = endValue;
            continue;
          } else if (p === "transform") {
            _addRawTransformPTs(this, endValue, target);

            continue;
          }
        }

        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endUnit = (endValue + "").substr((endNum + "").length) || (p in _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_config"].units ? _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_config"].units[p] : startUnit);

          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, p, startValue, endUnit);
          }

          this._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["PropTween"](this._pt, isTransformRelated ? cache : style, p, startNum, relative ? relative * endNum : endNum - startNum, endUnit === "px" && vars.autoRound !== false && !isTransformRelated ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;

          if (startUnit !== endUnit) {
            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p in style)) {
          if (p in target) {
            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
            this.add(target, p, target[p], endValue, index, targets);
          } else {
            Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_missingPlugin"])("Invalid " + p + " tween " + endValue + ". Missing plugin? gsap.registerPlugin()");

            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p, startValue, endValue);
        }

        props.push(p);
      }
    }

    if (hasPriority) {
      Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_sortPropTweensByPriority"])(this);
    }
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_isUndefined"])(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_getSetter"])(target, property);
  }
};
_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["gsap"].utils.checkPrefix = _checkPropPrefix;

(function (positionAndScale, rotation, others, aliases) {
  var all = Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_forEachName"])(positionAndScale + "," + rotation + "," + others, function (name) {
    _transformProps[name] = 1;
  });

  Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_forEachName"])(rotation, function (name) {
    _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_config"].units[name] = "deg";
    _rotationalProperties[name] = 1;
  });

  _propertyAliases[all[13]] = positionAndScale + "," + rotation;

  Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_forEachName"])(aliases, function (name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,9:rotateX,10:rotateY");

Object(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_forEachName"])("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
  _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["_config"].units[name] = "px";
});

_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["gsap"].registerPlugin(CSSPlugin);


/***/ }),

/***/ "./node_modules/gsap/CSSRulePlugin.js":
/*!********************************************!*\
  !*** ./node_modules/gsap/CSSRulePlugin.js ***!
  \********************************************/
/*! exports provided: CSSRulePlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSSRulePlugin", function() { return CSSRulePlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CSSRulePlugin; });
/*!
 * CSSRulePlugin 3.0.0
 * https://greensock.com
 *
 * @license Copyright 2008-2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var gsap,
    _coreInitted,
    _win,
    _doc,
    CSSPlugin,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _getGSAP = function _getGSAP() {
  return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _checkRegister = function _checkRegister() {
  if (!_coreInitted) {
    _initCore();

    if (!CSSPlugin) {
      console.warn("Please gsap.registerPlugin(CSSPlugin, CSSRulePlugin)");
    }
  }

  return _coreInitted;
},
    _initCore = function _initCore(core) {
  gsap = core || _getGSAP();

  if (_windowExists()) {
    _win = window;
    _doc = document;
  }

  if (gsap) {
    CSSPlugin = gsap.plugins.css;

    if (CSSPlugin) {
      _coreInitted = 1;
    }
  }
};

var CSSRulePlugin = {
  version: "3.0.0",
  name: "cssRule",
  init: function init(target, value, tween, index, targets) {
    if (!_checkRegister() || typeof target.cssText === "undefined") {
      return false;
    }

    var div = target._gsProxy = target._gsProxy || _doc.createElement("div");

    this.ss = target;
    this.style = div.style;
    div.style.cssText = target.cssText;
    CSSPlugin.prototype.init.call(this, div, value, tween, index, targets); //we just offload all the work to the regular CSSPlugin and then copy the cssText back over to the rule in the render() method. This allows us to have all of the updates to CSSPlugin automatically flow through to CSSRulePlugin instead of having to maintain both
  },
  render: function render(ratio, data) {
    var pt = data._pt,
        style = data.style,
        ss = data.ss,
        i = style.length;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    while (--i > -1) {
      ss[style[i]] = style[style[i]];
    }
  },
  getRule: function getRule(selector) {
    _checkRegister();

    var ruleProp = _doc.all ? "rules" : "cssRules",
        styleSheets = _doc.styleSheets,
        i = styleSheets.length,
        pseudo = selector.charAt(0) === ":",
        j,
        curSS,
        cs,
        a;
    selector = (pseudo ? "" : ",") + selector.split("::").join(":").toLowerCase() + ","; //note: old versions of IE report tag name selectors as upper case, so we just change everything to lowercase.

    if (pseudo) {
      a = [];
    }

    while (i--) {
      //Firefox may throw insecure operation errors when css is loaded from other domains, so try/catch.
      try {
        curSS = styleSheets[i][ruleProp];

        if (!curSS) {
          continue;
        }

        j = curSS.length;
      } catch (e) {
        console.warn(e);
        continue;
      }

      while (--j > -1) {
        cs = curSS[j];

        if (cs.selectorText && ("," + cs.selectorText.split("::").join(":").toLowerCase() + ",").indexOf(selector) !== -1) {
          //note: IE adds an extra ":" to pseudo selectors, so .myClass:after becomes .myClass::after, so we need to strip the extra one out.
          if (pseudo) {
            a.push(cs.style);
          } else {
            return cs.style;
          }
        }
      }
    }

    return a;
  },
  register: _initCore
};
_getGSAP() && gsap.registerPlugin(CSSRulePlugin);


/***/ }),

/***/ "./node_modules/gsap/Draggable.js":
/*!****************************************!*\
  !*** ./node_modules/gsap/Draggable.js ***!
  \****************************************/
/*! exports provided: Draggable, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Draggable", function() { return Draggable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Draggable; });
/* harmony import */ var _utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/matrix.js */ "./node_modules/gsap/utils/matrix.js");
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*!
 * Draggable 3.0.0
 * https://greensock.com
 *
 * @license Copyright 2008-2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

/* eslint-disable */


var gsap,
    _win,
    _doc,
    _docElement,
    _body,
    _tempDiv,
    _placeholderDiv,
    _coreInitted,
    _checkPrefix,
    _toArray,
    _supportsPassive,
    _isTouchDevice,
    _touchEventLookup,
    _dragCount,
    _isMultiTouching,
    _isAndroid,
    InertiaPlugin,
    _defaultCursor,
    _supportsPointer,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _getGSAP = function _getGSAP() {
  return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _isObject = function _isObject(value) {
  return typeof value === "object";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _emptyFunc = function _emptyFunc() {
  return 0;
},
    _transformProp = "transform",
    _transformOriginProp = "transformOrigin",
    _round = function _round(value) {
  return Math.round(value * 10000) / 10000;
},
    _isArray = Array.isArray,
    _createElement = function _createElement(type, ns) {
  var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

  return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
},
    _RAD2DEG = 180 / Math.PI,
    _bigNum = 1e20,
    _identityMatrix = new _utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__["Matrix2D"](),
    _getTime = Date.now || function () {
  return new Date().getTime();
},
    _renderQueue = [],
    _lookup = {},
    //when a Draggable is created, the target gets a unique _gsDragID property that allows gets associated with the Draggable instance for quick lookups in Draggable.get(). This avoids circular references that could cause gc problems.
_lookupCount = 0,
    _clickableTagExp = /^(?:a|input|textarea|button|select)$/i,
    _lastDragTime = 0,
    _temp1 = {},
    // a simple object we reuse and populate (usually x/y properties) to conserve memory and improve performance.
_windowProxy = {},
    //memory/performance optimization - we reuse this object during autoScroll to store window-related bounds/offsets.
_copy = function _copy(obj, factor) {
  var copy = {},
      p;

  for (p in obj) {
    copy[p] = factor ? obj[p] * factor : obj[p];
  }

  return copy;
},
    _renderQueueTick = function _renderQueueTick() {
  return _renderQueue.forEach(function (func) {
    return func();
  });
},
    _addToRenderQueue = function _addToRenderQueue(func) {
  _renderQueue.push(func);

  if (_renderQueue.length === 1) {
    gsap.ticker.add(_renderQueueTick);
  }
},
    _renderQueueTimeout = function _renderQueueTimeout() {
  return !_renderQueue.length && gsap.ticker.remove(_renderQueueTick);
},
    _removeFromRenderQueue = function _removeFromRenderQueue(func) {
  var i = _renderQueue.length;

  while (i--) {
    if (_renderQueue[i] === func) {
      _renderQueue.splice(i, 1);
    }
  }

  gsap.to(_renderQueueTimeout, {
    overwrite: true,
    delay: 15,
    duration: 0,
    onComplete: _renderQueueTimeout,
    data: "_draggable"
  }); //remove the "tick" listener only after the render queue is empty for 15 seconds (to improve performance). Adding/removing it constantly for every click/touch wouldn't deliver optimal speed, and we also don't want the ticker to keep calling the render method when things are idle for long periods of time (we want to improve battery life on mobile devices).
},
    _setDefaults = function _setDefaults(obj, defaults) {
  for (var p in defaults) {
    if (!(p in obj)) {
      obj[p] = defaults[p];
    }
  }

  return obj;
},
    _addListener = function _addListener(element, type, func, capture) {
  if (element.addEventListener) {
    var touchType = _touchEventLookup[type];
    capture = capture || (_supportsPassive ? {
      passive: false
    } : null);
    element.addEventListener(touchType || type, func, capture);

    if (touchType && type !== touchType && touchType.substr(0, 7) !== "pointer") {
      //some browsers actually support both, so must we. But pointer events cover all.
      element.addEventListener(type, func, capture);
    }
  }
},
    _removeListener = function _removeListener(element, type, func) {
  if (element.removeEventListener) {
    var touchType = _touchEventLookup[type];
    element.removeEventListener(touchType || type, func);

    if (touchType && type !== touchType && touchType.substr(0, 7) !== "pointer") {
      element.removeEventListener(type, func);
    }
  }
},
    _preventDefault = function _preventDefault(event) {
  if (event.preventDefault) {
    event.preventDefault();

    if (event.preventManipulation) {
      event.preventManipulation(); //for some Microsoft browsers
    }
  }
},
    _hasTouchID = function _hasTouchID(list, ID) {
  var i = list.length;

  while (i--) {
    if (list[i].identifier === ID) {
      return true;
    }
  }
},
    _onMultiTouchDocumentEnd = function _onMultiTouchDocumentEnd(event) {
  _isMultiTouching = event.touches && _dragCount < event.touches.length;

  _removeListener(event.target, "touchend", _onMultiTouchDocumentEnd);
},
    _onMultiTouchDocument = function _onMultiTouchDocument(event) {
  _isMultiTouching = event.touches && _dragCount < event.touches.length;

  _addListener(event.target, "touchend", _onMultiTouchDocumentEnd);
},
    _getDocScrollTop = function _getDocScrollTop() {
  return _win.pageYOffset || _doc.scrollTop || _docElement.scrollTop || _body.scrollTop || 0;
},
    _getDocScrollLeft = function _getDocScrollLeft() {
  return _win.pageXOffset || _doc.scrollLeft || _docElement.scrollLeft || _body.scrollLeft || 0;
},
    _addScrollListener = function _addScrollListener(e, callback) {
  _addListener(e, "scroll", callback);

  if (!_isRoot(e.parentNode)) {
    _addScrollListener(e.parentNode, callback);
  }
},
    _removeScrollListener = function _removeScrollListener(e, callback) {
  _removeListener(e, "scroll", callback);

  if (!_isRoot(e.parentNode)) {
    _removeScrollListener(e.parentNode, callback);
  }
},
    _isRoot = function _isRoot(e) {
  return !!(!e || e === _docElement || e === _doc || e === _doc.body || e === _win || !e.nodeType || !e.parentNode);
},
    _getMaxScroll = function _getMaxScroll(element, axis) {
  var dim = axis === "x" ? "Width" : "Height",
      scroll = "scroll" + dim,
      client = "client" + dim;
  return Math.max(0, _isRoot(element) ? Math.max(_docElement[scroll], _body[scroll]) - (_win["inner" + dim] || _docElement[client] || _body[client]) : element[scroll] - element[client]);
},
    _recordMaxScrolls = function _recordMaxScrolls(e) {
  //records _gsMaxScrollX and _gsMaxScrollY properties for the element and all ancestors up the chain so that we can cap it, otherwise dragging beyond the edges with autoScroll on can endlessly scroll.
  var x = _getMaxScroll(e, "x"),
      y = _getMaxScroll(e, "y");

  if (_isRoot(e)) {
    e = _windowProxy;
  } else {
    _recordMaxScrolls(e.parentNode);
  }

  e._gsMaxScrollX = x;
  e._gsMaxScrollY = y;
  e._gsScrollX = e.scrollLeft || 0;
  e._gsScrollY = e.scrollTop || 0;
},
    _setStyle = function _setStyle(element, property, value) {
  var style = element.style;

  if (!style) {
    return;
  }

  if (_isUndefined(style[property])) {
    property = _checkPrefix(property, element) || property;
  }

  if (value == null) {
    style.removeProperty && style.removeProperty(property.replace(/([A-Z])/g, "-$1").toLowerCase());
  } else {
    style[property] = value;
  }
},
    _getComputedStyle = function _getComputedStyle(element) {
  return _win.getComputedStyle(element instanceof Element ? element : element.host || (element.parentNode || {}).host || element);
},
    //the "host" stuff helps to accommodate ShadowDom objects.
_tempRect = {},
    //reuse to reduce garbage collection tasks
_parseRect = function _parseRect(e) {
  //accepts a DOM element, a mouse event, or a rectangle object and returns the corresponding rectangle with left, right, width, height, top, and bottom properties
  if (e === _win) {
    _tempRect.left = _tempRect.top = 0;
    _tempRect.width = _tempRect.right = _docElement.clientWidth || e.innerWidth || _body.clientWidth || 0;
    _tempRect.height = _tempRect.bottom = (e.innerHeight || 0) - 20 < _docElement.clientHeight ? _docElement.clientHeight : e.innerHeight || _body.clientHeight || 0;
    return _tempRect;
  }

  var r = !_isUndefined(e.pageX) ? {
    left: e.pageX - _getDocScrollLeft(),
    top: e.pageY - _getDocScrollTop(),
    right: e.pageX - _getDocScrollLeft() + 1,
    bottom: e.pageY - _getDocScrollTop() + 1
  } : !e.nodeType && !_isUndefined(e.left) && !_isUndefined(e.top) ? e : _toArray(e)[0].getBoundingClientRect();

  if (_isUndefined(r.right) && !_isUndefined(r.width)) {
    r.right = r.left + r.width;
    r.bottom = r.top + r.height;
  } else if (_isUndefined(r.width)) {
    //some browsers don't include width and height properties. We can't just set them directly on r because some browsers throw errors, so create a new generic object.
    r = {
      width: r.right - r.left,
      height: r.bottom - r.top,
      right: r.right,
      left: r.left,
      bottom: r.bottom,
      top: r.top
    };
  }

  return r;
},
    _dispatchEvent = function _dispatchEvent(target, type, callbackName) {
  var vars = target.vars,
      callback = vars[callbackName],
      listeners = target._listeners[type],
      result;

  if (_isFunction(callback)) {
    result = callback.apply(vars.callbackScope || target, vars[callbackName + "Params"] || [target.pointerEvent]);
  }

  if (listeners && target.dispatchEvent(type) === false) {
    result = false;
  }

  return result;
},
    _getBounds = function _getBounds(target, context) {
  //accepts any of the following: a DOM element, jQuery object, selector text, or an object defining bounds as {top, left, width, height} or {minX, maxX, minY, maxY}. Returns an object with left, top, width, and height properties.
  var e = _toArray(target)[0],
      top,
      left,
      offset;

  if (!e.nodeType && e !== _win) {
    if (!_isUndefined(target.left)) {
      offset = {
        x: 0,
        y: 0
      }; //_getOffsetTransformOrigin(context); //the bounds should be relative to the origin

      return {
        left: target.left - offset.x,
        top: target.top - offset.y,
        width: target.width,
        height: target.height
      };
    }

    left = target.min || target.minX || target.minRotation || 0;
    top = target.min || target.minY || 0;
    return {
      left: left,
      top: top,
      width: (target.max || target.maxX || target.maxRotation || 0) - left,
      height: (target.max || target.maxY || 0) - top
    };
  }

  return _getElementBounds(e, context);
},
    _point1 = {},
    //we reuse to minimize garbage collection tasks.
_getElementBounds = function _getElementBounds(element, context) {
  context = _toArray(context)[0];
  var isSVG = element.getBBox && element.ownerSVGElement,
      left,
      right,
      top,
      bottom,
      matrix,
      p1,
      p2,
      p3,
      p4,
      bbox,
      width,
      height,
      cs,
      contextParent;

  if (element === _win) {
    top = _getDocScrollTop();
    left = _getDocScrollLeft();
    right = left + (_docElement.clientWidth || element.innerWidth || _doc.body.clientWidth || 0);
    bottom = top + ((element.innerHeight || 0) - 20 < _docElement.clientHeight ? _docElement.clientHeight : element.innerHeight || _body.clientHeight || 0); //some browsers (like Firefox) ignore absolutely positioned elements, and collapse the height of the documentElement, so it could be 8px, for example, if you have just an absolutely positioned div. In that case, we use the innerHeight to resolve this.
  } else if (context === _win || _isUndefined(context)) {
    return element.getBoundingClientRect();
  } else {
    left = top = 0;

    if (isSVG) {
      bbox = element.getBBox();
      width = bbox.width;
      height = bbox.height;
    } else if (element.viewBox && (bbox = element.viewBox.baseVal)) {
      left = bbox.x || 0;
      top = bbox.y || 0;
      width = bbox.width;
      height = bbox.height;
    } else {
      cs = _getComputedStyle(element);
      width = parseFloat(cs.width) || element.clientWidth || 0;
      height = parseFloat(cs.height) || element.clientHeight || 0;
    }

    right = width;
    bottom = height;
  }

  if (element === context) {
    return {
      left: left,
      top: top,
      width: right - left,
      height: bottom - top
    };
  }

  matrix = Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__["getGlobalMatrix"])(context, true).multiply(Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__["getGlobalMatrix"])(element));
  p1 = matrix.apply({
    x: left,
    y: top
  });
  p2 = matrix.apply({
    x: right,
    y: top
  });
  p3 = matrix.apply({
    x: right,
    y: bottom
  });
  p4 = matrix.apply({
    x: left,
    y: bottom
  });
  left = Math.min(p1.x, p2.x, p3.x, p4.x);
  top = Math.min(p1.y, p2.y, p3.y, p4.y);
  contextParent = context.parentNode || {};
  return {
    left: left + (contextParent.scrollLeft || 0),
    top: top + (contextParent.scrollTop || 0),
    width: Math.max(p1.x, p2.x, p3.x, p4.x) - left,
    height: Math.max(p1.y, p2.y, p3.y, p4.y) - top
  };
},
    _parseInertia = function _parseInertia(draggable, snap, max, min, factor, forceZeroVelocity) {
  var vars = {},
      a,
      i,
      l;

  if (snap) {
    if (factor !== 1 && snap instanceof Array) {
      //some data must be altered to make sense, like if the user passes in an array of rotational values in degrees, we must convert it to radians. Or for scrollLeft and scrollTop, we invert the values.
      vars.end = a = [];
      l = snap.length;

      if (_isObject(snap[0])) {
        //if the array is populated with objects, like points ({x:100, y:200}), make copies before multiplying by the factor, otherwise we'll mess up the originals and the user may reuse it elsewhere.
        for (i = 0; i < l; i++) {
          a[i] = _copy(snap[i], factor);
        }
      } else {
        for (i = 0; i < l; i++) {
          a[i] = snap[i] * factor;
        }
      }

      max += 1.1; //allow 1.1 pixels of wiggle room when snapping in order to work around some browser inconsistencies in the way bounds are reported which can make them roughly a pixel off. For example, if "snap:[-$('#menu').width(), 0]" was defined and #menu had a wrapper that was used as the bounds, some browsers would be one pixel off, making the minimum -752 for example when snap was [-753,0], thus instead of snapping to -753, it would snap to 0 since -753 was below the minimum.

      min -= 1.1;
    } else if (_isFunction(snap)) {
      vars.end = function (value) {
        var result = snap.call(draggable, value),
            copy,
            p;

        if (factor !== 1) {
          if (_isObject(result)) {
            copy = {};

            for (p in result) {
              copy[p] = result[p] * factor;
            }

            result = copy;
          } else {
            result *= factor;
          }
        }

        return result; //we need to ensure that we can scope the function call to the Draggable instance itself so that users can access important values like maxX, minX, maxY, minY, x, and y from within that function.
      };
    } else {
      vars.end = snap;
    }
  }

  if (max || max === 0) {
    vars.max = max;
  }

  if (min || min === 0) {
    vars.min = min;
  }

  if (forceZeroVelocity) {
    vars.velocity = 0;
  }

  return vars;
},
    _isClickable = function _isClickable(element) {
  //sometimes it's convenient to mark an element as clickable by adding a data-clickable="true" attribute (in which case we won't preventDefault() the mouse/touch event). This method checks if the element is an <a>, <input>, or <button> or has an onclick or has the data-clickable or contentEditable attribute set to true (or any of its parent elements).
  var data;
  return !element || !element.getAttribute || element === _body ? false : (data = element.getAttribute("data-clickable")) === "true" || data !== "false" && (element.onclick || _clickableTagExp.test(element.nodeName + "") || element.getAttribute("contentEditable") === "true") ? true : _isClickable(element.parentNode);
},
    _setSelectable = function _setSelectable(elements, selectable) {
  var i = elements.length,
      e;

  while (i--) {
    e = elements[i];
    e.ondragstart = e.onselectstart = selectable ? null : _emptyFunc;

    _setStyle(e, "userSelect", selectable ? "text" : "none");
  }
},
    _isFixed = function _isFixed(element) {
  if (_getComputedStyle(element).position === "fixed") {
    return true;
  }

  element = element.parentNode;

  if (element && element !== _docElement) {
    return _isFixed(element);
  }
},
    _initCore = function _initCore(required) {
  if (_windowExists()) {
    _win = window;
    _doc = document;
    _docElement = _doc.documentElement;
    _body = _doc.body;
    _tempDiv = _createElement("div");
    _supportsPointer = !!window.PointerEvent;
    _placeholderDiv = _doc.createElement("div");
    _placeholderDiv.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab";
    _defaultCursor = _placeholderDiv.style.cursor === "grab" ? "grab" : "move";
    _isAndroid = _win.navigator && _win.navigator.userAgent.toLowerCase().indexOf("android") !== -1; //Android handles touch events in an odd way and it's virtually impossible to "feature test" so we resort to UA sniffing

    _isTouchDevice = "ontouchstart" in _docElement && "orientation" in _win;

    _touchEventLookup = function (types) {
      //we create an object that makes it easy to translate touch event types into their "pointer" counterparts if we're in a browser that uses those instead. Like IE10 uses "MSPointerDown" instead of "touchstart", for example.
      var standard = types.split(","),
          converted = (!_isUndefined(_tempDiv.onpointerdown) ? "pointerdown,pointermove,pointerup,pointercancel" : !_isUndefined(_tempDiv.onmspointerdown) ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : types).split(","),
          obj = {},
          i = 4;

      while (--i > -1) {
        obj[standard[i]] = converted[i];
        obj[converted[i]] = standard[i];
      } //to avoid problems in iOS 9, test to see if the browser supports the "passive" option on addEventListener().


      try {
        _docElement.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function get() {
            _supportsPassive = 1;
          }
        }));
      } catch (e) {}

      return obj;
    }("touchstart,touchmove,touchend,touchcancel");

    _addListener(_doc, "touchcancel", _emptyFunc); //some older Android devices intermittently stop dispatching "touchmove" events if we don't listen for "touchcancel" on the document. Very strange indeed.


    _addListener(_win, "touchmove", _emptyFunc); //works around Safari bugs that still allow the page to scroll even when we preventDefault() on the touchmove event.


    _body && _body.addEventListener("touchstart", _emptyFunc); //works around Safari bug: https://greensock.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/

    _addListener(_doc, "contextmenu", function () {
      for (var p in _lookup) {
        if (_lookup[p].isPressed) {
          _lookup[p].endDrag();
        }
      }
    });

    gsap = _coreInitted = _getGSAP();
  }

  if (gsap) {
    InertiaPlugin = gsap.plugins.inertia;
    _checkPrefix = gsap.utils.checkPrefix;
    _transformProp = _checkPrefix(_transformProp);
    _transformOriginProp = _checkPrefix(_transformOriginProp);
    _toArray = gsap.utils.toArray;
  } else if (required) {
    console.warn("Please gsap.registerPlugin(Draggable)");
  }
};

var EventDispatcher =
/*#__PURE__*/
function () {
  function EventDispatcher(target) {
    this._listeners = {};
    this.target = target || this;
  }

  var _proto = EventDispatcher.prototype;

  _proto.addEventListener = function addEventListener(type, callback) {
    var list = this._listeners[type] || (this._listeners[type] = []);

    if (!~list.indexOf(callback)) {
      list.push(callback);
    }
  };

  _proto.removeEventListener = function removeEventListener(type, callback) {
    var list = this._listeners[type],
        i = list && list.indexOf(callback) || -1;
    i > -1 && list.splice(i, 1);
  };

  _proto.dispatchEvent = function dispatchEvent(type) {
    var _this = this;

    var result;
    (this._listeners[type] || []).forEach(function (callback) {
      return callback.call(_this, {
        type: type,
        target: _this.target
      }) === false && (result = false);
    });
    return result; //if any of the callbacks return false, pass that along.
  };

  return EventDispatcher;
}();

var Draggable =
/*#__PURE__*/
function (_EventDispatcher) {
  _inheritsLoose(Draggable, _EventDispatcher);

  function Draggable(target, vars) {
    var _this2;

    _this2 = _EventDispatcher.call(this) || this;

    if (!gsap) {
      _initCore(1);
    }

    target = _toArray(target)[0]; //in case the target is a selector object or selector text

    if (!InertiaPlugin) {
      InertiaPlugin = gsap.plugins.inertia;
    }

    _this2.vars = vars = _copy(vars || {});
    _this2.target = target;
    _this2.x = _this2.y = _this2.rotation = 0;
    _this2.dragResistance = parseFloat(vars.dragResistance) || 0;
    _this2.edgeResistance = isNaN(vars.edgeResistance) ? 1 : parseFloat(vars.edgeResistance) || 0;
    _this2.lockAxis = vars.lockAxis;
    _this2.autoScroll = vars.autoScroll || 0;
    _this2.lockedAxis = null;
    _this2.allowEventDefault = !!vars.allowEventDefault;
    gsap.set(target, {
      x: "+=0"
    }); // to ensure that transforms are instantiated.

    var type = (vars.type || "x,y").toLowerCase(),
        xyMode = ~type.indexOf("x") || ~type.indexOf("y"),
        rotationMode = type.indexOf("rotation") !== -1,
        xProp = rotationMode ? "rotation" : xyMode ? "x" : "left",
        yProp = xyMode ? "y" : "top",
        allowX = !!(~type.indexOf("x") || ~type.indexOf("left")),
        allowY = !!(~type.indexOf("y") || ~type.indexOf("top")),
        minimumMovement = vars.minimumMovement || 2,
        self = _assertThisInitialized(_this2),
        triggers = _toArray(vars.trigger || vars.handle || target),
        killProps = {},
        dragEndTime = 0,
        checkAutoScrollBounds = false,
        autoScrollMarginTop = vars.autoScrollMarginTop || 40,
        autoScrollMarginRight = vars.autoScrollMarginRight || 40,
        autoScrollMarginBottom = vars.autoScrollMarginBottom || 40,
        autoScrollMarginLeft = vars.autoScrollMarginLeft || 40,
        isClickable = vars.clickableTest || _isClickable,
        clickTime = 0,
        gsCache = target._gsap || gsap.core.getCache(target),
        isFixed = _isFixed(target),
        getPropAsNum = function getPropAsNum(property, unit) {
      return parseFloat(gsCache.get(target, property, unit));
    },
        enabled,
        startPointerX,
        startPointerY,
        startElementX,
        startElementY,
        hasBounds,
        hasDragCallback,
        hasMoveCallback,
        maxX,
        minX,
        maxY,
        minY,
        touch,
        touchID,
        rotationOrigin,
        dirty,
        old,
        snapX,
        snapY,
        snapXY,
        isClicking,
        touchEventTarget,
        matrix,
        interrupted,
        startScrollTop,
        startScrollLeft,
        allowNativeTouchScrolling,
        touchDragAxis,
        isDispatching,
        clickDispatch,
        trustedClickDispatch,
        onContextMenu = function onContextMenu(e) {
      //used to prevent long-touch from triggering a context menu.
      if (self.isPressed && e.which < 2) {
        self.endDrag();
      } else {
        _preventDefault(e);

        e.stopPropagation();
        return false;
      }
    },
        //this method gets called on every tick of TweenLite.ticker which allows us to synchronize the renders to the core engine (which is typically synchronized with the display refresh via requestAnimationFrame). This is an optimization - it's better than applying the values inside the "mousemove" or "touchmove" event handler which may get called many times inbetween refreshes.
    render = function render(suppressEvents) {
      if (self.autoScroll && self.isDragging && (checkAutoScrollBounds || dirty)) {
        var e = target,
            autoScrollFactor = self.autoScroll * 15,
            //multiplying by 15 just gives us a better "feel" speed-wise.
        parent,
            isRoot,
            rect,
            pointerX,
            pointerY,
            changeX,
            changeY,
            gap;
        checkAutoScrollBounds = false;
        _windowProxy.scrollTop = _win.pageYOffset != null ? _win.pageYOffset : _docElement.scrollTop != null ? _docElement.scrollTop : _body.scrollTop;
        _windowProxy.scrollLeft = _win.pageXOffset != null ? _win.pageXOffset : _docElement.scrollLeft != null ? _docElement.scrollLeft : _body.scrollLeft;
        pointerX = self.pointerX - _windowProxy.scrollLeft;
        pointerY = self.pointerY - _windowProxy.scrollTop;

        while (e && !isRoot) {
          //walk up the chain and sense wherever the pointer is within 40px of an edge that's scrollable.
          isRoot = _isRoot(e.parentNode);
          parent = isRoot ? _windowProxy : e.parentNode;
          rect = isRoot ? {
            bottom: Math.max(_docElement.clientHeight, _win.innerHeight || 0),
            right: Math.max(_docElement.clientWidth, _win.innerWidth || 0),
            left: 0,
            top: 0
          } : parent.getBoundingClientRect();
          changeX = changeY = 0;

          if (allowY) {
            gap = parent._gsMaxScrollY - parent.scrollTop;

            if (gap < 0) {
              changeY = gap;
            } else if (pointerY > rect.bottom - autoScrollMarginBottom && gap) {
              checkAutoScrollBounds = true;
              changeY = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.bottom - pointerY) / autoScrollMarginBottom) | 0);
            } else if (pointerY < rect.top + autoScrollMarginTop && parent.scrollTop) {
              checkAutoScrollBounds = true;
              changeY = -Math.min(parent.scrollTop, autoScrollFactor * (1 - Math.max(0, pointerY - rect.top) / autoScrollMarginTop) | 0);
            }

            if (changeY) {
              parent.scrollTop += changeY;
            }
          }

          if (allowX) {
            gap = parent._gsMaxScrollX - parent.scrollLeft;

            if (gap < 0) {
              changeX = gap;
            } else if (pointerX > rect.right - autoScrollMarginRight && gap) {
              checkAutoScrollBounds = true;
              changeX = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.right - pointerX) / autoScrollMarginRight) | 0);
            } else if (pointerX < rect.left + autoScrollMarginLeft && parent.scrollLeft) {
              checkAutoScrollBounds = true;
              changeX = -Math.min(parent.scrollLeft, autoScrollFactor * (1 - Math.max(0, pointerX - rect.left) / autoScrollMarginLeft) | 0);
            }

            if (changeX) {
              parent.scrollLeft += changeX;
            }
          }

          if (isRoot && (changeX || changeY)) {
            _win.scrollTo(parent.scrollLeft, parent.scrollTop);

            setPointerPosition(self.pointerX + changeX, self.pointerY + changeY);
          }

          e = parent;
        }
      }

      if (dirty) {
        var x = self.x,
            y = self.y;

        if (rotationMode) {
          self.deltaX = x - parseFloat(gsCache.rotation);
          self.rotation = x;
          gsCache.rotation = x + "deg";
          gsCache.renderTransform(1, gsCache);
        } else {
          if (xyMode) {
            if (allowY) {
              self.deltaY = y - parseFloat(gsCache.y);
              gsCache.y = y + "px";
            }

            if (allowX) {
              self.deltaX = x - parseFloat(gsCache.x);
              gsCache.x = x + "px";
            }

            gsCache.renderTransform(1, gsCache);
          } else {
            if (allowY) {
              self.deltaY = y - parseFloat(target.style.top || 0);
              target.style.top = y + "px";
            }

            if (allowX) {
              self.deltaY = x - parseFloat(target.style.left || 0);
              target.style.left = x + "px";
            }
          }
        }

        if (hasDragCallback && !suppressEvents && !isDispatching) {
          isDispatching = true; //in case onDrag has an update() call (avoid endless loop)

          if (_dispatchEvent(self, "drag", "onDrag") === false) {
            if (allowX) {
              self.x -= self.deltaX;
            }

            if (allowY) {
              self.y -= self.deltaY;
            }

            render(true);
          }

          isDispatching = false;
        }
      }

      dirty = false;
    },
        //copies the x/y from the element (whether that be transforms, top/left, or ScrollProxy's top/left) to the Draggable's x and y (and rotation if necessary) properties so that they reflect reality and it also (optionally) applies any snapping necessary. This is used by the InertiaPlugin tween in an onUpdate to ensure things are synced and snapped.
    syncXY = function syncXY(skipOnUpdate, skipSnap) {
      var x = self.x,
          y = self.y,
          snappedValue,
          cs;

      if (!target._gsap) {
        //just in case the _gsap cache got wiped, like if the user called clearProps on the transform or something (very rare).
        gsCache = gsap.core.getCache(target);
      }

      if (xyMode) {
        self.x = parseFloat(gsCache.x);
        self.y = parseFloat(gsCache.y);
      } else if (rotationMode) {
        self.x = self.rotation = parseFloat(gsCache.rotation);
      } else {
        self.y = parseInt(target.style.top || (cs = _getComputedStyle(target)) && cs.top, 10) || 0;
        self.x = parseInt(target.style.left || (cs || {}).left, 10) || 0;
      }

      if ((snapX || snapY || snapXY) && !skipSnap && (self.isDragging || self.isThrowing)) {
        if (snapXY) {
          _temp1.x = self.x;
          _temp1.y = self.y;
          snappedValue = snapXY(_temp1);

          if (snappedValue.x !== self.x) {
            self.x = snappedValue.x;
            dirty = true;
          }

          if (snappedValue.y !== self.y) {
            self.y = snappedValue.y;
            dirty = true;
          }
        }

        if (snapX) {
          snappedValue = snapX(self.x);

          if (snappedValue !== self.x) {
            self.x = snappedValue;

            if (rotationMode) {
              self.rotation = snappedValue;
            }

            dirty = true;
          }
        }

        if (snapY) {
          snappedValue = snapY(self.y);

          if (snappedValue !== self.y) {
            self.y = snappedValue;
          }

          dirty = true;
        }
      }

      if (dirty) {
        render(true);
      }

      if (!skipOnUpdate) {
        self.deltaX = self.x - x;
        self.deltaY = self.y - y;

        _dispatchEvent(self, "throwupdate", "onThrowUpdate");
      }
    },
        buildSnapFunc = function buildSnapFunc(snap, min, max, factor) {
      if (min == null) {
        min = -_bigNum;
      }

      if (max == null) {
        max = _bigNum;
      }

      if (_isFunction(snap)) {
        return function (n) {
          var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance; //if we're tweening, disable the edgeTolerance because it's already factored into the tweening values (we don't want to apply it multiple times)

          return snap.call(self, n > max ? max + (n - max) * edgeTolerance : n < min ? min + (n - min) * edgeTolerance : n) * factor;
        };
      }

      if (_isArray(snap)) {
        return function (n) {
          var i = snap.length,
              closest = 0,
              absDif = _bigNum,
              val,
              dif;

          while (--i > -1) {
            val = snap[i];
            dif = val - n;

            if (dif < 0) {
              dif = -dif;
            }

            if (dif < absDif && val >= min && val <= max) {
              closest = i;
              absDif = dif;
            }
          }

          return snap[closest];
        };
      }

      return isNaN(snap) ? function (n) {
        return n;
      } : function () {
        return snap * factor;
      };
    },
        buildPointSnapFunc = function buildPointSnapFunc(snap, minX, maxX, minY, maxY, radius, factor) {
      radius = radius && radius < _bigNum ? radius * radius : _bigNum; //so we don't have to Math.sqrt() in the functions. Performance optimization.

      if (_isFunction(snap)) {
        return function (point) {
          var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance,
              x = point.x,
              y = point.y,
              result,
              dx,
              dy; //if we're tweening, disable the edgeTolerance because it's already factored into the tweening values (we don't want to apply it multiple times)

          point.x = x = x > maxX ? maxX + (x - maxX) * edgeTolerance : x < minX ? minX + (x - minX) * edgeTolerance : x;
          point.y = y = y > maxY ? maxY + (y - maxY) * edgeTolerance : y < minY ? minY + (y - minY) * edgeTolerance : y;
          result = snap.call(self, point);

          if (result !== point) {
            point.x = result.x;
            point.y = result.y;
          }

          if (factor !== 1) {
            point.x *= factor;
            point.y *= factor;
          }

          if (radius < _bigNum) {
            dx = point.x - x;
            dy = point.y - y;

            if (dx * dx + dy * dy > radius) {
              point.x = x;
              point.y = y;
            }
          }

          return point;
        };
      }

      if (_isArray(snap)) {
        return function (p) {
          var i = snap.length,
              closest = 0,
              minDist = _bigNum,
              x,
              y,
              point,
              dist;

          while (--i > -1) {
            point = snap[i];
            x = point.x - p.x;
            y = point.y - p.y;
            dist = x * x + y * y;

            if (dist < minDist) {
              closest = i;
              minDist = dist;
            }
          }

          return minDist <= radius ? snap[closest] : p;
        };
      }

      return function (n) {
        return n;
      };
    },
        calculateBounds = function calculateBounds() {
      var bounds, targetBounds, snap, snapIsRaw;
      hasBounds = false;

      if (!!vars.bounds) {
        bounds = _getBounds(vars.bounds, target.parentNode); //could be a selector/jQuery object or a DOM element or a generic object like {top:0, left:100, width:1000, height:800} or {minX:100, maxX:1100, minY:0, maxY:800}

        if (rotationMode) {
          self.minX = minX = bounds.left;
          self.maxX = maxX = bounds.left + bounds.width;
          self.minY = minY = self.maxY = maxY = 0;
        } else if (!_isUndefined(vars.bounds.maxX) || !_isUndefined(vars.bounds.maxY)) {
          bounds = vars.bounds;
          self.minX = minX = bounds.minX;
          self.minY = minY = bounds.minY;
          self.maxX = maxX = bounds.maxX;
          self.maxY = maxY = bounds.maxY;
        } else {
          targetBounds = _getBounds(target, target.parentNode);
          self.minX = minX = getPropAsNum(xProp) + bounds.left - targetBounds.left;
          self.minY = minY = getPropAsNum(yProp) + bounds.top - targetBounds.top;
          self.maxX = maxX = minX + (bounds.width - targetBounds.width);
          self.maxY = maxY = minY + (bounds.height - targetBounds.height);
        }

        if (minX > maxX) {
          self.minX = maxX;
          self.maxX = maxX = minX;
          minX = self.minX;
        }

        if (minY > maxY) {
          self.minY = maxY;
          self.maxY = maxY = minY;
          minY = self.minY;
        }

        if (rotationMode) {
          self.minRotation = minX;
          self.maxRotation = maxX;
        }

        hasBounds = true;
      }

      if (vars.liveSnap) {
        snap = vars.liveSnap === true ? vars.snap || {} : vars.liveSnap;
        snapIsRaw = _isArray(snap) || _isFunction(snap);

        if (rotationMode) {
          snapX = buildSnapFunc(snapIsRaw ? snap : snap.rotation, minX, maxX, 1);
          snapY = null;
        } else {
          if (snap.points) {
            snapXY = buildPointSnapFunc(snapIsRaw ? snap : snap.points, minX, maxX, minY, maxY, snap.radius, 1);
          } else {
            if (allowX) {
              snapX = buildSnapFunc(snapIsRaw ? snap : snap.x || snap.left || snap.scrollLeft, minX, maxX, 1);
            }

            if (allowY) {
              snapY = buildSnapFunc(snapIsRaw ? snap : snap.y || snap.top || snap.scrollTop, minY, maxY, 1);
            }
          }
        }
      }
    },
        onThrowComplete = function onThrowComplete() {
      self.isThrowing = false;

      _dispatchEvent(self, "throwcomplete", "onThrowComplete");
    },
        onThrowInterrupt = function onThrowInterrupt() {
      self.isThrowing = false;
    },
        animate = function animate(inertia, forceZeroVelocity) {
      var snap, snapIsRaw, tween, overshootTolerance;

      if (inertia && InertiaPlugin) {
        if (inertia === true) {
          snap = vars.snap || vars.liveSnap || {};
          snapIsRaw = _isArray(snap) || _isFunction(snap);
          inertia = {
            resistance: (vars.throwResistance || vars.resistance || 1000) / (rotationMode ? 10 : 1)
          };

          if (rotationMode) {
            inertia.rotation = _parseInertia(self, snapIsRaw ? snap : snap.rotation, maxX, minX, 1, forceZeroVelocity);
          } else {
            if (allowX) {
              inertia[xProp] = _parseInertia(self, snapIsRaw ? snap : snap.points || snap.x || snap.left, maxX, minX, 1, forceZeroVelocity || self.lockedAxis === "x");
            }

            if (allowY) {
              inertia[yProp] = _parseInertia(self, snapIsRaw ? snap : snap.points || snap.y || snap.top, maxY, minY, 1, forceZeroVelocity || self.lockedAxis === "y");
            }

            if (snap.points || _isArray(snap) && _isObject(snap[0])) {
              inertia.linkedProps = xProp + "," + yProp;
              inertia.radius = snap.radius; //note: we also disable liveSnapping while throwing if there's a "radius" defined, otherwise it looks weird to have the item thrown past a snapping point but live-snapping mid-tween. We do this by altering the onUpdateParams so that "skipSnap" parameter is true for syncXY.
            }
          }
        }

        self.isThrowing = true;
        overshootTolerance = !isNaN(vars.overshootTolerance) ? vars.overshootTolerance : vars.edgeResistance === 1 ? 0 : 1 - self.edgeResistance + 0.2;
        inertia.duration = {
          max: Math.max(vars.minDuration || 0, vars.maxDuration || 0) || 2,
          min: !isNaN(vars.minDuration) ? vars.minDuration : overshootTolerance === 0 || _isObject(inertia) && inertia.resistance > 1000 ? 0 : 0.5,
          overshoot: overshootTolerance
        };
        self.tween = tween = gsap.to(target, {
          inertia: inertia,
          data: "_draggable",
          onComplete: onThrowComplete,
          onInterrupt: onThrowInterrupt,
          onUpdate: vars.fastMode ? _dispatchEvent : syncXY,
          onUpdateParams: vars.fastMode ? [self, "onthrowupdate", "onThrowUpdate"] : snap && snap.radius ? [false, true] : []
        });

        if (!vars.fastMode) {
          tween.render(tween.duration(), true, true);
          syncXY(true, true);
          self.endX = self.x;
          self.endY = self.y;

          if (rotationMode) {
            self.endRotation = self.x;
          }

          tween.play(0);
          syncXY(true, true);
        }
      } else if (hasBounds) {
        self.applyBounds();
      }
    },
        updateMatrix = function updateMatrix(shiftStart) {
      var start = matrix || new _utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__["Matrix2D"](),
          p;
      matrix = Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__["getGlobalMatrix"])(target.parentNode, true);

      if (shiftStart && self.isPressed && !matrix.equals(start)) {
        //if the matrix changes WHILE the element is pressed, we must adjust the startPointerX and startPointerY accordingly, so we invert the original matrix and figure out where the pointerX and pointerY were in the global space, then apply the new matrix to get the updated coordinates.
        p = start.inverse().apply({
          x: startPointerX,
          y: startPointerY
        });
        matrix.apply(p, p);
        startPointerX = p.x;
        startPointerY = p.y;
      }

      if (matrix.equals(_identityMatrix)) {
        //if there are no transforms, we can optimize performance by not factoring in the matrix
        matrix = null;
      }
    },
        recordStartPositions = function recordStartPositions() {
      var edgeTolerance = 1 - self.edgeResistance,
          parsedOrigin,
          parent;
      updateMatrix(false);

      if (matrix) {
        _point1.x = self.pointerX;
        _point1.y = self.pointerY;
        matrix.apply(_point1, _point1);
        startPointerX = _point1.x; //translate to local coordinate system

        startPointerY = _point1.y;
      }

      if (dirty) {
        setPointerPosition(self.pointerX, self.pointerY);
        render(true);
      } //if the element is in the process of tweening, don't force snapping to occur because it could make it jump. Imagine the user throwing, then before it's done, clicking on the element in its inbetween state.


      if (isTweening()) {
        syncXY(true, true);
        calculateBounds();
      } else {
        self.applyBounds();
      }

      if (rotationMode) {
        parsedOrigin = target.ownerSVGElement ? [gsCache.xOrigin - target.getBBox().x, gsCache.yOrigin - target.getBBox().y] : (_getComputedStyle(target)[_transformOriginProp] || "0 0").split(" ");
        rotationOrigin = self.rotationOrigin = Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__["getGlobalMatrix"])(target).apply({
          x: parseFloat(parsedOrigin[0]) || 0,
          y: parseFloat(parsedOrigin[1]) || 0
        });
        syncXY(true, true);
        startElementX = self.x; //starting rotation (x always refers to rotation in type:"rotation", measured in degrees)

        startElementY = self.y = Math.atan2(rotationOrigin.y - self.pointerY, self.pointerX - rotationOrigin.x) * _RAD2DEG;
      } else {
        parent = !isFixed && target.parentNode;
        startScrollTop = parent ? parent.scrollTop || 0 : 0;
        startScrollLeft = parent ? parent.scrollLeft || 0 : 0;
        startElementY = getPropAsNum(yProp); //record the starting top and left values so that we can just add the mouse's movement to them later.

        startElementX = getPropAsNum(xProp);
      }

      if (hasBounds && edgeTolerance) {
        if (startElementX > maxX) {
          startElementX = maxX + (startElementX - maxX) / edgeTolerance;
        } else if (startElementX < minX) {
          startElementX = minX - (minX - startElementX) / edgeTolerance;
        }

        if (!rotationMode) {
          if (startElementY > maxY) {
            startElementY = maxY + (startElementY - maxY) / edgeTolerance;
          } else if (startElementY < minY) {
            startElementY = minY - (minY - startElementY) / edgeTolerance;
          }
        }
      }

      self.startX = startElementX;
      self.startY = startElementY;
    },
        isTweening = function isTweening() {
      return self.tween && self.tween.isActive();
    },
        removePlaceholder = function removePlaceholder() {
      if (_placeholderDiv.parentNode && !isTweening() && !self.isDragging) {
        //_placeholderDiv just props open auto-scrolling containers so they don't collapse as the user drags left/up. We remove it after dragging (and throwing, if necessary) finishes.
        _placeholderDiv.parentNode.removeChild(_placeholderDiv);
      }
    },
        //called when the mouse is pressed (or touch starts)
    onPress = function onPress(e, force) {
      var i;

      if (!enabled || self.isPressed || !e || (e.type === "mousedown" || e.type === "pointerdown") && !force && _getTime() - clickTime < 30 && _touchEventLookup[self.pointerEvent.type]) {
        //when we DON'T preventDefault() in order to accommodate touch-scrolling and the user just taps, many browsers also fire a mousedown/mouseup sequence AFTER the touchstart/touchend sequence, thus it'd result in two quick "click" events being dispatched. This line senses that condition and halts it on the subsequent mousedown.
        return;
      }

      interrupted = isTweening();
      self.pointerEvent = e;

      if (_touchEventLookup[e.type]) {
        //note: on iOS, BOTH touchmove and mousemove are dispatched, but the mousemove has pageY and pageX of 0 which would mess up the calculations and needlessly hurt performance.
        touchEventTarget = ~e.type.indexOf("touch") ? e.currentTarget || e.target : _doc; //pointer-based touches (for Microsoft browsers) don't remain locked to the original target like other browsers, so we must use the document instead. The event type would be "MSPointerDown" or "pointerdown".

        _addListener(touchEventTarget, "touchend", onRelease);

        _addListener(touchEventTarget, "touchmove", onMove);

        _addListener(touchEventTarget, "touchcancel", onRelease);

        _addListener(_doc, "touchstart", _onMultiTouchDocument);
      } else {
        touchEventTarget = null;

        _addListener(_doc, "mousemove", onMove); //attach these to the document instead of the box itself so that if the user's mouse moves too quickly (and off of the box), things still work.

      }

      touchDragAxis = null;

      if (!_supportsPointer) {
        _addListener(_doc, "mouseup", onRelease);

        if (e && e.target) {
          _addListener(e.target, "mouseup", onRelease); //we also have to listen directly on the element because some browsers don't bubble up the event to the _doc on elements with contentEditable="true"

        }
      }

      isClicking = isClickable.call(self, e.target) && vars.dragClickables === false && !force;

      if (isClicking) {
        _addListener(e.target, "change", onRelease); //in some browsers, when you mousedown on a <select> element, no mouseup gets dispatched! So we listen for a "change" event instead.


        _dispatchEvent(self, "pressInit", "onPressInit");

        _dispatchEvent(self, "press", "onPress");

        _setSelectable(triggers, true); //accommodates things like inputs and elements with contentEditable="true" (otherwise user couldn't drag to select text)


        return;
      }

      allowNativeTouchScrolling = !touchEventTarget || allowX === allowY || self.vars.allowNativeTouchScrolling === false || self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2) ? false : allowX ? "y" : "x"; //note: in Chrome, right-clicking (for a context menu) fires onPress and it doesn't have the event.which set properly, so we must look for event.ctrlKey. If the user wants to allow context menus we should of course sense it here and not allow native touch scrolling.

      if (!allowNativeTouchScrolling && !self.allowEventDefault) {
        _preventDefault(e);

        _addListener(_win, "touchforcechange", _preventDefault); //works around safari bug: https://greensock.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/

      }

      if (e.changedTouches) {
        //touch events store the data slightly differently
        e = touch = e.changedTouches[0];
        touchID = e.identifier;
      } else if (e.pointerId) {
        touchID = e.pointerId; //for some Microsoft browsers
      } else {
        touch = touchID = null;
      }

      _dragCount++;

      _addToRenderQueue(render); //causes the Draggable to render on each "tick" of TweenLite.ticker (performance optimization - updating values in a mousemove can cause them to happen too frequently, like multiple times between frame redraws which is wasteful, and it also prevents values from updating properly in IE8)


      startPointerY = self.pointerY = e.pageY; //record the starting x and y so that we can calculate the movement from the original in _onMouseMove

      startPointerX = self.pointerX = e.pageX;

      _dispatchEvent(self, "pressInit", "onPressInit");

      if (allowNativeTouchScrolling || self.autoScroll) {
        _recordMaxScrolls(target.parentNode);
      }

      if (target.parentNode && self.autoScroll && !rotationMode && target.parentNode._gsMaxScrollX && !_placeholderDiv.parentNode && !target.getBBox) {
        //add a placeholder div to prevent the parent container from collapsing when the user drags the element left.
        _placeholderDiv.style.width = target.parentNode.scrollWidth + "px";
        target.parentNode.appendChild(_placeholderDiv);
      }

      recordStartPositions();

      if (self.tween) {
        self.tween.kill();
      }

      self.isThrowing = false;
      gsap.killTweensOf(target, killProps, true); //in case the user tries to drag it before the last tween is done.

      self.tween = self.lockedAxis = null;

      if (vars.zIndexBoost || !rotationMode && vars.zIndexBoost !== false) {
        target.style.zIndex = Draggable.zIndex++;
      }

      self.isPressed = true;
      hasDragCallback = !!(vars.onDrag || self._listeners.drag);
      hasMoveCallback = !!(vars.onMove || self._listeners.move);

      if (!rotationMode && (vars.cursor !== false || vars.activeCursor)) {
        i = triggers.length;

        while (--i > -1) {
          _setStyle(triggers[i], "cursor", vars.activeCursor || vars.cursor || (_defaultCursor === "grab" ? "grabbing" : _defaultCursor));
        }
      }

      _dispatchEvent(self, "press", "onPress");
    },
        //called every time the mouse/touch moves
    onMove = function onMove(e) {
      var originalEvent = e,
          touches,
          pointerX,
          pointerY,
          i,
          dx,
          dy;

      if (!enabled || _isMultiTouching || !self.isPressed || !e) {
        return;
      }

      self.pointerEvent = e;
      touches = e.changedTouches;

      if (touches) {
        //touch events store the data slightly differently
        e = touches[0];

        if (e !== touch && e.identifier !== touchID) {
          //Usually changedTouches[0] will be what we're looking for, but in case it's not, look through the rest of the array...(and Android browsers don't reuse the event like iOS)
          i = touches.length;

          while (--i > -1 && (e = touches[i]).identifier !== touchID) {}

          if (i < 0) {
            return;
          }
        }
      } else if (e.pointerId && touchID && e.pointerId !== touchID) {
        //for some Microsoft browsers, we must attach the listener to the doc rather than the trigger so that when the finger moves outside the bounds of the trigger, things still work. So if the event we're receiving has a pointerId that doesn't match the touchID, ignore it (for multi-touch)
        return;
      }

      if (touchEventTarget && allowNativeTouchScrolling && !touchDragAxis) {
        //Android browsers force us to decide on the first "touchmove" event if we should allow the default (scrolling) behavior or preventDefault(). Otherwise, a "touchcancel" will be fired and then no "touchmove" or "touchend" will fire during the scrolling (no good).
        _point1.x = e.pageX;
        _point1.y = e.pageY;

        if (matrix) {
          matrix.apply(_point1, _point1);
        }

        pointerX = _point1.x;
        pointerY = _point1.y;
        dx = Math.abs(pointerX - startPointerX);
        dy = Math.abs(pointerY - startPointerY);

        if (dx !== dy && (dx > minimumMovement || dy > minimumMovement) || _isAndroid && allowNativeTouchScrolling === touchDragAxis) {
          touchDragAxis = dx > dy && allowX ? "x" : "y";

          if (allowNativeTouchScrolling && touchDragAxis !== allowNativeTouchScrolling) {
            _addListener(_win, "touchforcechange", _preventDefault); // prevents native touch scrolling from taking over if the user started dragging in the other direction in iOS Safari

          }

          if (self.vars.lockAxisOnTouchScroll !== false) {
            self.lockedAxis = touchDragAxis === "x" ? "y" : "x";

            if (_isFunction(self.vars.onLockAxis)) {
              self.vars.onLockAxis.call(self, originalEvent);
            }
          }

          if (_isAndroid && allowNativeTouchScrolling === touchDragAxis) {
            onRelease(originalEvent);
            return;
          }
        }
      }

      if (!self.allowEventDefault && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling !== touchDragAxis) && originalEvent.cancelable !== false) {
        _preventDefault(originalEvent);
      }

      if (self.autoScroll) {
        checkAutoScrollBounds = true;
      }

      setPointerPosition(e.pageX - (isFixed ? _getDocScrollLeft() : 0), e.pageY - (isFixed ? _getDocScrollTop() : 0), hasMoveCallback);
    },
        setPointerPosition = function setPointerPosition(pointerX, pointerY, invokeOnMove) {
      var dragTolerance = 1 - self.dragResistance,
          edgeTolerance = 1 - self.edgeResistance,
          prevPointerX = self.pointerX,
          prevPointerY = self.pointerY,
          prevStartElementY = startElementY,
          prevX = self.x,
          prevY = self.y,
          prevEndX = self.endX,
          prevEndY = self.endY,
          prevEndRotation = self.endRotation,
          prevDirty = dirty,
          xChange,
          yChange,
          x,
          y,
          dif,
          temp;
      self.pointerX = pointerX;
      self.pointerY = pointerY;

      if (rotationMode) {
        y = Math.atan2(rotationOrigin.y - pointerY, pointerX - rotationOrigin.x) * _RAD2DEG;
        dif = self.y - y;

        if (dif > 180) {
          startElementY -= 360;
          self.y = y;
        } else if (dif < -180) {
          startElementY += 360;
          self.y = y;
        }

        if (self.x !== startElementX || Math.abs(startElementY - y) > minimumMovement) {
          self.y = y;
          x = startElementX + (startElementY - y) * dragTolerance;
        } else {
          x = startElementX;
        }
      } else {
        if (matrix) {
          temp = pointerX * matrix.a + pointerY * matrix.c + matrix.e;
          pointerY = pointerX * matrix.b + pointerY * matrix.d + matrix.f;
          pointerX = temp;
        }

        yChange = pointerY - startPointerY;
        xChange = pointerX - startPointerX;

        if (yChange < minimumMovement && yChange > -minimumMovement) {
          yChange = 0;
        }

        if (xChange < minimumMovement && xChange > -minimumMovement) {
          xChange = 0;
        }

        if ((self.lockAxis || self.lockedAxis) && (xChange || yChange)) {
          temp = self.lockedAxis;

          if (!temp) {
            self.lockedAxis = temp = allowX && Math.abs(xChange) > Math.abs(yChange) ? "y" : allowY ? "x" : null;

            if (temp && _isFunction(self.vars.onLockAxis)) {
              self.vars.onLockAxis.call(self, self.pointerEvent);
            }
          }

          if (temp === "y") {
            yChange = 0;
          } else if (temp === "x") {
            xChange = 0;
          }
        }

        x = _round(startElementX + xChange * dragTolerance);
        y = _round(startElementY + yChange * dragTolerance);
      }

      if ((snapX || snapY || snapXY) && (self.x !== x || self.y !== y && !rotationMode)) {
        if (snapXY) {
          _temp1.x = x;
          _temp1.y = y;
          temp = snapXY(_temp1);
          x = _round(temp.x);
          y = _round(temp.y);
        }

        if (snapX) {
          x = _round(snapX(x));
        }

        if (snapY) {
          y = _round(snapY(y));
        }
      } else if (hasBounds) {
        if (x > maxX) {
          x = maxX + Math.round((x - maxX) * edgeTolerance);
        } else if (x < minX) {
          x = minX + Math.round((x - minX) * edgeTolerance);
        }

        if (!rotationMode) {
          if (y > maxY) {
            y = Math.round(maxY + (y - maxY) * edgeTolerance);
          } else if (y < minY) {
            y = Math.round(minY + (y - minY) * edgeTolerance);
          }
        }
      }

      if (self.x !== x || self.y !== y && !rotationMode) {
        if (rotationMode) {
          self.endRotation = self.x = self.endX = x;
          dirty = true;
        } else {
          if (allowY) {
            self.y = self.endY = y;
            dirty = true; //a flag that indicates we need to render the target next time the TweenLite.ticker dispatches a "tick" event (typically on a requestAnimationFrame) - this is a performance optimization (we shouldn't render on every move because sometimes many move events can get dispatched between screen refreshes, and that'd be wasteful to render every time)
          }

          if (allowX) {
            self.x = self.endX = x;
            dirty = true;
          }
        }

        if (!invokeOnMove || _dispatchEvent(self, "move", "onMove") !== false) {
          if (!self.isDragging && self.isPressed) {
            self.isDragging = true;

            _dispatchEvent(self, "dragstart", "onDragStart");
          }
        } else {
          //revert because the onMove returned false!
          self.pointerX = prevPointerX;
          self.pointerY = prevPointerY;
          startElementY = prevStartElementY;
          self.x = prevX;
          self.y = prevY;
          self.endX = prevEndX;
          self.endY = prevEndY;
          self.endRotation = prevEndRotation;
          dirty = prevDirty;
        }
      }
    },
        //called when the mouse/touch is released
    onRelease = function onRelease(e, force) {
      if (!enabled || !self.isPressed || e && touchID != null && !force && (e.pointerId && e.pointerId !== touchID || e.changedTouches && !_hasTouchID(e.changedTouches, touchID))) {
        //for some Microsoft browsers, we must attach the listener to the doc rather than the trigger so that when the finger moves outside the bounds of the trigger, things still work. So if the event we're receiving has a pointerId that doesn't match the touchID, ignore it (for multi-touch)
        return;
      }

      self.isPressed = false;
      var originalEvent = e,
          wasDragging = self.isDragging,
          isContextMenuRelease = self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2),
          placeholderDelayedCall = gsap.delayedCall(0.001, removePlaceholder),
          touches,
          i,
          syntheticEvent,
          eventTarget,
          syntheticClick;

      if (touchEventTarget) {
        _removeListener(touchEventTarget, "touchend", onRelease);

        _removeListener(touchEventTarget, "touchmove", onMove);

        _removeListener(touchEventTarget, "touchcancel", onRelease);

        _removeListener(_doc, "touchstart", _onMultiTouchDocument);
      } else {
        _removeListener(_doc, "mousemove", onMove);
      }

      _removeListener(_win, "touchforcechange", _preventDefault);

      if (!_supportsPointer) {
        _removeListener(_doc, "mouseup", onRelease);

        if (e && e.target) {
          _removeListener(e.target, "mouseup", onRelease);
        }
      }

      dirty = false;

      if (isClicking && !isContextMenuRelease) {
        if (e) {
          _removeListener(e.target, "change", onRelease);

          self.pointerEvent = originalEvent;
        }

        _setSelectable(triggers, false);

        _dispatchEvent(self, "release", "onRelease");

        _dispatchEvent(self, "click", "onClick");

        isClicking = false;
        return;
      }

      _removeFromRenderQueue(render);

      if (!rotationMode) {
        i = triggers.length;

        while (--i > -1) {
          _setStyle(triggers[i], "cursor", vars.cursor || (vars.cursor !== false ? _defaultCursor : null));
        }
      }

      if (wasDragging) {
        dragEndTime = _lastDragTime = _getTime();
        self.isDragging = false;
      }

      _dragCount--;

      if (e) {
        touches = e.changedTouches;

        if (touches) {
          //touch events store the data slightly differently
          e = touches[0];

          if (e !== touch && e.identifier !== touchID) {
            //Usually changedTouches[0] will be what we're looking for, but in case it's not, look through the rest of the array...(and Android browsers don't reuse the event like iOS)
            i = touches.length;

            while (--i > -1 && (e = touches[i]).identifier !== touchID) {}

            if (i < 0) {
              return;
            }
          }
        }

        self.pointerEvent = originalEvent;
        self.pointerX = e.pageX;
        self.pointerY = e.pageY;
      }

      if (isContextMenuRelease && originalEvent) {
        _preventDefault(originalEvent);

        _dispatchEvent(self, "release", "onRelease");
      } else if (originalEvent && !wasDragging) {
        if (interrupted && (vars.snap || vars.bounds)) {
          //otherwise, if the user clicks on the object while it's animating to a snapped position, and then releases without moving 3 pixels, it will just stay there (it should animate/snap)
          animate(vars.inertia || vars.throwProps);
        }

        _dispatchEvent(self, "release", "onRelease");

        if ((!_isAndroid || originalEvent.type !== "touchmove") && originalEvent.type.indexOf("cancel") === -1) {
          //to accommodate native scrolling on Android devices, we have to immediately call onRelease() on the first touchmove event, but that shouldn't trigger a "click".
          _dispatchEvent(self, "click", "onClick");

          if (_getTime() - clickTime < 300) {
            _dispatchEvent(self, "doubleclick", "onDoubleClick");
          }

          eventTarget = originalEvent.target || target; //old IE uses srcElement

          clickTime = _getTime();

          syntheticClick = function syntheticClick() {
            // some browsers (like Firefox) won't trust script-generated clicks, so if the user tries to click on a video to play it, for example, it simply won't work. Since a regular "click" event will most likely be generated anyway (one that has its isTrusted flag set to true), we must slightly delay our script-generated click so that the "real"/trusted one is prioritized. Remember, when there are duplicate events in quick succession, we suppress all but the first one. Some browsers don't even trigger the "real" one at all, so our synthetic one is a safety valve that ensures that no matter what, a click event does get dispatched.
            if (clickTime !== clickDispatch && self.enabled() && !self.isPressed && !originalEvent.defaultPrevented) {
              if (eventTarget.click) {
                //some browsers (like mobile Safari) don't properly trigger the click event
                eventTarget.click();
              } else if (_doc.createEvent) {
                syntheticEvent = _doc.createEvent("MouseEvents");
                syntheticEvent.initMouseEvent("click", true, true, _win, 1, self.pointerEvent.screenX, self.pointerEvent.screenY, self.pointerX, self.pointerY, false, false, false, false, 0, null);
                eventTarget.dispatchEvent(syntheticEvent);
              }
            }
          };

          if (!_isAndroid && !originalEvent.defaultPrevented) {
            //iOS Safari requires the synthetic click to happen immediately or else it simply won't work, but Android doesn't play nice.
            gsap.delayedCall(0.05, syntheticClick); //in addition to the iOS bug workaround, there's a Firefox issue with clicking on things like a video to play, so we must fake a click event in a slightly delayed fashion. Previously, we listened for the "click" event with "capture" false which solved the video-click-to-play issue, but it would allow the "click" event to be dispatched twice like if you were using a jQuery.click() because that was handled in the capture phase, thus we had to switch to the capture phase to avoid the double-dispatching, but do the delayed synthetic click. Don't fire it too fast (like 0.00001) because we want to give the native event a chance to fire first as it's "trusted".
          }
        }
      } else {
        animate(vars.inertia || vars.throwProps); //will skip if inertia/throwProps isn't defined or IntertiaPlugin isn't loaded.

        if (!self.allowEventDefault && originalEvent && (vars.dragClickables !== false || !isClickable.call(self, originalEvent.target)) && wasDragging && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling === touchDragAxis) && originalEvent.cancelable !== false) {
          _preventDefault(originalEvent);
        }

        _dispatchEvent(self, "release", "onRelease");
      }

      if (isTweening()) {
        placeholderDelayedCall.duration(self.tween.duration()); //sync the timing so that the placeholder DIV gets
      }

      if (wasDragging) {
        _dispatchEvent(self, "dragend", "onDragEnd");
      }

      return true;
    },
        updateScroll = function updateScroll(e) {
      if (e && self.isDragging) {
        var parent = e.target || target.parentNode,
            deltaX = parent.scrollLeft - parent._gsScrollX,
            deltaY = parent.scrollTop - parent._gsScrollY;

        if (deltaX || deltaY) {
          if (matrix) {
            startPointerX -= deltaX * matrix.a + deltaY * matrix.c;
            startPointerY -= deltaY * matrix.d + deltaX * matrix.b;
          } else {
            startPointerX -= deltaX;
            startPointerY -= deltaY;
          }

          parent._gsScrollX += deltaX;
          parent._gsScrollY += deltaY;
          setPointerPosition(self.pointerX, self.pointerY);
        }
      }
    },
        onClick = function onClick(e) {
      //this was a huge pain in the neck to align all the various browsers and their behaviors. Chrome, Firefox, Safari, Opera, Android, and Microsoft Edge all handle events differently! Some will only trigger native behavior (like checkbox toggling) from trusted events. Others don't even support isTrusted, but require 2 events to flow through before triggering native behavior. Edge treats everything as trusted but also mandates that 2 flow through to trigger the correct native behavior.
      var time = _getTime(),
          recentlyClicked = time - clickTime < 40,
          recentlyDragged = time - dragEndTime < 40,
          alreadyDispatched = recentlyClicked && clickDispatch === clickTime,
          defaultPrevented = self.pointerEvent && self.pointerEvent.defaultPrevented,
          alreadyDispatchedTrusted = recentlyClicked && trustedClickDispatch === clickTime,
          trusted = e.isTrusted || e.isTrusted == null && recentlyClicked && alreadyDispatched; //note: Safari doesn't support isTrusted, and it won't properly execute native behavior (like toggling checkboxes) on the first synthetic "click" event - we must wait for the 2nd and treat it as trusted (but stop propagation at that point). Confusing, I know. Don't you love cross-browser compatibility challenges?


      if ((alreadyDispatched || recentlyDragged && self.vars.suppressClickOnDrag !== false) && e.stopImmediatePropagation) {
        e.stopImmediatePropagation();
      }

      if (recentlyClicked && !(self.pointerEvent && self.pointerEvent.defaultPrevented) && (!alreadyDispatched || trusted && !alreadyDispatchedTrusted)) {
        //let the first click pass through unhindered. Let the next one only if it's trusted, then no more (stop quick-succession ones)
        if (trusted && alreadyDispatched) {
          trustedClickDispatch = clickTime;
        }

        clickDispatch = clickTime;
        return;
      }

      if (self.isPressed || recentlyDragged || recentlyClicked) {
        if (!trusted || !e.detail || !recentlyClicked || defaultPrevented) {
          _preventDefault(e);
        }
      }
    },
        localizePoint = function localizePoint(p) {
      return matrix ? {
        x: p.x * matrix.a + p.y * matrix.c + matrix.e,
        y: p.x * matrix.b + p.y * matrix.d + matrix.f
      } : {
        x: p.x,
        y: p.y
      };
    };

    old = Draggable.get(target);

    if (old) {
      old.kill(); // avoids duplicates (an element can only be controlled by one Draggable)
    } //give the user access to start/stop dragging...


    _this2.startDrag = function (event, align) {
      var r1, r2, p1, p2;
      onPress(event || self.pointerEvent, true); //if the pointer isn't on top of the element, adjust things accordingly

      if (align && !self.hitTest(event || self.pointerEvent)) {
        r1 = _parseRect(event || self.pointerEvent);
        r2 = _parseRect(target);
        p1 = localizePoint({
          x: r1.left + r1.width / 2,
          y: r1.top + r1.height / 2
        });
        p2 = localizePoint({
          x: r2.left + r2.width / 2,
          y: r2.top + r2.height / 2
        });
        startPointerX -= p1.x - p2.x;
        startPointerY -= p1.y - p2.y;
      }

      if (!self.isDragging) {
        self.isDragging = true;

        _dispatchEvent(self, "dragstart", "onDragStart");
      }
    };

    _this2.drag = onMove;

    _this2.endDrag = function (e) {
      return onRelease(e || self.pointerEvent, true);
    };

    _this2.timeSinceDrag = function () {
      return self.isDragging ? 0 : (_getTime() - dragEndTime) / 1000;
    };

    _this2.timeSinceClick = function () {
      return (_getTime() - clickTime) / 1000;
    };

    _this2.hitTest = function (target, threshold) {
      return Draggable.hitTest(self.target, target, threshold);
    };

    _this2.getDirection = function (from, diagonalThreshold) {
      //from can be "start" (default), "velocity", or an element
      var mode = from === "velocity" && InertiaPlugin ? from : _isObject(from) && !rotationMode ? "element" : "start",
          xChange,
          yChange,
          ratio,
          direction,
          r1,
          r2;

      if (mode === "element") {
        r1 = _parseRect(self.target);
        r2 = _parseRect(from);
      }

      xChange = mode === "start" ? self.x - startElementX : mode === "velocity" ? InertiaPlugin.getVelocity(target, xProp) : r1.left + r1.width / 2 - (r2.left + r2.width / 2);

      if (rotationMode) {
        return xChange < 0 ? "counter-clockwise" : "clockwise";
      } else {
        diagonalThreshold = diagonalThreshold || 2;
        yChange = mode === "start" ? self.y - startElementY : mode === "velocity" ? InertiaPlugin.getVelocity(target, yProp) : r1.top + r1.height / 2 - (r2.top + r2.height / 2);
        ratio = Math.abs(xChange / yChange);
        direction = ratio < 1 / diagonalThreshold ? "" : xChange < 0 ? "left" : "right";

        if (ratio < diagonalThreshold) {
          if (direction !== "") {
            direction += "-";
          }

          direction += yChange < 0 ? "up" : "down";
        }
      }

      return direction;
    };

    _this2.applyBounds = function (newBounds) {
      var x, y, forceZeroVelocity, e, parent, isRoot;

      if (newBounds && vars.bounds !== newBounds) {
        vars.bounds = newBounds;
        return self.update(true);
      }

      syncXY(true);
      calculateBounds();

      if (hasBounds) {
        x = self.x;
        y = self.y;

        if (x > maxX) {
          x = maxX;
        } else if (x < minX) {
          x = minX;
        }

        if (y > maxY) {
          y = maxY;
        } else if (y < minY) {
          y = minY;
        }

        if (self.x !== x || self.y !== y) {
          forceZeroVelocity = true;
          self.x = self.endX = x;

          if (rotationMode) {
            self.endRotation = x;
          } else {
            self.y = self.endY = y;
          }

          dirty = true;
          render(true);

          if (self.autoScroll && !self.isDragging) {
            _recordMaxScrolls(target.parentNode);

            e = target;
            _windowProxy.scrollTop = _win.pageYOffset != null ? _win.pageYOffset : _docElement.scrollTop != null ? _docElement.scrollTop : _body.scrollTop;
            _windowProxy.scrollLeft = _win.pageXOffset != null ? _win.pageXOffset : _docElement.scrollLeft != null ? _docElement.scrollLeft : _body.scrollLeft;

            while (e && !isRoot) {
              //walk up the chain and sense wherever the scrollTop/scrollLeft exceeds the maximum.
              isRoot = _isRoot(e.parentNode);
              parent = isRoot ? _windowProxy : e.parentNode;

              if (allowY && parent.scrollTop > parent._gsMaxScrollY) {
                parent.scrollTop = parent._gsMaxScrollY;
              }

              if (allowX && parent.scrollLeft > parent._gsMaxScrollX) {
                parent.scrollLeft = parent._gsMaxScrollX;
              }

              e = parent;
            }
          }
        }

        if (self.isThrowing && (forceZeroVelocity || self.endX > maxX || self.endX < minX || self.endY > maxY || self.endY < minY)) {
          animate(vars.inertia || vars.throwProps, forceZeroVelocity);
        }
      }

      return self;
    };

    _this2.update = function (applyBounds, sticky, ignoreExternalChanges) {
      var x = self.x,
          y = self.y;
      updateMatrix(!sticky);

      if (applyBounds) {
        self.applyBounds();
      } else {
        if (dirty && ignoreExternalChanges) {
          render(true);
        }

        syncXY(true);
      }

      if (sticky) {
        setPointerPosition(self.pointerX, self.pointerY);

        if (dirty) {
          render(true);
        }
      }

      if (self.isPressed && !sticky && (allowX && Math.abs(x - self.x) > 0.01 || allowY && Math.abs(y - self.y) > 0.01 && !rotationMode)) {
        recordStartPositions();
      }

      if (self.autoScroll) {
        _recordMaxScrolls(target.parentNode);

        checkAutoScrollBounds = self.isDragging;
        render(true);
      }

      if (self.autoScroll) {
        //in case reparenting occurred.
        _removeScrollListener(target, updateScroll);

        _addScrollListener(target, updateScroll);
      }

      return self;
    };

    _this2.enable = function (type) {
      var id, i, trigger;

      if (type !== "soft") {
        i = triggers.length;

        while (--i > -1) {
          trigger = triggers[i];

          if (!_supportsPointer) {
            _addListener(trigger, "mousedown", onPress);
          }

          _addListener(trigger, "touchstart", onPress);

          _addListener(trigger, "click", onClick, true); //note: used to pass true for capture but it prevented click-to-play-video functionality in Firefox.


          if (!rotationMode && vars.cursor !== false) {
            _setStyle(trigger, "cursor", vars.cursor || _defaultCursor);
          }

          _setStyle(trigger, "touchCallout", "none");

          _setStyle(trigger, "touchAction", allowX === allowY ? "none" : vars.allowNativeTouchScrolling || vars.allowEventDefault ? "manipulation" : allowX ? "pan-y" : "pan-x");

          if (trigger.getBBox && trigger.ownerSVGElement) {
            // a bug in chrome doesn't respect touch-action on SVG elements - it only works if we set it on the parent SVG.
            _setStyle(trigger.ownerSVGElement, "touchAction", allowX === allowY ? "none" : vars.allowNativeTouchScrolling || vars.allowEventDefault ? "manipulation" : allowX ? "pan-y" : "pan-x");
          }

          if (!self.vars.allowContextMenu) {
            _addListener(trigger, "contextmenu", onContextMenu);
          }
        }

        _setSelectable(triggers, false);
      }

      _addScrollListener(target, updateScroll);

      enabled = true;

      if (InertiaPlugin && type !== "soft") {
        InertiaPlugin.track(target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
      }

      target._gsDragID = id = "d" + _lookupCount++;
      _lookup[id] = self; //syncXY();

      recordStartPositions();
      self.update(true);
      return self;
    };

    _this2.disable = function (type) {
      var dragging = self.isDragging,
          i,
          trigger;

      if (!rotationMode) {
        i = triggers.length;

        while (--i > -1) {
          _setStyle(triggers[i], "cursor", null);
        }
      }

      if (type !== "soft") {
        i = triggers.length;

        while (--i > -1) {
          trigger = triggers[i];

          _setStyle(trigger, "touchCallout", null);

          _setStyle(trigger, "touchAction", null);

          _removeListener(trigger, "mousedown", onPress);

          _removeListener(trigger, "touchstart", onPress);

          _removeListener(trigger, "click", onClick);

          _removeListener(trigger, "contextmenu", onContextMenu);
        }

        _setSelectable(triggers, true);

        if (touchEventTarget) {
          _removeListener(touchEventTarget, "touchcancel", onRelease);

          _removeListener(touchEventTarget, "touchend", onRelease);

          _removeListener(touchEventTarget, "touchmove", onMove);
        }

        _removeListener(_doc, "mouseup", onRelease);

        _removeListener(_doc, "mousemove", onMove);
      }

      _removeScrollListener(target, updateScroll);

      enabled = false;

      if (InertiaPlugin && type !== "soft") {
        InertiaPlugin.untrack(target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
      }

      _removeFromRenderQueue(render);

      self.isDragging = self.isPressed = isClicking = false;

      if (dragging) {
        _dispatchEvent(self, "dragend", "onDragEnd");
      }

      return self;
    };

    _this2.enabled = function (value, type) {
      return arguments.length ? value ? self.enable(type) : self.disable(type) : enabled;
    };

    _this2.kill = function () {
      self.isThrowing = false;
      gsap.killTweensOf(target, killProps, true);
      self.disable();
      gsap.set(triggers, {
        clearProps: "userSelect"
      });
      delete _lookup[target._gsDragID];
      return self;
    };

    if (rotationMode) {
      killProps.rotation = 1;
    } else {
      if (allowX) {
        killProps[xProp] = 1;
      }

      if (allowY) {
        killProps[yProp] = 1;
      }
    }

    _this2.enable();

    return _this2;
  }

  Draggable.register = function register(core) {
    gsap = core;

    _initCore();
  };

  Draggable.create = function create(targets, vars) {
    if (!_coreInitted) {
      _initCore(true);
    }

    return _toArray(targets).map(function (target) {
      return new Draggable(target, vars);
    });
  };

  Draggable.get = function get(target) {
    return _lookup[(_toArray(target)[0] || {})._gsDragID];
  };

  Draggable.timeSinceDrag = function timeSinceDrag() {
    return (_getTime() - _lastDragTime) / 1000;
  };

  Draggable.hitTest = function hitTest(obj1, obj2, threshold) {
    if (obj1 === obj2) {
      return false;
    }

    var r1 = _parseRect(obj1),
        r2 = _parseRect(obj2),
        top = r1.top,
        left = r1.left,
        right = r1.right,
        bottom = r1.bottom,
        width = r1.width,
        height = r1.height,
        isOutside = r2.left > right || r2.right < left || r2.top > bottom || r2.bottom < top,
        overlap,
        area,
        isRatio;

    if (isOutside || !threshold) {
      return !isOutside;
    }

    isRatio = (threshold + "").indexOf("%") !== -1;
    threshold = parseFloat(threshold) || 0;
    overlap = {
      left: Math.max(left, r2.left),
      top: Math.max(top, r2.top)
    };
    overlap.width = Math.min(right, r2.right) - overlap.left;
    overlap.height = Math.min(bottom, r2.bottom) - overlap.top;

    if (overlap.width < 0 || overlap.height < 0) {
      return false;
    }

    if (isRatio) {
      threshold *= 0.01;
      area = overlap.width * overlap.height;
      return area >= width * height * threshold || area >= r2.width * r2.height * threshold;
    }

    return overlap.width > threshold && overlap.height > threshold;
  };

  return Draggable;
}(EventDispatcher);

_setDefaults(Draggable.prototype, {
  pointerX: 0,
  pointerY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isDragging: false,
  isPressed: false
});

Draggable.zIndex = 1000;
Draggable.version = "3.0.0";
_getGSAP() && gsap.registerPlugin(Draggable);


/***/ }),

/***/ "./node_modules/gsap/EasePack.js":
/*!***************************************!*\
  !*** ./node_modules/gsap/EasePack.js ***!
  \***************************************/
/*! exports provided: SlowMo, ExpoScaleEase, RoughEase, EasePack, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlowMo", function() { return SlowMo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpoScaleEase", function() { return ExpoScaleEase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoughEase", function() { return RoughEase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EasePack", function() { return EasePack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EasePack; });
/*!
 * EasePack 3.0.0
 * https://greensock.com
 *
 * @license Copyright 2008-2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var gsap,
    _coreInitted,
    _registerEase,
    _getGSAP = function _getGSAP() {
  return gsap || typeof window !== "undefined" && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _boolean = function _boolean(value, defaultValue) {
  return !!(typeof value === "undefined" ? defaultValue : value && !~(value + "").indexOf("false"));
},
    _initCore = function _initCore(core) {
  gsap = core || _getGSAP();

  if (gsap) {
    _registerEase = gsap.registerEase; //add weighted ease capabilities to standard eases so users can do "power2.inOut(0.8)" for example to push everything toward the "out", or (-0.8) to push it toward the "in" (0 is neutral)

    var eases = gsap.parseEase(),
        createConfig = function createConfig(ease) {
      return function (ratio) {
        var y = 0.5 + ratio / 2;

        ease.config = function (p) {
          return ease(2 * (1 - p) * p * y + p * p);
        };
      };
    },
        p;

    for (p in eases) {
      if (!eases[p].config) {
        createConfig(eases[p]);
      }
    }

    _registerEase("slow", SlowMo);

    _registerEase("expoScale", ExpoScaleEase);

    _registerEase("rough", RoughEase);

    for (p in EasePack) {
      p !== "version" && gsap.core.globals(p, EasePack[p]);
    }

    _coreInitted = 1;
  }
},
    _createSlowMo = function _createSlowMo(linearRatio, power, yoyoMode) {
  linearRatio = Math.min(1, linearRatio || 0.7);

  var pow = linearRatio < 1 ? power || power === 0 ? power : 0.7 : 0,
      p1 = (1 - linearRatio) / 2,
      p3 = p1 + linearRatio,
      calcEnd = _boolean(yoyoMode);

  return function (p) {
    var r = p + (0.5 - p) * pow;
    return p < p1 ? calcEnd ? 1 - (p = 1 - p / p1) * p : r - (p = 1 - p / p1) * p * p * p * r : p > p3 ? calcEnd ? p === 1 ? 0 : 1 - (p = (p - p3) / p1) * p : r + (p - r) * (p = (p - p3) / p1) * p * p * p : calcEnd ? 1 : r;
  };
},
    _createExpoScale = function _createExpoScale(start, end, ease) {
  var p1 = Math.log(end / start),
      p2 = end - start;
  ease && (ease = gsap.parseEase(ease));
  return function (p) {
    return (start * Math.exp(p1 * (ease ? ease(p) : p)) - start) / p2;
  };
},
    EasePoint = function EasePoint(time, value, next) {
  this.t = time;
  this.v = value;

  if (next) {
    this.next = next;
    next.prev = this;
    this.c = next.v - value;
    this.gap = next.t - time;
  }
},
    _createRoughEase = function _createRoughEase(vars) {
  if (typeof vars !== "object") {
    //users may pass in via a string, like "rough(30)"
    vars = {
      points: +vars || 20
    };
  }

  var taper = vars.taper || "none",
      a = [],
      cnt = 0,
      points = (+vars.points || 20) | 0,
      i = points,
      randomize = _boolean(vars.randomize, true),
      clamp = _boolean(vars.clamp),
      template = gsap ? gsap.parseEase(vars.template) : 0,
      strength = (+vars.strength || 1) * 0.4,
      x,
      y,
      bump,
      invX,
      obj,
      pnt,
      recent;

  while (--i > -1) {
    x = randomize ? Math.random() : 1 / points * i;
    y = template ? template(x) : x;

    if (taper === "none") {
      bump = strength;
    } else if (taper === "out") {
      invX = 1 - x;
      bump = invX * invX * strength;
    } else if (taper === "in") {
      bump = x * x * strength;
    } else if (x < 0.5) {
      //"both" (start)
      invX = x * 2;
      bump = invX * invX * 0.5 * strength;
    } else {
      //"both" (end)
      invX = (1 - x) * 2;
      bump = invX * invX * 0.5 * strength;
    }

    if (randomize) {
      y += Math.random() * bump - bump * 0.5;
    } else if (i % 2) {
      y += bump * 0.5;
    } else {
      y -= bump * 0.5;
    }

    if (clamp) {
      if (y > 1) {
        y = 1;
      } else if (y < 0) {
        y = 0;
      }
    }

    a[cnt++] = {
      x: x,
      y: y
    };
  }

  a.sort(function (a, b) {
    return a.x - b.x;
  });
  pnt = new EasePoint(1, 1, null);
  i = points;

  while (i--) {
    obj = a[i];
    pnt = new EasePoint(obj.x, obj.y, pnt);
  }

  recent = new EasePoint(0, 0, pnt.t ? pnt : pnt.next);
  return function (p) {
    var pnt = recent;

    if (p > pnt.t) {
      while (pnt.next && p >= pnt.t) {
        pnt = pnt.next;
      }

      pnt = pnt.prev;
    } else {
      while (pnt.prev && p <= pnt.t) {
        pnt = pnt.prev;
      }
    }

    recent = pnt;
    return pnt.v + (p - pnt.t) / pnt.gap * pnt.c;
  };
};

var SlowMo = _createSlowMo(0.7);
SlowMo.ease = SlowMo; //for backward compatibility

SlowMo.config = _createSlowMo;
var ExpoScaleEase = _createExpoScale(1, 2);
ExpoScaleEase.config = _createExpoScale;
var RoughEase = _createRoughEase();
RoughEase.ease = RoughEase; //for backward compatibility

RoughEase.config = _createRoughEase;
var EasePack = {
  SlowMo: SlowMo,
  RoughEase: RoughEase,
  ExpoScaleEase: ExpoScaleEase
};

for (var p in EasePack) {
  EasePack[p].register = _initCore;
  EasePack[p].version = "3.0.0";
}

_getGSAP() && gsap.registerPlugin(SlowMo);


/***/ }),

/***/ "./node_modules/gsap/EaselPlugin.js":
/*!******************************************!*\
  !*** ./node_modules/gsap/EaselPlugin.js ***!
  \******************************************/
/*! exports provided: EaselPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EaselPlugin", function() { return EaselPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaselPlugin; });
/*!
 * EaselPlugin 3.0.0
 * https://greensock.com
 *
 * @license Copyright 2008-2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var gsap,
    _coreInitted,
    _win,
    _createJS,
    _ColorFilter,
    _ColorMatrixFilter,
    _colorProps = "redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier,redOffset,greenOffset,blueOffset,alphaOffset".split(","),
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _getGSAP = function _getGSAP() {
  return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _getCreateJS = function _getCreateJS() {
  return _createJS || _win && _win.createjs || _win || {};
},
    _warn = function _warn(message) {
  return console.warn(message);
},
    _cache = function _cache(target) {
  var bounds = target.getBounds && target.getBounds();
  target.cache && target.cache(bounds.x, bounds.y, bounds.width, bounds.height);

  _warn("EaselPlugin: for filters to display in EaselJS, you must call the object's cache() method first. GSAP attempted to use the target's getBounds() for the cache but that may not be completely accurate. " + target);
},
    _parseColorFilter = function _parseColorFilter(target, v, plugin) {
  if (!_ColorFilter) {
    _ColorFilter = _getCreateJS().ColorFilter;

    if (!_ColorFilter) {
      _warn("EaselPlugin error: The EaselJS ColorFilter JavaScript file wasn't loaded.");
    }
  }

  var filters = target.filters || [],
      i = filters.length,
      c,
      s,
      e,
      a,
      p,
      pt;

  while (i--) {
    if (filters[i] instanceof _ColorFilter) {
      s = filters[i];
      break;
    }
  }

  if (!s) {
    s = new _ColorFilter();
    filters.push(s);
    target.filters = filters;
  }

  e = s.clone();

  if (v.tint != null) {
    c = gsap.utils.splitColor(v.tint);
    a = v.tintAmount != null ? +v.tintAmount : 1;
    e.redOffset = +c[0] * a;
    e.greenOffset = +c[1] * a;
    e.blueOffset = +c[2] * a;
    e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1 - a;
  } else {
    for (p in v) {
      if (p !== "exposure") if (p !== "brightness") {
        e[p] = +v[p];
      }
    }
  }

  if (v.exposure != null) {
    e.redOffset = e.greenOffset = e.blueOffset = 255 * (+v.exposure - 1);
    e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1;
  } else if (v.brightness != null) {
    a = +v.brightness - 1;
    e.redOffset = e.greenOffset = e.blueOffset = a > 0 ? a * 255 : 0;
    e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1 - Math.abs(a);
  }

  i = 8;

  while (i--) {
    p = _colorProps[i];

    if (s[p] !== e[p]) {
      pt = plugin.add(s, p, s[p], e[p]);

      if (pt) {
        pt.op = "easel_colorFilter";
      }
    }
  }

  plugin._props.push("easel_colorFilter");

  if (!target.cacheID) {
    _cache(target);
  }
},
    _idMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    _lumR = 0.212671,
    _lumG = 0.715160,
    _lumB = 0.072169,
    _applyMatrix = function _applyMatrix(m, m2) {
  if (!(m instanceof Array) || !(m2 instanceof Array)) {
    return m2;
  }

  var temp = [],
      i = 0,
      z = 0,
      y,
      x;

  for (y = 0; y < 4; y++) {
    for (x = 0; x < 5; x++) {
      z = x === 4 ? m[i + 4] : 0;
      temp[i + x] = m[i] * m2[x] + m[i + 1] * m2[x + 5] + m[i + 2] * m2[x + 10] + m[i + 3] * m2[x + 15] + z;
    }

    i += 5;
  }

  return temp;
},
    _setSaturation = function _setSaturation(m, n) {
  if (isNaN(n)) {
    return m;
  }

  var inv = 1 - n,
      r = inv * _lumR,
      g = inv * _lumG,
      b = inv * _lumB;
  return _applyMatrix([r + n, g, b, 0, 0, r, g + n, b, 0, 0, r, g, b + n, 0, 0, 0, 0, 0, 1, 0], m);
},
    _colorize = function _colorize(m, color, amount) {
  if (isNaN(amount)) {
    amount = 1;
  }

  var c = gsap.utils.splitColor(color),
      r = c[0] / 255,
      g = c[1] / 255,
      b = c[2] / 255,
      inv = 1 - amount;
  return _applyMatrix([inv + amount * r * _lumR, amount * r * _lumG, amount * r * _lumB, 0, 0, amount * g * _lumR, inv + amount * g * _lumG, amount * g * _lumB, 0, 0, amount * b * _lumR, amount * b * _lumG, inv + amount * b * _lumB, 0, 0, 0, 0, 0, 1, 0], m);
},
    _setHue = function _setHue(m, n) {
  if (isNaN(n)) {
    return m;
  }

  n *= Math.PI / 180;
  var c = Math.cos(n),
      s = Math.sin(n);
  return _applyMatrix([_lumR + c * (1 - _lumR) + s * -_lumR, _lumG + c * -_lumG + s * -_lumG, _lumB + c * -_lumB + s * (1 - _lumB), 0, 0, _lumR + c * -_lumR + s * 0.143, _lumG + c * (1 - _lumG) + s * 0.14, _lumB + c * -_lumB + s * -0.283, 0, 0, _lumR + c * -_lumR + s * -(1 - _lumR), _lumG + c * -_lumG + s * _lumG, _lumB + c * (1 - _lumB) + s * _lumB, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], m);
},
    _setContrast = function _setContrast(m, n) {
  if (isNaN(n)) {
    return m;
  }

  n += 0.01;
  return _applyMatrix([n, 0, 0, 0, 128 * (1 - n), 0, n, 0, 0, 128 * (1 - n), 0, 0, n, 0, 128 * (1 - n), 0, 0, 0, 1, 0], m);
},
    _parseColorMatrixFilter = function _parseColorMatrixFilter(target, v, plugin) {
  if (!_ColorMatrixFilter) {
    _ColorMatrixFilter = _getCreateJS().ColorMatrixFilter;

    if (!_ColorMatrixFilter) {
      _warn("EaselPlugin: The EaselJS ColorMatrixFilter JavaScript file wasn't loaded.");
    }
  }

  var filters = target.filters || [],
      i = filters.length,
      matrix,
      startMatrix,
      s,
      pg;

  while (--i > -1) {
    if (filters[i] instanceof _ColorMatrixFilter) {
      s = filters[i];
      break;
    }
  }

  if (!s) {
    s = new _ColorMatrixFilter(_idMatrix.slice());
    filters.push(s);
    target.filters = filters;
  }

  startMatrix = s.matrix;
  matrix = _idMatrix.slice();

  if (v.colorize != null) {
    matrix = _colorize(matrix, v.colorize, Number(v.colorizeAmount));
  }

  if (v.contrast != null) {
    matrix = _setContrast(matrix, Number(v.contrast));
  }

  if (v.hue != null) {
    matrix = _setHue(matrix, Number(v.hue));
  }

  if (v.saturation != null) {
    matrix = _setSaturation(matrix, Number(v.saturation));
  }

  i = matrix.length;

  while (--i > -1) {
    if (matrix[i] !== startMatrix[i]) {
      pg = plugin.add(startMatrix, i, startMatrix[i], matrix[i]);

      if (pg) {
        pg.op = "easel_colorMatrixFilter";
      }
    }
  }

  plugin._props.push("easel_colorMatrixFilter");

  if (!target.cacheID) {
    _cache();
  }

  plugin._matrix = startMatrix;
},
    _initCore = function _initCore(core) {
  gsap = core || _getGSAP();

  if (_windowExists()) {
    _win = window;
  }

  if (gsap) {
    _coreInitted = 1;
  }
};

var EaselPlugin = {
  version: "3.0.0",
  name: "easel",
  init: function init(target, value, tween, index, targets) {
    if (!_coreInitted) {
      _initCore();

      if (!gsap) {
        _warn("Please gsap.registerPlugin(EaselPlugin)");
      }
    }

    this.target = target;
    var p, pt, tint, colorMatrix, end, labels, i;

    for (p in value) {
      end = value[p];

      if (p === "colorFilter" || p === "tint" || p === "tintAmount" || p === "exposure" || p === "brightness") {
        if (!tint) {
          _parseColorFilter(target, value.colorFilter || value, this);

          tint = true;
        }
      } else if (p === "saturation" || p === "contrast" || p === "hue" || p === "colorize" || p === "colorizeAmount") {
        if (!colorMatrix) {
          _parseColorMatrixFilter(target, value.colorMatrixFilter || value, this);

          colorMatrix = true;
        }
      } else if (p === "frame") {
        if (typeof end === "string" && end.charAt(1) !== "=" && (labels = target.labels)) {
          for (i = 0; i < labels.length; i++) {
            if (labels[i].label === end) {
              end = labels[i].position;
            }
          }
        }

        pt = this.add(target, "gotoAndStop", target.currentFrame, end, index, targets, Math.round);

        if (pt) {
          pt.op = p;
        }
      } else if (target[p] != null) {
        this.add(target, p, "get", end);
      }
    }
  },
  render: function render(ratio, data) {
    var pt = data._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    if (data.target.cacheID) {
      data.target.updateCache();
    }
  },
  register: _initCore
};

EaselPlugin.registerCreateJS = function (createjs) {
  _createJS = createjs;
};

_getGSAP() && gsap.registerPlugin(EaselPlugin);


/***/ }),

/***/ "./node_modules/gsap/MotionPathPlugin.js":
/*!***********************************************!*\
  !*** ./node_modules/gsap/MotionPathPlugin.js ***!
  \***********************************************/
/*! exports provided: MotionPathPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MotionPathPlugin", function() { return MotionPathPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MotionPathPlugin; });
/* harmony import */ var _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/paths.js */ "./node_modules/gsap/utils/paths.js");
/* harmony import */ var _utils_matrix_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/matrix.js */ "./node_modules/gsap/utils/matrix.js");
/*!
 * MotionPathPlugin 3.0.0
 * https://greensock.com
 *
 * @license Copyright 2008-2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */



var _xProps = ["x", "translateX", "left", "marginLeft"],
    _yProps = ["y", "translateY", "top", "marginTop"],
    _DEG2RAD = Math.PI / 180,
    gsap,
    PropTween,
    _getUnit,
    _toArray,
    _getGSAP = function _getGSAP() {
  return gsap || typeof window !== "undefined" && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _populateSegmentFromArray = function _populateSegmentFromArray(segment, values, property, mode) {
  //mode: 0 = x but don't fill y yet, 1 = y.
  var l = values.length,
      si = mode,
      i = 0;

  for (; i < l; i++) {
    segment[si] = parseFloat(values[i][property]);
    si += 2;
  }

  return segment;
},
    _getPropNum = function _getPropNum(target, prop, unit) {
  return parseFloat(target._gsap.get(target, prop, unit || "px")) || 0;
},
    _relativize = function _relativize(segment) {
  var x = segment[0],
      y = segment[1],
      i;

  for (i = 2; i < segment.length; i += 2) {
    x = segment[i] += x;
    y = segment[i + 1] += y;
  }
},
    _segmentToRawPath = function _segmentToRawPath(plugin, segment, target, x, y, slicer, vars) {
  if (vars.type === "cubic") {
    segment = [segment];
  } else {
    segment.unshift(_getPropNum(target, x, vars.unitX), y ? _getPropNum(target, y, vars.unitY) : 0);

    if (vars.relative) {
      _relativize(segment);
    }

    var pointFunc = y ? _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["pointsToSegment"] : _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["flatPointsToSegment"];
    segment = [pointFunc(segment, vars.curviness)];
  }

  segment = slicer(_align(segment, target, vars));

  _addDimensionalPropTween(plugin, target, x, segment, "x", vars.unitX);

  if (y) {
    _addDimensionalPropTween(plugin, target, y, segment, "y", vars.unitY);
  }

  return Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["cacheRawPathMeasurements"])(segment, vars.resolution || (vars.curviness === 0 ? 20 : 12)); //when curviness is 0, it creates control points right on top of the anchors which makes it more sensitive to resolution, thus we change the default accordingly.
},
    _emptyFunc = function _emptyFunc(v) {
  return v;
},
    _align = function _align(rawPath, target, _ref) {
  var align = _ref.align,
      matrix = _ref.matrix,
      offsetX = _ref.offsetX,
      offsetY = _ref.offsetY;
  var x, y, tween, targetMatrix, alignTarget, alignPath, alignMatrix, invertedMatrix, tx, ty;

  if (!rawPath || !rawPath.length) {
    return Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["getRawPath"])("M0,0L0,0");
  }

  if (align) {
    if (align === "self" || (alignTarget = _toArray(align)[0] || target) === target) {
      x = _getPropNum(target, "x") - rawPath[0][0];
      y = _getPropNum(target, "y") - rawPath[0][1];
      Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["transformRawPath"])(rawPath, 1, 0, 0, 1, x, y);
    } else {
      tween = gsap.to(target, {
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 0
      }).progress(1); //get rid of transforms, otherwise they'll throw off the measurements.

      targetMatrix = Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_1__["getGlobalMatrix"])(target); //we cannot use something like getScreenCTM() because of a major bug in Firefox that has existed for years and prevents values from being reported correctly when an ancestor element has transforms applied. Our proprietary getGlobalMatrix() works across all browsers.

      tween.render(-1).kill();

      if (alignTarget.getTotalLength && alignTarget.tagName.toLowerCase() === "path") {
        //path
        alignPath = Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["getRawPath"])(alignTarget);
        alignMatrix = Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_1__["getGlobalMatrix"])(alignTarget.parentNode);
        x = alignPath[0][0];
        y = alignPath[0][1];
      } else {
        alignMatrix = Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_1__["getGlobalMatrix"])(alignTarget);
        x = 0;
        y = 0;
      }

      tx = alignMatrix.a * x + alignMatrix.c * y + alignMatrix.e - targetMatrix.e;
      ty = alignMatrix.b * x + alignMatrix.d * y + alignMatrix.f - targetMatrix.f;
      invertedMatrix = Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_1__["getGlobalMatrix"])(target.parentNode, true);
      x = invertedMatrix.a * tx + invertedMatrix.c * ty;
      y = invertedMatrix.b * tx + invertedMatrix.d * ty;
      tx = rawPath[0][0];
      ty = rawPath[0][1];
      alignMatrix.multiply(invertedMatrix);
      x -= alignMatrix.a * tx + alignMatrix.c * ty;
      y -= alignMatrix.b * tx + alignMatrix.d * ty;
      Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["transformRawPath"])(rawPath, alignMatrix.a, alignMatrix.b, alignMatrix.c, alignMatrix.d, x, y);
    }
  }

  if (matrix) {
    Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["transformRawPath"])(rawPath, matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
  } else if (offsetX || offsetY) {
    Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["transformRawPath"])(rawPath, 1, 0, 0, 1, offsetX || 0, offsetY || 0);
  }

  return rawPath;
},
    _addDimensionalPropTween = function _addDimensionalPropTween(plugin, target, property, rawPath, pathProperty, forceUnit) {
  var cache = target._gsap,
      pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _emptyFunc, 0, cache.set(target, property, plugin));
  pt.u = _getUnit(cache.get(target, property, forceUnit)) || 0;
  pt.path = rawPath;
  pt.pp = pathProperty;

  plugin._props.push(property);
},
    _sliceModifier = function _sliceModifier(start, end) {
  return function (rawPath) {
    return start || end !== 1 ? Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["sliceRawPath"])(rawPath, start, end) : rawPath;
  };
};

var MotionPathPlugin = {
  version: "3.0.0",
  name: "motionPath",
  register: function register(core, Plugin, propTween) {
    gsap = core;
    _getUnit = gsap.utils.getUnit;
    _toArray = gsap.utils.toArray;
    PropTween = propTween;
  },
  init: function init(target, vars, tween, index, targets) {
    if (!gsap) {
      console.warn("Please gsap.registerPlugin(MotionPathPlugin)");
      return false;
    }

    if (!(typeof vars === "object" && !vars.style) || !vars.path) {
      vars = {
        path: vars
      };
    }

    var rawPaths = [],
        path = vars.path,
        firstObj = path[0],
        autoRotate = vars.autoRotate,
        slicer = _sliceModifier(vars.start, "end" in vars ? vars.end : 1),
        rawPath,
        p,
        x,
        y;

    this.rawPaths = rawPaths;
    this.target = target;

    if (this.rotate = autoRotate || autoRotate === 0) {
      //get the rotational data FIRST so that the setTransform() method is called in the correct order in the render() loop - rotation gets set last.
      this.rOffset = parseFloat(autoRotate) || 0;
      this.radians = !!vars.useRadians;
      this.rProp = vars.rotation || "rotation"; // rotation property

      this.rSet = target._gsap.set(target, this.rProp, this); // rotation setter

      this.ru = _getUnit(target._gsap.get(target, this.rProp)) || 0; // rotation units
    }

    if (Array.isArray(path) && !("closed" in path) && typeof firstObj !== "number") {
      for (p in firstObj) {
        if (~_xProps.indexOf(p)) {
          x = p;
        } else if (~_yProps.indexOf(p)) {
          y = p;
        }
      }

      if (x && y) {
        //correlated values
        rawPaths.push(_segmentToRawPath(this, _populateSegmentFromArray(_populateSegmentFromArray([], path, x, 0), path, y, 1), target, vars.x || x, vars.y || y, slicer, vars));
      } else {
        x = y = 0;
      }

      for (p in firstObj) {
        if (p !== x && p !== y) {
          rawPaths.push(_segmentToRawPath(this, _populateSegmentFromArray([], path, p, 0), target, p, 0, slicer, vars));
        }
      }
    } else {
      rawPath = slicer(_align(Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["getRawPath"])(vars.path), target, vars));
      Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["cacheRawPathMeasurements"])(rawPath, vars.resolution);
      rawPaths.push(rawPath);

      _addDimensionalPropTween(this, target, vars.x || "x", rawPath, "x", vars.unitX || "px");

      _addDimensionalPropTween(this, target, vars.y || "y", rawPath, "y", vars.unitY || "px");
    }
  },
  render: function render(ratio, data) {
    var rawPaths = data.rawPaths,
        i = rawPaths.length,
        pt = data._pt;

    if (ratio > 1) {
      ratio = 1;
    } else if (ratio < 0) {
      ratio = 0;
    }

    while (i--) {
      Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["getPositionOnPath"])(rawPaths[i], ratio, !i && data.rotate, rawPaths[i]);
    }

    while (pt) {
      pt.set(pt.t, pt.p, pt.path[pt.pp] + pt.u, pt.d, ratio);
      pt = pt._next;
    }

    if (data.rotate) {
      data.rSet(data.target, data.rProp, rawPaths[0].angle * (data.radians ? _DEG2RAD : 1) + data.rOffset + data.ru, data, ratio);
    }
  },
  getLength: function getLength(path) {
    return Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["cacheRawPathMeasurements"])(Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["getRawPath"])(path)).totalLength;
  },
  sliceRawPath: _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["sliceRawPath"],
  getRawPath: _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["getRawPath"],
  pointsToSegment: _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["pointsToSegment"],
  stringToRawPath: _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["stringToRawPath"],
  rawPathToString: _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["rawPathToString"],
  transformRawPath: _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["transformRawPath"],
  convertToPath: function convertToPath(targets, swap) {
    return _toArray(targets).map(function (target) {
      return Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["convertToPath"])(target, swap !== false);
    });
  },
  getGlobalMatrix: _utils_matrix_js__WEBPACK_IMPORTED_MODULE_1__["getGlobalMatrix"],
  arrayToRawPath: function arrayToRawPath(value, vars) {
    vars = vars || {};

    var segment = _populateSegmentFromArray(_populateSegmentFromArray([], value, vars.x || "x", 0), value, vars.y || "y", 1);

    if (vars.relative) {
      _relativize(segment);
    }

    return [vars.type === "cubic" ? segment : Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["pointsToSegment"])(segment, vars.curviness)];
  }
};
_getGSAP() && gsap.registerPlugin(MotionPathPlugin);


/***/ }),

/***/ "./node_modules/gsap/PixiPlugin.js":
/*!*****************************************!*\
  !*** ./node_modules/gsap/PixiPlugin.js ***!
  \*****************************************/
/*! exports provided: PixiPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PixiPlugin", function() { return PixiPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PixiPlugin; });
/*!
 * PixiPlugin 3.0.0
 * https://greensock.com
 *
 * @license Copyright 2008-2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var gsap,
    _win,
    _splitColor,
    _coreInitted,
    _PIXI,
    PropTween,
    _getSetter,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _getGSAP = function _getGSAP() {
  return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _warn = function _warn(message) {
  return console.warn(message);
},
    _idMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    _lumR = 0.212671,
    _lumG = 0.715160,
    _lumB = 0.072169,
    _applyMatrix = function _applyMatrix(m, m2) {
  var temp = [],
      i = 0,
      z = 0,
      y,
      x;

  for (y = 0; y < 4; y++) {
    for (x = 0; x < 5; x++) {
      z = x === 4 ? m[i + 4] : 0;
      temp[i + x] = m[i] * m2[x] + m[i + 1] * m2[x + 5] + m[i + 2] * m2[x + 10] + m[i + 3] * m2[x + 15] + z;
    }

    i += 5;
  }

  return temp;
},
    _setSaturation = function _setSaturation(m, n) {
  var inv = 1 - n,
      r = inv * _lumR,
      g = inv * _lumG,
      b = inv * _lumB;
  return _applyMatrix([r + n, g, b, 0, 0, r, g + n, b, 0, 0, r, g, b + n, 0, 0, 0, 0, 0, 1, 0], m);
},
    _colorize = function _colorize(m, color, amount) {
  var c = _splitColor(color),
      r = c[0] / 255,
      g = c[1] / 255,
      b = c[2] / 255,
      inv = 1 - amount;

  return _applyMatrix([inv + amount * r * _lumR, amount * r * _lumG, amount * r * _lumB, 0, 0, amount * g * _lumR, inv + amount * g * _lumG, amount * g * _lumB, 0, 0, amount * b * _lumR, amount * b * _lumG, inv + amount * b * _lumB, 0, 0, 0, 0, 0, 1, 0], m);
},
    _setHue = function _setHue(m, n) {
  n *= Math.PI / 180;
  var c = Math.cos(n),
      s = Math.sin(n);
  return _applyMatrix([_lumR + c * (1 - _lumR) + s * -_lumR, _lumG + c * -_lumG + s * -_lumG, _lumB + c * -_lumB + s * (1 - _lumB), 0, 0, _lumR + c * -_lumR + s * 0.143, _lumG + c * (1 - _lumG) + s * 0.14, _lumB + c * -_lumB + s * -0.283, 0, 0, _lumR + c * -_lumR + s * -(1 - _lumR), _lumG + c * -_lumG + s * _lumG, _lumB + c * (1 - _lumB) + s * _lumB, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], m);
},
    _setContrast = function _setContrast(m, n) {
  return _applyMatrix([n, 0, 0, 0, 0.5 * (1 - n), 0, n, 0, 0, 0.5 * (1 - n), 0, 0, n, 0, 0.5 * (1 - n), 0, 0, 0, 1, 0], m);
},
    _getFilter = function _getFilter(target, type) {
  var filterClass = _PIXI.filters[type],
      filters = target.filters || [],
      i = filters.length,
      filter;

  if (!filterClass) {
    _warn(type + " not found. PixiPlugin.registerPIXI(PIXI)");
  }

  while (--i > -1) {
    if (filters[i] instanceof filterClass) {
      return filters[i];
    }
  }

  filter = new filterClass();

  if (type === "BlurFilter") {
    filter.blur = 0;
  }

  filters.push(filter);
  target.filters = filters;
  return filter;
},
    _addColorMatrixFilterCacheTween = function _addColorMatrixFilterCacheTween(p, plugin, cache, vars) {
  //we cache the ColorMatrixFilter components in a _gsColorMatrixFilter object attached to the target object so that it's easy to grab the current value at any time.
  plugin.add(cache, p, cache[p], vars[p]);

  plugin._props.push(p);
},
    _applyBrightnessToMatrix = function _applyBrightnessToMatrix(brightness, matrix) {
  var temp = new _PIXI.filters.ColorMatrixFilter();
  temp.matrix = matrix;
  temp.brightness(brightness, true);
  return temp.matrix;
},
    _copy = function _copy(obj) {
  var copy = {},
      p;

  for (p in obj) {
    copy[p] = obj[p];
  }

  return copy;
},
    _CMFdefaults = {
  contrast: 1,
  saturation: 1,
  colorizeAmount: 0,
  colorize: "rgb(255,255,255)",
  hue: 0,
  brightness: 1
},
    _parseColorMatrixFilter = function _parseColorMatrixFilter(target, v, pg) {
  var filter = _getFilter(target, "ColorMatrixFilter"),
      cache = target._gsColorMatrixFilter = target._gsColorMatrixFilter || _copy(_CMFdefaults),
      combine = v.combineCMF && !("colorMatrixFilter" in v && !v.colorMatrixFilter),
      i,
      matrix,
      startMatrix;

  startMatrix = filter.matrix;

  if (v.resolution) {
    filter.resolution = v.resolution;
  }

  if (v.matrix && v.matrix.length === startMatrix.length) {
    matrix = v.matrix;

    if (cache.contrast !== 1) {
      _addColorMatrixFilterCacheTween("contrast", pg, cache, _CMFdefaults);
    }

    if (cache.hue) {
      _addColorMatrixFilterCacheTween("hue", pg, cache, _CMFdefaults);
    }

    if (cache.brightness !== 1) {
      _addColorMatrixFilterCacheTween("brightness", pg, cache, _CMFdefaults);
    }

    if (cache.colorizeAmount) {
      _addColorMatrixFilterCacheTween("colorize", pg, cache, _CMFdefaults);

      _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, _CMFdefaults);
    }

    if (cache.saturation !== 1) {
      _addColorMatrixFilterCacheTween("saturation", pg, cache, _CMFdefaults);
    }
  } else {
    matrix = _idMatrix.slice();

    if (v.contrast != null) {
      matrix = _setContrast(matrix, +v.contrast);

      _addColorMatrixFilterCacheTween("contrast", pg, cache, v);
    } else if (cache.contrast !== 1) {
      if (combine) {
        matrix = _setContrast(matrix, cache.contrast);
      } else {
        _addColorMatrixFilterCacheTween("contrast", pg, cache, _CMFdefaults);
      }
    }

    if (v.hue != null) {
      matrix = _setHue(matrix, +v.hue);

      _addColorMatrixFilterCacheTween("hue", pg, cache, v);
    } else if (cache.hue) {
      if (combine) {
        matrix = _setHue(matrix, cache.hue);
      } else {
        _addColorMatrixFilterCacheTween("hue", pg, cache, _CMFdefaults);
      }
    }

    if (v.brightness != null) {
      matrix = _applyBrightnessToMatrix(+v.brightness, matrix);

      _addColorMatrixFilterCacheTween("brightness", pg, cache, v);
    } else if (cache.brightness !== 1) {
      if (combine) {
        matrix = _applyBrightnessToMatrix(cache.brightness, matrix);
      } else {
        _addColorMatrixFilterCacheTween("brightness", pg, cache, _CMFdefaults);
      }
    }

    if (v.colorize != null) {
      v.colorizeAmount = "colorizeAmount" in v ? +v.colorizeAmount : 1;
      matrix = _colorize(matrix, v.colorize, v.colorizeAmount);

      _addColorMatrixFilterCacheTween("colorize", pg, cache, v);

      _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, v);
    } else if (cache.colorizeAmount) {
      if (combine) {
        matrix = _colorize(matrix, cache.colorize, cache.colorizeAmount);
      } else {
        _addColorMatrixFilterCacheTween("colorize", pg, cache, _CMFdefaults);

        _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, _CMFdefaults);
      }
    }

    if (v.saturation != null) {
      matrix = _setSaturation(matrix, +v.saturation);

      _addColorMatrixFilterCacheTween("saturation", pg, cache, v);
    } else if (cache.saturation !== 1) {
      if (combine) {
        matrix = _setSaturation(matrix, cache.saturation);
      } else {
        _addColorMatrixFilterCacheTween("saturation", pg, cache, _CMFdefaults);
      }
    }
  }

  i = matrix.length;

  while (--i > -1) {
    if (matrix[i] !== startMatrix[i]) {
      pg.add(startMatrix, i, startMatrix[i], matrix[i], "colorMatrixFilter");
    }
  }

  pg._props.push("colorMatrixFilter");
},
    _renderColor = function _renderColor(ratio, _ref) {
  var t = _ref.t,
      p = _ref.p,
      color = _ref.color,
      set = _ref.set;
  set(t, p, color[0] << 16 | color[1] << 8 | color[2]);
},
    _renderDirtyCache = function _renderDirtyCache(ratio, _ref2) {
  var g = _ref2.g;

  if (g) {
    //in order for PixiJS to actually redraw GraphicsData, we've gotta increment the "dirty" and "clearDirty" values. If we don't do this, the values will be tween properly, but not rendered.
    g.dirty++;
    g.clearDirty++;
  }
},
    _renderAutoAlpha = function _renderAutoAlpha(ratio, data) {
  data.t.visible = !!data.t.alpha;
},
    _addColorTween = function _addColorTween(target, p, value, plugin) {
  var currentValue = target[p],
      startColor = _splitColor(_isFunction(currentValue) ? target[p.indexOf("set") || !_isFunction(target["get" + p.substr(3)]) ? p : "get" + p.substr(3)]() : currentValue),
      endColor = _splitColor(value);

  plugin._pt = new PropTween(plugin._pt, target, p, 0, 0, _renderColor, {
    t: target,
    p: p,
    color: startColor,
    set: _getSetter(target, p)
  });
  plugin.add(startColor, 0, startColor[0], endColor[0]);
  plugin.add(startColor, 1, startColor[1], endColor[1]);
  plugin.add(startColor, 2, startColor[2], endColor[2]);
},
    _colorProps = {
  tint: 1,
  lineColor: 1,
  fillColor: 1
},
    _xyContexts = "position,scale,skew,pivot,anchor,tilePosition,tileScale".split(","),
    _contexts = {
  x: "position",
  y: "position",
  tileX: "tilePosition",
  tileY: "tilePosition"
},
    _colorMatrixFilterProps = {
  colorMatrixFilter: 1,
  saturation: 1,
  contrast: 1,
  hue: 1,
  colorize: 1,
  colorizeAmount: 1,
  brightness: 1,
  combineCMF: 1
},
    _DEG2RAD = Math.PI / 180,
    _degreesToRadians = function _degreesToRadians(value) {
  return typeof value === "string" && value.charAt(1) === "=" ? value.substr(0, 2) + parseFloat(value.substr(2)) * _DEG2RAD : value * _DEG2RAD;
},
    _initCore = function _initCore() {
  if (_windowExists()) {
    _win = window;
    gsap = _coreInitted = _getGSAP();
    _PIXI = _PIXI || _win.PIXI;
    _splitColor = gsap.utils.splitColor;
  }
},
    i,
    p; //context setup...


for (i = 0; i < _xyContexts.length; i++) {
  p = _xyContexts[i];
  _contexts[p + "X"] = p;
  _contexts[p + "Y"] = p;
}

var PixiPlugin = {
  version: "3.0.0",
  name: "pixi",
  register: function register(core, Plugin, propTween) {
    gsap = core;
    PropTween = propTween;
    _getSetter = Plugin.getSetter;

    _initCore();
  },
  registerPIXI: function registerPIXI(pixi) {
    _PIXI = pixi;
  },
  init: function init(target, values, tween, index, targets) {
    if (!_PIXI) {
      _initCore();
    }

    if (!target instanceof _PIXI.DisplayObject) {
      return false;
    }

    var isV4 = _PIXI.VERSION.charAt(0) === "4",
        context,
        axis,
        value,
        colorMatrix,
        filter,
        p,
        padding,
        i,
        data;

    for (p in values) {
      context = _contexts[p];
      value = values[p];

      if (context) {
        axis = ~p.charAt(p.length - 1).toLowerCase().indexOf("x") ? "x" : "y";
        this.add(target[context], axis, target[context][axis], context === "skew" ? _degreesToRadians(value) : value);
      } else if (p === "scale" || p === "anchor" || p === "pivot" || p === "tileScale") {
        this.add(target[p], "x", target[p].x, value);
        this.add(target[p], "y", target[p].y, value);
      } else if (p === "rotation") {
        //PIXI expects rotation in radians, but as a convenience we let folks define it in degrees and we do the conversion.
        this.add(target, p, target.rotation, _degreesToRadians(value));
      } else if (_colorMatrixFilterProps[p]) {
        if (!colorMatrix) {
          _parseColorMatrixFilter(target, values.colorMatrixFilter || values, this);

          colorMatrix = true;
        }
      } else if (p === "blur" || p === "blurX" || p === "blurY" || p === "blurPadding") {
        filter = _getFilter(target, "BlurFilter");
        this.add(filter, p, filter[p], value);

        if (values.blurPadding !== 0) {
          padding = values.blurPadding || Math.max(filter[p], value) * 2;
          i = target.filters.length;

          while (--i > -1) {
            target.filters[i].padding = Math.max(target.filters[i].padding, padding); //if we don't expand the padding on all the filters, it can look clipped.
          }
        }
      } else if (_colorProps[p]) {
        if ((p === "lineColor" || p === "fillColor") && target instanceof _PIXI.Graphics) {
          data = (target.geometry || target).graphicsData; //"geometry" was introduced in PIXI version 5

          this._pt = new PropTween(this._pt, target, p, 0, 0, _renderDirtyCache, {
            g: target.geometry || target
          });
          i = data.length;

          while (--i > -1) {
            _addColorTween(isV4 ? data[i] : data[i][p.substr(0, 4) + "Style"], isV4 ? p : "color", value, this);
          }
        } else {
          _addColorTween(target, p, value, this);
        }
      } else if (p === "autoAlpha") {
        this._pt = new PropTween(this._pt, target, "visible", 0, 0, _renderAutoAlpha);
        this.add(target, "alpha", target.alpha, value);

        this._props.push("alpha", "visible");
      } else {
        this.add(target, p, "get", value);
      }

      this._props.push(p);
    }
  }
};
_getGSAP() && gsap.registerPlugin(PixiPlugin);


/***/ }),

/***/ "./node_modules/gsap/ScrollToPlugin.js":
/*!*********************************************!*\
  !*** ./node_modules/gsap/ScrollToPlugin.js ***!
  \*********************************************/
/*! exports provided: ScrollToPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollToPlugin", function() { return ScrollToPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScrollToPlugin; });
/*!
 * ScrollToPlugin 3.0.0
 * https://greensock.com
 *
 * @license Copyright 2008-2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var gsap,
    _coreInitted,
    _window,
    _docEl,
    _body,
    _toArray,
    _config,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _getGSAP = function _getGSAP() {
  return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _max = function _max(element, axis) {
  var dim = axis === "x" ? "Width" : "Height",
      scroll = "scroll" + dim,
      client = "client" + dim;
  return element === _window || element === _docEl || element === _body ? Math.max(_docEl[scroll], _body[scroll]) - (_window["inner" + dim] || _docEl[client] || _body[client]) : element[scroll] - element["offset" + dim];
},
    _buildGetter = function _buildGetter(e, axis) {
  //pass in an element and an axis ("x" or "y") and it'll return a getter function for the scroll position of that element (like scrollTop or scrollLeft, although if the element is the window, it'll use the pageXOffset/pageYOffset or the documentElement's scrollTop/scrollLeft or document.body's. Basically this streamlines things and makes a very fast getter across browsers.
  var p = "scroll" + (axis === "x" ? "Left" : "Top");

  if (e === _window) {
    if (e.pageXOffset != null) {
      p = "page" + axis.toUpperCase() + "Offset";
    } else {
      e = _docEl[p] != null ? _docEl : _body;
    }
  }

  return function () {
    return e[p];
  };
},
    _getOffset = function _getOffset(element, container) {
  var rect = _toArray(element)[0].getBoundingClientRect(),
      isRoot = !container || container === _window || container === _body,
      cRect = isRoot ? {
    top: _docEl.clientTop - (_window.pageYOffset || _docEl.scrollTop || _body.scrollTop || 0),
    left: _docEl.clientLeft - (_window.pageXOffset || _docEl.scrollLeft || _body.scrollLeft || 0)
  } : container.getBoundingClientRect(),
      offsets = {
    x: rect.left - cRect.left,
    y: rect.top - cRect.top
  };

  if (!isRoot && container) {
    //only add the current scroll position if it's not the window/body.
    offsets.x += _buildGetter(container, "x")();
    offsets.y += _buildGetter(container, "y")();
  }

  return offsets;
},
    _parseVal = function _parseVal(value, target, axis, currentVal) {
  return !isNaN(value) ? parseFloat(value) : _isString(value) && value.charAt(1) === "=" ? parseFloat(value.substr(2)) * (value.charAt(0) === "-" ? -1 : 1) + currentVal : value === "max" ? _max(target, axis) : Math.min(_max(target, axis), _getOffset(value, target)[axis]);
},
    _initCore = function _initCore() {
  gsap = _getGSAP();

  if (_windowExists() && gsap) {
    _window = window;
    _body = document.body;
    _docEl = document.documentElement;
    _toArray = gsap.utils.toArray;
    gsap.config({
      autoKillThreshold: 7
    });
    _config = gsap.config();
    _coreInitted = 1;
  }
};

var ScrollToPlugin = {
  version: "3.0.0",
  name: "scrollTo",
  register: function register(core, Plugin, propTween) {
    gsap = core;

    _initCore();
  },
  init: function init(target, value, tween, index, targets) {
    if (!_coreInitted) {
      _initCore();
    }

    var data = this;
    data.isWin = target === _window;
    data.target = target;
    data.tween = tween;

    if (typeof value !== "object") {
      value = {
        y: value
      }; //if we don't receive an object as the parameter, assume the user intends "y".

      if (_isString(value.y) && value.y !== "max" && value.y.charAt(1) !== "=") {
        value.x = value.y;
      }
    } else if (value.nodeType) {
      value = {
        y: value,
        x: value
      };
    }

    data.vars = value;
    data.autoKill = !!value.autoKill;
    data.getX = _buildGetter(target, "x");
    data.getY = _buildGetter(target, "y");
    data.x = data.xPrev = data.getX();
    data.y = data.yPrev = data.getY();

    if (value.x != null) {
      data.add(data, "x", data.x, _parseVal(value.x, target, "x", data.x) - (value.offsetX || 0), index, targets, Math.round);

      data._props.push("scrollTo_x");
    } else {
      data.skipX = 1;
    }

    if (value.y != null) {
      data.add(data, "y", data.y, _parseVal(value.y, target, "y", data.y) - (value.offsetY || 0), index, targets, Math.round);

      data._props.push("scrollTo_y");
    } else {
      data.skipY = 1;
    }
  },
  render: function render(ratio, data) {
    var pt = data._pt,
        target = data.target,
        tween = data.tween,
        autoKill = data.autoKill,
        xPrev = data.xPrev,
        yPrev = data.yPrev,
        isWin = data.isWin,
        x,
        y,
        yDif,
        xDif,
        threshold;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    x = isWin || !data.skipX ? data.getX() : xPrev;
    y = isWin || !data.skipY ? data.getY() : yPrev;
    yDif = y - yPrev;
    xDif = x - xPrev;
    threshold = _config.autoKillThreshold;

    if (data.x < 0) {
      //can't scroll to a position less than 0! Might happen if someone uses a Back.easeOut or Elastic.easeOut when scrolling back to the top of the page (for example)
      data.x = 0;
    }

    if (data.y < 0) {
      data.y = 0;
    }

    if (autoKill) {
      //note: iOS has a bug that throws off the scroll by several pixels, so we need to check if it's within 7 pixels of the previous one that we set instead of just looking for an exact match.
      if (!data.skipX && (xDif > threshold || xDif < -threshold) && x < _max(target, "x")) {
        data.skipX = 1; //if the user scrolls separately, we should stop tweening!
      }

      if (!data.skipY && (yDif > threshold || yDif < -threshold) && y < _max(target, "y")) {
        data.skipY = 1; //if the user scrolls separately, we should stop tweening!
      }

      if (data.skipX && data.skipY) {
        tween.kill();

        if (data.vars.onAutoKill) {
          data.vars.onAutoKill.apply(tween, data.vars.onAutoKillParams || []);
        }
      }
    }

    if (isWin) {
      _window.scrollTo(!data.skipX ? data.x : x, !data.skipY ? data.y : y);
    } else {
      if (!data.skipY) {
        target.scrollTop = data.y;
      }

      if (!data.skipX) {
        target.scrollLeft = data.x;
      }
    }

    data.xPrev = data.x;
    data.yPrev = data.y;
  },
  kill: function kill(property) {
    var both = property === "scrollTo";

    if (both || property === "scrollTo_x") {
      this.skipX = 1;
    }

    if (both || property === "scrollTo_y") {
      this.skipY = 1;
    }
  }
};
ScrollToPlugin.max = _max;
ScrollToPlugin.getOffset = _getOffset;
ScrollToPlugin.buildGetter = _buildGetter;
_getGSAP() && gsap.registerPlugin(ScrollToPlugin);


/***/ }),

/***/ "./node_modules/gsap/TextPlugin.js":
/*!*****************************************!*\
  !*** ./node_modules/gsap/TextPlugin.js ***!
  \*****************************************/
/*! exports provided: TextPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextPlugin", function() { return TextPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextPlugin; });
/* harmony import */ var _utils_strings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/strings.js */ "./node_modules/gsap/utils/strings.js");
/*!
 * TextPlugin 3.0.0
 * https://greensock.com
 *
 * @license Copyright 2008-2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */


var gsap,
    _getGSAP = function _getGSAP() {
  return gsap || typeof window !== "undefined" && (gsap = window.gsap) && gsap.registerPlugin && gsap;
};

var TextPlugin = {
  version: "3.0.0",
  name: "text",
  init: function init(target, value, tween) {
    var i = target.nodeName.toUpperCase(),
        data = this,
        _short;

    data.svg = target.getBBox && (i === "TEXT" || i === "TSPAN");

    if (!("innerHTML" in target) && !data.svg) {
      return false;
    }

    data.target = target;

    if (typeof value !== "object") {
      value = {
        value: value
      };
    }

    if (!("value" in value)) {
      data.text = data.original = [""];
      return;
    }

    data.delimiter = value.delimiter || "";
    data.original = Object(_utils_strings_js__WEBPACK_IMPORTED_MODULE_0__["emojiSafeSplit"])(Object(_utils_strings_js__WEBPACK_IMPORTED_MODULE_0__["getText"])(target).replace(/\s+/g, " "), data.delimiter);
    data.text = Object(_utils_strings_js__WEBPACK_IMPORTED_MODULE_0__["emojiSafeSplit"])(value.value.replace(/\s+/g, " "), data.delimiter);
    data.from = tween._from;

    if (data.from) {
      i = data.original;
      data.original = data.text;
      data.text = i;
    }

    data.hasClass = !!(value.newClass || value.oldClass);
    data.newClass = value.newClass;
    data.oldClass = value.oldClass;
    i = data.original.length - data.text.length;
    _short = i < 0 ? data.original : data.text;
    data.fillChar = value.fillChar || (value.padSpace ? "&nbsp;" : "");

    if (i < 0) {
      i = -i;
    }

    while (--i > -1) {
      _short.push(data.fillChar);
    }

    this._props.push("text");
  },
  render: function render(ratio, data) {
    if (ratio > 1) {
      ratio = 1;
    } else if (ratio < 0) {
      ratio = 0;
    }

    if (data.from) {
      ratio = 1 - ratio;
    }

    var text = data.text,
        hasClass = data.hasClass,
        newClass = data.newClass,
        oldClass = data.oldClass,
        delimiter = data.delimiter,
        target = data.target,
        fillChar = data.fillChar,
        original = data.original,
        l = text.length,
        i = ratio * l + 0.5 | 0,
        applyNew,
        applyOld,
        str;

    if (hasClass) {
      applyNew = newClass && i;
      applyOld = oldClass && i !== l;
      str = (applyNew ? "<span class='" + newClass + "'>" : "") + text.slice(0, i).join(delimiter) + (applyNew ? "</span>" : "") + (applyOld ? "<span class='" + oldClass + "'>" : "") + delimiter + original.slice(i).join(delimiter) + (applyOld ? "</span>" : "");
    } else {
      str = text.slice(0, i).join(delimiter) + delimiter + original.slice(i).join(delimiter);
    }

    if (data.svg) {
      //SVG text elements don't have an "innerHTML" in Microsoft browsers.
      target.textContent = str;
    } else {
      target.innerHTML = fillChar === "&nbsp;" && ~str.indexOf("  ") ? str.split("  ").join("&nbsp;&nbsp;") : str;
    }
  }
};
TextPlugin.emojiSafeSplit = _utils_strings_js__WEBPACK_IMPORTED_MODULE_0__["emojiSafeSplit"];
TextPlugin.getText = _utils_strings_js__WEBPACK_IMPORTED_MODULE_0__["getText"];
_getGSAP() && gsap.registerPlugin(TextPlugin);


/***/ }),

/***/ "./node_modules/gsap/all.js":
/*!**********************************!*\
  !*** ./node_modules/gsap/all.js ***!
  \**********************************/
/*! exports provided: gsap, default, CSSPlugin, TweenMax, TweenLite, TimelineMax, TimelineLite, Power0, Power1, Power2, Power3, Power4, Linear, Quad, Cubic, Quart, Quint, Strong, Elastic, Back, SteppedEase, Bounce, Sine, Expo, Circ, wrap, wrapYoyo, distribute, random, snap, normalize, getUnit, clamp, splitColor, toArray, mapRange, pipe, unitize, interpolate, Draggable, CSSRulePlugin, EaselPlugin, SlowMo, ExpoScaleEase, RoughEase, EasePack, MotionPathPlugin, PixiPlugin, ScrollToPlugin, TextPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gsap", function() { return gsapWithCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return gsapWithCSS; });
/* harmony import */ var _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gsap-core.js */ "./node_modules/gsap/gsap-core.js");
/* harmony import */ var _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CSSPlugin.js */ "./node_modules/gsap/CSSPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CSSPlugin", function() { return _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TweenMax", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["TweenMax"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TweenLite", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["TweenLite"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimelineMax", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["TimelineMax"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimelineLite", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["TimelineLite"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power0", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Power0"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power1", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Power1"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power2", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Power2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power3", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Power3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power4", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Power4"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Linear", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Linear"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Quad", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Quad"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cubic", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Cubic"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Quart", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Quart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Quint", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Quint"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Strong", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Strong"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Elastic", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Elastic"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Back", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Back"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SteppedEase", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["SteppedEase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bounce", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Bounce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sine", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Sine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Expo", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Expo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Circ", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Circ"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["wrap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrapYoyo", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["wrapYoyo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distribute", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["distribute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "random", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["random"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "snap", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["snap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["normalize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getUnit", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["getUnit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["clamp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "splitColor", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["splitColor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["toArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapRange", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["mapRange"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["pipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unitize", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["unitize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolate", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["interpolate"]; });

/* harmony import */ var _Draggable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Draggable.js */ "./node_modules/gsap/Draggable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Draggable", function() { return _Draggable_js__WEBPACK_IMPORTED_MODULE_2__["Draggable"]; });

/* harmony import */ var _CSSRulePlugin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CSSRulePlugin.js */ "./node_modules/gsap/CSSRulePlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CSSRulePlugin", function() { return _CSSRulePlugin_js__WEBPACK_IMPORTED_MODULE_3__["CSSRulePlugin"]; });

/* harmony import */ var _EaselPlugin_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EaselPlugin.js */ "./node_modules/gsap/EaselPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EaselPlugin", function() { return _EaselPlugin_js__WEBPACK_IMPORTED_MODULE_4__["EaselPlugin"]; });

/* harmony import */ var _EasePack_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EasePack.js */ "./node_modules/gsap/EasePack.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SlowMo", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_5__["SlowMo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExpoScaleEase", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_5__["ExpoScaleEase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RoughEase", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_5__["RoughEase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EasePack", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_5__["EasePack"]; });

/* harmony import */ var _MotionPathPlugin_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MotionPathPlugin.js */ "./node_modules/gsap/MotionPathPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MotionPathPlugin", function() { return _MotionPathPlugin_js__WEBPACK_IMPORTED_MODULE_6__["MotionPathPlugin"]; });

/* harmony import */ var _PixiPlugin_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PixiPlugin.js */ "./node_modules/gsap/PixiPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PixiPlugin", function() { return _PixiPlugin_js__WEBPACK_IMPORTED_MODULE_7__["PixiPlugin"]; });

/* harmony import */ var _ScrollToPlugin_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ScrollToPlugin.js */ "./node_modules/gsap/ScrollToPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScrollToPlugin", function() { return _ScrollToPlugin_js__WEBPACK_IMPORTED_MODULE_8__["ScrollToPlugin"]; });

/* harmony import */ var _TextPlugin_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TextPlugin.js */ "./node_modules/gsap/TextPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextPlugin", function() { return _TextPlugin_js__WEBPACK_IMPORTED_MODULE_9__["TextPlugin"]; });



var gsapWithCSS = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["default"].registerPlugin(_CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__["default"]) || _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["default"]; // to protect from tree shaking










 

//BONUS EXPORTS
//export * from "./CustomEase.js";
//export * from "./DrawSVGPlugin.js";
//export * from "./Physics2DPlugin.js";
//export * from "./PhysicsPropsPlugin.js";
//export * from "./ScrambleTextPlugin.js";
//export * from "./CustomBounce.js";
//export * from "./CustomWiggle.js";
//export * from "./GSDevTools.js";
//export * from "./InertiaPlugin.js";
//export * from "./MorphSVGPlugin.js";
//export * from "./MotionPathHelper.js";
//export * from "./SplitText.js";

/***/ }),

/***/ "./node_modules/gsap/gsap-core.js":
/*!****************************************!*\
  !*** ./node_modules/gsap/gsap-core.js ***!
  \****************************************/
/*! exports provided: GSCache, Animation, Timeline, Tween, PropTween, gsap, Power0, Power1, Power2, Power3, Power4, Linear, Quad, Cubic, Quart, Quint, Strong, Elastic, Back, SteppedEase, Bounce, Sine, Expo, Circ, TweenMax, TweenLite, TimelineMax, TimelineLite, default, wrap, wrapYoyo, distribute, random, snap, normalize, getUnit, clamp, splitColor, toArray, mapRange, pipe, unitize, interpolate, _getProperty, _numExp, _isString, _isUndefined, _renderComplexString, _relExp, _setDefaults, _removeLinkedListItem, _forEachName, _sortPropTweensByPriority, _colorStringFilter, _replaceRandom, _checkPlugin, _plugins, _ticker, _config, _roundModifier, _round, _missingPlugin, _getSetter, _getCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GSCache", function() { return GSCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timeline", function() { return Timeline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tween", function() { return Tween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropTween", function() { return PropTween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gsap", function() { return gsap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Power0", function() { return Power0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Power1", function() { return Power1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Power2", function() { return Power2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Power3", function() { return Power3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Power4", function() { return Power4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Linear", function() { return Linear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Quad", function() { return Quad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cubic", function() { return Cubic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Quart", function() { return Quart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Quint", function() { return Quint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Strong", function() { return Strong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Elastic", function() { return Elastic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Back", function() { return Back; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SteppedEase", function() { return SteppedEase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bounce", function() { return Bounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sine", function() { return Sine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Expo", function() { return Expo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Circ", function() { return Circ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TweenMax", function() { return Tween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TweenLite", function() { return Tween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineMax", function() { return Timeline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineLite", function() { return Timeline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return gsap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return wrap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapYoyo", function() { return wrapYoyo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distribute", function() { return distribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "snap", function() { return snap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUnit", function() { return getUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitColor", function() { return splitColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return toArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapRange", function() { return mapRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return pipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unitize", function() { return unitize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolate", function() { return interpolate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getProperty", function() { return _getProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_numExp", function() { return _numExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_isString", function() { return _isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_isUndefined", function() { return _isUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_renderComplexString", function() { return _renderComplexString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_relExp", function() { return _relExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_setDefaults", function() { return _setDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_removeLinkedListItem", function() { return _removeLinkedListItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_forEachName", function() { return _forEachName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_sortPropTweensByPriority", function() { return _sortPropTweensByPriority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_colorStringFilter", function() { return _colorStringFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_replaceRandom", function() { return _replaceRandom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_checkPlugin", function() { return _checkPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_plugins", function() { return _plugins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ticker", function() { return _ticker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_config", function() { return _config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_roundModifier", function() { return _roundModifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_round", function() { return _round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_missingPlugin", function() { return _missingPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getSetter", function() { return _getSetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getCache", function() { return _getCache; });
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*!
 * GSAP 3.0.1
 * https://greensock.com
 *
 * @license Copyright 2008-2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
},
    _defaults = {
  duration: .5,
  overwrite: false,
  delay: 0
},
    _bigNum = 1e8,
    _tinyNum = 1 / _bigNum,
    _2PI = Math.PI * 2,
    _HALF_PI = _2PI / 4,
    _gsID = 0,
    _sqrt = Math.sqrt,
    _cos = Math.cos,
    _sin = Math.sin,
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _isObject = function _isObject(value) {
  return typeof value === "object";
},
    _isNotFalse = function _isNotFalse(value) {
  return value !== false;
},
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _isFuncOrString = function _isFuncOrString(value) {
  return _isFunction(value) || _isString(value);
},
    _isArray = Array.isArray,
    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
    //only numbers (including negatives and decimals) but NOT relative values.
_numExp = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
    //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
_complexStringNumExp = /[-+=\.]*\d+(?:\.|e-|e)*\d*/gi,
    //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
_parenthesesExp = /\(([^()]+)\)/i,
    //finds the string between parentheses.
_relExp = /[\+-]=-?[\.\d]+/,
    _delimitedValueExp = /[#\-+\.]*\b[a-z\d-=+%.]+/gi,
    _globalTimeline,
    _win,
    _coreInitted,
    _doc,
    _globals = {},
    _installScope = {},
    _coreReady,
    _install = function _install(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap;
},
    _missingPlugin = function _missingPlugin(property, value) {
  return console.warn("Invalid", property, "tween of", value, "Missing plugin? gsap.registerPlugin()");
},
    _warn = function _warn(message, suppress) {
  return !suppress && console.warn(message);
},
    _addGlobal = function _addGlobal(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
},
    _emptyFunc = function _emptyFunc() {
  return 0;
},
    _reservedProps = {},
    _lazyTweens = [],
    _lazyLookup = {},
    _plugins = {},
    _effects = {},
    _nextGCFrame = 30,
    _harnessPlugins = [],
    _callbackNames = "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
    _harness = function _harness(targets) {
  var target = targets[0],
      harnessPlugin,
      i;

  if (!_isObject(target) && !_isFunction(target)) {
    return _isArray(targets) ? targets : [targets];
  }

  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    i = _harnessPlugins.length;

    while (i-- && !_harnessPlugins[i].targetTest(target)) {}

    harnessPlugin = _harnessPlugins[i];
  }

  i = targets.length;

  while (i--) {
    targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin));
  }

  return targets;
},
    _getCache = function _getCache(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
},
    _getProperty = function _getProperty(target, property) {
  var currentValue = target[property];
  return _isFunction(currentValue) ? target[property]() : _isUndefined(currentValue) && target.getAttribute(property) || currentValue;
},
    _forEachName = function _forEachName(names, func) {
  return (names = names.split(",")).forEach(func) || names;
},
    //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
_round = function _round(value) {
  return Math.round(value * 10000) / 10000;
},
    _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
  //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
  var l = toFind.length,
      i = 0;

  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

  return i < l;
},
    _parseVars = function _parseVars(params, type, parent) {
  //reads the arguments passed to one of the key methods and figures out if the user is defining things with the OLD/legacy syntax where the duration is the 2nd parameter, and then it adjusts things accordingly and spits back the corrected vars object (with the duration added if necessary, as well as runBackwards or startAt or immediateRender). type 0 = to()/staggerTo(), 1 = from()/staggerFrom(), 2 = fromTo()/staggerFromTo()
  var isLegacy = _isNumber(params[1]),
      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
      vars = params[varsIndex],
      i;

  if (isLegacy) {
    vars.duration = params[1];
  }

  if (type === 1) {
    vars.runBackwards = 1;
    vars.immediateRender = _isNotFalse(vars.immediateRender);
  } else if (type === 2) {
    i = params[varsIndex - 1]; //"from" vars

    vars.startAt = i;
    vars.immediateRender = _isNotFalse(vars.immediateRender);
  }

  vars.parent = parent;
  return vars;
},
    _lazyRender = function _lazyRender() {
  var l = _lazyTweens.length,
      a = _lazyTweens.slice(0),
      i,
      tween;

  _lazyLookup = {};
  _lazyTweens.length = 0;

  for (i = 0; i < l; i++) {
    tween = a[i];

    if (tween && tween._lazy) {
      tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0;
    }
  }
},
    _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
  if (_lazyTweens.length) {
    _lazyRender();
  }

  animation.render(time, suppressEvents, force);

  if (_lazyTweens.length) {
    //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
    _lazyRender();
  }
},
    _numericIfPossible = function _numericIfPossible(value) {
  var n = parseFloat(value);
  return n || n === 0 ? n : value;
},
    _passThrough = function _passThrough(p) {
  return p;
},
    _setDefaults = function _setDefaults(obj, defaults) {
  for (var p in defaults) {
    if (!(p in obj)) {
      obj[p] = defaults[p];
    }
  }

  return obj;
},
    _setKeyframeDefaults = function _setKeyframeDefaults(obj, defaults) {
  for (var p in defaults) {
    if (!(p in obj) && p !== "duration" && p !== "ease") {
      obj[p] = defaults[p];
    }
  }
},
    _merge = function _merge(base, toMerge) {
  for (var p in toMerge) {
    base[p] = toMerge[p];
  }

  return base;
},
    _mergeDeep = function _mergeDeep(base, toMerge) {
  for (var p in toMerge) {
    base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p];
  }

  return base;
},
    _copyExcluding = function _copyExcluding(obj, excluding) {
  var copy = {},
      p;

  for (p in obj) {
    if (!(p in excluding)) {
      copy[p] = obj[p];
    }
  }

  return copy;
},
    _inheritDefaults = function _inheritDefaults(vars) {
  var parent = vars.parent || _globalTimeline,
      func = vars.keyframes ? _setKeyframeDefaults : _setDefaults;

  if (_isNotFalse(vars.inherit)) {
    while (parent) {
      func(vars, parent.vars.defaults);
      parent = parent.parent;
    }
  }

  return vars;
},
    _arraysMatch = function _arraysMatch(a1, a2) {
  var i = a1.length,
      match = i === a2.length;

  while (match && i-- && a1[i] === a2[i]) {}

  return i < 0;
},
    _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = parent[lastProp],
      t;

  if (sortBy) {
    t = child[sortBy];

    while (prev && prev[sortBy] > t) {
      prev = prev._prev;
    }
  }

  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }

  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }

  child._prev = prev;
  child.parent = parent;
  return child;
},
    _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = child._prev,
      next = child._next;

  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }

  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }

  child._dp = parent; //record the parent as _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.

  child._next = child._prev = child.parent = null;
},
    _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
  if (child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren)) {
    child.parent.remove(child);
  }

  child._act = 0;
},
    _uncache = function _uncache(animation) {
  var a = animation;

  while (a) {
    a._dirty = 1;
    a = a.parent;
  }

  return animation;
},
    _recacheAncestors = function _recacheAncestors(animation) {
  var parent = animation.parent;

  while (parent && parent.parent) {
    //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }

  return animation;
},
    _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
},
    _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
  var cycleDuration;
  return animation._repeat ? (cycleDuration = animation.duration() + animation._rDelay) * ~~(animation._tTime / cycleDuration) : 0;
},
    _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
  return child._ts > 0 ? (parentTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (parentTime - child._start) * child._ts;
},

/*
_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	let cycleDuration = duration + repeatDelay,
		time = _round(clampedTotalTime % cycleDuration);
	if (time > duration) {
		time = duration;
	}
	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
},
*/
_addToTimeline = function _addToTimeline(timeline, child, position) {
  child.parent && _removeFromParent(child);
  child._start = position + child._delay;
  child._end = child._start + (child.totalDuration() / child._ts || 0);

  _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

  timeline._recent = child;

  if (child._time || !child._dur && child._initted) {
    //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
    var curTime = (timeline.rawTime() - child._start) * child._ts;

    if (!child._dur || _clamp(0, child.totalDuration(), curTime) - child._tTime > _tinyNum) {
      child.render(curTime, true);
    }
  }

  _uncache(timeline); //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


  if (timeline._dp && timeline._time >= timeline._dur && timeline._ts && timeline._dur < timeline.duration()) {
    //in case any of the ancestors had completed but should now be enabled...
    var tl = timeline;

    while (tl._dp) {
      tl.totalTime(tl._tTime, true); //moves the timeline (shifts its startTime) if necessary, and also enables it.

      tl = tl._dp;
    }
  }

  return timeline;
},
    _attemptInitTween = function _attemptInitTween(tween, totalTime, force, suppressEvents) {
  _initTween(tween, totalTime);

  if (!tween._initted) {
    return 1;
  }

  if (!force && tween._pt && tween.vars.lazy) {
    _lazyTweens.push(tween);

    tween._lazy = [totalTime, suppressEvents];
    return 1;
  }
},
    _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween._zTime < 0 ? 0 : 1,
      ratio = totalTime < 0 ? 0 : 1,
      repeatDelay = tween._rDelay,
      tTime = 0,
      pt,
      iteration,
      prevIteration;

  if (repeatDelay && tween._repeat) {
    //in case there's a zero-duration tween that has a repeat with a repeatDelay
    tTime = _clamp(0, tween._tDur, totalTime);
    iteration = ~~(tTime / repeatDelay);

    if (iteration && iteration === tTime / repeatDelay) {
      iteration--;
    }

    prevIteration = ~~(tween._tTime / repeatDelay);

    if (prevIteration && prevIteration === tween._tTime / repeatDelay) {
      prevIteration--;
    }

    if (iteration !== prevIteration) {
      prevRatio = 1 - ratio;

      if (tween.vars.repeatRefresh) {
        tween.invalidate();
      }
    }
  }

  if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
    //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
    return;
  }

  if (ratio !== prevRatio || force) {
    if (!suppressEvents || totalTime) {
      //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.
      tween._zTime = totalTime;
    }

    tween.ratio = ratio;

    if (tween._from) {
      ratio = 1 - ratio;
    }

    tween._time = 0;
    tween._tTime = tTime;

    if (!suppressEvents) {
      _callback(tween, "onStart");
    }

    pt = tween._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    if (!ratio && tween._startAt && !tween._onUpdate && tween._start) {
      //if the tween is positioned at the VERY beginning (_start 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
      tween._startAt.render(totalTime, true, force);
    }

    if (tween._onUpdate && !suppressEvents) {
      _callback(tween, "onUpdate");
    }

    if (tTime && tween._repeat && !suppressEvents && tween.parent) {
      _callback(tween, "onRepeat");
    }

    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      tween.ratio && _removeFromParent(tween, 1);

      if (!suppressEvents) {
        _callback(tween, tween.ratio ? "onComplete" : "onReverseComplete", true);

        tween._prom && tween.ratio && tween._prom();
      }
    }
  }
},
    _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
  var child;

  if (time > prevTime) {
    child = animation._first;

    while (child && child._start <= time) {
      if (!child._dur && child.data === "isPause" && child._start > prevTime) {
        return child;
      }

      child = child._next;
    }
  } else {
    child = animation._last;

    while (child && child._start >= time) {
      if (!child._dur && child.data === "isPause" && child._start < prevTime) {
        return child;
      }

      child = child._prev;
    }
  }
},
    _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
  if (animation instanceof Timeline) {
    return _uncache(animation);
  }

  var repeat = animation._repeat;
  animation._tDur = !repeat ? animation._dur : repeat < 0 ? 1e20 : _round(animation._dur * (repeat + 1) + animation._rDelay * repeat);

  _uncache(animation.parent); //if the tween's duration changed, the parent timeline's duration may have changed, so flag it as "dirty"


  return animation;
},
    _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc
},
    _parsePosition = function _parsePosition(animation, position, useBuildFrom) {
  var labels = animation.labels,
      recent = animation._recent || _zeroPosition,
      clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
  //buildFrom = useBuildFrom ? animation._build : "auto",
  i,
      offset;

  if (_isString(position) && (isNaN(position) || position in labels)) {
    //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
    i = position.charAt(0);

    if (i === "<" || i === ">") {
      return (i === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0);
    }

    i = position.indexOf("=");

    if (i < 0) {
      if (!(position in labels)) {
        labels[position] = clippedDuration;
      }

      return labels[position];
    }

    offset = +(position.charAt(i - 1) + position.substr(i + 1));
    return i > 1 ? _parsePosition(animation, position.substr(0, i - 1)) + offset : clippedDuration + offset;
  }

  return position == null ? clippedDuration : +position; //return (position == null) ? (isNaN(buildFrom) ? clippedDuration : buildFrom) : (buildFrom === ">>" ? clippedDuration : +buildFrom || 0) + (+position);
},
    _conditionalReturn = function _conditionalReturn(value, func) {
  return value || value === 0 ? func(value) : func;
},
    _clamp = function _clamp(min, max, value) {
  return value < min ? min : value > max ? max : value;
},
    getUnit = function getUnit(value) {
  return (value + "").substr((parseFloat(value) + "").length);
},
    clamp = function clamp(min, max, value) {
  return _conditionalReturn(value, function (v) {
    return _clamp(min, max, v);
  });
},
    _slice = [].slice,
    _isArrayLike = function _isArrayLike(value) {
  return _isObject(value) && "length" in value && value.length - 1 in value && _isObject(value[0]) && value !== _win;
},
    _flatten = function _flatten(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }

  return ar.forEach(function (value) {
    var _accumulator;

    return _isString(value) && !leaveStrings || _isArrayLike(value) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
},
    toArray = function toArray(value, leaveStrings) {
  //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
  return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call(_doc.querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
},
    //for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
distribute = function distribute(v) {
  if (_isFunction(v)) {
    return v;
  }

  var vars = _isObject(v) ? v : {
    each: v
  },
      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
  ease = _parseEase(vars.ease),
      from = vars.from || 0,
      base = parseFloat(vars.base) || 0,
      cache = {},
      isDecimal = from > 0 && from < 1,
      ratios = isNaN(from) || isDecimal,
      axis = vars.axis,
      ratioX = from,
      ratioY = from;

  if (_isString(from)) {
    ratioX = ratioY = {
      center: .5,
      edges: .5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }

  return function (i, target, a) {
    var l = (a || vars).length,
        distances = cache[l],
        originX,
        originY,
        x,
        y,
        d,
        j,
        max,
        min,
        wrapAt;

    if (!distances) {
      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

      if (!wrapAt) {
        max = -_bigNum;

        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

        wrapAt--;
      }

      distances = cache[l] = [];
      originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
      originY = ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum;

      for (j = 0; j < l; j++) {
        x = j % wrapAt - originX;
        y = originY - (j / wrapAt | 0);
        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);

        if (d > max) {
          max = d;
        }

        if (d < min) {
          min = d;
        }
      }

      distances.max = max - min;
      distances.min = min;
      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l < 0 ? base - l : base;
      distances.u = getUnit(vars.amount || vars.each) || 0; //unit

      ease = ease && l < 0 ? _invertEase(ease) : ease;
    }

    l = (distances[i] - distances.min) / distances.max || 0;
    return _round(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
  };
},
    _roundModifier = function _roundModifier(v) {
  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
  var p = v < 1 ? Math.pow(10, (v + "").length - 2) : 1; //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed()

  return function (raw) {
    return ~~(Math.round(parseFloat(raw) / v) * v * p) / p + (_isNumber(raw) ? 0 : getUnit(raw));
  };
},
    snap = function snap(snapTo, value) {
  var isArray = _isArray(snapTo),
      radius,
      is2D;

  if (!isArray && _isObject(snapTo)) {
    radius = isArray = snapTo.radius || _bigNum;
    snapTo = toArray(snapTo.values);

    if (is2D = !_isNumber(snapTo[0])) {
      radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
    }
  }

  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : function (raw) {
    var x = parseFloat(is2D ? raw.x : raw),
        y = parseFloat(is2D ? raw.y : 0),
        min = _bigNum,
        closest = 0,
        i = snapTo.length,
        dx,
        dy;

    while (i--) {
      if (is2D) {
        dx = snapTo[i].x - x;
        dy = snapTo[i].y - y;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i] - x);
      }

      if (dx < min) {
        min = dx;
        closest = i;
      }
    }

    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
  });
},
    random = function random(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : !returnFunction, function () {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && ~~(Math.round((min + Math.random() * (max - min)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
},
    pipe = function pipe() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (value) {
    return functions.reduce(function (v, f) {
      return f(v);
    }, value);
  };
},
    unitize = function unitize(func, unit) {
  return function (value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
},
    normalize = function normalize(min, max, value) {
  return mapRange(min, max, 0, 1, value);
},
    _wrapArray = function _wrapArray(a, wrapper, value) {
  return _conditionalReturn(value, function (index) {
    return a[~~wrapper(index)];
  });
},
    wrap = function wrap(min, max, value) {
  // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
    return (range + (value - min) % range) % range + min;
  });
},
    wrapYoyo = function wrapYoyo(min, max, value) {
  var range = max - min,
      total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
    value = (total + (value - min) % total) % total;
    return min + (value > range ? total - value : value);
  });
},
    _replaceRandom = function _replaceRandom(value) {
  //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
  var prev = 0,
      s = "",
      i,
      nums,
      end,
      isArray;

  while (~(i = value.indexOf("random(", prev))) {
    end = value.indexOf(")", i);
    isArray = value.charAt(i + 7) === "[";
    nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
    s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], +nums[1], +nums[2] || 1e-5);
    prev = end + 1;
  }

  return s + value.substr(prev, value.length - prev);
},
    mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
  var inRange = inMax - inMin,
      outRange = outMax - outMin;
  return _conditionalReturn(value, function (value) {
    return outMin + (value - inMin) / inRange * outRange;
  });
},
    interpolate = function interpolate(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function (p) {
    return (1 - p) * start + p * end;
  };

  if (!func) {
    var isString = _isString(start),
        master = {},
        p,
        i,
        interpolators,
        l,
        il;

    progress === true && (mutate = 1) && (progress = null);

    if (isString) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l = start.length;
      il = l - 2;

      for (i = 1; i < l; i++) {
        interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
      }

      l--;

      func = function func(p) {
        p *= l;
        var i = Math.min(il, ~~p);
        return interpolators[i](p - i);
      };

      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }

    if (!interpolators) {
      for (p in end) {
        _addPropTween.call(master, start, p, "get", end[p]);
      }

      func = function func(p) {
        return _renderPropTweens(p, master) || (isString ? start.p : start);
      };
    }
  }

  return _conditionalReturn(progress, func);
},
    _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
  //used for nextLabel() and previousLabel()
  var labels = timeline.labels,
      min = _bigNum,
      p,
      distance,
      label;

  for (p in labels) {
    distance = labels[p] - fromTime;

    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p;
      min = distance;
    }
  }

  return label;
},
    _callback = function _callback(animation, type, executeLazyFirst) {
  var v = animation.vars,
      callback = v[type],
      params,
      scope;

  if (!callback) {
    return;
  }

  params = v[type + "Params"];
  scope = v.callbackScope || animation;

  if (executeLazyFirst && _lazyTweens.length) {
    //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
    _lazyRender();
  }

  return params ? callback.apply(scope, params) : callback.call(scope, animation);
},
    _interrupt = function _interrupt(animation) {
  _removeFromParent(animation);

  if (animation.progress() < 1) {
    _callback(animation, "onInterrupt");
  }

  return animation;
},
    _quickTween,
    _createPlugin = function _createPlugin(config) {
  config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

  var name = config.name,
      isFunc = _isFunction(config),
      Plugin = name && !isFunc && config.init ? function () {
    this._props = [];
  } : config,
      //in case someone passes in an object that's not a plugin, like CustomEase
  instanceDefaults = {
    init: _emptyFunc,
    render: _renderPropTweens,
    add: _addPropTween,
    kill: _killPropTweensOf,
    modifier: _addPluginModifier,
    rawVars: 0
  },
      statics = {
    targetTest: 0,
    get: 0,
    getSetter: _getSetter,
    aliases: {},
    register: 0
  };

  _wake();

  if (config !== Plugin) {
    if (_plugins[name]) {
      return;
    }

    _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods


    _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


    _plugins[Plugin.prop = name] = Plugin;

    if (config.targetTest) {
      _harnessPlugins.push(Plugin);

      _reservedProps[name] = 1;
    }

    name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
  }

  _addGlobal(name, Plugin);

  if (config.register) {
    config.register(gsap, Plugin, PropTween);
  }
},

/*
 * --------------------------------------------------------------------------------------
 * COLORS
 * --------------------------------------------------------------------------------------
 */
_255 = 255,
    _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
},
    _hue = function _hue(h, m1, m2) {
  h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
},
    splitColor = function splitColor(v, toHSL) {
  var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
      r,
      g,
      b,
      h,
      s,
      l,
      max,
      min,
      d,
      wasHSL;

  if (!a) {
    if (v.substr(-1) === ",") {
      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
      v = v.substr(0, v.length - 1);
    }

    if (_colorLookup[v]) {
      a = _colorLookup[v];
    } else if (v.charAt(0) === "#") {
      if (v.length === 4) {
        //for shorthand like #9F0
        r = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = "#" + r + r + g + g + b + b;
      }

      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & _255, v & _255];
    } else if (v.substr(0, 3) === "hsl") {
      a = wasHSL = v.match(_strictNumExp);

      if (!toHSL) {
        h = +a[0] % 360 / 360;
        s = +a[1] / 100;
        l = +a[2] / 100;
        g = l <= .5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;

        if (a.length > 3) {
          a[3] *= 1; //cast as number
        }

        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else if (~v.indexOf("=")) {
        //if relative values are found, just return the raw strings with the relative prefixes in place.
        return v.match(_numExp);
      }
    } else {
      a = v.match(_strictNumExp) || _colorLookup.transparent;
    }

    a = a.map(Number);
  }

  if (toHSL && !wasHSL) {
    r = a[0] / _255;
    g = a[1] / _255;
    b = a[2] / _255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }

    a[0] = h + .5 | 0;
    a[1] = s * 100 + .5 | 0;
    a[2] = l * 100 + .5 | 0;
  }

  return a;
},
    _formatColors = function _formatColors(s, toHSL) {
  var colors = (s + "").match(_colorExp),
      charIndex = 0,
      parsed = "",
      i,
      color,
      temp;

  if (!colors) {
    return s;
  }

  for (i = 0; i < colors.length; i++) {
    color = colors[i];
    temp = s.substr(charIndex, s.indexOf(color, charIndex) - charIndex);
    charIndex += temp.length + color.length;
    color = splitColor(color, toHSL);

    if (color.length === 3) {
      color.push(1);
    }

    parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
  }

  return parsed + s.substr(charIndex);
},
    _colorExp = function () {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b",
      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
  p;

  for (p in _colorLookup) {
    s += "|" + p + "\\b";
  }

  return new RegExp(s + ")", "gi");
}(),
    _hslExp = /hsl[a]?\(/,
    _colorStringFilter = function _colorStringFilter(a) {
  var combined = a.join(" "),
      toHSL;
  _colorExp.lastIndex = 0;

  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a[0] = _formatColors(a[0], toHSL);
    a[1] = _formatColors(a[1], toHSL);
  }
},

/*
 * --------------------------------------------------------------------------------------
 * TICKER
 * --------------------------------------------------------------------------------------
 */
_tickerActive,
    _ticker = function () {
  var _getTime = Date.now,
      _lagThreshold = 500,
      _adjustedLag = 33,
      _startTime = _getTime(),
      _lastUpdate = _startTime,
      _gap = 1 / 60,
      _nextTime = _gap,
      _listeners = [],
      _id,
      _req,
      _raf,
      _self,
      _tick = function _tick(v) {
    var elapsed = _getTime() - _lastUpdate,
        manual = v === true,
        overlap,
        dispatch;

    if (elapsed > _lagThreshold) {
      _startTime += elapsed - _adjustedLag;
    }

    _lastUpdate += elapsed;
    _self.time = (_lastUpdate - _startTime) / 1000;
    overlap = _self.time - _nextTime;

    if (overlap > 0 || manual) {
      _self.frame++;
      _nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
      dispatch = 1;
    }

    if (!manual) {
      //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
      _id = _req(_tick);
    }

    if (dispatch) {
      _listeners.forEach(function (l) {
        return l(_self.time, elapsed, _self.frame, v);
      });
    }
  };

  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted && _windowExists()) {
          _win = _coreInitted = window;
          _doc = _win.document || {};
          _globals.gsap = gsap;
          (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

          _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});

          _raf = _win.requestAnimationFrame;
        }

        _id && _self.sleep();

        _req = _raf || function (f) {
          return setTimeout(f, (_nextTime - _self.time) * 1000 + 1 | 0);
        };

        _tickerActive = 1;

        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
    },
    fps: function fps(_fps) {
      _gap = 1 / (_fps || 60);
      _nextTime = _self.time + _gap;
    },
    add: function add(callback) {
      _listeners.indexOf(callback) < 0 && _listeners.push(callback);

      _wake();
    },
    remove: function remove(callback) {
      var i;
      ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1);
    },
    _listeners: _listeners
  };
  return _self;
}(),
    _wake = function _wake() {
  return !_tickerActive && _ticker.wake();
},
    //also ensures the core classes are initialized.

/*
* -------------------------------------------------
* EASING
* -------------------------------------------------
*/
_easeMap = {},
    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
    _quotesExp = /["']/g,
    _parseObjectInString = function _parseObjectInString(value) {
  //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
  var obj = {},
      split = value.substr(1, value.length - 3).split(":"),
      key = split[0],
      i = 1,
      l = split.length,
      index,
      val,
      parsedVal;

  for (; i < l; i++) {
    val = split[i];
    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index + 1).trim();
  }

  return obj;
},
    _configEaseFromString = function _configEaseFromString(name) {
  //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
  var split = (name + "").split("("),
      ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _parenthesesExp.exec(name)[1].split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
},
    _invertEase = function _invertEase(ease) {
  return function (p) {
    return 1 - ease(1 - p);
  };
},
    // potential future feature - allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos. Not sure it's worth the kb.
// _propagateYoyoEase = (timeline, isYoyo) => {
// 	let child = timeline._first, ease;
// 	while (child) {
// 		if (child instanceof Timeline) {
// 			_propagateYoyoEase(child, isYoyo);
// 		} else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
// 			if (child.timeline) {
// 				_propagateYoyoEase(child.timeline, isYoyo);
// 			} else {
// 				ease = child._ease;
// 				child._ease = child._yEase;
// 				child._yEase = ease;
// 				child._yoyo = isYoyo;
// 			}
// 		}
// 		child = child._next;
// 	}
// },
_parseEase = function _parseEase(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
},
    _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut(p) {
      return 1 - easeIn(1 - p);
    };
  }

  if (easeInOut === void 0) {
    easeInOut = function easeInOut(p) {
      return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
    };
  }

  var ease = {
    easeIn: easeIn,
    easeOut: easeOut,
    easeInOut: easeInOut
  },
      lowercaseName;

  _forEachName(names, function (name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

    for (var p in ease) {
      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
    }
  });

  return ease;
},
    _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
  return function (p) {
    return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
  };
},
    _configElastic = function _configElastic(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1,
      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
  p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
      easeOut = function easeOut(p) {
    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  p2 = _2PI / p2; //precalculate to optimize

  ease.config = function (amplitude, period) {
    return _configElastic(type, amplitude, period);
  };

  return ease;
},
    _configBack = function _configBack(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }

  var easeOut = function easeOut(p) {
    return --p * p * ((overshoot + 1) * p + overshoot) + 1;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  ease.config = function (overshoot) {
    return _configBack(type, overshoot);
  };

  return ease;
}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };


_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
  var power = i < 5 ? i + 1 : i;

  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
    return Math.pow(p, power);
  } : function (p) {
    return p;
  }, function (p) {
    return 1 - Math.pow(1 - p, power);
  }, function (p) {
    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
  });
});

_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

(function (n, c) {
  var n1 = 1 / c,
      n2 = 2 * n1,
      n3 = 2.5 * n1,
      easeOut = function easeOut(p) {
    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
  };

  _insertEase("Bounce", function (p) {
    return 1 - easeOut(1 - p);
  }, easeOut);
})(7.5625, 2.75);

_insertEase("Expo", function (p) {
  return p ? Math.pow(2, 10 * (p - 1)) : 0;
});

_insertEase("Circ", function (p) {
  return -(_sqrt(1 - p * p) - 1);
});

_insertEase("Sine", function (p) {
  return -_cos(p * _HALF_PI) + 1;
});

_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }

    var p1 = 1 / steps,
        p2 = steps + (immediateStart ? 0 : 1),
        p3 = immediateStart ? 1 : 0,
        max = 1 - _tinyNum;
    return function (p) {
      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];
/*
 * --------------------------------------------------------------------------------------
 * CACHE
 * --------------------------------------------------------------------------------------
 */

var GSCache = function GSCache(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
/*
 * --------------------------------------------------------------------------------------
 * ANIMATION
 * --------------------------------------------------------------------------------------
 */

var Animation =
/*#__PURE__*/
function () {
  function Animation(vars, time) {
    var parent = vars.parent || _globalTimeline;
    this.vars = vars;
    this._dur = this._tDur = +vars.duration || 0;
    this._delay = +vars.delay || 0;

    if (this._repeat = vars.repeat || 0) {
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;

      _onUpdateTotalDuration(this);
    }

    this._ts = 1;
    this.data = vars.data;

    if (!_tickerActive) {
      _ticker.wake();
    }

    if (parent) {
      _addToTimeline(parent, this, time || time === 0 ? time : parent._time);
    }

    if (vars.reversed) {
      this.reversed(true);
    }

    if (vars.paused) {
      this.paused(true);
    }
  }

  var _proto = Animation.prototype;

  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this._delay = value;
      return this;
    }

    return this._delay;
  };

  _proto.duration = function duration(value) {
    var isSetter = arguments.length,
        repeat = this._repeat,
        repeatCycles = repeat > 0 ? repeat * ((isSetter ? value : this._dur) + this._rDelay) : 0;
    return isSetter ? this.totalDuration(repeat < 0 ? value : value + repeatCycles) : this.totalDuration() && this._dur;
  };

  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }

    var repeat = this._repeat,
        isInfinite = (value || this._rDelay) && repeat < 0;
    this._tDur = isInfinite ? 1e20 : value;
    this._dur = isInfinite ? value : (value - repeat * this._rDelay) / (repeat + 1);
    this._dirty = 0;

    _uncache(this.parent);

    return this;
  };

  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();

    if (!arguments.length) {
      return this._tTime;
    }

    var parent = this.parent || this._dp,
        start;

    if (parent && parent.smoothChildTiming && this._ts) {
      start = this._start; // if (!parent._dp && parent._time === parent._dur) { // if a root timeline completes...and then a while later one of its children resumes, we must shoot the playhead forward to where it should be raw-wise, otherwise the child will jump to the end. Down side: this assumes it's using the _ticker.time as a reference.
      // 	parent._time = _ticker.time - parent._start;
      // }

      this._start = parent._time - (this._ts > 0 ? _totalTime / this._ts : ((this._dirty ? this.totalDuration() : this._tDur) - _totalTime) / -this._ts);
      this._end += this._start - start;

      if (!parent._dirty) {
        //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
        _uncache(parent);
      } //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.


      while (parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts > 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }

        parent = parent.parent;
      }

      if (!this.parent) {
        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this).
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }

    if (this._tTime !== _totalTime || !this._dur) {
      _lazySafeRender(this, _totalTime, suppressEvents);
    }

    return this;
  };

  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(value + _elapsedCycleDuration(this), suppressEvents) : this._time;
  };

  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this._tTime / this.totalDuration();
  };

  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * value + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? this._time / this._dur : this.ratio;
  };

  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;

    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? ~~(this._tTime / cycleDuration) + 1 : 1;
  };

  _proto.timeScale = function timeScale(value) {
    var prevTS = this._ts;

    if (!arguments.length) {
      return prevTS || this._pauseTS;
    }

    if (!prevTS) {
      this._pauseTS = value;
      return this;
    } //don't allow a zero _ts, otherwise we can't resume() properly. For example, gsap.fromTo(tween, {timeScale:0}, {timeScale:1}) wouldn't work because the timeScale:0 would of course pause, and we'd record _pauseTS as 0...and then when resuming we'd copy that back to _ts...which would still keep it paused.


    this._end = this._start + this._tDur / (this._ts = value || _tinyNum);
    return _recacheAncestors(this).totalTime(this._tTime, true);
  };

  _proto.paused = function paused(value) {
    var isPaused = !this._ts;

    if (!arguments.length) {
      return isPaused;
    }

    if (isPaused !== value) {
      if (value) {
        this._pauseTS = this._ts;
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

        this._ts = this._act = 0; //we use a timeScale of 0 to indicate a paused state, but we record the old "real" timeScale as _pauseTS so we can revert when unpaused.
      } else {
        this._ts = this._pauseTS;
        value = this._tTime || this._pTime; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume().

        if (this.progress() === 1) {
          // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course).
          this._tTime -= _tinyNum;
        }

        this.totalTime(value, true);
      }
    }

    return this;
  };

  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      if (this.parent && this.parent._sort) {
        _addToTimeline(this.parent, this, value - this._delay);
      }

      return this;
    }

    return this._start;
  };

  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts);
  };

  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp; // _dp = detatched parent

    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  } // globalTime(rawTime) {
  // 	let animation = this,
  // 		time = arguments.length ? rawTime : animation.rawTime();
  // 	while (animation) {
  // 		time = animation._start + time / (animation._ts || 1);
  // 		animation = animation.parent;
  // 	}
  // 	return time;
  // }
  ;

  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value;
      return _onUpdateTotalDuration(this);
    }

    return this._repeat;
  };

  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      this._rDelay = value;
      return _onUpdateTotalDuration(this);
    }

    return this._rDelay;
  };

  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }

    return this._yoyo;
  };

  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };

  _proto.restart = function restart(includeDelay, suppressEvents) {
    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
  };

  _proto.play = function play(from, suppressEvents) {
    if (from != null) {
      this.seek(from, suppressEvents);
    }

    return this.reversed(false).paused(false);
  };

  _proto.reverse = function reverse(from, suppressEvents) {
    if (from != null) {
      this.seek(from || this.totalDuration(), suppressEvents);
    }

    return this.reversed(true).paused(false);
  };

  _proto.pause = function pause(atTime, suppressEvents) {
    if (atTime != null) {
      this.seek(atTime, suppressEvents);
    }

    return this.paused(true);
  };

  _proto.resume = function resume() {
    return this.paused(false);
  };

  _proto.reversed = function reversed(value) {
    var ts = this._ts || this._pauseTS;

    if (arguments.length) {
      if (value !== this.reversed()) {
        this[this._ts ? "_ts" : "_pauseTS"] = Math.abs(ts) * (value ? -1 : 1);
        this.totalTime(this._tTime, true);
      }

      return this;
    }

    return ts < 0;
  };

  _proto.invalidate = function invalidate() {
    this._initted = 0;
    return this;
  };

  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp,
        start = this._start,
        rawTime;
    return !parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum;
  };

  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;

    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;

        if (params) {
          vars[type + "Params"] = params;
        }

        if (type === "onUpdate") {
          this._onUpdate = callback;
        }
      }

      return this;
    }

    return vars[type];
  };

  _proto.then = function then(onFulfilled) {
    var _this = this;

    if (onFulfilled === void 0) {
      onFulfilled = _emptyFunc;
    }

    return new Promise(function (resolve) {
      _this._prom = function () {
        onFulfilled(_this);
        resolve();
      };
    });
  };

  _proto.kill = function kill() {
    _interrupt(this);
  };

  return Animation;
}();

_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: 0,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0
});
/*
 * -------------------------------------------------
 * TIMELINE
 * -------------------------------------------------
 */


var Timeline =
/*#__PURE__*/
function (_Animation) {
  _inheritsLoose(Timeline, _Animation);

  function Timeline(vars, time) {
    var _this2;

    if (vars === void 0) {
      vars = {};
    }

    _this2 = _Animation.call(this, vars, time) || this;
    _this2.labels = {};
    _this2.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
    _this2.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this2._sort = _isNotFalse(vars.sortChildren);
    return _this2;
  }

  var _proto2 = Timeline.prototype;

  _proto2.to = function to(targets, vars, position) {
    new Tween(targets, _parseVars(arguments, 0, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
    return this;
  };

  _proto2.from = function from(targets, vars, position) {
    new Tween(targets, _parseVars(arguments, 1, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
    return this;
  };

  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    new Tween(targets, _parseVars(arguments, 2, this), _parsePosition(this, _isNumber(fromVars) ? arguments[4] : position));
    return this;
  };

  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;

    if (!vars.repeatDelay) {
      vars.repeat = 0;
    }

    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };

  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), _parsePosition(this, position));
  } //ONLY for backward compatibility! Maybe delete?
  ;

  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };

  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    vars.immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    toVars.immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._dirty ? this.totalDuration() : this._tDur,
        dur = this._dur,
        tTime = totalTime > tDur - _tinyNum && totalTime >= 0 && this !== _globalTimeline ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        crossingStart = this._zTime < 0 !== totalTime < 0 && this._initted,
        time,
        child,
        next,
        iteration,
        cycleDuration,
        prevPaused,
        pauseTween,
        timeScale,
        prevStart,
        prevIteration,
        yoyo,
        isYoyo;

    if (tTime !== this._tTime || force || crossingStart) {
      if (crossingStart) {
        if (!dur) {
          prevTime = this._zTime;
        }

        if (totalTime || !suppressEvents) {
          //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.
          this._zTime = totalTime;
        }
      }

      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = timeScale === 0;

      if (prevTime !== this._time && dur) {
        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
        time += this._time - prevTime;
      }

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;
        time = _round(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (time > dur || tDur === tTime) {
          time = dur;
        }

        iteration = ~~(tTime / cycleDuration);

        if (iteration && iteration === tTime / cycleDuration) {
          time = dur;
          iteration--;
        }

        prevIteration = ~~(this._tTime / cycleDuration);

        if (prevIteration && prevIteration === this._tTime / cycleDuration) {
          prevIteration--;
        }

        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        /*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */


        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1,
              doesWrap = rewinding === (yoyo && iteration & 1);

          if (iteration < prevIteration) {
            rewinding = !rewinding;
          }

          prevTime = rewinding ? 0 : dur;
          this._lock = 1;
          this.render(prevTime, suppressEvents, !dur)._lock = 0;

          if (!suppressEvents && this.parent) {
            _callback(this, "onRepeat");
          }

          if (prevTime !== this._time || prevPaused !== !this._ts) {
            return this;
          }

          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur + 0.0001 : -0.0001;
            this.render(prevTime, true);
          }

          this._lock = 0;

          if (!this._ts && !prevPaused) {
            return this;
          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.
          //_propagateYoyoEase(this, isYoyo);

        }
      }

      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _round(prevTime), _round(time));

        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }

      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
      }

      if (!prevTime && time && !suppressEvents) {
        _callback(this, "onStart");
      }

      if (time >= prevTime && totalTime >= 0) {
        child = this._first;

        while (child) {
          next = child._next;

          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              break;
            }
          }

          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

        while (child) {
          next = child._prev;

          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              break;
            }
          }

          child = next;
        }
      }

      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

        if (this._ts) {
          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

          return this.render(totalTime, suppressEvents, force);
        }
      }

      if (this._onUpdate && !suppressEvents) {
        _callback(this, "onUpdate", true);
      }

      if (tTime === tDur || !tTime && this._ts < 0) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!time || tDur >= this.totalDuration()) {
        (totalTime || !dur) && _removeFromParent(this, 1);

        if (!suppressEvents && !(totalTime < 0 && !prevTime)) {
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && tTime === tDur && this._prom();
        }
      }
    }

    return this;
  };

  _proto2.add = function add(child, position) {
    var _this3 = this;

    if (!_isNumber(position)) {
      position = _parsePosition(this, position);
    }

    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function (obj) {
          return _this3.add(obj, position);
        });
        return _uncache(this);
      }

      if (_isString(child)) {
        return this.addLabel(child, position);
      }

      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }

    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
  } // buildFrom(position, absolute) {
  // 	this._build = (position === ">>" || position === "auto") ? position : (position === "<<") ? 0 : _parsePosition(this, position, !absolute);
  // 	return this;
  // }
  ;

  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }

    if (tweens === void 0) {
      tweens = true;
    }

    if (timelines === void 0) {
      timelines = true;
    }

    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum;
    }

    var a = [],
        child = this._first;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          if (tweens) {
            a.push(child);
          }
        } else {
          if (timelines) {
            a.push(child);
          }

          if (nested) {
            a.push.apply(a, child.getChildren(true, tweens, timelines));
          }
        }
      }

      child = child._next;
    }

    return a;
  };

  _proto2.getById = function getById(id) {
    var animations = this.getChildren(1, 1, 1),
        i = animations.length;

    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };

  _proto2.remove = function remove(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }

    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }

    _removeLinkedListItem(this, child);

    if (child === this._recent) {
      this._recent = this._last;
    }

    return _uncache(this);
  };

  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }

    this._forcing = 1;

    if (!this.parent && !this._dp && this._ts) {
      //special case for the global timeline (or any other that has no parent or detached parent).
      this._start = _ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts);
    }

    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

    this._forcing = 0;
    return this;
  };

  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };

  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };

  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition(this, position));
  };

  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);

    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }

      child = child._next;
    }
  };

  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive),
        i = tweens.length;

    while (i--) {
      tweens[i].kill(targets, props);
    }

    return this;
  };

  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
    var a = [],
        parsedTargets = toArray(targets),
        child = this._first,
        children;

    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (!onlyActive || child.isActive())) {
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }

      child = child._next;
    }

    return a;
  };

  _proto2.tweenTo = function tweenTo(position, vars) {
    var tl = this,
        endTime = _parsePosition(tl, position),
        startAt = vars && vars.startAt,
        tween = Tween.to(tl, _setDefaults({
      ease: "none",
      lazy: false,
      time: endTime,
      duration: Math.abs(endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale() || _tinyNum,
      onStart: function onStart() {
        tl.pause();
        var duration = Math.abs(endTime - tl._time) / tl.timeScale();

        if (tween._dur !== duration) {
          tween._dur = duration;
          tween.render(tween._time, true, true);
        }

        if (vars && vars.onStart) {
          //in case the user had an onStart in the vars - we don't want to overwrite it.
          vars.onStart.apply(tween, vars.onStartParams || []);
        }
      }
    }, vars));

    return tween;
  };

  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars));
  };

  _proto2.recent = function recent() {
    return this._recent;
  };

  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };

  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };

  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };

  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }

    var child = this._first,
        labels = this.labels,
        p;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
      }

      child = child._next;
    }

    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }

    return _uncache(this);
  };

  _proto2.invalidate = function invalidate() {
    var child = this._first;
    this._lock = 0;

    while (child) {
      child.invalidate();
      child = child._next;
    }

    return _Animation.prototype.invalidate.call(this);
  };

  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }

    var child = this._first,
        next;

    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }

    this._time = this._tTime = 0;

    if (includeLabels) {
      this.labels = {};
    }

    return _uncache(this);
  };

  _proto2.totalDuration = function totalDuration(value) {
    var max = 0,
        self = this,
        child = self._last,
        prevStart = _bigNum,
        repeat = self._repeat,
        repeatCycles = repeat * self._rDelay || 0,
        isInfinite = repeat < 0,
        prev,
        end;

    if (!arguments.length) {
      if (self._dirty) {
        while (child) {
          prev = child._prev; //record it here in case the tween changes position in the sequence...

          if (child._dirty) {
            child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.
          }

          if (child._start > prevStart && self._sort && child._ts && !self._lock) {
            //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
            self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

            _addToTimeline(self, child, child._start - child._delay);

            self._lock = 0;
          } else {
            prevStart = child._start;
          }

          if (child._start < 0 && child._ts) {
            //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
            max -= child._start;

            if (!self.parent && !self._dp || self.parent && self.parent.smoothChildTiming) {
              self._start += child._start / self._ts;
              self._time -= child._start;
              self._tTime -= child._start;
            }

            self.shiftChildren(-child._start, false, -_bigNum);
            prevStart = 0;
          }

          end = child._end = child._start + child._tDur / Math.abs(child._ts || child._pauseTS);

          if (end > max && child._ts) {
            max = _round(end);
          }

          child = prev;
        }

        self._dur = self === _globalTimeline && self._time > max ? self._time : Math.min(_bigNum, max);
        self._tDur = isInfinite && (self._dur || repeatCycles) ? 1e20 : Math.min(_bigNum, max * (repeat + 1) + repeatCycles);
        self._end = self._start + (self._tDur / Math.abs(self._ts || self._pauseTS) || 0);
        self._dirty = 0;
      }

      return self._tDur;
    }

    return isInfinite ? self : self.timeScale(self.totalDuration() / value);
  };

  Timeline.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
    }

    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
        while (child && !child._ts) {
          child = child._next;
        }

        if (!child) {
          _ticker.sleep();
        }
      }
    }
  };

  return Timeline;
}(Animation);

_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});

var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
  //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
      index = 0,
      matchIndex = 0,
      result,
      startNums,
      color,
      endNum,
      chunk,
      startNum,
      hasRandom,
      a;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }

  if (stringFilter) {
    a = [start, end];
    stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

    start = a[0];
    end = a[1];
  }

  startNums = start.match(_complexStringNumExp) || [];

  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index, result.index);

    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }

    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]); //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

      pt._pt = {
        _next: pt._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: startNum,
        c: endNum.charAt(1) === "=" ? parseFloat(endNum.substr(2)) * (endNum.charAt(0) === "-" ? -1 : 1) : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index = _complexStringNumExp.lastIndex;
    }
  }

  pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

  pt.fp = funcParam;

  if (_relExp.test(end) || hasRandom) {
    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
  }

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
  if (_isFunction(end)) {
    end = end(index || 0, target, targets);
  }

  var currentValue = target[prop],
      parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
      setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
      pt;

  if (_isString(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }

    if (end.charAt(1) === "=") {
      end = parseFloat(parsedStart) + parseFloat(end.substr(2)) * (end.charAt(0) === "-" ? -1 : 1) + getUnit(parsedStart);
    }
  }

  if (parsedStart !== end) {
    if (!isNaN(parsedStart + end)) {
      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);

      if (funcParam) {
        pt.fp = funcParam;
      }

      if (modifier) {
        pt.modifier(modifier, this, target);
      }

      return this._pt = pt;
    }

    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
},
    //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
_processVars = function _processVars(vars, index, target, targets, tween) {
  if (_isFunction(vars)) {
    vars = _parseFuncOrString(vars, tween, index, target, targets);
  }

  if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars)) {
    return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
  }

  var copy = {},
      p;

  for (p in vars) {
    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
  }

  return copy;
},
    _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
  var plugin, pt, ptLookup, i;

  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

      i = plugin._props.length;

      while (i--) {
        ptLookup[plugin._props[i]] = pt;
      }
    }
  }

  return plugin;
},
    _overwritingTween,
    //store a reference temporarily so we can avoid overwriting itself.
_initTween = function _initTween(tween, time) {
  var vars = tween.vars,
      ease = vars.ease,
      startAt = vars.startAt,
      immediateRender = vars.immediateRender,
      lazy = vars.lazy,
      onUpdate = vars.onUpdate,
      onUpdateParams = vars.onUpdateParams,
      callbackScope = vars.callbackScope,
      runBackwards = vars.runBackwards,
      yoyoEase = vars.yoyoEase,
      keyframes = vars.keyframes,
      autoRevert = vars.autoRevert,
      dur = tween._dur,
      prevStartAt = tween._startAt,
      targets = tween._targets,
      parent = tween.parent,
      fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets,
      autoOverwrite = tween._overwrite === "auto",
      tl = tween.timeline,
      cleanVars,
      i,
      p,
      pt,
      target,
      hasPriority,
      gsData,
      harness,
      plugin,
      ptLookup,
      index,
      harnessVars;

  if (tl && (!keyframes || !ease)) {
    ease = "none";
  }

  tween._ease = _parseEase(ease, _defaults.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

  if (yoyoEase && tween._yoyo && !tween._repeat) {
    //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }

  if (!tl) {
    //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
    if (prevStartAt) {
      prevStartAt.render(-1, true).kill();
    }

    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
        data: "isStart",
        overwrite: false,
        parent: parent,
        immediateRender: true,
        lazy: _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate: onUpdate,
        onUpdateParams: onUpdateParams,
        callbackScope: callbackScope,
        stagger: 0
      }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


      if (immediateRender) {
        if (time > 0) {
          !autoRevert && (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.
        } else if (dur) {
          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        }
      }
    } else if (runBackwards && dur) {
      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
      if (prevStartAt) {
        !autoRevert && (tween._startAt = 0);
      } else {
        if (time) {
          //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
          immediateRender = false;
        }

        _removeFromParent(tween._startAt = Tween.set(targets, _merge(_copyExcluding(vars, _reservedProps), {
          overwrite: false,
          data: "isFromStart",
          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
          lazy: immediateRender && _isNotFalse(lazy),
          immediateRender: immediateRender,
          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
          stagger: 0,
          parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.cycle([-100,100])})

        })));

        if (!immediateRender) {
          _initTween(tween._startAt, time); //ensures that the initial values are recorded


          if (immediateRender) {
            !autoRevert && (tween._startAt = 0);
          }
        } else if (!time) {
          return;
        }
      }
    }

    cleanVars = _copyExcluding(vars, _reservedProps);
    tween._pt = 0;
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

    for (i = 0; i < targets.length; i++) {
      target = targets[i];
      gsData = target._gsap || _harness(targets)[i]._gsap;
      tween._ptLookup[i] = ptLookup = {};

      if (_lazyLookup[gsData.id]) {
        _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

      }

      index = fullTargets === targets ? i : fullTargets.indexOf(target);

      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

        plugin._props.forEach(function (name) {
          ptLookup[name] = pt;
        });

        if (plugin.priority) {
          hasPriority = 1;
        }
      }

      if (!harness || harnessVars) {
        for (p in cleanVars) {
          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
            if (plugin.priority) {
              hasPriority = 1;
            }
          } else {
            ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
          }
        }
      }

      if (tween._op && tween._op[i]) {
        tween.kill(target, tween._op[i]);
      }

      if (autoOverwrite) {
        _overwritingTween = tween;

        _globalTimeline.killTweensOf(target, ptLookup, true); //Also make sure the overwriting doesn't overwrite THIS tween!!!


        _overwritingTween = 0;
      }

      if (tween._pt && (_isNotFalse(lazy) && dur || lazy && !dur)) {
        _lazyLookup[gsData.id] = 1;
      }
    }

    if (hasPriority) {
      _sortPropTweensByPriority(tween);
    }

    if (tween._onInit) {
      //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
      tween._onInit(tween);
    }
  }

  tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

  tween._onUpdate = onUpdate;
  tween._initted = 1;
},
    _addAliasesToVars = function _addAliasesToVars(targets, vars) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0,
      propertyAliases = harness && harness.aliases,
      copy,
      p,
      i,
      aliases;

  if (!propertyAliases) {
    return vars;
  }

  copy = _merge({}, vars);

  for (p in propertyAliases) {
    if (p in copy) {
      aliases = propertyAliases[p].split(",");
      i = aliases.length;

      while (i--) {
        copy[aliases[i]] = copy[p];
      }
    }
  }

  return copy;
},
    _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
  return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
},
    _staggerTweenProps = _callbackNames + ",repeat,repeatDelay,yoyo,yoyoEase",
    _staggerPropsToSkip = (_staggerTweenProps + ",id,stagger,delay,duration").split(",");
/*
 * --------------------------------------------------------------------------------------
 * TWEEN
 * --------------------------------------------------------------------------------------
 */


var Tween =
/*#__PURE__*/
function (_Animation2) {
  _inheritsLoose(Tween, _Animation2);

  function Tween(targets, vars, time) {
    var _this4;

    if (typeof vars === "number") {
      time.duration = vars;
      vars = time;
      time = null;
    }

    _this4 = _Animation2.call(this, _inheritDefaults(vars), time) || this;
    var _this4$vars = _this4.vars,
        duration = _this4$vars.duration,
        delay = _this4$vars.delay,
        immediateRender = _this4$vars.immediateRender,
        stagger = _this4$vars.stagger,
        overwrite = _this4$vars.overwrite,
        keyframes = _this4$vars.keyframes,
        defaults = _this4$vars.defaults,
        parsedTargets = toArray(targets),
        tl,
        i,
        copy,
        l,
        p,
        curTarget,
        staggerFunc,
        staggerVarsToMerge;
    _this4._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [{}];
    _this4._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

    _this4._overwrite = overwrite;

    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this4.vars;
      tl = _this4.timeline = new Timeline({
        data: "nested",
        defaults: defaults || {}
      });
      tl.kill();
      tl.parent = _assertThisInitialized(_this4);

      if (keyframes) {
        _setDefaults(tl.vars.defaults, {
          ease: "none"
        });

        keyframes.forEach(function (frame) {
          return tl.to(parsedTargets, frame, ">");
        });
      } else {
        l = parsedTargets.length;
        staggerFunc = stagger ? distribute(stagger) : _emptyFunc;

        if (_isObject(stagger)) {
          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
          for (p in stagger) {
            if (~_staggerTweenProps.indexOf(p)) {
              if (!staggerVarsToMerge) {
                staggerVarsToMerge = {};
              }

              staggerVarsToMerge[p] = stagger[p];
            }
          }
        }

        for (i = 0; i < l; i++) {
          copy = {};

          for (p in vars) {
            if (_staggerPropsToSkip.indexOf(p) < 0) {
              copy[p] = vars[p];
            }
          }

          copy.stagger = 0;

          if (staggerVarsToMerge) {
            _merge(copy, staggerVarsToMerge);
          }

          if (vars.yoyoEase && !vars.repeat) {
            //so that propagation works properly when a ancestor timeline yoyos
            copy.yoyoEase = vars.yoyoEase;
          }

          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this4), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this4), i, curTarget, parsedTargets) || 0) - _this4._delay;

          if (!stagger && l === 1 && copy.delay) {
            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
            _this4._delay = delay = copy.delay;
            _this4._start += delay;
            copy.delay = 0;
          }

          tl.to(curTarget, copy, staggerFunc(i, curTarget, parsedTargets));
        }

        duration = delay = 0;
      }

      duration || _this4.duration(duration = tl.duration());
    } else {
      _this4.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
    }

    if (overwrite === true) {
      _overwritingTween = _assertThisInitialized(_this4);

      _globalTimeline.killTweensOf(parsedTargets);

      _overwritingTween = 0;
    }

    if (immediateRender || !duration && !keyframes && _this4._start === _this4.parent._time && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this4)) && _this4.parent.data !== "nested") {
      _this4._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      _this4.render(Math.max(0, -delay)); //in case delay is negative

    }

    return _this4;
  }

  var _proto3 = Tween.prototype;

  _proto3.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._tDur,
        dur = this._dur,
        tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        time,
        pt,
        iteration,
        cycleDuration,
        prevIteration,
        isYoyo,
        ratio,
        timeline,
        yoyoEase;

    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || force || this._startAt && this._zTime < 0 !== totalTime < 0) {
      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
      time = tTime;
      timeline = this.timeline;

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        cycleDuration = dur + this._rDelay;
        time = _round(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (time > dur) {
          time = dur;
        }

        iteration = ~~(tTime / cycleDuration);

        if (iteration && iteration === tTime / cycleDuration) {
          time = dur;
          iteration--;
        }

        isYoyo = this._yoyo && iteration & 1;

        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }

        prevIteration = ~~(this._tTime / cycleDuration);

        if (prevIteration && prevIteration === this._tTime / cycleDuration) {
          prevIteration--;
        }

        if (time === prevTime && !force) {
          //could be during the repeatDelay part. No need to render and fire callbacks.
          return this;
        }

        if (iteration !== prevIteration) {
          //timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo);
          //repeatRefresh functionality
          if (this.vars.repeatRefresh && !this._lock) {
            this._lock = 1;
            this.render(cycleDuration * iteration, true).invalidate()._lock = 0;
          }
        }
      }

      if (!this._initted && _attemptInitTween(this, time, force, suppressEvents)) {
        return this;
      }

      this._tTime = tTime;
      this._time = time;

      if (!this._act && this._ts) {
        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

        this._lazy = 0;
      }

      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }

      if (!prevTime && time && !suppressEvents) {
        _callback(this, "onStart");
      }

      pt = this._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }

      timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * ratio, suppressEvents, force) || this._startAt && (this._zTime = totalTime);

      if (this._onUpdate && !suppressEvents) {
        if (totalTime < 0 && this._startAt) {
          this._startAt.render(totalTime, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

        }

        _callback(this, "onUpdate");
      }

      if (this._repeat) if (iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent) {
        _callback(this, "onRepeat");
      }

      if ((tTime === tDur || !tTime) && this._tTime === tTime) {
        if (totalTime < 0 && this._startAt && !this._onUpdate) {
          this._startAt.render(totalTime, true, force);
        }

        (totalTime || !dur) && (tTime || this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime).

        if (!suppressEvents && !(totalTime < 0 && !prevTime)) {
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && tTime === tDur && this._prom();
        }
      }
    }

    return this;
  };

  _proto3.targets = function targets() {
    return this._targets;
  };

  _proto3.invalidate = function invalidate() {
    this._pt = this._op = this._startAt = this._onUpdate = this._act = this._lazy = 0;
    this._ptLookup = [];

    if (this.timeline) {
      this.timeline.invalidate();
    }

    return _Animation2.prototype.invalidate.call(this);
  };

  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }

    if (_overwritingTween === this) {
      return _overwritingTween;
    }

    if (!targets && (!vars || vars === "all")) {
      if (this.parent) {
        this._lazy = 0;
        return _interrupt(this);
      }
    }

    if (this.timeline) {
      this.timeline.killTweensOf(targets, vars);
      return this;
    }

    var parsedTargets = this._targets,
        killingTargets = targets ? toArray(targets) : parsedTargets,
        propTweenLookup = this._ptLookup,
        firstPT = this._pt,
        overwrittenProps,
        curLookup,
        curOverwriteProps,
        props,
        p,
        pt,
        i;

    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      return _interrupt(this);
    }

    overwrittenProps = this._op = this._op || [];

    if (vars !== "all") {
      //so people can pass in a comma-delimited list of property names
      if (_isString(vars)) {
        p = {};

        _forEachName(vars, function (name) {
          return p[name] = 1;
        });

        vars = p;
      }

      vars = _addAliasesToVars(parsedTargets, vars);
    }

    i = parsedTargets.length;

    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];

        if (vars === "all") {
          overwrittenProps[i] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars;
        }

        for (p in props) {
          pt = curLookup && curLookup[p];

          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
              _removeLinkedListItem(this, pt, "_pt");

              delete curLookup[p];
            }
          }

          if (curOverwriteProps !== "all") {
            curOverwriteProps[p] = 1;
          }
        }
      }
    }

    if (this._initted && !this._pt && firstPT) {
      //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
      _interrupt(this);
    }

    return this;
  };

  Tween.to = function to(targets, vars) {
    return new Tween(targets, vars, arguments[2]);
  };

  Tween.from = function from(targets, vars) {
    return new Tween(targets, _parseVars(arguments, 1));
  };

  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay: delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    });
  };

  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
    return new Tween(targets, _parseVars(arguments, 2));
  };

  Tween.set = function set(targets, vars) {
    vars.duration = 0;

    if (!vars.repeatDelay) {
      vars.repeat = 0;
    }

    return new Tween(targets, vars);
  };

  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };

  return Tween;
}(Animation);

_setDefaults(Tween.prototype, {
  _targets: [],
  _initted: 0,
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.


_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
  Tween[name] = function () {
    var tl = new Timeline(),
        params = toArray(arguments);
    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */


var _setterPlain = function _setterPlain(target, property, value) {
  return target[property] = value;
},
    _setterFunc = function _setterFunc(target, property, value) {
  return target[property](value);
},
    _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
  return target[property](data.fp, value);
},
    _setterAttribute = function _setterAttribute(target, property, value) {
  return target.setAttribute(property, value);
},
    _getSetter = function _getSetter(target, property) {
  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
},
    _renderPlain = function _renderPlain(ratio, data) {
  return data.set(data.t, data.p, ~~((data.s + data.c * ratio) * 10000) / 10000, data);
},
    _renderBoolean = function _renderBoolean(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
},
    _renderComplexString = function _renderComplexString(ratio, data) {
  var pt = data._pt,
      s = "";

  if (!ratio && data.b) {
    //b = beginning string
    s = data.b;
  } else if (ratio === 1 && data.e) {
    //e = ending string
    s = data.e;
  } else {
    while (pt) {
      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : ~~((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

      pt = pt._next;
    }

    s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
  }

  data.set(data.t, data.p, s, data);
},
    _renderPropTweens = function _renderPropTweens(ratio, data) {
  var pt = data._pt;

  while (pt) {
    pt.r(ratio, pt.d);
    pt = pt._next;
  }
},
    _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
  var pt = this._pt,
      next;

  while (pt) {
    next = pt._next;

    if (pt.p === property) {
      pt.modifier(modifier, tween, target);
    }

    pt = next;
  }
},
    _killPropTweensOf = function _killPropTweensOf(property) {
  var pt = this._pt,
      hasNonDependentRemaining,
      next;

  while (pt) {
    next = pt._next;

    if (pt.p === property && !pt.op || pt.op === property) {
      _removeLinkedListItem(this, pt, "_pt");
    } else if (!pt.dep) {
      hasNonDependentRemaining = 1;
    }

    pt = next;
  }

  return !hasNonDependentRemaining;
},
    _setterWithModifier = function _setterWithModifier(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
},
    _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
  var pt = parent._pt,
      next,
      pt2,
      first,
      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

  while (pt) {
    next = pt._next;
    pt2 = first;

    while (pt2 && pt2.pr > pt.pr) {
      pt2 = pt2._next;
    }

    if (pt._prev = pt2 ? pt2._prev : last) {
      pt._prev._next = pt;
    } else {
      first = pt;
    }

    if (pt._next = pt2) {
      pt2._prev = pt;
    } else {
      last = pt;
    }

    pt = next;
  }

  parent._pt = first;
}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


var PropTween =
/*#__PURE__*/
function () {
  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;

    if (next) {
      next._prev = this;
    }
  }

  var _proto4 = PropTween.prototype;

  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target; //modifier target

    this.tween = tween;
  };

  return PropTween;
}(); //Initialization tasks

_forEachName(_callbackNames + ",parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert", function (name) {
  _reservedProps[name] = 1;
  if (name.substr(0, 2) === "on") _reservedProps[name + "Params"] = 1;
});

_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root"
});
_config.stringFilter = _colorStringFilter;
/*
 * --------------------------------------------------------------------------------------
 * GSAP
 * --------------------------------------------------------------------------------------
 */

var gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (config) {
      return _createPlugin(config);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    if (_isString(target)) {
      //in case selector text or an array is passed in
      target = toArray(target)[0];
    }

    var getter = _getCache(target || {}).get,
        format = unit ? _passThrough : _numericIfPossible;

    if (unit === "native") {
      unit = "";
    }

    return !target ? target : !property ? function (property, unit, uncache) {
      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);

    if (target.length > 1) {
      var setters = target.map(function (t) {
        return gsap.quickSetter(t, property, unit);
      }),
          l = setters.length;
      return function (value) {
        var i = l;

        while (i--) {
          setters[i](value);
        }
      };
    }

    target = target[0] || {};

    var Plugin = _plugins[property],
        cache = _getCache(target),
        setter = Plugin ? function (value) {
      var p = new Plugin();
      _quickTween._pt = 0;
      p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p.render(1, p);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, property);

    return Plugin ? setter : function (value) {
      return setter(target, property, unit ? value + unit : value, cache, 1);
    };
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    if (value && value.ease) {
      value.ease = _parseEase(value.ease, _defaults.ease);
    }

    return _mergeDeep(_defaults, value || {});
  },
  config: function config(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref) {
    var name = _ref.name,
        effect = _ref.effect,
        plugins = _ref.plugins,
        defaults = _ref.defaults,
        extendTimeline = _ref.extendTimeline;
    (plugins || "").split(",").forEach(function (pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });

    _effects[name] = function (targets, vars) {
      return effect(toArray(targets), _setDefaults(vars || {}, defaults));
    };

    if (extendTimeline) {
      Timeline.prototype[name] = function (targets, vars, position) {
        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }

    var tl = new Timeline(vars),
        child,
        next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

    _globalTimeline.remove(tl);

    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;

    while (child) {
      next = child._next;

      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }

      child = next;
    }

    _addToTimeline(_globalTimeline, tl, 0);

    return tl;
  },
  utils: {
    wrap: wrap,
    wrapYoyo: wrapYoyo,
    distribute: distribute,
    random: random,
    snap: snap,
    normalize: normalize,
    getUnit: getUnit,
    clamp: clamp,
    splitColor: splitColor,
    toArray: toArray,
    mapRange: mapRange,
    pipe: pipe,
    unitize: unitize,
    interpolate: interpolate
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween: PropTween,
    globals: _addGlobal,
    Tween: Tween,
    Timeline: Timeline,
    Animation: Animation,
    getCache: _getCache
  }
};

_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
  return gsap[name] = Tween[name];
});

_ticker.add(Timeline.updateRoot);

_quickTween = gsap.to({}, {
  duration: 0
}); // ---- EXTRA PLUGINS --------------------------------------------------------

var _addModifiers = function _addModifiers(tween, modifiers) {
  var targets = tween._targets,
      p,
      i,
      pt;

  for (p in modifiers) {
    i = targets.length;

    while (i--) {
      pt = tween._ptLookup[i][p];

      if (pt) {
        if (pt.d.modifier) {
          pt.d.modifier(modifiers[p], tween, targets[i], p);
        }
      }
    }
  }
},
    _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
  return {
    name: name,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function init(target, vars, tween) {
      tween._onInit = function (tween) {
        var temp, p;

        if (_isString(vars)) {
          temp = {};

          _forEachName(vars, function (name) {
            return temp[name] = 1;
          }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


          vars = temp;
        }

        if (modifier) {
          temp = {};

          for (p in vars) {
            temp[p] = modifier(vars[p]);
          }

          vars = temp;
        }

        _addModifiers(tween, vars);
      };
    }
  };
}; //register core plugins


gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    for (var p in vars) {
      this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p); //this.add(target, "setAttribute", (target.getAttribute((p in target.dataset ? (p = "data-" + p) : p)) || 0) + "", vars[p], index, targets, 0, 0, p);

      this._props.push(p);
    }
  }
}, {
  name: "endArray",
  init: function init(target, value) {
    var i = value.length;

    while (i--) {
      this.add(target, i, target[i], value[i]);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap));
Tween.version = Timeline.version = gsap.version = "3.0.1";
_coreReady = 1;

if (_windowExists()) {
  _wake();
}

var Power0 = _easeMap.Power0,
    Power1 = _easeMap.Power1,
    Power2 = _easeMap.Power2,
    Power3 = _easeMap.Power3,
    Power4 = _easeMap.Power4,
    Linear = _easeMap.Linear,
    Quad = _easeMap.Quad,
    Cubic = _easeMap.Cubic,
    Quart = _easeMap.Quart,
    Quint = _easeMap.Quint,
    Strong = _easeMap.Strong,
    Elastic = _easeMap.Elastic,
    Back = _easeMap.Back,
    SteppedEase = _easeMap.SteppedEase,
    Bounce = _easeMap.Bounce,
    Sine = _easeMap.Sine,
    Expo = _easeMap.Expo,
    Circ = _easeMap.Circ;

 //export some internal methods/orojects for use in CSSPlugin so that we can externalize that file and allow custom builds that exclude it.



/***/ }),

/***/ "./node_modules/gsap/utils/matrix.js":
/*!*******************************************!*\
  !*** ./node_modules/gsap/utils/matrix.js ***!
  \*******************************************/
/*! exports provided: Matrix2D, getGlobalMatrix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix2D", function() { return Matrix2D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGlobalMatrix", function() { return getGlobalMatrix; });
/*!
 * matrix 3.0.0
 * https://greensock.com
 *
 * Copyright 2008-2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _doc,
    _win,
    _docElement,
    _body,
    _divContainer,
    _svgContainer,
    _identityMatrix,
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _setDoc = function _setDoc(element) {
  var doc = element.ownerDocument || element;

  if (!(_transformProp in element.style) && "msTransform" in element.style) {
    //to improve compatibility with old Microsoft browsers
    _transformProp = "msTransform";
    _transformOriginProp = _transformProp + "Origin";
  }

  while (doc.parentNode && (doc = doc.parentNode)) {}

  _win = window;
  _identityMatrix = new Matrix2D();

  if (doc) {
    _doc = doc;
    _docElement = doc.documentElement;
    _body = doc.body;
  }

  return doc;
},
    _svgTemps = [],
    //we create 3 elements for SVG, and 3 for other DOM elements and cache them for performance reasons. They get nested in _divContainer and _svgContainer so that just one element is added to the DOM on each successive attempt. Again, performance is key.
_divTemps = [],
    _getDocScrollTop = function _getDocScrollTop() {
  return _win.pageYOffset || _doc.scrollTop || _docElement.scrollTop || _body.scrollTop || 0;
},
    _getDocScrollLeft = function _getDocScrollLeft() {
  return _win.pageXOffset || _doc.scrollLeft || _docElement.scrollLeft || _body.scrollLeft || 0;
},
    _svgOwner = function _svgOwner(element) {
  return element.ownerSVGElement || ((element.tagName + "").toLowerCase() === "svg" ? element : null);
},
    _createSibling = function _createSibling(element, i) {
  if (element.parentNode && (_doc || _setDoc(element))) {
    var svg = _svgOwner(element),
        ns = svg ? svg.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml",
        type = svg ? i ? "rect" : "g" : "div",
        x = i !== 2 ? 0 : 100,
        y = i === 3 ? 100 : 0,
        css = "position:absolute;display:block;",
        e = _doc.createElementNS ? _doc.createElementNS(ns.replace(/^https/, "http"), type) : _doc.createElement(type);

    if (i) {
      if (!svg) {
        if (!_divContainer) {
          _divContainer = _createSibling(element);
          _divContainer.style.cssText = css;
        }

        e.style.cssText = css + "width:1px;height:1px;top:" + y + "px;left:" + x + "px";

        _divContainer.appendChild(e);
      } else {
        if (!_svgContainer) {
          _svgContainer = _createSibling(element);
        }

        e.setAttribute("width", 1);
        e.setAttribute("height", 1);
        e.setAttribute("transform", "translate(" + x + "," + y + ")");

        _svgContainer.appendChild(e);
      }
    }

    return e;
  }

  throw "Need document and parent.";
},
    _placeSiblings = function _placeSiblings(element) {
  var svg = _svgOwner(element),
      isRootSVG = element === svg,
      siblings = svg ? _svgTemps : _divTemps,
      container,
      m,
      b,
      x,
      y;

  if (element === _win) {
    return element;
  }

  if (!siblings.length) {
    siblings.push(_createSibling(element, 1), _createSibling(element, 2), _createSibling(element, 3));
  }

  container = svg ? _svgContainer : _divContainer;

  if (svg) {
    b = isRootSVG ? {
      x: 0,
      y: 0
    } : element.getBBox();
    m = element.transform.baseVal;

    if (m.length) {
      m = m.consolidate().matrix;
      x = m.a * b.x + m.c * b.y;
      y = m.b * b.x + m.d * b.y;
    } else {
      m = _identityMatrix;

      if (element.tagName.toLowerCase() === "g") {
        x = y = 0;
      } else {
        x = b.x;
        y = b.y;
      }
    }

    container.setAttribute("transform", "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + (m.e + x) + "," + (m.f + y) + ")");
    (isRootSVG ? svg : element.parentNode).appendChild(container);
  } else {
    container.style.top = element.offsetTop + "px";
    container.style.left = element.offsetLeft + "px";
    m = _win.getComputedStyle(element);
    container.style[_transformProp] = m[_transformProp];
    container.style[_transformOriginProp] = m[_transformOriginProp];
    element.parentNode.appendChild(container);
  }

  return container;
},
    _setMatrix = function _setMatrix(m, a, b, c, d, e, f) {
  m.a = a;
  m.b = b;
  m.c = c;
  m.d = d;
  m.e = e;
  m.f = f;
  return m;
};

var Matrix2D =
/*#__PURE__*/
function () {
  function Matrix2D(a, b, c, d, e, f) {
    if (a === void 0) {
      a = 1;
    }

    if (b === void 0) {
      b = 0;
    }

    if (c === void 0) {
      c = 0;
    }

    if (d === void 0) {
      d = 1;
    }

    if (e === void 0) {
      e = 0;
    }

    if (f === void 0) {
      f = 0;
    }

    _setMatrix(this, a, b, c, d, e, f);
  }

  var _proto = Matrix2D.prototype;

  _proto.inverse = function inverse() {
    var a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f,
        determinant = a * d - b * c;
    return _setMatrix(this, d / determinant, -b / determinant, -c / determinant, a / determinant, (c * f - d * e) / determinant, -(a * f - b * e) / determinant);
  };

  _proto.multiply = function multiply(matrix) {
    var a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f,
        a2 = matrix.a,
        b2 = matrix.c,
        c2 = matrix.b,
        d2 = matrix.d,
        e2 = matrix.e,
        f2 = matrix.f;
    return _setMatrix(this, a2 * a + c2 * c, a2 * b + c2 * d, b2 * a + d2 * c, b2 * b + d2 * d, e + e2 * a + f2 * c, f + e2 * b + f2 * d);
  };

  _proto.equals = function equals(matrix) {
    var a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f;
    return a === matrix.a && b === matrix.b && c === matrix.c && d === matrix.d && e === matrix.e && f === matrix.f;
  };

  _proto.apply = function apply(point, decoratee) {
    if (decoratee === void 0) {
      decoratee = {};
    }

    var x = point.x,
        y = point.y,
        a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f;
    decoratee.x = x * a + y * c + e;
    decoratee.y = x * b + y * d + f;
    return decoratee;
  };

  return Matrix2D;
}(); //feed in an element and it'll return a 2D matrix (optionally inverted) so that you can translate between coordinate spaces.
// Inverting lets you translate a global point into a local coordinate space. No inverting lets you go the other way.
// We needed this to work around various browser bugs, like Firefox doesn't accurately report getScreenCTM() when there
// are transforms applied to ancestor elements.
// The matrix math to convert any x/y coordinate is:
//     tx = m.a * x + m.c * y + m.e
//     ty = m.b * x + m.d * y + m.f

function getGlobalMatrix(element, inverse) {
  if (!element.parentNode) {
    return new Matrix2D();
  }

  var svg = _svgOwner(element),
      temps = svg ? _svgTemps : _divTemps,
      container = _placeSiblings(element),
      b1 = temps[0].getBoundingClientRect(),
      b2 = temps[1].getBoundingClientRect(),
      b3 = temps[2].getBoundingClientRect(),
      parent = container.parentNode,
      m = new Matrix2D((b2.left - b1.left) / 100, (b2.top - b1.top) / 100, (b3.left - b1.left) / 100, (b3.top - b1.top) / 100, b1.left + _getDocScrollLeft(), b1.top + _getDocScrollTop());

  parent.removeChild(container);
  return inverse ? m.inverse() : m;
}

/***/ }),

/***/ "./node_modules/gsap/utils/paths.js":
/*!******************************************!*\
  !*** ./node_modules/gsap/utils/paths.js ***!
  \******************************************/
/*! exports provided: getRawPath, copyRawPath, reverseSegment, convertToPath, getRotationAtProgress, sliceRawPath, cacheRawPathMeasurements, subdivideSegment, getPositionOnPath, transformRawPath, stringToRawPath, bezierToPoints, flatPointsToSegment, pointsToSegment, simplifyPoints, getClosestData, subdivideSegmentNear, rawPathToString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRawPath", function() { return getRawPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyRawPath", function() { return copyRawPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverseSegment", function() { return reverseSegment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToPath", function() { return convertToPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRotationAtProgress", function() { return getRotationAtProgress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sliceRawPath", function() { return sliceRawPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cacheRawPathMeasurements", function() { return cacheRawPathMeasurements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subdivideSegment", function() { return subdivideSegment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPositionOnPath", function() { return getPositionOnPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformRawPath", function() { return transformRawPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToRawPath", function() { return stringToRawPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bezierToPoints", function() { return bezierToPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatPointsToSegment", function() { return flatPointsToSegment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointsToSegment", function() { return pointsToSegment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "simplifyPoints", function() { return simplifyPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClosestData", function() { return getClosestData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subdivideSegmentNear", function() { return subdivideSegmentNear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rawPathToString", function() { return rawPathToString; });
/*!
 * paths 3.0.0
 * https://greensock.com
 *
 * Copyright 2008-2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _svgPathExp = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
    _numbersExp = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
    _scientific = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,
    _selectorExp = /(^[#\.][a-z]|[a-y][a-z])/i,
    _DEG2RAD = Math.PI / 180,
    _RAD2DEG = 180 / Math.PI,
    _sin = Math.sin,
    _cos = Math.cos,
    _abs = Math.abs,
    _sqrt = Math.sqrt,
    _atan2 = Math.atan2,
    _largeNum = 1e8,
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _temp = {},
    _temp2 = {},
    _roundingNum = 1e5,
    _wrapProgress = function _wrapProgress(progress) {
  return Math.round((progress + _largeNum) % 1 * _roundingNum) / _roundingNum || (progress < 0 ? 0 : 1);
},
    //if progress lands on 1, the % will make it 0 which is why we || 1, but not if it's negative because it makes more sense for motion to end at 0 in that case.
_round = function _round(value) {
  return ~~(value * _roundingNum + (value < 0 ? -.5 : .5)) / _roundingNum;
},
    _splitSegment = function _splitSegment(rawPath, segIndex, i, t) {
  var segment = rawPath[segIndex],
      shift = t === 1 ? 6 : subdivideSegment(segment, i, t);

  if (shift && shift + i + 2 < segment.length) {
    rawPath.splice(segIndex, 0, segment.slice(0, i + shift + 2));
    segment.splice(0, i + shift);
    return 1;
  }
},
    _reverseRawPath = function _reverseRawPath(rawPath, skipOuter) {
  var i = rawPath.length;

  if (!skipOuter) {
    rawPath.reverse();
  }

  while (i--) {
    if (!rawPath[i].reversed) {
      reverseSegment(rawPath[i]);
    }
  }
},
    _copyMetaData = function _copyMetaData(source, copy) {
  copy.totalLength = source.totalLength;

  if (source.samples) {
    //segment
    copy.samples = source.samples.slice(0);
    copy.lookup = source.lookup.slice(0);
    copy.minLength = source.minLength;
    copy.resolution = source.resolution;
  } else {
    //rawPath
    copy.totalPoints = source.totalPoints;
  }

  return copy;
},
    //pushes a new segment into a rawPath, but if its starting values match the ending values of the last segment, it'll merge it into that same segment (to reduce the number of segments)
_appendOrMerge = function _appendOrMerge(rawPath, segment) {
  var index = rawPath.length,
      prevSeg = rawPath[index - 1] || [],
      l = prevSeg.length;

  if (segment[0] === prevSeg[l - 2] && segment[1] === prevSeg[l - 1]) {
    segment = prevSeg.concat(segment.slice(2));
    index--;
  }

  rawPath[index] = segment;
},
    _bestDistance;
/* TERMINOLOGY
 - RawPath - an array of arrays, one for each Segment. A single RawPath could have multiple "M" commands, defining Segments (paths aren't always connected).
 - Segment - an array containing a sequence of Cubic Bezier coordinates in alternating x, y, x, y format. Starting anchor, then control point 1, control point 2, and ending anchor, then the next control point 1, control point 2, anchor, etc. Uses less memory than an array with a bunch of {x, y} points.
 - Bezier - a single cubic Bezier with a starting anchor, two control points, and an ending anchor.
 - the variable "t" is typically the position along an individual Bezier path (time) and it's NOT linear, meaning it could accelerate/decelerate based on the control points whereas the "p" or "progress" value is linearly mapped to the whole path, so it shouldn't really accelerate/decelerate based on control points. So a progress of 0.2 would be almost exactly 20% along the path. "t" is ONLY in an individual Bezier piece.
 */
//accepts basic selector text, a path instance, a RawPath instance, or a Segment and returns a RawPath (makes it easy to homogenize things). If an element or selector text is passed in, it'll also cache the value so that if it's queried again, it'll just take the path data from there instead of parsing it all over again (as long as the path data itself hasn't changed - it'll check).


function getRawPath(value) {
  value = _isString(value) && _selectorExp.test(value) ? document.querySelector(value) || value : value;
  var e = value.getAttribute ? value : 0,
      rawPath;

  if (e && (value = value.getAttribute("d"))) {
    //implements caching
    if (!e._gsPath) {
      e._gsPath = {};
    }

    rawPath = e._gsPath[value];
    return rawPath && !rawPath._dirty ? rawPath : e._gsPath[value] = stringToRawPath(value);
  }

  return !value ? console.warn("Expecting a <path> element or an SVG path data string") : _isString(value) ? stringToRawPath(value) : _isNumber(value[0]) ? [value] : value;
} //copies a RawPath WITHOUT the length meta data (for speed)

function copyRawPath(rawPath) {
  var a = [],
      i = 0;

  for (; i < rawPath.length; i++) {
    a[i] = _copyMetaData(rawPath[i], rawPath[i].slice(0));
  }

  return _copyMetaData(rawPath, a);
}
function reverseSegment(segment) {
  var i = 0,
      y;
  segment.reverse(); //this will invert the order y, x, y, x so we must flip it back.

  for (; i < segment.length; i += 2) {
    y = segment[i];
    segment[i] = segment[i + 1];
    segment[i + 1] = y;
  }

  segment.reversed = !segment.reversed;
}

var _createPath = function _createPath(e, ignore) {
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path"),
      attr = [].slice.call(e.attributes),
      i = attr.length,
      name;
  ignore = "," + ignore + ",";

  while (--i > -1) {
    name = attr[i].nodeName.toLowerCase(); //in Microsoft Edge, if you don't set the attribute with a lowercase name, it doesn't render correctly! Super weird.

    if (ignore.indexOf("," + name + ",") < 0) {
      path.setAttributeNS(null, name, attr[i].nodeValue);
    }
  }

  return path;
},
    _typeAttrs = {
  rect: "rx,ry,x,y,width,height",
  circle: "r,cx,cy",
  ellipse: "rx,ry,cx,cy",
  line: "x1,x2,y1,y2"
},
    _attrToObj = function _attrToObj(e, attrs) {
  var props = attrs ? attrs.split(",") : [],
      obj = {},
      i = props.length;

  while (--i > -1) {
    obj[props[i]] = +e.getAttribute(props[i]) || 0;
  }

  return obj;
}; //converts an SVG shape like <circle>, <rect>, <polygon>, <polyline>, <ellipse>, etc. to a <path>, swapping it in and copying the attributes to match.


function convertToPath(element, swap) {
  var type = element.tagName.toLowerCase(),
      circ = 0.552284749831,
      data,
      x,
      y,
      r,
      ry,
      path,
      rcirc,
      rycirc,
      points,
      w,
      h,
      x2,
      x3,
      x4,
      x5,
      x6,
      y2,
      y3,
      y4,
      y5,
      y6,
      attr;

  if (type === "path" || !element.getBBox) {
    return element;
  }

  path = _createPath(element, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points");
  attr = _attrToObj(element, _typeAttrs[type]);

  if (type === "rect") {
    r = attr.rx;
    ry = attr.ry;
    x = attr.x;
    y = attr.y;
    w = attr.width - r * 2;
    h = attr.height - ry * 2;

    if (r || ry) {
      //if there are rounded corners, render cubic beziers
      x2 = x + r * (1 - circ);
      x3 = x + r;
      x4 = x3 + w;
      x5 = x4 + r * circ;
      x6 = x4 + r;
      y2 = y + ry * (1 - circ);
      y3 = y + ry;
      y4 = y3 + h;
      y5 = y4 + ry * circ;
      y6 = y4 + ry;
      data = "M" + x6 + "," + y3 + " V" + y4 + " C" + [x6, y5, x5, y6, x4, y6, x4 - (x4 - x3) / 3, y6, x3 + (x4 - x3) / 3, y6, x3, y6, x2, y6, x, y5, x, y4, x, y4 - (y4 - y3) / 3, x, y3 + (y4 - y3) / 3, x, y3, x, y2, x2, y, x3, y, x3 + (x4 - x3) / 3, y, x4 - (x4 - x3) / 3, y, x4, y, x5, y, x6, y2, x6, y3].join(",") + "z";
    } else {
      data = "M" + (x + w) + "," + y + " v" + h + " h" + -w + " v" + -h + " h" + w + "z";
    }
  } else if (type === "circle" || type === "ellipse") {
    if (type === "circle") {
      r = ry = attr.r;
      rycirc = r * circ;
    } else {
      r = attr.rx;
      ry = attr.ry;
      rycirc = ry * circ;
    }

    x = attr.cx;
    y = attr.cy;
    rcirc = r * circ;
    data = "M" + (x + r) + "," + y + " C" + [x + r, y + rycirc, x + rcirc, y + ry, x, y + ry, x - rcirc, y + ry, x - r, y + rycirc, x - r, y, x - r, y - rycirc, x - rcirc, y - ry, x, y - ry, x + rcirc, y - ry, x + r, y - rycirc, x + r, y].join(",") + "z";
  } else if (type === "line") {
    data = "M" + attr.x1 + "," + attr.y1 + " L" + attr.x2 + "," + attr.y2; //previously, we just converted to "Mx,y Lx,y" but Safari has bugs that cause that not to render properly when using a stroke-dasharray that's not fully visible! Using a cubic bezier fixes that issue.
  } else if (type === "polyline" || type === "polygon") {
    points = (element.getAttribute("points") + "").match(_numbersExp) || [];
    x = points.shift();
    y = points.shift();
    data = "M" + x + "," + y + " L" + points.join(",");

    if (type === "polygon") {
      data += "," + x + "," + y + "z";
    }
  }

  path.setAttribute("d", rawPathToString(path._gsRawPath = stringToRawPath(data)));

  if (swap && element.parentNode) {
    element.parentNode.insertBefore(path, element);
    element.parentNode.removeChild(element);
  }

  return path;
} //returns the rotation (in degrees) at a particular progress on a rawPath (the slope of the tangent)

function getRotationAtProgress(rawPath, progress) {
  var d = getProgressData(rawPath, progress >= 1 ? 1 - 1e-9 : progress ? progress : 1e-9);
  return getRotationAtBezierT(d.segment, d.i, d.t);
}

function getRotationAtBezierT(segment, i, t) {
  var a = segment[i],
      b = segment[i + 2],
      c = segment[i + 4],
      x;
  a += (b - a) * t;
  b += (c - b) * t;
  a += (b - a) * t;
  x = b + (c + (segment[i + 6] - c) * t - b) * t - a;
  a = segment[i + 1];
  b = segment[i + 3];
  c = segment[i + 5];
  a += (b - a) * t;
  b += (c - b) * t;
  a += (b - a) * t;
  return _round(_atan2(b + (c + (segment[i + 7] - c) * t - b) * t - a, x) * _RAD2DEG);
}

function sliceRawPath(rawPath, start, end) {
  if (_isUndefined(end)) {
    end = 1;
  }

  start = start || 0;
  var reverse = start > end,
      loops = Math.max(0, ~~(_abs(end - start) - 1e-8));

  if (reverse) {
    reverse = end;
    end = start;
    start = reverse;
    reverse = 1;
    loops -= loops ? 1 : 0;
  }

  if (start < 0 || end < 0) {
    var offset = ~~Math.min(start, end) + 1;
    start += offset;
    end += offset;
  }

  var path = copyRawPath(rawPath.totalLength ? rawPath : cacheRawPathMeasurements(rawPath)),
      wrap = end > 1,
      s = getProgressData(path, start, _temp),
      e = getProgressData(path, end, _temp2),
      eSeg = e.segment,
      sSeg = s.segment,
      eSegIndex = e.segIndex,
      sSegIndex = s.segIndex,
      ei = e.i,
      si = s.i,
      sameSegment = sSegIndex === eSegIndex,
      sameBezier = ei === si && sameSegment,
      invertedOrder = sameSegment && si > ei || sameBezier && s.t > e.t,
      sShift,
      eShift,
      i,
      copy,
      totalSegments,
      l,
      j;

  if (wrap || loops) {
    if (_splitSegment(path, sSegIndex, si, s.t)) {
      sShift = 1;
      sSegIndex++;

      if (sameBezier) {
        if (invertedOrder) {
          e.t /= s.t;
        } else {
          e.t = (e.t - s.t) / (1 - s.t);
          eSegIndex++;
          ei = 0;
        }
      } else if (sSegIndex <= eSegIndex + 1 && !invertedOrder) {
        eSegIndex++;

        if (sameSegment) {
          ei -= si;
        }
      }
    }

    if (!e.t) {
      eSegIndex--;

      if (reverse) {
        sSegIndex--;
      }
    } else if (_splitSegment(path, eSegIndex, ei, e.t)) {
      if (invertedOrder && sShift) {
        sSegIndex++;
      }

      if (reverse) {
        eSegIndex++;
      }
    }

    copy = [];
    totalSegments = path.length;
    l = 1 + totalSegments * loops;
    j = sSegIndex;

    if (reverse) {
      eSegIndex = (eSegIndex || totalSegments) - 1;
      l += (totalSegments - eSegIndex + sSegIndex) % totalSegments;

      for (i = 0; i < l; i++) {
        _appendOrMerge(copy, path[j]);

        j = (j || totalSegments) - 1;
      }
    } else {
      l += (totalSegments - sSegIndex + eSegIndex) % totalSegments;

      for (i = 0; i < l; i++) {
        _appendOrMerge(copy, path[j++ % totalSegments]);
      }
    }

    path = copy;
  } else {
    eShift = e.t === 1 ? 6 : subdivideSegment(eSeg, ei, e.t);

    if (start !== end) {
      sShift = subdivideSegment(sSeg, si, sameBezier ? s.t / e.t : s.t);

      if (sameSegment) {
        eShift += sShift;
      }

      eSeg.splice(ei + eShift + 2);

      if (sShift) {
        sSeg.splice(0, si + sShift);
      }

      i = path.length;

      while (i--) {
        //chop off any extra segments
        if (i < sSegIndex || i > eSegIndex) {
          path.splice(i, 1);
        }
      }
    } else {
      eSeg.angle = getRotationAtBezierT(eSeg, ei + eShift, 0); //record the value before we chop because it'll be impossible to determine the angle after its length is 0!

      ei += eShift;
      s = eSeg[ei];
      e = eSeg[ei + 1];
      eSeg.length = eSeg.totalLength = 0;
      eSeg.totalPoints = path.totalPoints = 8;
      eSeg.push(s, e, s, e, s, e, s, e);
    }
  }

  if (reverse) {
    _reverseRawPath(path, wrap || loops);
  }

  path.totalLength = 0;
  return path;
} //measures a Segment according to its resolution (so if segment.resolution is 6, for example, it'll take 6 samples equally across each Bezier) and create/populate a "samples" array that has the length up to each of those sample points (always increasing from the start) as well as a "lookup" array that's broken up according to the smallest distance between 2 samples. This gives us a very fast way of looking up a progress position rather than looping through all the points/Beziers. You can optionally have it only measure a subset, starting at startIndex and going for a specific number of beziers (remember, there are 3 x/y pairs each, for a total of 6 elements for each Bezier). It will also populate a "totalLength" property, but that's not generally super accurate because by default it'll only take 6 samples per Bezier. But for performance reasons, it's perfectly adequate for measuring progress values along the path. If you need a more accurate totalLength, either increase the resolution or use the more advanced bezierToPoints() method which keeps adding points until they don't deviate by more than a certain precision value.

function measureSegment(segment, startIndex, bezierQty) {
  startIndex = startIndex || 0;

  if (!segment.samples) {
    segment.samples = [];
    segment.lookup = [];
  }

  var resolution = ~~segment.resolution || 12,
      inc = 1 / resolution,
      endIndex = bezierQty ? startIndex + bezierQty * 6 + 1 : segment.length,
      x1 = segment[startIndex],
      y1 = segment[startIndex + 1],
      samplesIndex = startIndex ? startIndex / 6 * resolution : 0,
      samples = segment.samples,
      lookup = segment.lookup,
      min = (startIndex ? segment.minLength : _largeNum) || _largeNum,
      prevLength = samples[samplesIndex + bezierQty * resolution - 1],
      length = startIndex ? samples[samplesIndex - 1] : 0,
      i,
      j,
      x4,
      x3,
      x2,
      xd,
      xd1,
      y4,
      y3,
      y2,
      yd,
      yd1,
      inv,
      t,
      lengthIndex,
      l,
      segLength;
  samples.length = lookup.length = 0;

  for (j = startIndex + 2; j < endIndex; j += 6) {
    x4 = segment[j + 4] - x1;
    x3 = segment[j + 2] - x1;
    x2 = segment[j] - x1;
    y4 = segment[j + 5] - y1;
    y3 = segment[j + 3] - y1;
    y2 = segment[j + 1] - y1;
    xd = xd1 = yd = yd1 = 0;

    for (i = 1; i <= resolution; i++) {
      t = inc * i;
      inv = 1 - t;
      xd = xd1 - (xd1 = (t * t * x4 + 3 * inv * (t * x3 + inv * x2)) * t);
      yd = yd1 - (yd1 = (t * t * y4 + 3 * inv * (t * y3 + inv * y2)) * t);
      l = _sqrt(yd * yd + xd * xd);

      if (l < min) {
        min = l;
      }

      length += l;
      samples[samplesIndex++] = length;
    }

    x1 += x4;
    y1 += y4;
  }

  if (prevLength) {
    prevLength -= length;

    for (; samplesIndex < samples.length; samplesIndex++) {
      samples[samplesIndex] += prevLength;
    }
  }

  if (samples.length && min) {
    segment.totalLength = segLength = samples[samples.length - 1] || 0;
    segment.minLength = min;
    l = lengthIndex = 0;

    for (i = 0; i < segLength; i += min) {
      lookup[l++] = samples[lengthIndex] < i ? ++lengthIndex : lengthIndex;
    }
  } else {
    segment.totalLength = samples[0] = 0;
  }

  return startIndex ? length - samples[startIndex / 2 - 1] : length;
}

function cacheRawPathMeasurements(rawPath, resolution) {
  var pathLength, points, i;

  for (i = pathLength = points = 0; i < rawPath.length; i++) {
    rawPath[i].resolution = ~~resolution || 12; //steps per Bezier curve (anchor, 2 control points, to anchor)

    points += rawPath[i].length;
    pathLength += measureSegment(rawPath[i]);
  }

  rawPath.totalPoints = points;
  rawPath.totalLength = pathLength;
  return rawPath;
} //divide segment[i] at position t (value between 0 and 1, progress along that particular cubic bezier segment that starts at segment[i]). Returns how many elements were spliced into the segment array (either 0 or 6)

function subdivideSegment(segment, i, t) {
  if (t <= 0 || t >= 1) {
    return 0;
  }

  var ax = segment[i],
      ay = segment[i + 1],
      cp1x = segment[i + 2],
      cp1y = segment[i + 3],
      cp2x = segment[i + 4],
      cp2y = segment[i + 5],
      bx = segment[i + 6],
      by = segment[i + 7],
      x1a = ax + (cp1x - ax) * t,
      x2 = cp1x + (cp2x - cp1x) * t,
      y1a = ay + (cp1y - ay) * t,
      y2 = cp1y + (cp2y - cp1y) * t,
      x1 = x1a + (x2 - x1a) * t,
      y1 = y1a + (y2 - y1a) * t,
      x2a = cp2x + (bx - cp2x) * t,
      y2a = cp2y + (by - cp2y) * t;
  x2 += (x2a - x2) * t;
  y2 += (y2a - y2) * t;
  segment.splice(i + 2, 4, _round(x1a), //first control point
  _round(y1a), _round(x1), //second control point
  _round(y1), _round(x1 + (x2 - x1) * t), //new fabricated anchor on line
  _round(y1 + (y2 - y1) * t), _round(x2), //third control point
  _round(y2), _round(x2a), //fourth control point
  _round(y2a));

  if (segment.samples) {
    segment.samples.splice(i / 6 * segment.resolution | 0, 0, 0, 0, 0, 0, 0, 0);
  }

  return 6;
} // returns an object {path, segment, segIndex, i, t}

function getProgressData(rawPath, progress, decoratee) {
  decoratee = decoratee || {};

  if (!rawPath.totalLength) {
    cacheRawPathMeasurements(rawPath);
  }

  if (progress < 0 || progress > 1) {
    progress = _wrapProgress(progress);
  }

  var segIndex = 0,
      segment = rawPath[0],
      samples,
      resolution,
      length,
      min,
      max,
      i;

  if (rawPath.length > 1) {
    //speed optimization: most of the time, there's only one segment so skip the recursion.
    length = rawPath.totalLength * progress;
    max = i = 0;

    while ((max += rawPath[i++].totalLength) < length) {
      segIndex = i;
    }

    segment = rawPath[segIndex];
    min = max - segment.totalLength;
    progress = (length - min) / (max - min) || 0;
  }

  samples = segment.samples;
  resolution = segment.resolution; //how many samples per cubic bezier chunk

  length = segment.totalLength * progress;
  i = segment.lookup[~~(length / segment.minLength)] || 0;
  min = i ? samples[i - 1] : 0;
  max = samples[i];

  if (max < length) {
    min = max;
    max = samples[++i];
  }

  decoratee.path = rawPath;
  decoratee.segment = segment;
  decoratee.segIndex = segIndex;
  decoratee.i = ~~(i / resolution) * 6;
  decoratee.t = 1 / resolution * ((length - min) / (max - min) + i % resolution);
  return decoratee;
}

function getPositionOnPath(rawPath, progress, includeAngle, point) {
  var segment = rawPath[0],
      result = point || {},
      samples,
      resolution,
      length,
      min,
      max,
      i,
      t,
      a,
      inv;

  if (progress < 0 || progress > 1) {
    progress = _wrapProgress(progress);
  }

  if (rawPath.length > 1) {
    //speed optimization: most of the time, there's only one segment so skip the recursion.
    length = rawPath.totalLength * progress;
    max = i = 0;

    while ((max += rawPath[i++].totalLength) < length) {
      segment = rawPath[i];
    }

    min = max - segment.totalLength;
    progress = (length - min) / (max - min) || 0;
  }

  samples = segment.samples;
  resolution = segment.resolution;
  length = segment.totalLength * progress;
  i = segment.lookup[~~(length / segment.minLength)] || 0;
  min = i ? samples[i - 1] : 0;
  max = samples[i];

  if (max < length) {
    min = max;
    max = samples[++i];
  }

  t = 1 / resolution * ((length - min) / (max - min) + i % resolution) || 0;
  inv = 1 - t;
  i = ~~(i / resolution) * 6;
  a = segment[i];
  result.x = _round((t * t * (segment[i + 6] - a) + 3 * inv * (t * (segment[i + 4] - a) + inv * (segment[i + 2] - a))) * t + a);
  result.y = _round((t * t * (segment[i + 7] - (a = segment[i + 1])) + 3 * inv * (t * (segment[i + 5] - a) + inv * (segment[i + 3] - a))) * t + a);

  if (includeAngle) {
    result.angle = segment.totalLength ? getRotationAtBezierT(segment, i, t >= 1 ? 1 - 1e-9 : t ? t : 1e-9) : segment.angle || 0;
  }

  return result;
} //applies a matrix transform to RawPath (or a segment in a RawPath) and returns whatever was passed in (it transforms the values in the array(s), not a copy).

function transformRawPath(rawPath, a, b, c, d, tx, ty) {
  var j = rawPath.length,
      segment,
      l,
      i,
      x,
      y;

  while (--j > -1) {
    segment = rawPath[j];
    l = segment.length;

    for (i = 0; i < l; i += 2) {
      x = segment[i];
      y = segment[i + 1];
      segment[i] = x * a + y * c + tx;
      segment[i + 1] = x * b + y * d + ty;
    }
  }

  rawPath._dirty = 1;
  return rawPath;
} // translates SVG arc data into a segment (cubic beziers). Angle is in degrees.

function arcToSegment(lastX, lastY, rx, ry, angle, largeArcFlag, sweepFlag, x, y) {
  if (lastX === x && lastY === y) {
    return;
  }

  rx = _abs(rx);
  ry = _abs(ry);

  var angleRad = angle % 360 * _DEG2RAD,
      cosAngle = _cos(angleRad),
      sinAngle = _sin(angleRad),
      PI = Math.PI,
      TWOPI = PI * 2,
      dx2 = (lastX - x) / 2,
      dy2 = (lastY - y) / 2,
      x1 = cosAngle * dx2 + sinAngle * dy2,
      y1 = -sinAngle * dx2 + cosAngle * dy2,
      x1_sq = x1 * x1,
      y1_sq = y1 * y1,
      radiiCheck = x1_sq / (rx * rx) + y1_sq / (ry * ry);

  if (radiiCheck > 1) {
    rx = _sqrt(radiiCheck) * rx;
    ry = _sqrt(radiiCheck) * ry;
  }

  var rx_sq = rx * rx,
      ry_sq = ry * ry,
      sq = (rx_sq * ry_sq - rx_sq * y1_sq - ry_sq * x1_sq) / (rx_sq * y1_sq + ry_sq * x1_sq);

  if (sq < 0) {
    sq = 0;
  }

  var coef = (largeArcFlag === sweepFlag ? -1 : 1) * _sqrt(sq),
      cx1 = coef * (rx * y1 / ry),
      cy1 = coef * -(ry * x1 / rx),
      sx2 = (lastX + x) / 2,
      sy2 = (lastY + y) / 2,
      cx = sx2 + (cosAngle * cx1 - sinAngle * cy1),
      cy = sy2 + (sinAngle * cx1 + cosAngle * cy1),
      ux = (x1 - cx1) / rx,
      uy = (y1 - cy1) / ry,
      vx = (-x1 - cx1) / rx,
      vy = (-y1 - cy1) / ry,
      temp = ux * ux + uy * uy,
      angleStart = (uy < 0 ? -1 : 1) * Math.acos(ux / _sqrt(temp)),
      angleExtent = (ux * vy - uy * vx < 0 ? -1 : 1) * Math.acos((ux * vx + uy * vy) / _sqrt(temp * (vx * vx + vy * vy)));

  if (isNaN(angleExtent)) {
    //rare edge case. Math.cos(-1) is NaN.
    angleExtent = PI;
  }

  if (!sweepFlag && angleExtent > 0) {
    angleExtent -= TWOPI;
  } else if (sweepFlag && angleExtent < 0) {
    angleExtent += TWOPI;
  }

  angleStart %= TWOPI;
  angleExtent %= TWOPI;

  var segments = Math.ceil(_abs(angleExtent) / (TWOPI / 4)),
      rawPath = [],
      angleIncrement = angleExtent / segments,
      controlLength = 4 / 3 * _sin(angleIncrement / 2) / (1 + _cos(angleIncrement / 2)),
      ma = cosAngle * rx,
      mb = sinAngle * rx,
      mc = sinAngle * -ry,
      md = cosAngle * ry,
      i;

  for (i = 0; i < segments; i++) {
    angle = angleStart + i * angleIncrement;
    x1 = _cos(angle);
    y1 = _sin(angle);
    ux = _cos(angle += angleIncrement);
    uy = _sin(angle);
    rawPath.push(x1 - controlLength * y1, y1 + controlLength * x1, ux + controlLength * uy, uy - controlLength * ux, ux, uy);
  } //now transform according to the actual size of the ellipse/arc (the beziers were noramlized, between 0 and 1 on a circle).


  for (i = 0; i < rawPath.length; i += 2) {
    x1 = rawPath[i];
    y1 = rawPath[i + 1];
    rawPath[i] = x1 * ma + y1 * mc + cx;
    rawPath[i + 1] = x1 * mb + y1 * md + cy;
  }

  rawPath[i - 2] = x; //always set the end to exactly where it's supposed to be

  rawPath[i - 1] = y;
  return rawPath;
} //Spits back a RawPath with absolute coordinates. Each segment starts with a "moveTo" command (x coordinate, then y) and then 2 control points (x, y, x, y), then anchor. The goal is to minimize memory and maximize speed.


function stringToRawPath(d) {
  var a = (d + "").replace(_scientific, function (m) {
    var n = +m;
    return n < 0.0001 && n > -0.0001 ? 0 : n;
  }).match(_svgPathExp) || [],
      //some authoring programs spit out very small numbers in scientific notation like "1e-5", so make sure we round that down to 0 first.
  path = [],
      relativeX = 0,
      relativeY = 0,
      twoThirds = 2 / 3,
      elements = a.length,
      points = 0,
      errorMessage = "ERROR: malformed path: " + d,
      i,
      j,
      x,
      y,
      command,
      isRelative,
      segment,
      startX,
      startY,
      difX,
      difY,
      beziers,
      prevCommand,
      line = function line(sx, sy, ex, ey) {
    difX = (ex - sx) / 3;
    difY = (ey - sy) / 3;
    segment.push(sx + difX, sy + difY, ex - difX, ey - difY, ex, ey);
  };

  if (!d || !isNaN(a[0]) || isNaN(a[1])) {
    console.log(errorMessage);
    return path;
  }

  for (i = 0; i < elements; i++) {
    prevCommand = command;

    if (isNaN(a[i])) {
      command = a[i].toUpperCase();
      isRelative = command !== a[i]; //lower case means relative
    } else {
      //commands like "C" can be strung together without any new command characters between.
      i--;
    }

    x = +a[i + 1];
    y = +a[i + 2];

    if (isRelative) {
      x += relativeX;
      y += relativeY;
    }

    if (!i) {
      startX = x;
      startY = y;
    } // "M" (move)


    if (command === "M") {
      if (segment) {
        if (segment.length < 8) {
          //if the path data was funky and just had a M with no actual drawing anywhere, skip it.
          path.length -= 1;
        } else {
          points += segment.length;
        }
      }

      relativeX = startX = x;
      relativeY = startY = y;
      segment = [x, y];
      path.push(segment);
      i += 2;
      command = "L"; //an "M" with more than 2 values gets interpreted as "lineTo" commands ("L").
      // "C" (cubic bezier)
    } else if (command === "C") {
      if (!segment) {
        segment = [0, 0];
      }

      if (!isRelative) {
        relativeX = relativeY = 0;
      } //note: "*1" is just a fast/short way to cast the value as a Number. WAAAY faster in Chrome, slightly slower in Firefox.


      segment.push(x, y, relativeX + a[i + 3] * 1, relativeY + a[i + 4] * 1, relativeX += a[i + 5] * 1, relativeY += a[i + 6] * 1);
      i += 6; // "S" (continuation of cubic bezier)
    } else if (command === "S") {
      difX = relativeX;
      difY = relativeY;

      if (prevCommand === "C" || prevCommand === "S") {
        difX += relativeX - segment[segment.length - 4];
        difY += relativeY - segment[segment.length - 3];
      }

      if (!isRelative) {
        relativeX = relativeY = 0;
      }

      segment.push(difX, difY, x, y, relativeX += a[i + 3] * 1, relativeY += a[i + 4] * 1);
      i += 4; // "Q" (quadratic bezier)
    } else if (command === "Q") {
      difX = relativeX + (x - relativeX) * twoThirds;
      difY = relativeY + (y - relativeY) * twoThirds;

      if (!isRelative) {
        relativeX = relativeY = 0;
      }

      relativeX += a[i + 3] * 1;
      relativeY += a[i + 4] * 1;
      segment.push(difX, difY, relativeX + (x - relativeX) * twoThirds, relativeY + (y - relativeY) * twoThirds, relativeX, relativeY);
      i += 4; // "T" (continuation of quadratic bezier)
    } else if (command === "T") {
      difX = relativeX - segment[segment.length - 4];
      difY = relativeY - segment[segment.length - 3];
      segment.push(relativeX + difX, relativeY + difY, x + (relativeX + difX * 1.5 - x) * twoThirds, y + (relativeY + difY * 1.5 - y) * twoThirds, relativeX = x, relativeY = y);
      i += 2; // "H" (horizontal line)
    } else if (command === "H") {
      line(relativeX, relativeY, relativeX = x, relativeY);
      i += 1; // "V" (vertical line)
    } else if (command === "V") {
      //adjust values because the first (and only one) isn't x in this case, it's y.
      line(relativeX, relativeY, relativeX, relativeY = x + (isRelative ? relativeY - relativeX : 0));
      i += 1; // "L" (line) or "Z" (close)
    } else if (command === "L" || command === "Z") {
      if (command === "Z") {
        x = startX;
        y = startY;
        segment.closed = true;
      }

      if (command === "L" || _abs(relativeX - x) > 0.5 || _abs(relativeY - y) > 0.5) {
        line(relativeX, relativeY, x, y);

        if (command === "L") {
          i += 2;
        }
      }

      relativeX = x;
      relativeY = y; // "A" (arc)
    } else if (command === "A") {
      beziers = arcToSegment(relativeX, relativeY, +a[i + 1], +a[i + 2], +a[i + 3], +a[i + 4], +a[i + 5], (isRelative ? relativeX : 0) + a[i + 6] * 1, (isRelative ? relativeY : 0) + a[i + 7] * 1);

      if (beziers) {
        for (j = 0; j < beziers.length; j++) {
          segment.push(beziers[j]);
        }
      }

      relativeX = segment[segment.length - 2];
      relativeY = segment[segment.length - 1];
      i += 7;
    } else {
      console.log(errorMessage);
    }
  }

  i = segment.length;

  if (i < 6) {
    //in case there's odd SVG like a M0,0 command at the very end.
    path.pop();
    i = 0;
  } else if (segment[0] === segment[i - 2] && segment[1] === segment[i - 1]) {
    segment.closed = true;
  }

  path.totalPoints = points + i;
  return path;
} //populates the points array in alternating x/y values (like [x, y, x, y...] instead of individual point objects [{x, y}, {x, y}...] to conserve memory and stay in line with how we're handling segment arrays

function bezierToPoints(x1, y1, x2, y2, x3, y3, x4, y4, threshold, points, index) {
  var x12 = (x1 + x2) / 2,
      y12 = (y1 + y2) / 2,
      x23 = (x2 + x3) / 2,
      y23 = (y2 + y3) / 2,
      x34 = (x3 + x4) / 2,
      y34 = (y3 + y4) / 2,
      x123 = (x12 + x23) / 2,
      y123 = (y12 + y23) / 2,
      x234 = (x23 + x34) / 2,
      y234 = (y23 + y34) / 2,
      x1234 = (x123 + x234) / 2,
      y1234 = (y123 + y234) / 2,
      dx = x4 - x1,
      dy = y4 - y1,
      d2 = _abs((x2 - x4) * dy - (y2 - y4) * dx),
      d3 = _abs((x3 - x4) * dy - (y3 - y4) * dx),
      length;

  if (!points) {
    points = [x1, y1, x4, y4];
    index = 2;
  }

  points.splice(index || points.length - 2, 0, x1234, y1234);

  if ((d2 + d3) * (d2 + d3) > threshold * (dx * dx + dy * dy)) {
    length = points.length;
    bezierToPoints(x1, y1, x12, y12, x123, y123, x1234, y1234, threshold, points, index);
    bezierToPoints(x1234, y1234, x234, y234, x34, y34, x4, y4, threshold, points, index + 2 + (points.length - length));
  }

  return points;
}
/*
function getAngleBetweenPoints(x0, y0, x1, y1, x2, y2) { //angle between 3 points in radians
	var dx1 = x1 - x0,
		dy1 = y1 - y0,
		dx2 = x2 - x1,
		dy2 = y2 - y1,
		dx3 = x2 - x0,
		dy3 = y2 - y0,
		a = dx1 * dx1 + dy1 * dy1,
		b = dx2 * dx2 + dy2 * dy2,
		c = dx3 * dx3 + dy3 * dy3;
	return Math.acos( (a + b - c) / _sqrt(4 * a * b) );
},
*/
//pointsToSegment() doesn't handle flat coordinates (where y is always 0) the way we need (the resulting control points are always right on top of the anchors), so this function basically makes the control points go directly up and down, varying in length based on the curviness (more curvy, further control points)

function flatPointsToSegment(points, curviness) {
  if (curviness === void 0) {
    curviness = 1;
  }

  var x = points[0],
      y = 0,
      segment = [x, y],
      i = 2;

  for (; i < points.length; i += 2) {
    segment.push(x, y, points[i], y = (points[i] - x) * curviness / 2, x = points[i], -y);
  }

  return segment;
} //points is an array of x/y points, like [x, y, x, y, x, y]

function pointsToSegment(points, curviness, cornerThreshold) {
  //points = simplifyPoints(points, tolerance);
  var l = points.length - 2,
      x = +points[0],
      y = +points[1],
      nextX = +points[2],
      nextY = +points[3],
      segment = [x, y, x, y],
      dx2 = nextX - x,
      dy2 = nextY - y,
      prevX,
      prevY,
      angle,
      slope,
      i,
      dx1,
      dx3,
      dy1,
      dy3,
      d1,
      d2,
      a,
      b,
      c;

  if (isNaN(cornerThreshold)) {
    cornerThreshold = Math.PI / 10;
  }

  curviness = curviness || curviness === 0 ? +curviness : 1;

  for (i = 2; i < l; i += 2) {
    prevX = x;
    prevY = y;
    x = nextX;
    y = nextY;
    nextX = +points[i + 2];
    nextY = +points[i + 3];
    dx1 = dx2;
    dy1 = dy2;
    dx2 = nextX - x;
    dy2 = nextY - y;
    dx3 = nextX - prevX;
    dy3 = nextY - prevY;
    a = dx1 * dx1 + dy1 * dy1;
    b = dx2 * dx2 + dy2 * dy2;
    c = dx3 * dx3 + dy3 * dy3;
    angle = Math.acos((a + b - c) / _sqrt(4 * a * b)); //angle between the 3 points

    d2 = angle / Math.PI * curviness; //temporary precalculation for speed (reusing d2 variable)

    d1 = _sqrt(a) * d2; //the tighter the angle, the shorter we make the handles in proportion.

    d2 *= _sqrt(b);

    if (x !== prevX || y !== prevY) {
      if (angle > cornerThreshold) {
        slope = _atan2(dy3, dx3);
        segment.push(_round(x - _cos(slope) * d1), //first control point
        _round(y - _sin(slope) * d1), _round(x), //anchor
        _round(y), _round(x + _cos(slope) * d2), //second control point
        _round(y + _sin(slope) * d2));
      } else {
        slope = _atan2(dy1, dx1);
        segment.push(_round(x - _cos(slope) * d1), //first control point
        _round(y - _sin(slope) * d1));
        slope = _atan2(dy2, dx2);
        segment.push(_round(x), //anchor
        _round(y), _round(x + _cos(slope) * d2), //second control point
        _round(y + _sin(slope) * d2));
      }
    }
  }

  segment.push(_round(nextX), _round(nextY), _round(nextX), _round(nextY));
  return segment;
} //returns the squared distance between an x/y coordinate and a segment between x1/y1 and x2/y2

function pointToSegDist(x, y, x1, y1, x2, y2) {
  var dx = x2 - x1,
      dy = y2 - y1,
      t;

  if (dx || dy) {
    t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);

    if (t > 1) {
      x1 = x2;
      y1 = y2;
    } else if (t > 0) {
      x1 += dx * t;
      y1 += dy * t;
    }
  }

  return Math.pow(x - x1, 2) + Math.pow(y - y1, 2);
}

function simplifyStep(points, first, last, tolerance, simplified) {
  var maxSqDist = tolerance,
      firstX = points[first],
      firstY = points[first + 1],
      lastX = points[last],
      lastY = points[last + 1],
      index,
      i,
      d;

  for (i = first + 2; i < last; i += 2) {
    d = pointToSegDist(points[i], points[i + 1], firstX, firstY, lastX, lastY);

    if (d > maxSqDist) {
      index = i;
      maxSqDist = d;
    }
  }

  if (maxSqDist > tolerance) {
    if (index - first > 2) {
      simplifyStep(points, first, index, tolerance, simplified);
    }

    simplified.push(points[index], points[index + 1]);

    if (last - index > 2) {
      simplifyStep(points, index, last, tolerance, simplified);
    }
  }
} //points is an array of x/y values like [x, y, x, y, x, y]


function simplifyPoints(points, tolerance) {
  var prevX = parseFloat(points[0]),
      prevY = parseFloat(points[1]),
      temp = [prevX, prevY],
      l = points.length - 2,
      i,
      x,
      y,
      dx,
      dy,
      result,
      last;
  tolerance = Math.pow(tolerance || 1, 2);

  for (i = 2; i < l; i += 2) {
    x = parseFloat(points[i]);
    y = parseFloat(points[i + 1]);
    dx = prevX - x;
    dy = prevY - y;

    if (dx * dx + dy * dy > tolerance) {
      temp.push(x, y);
      prevX = x;
      prevY = y;
    }
  }

  temp.push(parseFloat(points[l]), parseFloat(points[l + 1]));
  last = temp.length - 2;
  result = [temp[0], temp[1]];
  simplifyStep(temp, 0, last, tolerance, result);
  result.push(temp[last], temp[last + 1]);
  return result;
}

function getClosestProgressOnBezier(iterations, px, py, start, end, slices, x0, y0, x1, y1, x2, y2, x3, y3) {
  var inc = (end - start) / slices,
      best = 0,
      t = start,
      x,
      y,
      d,
      dx,
      dy,
      inv;
  _bestDistance = _largeNum;

  while (t <= end) {
    inv = 1 - t;
    x = inv * inv * inv * x0 + 3 * inv * inv * t * x1 + 3 * inv * t * t * x2 + t * t * t * x3;
    y = inv * inv * inv * y0 + 3 * inv * inv * t * y1 + 3 * inv * t * t * y2 + t * t * t * y3;
    dx = x - px;
    dy = y - py;
    d = dx * dx + dy * dy;

    if (d < _bestDistance) {
      _bestDistance = d;
      best = t;
    }

    t += inc;
  }

  return iterations > 1 ? getClosestProgressOnBezier(iterations - 1, px, py, Math.max(best - inc, 0), Math.min(best + inc, 1), slices, x0, y0, x1, y1, x2, y2, x3, y3) : best;
}

function getClosestData(rawPath, x, y, slices) {
  //returns an object with the closest j, i, and t (j is the segment index, i is the index of the point in that segment, and t is the time/progress along that bezier)
  var closest = {
    j: 0,
    i: 0,
    t: 0
  },
      bestDistance = _largeNum,
      i,
      j,
      t,
      segment;

  for (j = 0; j < rawPath.length; j++) {
    segment = rawPath[j];

    for (i = 0; i < segment.length; i += 6) {
      t = getClosestProgressOnBezier(1, x, y, 0, 1, slices || 20, segment[i], segment[i + 1], segment[i + 2], segment[i + 3], segment[i + 4], segment[i + 5], segment[i + 6], segment[i + 7]);

      if (bestDistance > _bestDistance) {
        bestDistance = _bestDistance;
        closest.j = j;
        closest.i = i;
        closest.t = t;
      }
    }
  }

  return closest;
} //subdivide a Segment closest to a specific x,y coordinate

function subdivideSegmentNear(x, y, segment, slices, iterations) {
  var l = segment.length,
      bestDistance = _largeNum,
      bestT = 0,
      bestSegmentIndex = 0,
      t,
      i;
  slices = slices || 20;
  iterations = iterations || 3;

  for (i = 0; i < l; i += 6) {
    t = getClosestProgressOnBezier(1, x, y, 0, 1, slices, segment[i], segment[i + 1], segment[i + 2], segment[i + 3], segment[i + 4], segment[i + 5], segment[i + 6], segment[i + 7]);

    if (bestDistance > _bestDistance) {
      bestDistance = _bestDistance;
      bestT = t;
      bestSegmentIndex = i;
    }
  }

  t = getClosestProgressOnBezier(iterations, x, y, bestT - 0.05, bestT + 0.05, slices, segment[bestSegmentIndex], segment[bestSegmentIndex + 1], segment[bestSegmentIndex + 2], segment[bestSegmentIndex + 3], segment[bestSegmentIndex + 4], segment[bestSegmentIndex + 5], segment[bestSegmentIndex + 6], segment[bestSegmentIndex + 7]);
  subdivideSegment(segment, bestSegmentIndex, t);
  return bestSegmentIndex + 6;
}
/*
Takes any of the following and converts it to an all Cubic Bezier SVG data string:
- A <path> data string like "M0,0 L2,4 v20,15 H100"
- A RawPath, like [[x, y, x, y, x, y, x, y][[x, y, x, y, x, y, x, y]]
- A Segment, like [x, y, x, y, x, y, x, y]

Note: all numbers are rounded down to the closest 0.001 to minimize memory, maximize speed, and avoid odd numbers like 1e-13
*/

function rawPathToString(rawPath) {
  if (_isNumber(rawPath[0])) {
    //in case a segment is passed in instead
    rawPath = [rawPath];
  }

  var result = "",
      l = rawPath.length,
      sl,
      s,
      i,
      segment;

  for (s = 0; s < l; s++) {
    segment = rawPath[s];
    result += "M" + _round(segment[0]) + "," + _round(segment[1]) + " C";
    sl = segment.length;

    for (i = 2; i < sl; i++) {
      result += _round(segment[i++]) + "," + _round(segment[i++]) + " " + _round(segment[i++]) + "," + _round(segment[i++]) + " " + _round(segment[i++]) + "," + _round(segment[i]) + " ";
    }

    if (segment.closed) {
      result += "z";
    }
  }

  return result;
}
/*
// takes a segment with coordinates [x, y, x, y, ...] and converts the control points into angles and lengths [x, y, angle, length, angle, length, x, y, angle, length, ...] so that it animates more cleanly and avoids odd breaks/kinks. For example, if you animate from 1 o'clock to 6 o'clock, it'd just go directly/linearly rather than around. So the length would be very short in the middle of the tween.
export function cpCoordsToAngles(segment, copy) {
	var result = copy ? segment.slice(0) : segment,
		x, y, i;
	for (i = 0; i < segment.length; i+=6) {
		x = segment[i+2] - segment[i];
		y = segment[i+3] - segment[i+1];
		result[i+2] = Math.atan2(y, x);
		result[i+3] = Math.sqrt(x * x + y * y);
		x = segment[i+6] - segment[i+4];
		y = segment[i+7] - segment[i+5];
		result[i+4] = Math.atan2(y, x);
		result[i+5] = Math.sqrt(x * x + y * y);
	}
	return result;
}

// takes a segment that was converted with cpCoordsToAngles() to have angles and lengths instead of coordinates for the control points, and converts it BACK into coordinates.
export function cpAnglesToCoords(segment, copy) {
	var result = copy ? segment.slice(0) : segment,
		length = segment.length,
		rnd = 1000,
		angle, l, i, j;
	for (i = 0; i < length; i+=6) {
		angle = segment[i+2];
		l = segment[i+3]; //length
		result[i+2] = (((segment[i] + Math.cos(angle) * l) * rnd) | 0) / rnd;
		result[i+3] = (((segment[i+1] + Math.sin(angle) * l) * rnd) | 0) / rnd;
		angle = segment[i+4];
		l = segment[i+5]; //length
		result[i+4] = (((segment[i+6] - Math.cos(angle) * l) * rnd) | 0) / rnd;
		result[i+5] = (((segment[i+7] - Math.sin(angle) * l) * rnd) | 0) / rnd;
	}
	return result;
}

//adds an "isSmooth" array to each segment and populates it with a boolean value indicating whether or not it's smooth (the control points have basically the same slope). For any smooth control points, it converts the coordinates into angle (x, in radians) and length (y) and puts them into the same index value in a smoothData array.
export function populateSmoothData(rawPath) {
	let j = rawPath.length,
		smooth, segment, x, y, x2, y2, i, l, a, a2, isSmooth, smoothData;
	while (--j > -1) {
		segment = rawPath[j];
		isSmooth = segment.isSmooth = segment.isSmooth || [0, 0, 0, 0];
		smoothData = segment.smoothData = segment.smoothData || [0, 0, 0, 0];
		isSmooth.length = 4;
		l = segment.length - 2;
		for (i = 6; i < l; i += 6) {
			x = segment[i] - segment[i - 2];
			y = segment[i + 1] - segment[i - 1];
			x2 = segment[i + 2] - segment[i];
			y2 = segment[i + 3] - segment[i + 1];
			a = _atan2(y, x);
			a2 = _atan2(y2, x2);
			smooth = (Math.abs(a - a2) < 0.09);
			if (smooth) {
				smoothData[i - 2] = a;
				smoothData[i + 2] = a2;
				smoothData[i - 1] = _sqrt(x * x + y * y);
				smoothData[i + 3] = _sqrt(x2 * x2 + y2 * y2);
			}
			isSmooth.push(smooth, smooth, 0, 0, smooth, smooth);
		}
		//if the first and last points are identical, check to see if there's a smooth transition. We must handle this a bit differently due to their positions in the array.
		if (segment[l] === segment[0] && segment[l+1] === segment[1]) {
			x = segment[0] - segment[l-2];
			y = segment[1] - segment[l-1];
			x2 = segment[2] - segment[0];
			y2 = segment[3] - segment[1];
			a = _atan2(y, x);
			a2 = _atan2(y2, x2);
			if (Math.abs(a - a2) < 0.09) {
				smoothData[l-2] = a;
				smoothData[2] = a2;
				smoothData[l-1] = _sqrt(x * x + y * y);
				smoothData[3] = _sqrt(x2 * x2 + y2 * y2);
				isSmooth[l-2] = isSmooth[l-1] = true; //don't change indexes 2 and 3 because we'll trigger everything from the END, and this will optimize file size a bit.
			}
		}
	}
	return rawPath;
}
export function pointToScreen(svgElement, point) {
	if (arguments.length < 2) { //by default, take the first set of coordinates in the path as the point
		let rawPath = getRawPath(svgElement);
		point = svgElement.ownerSVGElement.createSVGPoint();
		point.x = rawPath[0][0];
		point.y = rawPath[0][1];
	}
	return point.matrixTransform(svgElement.getScreenCTM());
}

*/

/***/ }),

/***/ "./node_modules/gsap/utils/strings.js":
/*!********************************************!*\
  !*** ./node_modules/gsap/utils/strings.js ***!
  \********************************************/
/*! exports provided: emojiExp, getText, emojiSafeSplit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emojiExp", function() { return emojiExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getText", function() { return getText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emojiSafeSplit", function() { return emojiSafeSplit; });
/*!
 * strings: 3.0.0
 * https://greensock.com
 *
 * Copyright 2008-2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _trimExp = /(^\s+|\s+$)/g;
var emojiExp = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;
function getText(e) {
  var type = e.nodeType,
      result = "";

  if (type === 1 || type === 9 || type === 11) {
    if (typeof e.textContent === "string") {
      return e.textContent;
    } else {
      for (e = e.firstChild; e; e = e.nextSibling) {
        result += getText(e);
      }
    }
  } else if (type === 3 || type === 4) {
    return e.nodeValue;
  }

  return result;
}
/*
//smaller kb version that only handles the simpler emoji's, which is often perfectly adequate.

let _emoji = "[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D]|[\uD800-\uDBFF][\uDC00-\uDFFF]",
	_emojiExp = new RegExp(_emoji),
	_emojiAndCharsExp = new RegExp(_emoji + "|.", "g"),
	_emojiSafeSplit = (text, delimiter, trim) => {
		if (trim) {
			text = text.replace(_trimExp, "");
		}
		return ((delimiter === "" || !delimiter) && _emojiExp.test(text)) ? text.match(_emojiAndCharsExp) : text.split(delimiter || "");
	};
 */

function emojiSafeSplit(text, delimiter, trim) {
  if (trim) {
    text = text.replace(_trimExp, "");
  }

  if (delimiter && delimiter !== "") {
    return text.split(delimiter);
  }

  var result = [],
      l = text.length,
      i = 0,
      j,
      character;

  for (; i < l; i++) {
    character = text.charAt(i);

    if (character.charCodeAt(0) >= 0xD800 && character.charCodeAt(0) <= 0xDBFF || text.charCodeAt(i + 1) >= 0xFE00 && text.charCodeAt(i + 1) <= 0xFE0F) {
      //special emoji characters use 2 or 4 unicode characters that we must keep together.
      j = ((text.substr(i, 12).split(emojiExp) || [])[1] || "").length || 2;
      character = text.substr(i, j);
      result.emoji = 1;
      i += j - 1;
    }

    result.push(character);
  }

  return result;
}

/***/ }),

/***/ "./node_modules/ng-lazyload-image/fesm2015/ng-lazyload-image.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ng-lazyload-image/fesm2015/ng-lazyload-image.js ***!
  \**********************************************************************/
/*! exports provided: LazyLoadImageDirective, LazyLoadImageModule, intersectionObserverPreset, scrollPreset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadImageDirective", function() { return LazyLoadImageDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadImageModule", function() { return LazyLoadImageModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intersectionObserverPreset", function() { return intersectionObserverPreset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollPreset", function() { return scrollPreset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");






const cssClassNames = {
    loaded: 'ng-lazyloaded',
    loading: 'ng-lazyloading',
    failed: 'ng-failed-lazyloaded'
};
function removeCssClassName(element, cssClassName) {
    element.className = element.className.replace(cssClassName, '');
}
function addCssClassName(element, cssClassName) {
    if (!element.className.includes(cssClassName)) {
        element.className += ` ${cssClassName}`;
    }
}
function hasCssClassName(element, cssClassName) {
    return element.className && element.className.includes(cssClassName);
}

function getNavigator() {
    return typeof window !== 'undefined' ? window.navigator : undefined;
}
function isChildOfPicture(element) {
    return Boolean(element.parentElement && element.parentElement.nodeName.toLowerCase() === 'picture');
}
function isImageElement(element) {
    return element.nodeName.toLowerCase() === 'img';
}
function setImage(element, imagePath, useSrcset) {
    if (isImageElement(element)) {
        if (useSrcset && 'srcset' in element) {
            element.srcset = imagePath;
        }
        else {
            element.src = imagePath;
        }
    }
    else {
        element.style.backgroundImage = `url('${imagePath}')`;
    }
    return element;
}
function setSources(attrName) {
    return (image) => {
        const sources = image.parentElement.getElementsByTagName('source');
        for (let i = 0; i < sources.length; i++) {
            const attrValue = sources[i].getAttribute(attrName);
            if (attrValue) {
                // Check if `srcset` is supported by the current browser
                if ('srcset' in sources[i]) {
                    sources[i].srcset = attrValue;
                }
                else {
                    sources[i].src = attrValue;
                }
            }
        }
    };
}
const setSourcesToDefault = setSources('defaultImage');
const setSourcesToLazy = setSources('lazyLoad');
const setSourcesToError = setSources('errorImage');
function setImageAndSources(setSourcesFn) {
    return (element, imagePath, useSrcset) => {
        if (isImageElement(element) && isChildOfPicture(element)) {
            setSourcesFn(element);
        }
        if (imagePath) {
            setImage(element, imagePath, useSrcset);
        }
    };
}
const setImageAndSourcesToDefault = setImageAndSources(setSourcesToDefault);
const setImageAndSourcesToLazy = setImageAndSources(setSourcesToLazy);
const setImageAndSourcesToError = setImageAndSources(setSourcesToError);

const end = ({ element }) => addCssClassName(element, cssClassNames.loaded);
const loadImage = ({ element, useSrcset, imagePath, decode }) => {
    let img;
    if (isImageElement(element) && isChildOfPicture(element)) {
        const parentClone = element.parentNode.cloneNode(true);
        img = parentClone.getElementsByTagName('img')[0];
        setSourcesToLazy(img);
        setImage(img, imagePath, useSrcset);
    }
    else {
        img = new Image();
        if (isImageElement(element) && element.sizes) {
            img.sizes = element.sizes;
        }
        if (useSrcset && 'srcset' in img) {
            img.srcset = imagePath;
        }
        else {
            img.src = imagePath;
        }
    }
    if (decode && img.decode) {
        return img.decode().then(() => imagePath);
    }
    return new Promise((resolve, reject) => {
        img.onload = () => resolve(imagePath);
        img.onerror = () => reject(null);
    });
};
const setErrorImage = ({ element, errorImagePath, useSrcset }) => {
    setImageAndSourcesToError(element, errorImagePath, useSrcset);
    addCssClassName(element, cssClassNames.failed);
};
const setLoadedImage = ({ element, imagePath, useSrcset }) => {
    setImageAndSourcesToLazy(element, imagePath, useSrcset);
};
const setup = ({ element, defaultImagePath, useSrcset }) => {
    setImageAndSourcesToDefault(element, defaultImagePath, useSrcset);
    if (hasCssClassName(element, cssClassNames.loaded)) {
        removeCssClassName(element, cssClassNames.loaded);
    }
};
const isBot = navigator => {
    if (navigator && navigator.userAgent) {
        return /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\ link\ preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkShare|W3C_Validator|whatsapp|duckduckbot/i.test(navigator.userAgent);
    }
    return false;
};
const sharedPreset = {
    finally: end,
    loadImage,
    setErrorImage,
    setLoadedImage,
    setup,
    isBot
};

const observers = new WeakMap();
const intersectionSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
function loadingCallback(entrys) {
    entrys.forEach(entry => intersectionSubject.next(entry));
}
const uniqKey = {};
const getIntersectionObserver = (attributes) => {
    const scrollContainerKey = attributes.scrollContainer || uniqKey;
    const options = {
        root: attributes.scrollContainer || null
    };
    if (attributes.offset) {
        options.rootMargin = `${attributes.offset}px`;
    }
    let observer = observers.get(scrollContainerKey);
    if (!observer) {
        observer = new IntersectionObserver(loadingCallback, options);
        observers.set(scrollContainerKey, observer);
    }
    observer.observe(attributes.element);
    return rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"].create((obs) => {
        const subscription = intersectionSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(entry => entry.target === attributes.element)).subscribe(obs);
        return () => {
            subscription.unsubscribe();
            observer.unobserve(attributes.element);
        };
    });
};

const isVisible = ({ event }) => {
    return event.isIntersecting;
};
const getObservable = (attributes, _getInterObserver = getIntersectionObserver) => {
    if (attributes.customObservable) {
        return attributes.customObservable;
    }
    return _getInterObserver(attributes);
};
const intersectionObserverPreset = Object.assign({}, sharedPreset, {
    isVisible,
    getObservable
});

const isVisible$1 = () => {
    return true;
};
const getObservable$1 = () => {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])('load');
};
const loadImage$1 = ({ imagePath }) => {
    return [imagePath];
};
const ssrPreset = Object.assign({}, sharedPreset, {
    isVisible: isVisible$1,
    getObservable: getObservable$1,
    loadImage: loadImage$1
});

function createHooks(platformId, options) {
    const defaultPreset = intersectionObserverPreset;
    const isBot = options && options.isBot ? options.isBot : defaultPreset.isBot;
    if (isBot(getNavigator(), platformId)) {
        return Object.assign(ssrPreset, { isBot });
    }
    else if (!options) {
        return defaultPreset;
    }
    const hooks = {};
    if (options.preset) {
        Object.assign(hooks, options.preset);
    }
    else {
        Object.assign(hooks, defaultPreset);
    }
    Object.keys(options)
        .filter(key => key !== 'preset')
        .forEach(key => {
        hooks[key] = options[key];
    });
    return hooks;
}

function lazyLoadImage(hookSet, attributes) {
    return (evntObservable) => {
        return evntObservable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(event => hookSet.isVisible({
            element: attributes.element,
            event: event,
            offset: attributes.offset,
            scrollContainer: attributes.scrollContainer
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])(() => hookSet.loadImage(attributes)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(imagePath => hookSet.setLoadedImage({
            element: attributes.element,
            imagePath,
            useSrcset: attributes.useSrcset
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(() => true), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(() => {
            hookSet.setErrorImage(attributes);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(false);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(() => hookSet.finally(attributes)));
    };
}

let LazyLoadImageDirective = class LazyLoadImageDirective {
    constructor(el, ngZone, platformId, options) {
        this.onLoad = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"](); // Callback when an image is loaded
        this.elementRef = el;
        this.ngZone = ngZone;
        this.propertyChanges$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"]();
        this.platformId = platformId;
        this.hooks = createHooks(platformId, options);
    }
    ngOnChanges() {
        this.propertyChanges$.next({
            element: this.elementRef.nativeElement,
            imagePath: this.lazyImage,
            defaultImagePath: this.defaultImage,
            errorImagePath: this.errorImage,
            useSrcset: this.useSrcset,
            offset: this.offset ? this.offset | 0 : 0,
            scrollContainer: this.scrollTarget,
            customObservable: this.customObservable,
            decode: this.decode
        });
    }
    ngAfterContentInit() {
        // Don't do anything if SSR and the user isn't a bot
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformServer"])(this.platformId) && !this.hooks.isBot(getNavigator(), this.platformId)) {
            return null;
        }
        this.ngZone.runOutsideAngular(() => {
            this.scrollSubscription = this.propertyChanges$
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(attributes => this.hooks.setup(attributes)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(attributes => this.hooks.getObservable(attributes).pipe(lazyLoadImage(this.hooks, attributes))))
                .subscribe(success => this.onLoad.emit(success));
        });
    }
    ngOnDestroy() {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])('lazyLoad'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], LazyLoadImageDirective.prototype, "lazyImage", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], LazyLoadImageDirective.prototype, "defaultImage", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], LazyLoadImageDirective.prototype, "errorImage", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], LazyLoadImageDirective.prototype, "scrollTarget", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
], LazyLoadImageDirective.prototype, "customObservable", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], LazyLoadImageDirective.prototype, "offset", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], LazyLoadImageDirective.prototype, "useSrcset", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], LazyLoadImageDirective.prototype, "decode", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"])
], LazyLoadImageDirective.prototype, "onLoad", void 0);
LazyLoadImageDirective = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"])({
        selector: '[lazyLoad]'
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"])), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])('options')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"], Object, Object])
], LazyLoadImageDirective);

var LazyLoadImageModule_1;
let LazyLoadImageModule = LazyLoadImageModule_1 = class LazyLoadImageModule {
    static forRoot(options) {
        return {
            ngModule: LazyLoadImageModule_1,
            providers: [{ provide: 'options', useValue: options }]
        };
    }
};
LazyLoadImageModule = LazyLoadImageModule_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [LazyLoadImageDirective],
        exports: [LazyLoadImageDirective]
    })
], LazyLoadImageModule);

class Rect {
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    static fromElement(element) {
        const { left, top, right, bottom } = element.getBoundingClientRect();
        if (left === 0 && top === 0 && right === 0 && bottom === 0) {
            return Rect.empty;
        }
        else {
            return new Rect(left, top, right, bottom);
        }
    }
    static fromWindow(_window) {
        return new Rect(0, 0, _window.innerWidth, _window.innerHeight);
    }
    inflate(inflateBy) {
        this.left -= inflateBy;
        this.top -= inflateBy;
        this.right += inflateBy;
        this.bottom += inflateBy;
    }
    intersectsWith(rect) {
        return rect.left < this.right && this.left < rect.right && rect.top < this.bottom && this.top < rect.bottom;
    }
    getIntersectionWith(rect) {
        const left = Math.max(this.left, rect.left);
        const top = Math.max(this.top, rect.top);
        const right = Math.min(this.right, rect.right);
        const bottom = Math.min(this.bottom, rect.bottom);
        if (right >= left && bottom >= top) {
            return new Rect(left, top, right, bottom);
        }
        else {
            return Rect.empty;
        }
    }
}
Rect.empty = new Rect(0, 0, 0, 0);

const scrollListeners = new WeakMap();
function sampleObservable(obs, scheduler) {
    return obs.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["sampleTime"])(100, scheduler), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''));
}
// Only create one scroll listener per target and share the observable.
// Typical, there will only be one observable per application
const getScrollListener = (scrollTarget) => {
    if (!scrollTarget || typeof scrollTarget.addEventListener !== 'function') {
        console.warn('`addEventListener` on ' + scrollTarget + ' (scrollTarget) is not a function. Skipping this target');
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["empty"])();
    }
    const scrollListener = scrollListeners.get(scrollTarget);
    if (scrollListener) {
        return scrollListener;
    }
    const srollEvent = rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"].create((observer) => {
        const eventName = 'scroll';
        const handler = (event) => observer.next(event);
        const options = { passive: true, capture: false };
        scrollTarget.addEventListener(eventName, handler, options);
        return () => scrollTarget.removeEventListener(eventName, handler, options);
    });
    const listener = sampleObservable(srollEvent);
    scrollListeners.set(scrollTarget, listener);
    return listener;
};

const isVisible$2 = ({ element, offset, scrollContainer }, getWindow = () => window) => {
    const elementBounds = Rect.fromElement(element);
    if (elementBounds === Rect.empty) {
        return false;
    }
    const windowBounds = Rect.fromWindow(getWindow());
    elementBounds.inflate(offset);
    if (scrollContainer) {
        const scrollContainerBounds = Rect.fromElement(scrollContainer);
        const intersection = scrollContainerBounds.getIntersectionWith(windowBounds);
        return elementBounds.intersectsWith(intersection);
    }
    else {
        return elementBounds.intersectsWith(windowBounds);
    }
};
const getObservable$2 = (attributes) => {
    if (attributes.customObservable) {
        return attributes.customObservable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''));
    }
    if (attributes.scrollContainer) {
        return getScrollListener(attributes.scrollContainer);
    }
    return getScrollListener(window);
};
const scrollPreset = Object.assign({}, sharedPreset, {
    isVisible: isVisible$2,
    getObservable: getObservable$2
});


//# sourceMappingURL=ng-lazyload-image.js.map


/***/ }),

/***/ "./node_modules/ngx-wow/esm2015/ngx-wow.js":
/*!*************************************************!*\
  !*** ./node_modules/ngx-wow/esm2015/ngx-wow.js ***!
  \*************************************************/
/*! exports provided: NgwWowModule, NgwWowConfig, WindowService, NgwWowService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgwWowModule", function() { return NgwWowModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgwWowConfig", function() { return NgwWowConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WindowService", function() { return WindowService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgwWowService", function() { return NgwWowService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Main module of the library
 */
class NgwWowModule {
}
NgwWowModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Configuration for the NgwWowService service.
 */
class NgwWowConfig {
    constructor() {
        /**
         * Class name that reveals the hidden box when user scrolls.
         */
        this.boxClass = 'wow';
        /**
         * Class name that triggers the CSS animations ('animated' by default for the animate.css library)
         */
        this.animateClass = 'animated';
        /**
         * Define the distance between the bottom of browser viewport and the top of hidden box.
         * When the user scrolls and reach this distance the hidden box is revealed.
         */
        this.offset = 0;
        /**
         * Turn on/off WOW.js on mobile devices.
         */
        this.mobile = true;
        /**
         * Consatantly check for new WOW elements on the page.
         */
        this.live = true;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Service to interact with the window object.
 */
class WindowService {
    /**
     * @return {?}
     */
    get nativeWindow() {
        return _window();
    }
}
WindowService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{
                providedIn: 'root',
            },] },
];
/** @nocollapse */ WindowService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({ factory: function WindowService_Factory() { return new WindowService(); }, token: WindowService, providedIn: "root" });
/**
 * @return {?}
 */
function _window() {
    // Return the global native browser window object
    return typeof window !== 'undefined' ? window : undefined;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgwWowService {
    /**
     * @param {?} windowService
     */
    constructor(windowService) {
        // Observable  source
        this.itemRevealedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        // Observable  stream
        this.itemRevealed$ = this.itemRevealedSource.asObservable();
        this.window = windowService.nativeWindow;
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    init(config) {
        if (this.window) {
            // For Angular Universal suport
            const /** @type {?} */ wowConfig = config || {};
            // Set callback hook:
            wowConfig.callback = () => this.itemRevealedSource.next();
            // Initializes the library
            new WOW(wowConfig).init();
        }
    }
}
NgwWowService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{
                providedIn: 'root',
            },] },
];
/** @nocollapse */
NgwWowService.ctorParameters = () => [
    { type: WindowService, },
];
/** @nocollapse */ NgwWowService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({ factory: function NgwWowService_Factory() { return new NgwWowService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])(WindowService)); }, token: NgwWowService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */


//# sourceMappingURL=ngx-wow.js.map


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/Skills/skills.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/Skills/skills.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-social-icons></app-social-icons>\r\n<app-numbers [number]=\"'03'\"></app-numbers>\r\n<div class=\"space\">\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-12\">\r\n            <app-title [title]=\"'Skills'\"></app-title>\r\n        </div>\r\n        <div class=\"col-md-6 col-xs-12\">\r\n            <div *ngFor=\"let skill of skills; let last = last; let i = index\">\r\n                {{ last ? callFunction() : \"\" }}\r\n                <div class=\"col-sm-3 col-xs-4\">\r\n                    <div class=\"skill\">\r\n                        <div class=\"icon\">\r\n                            <img [defaultImage]=\"'assets/loaderThum.gif'\" [errorImage]=\"'assets/image-not-found.png'\" [lazyLoad]=\"'assets/' + skill.icon\" [alt]=\"skill.skillsName\" />\r\n                        </div>\r\n                        <div class=\"name\">\r\n                            {{ skill.skillsName }}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-6 col-xs-12\">\r\n            <div class=\"skills_img\">\r\n                <app-svg-skill></app-svg-skill>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/Skills/svg-skill/svg-skill.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/Skills/svg-skill/svg-skill.component.html ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\r\nviewBox=\"0 0 346.14 395.82\">\r\n<defs>\r\n    <style>\r\n        .cls-1,\r\n        .cls-25 {\r\n            fill: none;\r\n        }\r\n\r\n        .cls-2 {\r\n            isolation: isolate;\r\n        }\r\n\r\n        .cls-3 {\r\n            fill: #242b3d;\r\n        }\r\n\r\n        .cls-4 {\r\n            fill: #3e4e75;\r\n        }\r\n\r\n        .cls-5 {\r\n            fill: #5d99fa;\r\n        }\r\n\r\n        .cls-6 {\r\n            fill: #b875d0;\r\n        }\r\n\r\n        .cls-7 {\r\n            fill: #f56eab;\r\n        }\r\n\r\n        .cls-12,\r\n        .cls-155,\r\n        .cls-18,\r\n        .cls-8 {\r\n            fill: #fff;\r\n        }\r\n\r\n        .cls-8 {\r\n            opacity: 0.2;\r\n        }\r\n\r\n        .cls-155,\r\n        .cls-24,\r\n        .cls-33,\r\n        .cls-8 {\r\n            mix-blend-mode: overlay;\r\n        }\r\n\r\n        .cls-9 {\r\n            fill: #7dd075;\r\n        }\r\n\r\n        .cls-10 {\r\n            fill: #6ef5c8;\r\n        }\r\n\r\n        .cls-11 {\r\n            fill: #5e93ff;\r\n        }\r\n\r\n        .cls-13 {\r\n            fill: #8c5e4c;\r\n        }\r\n\r\n        .cls-14 {\r\n            fill: url(#linear-gradient);\r\n        }\r\n\r\n        .cls-15 {\r\n            fill: url(#linear-gradient-2);\r\n        }\r\n\r\n        .cls-16 {\r\n            fill: #eda468;\r\n        }\r\n\r\n        .cls-17 {\r\n            fill: #b57962;\r\n        }\r\n\r\n        .cls-18 {\r\n            opacity: 0.3;\r\n        }\r\n\r\n        .cls-19 {\r\n            fill: #c8c8e5;\r\n        }\r\n\r\n        .cls-20 {\r\n            fill: #acacd1;\r\n        }\r\n\r\n        .cls-21 {\r\n            fill: url(#linear-gradient-3);\r\n        }\r\n\r\n        .cls-22 {\r\n            fill: #a9d1b5;\r\n            mix-blend-mode: multiply;\r\n        }\r\n\r\n        .cls-23 {\r\n            clip-path: url(#clip-path);\r\n        }\r\n\r\n        .cls-24 {\r\n            opacity: 0.5;\r\n        }\r\n\r\n        .cls-25 {\r\n            stroke: #fff;\r\n            stroke-linejoin: round;\r\n            stroke-width: 0.5px;\r\n        }\r\n\r\n        .cls-26 {\r\n            fill: url(#linear-gradient-4);\r\n        }\r\n\r\n        .cls-27 {\r\n            clip-path: url(#clip-path-2);\r\n        }\r\n\r\n        .cls-28 {\r\n            fill: url(#linear-gradient-5);\r\n        }\r\n\r\n        .cls-29 {\r\n            clip-path: url(#clip-path-3);\r\n        }\r\n\r\n        .cls-30 {\r\n            fill: #614134;\r\n        }\r\n\r\n        .cls-31 {\r\n            fill: #9c6854;\r\n        }\r\n\r\n        .cls-32 {\r\n            fill: #fcbb86;\r\n        }\r\n\r\n        .cls-33 {\r\n            fill: #fffbf7;\r\n        }\r\n\r\n        .cls-155,\r\n        .cls-33 {\r\n            opacity: 0.4;\r\n        }\r\n\r\n        .cls-34 {\r\n            fill: #1c2229;\r\n        }\r\n\r\n        .cls-35 {\r\n            fill: url(#linear-gradient-6);\r\n        }\r\n\r\n        .cls-36 {\r\n            fill: #b0b2c9;\r\n        }\r\n\r\n        .cls-37 {\r\n            fill: #7c80a6;\r\n        }\r\n\r\n        .cls-38 {\r\n            fill: url(#linear-gradient-7);\r\n        }\r\n\r\n        .cls-39 {\r\n            fill: url(#linear-gradient-8);\r\n        }\r\n\r\n        .cls-40 {\r\n            fill: url(#linear-gradient-9);\r\n        }\r\n\r\n        .cls-41 {\r\n            fill: url(#linear-gradient-10);\r\n        }\r\n\r\n        .cls-42 {\r\n            fill: url(#linear-gradient-11);\r\n        }\r\n\r\n        .cls-43 {\r\n            fill: url(#linear-gradient-12);\r\n        }\r\n\r\n        .cls-44 {\r\n            fill: url(#linear-gradient-13);\r\n        }\r\n\r\n        .cls-45 {\r\n            fill: url(#linear-gradient-14);\r\n        }\r\n\r\n        .cls-46 {\r\n            fill: url(#linear-gradient-15);\r\n        }\r\n\r\n        .cls-47 {\r\n            fill: url(#linear-gradient-16);\r\n        }\r\n\r\n        .cls-48 {\r\n            fill: url(#linear-gradient-17);\r\n        }\r\n\r\n        .cls-49 {\r\n            fill: url(#linear-gradient-18);\r\n        }\r\n\r\n        .cls-50 {\r\n            fill: url(#linear-gradient-19);\r\n        }\r\n\r\n        .cls-51 {\r\n            fill: url(#linear-gradient-20);\r\n        }\r\n\r\n        .cls-52 {\r\n            fill: url(#linear-gradient-21);\r\n        }\r\n\r\n        .cls-53 {\r\n            fill: url(#linear-gradient-22);\r\n        }\r\n\r\n        .cls-54 {\r\n            fill: url(#linear-gradient-23);\r\n        }\r\n\r\n        .cls-55 {\r\n            fill: url(#linear-gradient-24);\r\n        }\r\n\r\n        .cls-56 {\r\n            fill: url(#linear-gradient-25);\r\n        }\r\n\r\n        .cls-57 {\r\n            fill: url(#linear-gradient-26);\r\n        }\r\n\r\n        .cls-58 {\r\n            fill: url(#linear-gradient-27);\r\n        }\r\n\r\n        .cls-59 {\r\n            fill: url(#linear-gradient-28);\r\n        }\r\n\r\n        .cls-60 {\r\n            fill: url(#linear-gradient-29);\r\n        }\r\n\r\n        .cls-61 {\r\n            fill: url(#linear-gradient-30);\r\n        }\r\n\r\n        .cls-62 {\r\n            fill: url(#linear-gradient-31);\r\n        }\r\n\r\n        .cls-63 {\r\n            fill: url(#linear-gradient-32);\r\n        }\r\n\r\n        .cls-64 {\r\n            fill: url(#linear-gradient-33);\r\n        }\r\n\r\n        .cls-65 {\r\n            fill: url(#linear-gradient-34);\r\n        }\r\n\r\n        .cls-66 {\r\n            fill: url(#linear-gradient-35);\r\n        }\r\n\r\n        .cls-67 {\r\n            fill: url(#linear-gradient-36);\r\n        }\r\n\r\n        .cls-68 {\r\n            fill: url(#linear-gradient-37);\r\n        }\r\n\r\n        .cls-69 {\r\n            fill: url(#linear-gradient-38);\r\n        }\r\n\r\n        .cls-70 {\r\n            fill: url(#linear-gradient-39);\r\n        }\r\n\r\n        .cls-71 {\r\n            fill: url(#linear-gradient-40);\r\n        }\r\n\r\n        .cls-72 {\r\n            fill: url(#linear-gradient-41);\r\n        }\r\n\r\n        .cls-73 {\r\n            fill: url(#linear-gradient-42);\r\n        }\r\n\r\n        .cls-74 {\r\n            fill: url(#linear-gradient-43);\r\n        }\r\n\r\n        .cls-75 {\r\n            fill: url(#linear-gradient-44);\r\n        }\r\n\r\n        .cls-76 {\r\n            fill: url(#linear-gradient-45);\r\n        }\r\n\r\n        .cls-77 {\r\n            fill: url(#linear-gradient-46);\r\n        }\r\n\r\n        .cls-78 {\r\n            fill: url(#linear-gradient-47);\r\n        }\r\n\r\n        .cls-79 {\r\n            fill: url(#linear-gradient-48);\r\n        }\r\n\r\n        .cls-80 {\r\n            fill: url(#linear-gradient-49);\r\n        }\r\n\r\n        .cls-81 {\r\n            fill: url(#linear-gradient-50);\r\n        }\r\n\r\n        .cls-82 {\r\n            fill: url(#linear-gradient-51);\r\n        }\r\n\r\n        .cls-83 {\r\n            fill: url(#linear-gradient-52);\r\n        }\r\n\r\n        .cls-84 {\r\n            fill: url(#linear-gradient-53);\r\n        }\r\n\r\n        .cls-85 {\r\n            fill: url(#linear-gradient-54);\r\n        }\r\n\r\n        .cls-86 {\r\n            fill: url(#linear-gradient-55);\r\n        }\r\n\r\n        .cls-87 {\r\n            fill: url(#linear-gradient-56);\r\n        }\r\n\r\n        .cls-88 {\r\n            fill: url(#linear-gradient-57);\r\n        }\r\n\r\n        .cls-89 {\r\n            fill: url(#linear-gradient-58);\r\n        }\r\n\r\n        .cls-90 {\r\n            fill: url(#linear-gradient-59);\r\n        }\r\n\r\n        .cls-91 {\r\n            fill: url(#linear-gradient-60);\r\n        }\r\n\r\n        .cls-92 {\r\n            fill: url(#linear-gradient-61);\r\n        }\r\n\r\n        .cls-93 {\r\n            fill: url(#linear-gradient-62);\r\n        }\r\n\r\n        .cls-94 {\r\n            fill: url(#linear-gradient-63);\r\n        }\r\n\r\n        .cls-95 {\r\n            fill: url(#linear-gradient-64);\r\n        }\r\n\r\n        .cls-96 {\r\n            fill: url(#linear-gradient-65);\r\n        }\r\n\r\n        .cls-97 {\r\n            fill: url(#linear-gradient-66);\r\n        }\r\n\r\n        .cls-98 {\r\n            fill: url(#linear-gradient-67);\r\n        }\r\n\r\n        .cls-99 {\r\n            fill: url(#linear-gradient-68);\r\n        }\r\n\r\n        .cls-100 {\r\n            fill: url(#linear-gradient-69);\r\n        }\r\n\r\n        .cls-101 {\r\n            fill: url(#linear-gradient-70);\r\n        }\r\n\r\n        .cls-102 {\r\n            fill: url(#linear-gradient-71);\r\n        }\r\n\r\n        .cls-103 {\r\n            fill: url(#linear-gradient-72);\r\n        }\r\n\r\n        .cls-104 {\r\n            fill: url(#linear-gradient-73);\r\n        }\r\n\r\n        .cls-105 {\r\n            fill: url(#linear-gradient-74);\r\n        }\r\n\r\n        .cls-106 {\r\n            fill: url(#linear-gradient-75);\r\n        }\r\n\r\n        .cls-107 {\r\n            fill: url(#linear-gradient-76);\r\n        }\r\n\r\n        .cls-108 {\r\n            fill: url(#linear-gradient-77);\r\n        }\r\n\r\n        .cls-109 {\r\n            fill: url(#linear-gradient-78);\r\n        }\r\n\r\n        .cls-110 {\r\n            fill: url(#linear-gradient-79);\r\n        }\r\n\r\n        .cls-111 {\r\n            fill: url(#linear-gradient-80);\r\n        }\r\n\r\n        .cls-112 {\r\n            fill: url(#linear-gradient-81);\r\n        }\r\n\r\n        .cls-113 {\r\n            fill: url(#linear-gradient-82);\r\n        }\r\n\r\n        .cls-114 {\r\n            fill: url(#linear-gradient-83);\r\n        }\r\n\r\n        .cls-115 {\r\n            fill: url(#linear-gradient-84);\r\n        }\r\n\r\n        .cls-116 {\r\n            fill: url(#linear-gradient-85);\r\n        }\r\n\r\n        .cls-117 {\r\n            fill: url(#linear-gradient-86);\r\n        }\r\n\r\n        .cls-118 {\r\n            fill: url(#linear-gradient-87);\r\n        }\r\n\r\n        .cls-119 {\r\n            fill: url(#linear-gradient-88);\r\n        }\r\n\r\n        .cls-120 {\r\n            fill: url(#linear-gradient-89);\r\n        }\r\n\r\n        .cls-121 {\r\n            fill: url(#linear-gradient-90);\r\n        }\r\n\r\n        .cls-122 {\r\n            fill: url(#linear-gradient-91);\r\n        }\r\n\r\n        .cls-123 {\r\n            fill: url(#linear-gradient-92);\r\n        }\r\n\r\n        .cls-124 {\r\n            fill: url(#linear-gradient-93);\r\n        }\r\n\r\n        .cls-125 {\r\n            fill: #c27d5d;\r\n        }\r\n\r\n        .cls-126 {\r\n            fill: #e5d8bf;\r\n        }\r\n\r\n        .cls-127 {\r\n            fill: #30374c;\r\n        }\r\n\r\n        .cls-128 {\r\n            fill: #7f5545;\r\n        }\r\n\r\n        .cls-129 {\r\n            fill: #976552;\r\n        }\r\n\r\n        .cls-130 {\r\n            fill: #614135;\r\n        }\r\n\r\n        .cls-131,\r\n        .cls-132,\r\n        .cls-133,\r\n        .cls-134,\r\n        .cls-135,\r\n        .cls-136,\r\n        .cls-137,\r\n        .cls-141,\r\n        .cls-142,\r\n        .cls-143,\r\n        .cls-144 {\r\n            fill-rule: evenodd;\r\n        }\r\n\r\n        .cls-131 {\r\n            fill: url(#linear-gradient-94);\r\n        }\r\n\r\n        .cls-132 {\r\n            fill: url(#linear-gradient-95);\r\n        }\r\n\r\n        .cls-133 {\r\n            fill: url(#linear-gradient-96);\r\n        }\r\n\r\n        .cls-134 {\r\n            fill: #fdddc8;\r\n        }\r\n\r\n        .cls-135 {\r\n            fill: url(#linear-gradient-97);\r\n        }\r\n\r\n        .cls-136 {\r\n            fill: url(#linear-gradient-98);\r\n        }\r\n\r\n        .cls-137 {\r\n            fill: url(#linear-gradient-99);\r\n        }\r\n\r\n        .cls-138 {\r\n            fill: url(#linear-gradient-100);\r\n        }\r\n\r\n        .cls-139 {\r\n            fill: url(#New_Gradient_Swatch_1);\r\n        }\r\n\r\n        .cls-140 {\r\n            fill: url(#New_Gradient_Swatch_1-2);\r\n        }\r\n\r\n        .cls-141 {\r\n            fill: url(#linear-gradient-101);\r\n        }\r\n\r\n        .cls-142 {\r\n            fill: #26221e;\r\n        }\r\n\r\n        .cls-143 {\r\n            fill: #7d4a41;\r\n        }\r\n\r\n        .cls-144 {\r\n            fill: #d9c8c5;\r\n        }\r\n\r\n        .cls-145 {\r\n            fill: url(#linear-gradient-102);\r\n        }\r\n\r\n        .cls-146 {\r\n            fill: url(#New_Gradient_Swatch_1-3);\r\n        }\r\n\r\n        .cls-147 {\r\n            fill: url(#linear-gradient-103);\r\n        }\r\n\r\n        .cls-148 {\r\n            fill: url(#linear-gradient-104);\r\n        }\r\n\r\n        .cls-149 {\r\n            fill: url(#linear-gradient-105);\r\n        }\r\n\r\n        .cls-150 {\r\n            fill: url(#linear-gradient-106);\r\n        }\r\n\r\n        .cls-151 {\r\n            fill: url(#linear-gradient-107);\r\n        }\r\n\r\n        .cls-152 {\r\n            fill: #363e4f;\r\n        }\r\n\r\n        .cls-153 {\r\n            fill: url(#linear-gradient-108);\r\n        }\r\n\r\n        .cls-154 {\r\n            fill: url(#linear-gradient-109);\r\n        }\r\n\r\n        .cls-156 {\r\n            fill: url(#linear-gradient-110);\r\n        }\r\n\r\n        .cls-157 {\r\n            fill: url(#linear-gradient-111);\r\n        }\r\n\r\n        .cls-158 {\r\n            fill: url(#linear-gradient-112);\r\n        }\r\n\r\n        .cls-159 {\r\n            fill: url(#linear-gradient-113);\r\n        }\r\n\r\n        .cls-160 {\r\n            clip-path: url(#clip-path-4);\r\n        }\r\n\r\n        .cls-161 {\r\n            fill: url(#linear-gradient-114);\r\n        }\r\n\r\n        .cls-162 {\r\n            clip-path: url(#clip-path-5);\r\n        }\r\n\r\n        .cls-163 {\r\n            fill: url(#linear-gradient-115);\r\n        }\r\n\r\n        .cls-164 {\r\n            clip-path: url(#clip-path-6);\r\n        }\r\n\r\n        .cls-165 {\r\n            fill: url(#linear-gradient-116);\r\n        }\r\n\r\n        .cls-166 {\r\n            fill: #424b60;\r\n        }\r\n\r\n        .cls-167 {\r\n            fill: #8194bc;\r\n        }\r\n\r\n        .cls-168 {\r\n            fill: #ffcc0c;\r\n        }\r\n\r\n        .cls-169 {\r\n            fill: #ffc003;\r\n        }\r\n\r\n        .cls-170 {\r\n            fill: #e8356c;\r\n        }\r\n\r\n        .cls-171 {\r\n            fill: #3aa6ff;\r\n        }\r\n    </style>\r\n    <linearGradient id=\"linear-gradient\" x1=\"51.59\" y1=\"245.46\" x2=\"82.09\" y2=\"193.62\"\r\n        gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0\" stop-color=\"#f7f7ff\" />\r\n        <stop offset=\"1\" stop-color=\"#bebee0\" />\r\n    </linearGradient>\r\n    <linearGradient id=\"linear-gradient-2\" x1=\"79.44\" y1=\"258.13\" x2=\"115.28\" y2=\"176.29\"\r\n        xlink:href=\"#linear-gradient\" />\r\n    <linearGradient id=\"linear-gradient-3\" x1=\"342.57\" y1=\"703.69\" x2=\"356.3\" y2=\"649.29\"\r\n        gradientTransform=\"matrix(-0.98, -0.21, -0.21, 0.98, 560.99, -437.39)\"\r\n        gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0\" stop-color=\"#346d4d\" />\r\n        <stop offset=\"1\" stop-color=\"#8ac45e\" />\r\n    </linearGradient>\r\n    <clipPath id=\"clip-path\">\r\n        <path class=\"cls-1\"\r\n            d=\"M81.81,197.49c2.76-5.61,7.44-4.78,9.34-10.82,1.6-6.1-2.76-6.57-1.59-12.51.89-6,4.87-5.86,4.85-12-.31-6.17-3.85-6-4.5-12-.91-5.91,2.16-6.32.3-12.22-2.13-5.82-4.7-5.26-7.1-10.77-2.67-5.42-.64-6.11-4.26-11.29-3.88-5-7.35-6.35-11.45-11-2.49,5.7-5.4,8-7.57,14-1.88,6,.27,6.07-.63,12-.61,6-3.22,6.22-3.49,12.41,0,6.19,3.08,5.65,4,11.55,1.2,5.86-2.23,6.79-.64,12.76,1.86,5.91,5.61,4.6,8.27,10,2.93,5.31-1.08,7.08,2.29,12.4C73.26,195.2,77.47,193,81.81,197.49Z\" />\r\n    </clipPath>\r\n    <linearGradient id=\"linear-gradient-4\" x1=\"-837.72\" y1=\"103.41\" x2=\"-825.66\" y2=\"55.61\"\r\n        gradientTransform=\"matrix(-0.9, 0.44, 0.44, 0.9, -733.14, 465.54)\"\r\n        xlink:href=\"#linear-gradient-3\" />\r\n    <clipPath id=\"clip-path-2\">\r\n        <path class=\"cls-1\"\r\n            d=\"M79.72,199.7c-1.17-5.37,2.5-7.36.5-12.55-2.24-5.06-5.49-3-7.94-7.73-2.65-4.59.14-6.69-3.26-10.93-3.6-4.08-5.94-2-9.64-5.76-3.86-3.56-2-5.52-6.49-8.56-4.64-2.83-6.1-1-10.77-3.52-4.8-2.26-3.78-3.85-9.1-5.43-5.43-1.34-8.54-.34-13.91-1.31,1.41,5.28.67,8.46,2.45,13.76,2,5.17,3.51,4,6.17,8.62,2.85,4.45,1.19,6.05,4.39,10.45,3.41,4.24,5.21,2.2,9.07,5.75,4,3.37,2.18,5.89,6.54,9.12,4.51,3,6.37.09,11.16,2.35,4.92,2,3.13,5.47,8.36,7.27C72.59,202.8,74.27,199,79.72,199.7Z\" />\r\n    </clipPath>\r\n    <linearGradient id=\"linear-gradient-5\" x1=\"1046.03\" y1=\"3920.34\" x2=\"1058.1\" y2=\"3872.54\"\r\n        gradientTransform=\"matrix(-0.5, -0.86, -0.86, 0.5, 4007.79, -887.22)\"\r\n        xlink:href=\"#linear-gradient-3\" />\r\n    <clipPath id=\"clip-path-3\">\r\n        <path class=\"cls-1\"\r\n            d=\"M83.72,197.31c5.28-1.54,7.52,2,12.56-.38,4.89-2.59,2.61-5.69,7.15-8.46,4.39-3,6.69-.34,10.68-4,3.81-3.86,1.6-6.06,5.07-10,3.27-4.1,5.36-2.36,8.08-7.07,2.5-4.84.61-6.17,2.75-11,1.92-4.94,3.58-4,4.78-9.46,1-5.5-.26-8.54.33-14-5.17,1.78-8.39,1.27-13.55,3.42-5,2.37-3.77,3.78-8.17,6.75-4.24,3.16-6,1.61-10.11,5.12-4,3.69-1.83,5.35-5.11,9.45-3.08,4.25-5.71,2.58-8.64,7.16-2.71,4.71.36,6.36-1.56,11.3-1.69,5.05-5.23,3.51-6.66,8.85C80.13,190.42,84.06,191.83,83.72,197.31Z\" />\r\n    </clipPath>\r\n    <linearGradient id=\"linear-gradient-6\" x1=\"135.61\" y1=\"122.68\" x2=\"153.28\" y2=\"198.85\"\r\n        gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0\" stop-color=\"#405078\" />\r\n        <stop offset=\"1\" stop-color=\"#252e45\" />\r\n    </linearGradient>\r\n    <linearGradient id=\"linear-gradient-7\" x1=\"166.85\" y1=\"182.67\" x2=\"206.16\" y2=\"151.29\"\r\n        gradientTransform=\"translate(-59.02)\" gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0\" stop-color=\"#fff\" />\r\n        <stop offset=\"1\" stop-color=\"#cecfdb\" />\r\n    </linearGradient>\r\n    <linearGradient id=\"linear-gradient-8\" x1=\"158.85\" y1=\"152.01\" x2=\"212.87\" y2=\"181.2\"\r\n        gradientTransform=\"translate(-59.02)\" gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0\" stop-color=\"#333e4a\" />\r\n        <stop offset=\"1\" stop-color=\"#222931\" />\r\n    </linearGradient>\r\n    <linearGradient id=\"linear-gradient-9\" x1=\"161.38\" y1=\"147.32\" x2=\"215.4\" y2=\"176.51\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-10\" x1=\"161.34\" y1=\"147.4\" x2=\"215.36\" y2=\"176.6\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-11\" x1=\"161.29\" y1=\"147.47\" x2=\"215.32\" y2=\"176.68\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-12\" x1=\"160.26\" y1=\"149.37\" x2=\"214.3\" y2=\"178.57\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-13\" x1=\"160.23\" y1=\"149.45\" x2=\"214.25\" y2=\"178.65\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-14\" x1=\"161.25\" y1=\"147.56\" x2=\"215.27\" y2=\"176.76\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-15\" x1=\"158.93\" y1=\"151.85\" x2=\"212.96\" y2=\"181.04\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-16\" x1=\"157.64\" y1=\"154.24\" x2=\"211.66\" y2=\"183.44\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-17\" x1=\"160.18\" y1=\"149.53\" x2=\"214.21\" y2=\"178.73\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-18\" x1=\"161.21\" y1=\"147.64\" x2=\"215.23\" y2=\"176.84\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-19\" x1=\"158.89\" y1=\"151.93\" x2=\"212.91\" y2=\"181.12\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-20\" x1=\"157.59\" y1=\"154.32\" x2=\"211.62\" y2=\"183.52\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-21\" x1=\"161.17\" y1=\"147.73\" x2=\"215.18\" y2=\"176.92\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-22\" x1=\"156.32\" y1=\"156.68\" x2=\"210.34\" y2=\"185.88\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-23\" x1=\"157.55\" y1=\"154.4\" x2=\"211.58\" y2=\"183.6\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-24\" x1=\"160.12\" y1=\"149.65\" x2=\"214.14\" y2=\"178.85\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-25\" x1=\"156.28\" y1=\"156.77\" x2=\"210.3\" y2=\"185.96\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-26\" x1=\"161.12\" y1=\"147.81\" x2=\"215.14\" y2=\"177\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-27\" x1=\"158.79\" y1=\"152.12\" x2=\"212.81\" y2=\"181.32\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-28\" x1=\"160.04\" y1=\"149.77\" x2=\"214.08\" y2=\"178.97\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-29\" x1=\"156.21\" y1=\"156.89\" x2=\"210.23\" y2=\"186.08\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-30\" x1=\"157.48\" y1=\"154.54\" x2=\"211.5\" y2=\"183.74\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-31\" x1=\"158.72\" y1=\"152.23\" x2=\"212.75\" y2=\"181.43\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-32\" x1=\"154.88\" y1=\"159.35\" x2=\"208.9\" y2=\"188.54\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-33\" x1=\"156.14\" y1=\"157.01\" x2=\"210.17\" y2=\"186.2\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-34\" x1=\"157.4\" y1=\"154.69\" x2=\"211.42\" y2=\"183.88\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-35\" x1=\"156.1\" y1=\"157.09\" x2=\"210.12\" y2=\"186.29\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-36\" x1=\"154.79\" y1=\"159.52\" x2=\"208.81\" y2=\"188.71\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-37\" x1=\"154.83\" y1=\"159.43\" x2=\"208.86\" y2=\"188.63\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-38\" x1=\"154.93\" y1=\"159.27\" x2=\"208.95\" y2=\"188.46\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-39\" x1=\"154.97\" y1=\"159.2\" x2=\"208.98\" y2=\"188.39\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-40\" x1=\"157.81\" y1=\"153.93\" x2=\"211.83\" y2=\"183.12\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-41\" x1=\"156.67\" y1=\"156.04\" x2=\"210.69\" y2=\"185.24\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-42\" x1=\"158.04\" y1=\"153.5\" x2=\"212.07\" y2=\"182.69\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-43\" x1=\"159.38\" y1=\"151.03\" x2=\"213.39\" y2=\"180.22\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-44\" x1=\"155.44\" y1=\"158.31\" x2=\"209.46\" y2=\"187.5\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-45\" x1=\"161.73\" y1=\"146.68\" x2=\"215.75\" y2=\"175.88\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-46\" x1=\"160.66\" y1=\"148.65\" x2=\"214.68\" y2=\"177.84\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-47\" x1=\"159.32\" y1=\"151.13\" x2=\"213.35\" y2=\"180.33\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-48\" x1=\"161.68\" y1=\"146.76\" x2=\"215.71\" y2=\"175.96\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-49\" x1=\"161.64\" y1=\"146.84\" x2=\"215.66\" y2=\"176.03\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-50\" x1=\"161.6\" y1=\"146.92\" x2=\"215.62\" y2=\"176.11\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-51\" x1=\"161.55\" y1=\"147\" x2=\"215.58\" y2=\"176.2\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-52\" x1=\"160.49\" y1=\"148.97\" x2=\"214.51\" y2=\"178.17\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-53\" x1=\"160.53\" y1=\"148.89\" x2=\"214.56\" y2=\"178.09\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-54\" x1=\"160.58\" y1=\"148.81\" x2=\"214.6\" y2=\"178\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-55\" x1=\"160.62\" y1=\"148.73\" x2=\"214.64\" y2=\"177.93\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-56\" x1=\"159.28\" y1=\"151.21\" x2=\"213.31\" y2=\"180.4\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-57\" x1=\"157.98\" y1=\"153.6\" x2=\"212.01\" y2=\"182.8\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-58\" x1=\"156.73\" y1=\"155.92\" x2=\"210.76\" y2=\"185.11\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-59\" x1=\"157.94\" y1=\"153.68\" x2=\"211.97\" y2=\"182.89\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-60\" x1=\"158.98\" y1=\"151.77\" x2=\"213\" y2=\"180.96\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-61\" x1=\"161.51\" y1=\"147.08\" x2=\"215.53\" y2=\"176.28\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-62\" x1=\"161.47\" y1=\"147.16\" x2=\"215.49\" y2=\"176.36\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-63\" x1=\"160.4\" y1=\"149.13\" x2=\"214.42\" y2=\"178.33\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-64\" x1=\"159.06\" y1=\"151.61\" x2=\"213.09\" y2=\"180.81\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-65\" x1=\"161.43\" y1=\"147.24\" x2=\"215.44\" y2=\"176.43\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-66\" x1=\"160.36\" y1=\"149.21\" x2=\"214.38\" y2=\"178.41\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-67\" x1=\"159.02\" y1=\"151.69\" x2=\"213.04\" y2=\"180.88\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-68\" x1=\"159.23\" y1=\"151.29\" x2=\"213.26\" y2=\"180.48\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-69\" x1=\"159.19\" y1=\"151.37\" x2=\"213.21\" y2=\"180.56\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-70\" x1=\"157.9\" y1=\"153.77\" x2=\"211.92\" y2=\"182.96\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-71\" x1=\"160.44\" y1=\"149.05\" x2=\"214.47\" y2=\"178.25\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-72\" x1=\"156.62\" y1=\"156.13\" x2=\"210.64\" y2=\"185.32\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-73\" x1=\"159.15\" y1=\"151.45\" x2=\"213.17\" y2=\"180.65\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-74\" x1=\"157.85\" y1=\"153.85\" x2=\"211.88\" y2=\"183.04\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-75\" x1=\"156.58\" y1=\"156.21\" x2=\"210.6\" y2=\"185.4\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-76\" x1=\"155.3\" y1=\"158.56\" x2=\"209.33\" y2=\"187.76\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-77\" x1=\"159.1\" y1=\"151.53\" x2=\"213.13\" y2=\"180.73\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-78\" x1=\"156.53\" y1=\"156.29\" x2=\"210.56\" y2=\"185.48\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-79\" x1=\"155.26\" y1=\"158.64\" x2=\"209.28\" y2=\"187.84\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-80\" x1=\"157.76\" y1=\"154.01\" x2=\"211.79\" y2=\"183.21\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-81\" x1=\"156.49\" y1=\"156.37\" x2=\"210.52\" y2=\"185.56\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-82\" x1=\"157.72\" y1=\"154.09\" x2=\"211.75\" y2=\"183.28\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-83\" x1=\"156.45\" y1=\"156.45\" x2=\"210.47\" y2=\"185.64\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-84\" x1=\"157.68\" y1=\"154.17\" x2=\"211.71\" y2=\"183.36\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-85\" x1=\"156.4\" y1=\"156.53\" x2=\"210.43\" y2=\"185.73\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-86\" x1=\"156.36\" y1=\"156.61\" x2=\"210.38\" y2=\"185.8\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-87\" x1=\"155.11\" y1=\"158.92\" x2=\"209.14\" y2=\"188.11\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-88\" x1=\"155.39\" y1=\"158.4\" x2=\"209.42\" y2=\"187.6\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-89\" x1=\"155.35\" y1=\"158.48\" x2=\"209.37\" y2=\"187.68\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-90\" x1=\"161.77\" y1=\"146.59\" x2=\"215.8\" y2=\"175.79\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-91\" x1=\"160.7\" y1=\"148.56\" x2=\"214.74\" y2=\"177.77\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-92\" x1=\"160.32\" y1=\"149.29\" x2=\"214.34\" y2=\"178.48\"\r\n        xlink:href=\"#linear-gradient-8\" />\r\n    <linearGradient id=\"linear-gradient-93\" x1=\"152.67\" y1=\"155.74\" x2=\"182.09\" y2=\"185.47\"\r\n        xlink:href=\"#linear-gradient-7\" />\r\n    <linearGradient id=\"linear-gradient-94\" x1=\"4344.28\" y1=\"159.98\" x2=\"4343.53\" y2=\"162.42\"\r\n        gradientTransform=\"matrix(-1, 0, 0, 1, 4444.88, 0)\" gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0\" stop-color=\"#fdddc8\" />\r\n        <stop offset=\"1\" stop-color=\"#f8b4a8\" />\r\n    </linearGradient>\r\n    <linearGradient id=\"linear-gradient-95\" x1=\"4341.76\" y1=\"161.01\" x2=\"4340.58\" y2=\"165.34\"\r\n        xlink:href=\"#linear-gradient-94\" />\r\n    <linearGradient id=\"linear-gradient-96\" x1=\"4339.9\" y1=\"161.96\" x2=\"4338\" y2=\"167.23\"\r\n        xlink:href=\"#linear-gradient-94\" />\r\n    <linearGradient id=\"linear-gradient-97\" x1=\"4385.2\" y1=\"177.94\" x2=\"4398.96\" y2=\"176\"\r\n        gradientTransform=\"matrix(-1, 0, 0, 1, 4444.88, 0)\" gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0\" stop-color=\"#fbd1be\" />\r\n        <stop offset=\"1\" stop-color=\"#f8b4a8\" />\r\n    </linearGradient>\r\n    <linearGradient id=\"linear-gradient-98\" x1=\"4341.66\" y1=\"170.34\" x2=\"4347.28\" y2=\"169.54\"\r\n        xlink:href=\"#linear-gradient-97\" />\r\n    <linearGradient id=\"linear-gradient-99\" x1=\"4381.78\" y1=\"160.49\" x2=\"4405.94\" y2=\"145.05\"\r\n        xlink:href=\"#linear-gradient-97\" />\r\n    <linearGradient id=\"linear-gradient-100\" x1=\"82.22\" y1=\"200.74\" x2=\"22.43\" y2=\"200.74\"\r\n        gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0\" stop-color=\"#ff8203\" />\r\n        <stop offset=\"1\" stop-color=\"#fda300\" />\r\n    </linearGradient>\r\n    <linearGradient id=\"New_Gradient_Swatch_1\" x1=\"33.02\" y1=\"150.26\" x2=\"57.91\" y2=\"150.26\"\r\n        gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0.75\" stop-color=\"#ff7103\" />\r\n        <stop offset=\"1\" stop-color=\"#fd7600\" />\r\n    </linearGradient>\r\n    <linearGradient id=\"New_Gradient_Swatch_1-2\" x1=\"59.62\" y1=\"201.94\" x2=\"77.14\" y2=\"201.94\"\r\n        xlink:href=\"#New_Gradient_Swatch_1\" />\r\n    <linearGradient id=\"linear-gradient-101\" x1=\"4320.19\" y1=\"180.75\" x2=\"4325.1\" y2=\"180.06\"\r\n        xlink:href=\"#linear-gradient-97\" />\r\n    <linearGradient id=\"linear-gradient-102\" x1=\"91.68\" y1=\"188.91\" x2=\"59.22\" y2=\"188.91\"\r\n        xlink:href=\"#linear-gradient-100\" />\r\n    <linearGradient id=\"New_Gradient_Swatch_1-3\" x1=\"88\" y1=\"199.33\" x2=\"99.31\" y2=\"199.33\"\r\n        xlink:href=\"#New_Gradient_Swatch_1\" />\r\n    <linearGradient id=\"linear-gradient-103\" x1=\"25\" y1=\"118.48\" x2=\"64.28\" y2=\"118.48\"\r\n        gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0\" stop-color=\"#231f20\" />\r\n        <stop offset=\"0.08\" stop-color=\"#232124\" />\r\n        <stop offset=\"0.65\" stop-color=\"#252a3c\" />\r\n        <stop offset=\"1\" stop-color=\"#252e45\" />\r\n    </linearGradient>\r\n    <linearGradient id=\"linear-gradient-104\" x1=\"182.61\" y1=\"204.76\" x2=\"168.76\" y2=\"205.96\"\r\n        xlink:href=\"#linear-gradient\" />\r\n    <linearGradient id=\"linear-gradient-105\" x1=\"181.66\" y1=\"193.74\" x2=\"167.81\" y2=\"194.94\"\r\n        xlink:href=\"#linear-gradient\" />\r\n    <linearGradient id=\"linear-gradient-106\" x1=\"167.4\" y1=\"188.25\" x2=\"184.78\" y2=\"188.25\"\r\n        gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0\" stop-color=\"#475269\" />\r\n        <stop offset=\"1\" stop-color=\"#363e4f\" />\r\n    </linearGradient>\r\n    <linearGradient id=\"linear-gradient-107\" x1=\"177.57\" y1=\"185.31\" x2=\"171.78\" y2=\"190.32\"\r\n        xlink:href=\"#linear-gradient-106\" />\r\n    <linearGradient id=\"linear-gradient-108\" x1=\"180.22\" y1=\"185.17\" x2=\"175.88\" y2=\"186.66\"\r\n        xlink:href=\"#linear-gradient-106\" />\r\n    <linearGradient id=\"linear-gradient-109\" x1=\"181.95\" y1=\"185.49\" x2=\"173.42\" y2=\"189.31\"\r\n        xlink:href=\"#linear-gradient-106\" />\r\n    <linearGradient id=\"linear-gradient-110\" x1=\"167.4\" y1=\"192.32\" x2=\"184.78\" y2=\"192.32\"\r\n        xlink:href=\"#linear-gradient-106\" />\r\n    <linearGradient id=\"linear-gradient-111\" x1=\"232.3\" y1=\"346.78\" x2=\"262.8\" y2=\"294.94\"\r\n        xlink:href=\"#linear-gradient\" />\r\n    <linearGradient id=\"linear-gradient-112\" x1=\"260.15\" y1=\"359.45\" x2=\"295.98\" y2=\"277.61\"\r\n        xlink:href=\"#linear-gradient\" />\r\n    <linearGradient id=\"linear-gradient-113\" x1=\"144.38\" y1=\"764.01\" x2=\"158.11\" y2=\"709.61\"\r\n        xlink:href=\"#linear-gradient-3\" />\r\n    <clipPath id=\"clip-path-4\">\r\n        <path class=\"cls-1\"\r\n            d=\"M262.51,298.81c2.77-5.61,7.45-4.78,9.34-10.82,1.6-6.1-2.76-6.56-1.58-12.51.89-6,4.86-5.86,4.84-12.05-.3-6.17-3.85-6-4.49-12-.92-5.91,2.15-6.32.29-12.22-2.13-5.82-4.7-5.26-7.1-10.78-2.66-5.41-.63-6.1-4.25-11.28-3.88-5-7.36-6.35-11.46-11-2.49,5.7-5.4,8-7.57,14-1.87,6,.27,6.07-.62,12-.61,6-3.23,6.23-3.49,12.42,0,6.19,3.07,5.65,4,11.55,1.2,5.86-2.23,6.79-.65,12.76,1.86,5.9,5.62,4.59,8.28,10,2.92,5.31-1.09,7.08,2.29,12.4C254,296.52,258.18,294.3,262.51,298.81Z\" />\r\n    </clipPath>\r\n    <linearGradient id=\"linear-gradient-114\" x1=\"-955.19\" y1=\"274.06\" x2=\"-943.13\" y2=\"226.26\"\r\n        gradientTransform=\"matrix(-0.9, 0.44, 0.44, 0.9, -733.14, 465.54)\"\r\n        xlink:href=\"#linear-gradient-3\" />\r\n    <clipPath id=\"clip-path-5\">\r\n        <path class=\"cls-1\"\r\n            d=\"M260.42,301c-1.17-5.37,2.51-7.36.5-12.55-2.24-5.07-5.49-3-7.93-7.73-2.66-4.59.13-6.69-3.27-10.94-3.59-4.07-5.94-2-9.63-5.76-3.86-3.55-2-5.51-6.49-8.55-4.65-2.84-6.1-1-10.77-3.52-4.8-2.27-3.78-3.85-9.11-5.43-5.42-1.34-8.53-.34-13.91-1.31,1.41,5.28.68,8.46,2.46,13.76,2,5.17,3.51,4,6.16,8.62,2.86,4.45,1.19,6.05,4.4,10.45,3.4,4.24,5.2,2.2,9.07,5.75,4,3.37,2.17,5.88,6.53,9.12,4.51,3,6.37.09,11.17,2.35,4.91,2.05,3.13,5.46,8.36,7.27C253.3,304.12,255,300.29,260.42,301Z\" />\r\n    </clipPath>\r\n    <linearGradient id=\"linear-gradient-115\" x1=\"867.55\" y1=\"3815.14\" x2=\"879.61\" y2=\"3767.34\"\r\n        gradientTransform=\"matrix(-0.5, -0.86, -0.86, 0.5, 4007.79, -887.22)\"\r\n        xlink:href=\"#linear-gradient-3\" />\r\n    <clipPath id=\"clip-path-6\">\r\n        <path class=\"cls-1\"\r\n            d=\"M264.43,298.63c5.27-1.54,7.52,2,12.55-.38,4.9-2.59,2.61-5.69,7.16-8.46,4.39-3,6.68-.34,10.68-4,3.81-3.87,1.6-6.06,5.06-10,3.28-4.1,5.37-2.36,8.09-7.07,2.5-4.84.61-6.17,2.75-11,1.92-4.94,3.58-4,4.78-9.46.95-5.5-.26-8.54.33-14-5.17,1.78-8.4,1.27-13.55,3.41-5,2.38-3.78,3.79-8.17,6.76-4.24,3.16-5.95,1.61-10.12,5.12-4,3.69-1.83,5.35-5.1,9.45-3.08,4.25-5.72,2.58-8.64,7.16-2.72,4.71.36,6.36-1.56,11.3-1.7,5.05-5.23,3.5-6.67,8.85C260.83,291.74,264.77,293.15,264.43,298.63Z\" />\r\n    </clipPath>\r\n    <linearGradient id=\"linear-gradient-116\" x1=\"3493.73\" y1=\"235.77\" x2=\"3486.89\" y2=\"223.4\"\r\n        gradientTransform=\"matrix(-1, 0, 0, 1, 3771.81, 0)\" gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0\" stop-color=\"#0080ff\" />\r\n        <stop offset=\"1\" stop-color=\"#14dcff\" />\r\n    </linearGradient>\r\n</defs>\r\n<title>Asset 2</title>\r\n<g class=\"cls-2\">\r\n    <g id=\"Layer_2\" data-name=\"Layer 2\">\r\n        <g id=\"OBJECTS\">\r\n            <path class=\"cls-3\"\r\n                d=\"M186.72,64.11A4.1,4.1,0,0,1,188.49,68L179,138c-.19,1.44-1.3,2.06-2.48,1.38L69.19,77.42a4.11,4.11,0,0,1-1.78-3.84L77,3.56c.19-1.44,1.3-2.07,2.48-1.39l4.35,2.51L85,1.19A1.83,1.83,0,0,1,87.78.34l31.14,18a4.88,4.88,0,0,1,2.2,3.75l.12,4.24Z\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M146.61,89.12c.92,3.87,3.24,7.43,6.28,9.15s5.89,1.14,7.79-1l4,5.54c-3.08,3.66-7.89,4.59-12.79,1.83S143,95.86,141.6,89.46Z\" />\r\n            <path class=\"cls-5\"\r\n                d=\"M157.5,71.77c5.65,3.38,9.68,10.68,10.41,18L162.75,89c-.5-4.41-2.9-8.75-6.26-10.83Z\" />\r\n            <path class=\"cls-6\"\r\n                d=\"M168,90.79a22.08,22.08,0,0,1-.2,4.75,15.23,15.23,0,0,1-2.63,6.66l-4-5.55a9.61,9.61,0,0,0,1.53-4,13.06,13.06,0,0,0,.13-2.73Z\" />\r\n            <path class=\"cls-7\"\r\n                d=\"M156.78,71.36l-1,6.35c-4.39-2.2-8.56.3-9.43,5.77a14.25,14.25,0,0,0,.07,4.65l-5,.34a23.35,23.35,0,0,1-.17-7.86C142.66,71.64,149.57,67.58,156.78,71.36Z\" />\r\n            <polygon class=\"cls-5\"\r\n                points=\"131.87 58.74 132.06 58.88 132.01 59.1 123.02 62.66 119.71 62.88 119.41 62.9 114.37 63.23 106.68 56.15 99.11 59.81 98.89 59.92 97.65 60.51 95.39 60.15 94.99 60.08 89.23 59.11 89.12 59.02 81.98 47.88 81.97 47.62 82.16 47.68 89.25 58.76 95.25 59.77 95.66 59.84 97.53 60.15 98.77 59.55 99 59.44 106.6 55.77 106.73 55.8 114.34 62.86 119.16 62.55 119.47 62.52 122.89 62.3 131.87 58.74\" />\r\n            <polygon class=\"cls-7\"\r\n                points=\"112.92 74.47 119.72 80.24 120.11 80.96 112.87 74.81 104.18 76.39 104 76.24 101.75 69.07 102 69.02 104.19 76.01 112.81 74.44 112.92 74.47\" />\r\n            <polygon class=\"cls-6\"\r\n                points=\"115.24 56.4 119.47 62.52 119.16 62.55 115.1 56.67 106.87 54.84 98.27 55.37 98.12 55.25 91.33 41.83 82.98 40.91 82.82 40.71 82.94 40.54 91.36 41.47 91.49 41.58 98.27 54.99 106.79 54.46 115.14 56.31 115.24 56.4\" />\r\n            <polygon class=\"cls-7\"\r\n                points=\"91.75 63.91 94.99 60.08 95.39 60.15 91.98 64.19 91.75 63.91\" />\r\n            <polygon class=\"cls-7\"\r\n                points=\"98.15 56.73 99 59.44 98.77 59.55 97.99 57.07 95.66 59.83 95.25 59.77 97.92 56.61 98.04 56.58 98.15 56.73\" />\r\n            <polygon class=\"cls-7\"\r\n                points=\"99.11 59.81 101.89 68.66 101.64 68.71 98.89 59.92 99.11 59.81\" />\r\n            <polygon class=\"cls-7\"\r\n                points=\"87.97 68.38 91.58 64.12 91.8 64.41 88.09 68.79 87.9 68.75 80.62 58.66 80.61 58.4 80.8 58.43 87.97 68.38\" />\r\n            <polygon class=\"cls-6\"\r\n                points=\"131.46 62.05 131.64 62.17 131.61 62.41 122.45 67.15 122.3 67.09 119.41 62.9 119.71 62.88 122.39 66.77 131.46 62.05\" />\r\n            <polygon class=\"cls-4\"\r\n                points=\"113.57 68.71 113.69 68.81 120.29 80.72 120.62 81.33 120.73 81.37 128.72 84.33 128.86 84.56 128.72 84.68 120.56 81.67 120.45 81.57 120.11 80.96 119.72 80.24 113.54 69.07 105.18 68.38 102 69.02 101.75 69.07 96.42 70.15 96.28 70.08 91.8 64.41 91.58 64.12 88.93 60.77 81.28 53.8 81.21 53.54 81.39 53.52 89.05 60.49 91.75 63.91 91.98 64.19 96.38 69.78 101.64 68.71 101.89 68.66 105.08 68.01 113.57 68.71\" />\r\n            <polygon class=\"cls-7\"\r\n                points=\"129.01 81.9 129.16 82.09 129.06 82.27 120.73 81.37 120.62 81.33 120.28 80.72 120.61 81 129.01 81.9\" />\r\n            <polygon class=\"cls-4\"\r\n                points=\"83.69 28.45 78.64 68.52 127.29 95.87 127.25 96.21 78.33 68.71 83.42 28.29 83.69 28.45\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M117.13,22.64a.34.34,0,0,0,.35,0l.39-.21.27.59a.86.86,0,0,0,.31.36.34.34,0,0,0,.35,0,.64.64,0,0,0,.11-.81l-.27-.6.38-.2a.65.65,0,0,0,.11-.81.82.82,0,0,0-.3-.37.39.39,0,0,0-.36,0l-.38.22-.28-.6a.78.78,0,0,0-.3-.36.37.37,0,0,0-.35,0,.65.65,0,0,0-.12.81l.28.59-.39.22a.65.65,0,0,0-.1.81A.78.78,0,0,0,117.13,22.64Z\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M170.73,60.76,82.82,10c-1.17-.68-2.28-.06-2.48,1.38l-.52,3.81a4.13,4.13,0,0,0,1.77,3.85L169.5,69.8c1.17.68,2.28,0,2.48-1.39l.52-3.81A4.13,4.13,0,0,0,170.73,60.76Z\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M183.24,69.31l-6.09-3.51a.42.42,0,0,0-.66.36,1.09,1.09,0,0,0,.47,1l6.09,3.51a.42.42,0,0,0,.66-.36A1.1,1.1,0,0,0,183.24,69.31Z\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M182.53,74.51,176.44,71c-.3-.18-.6,0-.65.36a1.08,1.08,0,0,0,.46,1l6.09,3.52c.32.18.61,0,.66-.37A1.05,1.05,0,0,0,182.53,74.51Z\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M182.89,71.91l-6.09-3.52c-.31-.18-.61,0-.66.37a1.07,1.07,0,0,0,.47,1l6.09,3.52c.31.18.6,0,.65-.37A1.07,1.07,0,0,0,182.89,71.91Z\" />\r\n            <path class=\"cls-8\"\r\n                d=\"M121.24,26.31l-.12-4.24a4.88,4.88,0,0,0-2.2-3.75L87.78.34A1.83,1.83,0,0,0,85,1.19L83.78,4.68,79.43,2.17c-1.18-.68-2.29,0-2.48,1.39l-9.54,70a4.11,4.11,0,0,0,1.78,3.84l29.27,16.9,65.09-43.59Z\" />\r\n            <path class=\"cls-3\"\r\n                d=\"M306.27,132.45A4.1,4.1,0,0,1,308,136.3l-9.53,70c-.2,1.44-1.31,2.06-2.48,1.38l-107.3-61.94a4.13,4.13,0,0,1-1.77-3.84l9.53-70c.2-1.45,1.31-2.07,2.49-1.39L203.33,73l1.17-3.5a1.83,1.83,0,0,1,2.83-.84l31.14,18a4.91,4.91,0,0,1,2.2,3.75l.12,4.24Z\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M210.16,100.82a13.82,13.82,0,0,1,5.4,6.79l-1.61.6a10.57,10.57,0,0,0-4.1-5.16Z\" />\r\n            <path class=\"cls-7\"\r\n                d=\"M209.93,100.68l-.31,2.24c-3.27-1.81-6.34-.06-6.89,4s1.69,8.92,5,10.84,6.45.15,7-3.92a11.12,11.12,0,0,0-.66-5.29l1.6-.59a14.44,14.44,0,0,1,.88,6.93c-.72,5.31-4.8,7.58-9.12,5.09s-7.24-8.81-6.51-14.11S205.65,98.3,209.93,100.68Z\" />\r\n            <path class=\"cls-9\"\r\n                d=\"M206.34,127.07l-.31,2.24c-3.27-1.81-6.34-.06-6.89,4s1.69,8.93,5,10.84a4.69,4.69,0,0,0,4,.54l.93,2.39a6.08,6.08,0,0,1-5.22-.7c-4.32-2.49-7.24-8.81-6.52-14.12S202.06,124.69,206.34,127.07Z\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M206.57,127.2c4.25,2.55,7.11,8.8,6.39,14-.4,2.91-1.8,4.9-3.7,5.71l-.93-2.39c1.45-.62,2.51-2.15,2.81-4.37.55-4-1.63-8.8-4.88-10.76Z\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M225.87,138.35c3,1.8,5.34,5.49,6.17,9.34h-1.78a11.2,11.2,0,0,0-4.69-7.1Z\" />\r\n            <path class=\"cls-6\"\r\n                d=\"M225.64,138.22l-.31,2.23c-3.26-1.8-6.33,0-6.88,4s1.68,8.92,5,10.84,6.45.16,7-3.91a10.75,10.75,0,0,0-.12-3.34h1.77a13.56,13.56,0,0,1,.17,4.39c-.73,5.3-4.81,7.58-9.13,5.09s-7.23-8.81-6.51-14.12S221.37,135.84,225.64,138.22Z\" />\r\n            <path class=\"cls-5\"\r\n                d=\"M229.23,111.83l-.31,2.23c-3.26-1.81-6.33,0-6.88,4s1.68,8.93,5,10.84c2.39,1.38,4.69.86,6-1.06l1.52,1.88c-1.69,2.52-4.69,3.21-7.81,1.41-4.32-2.5-7.23-8.81-6.51-14.12S225,109.45,229.23,111.83Z\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M229.46,112c4.25,2.54,7.11,8.8,6.4,14.05a8.73,8.73,0,0,1-1.19,3.48l-1.52-1.89A6.91,6.91,0,0,0,234,125c.55-4-1.63-8.81-4.88-10.76Z\" />\r\n            <polygon class=\"cls-7\"\r\n                points=\"290.98 146.43 290.77 147.84 298.74 152.44 298.94 151.03 290.98 146.43\" />\r\n            <polygon class=\"cls-7\"\r\n                points=\"288.74 161.66 288.54 163.07 296.5 167.66 296.71 166.26 288.74 161.66\" />\r\n            <polygon class=\"cls-7\"\r\n                points=\"276.26 170.44 276.05 171.84 284.01 176.44 284.22 175.04 276.26 170.44\" />\r\n            <polygon class=\"cls-10\"\r\n                points=\"255.79 126.12 255.58 127.53 263.55 132.12 263.75 130.72 255.79 126.12\" />\r\n            <polygon class=\"cls-11\"\r\n                points=\"249.36 122.4 249.15 123.81 253.9 126.55 254.1 125.14 249.36 122.4\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"260.38 139.78 260.18 141.19 286.92 156.63 287.13 155.22 260.38 139.78\" />\r\n            <polygon class=\"cls-10\"\r\n                points=\"264.81 136.83 264.6 138.24 272.56 142.84 272.77 141.43 264.81 136.83\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"274.43 142.39 274.23 143.8 287.66 151.55 287.87 150.15 274.43 142.39\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"265.42 131.68 265.21 133.08 288.41 146.47 288.61 145.07 265.42 131.68\" />\r\n            <polygon class=\"cls-10\"\r\n                points=\"250.75 134.22 250.55 135.63 258.51 140.23 258.72 138.82 250.75 134.22\" />\r\n            <polygon class=\"cls-11\"\r\n                points=\"258.37 133.12 258.17 134.53 262.91 137.26 263.12 135.86 258.37 133.12\" />\r\n            <polygon class=\"cls-11\"\r\n                points=\"244.32 130.51 244.12 131.91 248.86 134.66 249.07 133.25 244.32 130.51\" />\r\n            <polygon class=\"cls-10\"\r\n                points=\"252.07 151.5 251.86 152.91 259.83 157.5 260.04 156.1 252.07 151.5\" />\r\n            <polygon class=\"cls-10\"\r\n                points=\"258.75 149.85 258.55 151.26 266.51 155.86 266.72 154.45 258.75 149.85\" />\r\n            <polygon class=\"cls-10\"\r\n                points=\"265.15 148.04 264.95 149.44 272.92 154.05 273.12 152.64 265.15 148.04\" />\r\n            <polygon class=\"cls-11\"\r\n                points=\"258.72 144.33 258.51 145.73 263.26 148.47 263.47 147.07 258.72 144.33\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"274.79 153.6 274.58 155.01 286.18 161.7 286.38 160.3 274.79 153.6\" />\r\n            <polygon class=\"cls-11\"\r\n                points=\"252.32 146.14 252.12 147.55 256.86 150.29 257.07 148.88 252.32 146.14\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"268.38 155.41 268.18 156.82 285.43 166.78 285.64 165.38 268.38 155.41\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"261.7 157.06 261.49 158.46 284.69 171.85 284.89 170.45 261.7 157.06\" />\r\n            <polygon class=\"cls-10\"\r\n                points=\"265.58 164.28 265.37 165.68 273.34 170.28 273.54 168.87 265.58 164.28\" />\r\n            <polygon class=\"cls-11\"\r\n                points=\"245.64 147.78 245.43 149.19 250.18 151.93 250.38 150.52 245.64 147.78\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"278.88 179.1 278.67 180.51 283.05 183.03 283.25 181.63 278.88 179.1\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"278.15 184.02 277.95 185.42 282.33 187.94 282.53 186.54 278.15 184.02\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M236.68,91a.34.34,0,0,0,.35,0l.39-.21.27.59a.86.86,0,0,0,.31.36.34.34,0,0,0,.35,0,.64.64,0,0,0,.11-.81l-.27-.6.38-.21a.63.63,0,0,0,.11-.8.83.83,0,0,0-.31-.37.34.34,0,0,0-.35,0l-.38.21-.28-.59a.78.78,0,0,0-.3-.36.36.36,0,0,0-.36,0c-.21.12-.25.48-.11.81l.28.59-.39.22a.64.64,0,0,0-.11.81A.86.86,0,0,0,236.68,91Z\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M290.28,129.1,202.37,78.35c-1.17-.68-2.28-.06-2.48,1.38l-.52,3.81a4.09,4.09,0,0,0,1.77,3.85L289,138.14c1.18.68,2.29.05,2.49-1.39l.52-3.81A4.12,4.12,0,0,0,290.28,129.1Z\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M302.79,137.65l-6.09-3.52a.43.43,0,0,0-.66.37,1.1,1.1,0,0,0,.47,1L302.6,139c.31.18.6,0,.66-.36A1.1,1.1,0,0,0,302.79,137.65Z\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M302.08,142.84,296,139.33c-.31-.18-.6,0-.66.36a1.11,1.11,0,0,0,.47,1l6.09,3.51a.42.42,0,0,0,.66-.36A1.1,1.1,0,0,0,302.08,142.84Z\" />\r\n            <path class=\"cls-4\"\r\n                d=\"M302.43,140.25l-6.09-3.52c-.3-.18-.6,0-.65.37a1.06,1.06,0,0,0,.47,1l6.09,3.52c.31.18.6,0,.65-.37A1.06,1.06,0,0,0,302.43,140.25Z\" />\r\n            <path class=\"cls-8\"\r\n                d=\"M240.79,94.65l-.12-4.24a4.91,4.91,0,0,0-2.2-3.75l-31.14-18a1.83,1.83,0,0,0-2.83.84L203.33,73,199,70.51c-1.18-.68-2.29-.06-2.49,1.39l-9.53,70a4.13,4.13,0,0,0,1.77,3.84L218,162.66l65.08-43.59Z\" />\r\n            <polygon class=\"cls-13\"\r\n                points=\"81.09 180.73 58.23 194.02 65.34 240.58 81.12 231.41 97 240.58 104.11 194.02 81.09 180.73\" />\r\n            <polygon class=\"cls-14\"\r\n                points=\"81.28 213.78 81.25 254.21 57.63 240.58 47.05 194.02 81.28 213.78\" />\r\n            <polygon class=\"cls-15\"\r\n                points=\"115.29 194.02 104.71 240.58 81.25 254.21 81.28 213.78 115.29 194.02\" />\r\n            <polygon class=\"cls-16\"\r\n                points=\"56.39 235.14 57.63 240.58 81.25 254.21 81.26 254.2 81.26 249.5 56.39 235.14\" />\r\n            <polygon class=\"cls-17\"\r\n                points=\"105.94 235.15 81.26 249.5 81.26 254.2 104.71 240.58 105.94 235.15\" />\r\n            <polygon class=\"cls-18\"\r\n                points=\"81.28 214.66 115.06 195.03 115.29 194.02 81.28 213.78 47.05 194.02 47.28 195.03 81.28 214.66\" />\r\n            <path class=\"cls-19\"\r\n                d=\"M81.06,174.26,115.29,194l-34,19.76L47.05,194Zm.18,33L104.11,194l-23-13.29L58.23,194l23,13.28\" />\r\n            <path class=\"cls-20\"\r\n                d=\"M67.85,206a8,8,0,0,0,6.4-2.75l-16-9.25,13.7-8c-2.25-.53-4.17.26-7-2.09a2.23,2.23,0,0,1-.24-.19L47.05,194Z\" />\r\n            <path class=\"cls-21\"\r\n                d=\"M59.2,130.89c.9-6-1.25-6,.63-12,2.17-6,5.08-8.29,7.57-14,4.1,4.68,7.57,6,11.45,11,3.62,5.18,1.59,5.87,4.26,11.29,2.4,5.51,5,5,7.1,10.77,1.86,5.9-1.21,6.31-.3,12.22.65,5.94,4.19,5.78,4.5,12,0,6.19-4,6.08-4.85,12-1.17,5.94,3.19,6.41,1.59,12.51-1.9,6-6.58,5.21-9.34,10.82C77.47,193,73.26,195.2,69.62,190c-3.37-5.32.64-7.09-2.29-12.4-2.66-5.41-6.41-4.1-8.27-10-1.59-6,1.84-6.9.64-12.76-.91-5.9-4-5.36-4-11.55C56,137.11,58.59,136.87,59.2,130.89Z\" />\r\n            <path class=\"cls-22\"\r\n                d=\"M94.41,162.11c-.24-4.74-2.38-5.75-3.66-8.66a10.76,10.76,0,0,1-.84,2.12c-2.16,4.78-5.08,3.68-7,8.75-1.71,5.16,1.63,6.16.74,11.39-.64,5.29-4.41,4.48-4.74,10-.06,4.79,3,5.9,4.33,9.58,2.74-3.31,6.33-3.53,7.93-8.63,1.6-6.1-2.76-6.57-1.59-12.51C90.45,168.19,94.43,168.3,94.41,162.11Z\" />\r\n            <path class=\"cls-22\"\r\n                d=\"M58.56,134.09c2.23,2.92,1.28,4.06,3.89,7.88,2.76,4.51,4.93,3.7,7.5,8.5,2.34,4.91-.28,5.64,1.25,10.67,1.29,5.09,4.35,4.51,5.38,9.85.78,5.38-2.69,5.78-2.73,11.07-.29,5.32,3.56,5.19,2.92,10.69a9,9,0,0,1-.4,1.55c-2.38-.77-4.66-1.3-6.75-4.28-3.37-5.32.64-7.09-2.29-12.4-2.66-5.41-6.41-4.1-8.27-10-1.59-6,1.84-6.9.64-12.76-.91-5.9-4-5.36-4-11.55C55.92,138.46,57.56,137.25,58.56,134.09Z\" />\r\n            <g class=\"cls-23\">\r\n                <g class=\"cls-24\">\r\n                    <line class=\"cls-25\" x1=\"66.92\" y1=\"101.81\" x2=\"82.35\" y2=\"200.95\" />\r\n                    <polyline class=\"cls-25\" points=\"54.83 177.49 80.91 191.75 101.43 170.24\" />\r\n                    <polyline class=\"cls-25\" points=\"52.45 162.15 78.53 176.41 99.04 154.9\" />\r\n                    <polyline class=\"cls-25\" points=\"50.06 146.81 76.14 161.07 96.66 139.56\" />\r\n                    <polyline class=\"cls-25\" points=\"47.67 131.47 73.75 145.72 94.27 124.22\" />\r\n                    <polyline class=\"cls-25\" points=\"45.29 116.13 71.37 130.38 91.88 108.88\" />\r\n                    <polyline class=\"cls-25\" points=\"42.9 100.79 68.98 115.04 89.5 93.53\" />\r\n                </g>\r\n            </g>\r\n            <path class=\"cls-26\"\r\n                d=\"M27.73,166.29c-2.66-4.59-4.16-3.45-6.17-8.62-1.78-5.3-1-8.48-2.45-13.76,5.37,1,8.48,0,13.91,1.31,5.32,1.58,4.3,3.17,9.1,5.43,4.67,2.48,6.13.69,10.77,3.52,4.51,3,2.63,5,6.49,8.56,3.7,3.73,6,1.68,9.64,5.76,3.4,4.24.61,6.34,3.26,10.93,2.45,4.73,5.7,2.67,7.94,7.73,2,5.19-1.67,7.18-.5,12.55-5.45-.72-7.13,3.1-12.47,1.53C62,199.43,63.81,196,58.89,194c-4.79-2.26-6.65.7-11.16-2.35-4.36-3.23-2.51-5.75-6.54-9.12-3.86-3.55-5.66-1.51-9.07-5.75C28.92,172.34,30.58,170.74,27.73,166.29Z\" />\r\n            <g class=\"cls-27\">\r\n                <g class=\"cls-24\">\r\n                    <line class=\"cls-25\" x1=\"17.12\" y1=\"142.08\" x2=\"81.98\" y2=\"201.78\" />\r\n                    <polyline class=\"cls-25\" points=\"50.23 200.72 75.96 196.24 78.29 170.23\" />\r\n                    <polyline class=\"cls-25\" points=\"40.19 191.48 65.92 187 68.25 160.99\" />\r\n                    <polyline class=\"cls-25\" points=\"30.16 182.24 55.89 177.76 58.22 151.75\" />\r\n                    <polyline class=\"cls-25\" points=\"20.12 173 45.85 168.53 48.18 142.51\" />\r\n                    <polyline class=\"cls-25\" points=\"10.08 163.76 35.81 159.29 38.14 133.27\" />\r\n                    <polyline class=\"cls-25\" points=\"0.04 154.52 25.77 150.05 28.1 124.04\" />\r\n                </g>\r\n            </g>\r\n            <path class=\"cls-28\"\r\n                d=\"M113.4,143.1c4.4-3,3.15-4.38,8.17-6.75,5.16-2.15,8.38-1.64,13.55-3.42-.59,5.43.62,8.47-.33,14-1.2,5.42-2.86,4.52-4.78,9.46-2.14,4.83-.25,6.16-2.75,11-2.72,4.71-4.81,3-8.08,7.07-3.47,3.95-1.26,6.15-5.07,10-4,3.69-6.29,1.06-10.68,4-4.54,2.77-2.26,5.87-7.15,8.46-5,2.36-7.28-1.16-12.56.38.34-5.48-3.59-6.89-2.4-12.33,1.43-5.34,5-3.8,6.66-8.85,1.92-4.94-1.15-6.59,1.56-11.3,2.93-4.58,5.56-2.91,8.64-7.16,3.28-4.1,1.12-5.76,5.11-9.45C107.45,144.71,109.16,146.26,113.4,143.1Z\" />\r\n            <g class=\"cls-29\">\r\n                <g class=\"cls-24\">\r\n                    <line class=\"cls-25\" x1=\"136.81\" y1=\"130.82\" x2=\"81.8\" y2=\"199.72\" />\r\n                    <polyline class=\"cls-25\" points=\"80.64 167.97 86.91 193.32 113.02 193.82\" />\r\n                    <polyline class=\"cls-25\" points=\"89.15 157.31 95.42 182.66 121.53 183.16\" />\r\n                    <polyline class=\"cls-25\" points=\"97.66 146.64 103.93 172 130.04 172.5\" />\r\n                    <polyline class=\"cls-25\" points=\"106.17 135.98 112.44 161.34 138.56 161.84\" />\r\n                    <polyline class=\"cls-25\" points=\"114.68 125.32 120.95 150.68 147.07 151.18\" />\r\n                    <polyline class=\"cls-25\" points=\"123.2 114.66 129.47 140.01 155.58 140.51\" />\r\n                </g>\r\n            </g>\r\n            <g class=\"cls-2\">\r\n                <polygon class=\"cls-30\"\r\n                    points=\"238.38 320.77 234.15 318.31 234.16 208.25 238.39 210.71 238.38 320.77\" />\r\n                <polygon class=\"cls-30\"\r\n                    points=\"177.55 355.89 173.32 353.44 173.32 240.11 177.55 242.57 177.55 355.89\" />\r\n                <polygon class=\"cls-31\"\r\n                    points=\"177.55 242.57 173.32 240.11 236.99 203.35 241.22 205.81 177.55 242.57\" />\r\n                <polygon class=\"cls-13\"\r\n                    points=\"241.22 205.81 241.22 319.13 238.38 320.77 238.39 210.71 180.39 244.19 180.38 354.25 177.55 355.89 177.55 242.57 241.22 205.81\" />\r\n            </g>\r\n            <g class=\"cls-2\">\r\n                <polygon class=\"cls-30\"\r\n                    points=\"120.82 252.66 116.59 250.2 116.6 140.14 120.83 142.59 120.82 252.66\" />\r\n                <polygon class=\"cls-30\"\r\n                    points=\"59.99 287.78 55.76 285.32 55.76 172 59.99 174.46 59.99 287.78\" />\r\n                <polygon class=\"cls-31\"\r\n                    points=\"59.99 174.46 55.76 172 119.43 135.24 123.66 137.7 59.99 174.46\" />\r\n                <polygon class=\"cls-13\"\r\n                    points=\"123.66 137.7 123.66 251.02 120.82 252.66 120.83 142.59 62.83 176.08 62.82 286.14 59.99 287.78 59.99 174.46 123.66 137.7\" />\r\n            </g>\r\n            <polygon class=\"cls-32\"\r\n                points=\"49.04 171.62 49.04 178.01 174.46 251.4 174.46 245.02 49.04 171.62\" />\r\n            <polygon class=\"cls-16\"\r\n                points=\"49.04 171.62 174.46 245.02 247.5 204.02 122.09 130.63 49.04 171.62\" />\r\n            <polygon class=\"cls-17\"\r\n                points=\"174.46 245.02 174.46 251.4 247.5 210.41 247.5 204.02 174.46 245.02\" />\r\n            <polygon class=\"cls-33\"\r\n                points=\"247.5 204.02 247.5 205.02 174.46 246.01 49.04 172.62 49.04 171.62 174.46 245.02 247.5 204.02\" />\r\n            <path class=\"cls-34\"\r\n                d=\"M168.93,139.79l-46-26.57a.77.77,0,0,0-.6-.1l-1.09.27a.77.77,0,0,1,.6.1l46,26.57a1.75,1.75,0,0,1,.71,1.8l-7.48,34.22a1,1,0,0,1-.65.78l1.09-.28a1,1,0,0,0,.65-.77l7.48-34.22A1.75,1.75,0,0,0,168.93,139.79Z\" />\r\n            <path class=\"cls-35\"\r\n                d=\"M167.84,140.06l-46-26.57c-.54-.31-1.1,0-1.25.67l-7.48,34.22a1.75,1.75,0,0,0,.71,1.8l46,26.58c.54.31,1.1,0,1.25-.68l7.48-34.22A1.75,1.75,0,0,0,167.84,140.06Z\" />\r\n            <polygon class=\"cls-3\"\r\n                points=\"121.4 115.22 114.59 146.37 160.69 172.99 167.5 141.84 121.4 115.22\" />\r\n            <polygon class=\"cls-9\"\r\n                points=\"127.33 124.26 127.16 124.87 122.22 122.08 122.38 121.46 127.33 124.26\" />\r\n            <polygon class=\"cls-6\"\r\n                points=\"155.07 139.96 154.9 140.57 151.69 138.75 151.86 138.14 155.07 139.96\" />\r\n            <polygon class=\"cls-5\"\r\n                points=\"159.16 142.27 158.99 142.88 155.79 141.07 155.95 140.46 159.16 142.27\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"131.41 137.55 131.25 138.16 121.73 132.78 121.9 132.16 131.41 137.55\" />\r\n            <polygon class=\"cls-9\"\r\n                points=\"136.16 140.23 135.99 140.84 132.1 138.64 132.26 138.03 136.16 140.23\" />\r\n            <polygon class=\"cls-9\"\r\n                points=\"125.11 136.88 124.94 137.49 121.05 135.29 121.22 134.68 125.11 136.88\" />\r\n            <polygon class=\"cls-5\"\r\n                points=\"122.29 147.25 122.12 147.87 118.23 145.67 118.39 145.05 122.29 147.25\" />\r\n            <polygon class=\"cls-6\"\r\n                points=\"123 144.66 122.83 145.28 118.93 143.07 119.1 142.46 123 144.66\" />\r\n            <polygon class=\"cls-9\"\r\n                points=\"123.7 142.07 123.53 142.68 119.64 140.48 119.81 139.87 123.7 142.07\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"124.4 139.48 124.24 140.09 120.34 137.89 120.51 137.28 124.4 139.48\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"129.47 148.32 129.3 148.94 125.4 146.73 125.57 146.12 129.47 148.32\" />\r\n            <polygon class=\"cls-7\"\r\n                points=\"139.36 150.93 139.19 151.54 124.16 143.04 124.33 142.43 139.36 150.93\" />\r\n            <polygon class=\"cls-7\"\r\n                points=\"129.87 139.58 129.7 140.19 125.81 137.98 125.97 137.37 129.87 139.58\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"145.5 142.88 145.33 143.49 122.35 130.49 122.52 129.88 145.5 142.88\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"146.12 140.6 145.95 141.21 122.97 128.21 123.14 127.6 146.12 140.6\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"146.74 138.32 146.57 138.93 123.59 125.93 123.76 125.32 146.74 138.32\" />\r\n            <polygon class=\"cls-12\"\r\n                points=\"151.09 137.71 150.93 138.32 127.95 125.32 128.12 124.71 151.09 137.71\" />\r\n            <path class=\"cls-8\"\r\n                d=\"M121.82,113.49c-.54-.31-1.1,0-1.25.67l-7.48,34.22a1.75,1.75,0,0,0,.71,1.8l6,3.45L158.2,134.5Z\" />\r\n            <g class=\"cls-2\">\r\n                <path class=\"cls-36\"\r\n                    d=\"M159.9,177,133,192.66a2.16,2.16,0,0,1-2,0L85,166.09a.69.69,0,0,1-.4-.57c0,.63,0,1.25,0,1.88A.69.69,0,0,0,85,168l46,26.57a2.13,2.13,0,0,0,2,0L159.9,178.9a.69.69,0,0,0,.39-.56c0-.63,0-1.25,0-1.88A.66.66,0,0,1,159.9,177Z\" />\r\n                <path class=\"cls-37\"\r\n                    d=\"M139.57,189.76,137.36,191a.72.72,0,0,0-.32.55c0,.21.15.29.32.19l2.21-1.28a.69.69,0,0,0,.32-.55C139.89,189.74,139.75,189.66,139.57,189.76Z\" />\r\n                <path class=\"cls-12\"\r\n                    d=\"M159.9,177,133,192.66a2.16,2.16,0,0,1-2,0L85,166.09a.69.69,0,0,1-.4-.57v.26a.7.7,0,0,0,.4.54l46,26.57a2.16,2.16,0,0,0,2,0l26.91-15.64a.68.68,0,0,0,.39-.56v-.2A.67.67,0,0,1,159.9,177Z\" />\r\n                <path class=\"cls-38\"\r\n                    d=\"M159.89,175.89l-46-26.57a2.16,2.16,0,0,0-2,0L85,165a.6.6,0,0,0,0,1.13l46,26.57a2.16,2.16,0,0,0,2,0L159.9,177C160.44,176.71,160.43,176.2,159.89,175.89Z\" />\r\n            </g>\r\n            <path class=\"cls-39\"\r\n                d=\"M140.24,175.19l1.32.76a1.19,1.19,0,0,0,1.07,0l1.36-.79c.3-.17.29-.45,0-.63l-1.32-.76a1.19,1.19,0,0,0-1.07,0l-1.36.8A.33.33,0,0,0,140.24,175.19Z\" />\r\n            <path class=\"cls-40\"\r\n                d=\"M136.69,166.55l1.37.8a1.19,1.19,0,0,0,1.07,0l.2-.12a.33.33,0,0,0,0-.62l-1.38-.79a1.19,1.19,0,0,0-1.07,0l-.2.11A.33.33,0,0,0,136.69,166.55Z\" />\r\n            <path class=\"cls-41\"\r\n                d=\"M139.61,168.24l1.21.7a1.19,1.19,0,0,0,1.07,0l.2-.12a.33.33,0,0,0,0-.62l-1.22-.7a1.19,1.19,0,0,0-1.07,0l-.2.12A.33.33,0,0,0,139.61,168.24Z\" />\r\n            <path class=\"cls-42\"\r\n                d=\"M142.37,169.83l1.27.74a1.19,1.19,0,0,0,1.07,0l.2-.12a.33.33,0,0,0,0-.62l-1.26-.73a1.19,1.19,0,0,0-1.07,0l-.2.11C142.07,169.38,142.07,169.67,142.37,169.83Z\" />\r\n            <path class=\"cls-43\"\r\n                d=\"M140.32,169.23l-1.21-.7a1.19,1.19,0,0,0-1.07,0l-1.22.7a.33.33,0,0,0,0,.62l1.21.71a1.19,1.19,0,0,0,1.07,0l1.22-.71A.33.33,0,0,0,140.32,169.23Z\" />\r\n            <path class=\"cls-44\"\r\n                d=\"M143.14,170.85l-1.27-.73a1.19,1.19,0,0,0-1.07,0l-1.21.71a.33.33,0,0,0,0,.62l1.27.73a1.19,1.19,0,0,0,1.07,0l1.21-.7C143.44,171.3,143.44,171,143.14,170.85Z\" />\r\n            <path class=\"cls-45\"\r\n                d=\"M145.19,171.46l1.31.76a1.19,1.19,0,0,0,1.07,0l.2-.12a.33.33,0,0,0,0-.62l-1.32-.76a1.19,1.19,0,0,0-1.07,0l-.2.12A.33.33,0,0,0,145.19,171.46Z\" />\r\n            <path class=\"cls-46\"\r\n                d=\"M134.66,172l1.21.7a1.21,1.21,0,0,0,1.08,0l1.36-.79a.33.33,0,0,0,0-.62l-1.22-.71a1.19,1.19,0,0,0-1.07,0l-1.36.8A.33.33,0,0,0,134.66,172Z\" />\r\n            <path class=\"cls-47\"\r\n                d=\"M130,172.44l1.38.79a1.19,1.19,0,0,0,1.07,0l1.2-.7a.33.33,0,0,0,0-.62l-1.37-.79a1.19,1.19,0,0,0-1.07,0l-1.21.7A.33.33,0,0,0,130,172.44Z\" />\r\n            <path class=\"cls-48\"\r\n                d=\"M144.79,173.84l1.22-.71a.33.33,0,0,0,0-.62l-1.31-.76a1.19,1.19,0,0,0-1.07,0l-1.22.7a.33.33,0,0,0,0,.63l1.31.76A1.19,1.19,0,0,0,144.79,173.84Z\" />\r\n            <path class=\"cls-49\"\r\n                d=\"M148.05,173.12l1.37.79a1.19,1.19,0,0,0,1.07,0l.2-.12a.33.33,0,0,0,0-.62l-1.37-.79a1.19,1.19,0,0,0-1.07,0l-.2.11C147.75,172.66,147.75,172.94,148.05,173.12Z\" />\r\n            <path class=\"cls-50\"\r\n                d=\"M141.13,173.5a.33.33,0,0,0,0-.62l-1.26-.73a1.21,1.21,0,0,0-1.08,0l-1.36.79a.33.33,0,0,0,0,.62l1.27.73a1.19,1.19,0,0,0,1.07,0Z\" />\r\n            <path class=\"cls-51\"\r\n                d=\"M132.9,174.13l1.21.7a1.19,1.19,0,0,0,1.07,0l1.21-.7a.33.33,0,0,0,0-.62l-1.21-.7a1.19,1.19,0,0,0-1.07,0l-1.21.7A.33.33,0,0,0,132.9,174.13Z\" />\r\n            <path class=\"cls-52\"\r\n                d=\"M151,174.8l1.22.7a1.19,1.19,0,0,0,1.07,0l.2-.11c.29-.18.29-.46,0-.62l-1.21-.71a1.16,1.16,0,0,0-1.07,0l-.2.11A.33.33,0,0,0,151,174.8Z\" />\r\n            <path class=\"cls-53\"\r\n                d=\"M128.36,174.75l1.37.79a1.19,1.19,0,0,0,1.07,0l1.26-.73a.33.33,0,0,0,0-.62l-1.37-.79a1.21,1.21,0,0,0-1.08,0l-1.25.73A.33.33,0,0,0,128.36,174.75Z\" />\r\n            <path class=\"cls-54\"\r\n                d=\"M135.66,175.72l1.26.73a1.18,1.18,0,0,0,1.08,0l1.2-.7a.33.33,0,0,0,0-.62l-1.27-.73a1.19,1.19,0,0,0-1.07,0l-1.2.7A.33.33,0,0,0,135.66,175.72Z\" />\r\n            <path class=\"cls-55\"\r\n                d=\"M150.48,177.12l1.21-.71a.33.33,0,0,0,0-.62l-4.14-2.39a1.19,1.19,0,0,0-1.07,0l-1.21.71a.33.33,0,0,0,0,.62l4.14,2.39A1.19,1.19,0,0,0,150.48,177.12Z\" />\r\n            <path class=\"cls-56\"\r\n                d=\"M131.28,176.44l1.21.7a1.21,1.21,0,0,0,1.08,0l1.26-.73a.33.33,0,0,0,0-.62l-1.21-.7a1.16,1.16,0,0,0-1.07,0l-1.26.74A.33.33,0,0,0,131.28,176.44Z\" />\r\n            <path class=\"cls-57\"\r\n                d=\"M156.51,176.53l-1.51-.87a1.19,1.19,0,0,0-1.07,0l-.2.11a.33.33,0,0,0,0,.63l1.5.87a1.19,1.19,0,0,0,1.07,0l.2-.12A.33.33,0,0,0,156.51,176.53Z\" />\r\n            <path class=\"cls-58\"\r\n                d=\"M147.57,178.8l1.37-.79a.33.33,0,0,0,0-.62l-3.4-2a1.19,1.19,0,0,0-1.07,0l-1.37.79a.33.33,0,0,0,0,.62l3.39,2A1.13,1.13,0,0,0,147.57,178.8Z\" />\r\n            <path class=\"cls-59\"\r\n                d=\"M154.74,177.55l-1.5-.87a1.25,1.25,0,0,0-1.07,0l-1.22.71a.33.33,0,0,0,0,.62l1.5.87a1.19,1.19,0,0,0,1.07,0l1.22-.7A.33.33,0,0,0,154.74,177.55Z\" />\r\n            <path class=\"cls-60\"\r\n                d=\"M134,178l4,2.32a1.21,1.21,0,0,0,1.08,0l1.25-.73a.33.33,0,0,0,0-.62l-4-2.32a1.19,1.19,0,0,0-1.07,0l-1.26.73A.33.33,0,0,0,134,178Z\" />\r\n            <path class=\"cls-61\"\r\n                d=\"M144.83,180.4l1.21-.7a.33.33,0,0,0,0-.62L140.75,176a1.19,1.19,0,0,0-1.07,0l-1.21.7a.33.33,0,0,0,0,.62l5.28,3.05A1.19,1.19,0,0,0,144.83,180.4Z\" />\r\n            <path class=\"cls-62\"\r\n                d=\"M152,179.15l-1.5-.86a1.18,1.18,0,0,0-1.08,0l-1.36.8a.33.33,0,0,0,0,.62l1.51.87a1.19,1.19,0,0,0,1.07,0l1.36-.8C152.29,179.6,152.29,179.33,152,179.15Z\" />\r\n            <path class=\"cls-63\"\r\n                d=\"M137.59,180.63l-1.38-.8a1.19,1.19,0,0,0-1.07,0l-1.25.73a.33.33,0,0,0,0,.62l1.38.8a1.16,1.16,0,0,0,1.07,0l1.26-.72A.33.33,0,0,0,137.59,180.63Z\" />\r\n            <path class=\"cls-64\"\r\n                d=\"M139.61,181.25,141,182a1.13,1.13,0,0,0,1.07,0l1.26-.73a.33.33,0,0,0,0-.62l-1.35-.77a1.16,1.16,0,0,0-1.07,0l-1.26.73A.33.33,0,0,0,139.61,181.25Z\" />\r\n            <path class=\"cls-65\"\r\n                d=\"M149.09,180.84l-1.51-.87a1.19,1.19,0,0,0-1.07,0l-1.21.7a.33.33,0,0,0,0,.62l1.5.87a1.19,1.19,0,0,0,1.07,0l1.21-.7A.33.33,0,0,0,149.09,180.84Z\" />\r\n            <path class=\"cls-66\"\r\n                d=\"M146.34,182.44l-1.5-.87a1.19,1.19,0,0,0-1.07,0l-1.26.73a.33.33,0,0,0,0,.62l1.51.87a1.19,1.19,0,0,0,1.07,0l1.26-.73A.33.33,0,0,0,146.34,182.44Z\" />\r\n            <path class=\"cls-67\"\r\n                d=\"M143.54,184.06l-1.5-.87a1.19,1.19,0,0,0-1.07,0l-1.25.73a.33.33,0,0,0,0,.62l1.5.87a1.21,1.21,0,0,0,1.08,0l1.25-.73A.33.33,0,0,0,143.54,184.06Z\" />\r\n            <path class=\"cls-68\"\r\n                d=\"M140.49,182.3l-1.35-.78a1.19,1.19,0,0,0-1.07,0l-1.25.73a.33.33,0,0,0,0,.62l1.35.78a1.19,1.19,0,0,0,1.07,0l1.25-.73A.33.33,0,0,0,140.49,182.3Z\" />\r\n            <path class=\"cls-69\"\r\n                d=\"M134.66,178.93l-1.09-.62a1.13,1.13,0,0,0-1.07,0l-1.25.72a.34.34,0,0,0,0,.63l1.09.62a1.21,1.21,0,0,0,1.08,0l1.25-.72C135,179.39,135,179.11,134.66,178.93Z\" />\r\n            <path class=\"cls-70\"\r\n                d=\"M132,177.41l-1.21-.7a1.19,1.19,0,0,0-1.07,0l-1.25.73a.33.33,0,0,0,0,.62l1.21.7a1.21,1.21,0,0,0,1.08,0L132,178A.33.33,0,0,0,132,177.41Z\" />\r\n            <path class=\"cls-71\"\r\n                d=\"M118.86,166l1.38.79a1.19,1.19,0,0,0,1.07,0l1.2-.7a.33.33,0,0,0,0-.62l-1.37-.8a1.21,1.21,0,0,0-1.08,0l-1.2.71C118.57,165.58,118.57,165.85,118.86,166Z\" />\r\n            <path class=\"cls-72\"\r\n                d=\"M106,161.19a.33.33,0,0,0,0,.62l1.37.79a1.15,1.15,0,0,0,1.08,0l1.25-.73a.33.33,0,0,0,0-.62l-1.37-.79a1.19,1.19,0,0,0-1.07,0Z\" />\r\n            <path class=\"cls-73\"\r\n                d=\"M102.81,156.76l3.21,1.85a1.19,1.19,0,0,0,1.07,0l1.2-.7a.33.33,0,0,0,0-.62l-3.2-1.85a1.19,1.19,0,0,0-1.07,0l-1.21.7A.33.33,0,0,0,102.81,156.76Z\" />\r\n            <path class=\"cls-74\"\r\n                d=\"M105.56,155.17l2.22,1.28a1.21,1.21,0,0,0,1.08,0l1.36-.79c.29-.17.29-.45,0-.63L108,153.75a1.19,1.19,0,0,0-1.07,0l-1.36.79C105.26,154.72,105.26,155,105.56,155.17Z\" />\r\n            <path class=\"cls-75\"\r\n                d=\"M101.54,159.81l-2-1.15a1.21,1.21,0,0,0-1.08,0l-1.25.73a.33.33,0,0,0,0,.62l2,1.15a1.21,1.21,0,0,0,1.08,0l1.25-.73A.33.33,0,0,0,101.54,159.81Z\" />\r\n            <path class=\"cls-76\"\r\n                d=\"M114.28,153.61l1.37.8a1.19,1.19,0,0,0,1.07,0l.2-.12a.33.33,0,0,0,0-.62l-1.38-.79a1.19,1.19,0,0,0-1.07,0l-.2.12C114,153.17,114,153.44,114.28,153.61Z\" />\r\n            <path class=\"cls-77\"\r\n                d=\"M115.15,154.69l-1.37-.79a1.19,1.19,0,0,0-1.07,0l-1.22.71a.33.33,0,0,0,0,.62l1.37.79a1.19,1.19,0,0,0,1.07,0l1.22-.7C115.45,155.15,115.45,154.87,115.15,154.69Z\" />\r\n            <path class=\"cls-78\"\r\n                d=\"M110.69,155.93l-1.36.79a.33.33,0,0,0,0,.62l1.37.8a1.21,1.21,0,0,0,1.08,0l1.36-.8a.33.33,0,0,0,0-.62l-1.38-.79A1.19,1.19,0,0,0,110.69,155.93Z\" />\r\n            <path class=\"cls-79\"\r\n                d=\"M117.2,155.3l1.21.7a1.19,1.19,0,0,0,1.07,0l.2-.11a.33.33,0,0,0,0-.62l-1.21-.71a1.21,1.21,0,0,0-1.08,0l-.2.12A.33.33,0,0,0,117.2,155.3Z\" />\r\n            <path class=\"cls-80\"\r\n                d=\"M120,156.9l1.27.73a1.19,1.19,0,0,0,1.07,0l.2-.12a.33.33,0,0,0,0-.62l-1.27-.73a1.19,1.19,0,0,0-1.07,0l-.2.12A.33.33,0,0,0,120,156.9Z\" />\r\n            <path class=\"cls-81\"\r\n                d=\"M122.78,158.52l1.24.72a1.21,1.21,0,0,0,1.08,0l.2-.11a.33.33,0,0,0,0-.62l-1.25-.73a1.16,1.16,0,0,0-1.07,0l-.2.11A.33.33,0,0,0,122.78,158.52Z\" />\r\n            <path class=\"cls-82\"\r\n                d=\"M125.57,160.14l1.38.79a1.19,1.19,0,0,0,1.07,0l.2-.12a.33.33,0,0,0,0-.62l-1.37-.79a1.19,1.19,0,0,0-1.07,0l-.2.12A.33.33,0,0,0,125.57,160.14Z\" />\r\n            <path class=\"cls-83\"\r\n                d=\"M126.45,161.22l-1.37-.79a1.21,1.21,0,0,0-1.08,0l-1.21.7a.33.33,0,0,0,0,.62l1.38.8a1.19,1.19,0,0,0,1.07,0l1.21-.71A.33.33,0,0,0,126.45,161.22Z\" />\r\n            <path class=\"cls-84\"\r\n                d=\"M123.53,159.53l-1.25-.72a1.19,1.19,0,0,0-1.07,0l-1.22.71a.33.33,0,0,0,0,.62l1.24.72a1.21,1.21,0,0,0,1.08,0l1.21-.71A.33.33,0,0,0,123.53,159.53Z\" />\r\n            <path class=\"cls-85\"\r\n                d=\"M120.73,157.92l-1.27-.74a1.25,1.25,0,0,0-1.07,0l-1.21.71a.33.33,0,0,0,0,.62l1.27.73a1.19,1.19,0,0,0,1.07,0l1.22-.7A.33.33,0,0,0,120.73,157.92Z\" />\r\n            <path class=\"cls-86\"\r\n                d=\"M117.91,156.29l-1.21-.7a1.19,1.19,0,0,0-1.07,0l-1.22.71a.33.33,0,0,0,0,.62l1.21.7a1.19,1.19,0,0,0,1.07,0l1.22-.71A.33.33,0,0,0,117.91,156.29Z\" />\r\n            <path class=\"cls-87\"\r\n                d=\"M115.9,158.32l-1.21-.7a1.21,1.21,0,0,0-1.08,0l-1.36.79a.33.33,0,0,0,0,.62l1.22.7a1.19,1.19,0,0,0,1.07,0l1.36-.79A.33.33,0,0,0,115.9,158.32Z\" />\r\n            <path class=\"cls-88\"\r\n                d=\"M107.56,158.88a.33.33,0,0,0,0,.62l1.37.8a1.19,1.19,0,0,0,1.07,0l1.21-.7a.33.33,0,0,0,0-.63l-1.37-.79a1.19,1.19,0,0,0-1.07,0Z\" />\r\n            <path class=\"cls-89\"\r\n                d=\"M100,158.39l4.38,2.53a1.21,1.21,0,0,0,1.08,0l1.25-.73a.33.33,0,0,0,0-.62L102.34,157a1.19,1.19,0,0,0-1.07,0l-1.26.74A.33.33,0,0,0,100,158.39Z\" />\r\n            <path class=\"cls-90\"\r\n                d=\"M110.48,160.57a.33.33,0,0,0,0,.62l1.21.7a1.19,1.19,0,0,0,1.07,0l1.21-.7a.33.33,0,0,0,0-.62l-1.22-.7a1.19,1.19,0,0,0-1.07,0Z\" />\r\n            <path class=\"cls-91\"\r\n                d=\"M135.54,169.66l-1.37-.79a1.19,1.19,0,0,0-1.07,0l-1.36.79a.33.33,0,0,0,0,.62l1.37.79a1.15,1.15,0,0,0,1.08,0l1.36-.79A.33.33,0,0,0,135.54,169.66Z\" />\r\n            <path class=\"cls-92\"\r\n                d=\"M128.49,161.82l1.22.7a1.16,1.16,0,0,0,1.07,0l.2-.12a.33.33,0,0,0,0-.62l-1.22-.7a1.19,1.19,0,0,0-1.07,0l-.2.11A.33.33,0,0,0,128.49,161.82Z\" />\r\n            <path class=\"cls-93\"\r\n                d=\"M131.26,163.42l1.26.73a1.21,1.21,0,0,0,1.08,0l.19-.12a.33.33,0,0,0,0-.62l-1.26-.73a1.21,1.21,0,0,0-1.08,0l-.2.12A.33.33,0,0,0,131.26,163.42Z\" />\r\n            <path class=\"cls-94\"\r\n                d=\"M132,164.44l-1.27-.73a1.19,1.19,0,0,0-1.07,0l-1.22.7a.33.33,0,0,0,0,.62l1.26.74a1.21,1.21,0,0,0,1.08,0l1.21-.71A.33.33,0,0,0,132,164.44Z\" />\r\n            <path class=\"cls-95\"\r\n                d=\"M130,166.47l-1.26-.73a1.18,1.18,0,0,0-1.08,0l-1.36.8a.33.33,0,0,0,0,.62l1.27.73a1.19,1.19,0,0,0,1.07,0l1.37-.79A.33.33,0,0,0,130,166.47Z\" />\r\n            <path class=\"cls-96\"\r\n                d=\"M134.07,165.05l1.07.61a1.19,1.19,0,0,0,1.07,0l.2-.12a.33.33,0,0,0,0-.62l-1.06-.61a1.19,1.19,0,0,0-1.07,0l-.2.11A.34.34,0,0,0,134.07,165.05Z\" />\r\n            <path class=\"cls-97\"\r\n                d=\"M134.64,166l-1.06-.62a1.19,1.19,0,0,0-1.07,0l-1.22.71a.33.33,0,0,0,0,.62l1.07.61a1.19,1.19,0,0,0,1.07,0l1.21-.7A.33.33,0,0,0,134.64,166Z\" />\r\n            <path class=\"cls-98\"\r\n                d=\"M132.62,168l-1.06-.61a1.19,1.19,0,0,0-1.07,0l-1.37.79a.33.33,0,0,0,0,.62l1.06.62a1.19,1.19,0,0,0,1.07,0l1.37-.8C132.92,168.43,132.92,168.14,132.62,168Z\" />\r\n            <path class=\"cls-99\"\r\n                d=\"M118.71,159.94l-1.26-.73a1.19,1.19,0,0,0-1.07,0L115,160c-.29.18-.29.45,0,.63l1.26.73a1.21,1.21,0,0,0,1.08,0l1.36-.8A.33.33,0,0,0,118.71,159.94Z\" />\r\n            <path class=\"cls-100\"\r\n                d=\"M121.51,161.56l-1.24-.72a1.21,1.21,0,0,0-1.08,0l-1.36.79a.33.33,0,0,0,0,.62l1.25.72a1.19,1.19,0,0,0,1.07,0l1.37-.79A.33.33,0,0,0,121.51,161.56Z\" />\r\n            <path class=\"cls-101\"\r\n                d=\"M113.25,162.79l1.27.73a1.19,1.19,0,0,0,1.07,0l1.21-.7c.29-.17.29-.45,0-.63l-1.26-.73a1.21,1.21,0,0,0-1.08,0l-1.2.71A.33.33,0,0,0,113.25,162.79Z\" />\r\n            <path class=\"cls-102\"\r\n                d=\"M129.21,162.81l-1.21-.7a1.19,1.19,0,0,0-1.07,0l-1.22.71a.33.33,0,0,0,0,.62l1.22.7a1.19,1.19,0,0,0,1.07,0l1.22-.71C129.51,163.27,129.51,163,129.21,162.81Z\" />\r\n            <path class=\"cls-103\"\r\n                d=\"M108.87,163.5l1.22.7a1.19,1.19,0,0,0,1.07,0l1.26-.73a.33.33,0,0,0,0-.62l-1.21-.7a1.19,1.19,0,0,0-1.07,0l-1.26.73A.33.33,0,0,0,108.87,163.5Z\" />\r\n            <path class=\"cls-104\"\r\n                d=\"M124.43,163.25l-1.37-.8a1.19,1.19,0,0,0-1.07,0l-1.37.8c-.29.17-.29.44,0,.62l1.37.79a1.19,1.19,0,0,0,1.07,0l1.37-.8C124.73,163.69,124.73,163.42,124.43,163.25Z\" />\r\n            <path class=\"cls-105\"\r\n                d=\"M116.07,164.41l1.24.72a1.21,1.21,0,0,0,1.08,0l1.2-.7a.33.33,0,0,0,0-.62l-1.25-.72a1.19,1.19,0,0,0-1.07,0l-1.21.7A.33.33,0,0,0,116.07,164.41Z\" />\r\n            <path class=\"cls-106\"\r\n                d=\"M111.63,165.1l1.27.73a1.19,1.19,0,0,0,1.07,0l1.26-.73a.33.33,0,0,0,0-.63l-1.27-.73a1.19,1.19,0,0,0-1.07,0l-1.26.73A.34.34,0,0,0,111.63,165.1Z\" />\r\n            <path class=\"cls-107\"\r\n                d=\"M110,164.72l-1.27-.73a1.13,1.13,0,0,0-1.07,0l-1.25.72a.33.33,0,0,0,0,.62l1.27.74a1.16,1.16,0,0,0,1.07,0l1.25-.72A.33.33,0,0,0,110,164.72Z\" />\r\n            <path class=\"cls-108\"\r\n                d=\"M127.2,164.84l-1.22-.7a1.19,1.19,0,0,0-1.07,0l-1.36.79a.33.33,0,0,0,0,.62l1.21.7a1.15,1.15,0,0,0,1.08,0l1.36-.79A.33.33,0,0,0,127.2,164.84Z\" />\r\n            <path class=\"cls-109\"\r\n                d=\"M114.45,166.72l1.25.72a1.19,1.19,0,0,0,1.07,0l1.26-.73a.33.33,0,0,0,0-.62l-1.25-.72a1.19,1.19,0,0,0-1.07,0l-1.26.73A.33.33,0,0,0,114.45,166.72Z\" />\r\n            <path class=\"cls-110\"\r\n                d=\"M112.83,166.33l-1.24-.72a1.21,1.21,0,0,0-1.08,0l-1.25.73a.33.33,0,0,0,0,.62l1.25.72a1.21,1.21,0,0,0,1.08,0l1.25-.73A.33.33,0,0,0,112.83,166.33Z\" />\r\n            <path class=\"cls-111\"\r\n                d=\"M121.79,167.71l1.21.7a1.13,1.13,0,0,0,1.07,0l1.21-.7a.33.33,0,0,0,0-.62l-1.21-.7a1.19,1.19,0,0,0-1.07,0l-1.21.7A.33.33,0,0,0,121.79,167.71Z\" />\r\n            <path class=\"cls-112\"\r\n                d=\"M117.25,168.34l1.37.79a1.19,1.19,0,0,0,1.07,0l1.26-.73a.34.34,0,0,0,0-.63l-1.37-.79a1.21,1.21,0,0,0-1.08,0l-1.26.73A.33.33,0,0,0,117.25,168.34Z\" />\r\n            <path class=\"cls-113\"\r\n                d=\"M124.55,169.31l1.26.73a1.21,1.21,0,0,0,1.08,0l1.2-.7a.33.33,0,0,0,0-.62l-1.27-.73a1.19,1.19,0,0,0-1.07,0l-1.21.7A.33.33,0,0,0,124.55,169.31Z\" />\r\n            <path class=\"cls-114\"\r\n                d=\"M120.17,170l1.21.7a1.19,1.19,0,0,0,1.07,0l1.26-.73a.33.33,0,0,0,0-.62l-1.21-.7a1.21,1.21,0,0,0-1.08,0l-1.25.73A.33.33,0,0,0,120.17,170Z\" />\r\n            <path class=\"cls-115\"\r\n                d=\"M127.36,170.93l1.07.62a1.19,1.19,0,0,0,1.07,0l1.2-.7a.33.33,0,0,0,0-.62l-1.06-.62a1.21,1.21,0,0,0-1.08,0l-1.2.7A.33.33,0,0,0,127.36,170.93Z\" />\r\n            <path class=\"cls-116\"\r\n                d=\"M122.93,171.62l1.27.73a1.19,1.19,0,0,0,1.07,0l1.26-.73a.33.33,0,0,0,0-.62l-1.27-.73a1.19,1.19,0,0,0-1.07,0l-1.26.73A.33.33,0,0,0,122.93,171.62Z\" />\r\n            <path class=\"cls-117\"\r\n                d=\"M125.75,173.24l1.06.62a1.19,1.19,0,0,0,1.07,0l1.26-.74c.29-.17.29-.44,0-.62l-1.06-.61a1.21,1.21,0,0,0-1.08,0l-1.25.73A.33.33,0,0,0,125.75,173.24Z\" />\r\n            <path class=\"cls-118\"\r\n                d=\"M129.26,175.82l-14.88-8.59a1.13,1.13,0,0,0-1.07,0l-1.25.72a.34.34,0,0,0,0,.63l14.88,8.59a1.22,1.22,0,0,0,1.07,0l1.25-.73A.33.33,0,0,0,129.26,175.82Z\" />\r\n            <path class=\"cls-119\"\r\n                d=\"M104.46,161.5l-1.37-.8a1.21,1.21,0,0,0-1.08,0l-1.25.73a.33.33,0,0,0,0,.62l1.38.8a1.19,1.19,0,0,0,1.07,0l1.25-.72C104.75,161.94,104.75,161.67,104.46,161.5Z\" />\r\n            <path class=\"cls-120\"\r\n                d=\"M107.22,163.09l-1.21-.7a1.21,1.21,0,0,0-1.08,0l-1.25.73a.33.33,0,0,0,0,.62l1.21.7a1.19,1.19,0,0,0,1.07,0l1.25-.73A.33.33,0,0,0,107.22,163.09Z\" />\r\n            <path class=\"cls-121\"\r\n                d=\"M111.24,151.86l1.49.86a1.19,1.19,0,0,0,1.07,0l.2-.12a.33.33,0,0,0,0-.62l-1.49-.85a1.16,1.16,0,0,0-1.07,0l-.2.11A.33.33,0,0,0,111.24,151.86Z\" />\r\n            <path class=\"cls-122\"\r\n                d=\"M108.46,153.48l1.49.86a1.19,1.19,0,0,0,1.07,0l1.22-.71a.33.33,0,0,0,0-.62l-1.48-.86a1.21,1.21,0,0,0-1.08,0l-1.21.71A.33.33,0,0,0,108.46,153.48Z\" />\r\n            <path class=\"cls-123\"\r\n                d=\"M137.56,167.63l-1.37-.79a1.19,1.19,0,0,0-1.07,0l-1.22.71a.33.33,0,0,0,0,.62l1.37.79a1.19,1.19,0,0,0,1.07,0l1.22-.71A.33.33,0,0,0,137.56,167.63Z\" />\r\n            <path class=\"cls-124\"\r\n                d=\"M127.61,178.53l-18.46-10.66a.93.93,0,0,0-.8,0l-8.66,5c-.22.13-.22.34,0,.47L118.15,184a.87.87,0,0,0,.8,0l8.66-5A.25.25,0,0,0,127.61,178.53Z\" />\r\n            <path class=\"cls-125\"\r\n                d=\"M92.08,333.87a73.93,73.93,0,0,0,10.9,5.2c4.65,1.56,6.08,1.7,6.7,2.94s1.19,3.63-1.12,4.43-18.32,2.87-20.9,3.21-8.11-.65-8.17-2.84,1.9-12.8,1.9-12.8Z\" />\r\n            <path class=\"cls-126\"\r\n                d=\"M91.94,332.46a73,73,0,0,0,10.9,5.21c4.64,1.56,6.08,1.69,6.7,2.93s1.19,3.64-1.13,4.44-18.32,2.87-20.9,3.21-8.1-.65-8.17-2.84,1.9-12.81,1.9-12.81Z\" />\r\n            <path class=\"cls-127\"\r\n                d=\"M93.79,334.83s-8.49,3.52-14.48-2.91c0,0,.42-21.11.76-45.31-9.16-15.25-23.89-28.37-32-35.21l32.43-15.66s16,25.61,18.51,46C98.7,295,93.79,334.83,93.79,334.83Z\" />\r\n            <path class=\"cls-125\"\r\n                d=\"M99.84,308.63a76.93,76.93,0,0,0,9,8.88c4.06,3.12,5.43,3.75,5.62,5.18s-.06,4-2.62,4-19.1-3.43-21.77-4-7.8-3.41-7.11-5.6,6.25-12,6.25-12Z\" />\r\n            <path class=\"cls-126\"\r\n                d=\"M100.17,307.19a77.82,77.82,0,0,0,9,8.88c4.06,3.12,5.44,3.75,5.63,5.19s-.07,4-2.63,4-19.1-3.42-21.77-4-7.79-3.42-7.1-5.61,6.25-12,6.25-12Z\" />\r\n            <path class=\"cls-127\"\r\n                d=\"M122.9,265.8s-.17,3.82-4.58,11.54-17.09,31-17.09,31-9.49.75-13.66-4c0,0,13.25-33.84,15.33-38.5S121,256.88,122.9,265.8Z\" />\r\n            <g class=\"cls-2\">\r\n                <polygon class=\"cls-128\"\r\n                    points=\"43.47 243.9 39.24 241.44 52.73 339.45 56.96 341.91 43.47 243.9\" />\r\n                <polygon class=\"cls-129\"\r\n                    points=\"20.96 252 16.73 249.54 3.25 368.02 7.47 370.48 20.96 252\" />\r\n                <polygon class=\"cls-31\"\r\n                    points=\"47.15 236.87 42.92 234.42 16.73 249.54 20.96 252 47.15 236.87\" />\r\n                <polygon class=\"cls-130\"\r\n                    points=\"20.96 252 7.47 370.48 11.78 367.99 24.66 254.76 43.47 243.9 56.96 341.91 61.26 339.43 47.15 236.87 20.96 252\" />\r\n            </g>\r\n            <g class=\"cls-2\">\r\n                <polygon class=\"cls-128\"\r\n                    points=\"93.45 327.75 51.73 303.53 52.35 308.07 94.08 332.29 93.45 327.75\" />\r\n                <polygon class=\"cls-31\"\r\n                    points=\"97.76 325.26 56.03 301.04 51.73 303.53 93.45 327.75 97.76 325.26\" />\r\n                <polygon class=\"cls-130\"\r\n                    points=\"93.45 327.75 94.08 332.29 98.38 329.8 97.76 325.26 93.45 327.75\" />\r\n            </g>\r\n            <g class=\"cls-2\">\r\n                <polygon class=\"cls-129\"\r\n                    points=\"54.75 345.93 13.02 321.71 12.42 326.96 54.15 351.18 54.75 345.93\" />\r\n                <polygon class=\"cls-31\"\r\n                    points=\"59.05 343.45 17.32 319.23 13.02 321.71 54.75 345.93 59.05 343.45\" />\r\n                <polygon class=\"cls-130\"\r\n                    points=\"54.75 345.93 54.15 351.18 58.45 348.69 59.05 343.45 54.75 345.93\" />\r\n            </g>\r\n            <g class=\"cls-2\">\r\n                <polygon class=\"cls-128\"\r\n                    points=\"87.13 269.24 82.9 266.78 96.39 364.79 100.62 367.25 87.13 269.24\" />\r\n                <polygon class=\"cls-129\"\r\n                    points=\"64.61 277.34 60.39 274.88 46.9 393.36 51.13 395.82 64.61 277.34\" />\r\n                <polygon class=\"cls-31\"\r\n                    points=\"90.81 262.22 86.58 259.76 60.39 274.88 64.61 277.34 90.81 262.22\" />\r\n                <polygon class=\"cls-130\"\r\n                    points=\"64.61 277.34 51.13 395.82 55.43 393.33 68.32 280.1 87.13 269.24 100.62 367.25 104.92 364.77 90.81 262.22 64.61 277.34\" />\r\n            </g>\r\n            <polygon class=\"cls-32\"\r\n                points=\"11.91 248.4 11.91 254.79 63.11 284.64 63.11 278.26 11.91 248.4\" />\r\n            <polygon class=\"cls-16\"\r\n                points=\"11.91 248.4 63.11 278.26 93 261.35 41.79 231.49 11.91 248.4\" />\r\n            <polygon class=\"cls-17\"\r\n                points=\"63.11 278.26 63.11 284.64 93 267.74 93 261.35 63.11 278.26\" />\r\n            <polygon class=\"cls-33\"\r\n                points=\"93 261.35 93 262.35 63.11 279.25 11.91 249.4 11.91 248.4 63.11 278.26 93 261.35\" />\r\n            <polygon class=\"cls-32\"\r\n                points=\"11.91 248.4 11.91 254.79 63.11 284.64 63.11 278.26 11.91 248.4\" />\r\n            <polygon class=\"cls-16\"\r\n                points=\"11.91 248.4 63.11 278.26 93 261.35 41.79 231.49 11.91 248.4\" />\r\n            <polygon class=\"cls-17\"\r\n                points=\"63.11 278.26 63.11 284.64 93 267.74 93 261.35 63.11 278.26\" />\r\n            <polygon class=\"cls-33\"\r\n                points=\"93 261.35 93 262.35 63.11 279.25 11.91 249.4 11.91 248.4 63.11 278.26 93 261.35\" />\r\n            <path class=\"cls-127\"\r\n                d=\"M80.57,233.88s28.25,14,34.08,17.34,8.25,7.79,8.25,15.08c0,3.92-10,3.83-19.67,1.92-2.37-.47-6-1.11-10.25-1.83l-.08-5-7.62-3.59s-12.39,4.88-21.52,3.3A60.68,60.68,0,0,1,55.9,259c-7-2.75-14.33-6.59-16-13.84Z\" />\r\n            <path class=\"cls-131\"\r\n                d=\"M95.43,162.09s2.18-1.57,2.82-2a4.84,4.84,0,0,1,2.12-.86c.75-.07,2.88-.33,3.48-.49s1.83-.67,2-.49a2.3,2.3,0,0,1-1.77,2.57c-1.83.6-2.78.46-3.5.82s-3.37,2.44-3.37,2.44Z\" />\r\n            <path class=\"cls-132\"\r\n                d=\"M97.17,162.49l3.6-1.91a5.17,5.17,0,0,1,2.32-.73,36.6,36.6,0,0,0,3.73-.21c.65-.12,2-.54,2.17-.34a2.46,2.46,0,0,1-2.09,2.56c-2,.48-3,.24-3.78.56s-3.77,2.29-3.77,2.29Z\" />\r\n            <path class=\"cls-133\"\r\n                d=\"M98.76,163.9l4-1.74a5.68,5.68,0,0,1,2.56-.59c.85.06,3.29.16,4,.09s2.17-.43,2.36-.19-.29,2.23-2.46,2.57-3.23,0-4.1.29-4.23,2.14-4.23,2.14Z\" />\r\n            <path class=\"cls-134\"\r\n                d=\"M56.36,169.23l2.33,6s7.31-1.89,11.39-2.58,15.75-3.82,18.06-5.16,6.86-5,7.29-5.35,1.52-1.15,2-.86a13,13,0,0,1,5.29,6.74c-.66,1.3-3.22,2.76-4.62,3.78s-4.68,1.65-6.83,1.65-10.64,5-17.68,8.71a152.16,152.16,0,0,1-18.22,8c-3,1-4.46.48-5.86-1.24s-5.1-9.19-6.55-13.76Z\" />\r\n            <path class=\"cls-135\"\r\n                d=\"M57.91,173.18a32,32,0,0,1-11,11.21,69.72,69.72,0,0,1-4-9.27l13.36-5.89Z\" />\r\n            <path class=\"cls-134\"\r\n                d=\"M99.89,166.15s2.86-1.23,3.56-1.55a5,5,0,0,1,2.26-.51c.75,0,2.92.14,3.55.08s1.93-.38,2.09-.17-.25,2-2.18,2.28-2.85,0-3.62.25-3.76,1.9-3.76,1.9Z\" />\r\n            <path class=\"cls-136\"\r\n                d=\"M102.51,168.35c-.88,1.16-3,2.4-4.26,3.31-1.38-1.37-2.46-2.86-1.34-3.39C98.82,167.38,101.67,168.1,102.51,168.35Z\" />\r\n            <path class=\"cls-134\"\r\n                d=\"M95.15,172.85s2.89-.29,4.65-.31a6.48,6.48,0,0,0,3.08-.52c.76-.34,1.85-1.46,2.42-1.69s1.89-.62,1.85-1.07-1.74-1.3-3.34-.7-2,.95-2.73.79-2-1.5-4-1.13S93.87,171.65,95.15,172.85Z\" />\r\n            <path class=\"cls-134\"\r\n                d=\"M46.61,102.42c7.9-.33,12.25,3.31,14.5,10.69s.82,8.56,2.63,12.5,1.31,7.31-.31,11.62-2.32,6.25-3.82,6.25a41,41,0,0,1-5.87-1.12l-15.88-2.25s-6.5-6-8.43-19.75C27.51,106.78,36.18,102.86,46.61,102.42Z\" />\r\n            <path class=\"cls-137\"\r\n                d=\"M53,138.93s-.12,10.68,3.63,16.74,5.5,6.44,5.5,6.44-11,5.75-21.15,1.37A16.34,16.34,0,0,1,30.8,149.23s8.13-.56,5.69-14.56l11-1.58s1,2.23,4.8,3.29A5.08,5.08,0,0,1,53,138.93Z\" />\r\n            <path class=\"cls-138\"\r\n                d=\"M56.61,155.67s6.94,6.19,9.44,8.13,9,6.81,9.88,16.75-.57,33.68,2.37,43.12,4.94,9.5,3.38,15S72,251.61,58.61,253.23s-22.18-5-23.87-16.25-4.25-32.31-6-42.5-7.25-25.81-6.17-34.06a24.92,24.92,0,0,1,2.37-8.08c2-3.58,8.2-4.33,8.74-4.33.83,0,1.64.83,8.55,2.83S52.49,153.59,56.61,155.67Z\" />\r\n            <path class=\"cls-139\"\r\n                d=\"M33,148.08s2.87-4.34,3.4-4.37a44.6,44.6,0,0,1,13.56,4,17.14,17.14,0,0,1,7.93,9.06S43,151.34,33,148.08Z\" />\r\n            <path class=\"cls-140\"\r\n                d=\"M77.14,217.64c-9.38-6.85-16-20.69-17.52-31.39l16.63,4.05C76.33,199,76.21,209.87,77.14,217.64Z\" />\r\n            <path class=\"cls-141\"\r\n                d=\"M117.94,185.42s.89-2.77,1.26-4.49a6.38,6.38,0,0,1,1.16-2.9c.48-.68,1.8-1.51,2.15-2s1-1.72,1.42-1.58.92,2,0,3.41-1.34,1.77-1.34,2.5,1,2.31.29,4.11S118.85,186.92,117.94,185.42Z\" />\r\n            <path class=\"cls-134\"\r\n                d=\"M83,187.77l3.62,5.95s7.3-1.88,11.39-2.58,15.75-3.82,18.06-5.16,6.29-7.47,6.72-7.79,1.52-1.15,2-.86c2.85,1.56,5.53,7.79,5.86,9.19-.66,1.3-3.23,2.76-4.62,3.77s-4.68,1.66-6.83,1.66-10.64,5-17.68,8.71a153.37,153.37,0,0,1-18.22,8c-3,1-4.46.48-5.86-1.23s-5.1-9.19-6.56-13.76Z\" />\r\n            <path class=\"cls-142\"\r\n                d=\"M116.2,189.1a12.09,12.09,0,0,1,.56,3.6l-1.92,1a13.13,13.13,0,0,0-1.06-3.82Z\" />\r\n            <path class=\"cls-143\"\r\n                d=\"M111.06,188.73c.18,1.06,1.62,1.69,3.21,1.42s2.73-1.36,2.55-2.42-1.62-1.69-3.21-1.42S110.88,187.67,111.06,188.73Z\" />\r\n            <path class=\"cls-144\"\r\n                d=\"M111.57,188.44c.15.87,1.33,1.4,2.64,1.17s2.24-1.12,2.09-2-1.33-1.39-2.64-1.17S111.42,187.57,111.57,188.44Z\" />\r\n            <path class=\"cls-134\"\r\n                d=\"M124.06,177.39l3.45-1.78a5,5,0,0,1,2.22-.66c.75,0,2.92-.06,3.54-.17s1.9-.5,2.08-.3a2.33,2.33,0,0,1-2,2.42c-1.9.43-2.85.2-3.6.49s-3.62,2.14-3.62,2.14Z\" />\r\n            <path class=\"cls-134\"\r\n                d=\"M125.72,179.51l4-1.75a5.54,5.54,0,0,1,2.56-.58c.85,0,3.29.15,4,.08s2.17-.42,2.36-.19-.29,2.23-2.46,2.58-3.23,0-4.1.28-4.24,2.14-4.24,2.14Z\" />\r\n            <path class=\"cls-134\"\r\n                d=\"M127.38,182.11l3.88-1.25a5.14,5.14,0,0,1,2.41-.3c.78.12,3,.44,3.7.44s2.06-.2,2.21,0a2.45,2.45,0,0,1-2.51,2.15c-2,.12-3-.28-3.82-.1s-4.11,1.59-4.11,1.59Z\" />\r\n            <path class=\"cls-134\"\r\n                d=\"M127.15,184.84l3.74-.87a5,5,0,0,1,2.29-.1c.73.18,2.82.66,3.44.71s1.95,0,2.07.21a2.32,2.32,0,0,1-2.53,1.83c-1.92-.05-2.78-.5-3.57-.4s-4,1.17-4,1.17Z\" />\r\n            <path class=\"cls-145\"\r\n                d=\"M70.5,167.84s5.49,7.08,8.11,11,8.82,13.31,8.82,13.31a6,6,0,0,1,2.23-.58,33.13,33.13,0,0,1,1.86,14.85c-1.47.8-4.44,2.79-6.24,3.73s-4.71,2.17-6.12.5-4-4.08-6.09-6.79-11.83-8.3-13.58-18.3S64.85,161.67,70.5,167.84Z\" />\r\n            <path class=\"cls-146\"\r\n                d=\"M88,191.94s.11-.65.42-.75S96,191,96.36,191s1.72,1,2.5,4.78.37,6.69,0,7.09-7.5,4.58-7.74,4.69-1-.28-1-.28A31.83,31.83,0,0,0,88,191.94Z\" />\r\n            <path class=\"cls-147\"\r\n                d=\"M58.61,115.3a11.91,11.91,0,0,1,1,6.67,6.15,6.15,0,0,1-2-1.59s-.38,2.75-.42,3.13-1.7,1.58-1.83,2.33-.25,4.83-.25,4.83l-1.29.21a29.7,29.7,0,0,0-1.53-3.62c-.51-.75-2.14-2-2.85-1.25s-1.08,5.25-.54,7.21,3.39,3.16,3.39,3.16c0,4-1.18,5.5-1.51,5.71s-.84-1-.84-1-5.79,2.78-8.12,2.58a12.49,12.49,0,0,1-9.42-7.24s-.54,1-.71,1a19.39,19.39,0,0,1-6.37-11.58c-1.25-7.42,1-10.92,2.58-13.55-.12-4.12,1-8.33,6-10.16s9.46-2.54,11.5-4.42,5.17-4.75,5.75-4.54a6.85,6.85,0,0,1,3.29,5.79c3-1.12,6.17-4,6.55-2.67s2.33,7.25,0,11.21c1.79-.54,3.25-.54,3.25.13S63.44,114,58.61,115.3Z\" />\r\n            <path class=\"cls-148\"\r\n                d=\"M170.34,206.08l-.54-4.1a3.29,3.29,0,0,0,1.75,2.26,9.88,9.88,0,0,0,9,.09,3.4,3.4,0,0,0,1.93-2.39c-.17,1.37-.34,2.74-.52,4.11a3.09,3.09,0,0,1-1.77,2.18,9,9,0,0,1-8.21-.08A3,3,0,0,1,170.34,206.08Z\" />\r\n            <path class=\"cls-9\"\r\n                d=\"M169.79,202c-.37-2.88-.75-5.75-1.13-8.63a3.86,3.86,0,0,0,2.05,2.66,11.63,11.63,0,0,0,10.56.11,4,4,0,0,0,2.27-2.81l-1.08,8.63a3.4,3.4,0,0,1-1.94,2.39,9.9,9.9,0,0,1-9-.09A3.29,3.29,0,0,1,169.79,202Z\" />\r\n            <path class=\"cls-149\"\r\n                d=\"M168.66,193.36c-.07-.54-.14-1.09-.22-1.63a4,4,0,0,0,2.12,2.73,11.93,11.93,0,0,0,10.85.11,4.1,4.1,0,0,0,2.34-2.88l-.21,1.62a4,4,0,0,1-2.27,2.81,11.63,11.63,0,0,1-10.56-.11A3.84,3.84,0,0,1,168.66,193.36Z\" />\r\n            <path class=\"cls-150\"\r\n                d=\"M182.36,184.75c3.32,2,3.21,5.19-.26,7.12a13.52,13.52,0,0,1-12.28-.13c-3.32-2-3.21-5.18.25-7.11A13.54,13.54,0,0,1,182.36,184.75Z\" />\r\n            <path class=\"cls-151\"\r\n                d=\"M179.89,184.47a8.21,8.21,0,0,0-7.46-.08c-2.1,1.18-2.17,3.11-.16,4.33a8.26,8.26,0,0,0,7.47.07C181.84,187.62,181.91,185.68,179.89,184.47Z\" />\r\n            <path class=\"cls-152\"\r\n                d=\"M177.41,186.08a2.88,2.88,0,0,0-2.59,0c-.73.41-.76,1.08-.06,1.5a2.85,2.85,0,0,0,2.59,0C178.08,187.17,178.11,186.5,177.41,186.08Z\" />\r\n            <path class=\"cls-153\"\r\n                d=\"M177.77,185.65a3.62,3.62,0,0,0-3.3,0c-.94.52-1,1.38-.07,1.91a3.62,3.62,0,0,0,3.3,0C178.63,187.05,178.66,186.19,177.77,185.65Zm-.42,1.93a2.85,2.85,0,0,1-2.59,0c-.7-.42-.67-1.09.06-1.5a2.88,2.88,0,0,1,2.59,0C178.11,186.5,178.08,187.17,177.35,187.58Z\" />\r\n            <path class=\"cls-154\"\r\n                d=\"M170.47,185.86l1.37-1.08c-1.51,1.18-1.37,2.85.43,3.94a8.26,8.26,0,0,0,7.47.07c1.94-1.08,2.15-2.81.58-4l1.37,1.07c2.08,1.6,1.8,3.9-.77,5.33a10.9,10.9,0,0,1-9.87-.1C168.66,189.62,168.48,187.42,170.47,185.86Z\" />\r\n            <path class=\"cls-155\"\r\n                d=\"M179.74,188.79a8.26,8.26,0,0,1-7.47-.07c-1.47-.89-1.83-2.16-1.1-3.24-.82,1.1-.49,2.42,1,3.33a8.23,8.23,0,0,0,7.47.08,3.6,3.6,0,0,0,1.24-1.07A3.74,3.74,0,0,1,179.74,188.79Z\" />\r\n            <path class=\"cls-156\"\r\n                d=\"M167.4,191.4v-3.13c0,1.25.81,2.5,2.42,3.47a13.52,13.52,0,0,0,12.28.13c1.78-1,2.68-2.32,2.68-3.65,0,1.05,0,2.09,0,3.13,0,1.33-.89,2.65-2.68,3.65a13.52,13.52,0,0,1-12.28-.13C168.21,193.9,167.4,192.65,167.4,191.4Z\" />\r\n            <path class=\"cls-155\"\r\n                d=\"M182.1,191.87a13.52,13.52,0,0,1-12.28-.13,4.26,4.26,0,0,1-2.42-3.46v.14c0,1.25.81,2.5,2.42,3.47a13.52,13.52,0,0,0,12.28.12c1.78-1,2.68-2.31,2.68-3.64v-.15C184.78,189.55,183.88,190.87,182.1,191.87Z\" />\r\n            <polygon class=\"cls-13\"\r\n                points=\"261.8 282.05 238.94 295.34 246.05 341.9 261.82 332.73 277.7 341.9 284.81 295.34 261.8 282.05\" />\r\n            <polygon class=\"cls-157\"\r\n                points=\"261.99 315.1 261.95 355.53 238.33 341.9 227.76 295.34 261.99 315.1\" />\r\n            <polygon class=\"cls-158\"\r\n                points=\"295.99 295.34 285.42 341.9 261.95 355.53 261.99 315.1 295.99 295.34\" />\r\n            <polygon class=\"cls-16\"\r\n                points=\"237.1 336.46 238.33 341.9 261.95 355.53 261.97 355.52 261.97 350.82 237.1 336.46\" />\r\n            <polygon class=\"cls-17\"\r\n                points=\"286.65 336.47 261.97 350.82 261.97 355.52 285.42 341.9 286.65 336.47\" />\r\n            <polygon class=\"cls-18\"\r\n                points=\"261.99 315.98 295.76 296.36 295.99 295.34 261.99 315.1 227.76 295.34 227.99 296.35 261.99 315.98\" />\r\n            <path class=\"cls-19\"\r\n                d=\"M261.76,275.58,296,295.34,262,315.1l-34.23-19.76Zm.19,33,22.86-13.28-23-13.29-22.86,13.29,23,13.28\" />\r\n            <path class=\"cls-20\"\r\n                d=\"M248.55,307.35c.32,0,.65,0,1,0a8.58,8.58,0,0,0,5.4-2.73l-16-9.25,13.7-8c-2.25-.53-4.17.26-7-2.09a2.23,2.23,0,0,1-.24-.19l-17.63,10.25Z\" />\r\n            <path class=\"cls-159\"\r\n                d=\"M239.91,232.2c.89-6-1.25-6,.62-12,2.17-6,5.08-8.29,7.57-14,4.1,4.68,7.58,6,11.46,11,3.62,5.18,1.59,5.87,4.25,11.28,2.4,5.52,5,5,7.1,10.78,1.86,5.9-1.21,6.31-.29,12.22.64,5.94,4.19,5.78,4.49,12,0,6.19-3.95,6.08-4.84,12.05-1.18,5.95,3.18,6.41,1.58,12.51-1.89,6-6.57,5.21-9.34,10.82-4.33-4.51-8.54-2.29-12.18-7.47-3.38-5.32.63-7.09-2.29-12.4-2.66-5.42-6.42-4.11-8.28-10-1.58-6,1.85-6.9.65-12.76-.92-5.9-4-5.36-4-11.55C236.68,238.43,239.3,238.19,239.91,232.2Z\" />\r\n            <path class=\"cls-22\"\r\n                d=\"M275.11,263.43c-.23-4.74-2.38-5.75-3.65-8.66a11.42,11.42,0,0,1-.84,2.12c-2.16,4.79-5.08,3.68-7,8.75-1.71,5.16,1.64,6.16.75,11.39-.64,5.28-4.42,4.48-4.75,10-.06,4.79,3,5.9,4.34,9.58,2.74-3.32,6.32-3.53,7.92-8.63,1.6-6.1-2.76-6.56-1.58-12.51C271.16,269.51,275.13,269.62,275.11,263.43Z\" />\r\n            <path class=\"cls-22\"\r\n                d=\"M239.27,235.41c2.23,2.92,1.28,4.06,3.88,7.88,2.77,4.51,4.94,3.7,7.51,8.5,2.34,4.91-.28,5.64,1.25,10.67,1.29,5.09,4.35,4.51,5.38,9.85.78,5.38-2.69,5.77-2.74,11.07-.28,5.32,3.56,5.19,2.93,10.69a10,10,0,0,1-.4,1.55c-2.38-.77-4.66-1.31-6.75-4.28-3.38-5.32.63-7.09-2.29-12.4-2.66-5.42-6.42-4.11-8.28-10-1.58-6,1.85-6.9.65-12.76-.92-5.9-4-5.36-4-11.55C236.63,239.78,238.27,238.57,239.27,235.41Z\" />\r\n            <g class=\"cls-160\">\r\n                <g class=\"cls-24\">\r\n                    <line class=\"cls-25\" x1=\"247.63\" y1=\"203.13\" x2=\"263.05\" y2=\"302.27\" />\r\n                    <polyline class=\"cls-25\" points=\"235.54 278.81 261.62 293.07 282.14 271.56\" />\r\n                    <polyline class=\"cls-25\" points=\"233.16 263.47 259.24 277.73 279.75 256.22\" />\r\n                    <polyline class=\"cls-25\" points=\"230.77 248.13 256.85 262.38 277.36 240.88\" />\r\n                    <polyline class=\"cls-25\" points=\"228.38 232.79 254.46 247.04 274.98 225.54\" />\r\n                    <polyline class=\"cls-25\" points=\"225.99 217.45 252.07 231.7 272.59 210.2\" />\r\n                    <polyline class=\"cls-25\" points=\"223.61 202.1 249.69 216.36 270.2 194.85\" />\r\n                </g>\r\n            </g>\r\n            <path class=\"cls-161\"\r\n                d=\"M208.43,267.61c-2.65-4.59-4.15-3.45-6.16-8.62-1.78-5.3-1.05-8.48-2.46-13.76,5.38,1,8.49,0,13.91,1.31,5.33,1.58,4.31,3.16,9.11,5.43,4.67,2.48,6.12.68,10.77,3.52,4.51,3,2.63,5,6.49,8.55,3.69,3.74,6,1.69,9.63,5.76,3.4,4.25.61,6.35,3.27,10.94,2.44,4.73,5.69,2.66,7.93,7.73,2,5.19-1.67,7.18-.5,12.55-5.44-.73-7.12,3.1-12.46,1.53-5.23-1.81-3.45-5.22-8.36-7.27-4.8-2.26-6.66.69-11.17-2.35-4.36-3.24-2.51-5.75-6.53-9.12-3.87-3.55-5.67-1.51-9.07-5.75C209.62,273.66,211.29,272.06,208.43,267.61Z\" />\r\n            <g class=\"cls-162\">\r\n                <g class=\"cls-24\">\r\n                    <line class=\"cls-25\" x1=\"197.82\" y1=\"243.4\" x2=\"262.69\" y2=\"303.1\" />\r\n                    <polyline class=\"cls-25\" points=\"230.94 302.04 256.67 297.56 259 271.55\" />\r\n                    <polyline class=\"cls-25\" points=\"220.9 292.8 246.63 288.32 248.96 262.31\" />\r\n                    <polyline class=\"cls-25\" points=\"210.86 283.56 236.59 279.08 238.92 253.07\" />\r\n                    <polyline class=\"cls-25\" points=\"200.82 274.32 226.56 269.84 228.89 243.83\" />\r\n                    <polyline class=\"cls-25\" points=\"190.79 265.08 216.52 260.61 218.85 234.59\" />\r\n                    <polyline class=\"cls-25\" points=\"180.75 255.84 206.48 251.37 208.81 225.35\" />\r\n                </g>\r\n            </g>\r\n            <path class=\"cls-163\"\r\n                d=\"M294.11,244.42c4.39-3,3.15-4.38,8.17-6.76,5.15-2.14,8.38-1.63,13.55-3.41-.59,5.43.62,8.47-.33,14-1.2,5.42-2.86,4.52-4.78,9.46-2.14,4.83-.25,6.16-2.75,11-2.72,4.71-4.81,3-8.09,7.07-3.46,3.95-1.25,6.14-5.06,10-4,3.69-6.29,1.06-10.68,4-4.55,2.77-2.26,5.87-7.16,8.46-5,2.36-7.28-1.16-12.55.38.34-5.48-3.6-6.89-2.41-12.33,1.44-5.35,5-3.8,6.67-8.85,1.92-4.94-1.16-6.59,1.56-11.3,2.92-4.58,5.56-2.91,8.64-7.16,3.27-4.1,1.11-5.76,5.1-9.45C288.16,246,289.87,247.58,294.11,244.42Z\" />\r\n            <g class=\"cls-164\">\r\n                <g class=\"cls-24\">\r\n                    <line class=\"cls-25\" x1=\"317.51\" y1=\"232.14\" x2=\"262.51\" y2=\"301.03\" />\r\n                    <polyline class=\"cls-25\" points=\"261.34 269.29 267.62 294.64 293.73 295.14\" />\r\n                    <polyline class=\"cls-25\" points=\"269.86 258.63 276.13 283.98 302.24 284.48\" />\r\n                    <polyline class=\"cls-25\" points=\"278.37 247.96 284.64 273.32 310.75 273.82\" />\r\n                    <polyline class=\"cls-25\" points=\"286.88 237.3 293.15 262.66 319.26 263.16\" />\r\n                    <polyline class=\"cls-25\" points=\"295.39 226.64 301.66 251.99 327.77 252.49\" />\r\n                    <polyline class=\"cls-25\" points=\"303.9 215.98 310.17 241.33 336.28 241.83\" />\r\n                </g>\r\n            </g>\r\n            <path class=\"cls-165\"\r\n                d=\"M285.39,229.36l1.7-1c.79-.45.79-1.91,0-3.28a4.07,4.07,0,0,0-1.43-1.5,1.45,1.45,0,0,0-1.43-.15l-1.7,1-1.68-2.92a4.15,4.15,0,0,0-1.43-1.5,1.45,1.45,0,0,0-1.43-.15c-.79.45-.79,1.92,0,3.28l1.69,2.92-1.7,1c-.79.45-.79,1.92,0,3.28a4.18,4.18,0,0,0,1.43,1.51,1.45,1.45,0,0,0,1.43.14l1.7-1,1.68,2.93a4.07,4.07,0,0,0,1.43,1.5,1.42,1.42,0,0,0,1.43.14c.79-.45.79-1.92,0-3.28Z\" />\r\n            <path class=\"cls-166\"\r\n                d=\"M27,83A2.52,2.52,0,0,1,28,85.33c-.13.89-.81,1.27-1.53.85a2.53,2.53,0,0,1-1.1-2.36C25.53,82.93,26.22,82.55,27,83Zm-.32,2.34c.33.2.64,0,.7-.39a1.17,1.17,0,0,0-.5-1.08c-.33-.19-.65,0-.7.39a1.12,1.12,0,0,0,.5,1.08\" />\r\n            <path class=\"cls-167\"\r\n                d=\"M265.84,8.27a3.87,3.87,0,0,1,1.67,3.61c-.19,1.37-1.24,2-2.34,1.32a3.9,3.9,0,0,1-1.68-3.63C263.68,8.21,264.73,7.62,265.84,8.27Zm-.55,4.05c.71.41,1.38,0,1.5-.85a2.51,2.51,0,0,0-1.07-2.34c-.72-.4-1.39,0-1.52.85a2.52,2.52,0,0,0,1.09,2.34\" />\r\n            <path class=\"cls-168\"\r\n                d=\"M61,15a4.18,4.18,0,0,1,1.56,1.67,16.65,16.65,0,0,0,.88,1.58,2.65,2.65,0,0,0,.85.76,1.43,1.43,0,0,0,1.3.18,4.87,4.87,0,0,1,1.26-.43,2.22,2.22,0,0,1,1.28.36.69.69,0,0,1,.29.63c0,.25-.22.35-.41.24a1.4,1.4,0,0,0-1.3-.18,4.87,4.87,0,0,1-1.26.43,2.18,2.18,0,0,1-1.24-.34,4.19,4.19,0,0,1-1.6-1.69,15.33,15.33,0,0,0-.87-1.57,2.83,2.83,0,0,0-.86-.77,1.44,1.44,0,0,0-1.29-.18,4.86,4.86,0,0,1-1.26.44,2.18,2.18,0,0,1-1.24-.34,4.26,4.26,0,0,1-1.6-1.69c-.34-.6-.56-1.14-.87-1.57a2.83,2.83,0,0,0-.86-.77,1.37,1.37,0,0,0-1.29-.17,5.28,5.28,0,0,1-1.26.43A2.2,2.2,0,0,1,50,11.65,4.26,4.26,0,0,1,48.37,10a16.49,16.49,0,0,0-.87-1.57,2.79,2.79,0,0,0-.85-.77.68.68,0,0,1-.3-.64c0-.24.22-.34.41-.23a4.11,4.11,0,0,1,1.56,1.67A16.65,16.65,0,0,0,49.2,10a2.71,2.71,0,0,0,.86.76,1.41,1.41,0,0,0,1.29.18,4.41,4.41,0,0,1,1.26-.43,2.23,2.23,0,0,1,1.27.35,4.18,4.18,0,0,1,1.56,1.67,16.65,16.65,0,0,0,.88,1.58,2.77,2.77,0,0,0,.85.76,1.43,1.43,0,0,0,1.3.18,4.74,4.74,0,0,1,1.26-.43A2.25,2.25,0,0,1,61,15Z\" />\r\n            <path class=\"cls-168\"\r\n                d=\"M290.74,328.21a4.18,4.18,0,0,1,1.56,1.67,16.38,16.38,0,0,0,.88,1.57,2.67,2.67,0,0,0,.85.77,1.43,1.43,0,0,0,1.3.18,4.87,4.87,0,0,1,1.26-.43,2.22,2.22,0,0,1,1.28.36.69.69,0,0,1,.29.63c0,.24-.22.35-.41.24a1.4,1.4,0,0,0-1.3-.18,4.53,4.53,0,0,1-1.26.42,2.08,2.08,0,0,1-1.24-.33,4.26,4.26,0,0,1-1.6-1.69,15.33,15.33,0,0,0-.87-1.57,2.83,2.83,0,0,0-.86-.77,1.41,1.41,0,0,0-1.29-.18,5.26,5.26,0,0,1-1.26.44,2.18,2.18,0,0,1-1.24-.34,4.26,4.26,0,0,1-1.6-1.69,17.52,17.52,0,0,0-.87-1.57,2.83,2.83,0,0,0-.86-.77,1.41,1.41,0,0,0-1.29-.18,4.52,4.52,0,0,1-1.26.43,2.12,2.12,0,0,1-1.24-.33,4.26,4.26,0,0,1-1.6-1.69,15.33,15.33,0,0,0-.87-1.57,2.79,2.79,0,0,0-.85-.77.68.68,0,0,1-.3-.64c0-.24.22-.34.41-.23a4.11,4.11,0,0,1,1.56,1.67,16.65,16.65,0,0,0,.88,1.58,2.71,2.71,0,0,0,.86.76,1.44,1.44,0,0,0,1.29.18,4.41,4.41,0,0,1,1.26-.43,2.15,2.15,0,0,1,1.27.35,4.18,4.18,0,0,1,1.56,1.67,16.65,16.65,0,0,0,.88,1.58,2.77,2.77,0,0,0,.85.76,1.43,1.43,0,0,0,1.3.18,4.41,4.41,0,0,1,1.26-.43A2.23,2.23,0,0,1,290.74,328.21Z\" />\r\n            <path class=\"cls-167\"\r\n                d=\"M272.57,205.21a.7.7,0,0,1,.34.66c0,.24-.22.35-.42.23a1.34,1.34,0,0,0-1.29-.17,4.89,4.89,0,0,1-1.26.42,2.18,2.18,0,0,1-1.28-.35,4.25,4.25,0,0,1-1.56-1.67,16.65,16.65,0,0,0-.88-1.58,2.77,2.77,0,0,0-.85-.76,1.35,1.35,0,0,0-1.29-.18,4.5,4.5,0,0,1-1.27.42,2.15,2.15,0,0,1-1.27-.34,4.18,4.18,0,0,1-1.56-1.67,13.78,13.78,0,0,0-.88-1.58,2.66,2.66,0,0,0-.85-.76,1.38,1.38,0,0,0-1.29-.18,4.23,4.23,0,0,1-1.26.42,2.13,2.13,0,0,1-1.27-.34,4,4,0,0,1-1.56-1.67,15.4,15.4,0,0,0-.89-1.58,2.66,2.66,0,0,0-.85-.76.69.69,0,0,1-.29-.64c0-.25.22-.34.41-.23a4.22,4.22,0,0,1,1.56,1.66,15.49,15.49,0,0,0,.88,1.58,2.61,2.61,0,0,0,.86.77,1.44,1.44,0,0,0,1.29.18,4.77,4.77,0,0,1,1.25-.44,2.18,2.18,0,0,1,1.24.34,4.23,4.23,0,0,1,1.6,1.68,16.51,16.51,0,0,0,.87,1.58,2.83,2.83,0,0,0,.86.77,1.37,1.37,0,0,0,1.29.17,5.44,5.44,0,0,1,1.26-.43,2.18,2.18,0,0,1,1.24.34,4.23,4.23,0,0,1,1.6,1.68,15.49,15.49,0,0,0,.88,1.58,2.67,2.67,0,0,0,.85.77,1.41,1.41,0,0,0,1.29.18,5.09,5.09,0,0,1,1.27-.43A2.07,2.07,0,0,1,272.57,205.21Z\" />\r\n            <path class=\"cls-167\"\r\n                d=\"M219.12,310.72a.67.67,0,0,1,.33.66c0,.24-.21.35-.41.23a1.38,1.38,0,0,0-1.29-.18,4.29,4.29,0,0,1-1.27.43,2.17,2.17,0,0,1-1.27-.35,4.11,4.11,0,0,1-1.56-1.67,16.65,16.65,0,0,0-.88-1.58,2.71,2.71,0,0,0-.86-.76,1.38,1.38,0,0,0-1.29-.18,4.42,4.42,0,0,1-1.26.42,2.24,2.24,0,0,1-1.28-.34,4.22,4.22,0,0,1-1.55-1.67,15.49,15.49,0,0,0-.88-1.58,2.71,2.71,0,0,0-.86-.76,1.38,1.38,0,0,0-1.29-.18,4.13,4.13,0,0,1-1.26.42,2.13,2.13,0,0,1-1.27-.34,4.18,4.18,0,0,1-1.56-1.67,15.49,15.49,0,0,0-.88-1.58,2.77,2.77,0,0,0-.85-.76.68.68,0,0,1-.3-.64c0-.25.22-.34.41-.23a4.25,4.25,0,0,1,1.57,1.66,16.51,16.51,0,0,0,.87,1.58,2.83,2.83,0,0,0,.86.77,1.41,1.41,0,0,0,1.29.18,4.52,4.52,0,0,1,1.26-.43,2.07,2.07,0,0,1,1.23.33,4.26,4.26,0,0,1,1.61,1.68,14.57,14.57,0,0,0,.87,1.58,2.64,2.64,0,0,0,.85.76,1.35,1.35,0,0,0,1.29.18,5.53,5.53,0,0,1,1.27-.43,2.17,2.17,0,0,1,1.23.34,4.26,4.26,0,0,1,1.61,1.68,13,13,0,0,0,.88,1.58,2.47,2.47,0,0,0,.85.77,1.44,1.44,0,0,0,1.29.18,5,5,0,0,1,1.26-.43A2.16,2.16,0,0,1,219.12,310.72Z\" />\r\n            <path class=\"cls-169\"\r\n                d=\"M294.68,90.53a7.24,7.24,0,0,1,2,5.83c-.34,2.49-2.26,3.56-4.28,2.39L280,91.59a9,9,0,0,1-3.9-8.45c.43-3.15,2.88-4.56,5.42-3.08a5.6,5.6,0,0,1,.55.35c1.46-2.48,4.17-3.12,6.9-1.54C292.58,80.94,295.05,86.08,294.68,90.53Zm-2.05,6.77c1.38.79,2.68.06,2.91-1.62a4.88,4.88,0,0,0-1.71-4.24,1.14,1.14,0,0,1-.41-1c.53-3.83-1.55-8.34-4.62-10.11C286.41,79,284,79.62,282.9,82a.41.41,0,0,1-.63.18l-.13-.09a4.28,4.28,0,0,0-.74-.55c-1.93-1.11-3.76-.09-4.08,2.28a6.75,6.75,0,0,0,2.91,6.32l12.4,7.16\" />\r\n            <path class=\"cls-170\"\r\n                d=\"M56.23,47.36c-1.2-.7-2.34-.06-2.54,1.42a4.31,4.31,0,0,0,1.24,3.5l-.22,1.61A1.12,1.12,0,0,0,55.2,55c.33.19.63,0,.69-.39L56.11,53c1,.22,1.77-.44,1.94-1.66A4.2,4.2,0,0,0,56.23,47.36Zm-.53,3.9a1.92,1.92,0,0,1-.83-1.8c.09-.68.62-1,1.16-.65a1.93,1.93,0,0,1,.84,1.81A.75.75,0,0,1,55.7,51.26Z\" />\r\n            <path class=\"cls-170\"\r\n                d=\"M59.65,46.21l.26-1.88a5.25,5.25,0,0,0-2.26-4.9L57,39.07c-1.5-.87-2.92-.07-3.17,1.77l-.26,1.88c-1.41-.67-2.71.13-3,1.88l-.92,6.74A5.25,5.25,0,0,0,52,56.24l5.62,3.24c1.5.87,2.92.07,3.17-1.76L61.7,51A5.33,5.33,0,0,0,59.65,46.21ZM55,41.52c.14-1,1-1.48,1.79-1l.62.36a3,3,0,0,1,1.28,2.76l-.26,1.87-3.68-2.13Zm5.47,8.77L59.6,57c-.14,1-.94,1.49-1.79,1l-5.62-3.24A3,3,0,0,1,50.92,52l.92-6.74c.14-1,.94-1.48,1.78-1l.38.22,4.86,2.81.38.22A2.92,2.92,0,0,1,60.51,50.29Z\" />\r\n            <path class=\"cls-171\"\r\n                d=\"M215,39.43s0-.06,0-.09a4.11,4.11,0,0,0-1.81-3.07L201.4,29.44a1.53,1.53,0,0,0-2.34.74h0a3,3,0,0,0-.19.66l-1.37,10a4.17,4.17,0,0,0,1.81,3.91l11.82,6.83c1.2.69,2.33.06,2.53-1.41L215,40.17A3.65,3.65,0,0,0,215,39.43ZM201.2,30.9,213,37.72a1.68,1.68,0,0,1,.68.84l-7.44,2-5.85-9.67A.71.71,0,0,1,201.2,30.9Zm11.27,18.64c-.09.67-.6,1-1.14.65L199.5,43.36a1.87,1.87,0,0,1-.81-1.77L200,32.32l5.77,9.52a1,1,0,0,0,.32.33.55.55,0,0,0,.37.07l7.32-2Z\" />\r\n            <path class=\"cls-9\"\r\n                d=\"M338.56,167.86c4.78,2.76,8.14,8.86,7.5,13.59-.48,3.52-3,5.4-6.48,4.82-2.46,2.09-5.86.23-6.25,0a1.16,1.16,0,0,1-.53-.82.64.64,0,0,1,.28-.7,4,4,0,0,0,1.39-.93c-3.87-3.12-6.3-8.27-5.74-12.38C329.37,166.71,333.78,165.1,338.56,167.86Zm.67,16.79c3,.58,5.25-.94,5.65-3.88.53-3.93-2.39-9.07-6.51-11.46s-7.92-1.12-8.46,2.81c-.49,3.65,2,8.35,5.71,10.94a1.17,1.17,0,0,1,.41.61.91.91,0,0,1,0,.68,4.65,4.65,0,0,1-.91,1.11,3.87,3.87,0,0,0,3.81-.72.4.4,0,0,1,.35-.09\" />\r\n        </g>\r\n    </g>\r\n</g>\r\n</svg>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/about/about.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/about/about.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-numbers [number]=\"'02'\"></app-numbers>\r\n<app-social-icons></app-social-icons>\r\n<div class=\"about space\">\r\n    <div class=\"row\">\r\n        <div class=\"about_Text\">\r\n\r\n            <div class=\"col-md-6 col-xs-12\">\r\n                <app-title [title]=\"'About Me'\"></app-title>\r\n                <div class=\"text t1\">\r\n                    <h4>I Am A Front End Developer</h4>\r\n                    <p class=\"lorem\">\r\n                        Graduated from faculty of computer and information technology with\r\n                        <strong>GPA: 3.15/4</strong>.\r\n                        <span>\r\n                I have experience working, providing responsive front-end\r\n                development websites.\r\n              </span>\r\n                    </p>\r\n                    <p class=\"lorem\">\r\n                        I’ve always sought out opportunities and challenges that are meaningful to me.<span>\r\n                As a front-end developer, I enjoy using my obsessive attention to\r\n                detail, my unequivocal love for making things, and my mission-driven\r\n                work ethic to literally change the world. That's why I’m excited to\r\n                make a big impact at a high growth company.\r\n              </span>\r\n                    </p>\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-6 col-xs-12\">\r\n                <div class=\"about_img wow slideInLeft\" data-wow-duration=\"2s\" #about_img [attr.data-wow-offset]=\"about_imgHeight\">\r\n                    <app-svg-about></app-svg-about>\r\n                </div>\r\n            </div>\r\n            <div class=\" col-xs-12\">\r\n                <div class=\"text t2\">\r\n                    <hr />\r\n                    <h4>Experience</h4>\r\n                    <div class=\"experience\">\r\n                        <img src=\"assets/EXPERIENCE.png\" class=\"img-responsive\" alt=\"Image\">\r\n                    </div>\r\n                    <hr />\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-6 col-xs-12\">\r\n                <div class=\"text t3\">\r\n                    <h4>Education</h4>\r\n                    <h5><span>2014-2017</span></h5>\r\n                    <p class=\"lorem\">\r\n                        Faculty of computer and information technology (IT) <br /> Bachelor Degree in information technology.\r\n                    </p>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-6 col-xs-12\">\r\n                <div class=\"text t4\">\r\n                    <h4>Graduation project</h4>\r\n                    <h5><span>web app</span></h5>\r\n                    <p class=\"lorem\">\r\n                        E-Commerce Web application with 3D Clothes<br /> The prime objective of ﬁt clothes with mannequin web Application is helping customers to solve ﬁtting problem which is other sites represent ﬁxed 2D model with clothes and this give\r\n                        them bad impression. Our solution is helping customers based on their measurements and gives them the suitable clothes size as 3D object. Our web Application helps customers to see other sizes of clothes on the same mannequin showed\r\n                        based on their measurements. Our web Application gives the customers the ability to take a snapshot of 3D mannequin with clothes and share it on social media.\r\n                    </p>\r\n                </div>\r\n\r\n            </div>\r\n\r\n\r\n        </div>\r\n\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/about/svg-about/svg-about.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/about/svg-about/svg-about.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg\r\nxmlns=\"http://www.w3.org/2000/svg\"\r\nxmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 437.42 340.8\">\r\n<defs>\r\n    <style>.cls-1{isolation:isolate;}.cls-2{fill:#4a49ca;}.cls-10,.cls-13,.cls-25,.cls-26,.cls-27,.cls-29,.cls-3,.cls-32,.cls-33{fill:none;}.cls-3,.cls-33{stroke:#0b43a4;}.cls-10,.cls-13,.cls-27,.cls-3{stroke-linecap:round;stroke-linejoin:round;}.cls-4{fill:#000;}.cls-29,.cls-4{opacity:0.22;}.cls-5{mix-blend-mode:screen;}.cls-6{fill:#3b62c1;}.cls-7{opacity:0.5;}.cls-8{fill:#c7e1f9;}.cls-9{fill:#00ad9f;}.cls-10,.cls-13{stroke:#00ad9f;}.cls-10,.cls-14,.cls-34,.cls-36,.cls-40,.cls-41{mix-blend-mode:multiply;}.cls-11{fill:#0056ec;}.cls-12{fill:#52d2bc;}.cls-14,.cls-35,.cls-36{fill:#5275a0;}.cls-14,.cls-34{opacity:0.2;}.cls-15{fill:#739cff;}.cls-16{fill:#fff;}.cls-17{fill:#78b1ea;}.cls-18,.cls-19{fill:#d1ebff;}.cls-19{opacity:0.34;}.cls-20{fill:#00d5cf;}.cls-21{fill:url(#linear-gradient);}.cls-22{fill:#6397e3;}.cls-23{fill:#ff5f49;}.cls-24{fill:#dfe3e5;}.cls-25{stroke:#a8a8a8;}.cls-25,.cls-26,.cls-29,.cls-32,.cls-33{stroke-miterlimit:10;}.cls-26,.cls-27{stroke:#3b2f7c;}.cls-28{fill:url(#linear-gradient-2);}.cls-29{stroke:#d6451e;}.cls-30,.cls-31{opacity:0.24;}.cls-30{fill:url(#linear-gradient-3);}.cls-31{fill:url(#linear-gradient-4);}.cls-32{stroke:#f9d938;}.cls-33{stroke-dasharray:4;}.cls-36,.cls-40,.cls-41{opacity:0.22;}.cls-37{opacity:0.61;}.cls-38{fill:#efbc92;}.cls-39{fill:url(#linear-gradient-5);}.cls-40{fill:url(#linear-gradient-6);}.cls-41{fill:url(#linear-gradient-7);}.cls-42{fill:#3d76c9;}.cls-43{fill:#325ab2;}.cls-44{fill:#321c61;}.cls-45{fill:#f2b283;}.cls-46{fill:#5b1d1a;}</style>\r\n    <linearGradient id=\"linear-gradient\" x1=\"68.08\" y1=\"234.04\" x2=\"138.32\" y2=\"205.07\" gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0.01\" stop-color=\"#7ae397\"/>\r\n        <stop offset=\"1\" stop-color=\"#51ada1\"/>\r\n    </linearGradient>\r\n    <linearGradient id=\"linear-gradient-2\" x1=\"289.65\" y1=\"113.5\" x2=\"190.32\" y2=\"189.5\" gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0\" stop-color=\"#ff6e3a\"/>\r\n        <stop offset=\"0.98\" stop-color=\"#ffb846\"/>\r\n    </linearGradient>\r\n    <linearGradient id=\"linear-gradient-3\" x1=\"189.79\" y1=\"152.65\" x2=\"301.66\" y2=\"152.65\" gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0\" stop-color=\"#fff\"/>\r\n        <stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"/>\r\n    </linearGradient>\r\n    <linearGradient id=\"linear-gradient-4\" x1=\"245.72\" y1=\"132.97\" x2=\"245.72\" y2=\"185.59\" xlink:href=\"#linear-gradient-3\"/>\r\n    <linearGradient id=\"linear-gradient-5\" x1=\"348.07\" y1=\"222.33\" x2=\"321.32\" y2=\"303.58\" gradientUnits=\"userSpaceOnUse\">\r\n        <stop offset=\"0\" stop-color=\"#363990\"/>\r\n        <stop offset=\"0.65\" stop-color=\"#6d45a1\"/>\r\n    </linearGradient>\r\n    <linearGradient id=\"linear-gradient-6\" x1=\"296.8\" y1=\"273.99\" x2=\"327.69\" y2=\"273.99\" xlink:href=\"#linear-gradient-5\"/>\r\n    <linearGradient id=\"linear-gradient-7\" x1=\"314.79\" y1=\"260.03\" x2=\"358.95\" y2=\"260.03\" xlink:href=\"#linear-gradient-5\"/>\r\n</defs>\r\n<title>Asset 3</title>\r\n<g class=\"cls-1\">\r\n    <g id=\"Layer_2\" data-name=\"Layer 2\">\r\n        <g id=\"OBJECTS\">\r\n            <path class=\"cls-2\" d=\"M45.88,94.92c.93-.32,6-6.88,8.07-9.18a7.12,7.12,0,0,0,1.45-2.13,2.46,2.46,0,0,0-.3-2.45,3.07,3.07,0,0,0-3.53-1c-3.21.9-4,2.27-5.13,4.31C42.77,91.23,45.88,94.92,45.88,94.92Z\"/>\r\n            <path class=\"cls-2\" d=\"M80.12,106.09c3.15.48,6.5.9,9.44-.34a3.44,3.44,0,0,0,2.36-2.62,2.76,2.76,0,0,0-1.65-2.49,6.57,6.57,0,0,0-3.11-.47c-4,.13-9.08,2.1-12.49,4.18A33.67,33.67,0,0,0,80.12,106.09Z\"/>\r\n            <path class=\"cls-2\" d=\"M87,59.53c-1.47-.44-3.14-1.11-3.56-2.59a3.08,3.08,0,0,1,2.3-3.47,6.49,6.49,0,0,1,4.47.67c5.88,2.83,6.61,7.71,6.61,7.71S88.66,60,87,59.53Z\"/>\r\n            <path class=\"cls-2\" d=\"M87.22,45.86a6.33,6.33,0,0,1-3.45-1.24A2.05,2.05,0,0,1,83,43c.07-1,.41-2,2.84-2.22,7.69-.71,10.69,3.86,10.69,3.86S89.39,46.15,87.22,45.86Z\"/>\r\n            <path class=\"cls-2\" d=\"M111.76,51a12,12,0,0,0,6.71-6.19,7.56,7.56,0,0,0,.76-3.35,3.32,3.32,0,0,0-1.72-2.82,3.37,3.37,0,0,0-3.79,1.06,8,8,0,0,0-1.56,3.87C111.83,45.38,111.76,51,111.76,51Z\"/>\r\n            <path class=\"cls-3\" d=\"M89.22,172.7,62.63,159.85c-4.72-2.29-9.55-4.65-13.19-8.42-7.83-8.12-8.32-21.37-3.68-31.64S59.24,101.74,68.5,95.3,87.72,83.37,96.18,75.9c5.3-4.68,10.23-10.82,10.07-17.89A14.51,14.51,0,0,0,88.69,44.17\"/>\r\n            <path class=\"cls-3\" d=\"M114.83,42.76C114.55,49.27,108,55,106,61.14\"/>\r\n            <path class=\"cls-3\" d=\"M89.57,57.21c1.93,1.16,4.08,2,5.86,3.33,3.77,2.9,5.67,8.79,2.63,13.61\"/>\r\n            <path class=\"cls-3\" d=\"M60.6,101.3a42,42,0,0,0,24.77,2.1\"/>\r\n            <path class=\"cls-3\" d=\"M48.7,114.12a23,23,0,0,1,.7-26.21\"/>\r\n            <path class=\"cls-4\" d=\"M229.07,20c30.81-7.18,64.67-6.29,92.31,9.11C355,47.9,374.13,84.4,391.09,119c12,24.49,24.06,49.62,27.39,76.7s-3.56,56.93-24.19,74.78c-15.17,13.14-35.45,18.19-54.14,25.48-32.19,12.57-61.45,32.77-95,40.94A141.12,141.12,0,0,1,149.34,326c-27-13.56-48.73-35.37-71.58-55.12C56.87,252.79,34.33,235.8,19,212.79,3.89,190-3.25,161.61,1.41,134.66S23,82.72,47.32,70.18a107,107,0,0,1,35.5-10.85C94.39,57.88,198.23,27.21,229.07,20Z\"/>\r\n            <g class=\"cls-5\">\r\n                <path class=\"cls-6\" d=\"M283.37,82.9H290a1.58,1.58,0,0,0,1.58-1.58V65.9A1.58,1.58,0,0,0,290,64.32h-6.64c-.19-.81-.41-1.62-.65-2.41l5.76-3.32a1.58,1.58,0,0,0,.57-2.16l-7.7-13.36a1.58,1.58,0,0,0-2.16-.57l-5.77,3.32c-.57-.6-1.16-1.18-1.76-1.76h0L275,38.3a1.59,1.59,0,0,0-.58-2.16l-13.35-7.71a1.57,1.57,0,0,0-2.16.58l-3.33,5.76c-.79-.24-1.59-.46-2.41-.65h0V27.47a1.58,1.58,0,0,0-1.58-1.58H236.16a1.58,1.58,0,0,0-1.58,1.58v6.65h0c-.81.19-1.62.41-2.41.65L228.85,29a1.59,1.59,0,0,0-2.17-.58l-13.35,7.71a1.58,1.58,0,0,0-.57,2.16l3.32,5.76h0c-.6.58-1.19,1.16-1.76,1.76l-5.76-3.32a1.58,1.58,0,0,0-2.16.57l-7.71,13.36a1.58,1.58,0,0,0,.58,2.16L205,61.91c-.24.79-.45,1.6-.64,2.41h-6.65a1.58,1.58,0,0,0-1.58,1.58V81.32a1.58,1.58,0,0,0,1.58,1.58h6.65c.19.81.4,1.62.64,2.41h0l-5.76,3.33a1.57,1.57,0,0,0-.58,2.16l7.71,13.35a1.58,1.58,0,0,0,2.16.58l5.76-3.33c.57.6,1.16,1.19,1.76,1.76h0l-3.32,5.77a1.58,1.58,0,0,0,.57,2.16l13.35,7.71a1.6,1.6,0,0,0,2.17-.58l3.32-5.76c.79.24,1.6.46,2.41.64h0v6.65a1.58,1.58,0,0,0,1.58,1.58h15.42a1.58,1.58,0,0,0,1.58-1.58V113.1h0c.82-.18,1.62-.4,2.41-.64l3.33,5.76a1.59,1.59,0,0,0,2.16.58l13.35-7.71a1.6,1.6,0,0,0,.58-2.16l-3.33-5.77h0c.6-.57,1.19-1.16,1.76-1.76l5.77,3.33a1.59,1.59,0,0,0,2.16-.58l7.7-13.35a1.58,1.58,0,0,0-.57-2.16l-5.76-3.33h0C283,84.52,283.18,83.71,283.37,82.9ZM248.31,95.73A22.56,22.56,0,1,1,266,78,22.57,22.57,0,0,1,248.31,95.73Z\"/>\r\n            </g>\r\n            <g class=\"cls-7\" id=\"circle\">\r\n                <path class=\"cls-8\" d=\"M232.6,279.59h6.64a1.59,1.59,0,0,0,1.59-1.59V262.59a1.58,1.58,0,0,0-1.59-1.58H232.6c-.19-.82-.41-1.63-.65-2.42l5.76-3.32a1.59,1.59,0,0,0,.58-2.16l-7.71-13.35a1.58,1.58,0,0,0-2.16-.58l-5.77,3.33c-.57-.6-1.15-1.19-1.76-1.76h0l3.33-5.77a1.58,1.58,0,0,0-.58-2.16l-13.35-7.71a1.58,1.58,0,0,0-2.16.58l-3.33,5.76c-.79-.24-1.59-.46-2.41-.65h0v-6.65a1.58,1.58,0,0,0-1.58-1.58H185.4a1.59,1.59,0,0,0-1.59,1.58v6.65h0c-.81.19-1.62.41-2.41.65l-3.32-5.76a1.59,1.59,0,0,0-2.16-.58l-13.35,7.71A1.58,1.58,0,0,0,162,235l3.33,5.77h0c-.6.57-1.19,1.16-1.76,1.76l-5.76-3.33a1.57,1.57,0,0,0-2.16.58l-7.71,13.35a1.58,1.58,0,0,0,.58,2.16l5.76,3.32c-.24.79-.46,1.6-.65,2.42H147a1.58,1.58,0,0,0-1.58,1.58V278a1.59,1.59,0,0,0,1.58,1.59h6.65c.19.81.41,1.61.65,2.4h0l-5.76,3.32a1.58,1.58,0,0,0-.58,2.16l7.71,13.35a1.57,1.57,0,0,0,2.16.58l5.76-3.33c.57.61,1.16,1.19,1.76,1.77h0L162,305.61a1.58,1.58,0,0,0,.58,2.16l13.35,7.71a1.58,1.58,0,0,0,2.16-.58l3.32-5.76c.79.24,1.6.46,2.41.65h0v6.65A1.59,1.59,0,0,0,185.4,318h15.41a1.58,1.58,0,0,0,1.58-1.58v-6.65h0c.82-.19,1.62-.41,2.41-.65l3.33,5.76a1.58,1.58,0,0,0,2.16.58l13.35-7.71a1.58,1.58,0,0,0,.58-2.16l-3.33-5.76h0c.61-.58,1.19-1.16,1.76-1.77l5.77,3.33a1.58,1.58,0,0,0,2.16-.58l7.71-13.35a1.6,1.6,0,0,0-.58-2.16L232,282h0C232.19,281.2,232.41,280.4,232.6,279.59Zm-35.06,12.82a22.56,22.56,0,1,1,17.7-17.73A22.57,22.57,0,0,1,197.54,292.41Z\"/>\r\n            </g>\r\n            <g class=\"cls-5\">\r\n                <path class=\"cls-6\" d=\"M321.62,47.37h2.29a.54.54,0,0,0,.55-.55V41.5a.55.55,0,0,0-.55-.55h-2.29c-.07-.28-.14-.56-.23-.83l2-1.15a.55.55,0,0,0,.2-.75l-2.66-4.61a.55.55,0,0,0-.75-.2l-2,1.15c-.19-.21-.4-.41-.6-.61h0l1.15-2a.55.55,0,0,0-.2-.75l-4.61-2.66a.54.54,0,0,0-.74.2l-1.15,2c-.28-.08-.55-.16-.84-.22h0v-2.3a.55.55,0,0,0-.54-.55h-5.33a.55.55,0,0,0-.54.55v2.3h0c-.29.06-.56.14-.84.22l-1.15-2a.54.54,0,0,0-.74-.2l-4.61,2.66a.54.54,0,0,0-.2.75l1.15,2h0c-.2.2-.41.4-.6.61l-2-1.15a.55.55,0,0,0-.75.2l-2.66,4.61a.54.54,0,0,0,.2.75l2,1.15c-.08.27-.15.55-.22.83H292a.55.55,0,0,0-.55.55v5.32a.54.54,0,0,0,.55.55h2.29c.07.28.14.56.23.83h0l-2,1.15a.54.54,0,0,0-.2.75L295,54.71a.55.55,0,0,0,.75.2l2-1.15c.19.21.4.41.6.61h0l-1.15,2a.54.54,0,0,0,.2.75L302,59.77a.54.54,0,0,0,.74-.2l1.15-2c.28.08.55.16.84.22h0v2.3a.55.55,0,0,0,.54.55h5.33a.55.55,0,0,0,.54-.55V57.8h0c.29-.06.56-.14.84-.22l1.15,2a.54.54,0,0,0,.74.2l4.61-2.66a.54.54,0,0,0,.2-.75l-1.15-2h0c.2-.2.41-.4.6-.61l2,1.15a.55.55,0,0,0,.75-.2l2.66-4.61a.55.55,0,0,0-.2-.75l-2-1.15h0C321.48,47.93,321.55,47.65,321.62,47.37ZM309.51,51.8a7.8,7.8,0,1,1,6.11-6.12A7.8,7.8,0,0,1,309.51,51.8Z\"/>\r\n            </g>\r\n            <path class=\"cls-9\" d=\"M55.28,206.87c-5.49-4.85-11-9.77-15.1-15.87-3.53-5.31-5.81-11.34-8.89-16.93-2-3.61-4.35-7.1-5.5-11.06s-.88-8.65,1.94-11.67,8-3.63,12-2,7,5,9.37,8.6a41.13,41.13,0,0,1,6,15.92c.78,5.13.58,10.36,1.37,15.48a51.79,51.79,0,0,0,4.37,13.72c1.83,4,6.47,11,7.66,15.1C65.21,219.79,57.62,208.94,55.28,206.87Z\"/>\r\n            <path class=\"cls-10\" d=\"M36.09,156.58c5.22,2.28,7.29,8.5,8.38,14.1,1.24,6.36,1,13.25,3.88,19,5.5,10.9,12.65,23.32,18,27\"/>\r\n            <path class=\"cls-11\" d=\"M28.27,192c-4.55-1.8-10.64-2.54-13.56,1.4-2.44,3.29-1.18,8,.51,11.69,1.43,3.15,3.24,6.36,6.25,8.07a17.82,17.82,0,0,0,6.81,1.8A162.57,162.57,0,0,0,48,216.05a41.35,41.35,0,0,1,23.23,7.87C63.12,208.84,43.6,198,28.27,192Z\"/>\r\n            <path class=\"cls-3\" d=\"M20.28,201.76c5.8.24,11.65.65,17.21,2.3s27.58,11.72,31,16\"/>\r\n            <path class=\"cls-12\" d=\"M370.9,223.6c5.46-9,2.67-20.57,4.57-30.93a34.24,34.24,0,0,1,12.24-20.38c4-3.16,9.56-5.42,14.06-3,3.85,2,4.34-3.83,4.46-6.25.34-6.87-.75-13.09,5.28-17.82,4.91-3.85,12.92-6.5,19.21-5.88a7.76,7.76,0,0,1,5,2.28c2,2.15,2.1,5.48,1.11,8.21-2.84,7.86-11.13,13.3-15.55,20.28-2,3.19-3.77,7-2.63,10.86.58,2,2.58,3.39,2.78,5.36.31,3-3.08,5.7-5.46,6.84a28.92,28.92,0,0,1-9.72,2.69c-6.47.6-8.42,3.08-7.13,9.62,1,4.89-.24,8-3.79,11.47a76,76,0,0,1-11.7,9.22c-3.4,2.18-7,4.1-10,6.79s-5.45,6.31-5.64,10.34a16.38,16.38,0,0,1-2.1-10.63C366.33,229.05,369,226.68,370.9,223.6Z\"/>\r\n            <path class=\"cls-13\" d=\"M368.43,238.05a26,26,0,0,1,2.1-7.2c1.23-2.39,2.75-4.61,4.14-6.92,3.79-6.33,6-13.56,8-20.61,1.89-6.62,6.8-13.45,11.45-18.44,3.61-3.87,8-6.93,11.66-10.74a40.08,40.08,0,0,0,6.58-9.14,32.22,32.22,0,0,1,3-5.3c1.52-1.89,3.6-3.24,5.4-4.86a22.94,22.94,0,0,0,5.72-7.89\"/>\r\n            <path class=\"cls-14\" d=\"M433.38,219.91a44,44,0,0,1-4.73,2.31,56.79,56.79,0,0,1-19.77,4.38c-9.88.37-20-1.81-29.52,1a29.09,29.09,0,0,0-11.65,6.75c-.33.16-.66.34-1,.53-.79-6.69,15.89-15.41,21-17.68A60.43,60.43,0,0,1,417,212.09c4.38.35,8.87,1.21,12.48,3.7A13.36,13.36,0,0,1,433.38,219.91Z\"/>\r\n            <path class=\"cls-15\" d=\"M417,216.08c4.38.35,8.87,1.21,12.48,3.7s6.16,6.94,5.32,11.25c-1,5-6.17,8.29-11.25,8.91s-10.15-.78-15.16-1.81a107.93,107.93,0,0,0-33.78-1.55,19.56,19.56,0,0,0-7.92,2.31c-.79-6.7,15.9-15.41,21-17.68A60.49,60.49,0,0,1,417,216.08Z\"/>\r\n            <path class=\"cls-3\" d=\"M371.06,234.67c8.28-7.28,29.55-12.22,44.58-10.63,4.53.48,9.1,1.83,12.59,4.77\"/>\r\n            <path class=\"cls-2\" d=\"M411.52,256.11a1.66,1.66,0,0,1,1.49.74,1.22,1.22,0,0,1-.12,1.31c-2.37,2.66-7.1.75-7.1.75S407.17,256.11,411.52,256.11Z\"/>\r\n            <path class=\"cls-2\" d=\"M402.49,253.09c-3-3.18-5,4-3.72,7.3C398.77,260.39,405.05,255.84,402.49,253.09Z\"/>\r\n            <path class=\"cls-2\" d=\"M408.34,265a2,2,0,0,1,2.33.61,1.86,1.86,0,0,1-.05,1.84,4.16,4.16,0,0,1-1.76,1.51,6.44,6.44,0,0,1-6.18-.63A46.75,46.75,0,0,1,408.34,265Z\"/>\r\n            <path class=\"cls-2\" d=\"M390.16,290.37a1.67,1.67,0,0,1,1.55.84,1.46,1.46,0,0,1,0,1.14,3.4,3.4,0,0,1-.66,1,3.62,3.62,0,0,1-2.17,1.11,7,7,0,0,1-4.16-1S388.61,290.34,390.16,290.37Z\"/>\r\n            <path class=\"cls-2\" d=\"M386.4,279.3a4.82,4.82,0,0,0,2.3-4.48,2.64,2.64,0,0,0-.43-1.26,2.45,2.45,0,0,0-2.75-.66,6.26,6.26,0,0,0-2.39,1.82c-1.24,1.36-2.18,3.77-3.16,5.32A8.58,8.58,0,0,0,386.4,279.3Z\"/>\r\n            <path class=\"cls-3\" d=\"M410,258.08c-3.77-.06-7.33,2.06-9.8,4.91s-4,6.38-5.43,9.88A56.61,56.61,0,0,1,390,283.13c-2,3.08-5,5.82-8.67,6.24-4.45.5-8.58-2.57-11.24-6.17s-4.37-7.85-7.11-11.39a8.79,8.79,0,0,0-4.87-3.57c-2.69-.54-5.3,1-7.6,2.51\"/>\r\n            <path class=\"cls-3\" d=\"M408.6,266.75a21.62,21.62,0,0,1-11.79,1.41\"/>\r\n            <path class=\"cls-3\" d=\"M401.05,255.47a17.38,17.38,0,0,0-2.07,3.9,6.68,6.68,0,0,0,.43,4.61\"/>\r\n            <path class=\"cls-3\" d=\"M389.19,292.62a7.37,7.37,0,0,1-5.41.58,8.72,8.72,0,0,1-4.55-3.79\"/>\r\n            <path class=\"cls-3\" d=\"M385.5,276.71a73.43,73.43,0,0,0-8.68,5.55c-1.33,1-3.32,3.18-3.39,4.41\"/>\r\n            <path class=\"cls-14\" d=\"M365.6,286.6l-305.73.63a7.38,7.38,0,0,1-7.4-7.37L52.05,77.32a7.4,7.4,0,0,1,7.37-7.4l305.73-.63a7.38,7.38,0,0,1,7.4,7.37L373,279.2A7.39,7.39,0,0,1,365.6,286.6Z\"/>\r\n            <path class=\"cls-16\" d=\"M379.59,272.54v0a7.39,7.39,0,0,1-7.37,7.38l-195.63.4-110.09.23a7.39,7.39,0,0,1-7.41-7.37L58.68,70.66a7.39,7.39,0,0,1,7.37-7.4l305.72-.63A7.39,7.39,0,0,1,379.18,70l0,7.89Z\"/>\r\n            <path class=\"cls-17\" d=\"M371.28,64.39,66.86,65a8,8,0,0,0-8,8v7l320.5-.66v-7A8,8,0,0,0,371.28,64.39Z\"/>\r\n            <rect class=\"cls-16\" x=\"67.18\" y=\"260.89\" width=\"41.11\" height=\"6.01\" rx=\"2.62\" transform=\"matrix(1, 0, 0, 1, -0.54, 0.18)\"/>\r\n            <rect class=\"cls-18\" x=\"63.6\" y=\"192.37\" width=\"99.53\" height=\"29.54\" rx=\"3.11\"/>\r\n            <rect class=\"cls-19\" x=\"69.47\" y=\"184.5\" width=\"99.53\" height=\"29.54\" rx=\"3.11\"/>\r\n            <path class=\"cls-20\" d=\"M376.9,131.23h0a22.74,22.74,0,0,1-22.74-22.74h0A22.74,22.74,0,0,1,376.9,85.75h0a22.74,22.74,0,0,1,22.74,22.74h0A22.74,22.74,0,0,1,376.9,131.23Z\"/>\r\n            <path class=\"cls-16\" d=\"M76.42,72.38a2.59,2.59,0,1,1-2.6-2.59A2.59,2.59,0,0,1,76.42,72.38Z\"/>\r\n            <path class=\"cls-16\" d=\"M87.38,72.36a2.59,2.59,0,1,1-2.59-2.59A2.58,2.58,0,0,1,87.38,72.36Z\"/>\r\n            <path class=\"cls-16\" d=\"M98.35,72.33a2.59,2.59,0,1,1-2.6-2.58A2.6,2.6,0,0,1,98.35,72.33Z\"/>\r\n            <rect class=\"cls-14\" x=\"38.85\" y=\"211.18\" width=\"119.42\" height=\"28.05\" rx=\"3.11\"/>\r\n            <rect class=\"cls-21\" x=\"36.85\" y=\"208.26\" width=\"119.42\" height=\"28.05\" rx=\"3.11\"/>\r\n            <rect class=\"cls-19\" x=\"227.54\" y=\"171.19\" width=\"119.42\" height=\"65.55\" rx=\"3.11\"/>\r\n            <rect class=\"cls-12\" x=\"237.77\" y=\"171.03\" width=\"119.42\" height=\"72.21\" rx=\"3.11\"/>\r\n            <rect class=\"cls-22\" x=\"71.23\" y=\"117.35\" width=\"31.63\" height=\"5.06\" rx=\"2.2\" transform=\"translate(-0.25 0.18) rotate(-0.12)\"/>\r\n            <rect class=\"cls-23\" x=\"71.23\" y=\"162.5\" width=\"19.95\" height=\"5.06\" rx=\"2.2\" transform=\"translate(-0.34 0.17) rotate(-0.12)\"/>\r\n            <rect class=\"cls-22\" x=\"71.23\" y=\"126.21\" width=\"66.66\" height=\"5.06\" rx=\"2.2\" transform=\"translate(-0.27 0.22) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"71.23\" y=\"142.24\" width=\"84.99\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.3 0.24) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"71.23\" y=\"138.19\" width=\"84.99\" height=\"1.84\" rx=\"0.8\" transform=\"matrix(1, 0, 0, 1, -0.29, 0.24)\"/>\r\n            <rect class=\"cls-24\" x=\"71.24\" y=\"146.28\" width=\"84.99\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.3 0.24) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"71.24\" y=\"150.33\" width=\"84.99\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.31 0.24) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"71.24\" y=\"154.37\" width=\"65.57\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.32 0.22) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"179.95\" y=\"258.69\" width=\"55.14\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.54 0.43) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"179.94\" y=\"254.64\" width=\"55.14\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.53 0.43) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"179.95\" y=\"262.74\" width=\"55.14\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.54 0.43) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"179.95\" y=\"266.78\" width=\"55.14\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.55 0.43) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"179.96\" y=\"270.82\" width=\"42.54\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.56 0.42) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"241.53\" y=\"258.72\" width=\"55.14\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.54 0.56) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"241.53\" y=\"254.67\" width=\"55.14\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.53 0.56) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"241.54\" y=\"262.76\" width=\"55.14\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.54 0.56) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"241.54\" y=\"266.81\" width=\"55.14\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.55 0.56) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"241.55\" y=\"270.85\" width=\"42.54\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.56 0.54) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"303.12\" y=\"258.72\" width=\"55.14\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.54 0.68) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"303.12\" y=\"254.67\" width=\"55.14\" height=\"1.84\" rx=\"0.8\" transform=\"matrix(1, 0, 0, 1, -0.53, 0.68)\"/>\r\n            <rect class=\"cls-24\" x=\"303.13\" y=\"262.76\" width=\"55.14\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.54 0.68) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"303.13\" y=\"266.81\" width=\"55.14\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.55 0.68) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"303.14\" y=\"270.85\" width=\"42.54\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.56 0.67) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"71.24\" y=\"269.61\" width=\"18.76\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.56 0.17) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"97.09\" y=\"269.61\" width=\"18.76\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.56 0.22) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"122.94\" y=\"269.61\" width=\"18.76\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.56 0.27) rotate(-0.12)\"/>\r\n            <rect class=\"cls-24\" x=\"148.79\" y=\"269.61\" width=\"18.76\" height=\"1.84\" rx=\"0.8\" transform=\"translate(-0.56 0.33) rotate(-0.12)\"/>\r\n            <path class=\"cls-16\" d=\"M142.08,227.07H51a4.78,4.78,0,0,1-4.78-4.78h0A4.79,4.79,0,0,1,51,217.5h91a4.79,4.79,0,0,1,4.79,4.79h0A4.78,4.78,0,0,1,142.08,227.07Z\"/>\r\n            <circle class=\"cls-16\" cx=\"136.25\" cy=\"222.29\" r=\"10.61\" transform=\"translate(-111.48 303.56) rotate(-76.66)\"/>\r\n            <line class=\"cls-25\" x1=\"51.85\" y1=\"220.09\" x2=\"51.85\" y2=\"224.52\"/>\r\n            <path class=\"cls-26\" d=\"M139.05,221.76a3.45,3.45,0,1,1-3.45-3.44A3.46,3.46,0,0,1,139.05,221.76Z\"/>\r\n            <line class=\"cls-27\" x1=\"140.35\" y1=\"226.26\" x2=\"138.01\" y2=\"224.22\"/>\r\n            <g id=\"bord\">\r\n                <path class=\"cls-14\" d=\"M315.87,195.77h0a3.12,3.12,0,0,1-3,3.21l-79.8.18-44.91.1a3.13,3.13,0,0,1-3-3.21L185,107.79a3.12,3.12,0,0,1,3-3.22l124.71-.28a3.13,3.13,0,0,1,3,3.21v3.44Z\"/>\r\n                <path class=\"cls-28\" d=\"M311.69,190.7h0a3.13,3.13,0,0,1-3,3.22l-79.81.17-44.9.1a3.13,3.13,0,0,1-3-3.21l-.16-88.27a3.11,3.11,0,0,1,3-3.22l124.71-.28a3.13,3.13,0,0,1,3,3.21v3.44Z\"/>\r\n                <polyline class=\"cls-29\" points=\"302.69 186.24 189.79 186.24 189.79 109.75\"/>\r\n                <polygon class=\"cls-30\" points=\"189.79 164.43 218.47 134.47 225.84 146.33 236.73 119.13 244.41 141.78 253.72 126.98 266.69 154.34 290.81 126.8 301.66 149.69 301.66 186.17 189.79 186.17 189.79 164.43\"/>\r\n                <polygon class=\"cls-31\" points=\"189.79 154.95 221.57 168.95 245.2 120.91 258.11 154.95 279.3 132.78 301.66 156.97 301.66 186.17 189.79 186.17 189.79 154.95\"/>\r\n                <line class=\"cls-32\" x1=\"284.54\" y1=\"108.49\" x2=\"300.79\" y2=\"108.49\"/>\r\n                <line class=\"cls-32\" x1=\"284.54\" y1=\"111.17\" x2=\"300.79\" y2=\"111.17\"/>\r\n                <line class=\"cls-32\" x1=\"284.54\" y1=\"113.85\" x2=\"300.79\" y2=\"113.85\"/>\r\n                <line class=\"cls-32\" x1=\"274\" y1=\"108.49\" x2=\"281.37\" y2=\"108.49\"/>\r\n                <line class=\"cls-32\" x1=\"274\" y1=\"111.17\" x2=\"281.37\" y2=\"111.17\"/>\r\n                <line class=\"cls-32\" x1=\"274\" y1=\"113.85\" x2=\"281.37\" y2=\"113.85\"/>\r\n                <path class=\"cls-29\" d=\"M196.49,142.21c4.45,2.22,7.22,6.77,9.31,11.28s3.83,9.32,7.16,13,8.85,6,13.36,3.93c4-1.84,5.9-6.34,7.33-10.49A218.32,218.32,0,0,0,243,122.74a16.82,16.82,0,0,1,1.48-5.47,5.49,5.49,0,0,1,4.46-3.1c2.23,0,4,1.73,5.45,3.46,9.45,11.54,13.56,26.51,21.59,39.09,1.57,2.46,3.64,5.05,6.55,5.36,2.32.24,4.51-1.06,6.41-2.41A63.44,63.44,0,0,0,303.6,145\"/>\r\n                <path class=\"cls-16\" d=\"M197.36,141.83a.87.87,0,1,1-.87-.87A.87.87,0,0,1,197.36,141.83Z\"/>\r\n                <path class=\"cls-16\" d=\"M211,162.63a.87.87,0,1,1-.87-.87A.87.87,0,0,1,211,162.63Z\"/>\r\n                <circle class=\"cls-16\" cx=\"241.13\" cy=\"132.5\" r=\"0.87\"/>\r\n                <path class=\"cls-16\" d=\"M239.69,142.24a.87.87,0,1,1-.87-.87A.87.87,0,0,1,239.69,142.24Z\"/>\r\n                <path class=\"cls-16\" d=\"M304.47,145.24a.87.87,0,1,1-.87-.87A.86.86,0,0,1,304.47,145.24Z\"/>\r\n                <path class=\"cls-16\" d=\"M298.35,152.24a.87.87,0,1,1-.87-.87A.87.87,0,0,1,298.35,152.24Z\"/>\r\n                <path class=\"cls-16\" d=\"M237.06,151.78a.87.87,0,1,1-.87-.87A.87.87,0,0,1,237.06,151.78Z\"/>\r\n                <path class=\"cls-16\" d=\"M269.89,144a.87.87,0,1,1-.87-.87A.87.87,0,0,1,269.89,144Z\"/>\r\n                <line class=\"cls-33\" x1=\"247.24\" y1=\"99.22\" x2=\"247.24\"/>\r\n            </g>\r\n            <circle class=\"cls-18\" cx=\"200.95\" cy=\"223.72\" r=\"18.15\"/>\r\n            <circle class=\"cls-16\" cx=\"200.95\" cy=\"223.72\" r=\"7.82\"/>\r\n            <polygon class=\"cls-16\" points=\"207.52 203.9 200.36 223.72 223.36 218.31 207.52 203.9\"/>\r\n          \r\n            <g id=\"man\">\r\n                    <path class=\"cls-38\" d=\"M326.49,149.63a8,8,0,0,0,1.27,5.08,6.87,6.87,0,0,0,4.83,2.6,8.52,8.52,0,0,0,7.64-13.68c-1.88-2.42-6-4.19-9.07-3.16S326.62,146.76,326.49,149.63Z\"/>\r\n                    <path class=\"cls-38\" d=\"M288.82,151a13,13,0,0,0-5.92-4.37,3.22,3.22,0,0,0-1.76-.16,2.67,2.67,0,0,0-1.43,1.07,5.82,5.82,0,0,0-.51,5.52,10.48,10.48,0,0,0,3.68,4.38,57.53,57.53,0,0,0,5,3,4.28,4.28,0,0,0,1.88.73,3.63,3.63,0,0,0,1.81-.54,3.79,3.79,0,0,0,1.58-1.38,1.57,1.57,0,0,0-.24-1.89,8.24,8.24,0,0,1-1.24-2A30.08,30.08,0,0,0,288.82,151Z\"/>\r\n                    <path class=\"cls-39\" d=\"M358,313.34a1.35,1.35,0,0,1-1,.53c-1.52.05-3.15-2.15-3.85-3.26a24.45,24.45,0,0,1-2.19-4.93l-4.11-11.42c-5.1-14.2-10.59-28.32-14.92-42.78q-2.17-7.39-4.21-14.83c-4.35,4.26-7.62,10.13-10.45,15.47-9,16.88-10.46,36.07-14.86,54.42-.34,1.39-.74,6.17-2,7.08-4.9,3.53-4.19-8.86-4.24-10.81A238.41,238.41,0,0,1,298.42,264a248.5,248.5,0,0,1,6.34-30.8c2.44-8.87,5.19-18,9.57-26.09,2-3.76,16.25,4.56,20.33,6,2.88,1,7,1.49,9,4s2.09,7.65,2.72,10.91q2.74,14.22,5.19,28.48c2.64,15.34,3.42,30.88,6.51,46.17a25.87,25.87,0,0,1,.79,7.2C358.83,310.78,358.71,312.48,358,313.34Z\"/>\r\n                    <path class=\"cls-40\" d=\"M326.85,233.73c.36,1.31.48,1.61.84,2.92-4.26,3.94-8.42,11.63-10.46,15.47-9,16.88-10.45,36.07-14.86,54.42-.33,1.39-.73,6.17-2,7.08-1.93,1.39-3,.31-3.57-1.63a52.87,52.87,0,0,0,1.09-5.45c4.41-18.35,5.88-37.54,14.86-54.42C315.59,246.78,322.51,238,326.85,233.73Z\"/>\r\n                    <path class=\"cls-41\" d=\"M358.9,309.85a7.15,7.15,0,0,1-.9,3.49,1.38,1.38,0,0,1-1,.53c-1,0-2.06-.92-2.86-1.88a13.11,13.11,0,0,0,.31-2.14,25.4,25.4,0,0,0-.79-7.19c-3.09-15.29-3.86-30.83-6.51-46.17q-2.43-14.27-5.19-28.48c-.63-3.27-.56-8.31-2.72-10.92s-6.16-2.94-9-4-10.26-5.15-15.39-6.53c3.16-2.29,16,5.17,19.87,6.53,2.87,1,7,1.49,9,4s2.09,7.65,2.72,10.92q2.76,14.2,5.2,28.48c2.64,15.34,3.41,30.88,6.5,46.17A25.4,25.4,0,0,1,358.9,309.85Z\"/>\r\n                    <path class=\"cls-42\" d=\"M349.8,190.41c0,2-.13,3.89-.28,5.84s-.34,4.11-.59,6.15a119.6,119.6,0,0,1-3.77,18.36L325.77,216l-7.7-1.89-.47-.11-6.23-1.57s4.7-21.77,6.53-30.46c1.1-5.24,2.44-10.62,5.72-14.86,2.86-3.69,10.06-8.84,15.13-7.17,3.76,1.24,6.65,6.66,8.3,11,.42,1.08.75,2.09,1,2.94.34,1.15.62,2.31.85,3.49A61.48,61.48,0,0,1,349.8,190.41Z\"/>\r\n                    <g class=\"cls-37\">\r\n                        <path class=\"cls-43\" d=\"M357.8,182.89a4.87,4.87,0,0,1,.55,3.47,5,5,0,0,1-2.28,2.32,93.58,93.58,0,0,1-28.59,12,3,3,0,0,1,.06-3.45,8.49,8.49,0,0,1,2.84-2.33,169.28,169.28,0,0,1,17.28-9c-2.83-5.22-3.91-9.82-6.74-15-.8-1.48,4.6-5.15,6.71-3A51,51,0,0,1,357.8,182.89Z\"/>\r\n                        <path class=\"cls-43\" d=\"M349.8,190.41c0,2-.13,3.89-.28,5.84a93,93,0,0,1-21.6,8,3,3,0,0,1,.05-3.45,8.49,8.49,0,0,1,2.84-2.33,170.33,170.33,0,0,1,17.28-9c3.47-2.77-.52-9.18-3.35-14.4-.69-1.28-.12-4.84,2.31-4.22.42,1.08.75,2.09,1,2.94A54,54,0,0,1,349.8,190.41Z\"/>\r\n                        <path class=\"cls-43\" d=\"M321.51,197.46c-1.12.37-2.25.63-2.7,1.69a6.85,6.85,0,0,0,.2,4.22,4.37,4.37,0,0,0,2.53,2.7c1.34.43,2.62-.5,3.73-1.24a51.39,51.39,0,0,0,4.25-3.43,4,4,0,0,0,1.27-1.42,3.45,3.45,0,0,0,.11-1.78,3.54,3.54,0,0,0-.71-1.86,1.48,1.48,0,0,0-1.75-.4,7.76,7.76,0,0,1-2.16.45A27.66,27.66,0,0,0,321.51,197.46Z\"/>\r\n                        <path class=\"cls-43\" d=\"M321.3,198.79c-1.21.44-2-.62-2.57.56a9.15,9.15,0,0,0-.25,6.17,4.63,4.63,0,0,0,2.68,3c1.43.46,2.83-.63,4-1.48a58.19,58.19,0,0,0,4.67-4,4.73,4.73,0,0,0,1.39-1.63,5.15,5.15,0,0,0-.56-4.09,1.5,1.5,0,0,0-1.88-.42,8.48,8.48,0,0,1-2.35.55A30.14,30.14,0,0,0,321.3,198.79Z\"/>\r\n                    </g>\r\n                    <path class=\"cls-42\" d=\"M312.34,166.47a4.14,4.14,0,0,1-1.27.15,3.11,3.11,0,0,1-1.38-.47l-11.53-6.79-2.82-1.66c-.55-.32-1.65-1.29-2.35-1.2a.49.49,0,0,0-.3.19l-3.63,3.93a.57.57,0,0,0,.05.83q5.79,4.89,11.73,9.58c3.14,2.49,6.83,6.74,11.12,6.81,4.08.07,7.83-2.39,11.29-4.23s7.07-3,9.74-5.87c1.25-1.35,3.73-5.16,2.29-7.05-.9-1.18-2.94-.86-4.19-.66a27,27,0,0,0-5.23,1.37,74.88,74.88,0,0,0-7.56,2.83l-3.78,1.42C313.8,165.92,313.09,166.27,312.34,166.47Z\"/>\r\n                    <path class=\"cls-38\" d=\"M338.79,163a2.07,2.07,0,0,0-.65.32,7.65,7.65,0,0,1-.88.34,6.37,6.37,0,0,1-1.8.26c-.9,0-3.16-.28-3.15-1.15,0-.46,0-.92,0-1.38v-4.89l6.48-1.75v4C338.79,160.15,338.73,161.58,338.79,163Z\"/>\r\n                    <path class=\"cls-42\" d=\"M359.55,183.51a4.89,4.89,0,0,1,.55,3.48,5,5,0,0,1-2.28,2.31,93.85,93.85,0,0,1-28.59,12,3,3,0,0,1,.06-3.45,8.37,8.37,0,0,1,2.84-2.33,167.3,167.3,0,0,1,17.28-9l-8.49-15.67a19.39,19.39,0,0,1-2-4.61c-.78-3.25.43-5.9,3.61-3.63a51.09,51.09,0,0,1,17,20.83Z\"/>\r\n                    <path class=\"cls-38\" d=\"M321.88,198.42c-1.11.37-2.24.63-2.7,1.69a6.93,6.93,0,0,0,.2,4.22,4.41,4.41,0,0,0,2.54,2.7c1.34.43,2.61-.51,3.72-1.24a51.94,51.94,0,0,0,4.26-3.43,4.07,4.07,0,0,0,1.26-1.42,3.26,3.26,0,0,0,.11-1.78,3.47,3.47,0,0,0-.7-1.86,1.49,1.49,0,0,0-1.75-.4,7.83,7.83,0,0,1-2.17.45A27.87,27.87,0,0,0,321.88,198.42Z\"/>\r\n                    <path class=\"cls-44\" d=\"M298.91,308.07a4.34,4.34,0,0,0,3.77-1.76l.15,6.19a4.76,4.76,0,0,1-.19,1.77,2.94,2.94,0,0,1-2.51,1.6c-4.81.81-9.69.34-14.53-.13a1.37,1.37,0,0,1-.73-.21,1.63,1.63,0,0,1-.34-1.83,3.35,3.35,0,0,1,1.23-1.4c2.17-1.57,4.63-2.42,6.88-3.79.87-.54,1.93-1.78,2.93-1.84.58,0,1,.42,1.5.73A4.16,4.16,0,0,0,298.91,308.07Z\"/>\r\n                    <path class=\"cls-44\" d=\"M355,308.07a4.34,4.34,0,0,0,3.77-1.76l.15,6.19a4.76,4.76,0,0,1-.19,1.77,3,3,0,0,1-2.52,1.6c-4.8.81-9.68.34-14.52-.13a1.43,1.43,0,0,1-.74-.21,1.62,1.62,0,0,1-.33-1.83,3.35,3.35,0,0,1,1.23-1.4c2.17-1.57,4.62-2.42,6.88-3.79.87-.54,1.93-1.78,2.93-1.84.58,0,1,.42,1.5.73A4.16,4.16,0,0,0,355,308.07Z\"/>\r\n                    <path class=\"cls-45\" d=\"M340.92,153a8.71,8.71,0,0,1-8.33,4.32,7.06,7.06,0,0,1-4.47-2.16,7.46,7.46,0,0,0,2.56.74,8.52,8.52,0,0,0,7.63-13.68,6.32,6.32,0,0,0-.7-.77A8.39,8.39,0,0,1,340.92,153Z\"/>\r\n                    <path class=\"cls-46\" d=\"M325.72,137.84a5.21,5.21,0,0,0,3.11,5.27,6.81,6.81,0,0,0,6.29-.62,3.41,3.41,0,0,0,3.68,4,4.14,4.14,0,0,0,1,5.55,1.76,1.76,0,0,0-.36,2.79,2.33,2.33,0,0,0,3-.15,3.54,3.54,0,0,0,.95-3.07,5.73,5.73,0,0,0,.91-11.3,5.58,5.58,0,0,0-9-5.4c.15-.12-1.34-.89-1.45-1a5.23,5.23,0,0,0-2-.55,6.71,6.71,0,0,0-3.7,1A5.39,5.39,0,0,0,326,137,4,4,0,0,0,325.72,137.84Z\"/>\r\n                    <ellipse class=\"cls-38\" cx=\"339.3\" cy=\"152.22\" rx=\"1.6\" ry=\"1.85\"/>\r\n                    <path class=\"cls-43\" d=\"M340,177.83c-.24,1.16-.25,2.37-.44,3.54a5.47,5.47,0,0,1-1.47,3.19,2.74,2.74,0,0,1-3.28.45,3.62,3.62,0,0,1-1.23-3,45.59,45.59,0,0,1,.82-5s2.19.6,2.75.72A8.8,8.8,0,0,0,340,177.83Z\"/>\r\n\r\n                </g>\r\n            <path class=\"cls-9\" d=\"M388.21,111.15h1.91a.45.45,0,0,0,.45-.45v-4.42a.45.45,0,0,0-.45-.45h-1.91c0-.23-.11-.47-.18-.69l1.65-1a.44.44,0,0,0,.16-.61l-2.2-3.83a.46.46,0,0,0-.62-.16l-1.65,1-.51-.5h0l.95-1.65a.44.44,0,0,0-.16-.61l-3.83-2.21a.44.44,0,0,0-.61.16l-1,1.65a7,7,0,0,0-.69-.18h0V95.27a.45.45,0,0,0-.45-.45h-4.42a.45.45,0,0,0-.45.45v1.91h0q-.35.07-.69.18l-.95-1.65a.45.45,0,0,0-.62-.16l-3.82,2.21a.45.45,0,0,0-.17.61l.95,1.65h0c-.17.16-.34.33-.5.5l-1.65-1a.45.45,0,0,0-.62.16L364,103.57a.45.45,0,0,0,.17.61l1.65,1c-.07.22-.14.46-.19.69h-1.9a.46.46,0,0,0-.46.45v4.42a.46.46,0,0,0,.46.45h1.9c.05.23.12.46.19.69h0l-1.65,1a.46.46,0,0,0-.17.62l2.21,3.82a.45.45,0,0,0,.62.17l1.65-1c.16.17.33.34.5.5h0L368,118.6a.46.46,0,0,0,.17.62l3.82,2.21a.46.46,0,0,0,.62-.17l.95-1.65.69.19h0v1.9a.46.46,0,0,0,.45.46h4.42a.46.46,0,0,0,.45-.46v-1.9h0l.69-.19,1,1.65a.45.45,0,0,0,.61.17l3.83-2.21a.45.45,0,0,0,.16-.62l-.95-1.65h0l.51-.5,1.65,1a.46.46,0,0,0,.62-.17l2.2-3.82a.45.45,0,0,0-.16-.62l-1.65-1h0Q388.14,111.5,388.21,111.15Zm-10,3.67a6.46,6.46,0,1,1,5.07-5.08A6.45,6.45,0,0,1,378.17,114.82Z\"/>\r\n        </g>\r\n    </g>\r\n</g>\r\n</svg>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/contact/contact.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/contact/contact.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-numbers [number]=\"'05'\"></app-numbers>\r\n<app-social-icons></app-social-icons>\r\n<div class=\"space\">\r\n  <div class=\"contact_info\">\r\n    <app-title [title]=\"'Contact Me'\"></app-title>\r\n    <div class=\"row\">\r\n      <div class=\"col-sm-6 col-xs-12\">\r\n        <div class=\"flex\">\r\n          <i class=\"fa fa-envelope fa-2x\"></i>\r\n          <span>islam.ab.hegazy@gmail.com</span>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-6 col-xs-12\">\r\n        <div class=\"flex\">\r\n          <i class=\"fa fa-phone fa-2x\"></i>\r\n          <span>+20 109 682 2565</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <hr />\r\n  <div class=\"contactForm \">\r\n    <form (ngSubmit)=\"guardar(f)\" #f=\"ngForm\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6 col-xs-12\">\r\n          <div class=\"form-group\">\r\n            <i class=\"fa fa-user icon\"></i>\r\n            <input\r\n              type=\"text \"\r\n              class=\"form-control\"\r\n              placeholder=\" \"\r\n              id=\"name\"\r\n              name=\"name\"\r\n              required\r\n              minlength=\"3\"\r\n              ngModel\r\n              #nameControl=\"ngModel\"\r\n            />\r\n            <label for=\"name\">Name</label>\r\n            <div\r\n              class=\"error\"\r\n              *ngIf=\"nameControl.invalid && nameControl.touched\"\r\n            >\r\n              <span *ngIf=\"nameControl.errors.required\">\r\n                Name is required\r\n              </span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6 col-xs-12 \">\r\n          <div class=\"form-group \">\r\n            <i class=\"fa fa-envelope icon\"></i>\r\n            <input\r\n              type=\"text \"\r\n              class=\"form-control\"\r\n              placeholder=\" \"\r\n              id=\"email\"\r\n              name=\"email\"\r\n              required\r\n              ngModel\r\n              email\r\n              #emailControl=\"ngModel\"\r\n            />\r\n            <label for=\"email\">Email</label>\r\n            <div\r\n              class=\"error\"\r\n              *ngIf=\"emailControl.invalid && emailControl.touched\"\r\n            >\r\n              <span *ngIf=\"emailControl.errors.required\"\r\n                >Email is required</span\r\n              >\r\n              <span *ngIf=\"emailControl.errors.email\"\r\n                >Email must be a valid email address</span\r\n              >\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 \">\r\n          <div class=\"form-group \">\r\n            <i class=\"fa fa-comment icon\"></i>\r\n            <textarea\r\n              class=\"form-control\"\r\n              rows=\"6 \"\r\n              placeholder=\" \"\r\n              minlength=\"6\"\r\n              name=\"message\"\r\n              required\r\n              ngModel\r\n              #messageControl=\"ngModel\"\r\n            ></textarea>\r\n            <label for=\"comments\">Your Message</label>\r\n            <div\r\n              class=\"error\"\r\n              *ngIf=\"messageControl.invalid && messageControl.touched\"\r\n            >\r\n              <span *ngIf=\"messageControl.errors.minlength\"\r\n                >Message must be at least 6 characters</span\r\n              >\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6 col-xs-12 \">\r\n          <div class=\"form-group \">\r\n            <i class=\"fa fa-phone icon\"></i>\r\n            <input\r\n              type=\"text \"\r\n              class=\"form-control\"\r\n              pattern=\"[0-9]+\"\r\n              placeholder=\" \"\r\n              id=\"telephone\"\r\n              name=\"telephone\"\r\n              required\r\n              ngModel\r\n              #telephoneControl=\"ngModel\"\r\n            />\r\n            <label for=\"telephone\">Phone</label>\r\n            <span\r\n              class=\"error\"\r\n              *ngIf=\"telephoneControl.invalid && telephoneControl.touched\"\r\n              >Please enter valid Phone!</span\r\n            >\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6 col-xs-12 \">\r\n          <div class=\"form-wrap form-button \">\r\n            <button class=\"btn \" type=\"submit \" [disabled]=\"!f.valid\">\r\n              Send Message\r\n            </button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"submitMessage\">{{ messageDone }}</div>\r\n    </form>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/front.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/front.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet>\r\n</router-outlet>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/home/home.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/home/home.component.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-numbers [number]=\"'01'\"></app-numbers>\r\n<app-social-icons></app-social-icons>\r\n<app-note></app-note>\r\n<div class=\"home\" [style.min-height.px]=\"myInnerHeight\">\r\n    <div class=\"home_contain  wow zoomIn\" data-wow-duration=\"1.2s\" data-wow-delay=\"1s\">\r\n        <img src=\"assets/islam.png\" class=\"img-responsive home_img\" alt=\"Image\">\r\n        <div class=\"home_text\">\r\n            <span>CREATIVE</span>\r\n            <span> FRONT END DEVELOPER</span>\r\n            <div class=\"home_btns\">\r\n                <a [routerLink]=\"['/contact']\" class=\"btn\">\r\n                    Hire Me\r\n                </a>\r\n                <a class=\"btn\" href=\"https://github.com/islamhegazy/cv_pdf/raw/master/islam-hegazy-cv-front-end.pdf\" target=\"_blank\">Get Cv</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/note/note.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/note/note.component.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"note wow bounceInDown\" data-wow-duration=\"1.2s\" data-wow-delay=\"1s\" *ngIf=\"show\">\r\n    <p> this website built with angular 8</p>\r\n    <div class=\"cloc\" (click)=\"removeNote()\">X</div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/numbers/numbers.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/numbers/numbers.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"numbers\">\r\n    <span>{{number}}</span>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/portfolio/portfolio.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/portfolio/portfolio.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-numbers [number]=\"'04'\"></app-numbers>\r\n<app-social-icons></app-social-icons>\r\n<div class=\"portfollio space\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xs-12\">\r\n      <app-title [title]=\"'Portfolio'\"></app-title>\r\n    </div>\r\n    <div *ngFor=\"let item of Portfolios | reverse | slice: 0:show; let i = index\">\r\n      <div class=\"col-sm-4 col-xs-6\">\r\n        <div class=\"itemPortfolio\" (click)=\"openModal(template)\">\r\n          <div class=\"img_overlay\">\r\n            <span class=\"fa fa-link\"></span>\r\n          </div>\r\n          <img [defaultImage]=\"'assets/loaderThum.gif'\" [errorImage]=\"'assets/image-not-found.png'\"\r\n            [lazyLoad]=\"item.thum\" [alt]=\"item.title\" class=\"img-responsive \" />\r\n        </div>\r\n        <div class=\"itemPortfolio_title\">\r\n          <h5 (click)=\"openModal(template)\">{{ item.title }}</h5>\r\n        </div>\r\n      </div>\r\n\r\n      <ng-template #template>\r\n        <div class=\"modal-header\">\r\n          <h4 class=\"modal-title pull-left\">\r\n            <span> {{ item.title }}</span>\r\n            <a *ngIf=\"item.link !== ''\" class=\"btn btn-site\" [attr.href]=\"item.link\" target=\"_blank\">Live Preview</a>\r\n          </h4>\r\n          <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n          </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <img [defaultImage]=\"'assets/loaderFull.gif'\" [errorImage]=\"'assets/image-not-found.png'\"\r\n            [lazyLoad]=\"item.fullimage\" [alt]=\"item.title\" class=\"img-responsive \" />\r\n        </div>\r\n      </ng-template>\r\n    </div>\r\n    <div class=\"col-xs-12\">\r\n      <div *ngIf=\"show < Portfolios.length\">\r\n        <button class=\"btn loadMore\" (click)=\"onLoadMore()\">Load More </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/social-icons/social-icons.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/social-icons/social-icons.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"social_ico\">\r\n  <ul class=\"list-unstyled\">\r\n    <li>\r\n      <a href=\"https://www.behance.net/islamabhegb21a\" target=\"_blank\"\r\n        ><i class=\"fa fa fa-behance\"></i\r\n      ></a>\r\n    </li>\r\n    <li>\r\n      <a href=\"https://api.whatsapp.com/send?phone=201096822565\" target=\"_blank\"\r\n        ><i class=\"fa fa-whatsapp\"></i\r\n      ></a>\r\n    </li>\r\n    <li>\r\n      <a\r\n        href=\"https://www.linkedin.com/in/islam-hegazy-605161142\"\r\n        target=\"_blank\"\r\n        ><i class=\"fa fa-linkedin\"></i\r\n      ></a>\r\n    </li>\r\n  </ul>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/title/title.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/title/title.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 class=\"mainTitle\">\r\n  {{ title }}\r\n</h1>\r\n");

/***/ }),

/***/ "./src/app/components/front/Skills/skills.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/components/front/Skills/skills.component.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".skill {\n  display: block;\n  margin: auto;\n  margin-bottom: 40px;\n  padding: 0;\n  opacity: 0;\n  transform: scale(0);\n  transform: translateY(-200px);\n}\n@media (max-width: 768px) {\n  .skill {\n    margin-bottom: 30px;\n  }\n}\n.skill .icon {\n  height: 90px;\n}\n@media (max-width: 768px) {\n  .skill .icon {\n    height: 60px;\n  }\n}\n.skill .icon img {\n  width: 75px;\n  margin: auto;\n  display: block;\n  transition: transform 0.2s ease-in-out;\n}\n@media (max-width: 768px) {\n  .skill .icon img {\n    width: 50px;\n  }\n}\n.skill .name {\n  text-align: center;\n  font-size: 15px;\n  margin: 10px 0;\n  font-weight: 700;\n}\n@media (max-width: 768px) {\n  .skill .name {\n    font-size: 14px;\n  }\n}\n.skill:hover img {\n  transform: translateZ(0) scale(1.2);\n}\n@media (max-width: 320px) {\n  .col-xs-4 {\n    width: 50%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9mcm9udC9Ta2lsbHMvRDpcXEN2QW5nL3NyY1xcYXBwXFxjb21wb25lbnRzXFxmcm9udFxcU2tpbGxzXFxza2lsbHMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvU2tpbGxzL3NraWxscy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGNBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtFQUdBLG1CQUFBO0VBR0EsNkJBQUE7QUNBSjtBRENJO0VBWko7SUFhUSxtQkFBQTtFQ0VOO0FBQ0Y7QURESTtFQUNJLFlBQUE7QUNHUjtBREZRO0VBRko7SUFHUSxZQUFBO0VDS1Y7QUFDRjtBREpRO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBSUEsc0NBQUE7QUNPWjtBRExZO0VBVEo7SUFVUSxXQUFBO0VDUWQ7QUFDRjtBRExJO0VBQ0ksa0JBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FDT1I7QUROUTtFQUxKO0lBTVEsZUFBQTtFQ1NWO0FBQ0Y7QURMQTtFQUVJLG1DQUFBO0FDUUo7QURMQTtFQUNJO0lBQ0ksVUFBQTtFQ1FOO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2Zyb250L1NraWxscy9za2lsbHMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vLi4vLi4vc2Nzcy92YXJpYWJsZXNcIjtcclxuLnNraWxsIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNDBweDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgLW1zLXRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwMHB4KTtcclxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwMHB4KTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjAwcHgpO1xyXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICAgIH1cclxuICAgIC5pY29uIHtcclxuICAgICAgICBoZWlnaHQ6IDkwcHg7XHJcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgICAgICAgIGhlaWdodDogNjBweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW1nIHtcclxuICAgICAgICAgICAgd2lkdGg6IDc1cHg7XHJcbiAgICAgICAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gMC4ycyBlYXNlLWluLW91dDtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gMC4ycyBlYXNlLWluLW91dDtcclxuICAgICAgICAgICAgLW8tdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZS1pbi1vdXQ7XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlLWluLW91dCwgLXdlYmtpdC10cmFuc2Zvcm0gMC4ycyBlYXNlLWluLW91dDtcclxuICAgICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNTBweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC5uYW1lIHtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgICAgIG1hcmdpbjogMTBweCAwO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi5za2lsbDpob3ZlciBpbWcge1xyXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCkgc2NhbGUoMS4yKTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKSBzY2FsZSgxLjIpO1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogMzIwcHgpIHtcclxuICAgIC5jb2wteHMtNCB7XHJcbiAgICAgICAgd2lkdGg6IDUwJTtcclxuICAgIH1cclxufSIsIi5za2lsbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IGF1dG87XG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XG4gIHBhZGRpbmc6IDA7XG4gIG9wYWNpdHk6IDA7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgLW1zLXRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMDBweCk7XG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwMHB4KTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMDBweCk7XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLnNraWxsIHtcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICB9XG59XG4uc2tpbGwgLmljb24ge1xuICBoZWlnaHQ6IDkwcHg7XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLnNraWxsIC5pY29uIHtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gIH1cbn1cbi5za2lsbCAuaWNvbiBpbWcge1xuICB3aWR0aDogNzVweDtcbiAgbWFyZ2luOiBhdXRvO1xuICBkaXNwbGF5OiBibG9jaztcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAwLjJzIGVhc2UtaW4tb3V0O1xuICB0cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAwLjJzIGVhc2UtaW4tb3V0O1xuICAtby10cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlLWluLW91dDtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZS1pbi1vdXQ7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UtaW4tb3V0LCAtd2Via2l0LXRyYW5zZm9ybSAwLjJzIGVhc2UtaW4tb3V0O1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5za2lsbCAuaWNvbiBpbWcge1xuICAgIHdpZHRoOiA1MHB4O1xuICB9XG59XG4uc2tpbGwgLm5hbWUge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgbWFyZ2luOiAxMHB4IDA7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLnNraWxsIC5uYW1lIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gIH1cbn1cblxuLnNraWxsOmhvdmVyIGltZyB7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApIHNjYWxlKDEuMik7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKSBzY2FsZSgxLjIpO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogMzIwcHgpIHtcbiAgLmNvbC14cy00IHtcbiAgICB3aWR0aDogNTAlO1xuICB9XG59Il19 */");

/***/ }),

/***/ "./src/app/components/front/Skills/skills.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/front/Skills/skills.component.ts ***!
  \*************************************************************/
/*! exports provided: SkillsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillsComponent", function() { return SkillsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var gsap_all__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap/all */ "./node_modules/gsap/all.js");



const plugins = [gsap_all__WEBPACK_IMPORTED_MODULE_2__["CSSPlugin"]];
let SkillsComponent = class SkillsComponent {
    constructor() {
        this.menu = new gsap_all__WEBPACK_IMPORTED_MODULE_2__["TimelineLite"]({ paused: true, reversed: true });
        this.skills = [
            { skillsName: "HTML/HTML5", icon: "htmlImg.png" },
            { skillsName: "CSS/CSS3", icon: "cssImg.png" },
            { skillsName: "Sass", icon: "sassImg.png" },
            { skillsName: "Bootstrap", icon: "BootstrapImg.png" },
            { skillsName: "Javascript", icon: "javascriptImg.png" },
            { skillsName: "JQuery", icon: "JQueryImg.png" },
            { skillsName: "Angular", icon: "AngularImg.png" },
            { skillsName: "Ajax", icon: "AjaxImg.png" },
            { skillsName: "Git", icon: "GitImg.png" },
            { skillsName: "Photoshop", icon: "PhotoshopImg.png" },
            { skillsName: "Illustrator", icon: "IllustratorImg.png" },
            { skillsName: "Adobe xd", icon: "xdImg.png" }
        ];
        this.shouldDoIt = true; // initialize it to true for the first run
    }
    createMenuAnim() {
        this.menu.to(".skill", 1, { opacity: 1, scale: 1, y: 0, ease: "Linear.easeNone", delay: 1.5 }, 0);
    }
    ngOnInit() { }
    callFunction() {
        if (this.shouldDoIt) {
            this.createMenuAnim();
            this.menu.reversed() ? this.menu.play() : this.menu.reverse();
            this.shouldDoIt = false; // set it to false until you need to trigger again
        }
    }
};
SkillsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-skills",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./skills.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/Skills/skills.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./skills.component.scss */ "./src/app/components/front/Skills/skills.component.scss")).default]
    })
], SkillsComponent);



/***/ }),

/***/ "./src/app/components/front/Skills/svg-skill/svg-skill.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/components/front/Skills/svg-skill/svg-skill.component.scss ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvU2tpbGxzL3N2Zy1za2lsbC9zdmctc2tpbGwuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/components/front/Skills/svg-skill/svg-skill.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/components/front/Skills/svg-skill/svg-skill.component.ts ***!
  \**************************************************************************/
/*! exports provided: SvgSkillComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvgSkillComponent", function() { return SvgSkillComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let SvgSkillComponent = class SvgSkillComponent {
    constructor() { }
    ngOnInit() { }
};
SvgSkillComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-svg-skill",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./svg-skill.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/Skills/svg-skill/svg-skill.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./svg-skill.component.scss */ "./src/app/components/front/Skills/svg-skill/svg-skill.component.scss")).default]
    })
], SvgSkillComponent);



/***/ }),

/***/ "./src/app/components/front/about/about.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/components/front/about/about.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".about .text {\n  opacity: 0;\n  transform: translateY(-200px);\n}\n.about .text h4 {\n  text-transform: uppercase;\n  margin: 0 0 35px 0;\n}\n.about .text h4 {\n  margin: 0 0 15px 0;\n  font-weight: bold;\n}\n.about .text h5 {\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n.about .text h5 span {\n  font-size: 15px;\n  background: #fda300;\n  padding: 5px;\n  border-radius: 4px;\n  margin: 0 5px;\n}\n.about .text p {\n  margin: 0 0 20px;\n  font-size: 15px;\n  line-height: 1.8;\n}\n@media (max-width: 767px) {\n  .about .text p span {\n    display: block;\n  }\n}\n.about .text strong {\n  color: #fda300;\n}\nhr {\n  border-top: 1px solid rgba(255, 187, 34, 0.27);\n}\n.experience {\n  width: 75%;\n  margin: 40px auto;\n}\n@media (max-width: 767px) {\n  .experience {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9mcm9udC9hYm91dC9EOlxcQ3ZBbmcvc3JjXFxhcHBcXGNvbXBvbmVudHNcXGZyb250XFxhYm91dFxcYWJvdXQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvYWJvdXQvYWJvdXQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvYWJvdXQvRDpcXEN2QW5nL3NyY1xcYXBwXFxzY3NzXFxfdmFyaWFibGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUk7RUFDSSxVQUFBO0VBR0EsNkJBQUE7QUNEUjtBREVRO0VBQ0kseUJBQUE7RUFDQSxrQkFBQTtBQ0FaO0FERVE7RUFDSSxrQkFBQTtFQUNBLGlCQUFBO0FDQVo7QURFUTtFQUNJLGdCQUFBO0VBQ0EsbUJBQUE7QUNBWjtBRENZO0VBQ0ksZUFBQTtFQUNBLG1CRW5CSjtFRm9CSSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0FDQ2hCO0FERVE7RUFDSSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQ0FaO0FERWdCO0VBREo7SUFFUSxjQUFBO0VDQ2xCO0FBQ0Y7QURFUTtFQUNJLGNFcENBO0FEb0NaO0FES0E7RUFDSSw4Q0FBQTtBQ0ZKO0FES0E7RUFDSSxVQUFBO0VBQ0EsaUJBQUE7QUNGSjtBREdJO0VBSEo7SUFJUSxXQUFBO0VDQU47QUFDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvYWJvdXQvYWJvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vLi4vLi4vc2Nzcy92YXJpYWJsZXNcIjtcclxuLmFib3V0IHtcclxuICAgIC50ZXh0IHtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMDBweCk7XHJcbiAgICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjAwcHgpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjAwcHgpO1xyXG4gICAgICAgIGg0IHtcclxuICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgICAgICAgICAgbWFyZ2luOiAwIDAgMzVweCAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBoNCB7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCAwIDE1cHggMDtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGg1IHtcclxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcclxuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICAgICAgICAgICAgc3BhbiB7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAkbWFpbkNvbG9yO1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogNXB4O1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIDVweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwIHtcclxuICAgICAgICAgICAgbWFyZ2luOiAwIDAgMjBweDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMS44O1xyXG4gICAgICAgICAgICBzcGFuIHtcclxuICAgICAgICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0cm9uZyB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAkbWFpbkNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuaHIge1xyXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMjU1LCAxODcsIDM0LCAwLjI3KTtcclxufVxyXG5cclxuLmV4cGVyaWVuY2Uge1xyXG4gICAgd2lkdGg6IDc1JTtcclxuICAgIG1hcmdpbjogNDBweCBhdXRvO1xyXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbn0iLCIuYWJvdXQgLnRleHQge1xuICBvcGFjaXR5OiAwO1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjAwcHgpO1xuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMDBweCk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjAwcHgpO1xufVxuLmFib3V0IC50ZXh0IGg0IHtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbWFyZ2luOiAwIDAgMzVweCAwO1xufVxuLmFib3V0IC50ZXh0IGg0IHtcbiAgbWFyZ2luOiAwIDAgMTVweCAwO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbi5hYm91dCAudGV4dCBoNSB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG4uYWJvdXQgLnRleHQgaDUgc3BhbiB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgYmFja2dyb3VuZDogI2ZkYTMwMDtcbiAgcGFkZGluZzogNXB4O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIG1hcmdpbjogMCA1cHg7XG59XG4uYWJvdXQgLnRleHQgcCB7XG4gIG1hcmdpbjogMCAwIDIwcHg7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgbGluZS1oZWlnaHQ6IDEuODtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAuYWJvdXQgLnRleHQgcCBzcGFuIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxufVxuLmFib3V0IC50ZXh0IHN0cm9uZyB7XG4gIGNvbG9yOiAjZmRhMzAwO1xufVxuXG5ociB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCByZ2JhKDI1NSwgMTg3LCAzNCwgMC4yNyk7XG59XG5cbi5leHBlcmllbmNlIHtcbiAgd2lkdGg6IDc1JTtcbiAgbWFyZ2luOiA0MHB4IGF1dG87XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLmV4cGVyaWVuY2Uge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59IiwiJHdoaXRlQ29sb3I6ICNmZmY7XHJcbiRtYWluQ29sb3I6ICNmZGEzMDA7XHJcbiJdfQ== */");

/***/ }),

/***/ "./src/app/components/front/about/about.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/front/about/about.component.ts ***!
  \***********************************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var gsap_all__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap/all */ "./node_modules/gsap/all.js");
/* harmony import */ var ngx_wow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-wow */ "./node_modules/ngx-wow/esm2015/ngx-wow.js");




let AboutComponent = class AboutComponent {
    constructor(wowService, cdr) {
        this.wowService = wowService;
        this.cdr = cdr;
        this.about_imgHeight = 0;
        this.menu = new gsap_all__WEBPACK_IMPORTED_MODULE_2__["TimelineLite"]({ paused: true, reversed: true });
        this.menu2 = new gsap_all__WEBPACK_IMPORTED_MODULE_2__["TimelineLite"]({ paused: true, reversed: true });
        this.state = "hide";
    }
    ngOnInit() {
        this.wowService.init();
        this.createMenuAnim();
        this.menu.reversed() ? this.menu.play() : this.menu.reverse();
        this.createMenuAnim2();
    }
    createMenuAnim() {
        this.menu.to(".t1", 2, { opacity: 1, y: 0, ease: "Linear.easeNone", delay: 1.5 }, 0);
        this.menu.to(".t2", 2, { opacity: 1, y: 0, ease: "Linear.easeNone", delay: 1.7 }, 0);
        this.menu.to(".t3", 2, { opacity: 1, y: 0, ease: "Linear.easeNone", delay: 1.9 }, 0);
        this.menu.to(".t4", 2, { opacity: 1, y: 0, ease: "Linear.easeNone", delay: 2.1 }, 0);
    }
    createMenuAnim2() {
        this.menu2.to("#man", 2, { x: 0, ease: "bounce.out", delay: 1.5 }, 0);
        this.menu2.to("#bord", 2, { y: 0, ease: "bounce.out", delay: 1.5 }, 0);
        this.menu2.to("#circle", 2, { rotation: "360", transformOrigin: "50% 50%", ease: "Linear.easeNone", delay: 1.5 }, 0);
    }
    ngAfterViewInit() {
        this.wowSubscription = this.wowService.itemRevealed$.subscribe((item) => {
            this.menu2.play();
        });
        this.about_imgHeight = this.elementView.nativeElement.offsetHeight;
        this.cdr.detectChanges();
    }
    ngOnDestroy() {
    }
};
AboutComponent.ctorParameters = () => [
    { type: ngx_wow__WEBPACK_IMPORTED_MODULE_3__["NgwWowService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('about_img', { static: false })
], AboutComponent.prototype, "elementView", void 0);
AboutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-about",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./about.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/about/about.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./about.component.scss */ "./src/app/components/front/about/about.component.scss")).default]
    })
], AboutComponent);



/***/ }),

/***/ "./src/app/components/front/about/svg-about/svg-about.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/components/front/about/svg-about/svg-about.component.scss ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#man {\n  transform: translateX(200px);\n}\n\n#bord {\n  transform: translateY(-200px);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9mcm9udC9hYm91dC9zdmctYWJvdXQvRDpcXEN2QW5nL3NyY1xcYXBwXFxjb21wb25lbnRzXFxmcm9udFxcYWJvdXRcXHN2Zy1hYm91dFxcc3ZnLWFib3V0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2Zyb250L2Fib3V0L3N2Zy1hYm91dC9zdmctYWJvdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSw0QkFBQTtBQ0NKOztBREVFO0VBQ0UsNkJBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvYWJvdXQvc3ZnLWFib3V0L3N2Zy1hYm91dC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNtYW4ge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIwMHB4KTtcclxuICB9XHJcbiAgXHJcbiAgI2JvcmQge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMDBweCk7XHJcbiAgfVxyXG4gIFxyXG4gIiwiI21hbiB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMDBweCk7XG59XG5cbiNib3JkIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMDBweCk7XG59Il19 */");

/***/ }),

/***/ "./src/app/components/front/about/svg-about/svg-about.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/components/front/about/svg-about/svg-about.component.ts ***!
  \*************************************************************************/
/*! exports provided: SvgAboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvgAboutComponent", function() { return SvgAboutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let SvgAboutComponent = class SvgAboutComponent {
    constructor() { }
    ngOnInit() { }
};
SvgAboutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-svg-about",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./svg-about.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/about/svg-about/svg-about.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./svg-about.component.scss */ "./src/app/components/front/about/svg-about/svg-about.component.scss")).default]
    })
], SvgAboutComponent);



/***/ }),

/***/ "./src/app/components/front/contact/contact.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/components/front/contact/contact.component.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".contact_info .flex {\n  display: flex;\n  align-items: center;\n  font-size: 20px;\n  margin: 35px 20px;\n}\n@media (max-width: 767px) {\n  .contact_info .flex {\n    font-size: 16px;\n    margin: 15px 0px;\n    justify-content: center;\n  }\n}\n.contact_info i {\n  margin-right: 20px;\n  color: #fda300;\n}\n@media (max-width: 767px) {\n  .contact_info i {\n    margin-right: 10px;\n  }\n}\n.contactForm {\n  padding: 35px;\n  border-radius: 15px;\n}\n@media (max-width: 767px) {\n  .contactForm {\n    padding: 50px 15px 50px 15px;\n  }\n}\n.contactForm .form-group {\n  margin: 0 0 50px;\n  padding: 0;\n  line-height: 0px;\n  position: relative;\n}\n.contactForm .form-group .icon {\n  position: absolute;\n  top: 0px;\n  left: 0;\n  font-size: 20px;\n  height: 100%;\n  line-height: 40px;\n  background: #fda300;\n  width: 40px;\n  text-align: center;\n  color: #fff;\n  border-radius: 20px 0 0 20px;\n}\n.contactForm .form-group label {\n  position: absolute;\n  font-size: 13px;\n  color: #fff;\n  padding-bottom: 5px;\n}\n.contactForm .form-group .form-control {\n  padding: 20px 10px 20px 50px;\n  border: 2px solid #fff;\n  background-color: transparent;\n  color: #fff;\n  border-radius: 20px;\n}\n.contactForm .form-group .error {\n  position: absolute;\n  right: 20px;\n  bottom: -10px;\n  color: #f34f4b;\n  font-weight: 700;\n}\n@media (max-width: 767px) {\n  .contactForm .form-group .error {\n    right: 11px;\n    bottom: -11px;\n    font-weight: 900;\n    font-size: 10px;\n  }\n}\n.contactForm .form-group .form-control.ng-invalid.ng-touched {\n  border: 2px solid #f34f4b;\n}\n.contactForm .form-group .form-control:placeholder-shown + label {\n  left: 50px;\n  top: 20px;\n}\n.contactForm .form-group ::-webkit-input-placeholder {\n  opacity: 0;\n  transition: inherit;\n}\n.contactForm .form-group input:focus::-webkit-input-placeholder {\n  opacity: 1;\n}\n.contactForm .form-group .form-control:not(:placeholder-shown) + label,\n.contactForm .form-group .form-control:focus + label {\n  left: 50px;\n  top: -12px;\n}\n.contactForm .btn {\n  width: 100%;\n}\n.contactForm .submitMessage {\n  font-weight: 600;\n  color: #fda300;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9mcm9udC9jb250YWN0L0Q6XFxDdkFuZy9zcmNcXGFwcFxcY29tcG9uZW50c1xcZnJvbnRcXGNvbnRhY3RcXGNvbnRhY3QuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvY29udGFjdC9jb250YWN0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2Zyb250L2NvbnRhY3QvRDpcXEN2QW5nL3NyY1xcYXBwXFxzY3NzXFxfdmFyaWFibGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUk7RUFHSSxhQUFBO0VBR0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUNEUjtBREVRO0VBVEo7SUFVUSxlQUFBO0lBQ0EsZ0JBQUE7SUFHQSx1QkFBQTtFQ0NWO0FBQ0Y7QURDSTtFQUNJLGtCQUFBO0VBQ0EsY0VwQkk7QURxQlo7QURBUTtFQUhKO0lBSVEsa0JBQUE7RUNHVjtBQUNGO0FEQ0E7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7QUNFSjtBRERJO0VBSEo7SUFJUSw0QkFBQTtFQ0lOO0FBQ0Y7QURISTtFQUNJLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNLUjtBREpRO0VBQ0ksa0JBQUE7RUFDQSxRQUFBO0VBQ0EsT0FBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkU3Q0E7RUY4Q0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0VqREM7RUZrREQsNEJBQUE7QUNNWjtBREpRO0VBQ0ksa0JBQUE7RUFDQSxlQUFBO0VBQ0EsV0V2REM7RUZ3REQsbUJBQUE7QUNNWjtBREpRO0VBQ0ksNEJBQUE7RUFDQSxzQkFBQTtFQUNBLDZCQUFBO0VBQ0EsV0U5REM7RUYrREQsbUJBQUE7QUNNWjtBREpRO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQ01aO0FETFk7RUFOSjtJQU9RLFdBQUE7SUFDQSxhQUFBO0lBQ0EsZ0JBQUE7SUFDQSxlQUFBO0VDUWQ7QUFDRjtBRE5RO0VBQ0kseUJBQUE7QUNRWjtBRE5RO0VBQ0ksVUFBQTtFQUNBLFNBQUE7QUNRWjtBRE5TO0VBQ0csVUFBQTtFQUdBLG1CQUFBO0FDUVo7QUROUTtFQUNJLFVBQUE7QUNRWjtBRE5ROztFQUVJLFVBQUE7RUFDQSxVQUFBO0FDUVo7QURMSTtFQUNJLFdBQUE7QUNPUjtBRExJO0VBQ0ksZ0JBQUE7RUFDQSxjRXhHSTtFRnlHSixrQkFBQTtBQ09SIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9mcm9udC9jb250YWN0L2NvbnRhY3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vLi4vLi4vc2Nzcy92YXJpYWJsZXNcIjtcclxuLmNvbnRhY3RfaW5mbyB7XHJcbiAgICAuZmxleCB7XHJcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XHJcbiAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgbWFyZ2luOiAzNXB4IDIwcHg7XHJcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgICAgICAgbWFyZ2luOiAxNXB4IDBweDtcclxuICAgICAgICAgICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xyXG4gICAgICAgICAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGkge1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcclxuICAgICAgICBjb2xvcjogJG1haW5Db2xvcjtcclxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcclxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLmNvbnRhY3RGb3JtIHtcclxuICAgIHBhZGRpbmc6IDM1cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICAgICAgcGFkZGluZzogNTBweCAxNXB4IDUwcHggMTVweDtcclxuICAgIH1cclxuICAgIC5mb3JtLWdyb3VwIHtcclxuICAgICAgICBtYXJnaW46IDAgMCA1MHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDBweDtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgLmljb24ge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgIHRvcDogMHB4O1xyXG4gICAgICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDQwcHg7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICRtYWluQ29sb3I7XHJcbiAgICAgICAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGNvbG9yOiAkd2hpdGVDb2xvcjtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMjBweCAwIDAgMjBweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFiZWwge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICAgICAgY29sb3I6ICR3aGl0ZUNvbG9yO1xyXG4gICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogNXB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZm9ybS1jb250cm9sIHtcclxuICAgICAgICAgICAgcGFkZGluZzogMjBweCAxMHB4IDIwcHggNTBweDtcclxuICAgICAgICAgICAgYm9yZGVyOiAycHggc29saWQgJHdoaXRlQ29sb3I7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgICAgICBjb2xvcjogJHdoaXRlQ29sb3I7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5lcnJvciB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgcmlnaHQ6IDIwcHg7XHJcbiAgICAgICAgICAgIGJvdHRvbTogLTEwcHg7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjZjM0ZjRiO1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiAxMXB4O1xyXG4gICAgICAgICAgICAgICAgYm90dG9tOiAtMTFweDtcclxuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA5MDA7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLmZvcm0tY29udHJvbC5uZy1pbnZhbGlkLm5nLXRvdWNoZWQge1xyXG4gICAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjZjM0ZjRiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZm9ybS1jb250cm9sOnBsYWNlaG9sZGVyLXNob3duK2xhYmVsIHtcclxuICAgICAgICAgICAgbGVmdDogNTBweDtcclxuICAgICAgICAgICAgdG9wOiAyMHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBpbmhlcml0O1xyXG4gICAgICAgICAgICAtby10cmFuc2l0aW9uOiBpbmhlcml0O1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBpbmhlcml0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dDpmb2N1czo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5mb3JtLWNvbnRyb2w6bm90KDpwbGFjZWhvbGRlci1zaG93bikrbGFiZWwsXHJcbiAgICAgICAgLmZvcm0tY29udHJvbDpmb2N1cytsYWJlbCB7XHJcbiAgICAgICAgICAgIGxlZnQ6IDUwcHg7XHJcbiAgICAgICAgICAgIHRvcDogLTEycHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLmJ0biB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbiAgICAuc3VibWl0TWVzc2FnZSB7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogJG1haW5Db2xvcjtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcbn0iLCIuY29udGFjdF9pbmZvIC5mbGV4IHtcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICBkaXNwbGF5OiBmbGV4O1xuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LXNpemU6IDIwcHg7XG4gIG1hcmdpbjogMzVweCAyMHB4O1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5jb250YWN0X2luZm8gLmZsZXgge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBtYXJnaW46IDE1cHggMHB4O1xuICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcbiAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIH1cbn1cbi5jb250YWN0X2luZm8gaSB7XG4gIG1hcmdpbi1yaWdodDogMjBweDtcbiAgY29sb3I6ICNmZGEzMDA7XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLmNvbnRhY3RfaW5mbyBpIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIH1cbn1cblxuLmNvbnRhY3RGb3JtIHtcbiAgcGFkZGluZzogMzVweDtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAuY29udGFjdEZvcm0ge1xuICAgIHBhZGRpbmc6IDUwcHggMTVweCA1MHB4IDE1cHg7XG4gIH1cbn1cbi5jb250YWN0Rm9ybSAuZm9ybS1ncm91cCB7XG4gIG1hcmdpbjogMCAwIDUwcHg7XG4gIHBhZGRpbmc6IDA7XG4gIGxpbmUtaGVpZ2h0OiAwcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5jb250YWN0Rm9ybSAuZm9ybS1ncm91cCAuaWNvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwcHg7XG4gIGxlZnQ6IDA7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBsaW5lLWhlaWdodDogNDBweDtcbiAgYmFja2dyb3VuZDogI2ZkYTMwMDtcbiAgd2lkdGg6IDQwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHggMCAwIDIwcHg7XG59XG4uY29udGFjdEZvcm0gLmZvcm0tZ3JvdXAgbGFiZWwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY29sb3I6ICNmZmY7XG4gIHBhZGRpbmctYm90dG9tOiA1cHg7XG59XG4uY29udGFjdEZvcm0gLmZvcm0tZ3JvdXAgLmZvcm0tY29udHJvbCB7XG4gIHBhZGRpbmc6IDIwcHggMTBweCAyMHB4IDUwcHg7XG4gIGJvcmRlcjogMnB4IHNvbGlkICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbn1cbi5jb250YWN0Rm9ybSAuZm9ybS1ncm91cCAuZXJyb3Ige1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAyMHB4O1xuICBib3R0b206IC0xMHB4O1xuICBjb2xvcjogI2YzNGY0YjtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAuY29udGFjdEZvcm0gLmZvcm0tZ3JvdXAgLmVycm9yIHtcbiAgICByaWdodDogMTFweDtcbiAgICBib3R0b206IC0xMXB4O1xuICAgIGZvbnQtd2VpZ2h0OiA5MDA7XG4gICAgZm9udC1zaXplOiAxMHB4O1xuICB9XG59XG4uY29udGFjdEZvcm0gLmZvcm0tZ3JvdXAgLmZvcm0tY29udHJvbC5uZy1pbnZhbGlkLm5nLXRvdWNoZWQge1xuICBib3JkZXI6IDJweCBzb2xpZCAjZjM0ZjRiO1xufVxuLmNvbnRhY3RGb3JtIC5mb3JtLWdyb3VwIC5mb3JtLWNvbnRyb2w6cGxhY2Vob2xkZXItc2hvd24gKyBsYWJlbCB7XG4gIGxlZnQ6IDUwcHg7XG4gIHRvcDogMjBweDtcbn1cbi5jb250YWN0Rm9ybSAuZm9ybS1ncm91cCA6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICBvcGFjaXR5OiAwO1xuICAtd2Via2l0LXRyYW5zaXRpb246IGluaGVyaXQ7XG4gIC1vLXRyYW5zaXRpb246IGluaGVyaXQ7XG4gIHRyYW5zaXRpb246IGluaGVyaXQ7XG59XG4uY29udGFjdEZvcm0gLmZvcm0tZ3JvdXAgaW5wdXQ6Zm9jdXM6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICBvcGFjaXR5OiAxO1xufVxuLmNvbnRhY3RGb3JtIC5mb3JtLWdyb3VwIC5mb3JtLWNvbnRyb2w6bm90KDpwbGFjZWhvbGRlci1zaG93bikgKyBsYWJlbCxcbi5jb250YWN0Rm9ybSAuZm9ybS1ncm91cCAuZm9ybS1jb250cm9sOmZvY3VzICsgbGFiZWwge1xuICBsZWZ0OiA1MHB4O1xuICB0b3A6IC0xMnB4O1xufVxuLmNvbnRhY3RGb3JtIC5idG4ge1xuICB3aWR0aDogMTAwJTtcbn1cbi5jb250YWN0Rm9ybSAuc3VibWl0TWVzc2FnZSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjZmRhMzAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59IiwiJHdoaXRlQ29sb3I6ICNmZmY7XHJcbiRtYWluQ29sb3I6ICNmZGEzMDA7XHJcbiJdfQ== */");

/***/ }),

/***/ "./src/app/components/front/contact/contact.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/front/contact/contact.component.ts ***!
  \***************************************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");



let ContactComponent = class ContactComponent {
    constructor(http) {
        this.http = http;
        this.email = "";
        this.name = "";
        this.message = "";
        this.telephone = "";
        this.endpoint = "cv/sendEmail.php";
        this.messageDone = "";
    }
    guardar(f) {
        let postVars = {
            name: f.value.name,
            email: f.value.email,
            message: f.value.message,
            telephone: f.value.telephone
        };
        this.http.post(this.endpoint, postVars).subscribe(response => {
            this.messageDone = response;
            console.log(response);
        });
        f.reset();
    }
};
ContactComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
ContactComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-contact",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./contact.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/contact/contact.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./contact.component.scss */ "./src/app/components/front/contact/contact.component.scss")).default]
    })
], ContactComponent);



/***/ }),

/***/ "./src/app/components/front/front-routing.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/components/front/front-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: FrontRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrontRoutingModule", function() { return FrontRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ "./src/app/components/front/home/home.component.ts");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./about/about.component */ "./src/app/components/front/about/about.component.ts");
/* harmony import */ var _Skills_skills_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Skills/skills.component */ "./src/app/components/front/Skills/skills.component.ts");
/* harmony import */ var _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./portfolio/portfolio.component */ "./src/app/components/front/portfolio/portfolio.component.ts");
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./contact/contact.component */ "./src/app/components/front/contact/contact.component.ts");
/* harmony import */ var _front_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./front.component */ "./src/app/components/front/front.component.ts");









const frontRoutes = [
    {
        path: '', component: _front_component__WEBPACK_IMPORTED_MODULE_8__["FrontComponent"], children: [
            { path: "home", component: _home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"] },
            { path: "about", component: _about_about_component__WEBPACK_IMPORTED_MODULE_4__["AboutComponent"] },
            { path: "skills", component: _Skills_skills_component__WEBPACK_IMPORTED_MODULE_5__["SkillsComponent"] },
            { path: "portfolio", component: _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_6__["PortfolioComponent"] },
            { path: "contact", component: _contact_contact_component__WEBPACK_IMPORTED_MODULE_7__["ContactComponent"] },
        ]
    },
];
let FrontRoutingModule = class FrontRoutingModule {
};
FrontRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(frontRoutes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })
], FrontRoutingModule);



/***/ }),

/***/ "./src/app/components/front/front.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/components/front/front.component.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvZnJvbnQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/components/front/front.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/front/front.component.ts ***!
  \*****************************************************/
/*! exports provided: FrontComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrontComponent", function() { return FrontComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let FrontComponent = class FrontComponent {
    ngOnInit() { }
};
FrontComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-front",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./front.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/front.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./front.component.scss */ "./src/app/components/front/front.component.scss")).default]
    })
], FrontComponent);



/***/ }),

/***/ "./src/app/components/front/front.module.ts":
/*!**************************************************!*\
  !*** ./src/app/components/front/front.module.ts ***!
  \**************************************************/
/*! exports provided: FrontModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrontModule", function() { return FrontModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../shared.module */ "./src/app/components/shared.module.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ "./src/app/components/front/home/home.component.ts");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./about/about.component */ "./src/app/components/front/about/about.component.ts");
/* harmony import */ var _Skills_skills_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Skills/skills.component */ "./src/app/components/front/Skills/skills.component.ts");
/* harmony import */ var _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./portfolio/portfolio.component */ "./src/app/components/front/portfolio/portfolio.component.ts");
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./contact/contact.component */ "./src/app/components/front/contact/contact.component.ts");
/* harmony import */ var _front_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./front.component */ "./src/app/components/front/front.component.ts");
/* harmony import */ var _Skills_svg_skill_svg_skill_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Skills/svg-skill/svg-skill.component */ "./src/app/components/front/Skills/svg-skill/svg-skill.component.ts");
/* harmony import */ var _about_svg_about_svg_about_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./about/svg-about/svg-about.component */ "./src/app/components/front/about/svg-about/svg-about.component.ts");
/* harmony import */ var _title_title_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./title/title.component */ "./src/app/components/front/title/title.component.ts");
/* harmony import */ var _front_routing_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./front-routing.module */ "./src/app/components/front/front-routing.module.ts");
/* harmony import */ var _numbers_numbers_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./numbers/numbers.component */ "./src/app/components/front/numbers/numbers.component.ts");
/* harmony import */ var _social_icons_social_icons_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./social-icons/social-icons.component */ "./src/app/components/front/social-icons/social-icons.component.ts");
/* harmony import */ var _pipe_reverse_pipe__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../../pipe/reverse-pipe */ "./src/app/pipe/reverse-pipe.ts");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm2015/ng-lazyload-image.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _note_note_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./note/note.component */ "./src/app/components/front/note/note.component.ts");



















let FrontModule = class FrontModule {
};
FrontModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _front_component__WEBPACK_IMPORTED_MODULE_8__["FrontComponent"],
            _home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"],
            _Skills_svg_skill_svg_skill_component__WEBPACK_IMPORTED_MODULE_9__["SvgSkillComponent"],
            _about_svg_about_svg_about_component__WEBPACK_IMPORTED_MODULE_10__["SvgAboutComponent"],
            _title_title_component__WEBPACK_IMPORTED_MODULE_11__["TitleComponent"],
            _about_about_component__WEBPACK_IMPORTED_MODULE_4__["AboutComponent"],
            _Skills_skills_component__WEBPACK_IMPORTED_MODULE_5__["SkillsComponent"],
            _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_6__["PortfolioComponent"],
            _contact_contact_component__WEBPACK_IMPORTED_MODULE_7__["ContactComponent"],
            _numbers_numbers_component__WEBPACK_IMPORTED_MODULE_13__["NumbersComponent"],
            _social_icons_social_icons_component__WEBPACK_IMPORTED_MODULE_14__["SocialIconsComponent"],
            _pipe_reverse_pipe__WEBPACK_IMPORTED_MODULE_15__["ReversePipe"],
            _note_note_component__WEBPACK_IMPORTED_MODULE_18__["NoteComponent"],
        ],
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_17__["RouterModule"],
            _shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
            _front_routing_module__WEBPACK_IMPORTED_MODULE_12__["FrontRoutingModule"],
            ng_lazyload_image__WEBPACK_IMPORTED_MODULE_16__["LazyLoadImageModule"].forRoot({
                preset: ng_lazyload_image__WEBPACK_IMPORTED_MODULE_16__["scrollPreset"]
            }),
        ],
        exports: []
    })
], FrontModule);



/***/ }),

/***/ "./src/app/components/front/home/home.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/components/front/home/home.component.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".home {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n@media (min-width: 767px) {\n  .home {\n    padding: 0;\n  }\n}\n@media (max-width: 767px) {\n  .home {\n    padding: 0;\n  }\n}\n@media (max-height: 783px) and (max-width: 767px) {\n  .home {\n    padding: 86px 0;\n  }\n}\n@media (max-height: 320px) {\n  .home {\n    padding: 45px 0;\n  }\n}\n.home_contain {\n  position: relative;\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.home_img {\n  width: 45%;\n}\n@media (max-width: 823px) {\n  .home_img {\n    width: 75%;\n    margin: auto;\n  }\n}\n@media (max-width: 320px) {\n  .home_img {\n    width: 80%;\n  }\n}\n.home_text {\n  position: absolute;\n  top: 160px;\n  left: 40%;\n  text-align: center;\n  font-weight: 500;\n}\n@media (max-width: 1267px) {\n  .home_text {\n    top: 130px;\n  }\n}\n@media (max-width: 920px) {\n  .home_text {\n    top: 73px;\n  }\n}\n@media (max-width: 823px) {\n  .home_text {\n    position: unset;\n    top: auto;\n    left: auto;\n    text-align: center;\n  }\n}\n.home_text span {\n  display: block;\n}\n.home_text span:first-child {\n  font-size: 85px;\n  letter-spacing: 13px;\n}\n@media (max-width: 1267px) {\n  .home_text span:first-child {\n    font-size: 76px;\n  }\n}\n@media (max-width: 920px) {\n  .home_text span:first-child {\n    font-size: 54px;\n    letter-spacing: 10px;\n  }\n}\n@media (max-width: 767px) {\n  .home_text span:first-child {\n    font-size: 39px;\n    letter-spacing: 8px;\n  }\n}\n@media (max-width: 320px) {\n  .home_text span:first-child {\n    font-size: 26px;\n  }\n}\n.home_text span:nth-child(2) {\n  font-size: 30px;\n  letter-spacing: 8.5px;\n}\n@media (max-width: 1366px) {\n  .home_text span:nth-child(2) {\n    letter-spacing: 4.5px;\n  }\n}\n@media (max-width: 1267px) {\n  .home_text span:nth-child(2) {\n    font-size: 23px;\n    letter-spacing: 6.5px;\n  }\n}\n@media (max-width: 920px) {\n  .home_text span:nth-child(2) {\n    font-size: 20px;\n    letter-spacing: 4.5px;\n  }\n}\n@media (max-width: 767px) {\n  .home_text span:nth-child(2) {\n    font-size: 14px;\n    letter-spacing: 3.5px;\n  }\n}\n@media (max-width: 320px) {\n  .home_text span:nth-child(2) {\n    font-size: 10px;\n    letter-spacing: 2.5px;\n  }\n}\n.home_text .home_btns {\n  margin: 30px auto;\n}\n@media (max-width: 320px) {\n  .home_text .home_btns {\n    display: -ms-grid;\n    display: grid;\n    place-content: center;\n  }\n}\n.home_text .home_btns .btn {\n  padding: 10px 33px;\n  transition: all 0.2s ease-in-out;\n}\n.home_text .home_btns .btn:first-child {\n  margin-right: 20px;\n}\n@media (max-width: 320px) {\n  .home_text .home_btns .btn:first-child {\n    margin-right: 0;\n    margin-bottom: 15px;\n  }\n}\n.home_text .home_btns .btn:last-child {\n  background: transparent;\n  border: 2px solid #fda300;\n}\n.home_text .home_btns .btn:last-child:hover {\n  background: #fda300;\n}\n.home_text .home_btns .btn:last-child:focus {\n  background: transparent;\n  border: 2px solid #fda300;\n}\n@media (max-width: 320px) {\n  .home_text .home_btns .btn {\n    margin: 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9mcm9udC9ob21lL0Q6XFxDdkFuZy9zcmNcXGFwcFxcY29tcG9uZW50c1xcZnJvbnRcXGhvbWVcXGhvbWUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL2Zyb250L2hvbWUvRDpcXEN2QW5nL3NyY1xcYXBwXFxzY3NzXFxfdmFyaWFibGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxXQUFBO0VBR0EsYUFBQTtFQUdBLG1CQUFBO0VBR0EsdUJBQUE7QUNBSjtBRENJO0VBWEo7SUFZUSxVQUFBO0VDRU47QUFDRjtBRERJO0VBZEo7SUFlUSxVQUFBO0VDSU47QUFDRjtBREhJO0VBakJKO0lBa0JRLGVBQUE7RUNNTjtBQUNGO0FETEk7RUFwQko7SUFxQlEsZUFBQTtFQ1FOO0FBQ0Y7QURMQTtFQUNJLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDUUo7QURMQTtFQUNJLFVBQUE7QUNRSjtBRFBJO0VBRko7SUFHUSxVQUFBO0lBQ0EsWUFBQTtFQ1VOO0FBQ0Y7QURUSTtFQU5KO0lBT1EsVUFBQTtFQ1lOO0FBQ0Y7QURUQTtFQUNJLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FDWUo7QURYSTtFQU5KO0lBT1EsVUFBQTtFQ2NOO0FBQ0Y7QURiSTtFQVRKO0lBVVEsU0FBQTtFQ2dCTjtBQUNGO0FEZkk7RUFaSjtJQWFRLGVBQUE7SUFDQSxTQUFBO0lBQ0EsVUFBQTtJQUNBLGtCQUFBO0VDa0JOO0FBQ0Y7QURqQkk7RUFDSSxjQUFBO0FDbUJSO0FEbEJRO0VBQ0ksZUFBQTtFQUNBLG9CQUFBO0FDb0JaO0FEbkJZO0VBSEo7SUFJUSxlQUFBO0VDc0JkO0FBQ0Y7QURyQlk7RUFOSjtJQU9RLGVBQUE7SUFDQSxvQkFBQTtFQ3dCZDtBQUNGO0FEdkJZO0VBVko7SUFXUSxlQUFBO0lBQ0EsbUJBQUE7RUMwQmQ7QUFDRjtBRHpCWTtFQWRKO0lBZVEsZUFBQTtFQzRCZDtBQUNGO0FEMUJRO0VBQ0ksZUFBQTtFQUNBLHFCQUFBO0FDNEJaO0FEM0JZO0VBSEo7SUFJUSxxQkFBQTtFQzhCZDtBQUNGO0FEN0JZO0VBTko7SUFPUSxlQUFBO0lBQ0EscUJBQUE7RUNnQ2Q7QUFDRjtBRC9CWTtFQVZKO0lBV1EsZUFBQTtJQUNBLHFCQUFBO0VDa0NkO0FBQ0Y7QURqQ1k7RUFkSjtJQWVRLGVBQUE7SUFDQSxxQkFBQTtFQ29DZDtBQUNGO0FEbkNZO0VBbEJKO0lBbUJRLGVBQUE7SUFDQSxxQkFBQTtFQ3NDZDtBQUNGO0FEbkNJO0VBQ0ksaUJBQUE7QUNxQ1I7QURwQ1E7RUFGSjtJQUdRLGlCQUFBO0lBQ0EsYUFBQTtJQUNBLHFCQUFBO0VDdUNWO0FBQ0Y7QUR0Q1E7RUFDSSxrQkFBQTtFQUdBLGdDQUFBO0FDd0NaO0FEdkNZO0VBQ0ksa0JBQUE7QUN5Q2hCO0FEeENnQjtFQUZKO0lBR1EsZUFBQTtJQUNBLG1CQUFBO0VDMkNsQjtBQUNGO0FEekNZO0VBQ0ksdUJBQUE7RUFDQSx5QkFBQTtBQzJDaEI7QUQxQ2dCO0VBQ0ksbUJFaElSO0FENEtaO0FEMUNnQjtFQUNJLHVCQUFBO0VBQ0EseUJBQUE7QUM0Q3BCO0FEekNZO0VBdkJKO0lBd0JRLFNBQUE7RUM0Q2Q7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uLy4uL3Njc3MvdmFyaWFibGVzXCI7XHJcbi5ob21lIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XHJcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xyXG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XHJcbiAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjdweCkge1xyXG4gICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICB9XHJcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcclxuICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgfVxyXG4gICAgQG1lZGlhIChtYXgtaGVpZ2h0OiA3ODNweCkgYW5kIChtYXgtd2lkdGg6IDc2N3B4KXtcclxuICAgICAgICBwYWRkaW5nOiA4NnB4IDA7XHJcbiAgICB9XHJcbiAgICBAbWVkaWEgKG1heC1oZWlnaHQ6IDMyMHB4KSB7XHJcbiAgICAgICAgcGFkZGluZzogNDVweCAwO1xyXG4gICAgfVxyXG59XHJcblxyXG4uaG9tZV9jb250YWluIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbi5ob21lX2ltZyB7XHJcbiAgICB3aWR0aDogNDUlO1xyXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDgyM3B4KSB7XHJcbiAgICAgICAgd2lkdGg6IDc1JTtcclxuICAgICAgICBtYXJnaW46IGF1dG87XHJcbiAgICB9XHJcbiAgICBAbWVkaWEgKG1heC13aWR0aDogMzIwcHgpIHtcclxuICAgICAgICB3aWR0aDogODAlO1xyXG4gICAgfVxyXG59XHJcblxyXG4uaG9tZV90ZXh0IHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTYwcHg7XHJcbiAgICBsZWZ0OiA0MCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDEyNjdweCkge1xyXG4gICAgICAgIHRvcDogMTMwcHg7XHJcbiAgICB9XHJcbiAgICBAbWVkaWEgKG1heC13aWR0aDogOTIwcHgpIHtcclxuICAgICAgICB0b3A6IDczcHg7XHJcbiAgICB9XHJcbiAgICBAbWVkaWEgKG1heC13aWR0aDogODIzcHgpIHtcclxuICAgICAgICBwb3NpdGlvbjogdW5zZXQ7XHJcbiAgICAgICAgdG9wOiBhdXRvO1xyXG4gICAgICAgIGxlZnQ6IGF1dG87XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgfVxyXG4gICAgc3BhbiB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgJjpmaXJzdC1jaGlsZCB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogODVweDtcclxuICAgICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDEzcHg7XHJcbiAgICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiAxMjY3cHgpIHtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogNzZweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogOTIwcHgpIHtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogNTRweDtcclxuICAgICAgICAgICAgICAgIGxldHRlci1zcGFjaW5nOiAxMHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAzOXB4O1xyXG4gICAgICAgICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDhweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogMzIwcHgpIHtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjZweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAmOm50aC1jaGlsZCgyKSB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMzBweDtcclxuICAgICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDguNXB4O1xyXG4gICAgICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogMTM2NnB4KSB7XHJcbiAgICAgICAgICAgICAgICBsZXR0ZXItc3BhY2luZzogNC41cHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDEyNjdweCkge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAyM3B4O1xyXG4gICAgICAgICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDYuNXB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA5MjBweCkge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICAgICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDQuNXB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDMuNXB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiAzMjBweCkge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgICAgICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDIuNXB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLmhvbWVfYnRucyB7XHJcbiAgICAgICAgbWFyZ2luOiAzMHB4IGF1dG87XHJcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDMyMHB4KSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IC1tcy1ncmlkO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgICAgICAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5idG4ge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDMzcHg7XHJcbiAgICAgICAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XHJcbiAgICAgICAgICAgIC1vLXRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcclxuICAgICAgICAgICAgJjpmaXJzdC1jaGlsZCB7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbiAgICAgICAgICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogMzIwcHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAmOmxhc3QtY2hpbGQge1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAkbWFpbkNvbG9yO1xyXG4gICAgICAgICAgICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJG1haW5Db2xvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICY6Zm9jdXMge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICRtYWluQ29sb3I7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDMyMHB4KSB7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW46IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi5ob21lIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgZGlzcGxheTogZmxleDtcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuQG1lZGlhIChtaW4td2lkdGg6IDc2N3B4KSB7XG4gIC5ob21lIHtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLmhvbWUge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbn1cbkBtZWRpYSAobWF4LWhlaWdodDogNzgzcHgpIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xuICAuaG9tZSB7XG4gICAgcGFkZGluZzogODZweCAwO1xuICB9XG59XG5AbWVkaWEgKG1heC1oZWlnaHQ6IDMyMHB4KSB7XG4gIC5ob21lIHtcbiAgICBwYWRkaW5nOiA0NXB4IDA7XG4gIH1cbn1cblxuLmhvbWVfY29udGFpbiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5ob21lX2ltZyB7XG4gIHdpZHRoOiA0NSU7XG59XG5AbWVkaWEgKG1heC13aWR0aDogODIzcHgpIHtcbiAgLmhvbWVfaW1nIHtcbiAgICB3aWR0aDogNzUlO1xuICAgIG1hcmdpbjogYXV0bztcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDMyMHB4KSB7XG4gIC5ob21lX2ltZyB7XG4gICAgd2lkdGg6IDgwJTtcbiAgfVxufVxuXG4uaG9tZV90ZXh0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDE2MHB4O1xuICBsZWZ0OiA0MCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiAxMjY3cHgpIHtcbiAgLmhvbWVfdGV4dCB7XG4gICAgdG9wOiAxMzBweDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDkyMHB4KSB7XG4gIC5ob21lX3RleHQge1xuICAgIHRvcDogNzNweDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDgyM3B4KSB7XG4gIC5ob21lX3RleHQge1xuICAgIHBvc2l0aW9uOiB1bnNldDtcbiAgICB0b3A6IGF1dG87XG4gICAgbGVmdDogYXV0bztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbn1cbi5ob21lX3RleHQgc3BhbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuLmhvbWVfdGV4dCBzcGFuOmZpcnN0LWNoaWxkIHtcbiAgZm9udC1zaXplOiA4NXB4O1xuICBsZXR0ZXItc3BhY2luZzogMTNweDtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiAxMjY3cHgpIHtcbiAgLmhvbWVfdGV4dCBzcGFuOmZpcnN0LWNoaWxkIHtcbiAgICBmb250LXNpemU6IDc2cHg7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA5MjBweCkge1xuICAuaG9tZV90ZXh0IHNwYW46Zmlyc3QtY2hpbGQge1xuICAgIGZvbnQtc2l6ZTogNTRweDtcbiAgICBsZXR0ZXItc3BhY2luZzogMTBweDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5ob21lX3RleHQgc3BhbjpmaXJzdC1jaGlsZCB7XG4gICAgZm9udC1zaXplOiAzOXB4O1xuICAgIGxldHRlci1zcGFjaW5nOiA4cHg7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiAzMjBweCkge1xuICAuaG9tZV90ZXh0IHNwYW46Zmlyc3QtY2hpbGQge1xuICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgfVxufVxuLmhvbWVfdGV4dCBzcGFuOm50aC1jaGlsZCgyKSB7XG4gIGZvbnQtc2l6ZTogMzBweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDguNXB4O1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDEzNjZweCkge1xuICAuaG9tZV90ZXh0IHNwYW46bnRoLWNoaWxkKDIpIHtcbiAgICBsZXR0ZXItc3BhY2luZzogNC41cHg7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiAxMjY3cHgpIHtcbiAgLmhvbWVfdGV4dCBzcGFuOm50aC1jaGlsZCgyKSB7XG4gICAgZm9udC1zaXplOiAyM3B4O1xuICAgIGxldHRlci1zcGFjaW5nOiA2LjVweDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDkyMHB4KSB7XG4gIC5ob21lX3RleHQgc3BhbjpudGgtY2hpbGQoMikge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBsZXR0ZXItc3BhY2luZzogNC41cHg7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAuaG9tZV90ZXh0IHNwYW46bnRoLWNoaWxkKDIpIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDMuNXB4O1xuICB9XG59XG5AbWVkaWEgKG1heC13aWR0aDogMzIwcHgpIHtcbiAgLmhvbWVfdGV4dCBzcGFuOm50aC1jaGlsZCgyKSB7XG4gICAgZm9udC1zaXplOiAxMHB4O1xuICAgIGxldHRlci1zcGFjaW5nOiAyLjVweDtcbiAgfVxufVxuLmhvbWVfdGV4dCAuaG9tZV9idG5zIHtcbiAgbWFyZ2luOiAzMHB4IGF1dG87XG59XG5AbWVkaWEgKG1heC13aWR0aDogMzIwcHgpIHtcbiAgLmhvbWVfdGV4dCAuaG9tZV9idG5zIHtcbiAgICBkaXNwbGF5OiAtbXMtZ3JpZDtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxufVxuLmhvbWVfdGV4dCAuaG9tZV9idG5zIC5idG4ge1xuICBwYWRkaW5nOiAxMHB4IDMzcHg7XG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XG4gIC1vLXRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcbn1cbi5ob21lX3RleHQgLmhvbWVfYnRucyAuYnRuOmZpcnN0LWNoaWxkIHtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDMyMHB4KSB7XG4gIC5ob21lX3RleHQgLmhvbWVfYnRucyAuYnRuOmZpcnN0LWNoaWxkIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgfVxufVxuLmhvbWVfdGV4dCAuaG9tZV9idG5zIC5idG46bGFzdC1jaGlsZCB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IDJweCBzb2xpZCAjZmRhMzAwO1xufVxuLmhvbWVfdGV4dCAuaG9tZV9idG5zIC5idG46bGFzdC1jaGlsZDpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmZGEzMDA7XG59XG4uaG9tZV90ZXh0IC5ob21lX2J0bnMgLmJ0bjpsYXN0LWNoaWxkOmZvY3VzIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogMnB4IHNvbGlkICNmZGEzMDA7XG59XG5AbWVkaWEgKG1heC13aWR0aDogMzIwcHgpIHtcbiAgLmhvbWVfdGV4dCAuaG9tZV9idG5zIC5idG4ge1xuICAgIG1hcmdpbjogMDtcbiAgfVxufSIsIiR3aGl0ZUNvbG9yOiAjZmZmO1xyXG4kbWFpbkNvbG9yOiAjZmRhMzAwO1xyXG4iXX0= */");

/***/ }),

/***/ "./src/app/components/front/home/home.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/front/home/home.component.ts ***!
  \*********************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngx_wow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-wow */ "./node_modules/ngx-wow/esm2015/ngx-wow.js");
/* harmony import */ var _shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../shared/shared-service */ "./src/app/components/shared/shared-service.ts");




let HomeComponent = class HomeComponent {
    constructor(wowService, SharedService) {
        this.wowService = wowService;
        this.SharedService = SharedService;
        this.nav = true;
        this.myInnerHeight = window.innerHeight - 149;
    }
    ngOnInit() {
        this.wowService.init();
        if (window.innerWidth <= 767) {
            this.myInnerHeight = window.innerHeight - 149;
        }
    }
    onResize(event) {
        if (event.target.innerWidth <= 767) {
            this.myInnerHeight = window.innerHeight - 149;
        }
    }
};
HomeComponent.ctorParameters = () => [
    { type: ngx_wow__WEBPACK_IMPORTED_MODULE_2__["NgwWowService"] },
    { type: _shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('window:resize', ['$event'])
], HomeComponent.prototype, "onResize", null);
HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-home",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./home.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/home/home.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./home.component.scss */ "./src/app/components/front/home/home.component.scss")).default]
    })
], HomeComponent);



/***/ }),

/***/ "./src/app/components/front/note/note.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/components/front/note/note.component.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".note {\n  position: fixed;\n  top: 18%;\n  right: 20px;\n  background: #000000b3;\n  padding: 15px;\n  border-radius: 4px;\n  text-transform: capitalize;\n  display: flex;\n  width: 325px;\n  box-shadow: 0 0 5px #000;\n  font-weight: 600;\n}\n@media (max-width: 767px) {\n  .note {\n    display: none;\n  }\n}\n.note p {\n  margin: 0;\n}\n.note .cloc {\n  position: absolute;\n  right: 20px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9mcm9udC9ub3RlL0Q6XFxDdkFuZy9zcmNcXGFwcFxcY29tcG9uZW50c1xcZnJvbnRcXG5vdGVcXG5vdGUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvbm90ZS9ub3RlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0EscUJBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQkFBQTtFQUdBLGFBQUE7RUFDQSxZQUFBO0VBRUEsd0JBQUE7RUFDQSxnQkFBQTtBQ0NKO0FEQUk7RUFmSjtJQWdCUSxhQUFBO0VDR047QUFDRjtBREZJO0VBQ0ksU0FBQTtBQ0lSO0FERkk7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FDSVIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2Zyb250L25vdGUvbm90ZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ub3RlIHtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogMTglO1xyXG4gICAgcmlnaHQ6IDIwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMDAwMDAwYjM7XHJcbiAgICBwYWRkaW5nOiAxNXB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIHdpZHRoOiAzMjVweDtcclxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDVweCAjMDAwO1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDVweCAjMDAwO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbiAgICBwIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICB9XHJcbiAgICAuY2xvYyB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHJpZ2h0OiAyMHB4O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH1cclxufSIsIi5ub3RlIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDE4JTtcbiAgcmlnaHQ6IDIwcHg7XG4gIGJhY2tncm91bmQ6ICMwMDAwMDBiMztcbiAgcGFkZGluZzogMTVweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICBkaXNwbGF5OiBmbGV4O1xuICB3aWR0aDogMzI1cHg7XG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDVweCAjMDAwO1xuICBib3gtc2hhZG93OiAwIDAgNXB4ICMwMDA7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLm5vdGUge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cbi5ub3RlIHAge1xuICBtYXJnaW46IDA7XG59XG4ubm90ZSAuY2xvYyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDIwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/components/front/note/note.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/front/note/note.component.ts ***!
  \*********************************************************/
/*! exports provided: NoteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoteComponent", function() { return NoteComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngx_wow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-wow */ "./node_modules/ngx-wow/esm2015/ngx-wow.js");



let NoteComponent = class NoteComponent {
    constructor(wowService) {
        this.wowService = wowService;
    }
    ngOnInit() {
        this.wowService.init();
        this.show = true;
        if (localStorage.getItem('hideNote')) {
            this.show = false;
        }
        setTimeout(() => {
            this.show = false;
            let Time_now = new Date().getTime();
            localStorage.setItem("hideNote", String(Time_now));
        }, 4000);
    }
    removeNote() {
        this.show = false;
    }
};
NoteComponent.ctorParameters = () => [
    { type: ngx_wow__WEBPACK_IMPORTED_MODULE_2__["NgwWowService"] }
];
NoteComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-note',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./note.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/note/note.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./note.component.scss */ "./src/app/components/front/note/note.component.scss")).default]
    })
], NoteComponent);



/***/ }),

/***/ "./src/app/components/front/numbers/numbers.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/components/front/numbers/numbers.component.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".numbers {\n  position: fixed;\n  bottom: 5%;\n  right: 3%;\n  transform: translate(-3%, -5%);\n  background: rgba(0, 0, 0, 0.1);\n  padding: 5px 10px;\n  border-radius: 5px;\n}\n@media (max-width: 767px) {\n  .numbers {\n    display: none;\n  }\n}\n.numbers span {\n  display: inline-block;\n  font-size: 4vw;\n  border-bottom: 4px solid #fff;\n}\n@media (max-width: 767px) {\n  .numbers span {\n    font-size: 35px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9mcm9udC9udW1iZXJzL0Q6XFxDdkFuZy9zcmNcXGFwcFxcY29tcG9uZW50c1xcZnJvbnRcXG51bWJlcnNcXG51bWJlcnMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvbnVtYmVycy9udW1iZXJzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksZUFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBR0EsOEJBQUE7RUFDQSw4QkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUNBSjtBRENJO0VBVko7SUFXUSxhQUFBO0VDRU47QUFDRjtBRERJO0VBQ0kscUJBQUE7RUFDQSxjQUFBO0VBQ0EsNkJBQUE7QUNHUjtBREZRO0VBSko7SUFLUSxlQUFBO0VDS1Y7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvbnVtYmVycy9udW1iZXJzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uLy4uL3Njc3MvdmFyaWFibGVzXCI7XHJcbi5udW1iZXJzIHtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIGJvdHRvbTogNSU7XHJcbiAgICByaWdodDogMyU7XHJcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC0zJSwgLTUlKTtcclxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMyUsIC01JSk7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMyUsIC01JSk7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbiAgICBzcGFuIHtcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgZm9udC1zaXplOiA0dnc7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogNHB4IHNvbGlkICR3aGl0ZUNvbG9yO1xyXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDM1cHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLm51bWJlcnMge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJvdHRvbTogNSU7XG4gIHJpZ2h0OiAzJTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMyUsIC01JSk7XG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMyUsIC01JSk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0zJSwgLTUlKTtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjEpO1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5udW1iZXJzIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG59XG4ubnVtYmVycyBzcGFuIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXNpemU6IDR2dztcbiAgYm9yZGVyLWJvdHRvbTogNHB4IHNvbGlkICNmZmY7XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLm51bWJlcnMgc3BhbiB7XG4gICAgZm9udC1zaXplOiAzNXB4O1xuICB9XG59Il19 */");

/***/ }),

/***/ "./src/app/components/front/numbers/numbers.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/front/numbers/numbers.component.ts ***!
  \***************************************************************/
/*! exports provided: NumbersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumbersComponent", function() { return NumbersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let NumbersComponent = class NumbersComponent {
    constructor() { }
    ngOnInit() {
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], NumbersComponent.prototype, "number", void 0);
NumbersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-numbers',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./numbers.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/numbers/numbers.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./numbers.component.scss */ "./src/app/components/front/numbers/numbers.component.scss")).default]
    })
], NumbersComponent);



/***/ }),

/***/ "./src/app/components/front/portfolio/portfolio.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/components/front/portfolio/portfolio.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".portfollio .itemPortfolio {\n  position: relative;\n  overflow: hidden;\n  margin-bottom: 15px;\n  transition: all 0.3s ease-in-out;\n  border-radius: 4px;\n}\n@media (max-width: 767px) {\n  .portfollio .itemPortfolio {\n    margin-bottom: 10px;\n  }\n}\n.portfollio .itemPortfolio img {\n  height: 190px;\n  z-index: 6;\n}\n@media (max-width: 991.9px) {\n  .portfollio .itemPortfolio img {\n    height: 140px;\n    margin: auto;\n  }\n}\n.portfollio .itemPortfolio img.ng-lazyloaded {\n  -webkit-animation-name: fadeIn;\n  -webkit-animation-duration: 0.3s;\n  animation-name: fadeIn;\n  animation-duration: 0.3s;\n}\n.portfollio .itemPortfolio:hover {\n  transform: scale(1.05);\n  cursor: pointer;\n}\n.portfollio .itemPortfolio:hover .img_overlay {\n  opacity: 1;\n}\n.portfollio .itemPortfolio .img_overlay {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  opacity: 0;\n  z-index: 9;\n  transition: all 0.3s;\n}\n.portfollio .itemPortfolio .img_overlay span {\n  width: 50px;\n  height: 50px;\n  border-radius: 50px;\n  background-color: rgba(0, 0, 0, 0.6);\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  text-align: center;\n  line-height: 50px;\n  font-size: 18px;\n  color: #fda300;\n  border: 1px solid #fda300;\n}\n.portfollio .itemPortfolio_title h5 {\n  text-align: center;\n  font-weight: 600;\n  margin: 5px 0 35px;\n  text-transform: capitalize;\n  transition: all 0.3s ease-in-out;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.portfollio .itemPortfolio_title h5:hover {\n  cursor: pointer;\n  color: #fda300;\n  transform: scale(1.1);\n  text-decoration: underline;\n}\n@media (max-width: 991.9px) {\n  .portfollio .itemPortfolio_title h5 {\n    font-size: 12px;\n  }\n}\n@media (max-width: 767px) {\n  .portfollio .itemPortfolio_title h5 {\n    margin: 5px 0 20px;\n    font-size: 10px;\n    font-weight: 900;\n  }\n}\n.portfollio .loadMore,\n.portfollio .loadMore:focus {\n  border: 2px solid #fda300;\n  background: transparent;\n  text-align: center;\n  display: block;\n  margin: 15px auto 0px;\n  outline: none;\n  color: #fff;\n  transition: all 0.3s ease-in-out;\n}\n.portfollio .loadMore:hover,\n.portfollio .loadMore:focus:hover {\n  background: #fda300;\n}\n.loader {\n  width: 100%;\n  height: 175px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 10px;\n  background: rgba(0, 0, 0, 0.3);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9mcm9udC9wb3J0Zm9saW8vRDpcXEN2QW5nL3NyY1xcYXBwXFxjb21wb25lbnRzXFxmcm9udFxccG9ydGZvbGlvXFxwb3J0Zm9saW8uY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvcG9ydGZvbGlvL3BvcnRmb2xpby5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9mcm9udC9wb3J0Zm9saW8vRDpcXEN2QW5nL3NyY1xcYXBwXFxzY3NzXFxfdmFyaWFibGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUk7RUFDSSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQ0FBQTtFQUNBLGtCQUFBO0FDRFI7QURFUTtFQU5KO0lBT1EsbUJBQUE7RUNDVjtBQUNGO0FEQVE7RUFDSSxhQUFBO0VBQ0EsVUFBQTtBQ0VaO0FERFk7RUFISjtJQUlXLGFBQUE7SUFDQSxZQUFBO0VDSWpCO0FBQ0Y7QURBUTtFQUNJLDhCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxzQkFBQTtFQUNBLHdCQUFBO0FDRVo7QURBUTtFQUNJLHNCQUFBO0VBQ0EsZUFBQTtBQ0VaO0FERFk7RUFDSSxVQUFBO0FDR2hCO0FEQVE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLE1BQUE7RUFDQSxvQ0FBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBQ0Esb0JBQUE7QUNFWjtBRERZO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLG9DQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLGdDQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxjRXZESjtFRndESSx5QkFBQTtBQ0doQjtBREVRO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMEJBQUE7RUFDQSxnQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQ0FaO0FEQ1k7RUFDSSxlQUFBO0VBQ0EsY0V4RUo7RUZ5RUkscUJBQUE7RUFDQSwwQkFBQTtBQ0NoQjtBRENZO0VBZko7SUFnQlEsZUFBQTtFQ0VkO0FBQ0Y7QUREWTtFQWxCSjtJQW1CUSxrQkFBQTtJQUNBLGVBQUE7SUFDQSxnQkFBQTtFQ0lkO0FBQ0Y7QURBSTs7RUFFSSx5QkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7RUFDQSxhQUFBO0VBQ0EsV0VoR0s7RUZxR0wsZ0NBQUE7QUNFUjtBRERROztFQUNJLG1CRXRHQTtBRDBHWjtBRENBO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7QUNFSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvcG9ydGZvbGlvL3BvcnRmb2xpby5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi8uLi8uLi9zY3NzL3ZhcmlhYmxlc1wiO1xyXG4ucG9ydGZvbGxpbyB7XHJcbiAgICAuaXRlbVBvcnRmb2xpbyB7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGltZyB7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTkwcHg7XHJcbiAgICAgICAgICAgIHotaW5kZXg6IDY7XHJcbiAgICAgICAgICAgIEBtZWRpYShtYXgtd2lkdGg6IDk5MS45cHgpIHtcclxuICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTQwcHg7XHJcbiAgICAgICAgICAgICAgICAgICBtYXJnaW46IGF1dG87XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaW1nLm5nLWxhenlsb2FkZWQge1xyXG4gICAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBmYWRlSW47XHJcbiAgICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjNzO1xyXG4gICAgICAgICAgICBhbmltYXRpb24tbmFtZTogZmFkZUluO1xyXG4gICAgICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IDAuM3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgICAgIC5pbWdfb3ZlcmxheSB7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5pbWdfb3ZlcmxheSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgbGVmdDogMDtcclxuICAgICAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgICAgICAgIHotaW5kZXg6IDk7XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzO1xyXG4gICAgICAgICAgICBzcGFuIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MHB4O1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTBweDtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgICAgIGxlZnQ6IDUwJTtcclxuICAgICAgICAgICAgICAgIHRvcDogNTAlO1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogNTBweDtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAkbWFpbkNvbG9yO1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgJG1haW5Db2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC5pdGVtUG9ydGZvbGlvX3RpdGxlIHtcclxuICAgICAgICBoNSB7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICAgICAgbWFyZ2luOiA1cHggMCAzNXB4O1xyXG4gICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgICAgICAgICAmOmhvdmVyIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAkbWFpbkNvbG9yO1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xyXG4gICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQG1lZGlhKG1heC13aWR0aDogOTkxLjlweCkge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4OyAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luOiA1cHggMCAyMHB4O1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDkwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLmxvYWRNb3JlLFxyXG4gICAgLmxvYWRNb3JlOmZvY3VzIHtcclxuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAkbWFpbkNvbG9yO1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICBtYXJnaW46IDE1cHggYXV0byAwcHg7XHJcbiAgICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgICAgICBjb2xvcjogJHdoaXRlQ29sb3I7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcclxuICAgICAgICAtbW96LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgIC1tcy10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcclxuICAgICAgICAtby10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcclxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcclxuICAgICAgICAmOmhvdmVyIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogJG1haW5Db2xvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi5sb2FkZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDE3NXB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbn1cclxuXHJcbiIsIi5wb3J0Zm9sbGlvIC5pdGVtUG9ydGZvbGlvIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5wb3J0Zm9sbGlvIC5pdGVtUG9ydGZvbGlvIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICB9XG59XG4ucG9ydGZvbGxpbyAuaXRlbVBvcnRmb2xpbyBpbWcge1xuICBoZWlnaHQ6IDE5MHB4O1xuICB6LWluZGV4OiA2O1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDk5MS45cHgpIHtcbiAgLnBvcnRmb2xsaW8gLml0ZW1Qb3J0Zm9saW8gaW1nIHtcbiAgICBoZWlnaHQ6IDE0MHB4O1xuICAgIG1hcmdpbjogYXV0bztcbiAgfVxufVxuLnBvcnRmb2xsaW8gLml0ZW1Qb3J0Zm9saW8gaW1nLm5nLWxhenlsb2FkZWQge1xuICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBmYWRlSW47XG4gIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjNzO1xuICBhbmltYXRpb24tbmFtZTogZmFkZUluO1xuICBhbmltYXRpb24tZHVyYXRpb246IDAuM3M7XG59XG4ucG9ydGZvbGxpbyAuaXRlbVBvcnRmb2xpbzpob3ZlciB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5wb3J0Zm9sbGlvIC5pdGVtUG9ydGZvbGlvOmhvdmVyIC5pbWdfb3ZlcmxheSB7XG4gIG9wYWNpdHk6IDE7XG59XG4ucG9ydGZvbGxpbyAuaXRlbVBvcnRmb2xpbyAuaW1nX292ZXJsYXkge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICBvcGFjaXR5OiAwO1xuICB6LWluZGV4OiA5O1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbn1cbi5wb3J0Zm9sbGlvIC5pdGVtUG9ydGZvbGlvIC5pbWdfb3ZlcmxheSBzcGFuIHtcbiAgd2lkdGg6IDUwcHg7XG4gIGhlaWdodDogNTBweDtcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjYpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDUwJTtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGxpbmUtaGVpZ2h0OiA1MHB4O1xuICBmb250LXNpemU6IDE4cHg7XG4gIGNvbG9yOiAjZmRhMzAwO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZmRhMzAwO1xufVxuLnBvcnRmb2xsaW8gLml0ZW1Qb3J0Zm9saW9fdGl0bGUgaDUge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbjogNXB4IDAgMzVweDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cbi5wb3J0Zm9sbGlvIC5pdGVtUG9ydGZvbGlvX3RpdGxlIGg1OmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBjb2xvcjogI2ZkYTMwMDtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA5OTEuOXB4KSB7XG4gIC5wb3J0Zm9sbGlvIC5pdGVtUG9ydGZvbGlvX3RpdGxlIGg1IHtcbiAgICBmb250LXNpemU6IDEycHg7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAucG9ydGZvbGxpbyAuaXRlbVBvcnRmb2xpb190aXRsZSBoNSB7XG4gICAgbWFyZ2luOiA1cHggMCAyMHB4O1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICBmb250LXdlaWdodDogOTAwO1xuICB9XG59XG4ucG9ydGZvbGxpbyAubG9hZE1vcmUsXG4ucG9ydGZvbGxpbyAubG9hZE1vcmU6Zm9jdXMge1xuICBib3JkZXI6IDJweCBzb2xpZCAjZmRhMzAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luOiAxNXB4IGF1dG8gMHB4O1xuICBvdXRsaW5lOiBub25lO1xuICBjb2xvcjogI2ZmZjtcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbiAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbiAgLW1zLXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xuICAtby10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG59XG4ucG9ydGZvbGxpbyAubG9hZE1vcmU6aG92ZXIsXG4ucG9ydGZvbGxpbyAubG9hZE1vcmU6Zm9jdXM6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZmRhMzAwO1xufVxuXG4ubG9hZGVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTc1cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMyk7XG59IiwiJHdoaXRlQ29sb3I6ICNmZmY7XHJcbiRtYWluQ29sb3I6ICNmZGEzMDA7XHJcbiJdfQ== */");

/***/ }),

/***/ "./src/app/components/front/portfolio/portfolio.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/front/portfolio/portfolio.component.ts ***!
  \*******************************************************************/
/*! exports provided: PortfolioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PortfolioComponent", function() { return PortfolioComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm2015/ngx-bootstrap-modal.js");
/* harmony import */ var _Service_Portfolio_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Service/Portfolio-service */ "./src/app/components/front/portfolio/Service/Portfolio-service.ts");




let PortfolioComponent = class PortfolioComponent {
    constructor(modalService, portfolioService) {
        this.modalService = modalService;
        this.portfolioService = portfolioService;
        this.show = 6;
        this.Portfolios = [];
        this.error = "";
    }
    ngOnInit() {
        this.portfolioService.getAll().subscribe((res) => {
            this.Portfolios = res;
        }, err => {
            this.error = err;
        });
    }
    openModal(template) {
        this.modalRef = this.modalService.show(template);
    }
    onLoadMore() {
        setTimeout(() => {
            this.show += 3;
        }, 200);
    }
};
PortfolioComponent.ctorParameters = () => [
    { type: ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__["BsModalService"] },
    { type: _Service_Portfolio_service__WEBPACK_IMPORTED_MODULE_3__["PortfolioService"] }
];
PortfolioComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-portfolio",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./portfolio.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/portfolio/portfolio.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./portfolio.component.scss */ "./src/app/components/front/portfolio/portfolio.component.scss")).default]
    })
], PortfolioComponent);



/***/ }),

/***/ "./src/app/components/front/social-icons/social-icons.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/components/front/social-icons/social-icons.component.scss ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".social_ico {\n  position: fixed;\n  top: 50%;\n  left: 0;\n  transform: translate(-2%, -50%);\n  padding: 0px 10px;\n  border-radius: 4px;\n  z-index: 8;\n}\n@media (max-width: 1260px) {\n  .social_ico {\n    padding: 0px 7px;\n  }\n}\n@media (max-width: 767px) {\n  .social_ico {\n    top: 33px;\n    left: auto;\n    right: 0px;\n    transform: translate(0%, 0);\n    position: absolute;\n  }\n}\n@media (max-width: 360px) {\n  .social_ico {\n    top: 77px;\n  }\n}\n@media (max-width: 240px) {\n  .social_ico {\n    top: 70px;\n  }\n}\n.social_ico ul {\n  margin: 0;\n}\n@media (max-width: 767px) {\n  .social_ico ul {\n    display: flex;\n  }\n}\n.social_ico li {\n  margin: 20px 0px;\n}\n@media (max-width: 767px) {\n  .social_ico li {\n    margin: 0px 10px;\n  }\n}\n@media (max-width: 240px) {\n  .social_ico li {\n    margin: 0px 5px;\n  }\n}\n.social_ico li a {\n  color: #22272b;\n  text-decoration: none;\n}\n.social_ico li a .fa {\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n  display: block;\n  font-size: 20px;\n  border-radius: 50%;\n  transition: all 0.2s ease-in-out;\n}\n@media (max-width: 1260px) {\n  .social_ico li a .fa {\n    width: 30px;\n    height: 30px;\n    line-height: 30px;\n    font-size: 17px;\n  }\n}\n@media (max-width: 767px) {\n  .social_ico li a .fa {\n    width: 25px;\n    height: 25px;\n    line-height: 25px;\n    font-size: 15px;\n  }\n}\n@media (max-width: 240px) {\n  .social_ico li a .fa {\n    width: 19px;\n    height: 19px;\n    line-height: 19px;\n    font-size: 13px;\n  }\n}\n.social_ico li a .fa:hover {\n  transform: scale(1.1);\n}\n.social_ico li a .fa-linkedin {\n  background-color: #0077b5;\n  color: #fff;\n}\n.social_ico li a .fa-behance {\n  background-color: #1871e5;\n  color: #fff;\n}\n.social_ico li a .fa-whatsapp {\n  background-color: #54cc61;\n  color: #fff;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9mcm9udC9zb2NpYWwtaWNvbnMvRDpcXEN2QW5nL3NyY1xcYXBwXFxjb21wb25lbnRzXFxmcm9udFxcc29jaWFsLWljb25zXFxzb2NpYWwtaWNvbnMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvc29jaWFsLWljb25zL3NvY2lhbC1pY29ucy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9mcm9udC9zb2NpYWwtaWNvbnMvRDpcXEN2QW5nL3NyY1xcYXBwXFxzY3NzXFxfdmFyaWFibGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxlQUFBO0VBQ0EsUUFBQTtFQUNBLE9BQUE7RUFHQSwrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0FDQUo7QURDSTtFQVZKO0lBV1EsZ0JBQUE7RUNFTjtBQUNGO0FEREk7RUFiSjtJQWNRLFNBQUE7SUFDQSxVQUFBO0lBQ0EsVUFBQTtJQUdBLDJCQUFBO0lBQ0Esa0JBQUE7RUNJTjtBQUNGO0FESEk7RUF0Qko7SUF1QlEsU0FBQTtFQ01OO0FBQ0Y7QURMSTtFQXpCSjtJQTBCUSxTQUFBO0VDUU47QUFDRjtBRFBJO0VBQ0ksU0FBQTtBQ1NSO0FEUlE7RUFGSjtJQUtRLGFBQUE7RUNXVjtBQUNGO0FEVEk7RUFDSSxnQkFBQTtBQ1dSO0FEVlE7RUFGSjtJQUdRLGdCQUFBO0VDYVY7QUFDRjtBRFpRO0VBTEo7SUFNUSxlQUFBO0VDZVY7QUFDRjtBRGRRO0VBQ0ksY0FBQTtFQUNBLHFCQUFBO0FDZ0JaO0FEZlk7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBR0EsZ0NBQUE7QUNpQmhCO0FEaEJnQjtFQVhKO0lBWVEsV0FBQTtJQUNBLFlBQUE7SUFDQSxpQkFBQTtJQUNBLGVBQUE7RUNtQmxCO0FBQ0Y7QURsQmdCO0VBakJKO0lBa0JRLFdBQUE7SUFDQSxZQUFBO0lBQ0EsaUJBQUE7SUFDQSxlQUFBO0VDcUJsQjtBQUNGO0FEcEJnQjtFQXZCSjtJQXdCUSxXQUFBO0lBQ0EsWUFBQTtJQUNBLGlCQUFBO0lBQ0EsZUFBQTtFQ3VCbEI7QUFDRjtBRHRCZ0I7RUFHSSxxQkFBQTtBQ3dCcEI7QURyQlk7RUFDSSx5QkFBQTtFQUNBLFdFckZIO0FENEdiO0FEckJZO0VBQ0kseUJBQUE7RUFDQSxXRXpGSDtBRGdIYjtBRHJCWTtFQUNJLHlCQUFBO0VBQ0EsV0U3Rkg7QURvSGIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2Zyb250L3NvY2lhbC1pY29ucy9zb2NpYWwtaWNvbnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vLi4vLi4vc2Nzcy92YXJpYWJsZXNcIjtcclxuLnNvY2lhbF9pY28ge1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMiUsIC01MCUpO1xyXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKC0yJSwgLTUwJSk7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMiUsIC01MCUpO1xyXG4gICAgcGFkZGluZzogMHB4IDEwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICB6LWluZGV4OiA4O1xyXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDEyNjBweCkge1xyXG4gICAgICAgIHBhZGRpbmc6IDBweCA3cHg7XHJcbiAgICB9XHJcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcclxuICAgICAgICB0b3A6IDMzcHg7XHJcbiAgICAgICAgbGVmdDogYXV0bztcclxuICAgICAgICByaWdodDogMHB4O1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCUsIDApO1xyXG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwJSwgMCk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCUsIDApO1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIH1cclxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiAzNjBweCkge1xyXG4gICAgICAgIHRvcDogNzdweDtcclxuICAgIH1cclxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiAyNDBweCkge1xyXG4gICAgICAgIHRvcDogNzBweDtcclxuICAgIH1cclxuICAgIHVsIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsaSB7XHJcbiAgICAgICAgbWFyZ2luOiAyMHB4IDBweDtcclxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcclxuICAgICAgICAgICAgbWFyZ2luOiAwcHggMTBweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDI0MHB4KSB7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMHB4IDVweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgYSB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMjIyNzJiO1xyXG4gICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICAgICAgICAgIC5mYSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzRweDtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMzRweDtcclxuICAgICAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAzNHB4O1xyXG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgICAgICAgICAgLW8tdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcclxuICAgICAgICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiAxMjYwcHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzBweDtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDMwcHg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxN3B4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI1cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyNXB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiAyNDBweCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxOXB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTlweDtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMTlweDtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAmOmhvdmVyIHtcclxuICAgICAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4xKTtcclxuICAgICAgICAgICAgICAgICAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAuZmEtbGlua2VkaW4ge1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNzdiNTtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAkd2hpdGVDb2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAuZmEtYmVoYW5jZSB7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTg3MWU1O1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICR3aGl0ZUNvbG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5mYS13aGF0c2FwcCB7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTRjYzYxO1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICR3aGl0ZUNvbG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLnNvY2lhbF9pY28ge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiAwO1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC0yJSwgLTUwJSk7XG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMiUsIC01MCUpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMiUsIC01MCUpO1xuICBwYWRkaW5nOiAwcHggMTBweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICB6LWluZGV4OiA4O1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDEyNjBweCkge1xuICAuc29jaWFsX2ljbyB7XG4gICAgcGFkZGluZzogMHB4IDdweDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5zb2NpYWxfaWNvIHtcbiAgICB0b3A6IDMzcHg7XG4gICAgbGVmdDogYXV0bztcbiAgICByaWdodDogMHB4O1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCUsIDApO1xuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwJSwgMCk7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCUsIDApO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDM2MHB4KSB7XG4gIC5zb2NpYWxfaWNvIHtcbiAgICB0b3A6IDc3cHg7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiAyNDBweCkge1xuICAuc29jaWFsX2ljbyB7XG4gICAgdG9wOiA3MHB4O1xuICB9XG59XG4uc29jaWFsX2ljbyB1bCB7XG4gIG1hcmdpbjogMDtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAuc29jaWFsX2ljbyB1bCB7XG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XG4gICAgZGlzcGxheTogZmxleDtcbiAgfVxufVxuLnNvY2lhbF9pY28gbGkge1xuICBtYXJnaW46IDIwcHggMHB4O1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5zb2NpYWxfaWNvIGxpIHtcbiAgICBtYXJnaW46IDBweCAxMHB4O1xuICB9XG59XG5AbWVkaWEgKG1heC13aWR0aDogMjQwcHgpIHtcbiAgLnNvY2lhbF9pY28gbGkge1xuICAgIG1hcmdpbjogMHB4IDVweDtcbiAgfVxufVxuLnNvY2lhbF9pY28gbGkgYSB7XG4gIGNvbG9yOiAjMjIyNzJiO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG4uc29jaWFsX2ljbyBsaSBhIC5mYSB7XG4gIHdpZHRoOiAzNHB4O1xuICBoZWlnaHQ6IDM0cHg7XG4gIGxpbmUtaGVpZ2h0OiAzNHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcbiAgLW8tdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDEyNjBweCkge1xuICAuc29jaWFsX2ljbyBsaSBhIC5mYSB7XG4gICAgd2lkdGg6IDMwcHg7XG4gICAgaGVpZ2h0OiAzMHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xuICAgIGZvbnQtc2l6ZTogMTdweDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5zb2NpYWxfaWNvIGxpIGEgLmZhIHtcbiAgICB3aWR0aDogMjVweDtcbiAgICBoZWlnaHQ6IDI1cHg7XG4gICAgbGluZS1oZWlnaHQ6IDI1cHg7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICB9XG59XG5AbWVkaWEgKG1heC13aWR0aDogMjQwcHgpIHtcbiAgLnNvY2lhbF9pY28gbGkgYSAuZmEge1xuICAgIHdpZHRoOiAxOXB4O1xuICAgIGhlaWdodDogMTlweDtcbiAgICBsaW5lLWhlaWdodDogMTlweDtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gIH1cbn1cbi5zb2NpYWxfaWNvIGxpIGEgLmZhOmhvdmVyIHtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG4gIC1tcy10cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcbn1cbi5zb2NpYWxfaWNvIGxpIGEgLmZhLWxpbmtlZGluIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwNzdiNTtcbiAgY29sb3I6ICNmZmY7XG59XG4uc29jaWFsX2ljbyBsaSBhIC5mYS1iZWhhbmNlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE4NzFlNTtcbiAgY29sb3I6ICNmZmY7XG59XG4uc29jaWFsX2ljbyBsaSBhIC5mYS13aGF0c2FwcCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1NGNjNjE7XG4gIGNvbG9yOiAjZmZmO1xufSIsIiR3aGl0ZUNvbG9yOiAjZmZmO1xyXG4kbWFpbkNvbG9yOiAjZmRhMzAwO1xyXG4iXX0= */");

/***/ }),

/***/ "./src/app/components/front/social-icons/social-icons.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/components/front/social-icons/social-icons.component.ts ***!
  \*************************************************************************/
/*! exports provided: SocialIconsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialIconsComponent", function() { return SocialIconsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let SocialIconsComponent = class SocialIconsComponent {
    constructor() { }
    ngOnInit() {
    }
};
SocialIconsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-social-icons',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./social-icons.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/social-icons/social-icons.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./social-icons.component.scss */ "./src/app/components/front/social-icons/social-icons.component.scss")).default]
    })
], SocialIconsComponent);



/***/ }),

/***/ "./src/app/components/front/title/title.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/components/front/title/title.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mainTitle {\n  display: block;\n  font-size: 53px;\n  font-weight: 600;\n  margin-bottom: 40px;\n  color: #fda300;\n  opacity: 0;\n  position: relative;\n  top: -60px;\n}\n@media (max-width: 767px) {\n  .mainTitle {\n    font-size: 35px;\n    margin-bottom: 30px;\n    text-align: center;\n    position: relative;\n    z-index: 111;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9mcm9udC90aXRsZS9EOlxcQ3ZBbmcvc3JjXFxhcHBcXGNvbXBvbmVudHNcXGZyb250XFx0aXRsZVxcdGl0bGUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvdGl0bGUvRDpcXEN2QW5nL3NyY1xcYXBwXFxzY3NzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvdGl0bGUvdGl0bGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQ0xRO0VETVIsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtBRUFKO0FGQ0k7RUFUSjtJQVVRLGVBQUE7SUFDQSxtQkFBQTtJQUNBLGtCQUFBO0lBQ0Esa0JBQUE7SUFDQSxZQUFBO0VFRU47QUFDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZnJvbnQvdGl0bGUvdGl0bGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vLi4vLi4vc2Nzcy92YXJpYWJsZXNcIjtcclxuLm1haW5UaXRsZSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGZvbnQtc2l6ZTogNTNweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG4gICAgY29sb3I6ICRtYWluQ29sb3I7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgdG9wOiAtNjBweDtcclxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMzVweDtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgei1pbmRleDogMTExO1xyXG4gICAgfVxyXG59IiwiJHdoaXRlQ29sb3I6ICNmZmY7XHJcbiRtYWluQ29sb3I6ICNmZGEzMDA7XHJcbiIsIi5tYWluVGl0bGUge1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiA1M3B4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xuICBjb2xvcjogI2ZkYTMwMDtcbiAgb3BhY2l0eTogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6IC02MHB4O1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5tYWluVGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMzVweDtcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgei1pbmRleDogMTExO1xuICB9XG59Il19 */");

/***/ }),

/***/ "./src/app/components/front/title/title.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/front/title/title.component.ts ***!
  \***********************************************************/
/*! exports provided: TitleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TitleComponent", function() { return TitleComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var gsap_all__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap/all */ "./node_modules/gsap/all.js");



const plugins = [gsap_all__WEBPACK_IMPORTED_MODULE_2__["CSSPlugin"]];
let TitleComponent = class TitleComponent {
    constructor() {
        this.menu = new gsap_all__WEBPACK_IMPORTED_MODULE_2__["TimelineLite"]({ paused: true, reversed: true });
    }
    ngOnInit() {
        this.createMenuAnim();
        this.menu.reversed() ? this.menu.play() : this.menu.reverse();
    }
    createMenuAnim() {
        this.menu.to(".mainTitle", 2, { opacity: 1, top: 0, ease: "Elastic.easeOut", delay: 1 }, 0);
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], TitleComponent.prototype, "title", void 0);
TitleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-title",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./title.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/front/title/title.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./title.component.scss */ "./src/app/components/front/title/title.component.scss")).default]
    })
], TitleComponent);



/***/ }),

/***/ "./src/app/pipe/reverse-pipe.ts":
/*!**************************************!*\
  !*** ./src/app/pipe/reverse-pipe.ts ***!
  \**************************************/
/*! exports provided: ReversePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReversePipe", function() { return ReversePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ReversePipe = class ReversePipe {
    transform(value) {
        if (!value)
            return;
        return value.reverse();
    }
};
ReversePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: "reverse"
    })
], ReversePipe);



/***/ })

}]);
//# sourceMappingURL=components-front-front-module-es2015.js.map