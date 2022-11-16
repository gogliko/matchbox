import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CARDS_MOCK } from "../../../__mocks__/card";
import { Card, CardStatus } from "../../../game";
import { customRender } from "../../../test/testingLibraryUtils";
import ImageryCard from "../ImageryCard";

describe("ImageryCard", () => {
	const onCardClick = jest.fn();
	const setup = (status = CardStatus.CLOSED) => {
		const card: Card = {
			...CARDS_MOCK[0],
			status,
		};
		return customRender(
			<ImageryCard card={card} onCardClick={onCardClick} />,
			{}
		);
	};

	it("Should be opened", () => {
		setup(CardStatus.OPENED);
		expect(screen.getByText(/imageryfont/i)).toBeVisible();
	});

	it("Should fire onCardClick with id", async () => {
		setup();
		await userEvent.click(screen.getByTestId("imagery-card"));
		expect(onCardClick).toHaveBeenCalledTimes(1);
		expect(onCardClick).toHaveBeenCalledWith(1);
	});
});
