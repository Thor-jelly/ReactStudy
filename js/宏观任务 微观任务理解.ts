//# 宏观任务 微观任务理解

//> Promise 永远在队列尾部添加微观任务。setTimeout 等宿主 API，则会添加宏观任务。

//*微任务优先。*

//分析异步执行的顺序：
//首先我们分析有多少个宏任务；
//在每个宏任务中，分析有多少个微任务；
//根据调用次序，确定宏任务中的微任务执行次序；
//根据宏任务的触发规则和调用次序，确定宏任务的执行次序；确定整个顺序。

//## 不论代码顺序如何，d 必定发生在 c 之后
setTimeout(()=>console.log("d"), 0)
var r = new Promise(function(resolve, reject){
    console.log("a");
    resolve('');
});
r.then(() => console.log("c"));
setTimeout(()=>console.log("dd"), 0)
console.log("b")

//## 只有一个宏观任务 c1 c2 d
setTimeout(()=>console.log("d"), 0)
var r = new Promise(function(resolve, reject){
    resolve('')
});
r.then(() => { 
    var begin = Date.now();
    while(Date.now() - begin < 1000);
    console.log("c1") 
    new Promise(function(resolve, reject){
        resolve('')
    }).then(() => console.log("c2"))
});

//## 两个宏观任务 a b c
function sleep(duration: number) {
    return new Promise(function(resolve, reject) {
        console.log("b");
        setTimeout(resolve,duration);
    })
}
console.log("a");
sleep(5000).then(()=>console.log("c"));