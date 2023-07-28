export function formDataToObject(formData: FormData) {
    const object: Record<string, string> = {}
    for (const [key, value] of formData.entries()) {
        object[key] = value
    }
    return object
}