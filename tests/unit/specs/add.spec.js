const expect = require('chai').expect
const {add} = require('@/common/js/common.js')


describe('加法表达式的测试', function () {
    it('0 + 0 = 0', function () {
        expect(add(0, 0)).to.be.eq(0)
    })

    it('2 + 3 = 5', function () {
        expect(add(2, 3)).to.be.equal(5)
    })

    it('0 + -1 = -1', function () {
        expect(add(0, -1)).to.be.equals(-1);
    })
})

