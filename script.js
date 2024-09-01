document.getElementById('searchButton').addEventListener('click', searchMovies);

let api_key = '35f32b0088f37561b13f720356a01808';
let urlBase = 'https://api.themoviedb.org/3/search/movie';
let urlImgBase = 'https://image.tmdb.org/t/p/w500';


let resultContainer = document.getElementById('results');


function searchMovies() {
      resultContainer.innerHTML = 'Cargando.....'
    let searchInput = document.getElementById('searchInput').value;
    fetch(`${urlBase}?api_key=${api_key}&query=${encodeURIComponent(searchInput)}`)
        .then(response => response.json())
        .then(response => displayMovies(response.results)) // Acceso correcto a la propiedad results
        .catch(error => console.error('Error:', error));
}

function displayMovies(movies) {
    resultContainer.innerHTML = ''
    
    resultContainer.innerHTML = '';

    if (movies.length === 0) {
        resultContainer.innerHTML = '<p>No se encontraron resultados para tu búsqueda.</p>';
        return;
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        let title = document.createElement('h2');
        title.textContent = movie.title;

        let releaseDate = document.createElement('p');
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date;

        let overview = document.createElement('p');
        overview.textContent = movie.overview;

        let posterPath = urlImgBase + movie.poster_path; // Usa la base de URL correcta para las imágenes
        let poster = document.createElement('img');
        poster.src = posterPath;

        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(overview);

        resultContainer.appendChild(movieDiv);
    });
}