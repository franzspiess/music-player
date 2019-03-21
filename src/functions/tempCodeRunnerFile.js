let arr = [1,2,3,4,5];
let newArr = arr.reduce((acc,el) => {return acc + el});
let newArr1 = arr.filter(el => (el % 2 === 0));
console.log(newArr1);