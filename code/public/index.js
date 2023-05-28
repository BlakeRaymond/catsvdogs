// MAIN BUTTONS

const createBtn = document.getElementById('create-char')
const keepBtn = document.getElementById('keep')
const retryBtn = document.getElementById('retry')
const fightBtn = document.getElementById('fight')

// FIGHT BUTTONS

const playerMeleeBtn = document.getElementById('player-melee')
const playerRangedBtn = document.getElementById('player-ranged')
const playerMagicBtn = document.getElementById('player-magic')

// MAIN DIVS

const centerDiv = document.getElementById('center')
const leftDiv = document.getElementById('left')
const rightDiv = document.getElementById('right')
const outcome = document.getElementById("outcome")
const innerCont = document.getElementById("inner-button-cont")

//CHARACTER DIVS

const createPicCont = document.getElementById("create-cont-pic")
const createNameCont = document.getElementById("create-name")
const createHomelandCont = document.getElementById("create-homeland")
const createTalentCont = document.getElementById("create-talent")

const compPic = document.getElementById('comp-pic')
const compName = document.getElementById('comp-name')
const compHomeland = document.getElementById('comp-homeland')
const compTalent = document.getElementById('comp-talent')

// MISC
let createCharEventHandlerFunction

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

        if (createCharEventHandlerFunction !== undefined) {
            keepBtn.removeEventListener("click",  createCharEventHandlerFunction)
        }
        
        createCharEventHandlerFunction = () => {

            rightDiv.classList.remove("hide")
            leftDiv.classList.remove("hide")

            // Wanted to reveal these divs/buttons, but maybe they're too deeply nested/unreachable?
            
            // fightBtn.classList.add("reveal")
            // outcome.classList.add("reveal")
            // innerCont.classList.add("reveal")


            keepChar(res.data), compChar()
        }

        keepBtn.addEventListener("click", createCharEventHandlerFunction)

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
    
    axios.post("/api/keepcharacter", charObj)
    .then(res => alert(res.data))
    .catch(err => console.log(err))

}

const compChar = () => {
    axios.get("/api/createcharacter")
    .then(res => {

        //COMP NAME

        let compNameText = document.createElement('p')
        compNameText.textContent = res.data.name
        compName.appendChild(compNameText)

        //COMP HOMELAND

        let compHomelandText = document.createElement('p')
        compHomelandText.textContent = res.data.homeland
        compHomeland.appendChild(compHomelandText)

        //COMP TALENT

        let compTalentText = document.createElement('p')
        compTalentText.textContent = res.data.talent
        compTalent.appendChild(compTalentText)

        //COMP PIC

        let compPicImg = document.createElement('img')
        compPicImg.src = res.data.pic
        compPic.appendChild(compPicImg)
    })
}

const fightChar = (e) => {

    const attack = e.srcElement.parentElement.id

    axios.put(`/api/fightcharacter:${attack}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))

}


// EVENT LISTENERS :

//MAIN BUTTONS

createBtn.addEventListener("click", createChar)
retryBtn.addEventListener("click", createChar)

// FIGHT BUTTONS

playerMeleeBtn.addEventListener("click", fightChar)
playerRangedBtn.addEventListener("click", fightChar)
playerMagicBtn.addEventListener("click", fightChar)