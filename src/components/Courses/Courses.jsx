import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import { default as CoursesStyle } from './Courses.module.scss';
import { StoreContext } from '../../store/StoreProvider';
import Course from './subcomponents/Course';

const style = bemCssModules(CoursesStyle);

const Courses = () => {
   const { courses } = useContext(StoreContext);
	const coursesElements = courses.map(course => (
		<Course key={course.id} {...course} />
	));
	return (
		<section>
			<h2 className={style('title')}></h2>
			<ul className={style('list')}>{coursesElements}</ul>
		</section>
	);
};
export default Courses;
