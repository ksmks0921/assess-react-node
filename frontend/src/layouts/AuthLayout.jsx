import { Navigate, Outlet, Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const AuthLayout = (props) => {
    const { user, logout } = useAuthContext();
    return (
        user ? 
        <>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-white font-bold text-xl">
                    News Aggregator
                    </Link>
                    <div>
                    <Link
                        to="/"
                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0 "
                    >
                        Home
                    </Link>
                    {user? (
                        <button
                        onClick={logout}
                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0 ml-2"
                        >
                            Logout
                        </button>
                    ) : (
                        <>  
                            <Link
                                to="/register"
                                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0 ml-2"
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0 ml-2"
                            >
                                    Login
                            </Link>
                        </>
                    ) }
                    
                    </div>
                </div>
            </nav>
            <Outlet /> 
            
        </> : <Navigate to="/login" />
        
    )
};

export default AuthLayout;
