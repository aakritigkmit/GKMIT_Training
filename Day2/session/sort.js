const arr = [23, 12, 22, 45, 65, 34];

arr.sort((a,b) => a-b);
console.log(arr);

arr.sort((a,b) => b-a);
console.log(arr);

const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort();

console.log(fruits)

const details = [
	{
		name: "Aditya",
		address: "jaipur",
		mobile: 9876543223,
        age: 21,
	},
	{
		name: "Aman",
		address: 'Udaipur',
		mobile: 9876543224,
        age: 22,
	},
	{
		name: "Ajay",
		address: "Ajmer",
		mobile: 9876543221,
        age: 23,
	}
]

// details.sort((a,b)=> a.age - b.age);

details.sort((a,b)=> a.name.localeCompare(b.name));

console.log(details);