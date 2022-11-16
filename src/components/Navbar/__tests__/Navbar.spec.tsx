import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { customRender } from "../../../test/testingLibraryUtils";
import Navbar from "../Navbar";

describe("Navbar", () => {
	const setup = () => {
		return customRender(<Navbar />, {});
	};

	it("Should render user name", () => {
		setup();
		expect(screen.getByText(/goga a\./i)).toBeVisible();
	});
});
