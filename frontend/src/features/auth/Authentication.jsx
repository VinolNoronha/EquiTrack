import { useContext } from "react";
import { supabase } from "../../SupabaseClient"; // Ensure this imports your Supabase client setup
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserProvider";

function Authentication() {
  const { email, password, setLoggedIn, setId, setEmail, setPassword } =
    useContext(UserContext);
  const navigate = useNavigate();

  async function handleAuth(e) {
    e.preventDefault();

    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:5173/",
        },
      });

      console.log(error);
      console.log(data);

      // Check for error
      if (error) {
        console.error("Sign Up Error:", error);
        alert(error.message); // Show error message
        return; // Stop further execution
      }

      // Set user ID and logged-in status
      if (data) {
        console.log(data);
        setId(data.user.id);
        setLoggedIn(true);
        alert("Signed up successfully!"); // Alert for successful sign-up
        navigate("/"); // Navigate to the homepage
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-800">
      <form
        onSubmit={handleAuth}
        className="bg-neutral-900 p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl text-white font-semibold text-center mb-4">
          Sign Up
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
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm text-zinc-600">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate("/auth")} // Redirect to login
            className="text-orange-600 hover:underline ml-2"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default Authentication;
