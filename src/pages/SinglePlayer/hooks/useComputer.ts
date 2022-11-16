import { useEffect, useState } from "react";
import {
	Card,
	CardStatus,
	GameStatus,
	Player,
	PlayerType,
} from "../../../game";
import { diffById } from "../../../utils/helper";

const COMPUTER_MEMORY = 5;
/**
 * With useComputer hook computer plays against user.
 * We are listening different events and based on that information
 * we are calculating next moves for computer.
 *
 * At this moment we have only one mode for computer ( medium )
 * but later can be added more.
 *
 * @param cards
 * @param currentPlayer
 * @param gameStatus
 * @param flipCard
 */
export const useComputer = (
	cards: Card[],
	currentPlayer: Player | null,
	gameStatus: GameStatus,
	flipCard: (cardId: number) => void
): void => {
	const [savedCards, setSavedCards] = useState<Card[]>([]);
	const [moveCards, setMoveCards] = useState<Card[]>([]);
	// Listen card updates (E.g. opened/matched/closed)
	// and save cards in state for later usage
	useEffect(() => {
		// Get cards which is opened
		const openedCards = cards.filter(
			(card) => card.status === CardStatus.OPENED
		);
		// Get cards which is matched
		const matchedCards = cards.filter(
			(card) => card.status === CardStatus.MATCHED
		);
		// Get unique cards from our saved state and from matched, opened cards
		const filteredSavedCards = diffById(savedCards, [
			...openedCards,
			...matchedCards,
		]);
		// We are changing order for saved cards
		// moving last opened cards at last position
		const saveCards = [...filteredSavedCards, ...openedCards];
		// TODO this can be improved. (E.g. Hard,Medium,Easy levels)
		// saveCards.slice(-n) means we are saving the last n cards for the computer
		// to try and match later from that cards
		setSavedCards(saveCards.slice(-COMPUTER_MEMORY));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cards]);

	// Listen when computer memory (saved cards) is updated
	// for the computer this means there is something new happening and
	// we are checking if that time we need to calculate next move cards to be ready
	// for the next move
	useEffect(() => {
		// We are checking if the game is not in progress and not executing anything
		// this is needed when the last move is made by the computer
		// and computer memory is updated
		if (gameStatus !== GameStatus.IN_PROGRESS) {
			return;
		}
		// We are checking if it's computer turn
		if (currentPlayer?.type === PlayerType.COMPUTER) {
			// We are checking if one card is opened, and we still need
			// to open the second card, we are waiting for that
			// and not executing the move cards calculation
			const isOpened = cards.filter(
				(card) => card.status === CardStatus.OPENED
			);
			if (isOpened.length) {
				return;
			}
			// Update our next move cards
			setMoveCards(calculateFlipCards(cards, savedCards));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [savedCards]);

	// Listen when our move cards is calculated and ready to be flipped
	useEffect(() => {
		if (!moveCards.length) {
			return;
		}
		// Using timeout to delay card opening, it will be open after 0.5sec
		setTimeout(() => {
			flipCard(moveCards[0].id);
		}, 500);
		// Using timeout to delay the second card opening, it will be open after 0.7sec
		setTimeout(() => {
			flipCard(moveCards[1].id);
		}, 700);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [moveCards]);

	// Detect which cards could computer flip for each move
	const calculateFlipCards = (cards: Card[], savedCards: Card[]) => {
		// Get which cards are closed (face-down)
		const closedCards = cards.filter(
			(card) => card.status === CardStatus.CLOSED
		);
		// Get unique cards which not known by the computer
		// unknown cards are cards that haven't open by anyone.
		const unknownCards = diffById(closedCards, savedCards);

		// cache is temp information storage for computer
		// which is used to keep matched cards for checking purposes
		const cache: Record<string, Card> = {};
		// Iterate saved cards to try to find if the computer can find similar cards there
		for (const savedCard of savedCards) {
			if (cache[savedCard.name]) {
				return [savedCard, cache[savedCard.name]];
			} else {
				cache[savedCard.name] = savedCard;
			}
		}

		// Continues if the computer can't find a similar cards in saved cards.
		// Get a random card from unknown cards
		const firstCardIndex = Math.floor(unknownCards.length * Math.random());
		const firstCard = unknownCards[firstCardIndex];
		// Checking if the randomly taken card matched (names are the same) in our cache we are returning both
		if (cache[firstCard.name]) {
			return [firstCard, cache[firstCard.name]];
		}
		// Get second unknown cardIndex
		const secondCardIndex = (firstCardIndex + 1) % unknownCards.length;
		// Return two unknown cards
		return [firstCard, unknownCards[secondCardIndex]];
	};
};
