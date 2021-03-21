import Logo from "../Logo";

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-info px-sm-5 mx-sm-4">
            <div className="container-fluid py-3">
                <Logo />
                <div>
                    Корзина
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
