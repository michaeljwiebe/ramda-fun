function caesarCipher(s, k) {
	var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var encryptedStr = '';
	for (let letter of s) {
		var nextLetter;
		var capital = letter.toLowerCase() !== letter;
		var idx = alphabet.indexOf(letter.toLowerCase());
		if (idx === -1) {
			nextLetter = capital ? letter.toUpperCase() : letter;
		} else {
			var encryptedIdx = idx + k >= 26 ? idx + k - 26 : idx + k; 
			nextLetter = capital ? alphabet[encryptedIdx].toUpperCase() : alphabet[encryptedIdx];
		}
		encryptedStr += nextLetter;
	}
	return encryptedStr;
}

console.log(caesarCipher("Always-Look-on-the-Bright-Side-of-Life", 5));
// ➞ "Fqbfdx-Qttp-ts-ymj-Gwnlmy-Xnij-tk-Qnkj
console.log(caesarCipher("A friend in need is a friend indeed", 25));
// ➞ "U zlcyhx ch hyyx cm u zlcyhx chxyyx"
console.log(caesarCipher("middle-Outz", 2)); // ➞ "okffng-Qwvb"