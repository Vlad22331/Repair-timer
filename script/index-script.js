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
}

function changeIndexPage (currentDistance) {
    createLocalStoreg(currentDistance)
    const spanMass = document.getElementsByClassName("span")

    let timeToRepair = [
        localStorage.getItem("chainLubricationTime"),
        localStorage.getItem("chainChengeTime"),
        localStorage.getItem("groupsetChangeTime"),
        localStorage.getItem("checkingForkTime"),
        localStorage.getItem("forkLubricationTime"),
        localStorage.getItem("checkBreakTime"),
        localStorage.getItem("ropesChangeTime")
    ]

    for (let i = 0; i < spanMass.length; i++) {
        spanMass[i].innerHTML = `${timeToRepair[i]} км.`
    }
}

function createLocalStoreg (currentDistance) {
    if(!localStorage.getItem("chainLubricationTime")){
        if(document.querySelector(".chain-lubrication")){
            localStorage.setItem("chainLubricationTime", document.querySelector(".chain-lubrication").value || 100)
            localStorage.setItem("chainChengeTime", document.querySelector(".chain-chenge").value || 3000)
            localStorage.setItem("groupsetChangeTime", document.querySelector(".groupset-change").value || 3000)
            localStorage.setItem("checkingForkTime", document.querySelector(".checking-fork").value || 500)
            localStorage.setItem("forkLubricationTime", document.querySelector(".fork-lubrication").value || 3000)
            localStorage.setItem("checkBreakTime", document.querySelector(".check-break").value || 500)
            localStorage.setItem("ropesChangeTime", document.querySelector(".ropes-change").value || 3000)
        }
        else{
            localStorage.setItem("chainLubricationTime", 100)
            localStorage.setItem("chainChengeTime", 3000)
            localStorage.setItem("groupsetChangeTime",  3000)
            localStorage.setItem("checkingForkTime",  500)
            localStorage.setItem("forkLubricationTime",  3000)
            localStorage.setItem("checkBreakTime",  500)
            localStorage.setItem("ropesChangeTime",  3000)
        }
    }
    else{
        localStorage.setItem("chainLubricationTime", localStorage.getItem("chainLubricationTime") - (currentDistance - localStorage.getItem("chainLubrication")))
        localStorage.setItem("chainChengeTime", localStorage.getItem("chainChengeTime") - (currentDistance - localStorage.getItem("chainChenge")))
        localStorage.setItem("groupsetChangeTime", localStorage.getItem("groupsetChangeTime") - (currentDistance - localStorage.getItem("groupsetChange")))
        localStorage.setItem("checkingForkTime", localStorage.getItem("checkingForkTime") - (currentDistance - localStorage.getItem("checkingFork")))
        localStorage.setItem("forkLubricationTime", localStorage.getItem("forkLubricationTime") - (currentDistance - localStorage.getItem("forkLubrication")))
        localStorage.setItem("checkBreakTime", localStorage.getItem("checkBreakTime") - (currentDistance - localStorage.getItem("checkBreak")))
        localStorage.setItem("ropesChangeTime", localStorage.getItem("ropesChangeTime") - (currentDistance - localStorage.getItem("ropesChange")))
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
            spanMass[i].innerHTML = `${timeToRepair[i]} км.`
        })
    }
}

renderInfo()
// localStorage.clear()