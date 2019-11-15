import Vue from 'vue';
import { expect } from 'chai'
import List from '@/components/List/List.vue';


describe('List.vue页面测试', () => {
  it('displays items from the list', () => {
      // our test goes here
      const Constructor = Vue.extend(List);
      const ListComponent = new Constructor().$mount();
      expect(ListComponent.$el.textContent).to.contain('sleep');
  })
  
  it('adds a new item to list on click', () => {
    // build component
    const Constructor = Vue.extend(List);
    const ListComponent = new Constructor().$mount();

    // set input value
    ListComponent.newItem = 'brush my teeth';

    // simulate click event
    const button = ListComponent.$el.querySelector('button');
    const clickEvent = new window.Event('click'); //创建点击事件
    button.dispatchEvent(clickEvent);//触发点击事件
    ListComponent._watcher.run(); //监听点击事件

    // assert list contains new item
    expect(ListComponent.$el.textContent).to.contain('brush my teeth');
    expect(ListComponent.listItems).to.contain('brush my teeth');
  })
})