import { Card } from "./card";
import { Player, StartGamePlayers } from "./player";

export enum GameMode {
	SINGLE_PLAYER = "single_player",
	MULTI_PLAYER = "multi_player",
}

export enum GameStatus {
	NOT_STARTED = "not_started",
	IN_PROGRESS = "in_progress",
	FINISHED = "finished",
}

export interface Game {
	/** Game players information */
	players: Player[];
	/** Game cards information */
	cards: Card[];
	/** Flips single card */
	flipCard: (cardId: number) => void;
	/** Starts the game */
	startGame: (players: StartGamePlayers) => void;
	/** Restarts the game */
	restartGame: () => void;
	/** Called when the game is ended */
	endGame: () => void;
	/** Game winner ids */
	winnerIds: number[];
	/** The Player object who needs to make a move */
	currentPlayer: Player | null;
	/** The game status */
	gameStatus: GameStatus;
}
