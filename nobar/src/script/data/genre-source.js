class GenreSource {
    static searchByGenre(id) {
        return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=eea3690386dd414a66b113e3f553a453&language=en-US&with_genres=${id}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.results) {
                    return Promise.resolve(responseJson.results);
                } else {
                    return Promise.reject(`${id} is not found`);
                }
            });
    }
}

export default GenreSource;

