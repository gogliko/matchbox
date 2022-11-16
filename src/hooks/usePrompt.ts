import { History, Transition } from "history";
import { useCallback, useContext, useEffect } from "react";
import { Navigator } from "react-router";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

/**
 * The idea of writing this hook is to support useBlocker and usePrompt in the project
 * react-router had problems in a newer version where from they removed support for this,
 * but it's in progress and before this gets returned we are using a workaround for that.
 * https://github.com/remix-run/react-router/issues/8139
 */
type ExtendNavigator = Navigator & Pick<History, "block">;
const useBlocker = (blocker: (tx: Transition) => void, when = true) => {
	const { navigator } = useContext(NavigationContext);

	useEffect(() => {
		if (!when) return;

		const unblock = (navigator as ExtendNavigator).block((tx) => {
			const autoUnblockingTx = {
				...tx,
				retry() {
					unblock();
					tx.retry();
				},
			};

			blocker(autoUnblockingTx);
		});

		return unblock;
	}, [navigator, blocker, when]);
};
const usePrompt = (message: string, when: boolean, onSuccess: () => void) => {
	const blocker = useCallback(
		(tx: Transition) => {
			if (window.confirm(message)) {
				onSuccess();
				tx.retry();
			}
		},
		[onSuccess, message]
	);

	useBlocker(blocker, when);
};

export default usePrompt;
