import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PLAYERS_MOCK } from "../../../__mocks__/player";
import { GameStatus } from "../../../game";
import { customRender } from "../../../test/testingLibraryUtils";
import Board from "../Board";

describe("Board", () => {
	const onRestartClick = jest.fn();
	const setup = (status = GameStatus.IN_PROGRESS) => {
		return customRender(
			<Board
				cards={<>CARDS</>}
				players={PLAYERS_MOCK}
				gameStatus={status}
				winnerIds={[]}
				currentPlayer={PLAYERS_MOCK[0]}
				onRestartClick={onRestartClick}
			/>,
			{}
		);
	};

	it("Should render", () => {
		setup();
		expect(screen.getByText(/player 1/i)).toBeVisible();
		expect(screen.getByText(/player 2/i)).toBeVisible();
		expect(screen.getByText(/cards/i)).toBeVisible();
	});

	it("Should display play again button", async () => {
		setup(GameStatus.FINISHED);
		await userEvent.click(
			screen.getByRole("button", {
				name: /play again/i,
			})
		);
		expect(onRestartClick).toHaveBeenCalledTimes(1);
	});
});
