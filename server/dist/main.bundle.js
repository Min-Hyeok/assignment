/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "App": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_core */ "./src/_core/index.js");
/* harmony import */ var _views__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views */ "./src/views/index.js");


class App extends _core__WEBPACK_IMPORTED_MODULE_0__.Component {
  routing(el) {
    const selectedPath = location.hash.replace('#!', '');
    const routes = {
      '/home': _views__WEBPACK_IMPORTED_MODULE_1__.Home,
      '/sub': _views__WEBPACK_IMPORTED_MODULE_1__.SubPage,
      '/favorite': _views__WEBPACK_IMPORTED_MODULE_1__.FavoritePage,
      '/detail': _views__WEBPACK_IMPORTED_MODULE_1__.DetailPage
    };
    let selectedRoute = _views__WEBPACK_IMPORTED_MODULE_1__.Home;

    for (const path of Object.keys(routes)) {
      if (selectedPath.includes(path)) {
        selectedRoute = routes[path];
        break;
      }
    }

    new selectedRoute(el);
  }

  componentDidMounted() {
    const $main = this.el.querySelector('#main');
    window.addEventListener('popstate', e => this.routing($main));
    this.routing($main);
  }

  template() {
    return `        
            <header>
                <h3>
                    <a href="#"><img src="https://hub.zum.com/resources/pc/images/logo_zum_2x-78df1cde157641c8f4178f86826539e8.png" alt="허브줌" /></a>
                </h3>
                <ul>
                    <li><a href="/#!/home">HOME</a></li>
                    <li><a href="/#!/sub/life">라이프</a></li>
                    <li><a href="/#!/sub/trip">여행</a></li>
                    <li><a href="/#!/sub/food">푸드</a></li>
                    <li><a href="/#!/sub/culture">문화</a></li>
                    <li><a href="/#!/favorite">즐겨찾기</a></li>
                </ul>
            </header>
            <main id="main"></main>
            <footer>
                Copyright &copy; 2021 김민혁 All Right Reserved
            </footer>
        `;
  }

}

/***/ }),

/***/ "./src/_core/Component.js":
/*!********************************!*\
  !*** ./src/_core/Component.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observer */ "./src/_core/Observer.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Component {
  constructor(el, props = {}) {
    _defineProperty(this, "el", void 0);

    _defineProperty(this, "state", {});

    _defineProperty(this, "props", {});

    _defineProperty(this, "render", () => {
      this.componentBeforeUpdate();
      this.el.innerHTML = this.template();
      this.componentDidUpdate();
    });

    this.el = el;
    this.props = props;
    this.setup();
  }

  setup() {
    this.state = this.stateInit();
    this.eventInit();
    (0,_Observer__WEBPACK_IMPORTED_MODULE_0__.observe)(this.render);
    this.componentDidMounted();
  }

  template() {
    return '';
  }

  setState(newState) {
    this.state = _objectSpread(_objectSpread({}, this.state), newState);
    this.render();
  }

  stateInit() {
    return {};
  }

  eventInit() {}

  componentDidMounted() {}

  componentBeforeUpdate() {}

  componentDidUpdate() {}

}

/***/ }),

/***/ "./src/_core/Observer.js":
/*!*******************************!*\
  !*** ./src/_core/Observer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "observe": () => (/* binding */ observe),
/* harmony export */   "observable": () => (/* binding */ observable)
/* harmony export */ });
let currentObserver = null;
function observe(fn) {
  currentObserver = fn;
  fn();
  currentObserver = null;
}
function observable(obj) {
  Object.keys(obj).forEach(key => {
    let _value = obj[key];
    const observers = new Set();
    Object.defineProperty(obj, key, {
      get() {
        observers.add(currentObserver);
        return _value;
      },

      set(value) {
        if (_value === value) return;
        _value = value;
        observers.forEach(observer => observer && observer());
      }

    });
  });
  return obj;
}

/***/ }),

/***/ "./src/_core/Repository.js":
/*!*********************************!*\
  !*** ./src/_core/Repository.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Repository": () => (/* binding */ Repository)
/* harmony export */ });
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _key = new WeakMap();

class Repository {
  constructor(key) {
    _key.set(this, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _key, key);
  }

  set(data) {
    localStorage.setItem(_classPrivateFieldGet(this, _key), JSON.stringify(data));
  }

  get() {
    return JSON.parse(localStorage.getItem(_classPrivateFieldGet(this, _key))) || null;
  }

}

/***/ }),

/***/ "./src/_core/RestClient.js":
/*!*********************************!*\
  !*** ./src/_core/RestClient.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RestClient": () => (/* binding */ RestClient)
/* harmony export */ });
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _baseURL = new WeakMap();

var _timeout = new WeakMap();

class RestClient {
  constructor(baseURL, timeout) {
    _baseURL.set(this, {
      writable: true,
      value: void 0
    });

    _timeout.set(this, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _baseURL, baseURL);

    _classPrivateFieldSet(this, _timeout, timeout);
  }

  async get(path) {
    const result = await Promise.race([fetch(`${_classPrivateFieldGet(this, _baseURL)}${path}`), new Promise(resolve => setTimeout(() => resolve(false), _classPrivateFieldGet(this, _timeout)))]);
    const contentType = result.headers.get('content-type').includes('json') ? 'json' : 'text';

    if (result === false) {
      throw new Error('시간 초과');
    }

    return result[contentType]();
  }

}

/***/ }),

/***/ "./src/_core/Store.js":
/*!****************************!*\
  !*** ./src/_core/Store.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Store": () => (/* binding */ Store)
/* harmony export */ });
/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observer */ "./src/_core/Observer.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Store {
  constructor({
    state,
    mutations
  }) {
    _defineProperty(this, "state", void 0);

    _defineProperty(this, "commit", void 0);

    this.state = (0,_Observer__WEBPACK_IMPORTED_MODULE_0__.observable)(state);

    this.commit = (mutation, params) => {
      mutations[mutation](this.state, params);
    };
  }

}

/***/ }),

/***/ "./src/_core/index.js":
/*!****************************!*\
  !*** ./src/_core/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RestClient": () => (/* reexport safe */ _RestClient__WEBPACK_IMPORTED_MODULE_0__.RestClient),
/* harmony export */   "Component": () => (/* reexport safe */ _Component__WEBPACK_IMPORTED_MODULE_1__.Component),
/* harmony export */   "Repository": () => (/* reexport safe */ _Repository__WEBPACK_IMPORTED_MODULE_2__.Repository),
/* harmony export */   "Store": () => (/* reexport safe */ _Store__WEBPACK_IMPORTED_MODULE_3__.Store),
/* harmony export */   "observable": () => (/* reexport safe */ _Observer__WEBPACK_IMPORTED_MODULE_4__.observable),
/* harmony export */   "observe": () => (/* reexport safe */ _Observer__WEBPACK_IMPORTED_MODULE_4__.observe)
/* harmony export */ });
/* harmony import */ var _RestClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RestClient */ "./src/_core/RestClient.js");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Component */ "./src/_core/Component.js");
/* harmony import */ var _Repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Repository */ "./src/_core/Repository.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Store */ "./src/_core/Store.js");
/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Observer */ "./src/_core/Observer.js");






/***/ }),

/***/ "./src/components/MainContent.js":
/*!***************************************!*\
  !*** ./src/components/MainContent.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainContent": () => (/* binding */ MainContent)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_core */ "./src/_core/index.js");

class MainContent extends _core__WEBPACK_IMPORTED_MODULE_0__.Component {
  template() {
    const {
      items,
      title
    } = this.props;
    return `
            <h2>${title}</h2>
            <div>
                ${items.map(({
      idx,
      title,
      imageUrl,
      mediaName,
      url,
      summaryContent
    }) => `
                    <article data-idx="${idx}">
                        <a href="/#!/detail/${encodeURIComponent(url)}">
                            <img src="${imageUrl}" alt="${title}" />
                            <p>${title}</p>
                            <p>${mediaName}</p>
                            <p>${summaryContent}</p>
                        </a>
                        <button class="favorite">★</button>
                    </article>
                `).join('')}
            </div>
        `;
  }

  eventInit() {
    this.el.addEventListener('click', e => {
      if (!e.target.classList.contains('favorite')) return;
      const {
        items,
        toggleFavorite
      } = this.props;
      const idx = Number(e.target.closest('[data-idx]').dataset.idx);
      const item = items.find(v => v.idx === idx);
      toggleFavorite(item);
    });
  }

}

/***/ }),

/***/ "./src/components/RankingContent.js":
/*!******************************************!*\
  !*** ./src/components/RankingContent.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RankingContent": () => (/* binding */ RankingContent)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_core */ "./src/_core/index.js");

class RankingContent extends _core__WEBPACK_IMPORTED_MODULE_0__.Component {
  template() {
    const {
      items
    } = this.props;
    return `
            <h2>랭킹 컨텐츠</h2>
            <div>
                ${items.map(({
      idx,
      title,
      mediaName,
      url
    }) => `
                    <article>
                        <a href="/#!/detail/${encodeURIComponent(url)}"
                            <p>${title}</p>
                            <p>${mediaName}</p>
                        </a>
                    </article>
                `).join('')}
            </div>
        `;
  }

}

/***/ }),

/***/ "./src/repositories/favoriteRepository.js":
/*!************************************************!*\
  !*** ./src/repositories/favoriteRepository.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "favoriteRepository": () => (/* binding */ favoriteRepository)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_core */ "./src/_core/index.js");

const favoriteRepository = new _core__WEBPACK_IMPORTED_MODULE_0__.Repository('FAVORITE');

/***/ }),

/***/ "./src/repositories/index.js":
/*!***********************************!*\
  !*** ./src/repositories/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "favoriteRepository": () => (/* reexport safe */ _favoriteRepository__WEBPACK_IMPORTED_MODULE_0__.favoriteRepository)
/* harmony export */ });
/* harmony import */ var _favoriteRepository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./favoriteRepository */ "./src/repositories/favoriteRepository.js");


/***/ }),

/***/ "./src/services/HubService.js":
/*!************************************!*\
  !*** ./src/services/HubService.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Category": () => (/* binding */ Category),
/* harmony export */   "HubService": () => (/* binding */ HubService)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_core */ "./src/_core/index.js");
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }


const Category = {
  LIFE: 'life',
  TRIP: 'trip',
  FOOD: 'food',
  CULTURE: 'culture'
};
const Paths = {
  BEST: '/best',
  MAIN: '/main',
  DETAIL: '/detail',
  [Category.LIFE]: '/content/life',
  [Category.TRIP]: '/content/trip',
  [Category.FOOD]: '/content/food',
  [Category.CULTURE]: '/content/culture'
};

var _client = new WeakMap();

class HubService {
  constructor() {
    _client.set(this, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _client, new _core__WEBPACK_IMPORTED_MODULE_0__.RestClient('/api', 5000));
  }

  getMainContents() {
    try {
      return _classPrivateFieldGet(this, _client).get(Paths.MAIN);
    } catch (e) {
      console.info('메인 컨텐츠를 가져오는 도중에 에러가 발생했습니다.');
      console.info(e);
      return {};
    }
  }

  getBestContents() {
    try {
      return _classPrivateFieldGet(this, _client).get(Paths.BEST);
    } catch (e) {
      console.info('랭킹 컨텐츠를 가져오는 도중에 에러가 발생했습니다.');
      console.info(e);
      return {};
    }
  }

  getSubContents(category) {
    try {
      return _classPrivateFieldGet(this, _client).get(Paths[category]);
    } catch (e) {
      console.info('서브페이지 컨텐츠를 가져오는 도중에 에러가 발생했습니다.');
      console.info(e);
      return [];
    }
  }

  getDetailContent(url) {
    try {
      return _classPrivateFieldGet(this, _client).get(`${Paths.DETAIL}/${encodeURIComponent(url)}`);
    } catch (e) {
      console.info('상세페이지 컨텐츠를 가져오는 도중에 에러가 발생했습니다.');
      console.info(e);
      return null;
    }
  }

}

/***/ }),

/***/ "./src/services/index.js":
/*!*******************************!*\
  !*** ./src/services/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hubService": () => (/* binding */ hubService)
/* harmony export */ });
/* harmony import */ var _HubService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HubService */ "./src/services/HubService.js");

const hubService = new _HubService__WEBPACK_IMPORTED_MODULE_0__.HubService();

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "store": () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_core */ "./src/_core/index.js");
/* harmony import */ var _repositories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../repositories */ "./src/repositories/index.js");


const store = new _core__WEBPACK_IMPORTED_MODULE_0__.Store({
  state: {
    favorites: _repositories__WEBPACK_IMPORTED_MODULE_1__.favoriteRepository.get() || []
  },
  mutations: {
    SET_FAVORITES(state, payload) {
      state.favorites = payload;
      console.log(payload);
      _repositories__WEBPACK_IMPORTED_MODULE_1__.favoriteRepository.set(payload);
    }

  }
});

/***/ }),

/***/ "./src/views/DetailPage.js":
/*!*********************************!*\
  !*** ./src/views/DetailPage.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetailPage": () => (/* binding */ DetailPage)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services */ "./src/services/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store */ "./src/store/index.js");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_core */ "./src/_core/index.js");



class DetailPage extends _core__WEBPACK_IMPORTED_MODULE_2__.Component {
  stateInit() {
    return {
      content: '상세페이지 로딩 중입니다.'
    };
  }

  get selectedItem() {
    const paths = location.hash.split('/');
    const url = decodeURIComponent(paths.pop());
    return _store__WEBPACK_IMPORTED_MODULE_1__.store.state.favorites.find(v => v.url === url);
  }

  async componentDidMounted() {
    const paths = location.hash.split('/');

    if (paths.length === 0) {
      alert('존재하지 않는 페이지입니다.');
      history.back();
    }

    const url = paths.pop();
    const content = await _services__WEBPACK_IMPORTED_MODULE_0__.hubService.getDetailContent(url);
    this.setState({
      content
    });
  }

  template() {
    const {
      content
    } = this.state;
    return `
            ${content}
            <div>
                <a href="#!" class="list" onclick="history.back(); return false;">목록으로</a>
            </div>
        `;
  }

}

/***/ }),

/***/ "./src/views/FavoritePage.js":
/*!***********************************!*\
  !*** ./src/views/FavoritePage.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FavoritePage": () => (/* binding */ FavoritePage)
/* harmony export */ });
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store */ "./src/store/index.js");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_core */ "./src/_core/index.js");


class FavoritePage extends _core__WEBPACK_IMPORTED_MODULE_1__.Component {
  template() {
    const {
      favorites
    } = _store__WEBPACK_IMPORTED_MODULE_0__.store.state;
    const reversed = [...favorites].reverse();
    return `
            <h1>즐겨찾기 목록</h1>
            <div>
                ${reversed.map(({
      idx,
      title,
      imageUrl,
      mediaName,
      url,
      summaryContent
    }) => `
                    <article data-idx="${idx}">
                        <a href="/#!/detail/${encodeURIComponent(url)}">
                            <img src="${imageUrl}" alt="${title}" />
                            <p>${title}</p>
                            <p>${mediaName}</p>
                            <p>${summaryContent}</p>
                        </a>
                        <button class="favorite-remove">★</button>
                    </article>
                `).join('')}
            </div>
        `;
  }

  eventInit() {
    this.el.addEventListener('click', e => {
      if (!e.target.classList.contains('favorite-remove')) return;
      const favorites = [..._store__WEBPACK_IMPORTED_MODULE_0__.store.state.favorites];
      const idx = Number(e.target.closest('[data-idx]').dataset.idx);
      favorites.splice(favorites.findIndex(v => v.idx === idx), 1);
      _store__WEBPACK_IMPORTED_MODULE_0__.store.commit('SET_FAVORITES', favorites);
    });
  }

}

/***/ }),

/***/ "./src/views/Home.js":
/*!***************************!*\
  !*** ./src/views/Home.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Home": () => (/* binding */ Home)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_core */ "./src/_core/index.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services */ "./src/services/index.js");
/* harmony import */ var _components_MainContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/MainContent */ "./src/components/MainContent.js");
/* harmony import */ var _components_RankingContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/RankingContent */ "./src/components/RankingContent.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store */ "./src/store/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class Home extends _core__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "toggleFavorite", item => {
      const newFavorites = [..._store__WEBPACK_IMPORTED_MODULE_4__.store.state.favorites];
      const itemIndex = newFavorites.findIndex(v => v.idx === item.idx);

      if (itemIndex === -1) {
        newFavorites.push(item);
      } else {
        newFavorites.splice(itemIndex, 1);
      }

      _store__WEBPACK_IMPORTED_MODULE_4__.store.commit('SET_FAVORITES', newFavorites);
    });
  }

  stateInit() {
    return {
      mainContents: {},
      bestContents: [],
      loading: true
    };
  }

  async componentDidMounted() {
    const [mainContents, bestContents] = await Promise.all([_services__WEBPACK_IMPORTED_MODULE_1__.hubService.getMainContents(), _services__WEBPACK_IMPORTED_MODULE_1__.hubService.getBestContents()]);
    this.setState({
      mainContents,
      bestContents,
      loading: false
    });
  }

  async componentDidUpdate() {
    const {
      toggleFavorite
    } = this;
    const {
      mainContents,
      bestContents
    } = this.state;
    const {
      life = [],
      food = [],
      trip = [],
      culture = []
    } = mainContents;
    const $life = this.el.querySelector('#life');
    const $food = this.el.querySelector('#food');
    const $trip = this.el.querySelector('#trip');
    const $culture = this.el.querySelector('#culture');
    const $ranking = this.el.querySelector('#ranking');
    new _components_MainContent__WEBPACK_IMPORTED_MODULE_2__.MainContent($life, {
      items: life,
      title: '라이프',
      toggleFavorite
    });
    new _components_MainContent__WEBPACK_IMPORTED_MODULE_2__.MainContent($food, {
      items: food,
      title: '푸드',
      toggleFavorite
    });
    new _components_MainContent__WEBPACK_IMPORTED_MODULE_2__.MainContent($trip, {
      items: trip,
      title: '여행',
      toggleFavorite
    });
    new _components_MainContent__WEBPACK_IMPORTED_MODULE_2__.MainContent($culture, {
      items: culture,
      title: '문화',
      toggleFavorite
    });
    new _components_RankingContent__WEBPACK_IMPORTED_MODULE_3__.RankingContent($ranking, {
      items: bestContents,
      toggleFavorite
    });
  }

  template() {
    return `
            ${this.state.loading ? '로딩 중입니다.' : ''}
            <section id="life"></section>
            <section id="food"></section>
            <section id="trip"></section>
            <section id="culture"></section>
            <section id="ranking"></section>
        `;
  }

}

/***/ }),

/***/ "./src/views/SubPage.js":
/*!******************************!*\
  !*** ./src/views/SubPage.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubPage": () => (/* binding */ SubPage)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services */ "./src/services/index.js");
/* harmony import */ var _services_HubService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/HubService */ "./src/services/HubService.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store */ "./src/store/index.js");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_core */ "./src/_core/index.js");




const CategoryTitleMap = {
  [_services_HubService__WEBPACK_IMPORTED_MODULE_1__.Category.LIFE]: '라이프',
  [_services_HubService__WEBPACK_IMPORTED_MODULE_1__.Category.FOOD]: '푸드',
  [_services_HubService__WEBPACK_IMPORTED_MODULE_1__.Category.TRIP]: '여행',
  [_services_HubService__WEBPACK_IMPORTED_MODULE_1__.Category.CULTURE]: '문화'
};
class SubPage extends _core__WEBPACK_IMPORTED_MODULE_3__.Component {
  stateInit() {
    return {
      items: [],
      title: '',
      loading: true
    };
  }

  async componentDidMounted() {
    const paths = location.hash.split('/');

    if (paths.length === 0) {
      alert('존재하지 않는 페이지입니다.');
      history.back();
    }

    const category = paths.pop();

    if (!Object.values(_services_HubService__WEBPACK_IMPORTED_MODULE_1__.Category).includes(category)) {
      alert('존재하지 않는 페이지입니다.');
      history.back();
    }

    const items = await _services__WEBPACK_IMPORTED_MODULE_0__.hubService.getSubContents(category);
    this.setState({
      items,
      title: CategoryTitleMap[category],
      loading: false
    });
  }

  template() {
    const {
      items,
      title,
      loading
    } = this.state;
    return `
            <h1>${title}</h1>
            ${loading ? '로딩 중입니다.' : ''}
            ${items.length === 0 ? '컨텐츠가 없습니다.' : ''}
            <div>
                ${items.map(({
      idx,
      title,
      imageUrl,
      mediaName,
      url,
      summaryContent
    }) => `
                    <article data-idx="${idx}">
                        <a href="/#!/detail/${encodeURIComponent(url)}">
                            <img src="${imageUrl}" alt="${title}" />
                            <p>${title}</p>
                            <p>${mediaName}</p>
                            <p>${summaryContent}</p>
                        </a>
                        <button class="favorite-toggle">★</button>
                    </article>
                `).join('')}
            </div>
        `;
  }

  eventInit() {
    this.el.addEventListener('click', e => {
      if (!e.target.classList.contains('favorite-toggle')) return;
      const favorites = [..._store__WEBPACK_IMPORTED_MODULE_2__.store.state.favorites];
      const idx = Number(e.target.closest('[data-idx]').dataset.idx);
      const itemIndex = favorites.findIndex(v => v.idx === idx);
      const item = this.state.items.find(v => v.idx === idx);

      if (itemIndex === -1) {
        favorites.push(item);
      } else {
        favorites.splice(itemIndex, 1);
      }

      _store__WEBPACK_IMPORTED_MODULE_2__.store.commit('SET_FAVORITES', favorites);
    });
  }

}

/***/ }),

/***/ "./src/views/index.js":
/*!****************************!*\
  !*** ./src/views/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetailPage": () => (/* reexport safe */ _DetailPage__WEBPACK_IMPORTED_MODULE_0__.DetailPage),
/* harmony export */   "FavoritePage": () => (/* reexport safe */ _FavoritePage__WEBPACK_IMPORTED_MODULE_1__.FavoritePage),
/* harmony export */   "Home": () => (/* reexport safe */ _Home__WEBPACK_IMPORTED_MODULE_2__.Home),
/* harmony export */   "SubPage": () => (/* reexport safe */ _SubPage__WEBPACK_IMPORTED_MODULE_3__.SubPage)
/* harmony export */ });
/* harmony import */ var _DetailPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DetailPage */ "./src/views/DetailPage.js");
/* harmony import */ var _FavoritePage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FavoritePage */ "./src/views/FavoritePage.js");
/* harmony import */ var _Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Home */ "./src/views/Home.js");
/* harmony import */ var _SubPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SubPage */ "./src/views/SubPage.js");





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
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/App.js");

const $app = document.querySelector('#app');
new _App__WEBPACK_IMPORTED_MODULE_0__.App($app);
})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map