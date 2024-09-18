const arr = [23, 12, 22, 45, 65, 34];

arr.sort((a,b) => a-b);
console.log(arr);

arr.sort((a,b) => b-a);
console.log(arr);

const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort();

console.log(fruits)

const array = [
	{
		name: "Aakriti",
		address: "jaipur",
		mobile: 901554378,
        
	},
	{
		name: "Aakriti",
		address: 'Udaipur',
		mobile: 9378904,
        
	},
	{
		name: "Aakriti",
		address: "Ajmer",
		mobile: 875634678,
       
	}
]

// array.sort((a,b)=> a.age - b.age);

array.sort((a,b)=> a.name.localeCompare(b.name));

console.log(array);