var app = new Vue({
  el: '#app',
  data: {
    query: '',
    api: '640221ae9d6dfeb3b525b2e0ac83a670',
    language: 'it-IT',
    arrayMovies: '',
    genres: '',
    tempGenres: '',
    flagsAvailable: ['ar', 'de', 'en', 'es', 'fr', 'ko', 'ro', 'it', 'ja', 'zh'],
    genreSelected: 'filtra',
    active: false,
    querySearched: '',
    firstSearch: false,
    arrayPopularMovies: [],
    counter: 0
  },
  mounted() {
    // chiamata axios a generi film
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
          api_key: this.api,
          language: this.language
        }
      })
      .then((result) => {

        this.genres = result.data.genres;
        // console.log(this.genres);

        // chiamata axios a generi serie tv
        axios
        .get("https://api.themoviedb.org/3/genre/tv/list", {
          params: {
            api_key: this.api,
            language: this.language
          }
        })
        .then((result) => {
          this.tempGenres = result.data.genres;
          // console.log(this.tempGenres);

          let ids = new Set(this.genres.map(item => item.id));
          this.genres = [...this.genres, ...this.tempGenres.filter(item => !ids.has(item.id))];
          // console.log(this.genres);
        });
        // .catch((error) => alert('Errore'));
      });
      // .catch((error) => alert('Errore'));

      // chiamata axios per movie popolari
      axios
        .get("https://api.themoviedb.org/3/movie/popular", {
          params: {
            api_key: this.api,
            language: this.language,
            page: 1
          }
        })
          .then((result) => {
            this.arrayPopularMovies = result.data.results;
            // console.log(this.arrayPopularMovies);
        });


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

          this.getCast(this.arrayMovies, 'movie');
          // console.log(this.arrayMovies);

          // CODICE PORTATO FUORI CON FUNZIONE GETCAST

          // this.arrayMovies.forEach((item) => {
          //   item.cast = [];
          //   // console.log(this.arrayMovies);
          //
          //   axios
          //   .get("https://api.themoviedb.org/3/movie/" + item.id + "/credits", {
          //     params: {
          //       api_key: this.api,
          //       language: this.language,
          //     }
          //   })
          //   .then((result) => {
          //     var cast = [];
          //     for (let i = 0; i < 5; i++) {
          //       cast.push(result.data.cast[i].original_name);
          //     }
          //     item.cast = cast;
          //   })
          //   // .catch((error) => alert('Errore'));
          //
          // }) // fine for each

        });
        // .catch((error) => alert('Erroree'));
        //fine prima chiamata axios

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

            this.getCast(this.arrayMovies, 'tv');
            // console.log(this.arrayMovies);
          }); // fine then
          // .catch((error) => alert('Errore'));
          //fine seconda chiamata axios

    }, // fine searchMovie()

    search() {
      if (this.query.length > 0) {
        this.searchMovie();
        this.querySearched = this.query;
        this.querySearched = this.query;
        this.query = "";
        this.firstSearch = true;

      }
    }, // fine search(): effettua la ricerca in base alla query digitata


    getYear(fullDate) {
      return fullDate.substr(0, 4);
    }, // fine getYear(): dalla data completa estrae solo le cifre dell'anno

    getGenre(idToCheck) {
      var thisGenre;
      this.genres.forEach((item) => {
        if (idToCheck == item.id) {
          // console.log(item.name);
          thisGenre = item.name;
          return thisGenre;
        }
      });
      return thisGenre;
    }, // fine getGenre(): individua il genere del film in base all'id

    changeActive() {
      this.active = false;
      // console.log(this.active);
    },

    getCast(array, castType) {

      array.forEach((item) => {
        item.cast = [];
        // console.log(this.arrayMovies);

        axios
        .get("https://api.themoviedb.org/3/" + castType + "/" + item.id + "/credits", {
          params: {
            api_key: this.api,
            language: this.language,
          }
        })
        .then((result) => {
          for (let i = 0; i < 5; i++) {
            item.cast.push(result.data.cast[i].original_name);
          }
          // utilizzato per forzare la ri-renderizzazione dell'item nell'html
          this.$forceUpdate()
        })
        // .catch((error) => alert('Errore'));

      }) // fine for each
    }, // fine getCast()
    nextImg() {
      if (this.counter == 4) {
        this.counter = 0;
      } else {
        this.counter++;
      }
      // console.log(this.counter);
    },
    prevImg() {
      if (this.counter == 0) {
        this.counter = 4;
      } else {
        this.counter--;
      }
      // console.log(this.counter);
    },
    changeImg(i) {
      this.counter = i;
    },

    backToHome() {
      this.firstSearch = false;
    }

  } // fine methods



});
