import { act, renderHook } from "@testing-library/react";
import { useCard } from "../index";
import { CardStatus } from "../../types";

describe("useCard", () => {
	const setup = () => renderHook(() => useCard());

	it("Should generate cards", async () => {
		const { result } = setup();
		act(() => {
			result.current.generateCards(2);
		});
		expect(result.current.cards).toHaveLength(2);
		expect(result.current.cards).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: 0,
					status: "closed",
					name: "card_0",
				}),
			])
		);
	});

	it("Should update card", async () => {
		const { result } = setup();
		act(() => {
			result.current.generateCards(2);
			result.current.updateCard(1, { matcherId: 2 });
		});
		expect(result.current.cards).toHaveLength(2);
		expect(result.current.cards).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					matcherId: 2,
				}),
			])
		);
	});

	it("Should flip card", async () => {
		const { result } = setup();
		act(() => {
			result.current.generateCards(2);
			result.current.flipCard(1);
		});
		expect(result.current.cards).toHaveLength(2);
		expect(result.current.cards).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					status: CardStatus.OPENED,
				}),
			])
		);
	});
});
