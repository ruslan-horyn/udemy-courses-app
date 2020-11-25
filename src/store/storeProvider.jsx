import React, { createContext, useEffect, useState } from 'react';
import request from '../helpers/reques';

const StoreContex = createContext(null);
const StoreProvider = ({ children }) => {
	const [courses, setCourses] = useState([]);
	const [user, setUser] = useState(null);

	const fetchData = async () => {
		const { data } = await request.get('/courses');
		setCourses(data.courses);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<StoreContex.Provider value={(courses, setCourses, user, setUser)}>
			{children}
		</StoreContex.Provider>
	);
};

export default StoreProvider;
