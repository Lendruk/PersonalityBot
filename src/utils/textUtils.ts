const charDict : { [ index: string ]: string } = {
    "à": "a",
    "á": "a",
    "â": "a",
    "ã": "a",
    "å": "a",
    "è": "e",
    "é": "e",
    "ê": "e",
    "ò": "o",
    "ó": "o",
    "õ": "o",
    "ô": "o"

}
export function cleanSpecialCharacters(str: string): string {
    return str.toLowerCase()
    .replace(/[^\w ]/g, char => charDict[char] || char)
}