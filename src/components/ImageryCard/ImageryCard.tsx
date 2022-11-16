import { FC, useCallback } from "react";
import { Card, CardStatus } from "../../game";
import * as styles from "./style";

interface ImageryCardProps {
	/** Card information */
	card: Card;
	/** Fires when clicked on the card */
	onCardClick: (cardId: number) => void;
}

/**
 * Card component renders game card.
 * @param card
 * @param onCardClick
 */
const ImageryCard: FC<ImageryCardProps> = ({ card, onCardClick }) => {
	const cardIsOpened = card.status === CardStatus.OPENED;
	const cardIsMatched = card.status === CardStatus.MATCHED;

	const handleFlipCard = useCallback(() => {
		if (cardIsOpened || cardIsMatched) {
			return;
		}
		onCardClick(card.id);
	}, [card.id, cardIsMatched, cardIsOpened, onCardClick]);

	return (
		<styles.CardWrapper
			onClick={handleFlipCard}
			isMatched={cardIsMatched}
			data-testid="imagery-card"
		>
			<styles.CardInnerContainer isOpened={cardIsOpened}>
				<styles.CardFrontContainer matcherColor={card.matcherColor} />
				<styles.CardBackContainer>
					{cardIsOpened && (
						<span dangerouslySetInnerHTML={{ __html: card.imagery }} />
					)}
				</styles.CardBackContainer>
			</styles.CardInnerContainer>
		</styles.CardWrapper>
	);
};

export default ImageryCard;
