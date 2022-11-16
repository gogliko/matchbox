import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGame } from "../game/Game";

/**
 * ProtectedRoute HOC is used to redirect to the home page  if we have no players set
 * @param children
 */
const ProtectedRoute: FC<{ children?: JSX.Element }> = ({ children }) => {
	const { players } = useGame();
	// If there are no existing players redirect to the main page
	if (!players.length) {
		return <Navigate to={"/"} replace />;
	}
	return children ? children : <Outlet />;
};

export default ProtectedRoute;
