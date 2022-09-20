import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { hotelInputs, productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { Navigate} from "react-router-dom"
import { hotelColumns, roomColumns, userColumns, verifyColums } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  //setting retriction for our route, so that any user thats not admin wont be able to access the routes
  const ProtectedRoute = ({children}) =>{
    const {user} = useContext(AuthContext);
// the is user is not admin redirect back to login 
    if(!user) {
      return <Navigate to="/login" />
    }
    return children;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route path="login" element={<Login />} />
            <Route index element={ 
            <ProtectedRoute> 
              <Home />
              </ProtectedRoute> } />
            <Route path="users">
              <Route index element={
              <ProtectedRoute> 
              <List columns={userColumns} />
              </ProtectedRoute> 
              } />
              <Route path=":userId" element={
              <ProtectedRoute> 
              <Single />
              </ProtectedRoute> 
              } />
              <Route
                path="new"
                element={
              <ProtectedRoute> 
              <New inputs={userInputs} title="Add New User" />
              </ProtectedRoute> 
                }
              />
            </Route>
            <Route path="hotels">
              <Route index element={<ProtectedRoute><List columns={hotelColumns} /></ProtectedRoute>} />
              <Route path=":productId" element={
                <ProtectedRoute> 
                <Single />
                </ProtectedRoute> 
              } />
              <Route
                path="new"
                element={
                <ProtectedRoute> 
                <NewHotel />
                </ProtectedRoute> 
                }
              />
            </Route>
            <Route path="rooms">
              <Route index element={<ProtectedRoute><List columns={roomColumns} /></ProtectedRoute>} />
              <Route path=":productId" element={
                <ProtectedRoute> 
                <Single />
                </ProtectedRoute> 
              } />
              <Route
                path="new"
                element={
                <ProtectedRoute> 
                <NewRoom />
                </ProtectedRoute> 
                }
              />
            </Route>
            <Route path="verify">
              <Route index 
              element={
              <ProtectedRoute>
                <List columns={verifyColums} />
                </ProtectedRoute>} 
                />
              <Route path=":id" element={
                <ProtectedRoute> 
                <Single />
                </ProtectedRoute> 
              } />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
