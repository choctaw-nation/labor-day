/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./wp-content/themes/labor-day/src/js/my-schedule/EventDisplay.tsx":
/*!*************************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/my-schedule/EventDisplay.tsx ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ EventsDisplay; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RemoveEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RemoveEvent */ "./wp-content/themes/labor-day/src/js/my-schedule/RemoveEvent.tsx");



function getTheTime(t) {
  const time = new Date(`2023-09-01T${t}`).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  return time;
}
function EventsDisplay(_ref) {
  let {
    schedule,
    day,
    removeEvent
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, schedule.map(_ref2 => {
    let {
      title,
      link,
      start_time,
      end_time,
      description,
      id
    } = _ref2;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-schedule__event",
      key: id
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_RemoveEvent__WEBPACK_IMPORTED_MODULE_1__["default"], {
      removeEvent: removeEvent,
      id: id,
      day: day
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-schedule__event-meta"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-schedule__event-meta--start"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "my-schedule__event-meta--label"
    }, "Start Time:"), ' ', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "my-schedule__event-meta--info"
    }, `${getTheTime(start_time)}`)), end_time && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-schedule__event-meta--end"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "my-schedule__event-meta--label"
    }, "End Time:"), ' ', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "my-schedule__event-meta--info"
    }, `${getTheTime(end_time)}`))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-schedule__event-details"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
      className: "my-schedule__event-details--title"
    }, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "my-schedule__event-details--description text-content"
    }, description), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: link,
      className: "btn__outline--primary"
    }, "View Event")));
  }));
}

/***/ }),

/***/ "./wp-content/themes/labor-day/src/js/my-schedule/RemoveEvent.tsx":
/*!************************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/my-schedule/RemoveEvent.tsx ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ RemoveEventButton; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


function RemoveEventButton(_ref) {
  let {
    removeEvent,
    id,
    day
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "my-schedule__remove-event",
    onClick: () => {
      removeEvent(id, day);
    }
  }, "X Remove Event");
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

/***/ "./wp-content/themes/labor-day/src/styles/pages/my-schedule.scss":
/*!***********************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/styles/pages/my-schedule.scss ***!
  \***********************************************************************/
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!****************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/my-schedule/App.tsx ***!
  \****************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_pages_my_schedule_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/pages/my-schedule.scss */ "./wp-content/themes/labor-day/src/styles/pages/my-schedule.scss");
/* harmony import */ var _EventDisplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventDisplay */ "./wp-content/themes/labor-day/src/js/my-schedule/EventDisplay.tsx");
/* harmony import */ var _spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../spinner */ "./wp-content/themes/labor-day/src/js/spinner.jsx");





function App() {
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [events, setEvents] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    friday: [],
    saturday: [],
    sunday: []
  });
  function getLocalStorageData() {
    const data = localStorage.getItem('schedule');
    const jsonEvents = data ? JSON.parse(data) : [];
    const sortedEvents = {
      friday: [],
      saturday: [],
      sunday: []
    };
    const days = ['friday', 'saturday', 'sunday'];
    days.forEach(day => {
      const dailyEvents = jsonEvents[day].filter(ev => {
        console.log(ev);
        return ev.day.toLowerCase() == day;
      });
      dailyEvents.forEach(ev => sortedEvents[day].push(ev));
    });
    return sortedEvents;
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const sortedEvents = getLocalStorageData();
    setEvents(sortedEvents);
    setIsLoading(false);
  }, []);
  function removeEvent(id, day) {
    setIsLoading(true);
    const daySelector = day.toLowerCase();
    const filteredEvents = events[daySelector].filter(event => {
      return event.id !== id;
    });
    const updatedEvents = {
      ...events,
      [daySelector]: filteredEvents
    };
    setEvents(updatedEvents);
    setIsLoading(false);
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    localStorage.setItem('schedule', JSON.stringify(events));
  }, [events]);
  const emptyEvents = events.friday.length === 0 && events.saturday.length === 0 && events.sunday.length === 0;
  if (isLoading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_spinner__WEBPACK_IMPORTED_MODULE_3__["default"], null);
  }
  if (emptyEvents) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Seems like you haven't added any events yet.");
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, events.friday.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "my-schedule__container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "my-schedule__day-label"
  }, "Friday"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_EventDisplay__WEBPACK_IMPORTED_MODULE_2__["default"], {
    schedule: events.friday,
    day: 'Friday',
    removeEvent: removeEvent
  })), events.saturday.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "my-schedule__container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "my-schedule__day-label"
  }, "Saturday"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_EventDisplay__WEBPACK_IMPORTED_MODULE_2__["default"], {
    schedule: events.saturday,
    day: 'Saturday',
    removeEvent: removeEvent
  })), events.sunday.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "my-schedule__container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "my-schedule__day-label"
  }, "Sunday"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_EventDisplay__WEBPACK_IMPORTED_MODULE_2__["default"], {
    schedule: events.sunday,
    day: 'Sunday',
    removeEvent: removeEvent
  })));
}
const root = document.getElementById('app');
if (root) (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(root).render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(App, null));
}();
/******/ })()
;
//# sourceMappingURL=mySchedule.js.map