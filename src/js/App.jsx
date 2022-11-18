import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppProvider } from './AppContext';
import About from './Components/About';
import Home from './Components/Home';

console.log('↳ App.jsx');

const router = createBrowserRouter([
	{
		path: '/', // 首頁
		element: <Home />,
	},
	{
		path: '/about', // 功能頁面
		element: <About />,
	},
]);

function App() {
	console.log('%c App()', 'color:darkorange');

	const [currentUser, setCurrentUser] = useState(null);

	// * AppContext.jsx / About.jsx / Home.jsx / App.jsx / index.js
	// * App() -> AppContext() -> Home() [ | About() ]
	// * useEffect(,[]) <Home> -> useEffect(,[]) <App>
	useEffect(() => {
		console.log('useEffect(,[]) <App>');
	}, []);

	useEffect(() => {
		console.log('useEffect(,[currentUser]) <App>', currentUser);
	}, [currentUser]);

	return (
		<div className='app p-5'>
			<h1>React Webpack Boilerplate</h1>
			<AppProvider value={{ currentUser, setCurrentUser }}>
				<RouterProvider router={router} />
			</AppProvider>
		</div>
	);
}

export default App;
