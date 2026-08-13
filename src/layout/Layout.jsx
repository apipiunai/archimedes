import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useWindowSize } from "../providers/WindowSizeProvider";
import { useTheme } from "../providers/ThemeProvider";
import { useIdioma } from "../providers/IdiomaProvider";
import { useState, useEffect, useRef } from "react";
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import IconHover from "../components/IconHover";
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Desplegable from "../components/Desplegable";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';


export default function Layout() {
    const { width } = useWindowSize();
    const { theme, mode, setMode } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const { t, idioma, setIdioma } = useIdioma();


    const idiomas = [
        { name: "español", img: "images/es.png" },
        { name: "ingles", img: "images/en.png" }
    ]
    const pages = [
        { name: t("Tutorials"), path: "/tutorials" },
        { name: t("Components"), path: "/components" }
    ]



    const [headerHeight, setHeaderHeight] = useState(70);
    const [sidebarWidth, setSidebarWidth] = useState(236);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);

    useEffect(() => {
        setHeaderHeight(width > 800 ? 60 : 60);
        setSmallScreen(width > 800 ? false : true)
    }, [width]);




    return (
        <div style={{
            position: "relative",
            width: "100%",
            left: 0,
            top: 0,
            height: "100%",
            background: theme.background,
            color: theme.text1,
            overflow: "hidden"
        }}>

            <header style={{ position: "fixed", width: "100%", zIndex: 3, height: headerHeight, background: theme.header, borderBottom: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 20, alignItems: "center", paddingLeft: "20px" }}>
                    <img src={mode == "dark" ? "images/logo2.png" : "images/logo.png"} height={45} alt="" />
                    <Divider orientation="vertical" flexItem style={{ backgroundColor: theme.border }} />
                    <IconHover onClick={() => setOpenSidebar(!openSidebar)} icon={<MenuIcon />} />
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", paddingRight: "20px" }}>
                    {!smallScreen && <Divider orientation="vertical" flexItem style={{ marginRight: 20, backgroundColor: theme.border }} />
                    }
                    {smallScreen ? null : <Desplegable style={{ padding: 15 }} icon={<img height="20px" width="30px" src={idiomas.find(l => l.name === idioma)?.img} alt={idioma} style={{ cursor: "pointer" }} />} children={<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <div
                            style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}
                        >
                            {idiomas.map((l, index) => (
                                idioma === l.name ? null : <img key={l.name} height="20px" width="30px" src={l.img} alt={l.name} style={{ cursor: "pointer" }} onClick={() => setIdioma(l.name)} />
                            ))}
                        </div>
                    </div>} />}


                    <Desplegable style={{ padding: 10, display: "flex", flexDirection: "column", gap: 7.5, alignItems: "center" }} icon={<IconHover icon={<SettingsIcon />} />}>
                        {mode === "default" ?
                            <IconHover onClick={() => setMode("dark")} icon={<DarkModeIcon />} /> :
                            <IconHover onClick={() => setMode("default")} icon={<Brightness7Icon />} />
                        }
                        {
                            smallScreen && <div style={{ marginBottom: 2.5 }}>
                                {idioma === "español" ? <IconHover onClick={() => setIdioma("ingles")} icon={<img height="20px" width="30px" src={idiomas.find(l => l.name === "español")?.img} alt={idioma} style={{ cursor: "pointer" }} />} /> :
                                    <IconHover onClick={() => setIdioma("español")} icon={<img height="20px" width="30px" src={idiomas.find(l => l.name === "ingles")?.img} alt={idioma} style={{ cursor: "pointer" }} />} />
                                }
                            </div>
                        }
                    </Desplegable>
                </div>
            </header>

            {openSidebar && <aside style={{ zIndex: 3, position: "fixed", left: 0, top: headerHeight, background: theme.sidebar, width: sidebarWidth, height: `calc(100% - ${headerHeight}px)`, borderRight: `1px solid ${theme.border}`, borderTop: `1px solid ${theme.border}`, width: sidebarWidth }}>
                <div style={{ display: "flex", flexDirection: "column" }}>

                    {pages.map((page) => (
                        <div key={page.name} style={{ padding: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, borderBottom: `1px solid ${theme.border}` }}>
                            <Link to={page.path} style={{ textDecoration: "none", color: location.pathname.includes(page.path) ? theme.main : theme.text1, cursor: "pointer" }}>
                                {page.name}
                            </Link>
                        </div>
                    ))}
                </div>

            </aside>}

            {smallScreen && openSidebar && <div onClick={() => setOpenSidebar(false)} style={{ zIndex: 2, position: "fixed", left: 0, width: "100%", height: "100%", background: "black", opacity: 0.2, }} />}

            <div style={{
                zIndex: 1,
                overflowY: "auto",
                position: "fixed",
                height: `calc(100% - ${headerHeight}px)`,
                width: !smallScreen && openSidebar ? `calc(100% - ${sidebarWidth}px)` : `100%`,
                left: !smallScreen && openSidebar ? sidebarWidth : 0,
                top: headerHeight,
                display: "flex",
                flexDirection: "column",
                background: theme.background,
                padding: 20,
                boxSizing: "border-box"
            }}>
                <Outlet />
            </div>


            <style>
                {`
                    pre{color: ${theme.code};}
                `}
            </style>

        </div>


    );
}
