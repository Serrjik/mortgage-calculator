const CREDIT_MIN = 0 // минимально возможный кредит
const CREDIT_MAX = 15000000 // максимально возможный кредит
const CONTRIBUTION_MIN = 0 // минимально возможный Первоначальный взнос
const CONTRIBUTION_MAX = 10000000 // максимально возможный Первоначальный взнос
const RETURN_PERIOD_MIN = 10 // минимально возможный срок кредита
const RETURN_PERIOD_MAX = 40 // максимально возможный срок кредита

// Стоимость недвижимости
const creditText = document.querySelector('#creditText')
const creditRange = document.querySelector('#creditRange')
// Первоначальный взнос
const firstContributionText = document.querySelector('#firstContributionText')
const firstContributionRange = document.querySelector('#firstContributionRange')
// Срок кредита
const returnPeriodText = document.querySelector('#returnPeriodText')
const returnPeriodRange = document.querySelector('#returnPeriodRange')

// Форматтер числа - Встроенный объект Intl с параметрами форматирования данных.
const formatterNumber = new Intl.NumberFormat('ru')
// Форматтер валюты.
const formatterCurrency = new Intl.NumberFormat('ru', {
	style: 'currency',
	currency: 'RUB',
	minimumFractionDigits: 0 // максимальное количество знаков после запятой
})

/*
	Порядок событий:
	focus -> keydown -> keypress -> keyup -> input
*/
// Событие "input" возникает при смене значения в поле <input>.

// Добавить обработчик события "focus" инпуту Стоимость недвижимости.
creditText.addEventListener('focus', function (event) {
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
creditText.addEventListener('input', function inputHandler (event) {
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
	if (number < CREDIT_MIN) {
		number = CREDIT_MIN
	}

	if (number > CREDIT_MAX) {
		number = CREDIT_MAX
	}

	/*
		Добавить изменение значения ползунка Стоимость недвижимости
		при изменении значения выбранного элемента.
	*/
	creditRange.value = number

	number = formatterNumber.format(number)
	// Записать в input отформатированное число.
	this.value = number
})

// Добавить обработчик события "blur" инпуту Стоимость недвижимости.
creditText.addEventListener('blur', function (event) {
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
	this.value = formatterCurrency.format(number)
})

// Добавить обработчик события "input" инпуту-ползунку Стоимость недвижимости.
creditRange.addEventListener('input', function (event) {
	// Присвоим значение ползунка инпуту Стоимость недвижимости.
	creditText.value = formatterCurrency.format(parseInt(this.value))
})

// Добавить обработчик события "focus" инпуту Первоначальный взнос.
firstContributionText.addEventListener('focus', function (event) {
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

// Добавить обработчик события "input" инпуту Первоначальный взнос.
firstContributionText.addEventListener('input', function inputHandler (event) {
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
	if (number < CONTRIBUTION_MIN) {
		number = CONTRIBUTION_MIN
	}

	if (number > CONTRIBUTION_MAX) {
		number = CONTRIBUTION_MAX
	}

	/*
		Добавить изменение значения ползунка Первоначальный взнос
		при изменении значения выбранного элемента.
	*/
	firstContributionRange.value = number

	number = formatterNumber.format(number)
	// Записать в input отформатированное число.
	this.value = number
})

// Добавить обработчик события "blur" инпуту Первоначальный взнос.
firstContributionText.addEventListener('blur', function (event) {
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
	this.value = formatterCurrency.format(number)
})

// Добавить обработчик события "input" инпуту-ползунку Первоначальный взнос.
firstContributionRange.addEventListener('input', function (event) {
	// Присвоим значение ползунка инпуту Первоначальный взнос.
	firstContributionText.value = formatterCurrency.format(parseInt(this.value))
})

// Добавить обработчик события "focus" инпуту Срок кредита.
returnPeriodText.addEventListener('focus', function (event) {
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

// Добавить обработчик события "input" инпуту Срок кредита.
returnPeriodText.addEventListener('input', function inputHandler (event) {
	// Достать из строки только числа:
	let number = ''

	for (const letter of this.value) {
		if ('0123456789'.includes(letter)) {
			number += letter
		}
	}

	// Превратить строку number в число.
	number = parseInt(number)

	/*
		Добавить изменение значения ползунка Срок кредита
		при изменении значения выбранного элемента.
	*/
	returnPeriodRange.value = number

	number = formatterNumber.format(number)
	// Записать в input отформатированное число.
	this.value = number
})

// Добавить обработчик события "blur" инпуту Срок кредита.
returnPeriodText.addEventListener('blur', function (event) {
	// Достать из строки только числа:
	let number = ''

	for (const letter of this.value) {
		if ('0123456789'.includes(letter)) {
			number += letter
		}
	}

	// Превратить строку number в число.
	number = parseInt(number)

	// Срок кредита должен быть не менее минимального и не более максимально возможного.
	if (number < RETURN_PERIOD_MIN) {
		number = RETURN_PERIOD_MIN
	}

	if (number > RETURN_PERIOD_MAX) {
		number = RETURN_PERIOD_MAX
	}

	// Дописать после количества лет слово "лет" или "год"
	this.value = yearToString(number)
})

// Добавить обработчик события "input" инпуту-ползунку Срок кредита.
returnPeriodRange.addEventListener('input', function (event) {
	// Присвоим значение ползунка инпуту Срок кредита.
	returnPeriodText.value = yearToString(parseInt(this.value))
})

// Функция дописывает к числу лет слово "год" или "года" или "лет".
function yearToString (number) {
	if (number === 21 || number === 31) {
		number.toString()
		number += ' год'
	} else if ( (number >= 22 && number <= 24) ||
				(number >= 32 && number <= 34) ) {
		number.toString()
		number += ' года'
	} else {
		number.toString()
		number += ' лет'
	}

	return number
}