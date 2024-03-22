class Builder {
    constructor() {
        this.menuItems = [];
        this.deliveryAddress = null;
        this.message = "";
        this.phoneNo = null;
        this.cutlery = false;
    }
    addMenuItem(item) {
        this.menuItems.push(item);
        return this;
    }
    addDeliveryAddress(address) {
        this.deliveryAddress = address;
        return this;
    }
    addMsg(msg) {
        this.msg = msg;
        return this;
    }

    addPhoneNo(mobileNo) {
        this.phoneNo = mobileNo;
        return this;
    }

    addCutlery(isRequired) {
        this.cutlery = isRequired;
        return this;
    }
    build(){
        return new FoodOrder(this)
    }
}

class FoodOrder {
    constructor(builderObj) {
        this.menuItems = builderObj.menuItems;
        this.deliveryAddress = builderObj.deliveryAddress;
        this.phoneNo = builderObj.phoneNo;
        this.msg = builderObj.msg;
        this.cutlery = builderObj.cutlery;
    }

    display() {
        console.log("Menu Items:", this.menuItems);
        console.log("Delivery Address:", this.deliveryAddress);
        console.log("Message:", this.msg);
        console.log("Phone Number:", this.phoneNo);
        console.log("Cutlery:", this.cutlery);
    }
}

// const builderObj=new Builder();
// builderObj.addMenuItem("biriyani");
// builderObj.addMenuItem("paneer");
// builderObj.addDeliveryAddress("chennai");
// builderObj.addPhoneNo("9876543210");
// builderObj.addMsg("Your order will be delivered at your doorstep" );

// const order=builderObj.build();
// console.log(order)

const order = new Builder()
  .addMenuItem("Briyani")
  .addMenuItem("Pizza")
  .addDeliveryAddress("chennai")
  .addCutlery(true)
  .addMsg("be quicker")
    .build();
console.log(order);
