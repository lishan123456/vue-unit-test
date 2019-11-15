import Vue from 'vue';

/**
 * 回收 vm
 * @param  {Object} vm
 */
export const destroyVM = function(vm) {
  vm.$destroy && vm.$destroy();
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el);
};



