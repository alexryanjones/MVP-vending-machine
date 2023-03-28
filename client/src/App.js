import './App.css';
import userApi from './userApiService'

function App() {

  const handleClick = async () => {
    const user = {
      username: "Alex",
      password: "Alex1"
    }
    const token = await userApi.login(user);
    console.log(token);
  }

  return (
    <div className="App">
      <button onClick={() => handleClick()}>Click Me</button>
    </div>
  );
}

export default App;
