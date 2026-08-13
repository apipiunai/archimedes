import { useTheme } from "../providers/ThemeProvider";


export default function Card({children, style}) {
    const { theme } = useTheme();
    return (
        <div style={{padding: "20px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", backgroundColor: theme.card, ...style}}>
            {children}
        </div>
    )
}