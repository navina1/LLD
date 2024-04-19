class PurchaseRequest{
    constructor(amount){
        this.amount=amount;
        this.details="OIL COMPANY DEAL"
    }

}
class Manager{
    constructor(){
        this.approvalLimit=5000;
    }
    processRequest(request){
        if(request.amount<=this.approvalLimit){
            console.log(`${this.constructor.name} approved the purchase request ${request.amount}`);
        }
        else{
            console.log(`${this.constructor.name} doesnt have permission to approve ${request.amount}`)
        }
    }
}

class Director{
    constructor(){
        this.approvalLimit=50000;
    }
    processRequest(request){
        if(request.amount<=this.approvalLimit){
            console.log(`${this.constructor.name} approved the purchase request ${request.amount}`);
        }
        else{
            console.log(`${this.constructor.name} doesnt have permission to approve ${request.amount}`)
        }
    }
}

class CEO{
    constructor(){
        this.approvalLimit=500000;
    }
    processRequest(request){
        if(request.amount<=this.approvalLimit){
            console.log(`${this.constructor.name} approved the purchase request ${request.amount}`);
        }
        else{
            console.log(`${this.constructor.name} doesnt have permission to approve ${request.amount}`)
        }
    }
}

class BoardDirector{
    processRequest(request){
        if(request.amount<=this.approvalLimit){
            console.log(`${this.constructor.name} approved the purchase request ${request.amount}`);
        }
    }
}

const request=new  PurchaseRequest(500000);

const manager=new Manager();
let director = new Director();
let ceo = new CEO();
let  boardMember = new BoardDirector();

manager.processRequest(request) //Manager approved the purchase request 500 
director.processRequest(request)//CEO doesn't have permission to approve 500
ceo.processRequest(request)   //CEO approved the purchase request 500
boardMember.processRequest(request)//BoardDirector approved the purchase request 500