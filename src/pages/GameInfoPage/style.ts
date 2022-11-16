import styled from "styled-components";
import MainButton from "../../components/UI/Button";

export const GameInfoPageContainer = styled.div`
	width: 520px;
	display: flex;
	gap: ${({ theme }) => theme.space[5]};
	justify-content: center;
	flex-wrap: wrap;
	margin-left: auto;
	margin-right: auto;
`;

export const PlayButton = styled(MainButton)`
	font-weight: ${({ theme }) => theme.fontWeights.NORAML};
	font-size: ${({ theme }) => theme.space[5]};
	width: 112px;
	height: 112px;
	border-radius: 50%;
`;
