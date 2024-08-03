const repairTime = [
    "chainLubricationTime",
    "chainChengeTime",
    "groupsetChangeTime",
    "checkingForkTime",
    "forkLubricationTime",
    "checkBreakTime",
    "ropesChangeTime",
]

const repair = [
    "chainLubrication",
    "chainChenge",
    "groupsetChange",
    "checkingFork",
    "forkLubrication",
    "checkBreak",
    "ropesChange",
]

const getAccessToken = async () => {
    auth_link = "https://www.strava.com/oauth/token"
    const responce = await fetch(auth_link,{
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'

        },

        body: JSON.stringify({

            client_id: '131254',
            client_secret: '227eb2a91bdb6d3e64f2c8d4fc7d5a0c3d1a31d7',
            refresh_token: '406d88531b78900236915a54620d535233edccb6',
            grant_type: 'refresh_token'
        })
    });
    const result = await responce.json()
    return result.access_token
}

async function getInfo  () {
    const accessToken = await getAccessToken()
    const responce = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&per_page=100`)
    const info = responce.json()
    return info
}

async function renderInfo () {
    const infoMass = await getInfo()
    const distance =  infoMass.map(item => item.distance)
    const totalDistance = Math.round(distance.reduce((accumulator, currentValue) => accumulator = accumulator+currentValue))/1000
    if(!localStorage.getItem("firstTotalDistance")){
        localStorage.setItem("firstTotalDistance", totalDistance)
    }
    changeIndexPage(totalDistance)
    // changeIndexPage(2300)
}

function changeIndexPage (currentDistance) {
    renderInput()
    createLocalStoreg(currentDistance)
    const spanMass = document.getElementsByClassName("span")

    for (let i = 0; i < spanMass.length; i++) {
        spanMass[i].innerHTML = `${localStorage.getItem(repairTime[i]) - (currentDistance - localStorage.getItem(repair[i]))} км.`
    }
}

function renderInput () {
    if(document.querySelector(".input")){
        const inputMass = document.getElementsByClassName("input")
        const inputClassMass = [
            ".chain-lubrication",
            ".chain-chenge",
            ".groupset-change",
            ".checking-fork",
            ".fork-lubrication",
            ".check-break",
            ".ropes-change",
        ]

        for(let i=0; i < inputMass.length; i++){
            inputMass[i].addEventListener("change", () => {
                localStorage.setItem(repairTime[i], document.querySelector(inputClassMass[i]).value)
            })
        }

        // localStorage.setItem("chainLubricationTime", document.querySelector(".chain-lubrication").value)
        // localStorage.setItem("chainChengeTime", document.querySelector(".chain-chenge").value)
        // localStorage.setItem("groupsetChangeTime", document.querySelector(".groupset-change").value)
        // localStorage.setItem("checkingForkTime", document.querySelector(".checking-fork").value)
        // localStorage.setItem("forkLubricationTime", document.querySelector(".fork-lubrication").value)
        // localStorage.setItem("checkBreakTime", document.querySelector(".check-break").value)
        // localStorage.setItem("ropesChangeTime", document.querySelector(".ropes-change").value)
    }
}

function createLocalStoreg (currentDistance) {
    localStorage.setItem("totalDistance", currentDistance)
    if(!localStorage.getItem("chainLubricationTime")){
        localStorage.setItem("chainLubricationTime", 100)
        localStorage.setItem("chainChengeTime", 3000)
        localStorage.setItem("groupsetChangeTime",  3000)
        localStorage.setItem("checkingForkTime",  500)
        localStorage.setItem("forkLubricationTime",  3000)
        localStorage.setItem("checkBreakTime",  500)
        localStorage.setItem("ropesChangeTime",  3000)
    }

    if(!localStorage.getItem("chainLubrication")){
        localStorage.setItem("chainLubrication", currentDistance)
        localStorage.setItem("chainChenge", currentDistance)
        localStorage.setItem("groupsetChange", currentDistance)
        localStorage.setItem("checkingFork", currentDistance)
        localStorage.setItem("forkLubrication", currentDistance)
        localStorage.setItem("checkBreak", currentDistance )
        localStorage.setItem("ropesChange", currentDistance)
    }
}

function renderBtn () {
    const btnMass = document.getElementsByClassName("btn")
    const spanMass = document.getElementsByClassName("span")        

    for(let i =0; i<btnMass.length; i++){
        btnMass[i].addEventListener("click", () =>{                                                
            localStorage.setItem(repair[i], localStorage.getItem("totalDistance"))
            spanMass[i].innerHTML = `${localStorage.getItem(repairTime[i])} км.`
        })
    }
}

renderInfo()
renderBtn()
// localStorage.clear() 