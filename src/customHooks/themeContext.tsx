import React, { useContext, FunctionComponent, useState } from 'react';

export const Context = React.createContext({
	darkTheme: false,
	toggleTheme: () => {},
});
type ThemeProps = {
	children: React.ReactNode;
};

export const useThemeContext = () => useContext(Context);

const ThemeContext: FunctionComponent<ThemeProps> = ({ children }) => {
	const [darkTheme, setDarkTheme] = useState(false);

	const toggleTheme = () => {
		setDarkTheme((dark) => !dark);
	};

	return (
		<Context.Provider value={{ darkTheme, toggleTheme }}>
			{children}
		</Context.Provider>
	);
};
export default ThemeContext;
