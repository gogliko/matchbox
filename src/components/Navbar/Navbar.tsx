import { FC } from "react";
import logo from "../../assets/images/logo.svg";
import * as styles from "./styles";

/**
 * Navbar component
 */
const NavBar: FC = () => {
	return (
		<styles.NavBarContainer>
			<styles.NavbarElementsContainer>
				<styles.LogoContainer to={"/"}>
					<img src={logo} alt="logo" />
				</styles.LogoContainer>
				<styles.UserInfoContainer>
					<styles.UserAvatar>GA</styles.UserAvatar>
					<span>Goga A.</span>
				</styles.UserInfoContainer>
			</styles.NavbarElementsContainer>
		</styles.NavBarContainer>
	);
};

export default NavBar;
