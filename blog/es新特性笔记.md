# es新特性笔记

## es6

### let

let是块级作用域，比var安全许多。var是全局的，非必要情况减少使用。

### const

const也是块级作用域，定义必须给值且不能改变

### 结构赋值

数组与对象都可结构赋值，使提取其中的一部分更加简洁

### 模板字符串

即``中可以使用${变量}

### 箭头函数（需再看）

格式简单，静态this。

### rest参数

指的是函数在生成时可以使用 ...args 这种形式来传递多个变量，类似于es5的arguments。

### 扩展运算符

与结构赋值相似， ...参数 进行传多个值

### symbol类型

该类型不可更改运算，有唯一id标志。并且有内置值与使用方法

### 迭代器（需再看）

比如for of 与 for in 不同，for of 遍历的是值而非索引

但是其原因是拥有了iterator接口，有此接口后会内部进行next调用

### 生成器

function * 函数名(){}	使用生成器可以决定函数的执行过程，与async await相似，但还是async await好用

### promise

链式调用，通过.then和.catch捕捉成功与异常信息，.then异常时向下传递默认的错误参数，.catch处理异常后继续执行.then

### 集合

Set（集合）带有iterator接口，故可以使用扩展运算符与for of。

size相当于数组的length

add增加元素

delete删除元素

has检测集合中是否包含某元素

集合可以很好的进行交并补差等数学运算，可以解构成数组

### Map

数据结构类似于对象，可以看作高级的对象（键的范围更广泛，不一定非要是字符串），带有iterator接口。

size返回个数

set增加元素

get读取元素

has检测元素

clear清空集合

### class类

比function更加规范，符合面向对象编程的思想

constructor方法使传入的值与在new时与该class的内部属性关联

而方法直接以  函数名(){}  定义

有静态成员，只有内部才能访问调用

使用extends继承，继承可以直接覆盖

用get和set监听属性的变化，其中set必须有参数

### 数组的扩展

Number.EPSILON  最小精度

二进制（如0b1010）与八进制（0o777）等表达方式

Number.isFinite  检测是否为有限数

Number.isNaN  检测是否为空

Number.parseInt 与 Number.parseFloat 字符串转整数（浮点数）

Number.isInteger  判断是否为整数

Math.trunc  抹去小数部分

Math.sign  检测整数负数或者0

### 对象方法的扩展

object.is  判断是否相等

object.assign  合并

object.setPrototypeOf  设置原型对象  object.getPrototypeOf   获取原型对象

### 模块化

export与import

##### 注：babel可以使es高版本转化为低版本



## es7

### Array.prototype.includes

查看数组中是否含有某元素

### 指数操作符

**



## es8

### asyn 和 await

非常重要的异步编程解决方案，使异步以同步的形式展现

### 对象的扩展方法

Object.values()  返回该对象所有可枚举属性值的数组 

Object.entries()  返回该对象可遍历属性[key,value]的数组

Object.getOwnPropertyDescriptors()  返回该对象所有自身属性的描述对象



## es9

### rest与扩展运算符

es6时只能数组使用，这里对象也可以使用rest进行解构赋值等

### 正则扩展——命名捕获分组

使正则匹配的块有名称可以寻找，比数值的下标提取更容易管理。格式  (?<变量>匹配的字符串)

### 正则扩展——反向断言

正向断言是要匹配的后面满足限定条件，反向断言是要匹配的前面满足限定条件  /(?<=某字符串)要匹配的正则/

### 正则扩展——dotall模式

平常正则里的 . 代表除换行符以外的任意单个字符，但是不能匹配换行符有些时候很不方便

使用方法 /正则匹配/sg  其中s是指dotall模式，g是指全局匹配（如果有多个则匹配多个）



## es10

### 对象扩展方法——Object.fromEntries

与 Object.entries 对象与二维数组的相互转换

### 字符串扩展方法——trimStart、trimEnd

清除字符串左边或右边空白

### 数组的扩展方法——flat、flatMap

将数组维度降低，flat降一级，而flatMap降至一维数组

### symbol.prototype.description

symbol的描述



## es11

### 私有属性

以#开头的属性为私有属性，不可以单独查看

### Promise.allSettled

生成一个特殊对象，包含传入的promise状态。与Promise.all不同的是，allSettled总是成功，而all有失败则失败。

### 字符串扩展——matchAll方法

匹配满足正则的多个值，并返回一个可迭代对象。数据批量提取，多用于爬虫

### 可选链操作符

 可选链 ?.  与  .  不同的是，在如果对象没有该属性则返回undefined

### 动态引入

import('路径')，可以不在一开始就引入，而是调用时导入

## Bigint

大整数，在普通整型后加n即为大整型，是大数的运算可以实现

### 绝对全局对象

globalThis，无论引擎，始终指向全局对象