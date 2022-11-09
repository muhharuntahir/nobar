class DataSource {
    static searchClub(keyword) {
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=eea3690386dd414a66b113e3f553a453&language=en-US&query=${keyword}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.results) {
                    return Promise.resolve(responseJson.results);
                } else {
                    return Promise.reject(`${keyword} is not found`);
                }
            });
    }
}

export default DataSource;

