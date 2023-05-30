const signupForm = document.querySelector('#signup-form')
const emailInput = document.querySelector('#email')
const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')

const signupURL = `/api/signup`

const sendSignup = (body) => {
  axios.post(signupURL, body)
  .then(res => {
    if (res.data.success) {
      console.log('signup successful')
      alert('Your account was successfully created!')
    } else {
      console.log('No axios error, but signup not successful :(')
    }
  })
  .catch(err => {
    console.log('axios error:')
    console.log(err)
  })
}

function submitHandler(event) {
    event.preventDefault()

    if (!emailInput.value || !usernameInput.value || !passwordInput.value) {
        alert('Please enter a value into each field')
        return
    }

    let body = {
        email: emailInput.value,
        password: passwordInput.value,
        username: usernameInput.value
    }

    emailInput.value = ""
    passwordInput.value = ""
    usernameInput.value = ""

    sendSignup(body)
}

signupForm.addEventListener('submit', submitHandler)