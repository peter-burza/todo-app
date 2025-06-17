export function isStringEmpty(str) {
    const isStrEmpty = !str.replaceAll(' ', '')
    if (isStrEmpty) return true
    return false
}