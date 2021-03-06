"use strict";

/* Cash Register */

/* Returns object with (1) status key and (2) change key. */

/* {status: "INSUFFICIENT FUNDS", change: []} is if cash-in-drawer is less than change due, or you cannot return the exact change. */
/* {status: "CLOSED", change[...]} */
/* {status: "OPEN", change[...]} */

let checkCashRegisterTEST = (price, cash, cid) => {
    // checkCashRegister( 19.5, 20, [ ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
    // ]); // should return an object.
    // checkCashRegister(19.5, 20, [ ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
    // ]); // should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
    // checkCashRegister(3.26, 100, [ ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
    // ]); // should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
    // checkCashRegister(19.5, 20, [ ["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]
    // ]); // should return {status: "INSUFFICIENT_FUNDS", change: []}.
    // checkCashRegister(19.5, 20, [ ["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]
    // ]); // should return {status: "INSUFFICIENT_FUNDS", change: []}.
    checkCashRegister(19.5, 20, [ ["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]
    ]); // should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
};

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
let changeCopy = { status: "", change: [] };
let cidCopy = [];
let customerChange = [];
let runningCustomerChange = [ ["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["HUNDRED", 0] ];
let empty = 0.00, penny = 0.01, nickel = 0.05, dime = 0.10, quarter = 0.25, one = 1.00, five = 5.00, ten = 10.00, twenty = 20.00, hundred = 100.00;
let insufficient = false;

let createCidCopyFrom = (cid) => { cidCopy = JSON.parse(JSON.stringify(cid)); }; // "pure" deep copy of array

// let pennies = cidCopy[0][1];
// let nickels = cidCopy[1][1];
// let dimes = cidCopy[2][1];
// let quarters = cidCopy[3][1];
// let ones = cidCopy[4][1];
// let fives = cidCopy[5][1];
// let tens = cidCopy[6][1];
// let twenties = cidCopy[7][1];
// let hundreds = cidCopy[8][1];


let removePennyFromCidCopy = () => { cidCopy[0][1] -= penny; };
let addPennyToCustomerChange = () => { runningCustomerChange[0][1] += penny; };
let removeNickelFromCidCopy = () => { cidCopy[1][1] -= 0.05; };
let addNickelToCustomerChange = () => { runningCustomerChange[1][1] += 0.05; };
let removeDimeFromCidCopy = () => { cidCopy[2][1] -= 0.10; };
let addDimeToCustomerChange = () => { runningCustomerChange[2][1] += 0.10; };
let removeQuarterFromCidCopy = () => { cidCopy[3][1] -= quarter; };
let addQuarterToCustomerChange = () => { runningCustomerChange[3][1] += quarter; };
let removeOneFromCidCopy = () => { cidCopy[4][1] -= one; };
let addOneToCustomerChange = () => { runningCustomerChange[4][1] += one; };
let removeFiveFromCidCopy = () => { cidCopy[5][1] -= five; };
let addFiveToCustomerChange = () => { runningCustomerChange[5][1] += five; };
let removeTenFromCidCopy = () => { cidCopy[6][1] -= ten; };
let addTenToCustomerChange = () => { runningCustomerChange[6][1] += ten; };
let removeTwentyFromCidCopy = () => { cidCopy[7][1] -= twenty; };
let addTwentyToCustomerChange = () => { runningCustomerChange[7][1] += twenty; };
let removeHundredFromCidCopy = () => { cidCopy[8][1] -= hundred; };
let addHundredToCustomerChange = () => { runningCustomerChange[8][1] += hundred; };

let searchCidCopyFor = (refundAmount) => {
    let currentRefundAmount = refundAmount;
    let maxLoopsInCents = refundAmount * 100;

    // LOOP is NEVER infinite because there's ALWAYS a maximum number of pennies to loop and reduce the money owed.
    console.log('TOTAL Refund To Customer: ' + currentRefundAmount);
    for (let x = maxLoopsInCents; x>=0; x-=1) {
        if ( (currentRefundAmount >= hundred) && (cidCopy[8][1] > 0) ) {
            console.log('CID-Copy: $' + cidCopy[8][1] + ', owe customer : $' + currentRefundAmount);
            removeHundredFromCidCopy(hundred);
            addHundredToCustomerChange(hundred);
            currentRefundAmount = currentRefundAmount - hundred;
            console.log('remove from CID-Copy: $' + hundred + ', balance of CID-Copy: $' + cidCopy[8][1] + ', still owe customer: $' + currentRefundAmount);
        }
        if ( ((currentRefundAmount >= twenty) && (currentRefundAmount < hundred)) && (cidCopy[7][1] > 0) ) {
            console.log('======== REMOVE $20 ========');
            console.log('CID-Copy: $' + cidCopy[7][1] + ', owe customer : $' + currentRefundAmount);
            removeTwentyFromCidCopy(twenty);
            addTwentyToCustomerChange(twenty);
            currentRefundAmount = currentRefundAmount - twenty;
            console.log('current refund amount: ' + currentRefundAmount);
            console.log('remove from CID-Copy: $' + twenty + ', balance of CID-Copy: $' + cidCopy[7][1] + ', still owe customer: $' + currentRefundAmount);
        }
        if ( ((currentRefundAmount >= ten) && (currentRefundAmount < twenty)) && (cidCopy[6][1] > 0) ) {
            console.log('======== REMOVE $10 ========');
            console.log('CID-Copy: $' + cidCopy[6][1] + ', owe customer : $' + currentRefundAmount);
            removeTenFromCidCopy(ten);
            addTenToCustomerChange(ten);
            currentRefundAmount = currentRefundAmount - ten;
            console.log('remove from CID-Copy: $' + ten + ', balance of CID-Copy: $' + cidCopy[6][1] + ', still owe customer: $' + currentRefundAmount);
        }

//START---------------------------------------------------------------------------------------
        // NAME OF FUNCTION GOES HERE!!!
        console.log('!!! -- current refund amount: ' + currentRefundAmount);
        // no twenties and HAVE tens
        if ( (currentRefundAmount >= ten) && ((cidCopy[7][1] <= 0) && (cidCopy[6][1] > 0)) ) {
            console.log('======== REMOVE $10 -- BECAUSE NO $20 ========');
            console.log('CID-Copy - tens: $' + cidCopy[6][1] + ', owe customer : $' + currentRefundAmount);
            removeTenFromCidCopy(ten);
            addTenToCustomerChange(ten);
            currentRefundAmount = currentRefundAmount - ten;
            console.log('remove from CID-Copy: $' + ten + ', balance of CID-Copy - tens: $' + cidCopy[6][1] + ', still owe customer: $' + currentRefundAmount);
        }
//END---------------------------------------------------------------------------------------

        if ( ((currentRefundAmount >= five) && (currentRefundAmount < ten)) && (cidCopy[5][1] > 0) ) {
            console.log('CID-Copy: $' + cidCopy[5][1] + ', owe customer : $' + currentRefundAmount);
            removeFiveFromCidCopy(five);
            addFiveToCustomerChange(five);
            currentRefundAmount = currentRefundAmount - five;
            console.log('remove from CID-Copy: $' + five + ', balance of CID-Copy: $' + cidCopy[5][1] + ', still owe customer: $' + currentRefundAmount);
        }

//START---------------------------------------------------------------------------------------
        // no tens and HAVE fives
        if ( (currentRefundAmount >= five) && ((cidCopy[6][1] <= 0) && (cidCopy[5][1] > 0)) ) {
            console.log('======== REMOVE $5 -- BECAUSE NO $10 ========');
            console.log('CID-Copy - fives: $' + cidCopy[5][1] + ', owe customer : $' + currentRefundAmount);
            removeFiveFromCidCopy(five);
            addFiveToCustomerChange(five);
            currentRefundAmount = currentRefundAmount - five;
            console.log('remove from CID-Copy: $' + five + ', balance of CID-Copy - fives: $' + cidCopy[5][1] + ', still owe customer: $' + currentRefundAmount);
        }
//END---------------------------------------------------------------------------------------

        if ( ((currentRefundAmount >= one) && (currentRefundAmount < five)) && (cidCopy[4][1] > 0) ) {
            console.log('CID-Copy: $' + cidCopy[4][1] + ', owe customer : $' + currentRefundAmount);
            removeOneFromCidCopy(one);
            addOneToCustomerChange(one);
            currentRefundAmount = currentRefundAmount - one;
            console.log('remove from CID-Copy: $' + one + ', balance of CID-Copy: $' + cidCopy[4][1] + ', still owe customer: $' + currentRefundAmount);
        }

//START---------------------------------------------------------------------------------------
        // no fives and HAVE ones
        if ( (currentRefundAmount >= one) && ((cidCopy[5][1] <= 0) && (cidCopy[4][1] > 0)) ) {
            console.log('======== REMOVE $1 -- BECAUSE NO $5 ========');
            console.log('CID-Copy - ones: $' + cidCopy[4][1] + ', owe customer : $' + currentRefundAmount);
            removeOneFromCidCopy(one);
            addOneToCustomerChange(one);
            currentRefundAmount = currentRefundAmount - one;
            console.log('remove from CID-Copy: $' + one + ', balance of CID-Copy - ones: $' + cidCopy[4][1] + ', still owe customer: $' + currentRefundAmount);
        }
//END---------------------------------------------------------------------------------------

        if ( ((currentRefundAmount >= quarter) && (currentRefundAmount < one)) && (cidCopy[3][1] > 0) ) {
            console.log('CID-Copy: $' + cidCopy[3][1] + ', owe customer : $' + currentRefundAmount);
            removeQuarterFromCidCopy(quarter);
            addQuarterToCustomerChange(quarter);
            currentRefundAmount = currentRefundAmount - quarter;
            console.log('remove from CID-Copy: $' + quarter + ', balance of CID-Copy: $' + cidCopy[3][1] + ', still owe customer: $' + currentRefundAmount);
        }

//START---------------------------------------------------------------------------------------
        // no ones and HAVE quarters
        if ( (currentRefundAmount >= quarter) && ((cidCopy[4][1] <= 0) && (cidCopy[3][1] > 0)) ) {
            console.log('======== REMOVE $0.25 -- BECAUSE NO $1 ========');
            console.log('CID-Copy: $' + cidCopy[3][1] + ', owe customer : $' + currentRefundAmount);
            removeQuarterFromCidCopy(quarter);
            addQuarterToCustomerChange(quarter);
            currentRefundAmount = currentRefundAmount - quarter;
            console.log('remove from CID-Copy: $' + quarter + ', balance of CID-Copy: $' + cidCopy[3][1] + ', still owe customer: $' + currentRefundAmount);
        }
//END---------------------------------------------------------------------------------------

        if ( ((currentRefundAmount >= dime) && (currentRefundAmount < quarter)) && (cidCopy[2][1] > 0) ) {
            console.log('CID-Copy: $' + cidCopy[2][1] + ', owe customer : $' + currentRefundAmount);
            removeDimeFromCidCopy(dime);
            addDimeToCustomerChange(dime);
            currentRefundAmount = currentRefundAmount - dime;
            console.log('remove from CID-Copy: $' + dime + ', balance of CID-Copy: $' + cidCopy[2][1] + ', still owe customer: $' + currentRefundAmount);
        }

//START---------------------------------------------------------------------------------------
        // no quarters and HAVE dimes
        if ( (currentRefundAmount >= dime) && ((cidCopy[3][1] <= 0) && (cidCopy[2][1] > 0)) ) {
            console.log('======== REMOVE $0.10 -- BECAUSE NO $0.25 ========');
            console.log('CID-Copy: $' + cidCopy[2][1] + ', owe customer : $' + currentRefundAmount);
            removeDimeFromCidCopy(dime);
            addDimeToCustomerChange(dime);
            currentRefundAmount = currentRefundAmount - dime;
            console.log('remove from CID-Copy: $' + dime + ', balance of CID-Copy: $' + cidCopy[2][1] + ', still owe customer: $' + currentRefundAmount);
        }
//END---------------------------------------------------------------------------------------

        if ( ((currentRefundAmount >= nickel) && (currentRefundAmount < dime )) && (cidCopy[1][1] > 0) ) {
            console.log('CID-Copy: $' + cidCopy[1][1] + ', owe customer : $' + currentRefundAmount);
            removeNickelFromCidCopy(nickel);
            addNickelToCustomerChange(nickel);
            currentRefundAmount = currentRefundAmount - nickel;
            console.log('remove from CID-Copy: $' + nickel + ', balance of CID-Copy: $' + cidCopy[1][1] + ', still owe customer: $' + currentRefundAmount);
        }

//START---------------------------------------------------------------------------------------
        // no dimes and HAVE nickels
        if ( (currentRefundAmount >= nickel) && ((cidCopy[2][1] <= 0) && (cidCopy[1][1] > 0)) ) {
            console.log('======== REMOVE $0.05 -- BECAUSE NO $0.10 ========');
            console.log('CID-Copy: $' + cidCopy[1][1] + ', owe customer : $' + currentRefundAmount);
            removeNickelFromCidCopy(nickel);
            addNickelToCustomerChange(nickel);
            currentRefundAmount = currentRefundAmount - nickel;
            console.log('remove from CID-Copy: $' + nickel + ', balance of CID-Copy: $' + cidCopy[1][1] + ', still owe customer: $' + currentRefundAmount);
        }
//END---------------------------------------------------------------------------------------

        if ( ((currentRefundAmount >= penny) && (currentRefundAmount < nickel )) && (cidCopy[0][1] > 0) ) {
            console.log('CID-Copy: $' + cidCopy[0][1] + ', owe customer : $' + currentRefundAmount);
            removePennyFromCidCopy(penny);
            addPennyToCustomerChange(penny);
            currentRefundAmount = currentRefundAmount - penny;
            console.log('remove from CID-Copy: $' + penny + ', balance of CID-Copy: $' + cidCopy[0][1] + ', still owe customer: $' + currentRefundAmount);
        }

//START---------------------------------------------------------------------------------------
        // no nickels and HAVE pennies
        if ( (currentRefundAmount >= penny) && ((cidCopy[1][1] <= 0) && (cidCopy[0][1] > 0)) ) {
            console.log('======== REMOVE $0.01 -- BECAUSE NO $0.05 ========');
            console.log('CID-Copy: $' + cidCopy[0][1] + ', owe customer : $' + currentRefundAmount);
            removePennyFromCidCopy(penny);
            addPennyToCustomerChange(penny);
            currentRefundAmount = currentRefundAmount - penny;
            console.log('remove from CID-Copy: $' + penny + ', balance of CID-Copy: $' + cidCopy[0][1] + ', still owe customer: $' + currentRefundAmount);
        }
//END---------------------------------------------------------------------------------------

// if ( (currentRefundAmount <= 0.01) && (lastPenny == false) ) {
//     console.log('current refund amount' + currentRefundAmount);
//     console.log('cidCopy[0][1]: ' + cidCopy[0][1]);
//     console.log('lastPenny: ' + lastPenny);
// }

//START---------------------------------------------------------------------------------------
        // REMOVE LAST PENNY --- OR MAKE CORRECTIONS --- because of fractional math
        if ( ((currentRefundAmount >= 0.009999) && (currentRefundAmount < 0.01)) && (cidCopy[0][1] > 0) ) {
            console.log('======== REMOVE LAST PENNY ========');
            console.log('CID-Copy: $' + cidCopy[0][1] + ', owe customer : $' + currentRefundAmount);
            removePennyFromCidCopy(penny);
            addPennyToCustomerChange(penny);
            currentRefundAmount = 0;
            console.log('remove from CID-Copy: $' + penny + ', balance of CID-Copy: $' + cidCopy[0][1] + ', still owe customer: $' + currentRefundAmount);
            console.log('---- LAST PENNY -----');
            if(cidCopy[0][1] !== 0) {
                cidCopy[0][1] === 0;
            }
            console.log(cidCopy[0][1]);
            break;
        }
//END---------------------------------------------------------------------------------------
// ============ NOTE: beware of values where you owe more than 1-penny and there's nothing left in the drawer.

        if ( (currentRefundAmount > 0) && ((cidCopy[0][1] <= 0) && (cidCopy[1][1] <= 0) && (cidCopy[2][1] <=0)) ) {
            console.log("INSUFFICIENT FUNDS!!!");
            console.log('----------------------- really inside IF -------------');
            changeCopy.status = "INSUFFICIENT FUNDS";
            insufficient = true;
            customerChange.length = 0;
            changeCopy.change.length = 0;
            console.log(changeCopy);
            break;
        }


        if (currentRefundAmount <= empty) {
            console.log("REFUND complete!!!");
            break;
        }

    }
};

let addToCustomerChange = (runningCustomerChange) => {
    if (runningCustomerChange[8][1] != 0) { customerChange.push(runningCustomerChange[8]); changeCopy.status = "OPEN"; }
    if (runningCustomerChange[7][1] != 0) { customerChange.push(runningCustomerChange[7]); changeCopy.status = "OPEN"; }
    if (runningCustomerChange[6][1] != 0) { customerChange.push(runningCustomerChange[6]); changeCopy.status = "OPEN"; }
    if (runningCustomerChange[5][1] != 0) { customerChange.push(runningCustomerChange[5]); changeCopy.status = "OPEN"; }
    if (runningCustomerChange[4][1] != 0) { customerChange.push(runningCustomerChange[4]); changeCopy.status = "OPEN"; }
    if (runningCustomerChange[3][1] != 0) { customerChange.push(runningCustomerChange[3]); changeCopy.status = "OPEN"; }
    if (runningCustomerChange[2][1] != 0) { customerChange.push(runningCustomerChange[2]); changeCopy.status = "OPEN"; }
    if (runningCustomerChange[1][1] != 0) { customerChange.push(runningCustomerChange[1]); changeCopy.status = "OPEN"; }
    if (runningCustomerChange[0][1] != 0) { customerChange.push(runningCustomerChange[0]); changeCopy.status = "OPEN"; }
};

let clearAll = () => {
    cidCopy = [];
    customerChange = [];
    runningCustomerChange = [ ["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["HUNDRED", 0] ];
    insufficient = false;
};

function checkCashRegister(price, cash, cid) {
    var change = {
        status: "closed",
        change: []
    };
    let refundAmount = cash - price;

    console.log('-=-=-=-=-=-=-=-=-=-=-=-=    N E W   S E A R C H    =-=-=-=-=-=-=-=-=-=-=-=-');
    console.log('CUSTOMER CASH: ' + cash);
    console.log('PRICE OF ITEM(s): ' + price);
    console.log('REFUND TOTAL: ' + refundAmount);
    console.log('------------------------------');
    console.log('CID COPY');
    createCidCopyFrom(cid);
    console.log(cidCopy);
    console.log('------------------------------');
    console.log('REFUND AMOUNT');
    searchCidCopyFor(refundAmount);
    console.log('------------------------------');
    console.log('add (running customer change) to customer change');
    addToCustomerChange(runningCustomerChange);
    console.log('customer change');
    console.log(customerChange);
    change.status = changeCopy.status;
    changeCopy.change = customerChange;
    if (insufficient == true) {
        change.status = "INSUFFICIENT FUNDS!!!";
        change.change.length = 0;
    }
    console.log('------------------------------');
    console.log('changeCopy');
    console.log(changeCopy);
    change.change = changeCopy.change;
    console.log('------------------------------');
    if (insufficient == true) {
        change.status = "INSUFFICIENT FUNDS!!!";
        change.change.length = 0;
    }
    console.log(cidCopy);

    if ( (cidCopy[8][1] <=0) &&
        (cidCopy[7][1] <=0) &&
        (cidCopy[6][1] <=0) &&
        (cidCopy[5][1] <=0) &&
        (cidCopy[4][1] <=0) &&
        (cidCopy[3][1] <=0) &&
        (cidCopy[2][1] <=0) &&
        (cidCopy[1][1] <=0) &&
        (cidCopy[0][1] <=0) ) {
        change.status = "CLOSED";
    }
    console.log('change:');
    console.log(change);
    console.log('------------------------------');
    console.log('clear all');
    clearAll();
    return change;
};

// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
// END: submission to FreeCodeCamp

// NOTE: place all helper (anonymous arrow functions inside 'main' function)

checkCashRegisterTEST();
