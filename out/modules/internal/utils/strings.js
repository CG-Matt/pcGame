export { VOWELS, startsWithVowel };
const VOWELS = "aeiouAEIOU";
function startsWithVowel(string) {
    return VOWELS.includes(string.charAt(0));
}
