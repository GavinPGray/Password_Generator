const resultEl = document.getElementById('result');
const copyEl = document.getElementById('copy');
const generateEl = document.getElementById('generate');
const amountEl = document.getElementById('amount');
const lowerEl = document.getElementById('lowercase');
const upperEl = document.getElementById('uppercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');


const randomFunction = {
  lower: getRandomLowercase,
  upper: getRandomUppercase,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

//generate events
generateEl.addEventListener('click', () => {
  const passwordLength = amountEl.value;
  const includeLower = lowerEl.checked;
  const includeUpper = upperEl.checked;
  const includeNumber = numbersEl.checked;
  const includesSymbols = symbolsEl.checked;

  resultEl.innerText = generatePassword(includeLower, includeUpper, includeNumber, includesSymbols, passwordLength);
});

//copy event and function
copyEl.addEventListener('click', () => {
  const text = copyEl.previousElementSibling.innerText;
  copyToClipboard(text);

})

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  alert('copied to clipboard');
}


//password generate
function generatePassword(lower, upper, number, symbol, length) {
  let password = '';
  const typesChecked = lower + upper + number + symbol;

  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);


  if (typesChecked === 0) {
    return "Error: Please Check Parameters!"
  }

  for (let i = 0; i < length; i += typesChecked) {
    typesArr.forEach(type => {
      const functionName = Object.keys(type)[0];

      password += randomFunction[functionName]();
    });
  }

  const generatedPassword = password.slice(0, length);

  return generatedPassword;
};

//Generate functions
function getRandomLowercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

function getRandomUppercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
};

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
};

function getRandomSymbol() {
  const symbols = '!@#$%^&*?';
  return symbols[Math.floor(Math.random() * symbols.length)];
};

