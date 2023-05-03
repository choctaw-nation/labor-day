/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./wp-content/themes/labor-day/src/js/fadeOnScroll.js":
/*!************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/fadeOnScroll.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ fadeIn; }
/* harmony export */ });
const sectionObserver = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.15
});
function reveal(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('fadeIn--hide');
  observer.unobserve(entry.target);
}

/**
 * 1. Select elements
 * 2. ForEach section, observe section
 */
function fadeIn(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    sectionObserver.observe(el);
    el.classList.add('fadeIn');
    el.classList.add('fadeIn--hide');
  });
}

/***/ }),

/***/ "./wp-content/themes/labor-day/src/styles/pages/history.scss":
/*!*******************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/styles/pages/history.scss ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*******************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/history.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_pages_history_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/pages/history.scss */ "./wp-content/themes/labor-day/src/styles/pages/history.scss");
/* harmony import */ var _fadeOnScroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fadeOnScroll */ "./wp-content/themes/labor-day/src/js/fadeOnScroll.js");


(0,_fadeOnScroll__WEBPACK_IMPORTED_MODULE_1__["default"])('.fadeIn');
}();
/******/ })()
;
//# sourceMappingURL=history.js.map