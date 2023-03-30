
export default function Login() {
  return (
    <div className={'login'}>
      <h2 className={'login__title'}>Вход</h2>
      <form className={'login__form'}>
        <input className={'login__input'} type={'email'} placeholder={'Email'} required />
        <input className={'login__input'} type={'password'} placeholder={'Пароль'} required />
        <button className={'login__submit-button'} type={"submit"}>Войти</button>
      </form>
    </div>
  )
}