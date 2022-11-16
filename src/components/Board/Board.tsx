import { FC, ReactNode } from "react";
import winnerIcon from "../../assets/images/winner-icon.svg";
import { GameStatus, Player } from "../../game";
import * as styles from "./style";

interface BoardProps {
	/** Card information */
	cards: ReactNode;
	/** The game players */
	players: Player[];
	/** The game status */
	gameStatus: GameStatus;
	/** The game winners */
	winnerIds: number[];
	/** The Player object who needs to make a move */
	currentPlayer: Player | null;
	/** Fires when clicked on the restart button */
	onRestartClick: () => void;
}

/**
 * Board component is drawing board with passed cards components.
 * @param cards
 * @param players
 * @param gameStatus
 * @param winnerIds
 * @param currentPlayer
 * @param onRestartClick
 */
const Board: FC<BoardProps> = ({
	cards,
	players,
	gameStatus,
	winnerIds,
	currentPlayer,
	onRestartClick,
}) => {
	const gameFinished = gameStatus === GameStatus.FINISHED;

	return (
		<>
			<styles.PlayersInfoWrapper>
				<styles.PlayersInfoInner>
					{players.map((player) => (
						<styles.PlayersInfoItem
							key={player.id}
							color={player.color}
							active={player.id === currentPlayer?.id && !gameFinished}
						>
							<span>{player.name}</span>
							{player.point}
							{winnerIds.includes(player.id) && (
								<img src={winnerIcon} alt="winner-icon" />
							)}
						</styles.PlayersInfoItem>
					))}
				</styles.PlayersInfoInner>
			</styles.PlayersInfoWrapper>

			<styles.PlayAgainContainer>
				{gameFinished && (
					<styles.PlayAgainButton onClick={onRestartClick}>
						Play Again
					</styles.PlayAgainButton>
				)}
			</styles.PlayAgainContainer>

			<styles.BoardWrapper>{cards}</styles.BoardWrapper>
		</>
	);
};

export default Board;
