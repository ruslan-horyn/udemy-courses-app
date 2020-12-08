import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import bemCssModules from 'bem-css-modules';

import { default as LoginFormStyles } from './LoginForm.module.scss';
import Modal from '../Modal/Modal';
import request from '../../helpers/request';

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleOnClose, isModalOpen }) => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [validateMassage, setValidateMassage] = useState('');

	const { setUser } = useContext(StoreContext);

	const handleOnChangeLogin = ({ target: { value } }) => setLogin(value);

	const handleOnChangePassword = ({ target: { value } }) => setPassword(value);

	const handleOnCloseModal = e => {
		e.preventDefault();
		handleOnClose();
	};

	const resetStateInput = () => {
		setLogin('');
		setPassword('');
		setValidateMassage('');
	};

	const handleOnSubmit = async e => {
		e.preventDefault();
		const { data, status } = await request.post('/users', { login, password });
		if (status === 200) {
			setUser(data.user);
			resetStateInput();
			handleOnClose();
		} else {
			setValidateMassage(data.message);
		}
	};
	useEffect(() => {
		if (isModalOpen) {
			resetStateInput();
		}
	}, [isModalOpen]);

	const validateMassageComponent = validateMassage.length ? (
		<p className={style('validate-message')}>{validateMassage}</p>
	) : null;

	return (
		<Modal
			handleOnClose={handleOnClose}
			isOpen={isModalOpen}
			shouldByCloseOnOutsideClick={true}>
			{validateMassageComponent}
			<form className={style()} method='post' onSubmit={handleOnSubmit}>
				<div className={style('row')}>
					<label>
						Login
						<input onChange={handleOnChangeLogin} type='text' value={login} />
					</label>
				</div>
				<div className={style('row')}>
					<label>
						Hasło
						<input
							onChange={handleOnChangePassword}
							type='password'
							value={password}
						/>
					</label>
				</div>
				<div className={style('row')}>
					<button type='submit'>Zaloguj</button>
					<button onClick={handleOnCloseModal} type='button'>
						Anuluj
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default LoginForm;
