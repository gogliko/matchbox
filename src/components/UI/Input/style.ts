import styled from "styled-components";

export const InputWrapper = styled.div`
	margin-bottom: ${({ theme }) => theme.space[3]};

	label {
		font-size: ${({ theme }) => theme.fontSizes.MEDIUM};
		font-weight: ${({ theme }) => theme.fontWeights.BOLD};
		margin-bottom: ${({ theme }) => theme.space[0]};
		display: inline-block;
	}

	input {
		color: ${({ theme }) => theme.colors.BLACK};
		font-weight: ${({ theme }) => theme.fontWeights.THIN};
		padding: ${({ theme }) =>
			`${theme.space[2]} 0 ${theme.space[2]} ${theme.space[3]}`};
		width: 100%;
		font-size: ${({ theme }) => theme.fontSizes.MEDIUM};
		border: 1px solid ${({ theme }) => theme.colors.GRAY1};
		border-radius: ${({ theme }) => theme.space[0]};
		transition: border, color 0.2s ease-in-out;
		background: transparent;

		:disabled {
			::placeholder {
				color: ${({ theme }) => theme.colors.BLACK};
			}
		}

		:focus-within {
			border-color: rgb(9, 105, 218);
			outline: none;
			box-shadow: rgb(9, 105, 218) 0 0 0 1px inset;
		}
	}
`;
