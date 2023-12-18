const request = require('request')

const title = (movieTitle, callback) => {

    // ? becomes %3F
    // this is error handling.. need `` for api 
    const url = 'https://api.themoviedb.org/3/search/movie?query=' + movieTitle + '&api_key=7757357427f139ee5114c4d5e2571a17';

request({ url: url, json: true }, (error, response) => {
    // console.log('API Response:', response.body); // Log the entire API response for inspection
    if (error) {
        callback('unable to connect to movie server', undefined);
    } else if (!response.body.results || !body.results.length === 0) {
        callback('Unable to find movie title. Try another search', undefined);
    } else {
        // Only log the desired information in the callback
            callback(undefined, {
                // ths is grabbing movie id from first result 
             movieId: response.body.results[0].id       
            })
    }
});
};


const similarMovie = (movieId, callback) => {

    const url = 'https://api.themoviedb.org/3/movie/' + movieId + '/similar?api_key=' + '7757357427f139ee5114c4d5e2571a17'

request({ url: url, json: true }, (error, response) => {
    if (error) {
        callback('unable to connect to find similar movie in search', undefined)
    }
    else {
        callback(response.body.results)
    }
})

}

title('taken', (error, result)=> {
    similarMovie(result.movieId, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
        }
    }) 
})