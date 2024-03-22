// Strategy -> behavioural pattern
// It helps to select the alogirithms in runtime using common interface
const {generateId}=require("./utils");
const { LIFO, FIFO, RANDOM}=require("./Strategy")
class SupportTicket{
    constructor(customer,issues){
        this.id=generateId();
        this.customer=customer;
        this.issues=issues;
    }
}

class CustumerSupport{
    constructor(){
        this.tickets=[];
    }
    create(customer,issues){
        const ticket=new SupportTicket(customer,issues);
        this.tickets.push(ticket);
    }
    process(ticket){
        console.log(`processing the ticket ${ticket.id} from ${ticket.customer} about an issue : "${ticket.issues}"`);
    }
    ticketProcessor(strategy) {
        const tickets = strategy.orderTickets(this.tickets);
        tickets.forEach((ticket) => this.process(ticket));
    
        // if (strategy === "FIFO") {
        //   this.tickets.forEach((ticket) => this.process(ticket));
        // } else if (strategy === "LIFO") {
        //   this.tickets.reverse().forEach((ticket) => this.process(ticket));
        // } else if (strategy === "RANDOM") {
        //   const shuffledTickets = this.tickets.sort(() => Math.random() - 0.5);
        //   shuffledTickets.forEach((ticket) => this.process(ticket));
        // }
      }
}

const crm=new  CustumerSupport();
crm.create('Mike', 'My computer is not working');
crm.create('John','My phone is not charging');
crm.create("nikhil", "zomato is the worst app");
//console.log(crm.tickets);
crm.ticketProcessor(FIFO);
console.log("-".repeat(100));
crm.ticketProcessor(LIFO);
console.log("-".repeat(100));
crm.ticketProcessor(RANDOM);