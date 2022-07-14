const Login = () => {
  return (
    <>
      <h3>Ingrese sus datos para continuar</h3>

      <form>
        <label htmlFor="">
          Usuario:
          <input type="text" />
        </label><br />
        
        <label htmlFor="">
          Contraseña:
          <input type="password" />
        </label> <br />

        <input type="submit" value="Ingresar" />
      </form>
    </>
  )
}

export default Login;