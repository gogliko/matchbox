export enum PlayerType {
	COMPUTER = "computer",
	USER = "user",
}
export type StartGamePlayers = Pick<Player, "name" | "type">[];
export interface Player {
	/** Player ID */
	id: number;
	/** Player name */
	name: string;
	/** Player color hex*/
	color: string;
	/** Player points gained by card matches */
	point: number;
	/** Player type */
	type: PlayerType;
}
