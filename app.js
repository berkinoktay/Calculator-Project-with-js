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
                const result = calculate(secondValue, parseFloat(defaultValue), operatorValue)
                calcInput.value = Number.isInteger(result) ? result : result.toFixed(3)
                secondValue = result

                firstValueContainer.innerText = `= ${firstValue} ${operatorValue === null ? '' : operatorValue} ${defaultValue}`

                // console.log(`Default: ${defaultValue}, Second: ${secondValue}, Operator: ${operatorValue}, WaitingSecond: ${waitingSecondValue}`)
            }

        } else {
            numInput(e.target.value)
            updateValue()
            // console.log(`Default: ${defaultValue}, Second: ${secondValue}, Operator: ${operatorValue}, WaitingSecond: ${waitingSecondValue}`)
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
    firstValueContainer.innerText = `= ${secondValue === null ? defaultValue : secondValue} ${operatorValue === null ? '' : operatorValue} ${secondValue === null ? '' : defaultValue}`
}
function decInput() {
    if (defaultValue === 0) {
        alert('Ondalıklı sayıya çevirmeden önce lütfen bir sayı giriniz!')
    } else if (!defaultValue.includes('.')) {
        defaultValue += '.'
    }

}
function opInput(operator) {
    if (secondValue === null) {
        secondValue = parseFloat(defaultValue)

    }
    waitingSecondValue = true
    operatorValue = operator
    defaultValue = 0

}
function calculate(second, defaultVal, operator) {
    switch (operator) {
        case "+":
            return second + defaultVal
            break;
        case "-":
            return second - defaultVal
            break;
        case "*":
            return second * defaultVal
            break;
        case "/":
            return second / defaultVal
            break;
        default:
            return defaultVal

    }

}