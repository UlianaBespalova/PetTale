import logo from '../../img/logo.svg';

const Logo = () => {
    return (
        <a className="navbar-brand fs-3" href="#">
            <img src={logo} alt="" width="140" className="d-inline-block align-top" />
        </a>
    )
}

export default Logo;
