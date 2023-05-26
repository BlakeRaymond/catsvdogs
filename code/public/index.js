const createBtn = document.getElementById('create-char')
const keepBtn = document.getElementById('keep')
const retryBtn = document.getElementById('retry')

const createPicCont = document.getElementById("create-cont-pic")
const createNameCont = document.getElementById("create-name")
const createHomelandCont = document.getElementById("create-homeland")
const createTalentCont = document.getElementById("create-talent")


const createChar = (e) => {
    e.preventDefault()

    keepBtn.classList.add("reveal")
    retryBtn.classList.add("reveal")

    axios.get("/api/createcharacter")
    .then(res => {

        //NAME

        createNameCont.textContent = ""

        let nameText = document.createElement('p')
        nameText.textContent = res.data.name
        createNameCont.appendChild(nameText)

        //HOMELAND

        createHomelandCont.textContent = ""

        let homelandText = document.createElement('p')
        homelandText.textContent = res.data.homeland
        createHomelandCont.appendChild(homelandText)

        //TALENT

        createTalentCont.textContent = ""

        let talentText = document.createElement('p')
        talentText.textContent = res.data.talent
        createTalentCont.appendChild(talentText)

        //PIC

        createPicCont.innerHTML = ""

        let createPic = document.createElement('img')
        createPic.src = res.data.pic
        createPicCont.appendChild(createPic)

    })
}

createBtn.addEventListener("click", createChar)

//Need to create a function to hide/reveal things