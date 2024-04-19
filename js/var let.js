//立即执行的函数表达式（IIFE），通过创建一个函数，并且立即执行，来构造一个新的域，从而控制 var 的范围。

//写法
;(function(){
    var a;
    //code
}())


;(function(){
    var a;
    //code
})()

//推荐这种写法
void function(){
    var a;
    //code
}();

//利用立即执行的函数表达式（IIFE）构造了一个函数的执行环境
//在 Global function with 三个环境中，b 的值都不一样，而在 function 环境中，
//并没有出现 var b，这说明 with 内的 var b 作用到了 function 这个环境当中。
//var b = {} 这样一句对两个域产生了作用
var b;
void function(){
    var env = {b:1};
    b = 2;
    console.log("In function b:", b);
    with(env) {
        var b = 3;
        console.log("In with b:", b);
    }
}();
console.log("Global b:", b);



//# let 块级作用域

//以下语句会产生 let 使用的作用域：for；if；switch；try/catch/finally。