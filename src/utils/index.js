export function isStringEmpty(str) {
    const isStrEmpty = !str.replaceAll(' ', '')
    if (isStrEmpty) return true
    return false
}

export function handleKeyDown(event, action) {
        if (event.key === 'Enter') {
            action()
        }
    }