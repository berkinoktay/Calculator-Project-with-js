const themes = document.querySelector('.toggle-bar')
const themesName = document.querySelector('.switch h3 span')
const resultItems = document.querySelector('.result-items')
const calcInput = document.querySelector('.calc-input')
const calcKeys = document.querySelector('.calc-keys')
const firstValueContainer = document.querySelector('.first-value')
let firstValue = null
let defaultValue = 0
let secondValue = null
let operatorValue = null
let waitingSecondValue = null
themesName.innerText = "Default"
updateValue()


themes.addEventListener('click', function (e) {
    if (e.target.classList.contains('toggle_option')) {

        if (e.target.id === "one") {
            document.documentElement.setAttribute('data-theme', 'default')
            themesName.innerText = "Default"
        } else if (e.target.id === "two") {
            document.documentElement.setAttribute('data-theme', 'dark')
            themesName.innerText = "Dark"
        } else if (e.target.id === "three") {
            document.documentElement.setAttribute('data-theme', 'neon')
            themesName.innerText = "Neon"

        } else {
            document.documentElement.setAttribute('data-theme', 'vintage')
            themesName.innerText = "Vintage"
        }

    }
})


function equalPopup() {
    Swal.fire({
        icon: 'warning',
        title: 'Sonuç Hesaplanamadı!',
        text: 'Bir sayı veya operatör eksik girilmiştir! Lütfen kontrol ediniz.',
        confirmButtonText: 'TAMAM',
        confirmButtonColor: '#d00000',
        position: 'center',
        width: '500px',
        heightAuto: false,
        background: '#19191a',
        iconColor: '#e85d04'

    })
}
function decimalPopup() {
    Swal.fire({
        icon: 'warning',
        title: 'Uyarı...',
        text: 'Ondalıklı sayıya çevirmeden önce lütfen bir sayı giriniz!',
        confirmButtonText: 'TAMAM',
        confirmButtonColor: '#d00000',
        position: 'center',
        width: '500px',
        heightAuto: false,
        background: '#19191a',
        iconColor: '#e85d04'

    })
}
function deletePopup() {
    Swal.fire({
        icon: 'warning',
        title: 'Silinecek değer bulunamadı!',
        text: 'Öncelikle bir sayı girmeniz gerekmektedir.',
        confirmButtonText: 'TAMAM',
        confirmButtonColor: '#d00000',
        position: 'center',
        width: '500px',
        heightAuto: false,
        background: '#19191a',
        iconColor: '#e85d04'

    })
}
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
        } else if (e.target.classList.contains('delete') || e.target.classList.contains('fas')) {
            deleteInput()
            updateValue()
        }
        else if (e.target.classList.contains('equal-sign')) {
            if (secondValue === null || operatorValue === null || waitingSecondValue === true) {
                equalPopup()

            } else {
                firstValue = secondValue

                firstValue = String(firstValue).includes('.') ? String(firstValue).replace('.', ',') : firstValue
                const result = calculate(secondValue, defaultValue, operatorValue)
                calcInput.value = Number.isInteger(result) ? result : result.toFixed(2)
                secondValue = result
                // defaultValue = String(defaultValue).includes(',') ? defaultValue.replace(/,/g, '.') : defaultValue
                firstValueContainer.innerText = `${firstValue} ${operatorValue === null ? '' : operatorValue} ${defaultValue} =`
                // console.log(`SONRA Default: ${defaultValue}, Second: ${secondValue}, Operator: ${operatorValue}, WaitingSecond: ${waitingSecondValue}`)

                let li = document.createElement('li')
                li.innerText = `${firstValue} ${operatorValue === null ? '' : operatorValue} ${defaultValue} = ${result}`
                resultItems.appendChild(li)


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
function deleteInput() {
    if (defaultValue === 0) {
        deletePopup()
    } else if (defaultValue.length === 1) {
        defaultValue = 0
        firstValueContainer.innerText = `${secondValue === null ? defaultValue : secondValue} ${operatorValue === null ? '' : operatorValue} ${secondValue === null ? '' : defaultValue} =`

    } else {
        defaultValue = String(defaultValue).substring(0, defaultValue.length - 1)
        firstValueContainer.innerText = `${secondValue === null ? defaultValue : secondValue} ${operatorValue === null ? '' : operatorValue} ${secondValue === null ? '' : defaultValue} =`
    }

}
function numInput(number) {
    if (waitingSecondValue) {
        defaultValue = number
        waitingSecondValue = false
    } else {
        defaultValue = defaultValue === 0 ? number : defaultValue + number
    }
    firstValueContainer.innerText = `${secondValue === null ? defaultValue : secondValue} ${operatorValue === null ? '' : operatorValue} ${secondValue === null ? '' : defaultValue} =`
    // console.log(`Default: ${defaultValue}, Second: ${secondValue}, Operator: ${operatorValue}, WaitingSecond: ${waitingSecondValue}`)

}
function decInput() {
    if (defaultValue === 0) {
        decimalPopup()
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
    clickEqual = false
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

