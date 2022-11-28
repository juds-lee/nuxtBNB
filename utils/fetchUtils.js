export async function unWrap(response) {
    // to prepare an object to return to a property page
    const json = await response.json()
    const { ok, status, statusText } = response
    // response restructuring to return all these properties to detect if error occured and add to object
    console.log(json)
    return {
        json,
        ok,
        status,
        statusText
    }
}
export function getErrorResponse(error){
    return {
        ok: false,
        status: 500,
        statusText: error.message,
        json: {}
    }
}