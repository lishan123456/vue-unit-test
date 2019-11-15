const selfMap = function (fn, context) { //循环实现数组 map 方法
    let arr = Array.prototype.slice.call(this) //返回原数组
    let mapArray = Array() //创建数组
    for (let i = 0; i < arr.length; i++) {
        //判断稀疏数组的情况
        if (!arr.hasOwnProperty(i)) continue; //判断对象是否包含特定的自身（非继承）属性，返回true/false
        mapArray[i] = fn.call(context, arr[i], i, this)
    }
    return mapArray
}

Array.prototype.selfMap = selfMap
export {
    selfMap,
}