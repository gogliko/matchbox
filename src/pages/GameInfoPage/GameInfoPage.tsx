import {
	ChangeEvent,
	FC,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/UI/Input";
import { GameMode, GameStatus, PlayerType, StartGamePlayers } from "../../game";
import { useGame } from "../../game/Game";
import * as styles from "./style";

const GameInfoPage: FC<{ mode: GameMode }> = ({ mode }) => {
	const { startGame, gameStatus } = useGame();
	const [players, setPlayers] = useState<string[]>(["", ""]);
	const isSinglePlayerMode = mode === GameMode.SINGLE_PLAYER;
	const navigate = useNavigate();

	// Listen input updates and set player name
	const handleInputChange = useCallback((playerIndex: number) => {
		return (event: ChangeEvent<HTMLInputElement>) =>
			setPlayers((players) => {
				const clonedPlayers = [...players];
				clonedPlayers[playerIndex] = event.target.value;
				return clonedPlayers;
			});
	}, []);

	const canStartGame = useMemo(() => {
		// Check if entered players is greater 0 or 1
		// 0 = when we have a single player.
		// 1 = when we have a multi player.
		return (
			players.map((player) => player).filter((c) => c).length >
			(isSinglePlayerMode ? 0 : 1)
		);
	}, [isSinglePlayerMode, players]);

	// Update users information and start the game
	const playGame = useCallback(() => {
		const updatedPlayers: StartGamePlayers = players.map((player) => ({
			name: player,
			type: PlayerType.USER,
		}));

		// We are adding computer as a second player if it's a single player mode
		if (isSinglePlayerMode) {
			updatedPlayers[1] = { name: "Computer", type: PlayerType.COMPUTER };
		}

		startGame(updatedPlayers);
	}, [isSinglePlayerMode, players, startGame]);

	// Listen when the game starts and navigate to the game page
	useEffect(() => {
		if (gameStatus === GameStatus.IN_PROGRESS) {
			const navigateUrl = isSinglePlayerMode
				? "/game/single-player"
				: "/game/multi-player";
			navigate(navigateUrl);
		}
	}, [gameStatus, isSinglePlayerMode, navigate]);

	return (
		<styles.GameInfoPageContainer>
			<Input
				label="Player 1"
				name="player_1"
				placeholder="Player name"
				type="text"
				onChange={handleInputChange(0)}
			/>

			<Input
				disabled={isSinglePlayerMode}
				label="Player 2"
				name="player_2"
				placeholder={isSinglePlayerMode ? "Computer" : "Player name"}
				type="text"
				onChange={handleInputChange(1)}
			/>

			<styles.PlayButton onClick={playGame} disabled={!canStartGame}>
				Play
			</styles.PlayButton>
		</styles.GameInfoPageContainer>
	);
};

export default GameInfoPage;
