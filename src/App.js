import "./App.scss";
import NavHeader from "./components/Navigation/NavHeader";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState, useContext } from "react";
import AppRoutes from "./routes/AppRoutes";
import { Rings } from "react-loader-spinner";
import { UserContext } from "./context/UserContext";
import { Scrollbars } from "react-custom-scrollbars-2";

function App() {
  // const [account, setAccount] = useState({});
  // useEffect(() => {
  //   let session = sessionStorage.getItem("account");
  //   if (session) {
  //     setAccount(JSON.parse(session));
  //   }
  // }, []); Khong dung session, dung context
  const { user } = useContext(UserContext);
  const [scrollHeight, setScrollHeight] = useState(0);
  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight);
  }, [user]);

  return (
    <>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax={scrollHeight} 
        thumbMinSize={30}
        universal={true}
        style={{ height: scrollHeight }}
      >
        <Router>
          {user && user.isLoading ? (
            <>
              <div className="loading-container">
                <Rings
                  height="80"
                  width="80"
                  radius="9"
                  color="#1877f2"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
                <div>LOADING DATA ...</div>
              </div>
            </>
          ) : (
            <>
              <div className="app-header">
                <NavHeader />
              </div>
              <div className="app-container">
                <AppRoutes />
              </div>
            </>
          )}
        </Router>
      </Scrollbars>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
