
const searchBtnEl = document.getElementById('searchBtn')
const movieTitleEl = document.getElementById('movieTitle')

const API_KEY = '19db8cf4'
const url = `https://www.omdbapi.com/?apikey=${API_KEY}&`

searchBtnEl.addEventListener('click', async () => {
    const title = movieTitleEl.value
    const res = await fetch(`${url}t=${title}`)
    const data = await res.json()
    if (!data.Error) {
        displayMovieDetails(data)
    } else {
        alert('Movie not found.')
    }

    console.log(data)
})

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