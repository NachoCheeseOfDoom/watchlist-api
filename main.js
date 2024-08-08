
const searchBtnEl = document.getElementById('searchBtn')
const movieTitleEl = document.getElementById('movieTitle')
const movieListEl = document.getElementById('movieList')

const API_KEY = '19db8cf4'
const url = `https://www.omdbapi.com/?apikey=${API_KEY}&`

searchBtnEl.addEventListener('click', async () => {
    const title = movieTitleEl.value
    const res = await fetch(`${url}t=${title}&page=2`)
    const data = await res.json()
    // if (!data.Error) {
    //     // displayMovieDetails(data)
    //     alert('Movie not found.')
    // } else {
    // }
    loadMovies(data)
})

function loadMovies(movie = 'test') {
    const { Plot, Title, Runtime, Genre, Poster, Ratings } = movie
    const rating = Ratings[0].Value.split('/')[0]

    let html = `
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
                        <p class="movie-categorie">${Genre}</p>
                        <div>
                            <button class="add-to-watchlist">+</button>
                            <label class="movie-categorie">Watchlist</>
                        </div>
                    </div>
                    <p class="movie-discription">
                        ${Plot}
                    </p>
                </div>
            </div>
            <hr style="width: 100%;" />
        </section>    
    `
    movieListEl.innerHTML = html
}
// async function searchMovie(movieTitle) {
//     const res = await fetch(`${url}t=${movieTitle}`)
//     const data = await res.json()
//     if (!data.Error) {
//         displayMovieDetails(data)
//     } else {
//         alert('Movie not found.')
//     }

//     console.log(data)
// }