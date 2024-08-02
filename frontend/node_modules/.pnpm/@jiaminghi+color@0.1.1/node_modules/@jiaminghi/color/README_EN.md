[中文](./README.md)

<h1 align="center">Color Extension</h1>

<p align="center">
    <a href="https://travis-ci.com/jiaming743/Color"><img src="https://img.shields.io/travis/com/jiaming743/color.svg" alt="Travis CI"></a>
    <a href="https://github.com/jiaming743/Color/blob/master/LICENSE"><img src="https://img.shields.io/github/license/jiaming743/bezierCurve.svg" alt="LICENSE" /> </a>
    <a href="https://www.npmjs.com/package/@jiaminghi/color"><img src="https://img.shields.io/npm/v/@jiaminghi/color.svg" alt="NPM" /> </a>
</p>

### This plugin provides some extension methods for color.
- **[darken](#darken)**

  Deepen color.

- **[lighten](#lighten)**

  Brighten color.

- **[fade](#fade)**

  Adjust color opacity.

- **[toHex](#toHex)**

  Convert color to Hex color.

- **[toRgb](#toRgb)**

  Convert color to Rgb|Rgba color.

- **[getOpacity](#getOpacity)**

  Get color opacity.

- **[getRgbValue](#getRgbValue)**

  Get the color Rgb value.

- **[getRgbaValue](#getRgbaValue)**

  Get the color Rgba value.

- **[getColorFromRgbValue](#getColorFromRgbValue)**

  Get Color from Rgb|Rgba value.

### Appendix

- **[Color Keywords](#Color-Keywords)**

  Built-in color keywords.

### Install with npm

```shell
$ npm install @jiaminghi/color
```

### Use

```javascript
import { toHex } from '@jiaminghi/color'

// do something
```

### Quick experience

```html
<!--Resources are located on personal servers for experience and testing only, do not use in production environments-->
<!--Debug version-->
<script src="http://lib.jiaminghi.com/color/color.map.js"></script>
<!--Compression version-->
<script src="http://lib.jiaminghi.com/color/color.min.js"></script>
<script>
  const { darken, lighten } = window.color
  // do something
</script>
```

------

<h3 align="center">Examples</h3>

#### darken

```javascript
/**
 * @description Deepen color
 * @param {String} color   Hex|Rgb|Rgba color or color keyword
 * @param {Number} percent Percent of Deepen (1-100)
 * @return {String|Boolean} Rgba color (Invalid input will return false)
 */
function darken (color, percent) {
	//...
}

const before = '#3080E8'

const after = darken(color, 20)
// after = 'rgba(0,77,181,1)'
```

<p align="center">
    <img width="180px" src="./exampleImgs/1.jpg" />
</p>



#### lighten

```javascript
/**
 * @description Brighten color
 * @param {String} color   Hex|Rgb|Rgba color or color keyword
 * @param {Number} percent Percent of brighten (1-100)
 * @return {String|Boolean} Rgba color (Invalid input will return false)
 */
function lighten (color, percent) {
	//...
}

const before = '#3080E8'

const after = lighten(color, 20)
// after = 'rgba(99,179,255,1)'
```

<p align="center">
    <img width="180px" src="./exampleImgs/2.jpg" />
</p>



#### fade

```javascript
/**
 * @description Adjust color opacity
 * @param {String} color   Hex|Rgb|Rgba color or color keyword
 * @param {Number} percent Percent of opacity
 * @return {String|Boolean} Rgba color (Invalid input will return false)
 */
function fade (color, percent) {
	//...
}

const before = '#3080E8'

const after = lighten(color, 20)
// after = 'rgba(48,128,232,0.2)'
```

<p align="center">
    <img width="180px" src="./exampleImgs/3.jpg" />
</p>



#### toHex

```javascript
/**
 * @description Convert color to Hex color
 * @param {String} color Hex|Rgb|Rgba color or color keyword
 * @return {String|Boolean} Hex color (Invalid input will return false)
 */
function toHex (color) {
	//...
}

const before = 'rgb(48,128,232)'

const after = toHex(before)
// after = '#3080e8'
```



#### toRgb

```javascript
/**
 * @description Convert color to Rgb|Rgba color
 * @param {String} color   Hex|Rgb|Rgba color or color keyword
 * @param {Number} opacity The opacity of color
 * @return {String|Boolean} Rgb|Rgba color (Invalid input will return false)
 */
function toRgb (color, opacity) {
	//...
}

const before = '#3080E8'

const after1 = toRgb(before)
// after1 = 'rgb(48,128,232)'
const after2 = toRgb(before, 0.2)
// after2 = 'rgba(48,128,232,0.2)'
```



#### getOpacity

```javascript
/**
 * @description Get the opacity of color
 * @param {String} color Hex|Rgb|Rgba color or color keyword
 * @return {Number|Boolean} Color opacity (Invalid input will return false)
 */
function getOpacity (color) {
	//...
}

const color1 = '#3080E8'
const color2 = 'rgba(48,128,232,0.2)'

const opacity1 = getOpacity(color1)
// opacity1 = 1
const opacity2 = getOpacity(color2)
// opacity2 = 0.2
```



#### getRgbValue

```javascript
/**
 * @description Get the Rgb value of the color
 * @param {String} color Hex|Rgb|Rgba color or color keyword
 * @return {Array<Number>|Boolean} Rgb value of the color (Invalid input will return false)
 */
function getRgbValue (color) {
	//...
}

const color = '#3080E8'

const rgbValue = getRgbValue(color)
// rgbValue = [48, 128, 232]
```



#### getRgbaValue

```javascript
/**
 * @description Get the Rgba value of the color
 * @param {String} color Hex|Rgb|Rgba color or color keyword
 * @return {Array<Number>|Boolean} Rgba value of the color (Invalid input will return false)
 */
function getRgbaValue (color) {
	//...
}

const color1 = '#3080E8'
const color2 = 'rgba(48,128,232,0.2)'

const rgbaValue1 = getRgbaValue(color1)
// rgbaValue1 = [48, 128, 232, 1]
const rgbaValue2 = getRgbaValue(color2)
// rgbaValue2 = [48, 128, 232, 0.2]
```



#### getColorFromRgbValue

```javascript
/**
 * @description Get Color from Rgb|Rgba value
 * @param {Array<Number>} value Rgb|Rgba color value
 * @return {String|Boolean} Rgb|Rgba color (Invalid input will return false)
 */
function getColorFromRgbValue (value) {
	//...
}

const value1 = [48, 128, 232]
const value2 = [48, 128, 232, 0.2]

const color1 = getColorFromRgbValue(value1)
// color1 = 'rgb(48,128,232)'
const color2 = getColorFromRgbValue(value2)
// color2 = 'rgba(48,128,232,0.2)'
```



#### Color Keywords

<p align="center">
    <img width="750px" src="./exampleImgs/keywords.png" />
</p>
