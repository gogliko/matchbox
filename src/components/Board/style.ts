import styled from "styled-components";
import MainButton from "../UI/Button";

export const BoardWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: ${({ theme }) => theme.space[5]};
	text-align: center;
	justify-content: center;
`;

export const PlayersInfoWrapper = styled.div`
	text-align: center;
	margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const PlayersInfoInner = styled.div`
	display: inline-block;
`;

export const PlayersInfoItem = styled.div<{ color: string; active: boolean }>`
	display: flex;
	align-items: center;
	font-size: ${({ theme }) => theme.fontSizes.MEDIUM};

	&::before {
		content: "";
		width: 16px;
		height: 16px;
		background-color: ${({ color }) => color};
		border-radius: ${({ theme }) => theme.space[0]};
		flex: 0 0 ${({ theme }) => theme.space[4]};
		margin-right: ${({ theme }) => theme.space[2]};
	}

	span {
		text-align: left;
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 0 0 ${({ theme }) => theme.space[9]};
	}

	&::after {
		content: "";
		width: 16px;
		height: 16px;
		background-color: ${({ theme, active }) =>
			active ? theme.colors.RED : "transparent"};
		border-radius: 50%;
		flex: 0 0 ${({ theme }) => theme.space[4]};
		margin-left: ${({ theme }) => theme.space[3]};
	}

	& + & {
		margin-top: ${({ theme }) => theme.space[2]};
	}

	img {
		width: 25px;
		margin-left: ${({ theme }) => theme.space[4]};
	}
`;

export const PlayAgainContainer = styled.div`
	text-align: center;
	margin-bottom: ${({ theme }) => theme.space[4]};
`;
export const PlayAgainButton = styled(MainButton)``;
