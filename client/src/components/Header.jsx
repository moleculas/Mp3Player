import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../assets/img";
import { LogoMovil } from "../assets/imgMovil";
import { useStateValue } from "../Context/StateProvider";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";
import { actionType } from "../Context/reducer";
import { FaCrown } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const logout = () => {
    dispatch({
      type: actionType.SET_SONG_PLAYING,
      isSongPlaying: false,
    });
    // const firebaseAuth = getAuth(app);
    // firebaseAuth
    //   .signOut()
    //   .then(() => {
    //     window.localStorage.setItem("auth", "false");
    //   })
    //   .catch((e) => console.log(e));
    // navigate("/login", { replace: true });
  };

  return (
    <header className="flex flex-col sm:flex-row w-full p-4 md:py-2 md:px-6 -mb-4">
      <div className="flex flex-col sm:flex-row">
        <NavLink to={"/"}>
          <img src={Logo} className="hidden sm:block w-32" alt="" />
          <img src={LogoMovil} className="sm:hidden w-full" alt="" />
        </NavLink>
        <p className="hidden sm:block font-normal ml-2 mt-0 sm:mt-10">
          Trojan ràdio show - @21CDBoy.
        </p>
      </div>
      {/* <div
        className="flex items-center ml-3 sm:ml-auto mt-2 sm:mt-0 cursor-pointer gap-2 relative"
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
      >
        <img
          className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
          src={user?.user?.imageURL}
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">
            {user?.user.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Membre Premium.{" "}
            <FaCrown className="text-xm -ml-1 text-yellow-500" />{" "}
          </p>
        </div>
        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 right-0 w-275 p-4 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-xl flex flex-col"
          >
            {user?.user.role === "admin" && (
              <>
                <NavLink to={"/dashboard/home"}>
                  <p className="text-base text-textColor">
                    Dashboard
                  </p>
                </NavLink>
                <hr />
              </>
            )}
            <p
              className="text-base text-textColor"
              onClick={logout}
            >
              Sortir
            </p>
          </motion.div>
        )}
      </div> */}
    </header>
  );
};

export default Header;
