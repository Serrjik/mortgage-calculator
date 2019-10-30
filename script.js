// Стоимость недвижимости
const creditText = document.querySelector('#creditText')
const creditRange = document.querySelector('#creditRange')
// Первоначальный взнос
const firstContributionText = document.querySelector('#firstContributionText')

/*
	Порядок событий:
	focus -> keydown -> keypress -> keyup -> input
*/
// Событие "input" возникает при смене значения в поле <input>.

// Добавить обработчик события "input" инпуту Стоимость недвижимости.
creditText.addEventListener('input', inputHandler)


function inputHandler (event) {
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

	console.log(number)
}