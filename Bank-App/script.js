'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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


const displayTransactions = function (account, sort = false) {
  containerTransactions.innerHTML = '';

  const sortedTrans = sort ? account.transactions.slice().sort((a, b) => a - b) : account.transactions;

  sortedTrans.forEach((transaction, index) => {
    let transMode;
    if (transaction > 0) {
      transMode = 'deposit'
    } else {
      transMode = 'withdrawal'
    }

    const date = new Date(account.transactionsDates[index]);
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear();

    const transDate = `${day}/${month}/${year}`;

    const transactionRow = `
      <div class="transactions__row">
        <div class="transactions__type transactions__type--${transMode}">
          ${index + 1} ${transMode}
        </div>
        <div class="transactions__date">${transDate}</div>
        <div class="transactions__value">${transaction.toFixed(2)}$</div>
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
  displayTransactions(acc);
  displayTotal(acc);
}

let currAccount;
// currAccount = account1;
// updateUi(currAccount);
// containerApp.style.opacity = 1;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currAccount = accounts.find(account => account.nickname === inputLoginUsername.value);

  if (currAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = '1';

    labelWelcome.textContent = `Добро пожаловать, ${currAccount.userName.split(' ')[0]}!`;

    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, '0');
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const year = now.getFullYear();
    labelDate.textContent = `${day}/${month}/${year}`;

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

    currAccount.transactionsDates.push(new Date().toISOString());
    userAccount.transactionsDates.push(new Date().toISOString());

    updateUi(currAccount);
  }
})
console.log(accounts)

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);

  if (loanAmount > 0 && currAccount.transactions.some(trans => trans > loanAmount * 0.1)) {
    currAccount.transactions.push(loanAmount);
    currAccount.transactionsDates.push(new Date().toISOString());
    updateUi(currAccount);
  }
  inputLoanAmount.value = '';
})

let isSorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayTransactions(currAccount, !isSorted);
  isSorted = !isSorted;
})

