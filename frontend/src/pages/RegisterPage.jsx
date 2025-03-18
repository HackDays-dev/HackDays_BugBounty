const RegisterPage = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <input className="w-full p-2 mb-2 border rounded" placeholder="Email" />
          <input className="w-full p-2 mb-2 border rounded" type="password" placeholder="Password" />
          <button className="w-full bg-green-500 text-white p-2 rounded">Register</button>
        </div>
      </div>
    );
  };
  export default RegisterPage;