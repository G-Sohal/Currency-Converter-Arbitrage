const url="https://api.exchangeratesapi.io/v1/latest?access_key=41e725901b94a82bd31ca75d44c45795";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const find = document.getElementById("find");
const result = document.getElementById("result");
const upperLimit = document.getElementById("upperLimit");

let rates = {};

fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        rates = data.rates ;
        Object.keys(rates).forEach(currency => {
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

find.addEventListener("click", ()=> {
    const From = fromCurrency.value;
    const To = toCurrency.value;
    const UpperLimit = upperLimit.value; 
    if ( From === To) {
        result.textContent = "Please select different currencies.";
        return;
    }

    const paths = [];

    Object.keys(rates).forEach(thisCurrency => {
        if(From !== thisCurrency && To !== thisCurrency) {
            const rate1 = rates[thisCurrency] / rates[From];
            const rate2 = rates[To] / rates[thisCurrency];
            const finalRate = rate1 * rate2;
            paths.push({
                path: `${From} via ${thisCurrency} to ${To}`,
                amount: finalRate
            });
        }
    });

    paths.sort((a, b) => b.amount - a.amount);

    for (let i = 0; i<UpperLimit && i<paths.length; i++) {
        const { path, amount } = paths[i];
        const p = document.createElement("p");
        p.textContent = `Path ${i + 1}: ${path}`;
        result.appendChild(p);
    }
});
