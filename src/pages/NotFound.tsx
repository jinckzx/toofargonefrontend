import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600">Oops! The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-4 text-lg text-blue-600 hover:text-blue-800 ul-black"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
