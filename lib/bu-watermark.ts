interface BuWatermarkMoreOptions extends Object {
  angle: number
  fontColor: string
  opacity: number | string
  zIndex: number
  fontSize: string
  fontFamily: string
}

interface BuWatermarkOptions extends Object {
  target: string
  text: string | number | Array<string>
  options: BuWatermarkMoreOptions
}

class BuWatermark {
  target: any;
  text: string | number | Array<string> = [];

  options: BuWatermarkMoreOptions = {
    angle: 25,
    fontColor: '#000',
    opacity: '0.2',
    zIndex: 10000,
    fontSize: '16px',
    fontFamily: 'Arial'
  };

  watermarkDom: any;

  watermarkObserver: any;

  constructor(options: BuWatermarkOptions) {
    this.validateOptions(options)
  }

  validateOptions(options: BuWatermarkOptions) {
    if (Object.prototype.toString.call(options) != '[object Object]') {
      console.error('传入数据格式不正确')
      return
    }
    if (!options.hasOwnProperty('text')) {
      console.error('请传入水印文本')
      return
    }
    const { target = document.body, text } = options;
    this.target = target;
    this.text = text;
    this.options = options.options;
    const {
      angle = 25,
      fontColor = '#000',
      opacity = '0.2',
      zIndex = 10000,
      fontSize = '16px',
      fontFamily = 'Arial'
    } = this.options
    this.options.angle = angle;
    this.options.fontColor = fontColor;
    this.options.opacity = opacity;
    this.options.zIndex = zIndex;
    this.options.fontSize = fontSize;
    this.options.fontFamily = fontFamily;
    this.init();
  }

  init() {
    var imageSrc = this.createCanvas();
    var dom: any = this.createContainer(imageSrc);
    this.render(dom);
    this.observer();
  }

  createCanvas() {
    var canvas: any = document.createElement('canvas');
    canvas.id = '__canvas';
    canvas.width = '300';
    canvas.height = '200';
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = this.options.fontColor;
    ctx.rotate((this.options.angle * Math.PI) / 180); // 偏转的角度
    ctx.font = this.options.fontSize + ' ' + this.options.fontFamily;
    if (['[object String]', '[object Number]'].indexOf(Object.prototype.toString.call(this.text)) != -1) {
      ctx.fillText(this.text, 30, 0)  // 绘制文本 绘制开始位置
    } else if (Object.prototype.toString.call(this.text) == '[object Array]') {
      // @ts-ignore
      for(var i = 0; i < this.text.length; i ++) {
        ctx.fillText(this.text, 30, 20 * i);
      }
    }
    let src = canvas.toDataURL('image/png');
    return src;
  }

  createContainer(src: string) {
    // 水印容器
    let waterMaskDiv: any = document.createElement('div');
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
  }

  render(dom: any) {
    this.target.style.position = 'relative';
    this.target.appendChild(dom);
    this.watermarkDom = dom;
  }

  observer() {
    const waterMarkStylestr = this.watermarkDom.getAttribute('style');
    const callback = () => {
      const instance = document.getElementById('__water-mark');
      const style = instance?.getAttribute('style');
      if ((instance && style !== waterMarkStylestr) || !instance) {
        if (instance) {
          // div还在，说明只是修改style
          instance.setAttribute('style', waterMarkStylestr);
        } else {
          // div不在，说明删除了div
          this.render(this.watermarkDom);
        }
      }
    };

    this.watermarkObserver = new MutationObserver(callback);

    this.watermarkObserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true
    });
  }

  remove() {
    this.watermarkObserver.disconnect();
    this.watermarkDom.remove();
  }
}