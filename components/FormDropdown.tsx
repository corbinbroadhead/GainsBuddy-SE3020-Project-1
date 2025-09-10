import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

type FormDropdownProps = {
	label: string;
	options: { label: string; value: string }[];
	selected: string;
	onValueChange: (val: string) => void;
};

const FormDropdown = ({ label, options, selected, onValueChange }: FormDropdownProps) => {
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState(options);

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<DropDownPicker
				open={open}
				value={selected} // controlled by parent
				items={items}
				setOpen={setOpen}
				setValue={(callback) => {
					// DropDownPicker gives back a function; call it to get the next value
					const nextValue = callback(selected);
					if (typeof nextValue === "string") {
						onValueChange(nextValue);
					}
				}}
				setItems={setItems}
				placeholder="Select..."
				style={styles.picker}
				dropDownContainerStyle={styles.dropdown}
				textStyle={styles.text}
				dropDownDirection="BOTTOM"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "90%",
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: "#425363ff"
	},
	label: {
		color: "#dde2e5ff",
		fontWeight: "bold",
		fontSize: 14,
		letterSpacing: 1.5,
		paddingLeft: 5
	},
	picker: {
		backgroundColor: "#dde2e5ff",
		borderColor: "#425363ff",
		borderWidth: 4,
		borderRadius: 10,
		height: 40,
		paddingHorizontal: 10,
	},
	dropdown: {
		backgroundColor: "#dde2e5ff",
		borderColor: "#425363ff",
		borderWidth: 4,
		borderRadius: 10,
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#18191dff",
	},
});

export default FormDropdown;
