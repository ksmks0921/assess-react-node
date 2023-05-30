import { useState } from 'react';
import useAuthContext from '../context/AuthContext';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const { register, errors } = useAuthContext();
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    register({name, email, password, password_confirmation});
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (<div className='flex'>
                <span className="text-red-400 text-sm m-2 p-2">{errors.name[0]}</span>
            </div>)}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (<div className='flex'>
                <span className="text-red-400 text-sm m-2 p-2">{errors.email[0]}</span>
            </div>)}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className='flex'>
                <span className="text-red-400 text-sm m-2 p-2">{errors.password[0]}</span>
            </div>)}
        </div>
        <div className="mb-4">
          <label htmlFor="password_confirmation" className="block text-gray-700 font-bold mb-2">
            Password Confirmation:
          </label>
          <input
            type="password"
            id="password_confirmation"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
