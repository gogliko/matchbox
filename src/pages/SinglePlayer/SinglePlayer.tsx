import { useCallback } from "react";
import Board from "../../components/Board";
import ImageryCard from "../../components/ImageryCard";
import { GameStatus, PlayerType } from "../../game";
import { useGame } from "../../game/Game";
import usePrompt from "../../hooks/usePrompt";
import { useComputer } from "./hooks";

/**
 * SinglePlayer Page
 */
const SinglePlayer = () => {
	const {
		gameStatus,
		cards,
		players,
		winnerIds,
		currentPlayer,
		restartGame,
		flipCard,
		endGame,
	} = useGame();

	useComputer(cards, currentPlayer, gameStatus, flipCard);

	const handleCardClick = useCallback(
		(cardId: number) => {
			// Check if current player is user to execute flipCard
			// in case if it is a computer we are ignoring user click.
			if (currentPlayer?.type === PlayerType.USER) {
				flipCard(cardId);
			}
		},
		[currentPlayer?.type, flipCard]
	);

	// Used to detect when the user moves from the game page
	// and execute local function which ends the game
	usePrompt(
		"Do you want to leave? The game will end",
		gameStatus === GameStatus.IN_PROGRESS,
		endGame
	);

	const cardElements = cards.map((card) => (
		<ImageryCard key={card.id} card={card} onCardClick={handleCardClick} />
	));
	return (
		<Board
			cards={cardElements}
			players={players}
			gameStatus={gameStatus}
			winnerIds={winnerIds}
			currentPlayer={currentPlayer}
			onRestartClick={restartGame}
		/>
	);
};
export default SinglePlayer;
