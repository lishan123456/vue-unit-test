### 测试套件
describe块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"加法函数的测试"），第二个参数是一个实际执行的函数。
it块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"1 加 1 应该等于 2"），第二个参数是一个实际执行的函数。
describe (测试套件的名称,function(){
    it(测试用例的名称,function(){
        expect(common.add(0, 0)).to.be.equal(0)
    })
    it(测试用例的名称,function(){})
})

### 断言库的用法：
### .to .be .been .is .that .which .and .has .hava .with .at .of .same .but .does .still
### .to.be、.to：作为连接两个方法的链式方法
    expect(function(){}).to.be.true
    expect(function(){}).to.true

### .equal/.eq/.equals:输入和输出结果相等
    expect(0).to.be.eq(0)
    expect(1).to.be.equal(1)
    expect(2).to.be.equals(2)

### .not:否定在其之后链接的所有断言
>>>>>这个函数没有异常
    expect(function () {}).to.be.not.throw() 
>>>>>这个对象没有b属性
    expect({a: 1}).to.not.have.property('a')
>>>>>它是一个数组，里面不包含3
    expect([1, 2, 3]).to.be.an('array').that.does.not.include(3)

### .deep:判断值相等，而不是严格的相等(===)  
### .eql相当于(.deep.equal)
    expect([1, 2, 3]).to.deep.equal([1, 2, 3])
    expect([1, 2, 3]).to.eql([1, 2, 3])
    expect([1, 2, 3]).to.not.equal([1, 2, 3])

### .nested:在所有的.property和.include使用.和[]语法(.nested不能和.own结合使用)
###         如果原属性名称包含.和[]，需要使用\\来转义
    expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b.[1]')
    expect({a: {b: ['x', 'y']}}).to.nested.include('a.b.[1]': 'y')
    expect({.a: {'[b]': 'y'}}).to.nested.include('\\.a.\\[b\\]')
    expect({.a: {'[b]': 'y'}}).to.nested.include('\\.a.\\[b\\]': 'x')

### .property:断言目标有没有这个属性,val有值判断该属性的值是不是相等（===）
### .own:.property和.include中忽略继承的属性
### .frozen:断言目标是冻结的（不能添加新属性，已存在属性不能修改和删除）
### .sealed:断言目标是密封的（不能添加新属性，已存在属性不能修改和删除）
### .extensible:断言目标可扩展（可添加新属性）
>>>>>本身含有a这个属性,不是从继承来的
    expect({a: 1}).to.have.own.property('a') 
>>>>>含有b这个属性,但本身不含有b这个属性,继承来的
    Object.prototype.b = 2;
    expect({a: 1}).to.have.property('b').but.not.own.property('b')
>>>>>断言目标有a这个属性,值为1
    expect({ a: 1 }).to.have.property('a', 1)
>>>>>断言目标不能添加新属性,已存在属性不能修改和删除
    var frozenObject = Object.freeze({}); //冻结对象
    expect(frozenObject).to.be.frozen;
    expect(1).to.be.frozen;
>>>>>不能添加新属性，已存在属性不能修改和删除
    let sealed = Object.sealed({})
    let freeze = Object.freeze({})
    expect(sealed).to.be.sealed
    expect(freeze).to.be.freeze
    expect(1).to.be.sealed
 >>>>>断言目标可扩展（可添加新属性）
    expect({a: 1}).to.be.extensible

### .include/.includes/.contain/.contains:断言目标数包含字符串，数组中的成员和对象的属性
### .members:断言目标数组具有相同的数组成员
### .ordered:断言中保持相同的顺序(当.include和.ordered结合时，排序从数组头部开始)
>>>>>断言目标数相同顺序相同成员/断言目标数顺序成员不相同
    expect([1, 2]).to.have.ordered.members([1, 2]).but.not.have.ordered.members([2, 1])
>>>>>断言目标数排序从数组头部开始/断言目标数不从排序从数组头部开始
    expect([1, 2, 3]).to.include.ordered.members([1, 2]).but.not.include.ordered.members([2, 3]);

### .keys/key:断言目标为object,array,map 和set的keys,默认会匹配所有的keys
### .any:在.keys之前使用包含任意一个
### .all:在.keys之前使用包含所有
>>>>>断言目标数,只要包含一个属性
    expect({ a: 1, b: 2 }).to.have.any.keys('b', 'd');
>>>>>断言目标数,要包含所有属性
    expect({a: 1, b: 2}).to.have.all.keys('a','b');
>>>>>map和set会比较值(===)
    expect(new Set([{ a: 1 }])).to.have.all.keys([{ a: 1 }]);

### .a()/.an():判断什么类型
    expect('foo').to.be.a('string');
    expect({ a: 1 }).to.be.an('object');
    expect(null).to.be.a('null');
    expect(undefined).to.be.an('undefined');
    expect(new Error).to.be.an('error');
    expect(Promise.resolve()).to.be.a('promise');
    expect(new Float32Array).to.be.a('float32array');
    expect(Symbol()).to.be.a('symbol');

### .ok:判断目标为真值(==)
### .true:判断为真值(===)
### .flase:判断为假值(===)
### .null:判断目标为null值（===）
### .undefined:判断目标为undefined值（===）
### .NaN:判断目标为非数字
### .exist:判断目标不是null或undefined
### .empty:判断字符串或数组的length为0,map或set的size为0,非函数对象的自身没有属性
### .finite:断言目标是一个数字不是Nan和正负无穷大
>>>>>判断目标为NaN
    expect(NaN).to.be.NaN
>>>>>判断目标不为null或undefined
    expect(1).to.exist
    expect(1).to.be.finite

### .arguments/.Arguments:断言目标是一个arguments对象
    function test () {
        expect(arguments).to.be.arguments;
    }
    test();

### .above(n[, msg]):断言目标值大于(n),或者在链前面增加.lengthOf来判断目标的length
### .least(n[, msg]):断言目标值大于或等于(n),或者在链前面增加.lengthOf来判断目标的length
### .below(n[, msg]):断言目标值小于(n),或者在链前面增加.lengthOf来判断目标的length
### .most(n[, msg]):断言目标值小于或等于(n),或者在链前面增加.lengthOf来判断目标的length
### .within(start, finish[, msg]):判断目标在范围区间，或者在链前面增加.lengthOf来判断目标的length
### .lengthOf:断言目标length
>>>>>断言目标 > n
    expect(2).to.be.above(1)
>>>>>断言目标 >= n
    expect(2).to.be.least(1)
>>>>>断言目标 < n
    expect(1).to.be.below(2)
>>>>>断言目标 <= n
    expect(1).to.be.most(1)
>>>>>断言目标在1~8之间,包含(1,8)
    expect(1).to.be.within(1,8)
>>>>>断言目标的长度
    expect('foo').to.have.lengthOf(3)
>>>>>断言目标的长度在2~4(包含2,4)之间
    expect([1, 2, 3]).to.have.lengthOf.within(2, 4)

### .instanceof(constructor[, msg])/.instanceOf(constructor[, msg]):通过constructor判断是一个实例
>>>>>断言目标是什么构造函数,既什么实例
    function Cat () { }
    expect(new Cat()).to.be.an.instanceof(Cat);
    expect([1, 2]).to.be.an.instanceof(Array);

### .ownPropertyDescriptor(name[, descriptor[, msg]])/.haveOwnPropertyDescriptor:断言目标属性是否存在，如果给定了descriptor则必须符合规则
>>>>>断言目标存在属性a
    expect({ a: 1 }).to.have.ownPropertyDescriptor('a');
>>>>>ownPropertyDescriptor将断言改为属性描述符对象
    expect({ a: 1 }).to.have.ownPropertyDescriptor('a', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 1,
    });
>>>>>断言目标存在属性a,有属性enumerable,值为true
    expect({ a: 1 }).to.have.ownPropertyDescriptor('a').that.has.property('enumerable', true);

### .match(re[, msg])/.matches(re[, msg]):断言目标匹配
### .string(str[, msg])：断言目标包含子串
    expect('foobar').to.match(/^foo/);
    expect('foobar').to.have.string('bar');

### .throw([errorLike], [errMsgMatcher], [msg])/.throws/.Throw：断言目标抛出异常
    var err = new TypeError('Illegal salmon!');
    var badFn = function () { throw err; };

    expect(badFn).to.throw();
    expect(badFn).to.throw(TypeError);
    expect(badFn).to.throw(err);
    expect(badFn).to.throw('salmon');
    expect(badFn).to.throw(/salmon/);
    expect(badFn).to.throw(TypeError, 'salmon');
    expect(badFn).to.throw(TypeError, /salmon/);
    expect(badFn).to.throw(err, 'salmon');

### .by(delta[, msg]):跟随.increase时断言主语增加了多少
### .increase(subject[, prop[, msg]])/increases:断言目标属性值增加了多少
### .decrease(subject[, prop[, msg]])/.decreases:断言目标属性值减少了多少
### .change(object[, prop[, msg]])/.changes(object[, prop[, msg]]):断言属性是不是发生改变
### .oneOf(list[, msg]):断言目标属于list中的一个
>>>>>断言目标属性值增加了多少
    let myObj = {val: 1}
    let addTwo = function () { myObj.val += 2; }
    expect(addTwo).to.increase(myObj, 'val').by(2)
>>>>>断言目标属性值减少了多少
    let myObj = {val: 1}
    let subtractTwo = function () { myObj.val -= 2; };
    expect(subtractTwo).to.decrease(myObj, 'val').by(2);
>>>>>断言属性是不是发生改变
    let myObj = { dots: '' }
    let addDot = function () { myObj.dots += '.'; };
    expect(addDot).to.change(myObj, 'dots');
>>>>>断言目标(不能为对象)属于list(Array)中的一个
    expect(1).to.be.oneOf([1, 2, 3]);

### .respondTo(method[, msg])/.respondsTo(method[, msg]):目标为非函数对象时，断言有没有方法
### .itself:.respondTo添加.itself,判断它自身有没有该方法而不是从prototype判断
### .satisfy(matcher[, msg]):断言目标值在给定的函数中返回真值,msg(错误消息)
### .closeTo(expected, delta[, msg])/.approximately(expected, delta[, msg]):断言目标值在expected的+/-delta范围内
>>>>目标是一个函数时，判断目标prototype有没有该方法
    function Cat () {}
    Cat.prototype.meow = function () {};
    expect(Cat).to.respondTo('meow');
>>>>目标是一个函数时，.respondTo添加.itself,判断它自身有没有该方法而不是从prototype判断
    function Cat() { }
    Cat.prototype.meow = function () { };
    Cat.hiss = function () { };
    expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
>>>>>断言目标值在给定的函数中返回真值
    expect(1,'错误消息').to.satisfy(function(num) {
        return num > 0; 
    });
>>>>>closeTo接受第三个可选参数msg来自定义错误消息，也可以加上第二个参数给expect(),不推荐
    expect(1.5).to.be.closeTo(3, 1, 'nooo why fail??');
