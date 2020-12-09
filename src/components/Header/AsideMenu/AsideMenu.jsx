import React, { useContext } from 'react';
import bemCssmodule from 'bem-css-modules';

import AdminMenu from './subcomponents/AdminMenu';
import UserMenu from './subcomponents/UserMenu';
import { StoreContext } from '../../../store/StoreProvider';

import { default as AsideMenuStyle } from './AsideMenu.module.scss';

const style = bemCssmodule(AsideMenuStyle);

const AsideMenu = () => {
	const { user } = useContext(StoreContext);

	const ADMIN_TUPE = 1;

	const adminMenuComponent =
		user?.accessLevel === ADMIN_TUPE ? <AdminMenu /> : null;
	return (
		<section className={style()}>
			<div className={style('nav-wrapper')}>
				<UserMenu isUserlogged={Boolean(user)} />
				{adminMenuComponent}
			</div>
		</section>
	);
};

export default AsideMenu;
