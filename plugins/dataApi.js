import { unWrap, getErrorResponse } from "../utils/fetchUtils"

export default function ({$config}, inject) {
    // const appId= "ETY5PJ96FC"
    // const apiKey= "08a81fe77e13588b7a54408321b7b1b8"
    const headers = {
        'X-Algolia-API-Key': $config.algolia.key,
        'X-Algolia-Application-Id': $config.algolia.appId
    }
    inject('dataApi', {
        getHome,
        getReviewsByHomeId,
        getUserByHomeId,
        getHomesByLocation
    })
    async function getHome(homeId){
        try{
        return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }
        )) 
        }catch(error){
            return getErrorResponse(error)
        }
    }
    async function getReviewsByHomeId(homeId){
        try {
        return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/reviews/query`, {
            headers, 
            method: 'POST',
            // post is used for large data or things like forms
            // set it to method
            body: JSON.stringify({
                filters: `homeId:${homeId}`,
                hitsPerPage: 6,
                attributesToHighlight: [],
            })
        }))
        }catch(error){
            return getErrorResponse(error)
        }
    }
    async function getUserByHomeId(homeId){
        try {
        return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/users/query`, {
            headers, 
            method: 'POST',
            // post is used for large data or things like forms
            // set it to method
            body: JSON.stringify({
                filters: `homeId:${homeId}`,
                attributesToHighlight: [],
            })
        }))
        }catch(error){
            return getErrorResponse(error)
        }
    }
    async function getHomesByLocation(lat, lng, radiusInMeters = 1500){
        try {
        return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/query`, {
            headers, 
            method: 'POST',
            // post is used for large data or things like forms
            // set it to method
            body: JSON.stringify({
                aroundLatLng: `${lat},${lng}`,
                aroundRadius: radiusInMeters,
                hitsPerPage: 10,
                attributesToHighlight: [],
            })
        }))
        }catch(error){
            return getErrorResponse(error)
        }
    }
    
}

// async function getHome(homeId){
//     const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
//         headers:{
//             'X-Algolia-API-Key': apiKey,
//             'X-Algolia-Application-Id': appId,
//         }
//     })
//     const json = await response.json()
//     return json
// } 