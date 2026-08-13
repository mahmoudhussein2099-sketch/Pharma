const ErrorFallback = ({ message }) => (
  <div className="text-center text-red-500 font-semibold py-8">
    {message || 'Something went wrong.'}
  </div>
);
export default ErrorFallback;
