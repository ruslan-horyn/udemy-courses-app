import React, { useContext, useState } from 'react';
import bemCssModules from 'bem-css-modules';
import { default as CoursePopupStyle } from './CoursePopup.module.scss';
import Modal from '../../Modal/Modal';
import { StoreContext } from '../../../store/StoreProvider';
import request from '../../../helpers/request';
const style = bemCssModules(CoursePopupStyle);

const CoursePopup = ({
	authors = [],
	hidePopup,
	isEditMode = true,
	isOpenPopup,
	id,
	img = '',
	price = 0,
	title = '',
}) => {
	const { setCourses } = useContext(StoreContext);

	const [formAuthors, setFormAuthors] = useState(authors);
	const [formAuthor, setFormAuthor] = useState('');
	const [formImg, setFormImg] = useState(img);
	const [formPrice, setFormPrice] = useState(price);
	const [formTitle, setFormTitle] = useState(title);

	const handleOnChangeAutor = e => setFormAuthor(e.target.value);
	const handleOnChangeImg = e => setFormImg(e.target.value);
	const handleOnChangePrice = e => setFormPrice(e.target.value);
	const handleOnChangeTitle = e => setFormTitle(e.target.value);

	const handleOnSubmit = async e => {
		e.preventDefault();

		const courseObject = {
			authors: formAuthors,
			id,
			img: formImg,
			price: formPrice,
			title: formTitle,
		};

		if (isEditMode) {
			const { data, status } = await request.put('/courses', courseObject);
			if (status === 202) {
				setCourses(data.courses);
			}
		} else {
			const { data, status } = await request.post('/courses', courseObject);
			if (status) {
				setCourses(data.courses);
			}
		}

		hidePopup();
	};

	const handleAddAuthor = e => {
		e.preventDefault();

		setFormAuthors(prev => [...prev, formAuthor]);

		setFormAuthor('');
	};

	const handleDeleteAuthor = e => {
		const authorToDelete = e.target.dataset.author;
		setFormAuthors(prev => prev.filter(author => author !== authorToDelete));
	};

	const authorsElements = formAuthors.map(author => (
		<li key={author}>
			<p>{author}</p>
			<button data-author={author} onClick={handleDeleteAuthor}>
				Usuń autora
			</button>
		</li>
	));

	const correctLabel = isEditMode ? 'Aktualizuj kurs' : 'Utwórz kurs';

	return (
		<Modal handleOnClose={hidePopup} isOpen={isOpenPopup}>
			<div className={style()}>
				<form
					className={style('form')}
					method='submit'
					onSubmit={handleOnSubmit}>
					<div className={style('form-row')}>
						<label>
							Autor:
							<input
								onChange={handleOnChangeAutor}
								type='text'
								className={style('input')}
								value={formAuthor}
							/>
							<button onClick={handleAddAuthor}>Dadaj Autora</button>
						</label>
					</div>

					<div className={style('form-row')}>
						<label>
							Obrazek url:
							<input
								onChange={handleOnChangeImg}
								type='text'
								className={style('input')}
								value={formImg}
							/>
						</label>
					</div>

					<div className={style('form-row')}>
						<label>
							Cena:
							<input
								onChange={handleOnChangePrice}
								type='number'
								className={style('input')}
								value={formPrice}
							/>
						</label>
					</div>

					<div className={style('form-row')}>
						<label>
							Tytuł:
							<input
								onChange={handleOnChangeTitle}
								type='text'
								className={style('input')}
								value={formTitle}
							/>
						</label>
					</div>

					<button type='submit'>{correctLabel}</button>
					<button onClick={hidePopup} type='button'>
						Anuluj
					</button>
				</form>
				<p>Lista autorów:</p>
				<ul>{authorsElements}</ul>
			</div>
		</Modal>
	);
};
export default CoursePopup;
