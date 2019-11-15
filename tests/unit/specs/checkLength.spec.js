const expect = require('chai').expect
const {checkLength} = require('@/common/js/common.js')

describe('获取字符串字节长度', () => {
    it('checkLength("我是")，返回4', () => {
        expect(checkLength("我是")).to.be.eq(4)
    })
    
    it("checkLength(false),", () => {
        expect(() => checkLength(false)).to.throw(TypeError, "It is not a string")
    })

    it("checkLength('           '),返回长度>=0", () => {
        expect(checkLength('           ')).to.be.least(0)
    })

    it("checkLength(''),返回长度<=0", () => {
        expect(checkLength('')).to.be.most(0)
    })

    
})