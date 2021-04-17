import Logo from "../Logo";

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-main text-main px-sm-5 mx-sm-4">
            <div className="container-fluid py-3">
                <Logo/>
                <div className="clicable-text">
                    Корзина
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
