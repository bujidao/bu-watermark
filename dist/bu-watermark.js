"use strict";
var BuWatermark = /** @class */ (function () {
    function BuWatermark(options) {
        this.text = [];
        this.options = {
            angle: 25,
            fontColor: '#000',
            opacity: '0.2',
            zIndex: 10000,
            fontSize: '16px',
            fontFamily: 'Arial'
        };
        this.validateOptions(options);
    }
    BuWatermark.prototype.validateOptions = function (options) {
        if (Object.prototype.toString.call(options) != '[object Object]') {
            console.error('传入数据格式不正确');
            return;
        }
        if (!options.hasOwnProperty('text')) {
            console.error('请传入水印文本');
            return;
        }
        var _a = options.target, target = _a === void 0 ? document.body : _a, text = options.text;
        this.target = target;
        this.text = text;
        this.options = options.options;
        var _b = this.options, _c = _b.angle, angle = _c === void 0 ? 25 : _c, _d = _b.fontColor, fontColor = _d === void 0 ? '#000' : _d, _e = _b.opacity, opacity = _e === void 0 ? '0.2' : _e, _f = _b.zIndex, zIndex = _f === void 0 ? 10000 : _f, _g = _b.fontSize, fontSize = _g === void 0 ? '16px' : _g, _h = _b.fontFamily, fontFamily = _h === void 0 ? 'Arial' : _h;
        this.options.angle = angle;
        this.options.fontColor = fontColor;
        this.options.opacity = opacity;
        this.options.zIndex = zIndex;
        this.options.fontSize = fontSize;
        this.options.fontFamily = fontFamily;
        this.init();
    };
    BuWatermark.prototype.init = function () {
        var imageSrc = this.createCanvas();
        var dom = this.createContainer(imageSrc);
        this.render(dom);
        this.observer();
    };
    BuWatermark.prototype.createCanvas = function () {
        var canvas = document.createElement('canvas');
        canvas.id = '__canvas';
        canvas.width = '300';
        canvas.height = '200';
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = this.options.fontColor;
        ctx.rotate((this.options.angle * Math.PI) / 180); // 偏转的角度
        ctx.font = this.options.fontSize + ' ' + this.options.fontFamily;
        if (['[object String]', '[object Number]'].indexOf(Object.prototype.toString.call(this.text)) != -1) {
            ctx.fillText(this.text, 30, 0); // 绘制文本 绘制开始位置
        }
        else if (Object.prototype.toString.call(this.text) == '[object Array]') {
            // @ts-ignore
            for (var i = 0; i < this.text.length; i++) {
                ctx.fillText(this.text, 30, 20 * i);
            }
        }
        var src = canvas.toDataURL('image/png');
        return src;
    };
    BuWatermark.prototype.createContainer = function (src) {
        // 水印容器
        var waterMaskDiv = document.createElement('div');
        waterMaskDiv.style.position = 'absolute';
        waterMaskDiv.style.zIndex = '100000';
        waterMaskDiv.id = '__water-mark';
        waterMaskDiv.style.top = '0';
        waterMaskDiv.style.left = '0';
        waterMaskDiv.style.height = '100%';
        waterMaskDiv.style.width = '100%';
        waterMaskDiv.style.pointerEvents = 'none';
        waterMaskDiv.style.backgroundImage = 'URL(' + src + ')';
        waterMaskDiv.style.opacity = this.options.opacity;
        return waterMaskDiv;
    };
    BuWatermark.prototype.render = function (dom) {
        this.target.style.position = 'relative';
        this.target.appendChild(dom);
        this.watermarkDom = dom;
    };
    BuWatermark.prototype.observer = function () {
        var _this = this;
        var waterMarkStylestr = this.watermarkDom.getAttribute('style');
        var callback = function () {
            var instance = document.getElementById('__water-mark');
            var style = instance === null || instance === void 0 ? void 0 : instance.getAttribute('style');
            if ((instance && style !== waterMarkStylestr) || !instance) {
                if (instance) {
                    // div还在，说明只是修改style
                    instance.setAttribute('style', waterMarkStylestr);
                }
                else {
                    // div不在，说明删除了div
                    _this.render(_this.watermarkDom);
                }
            }
        };
        this.watermarkObserver = new MutationObserver(callback);
        this.watermarkObserver.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true
        });
    };
    BuWatermark.prototype.remove = function () {
        this.watermarkObserver.disconnect();
        this.watermarkDom.remove();
    };
    return BuWatermark;
}());
