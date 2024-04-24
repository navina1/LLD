class Vehicle{
    constructor(type,registrationNo){
        this.type=type;
        this.registrationNo=registrationNo;
    }
}
class parkingSlot{
    constructor(floor,slotNo,type){
        this.floor=floor;
        this.slotNo=slotNo;
        this.type=type;
        this.vehicle=null;
    }
    parkVehicle(vehicle){
        if(this.vehicle){
            throw new  Error("Parking Slot is already occupied");
        }
        this.vehicle = vehicle;
    }
    removeVehicle(){
        if(!this.vehicle){
            throw new Error("No vehicle to remove from the Parking slot")
        }
        let  temp = this.vehicle;
        this.vehicle = null;
        return temp
    }
}
class parkingFloor{
    constructor(floorNo,totalSlots){
        this.floorNo= floorNo;
        this.totalSlots=totalSlots;
        this.availableSlots=totalSlots;
        this.slots=[]
    }
    addParkingSlots(slot){
        this.slots.push(slot);
    }
    findAvailableSlots(vehicle){
        return this.slots.find(slot=>slot.type==vehicle && !slot.vehicle);
    }
    displayFreeSlots(vehicle){
        const freeSlots=this.slots.filter((slots)=>slots.type==vehicle && !slots.vehicle)
        return freeSlots;
    }
    displayOccupiedSlots(vehicle){
        const occupiedSlots=this.slots.filter((slots)=>slots.type==vehicle && slots.vehicle!=null)
        return occupiedSlots;
    }
}
class parkingLot{
    constructor(parkingLotId){
        this.parkingLotId=parkingLotId;
        this.floors=[];
    }
    addFloor(floor){
        this.floors.push(floor);
    }
    parkVehicle(vehicle,type){
        let availableSlot;
        let floorNo;
        for(const floor of this.floors){
            availableSlot=floor.findAvailableSlots(type);
            floorNo=floor;
            break;
        }
        if(!availableSlot){
            throw new Error("No Parking Space Available");
        }
        availableSlot.parkVehicle(vehicle);
        floorNo.availableSlots--;
        const ticketId=`${this.parkingLotId}_${availableSlot.floor}_${availableSlot.slotNo}`;
        return ticketId
    }
    unParkVehicle(ticketId){
        const [parkingLotId, floorNumber, slotNumber] = ticketId.split('_');
        const floor = this.floors[floorNumber - 1];
        const slot = floor.slots[slotNumber - 1];
        const removedVehicle = slot.removeVehicle();
        floor.availableSlots++;
        return removedVehicle;
    }
    displayFreeSlotsperFloor(vehicleType){
        const freeSlotsPerFloor = this.floors.map(floor => ({
            floorNumber: floor.floorNo,
            freeSlots: floor.displayFreeSlots(vehicleType)
        }));
        return freeSlotsPerFloor;
    }
    displayOccupiedSlotsPerFloor(vehicleType) {
        const occupiedSlotsPerFloor = this.floors.map(floor => ({
            floorNumber: floor.floorNo,
            occupiedSlots: floor.displayOccupiedSlots(vehicleType)
        }));
        return occupiedSlotsPerFloor;
    }
}
const parkinglot=new parkingLot("PR1234");
const floor1=new parkingFloor(1,10);
const floor2=new parkingFloor(2,10);

// Add parking slots to floors
for (let i = 1; i <= 5; i++) {
    const slot = new parkingSlot(1, i, i === 1 ? 'truck' : 'car');
    floor1.addParkingSlots(slot);
}
for (let i = 1; i <= 4; i++) {
    const slotType = i <= 2 ? 'bike' : 'car';
    const slot = new parkingSlot(2, i, slotType);
    floor2.addParkingSlots(slot);
}

//add floor to parking lot
parkinglot.addFloor(floor1);
parkinglot.addFloor(floor2);

const car1=new Vehicle("car",8080);
const car2=new  Vehicle("car",9567);
const bike1=new Vehicle("bike",1212);
const bike2=new  Vehicle("bike",1313);

//Display Free Slots per Floor for Cars
//console.log(parkinglot.displayFreeSlotsperFloor("car")); 
const ticket1 = parkinglot.parkVehicle(car1,"car");
console.log('----------------------------------------------------------');
console.log(`Car parked with Ticket Number ${ticket1}`);
console.log('-----------------------------------------------------------');
//console.log(parkinglot.displayFreeSlotsperFloor("car")); 
const ticket2 = parkinglot.parkVehicle(car2, "car");
console.log('-------------------------------------------------------------');
console.log(`Car parked with Ticket Number ${ticket2}`);
console.log('-------------------------------------------------------------');

const removedVehicle = parkinglot.unParkVehicle(ticket1);
console.log('Removed Vehicle:', removedVehicle);

const freeSlotsPerFloor = parkinglot.displayFreeSlotsperFloor('car');
console.log('Free Slots Per Floor for Car:', freeSlotsPerFloor);

const occupiedSlotsPerFloor = parkinglot.displayOccupiedSlotsPerFloor('car');
console.log('Occupied Slots Per Floor for Car:', occupiedSlotsPerFloor);
