/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/tinymce/tinymce.js":
/*!*****************************************!*\
  !*** ./node_modules/tinymce/tinymce.js ***!
  \*****************************************/
/***/ ((module) => {


/***/ }),

/***/ "./src/FridgeClass.ts":
/*!****************************!*\
  !*** ./src/FridgeClass.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Fridge\": () => (/* binding */ Fridge)\n/* harmony export */ });\n/* harmony import */ var _NoteClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NoteClass */ \"./src/NoteClass.ts\");\n\r\nvar btnAddNote = document.getElementById(\"add--note\");\r\nvar Fridge = /** @class */ (function () {\r\n    function Fridge(config) {\r\n        this.arrNotes = [];\r\n        this.id = config.id;\r\n        this.name = config.name;\r\n        this.all_notes = parseInt(config.all_notes);\r\n        this.now_notes = parseInt(config.now_notes);\r\n        this.arrNotes = JSON.parse(config.array_notes);\r\n        // const configArray = JSON.parse(config.array_notes.replace(/[\\r\\n]/gm, \"\"));\r\n        // if (configArray.length > 0) {\r\n        //   for (let i = 0; i < configArray.length; i++) {}\r\n        // }\r\n    }\r\n    Fridge.prototype.createNotes = function () {\r\n        var _this = this;\r\n        btnAddNote === null || btnAddNote === void 0 ? void 0 : btnAddNote.addEventListener(\"click\", function () {\r\n            _this.all_notes++;\r\n            _this.now_notes++;\r\n            var note = new _NoteClass__WEBPACK_IMPORTED_MODULE_0__.Note(_this);\r\n            _this.arrNotes.push(note);\r\n            _this.updateDb();\r\n            note.openEditor();\r\n        });\r\n    };\r\n    Fridge.prototype.updateDb = function () {\r\n        var xhttp = new XMLHttpRequest();\r\n        xhttp.open(\"POST\", \"../dist/php/dbUpdate.php\", true);\r\n        xhttp.onreadystatechange = function () {\r\n            if (this.readyState == 4 && this.status == 200) {\r\n                var returnData = this.responseText;\r\n                console.log(returnData);\r\n            }\r\n        };\r\n        xhttp.setRequestHeader(\"Content-type\", \"application/x-www-form-urlencoded\");\r\n        var xhttpSendString = \"\";\r\n        xhttpSendString += \"name=\" + this.name;\r\n        xhttpSendString += \"&all_notes=\" + this.all_notes;\r\n        xhttpSendString += \"&now_notes=\" + this.now_notes;\r\n        var tmp = [];\r\n        for (var i = 0; i < this.arrNotes.length; i++) {\r\n            var obj = {\r\n                width: this.arrNotes[i].width,\r\n                height: this.arrNotes[i].height,\r\n                offSetX: this.arrNotes[i].offSetX,\r\n                offSetY: this.arrNotes[i].offSetY,\r\n                text: this.arrNotes[i].contentText.innerHTML,\r\n            };\r\n            tmp.push(obj);\r\n        }\r\n        xhttpSendString += \"&array_notes=\" + JSON.stringify(tmp);\r\n        console.log(xhttpSendString);\r\n        xhttp.send(xhttpSendString);\r\n    };\r\n    return Fridge;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/FridgeClass.ts?");

/***/ }),

/***/ "./src/NoteClass.ts":
/*!**************************!*\
  !*** ./src/NoteClass.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Note\": () => (/* binding */ Note)\n/* harmony export */ });\n/* harmony import */ var _node_modules_tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/tinymce/tinymce */ \"./node_modules/tinymce/tinymce.js\");\n/* harmony import */ var _node_modules_tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0__);\n\r\nvar notesArea = document.getElementById(\"notes--area\");\r\nvar elContainer = document.getElementById(\"container\");\r\nvar elAllNotes = document.getElementById(\"notes--all\");\r\nvar elNowNotes = document.getElementById(\"notes--now\");\r\nvar id = 0;\r\nvar Note = /** @class */ (function () {\r\n    function Note(fridge, config) {\r\n        var _this = this;\r\n        this.isDragging = false;\r\n        this.lastOffsetX = 0;\r\n        this.lastOffsetY = 0;\r\n        this.width = 120;\r\n        this.height = 50;\r\n        this.offSetX = 0;\r\n        this.offSetY = 0;\r\n        this.fridge = null;\r\n        this.html = \"<input type=\\\"image\\\" src=\\\"../dist/images/edit.png\\\" class=\\\"edit--note\\\"/>\\n  <img src=\\\"../dist/images/close.png\\\" alt=\\\"photo\\\" class=\\\"delete--note\\\"></img>\\n  <img src=\\\"../dist/images/resize.png\\\" alt=\\\"photo\\\" class=\\\"resize--note\\\"></img>\";\r\n        this.contentText = document.createElement(\"div\");\r\n        this.drag = function (e) {\r\n            if (!_this.isDragging)\r\n                return;\r\n            // (this.note.lastChild as HTMLDivElement).style.display = \"none\";\r\n            _this.dragTarget.style.left = e.clientX - _this.lastOffsetX + \"px\";\r\n            _this.dragTarget.style.top = e.clientY - _this.lastOffsetY + \"px\";\r\n            _this.offSetX = e.clientX - _this.lastOffsetX;\r\n            _this.offSetY = e.clientY - _this.lastOffsetY;\r\n        };\r\n        id++;\r\n        this.fridge = fridge;\r\n        if (config) {\r\n            this.width = parseInt(config.width);\r\n            this.height = parseInt(config.height);\r\n            this.offSetX = parseInt(config.offSetX);\r\n            this.offSetY = parseInt(config.offSetX);\r\n        }\r\n        this.note = document.createElement(\"div\");\r\n        this.note.classList.add(\"note\");\r\n        this.contentText.innerHTML = \"<p id='pText'>Hello World!</p>\";\r\n        this.note.setAttribute(\"id\", \"note\".concat(id));\r\n        this.note.innerHTML = this.html;\r\n        this.contentText.classList.add(\"edited--text\");\r\n        notesArea === null || notesArea === void 0 ? void 0 : notesArea.append(this.note);\r\n        this.position(this.note);\r\n        this.note.appendChild(this.contentText);\r\n        this.applyDeleteNotes();\r\n        this.makeDrag();\r\n        this.makeResizable();\r\n        this.changeMov();\r\n    }\r\n    Note.prototype.changeMov = function () {\r\n        elAllNotes.textContent = \"Przebieg: \".concat(this.fridge.all_notes);\r\n        elNowNotes.textContent = \"Na lod\\u00F3wce: \".concat(this.fridge.now_notes);\r\n    };\r\n    Note.prototype.position = function (note) {\r\n        this.note.style.left = 150 + Math.round(Math.random() * 50) + \"px\";\r\n        note.style.top = 50 + Math.round(Math.random() * 50) + \"px\";\r\n    };\r\n    Note.prototype.deleteNote = function (el) {\r\n        el.target.parentNode.remove();\r\n        this.changeMov();\r\n        this.fridge.arrNotes.splice(this.fridge.arrNotes.indexOf(this), 1);\r\n        this.fridge.updateDb();\r\n    };\r\n    Note.prototype.applyDeleteNotes = function () {\r\n        var _this = this;\r\n        var btnDelete = this.note.children[1];\r\n        // let btnDeleteNote = document.querySelectorAll(\".delete--note\");\r\n        // btnDeleteNote.forEach((btn) => {\r\n        btnDelete.addEventListener(\"click\", function (e) {\r\n            _this.fridge.now_notes--;\r\n            _this.deleteNote(e);\r\n            // for(let i=0; i<this.fridge.arrNotes.length;i++){\r\n            //   if(this.fridge.arrNotes[i].note == this.note){\r\n            //     this.fridge.arrNotes.\r\n            //   }\r\n            // }\r\n        });\r\n        // });\r\n    };\r\n    Note.prototype.makeDrag = function () {\r\n        var _this = this;\r\n        // document\r\n        //   .querySelector(\".edited--text\")\r\n        //   .addEventListener(\"mouseover\", () => {\r\n        //     (this.note.lastChild as HTMLDivElement).style.display = \"none\";\r\n        //   });\r\n        // document.querySelector(\".edited--text\").addEventListener(\"mouseout\", () => {\r\n        //   (this.note.lastChild as HTMLDivElement).style.display = \"block\";\r\n        // });\r\n        window.addEventListener(\"mousedown\", function (e) {\r\n            if (!e.target.classList.contains(\"note\")) {\r\n                return;\r\n            }\r\n            // (this.note.lastChild as HTMLDivElement).style.display = \"none\";\r\n            _this.dragTarget = e.target;\r\n            _this.dragTarget.parentNode.append(_this.dragTarget);\r\n            _this.lastOffsetX = e.offsetX;\r\n            _this.lastOffsetY = e.offsetY;\r\n            _this.isDragging = true;\r\n            // fridge.updateDb();\r\n        });\r\n        window.addEventListener(\"mousemove\", this.drag);\r\n        var closeDragging = function () {\r\n            _this.isDragging = false;\r\n            window.removeEventListener(\"mouseup\", closeDragging);\r\n        };\r\n        window.addEventListener(\"mouseup\", function () {\r\n            closeDragging();\r\n            _this.fridge.updateDb();\r\n            // (this.note.lastChild as HTMLDivElement).style.display = \"block\";\r\n        });\r\n    };\r\n    Note.prototype.makeResizable = function () {\r\n        var original_width = 0;\r\n        var original_height = 0;\r\n        var original_mouse_x = 0;\r\n        var original_mouse_y = 0;\r\n        var minSize = 100;\r\n        var maxSize = 500;\r\n        var noteT = this;\r\n        var noteP = this.note;\r\n        var currentDelete = this.note.children[1];\r\n        var currentResizer = this.note.children[2];\r\n        currentResizer.addEventListener(\"mousedown\", function (e) {\r\n            e.preventDefault();\r\n            original_width = parseFloat(getComputedStyle(noteP, null)\r\n                .getPropertyValue(\"width\")\r\n                .replace(\"px\", \"\"));\r\n            original_height = parseFloat(getComputedStyle(noteP, null)\r\n                .getPropertyValue(\"height\")\r\n                .replace(\"px\", \"\"));\r\n            original_mouse_x = e.pageX;\r\n            original_mouse_y = e.pageY;\r\n            window.addEventListener(\"mousemove\", resize);\r\n            window.addEventListener(\"mouseup\", stopResize);\r\n        });\r\n        var resize = function (e) {\r\n            var width = original_width + (e.pageX - original_mouse_x);\r\n            var height = original_height + (e.pageY - original_mouse_y);\r\n            if (width > minSize && width < maxSize) {\r\n                noteP.style.width = width + \"px\";\r\n                noteT.width = width;\r\n                currentDelete.style.left = \"\".concat(width - 30, \"px\");\r\n                currentResizer.style.left = \"\".concat(width - 20, \"px\");\r\n            }\r\n            if (height > minSize && height < maxSize) {\r\n                noteP.style.height = height + \"px\";\r\n                noteT.height = height;\r\n                currentResizer.style.top = \"\".concat(height - 20, \"px\");\r\n                noteP.children[3].style.maxHeight = \"\".concat(height - 80, \"px\");\r\n            }\r\n        };\r\n        var stopResize = function () {\r\n            window.removeEventListener(\"mousemove\", resize);\r\n            noteT.fridge.updateDb();\r\n        };\r\n    };\r\n    Note.prototype.openEditor = function () {\r\n        var _this = this;\r\n        var noteP = this.note;\r\n        noteP.children[0].setAttribute(\"id\", \"open--editor\".concat(id));\r\n        var editArea = document.createElement(\"textarea\");\r\n        editArea.classList.add(\"editor--area\");\r\n        editArea.setAttribute(\"id\", \"editorOne\");\r\n        var btnOpenEditor = document.querySelector(\"#open--editor\".concat(id));\r\n        btnOpenEditor.addEventListener(\"click\", function () {\r\n            editArea.textContent = _this.contentText.innerHTML;\r\n            elContainer.appendChild(editArea);\r\n            _node_modules_tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0___default().init({\r\n                selector: \"#editorOne\",\r\n                height: \"100vh\",\r\n                width: \"100vw\",\r\n                init_instance_callback: function () {\r\n                    document.querySelector(\".tox\").style.zIndex =\r\n                        \"100\";\r\n                    document.querySelector(\".tox\").style.top =\r\n                        \"-10vh\";\r\n                    document.querySelector(\".tox-statusbar__branding\").style.display = \"none\";\r\n                    document.querySelector(\".tox-statusbar__resize-handle\").style.display = \"none\";\r\n                    var statusBar = document.querySelector(\".tox-statusbar\");\r\n                    var btnClose = document.createElement(\"button\");\r\n                    btnClose.innerHTML =\r\n                        '<img src=\"../dist/images/close.png\" alt=\"photo\" class=\"close--editor\"></img>';\r\n                    var btnSave = document.createElement(\"button\");\r\n                    btnSave.innerHTML =\r\n                        '<img src=\"../dist/images/save.png\" alt=\"photo\" class=\"save--editor\"></img>';\r\n                    statusBar.appendChild(btnClose);\r\n                    statusBar.appendChild(btnSave);\r\n                    btnClose.addEventListener(\"click\", function () {\r\n                        _node_modules_tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0___default().get(\"editorOne\").setContent(_this.contentText.innerHTML);\r\n                        _node_modules_tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0___default().remove();\r\n                        elContainer.removeChild(editArea);\r\n                    });\r\n                    btnSave.addEventListener(\"click\", function () {\r\n                        var editedText = _node_modules_tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0___default().get(\"editorOne\").getContent();\r\n                        _this.contentText.innerHTML = editedText;\r\n                        _node_modules_tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0___default().remove();\r\n                        elContainer.removeChild(editArea);\r\n                        _this.fridge.updateDb();\r\n                    });\r\n                },\r\n            });\r\n        });\r\n    };\r\n    return Note;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/NoteClass.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _FridgeClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FridgeClass */ \"./src/FridgeClass.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\n\r\nwindow.onload = function () {\r\n    function getFridgeInfo() {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var response, data;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0: return [4 /*yield*/, fetch(\"../dist/php/fridgeData.json\")];\r\n                    case 1:\r\n                        response = _a.sent();\r\n                        return [4 /*yield*/, response.json()];\r\n                    case 2:\r\n                        data = _a.sent();\r\n                        return [2 /*return*/, data];\r\n                }\r\n            });\r\n        });\r\n    }\r\n    getFridgeInfo().then(function (data) {\r\n        var fridgeConfig = data[0];\r\n        var fridge = new _FridgeClass__WEBPACK_IMPORTED_MODULE_0__.Fridge(fridgeConfig);\r\n        fridge.createNotes();\r\n        fridge.updateDb();\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack:///./src/app.ts?");

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
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;