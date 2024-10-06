// Agreegation in Mongo db


// mongo optimization depends on 2 imp points
// - how the collections are made.
// - 




// queries for aggregation


// Q. Find avg of imdb and tomatoes score if the imdb rating is greater then 5 using match and add field

	db.movies.aggregate([{$match: {'imdb.rating': {$gt: 5}}}, {$addFields: {'average': {$avg: ['$imdb.rating', '$tomatoes.viewer.rating']}}}])


// Q. prev questions but filter again by year that is gte - 1910.

	db.movies.aggregate([{$match: {'imdb.rating': {$gt: 5}}}, {$addFields: {'average': {$avg: ['$imdb.rating', '$tomatoes.viewer.rating']}}}, {$match: {'year': {$gte: 1910}}}])



// Q. count the document from prev question.

	db.movies.aggregate([{$match: {'imdb.rating': {$gt: 5}}}, {$addFields: {'average': {$avg: ['$imdb.rating', '$tomatoes.viewer.rating']}}}, {$match: {'year': {$gte: 1910}}}, {$count: "Total Documents"}])


// Q. sort the documents

	db.movies.aggregate([{$match: {'imdb.rating': {$gt: 5}}}, {$addFields: {'average': {$avg: ['$imdb.rating', '$tomatoes.viewer.rating']}}}, {$match: {'year': {$gte: 1910}}}, {$sort: {average: -1}}])


// Q. skip the documents

	db.movies.aggregate([{$match: {'imdb.rating': {$gt: 5}}}, {$addFields: {'average': {$avg: ['$imdb.rating', '$tomatoes.viewer.rating']}}}, {$match: {'year': {$gte: 1910}}}, {$sort: {year: 1}}, {$skip: 10}, {$limit: 2}])


// Q. limit the documents

	db.movies.aggregate([{$match: {'imdb.rating': {$gt: 5}}}, {$addFields: {'average': {$avg: ['$imdb.rating', '$tomatoes.viewer.rating']}}}, {$match: {'year': {$gte: 1910}}}, {$limit: 2}])


// Q. $unwind
	
	// - it creates multiple documents for each values in array (break the array creating new docus on runtime)
	// - it has adv and disadv as it increase the runtime memory.

	db.movies.aggregate([{$match: {_id: ObjectId('573a1390f29313caabcd548c')}}, {$unwind: '$genres'}]) 

	// on prev problems 

	db.movies.aggregate([{$match: {'imdb.rating': {$gt: 5}}}, {$addFields: {'average': {$avg: ['$imdb.rating', '$tomatoes.viewer.rating']}}}, {$match: {'year': {$gte: 1910}}}, {$sort: {year: 1}}, {$unwind: "$genres"}, {$count: "field count"}])



// - $project

// Q. syntex


	// $project: {
	// 	title: 1,
	// 	trivid: "$plot"    ---- renaming plot,
	// 	plot: 0        --- removing plot as we renamed
	// }


// Q. $project example

	db.movies.aggregate([{$match: {'imdb.rating': {$gt: 5}}}, {$addFields: {'average': {$avg: ['$imdb.rating', '$tomatoes.viewer.rating']}}}, {$match: {'year': {$gte: 1910}}}, {$sort: {year: 1}}, {$unwind: "$genres"}, {$project: {title: 1, year: 1, avg: "$average", _id: 0}}])


// - $group

// Q. group example

	db.movies.aggregate([{$match: {'imdb.rating': {$gt: 5}}}, {$addFields: {'average': {$avg: ['$imdb.rating', '$tomatoes.viewer.rating']}}}, {$match: {'year': {$gte: 1910}}}, {$sort: {year: 1}}, {$unwind: "$genres"}, {$project: {title: 1, year: 1, avg: "$average"}}, {$group: {_id: '$year', count: {$count: {}}, data: {$first: {title: "$title"}}}}])



// q. group by year and create a array of titles from that groups title of each doc.

	db.movies.aggregate([{$match: {'imdb.rating': {$gt: 5}}}, {$addFields: {'average': {$avg: ['$imdb.rating', '$tomatoes.viewer.rating']}}}, {$match: {'year': {$gte: 1910}}}, {$sort: {year: 1}}, {$group: {_id: '$year', count: {$count: {}}, titles: {$push: "$title"}}}])




// - $lookup

	// - it works as join similer to sql, however mongo is not optimized for relations so it takes more time to do the same.

// q. 

	db.movies.aggregate([{$match: {'imdb.rating': {$gt: 5}}}, {$addFields: {'average': {$avg: ['$imdb.rating', '$tomatoes.viewer.rating']}}}, {$match: {'year': {$gte: 1910}}}, {$sort: {year: 1}}, {$lookup: {from: "comments", foreignField: "movies_id", localField: "_id", as: "Comments"}}])

// q. 2

// 	using lookup without narrowing the data will take even more time.

// -	You can use another aggregation pipeline inside the lookup using the pipeline key providing a array of stages - that will be only applied to that data while lookup.





// -###- $facet

// Processes multiple aggregation pipelines within a single stage on the same set of input documents. Each sub-pipeline has its own field in the output document where its results are stored as an array of documents.


// q. example

// using count and group 
	
	db.movies.aggregate([{$match: {'imdb.rating': {$gt: 5}}}, {$addFields: {'average': {$avg: ['$imdb.rating', '$tomatoes.viewer.rating']}}}, {$match: {'year': {$gte: 1910}}}, {$sort: {year: 1}}, {$facet: {field1: [{$count: "total count"}], field2: [{$group: {_id: '$year', count: {$count: {}}}}]}}])


// facet for pagination

db.movies.aggregate([{$match: {'imdb.rating': {$gt: 5}}}, {$addFields: {'average': {$avg: ['$imdb.rating', '$tomatoes.viewer.rating']}}}, {$match: {'year': {$gte: 1910}}}, {$sort: {year: 1}}, {$facet: {data: [{$skip: 10}, {$limit: 10}], count: [{$count: "count"}]}}])




// --- $out

// Takes the documents returned by the aggregation pipeline and writes them to a specified collection. You can specify the output database.

// The $out stage must be the last stage in the pipeline. The $out operator lets the aggregation framework return result sets of any size.


// USE CAREFULLY as it replaces the already existing collection.


// -- ttl index
// - it is used to create a doc that will get removed automatically with the specified time.


// and $$(doubledollar)
