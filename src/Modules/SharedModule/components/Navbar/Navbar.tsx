import { useAuth } from "../../../../Context/AuthContext/AuthContext";

export default function Navbar() {
  const { loginData } = useAuth();
  console.log(loginData);
  return <div>Navbar</div>;
}
