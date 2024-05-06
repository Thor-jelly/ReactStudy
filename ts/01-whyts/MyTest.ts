//简单的学籍管理系统
function getInputSomething() {
    return '1341534';
}

function loadFromDatabase(id: number) {
    //if(isNaN(id)) return;
    
    //load from datebase
    return {
        id,
        name: '张三',
        age: 25
    }
}

let s = getInputSomething();
let id = parseInt(s);//NaN

let {name, age} = loadFromDatabase(id);
console.log(name, age);