

let array1= [1,2,3,4,5,6];

const arr=array1.filter((i,arr)=>{
    if(array1[i]%2===0){
        return array1[i];
    }
})

console.log(arr);



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

const evenMobile = array.filter((item )=> (
    item.mobile %2===0
));

console.log(evenMobile);
