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
    arrayMovie: ''
  },
  methods: {
    searchMovie() {
      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: this.api,
            language: this.language,
            query: this.query,
          }
        })
        .then((result) => {
          this.arrayMovie = result.data.results;
          console.log(this.arrayMovie);
        });

    },

    search() {
      console.log(this.query);
      this.searchMovie();
      this.query="";
    }

  }
});