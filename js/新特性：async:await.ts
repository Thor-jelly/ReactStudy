//# 新特性：async/await

// function sleep(duration: number) {
//   return new Promise(function (resolve, reject) {
//     console.log("c");
//     setTimeout(resolve, duration);
//     console.log("cc");
//   });
// }

// //以同步代码编写异步代码
// //定义了一个异步函数 foo，
// //其中使用了 async 和 await 关键字。
// //在函数中先输出 console.log，
// //然后使用 await 关键字等待 sleep 函数返回的 Promise 对象，在等待期间代码会暂停执行。
// //当 Promise 对象状态变为 resolved 后，继续执行并输出 console.log
// async function foo() {
//   console.log("b");
//   await sleep(2000);
//   console.log("bb");
// }

// console.log("a");
// foo();
// console.log("aa");

function sleep(duration: number, name: string) {
    return new Promise(function (resolve, reject) {
      console.log(name + "d");
      setTimeout(resolve, duration);
      console.log(name + "dd");
    });
  }
  async function foo(name: string) {
    console.log(name + "c");
    await sleep(2000, name);
    console.log(name + "cc");
  }
  async function foo2() {
    console.log("b");
    await foo("foo2 a");
    console.log("bb");
    await foo("foo2 b");
    console.log("bbb");
  }
  
  console.log("a");
  foo2();
  console.log("aa");

//执行结果
// a
// b
// foo2 ac
// foo2 ad
// foo2 add
// aa
// foo2 acc
// bb
// foo2 bc
// foo2 bd
// foo2 bdd
// foo2 bcc
// bbb