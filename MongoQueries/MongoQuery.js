




// Write a query to find movies where the number of reviews in `tomatoes.viewer.numReviews` has increased by at least 10% over the past year. Return the titles and the number of reviews.



 // Ques6.// Write an aggregation query to find the pair of actors who have appeared together in the most number of movies. Return their names and the number of movies they've co-starred in.


db.movies.aggregate([    
    {
    $match: {
      "cast": {
      $exists: true
      }

    }
    },

    {
      $project: {
        castPairs: {
          $reduce: {
            input: { $range: [0, { $subtract: [{ $size: "$cast" }, 1] }] },
            initialValue: [],
            in: {
              $concatArrays: [
                "$$value",
                {
                  $map: {
                    input: { $slice: ["$cast", { $add: ["$$this", 1] }, { $size: "$cast" }] },
                    as: "pairActor",
                    in: [{ $arrayElemAt: ["$cast", "$$this"] }, "$$pairActor"]
                  }
                }
              ]
            }
          }
        }
      }
    },
    {
      $unwind: "$castPairs"
    },
    {
      $project: {
        actorPair: {
          $let: {
            vars: {
              first: { $arrayElemAt: ["$castPairs", 0] },
              second: { $arrayElemAt: ["$castPairs", 1] }
            },
            in: {
              $cond: { if: { $lt: ["$$first", "$$second"] }, then: ["$$first", "$$second"], else: ["$$second", "$$first"] }
            }
          }
        }
      }
    },
    {
      $group: {
        _id: "$actorPair",
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ])










// Write a query to find all movies that share at least one cast member with "Blacksmith Scene."

// Queryyy


db.movies.findOne({title:'Blacksmith Scene'},{cast: 1})
// {
//   _id: ObjectId('573a1390f29313caabcd4135'),
//   cast: [ 'Charles Kayser', 'John Ott' ]
// }
db.movies.findOne({title:'Blacksmith Scene'},{cast: 1}).cast
// [ 'Charles Kayser', 'John Ott' ]


      db.movies.find({cast:{$in:db.movies.findOne({title:'Blacksmith Scene'},{cast: 1}).cast}})
// [
//   {
//     _id: ObjectId('573a1390f29313caabcd4135'),
//     plot: 'Three men hammer on an anvil and pass a bottle of beer around.',
//     genres: [ 'Short' ],
//     runtime: 1,
//     cast: [ 'Charles Kayser', 'John Ott' ],
//     num_mflix_comments: 1,
//     title: 'Blacksmith Scene',
//     fullplot: 'A stationary camera looks at a large anvil with a blacksmith behind it and one on either side. The smith in the middle draws a heated metal rod from the fire, places it on the anvil, and all three begin a rhythmic hammering. After several blows, the metal goes back in the fire. One smith pulls out a bottle of beer, and they each take a swig. Then, out comes the glowing metal and the hammering resumes.',
//     countries: [ 'USA' ],
//     released: ISODate('1893-05-09T00:00:00.000Z'),
//     directors: [ 'William K.L. Dickson' ],
//     rated: 'UNRATED',
//     awards: { wins: 1, nominations: 0, text: '1 win.' },
//     lastupdated: '2015-08-26 00:03:50.133000000',
//     year: 1893,
//     imdb: { rating: 6.2, votes: 1189, id: 5 },
//     type: 'movie',
//     tomatoes: {
//       viewer: { rating: 3, numReviews: 184, meter: 32 },
//       lastUpdated: ISODate('2015-06-28T18:34:09.000Z')
//     }
//   },
//   {
//     _id: ObjectId('66fa77eec5396a93f3964034'),
//     plot: 'three men enter into engineering College and followed their passion. ',
//     genre: [ 'FullMovie' ],
//     runtime: 1,
//     cast: [ 'Charles Kayser', 'John Ott' ],
//     num_mflix_comments: 1,
//     Movie_Id: 1
//   }
// ]







// Write a query to find the top 5 movies with the highest IMDb ratings that were released before the year 1900.
 // Queryyy:
 db.movies.aggregate([ { $match: { year: { $lt: 1900 } } },  { $sort: { 'imdb.rating': -1 } }, { $limit: 5 }] )



// [
//   {
//     _id: ObjectId('573a139ef29313caabcfe4f1'),
//     plot: 'The sound has been found in the form of an old Edisonian recording cylinder. The cylinder was repaired, then Walter Murch ACE MPSE synced the film to the correct music in (I believe) 2002. Total running time is approximately 17 seconds.',
//     genres: [ 'Short' ],
//     runtime: 1,
//     title: 'Dickson Experimental Sound Film',
//     countries: [ 'USA' ],
//     fullplot: 'The earliest extant sound film. William K.L. Dickson stands in the background next to a huge sound pickup horn connected to a Thomas Edison phonograph recorder. As he plays a violin, two men dance in the foreground. This film was made to demonstrate a new Thomas Edison machine, the Kinetophone. These machines were Kinetoscope peepshow viewers mated with Thomas Edison wax cylinder phonographs. But the Kinetophone never caught on and this film was never released. The film still exists, but the phonograph soundtrack has been lost.',
//     languages: [ 'English' ],
//     cast: [ 'William K.L. Dickson' ],
//     directors: [ 'William K.L. Dickson' ],
//     rated: 'NOT RATED',
//     awards: { wins: 1, nominations: 0, text: '1 win.' },
//     lastupdated: '2015-06-16 00:30:38.357000000',
//     year: 1894,
//     imdb: { rating: 6.8, votes: 1101, id: 177707 },
//     type: 'movie',
//     tomatoes: {
//       viewer: { rating: 3.8, numReviews: 1794, meter: 84 },
//       dvd: ISODate('2001-05-22T00:00:00.000Z'),
//       production: 'Sony Pictures Home Entertainment',
//       lastUpdated: ISODate('2015-08-23T18:16:01.000Z')
//     }
//   },
//   {
//     _id: ObjectId('573a1390f29313caabcd4135'),
//     plot: 'Three men hammer on an anvil and pass a bottle of beer around.',
//     genres: [ 'Short' ],
//     runtime: 1,
//     cast: [ 'Charles Kayser', 'John Ott' ],
//     num_mflix_comments: 1,
//     title: 'Blacksmith Scene',
//     fullplot: 'A stationary camera looks at a large anvil with a blacksmith behind it and one on either side. The smith in the middle draws a heated metal rod from the fire, places it on the anvil, and all three begin a rhythmic hammering. After several blows, the metal goes back in the fire. One smith pulls out a bottle of beer, and they each take a swig. Then, out comes the glowing metal and the hammering resumes.',
//     countries: [ 'USA' ],
//     released: ISODate('1893-05-09T00:00:00.000Z'),
//     directors: [ 'William K.L. Dickson' ],
//     rated: 'UNRATED',
//     awards: { wins: 1, nominations: 0, text: '1 win.' },
//     lastupdated: '2015-08-26 00:03:50.133000000',
//     year: 1893,
//     imdb: { rating: 6.2, votes: 1189, id: 5 },
//     type: 'movie',
//     tomatoes: {
//       viewer: { rating: 3, numReviews: 184, meter: 32 },
//       lastUpdated: ISODate('2015-06-28T18:34:09.000Z')
//     }
//   },
//   {
//     _id: ObjectId('573a13a0f29313caabd041db'),
//     plot: 'Two people kiss.',
//     genres: [ 'Short', 'Romance' ],
//     runtime: 1,
//     title: 'The Kiss',
//     countries: [ 'USA' ],
//     fullplot: 'A couple make love, in the 19th century sense. Then he grooms his moustache, and gives her a kiss. On the lips!',
//     num_mflix_comments: 2,
//     cast: [ 'May Irwin', 'John C. Rice' ],
//     directors: [ 'William Heise' ],
//     writers: [ 'John J. McNally (play)' ],
//     awards: { wins: 1, nominations: 0, text: '1 win.' },
//     lastupdated: '2015-08-30 04:39:01.160000000',
//     year: 1896,
//     imdb: { rating: 5.9, votes: 1759, id: 139738 },
//     type: 'movie'
//   },
//   {
//     _id: ObjectId('573a139cf29313caabcf560f'),
//     plot: 'Two people kiss.',
//     genres: [ 'Short', 'Romance' ],
//     runtime: 1,
//     title: 'The Kiss',
//     countries: [ 'USA' ],
//     fullplot: 'A couple make love, in the 19th century sense. Then he grooms his moustache, and gives her a kiss. On the lips!',
//     num_mflix_comments: 1,
//     cast: [ 'May Irwin', 'John C. Rice' ],
//     directors: [ 'William Heise' ],
//     writers: [ 'John J. McNally (play)' ],
//     awards: { wins: 1, nominations: 0, text: '1 win.' },
//     lastupdated: '2015-08-07 00:29:36.180000000',
//     year: 1896,
//     imdb: { rating: 5.9, votes: 1739, id: 139738 },
//     type: 'movie',
//     tomatoes: {
//       viewer: { rating: 4, numReviews: 235, meter: 87 },
//       dvd: ISODate('1999-05-04T00:00:00.000Z'),
//       lastUpdated: ISODate('2015-08-22T19:24:09.000Z')
//     }
//   },
//   {
//     _id: ObjectId('573a13a3f29313caabd0d5a4'),
//     plot: 'An athlete swings Indian clubs.',
//     genres: [ 'Documentary', 'Short' ],
//     runtime: 1,
//     title: 'Newark Athlete',
//     num_mflix_comments: 3,
//     countries: [ 'USA' ],
//     fullplot: 'A young man stands before the camera holding a club in each hand, horizontal to the ground. He raises the heads of the two clubs in unison, by rotating the clubs without lifting his arms. The film then shows the same footage over again, at different speeds.',
//     languages: [ 'English' ],
//     directors: [ 'William K.L. Dickson' ],
//     rated: 'NOT RATED',
//     awards: { wins: 1, nominations: 0, text: '1 win.' },
//     lastupdated: '2015-08-03 00:57:26.680000000',
//     year: 1891,
//     imdb: { rating: 4.9, votes: 827, id: 241763 },
//     type: 'movie',
//     tomatoes: { lastUpdated: ISODate('2012-09-30T00:00:00.000Z') }
//   }
// ]



// Write a query to find all movies directed by "William K.L. Dickson." Return the titles, release years, and IMDb ratings of the movies.

// Queryyy:-

  db.movies.find({directors:'William K.L. Dickson'},{title:1,year:1,'imdb.rating':1})


// [
//   {
//     _id: ObjectId('573a1390f29313caabcd4135'),
//     title: 'Blacksmith Scene',
//     year: 1893,
//     imdb: { rating: 6.2 }
//   },
//   {
//     _id: ObjectId('573a139ef29313caabcfe4f1'),
//     title: 'Dickson Experimental Sound Film',
//     year: 1894,
//     imdb: { rating: 6.8 }
//   },
//   {
//     _id: ObjectId('573a13a3f29313caabd0d5a4'),
//     title: 'Newark Athlete',
//     year: 1891,
//     imdb: { rating: 4.9 }
//   }
// ]





// Write an aggregation query to find the top 3 directors who have directed the most movies in the "Short" genre. Return the directors' names and the number of movies.



// Queryyy:-

db.movies.aggregate([{ $match:{genres:'Short'}},{$unwind:'$directors'},{$group:{_id:'$directors',movieCount:{$sum:1}}},{$sort:{movieCount:-1}},{$limit:3}])


/// Result Of this Query:---
// [
//   { _id: 'Norman McLaren', movieCount: 9 },
//   { _id: 'Aleksandr Petrov', movieCount: 6 },
//   { _id: 'Nick Park', movieCount: 5 }
// ]