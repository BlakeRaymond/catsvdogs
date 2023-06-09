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

//SAVED

let saved = document.getElementById('saved-chars')

//HP COUNTER

const playerHpText = document.getElementById('hp')
const compHpText = document.getElementById('comp-health')

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
                keepBtn.removeEventListener("click", createCharEventHandlerFunction)
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
        .then((res) => {

            if (res.data.HP) {
                // console.log(res.data.HP)
                compHpText.textContent = `${res.data.HP}/100`
                alert(`Your ${attack} attack damaged the computer! The computers new health level is ${res.data.HP}! Now, it's the computers turn!`)
                compAtt()
            } else if (res.data === 'zero') {
                alert(`Your ${attack} missed! The computer will now counter.`)
                compAtt()
            }         
            else {
                compHpText.textContent = `DEAD`
                resetComp()
                if(confirm(res.data)){
                    window.location.reload();
            }
        }})
        .catch(err => console.log(err))
}

const compAtt = () => {

    let attacks = ['melee', 'ranged', 'magic']
    let attIndex = Math.floor(Math.random() * attacks.length)
    let thisAttack = attacks[attIndex]

    axios.put(`/api/compattack:${thisAttack}`)
        .then((res) => {
            if (res.data.HP) {
                playerHpText.textContent = `${res.data.HP}/100`
                alert(`The computer's ${thisAttack} attack harmed you! Your new health level is ${res.data.HP}! Your turn!`)
            } else if (res.data === 'zero') {
                alert(`The computer's ${thisAttack} missed! Lucky you. Attack!`)
            }         
            else {
                playerHpText.textContent = `DEAD`
                resetComp()
                if(confirm(res.data)){
                    window.location.reload(); 
                }
            }
        })
}

const resetComp = () => {
    axios.get("/api/reset")
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
}

const getFighters = () => {
axios.get("/api/getfighters")
.then((res) => {

    for (let i=0; i < res.data.length; i++) {

        let charNameP = document.createElement('p')
        let charHomelandP = document.createElement('p')
        let charTalentP = document.createElement('p')
        let charPicP = document.createElement('p')

        charNameP.textContent = res.data[i].char_name
        charHomelandP.textContent = res.data[i].char_homeland
        charTalentP.textContent = res.data[i].char_talent
        charPicP.textContent = res.data[i].char_pic

        saved.appendChild(charNameP)
        saved.appendChild(charHomelandP)
        saved.appendChild(charTalentP)
        saved.appendChild(charPicP)
    }
})
.catch((err) => console.log(err))
};


// EVENT LISTENERS :

//MAIN BUTTONS

createBtn.addEventListener("click", createChar)
retryBtn.addEventListener("click", createChar)

// FIGHT BUTTONS

playerMeleeBtn.addEventListener("click", fightChar)
playerRangedBtn.addEventListener("click", fightChar)
playerMagicBtn.addEventListener("click", fightChar)