import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../../../test/testingLibraryUtils";
import Input from "../index";

describe("Input", () => {
	const onChange = jest.fn();
	const setup = (disabled = false) => {
		const componentProps = {
			onChange,
			placeholder: "player name",
			name: "playerName",
			disabled,
			label: "Label",
			type: "text",
		};
		return customRender(<Input {...componentProps} />, {});
	};

	it("Should render", () => {
		setup();
		expect(
			screen.getByRole("textbox", {
				name: /label/i,
			})
		).toBeVisible();
	});

	it("Should change input value", () => {
		setup();
		const inputBox: HTMLInputElement = screen.getByRole("textbox", {
			name: /label/i,
		});
		userEvent.type(inputBox, "T");
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(inputBox).toHaveValue("T");
	});

	it("Should be a disabled", () => {
		setup(true);
		expect(
			screen.getByRole("textbox", {
				name: /label/i,
			})
		).toBeDisabled();
	});
});
