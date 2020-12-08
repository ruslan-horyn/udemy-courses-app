import React, { useContext } from 'react';
import bemCssmodule from 'bem-css-modules';
import { Link } from 'react-router-dom';

import { default as AsideMenuStyle } from '../AsideMenu.module.scss';

const style = bemCssmodule(AsideMenuStyle);

const UserMenu = ({ isUserlogged }) => {
	return (
		<>
			<p className={style('title')}>Panel Użytkownika</p>
			<nav>
				<ul>
					<li className={style('link')}>
						<Link to='/all-courses'>Kursy w sprzedaży</Link>
					</li>
					{isUserlogged && (
						<li className={style('link')}>
							<Link to='/my-courses'>Moje zakupione kursy</Link>
						</li>
					)}
				</ul>
			</nav>
		</>
	);
};

export default UserMenu;
