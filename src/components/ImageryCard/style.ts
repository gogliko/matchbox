import styled from "styled-components";

export const CardWrapper = styled.div<{ isMatched: boolean }>`
	background-color: transparent;
	height: 130px;
	perspective: 1000px;
	${({ isMatched }) => !isMatched && "cursor: pointer;"};
`;

export const CardInnerContainer = styled.div<{ isOpened: boolean }>`
	position: relative;
	width: 100%;
	height: 100%;
	text-align: center;
	transition: transform 0.8s;
	transform-style: preserve-3d;
	${({ isOpened }) => isOpened && "transform: rotateY(180deg);"};
`;

const cardInnerElement = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
`;

export const CardFrontContainer = styled(cardInnerElement)<{
	matcherColor: string | null;
}>`
	background: ${({ theme, matcherColor }) =>
		matcherColor
			? matcherColor
			: `linear-gradient(135deg, ${theme.colors.BLUE2} 0%,${theme.colors.PURPLE} 100%)`};
	${({ matcherColor }) => matcherColor && "opacity:0.9;"}
`;

export const CardBackContainer = styled(cardInnerElement)`
	transform: rotateY(180deg);
	border: 2px solid ${({ theme }) => theme.colors.BLUE2};

	span {
		font-size: ${({ theme }) => theme.fontSizes.EXTRA_LARGE};
	}
`;
