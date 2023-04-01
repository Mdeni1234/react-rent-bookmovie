import "./App.css";
import { LayoutContextWrapper } from "./Context/LayoutContext";
import { UserProvider } from "./Context/UserContext";
import Main from "./Layout/Main";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <LayoutContextWrapper>
          <Main />
        </LayoutContextWrapper>
      </UserProvider>
    </div>
  );
}

export default App;
