import '../component/search-bar.js';
import DataSource from '../data/data-source.js';

const main = () => {

    const searchElement = document.querySelector('search-bar');

    const onButtonSearchClicked = async () => {
        try {
            const result = await DataSource.searchClub(searchElement.value);
            renderAllMovies(result);
        } catch (message) {
            showResponseMessage(message);
        }
    };

    searchElement.clickEvent = onButtonSearchClicked;


    const baseUrl = 'https://api.themoviedb.org/3';
    const apiKey = 'eea3690386dd414a66b113e3f553a453';
    const linkImage = 'https://image.tmdb.org/t/p/w500';

    const getNowPlaying = () => {
        fetch(`${baseUrl}/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.results.adult) {
                    showResponseMessage(responseJson.results.title);
                } else {
                    renderAllMovies(responseJson.results);
                }
            })
            .catch(error => {
                showResponseMessage(error);
            });
    };


    const renderAllMovies = (movies) => {
        const listMovieElement = document.querySelector('#listMovie');
        listMovieElement.innerHTML = '';



        movies.forEach(movie => {
            const movieImage = () => {
                if(movie.backdrop_path !== null){
                    return movie.backdrop_path;
                }else{
                    return movie.poster_path;
                }
            }
            listMovieElement.innerHTML += `
            <div class="col">
                <div class="card">
                    <img src="${linkImage}${movieImage()}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">(${movie.id}) ${movie.title}</h5>
                        <p class="card-text">${movie.overview}</p>
                    </div>
                </div>
            </div>
          `;
        });
    };

    const showResponseMessage = (message = 'Check your internet connection') => {
        alert(message);
    };

    document.addEventListener('DOMContentLoaded', () => {
            getNowPlaying();
    });
};

export default main;