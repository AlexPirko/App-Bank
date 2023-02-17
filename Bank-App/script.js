'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayTransactions = function (transactions) {
  containerTransactions.innerHTML = '';

  transactions.forEach((transaction, index) => {
    let transMode;
    if (transaction > 0) {
      transMode = 'deposit'
    } else {
      transMode = 'withdrawal'
    }

    const transactionRow = `
      <div class="transactions__row">
        <div class="transactions__type transactions__type--${transMode}">
          ${index + 1} ${transMode}
        </div>
        <div class="transactions__date">2 дня назад</div>
        <div class="transactions__value">${transaction}$</div>
      </div>
    `
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow)
  });
}


const createNickname = function (accs) {
  accs.forEach(acc => {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  })
}
createNickname(accounts)


const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans);
  account.balance = balance;
  labelBalance.textContent = `${balance}$`;
}


const displayTotal = function (account) {
  const depositTrans = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);

  labelSumIn.textContent = `${depositTrans}$`;

  const withdrawalTrans = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);

  labelSumOut.textContent = `${withdrawalTrans}$`;

  const displayInterest = account.transactions
    .filter(trans => trans > 0)
    .map(trans => trans * account.interest / 100)
    .reduce((acc, trans) => acc + trans, 0)
    .toFixed(2)

  labelSumInterest.textContent = `${displayInterest}$`
}

const updateUi = function (acc) {
  displayBalance(acc);
  displayTransactions(acc.transactions);
  displayTotal(acc);
}

let currAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currAccount = accounts.find(account => account.nickname === inputLoginUsername.value);

  if (currAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = '1';

    labelWelcome.textContent = `Добро пожаловать, ${currAccount.userName.split(' ')[0]}!`;

    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUi(currAccount);
  };
});


btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmount = Number(inputTransferAmount.value);
  const userNickname = inputTransferTo.value;
  const userAccount = accounts.find(account => account.nickname === userNickname);
  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  if (transferAmount > 0 &&
    currAccount.balance >= transferAmount &&
    userAccount &&
    currAccount.nickname !== userAccount?.nickname) {
    currAccount.transactions.push(-transferAmount);
    userAccount.transactions.push(transferAmount);
    updateUi(currAccount);
  }
})
console.log(accounts)

