// User class representing a user of the movie booking application
class User {
    constructor(name, email) {
        this.name = name,
            this.email = email
    }
    bookSeat(city, theaterName, screenNo, showTime, seatName) {
        // Call the facade method to select the seat
        movieBookingFacade.selectSeat(this, city, theaterName, screenNo, showTime, seatName);
    }
    unbookSeat(city, theaterName, screenNo, showTime, seatName) {
        // Call the facade method to unbook the seat
        movieBookingFacade.unselectSeat(this, city, theaterName, screenNo, showTime, seatName);
    }
}

// Theater class representing a theater with multiple screens and shows
class Theater {
    constructor(name, city) {
        this.name = name,
            this.city = city,
            this.screens = []
    }
    addScreen(screen) {
        this.screens.push(screen)
    }
}
// Screen class representing a screen in a theater with multiple shows
class Screen {
    constructor(number) {
        this.number = number;
        this.shows = [];
    }
    addShow(show) {
        this.shows.push(show);
    }
}
// Show class representing a movie show with time
class Show {
    constructor(movie, time) {
        this.movie = movie,
            this.time = time,
            this.seats = []
    }
    addSeat(seat) {
        this.seats.push(seat)
    }
}
// Seat class representing a seat in a theater
class Seat {
    constructor(name) {
        this.name = name,
            this.isBooked = false
    }
    book() {
        this.isBooked = true
    }
    unbook() {
        this.isBooked = false
    }
}
// Facade class for managing the movie booking process
// Facade class for managing the movie booking process
class MovieBookingFacade {
    constructor() {
        this.theaters = [];
    }
    addTheater(theater) {
        this.theaters.push(theater);
    }
    selectSeat(user, city, theaterName, screenNo, showTime, seatName) {
        const theater = this.theaters.find(t => t.city === city && t.name === theaterName);
        if (!theater) {
            console.log("Theater not found");
            return false;
        }

        const screen = theater.screens.find(s => s.number == screenNo);
        if (!screen) {
            console.log("Screen not found");
            return false;
        }

        const show = screen.shows.find(s => s.time === showTime);
        if (!show) {
            console.log("Show not found");
            return false;
        }

        const seat = show.seats.find(s => s.name === seatName);
        if (!seat) {
            console.log("Seat not found");
            return false;
        }

        if (seat.isBooked) {
            console.log("Seat is already booked");
            return false;
        }

        seat.book();
        console.log(`Seat ${seatName} booked successfully for ${user.name}`);
        return true;
    }
    unselectSeat(user, city, theaterName, screenNo, showTime, seatName) {
        const theater = this.theaters.find(t => t.city === city && t.name === theaterName);
        if (!theater) {
            console.log("Theater not found");
            return false;
        }

        const screen = theater.screens.find(s => s.number === screenNo);
        if (!screen) {
            console.log("Screen not found");
            return false;
        }

        const show = screen.shows.find(s => s.time === showTime);
        if (!show) {
            console.log("Show not found");
            return false;
        }

        const seat = show.seats.find(s => s.name === seatName);
        if (!seat) {
            console.log("Seat not found");
            return false;
        }

        if (!seat.isBooked) {
            console.log("Seat is not booked");
            return false;
        }

        seat.unbook();
        console.log(`Seat ${seatName} unbooked successfully for ${user.name}`);
        return true;
    }
}


// Create users
const user1 = new User("User 1", "user1@example.com");
const user2 = new User("User 2", "user2@example.com");

// Create theaters, screens, shows, and seats
const Theater1=new Theater("Theater 1", "City 1");
const screen1=new Screen(1);
const show1=new Show("Movie1","10:00 AM");
show1.addSeat(new Seat("A1"));
show1.addSeat(new Seat("A2"));
screen1.addShow(show1);
Theater1.addScreen(screen1);

const Theater2=new Theater("Theater 2", "City 2");
const screen2=new Screen(2);
const show2=new Show("Movie2","08:30 PM");
show2.addSeat(new Seat("B1"));
show2.addSeat(new Seat("B2"));
screen2.addShow(show2); 
Theater2.addScreen(screen2);

// Initialize facade and add theaters
const movieBookingFacade = new MovieBookingFacade();
movieBookingFacade.addTheater(Theater1);
movieBookingFacade.addTheater(Theater2);

// Simulate seat selection for users
// Simulate seat selection for users
user1.bookSeat("City 1", "Theater 1", 1, "10:00 AM", "A1");
user2.bookSeat("City 2", "Theater 2", 2, "08:30 PM", "B1");
