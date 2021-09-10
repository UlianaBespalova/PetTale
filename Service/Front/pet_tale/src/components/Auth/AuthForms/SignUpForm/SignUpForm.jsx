import React, {useState} from 'react';
import '../AuthForms.css';
import axios from "axios";
import {urls} from "../../../../api/urls";


const SignUpForm = ({updateLogin}) => {

    const [errorMsg, setErrorMsg] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const inputSignLogin = event.target.inputSignLogin.value;
        const inputSignEmail = event.target.inputSignEmail.value;
        const inputSignPass = event.target.inputSignPass.value;

        if (inputSignLogin==="" || inputSignEmail==="" || inputSignPass==="") {
            setErrorMsg('Пожалуйста, заполните все поля');
            return;
        }

        axios.get(urls.register(inputSignLogin, inputSignEmail, inputSignPass))
            .then((res) => {
                if (res.data.res === "Error") {
                    switch (res.data.body) {
                        case "Login is taken":
                            setErrorMsg('Данный логин уже занят');
                            break;
                        default:
                            setErrorMsg('Регистрация не удалась');
                    }
                } else {
                    updateLogin(res.data.body.login, res.data.body.id);
                    setErrorMsg(null);
                }
            })
            .catch(() => {
                console.log('error404');
                setErrorMsg('Регистрация не удалась');
            });

        //дёргаем сервер для создания пользователя
        //loginUser();
        // const res = {
        //     success: true,
        //     login: inputSignLogin,
        // }
        // if (res.success) {
        //     updateLogin(res.login);
        //     setErrorMsg(null);
        //     const elem = document.getElementById('signUpForm');
        // }
        // else setErrorMsg('Пользователь с таким именем уже существует');
    }


    return (
        <div className="accordion-collapse collapse card card-body auth-form-body"
             style={{boxShadow: '0 0 5px 2px #a3aab0'}}
             id="signUpForm" data-bs-parent="#form">
            <div className="">
                <form className="text-small" onSubmit={handleSubmit}>
                    <div className="mb-3 row g-3 align-items-center">
                        <div className="col-auto">
                            <label htmlFor="inputSignLogin" className="form-label col-form-label">Логин</label>
                        </div>
                        <div className="col-auto form-login-input">
                            <input type="text" className="form-control input-small py-1" id="inputSignLogin"/>
                        </div>
                    </div>
                    <div className="mb-3 row g-3 align-items-center">
                        <div className="col-auto">
                            <label htmlFor="inputSignEmail" className="form-label col-form-label">Почта</label>
                        </div>
                        <div className="col-auto form-mail-input">
                            <input type="email" className="form-control input-small py-1" id="inputSignEmail"/>
                        </div>
                    </div>

                    <div className="mb-3 row g-3 align-items-center">
                        <div className="col-auto">
                            <label htmlFor="inputSignPass" className="form-label">Пароль</label>
                        </div>
                        <div className="col-auto">
                            <input type="password" className="form-control input-small py-1" id="inputSignPass" />
                        </div>
                    </div>

                    <div className='d-grid gap-2'>
                        <button type="submit" className="btn bg-bright btn-sm form-button">Зарегистрироваться!</button>
                    </div>

                    {errorMsg  ?
                        <div className='text-danger mt-3'>
                            {errorMsg}
                        </div> : null
                    }

                </form>
            </div>
        </div>
    )
}

export default SignUpForm;
