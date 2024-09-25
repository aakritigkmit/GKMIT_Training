select 	
		concat("FirstName" ,' ',"LastName") 
	As
	name
	from 
		"Customer" 	
	order by 
		"FirstName";



select 
	sum("UnitPrice"),
	max("Milliseconds") ,
	min("Bytes")
	from 
  	"Track";


-- Ques2. Calculate kilobyte / second using bytes and milliseconds from the “Track” table.
select
    "TrackId",
    ("Bytes"/ 1024) / ("Milliseconds" / 1000) AS "KiloBytesPerSec"
from
    "TrackId";



-- Ques4 Calculate the count of people by their ‘city’ and sort them alphabetically from the “Employee” table.
select "City",
count("FirstName")
from "Employee"
group by "City","FirstName"
order by "FirstName";



SELECT "City", 
COUNT(*) 
AS employee_count
FROM "Employee"
GROUP BY "City","FirstName"
ORDER BY "City";







-- Ques5 Count the number of invoices in the range of Jan to March of 2009 using the invoice date and also calculate the sum of the total of invoices in that range.


select 
count("InvoiceId"),
sum("Total")
from "Invoice"
where "InvoiceDate">='2009-01-01' and "InvoiceDate"<='2009-03-31';





