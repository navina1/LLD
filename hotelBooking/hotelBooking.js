/*
Functional Requirements
Show hotel rooms 
checkin 
checkout
rooms available on a specific date


Non - Functional Requirements
Only one kind of room is available
One room can have maximum 2 guests
*/

class Room {
    constructor(number) {
        this.number = number
        this.bookings = []
    }

    bookRoom(custName, checkIn, checkOut) {
        const booking = new Booking(custName, checkIn, checkOut)
        this.bookings.push(booking)
    }

    isValid(checkIn, checkOut) {
        if(this.bookings.length<=0){
            return true
        }
        for(let i=0; i< this.bookings.length; i++) {
            if(checkIn >= this.bookings[i].checkIn && checkIn <= this.bookings[i].checkOut) {
                return false
            }
            if(checkOut >= this.bookings[i].checkIn && checkOut <= this.bookings[i].checkOut) {
                return false
            }
            if(checkIn < this.bookings[i].checkIn && checkOut > this.bookings[i].checkOut) {
                return false
            }
            return true
        }
    }


}


class Booking {
    constructor(customer, checkIn, checkOut, room) {
        this.customer = customer
        this.checkIn = checkIn
        this.checkOut = checkOut
    }
}

class Hotel {
    constructor() {
        this.name = "Hilton"
        this.rooms = []
    }

    addRoom(roomNumber) {
        const room = new Room(roomNumber)
        this.rooms.push(room)
    }

    bookHotelRoom(custName, checkIn, checkOut) {
        //console.log(checkIn,checkOut)
        for(let i=0; i< this.rooms.length; i++) {
            if(this.rooms[i].isValid(checkIn, checkOut)) {
                this.rooms[i].bookRoom(custName, checkIn, checkOut)
                console.log(`Room ${i+1} booked from ${checkIn} to ${checkOut}`)
                return
            } 
        }
        console.log("No rooms available")
    }
    showEmptyRooms(checkIn,checkOut){
        let  emptyRooms = 0;
        for(let i=0;i<this.rooms.length;i++){
            if(this.rooms[i].isValid(checkIn,checkOut)){
                emptyRooms++;
            }
        }
        console.log(`Empty Rooms are ${emptyRooms}`);
    }
    cancelBooking(custName,checkIn,checkOut){
        for(let i=0;i<this.rooms.length;i++){
            let booking=this.rooms[i].bookings.filter(x=> x.customer != custName && x.checkIn !== checkIn && x.checkOut !== checkOut )
            if(booking.length !== this.rooms[i].bookings.length){
                this.rooms[i].bookings=[...booking];
                console.log("Booking is cancelled");
                return
            }
        }
        console.log(`There no any bookings from ${checkIn} to ${checkOut}`)
    }
}

const  hotel = new Hotel();
hotel.addRoom(1);
hotel.addRoom(2);
hotel.addRoom(3);   
hotel.addRoom(4);  
hotel.addRoom(5);        
console.log(hotel.rooms.length);
hotel.bookHotelRoom("John","12-2-2024","16-2-2024");
hotel.bookHotelRoom("Jane","13-2-2024","17-2-2024");
hotel.bookHotelRoom("Tom","14-2-2024","18-2-2024");
hotel.showEmptyRooms("1-1-2024","23-3-2024")
hotel.cancelBooking("John","12-2-2024","16-2-2024");
hotel.showEmptyRooms("1-1-2024","23-3-2024")
