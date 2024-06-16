import useThemeSwitcher from "../hooks/useThemeSwitcher";
export const ThemeSwitcher = () => {
  const [activeTheme, setTheme] = useThemeSwitcher();
  return (
    <div
      className="  md:left-[7%] lg:left-[10%] xl:left-[20%] left-[2%] z-[9999] cursor-pointer backdrop-blur-xl rounded-full"
      onClick={() => setTheme(activeTheme)}
    >
      {activeTheme === "light" ? (
        <img alt="" src="/svgs/moon.svg" className="w-[40px] h-[40px]" />
      ) : (
        <img alt="" src="/svgs/sun.svg" className="w-[40px] h-[40px]" />
      )}
    </div>
  );
};
