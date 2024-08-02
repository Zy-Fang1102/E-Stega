const { expect } = require('chai')

const {
  fade,
  toHex,
  toRgb,
  darken,
  lighten,
  getOpacity,
  getRgbValue,
  getRgbaValue,
  getColorFromRgbValue
} = require('../src/index')

describe('getRgbaValue', () => {
  it(`getRgbValue('Not A Color')`, () => {
    expect(getRgbValue('Not A Color')).to.be.false
  })

  it(`getRgbValue()`, () => {
    expect(getRgbValue()).to.be.false
  })

  it(`getRgbValue('black')`, () => {
    expect(getRgbValue('black')).to.deep.equal([0, 0, 0])
  })

  it(`getRgbValue('#000')`, () => {
    expect(getRgbValue('#000')).to.deep.equal([0, 0, 0])
  })

  it(`getRgbValue('#000000')`, () => {
    expect(getRgbValue('#000000')).to.deep.equal([0, 0, 0])
  })

  it(`getRgbValue('rgb(0,0,0)')`, () => {
    expect(getRgbValue('rgb(0,0,0)')).to.deep.equal([0, 0, 0])
  })

  it(`getRgbValue('rgb(0, 0,  0)')`, () => {
    expect(getRgbValue('rgb(0, 0,  0)')).to.deep.equal([0, 0, 0])
  })

  it(`getRgbValue('rgba(0,0,0,1)')`, () => {
    expect(getRgbValue('rgba(0,0,0,1)')).to.deep.equal([0, 0, 0])
  })

  it(`getRgbValue('rgba(0, 0,  0,   1)')`, () => {
    expect(getRgbValue('rgba(0, 0,  0,   1)')).to.deep.equal([0, 0, 0])
  })
})

describe('getRgbaValue', () => {
  it(`getRgbaValue('Not A Color')`, () => {
    expect(getRgbValue('Not A Color')).to.be.false
  })

  it(`getRgbaValue()`, () => {
    expect(getRgbaValue()).to.be.false
  })

  it(`getRgbaValue('black')`, () => {
    expect(getRgbaValue('black')).to.deep.equal([0, 0, 0, 1])
  })

  it(`getRgbaValue('#000')`, () => {
    expect(getRgbaValue('#000')).to.deep.equal([0, 0, 0, 1])
  })

  it(`getRgbaValue('#000000')`, () => {
    expect(getRgbaValue('#000000')).to.deep.equal([0, 0, 0, 1])
  })

  it(`getRgbaValue('rgb(0,0,0)')`, () => {
    expect(getRgbaValue('rgb(0,0,0)')).to.deep.equal([0, 0, 0, 1])
  })

  it(`getRgbaValue('rgb(0, 0,  0)')`, () => {
    expect(getRgbaValue('rgb(0, 0,  0)')).to.deep.equal([0, 0, 0, 1])
  })

  it(`getRgbaValue('rgba(0,0,0,1)')`, () => {
    expect(getRgbaValue('rgba(0,0,0,1)')).to.deep.equal([0, 0, 0, 1])
  })

  it(`getRgbaValue('rgba(0,0,0,0.5)')`, () => {
    expect(getRgbaValue('rgba(0,0,0,0.5)')).to.deep.equal([0, 0, 0, 0.5])
  })

  it(`getRgbaValue('rgba(0, 0,  0,   1)')`, () => {
    expect(getRgbaValue('rgba(0, 0,  0,   1)')).to.deep.equal([0, 0, 0, 1])
  })
})

describe('fade', () => {
  it(`fade('Not A Color')`, () => {
    expect(fade('Not A Color')).to.be.false
  })

  it(`fade()`, () => {
    expect(fade()).to.be.false
  })

  it(`fade('black', 50)`, () => {
    expect(fade('black', 50)).to.equal('rgba(0,0,0,0.5)')
  })

  it(`fade('#000', 0)`, () => {
    expect(fade('#000', 0)).to.equal('rgba(0,0,0,0)')
  })

  it(`fade('#000', 50)`, () => {
    expect(fade('#000', 50)).to.equal('rgba(0,0,0,0.5)')
  })

  it(`fade('#000', 100)`, () => {
    expect(fade('#000', 100)).to.equal('rgba(0,0,0,1)')
  })

  it(`fade('#000000', 0)`, () => {
    expect(fade('#000', 0)).to.equal('rgba(0,0,0,0)')
  })

  it(`fade('#000000', 50)`, () => {
    expect(fade('#000', 50)).to.equal('rgba(0,0,0,0.5)')
  })

  it(`fade('#000000', 100)`, () => {
    expect(fade('#000', 100)).to.equal('rgba(0,0,0,1)')
  })

  it(`fade('rgb(0,0,0)', 0)`, () => {
    expect(fade('#000', 0)).to.equal('rgba(0,0,0,0)')
  })

  it(`fade('rgb(0,0,0)', 50)`, () => {
    expect(fade('#000', 50)).to.equal('rgba(0,0,0,0.5)')
  })

  it(`fade('rgb(0,0,0)', 100)`, () => {
    expect(fade('#000', 100)).to.equal('rgba(0,0,0,1)')
  })

  it(`fade('rgba(0,0,0,0)', 0)`, () => {
    expect(fade('#000', 0)).to.equal('rgba(0,0,0,0)')
  })

  it(`fade('rgba(0,0,0,0)', 50)`, () => {
    expect(fade('#000', 50)).to.equal('rgba(0,0,0,0.5)')
  })

  it(`fade('rgba(0,0,0,0)', 100)`, () => {
    expect(fade('#000', 100)).to.equal('rgba(0,0,0,1)')
  })
})

describe('toHex', () => {
  it(`toHex('Not A Color')`, () => {
    expect(toHex('Not A Color')).to.be.false
  })

  it(`toHex()`, () => {
    expect(toHex()).to.be.false
  })

  it(`toHex('#000')`, () => {
    expect(toHex('#000')).to.equal('#000')
  })

  it(`toHex('rgb(0,0,0)')`, () => {
    expect(toHex('rgb(0,0,0)')).to.equal('#000000')
  })

  it(`toHex('rgba(0,0,0,0)')`, () => {
    expect(toHex('rgb(0,0,0,0)')).to.equal('#000000')
  })

  it(`toHex('black')`, () => {
    expect(toHex('black')).to.equal('#000000')
  })

  it(`toHex('transparent')`, () => {
    expect(toHex('transparent')).to.equal('#000000')
  })
})

describe('toRgb', () => {
  it(`toRgb('Not A Color')`, () => {
    expect(toRgb('Not A Color')).to.be.false
  })

  it(`toRgb()`, () => {
    expect(toRgb()).to.be.false
  })

  it(`toRgb('#000')`, () => {
    expect(toRgb('#000')).to.equal('rgb(0,0,0)')
  })

  it(`toRgb('#000', 0.5)`, () => {
    expect(toRgb('#000', 0.5)).to.equal('rgba(0,0,0,0.5)')
  })

  it(`toRgb('rgb(0,0,0)')`, () => {
    expect(toRgb('rgb(0,0,0)')).to.equal('rgb(0,0,0)')
  })

  it(`toRgb('rgb(0,0,0)', 0.5)`, () => {
    expect(toRgb('rgb(0,0,0)', 0.5)).to.equal('rgba(0,0,0,0.5)')
  })

  it(`toRgb('rgba(0,0,0,0)')`, () => {
    expect(toRgb('rgb(0,0,0,0)')).to.equal('rgb(0,0,0)')
  })

  it(`toRgb('rgba(0,0,0,1)', 0.5)`, () => {
    expect(toRgb('rgba(0,0,0,1)', 0.5)).to.equal('rgba(0,0,0,0.5)')
  })

  it(`toRgb('black')`, () => {
    expect(toRgb('black')).to.equal('rgb(0,0,0)')
  })

  it(`toRgb('transparent')`, () => {
    expect(toRgb('transparent')).to.equal('rgb(0,0,0)')
  })

  it(`toRgb('transparent', 0.5)`, () => {
    expect(toRgb('transparent', 0.5)).to.equal('rgba(0,0,0,0.5)')
  })
})

describe('darken', () => {
  it(`darken('Not A Color')`, () => {
    expect(darken('Not A Color')).to.be.false
  })

  it(`darken()`, () => {
    expect(darken()).to.be.false
  })

  it(`darken('#3080E8', 20)`, () => {
    expect(darken('#3080E8', 20)).to.equal('rgba(0,77,181,1)')
  })

  it(`darken('#000')`, () => {
    expect(darken('#000')).to.equal('rgba(0,0,0,1)')
  })

  it(`darken('#fff', 100)`, () => {
    expect(darken('#fff', 100)).to.equal('rgba(0,0,0,1)')
  })

  it(`darken('rgb(255,255,255)', 100)`, () => {
    expect(darken('rgb(255,255,255)', 100)).to.equal('rgba(0,0,0,1)')
  })

  it(`darken('rgba(255,255,255, 1)', 100)`, () => {
    expect(darken('rgba(255,255,255, 1)', 100)).to.equal('rgba(0,0,0,1)')
  })

  it(`darken('rgba(255,255,255, 0.5)', 100)`, () => {
    expect(darken('rgba(255,255,255, 0.5)', 100)).to.equal('rgba(0,0,0,0.5)')
  })

  it(`darken('black', 100)`, () => {
    expect(darken('black', 100)).to.equal('rgba(0,0,0,1)')
  })
})

describe('lighten', () => {
  it(`lighten('Not A Color')`, () => {
    expect(darken('Not A Color')).to.be.false
  })

  it(`lighten()`, () => {
    expect(lighten()).to.be.false
  })

  it(`lighten('#3080E8', 20)`, () => {
    expect(lighten('#3080E8', 20)).to.equal('rgba(99,179,255,1)')
  })

  it(`lighten('#000')`, () => {
    expect(lighten('#000')).to.equal('rgba(0,0,0,1)')
  })

  it(`lighten('#000', 100)`, () => {
    expect(lighten('#000', 100)).to.equal('rgba(255,255,255,1)')
  })

  it(`lighten('rgb(0,0,0)', 100)`, () => {
    expect(lighten('rgb(0,0,0)', 100)).to.equal('rgba(255,255,255,1)')
  })

  it(`lighten('rgba(0,0,0,1)', 100)`, () => {
    expect(lighten('rgba(0,0,0,1)', 100)).to.equal('rgba(255,255,255,1)')
  })

  it(`lighten('rgba(0,0,0,0.5)', 100)`, () => {
    expect(lighten('rgba(0,0,0,0.5)', 100)).to.equal('rgba(255,255,255,0.5)')
  })

  it(`lighten('white', 100)`, () => {
    expect(lighten('white', 100)).to.equal('rgba(255,255,255,1)')
  })
})

describe('getOpacity', () => {
  it(`getOpacity('Not A Color')`, () => {
    expect(darken('Not A Color')).to.be.false
  })

  it(`getOpacity()`, () => {
    expect(lighten()).to.be.false
  })

  it(`getOpacity('#000')`, () => {
    expect(getOpacity('#000')).to.equal(1)
  })

  it(`getOpacity('rgb(0,0,0)')`, () => {
    expect(getOpacity('rgb(0,0,0)')).to.equal(1)
  })

  it(`getOpacity('rgb(0, 0,  0)')`, () => {
    expect(getOpacity('rgb(0, 0,  0)')).to.equal(1)
  })

  it(`getOpacity('rgba(0,0,0,1)')`, () => {
    expect(getOpacity('rgba(0,0,0,1)')).to.equal(1)
  })

  it(`getOpacity('rgba(0,0,0,0.5)')`, () => {
    expect(getOpacity('rgba(0,0,0,0.5)')).to.equal(0.5)
  })

  it(`getOpacity('rgba(0, 0, 0, 0.5)')`, () => {
    expect(getOpacity('rgba(0, 0, 0, 0.5)')).to.equal(0.5)
  })

  it(`getOpacity('rgba(1.111, 1.111, 1.111, 0.5)')`, () => {
    expect(getOpacity('rgba(1.111, 1.111, 1.111, 0.5)')).to.equal(0.5)
  })

  it(`getOpacity('black')`, () => {
    expect(getOpacity('black')).to.equal(1)
  })

  it(`getOpacity('transparent')`, () => {
    expect(getOpacity('transparent')).to.equal(0)
  })
})

describe('getColorFromRgbValue', () => {
  it(`getColorFromRgbValue('Not A Color')`, () => {
    expect(getColorFromRgbValue('Not A Color')).to.be.false
  })

  it(`getColorFromRgbValue()`, () => {
    expect(getColorFromRgbValue()).to.be.false
  })

  it(`getColorFromRgbValue([0,0])`, () => {
    expect(getColorFromRgbValue([0,0])).to.be.false
  })

  it(`getColorFromRgbValue([0,0,0])`, () => {
    expect(getColorFromRgbValue([0,0,0])).to.equal('rgb(0,0,0)')
  })

  it(`getColorFromRgbValue([0,0,0,1])`, () => {
    expect(getColorFromRgbValue([0,0,0,1])).to.equal('rgba(0,0,0,1)')
  })
})
