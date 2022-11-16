import { useCallback, useState } from "react";
import { shuffleArray } from "../../utils/helper";
import { Card, CardStatus } from "../types";
import { generateRandomEmojis } from "../utils";

interface UseCard {
	/** Game cards data */
	cards: Card[];
	/** Generates game cards based on board size */
	generateCards: (boardSize: number) => void;
	/** Flips card by cardId */
	flipCard: (cardId: number) => void;
	/** Updates card data */
	updateCard: (cardId: number, updatedData: Partial<Card>) => void;
}

/**
 * Makes card related actions
 */
export const useCard = (): UseCard => {
	const [cards, setCards] = useState<Card[]>([]);

	const generateCards = useCallback((boardSize: number) => {
		// We are getting emojies based on board size and generate cards
		const emojis = generateRandomEmojis(boardSize / 2);
		const cards = emojis.flatMap<Card>((emoji, i) => [
			{
				id: i * 2,
				name: `card_${i}`,
				imagery: emoji,
				status: CardStatus.CLOSED,
				matcherColor: null,
				matcherId: null,
			},
			{
				id: i * 2 + 1,
				name: `card_${i}`,
				imagery: emoji,
				status: CardStatus.CLOSED,
				matcherColor: null,
				matcherId: null,
			},
		]);
		setCards(shuffleArray(cards));
	}, []);

	const updateCard = useCallback(
		(cardId: number, updatedData: Partial<Card>) => {
			setCards((cards) =>
				cards.map((card) =>
					card.id === cardId
						? {
								...card,
								...updatedData,
						  }
						: card
				)
			);
		},
		[]
	);

	const flipCard = useCallback(
		(cardId: number) => {
			const card = cards.find((card) => card.id === cardId);

			// For security purposes, we are checking if the card is already matched
			// to don't execute flipcard
			if (card?.status === CardStatus.MATCHED) {
				return;
			}

			// Filter cards to get which ones are opened for later usage
			const openedCards = cards.filter(
				(card) => card.status === CardStatus.OPENED
			);

			// We are checking if 2 cards are opened already deny open 3rd one
			if (openedCards.length === 2) {
				return;
			}
			updateCard(cardId, { status: CardStatus.OPENED });
		},
		[cards, updateCard]
	);

	return {
		generateCards,
		updateCard,
		flipCard,
		cards,
	};
};
