export const Error404 = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 to-lime-200 text-gray-800'>
      <div className='rounded-lg bg-white p-12 shadow-2xl text-center max-w-sm'>
        <h1 className='text-8xl font-extrabold text-green-700 mb-6'>404</h1>
        <p className='text-lg text-gray-600 mb-8'>
          Oops! The page you are looking for does not exist.
        </p>
        <a
          href='/'
          className='inline-block bg-green-700 text-white font-medium text-sm uppercase tracking-wide px-8 py-3 shadow-lg rounded-lg hover:bg-green-800 hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
        >
          Return to Homepage
        </a>
      </div>
    </div>
  );
};
