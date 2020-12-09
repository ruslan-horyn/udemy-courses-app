import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import { default as CourseStyle } from './Course.module.scss';
import request from '../../helpers/request';
import { StoreContext } from '../../store/StoreProvider';
import { useHistory } from 'react-router-dom';

const style = bemCssModules(CourseStyle);

const Course = ({ isUserContext = false, id, authors, img, price, title }) => {
	const { user, setUser } = useContext(StoreContext);
	const history = useHistory();
	const allAutors = authors.join(', ');

	const isUserLogged = Boolean(user);
	const handleOnClick = async () => {
		try {
			const { data, status } = await request.patch('/users', {
				login: user.login,
				courseId: id,
			});
			if (status === 202) {
				setUser(data.user);
				history.push('/my-courses');
			}
		} catch (error) {
			console.warn(error);
		}
	};

	const shouldBeBuyButton = isUserLogged && !isUserContext;

	return (
		<li>
			<article className={style()}>
				<h3 className={style('title')}>{title}</h3>
				<img src={img} alt={title} className={style('img')} />
				<p className={style('price')}>{`Koszt kursu: ${price}zł`}</p>
				<p className={style('autors')}>{`Autorzy kursu: ${allAutors}`}</p>
				{shouldBeBuyButton && (
					<button onClick={handleOnClick}>Zakup ten kurs</button>
				)}
			</article>
		</li>
	);
};

export default Course;
