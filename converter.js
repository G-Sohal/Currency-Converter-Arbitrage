const url="https://api.exchangeratesapi.io/v1/latest?access_key=41e725901b94a82bd31ca75d44c45795";

const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convert = document.getElementById("convert");
const result = document.getElementById("result");

fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        //console.log(data); --> //"rates": {"USD": "", ...}
        let currencies = (Object.keys(data.rates));
        currencies.forEach(currency => {
            const from = document.createElement("option");
            const to = document.createElement("option");
            from.value = currency;
            to.value = currency;
            from.textContent = currency;
            to.textContent = currency;
            fromCurrency.appendChild(from);
            toCurrency.appendChild(to);
        });
    })
    .catch(error => {
        console.error(error);
    });

convert.addEventListener("click", ()=> {
    const Amount = parseFloat(amount.value); 
    const From = fromCurrency.value;
    const To = toCurrency.value;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const rates = data.rates;
            const finalAmount = ( Amount * rates[To] / rates[From] );
            result.textContent = ` ${Amount} ${From} = ${finalAmount} ${To}` ;
        })
        .catch(error => {
            console.error(error);
        });
});
 