const expect = require('chai').expect
const {isEmpty} = require('@/common/js/common.js')

describe ('输入的变量是否为空的测试', () => {
    it('str: ""', () => {
        expect(isEmpty("")).to.true
    })

    it('str: "           "(有空格)', () => {
        expect(isEmpty("           ")).to.true
    })

    it('str: []', () => {
        expect(isEmpty([])).to.true
    })

    it('str: {}', () => {
        expect(isEmpty({})).to.true
    })

    it('str: null', () => {
        expect(isEmpty(null)).to.true
    })

    it('str: undefined', () => {
        expect(isEmpty(undefined)).to.true
    })
})