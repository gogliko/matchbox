/**
 * Shuffles array
 * @param array
 */
export const shuffleArray = <T>(array: T[]): T[] =>
	array
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);

/**
 * Finds difference between two arrays with id
 * @param left
 * @param right
 */
export const diffById = <T extends { id: unknown }>(
	left: T[],
	right: T[]
): T[] => {
	const rightIds = right.map((rightItem) => rightItem.id);
	return left.filter((leftItem) => !rightIds.includes(leftItem.id));
};
