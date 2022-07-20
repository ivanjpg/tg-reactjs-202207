import { useContext } from "react";
import AuthContext from "../AuthContext";

const Home = () => {
  const [authInfo, setAuthInfo] = useContext(AuthContext);

  return(
    <>
    <h2>Bienvenido a la página</h2>
    <p>
      Hola {authInfo.firstName} {authInfo.lastName} (<i>{authInfo.email}</i>)
    </p>
    </>
  );
}

export default Home;