import { useContext } from "react";
import { BsFillBrightnessHighFill, BsGrid, BsMoonStarsFill } from "react-icons/bs";
import { Context } from "./Context";

export default function Nav(){
    const {themeColor,setThemeColor} = useContext(Context)

    function handleDarkMode(e){
        let newThemeColor = themeColor==='dark'?'light':'dark'
        setThemeColor(newThemeColor)
        localStorage.setItem('themeColor',newThemeColor)
    }
    return(
        <nav className="mainNav">
        <div className="menu">
            <BsGrid size="100%"/>
        </div>
        <div className="mainNavTitle">My Tasks</div>
        <div className="darkModeIcon" onClick={handleDarkMode}>
            {themeColor==='dark'?<BsMoonStarsFill size="100%" />:<BsFillBrightnessHighFill size="100%" />}
        </div>
        </nav>
    )
}