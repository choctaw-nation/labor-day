/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./wp-content/themes/labor-day/src/js/add-to-schedule/controller.ts":
/*!**************************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/add-to-schedule/controller.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controller": function() { return /* binding */ Controller; },
/* harmony export */   "ScheduleManager": function() { return /* binding */ ScheduleManager; }
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./wp-content/themes/labor-day/src/js/add-to-schedule/model.ts");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./wp-content/themes/labor-day/src/js/add-to-schedule/view.ts");



/**
 * Controller class that handles user interaction and data flow between the Model and View.
 */
class Controller {
  /**
   * Determines whether or not the controller is in debug mode.
   */
  debug = true;
  constructor() {
    // Register click event listeners for buttons in the view
    if (_view__WEBPACK_IMPORTED_MODULE_1__["default"].buttons.length > 0) {
      _view__WEBPACK_IMPORTED_MODULE_1__["default"].clickHandler(_model__WEBPACK_IMPORTED_MODULE_0__["default"].addToSchedule.bind(_model__WEBPACK_IMPORTED_MODULE_0__["default"]));
    }

    // Run a debug method if debug mode is enabled
    if (this.debug) {
      this.#debugMethod();
    }
  }

  /**
   * A private method used for debugging.
   * Logs a message and the buttons from the view to the console.
   *
   * @private
   */
  #debugMethod() {
    console.log('hello from schedule-handler');
    console.log(_view__WEBPACK_IMPORTED_MODULE_1__["default"].buttons);
  }
}

// Export an instance of the Controller with default configuration
const ScheduleManager = new Controller();

/***/ }),

/***/ "./wp-content/themes/labor-day/src/js/add-to-schedule/model.ts":
/*!*********************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/add-to-schedule/model.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * @typedef {Object} SiteData
 * @property {string} rootUrl - The root URL of the site
 */
/**
 * Set in the Global scope with PHP and the Wordpress `localize_script` method
 */
/* harmony default export */ __webpack_exports__["default"] = (new class Model {
  /**
   * Retrieves the user's saved schedule from local storage or initializes an empty schedule.
   * @returns {SortedEventsObject} The user's saved schedule
   */
  getSchedule() {
    const data = localStorage.getItem('schedule');
    const jsonData = data ? JSON.parse(data) : null;
    if (null === jsonData) {
      const initialState = {
        friday: [],
        saturday: [],
        sunday: []
      };
      return initialState;
    } else return jsonData;
  }

  /**
   * Adds an event to the user's schedule.
   * @param {Object} param - The event's target element
   * @param {HTMLElement} param.target - The event's target element
   * @returns {Promise<string>} A promise that resolves with either "success" or "info"
   * @throws {Error} Throws an error if no target element is provided, the target element doesn't control scheduling, or the ID or route is undefined.
   */
  addToSchedule(_ref) {
    let {
      target
    } = _ref;
    return new Promise((resolve, reject) => {
      try {
        this.checkTargetElement(target);
        const id = Number(target.dataset.id);
        const route = target.dataset.postType;
        const schedule = this.getSchedule();
        try {
          this.getEventData(id, route).then(res => {
            const dayProp = res.day.toLowerCase();
            const check = schedule[dayProp].filter(item => item.id === res.id);
            if (check.length === 0) {
              schedule[dayProp].push(res);
              localStorage.setItem('schedule', JSON.stringify(schedule));
              resolve('success');
            } else if (check) {
              resolve('info');
            }
          });
        } catch (err) {
          reject(err);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  /**
   * Checks if the target element is valid for scheduling.
   * @param {HTMLElement} target - The event's target element
   * @throws {Error} Throws an error if no target element is provided, the target element doesn't control scheduling, or the ID or route is undefined.
   */
  checkTargetElement(target) {
    if (!target) {
      throw new Error('No target element provided');
    }
    if ('false' === target.dataset.addToSchedule) {
      throw new Error("This button doesn't control scheduling!");
    }
    if (undefined === target.dataset.id || undefined === target.dataset.postType) {
      throw new Error(`id or route is undefined! \n id: ${target.dataset.id} \n route: ${target.dataset.postType} `);
    }
  }

  /**
   * Retrieves event data from the API.
   * @param {number} id - The ID of the event
   * @param {string} route - The type of the event
   * @returns {Promise<LaborDayEvent>} A promise that resolves to an object containing event details.
   * @throws {Error} Will throw an error if there is an issue with the fetch request or parsing the response.
   */
  getEventData = async (id, route) => {
    try {
      const response = await fetch(`${cnoSiteData.rootUrl}/wp-json/wp/v2/${route}/${id}?_fields=acf,title,link`);
      const data = await response.json();
      const {
        acf: {
          info
        }
      } = data;
      const event = {
        id: id,
        link: data.link,
        title: data.title.rendered,
        description: data.acf.description,
        day: info.day,
        start_time: info.start_time,
        end_time: info.end_time
      };
      return event;
    } catch (err) {
      throw new Error(err);
    }
  };
}());

/***/ }),

/***/ "./wp-content/themes/labor-day/src/js/add-to-schedule/view.ts":
/*!********************************************************************!*\
  !*** ./wp-content/themes/labor-day/src/js/add-to-schedule/view.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * View class to manage the display of the UI components
 */
/* harmony default export */ __webpack_exports__["default"] = (new class View {
  /**
   * List of HTMLButtonElement objects
   */

  /**
   * Current page URL
   */

  /**
   * Constructs a new View object
   */
  constructor() {
    this.currentPage = location.href;
    this.buttons = document.querySelectorAll('[data-add-to-schedule]');
  }

  /**
   * Adds click event listener to buttons and handles click events
   * @param {function} method - A function that returns a Promise with a response string
   * @returns {void}
   */
  clickHandler(method) {
    if (this.buttons.length === 0) {
      return;
    }
    this.buttons.forEach(button => {
      button.addEventListener('click', ev => {
        ev.preventDefault();
        const {
          target
        } = ev;
        const confirmationContainer = target?.closest('.cno-event__buttons')?.querySelector('.cno-event-schedule-confirmation');
        if (!confirmationContainer) {
          return;
        }
        method(ev).then(response => {
          confirmationContainer.innerHTML = `<div class='alert alert-${response}' role='alert'>${this.getResponseMessage(response)}</div>`;
          setTimeout(() => {
            confirmationContainer.innerHTML = '';
          }, 7000);
        }).catch(err => {
          console.error(err);
        });
      });
    });
  }

  /**
   * Returns a response message based on the response string
   * @param {string} response - A string representing the response
   * @returns {string} A response message based on the response string
   */
  getResponseMessage(response) {
    if ('success' === response) {
      return `Added to your schedule!`;
    }
    if ('info' === response) {
      return `This is already in your schedule.`;
    }
    return '';
  }
}());

/***/ }),

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
/* harmony import */ var _add_to_schedule_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../add-to-schedule/controller */ "./wp-content/themes/labor-day/src/js/add-to-schedule/controller.ts");







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
      const scheduleManager = new _add_to_schedule_controller__WEBPACK_IMPORTED_MODULE_5__.Controller();
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