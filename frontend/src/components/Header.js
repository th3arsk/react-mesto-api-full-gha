import headerLogo from '../images/header__logo.svg'

function Header(props) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Логотип"
      />
      <div className="header__container">
        <p className="header__email">{props.onEmail}</p>
        <button onClick={props.handleClick} className="header__link">{props.text}</button>
      </div>
    </header>
  )
}  

export default Header;