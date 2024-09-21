// Reduce

const array=[1,2,3,4,5];
const arr =array.reduce(function (curr,accumulator,array){
    return curr=curr+accumulator;
}); 

console.log(arr);
