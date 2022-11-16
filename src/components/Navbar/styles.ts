import { Link } from "react-router-dom";
import styled from "styled-components";
import * as globalStyles from "../../styles";
import { NAVBAR_HEIGHT } from "../../utils";

export const NavBarContainer = styled.div`
	height: ${NAVBAR_HEIGHT};
	display: flex;
	align-items: center;
	border-bottom: ${({ theme }) =>
		`${theme.space[0]} solid ${theme.colors.LIGHT1}`};
	justify-content: space-between;
`;

export const LogoContainer = styled(Link)`
	width: 100px;

	img {
		width: 100%;
	}
`;

export const NavbarElementsContainer = styled(globalStyles.Container)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const UserInfoContainer = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	margin-left: auto;

	span {
		font-size: ${({ theme }) => theme.fontSizes.MEDIUM};
		margin-left: ${({ theme }) => theme.space[3]};
		font-weight: ${({ theme }) => theme.fontWeights.BOLD};
		color: ${({ theme }) => theme.colors.BLUE};
	}
`;

export const UserAvatar = styled.div`
	width: 35px;
	height: 35px;
	background: ${({ theme }) => theme.colors.YELLOW};
	border-radius: ${({ theme }) => theme.space[0]};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: ${({ theme }) => theme.fontSizes.MEDIUM};
	color: ${({ theme }) => theme.colors.LIGHT};
`;
