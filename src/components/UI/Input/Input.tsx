import { ChangeEvent, FC } from "react";
import * as styles from "./style";

interface InputProps {
	/** Fires when input value changes */
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	/** Input placeholder */
	placeholder: string;
	/** Input name */
	name: string;
	/** Input disabled state */
	disabled?: boolean;
	/** Input label */
	label: string;
	/** Input type */
	type: string;
}

const Input: FC<InputProps> = ({ label, ...inputProps }) => {
	return (
		<styles.InputWrapper>
			<label htmlFor={inputProps.name}>{label}</label>
			<input id={inputProps.name} {...inputProps} />
		</styles.InputWrapper>
	);
};

export default Input;
