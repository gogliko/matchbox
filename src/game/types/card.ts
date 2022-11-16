export enum CardStatus {
	MATCHED = "matched",
	OPENED = "opened",
	CLOSED = "closed",
}

export interface Card {
	/** Card ID */
	id: number;
	/** Card Name */
	name: string;
	/** Card image */
	imagery: string;
	/** Card Status */
	status: CardStatus;
	/** ID of the player who matched that card */
	matcherId: number | null;
	/** Color of the player who matched that card */
	matcherColor: string | null;
}
