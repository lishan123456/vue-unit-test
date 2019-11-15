import { expect } from 'chai'
import { getQueryObject } from '@/common/js/common'


describe ('获取url参数对象，或者url参数name的属性值', ()=>{
    let url = 'http://baidu.com?name=lishan&id=12&code=1000'
    it('获取参数对象', ()=>{
        expect(getQueryObject(url)).to.be.deep.equals({name:'lishan',id:'12',code:'1000'})
    })
    it('获取某个参数的属性值', ()=>{
        expect(getQueryObject(url,'id')).to.be.deep.equals('12')
    })
})