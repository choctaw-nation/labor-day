/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.scss */ "./src/styles/style.scss");
/* harmony import */ var _js_modules_Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/modules/Controller */ "./src/js/modules/Controller.js");


const search = new _js_modules_Controller__WEBPACK_IMPORTED_MODULE_1__["default"]();

/***/ }),

/***/ "./src/js/modules/Controller.js":
/*!**************************************!*\
  !*** ./src/js/modules/Controller.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Search; }
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model */ "./src/js/modules/Model.js");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View */ "./src/js/modules/View.js");


class Search {
  showFilters = false;
  constructor() {
    this.init();
  }
  init() {
    const filterToggle = document.getElementById('toggle-filters');
    if (!filterToggle) return;
    filterToggle.addEventListener('click', () => {
      setShowFilters();
      showFilters = !showFilters;
      updateButtonText(filterToggle, showFilters);
    });
    _Model__WEBPACK_IMPORTED_MODULE_0__["default"].getPosts().then(res => _View__WEBPACK_IMPORTED_MODULE_1__["default"].showResults(res));
  }
}

/***/ }),

/***/ "./src/js/modules/Model.js":
/*!*********************************!*\
  !*** ./src/js/modules/Model.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../search */ "./src/js/search.js");

/* harmony default export */ __webpack_exports__["default"] = (new class Model {
  getPosts = async function () {
    const variables = {
      first: Number(_search__WEBPACK_IMPORTED_MODULE_0__.POSTS_PER_PAGE),
      after: '',
      include: ['LARGE'],
      size: 'LARGE'
    };
    const query = `query NewQuery($first: Int!, $after: String, $include: [MediaItemSizeEnum]!, $size: MediaItemSizeEnum!){
		events(after: $after, first: $first) {
    		edges {
				node {
					eventId
					title(format: RENDERED)
					slug
					event_info {
						description
						info {
							day
							endTime
							startTime
						}
					}
					featuredImage {
						node {
							altText
							srcSet(size: $size)
							sizes(size:$size)
							mediaDetails {
								sizes(include: $include) {
									height
									width
									sourceUrl
								}
							}
						}
					}
					eventLocations {
						nodes {
							link
							name
						}
					}
					eventTypes {
						nodes {
							link
							name
						}
					}
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
  	}}`;
    const firstRequest = {
      query: query,
      variables: variables
    };
    const response = await fetch(`${_search__WEBPACK_IMPORTED_MODULE_0__.graphQL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(firstRequest)
    });
    const {
      data
    } = await response.json();
    return data;
  };
}());

/***/ }),

/***/ "./src/js/modules/View.js":
/*!********************************!*\
  !*** ./src/js/modules/View.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (new class View {
  constructor() {}
  /** Updates the visibility of the filters */
  setShowFilters() {
    const filtersContainer = document.querySelector('.cno-event-search-filters');
    filtersContainer.classList.toggle('hide');
  }
  /**
   *
   * @param {HTMLElement} button the toggle
   * @param {boolean} showFilters the filters' visibility (aka state)
   */
  updateButtonText(button, showFilters) {
    button.innerText = true === showFilters ? 'Hide Filters' : 'Show Filters';
  }
  theMarkup(data) {
    const {
      location,
      eventId,
      slug,
      title,
      event_info,
      altText,
      srcSet,
      size,
      sizes,
      type
    } = data;
    return `
	<article class="cno-event">
		<figure class="cno-event__image">
			<img width="${size.width}" height="${size.height}" src="" class="attachment-large size-large wp-post-image" alt="${altText}" decoding="async" srcset="${srcSet}" sizes="${sizes}">	</figure>
		<h2>${title}</h2>
		<aside class="event-meta">
			<div class="event-meta__day">
					<strong>When: </strong>${event_info.info.day}, September 1
			</div>
			<div class="event-meta__location">
				<strong>Where:</strong> <a href="${location[0].link}" rel="tag">${location[0].name}</a>
			</div>
			<div class="event-meta__start-time">
				<strong>Start Time:</strong> ${event_info.info.startTime}
			</div>
			${event_info.info.endTime ? `<div class="event-meta__end-time"><strong>End Time:</strong> ${event_info.info.endTime}</div>` : ''}
			<div class="event-meta__type">
				<strong>Event Type:</strong> <a href="${type[0].link}" rel="tag">${type[0].name}</a>
			</div>
		</aside>
		<div class="about">${event_info.description}</div>
		<div class="cno-event__buttons">
			<button class="btn__fill--primary" data-add-to-schedule="true" data-id="${eventId}">Add to Schedule</button>
			<a href="/events/${slug}/" class="btn__outline--primary">Learn More</a>
			<div class="cno-event-schedule-confirmation"></div>
		</div>
	</article>
`;
  }
  destructureData(data) {
    const {
      eventLocations: {
        nodes: location
      }
    } = data;
    const {
      eventTypes: {
        nodes: type
      }
    } = data;
    const {
      eventId,
      slug,
      title
    } = data;
    const {
      event_info
    } = data;
    const {
      featuredImage: {
        node: {
          altText,
          srcSet,
          mediaDetails,
          sizes
        }
      }
    } = data;
    const size = mediaDetails.sizes[0];
    return {
      location,
      type,
      sizes,
      eventId,
      slug,
      title,
      event_info,
      altText,
      srcSet,
      size
    };
  }
  showResults(data) {
    console.log(data);
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    data.events.edges.forEach(_ref => {
      let {
        node
      } = _ref;
      resultsContainer.insertAdjacentHTML('beforeend', this.theMarkup(this.destructureData(node)));
    });
  }
}());

/***/ }),

/***/ "./src/js/search.js":
/*!**************************!*\
  !*** ./src/js/search.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "POSTS_PER_PAGE": function() { return /* binding */ POSTS_PER_PAGE; },
/* harmony export */   "graphQL": function() { return /* binding */ graphQL; },
/* harmony export */   "rootUrl": function() { return /* binding */ rootUrl; }
/* harmony export */ });
// import React, { useState, useEffect } from '@wordpress/element';
const {
  postsPerPage: POSTS_PER_PAGE,
  rootUrl
} = cnoEventData;
const graphQL = `${rootUrl}/graphql`;

/***/ }),

/***/ "./src/styles/style.scss":
/*!*******************************!*\
  !*** ./src/styles/style.scss ***!
  \*******************************/
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcno_events"] = self["webpackChunkcno_events"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map