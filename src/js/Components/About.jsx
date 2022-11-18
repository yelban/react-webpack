import React, { useEffect } from 'react';
import { Button } from 'react-daisyui';
import { Link } from 'react-router-dom';

// import AppContext from '../AppContext';
import { useAppValue } from '../AppContext';

console.log('↳ About.jsx');

function About() {
	console.log('%c About()', 'color:darkorange');

	const { currentUser, setCurrentUser } = useAppValue();

	useEffect(() => {
		console.log('useEffect(,[]) <About>');
	}, []);

	useEffect(() => {
		console.log('useEffect(,[currentUser]) <About>', currentUser);
	}, [currentUser]);

	return (
		<div>
			<h1>about</h1>
			<div>
				<Button
					type='button'
					onClick={() => {
						setCurrentUser((prev) => {
							return { ...prev, label: 'About' };
						});
					}}>
					click
				</Button>
			</div>
			<nav>
				<Link to='/'>Home</Link>
			</nav>
		</div>
	);
}

export default About;
