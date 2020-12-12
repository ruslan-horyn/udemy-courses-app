import React, { useContext } from 'react';

import bemCssModules from 'bem-css-modules';

import { default as ContentStyle } from './Content.module.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';
import Courses from '../Courses/Courses';
import UserCourses from '../UserCourses/UserCourses';
import AdminPanel from '../AndinPanel/AdminPanel';

const style = bemCssModules(ContentStyle);
const ADMIN_TYPE = 1;

const Content = () => {
	const { user } = useContext(StoreContext);
	const isUserlogged = Boolean(user);
	const isAdmin = user?.accessLevel === ADMIN_TYPE;
	return (
		<main className={style()}>
			<Switch>
				<Route exact path='/' render={() => <Courses />} />
				{isUserlogged && (
					<Route path='/my-courses' render={() => <UserCourses />} />
				)}
				{isAdmin && (
					<Route path='/manage-courses' render={() => <AdminPanel />} />
				)}

				<Redirect to='/' />
			</Switch>
		</main>
	);
};

export default Content;
