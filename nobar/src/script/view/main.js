import '../component/search-bar.js';
import DataSource from '../data/data-source.js';
import GenreSource from "../data/genre-source";

const main = () => {
    const baseUrl = 'https://api.themoviedb.org/3';
    const apiKey = '?api_key=eea3690386dd414a66b113e3f553a453';
    const linkImage = 'https://image.tmdb.org/t/p/w500';

    const searchElement = document.querySelector('search-bar');


    const onButtonSearchClicked = async () => {
        try {
            const result = await DataSource.searchMovie(searchElement.value);
            renderAllMovies(result);
        } catch (message) {
            showResponseMessage(message);
        }
    };

    searchElement.clickEvent = onButtonSearchClicked;

    const getGenres = () => {
        fetch(`${baseUrl}/genre/movie/list${apiKey}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.genres == undefined) {
                    showResponseMessage(responseJson = "Data tidak ditemukan");
                } else {
                    renderAllGenres(responseJson.genres);
                }
            })
            .catch(error => {
                showResponseMessage(error);
            });
    }

    const renderAllGenres = (genres) => {
        const listGenreElement = document.querySelector('#listGenres');
        listGenreElement.innerHTML = '';

        genres.forEach(genre => {
            listGenreElement.innerHTML += `
            <button id="${genre.id} "type="button" class="btn btn-purple mt-2 button-genre" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top">
            ${genre.name}
            </button>            
          `;
        });

        const buttons = document.querySelectorAll('.button-genre');
        buttons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const genreId = event.target.id;
                try {
                    const result = await GenreSource.searchByGenre(genreId);
                    renderAllMovies(result);
                } catch (message) {
                    showResponseMessage(message);
                }
            });
        });


    };

    const getMovie = () => {
        fetch(`${baseUrl}/discover/movie${apiKey}`)
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

        if(movies == 0){
            listMovieElement.innerHTML = `<h2>Movie not found</h2>`
        }else {
            movies.forEach(movie => {
                const movieImage = () => {
                    if (movie.backdrop_path !== null) {
                        return movie.backdrop_path;
                    } else {
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

        }
    };

    const showResponseMessage = (message = 'Check your internet connection') => {
        alert(message);
    };

    document.addEventListener('DOMContentLoaded', () => {
        getGenres();
        getMovie();
    });
};

export default main;