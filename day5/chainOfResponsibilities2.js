//we have to follow chain of responsibility
class PurchaseRequest{
    constructor(amount){
        this.amount=amount;
        this.details="OIL COMPANY DEAL"
    }
}

class Approver{
    constructor(approvalLimit){
        this.approvalLimit=approvalLimit;
        this.boss=null;
        this.availability=true;
    }
    setBoss(boss){
        this.boss=boss;
    }
    processRequest(request){
        if(this.constructor.name==BoardDirector){
            console.log(`${this.constructor.name} approved the purchase request ${request.amount}`);
            return;
        }
        if (!this.availability && this.boss) {
            this.boss.processRequest(request);
            return;
        }
        if(request.amount<=this.approvalLimit){
            console.log(`${this.constructor.name} approved the purchase request ${request.amount}`);
        }else if (this.boss) {
            this.boss.processRequest(request);
        }else{
            console.log(`${this.constructor.name} doesnt have permission to approve ${request.amount}`)
        }
    }
}

class Manager extends  Approver {
    constructor(){
        super(5000)//set Approval limit
    }
}
class Director extends  Approver {
    constructor(){
        super(50000)//set Approval limit
    }
}
class CEO extends  Approver {
    constructor(){
        super(50000)//set Approval limit
    }
}
class BoardDirector extends  Approver {
    constructor(){
        super(Number.MAX_SAFE_INTEGER)//set Approval limit
    }
}

const request = new PurchaseRequest(6000);

// people
const manager = new Manager();
const director = new Director();
const ceo = new CEO();
const owner = new BoardDirector();

//set org structure
manager.setBoss(director);
director.setBoss(ceo);
ceo.setBoss(owner);

director.availability=false;
manager.processRequest(request); //Approved