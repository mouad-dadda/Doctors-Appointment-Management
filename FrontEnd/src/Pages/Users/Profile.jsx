import React, { useEffect } from "react";
import { Footer, Header } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../AxiosClient";
import { addUserData, logout } from "../../Redux/SliceAuthUser";
import { useNavigate } from "react-router";
import { get, remove } from "../../Services/LocalStorageService";

const Profile = () => {
  const UserData = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(UserData);

  useEffect(() => {
    if (UserData.isAuthenticated && get("TOKEN") && UserData.user === null) {
      axiosClient
        .get("/user")
        .then((re) => {
          dispatch(addUserData(re.data));
        })
        .catch((er) => {
          navigate("/Connexion");
        });
    }
  }, []);

  const HandleLogout = () => {
    axiosClient
      .post("/logout")
      .then((res) => {
        if (res.data.success && res.status === 200) {
          dispatch(logout());
          remove("TOKEN");
          navigate("/Connexion");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div>
        <p> page profile </p>
        {UserData.user && (
          <p>
            nom : {UserData.user.firstname} <br />
            prenom :{UserData.user.lastname} <br />
            email :{UserData.user.email} <br />
            cin : {UserData.user.cin} <br />
          </p>
        )}
        <div>
          <button
            onClick={HandleLogout}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;