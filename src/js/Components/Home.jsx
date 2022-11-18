import React, { useEffect } from 'react';
import { Button } from 'react-daisyui';
import { Link } from 'react-router-dom';

import { useAppValue } from '../AppContext';

console.log('↳ Home.jsx');

function Home() {
	console.log('%c Home()', 'color:darkorange');

	const { currentUser, setCurrentUser } = useAppValue();

	useEffect(() => {
		console.log('useEffect(,[]) <Home>');
	}, []);

	useEffect(() => {
		console.log('useEffect(,[currentUser]) <Home>', currentUser);
	}, [currentUser]);

	return (
		<div>
			<h1>home</h1>
			<div>
				<Button
					type='button'
					onClick={() => {
						setCurrentUser((prev) => {
							return { ...prev, label: 'Home' };
						});
					}}>
					click
				</Button>
			</div>
			<nav>
				<Link to='/about'>About</Link>
			</nav>
		</div>
	);
}

export default Home;
