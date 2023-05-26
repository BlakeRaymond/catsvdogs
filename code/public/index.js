const createBtn = document.getElementById('create-char')
const keepBtn = document.getElementById('keep')
const retryBtn = document.getElementById('retry')

const centerDiv = document.getElementById('center')
const createPicCont = document.getElementById("create-cont-pic")
const createNameCont = document.getElementById("create-name")
const createHomelandCont = document.getElementById("create-homeland")
const createTalentCont = document.getElementById("create-talent")


const createChar = (e) => {
    e.preventDefault()

    keepBtn.classList.remove("hide")
    retryBtn.classList.remove("hide")

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

        keepBtn.addEventListener("click", function () {
            keepChar(res.data)
        })
    }).catch(err => console.log(err))

}

const keepChar = (charObj) => {

    keepBtn.classList.add("hide")
    retryBtn.classList.add("hide")
    centerDiv.classList.add("hide")

    
    let { pic, name, homeland, talent } = charObj
    
    //NAME
    
    let nameP = document.createElement('p')
    nameP.textContent = name
    document.getElementById('saved-name').appendChild(nameP)
    
    //HOMELAND
    
    let homelandP = document.createElement('p')
    homelandP.textContent = homeland
    document.getElementById('saved-homeland').appendChild(homelandP)
    
    //TALENT
    
    let talentP = document.createElement('p')
    talentP.textContent = talent
    document.getElementById('saved-talent').appendChild(talentP)
    
    //PIC
    
    let picP = document.createElement('img')
    picP.src = pic
    document.getElementById('saved-pic').appendChild(picP)

    /* <----- AXIOS POST REQUEST -----> */ 
    
    axios.post("/api/keepcharacter",)
    console.log(charObj)
    .then(res => console.log(res))
    .catch(err => console.log(err))

}

createBtn.addEventListener("click", createChar)

//Need to create a function to hide/reveal things