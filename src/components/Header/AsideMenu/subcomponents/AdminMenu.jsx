import React, { useContext } from 'react';
import bemCssmodule from 'bem-css-modules';
import { Link } from 'react-router-dom';

import { default as AsideMenuStyle } from '../AsideMenu.module.scss';

const style = bemCssmodule(AsideMenuStyle);

const AdminMenu = () => {
	return (
		<>
			<p className={style('title')}>Panel administratora</p>
			<nav>
				<ul>
					<li className={style('link')}>
						<Link to='/mange-courses'>Zarządzanie kursami</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default AdminMenu;
