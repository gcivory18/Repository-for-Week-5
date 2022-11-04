class Actor {
    constructor(name, character) {
        this.name = name;
        this.character = character;
    }

    describe() {
        return `${this.name} plays ${this.character}.`
    }
}

class Movie {
    constructor(name) {
        this.name = name;
        this.actors = [];
    }

    addActor(actor) {
        if (actor instanceof Actor) {
        this.actors.push(actor);
    } else {
        throw new Error(`You can only add an instance of Actor. Argument is not an actor: ${actor}`);
    }
  }
  describe() {
    return `${this.name} has ${this.actors.length} actors.` ;
  }
}

class Menu {
    constructor() {
        this.movies = [];
        this.selectedMovie = null;
    }
    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1' :
                    this.nameMovie();
                    break;
                case '2' :
                    this.deleteMovie();
                    break;
                case '3' :
                    this.viewMovie();
                    break;
                case '4' :
                    this.displayMovies();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Bye Felicia!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) name a movie
        2) delete movie
        3) view movie
        4) display all movies
        `);
    }

    showMovieMenuOptions(movieInfo) {
        return prompt(`
        0) back
        1) name an actor
        2) delete an actor
        ----------------------------
        ${movieInfo}
        `);

    }

    displayMovies() {
        let movieString = '';
        for (let i = 0; i < this.movies.length; i++) {
            movieString += i + ') ' + this.movies[i].name + '\n';
        }
        alert(movieString);
    }

    nameMovie() {
        let name = prompt('Enter a name of a movie:');
        this.movies.push(new Movie(name));
    }

    viewMovie() {
        let index = prompt('Enter the index of the movie you want to view:');
        if (index > -1 && index < this.movies.length) {
            this.selectedMovie = this.movies[index];
            let description = 'Movie Name: ' + this.selectedMovie.name + '\n'; 

            for (let i = 0; i < this.selectedMovie.actors.length; i++) {
                description += i + ') ' + this.selectedMovie.actors[i].name + " - "  + this.selectedMovie.actors[i].character + '\n' ;
            }

            let selection = this.showMovieMenuOptions(description);
            switch (selection) {
                case '1':
                    this.nameActor();
                    break;
                case '2':
                    this.deleteActor(); 
            }
        }
    }
    deleteMovie() {
        let index = prompt('Enter the index of the movie you want to delete:');
        if (index > -1 && index < this.movies.length) {
            this.movies.splice(index, 1);
        }
    }

    nameActor() {
        let name = prompt('Enter name of new actor:');
        let character = prompt('Enter the character name for the new actor:');
        this.selectedMovie.actors.push(new Actor(name, character));
    }
    
    deleteActor() {
        let index = prompt('Enter the index of the actor you want to delete:');
        if (index > -1 && index < this.selectedMovie.actors.length) {
            this.selectedMovie.actors.splice(index, 1);
        }
    }
}
let menu = new Menu();
menu.start();
