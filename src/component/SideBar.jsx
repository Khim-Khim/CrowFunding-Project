import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher.jsx";
import { logo, sun, logout } from "../assets";
import { navlinks } from "../constants";
import { useDisconnect } from "@thirdweb-dev/react";
const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && " dark:bg-slate-500 bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles} hover:dark:bg-slate-500 hover:bg-[#2c2f32]`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

export const SideBar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [loading, setLoading] = useState(true); // State for loading indicator
  const disconnect = useDisconnect();
  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 7000);

    // Cleanup function
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon
          styles="w-[52px] h-[52px] dark:bg-slate-300 bg-[#2c2f32]"
          imgUrl={logo}
        />
      </Link>
      {loading ? (
        <div className="animate-pulse rounded-[20px] h-[93vh]  w-[76px] py-4 mt-12 bg-[#1c1c24] ">
          {/* Skeleton loading effect */}
          <div className="flex flex-col justify-center items-center gap-3">
            {navlinks.map((link, index) => (
              <div
                key={link.name}
                className="animate-pulse dark:bg-slate-300 bg-[#2c2f32] w-[48px] h-[48px] rounded-[10px] "
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between items-center dark:bg-slate-300 bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
          {/* Display loading skeleton if loading state is true */}

          <div className="flex flex-col justify-center items-center gap-3">
            {navlinks.map((link) => (
              <Icon
                key={link.name}
                {...link}
                isActive={isActive}
                handleClick={() => {
                  if (!link.disabled) {
                    setIsActive(link.name);
                    navigate(link.link);
                  }
                }}
              />
            ))}
            <Link to="/">
              <Icon
                styles="w-[52px] h-[52px] dark:bg-slate-300 "
                imgUrl={logout}
                handleClick={disconnect}
              />
            </Link>
          </div>

          <ThemeSwitcher />
        </div>
      )}
    </div>
  );
};
