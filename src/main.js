"use strict";

/* Cash Register */

/* Returns object with (1) status key and (2) change key. */

/* {status: "INSUFFICIENT FUNDS", change: []} is if cash-in-drawer is less than change due, or you cannot return the exact change. */
/* {status: "CLOSED", change[...]} */
/* {status: "OPEN", change[...]} */

let checkCashRegisterTEST = (price, cash, cid) => {
    checkCashRegister( 19.5, 20, [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.1],
        ["QUARTER", 4.25],
        ["ONE", 90],
        ["FIVE", 55],
        ["TEN", 20],
        ["TWENTY", 60],
        ["ONE HUNDRED", 100]
    ]); // should return an object.
    checkCashRegister(19.5, 20, [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.1],
        ["QUARTER", 4.25],
        ["ONE", 90],
        ["FIVE", 55],
        ["TEN", 20],
        ["TWENTY", 60],
        ["ONE HUNDRED", 100]
    ]); // should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
    console.log('------------------- CURRENT --------------------');
    checkCashRegister(3.26, 100, [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.1],
        ["QUARTER", 4.25],
        ["ONE", 90],
        ["FIVE", 55],
        ["TEN", 20],
        ["TWENTY", 60],
        ["ONE HUNDRED", 100]
    ]); // should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
    // checkCashRegister(19.5, 20, [
    //     ["PENNY", 0.01],
    //     ["NICKEL", 0],
    //     ["DIME", 0],
    //     ["QUARTER", 0],
    //     ["ONE", 0],
    //     ["FIVE", 0],
    //     ["TEN", 0],
    //     ["TWENTY", 0],
    //     ["ONE HUNDRED", 0]
    // ]); // should return {status: "INSUFFICIENT_FUNDS", change: []}.
    // checkCashRegister(19.5, 20, [
    //     ["PENNY", 0.01],
    //     ["NICKEL", 0],
    //     ["DIME", 0],
    //     ["QUARTER", 0],
    //     ["ONE", 1],
    //     ["FIVE", 0],
    //     ["TEN", 0],
    //     ["TWENTY", 0],
    //     ["ONE HUNDRED", 0]
    // ]); // should return {status: "INSUFFICIENT_FUNDS", change: []}.
    // checkCashRegister(19.5, 20, [
    //     ["PENNY", 0.5],
    //     ["NICKEL", 0],
    //     ["DIME", 0],
    //     ["QUARTER", 0],
    //     ["ONE", 0],
    //     ["FIVE", 0],
    //     ["TEN", 0],
    //     ["TWENTY", 0],
    //     ["ONE HUNDRED", 0]
    // ]); // should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
}


// NOTE: enumerate (count) number of pennies, nickels, dimes, quarters .... so you know how much change to give back!!!
// price === purchasePrice; cash === cashPayment; cid === cashInDrawer

// -= USE BELOW ONLY=- : if you need coin counts
// let countPennies = (cid) => { return (cid[0][1] * 100); };
// let countNickels = (cid) => { return (parseInt((cid[1][1] * 100 / 5).toFixed(0))); };
// let countDimes = (cid) => { return (cid[2][1] * 10); };
// let countQuarters = (cid) => { return (cid[3][1]*100/25); };
// let countOnes = (cid) => { return (cid[4][1]); };
// let countFives = (cid) => { return (cid[5][1] / 5); };
// let countTens = (cid) => { return (cid[6][1] / 10); };
// let countTwenties = (cid) => { return (cid[7][1] / 20); };
// let countHundreds = (cid) => { return (cid[8][1] / 100); };
//
// let countCoinsOf = (cidCopy) => {
//     cidCopy[0].push(countPennies(cidCopy));
//     cidCopy[1].push(countNickels(cidCopy));
//     cidCopy[2].push(countDimes(cidCopy));
//     cidCopy[3].push(countQuarters(cidCopy));
//     cidCopy[4].push(countOnes(cidCopy));
//     cidCopy[5].push(countFives(cidCopy));
//     cidCopy[6].push(countTens(cidCopy));
//     cidCopy[7].push(countTwenties(cidCopy));
//     cidCopy[8].push(countHundreds(cidCopy));
// };
//
// -=USE ABOVE ONLY=- : if you need coin counts

// START: submission to FreeCodeCamp
let cidCopy = [];
let customerChange = [];
let runningCustomerChange = [
    ["PENNY", 0],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["HUNDRED", 0]
];

let createCidCopyFrom = (cid) => { cidCopy = JSON.parse(JSON.stringify(cid)); }; // "pure" deep copy of array

let removePennyFromCidCopy = () => { cidCopy[0][1] -= 0.01; };
let addPennyToCustomerChange = () => { runningCustomerChange[0][1] += 0.01; };

let removeNickelFromCidCopy = () => { cidCopy[1][1] -= 0.05; };
let addNickelToCustomerChange = () => { runningCustomerChange[1][1] += 0.05; };

let removeDimeFromCidCopy = () => { cidCopy[2][1] -= 0.10; };
let addDimeToCustomerChange = () => { runningCustomerChange[2][1] += 0.10; };

let removeQuarterFromCidCopy = () => { cidCopy[3][1] -= 0.25; };
let addQuarterToCustomerChange = () => { runningCustomerChange[3][1] += 0.25; };

let removeOneFromCidCopy = () => { cidCopy[4][1] -= 1; };
let addOneToCustomerChange = () => { runningCustomerChange[4][1] += 1; };

let removeFiveFromCidCopy = () => { cidCopy[5][1] -= 5; };
let addFiveToCustomerChange = () => { runningCustomerChange[5][1] += 5; };

let removeTenFromCidCopy = () => { cidCopy[6][1] -= 10; };
let addTenToCustomerChange = () => { runningCustomerChange[6][1] += 10; };

let removeTwentyFromCidCopy = () => { cidCopy[7][1] -= 20; };
let addTwentyToCustomerChange = () => { runningCustomerChange[7][1] += 20; };

let removeHundredFromCidCopy = () => { cidCopy[8][1] -= 100; };
let addHundredToCustomerChange = () => { runningCustomerChange[8][1] += 100; };

let searchCidCopyFor = (refundAmount) => {
    let penny = 0.01,
        nickel = 0.05,
        dime = 0.10,
        quarter = 0.25,
        one = 1,
        five = 5,
        ten = 10,
        twenty = 20,
        hundred = 100;
    let currentRefundAmount = refundAmount;

    while (currentRefundAmount > 0) {
        if ( (currentRefundAmount >= hundred) ) {
            removeHundredFromCidCopy();
            addHundredToCustomerChange();
            currentRefundAmount = currentRefundAmount - 100;
        }
        if ( (currentRefundAmount >= twenty) && (currentRefundAmount < hundred) ) {
            removeTwentyFromCidCopy();
            addTwentyToCustomerChange();
            currentRefundAmount = currentRefundAmount - 25;
        }
        if ( (currentRefundAmount >= ten) && (currentRefundAmount < twenty) ) {
            removeTenFromCidCopy();
            addTenToCustomerChange();
            currentRefundAmount = currentRefundAmount - 10;
        }
        if ( (currentRefundAmount >= five) && (currentRefundAmount < ten) ) {
            removeFiveFromCidCopy();
            addFiveToCustomerChange();
            currentRefundAmount = currentRefundAmount - 5;
        }
        if ( (currentRefundAmount >= one) && (currentRefundAmount < five) ) {
            removeOneFromCidCopy();
            addOneToCustomerChange();
            currentRefundAmount = currentRefundAmount - 1;
        }
        if ( (currentRefundAmount >= quarter) && (currentRefundAmount < one) ) {
            removeQuarterFromCidCopy();
            addQuarterToCustomerChange();
            currentRefundAmount = currentRefundAmount - 0.25;
        }
        if ( (currentRefundAmount >= dime) && (currentRefundAmount < quarter) ) {
            removeDimeFromCidCopy();
            addDimeToCustomerChange();
            currentRefundAmount = currentRefundAmount - 0.10;
        }
        if ( (currentRefundAmount >= nickel) && (currentRefundAmount < dime ) ) {
            removeNickelFromCidCopy();
            addNickelToCustomerChange();
            currentRefundAmount = currentRefundAmount - 0.05;
        }
        if ( (currentRefundAmount >= penny) && (currentRefundAmount < nickel ) ) {
            removePennyFromCidCopy();
            addPennyToCustomerChange();
            currentRefundAmount = currentRefundAmount - 0.01;
        }
    }
};

let addToCustomerChange = (runningCustomerChange) => {
    let status = "closed";
    if (runningCustomerChange[8][1] != 0) { customerChange.push(runningCustomerChange[8]); status = "open"; }
    if (runningCustomerChange[7][1] != 0) { customerChange.push(runningCustomerChange[7]); status = "open"; }
    if (runningCustomerChange[6][1] != 0) { customerChange.push(runningCustomerChange[6]); status = "open"; }
    if (runningCustomerChange[5][1] != 0) { customerChange.push(runningCustomerChange[5]); status = "open"; }
    if (runningCustomerChange[4][1] != 0) { customerChange.push(runningCustomerChange[4]); status = "open"; }
    if (runningCustomerChange[3][1] != 0) { console.log(runningCustomerChange[3]); customerChange.push(runningCustomerChange[3]); status = "open"; }
    if (runningCustomerChange[2][1] != 0) { customerChange.push(runningCustomerChange[2]); status = "open"; }
    if (runningCustomerChange[1][1] != 0) { customerChange.push(runningCustomerChange[1]); status = "open"; }
    if (runningCustomerChange[0][1] != 0) { customerChange.push(runningCustomerChange[0]); status = "open"; }
    return status;
};

let clearAll = () => {
    cidCopy = [];
    customerChange = [];
    runningCustomerChange = [
        ["PENNY", 0],
        ["NICKEL", 0],
        ["DIME", 0],
        ["QUARTER", 0],
        ["ONE", 0],
        ["FIVE", 0],
        ["TEN", 0],
        ["TWENTY", 0],
        ["HUNDRED", 0]
    ];
};

function checkCashRegister(price, cash, cid) {
    var change = {
        status: "closed",
        change: []
    };
    let refundAmount = cash - price;

    createCidCopyFrom(cid);
    searchCidCopyFor(refundAmount);
    change.status = addToCustomerChange(runningCustomerChange);
    change.change = customerChange;
    console.log(change);
    clearAll();
    return change;
};

// NOTE: place all helper (anonymous arrow functions inside 'main' function)

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
// END: submission to FreeCodeCamp

checkCashRegisterTEST();
