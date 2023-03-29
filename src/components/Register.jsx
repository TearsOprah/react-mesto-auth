import {Link} from "react-router-dom";


export default function Register() {
  return (
    <div className={'login'}>
      <h2 className={'login__title'}>Регистрация</h2>
      <form className={'login__form'}>
        <input className={'login__input'} type={'email'} placeholder={'Email'}/>
        <input className={'login__input'} type={'password'} placeholder={'Пароль'}/>
        <button className={'login__submit-button'} type={"submit"}>Зарегистрироваться</button>
      </form>
      <p className={'login__bottom-row'}>Уже зарегистрированы? <Link className={'login__link'} to={'/sign-in'}>Войти</Link></p>
    </div>
  )
}