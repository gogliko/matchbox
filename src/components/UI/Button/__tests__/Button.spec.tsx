import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { customRender } from "../../../../test/testingLibraryUtils";
import Button from "../index";

describe("Button", () => {
	const setup = () => {
		return customRender(<Button>Test</Button>, {});
	};

	it("Should render", () => {
		setup();
		expect(
			screen.getByRole("button", {
				name: /test/i,
			})
		).toBeVisible();
	});
});
