/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./wp-content/themes/labor-day/src/js/search/App.tsx":
/*!***********************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/search/App.tsx ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "POSTS_PER_PAGE": function() { return /* binding */ POSTS_PER_PAGE; },
/* harmony export */   "graphQL": function() { return /* binding */ graphQL; },
/* harmony export */   "rootUrl": function() { return /* binding */ rootUrl; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../spinner */ "./wp-content/themes/labor-day/src/js/spinner.jsx");
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Model */ "./wp-content/themes/labor-day/src/js/search/Model.js");
/* harmony import */ var _SearchBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SearchBar */ "./wp-content/themes/labor-day/src/js/search/SearchBar.jsx");
/* harmony import */ var _ResultsContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ResultsContainer */ "./wp-content/themes/labor-day/src/js/search/ResultsContainer.tsx");






const {
  postsPerPage: POSTS_PER_PAGE,
  rootUrl
} = cnoSiteData;
const graphQL = `${rootUrl}/graphql`;
function App() {
  const [isLoading, setisLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [posts, setPosts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [filters, setFilters] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _Model__WEBPACK_IMPORTED_MODULE_2__["default"].getPosts().then(_ref => {
      let {
        eventLocations,
        eventTypes,
        events,
        pageInfo
      } = _ref;
      setPosts(events.nodes);
      const filtersArr = [{
        type: {
          name: 'Event Types',
          filters: [...eventTypes.nodes]
        }
      }, {
        type: {
          name: 'Locations',
          filters: [...eventLocations.nodes]
        }
      }];
      setFilters(filtersArr);
      setisLoading(false);
    });
  }, []);
  const [checkedFilters, setCheckedFilters] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  if (isLoading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_spinner__WEBPACK_IMPORTED_MODULE_1__["default"], null));
  } else return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cno-search"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SearchBar__WEBPACK_IMPORTED_MODULE_3__["default"], {
    filters: filters,
    checkedFilters: checkedFilters,
    setCheckedFilters: setCheckedFilters
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResultsContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
    posts: posts,
    checkedFilters: checkedFilters
  })));
}
const root = document.getElementById('app');
if (root) (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(root).render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(App, null));

/***/ }),

/***/ "./wp-content/themes/labor-day/src/js/search/Model.js":
/*!************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/search/Model.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _search_App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../search/App */ "./wp-content/themes/labor-day/src/js/search/App.tsx");

/* harmony default export */ __webpack_exports__["default"] = (new class Model {
  async makeRequest(request) {
    try {
      const response = await fetch(`${_search_App__WEBPACK_IMPORTED_MODULE_0__.graphQL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });
      const {
        data
      } = await response.json();
      return data;
    } catch (error) {
      console.error('makeRequest error:', error);
      throw error;
    }
  }
  async getPosts() {
    const variables = {
      first: Number(_search_App__WEBPACK_IMPORTED_MODULE_0__.POSTS_PER_PAGE),
      after: '',
      include: ['LARGE'],
      size: 'LARGE'
    };
    const query = `query Events($first: Int = 4, $after: String = "", $include: [MediaItemSizeEnum] = [LARGE], $size: MediaItemSizeEnum = LARGE) {
  events(after: $after, first: $first) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      eventLocations {
        nodes {
          name
          link
          event_locationId
        }
      }
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
          mediaDetails {
            sizes(include: $include) {
              height
              name
              width
              sourceUrl
            }
          }
          srcSet(size: $size)
		  sizes(size: $size)
        }
      }
      title(format: RENDERED)
      link
	  eventId
      eventTypes {
        nodes {
          event_typeId
          name
          link
        }
      }
    }
  }
  eventTypes {
    nodes {
      event_typeId
      name
	  link
    }
  }
  eventLocations {
    nodes {
      name
      link
      event_locationId
    }
  }
}`;
    const request = {
      query: query,
      variables: variables
    };
    try {
      const data = await this.makeRequest(request);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}());

/***/ }),

/***/ "./wp-content/themes/labor-day/src/js/search/ResultsContainer.tsx":
/*!************************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/search/ResultsContainer.tsx ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ResultsContainer; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SinglePost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SinglePost */ "./wp-content/themes/labor-day/src/js/search/SinglePost.tsx");



function destructureData(data) {
  const {
    eventLocations: {
      nodes: locations
    }
  } = data;
  const {
    eventTypes: {
      nodes: type
    }
  } = data;
  const {
    eventId,
    link,
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
  const destructuredData = {
    locations,
    type,
    sizes,
    eventId,
    link,
    title,
    event_info,
    altText,
    srcSet,
    size
  };
  return destructuredData;
}
function ResultsContainer(_ref) {
  let {
    posts,
    checkedFilters
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "cno-events"
  }, posts.map(post => {
    if (checkedFilters.length === 0) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SinglePost__WEBPACK_IMPORTED_MODULE_1__["default"], {
        data: destructureData(post)
      });
    } else if (checkedFilters.length === 1) {
      if (checkedFilters.includes(post.eventLocations.nodes[0].name) || checkedFilters.includes(post.eventTypes.nodes[0].name)) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SinglePost__WEBPACK_IMPORTED_MODULE_1__["default"], {
          data: destructureData(post)
        });
      }
    } else {
      if (checkedFilters.includes(post.eventLocations.nodes[0].name) && checkedFilters.includes(post.eventTypes.nodes[0].name)) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SinglePost__WEBPACK_IMPORTED_MODULE_1__["default"], {
          data: destructureData(post)
        });
      }
    }
  }));
}

/***/ }),

/***/ "./wp-content/themes/labor-day/src/js/search/SearchBar.jsx":
/*!*****************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/search/SearchBar.jsx ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SearchBar; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SearchFilters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchFilters */ "./wp-content/themes/labor-day/src/js/search/SearchFilters.tsx");



function SearchBar(_ref) {
  let {
    filters,
    checkedFilters,
    setCheckedFilters
  } = _ref;
  const [showFilters, setShowFilters] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "cno-event-search"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "cno-event-search__title"
  }, "Search Events"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "search",
    id: "search",
    placeholder: "Find an Event"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cno-event-search__filters"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cno-event-search__filters--header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "cno-event-search__filters--title"
  }, "Filters"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "btn__outline--secondary",
    onClick: () => {
      setShowFilters(!showFilters);
    }
  }, showFilters ? 'Hide Filters' : 'Show Filters')), showFilters && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SearchFilters__WEBPACK_IMPORTED_MODULE_1__["default"], {
    filters: filters,
    checkedFilters: checkedFilters,
    setCheckedFilters: setCheckedFilters
  }))));
}

/***/ }),

/***/ "./wp-content/themes/labor-day/src/js/search/SearchFilters.tsx":
/*!*********************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/search/SearchFilters.tsx ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SearchFilters; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


function SearchFilters(_ref) {
  let {
    filters,
    checkedFilters,
    setCheckedFilters
  } = _ref;
  function handleClick(x, _ref2) {
    let {
      target
    } = _ref2;
    // console.log(x, target);
    if (!target.id) return;
    if (checkedFilters.includes(target.id)) {
      setCheckedFilters(checkedFilters.filter(f => {
        return f !== target.id;
      }));
    } else setCheckedFilters(prev => [...prev, target.id]);
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cno-event-search-filters"
  }, filters.map(_ref3 => {
    let {
      type: {
        name,
        filters
      }
    } = _ref3;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "cno-event-search-filters__container",
      onClick: ev => {
        handleClick(name, ev);
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
      className: "cno-event-search-filters__title"
    }, name), filters.map(filter => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "cno-event-search-filters__filter"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
        type: "checkbox",
        name: filter.link,
        id: filter.name,
        checked: checkedFilters.includes(filter.name),
        onChange: () => {}
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
        htmlFor: filter.name
      }, filter.name));
    }));
  }));
}

/***/ }),

/***/ "./wp-content/themes/labor-day/src/js/search/SinglePost.tsx":
/*!******************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/search/SinglePost.tsx ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SinglePost; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


function SinglePost(_ref) {
  let {
    data
  } = _ref;
  const {
    locations,
    eventId,
    link,
    title,
    event_info,
    altText,
    srcSet,
    size,
    sizes,
    type
  } = data;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "cno-event"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("figure", {
    className: "cno-event__image"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    width: size.width,
    height: size.height,
    src: "",
    className: "attachment-large size-large wp-post-image",
    alt: altText,
    decoding: "async",
    srcSet: srcSet,
    sizes: sizes
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("aside", {
    className: "event-meta"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "event-meta__day"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "When: "), event_info.info.day, ", September 1"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "event-meta__location"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Where:"), ' ', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: locations[0].link,
    rel: "tag"
  }, locations[0].name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "event-meta__start-time"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Start Time:"), ' ' + event_info.info.startTime), event_info.info.endTime && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "event-meta__end-time"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "End Time:"), " ", event_info.info.endTime), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "event-meta__type"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Event Type:"), ' ', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "${type[0].link}",
    rel: "tag"
  }, type[0].name))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "about"
  }, event_info.description), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cno-event__buttons"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "btn__fill--primary",
    "data-add-to-schedule": "true",
    "data-id": eventId
  }, "Add to Schedule"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: link,
    className: "btn__outline--primary"
  }, "Learn More"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cno-event-schedule-confirmation"
  })));
}

/***/ }),

/***/ "./wp-content/themes/labor-day/src/js/spinner.jsx":
/*!********************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/spinner.jsx ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ LoadingSpinner; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_components_loading_spinner_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/components/loading-spinner.scss */ "./wp-content/themes/labor-day/src/styles/components/loading-spinner.scss");



function LoadingSpinner() {
  const divs = [1, 2, 3, 4];
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "lds-ring"
  }, divs.map(div => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null)));
}

/***/ }),

/***/ "./wp-content/themes/labor-day/src/styles/components/loading-spinner.scss":
/*!********************************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/styles/components/loading-spinner.scss ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./wp-content/themes/labor-day/src/js/search/App.tsx");
/******/ 	
/******/ })()
;
//# sourceMappingURL=search.js.map