import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import NavBar from "./components/Navbar";
import { GameMode } from "./game";
import { ProvideGame } from "./game/Game";
import { ProtectedRoute } from "./hoc";
import GameInfoPage from "./pages/GameInfoPage";
import MainPage from "./pages/MainPage";
import Multiplayer from "./pages/Multiplayer";
import NotFoundPage from "./pages/NotFoundPage";
import SinglePlayer from "./pages/SinglePlayer";
import * as styles from "./styles";
import { GlobalStyle } from "./styles/DefaultStyles";
import theme from "./theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<ProvideGame>
				<BrowserRouter>
					<GlobalStyle />
					<NavBar />
					<styles.PageContainer>
						<Routes>
							<Route path="/" element={<MainPage />} />
							<Route path="/game-info">
								<Route
									path="single-player"
									element={<GameInfoPage mode={GameMode.SINGLE_PLAYER} />}
								/>
								<Route
									path="multi-player"
									element={<GameInfoPage mode={GameMode.MULTI_PLAYER} />}
								/>
							</Route>
							<Route path="/game" element={<ProtectedRoute />}>
								<Route path="multi-player" element={<Multiplayer />} />
								<Route path="single-player" element={<SinglePlayer />} />
							</Route>
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</styles.PageContainer>
				</BrowserRouter>
			</ProvideGame>
		</ThemeProvider>
	);
}

export default App;
