/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GendersView = __webpack_require__(/*! ./views/genders_view */ \"./src/views/genders_view.js\");\nconst IdentityView = __webpack_require__(/*! ./views/identity_view */ \"./src/views/identity_view.js\");\nconst Identities = __webpack_require__(/*! ./models/identities.js */ \"./src/models/identities.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  console.log(\"Sup!\");\n\n  const gendersViewContainer = document.querySelector('#genders')\n  const gendersView = new GendersView(gendersViewContainer);\n  gendersView.render();\n\n  const identityViewContainer = document.querySelector('#identities')\n  const identityView = new IdentityView(identityViewContainer);\n  identityView.bindEvents();\n\n  const identities = new Identities();\n  identities.bindEvents();\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/pub_sub.js":
/*!********************************!*\
  !*** ./src/helpers/pub_sub.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const PubSub = {\n  publish: function (channel, payload) {\n    const event = new CustomEvent(channel, {\n      detail: payload\n    });\n    document.dispatchEvent(event);\n  },\n  subscribe: function (channel, callback) {\n    document.addEventListener(channel, callback);\n  }\n}\n\nmodule.exports = PubSub;\n\n\n//# sourceURL=webpack:///./src/helpers/pub_sub.js?");

/***/ }),

/***/ "./src/helpers/request_helper.js":
/*!***************************************!*\
  !*** ./src/helpers/request_helper.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const RequestHelper = function (url) {\n  this.url = url;\n}\n\nRequestHelper.prototype.get = function (onComplete) {\n  const xhr = new XMLHttpRequest();\n  xhr.open('GET', this.url);\n  xhr.addEventListener('load', function() {\n    if (this.status !== 200) {\n      return;\n    };\n    const data = JSON.parse(this.responseText);\n    onComplete(data);\n  });\n  xhr.send();\n};\n\nmodule.exports = RequestHelper;\n\n\n//# sourceURL=webpack:///./src/helpers/request_helper.js?");

/***/ }),

/***/ "./src/models/identities.js":
/*!**********************************!*\
  !*** ./src/models/identities.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const RequestHelper = __webpack_require__(/*! ../helpers/request_helper.js */ \"./src/helpers/request_helper.js\");\nconst PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst Identities = function () {\n\n};\n\nIdentities.prototype.bindEvents = function () {\n  PubSub.subscribe('Gender:selected', (evt) => {\n    const selectedGender = evt.detail;\n    this.getIdentityData(selectedGender);\n  });\n};\n\nIdentities.prototype.getIdentityData = function (selectedGender) {\n  const requestHelper = new RequestHelper(`http://uinames.com/api/?gender=${selectedGender}&ext&region=spain`);\n  requestHelper.get((data) => {\n    data = this.addImage(data)\n    this.handleDataReady(data)\n  });\n};\n\nIdentities.prototype.addImage = function (data) {\n  const names = ['aileen', 'alex', 'Alex2', 'andris', 'balazs', 'brendan', 'claire', 'ewa', 'jaime', 'jemma', 'joe', 'lewis', 'marta', 'matthew', 'michael', 'michelle', 'rachel', 'ryan', 'sebastian', 'simon', 'keith', 'pawel', 'alexb', 'sian'];\n  const randomNumber = Math.floor(Math.random()*24);\n  console.log(randomNumber);\n\n  data.src = `images/${names[randomNumber]}.jpeg`\n  return data\n};\n\nIdentities.prototype.handleDataReady = function (data) {\n  PubSub.publish('Identities:data-ready', data);\n};\n\n\nmodule.exports = Identities;\n\n\n//# sourceURL=webpack:///./src/models/identities.js?");

/***/ }),

/***/ "./src/views/genders_view.js":
/*!***********************************!*\
  !*** ./src/views/genders_view.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst GendersView = function (element) {\n  this.element = element;\n  this.genders = [\"male\", \"female\", \"random\"];\n};\n\nGendersView.prototype.render = function () {\n  this.genders.forEach((gender) => {\n    const menuItem = this.createItem(gender);\n    this.element.appendChild(menuItem);\n  });\n};\n\nGendersView.prototype.createItem = function (gender) {\n  const menuItem = document.createElement('button');\n  menuItem.classList.add('gender-button');\n  menuItem.textContent = gender.toUpperCase();\n  menuItem.id = gender;\n\n  menuItem.addEventListener('click', (evt) => {\n    console.log(`gender selected ${evt.target.id}`);\n    PubSub.publish('Gender:selected', evt.target.id)\n  });\n\n  return menuItem;\n};\n\nmodule.exports = GendersView;\n\n\n//# sourceURL=webpack:///./src/views/genders_view.js?");

/***/ }),

/***/ "./src/views/identity_view.js":
/*!************************************!*\
  !*** ./src/views/identity_view.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\n\nconst IdentityView = function (container, identity) {\n  this.container = container;\n  this.identity = identity;\n};\n\nIdentityView.prototype.bindEvents = function () {\n  PubSub.subscribe('Identities:data-ready', (evt) => {\n    this.identity = evt.detail;\n    this.displayIdentity(event.detail);\n  });\n};\n\nIdentityView.prototype.displayIdentity = function (data) {\n\n  const newIdContainer = document.createElement('div');\n  const newImageContainer = document.createElement('div');\n  const newInfoContainer = document.createElement('div');\n  const newIdentityContainer = document.createElement('div');\n  const container = document.querySelector('#identity');\n  newIdContainer.classList.add('new-id-container');\n  newIdentityContainer.classList.add('new-identity-container');\n  newImageContainer.classList.add('new-image-container');\n  newInfoContainer.classList.add('new-info-container');\n\n  container.innerHTML = '';\n\n  const nameInfo = document.createElement('li');\n  const ageInfo = document.createElement('li');\n  const birthdayInfo = document.createElement('li');\n  const mobileInfo = document.createElement('li');\n  const countryInfo = document.createElement('li');\n  const image = document.createElement('img');\n\n  nameInfo.textContent = data.name + \" \" + data.surname;\n  ageInfo.textContent = data.age;\n  birthdayInfo.textContent = data.birthday.dmy;\n  mobileInfo.textContent = data.phone;\n  countryInfo.textContent = data.region;\n  image.src = data.src\n\n  newIdContainer.appendChild(nameInfo)\n  newIdContainer.appendChild(ageInfo)\n  newIdContainer.appendChild(birthdayInfo)\n  newIdContainer.appendChild(mobileInfo)\n  newIdContainer.appendChild(countryInfo)\n  newImageContainer.appendChild(image)\n\n  newInfoContainer.appendChild(newIdContainer);\n  newInfoContainer.appendChild(newImageContainer);\n\n  container.appendChild(newInfoContainer);\n\n};\n\nmodule.exports = IdentityView;\n\n\n//# sourceURL=webpack:///./src/views/identity_view.js?");

/***/ })

/******/ });