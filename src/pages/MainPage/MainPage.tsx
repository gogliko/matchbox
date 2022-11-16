import multiPlayerLogo from "../../assets/images/multi-player.svg";
import singlePlayerLogo from "../../assets/images/single-player.svg";
import * as styles from "./styles";

/**
 * Main Page
 * Renders as initial page
 */
const MainPage = () => {
	return (
		<styles.ChooserContainer>
			<styles.CardContainer to="/game-info/multi-player">
				<styles.CardContainerInner>
					<img src={multiPlayerLogo} alt="multi-player-logo" />
					<h3>Play With Friend</h3>
				</styles.CardContainerInner>
			</styles.CardContainer>

			<styles.CardContainer singlePlayer to="/game-info/single-player">
				<styles.CardContainerInner>
					<img src={singlePlayerLogo} alt="single-player-logo" />
					<h3>Play With Computer</h3>
				</styles.CardContainerInner>
			</styles.CardContainer>
		</styles.ChooserContainer>
	);
};
export default MainPage;
