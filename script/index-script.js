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

function changeIndexPage (CurrentDistance) {

    const spanMass = document.getElementsByClassName("span")

    let timeToRepair = [
        localStorage.getItem("chainLubrication") || 100,
        localStorage.getItem("chainChenge") || 3000,
        localStorage.getItem("groupsetChange") || 3000,
        localStorage.getItem("checkingFork") || 500,
        localStorage.getItem("forkLubrication") || 3000,
        localStorage.getItem("checkBreak") || 500,
        localStorage.getItem("ropesChange") || 3000
    ]

    for (let i = 0; i < spanMass.length; i++) {
        console.log(spanMass[i].innerHTML = `${timeToRepair[i]} км.`)
    }
}

renderInfo()
