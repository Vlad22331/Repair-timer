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
    console.log(infoMass);
    const test1 =  infoMass.map(item => item.distance)
    console.log(test1);
    const test = test1.reduce((accumulator, currentValue) => accumulator = accumulator+currentValue);
    console.log(test);
}

renderInfo()