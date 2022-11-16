import styled from "styled-components";

export const MainButton = styled.button`
	padding: ${({ theme }) => `${theme.space[0]} ${theme.space[3]}`};
	font-size: ${({ theme }) => theme.fontSizes.MEDIUM};
	cursor: pointer;
	border: 2px solid ${({ theme }) => theme.colors.BLUE};
	border-radius: ${({ theme }) => theme.space[0]};
	color: ${({ theme }) => theme.colors.BLUE};
	display: inline-block;
	background-color: transparent;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
		border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

	:hover {
		color: ${({ theme }) => theme.colors.LIGHT};
		background-color: ${({ theme }) => theme.colors.BLUE};
	}

	:disabled {
		background-color: ${({ theme }) => theme.colors.GRAY};
		border: 2px solid ${({ theme }) => theme.colors.GRAY};
		cursor: not-allowed;
		color: ${({ theme }) => theme.colors.LIGHT};
	}
`;

export default MainButton;
