/**
 * Generate random emoji unicodes
 * Max return array length is 64
 * @param count
 */
export const generateRandomEmojis = (count: number) => {
	const startEmojiDec = 128000;
	const endEmojiDec = 128064;
	const size = endEmojiDec - startEmojiDec;
	const index = Math.floor(Math.random() * size);

	return new Array(count).fill(null).map((_, i) => {
		return `&#${startEmojiDec + ((index + i) % size)};`;
	});
};
