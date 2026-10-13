
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
    console.log("=== E-Commerce Order Discount & Delivery System ===");

    const customerId = (await ask("Enter Customer ID: ")).trim();
    const orderAmount = Number(await ask("Enter Order Amount (Rs.): "));
    const customerCategory = (await ask(
        "Enter Customer Category (Premium/Regular): "
    )).trim().toLowerCase();
    const deliveryLocation = (await ask(
        "Enter Delivery Location (Local/Regional/Remote): "
    )).trim().toLowerCase();

    if (
        !customerId ||
        !Number.isFinite(orderAmount) ||
        orderAmount <= 0 ||
        !["premium", "regular"].includes(customerCategory) ||
        !["local", "regional", "remote"].includes(deliveryLocation)
    ) {
        console.log("Invalid input. Please enter valid details.");
        rl.close();
        return;
    }

    let discount = customerCategory === "premium"
        ? orderAmount * 0.15
        : orderAmount * 0.05;

    if (orderAmount > 5000) {
        discount += 500;
    }

    discount = Math.min(discount, orderAmount * 0.20);

    let deliveryCharge = 0;

    if (orderAmount < 3000) {
        if (deliveryLocation === "local") {
            deliveryCharge = 50;
        } else if (deliveryLocation === "regional") {
            deliveryCharge = 100;
        } else {
            deliveryCharge = 150;
        }
    }

    const finalAmount = orderAmount - discount + deliveryCharge;

    console.log("\n=== Final Order Summary ===");
    console.log("Customer ID:", customerId);
    console.log("Customer Category:", customerCategory);
    console.log("Original Order Amount: Rs.", orderAmount.toFixed(2));
    console.log("Discount Amount: Rs.", discount.toFixed(2));
    console.log("Delivery Charge: Rs.", deliveryCharge.toFixed(2));
    console.log("Final Payable Amount: Rs.", finalAmount.toFixed(2));
    console.log("Order Summary: Order processed successfully.");

    rl.close();
}

main();