import styled from "styled-components";

export const NotFoundContainer = styled.div`
	margin: ${({ theme: { space } }) => space[4]} auto;
	text-align: center;
	font-size: ${({ theme }) => theme.fontSizes.LARGE};
`;
