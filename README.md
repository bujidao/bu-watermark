# 前端页面生成水印

## 特点：

* 对于用户：防止用户通过开发者工具删除和修改水印
* 对于开发者：可配置性强，使用方便
* 体积小，未压缩时，只有 4kb 大小

## 使用方法

### 引用

yarn

``` bash
yarn add bu-watermark
```

npm

``` bash
npm install bu-watermark
```

直接引入

``` html
<script src="dist/bu-watermark.js"></script>
```

### 使用方式

普通使用

``` js
new BuWatermark({
  target: document.getElementById('app'),
  text: 'bu-watemark'
})
```

多行水印

``` js
new BuWatermark({
  target: document.getElementById('app'),
  text: ['bu-watemark', 'bu-watemark2']
})
```

#### 提供的方法

为了使用方便，只提供了一个方法 `remove`

``` js
var watermark = new BuWatermark({
  target: document.getElementById('app'),
  text: 'bu-watemark'
})

// 3s以后移除水印
setTimeout(function() {
  watermark.remove()
}, 3000)

```

## 参数

### 对外暴露接口

``` js
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
```

### 配置含义

|字段|含义|类型|默认值|
|-|-|-|-|
|target|指定渲染的目标区域|`HTMLElement`|`document.body`|
|text|水印文本|`string`、`array`|无|
|options|更多配置|`Object`|-|

#### `options`: 
|字段|含义|类型|默认值|
|-|-|-|-|
|angle|水印角度|`number`|`25`|
|fontColor|水印颜色|`string`|`#000`|
|opacity|透明度|` number | string`|`0.2`|
|zIndex|显示层级|` number`|`10000`|
|fontSize|水印文字大小|`string`|`16px`|
|fontFamily|字体|` string`|`Arial`|
