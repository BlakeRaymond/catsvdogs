console.log('We made it THIS far')

const createBtn = document.getElementById('create-char')

const createPicCont = document.getElementById("create-cont-pic")
const createNameCont = document.getElementById("create-name")
const createHomelandCont = document.getElementById("create-homeland")
const createTalentCont = document.getElementById("create-talent")


const createChar = (e) => {
    console.log("We made it this far")
    e.preventDefault()
    
    axios.get("/api/createcharacter")
    .then(res => {
        console.log(res.data)
    })
}

createBtn.addEventListener("click", createChar)

//Need to create a function to hide/reveal things