import { act, renderHook } from "@testing-library/react";
import { PlayerType } from "../../types";
import { usePlayer } from "../index";

const players = [
	{ name: "player1", type: PlayerType.USER },
	{
		name: "player2",
		type: PlayerType.USER,
	},
];
describe("usePlayer", () => {
	const setup = () => renderHook(() => usePlayer());

	it("Should generate players", async () => {
		const { result } = setup();

		act(() => {
			result.current.initPlayers(players);
		});

		expect(result.current.players).toHaveLength(2);
		expect(result.current.players).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: 0,
					name: "player1",
				}),
				expect.objectContaining({
					id: 1,
					name: "player2",
				}),
			])
		);
	});

	it("Should increment player point", async () => {
		const { result } = setup();

		act(() => {
			result.current.initPlayers(players);
			result.current.incrementUserPoint(0);
		});

		expect(result.current.players).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: 0,
					point: 1,
				}),
				expect.objectContaining({
					id: 1,
					name: "player2",
					point: 0,
				}),
			])
		);
	});

	it("Should return both player id as a winners", async () => {
		const { result } = setup();

		act(() => {
			result.current.initPlayers(players);
		});

		expect(result.current.calculateWinners()).toEqual([0, 1]);
	});
});
