import React, { useContext, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import CourseDetails from './sumcomponents/CourseDetails';
import CoursePopup from './sumcomponents/CoursePopup';

const AdminPanel = () => {
	const [isOpenPopup, setIsOpenPopup] = useState(false);
	const showPopup = () => setIsOpenPopup(true);
	const hidePopup = e => {
		setIsOpenPopup(false);
	};

	const { courses } = useContext(StoreContext);

	const coursesElement = courses.map(course => (
		<CourseDetails key={course.id} {...course} />
	));
	return (
		<section>
			{coursesElement}
			<button onClick={showPopup}>Dodal nowy kurs</button>
			<CoursePopup
				isEditMode={false}
				isOpenPopup={isOpenPopup}
				hidePopup={hidePopup}
			/>
		</section>
	);
};
export default AdminPanel;
