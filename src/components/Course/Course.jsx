import React from 'react';
import bemCssModules from 'bem-css-modules';
import { default as CourseStyle } from './Course.module.scss';

const style = bemCssModules(CourseStyle);

const Course = ({ authors, img, price, title }) => {
	const allAutors = authors.join(', ');
	return (
		<li>
			<article className={style()}>
				<h3 className={style('title')}>{title}</h3>
				<img src={img} alt={title} className={style('img')} />
				<p className={style('price')}>{`Koszt kursu: ${price}zł`}</p>
				<p className={style('autors')}>{`Autorzy kursu: ${allAutors}`}</p>
			</article>
		</li>
	);
};

export default Course;
