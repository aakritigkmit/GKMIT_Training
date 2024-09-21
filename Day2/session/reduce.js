const arr = [23, 12, 22, 45, 65, 34];

const sum = arr.reduce((acc, num) => {
    if(num%2===0){
        acc.push(num)
    }
    return acc;
},[]);


console.log(sum);
