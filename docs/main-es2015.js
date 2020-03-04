(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _drawing_canvas_drawing_canvas_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawing-canvas/drawing-canvas.component */ "./src/app/drawing-canvas/drawing-canvas.component.ts");



class AppComponent {
    constructor() {
        this.title = 'img-labeler';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Ayo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-drawing-canvas");
    } }, directives: [_drawing_canvas_drawing_canvas_component__WEBPACK_IMPORTED_MODULE_1__["DrawingCanvasComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _drawing_canvas_drawing_canvas_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./drawing-canvas/drawing-canvas.component */ "./src/app/drawing-canvas/drawing-canvas.component.ts");
/* harmony import */ var _canvas_map_canvas_map_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./canvas-map/canvas-map.component */ "./src/app/canvas-map/canvas-map.component.ts");







class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _drawing_canvas_drawing_canvas_component__WEBPACK_IMPORTED_MODULE_4__["DrawingCanvasComponent"],
        _canvas_map_canvas_map_component__WEBPACK_IMPORTED_MODULE_5__["CanvasMapComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _drawing_canvas_drawing_canvas_component__WEBPACK_IMPORTED_MODULE_4__["DrawingCanvasComponent"],
                    _canvas_map_canvas_map_component__WEBPACK_IMPORTED_MODULE_5__["CanvasMapComponent"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/canvas-map/canvas-map.component.ts":
/*!****************************************************!*\
  !*** ./src/app/canvas-map/canvas-map.component.ts ***!
  \****************************************************/
/*! exports provided: CanvasMapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasMapComponent", function() { return CanvasMapComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


const _c0 = ["canvas"];
class CanvasMapComponent {
    constructor() {
        this.drawing = false;
        this.points = [];
    }
    ngOnInit() {
    }
    click(e) {
        console.log(e);
        let ctx = this.canvas.nativeElement.getContext('2d');
        ctx.fillRect(e.offsetX, e.offsetY, 10, 10);
        this.points.push([e.offsetX, e.offsetY]);
        let pointsL = this.points.length;
        if (this.points.length > 1) {
            ctx.moveTo(this.points[pointsL - 1][0], this.points[pointsL - 1][1]);
            ctx.lineTo(this.points[pointsL - 2][0], this.points[pointsL - 2][1]);
            ctx.stroke();
        }
    }
}
CanvasMapComponent.ɵfac = function CanvasMapComponent_Factory(t) { return new (t || CanvasMapComponent)(); };
CanvasMapComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CanvasMapComponent, selectors: [["app-canvas-map"]], viewQuery: function CanvasMapComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.canvas = _t.first);
    } }, decls: 4, vars: 0, consts: [["width", "900", "height", "900", 3, "click"], ["canvas", ""]], template: function CanvasMapComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "canvas-map works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "canvas", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CanvasMapComponent_Template_canvas_click_2_listener($event) { return ctx.click($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NhbnZhcy1tYXAvY2FudmFzLW1hcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CanvasMapComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-canvas-map',
                templateUrl: './canvas-map.component.html',
                styleUrls: ['./canvas-map.component.css']
            }]
    }], function () { return []; }, { canvas: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['canvas']
        }] }); })();


/***/ }),

/***/ "./src/app/drawing-canvas/drawing-canvas.component.ts":
/*!************************************************************!*\
  !*** ./src/app/drawing-canvas/drawing-canvas.component.ts ***!
  \************************************************************/
/*! exports provided: DrawingCanvasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawingCanvasComponent", function() { return DrawingCanvasComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
/* harmony import */ var save_svg_as_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! save-svg-as-png */ "./node_modules/save-svg-as-png/lib/saveSvgAsPng.js");
/* harmony import */ var save_svg_as_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(save_svg_as_png__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





const _c0 = ["artboard"];
const _c1 = ["opacity"];
const _c2 = ["url"];
class DrawingCanvasComponent {
    constructor(renderer) {
        this.renderer = renderer;
        this.dragging = false;
        this.drawing = false;
        this.points = [];
        this.color = '#402020';
        this.colorIndex = 0;
    }
    ngOnInit() {
        this.svg = d3__WEBPACK_IMPORTED_MODULE_1__["select"]('.artboard').append('svg')
            .attr('height', 950)
            .attr('width', 1250);
    }
    mouseUp(e) {
        console.log(e);
        if (this.dragging)
            return;
        this.drawing = true;
        this.startPoint = [e.offsetX, e.offsetY];
        if (this.svg.select('g.drawPoly').empty())
            this.g = this.svg.append('g').attr('class', 'drawPoly');
        if (e.toElement.tagName == 'circle') {
            console.log('close!');
            this.closePolygon();
            return;
        }
        ;
        this.points.push([e.offsetX, e.offsetY]);
        this.g.select('polyline').remove();
        var polyline = this.g.append('polyline').attr('points', this.points)
            .style('fill', 'none')
            .attr('stroke', '#000');
        for (var i = 0; i < this.points.length; i++) {
            this.g.append('circle')
                .attr('cx', this.points[i][0])
                .attr('cy', this.points[i][1])
                .attr('r', 4)
                .attr('fill', 'yellow')
                .attr('stroke', '#000')
                .attr('is-handle', 'true')
                .attr('style', "cursor:pointer");
        }
    }
    ;
    closePolygon() {
        this.svg.select('g.drawPoly').remove();
        var g = this.svg.append('g');
        g.append('polygon')
            .attr('points', this.points)
            .style('fill', this.color);
        for (var i = 0; i < this.points.length; i++) {
            let holder = this;
            var circle = g.selectAll('circles')
                .data([this.points[i]])
                .enter()
                .append('circle')
                .attr('cx', this.points[i][0])
                .attr('cy', this.points[i][1])
                .attr('r', 4)
                .attr('fill', '#FDBC07')
                .attr('stroke', '#000')
                .attr('is-handle', 'true')
                .attr('cursor', 'move')
                .call(d3__WEBPACK_IMPORTED_MODULE_1__["drag"]()
                .on('drag', function () {
                holder.handleDrag(this);
            })
                .on("end", () => (this.dragging = false)));
        }
        this.points.splice(0);
        this.drawing = false;
    }
    mouseMove(e) {
        if (!this.drawing || e.target == 'circle')
            return;
        var g = d3__WEBPACK_IMPORTED_MODULE_1__["select"]('g.drawPoly');
        g.select('line').remove();
        var line = g.append('line')
            .attr('x1', this.startPoint[0])
            .attr('y1', this.startPoint[1])
            .attr('x2', e.pageX - this.artboard.nativeElement.offsetLeft + 1)
            .attr('y2', e.pageY - this.artboard.nativeElement.offsetTop + 1)
            .attr('stroke', '#53DBF3')
            .attr('stroke-width', 1);
    }
    handleDrag(e) {
        console.log(e);
        if (this.drawing)
            return;
        var newPoints = [], circle;
        this.dragging = true;
        var poly = d3__WEBPACK_IMPORTED_MODULE_1__["select"](e.parentNode).select('polygon');
        var circles = d3__WEBPACK_IMPORTED_MODULE_1__["select"](e.parentNode).selectAll('circle');
        e.setAttribute('cy', d3__WEBPACK_IMPORTED_MODULE_1__["event"].y);
        e.setAttribute('cx', d3__WEBPACK_IMPORTED_MODULE_1__["event"].x);
        for (var i = 0; i < circles._groups[0].length; i++) {
            circle = d3__WEBPACK_IMPORTED_MODULE_1__["select"](circles._groups[0][i]);
            newPoints.push([circle.attr('cx'), circle.attr('cy')]);
        }
        poly.attr('points', newPoints);
    }
    updateOpacity() {
        console.log(this.opacity.nativeElement.value);
        this.svg.selectAll('polygon').style('opacity', this.opacity.nativeElement.value * .01);
        this.svg.selectAll('circle').style('opacity', this.opacity.nativeElement.value * .01);
    }
    save() {
        this.svg.selectAll('polygon').style('opacity', 1);
        this.svg.selectAll('circle').style('opacity', 0);
        save_svg_as_png__WEBPACK_IMPORTED_MODULE_2__["saveSvgAsPng"](this.artboard.nativeElement.children[0], this.url.nativeElement.value.split('/').pop(), { width: 1164, height: 874, top: 43, left: 38 });
    }
    changeColor(id) {
        let colors = ['#402020', '#ff0000', '#808060', '#00ff66', '#cc00ff'];
        this.color = colors[id];
        this.colorIndex = id;
    }
    updateImage() {
        this.svg.style('background-image', `url('${this.url.nativeElement.value}')`);
    }
}
DrawingCanvasComponent.ɵfac = function DrawingCanvasComponent_Factory(t) { return new (t || DrawingCanvasComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"])); };
DrawingCanvasComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DrawingCanvasComponent, selectors: [["app-drawing-canvas"]], viewQuery: function DrawingCanvasComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.artboard = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.opacity = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.url = _t.first);
    } }, decls: 27, vars: 5, consts: [[1, "container-fluid", "mb-4"], [1, "input-group", "ml-2", "mt-1", "mb-1", 2, "width", "1100px"], [1, "input-group-prepend"], ["id", "basic-addon1", 1, "input-group-text"], ["type", "text", "value", "https://raw.githubusercontent.com/commaai/comma10k/master/imgs/0005_836d09212ac1b8fa_2018-06-15--15-57-15_23_345.png", "aria-describedby", "basic-addon1", 1, "form-control", 3, "input"], ["url", ""], ["type", "button", "id", "colorSelector0", 1, "btn", "btn-primary", "mr-2", "ml-2", 2, "border-color", "#402020", "background-color", "#402020", 3, "ngClass", "click"], ["type", "button", "id", "colorSelector1", 1, "btn", "btn-primary", "mr-2", 2, "border-color", "#ff0000", "background-color", "#ff0000", 3, "ngClass", "click"], ["type", "button", "id", "colorSelector2", 1, "btn", "btn-primary", "mr-2", 2, "border-color", "#808060", "background-color", "#808060", 3, "ngClass", "click"], ["type", "button", "id", "colorSelector3", 1, "btn", "btn-primary", "mr-2", 2, "border-color", "#00ff66", "background-color", "#00ff66", 3, "ngClass", "click"], ["type", "button", "id", "colorSelector4", 1, "btn", "btn-primary", "mr-2", 2, "border-color", "#cc00ff", "background-color", "#cc00ff", 3, "ngClass", "click"], [1, "input-group", "ml-2", "mt-1", 2, "width", "250px"], ["type", "number", "value", "100", "aria-describedby", "basic-addon1", 1, "form-control", 3, "input"], ["opacity", ""], ["type", "button", 1, "btn", "btn-primary", "mt-1", "ml-2", "mb-2", 3, "click"], [1, "artboard", 3, "mouseup", "mousemove"], ["artboard", ""]], template: function DrawingCanvasComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Image URL");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "input", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function DrawingCanvasComponent_Template_input_input_5_listener() { return ctx.updateImage(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DrawingCanvasComponent_Template_button_click_7_listener() { return ctx.changeColor(0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Road");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DrawingCanvasComponent_Template_button_click_9_listener() { return ctx.changeColor(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Lane Markings");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DrawingCanvasComponent_Template_button_click_11_listener() { return ctx.changeColor(2); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Undrivable");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DrawingCanvasComponent_Template_button_click_13_listener() { return ctx.changeColor(3); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Movable");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DrawingCanvasComponent_Template_button_click_15_listener() { return ctx.changeColor(4); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "My Car");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Mask Opacity");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "input", 12, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function DrawingCanvasComponent_Template_input_input_21_listener() { return ctx.updateOpacity(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DrawingCanvasComponent_Template_button_click_23_listener() { return ctx.save(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Save");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 15, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mouseup", function DrawingCanvasComponent_Template_div_mouseup_25_listener($event) { return ctx.mouseUp($event); })("mousemove", function DrawingCanvasComponent_Template_div_mousemove_25_listener($event) { return ctx.mouseMove($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.colorIndex == 0 ? "underline" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.colorIndex == 1 ? "underline" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.colorIndex == 2 ? "underline" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.colorIndex == 3 ? "underline" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.colorIndex == 4 ? "underline" : "");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RyYXdpbmctY2FudmFzL2RyYXdpbmctY2FudmFzLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DrawingCanvasComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-drawing-canvas',
                templateUrl: './drawing-canvas.component.html',
                styleUrls: ['./drawing-canvas.component.css']
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }]; }, { artboard: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['artboard']
        }], opacity: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['opacity']
        }], url: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['url']
        }] }); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Erik\dev\img-labeler\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map