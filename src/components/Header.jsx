import { Link } from 'react-router-dom';

import { FaUser, FaSignInAlt, FaSignOutAlt, FaBuilding } from 'react-icons/fa';
import { toast } from 'react-toastify';
// import destroySession from "@/app/actions/destroySession";
import logo from '../assets/logo.svg';
import { useLogout } from '../hooks/auth/useLogout';
import { useAuthContext } from '@/hooks/auth/useAuthContext';

const Header = () => {
  // const router = useRouter();

  // const { isAuthenticated, setIsAuthenticated } = useAuth();

  // const handleLogout = async () => {
  //   const { success, error } = await destroySession();

  //   if (success) {
  //     setIsAuthenticated(false);
  //     router.push("/login");
  //   } else {
  //     toast.error(error);
  //   }
  // };

  const { user } = useAuthContext();

  const { logout } = useLogout();

  return (
    <header className="bg-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img className="h-12 w-12" src={logo} alt="Bookit" />
            </Link>
            {user && (
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                  >
                    Rooms
                  </Link>
                  {/* <!-- Logged In Only --> */}
                  {/* {isAuthenticated && ( */}
                  <>
                    <Link
                      to="/bookings"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                    >
                      Bookings
                    </Link>
                    <Link
                      to="/rooms/add"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                    >
                      Add Room
                    </Link>
                  </>
                  {/* )} */}
                </div>
              </div>
            )}
          </div>
          {/* <!-- Right Side Menu --> */}
          <div className="ml-auto">
            <div className="ml-4 flex items-center md:ml-6">
              {/* <!-- Logged Out Only --> */}
              {/* {!isAuthenticated && ( */}
              {!user && (
                <>
                  <Link to="/login" className="mr-3 text-gray-800 hover:text-gray-600">
                    <FaSignInAlt className="inline mr-1" /> Login
                  </Link>
                  <Link to="/register" className="mr-3 text-gray-800 hover:text-gray-600">
                    <FaUser className="inline mr-1" /> Register
                  </Link>
                </>
              )}

              {user && (
                <>
                  <Link to="/rooms/my-rooms">
                    <FaBuilding className="inline mr-1" /> My Rooms
                  </Link>
                  <button
                    // onClick={handleLogout}
                    onClick={logout}
                    className="mx-3 text-gray-800 hover:text-gray-600"
                  >
                    <FaSignOutAlt className="inline mr-1" /> Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* <!-- Mobile menu --> */}
      <div className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <Link
            to="/"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
          >
            Rooms
          </Link>
          {/* <!-- Logged In Only --> */}
          {/* {isAuthenticated && ( */}
          <>
            <Link
              to="/bookings"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
            >
              Bookings
            </Link>
            <Link
              to="/rooms/add"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
            >
              Add Room
            </Link>
          </>
          {/* )} */}
        </div>
      </div>
    </header>
  );
};

export default Header;
