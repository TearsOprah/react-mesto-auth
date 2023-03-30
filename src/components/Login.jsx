import {useState} from "react";
import * as auth from "../utils/auth";
import {useNavigate} from "react-router-dom";

export default function Login(props) {

  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValue.email || !formValue.password){
      return;
    }

    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        // нужно проверить, есть ли у данных jwt
        if (data.token){
          // сохраняем токен в localStorage
          localStorage.setItem('jwt', data.token);
          // сбросить стейт, затем в колбэке установить
          // стейт loggedIn родительского App как true,
          setFormValue({email: '', password: ''});
          props.handleLogin()
          // перенаправьте его в /
          navigate('/', {replace: true});
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className={'login'}>
      <h2 className={'login__title'}>Вход</h2>
      <form onSubmit={handleSubmit} className={'login__form'}>
        <input className={'login__input'}
               id={'email'}
               name="email"
               onChange={handleChange}
               value={formValue.email}
               type={'email'}
               placeholder={'Email'}
               required />
        <input className={'login__input'}
               onChange={handleChange}
               id={'password'}
               name="password"
               value={formValue.password}
               type={'password'}
               placeholder={'Пароль'}
               required />
        <button className={'login__submit-button'} type={"submit"}>Войти</button>
      </form>
    </div>
  )
}