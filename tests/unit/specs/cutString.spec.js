const expect = require('chai').expect
const {cutString} = require('@/common/js/common.js')

describe('截取指定字节的字符串', () => {
    let str,len,suffix; //cutString()定义参数变量

    describe ('参数类型的判断', () => {
        it('str:不为字符串,抛出异常', () => {
            expect(() => cutString()).to.throw(TypeError, "It is not a string")
            expect(() => cutString(false)).to.throw(TypeError, "It is not a string")
            expect(() => cutString(null)).to.throw(TypeError, "It is not a string")
            expect(() => cutString({})).to.throw(TypeError, "It is not a string")
            expect(() => cutString([])).to.throw(TypeError, "It is not a string")
        })

        it('str"为饿温委屈恶气阿大撒"，len:0，suffix:"..."，返回""', () => {
            expect(cutString("为饿温委屈恶气阿大撒")).to.be.eq("")
        })

        it('str"为饿温委屈恶气阿大撒"，len:5，suffix:"..."，返回"为饿..."', () => {
            expect(cutString("为饿温委屈恶气阿大撒", 5)).to.be.string("为饿...")
        })

        it('str:"           "，len:5，suffix:"..."，返回""', () => {
            expect(cutString("           ", 5)).to.be.eq("")
        })

        it('str:"为饿温委屈恶气阿大撒"，len:"screen"，suffix:"..."，返回str', () => {
            expect(cutString("为饿温委屈恶气阿大撒", "screen")).to.be.string("为饿温委屈恶气阿大撒")
        })
    })
})