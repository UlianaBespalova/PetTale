import React, {useState} from 'react';
import LoginForm from "./AuthForms/LoginForm";
import SignUpForm from "./AuthForms/SignUpForm";
import './Auth.css';


const AuthClick = (el) => {
    const elem = el.target;
    [].slice.call(document.getElementsByClassName('auth-menu-items')).forEach((item)=>{
        item.classList.remove('auth-active');
    });
    if (!elem.classList.contains('collapsed')) elem.classList.add('auth-active');
}



const Auth = () => {

    let login = window.localStorage.getItem('user_login');
    let userId = parseInt(window.localStorage.getItem('user_id'));
    if (login===null || userId===-1) {
        login = "";
        userId = -1;
        window.localStorage.setItem('user_login', "");
        window.localStorage.setItem('user_id', "-1");
        window.localStorage.setItem('user_boughts', "");
    }
    const [userLogin, setUserLogin] = useState(login);

    const ExitClick = () => {
        setUserLogin(null);
        window.localStorage.setItem('user_login', "");
        window.localStorage.setItem('user_id', "-1");
        window.localStorage.setItem('user_boughts', "");
    }

    const updateLogin = (login, userId=0, userBoughts = "") => {
        setUserLogin(login);
        window.localStorage.setItem('user_login', login);
        window.localStorage.setItem('user_id', String(userId));
        window.localStorage.setItem('user_boughts', userBoughts);
    }

    return (
        <div>
            {userLogin ?
                <span>
                    <span className="fw-bold">{userLogin}</span> /
                    <span className='clicable-text' onClick={()=>ExitClick()}> Выход</span>
                </span> :
                <span onClick={(el)=>AuthClick(el)}>
                    <span className='clicable-text auth-menu-items'
                          data-bs-toggle="collapse" href="#signUpForm"
                          aria-expanded="false" aria-controls="signUpForm">Регистрация
                    </span> /
                    <span className='clicable-text auth-menu-items'
                          data-bs-toggle="collapse" href="#loginForm"
                          aria-expanded="false" aria-controls="loginForm"> Вход
                    </span>
                </span>}
            {!userLogin?
                <div className="accordion position-fixed" id="form" style={{zIndex: 10}}>
                    <SignUpForm updateLogin={updateLogin}/>
                    <LoginForm updateLogin={updateLogin}/>
                </div> : null}
        </div>
    )
}

export default Auth;
