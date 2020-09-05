"use strict";

/* Cash Register */

/* Returns object with (1) status key and (2) change key. */

/* {status: "INSUFFICIENT FUNDS", change: []} is if cash-in-drawer is less than change due, or you cannot return the exact change. */
/* {status: "CLOSED", change[...]} */
/* {status: "OPEN", change[...]} */

let checkCashRegisterTEST = (price, cash, cid) => {
    checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]); // should return an object.
    checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]); // should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
    checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]); // should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
    checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]); // should return {status: "INSUFFICIENT_FUNDS", change: []}.
    checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]); // should return {status: "INSUFFICIENT_FUNDS", change: []}.
    checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]); // should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
}


// NOTE: enumerate (count) number of pennies, nickels, dimes, quarters .... so you know how much change to give back!!!
// price === purchasePrice; cash === cashPayment; cid === cashInDrawer



// START: submission to FreeCodeCamp
let cidCopy = [];
let customerChange = [];
let cidAnswer = [];

let createCidCopy = (cid) => {
    cidCopy = JSON.parse(JSON.stringify(cid)); // "pure" deep copy of array
};

let clearZerosFrom = (customerChangeAvailable) => {
    console.log('customer change array');
    console.log('==================');
    console.log(customerChangeAvailable); // NEED!!! to remove array with '0' change (coins/dollars)
};

let countPennies = (cid) => { return (cid[0][1] * 100); };
let countNickels = (cid) => { return (parseInt((cid[1][1] * 100 / 5).toFixed(0))); };
let countDimes = (cid) => { return (cid[2][1] * 10); };
let countQuarters = (cid) => { return (cid[3][1]*100/25); };
let countOnes = (cid) => { return (cid[4][1]); };
let countFives = (cid) => { return (cid[5][1] / 5); };
let countTens = (cid) => { return (cid[6][1] / 10); };
let countTwenties = (cid) => { return (cid[7][1] / 20); };
let countHundreds = (cid) => { return (cid[8][1] / 100); };

let addCountsTo = (cidCopy) => {
    cidCopy[0].push(countPennies(cidCopy));
    cidCopy[1].push(countNickels(cidCopy));
    cidCopy[2].push(countDimes(cidCopy));
    cidCopy[3].push(countQuarters(cidCopy));
    cidCopy[4].push(countOnes(cidCopy));
    cidCopy[5].push(countFives(cidCopy));
    let tens = countTens(cidCopy);
    cidCopy[6].push(tens);
    let twenties = countTwenties(cidCopy);
    cidCopy[7].push(twenties);
    let hundreds = countHundreds(cidCopy);
    cidCopy[8].push(hundreds);
};

let calculateCustomerChange = (price, cash) => {
    let change = cash - price;
    return change;
};

let findFromCID = (customerChange) => {
    let customerChangeNeeded = [
        ["pennies", 0],
        ["nickels", 0],
        ["dimes", 0],
        ["quarters", 0],
        ["ones", 0],
        ["fives", 0],
        ["tens", 0],
        ["twenties", 0],
        ["hundreds", 0]
    ];
    let fundsAvailable = true;
    console.log('owe: ' + customerChange);
    if ( (customerChange >= 0.25) && (customerChange < 1.00) ) {
        console.log('remainder: ' + (customerChange / 25));
        customerChangeNeeded[3][1] = parseInt((customerChange / 25) * 100);
    }
    console.log('customer change needed:');
    console.log(customerChangeNeeded);
    if ( (customerChangeNeeded <= cidCopy[3][2]) ) { fundsAvailable = false; }
    if (fundsAvailable === true) { console.log('true - change is available'); return customerChangeNeeded;
    } else { return false; }
};

let removeFromCID = (customerChange) => {
    let changeToCustomer = [];
    let returnToCustomer = customerChange;
    changeToCustomer = findFromCID(customerChange);
    console.log('remove from CID: ' + returnToCustomer);
    return changeToCustomer;
};

function checkCashRegister(price, cash, cid) {
    var change = {
        status: "closed",
        change: {}
    };
    let customerChange = 0;
    console.log('===============');
    console.log(cid);
    console.log('---------------');
    createCidCopy(cid);
    addCountsTo(cidCopy);
    console.log(cidCopy);
    customerChange = calculateCustomerChange(price, cash);
    console.log('===============');
    console.log('customer change: ' + customerChange);
    let customerChangeAvailable = false;
    customerChangeAvailable = removeFromCID(customerChange);
    if ( customerChangeAvailable === false ) {
        change.status = "INSUFFICIENT FUNDS";
    } else if (Array.isArray(customerChangeAvailable) === true) {
        console.log('--------- give change -----------');
        console.log(customerChangeAvailable);
        cidCopy[8][2] = cidCopy[8][2] - customerChangeAvailable[8][1]; // remove hundreds
        cidCopy[7][2] = cidCopy[7][2] - customerChangeAvailable[7][1]; // remove twenties
        cidCopy[6][2] = cidCopy[6][2] - customerChangeAvailable[6][1]; // remove tens
        cidCopy[5][2] = cidCopy[5][2] - customerChangeAvailable[5][1]; // remove fives
        cidCopy[4][2] = cidCopy[4][2] - customerChangeAvailable[4][1]; // remove ones
        cidCopy[3][2] = cidCopy[3][2] - customerChangeAvailable[3][1]; // remove quarters
        cidCopy[2][2] = cidCopy[2][2] - customerChangeAvailable[2][1]; // remove dimes
        cidCopy[1][2] = cidCopy[1][2] - customerChangeAvailable[1][1]; // remove nickels
        cidCopy[0][2] = cidCopy[0][2] - customerChangeAvailable[0][1]; // remove pennies
        console.log('check if got removed !!!');
        cidCopy[8][1] = cidCopy[8][2] * 100;
        cidCopy[7][1] = cidCopy[7][2] * 20;
        cidCopy[6][1] = cidCopy[6][2] * 10;
        cidCopy[5][1] = cidCopy[5][2] * 5;
        cidCopy[4][1] = cidCopy[4][2] * 1;
        cidCopy[3][1] = (cidCopy[3][2] * 0.25).toFixed(2);
        cidCopy[2][1] = (cidCopy[2][2] * 0.10).toFixed(2);
        cidCopy[1][1] = (cidCopy[1][2] * 0.05).toFixed(2);
        cidCopy[0][1] = (cidCopy[0][2] * 0.01).toFixed(2);
        console.log(cidCopy);
        change.status = "OPEN";
        cidCopy[8].pop();
        cidCopy[7].pop();
        cidCopy[6].pop();
        cidCopy[5].pop();
        cidCopy[4].pop();
        cidCopy[3].pop();
        cidCopy[2].pop();
        cidCopy[1].pop();
        cidCopy[0].pop();
        console.log(cidCopy);
        //change.change = cidCopy;
        // FIX FOR LATER ERROR: if using '!=='
        if (cidCopy[8][1] != cid[8][1]) { cidAnswer.push(cidCopy[8]); }
        if (cidCopy[7][1] != cid[7][1]) { cidAnswer.push(cidCopy[7]); }
        if (cidCopy[6][1] != cid[6][1]) { cidAnswer.push(cidCopy[6]); }
        if (cidCopy[5][1] != cid[5][1]) { cidAnswer.push(cidCopy[5]); }
        if (cidCopy[4][1] != cid[4][1]) { cidAnswer.push(cidCopy[4]); }
        if (cidCopy[3][1] != cid[3][1]) { cidAnswer.push(cidCopy[3]); }
        if (cidCopy[2][1] != cid[2][1]) { cidAnswer.push(cidCopy[2]); }
        if (cidCopy[1][1] != cid[1][1]) { cidAnswer.push(cidCopy[1]); }
        if (cidCopy[0][1] != cid[0][1]) { cidAnswer.push(cidCopy[0]); }
        change.change = cidAnswer;
        console.log(change);
        console.log(customerChangeAvailable); // NEED!!! to remove array with '0' change (coins/dollars)
        clearZerosFrom(customerChangeAvailable);
    } else {
        console.log('COMPLETE ERROR!!!')
    }
    return change;
};

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
// END: submission to FreeCodeCamp

