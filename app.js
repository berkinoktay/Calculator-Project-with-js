const calcInput = document.querySelector('.calc-input')
const calcKeys = document.querySelector('.calc-keys')
const firstValueContainer = document.querySelector('.first-value')
let firstValue = null
let defaultValue = 0
let secondValue = null
let operatorValue = null
let waitingSecondValue = null
updateValue()

function updateValue() {
    calcInput.value = defaultValue
}
calcKeys.addEventListener('click', function (e) {
    if (e.target.matches('button')) {
        if (e.target.className == 'operator') {
            opInput(e.target.value)
            updateValue()

        } else if (e.target.classList.contains('decimal')) {
            decInput()
            updateValue()
        } else if (e.target.classList.contains('clear')) {
            clearInput()
            updateValue()
        } else if (e.target.classList.contains('equal-sign')) {
            if (secondValue === null || operatorValue === null || waitingSecondValue === true) {
                alert('Bir sayı veya operatör eksik girilmiştir! Lütfen kontrol ediniz.')
            } else {
                firstValue = secondValue

                firstValue = String(firstValue).includes('.') ? String(firstValue).replace('.', ',') : firstValue
                const result = calculate(secondValue, defaultValue, operatorValue)
                calcInput.value = Number.isInteger(result) ? result : result.toFixed(2)
                secondValue = result
                // defaultValue = String(defaultValue).includes(',') ? defaultValue.replace(/,/g, '.') : defaultValue
                firstValueContainer.innerText = `${firstValue} ${operatorValue === null ? '' : operatorValue} ${defaultValue} =`
                // console.log(`SONRA Default: ${defaultValue}, Second: ${secondValue}, Operator: ${operatorValue}, WaitingSecond: ${waitingSecondValue}`)
            }

        } else {
            numInput(e.target.value)
            updateValue()
        }
    }

})

function clearInput() {
    defaultValue = 0
    secondValue = null
    operatorValue = null
    waitingSecondValue = null
    firstValueContainer.innerText = '='
}
function numInput(number) {
    if (waitingSecondValue) {
        defaultValue = number
        waitingSecondValue = false
    } else {
        defaultValue = defaultValue === 0 ? number : defaultValue + number
    }
    firstValueContainer.innerText = `${secondValue === null ? defaultValue : secondValue} ${operatorValue === null ? '' : operatorValue} ${secondValue === null ? '' : defaultValue} =`
}
function decInput() {
    if (defaultValue === 0) {
        alert('Ondalıklı sayıya çevirmeden önce lütfen bir sayı giriniz!')
    } else if (!defaultValue.includes(',')) {
        defaultValue += ','
    }

}
function opInput(operator) {
    if (secondValue === null) {

        // secondValue = parseFloat(defaultValue)
        secondValue = Number.isInteger(defaultValue) ? parseInt(defaultValue) : defaultValue

        firstValueContainer.innerText = `${secondValue} ${operator} =`
    }
    waitingSecondValue = true
    operatorValue = operator
    defaultValue = secondValue

}
function calculate(second, defaultVal, operator) {
    // let convertDecSecond = null
    // let convertDecDefault = null
    // if (String(second).includes(',')) {
    //     convertDecSecond = second.replace(',', '.')
    // }
    // else {
    //     convertDecSecond = second
    // }
    // if (String(defaultVal.includes(',')) {
    //     convertDecDefault = defaultVal.replace(',', '.')
    // }
    // else {
    //     convertDecDefault = defaultVal
    // }
    const convertDecSecond = String(second).includes(',') ? second.replace(/,/g, '.') : second
    const convertDecDefault = String(defaultVal).includes(',') ? defaultVal.replace(/,/g, '.') : defaultVal
    switch (operator) {
        case "+":
            return parseFloat(convertDecSecond) + parseFloat(convertDecDefault)
            break;
        case "-":
            return parseFloat(convertDecSecond) - parseFloat(convertDecDefault)
            break;
        case "*":
            return parseFloat(convertDecSecond) * parseFloat(convertDecDefault)
            break;
        case "/":
            return parseFloat(convertDecSecond) / parseFloat(convertDecDefault)
            break;
        default:
            return parseFloat(convertDecDefault)

    }

}