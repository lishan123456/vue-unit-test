const expect = require('chai').expect
const {isObject} = require('@/common/js/common.js')

describe ('测试是否是对象', () => {
    it('{}：', () => {
        expect(isObject({})).to.true
    })
    it('[]：', () => {
        expect(isObject([])).to.true
    })
    it('null：', () => {
        expect(isObject(null)).to.false
    })
    it('undefined：', () => {
        expect(isObject(undefined)).to.false
    })
    it('function(){}：', () => {
        expect(isObject(function(){})).to.true
    })
    it('定义变量name：', () => {
        let name
        expect(isObject(name)).to.false
    })
    it('未定义变量name：', () => {
        expect(isObject(name)).to.false
    })
})