import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { useCard, usePlayer } from "./hooks";

import { CardStatus, Game, GameStatus, StartGamePlayers } from "./types";

const gameContext = createContext<Game>({
	players: [],
	cards: [],
	flipCard: () => {
		// NOOP
	},
	startGame: () => {
		// NOOP
	},
	restartGame: () => {
		// NOOP
	},
	endGame: () => {
		// NOOP
	},
	winnerIds: [],
	currentPlayer: null,
	gameStatus: GameStatus.NOT_STARTED,
});

/**
 * The game provider provides methods/values which is used by other components
 * to read/update game-related information
 */
export const useGameProvider = (): Game => {
	const [winnerIds, setWinnerIds] = useState<number[]>([]);
	const [gameStatus, setGameStatus] = useState<GameStatus>(
		GameStatus.NOT_STARTED
	);
	const {
		initPlayers,
		incrementUserPoint,
		calculateWinners,
		moveTurnToNextPlayer,
		currentPlayer,
		players,
	} = usePlayer();
	const { generateCards, updateCard, flipCard, cards } = useCard();

	const startGame = useCallback(
		(startGamePlayers: StartGamePlayers, boardSize = 16) => {
			setWinnerIds([]);
			initPlayers(startGamePlayers);
			generateCards(boardSize);
			setGameStatus(GameStatus.IN_PROGRESS);
		},
		[generateCards, initPlayers]
	);

	const restartGame = useCallback(() => {
		const playerNames = players.map(({ name, type }) => ({
			name,
			type,
		}));
		const boardSize = cards.length;
		startGame(playerNames, boardSize);
	}, [cards.length, players, startGame]);

	const endGame = useCallback(() => {
		setGameStatus(GameStatus.FINISHED);
		// Calculates winners and returns ID
		const winnerIds = calculateWinners();
		setWinnerIds(winnerIds);
	}, [calculateWinners]);

	useEffect(() => {
		// Filter cards to get which ones are opened for later usage
		const openedCards = cards.filter(
			(card) => card.status === CardStatus.OPENED
		);

		// We are checking if the current player is not exist
		// or 2 cards are not opened, because we need to have 2 cards opened
		// to check if cards matched or not
		if (openedCards.length !== 2 || !currentPlayer) {
			return;
		}
		const [firstCard, secondCard] = openedCards;

		// We are checking if opened cards matched
		// if it's matched then we are updating cards with matcherId and matcherColor
		// and increasing user points by 1
		if (firstCard.name === secondCard.name) {
			// Using timeout to delay card hiding, it will be hidden after 2 sec
			setTimeout(() => {
				updateCard(firstCard.id, {
					status: CardStatus.MATCHED,
					matcherId: currentPlayer.id,
					matcherColor: currentPlayer.color,
				});
				updateCard(secondCard.id, {
					status: CardStatus.MATCHED,
					matcherId: currentPlayer.id,
					matcherColor: currentPlayer.color,
				});
				incrementUserPoint(currentPlayer.id);
			}, 2000);
		} else {
			// If opened cards is not matched move turn to next player and close cards.
			// Using timeout to delay card hiding, it will be hidden after 2 sec
			setTimeout(() => {
				moveTurnToNextPlayer();
				updateCard(firstCard.id, { status: CardStatus.CLOSED });
				updateCard(secondCard.id, { status: CardStatus.CLOSED });
			}, 2000);
		}
	}, [
		cards,
		currentPlayer,
		incrementUserPoint,
		moveTurnToNextPlayer,
		players,
		players.length,
		updateCard,
	]);

	// Listen to card updates and determine when the game needs to be ended
	useEffect(() => {
		// Find if there is any card which is not matched yet
		const unresolvedCard = cards.find(
			(card) => card.status !== CardStatus.MATCHED
		);
		// We are checking if there are no unmatched cards
		// this means we need to finish the game
		if (!unresolvedCard) {
			endGame();
		}
	}, [cards, endGame]);

	return {
		players,
		cards,
		startGame,
		endGame,
		restartGame,
		flipCard,
		winnerIds,
		currentPlayer,
		gameStatus,
	};
};

/**
 * Game context provider which wraps main app
 * @param children
 */
export const ProvideGame = ({
	children,
}: {
	children?: ReactNode | undefined;
}) => {
	const game = useGameProvider();
	return <gameContext.Provider value={game}>{children}</gameContext.Provider>;
};

export const useGame = () => useContext(gameContext);
