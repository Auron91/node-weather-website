const city = document.querySelector('#inputField');
const sendBtn = document.querySelector('#send')
const weatherForm = document.querySelector('form');

const firstParagraph = document.querySelector('#p1')
const secondParagraph = document.querySelector('#p2')

weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    const location = city.value

    firstParagraph.textContent = 'Loading..'
    secondParagraph.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                firstParagraph.textContent = data.error
            } else {
                firstParagraph.textContent = data.location
                secondParagraph.textContent = data.forecast
            }
        })
    })
})