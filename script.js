const CREDIT_MIN = 0 // минимально возможный кредит
const CREDIT_MAX = 15000000 // максимально возможный кредит

const CONTRIBUTION_MIN = 0 // минимально возможный Первоначальный взнос
const CONTRIBUTION_MAX = 10000000 // максимально возможный Первоначальный взнос

const RETURN_PERIOD_MIN = 1 // минимально возможный срок кредита
const RETURN_PERIOD_MAX = 40 // максимально возможный срок кредита


// Минимально возможная процентная ставка.
const PERCENT_NUMBER_MIN = 1
// Максимально возможная процентная ставка.
const PERCENT_NUMBER_MAX = 30

// Стоимость недвижимости
const creditText = document.querySelector('#creditText')
const creditRange = document.querySelector('#creditRange')
// Первоначальный взнос
const firstContributionText = document.querySelector('#firstContributionText')
const firstContributionRange = document.querySelector('#firstContributionRange')
// Срок кредита
const returnPeriodText = document.querySelector('#returnPeriodText')
const returnPeriodRange = document.querySelector('#returnPeriodRange')
returnPeriodRange.setAttribute('max', RETURN_PERIOD_MAX)
// Процентная ставка.
const percentNumber = document.querySelector('#percentNumber')
const percentNumberRange = document.querySelector('#percentNumberText')

// Форматтер числа - Встроенный объект Intl с параметрами форматирования данных.
const formatterNumber = new Intl.NumberFormat('ru')

// Форматтер валюты.
const formatterCurrency = new Intl.NumberFormat('ru', {
	style: 'currency',
	currency: 'RUB',
	// максимальное количество знаков после запятой
	minimumFractionDigits: 0
})

// Форматтер даты.
const formatterDate = {
	format (years) {
		years = parseInt(years)
		let count = years % 10
		let txt = 'лет'

		if (years >= 5 && years <= 20) {
			txt = 'лет'
		} else {
			if (count == 1) {
				txt = 'год'
			} else {
				if (count >= 2 && count <= 4) {
					txt = 'года'
				}
			}
		}

		return years + ' ' + txt
	}
}

// Форматтер процентов.
const formatterPercent = {
	format (percent) {
		percent = parseInt(percent)

		return `${percent} %`
	}
}

/*
	Порядок событий:
	focus -> keydown -> keypress -> input -> keyup
*/
// Событие "input" возникает при смене значения в поле <input>.

// для инпута "Стоимость недвижимости"
setDoubleDependencies(
	creditText,
	creditRange,
	formatterNumber,
	formatterCurrency,
	CREDIT_MIN,
	CREDIT_MAX
)

// для инпута "Первоначальный взнос"
setDoubleDependencies(
	firstContributionText,
	firstContributionRange,
	formatterNumber,
	formatterCurrency,
	CONTRIBUTION_MIN,
	CONTRIBUTION_MAX
)

// для инпута "Срок кредита"
setDoubleDependencies(
	returnPeriodText,
	returnPeriodRange,
	formatterNumber,
	formatterDate,
	RETURN_PERIOD_MIN,
	RETURN_PERIOD_MAX
)

// для инпута "Процентная ставка"
setDoubleDependencies(
	percentNumber,
	percentNumberText,
	formatterNumber,
	formatterPercent,
	PERCENT_NUMBER_MIN,
	PERCENT_NUMBER_MAX
)
setReaction(
	creditText,
	creditRange,
	firstContributionText,
	firstContributionRange,
	returnPeriodText,
	returnPeriodRange,
	percentNumber,
	percentNumberText,
	// function (event, elements) {
	// 	console.log(elements)
	// }
	mainProcess
)

mainProcess()

/*
	Функция принимает аргументы
	(над какими элементами будет двойная зависимость,
	Форматтер который определяет какой будет формат,
	Целевой форматтер,
	минимальное и максимальное значения инпута)
*/
function setDoubleDependencies (
	textElement,
	rangeElement,
	formatterNumber,
	formatterGoal,
	min,
	max
) {
	// Среднее арифметическое min и max значений input'ов.
	const middle = (min + max) / 2

	// Установить атрибуты min и max ползункам:
	rangeElement.setAttribute('min', min)
	rangeElement.setAttribute('max', max)
	// Установить значение ползунка по умолчанию:
	rangeElement.value = middle
	// Установить значение input'а по умолчанию:
	textElement.value = formatterGoal.format(middle)

	// Добавить обработчик события "focus" инпуту "Стоимость недвижимости".
	textElement.addEventListener('focus', function (event) {
		/*
			this - контекст. Ссылается на тот самый элемент,
			внутри которого произошло событие.
		*/
		// Достать из строки только числа:
		let number = ''

		for (const letter of this.value) {
			if ('0123456789'.includes(letter)) {
				number += letter
			}
		}

		// Превратить строку number в число.
		number = parseInt(number)

		// value хранит в себе значение input'а.
		// Установить значением текущего элемента только число (без знака валюты).
		this.value = formatterNumber.format(number)
	})

	// Добавить обработчик события "input" инпуту Стоимость недвижимости.
	textElement.addEventListener('input', function inputHandler (event) {
		/*
			this - контекст. Ссылается на тот самый элемент,
			внутри которого произошло событие.
		*/
		// value хранит в себе значение input'а.

		// Достать из строки только числа:
		let number = ''

		for (const letter of this.value) {
			if ('0123456789'.includes(letter)) {
				number += letter
			}
		}

		// Превратить строку number в число.
		number = parseInt(number)

		// Кредит должен быть не менее минимального и не более максимально возможного.
		if (number < min) {
			number = min
		}

		if (number > max) {
			number = max
		}

		/*
			Добавить изменение значения ползунка Стоимость недвижимости
			при изменении значения выбранного элемента.
		*/
		rangeElement.value = number

		number = formatterNumber.format(number)
		// Записать в input отформатированное число.
		this.value = number
	})

	// Добавить обработчик события "blur" инпуту Стоимость недвижимости.
	textElement.addEventListener('blur', function (event) {
		/*
			this - контекст. Ссылается на тот самый элемент,
			внутри которого произошло событие.
		*/
		// Достать из строки только числа:
		let number = ''

		for (const letter of this.value) {
			if ('0123456789'.includes(letter)) {
				number += letter
			}
		}

		// Превратить строку number в число.
		number = parseInt(number)

		// value хранит в себе значение input'а.
		this.value = formatterGoal.format(number)
	})

	// Добавить обработчик события "input" инпуту-ползунку Стоимость недвижимости.
	rangeElement.addEventListener('input', function (event) {
		// Присвоим значение ползунка инпуту Стоимость недвижимости.
		textElement.value = formatterGoal.format(parseInt(this.value))
	})
}

// Функция присвоит обработчик события нескольким элементам сразу.
function setReaction (...args) {
	const handler = args.splice(-1)[0]

	/*
		Пройти по всем элементам массива args
		и на событие 'input' повесить обработчик handler.
	*/
	for (const element of args) {
		element.addEventListener('input', function (event) {
			handler.call(this, event, args.slice())
		})
	}
}

// Функция рассчитывает суммы выплат.
function mainProcess () {
	const credit = parseInt(creditRange.value)
	const firstContribution = parseInt(firstContributionRange.value)
	const returnPeriod = parseInt(returnPeriodRange.value)
	const percent = parseInt(percentNumberRange.value)

	// Рассчитать и присвоить значение элементу "Процентная ставка".
	// let percent = 10 + Math.log(returnPeriod) / Math.log(0.5)
	// Взять только 3 первых цифры:
	// percent = parseInt(percent * 100 + 1) / 100
	// document.querySelector('#percentNumber').value = percent + ' %'

	// Рассчитать и присвоить значение элементу "Общая выплата".
	let commonDebit = (credit - firstContribution) * (1 + percent) ^ returnPeriod
	document.querySelector('#common').textContent = formatterCurrency.format(commonDebit)

	// Рассчитать и присвоить значение элементу "Переплата".
	const subpayment = commonDebit - (credit - firstContribution)
	document.querySelector('#subpayment').textContent = formatterCurrency.format(subpayment)

	// Рассчитать и присвоить значение элементу "Итого: в месяц".
	const payment = subpayment / (returnPeriod * 12)
	document.querySelector('#payment').textContent = formatterCurrency.format(payment)
}

// // Добавить обработчик события "focus" инпуту Первоначальный взнос.
// firstContributionText.addEventListener('focus', function (event) {
// 	// Достать из строки только числа:
// 	let number = ''

// 	for (const letter of this.value) {
// 		if ('0123456789'.includes(letter)) {
// 			number += letter
// 		}
// 	}

// 	// Превратить строку number в число.
// 	number = parseInt(number)

// 	// value хранит в себе значение input'а.
// 	// Установить значением текущего элемента только число (без знака валюты).
// 	this.value = formatterNumber.format(number)
// })

// // Добавить обработчик события "input" инпуту Первоначальный взнос.
// firstContributionText.addEventListener('input', function inputHandler (event) {
// 	// Достать из строки только числа:
// 	let number = ''

// 	for (const letter of this.value) {
// 		if ('0123456789'.includes(letter)) {
// 			number += letter
// 		}
// 	}

// 	// Превратить строку number в число.
// 	number = parseInt(number)

// 	// Кредит должен быть не менее минимального и не более максимально возможного.
// 	if (number < CONTRIBUTION_MIN) {
// 		number = CONTRIBUTION_MIN
// 	}

// 	if (number > CONTRIBUTION_MAX) {
// 		number = CONTRIBUTION_MAX
// 	}

// 	/*
// 		Добавить изменение значения ползунка Первоначальный взнос
// 		при изменении значения выбранного элемента.
// 	*/
// 	firstContributionRange.value = number

// 	number = formatterNumber.format(number)
// 	// Записать в input отформатированное число.
// 	this.value = number
// })

// // Добавить обработчик события "blur" инпуту Первоначальный взнос.
// firstContributionText.addEventListener('blur', function (event) {
// 	// Достать из строки только числа:
// 	let number = ''

// 	for (const letter of this.value) {
// 		if ('0123456789'.includes(letter)) {
// 			number += letter
// 		}
// 	}

// 	// Превратить строку number в число.
// 	number = parseInt(number)

// 	// value хранит в себе значение input'а.
// 	this.value = formatterCurrency.format(number)
// })

// // Добавить обработчик события "input" инпуту-ползунку Первоначальный взнос.
// firstContributionRange.addEventListener('input', function (event) {
// 	// Присвоим значение ползунка инпуту Первоначальный взнос.
// 	firstContributionText.value = formatterCurrency.format(parseInt(this.value))
// })

// // Добавить обработчик события "focus" инпуту Срок кредита.
// returnPeriodText.addEventListener('focus', function (event) {
// 	// Достать из строки только числа:
// 	let number = ''

// 	for (const letter of this.value) {
// 		if ('0123456789'.includes(letter)) {
// 			number += letter
// 		}
// 	}

// 	// Превратить строку number в число.
// 	number = parseInt(number)

// 	// value хранит в себе значение input'а.
// 	// Установить значением текущего элемента только число (без знака валюты).
// 	this.value = formatterNumber.format(number)
// })

// // Добавить обработчик события "input" инпуту Срок кредита.
// returnPeriodText.addEventListener('input', function inputHandler (event) {
// 	// Достать из строки только числа:
// 	let number = ''

// 	for (const letter of this.value) {
// 		if ('0123456789'.includes(letter)) {
// 			number += letter
// 		}
// 	}

// 	// Превратить строку number в число.
// 	number = parseInt(number)

// 	/*
// 		Добавить изменение значения ползунка Срок кредита
// 		при изменении значения выбранного элемента.
// 	*/
// 	returnPeriodRange.value = number

// 	number = formatterNumber.format(number)
// 	// Записать в input отформатированное число.
// 	this.value = number
// })

// // Добавить обработчик события "blur" инпуту Срок кредита.
// returnPeriodText.addEventListener('blur', function (event) {
// 	// Достать из строки только числа:
// 	let number = ''

// 	for (const letter of this.value) {
// 		if ('0123456789'.includes(letter)) {
// 			number += letter
// 		}
// 	}

// 	// Превратить строку number в число.
// 	number = parseInt(number)

// 	// Срок кредита должен быть не менее минимального и не более максимально возможного.
// 	if (number < RETURN_PERIOD_MIN) {
// 		number = RETURN_PERIOD_MIN
// 	}

// 	if (number > RETURN_PERIOD_MAX) {
// 		number = RETURN_PERIOD_MAX
// 	}

// 	// Дописать после количества лет слово "лет" или "год"
// 	this.value = yearToString(number)
// })

// // Добавить обработчик события "input" инпуту-ползунку Срок кредита.
// returnPeriodRange.addEventListener('input', function (event) {
// 	// Присвоим значение ползунка инпуту Срок кредита.
// 	returnPeriodText.value = yearToString(parseInt(this.value))
// })

// // Функция дописывает к числу лет слово "год" или "года" или "лет".
// function yearToString (number) {
// 	if (number === 21 || number === 31) {
// 		number.toString()
// 		number += ' год'
// 	} else if ( (number >= 22 && number <= 24) ||
// 				(number >= 32 && number <= 34) ) {
// 		number.toString()
// 		number += ' года'
// 	} else {
// 		number.toString()
// 		number += ' лет'
// 	}

// 	return number
// }