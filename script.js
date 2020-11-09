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
			if (count === 1) {
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

/*
	Функция присвоит обработчик события нескольким элементам сразу.
	Обработчик события передаётся последним аргументом.
*/
function setReaction (...args) {
	const handler = args.splice(-1)[0]
	/*
		Пройти по всем элементам массива args
		и повесить им на событие 'input' обработчик handler.
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
	const returnPeriod = parseInt(returnPeriodRange.value) * 12
	const percent = parseInt(percentNumberRange.value) / 100 / 12

	// Рассчитать и присвоить значение элементу "Итого: в месяц".
	const x = Math.pow(1 + percent, returnPeriod)
	const payment = ((credit - firstContribution) * x * percent) / (x - 1)
	document.querySelector('#payment').textContent = formatterCurrency.format(payment)

	// Рассчитать и присвоить значение элементу "Общая выплата".
	const common = (payment * returnPeriod).toFixed(2)
	document.querySelector('#common').textContent = formatterCurrency
		.format(common)

	// Рассчитать и присвоить значение элементу "Переплата".
	const subpayment = common - (credit - firstContribution)
	document.querySelector('#subpayment').textContent = formatterCurrency.format(subpayment)

	// Finally, chart loan balance, and interest and equity payments
	chart(credit - firstContribution, percent, payment, returnPeriod);
}

// Chart monthly loan balance, interest and equity in an HTML <canvas> element.
// If called with no arguments then just erase any previously drawn chart.
function chart(principal, interest, monthly, payments) {
    const graph = document.getElementById("graph"); // Get the <canvas> tag
    graph.width = graph.width;  // Magic to clear and reset the canvas element

    // If we're called with no arguments, or if this browser does not support
    // graphics in a <canvas> element, then just return now.
    if (arguments.length === 0 || !graph.getContext) return;

    // Get the "context" object for the <canvas> that defines the drawing API
    const g = graph.getContext("2d"); // All drawing is done with this object
    const width = graph.width, height = graph.height; // Get canvas size

    // These functions convert payment numbers and dollar amounts to pixels
    function paymentToX(n) { return n * width/payments; }
    function amountToY(a) { return height-(a * height/(monthly*payments*1.05));}

    // Payments are a straight line from (0,0) to (payments, monthly*payments)
    g.moveTo(paymentToX(0), amountToY(0));         // Start at lower left
    g.lineTo(paymentToX(payments),                 // Draw to upper right
             amountToY(monthly*payments));
    g.lineTo(paymentToX(payments), amountToY(0));  // Down to lower right
    g.closePath();                                 // And back to start
    g.fillStyle = "#f88";                          // Light red
    g.fill();                                      // Fill the triangle
    g.font = "bold 12px sans-serif";               // Define a font
    g.fillText("Общая выплата", 20,20);  // Draw text in legend

    // Cumulative equity is non-linear and trickier to chart
    let equity = 0;
    g.beginPath();                                 // Begin a new shape
    g.moveTo(paymentToX(0), amountToY(0));         // starting at lower-left
    for(let p = 1; p <= payments; p++) {
        // For each payment, figure out how much is interest
        const thisMonthsInterest = (principal-equity)*interest;
        equity += (monthly - thisMonthsInterest);  // The rest goes to equity
        g.lineTo(paymentToX(p),amountToY(equity)); // Line to this point
    }
    g.lineTo(paymentToX(payments), amountToY(0));  // Line back to X axis
    g.closePath();                                 // And back to start point
    g.fillStyle = "green";                         // Now use green paint
    g.fill();                                      // And fill area under curve
    g.fillText("Сумма кредита", 20,35);             // Label it in green

    // Loop again, as above, but chart loan balance as a thick black line
    let bal = principal;
    g.beginPath();
    g.moveTo(paymentToX(0),amountToY(bal));
    for(let p = 1; p <= payments; p++) {
        const thisMonthsInterest = bal*interest;
        bal -= (monthly - thisMonthsInterest);     // The rest goes to equity
        g.lineTo(paymentToX(p),amountToY(bal));    // Draw line to this point
    }
    g.lineWidth = 3;                               // Use a thick line
    g.stroke();                                    // Draw the balance curve
    g.fillStyle = "black";                         // Switch to black text
    g.fillText("Остаток кредита", 20,50);             // Legend entry

    // Now make yearly tick marks and year numbers on X axis
    g.textAlign="center";                          // Center text over ticks
    const y = amountToY(0);                          // Y coordinate of X axis
    for(let year=1; year*12 <= payments; year++) { // For each year
        const x = paymentToX(year*12);               // Compute tick position
        g.fillRect(x-0.5,y-3,1,3);                 // Draw the tick
        if (year === 1) g.fillText("Year", x, y-5); // Label the axis
        if (year % 5 === 0 && year*12 !== payments) // Number every 5 years
            g.fillText(String(year), x, y-5);
    }

    // Mark payment amounts along the right edge
    g.textAlign = "right";                         // Right-justify text
    g.textBaseline = "middle";                     // Center it vertically
    const ticks = [monthly*payments, principal];     // The two points we'll mark
    const rightEdge = paymentToX(payments);          // X coordinate of Y axis
    for(let i = 0; i < ticks.length; i++) {        // For each of the 2 points
        const y = amountToY(ticks[i]);               // Compute Y position of tick
        g.fillRect(rightEdge-3, y-0.5, 3,1);       // Draw the tick mark
        g.fillText(String(ticks[i].toFixed(0)),    // And label it.
                   rightEdge-5, y);
    }
}