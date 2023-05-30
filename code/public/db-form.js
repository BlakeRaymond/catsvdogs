const form = document.querySelector('form')
let nameInput = document.getElementById('name-input')
let homelandInput = document.getElementById('homeland-input')
let talentInput = document.getElementById('talent-input')
let picInput = document.getElementById('picurl-input')


function submitHandler(e) {

    e.preventDefault()

    if (!nameInput.value || !homelandInput.value || !talentInput.value || !picInput.value) {
        alert('Please enter a value into each field')
        return
    }

    let body = {
        name: nameInput.value,
        homeland: homelandInput.value,
        talent: talentInput.value,
        pic: picInput.value
    }

    axios.post('/api/db-submit', body)
    .then(alert('You did it!'))
    .catch((err) => console.log(err))

    form.reset()

}

form.addEventListener('submit', submitHandler)