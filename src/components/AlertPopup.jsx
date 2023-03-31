
export default function AlertPopup(props) {

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className={'popup__container'}>
        <p>{props.message}</p>
        <button onClick={props.onClose} className="popup__closer hovered-link" type="button" aria-label="Закрыть"></button>
      </div>
    </div>
  )
}