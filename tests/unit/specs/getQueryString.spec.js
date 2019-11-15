import { expect } from 'chai'
import { getQueryString } from '@/common/js/common'


describe ('键值对转换成URL参数', ()=>{
    let data = {
        name: 'lishan',
        id: '12',
        code: '1000'
    }
    it('对象', ()=>{
        expect(getQueryString(data)).to.be.deep.equals('name=lishan&id=12&code=1000')
    })
    it('空对象', ()=>{
        expect(getQueryString({})).to.be.deep.equals('')
    })
})