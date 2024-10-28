import { useContext } from "react";
import { supabase } from "../../SupabaseClient"; // Ensure this imports your Supabase client setup
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserProvider";

function Login() {
  const { email, password, setLoggedIn, setId, setEmail, setPassword } =
    useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      // Log in the user
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(data);
      console.log(error);

      // Check for error
      if (error) {
        alert(error.message); // Show error message
        return; // Stop further execution
      }

      // Set user ID and logged-in status
      if (data) {
        setId(data.id);
        setLoggedIn(true);
        alert("Logged in successfully!"); // Alert for successful login
        navigate("/"); // Navigate to the homepage
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-800">
      <form
        onSubmit={handleLogin}
        className="bg-neutral-900 p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl text-white font-semibold text-center mb-4">
          Login
        </h2>
        <label className="block mb-2 text-sm font-medium text-zinc-700">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md bg-neutral-800 focus:outline-none focus:ring focus:ring-orange-300 text-white"
            required
          />
        </label>
        <label className="block mb-4 text-sm font-medium text-zinc-700">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md bg-neutral-800 focus:outline-none focus:ring focus:ring-orange-300 text-white"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
