// 2. We need an Account class to keep things in scope
class Account {
  constructor(username) {
    this.username = username;
    // 7. let's add a feature to keep track of transactions
    this.transactions = [];
  }

  get balance() {
    let totalBalance = 0;
    // sum up value of every transaction
    // first, loop thru array
    this.transactions.forEach((transaction) => {
      // take each object in array, in our case transaction
      totalBalance += transaction.value;
      // running total the VALUE (cuz it can be negative/positive from the withdraw/deposit)
    });
    return totalBalance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction)
  }

}

// 4. DRY up code with a new TRANSACTION class
class Transaction {
  // pass the account that this deposit is for
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  // 6. move the commit() here
  commit() {
    // Edge case 1: Transaction validity -> if totalBalance is 0, no more withdrawal
    if (this.value < 0 && this.account.balance === 0) {
      console.log(`Insufficient funds. Withdrawal request for $${this.amount} denied.`);
      return;
    }

    // 8. Keep track of time of transaction
    this.time = new Date();
    this.account.addTransaction(this); // adds this entire object of transaction, to the array
    // now we just add the value, it's already decided if (+ / -)
    console.log(`Deposit confirmed. Your new balance is $${this.account.balance}`);
  }
}

// 1. Add a deposit class
class Deposit extends Transaction{
  // REMEMBER to RETURN when we getter
  get value() {
    return this.amount;
  }
}

// 3. let's update the original classes to use new account object instead of balance variable
class Withdrawal extends Transaction{
  // 5. define a getter method called value in each subclass,
  get value() {
    // REMEMBER to RETURN when we getter
    return -this.amount; // returns a neg value for withdrawal
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account(`snow-patrol`);
const t3 = new Withdrawal(100.00, myAccount);
t3.commit();

const t1 = new Deposit(120.00, myAccount);
const t2 = new Deposit(80.00, myAccount);
t1.commit();
// console.log(myAccount.balance);

t2.commit();
// console.log(myAccount.balance);

console.log(myAccount .transactions);
