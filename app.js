// //dl, npm init for package.json. dl npm require, npm express, and npm nodemon 
// const express = require('express');
const request = require('request')
const config = require('./config/config');


// retreive API key from config. file ao that it's
const apiKey = config.apiKey;


//retreive movie ID from movie title 
const retreiveMovie = (movieTitle, callback) => {

    //need `` for personal api  
// const url = 'https://api.themoviedb.org/3/search/movie?query=' + movieTitle + '&api_key=7757357427f139ee5114c4d5e2571a17';


const url = 'https://api.themoviedb.org/3/search/movie?query=' + movieTitle + '&api_key=' + apiKey;

    // request access to movie json/api//
    // grab first result of movie search
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to movie server..', undefined);
        } else if (!response.body.results || response.body.results.length === 0) {
            callback('Unable to find movie title. Try another search..', undefined);
        } else {
            // Only log the desired information in the callback
            callback(undefined, {
                // this is grabbing movie id from first result
                movieId: response.body.results[0].id
            });
        }
    });
};



// give back information of similar movie from movie ID retrieval 
const similarMovie = (movieId, callback) => {

    const url = 'https://api.themoviedb.org/3/movie/' + movieId + '/similar?api_key=' + apiKey;


    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to find similar movie in search', undefined);
        } else {
            const similarMovies = response.body.results;
            if (!similarMovies || similarMovies.length === 0) {
                callback('No similar movies found.', undefined);
            } else {
                callback(undefined, similarMovies);
            }
        }
    });
}


//test movie here to appear on terminal,  call retreiveMovie function .. hard code movie title 
// run node app.js to test 
// retreiveMovie('silent hill', (error, result)=> {
//     similarMovie(result.movieId, (error, result) => {
//         if (error) {
//             console.log(error)
//         } else {
//             console.log(result)
//         }
//     }) 
// })


function displayResultSimilarMovies(similarMovies) {
    similarMovies.forEach(movie => {
        console.log('Title:', movie.title);
        console.log('Description:', movie.overview);
        console.log('  ------------ ***** ------------  ');

    });
  }
  
  //actually search for movie giving similar titles 
  function searchMovies(movieName) {
    retreiveMovie(movieName, (err, result) => {
        if (err) {
            console.error('Error: on looking up movie result...', err);
        } else {
            similarMovie(result.movieId, (error, result) => {
                if (error) {
                    console.error('Error: on getting similar movies.', error);
                } else {
                    console.log('Similar Movie List Results:');
                    displayResultSimilarMovies(result);
                }
            });
        }
    });
  }
  
//   take in any movie, type on terminal node app.js terminator
  const searchQuery = process.argv.slice(2).join(' ');
  console.log('Searched Movie:', searchQuery);
  
  
  searchMovies(searchQuery);


// listener for port to run 
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// })


//NOTES
//  response.body: --> accesses the body of the response, assuming it contains structured data from json format 
//  response.body.results: -->  within the body, there is an array property named results that we are going into 
//  response.body.results[0]: -->  accesses the first element (index 0) of the results array.
//  response.body.results[0].id: Finally going to extract the id property from the first result.

