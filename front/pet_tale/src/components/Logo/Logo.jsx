import logo from '../../logo.svg';

const Logo = () => {
    return (
        <a className="navbar-brand fs-3" href="#">
            <img src={logo} alt="" width="45" height="36" className="d-inline-block align-top" />
            Pet Tale
        </a>
    )
}

export default Logo;
