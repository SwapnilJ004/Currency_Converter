import { countryList } from "./codes.js";
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

let submitBtn = document.querySelector('button');
let inputCountrySelect = document.querySelector('#inputCountrySel');
let outputCountrySelect = document.querySelector('#outputCountrySel');
let inputAmountAttr = document.querySelector('#amountInput');
let message = document.querySelector('.msg');
let inputCountryImage = document.querySelector("#inputCountryImg");
let outputCountryImage = document.querySelector("#outputCountryImg");

submitBtn.addEventListener('click', onSubmit);

function populateCountries(){
    inputCountrySelect.removeChild(inputCountrySelect.childNodes[1]);
    outputCountrySelect.removeChild(outputCountrySelect.childNodes[1]);
    for(let country in countryList){
        let fromOption = document.createElement("option");
        let toOption = document.createElement("option");
        fromOption.value = country;
        toOption.value = country;
        fromOption.text = country;
        toOption.text = country;

        if(country === "INR"){
            fromOption.setAttribute("selected", "");
        }

        if(country === "USD"){
            toOption.setAttribute("selected", "");
        }

        inputCountrySelect.appendChild(fromOption);
        outputCountrySelect.appendChild(toOption);
    }
}

function insertFlags() {
    inputCountrySelect.addEventListener('click', () => {
            inputCountrySelect.addEventListener('change', () => {
            setFlag(inputCountrySelect, inputCountryImage);
        });
    });
    
    outputCountrySelect.addEventListener('click', () => {
        outputCountrySelect.addEventListener('change', () => {
            setFlag(outputCountrySelect, outputCountryImage);
        })
    });
}

function setFlag(countrySelect, image){    
    const URL = `https://flagsapi.com/${countryList[countrySelect[countrySelect.selectedIndex].value]}/flat/64.png`;
    image.setAttribute('src', URL);
}

populateCountries();
insertFlags();

async function onSubmit(event){
    event.preventDefault();
    const inputAmount = inputAmountAttr.value;

    let inputCountry = inputCountrySelect.options[inputCountrySelect.options.selectedIndex].value;
    let outputCountry = outputCountrySelect.options[outputCountrySelect.options.selectedIndex].value;
    let REQ_URL = BASE_URL + `${inputCountry.toLowerCase()}.json`;
    let response = await fetch(REQ_URL);
    let outputCountries = await response.json();
    let conversionRate = outputCountries[inputCountry.toLowerCase()][outputCountry.toLowerCase()];
    
    if(inputCountry === outputCountry){
        conversionRate = 1;
    }

    message.innerText = `1 ${inputCountry} = ${conversionRate} ${outputCountry}`;
    
    let finalAmount = inputAmount * conversionRate;
    inputAmountAttr.value = `${finalAmount.toFixed(3)}`;
}