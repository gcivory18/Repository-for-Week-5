class Actor { //this is where I created my first class which includes the name of the actor and the character they play
    constructor(name, character) {
        this.name = name;
        this.character = character;
    }

    describe() { //this describes whatever actor is added by saying the actor plays the character added in
        return `${this.name} plays ${this.character}.`
    }
}

class Movie { //this is my second class that will include the name of the movie and the array that will take in actors that are added
    constructor(name) {
        this.name = name;
        this.actors = [];
    }

    addActor(actor) { //this is where actors are able to be named and pushed to the actors array
        if (actor instanceof Actor) {
        this.actors.push(actor);
    } else {
        throw new Error(`You can only add an instance of Actor. Argument is not an actor: ${actor}`);
    }
  }
  describe() { //this describes the movie saying that this movie has whatever actors are added by the user
    return `${this.name} has ${this.actors.length} actors.` ;
  }
}

class Menu { //this is where I created my menu class that includes a switch statement for the main menu of the menu app
    constructor() {
        this.movies = [];
        this.selectedMovie = null;
    }
    start() { //these are the potential options the user can choose and where they will be directed based on the index they type
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

        alert('Bye Felicia!'); //if the user types in 0 they will be exited out of the menu and receive this message
    }

    showMainMenuOptions() { //these are the menu options listed out that the user will choose from
        return prompt(`
        0) exit
        1) name a movie
        2) delete movie
        3) view movie
        4) display all movies
        `);
    }

    showMovieMenuOptions(movieInfo) { //when the user views a movie they will be given these options to add or delete an actor
        return prompt(`
        0) back
        1) name an actor
        2) delete an actor
        ----------------------------
        ${movieInfo}
        `);

    }

    displayMovies() { //this is the code behind the menu option to display movies, this is how the movies will display when a user adds them
        let movieString = '';
        for (let i = 0; i < this.movies.length; i++) {
            movieString += i + ') ' + this.movies[i].name + '\n';
        }
        alert(movieString);
    }

    nameMovie() { //this is where the user gets to type in the name of a movie they want to add
        let name = prompt('Enter a name of a movie:');
        this.movies.push(new Movie(name));
    }

    viewMovie() { //this is where the user will be able to see the movies they have added
        let index = prompt('Enter the index of the movie you want to view:');
        if (index > -1 && index < this.movies.length) {
            this.selectedMovie = this.movies[index];
            let description = 'Movie Name: ' + this.selectedMovie.name + '\n'; 

            for (let i = 0; i < this.selectedMovie.actors.length; i++) {
                description += i + ') ' + this.selectedMovie.actors[i].name + " - "  + this.selectedMovie.actors[i].character + '\n' ;
            }

            let selection = this.showMovieMenuOptions(description); //this is where the user can add or delete actors from the movie
            switch (selection) {
                case '1':
                    this.nameActor();
                    break;
                case '2':
                    this.deleteActor(); 
            }
        }
    }
    deleteMovie() { //this is the code for if a user wants to delete a movie and they will be prompted to type in the index of whichever movie they choose
        let index = prompt('Enter the index of the movie you want to delete:');
        if (index > -1 && index < this.movies.length) {
            this.movies.splice(index, 1);
        }
    }

    nameActor() { //this is where the user will get to name the actor in the movie and include the name of the actors character
        let name = prompt('Enter name of new actor:');
        let character = prompt('Enter the character name for the new actor:');
        this.selectedMovie.actors.push(new Actor(name, character));
    }
    
    deleteActor() { //this is the other option if chosen the user can delete an actor by typing in the index of the actor 
        let index = prompt('Enter the index of the actor you want to delete:');
        if (index > -1 && index < this.selectedMovie.actors.length) {
            this.selectedMovie.actors.splice(index, 1);
        }
    }
}
let menu = new Menu();
menu.start(); //this is the start function that will display everyhting in the browser
