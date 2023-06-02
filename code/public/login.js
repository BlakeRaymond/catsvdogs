const loginForm = document.querySelector('#login-form')
const emailInput = document.querySelector('#email')
const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const fighterLink = document.querySelector('#fighters')
const loginURL = `/api/login`

const sendLogin = body => {
    axios.post(loginURL, body)
    .then((res) => {
      if (res.data.success) {
        console.log('login successful', res.data.user)
        window.location.href = "http://localhost:4000"
      } else {
        console.log('no axios error, but login not successful: bad username or password')
        alert(res.data.message)
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
        alert("Please fill out all fields.")
        return
      }
  
      let body = {
          email: emailInput.value,
          username: usernameInput.value,
          password: passwordInput.value
      }
  
      emailInput.value = ""
      usernameInput.value =""
      passwordInput.value = ""
  
      sendLogin(body)
  }
  
  loginForm.addEventListener('submit', submitHandler)