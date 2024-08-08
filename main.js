
const searchBtnEl = document.getElementById('searchBtn')
const movieTitleEl = document.getElementById('movieTitle')
const movieListEl = document.getElementById('movieList')

const API_KEY = '19db8cf4'
const url = `https://www.omdbapi.com/?apikey=${API_KEY}&`


document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        searchBtnEl.click()
    }
})
document.addEventListener('click', (e) => {
    if (e.target.dataset.id) {
        console.log(e.target.dataset.id)
    }
})
searchBtnEl.addEventListener('click', async () => {
    const title = movieTitleEl.value
    const res = await fetch(`${url}s=${title}`)
    const data = await res.json()

    if (!data.Error) {
        // displayMovieDetails(data)
        loadMovies(data.Search)
    } else {
        movieListEl.innerHTML = `
         <div class="movie-container">
            <h2 class="movie-empty">No movie found</h2>
            <img class="movie-not-found-img" src="../assets/img/no-movie.svg" alt="No movies found">
        </div>
        `
    }
})


function loadMovies(movies = []) {
    let html = ''
    const movieList = movies.map(async (movie) => {

        const { imdbID } = movie
        const res = await fetch(`${url}i=${imdbID}`)
        const data = await res.json()

        const { Plot, Title, Runtime, Genre, Poster, Ratings } = data
        const rating = Ratings[0].Value.split('/')[0]


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
                                <button class="add-to-watchlist" data-id=${imdbID}>+ Watch</button>
                            </div>
                        </div>
                        <p class="movie-description">
                            ${Plot}
                        </p>
                    </div>
                </div>
                <hr style="width: 100%;" />
            </section>    
        `
    })
    Promise.all(movieList).then(() => {
        movieListEl.innerHTML = html
    })
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