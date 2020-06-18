import { __decorate } from 'tslib';
import { EventEmitter, ElementRef, NgZone, Input, Output, Component, forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import loadScript from 'load-script';

/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
var promise;
function getEditorNamespace(editorURL) {
    if (editorURL.length < 1) {
        throw new TypeError('CKEditor URL must be a non-empty string.');
    }
    if ('CKEDITOR' in window) {
        return Promise.resolve(CKEDITOR);
    }
    else if (!promise) {
        promise = new Promise(function (scriptResolve, scriptReject) {
            loadScript(editorURL, function (err) {
                if (err) {
                    scriptReject(err);
                }
                else {
                    scriptResolve(CKEDITOR);
                    promise = undefined;
                }
            });
        });
    }
    return promise;
}

/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
var CKEditorComponent = /** @class */ (function () {
    function CKEditorComponent(elementRef, ngZone) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        /**
         * Tag name of the editor component.
         *
         * The default tag is `textarea`.
         */
        this.tagName = 'textarea';
        /**
         * The type of the editor interface.
         *
         * By default editor interface will be initialized as `divarea` editor which is an inline editor with fixed UI.
         * You can change interface type by choosing between `divarea` and `inline` editor interface types.
         *
         * See https://ckeditor.com/docs/ckeditor4/latest/guide/dev_uitypes.html
         * and https://ckeditor.com/docs/ckeditor4/latest/examples/fixedui.html
         * to learn more.
         */
        this.type = "classic" /* CLASSIC */;
        /**
         * Fires when the editor is ready. It corresponds with the `editor#instanceReady`
         * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-instanceReady
         * event.
         */
        this.ready = new EventEmitter();
        /**
         * Fires when the editor data is loaded, e.g. after calling setData()
         * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-setData
         * editor's method. It corresponds with the `editor#dataReady`
         * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-dataReady event.
         */
        this.dataReady = new EventEmitter();
        /**
         * Fires when the content of the editor has changed. It corresponds with the `editor#change`
         * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-change
         * event. For performance reasons this event may be called even when data didn't really changed.
         * Please note that this event will only be fired when `undo` plugin is loaded. If you need to
         * listen for editor changes (e.g. for two-way data binding), use `dataChange` event instead.
         */
        this.change = new EventEmitter();
        /**
         * Fires when the content of the editor has changed. In contrast to `change` - only emits when
         * data really changed thus can be successfully used with `[data]` and two way `[(data)]` binding.
         *
         * See more: https://angular.io/guide/template-syntax#two-way-binding---
         */
        this.dataChange = new EventEmitter();
        /**
         * Fires when the native drop event occurs. It corresponds with the `editor#dragstart`
         * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-dragstart
         * event.
         */
        this.dragStart = new EventEmitter();
        /**
         * Fires when the native drop event occurs. It corresponds with the `editor#dragend`
         * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-dragend
         * event.
         */
        this.dragEnd = new EventEmitter();
        /**
         * Fires when the native drop event occurs. It corresponds with the `editor#drop`
         * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-drop
         * event.
         */
        this.drop = new EventEmitter();
        /**
         * Fires when the file loader response is received. It corresponds with the `editor#fileUploadResponse`
         * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-fileUploadResponse
         * event.
         */
        this.fileUploadResponse = new EventEmitter();
        /**
         * Fires when the file loader should send XHR. It corresponds with the `editor#fileUploadRequest`
         * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-fileUploadRequest
         * event.
         */
        this.fileUploadRequest = new EventEmitter();
        /**
         * Fires when the editing view of the editor is focused. It corresponds with the `editor#focus`
         * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-focus
         * event.
         */
        this.focus = new EventEmitter();
        /**
         * Fires after the user initiated a paste action, but before the data is inserted.
         * It corresponds with the `editor#paste`
         * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-paste
         * event.
         */
        this.paste = new EventEmitter();
        /**
         * Fires after the `paste` event if content was modified. It corresponds with the `editor#afterPaste`
         * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-afterPaste
         * event.
         */
        this.afterPaste = new EventEmitter();
        /**
         * Fires when the editing view of the editor is blurred. It corresponds with the `editor#blur`
         * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#event-blur
         * event.
         */
        this.blur = new EventEmitter();
        /**
         * If the component is read–only before the editor instance is created, it remembers that state,
         * so the editor can become read–only once it is ready.
         */
        this._readOnly = null;
        this._data = null;
        /**
         * CKEditor 4 script url address. Script will be loaded only if CKEDITOR namespace is missing.
         *
         * Defaults to 'https://cdn.ckeditor.com/4.14.1/standard-all/ckeditor.js'
         */
        this.editorUrl = 'https://cdn.ckeditor.com/4.14.1/standard-all/ckeditor.js';
    }
    CKEditorComponent_1 = CKEditorComponent;
    Object.defineProperty(CKEditorComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Keeps track of the editor's data.
         *
         * It's also decorated as an input which is useful when not using the ngModel.
         *
         * See https://angular.io/api/forms/NgModel to learn more.
         */
        set: function (data) {
            if (data === this._data) {
                return;
            }
            if (this.instance) {
                this.instance.setData(data);
                // Data may be changed by ACF.
                this._data = this.instance.getData();
                return;
            }
            this._data = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CKEditorComponent.prototype, "readOnly", {
        get: function () {
            if (this.instance) {
                return this.instance.readOnly;
            }
            return this._readOnly;
        },
        /**
         * When set `true`, the editor becomes read-only.
         * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#property-readOnly
         * to learn more.
         */
        set: function (isReadOnly) {
            if (this.instance) {
                this.instance.setReadOnly(isReadOnly);
                return;
            }
            // Delay setting read-only state until editor initialization.
            this._readOnly = isReadOnly;
        },
        enumerable: true,
        configurable: true
    });
    CKEditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        getEditorNamespace(this.editorUrl).then(function () {
            _this.ngZone.runOutsideAngular(_this.createEditor.bind(_this));
        }).catch(window.console.error);
    };
    CKEditorComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            if (_this.instance) {
                _this.instance.destroy();
                _this.instance = null;
            }
        });
    };
    CKEditorComponent.prototype.writeValue = function (value) {
        this.data = value;
    };
    CKEditorComponent.prototype.registerOnChange = function (callback) {
        this.onChange = callback;
    };
    CKEditorComponent.prototype.registerOnTouched = function (callback) {
        this.onTouched = callback;
    };
    CKEditorComponent.prototype.createEditor = function () {
        var _this = this;
        var element = document.createElement(this.tagName);
        this.elementRef.nativeElement.appendChild(element);
        if (this.type === "divarea" /* DIVAREA */) {
            this.config = this.ensureDivareaPlugin(this.config || {});
        }
        var instance = this.type === "inline" /* INLINE */
            ? CKEDITOR.inline(element, this.config)
            : CKEDITOR.replace(element, this.config);
        instance.once('instanceReady', function (evt) {
            _this.instance = instance;
            // Read only state may change during instance initialization.
            _this.readOnly = _this._readOnly !== null ? _this._readOnly : _this.instance.readOnly;
            _this.subscribe(_this.instance);
            var undo = instance.undoManager;
            if (_this.data !== null) {
                undo && undo.lock();
                instance.setData(_this.data, { callback: function () {
                        // Locking undoManager prevents 'change' event.
                        // Trigger it manually to updated bound data.
                        if (_this.data !== instance.getData()) {
                            undo ? instance.fire('change') : instance.fire('dataReady');
                        }
                        undo && undo.unlock();
                        _this.ngZone.run(function () {
                            _this.ready.emit(evt);
                        });
                    } });
            }
            else {
                _this.ngZone.run(function () {
                    _this.ready.emit(evt);
                });
            }
        });
    };
    CKEditorComponent.prototype.subscribe = function (editor) {
        var _this = this;
        editor.on('focus', function (evt) {
            _this.ngZone.run(function () {
                _this.focus.emit(evt);
            });
        });
        editor.on('paste', function (evt) {
            _this.ngZone.run(function () {
                _this.paste.emit(evt);
            });
        });
        editor.on('afterPaste', function (evt) {
            _this.ngZone.run(function () {
                _this.afterPaste.emit(evt);
            });
        });
        editor.on('dragend', function (evt) {
            _this.ngZone.run(function () {
                _this.dragEnd.emit(evt);
            });
        });
        editor.on('dragstart', function (evt) {
            _this.ngZone.run(function () {
                _this.dragStart.emit(evt);
            });
        });
        editor.on('drop', function (evt) {
            _this.ngZone.run(function () {
                _this.drop.emit(evt);
            });
        });
        editor.on('fileUploadRequest', function (evt) {
            _this.ngZone.run(function () {
                _this.fileUploadRequest.emit(evt);
            });
        });
        editor.on('fileUploadResponse', function (evt) {
            _this.ngZone.run(function () {
                _this.fileUploadResponse.emit(evt);
            });
        });
        editor.on('blur', function (evt) {
            _this.ngZone.run(function () {
                if (_this.onTouched) {
                    _this.onTouched();
                }
                _this.blur.emit(evt);
            });
        });
        editor.on('dataReady', this.propagateChange, this);
        if (this.instance.undoManager) {
            editor.on('change', this.propagateChange, this);
        }
        // If 'undo' plugin is not loaded, listen to 'selectionCheck' event instead. (#54).
        else {
            editor.on('selectionCheck', this.propagateChange, this);
        }
    };
    CKEditorComponent.prototype.propagateChange = function (event) {
        var _this = this;
        this.ngZone.run(function () {
            var newData = _this.instance.getData();
            if (event.name == 'change') {
                _this.change.emit(event);
            }
            else if (event.name == 'dataReady') {
                _this.dataReady.emit(event);
            }
            if (newData === _this.data) {
                return;
            }
            _this._data = newData;
            _this.dataChange.emit(newData);
            if (_this.onChange) {
                _this.onChange(newData);
            }
        });
    };
    CKEditorComponent.prototype.ensureDivareaPlugin = function (config) {
        var extraPlugins = config.extraPlugins, removePlugins = config.removePlugins;
        extraPlugins = this.removePlugin(extraPlugins, 'divarea') || '';
        extraPlugins = extraPlugins.concat(typeof extraPlugins === 'string' ? ',divarea' : 'divarea');
        if (removePlugins && removePlugins.includes('divarea')) {
            removePlugins = this.removePlugin(removePlugins, 'divarea');
            console.warn('[CKEDITOR] divarea plugin is required to initialize editor using Angular integration.');
        }
        return Object.assign({}, config, { extraPlugins: extraPlugins, removePlugins: removePlugins });
    };
    CKEditorComponent.prototype.removePlugin = function (plugins, toRemove) {
        if (!plugins) {
            return null;
        }
        var isString = typeof plugins === 'string';
        if (isString) {
            plugins = plugins.split(',');
        }
        plugins = plugins.filter(function (plugin) { return plugin !== toRemove; });
        if (isString) {
            plugins = plugins.join(',');
        }
        return plugins;
    };
    var CKEditorComponent_1;
    CKEditorComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], CKEditorComponent.prototype, "config", void 0);
    __decorate([
        Input()
    ], CKEditorComponent.prototype, "tagName", void 0);
    __decorate([
        Input()
    ], CKEditorComponent.prototype, "type", void 0);
    __decorate([
        Input()
    ], CKEditorComponent.prototype, "data", null);
    __decorate([
        Input()
    ], CKEditorComponent.prototype, "readOnly", null);
    __decorate([
        Output()
    ], CKEditorComponent.prototype, "ready", void 0);
    __decorate([
        Output()
    ], CKEditorComponent.prototype, "dataReady", void 0);
    __decorate([
        Output()
    ], CKEditorComponent.prototype, "change", void 0);
    __decorate([
        Output()
    ], CKEditorComponent.prototype, "dataChange", void 0);
    __decorate([
        Output()
    ], CKEditorComponent.prototype, "dragStart", void 0);
    __decorate([
        Output()
    ], CKEditorComponent.prototype, "dragEnd", void 0);
    __decorate([
        Output()
    ], CKEditorComponent.prototype, "drop", void 0);
    __decorate([
        Output()
    ], CKEditorComponent.prototype, "fileUploadResponse", void 0);
    __decorate([
        Output()
    ], CKEditorComponent.prototype, "fileUploadRequest", void 0);
    __decorate([
        Output()
    ], CKEditorComponent.prototype, "focus", void 0);
    __decorate([
        Output()
    ], CKEditorComponent.prototype, "paste", void 0);
    __decorate([
        Output()
    ], CKEditorComponent.prototype, "afterPaste", void 0);
    __decorate([
        Output()
    ], CKEditorComponent.prototype, "blur", void 0);
    __decorate([
        Input()
    ], CKEditorComponent.prototype, "editorUrl", void 0);
    CKEditorComponent = CKEditorComponent_1 = __decorate([
        Component({
            selector: 'ckeditor',
            template: '<ng-template></ng-template>',
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return CKEditorComponent_1; }),
                    multi: true,
                }
            ]
        })
    ], CKEditorComponent);
    return CKEditorComponent;
}());

/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
var CKEditorModule = /** @class */ (function () {
    function CKEditorModule() {
    }
    CKEditorModule = __decorate([
        NgModule({
            imports: [FormsModule, CommonModule],
            declarations: [CKEditorComponent],
            exports: [CKEditorComponent]
        })
    ], CKEditorModule);
    return CKEditorModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { CKEditorComponent, CKEditorModule };
//# sourceMappingURL=ckeditor4-angular.js.map
