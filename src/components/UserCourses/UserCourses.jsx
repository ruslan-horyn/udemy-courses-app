import React, { useContext } from 'react';
import bemCssModule from 'bem-css-modules';

import { default as UserCoursesStyle } from './UserCourses.module.scss';
import { StoreContext } from '../../store/StoreProvider';
import Course from '../Course/Course';

const style = bemCssModule(UserCoursesStyle);

const UserCourses = () => {
	const { user, courses } = useContext(StoreContext);
	const buyedCourses = courses
		.filter(course => user.courses.includes(course.id))
		.map(course => <Course isUserContext={true} key={course.id} {...course} />);
	return (
		<section className={style()}>
			<h2 className={style('title')}>Twoje wykupione kurse</h2>
			<ul className={style('list')}>{buyedCourses}</ul>
		</section>
	);
};
export default UserCourses;
