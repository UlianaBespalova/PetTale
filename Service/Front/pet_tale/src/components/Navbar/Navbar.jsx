import Logo from "../Logo";
import Auth from "../Auth";

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-main text-main px-sm-5 mx-sm-4">
            <div className="container-fluid py-3">
                <Logo/>
                <div className="">
                    <Auth />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
