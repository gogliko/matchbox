import { render, RenderOptions } from "@testing-library/react";
import { FC, ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "../theme";

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
		</ThemeProvider>
	);
};

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">
) => {
	return render(ui, { wrapper: Wrapper, ...options });
};
export { customRender };
