
const array= [
{
		name: "Aakriti",
		address:"udaipur",
		mobile:7827634283
},
{
		name: "meta" ,
		address:"udaipur",
		mobile:7827634288
},
{
		name: "hello",
		address:"udaipur",
		mobile:7827634285
}


]

;

const a = array.map((item) => {
	return `${item.name} : ${item.address}`;
});
console.log(a)
