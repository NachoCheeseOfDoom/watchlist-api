document.addEventListener('DOMContentLoaded', () => {
    const watchListEl = document.getElementById('watch-list');

    if (!watchListEl) {
        // console.error('Element with ID "watch-list" not found.');
        return;
    }

    function loadWatchList() {
        let html = '';
        const movieId = JSON.parse(localStorage.getItem(LSKey));

        if (movieList.length === 0) {

            html = `
            <div class="movie-container">
                <h2 class="movie-empty">Your watchlist is looking a bit empty...</h2>
                <a href="index.html" class="add-movies">+ Let's add some movies!</a>
            </div>
            `;
            watchListEl.innerHTML = html;
        } else {
            const promises = movieId.map(async (id) => {
                const res = await fetch(`${url}i=${id}`);
                const data = await res.json();

                const { Plot, Title, Runtime, Genre, Poster, Ratings } = data;
                const rating = Ratings[0].Value.split('/')[0];

                html += ` 
                    <section class="movie-list__container">
                        <div class="movie">
                            <img class="movie-poster-img"
                                src=${Poster}
                                alt="Movie poster">
                            <div class="movie-content">
                                <div class="movie-info">
                                    <h3 class="movie-title">${Title}</h3>
                                    <div class="rate-container">
                                        <i class="fa fa-star gold-color" aria-hidden="true"></i>
                                        <p class="movie-rate">${rating}</p>
                                    </div>
                                </div>
                                <div class="movie-info">
                                    <p class="movie-time">${Runtime}</p>
                                    <p class="movie-genre">${Genre}</p>
                                    <div>
                                        <button class="add-to-watchlist" data-id=${id}>Remove</button>
                                    </div>
                                </div>
                                <p class="movie-description">
                                    ${Plot}
                                </p>
                            </div>
                        </div>
                        <hr style="width: 100%;" />
                    </section>    
                `;
            });
            Promise.all(promises).then(() => {
                watchListEl.innerHTML = html;
            });
        }
    }

    document.addEventListener('click', (e) => {
        const movieId = e.target.dataset.id
        if (movieId) {
            deleteMovie(movieId);
        }
    })

    function deleteMovie(id) {
        let index = 0
        movieList.forEach((movieId) => {
            if (movieId === id) {
                index = movieList.indexOf(movieId)
            }
        })

        movieList.splice(index, 1);
        localStorage.setItem(LSKey, JSON.stringify(movieList))
        loadWatchList()
    }
    loadWatchList();
});




const LSKey = 'watch-list'
const API_KEY = '19db8cf4'
export const url = `https://www.omdbapi.com/?apikey=${API_KEY}&`

const movieList = JSON.parse(localStorage.getItem(LSKey)) || [];
export function getId(id) {
    movieList.push(id)
    localStorage.setItem(LSKey, JSON.stringify(movieList));
}

