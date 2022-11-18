import React, { createContext, useContext } from 'react';

console.log('↳ AppContext.jsx');

const AppContext = createContext({});

export function AppProvider({ children, value }) {
	console.log('%c AppProvider({ children, value })', 'color:#B50');

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// export default AppContext;
export function useAppValue() {
	return useContext(AppContext);
}
