import { useCallback, useState } from "react";
import { Player, StartGamePlayers } from "../types";
import { userColors } from "../utils";

interface UsePlayer {
	/** Game players data */
	players: Player[];
	/** Generates players and set player turn */
	initPlayers: (gamePlayers: StartGamePlayers) => void;
	/** Increments user points based on playerId */
	incrementUserPoint: (playerId: number) => void;
	/** Moves turn to next player */
	moveTurnToNextPlayer: () => void;
	/** Calculates winners based on player points*/
	calculateWinners: () => number[];
	/** The Player object who needs to make a move */
	currentPlayer: Player | null;
}

/**
 * Makes game player related actions
 */
export const usePlayer = (): UsePlayer => {
	const [players, setPlayers] = useState<Player[]>([]);
	const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);

	const initPlayers = useCallback((gamePlayers: StartGamePlayers) => {
		const playersData = gamePlayers.map(({ name, type }, index) => ({
			id: index,
			color: userColors[index],
			point: 0,
			name,
			type,
		}));
		setPlayers(playersData);
		setCurrentPlayerIndex(0);
	}, []);

	const incrementUserPoint = useCallback((playerId: number) => {
		setPlayers((players) =>
			players.map((player) =>
				player.id === playerId
					? {
							...player,
							point: player.point + 1,
					  }
					: player
			)
		);
	}, []);

	const moveTurnToNextPlayer = useCallback(() => {
		// Set player index whose turn is currently
		setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
	}, [currentPlayerIndex, players.length]);

	const calculateWinners = useCallback(() => {
		return players
			.reduce((acc, player) => {
				// If we have no player for first time we are setting by default to compare later
				if (!acc.length) {
					return [player];
				}

				if (acc[0].point < player.point) {
					return [player];
				}

				if (acc[0].point === player.point) {
					return [...acc, player];
				}
				return acc;
			}, [] as Player[])
			.map((player) => player.id);
	}, [players]);

	return {
		initPlayers,
		incrementUserPoint,
		moveTurnToNextPlayer,
		players,
		calculateWinners,
		currentPlayer: players?.[currentPlayerIndex] ?? null,
	};
};
