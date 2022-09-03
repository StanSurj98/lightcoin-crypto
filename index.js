// 2. We need an Account class to keep things in scope
class Account {
  constructor(username) {
    this.username = username;
    // let's start account at $0
    this.balance = 0;
    // 7. let's add a feature to keep track of transactions
    this.transactionHistory = [];
  }

}

// 4. DRY up code with a new TRANSACTION class
class Transaction {
  // pass the account that this deposit is for
  constructor(id, amount, account) {
    this.amount = amount;
    this.account = account;
    this.id = id;
  }

  // 6. move the commit() here
  commit() {
    // now we just add the value, it's already decided if (+ / -)
    this.account.balance += this.value;
    this.account.transactionHistory.push(this.id);
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
console.log(`Starting balance: ${myAccount.balance}`);

const t1 = new Deposit(120.00, myAccount);
t1.commit();
const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log(`Ending balance: ${myAccount.balance}`);
