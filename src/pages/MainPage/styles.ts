import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const ChooserContainer = styled.div`
	display: flex;
	gap: ${({ theme }) => theme.space[9]};
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 800px;
	margin: 0 auto;
	font-size: ${({ theme }) => theme.fontSizes.MEDIUM};
`;

export const CardContainer = styled(NavLink).withConfig({
	shouldForwardProp: (prop) => !["singlePlayer"].includes(prop),
})<{ singlePlayer?: boolean }>`
	background: ${({ theme }) => theme.colors.LIGHT};
	width: 300px;
	color: ${({ theme }) => theme.colors.BLACK};
	text-decoration: none;
	height: 500px;
	padding: ${({ theme }) => theme.space[6]};
	position: relative;
	cursor: pointer;
	transition: all 0.6s ease-in-out;

	&:hover {
		transform: scale(1.1);
	}

	&:before,
	&:after {
		content: "";
		width: 50px;
		height: 50px;
		background: white;
		position: absolute;
		left: -${({ theme }) => theme.space[0]};
		top: -${({ theme }) => theme.space[0]};
		z-index: -1;
		box-shadow: -42px -42px 0px ${({ theme, singlePlayer }) =>
				singlePlayer ? theme.colors.BLACK : theme.colors.YELLOW} inset;
	}

	&:after {
		left: auto;
		top: auto;
		right: -${({ theme }) => theme.space[0]};
		bottom: -${({ theme }) => theme.space[0]};
		box-shadow: 42px 42px 0
			${({ theme, singlePlayer }) =>
				singlePlayer ? theme.colors.BLACK : theme.colors.YELLOW}
			inset;
	}
`;

export const CardContainerInner = styled.div`
	background: ${({ theme }) => theme.colors.LIGHT};
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 1;

	img {
		width: 100px;
	}
`;
