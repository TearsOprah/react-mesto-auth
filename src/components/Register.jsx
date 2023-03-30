import {Link, useNavigate} from "react-router-dom";
import * as auth from "../utils/auth";
import {useState} from "react";


export default function Register() {

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    auth.register({ password, email }).then((res) => {
      navigate('/sign-in', {replace: true})
    })
  }

  return (
    <div className={'login'}>
      <h2 className={'login__title'}>Регистрация</h2>
      <form onSubmit={handleSubmit}
            className={'login__form'}>
        <input id={'email'}
               name="email"
               onChange={handleChange}
               value={formValue.email}
               className={'login__input'}
               type={'email'}
               placeholder={'Email'}
               required/>
        <input onChange={handleChange}
               id={'password'}
               name="password"
               value={formValue.password}
               className={'login__input'}
               type={'password'}
               placeholder={'Пароль'}
               required />
        <button className={'login__submit-button'}
                type={"submit"}>Зарегистрироваться</button>
      </form>
      <p className={'login__bottom-row'}>Уже зарегистрированы? <Link className={'login__link'} to={'/sign-in'}>Войти</Link></p>
    </div>
  )
}