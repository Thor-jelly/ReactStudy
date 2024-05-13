//联合类型
let x: string | number = 1;
//交叉类型
let x2: "123" & "1234" & "12345";

//接口类型 联合与交叉
interface A {
  id: number;
  age: number;
  weight: number;
}
interface B {
  id: string;
  age: number;
  des: string;
}

type AB = A & B;
type aaB = Omit<AB, never>;

type AOrB = A | B;
type aaOrB = Omit<AOrB, never>;

let aAndB: AB;
let aOrB: AOrB;
