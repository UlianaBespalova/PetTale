import React, {useEffect, useState} from 'react';
import "../AuthForms.css";
import axios from "axios";
import {urls} from "../../../../api/urls";

const LoginForm = ({updateLogin}) => {

    const [errorMsg, setErrorMsg] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const inputLogin = event.target.inputLogin.value;
        const inputLoginPass = event.target.inputLoginPass.value;

        if (inputLogin==="") {
            setErrorMsg('Пожалуйста, введите логин');
            return;
        }
        if (inputLoginPass==="") {
            setErrorMsg('Пожалуйста, введите пароль');
            return;
        }
        axios.get(urls.login(inputLogin, inputLoginPass))
                .then((res) => {
                    if (res.data.res === "Error") {
                        switch (res.data.body) {
                            case "No user":
                                setErrorMsg('Пользователь не найден');
                                break;
                            case "Wrong password":
                                setErrorMsg('Неверный пароль');
                                break;
                            default:
                                setErrorMsg('Авторизация не удалась');
                        }
                    } else {
                        let boughtsList = "";
                        res.data.body.boughts.forEach((b)=>{
                            boughtsList+=String(b)+";";
                        })
                        updateLogin(res.data.body.login, res.data.body.id, boughtsList);
                        setErrorMsg(null);
                    }
                })
                .catch(() => {
                    console.log('error404');
                    setErrorMsg('Авторизация не удалась');
                });
    }


    return (
        <div className="accordion-collapse collapse card card-body auth-form-body"
             style={{boxShadow: '0 0 5px 2px #a3aab0'}}
             id="loginForm" data-bs-parent="#form">
            <div className="">
                <form className="text-small" onSubmit={handleSubmit}>
                    <div className="mb-3 row g-3 align-items-center">
                        <div className="col-auto">
                            <label htmlFor="inputLogin" className="form-label col-form-label">Логин</label>
                        </div>
                        <div className="col-auto form-login-input">
                            <input type="text" className="form-control input-small py-1" id="inputLogin"/>
                        </div>
                    </div>

                    <div className="mb-3 row g-3 align-items-center">
                        <div className="col-auto">
                            <label htmlFor="inputLoginPass" className="form-label">Пароль</label>
                        </div>
                        <div className="col-auto">
                            <input type="password" className="form-control input-small py-1" id="inputLoginPass" />
                        </div>
                    </div>

                    <div className='d-grid gap-2'>
                        <button type="submit" className="btn bg-bright btn-sm form-button">Войти!</button>
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

export default LoginForm;
