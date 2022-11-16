import Board from "../../components/Board";
import ImageryCard from "../../components/ImageryCard";
import { GameStatus } from "../../game";
import { useGame } from "../../game/Game";
import usePrompt from "../../hooks/usePrompt";

/**
 * Multiplayer Page
 */
const MultiPlayerPage = () => {
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

	// Used to detect when the user moves from the game page
	// and execute local function which ends the game
	usePrompt(
		"Do you want to leave? The game will end",
		gameStatus === GameStatus.IN_PROGRESS,
		endGame
	);

	const cardElements = cards.map((card) => (
		<ImageryCard key={card.id} card={card} onCardClick={flipCard} />
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
export default MultiPlayerPage;
