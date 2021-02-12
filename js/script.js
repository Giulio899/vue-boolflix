// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.

// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto

var app = new Vue({
  el: '#app',
  data: {
    query: '',
    api: '640221ae9d6dfeb3b525b2e0ac83a670',
    language: 'it-IT',
    arrayMovies: '',
    genres: '',
    flagsAvailable: ['de', 'en', 'es', 'fr', 'ko', 'ro', 'it', 'ja', 'zh']
  },
  mounted() {
    // chiamata axios a generi film
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
          api_key: this.api
        }
      })
      .then((result) => {
        this.genres = result.data.genres;
        // console.log(this.genres);
      })
      .catch((error) => alert('Errore'));

    // chiamata axios a generi film
    axios
      .get("https://api.themoviedb.org/3/genre/tv/list", {
        params: {
          api_key: this.api
        }
      })
      .then((result) => {
        this.genres.concat(result.data.genres);
        console.log('1', this.genres);
      })
      .catch((error) => alert('Errore'));


  }, // fine mounted
  methods: {
    searchMovie() {

      // chiamata axios a db film
      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: this.api,
            language: this.language,
            query: this.query,
          }
        })
        .then((result) => {
          this.arrayMovies = result.data.results;

        })
        .catch((error) => alert('Errore')); //fine prima chiamata axios

        // chiamata axios a db serietv
        axios
          .get("https://api.themoviedb.org/3/search/tv", {
            params: {
              api_key: this.api,
              language: this.language,
              query: this.query,
            }
          })
          .then((result) => {
            this.arrayMovies = this.arrayMovies.concat(result.data.results);
          })
          .catch((error) => alert('Errore')); //fine seconda chiamata axios

    }, // fine searchMovie()

    search() {
      this.searchMovie();
      this.query = "";
    }, // fine search(): effettua la ricerca in base alla query digitata


    getYear(fullDate) {
      return fullDate.substr(0, 4);
    }, // fine getYear(): dalla data completa estrae solo le cifre dell'anno

    getGenre(idToCheck) {
      var thisGenre;
      this.genres.forEach((item) => {
        if (idToCheck == item.id) {
          console.log(item.name);
          thisGenre = item.name;
          return thisGenre;
        }
      });
      return thisGenre;
    } // fine getGenre(): individua il genere del film in base all'id

  } // fine methods
});
