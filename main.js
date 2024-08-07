
const searchBtnEl = document.getElementById('searchBtn')
const movieTitleEl = document.getElementById('movieTitle')

const API_KEY = '19db8cf4'
const url = `https://www.omdbapi.com/?apikey=${API_KEY}&`

searchBtnEl.addEventListener('click', () => {
    const title = movieTitleEl.value
    searchMovie(title)
})

async function searchMovie(movieTitle) {
    const res = await fetch(`${url}t=${movieTitle}`)
    const data = await res.json()

    console.log(data)
}