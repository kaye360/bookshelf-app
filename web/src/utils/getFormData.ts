


export function getFormData(selector : string) {

    const el = document.querySelector( selector )

    if( !(el instanceof HTMLFormElement) ) {
        throw new Error('Invalid form selector')
    }

    const formData        = new FormData( el )
    const formDataEntries = formData.entries()
    const formDataObj     = Object.fromEntries( formDataEntries )

    return formDataObj
}