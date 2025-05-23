// import { useRouter } from "next/navigation";
import { useEffect } from 'react';
// import { useFormState } from "react-dom";
import { toast } from 'react-toastify';
// import createSession from "../actions/createSession";
// import { useAuth } from "@/context/authContext";
import { Link, redirect } from 'react-router';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/auth/useLogin';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const { login } = useLogin();
  const onSubmit = async (data) => {
    await login(data.email, data.password);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      // setError('root', {
      //   message: 'This email is already taken',
      // });
    }
  };

  useEffect(() => {
    if (errors) toast.error(errors);
    if (isSubmitSuccessful) {
      toast.success('Logged in successfully!');
      // setIsAuthenticated(true);
      redirect('/');
    }
  }, [errors, isSubmitSuccessful]);

  return (
    <div className="flex items-center justify-center w-auto md:w-md">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border rounded w-full py-2 px-3"
              autoComplete="email"
              required
              {...register('email')}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border rounded w-full py-2 px-3"
              autoComplete="password"
              required
              {...register('password')}
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>

            <p>
              No account?
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
