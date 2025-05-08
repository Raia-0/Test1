import MenuIcon from '@mui/icons-material/Menu';
type Props = {
    onClick?: VoidFunction;
}

export default function burguer({onClick}:Props){
    return(
        <span onClick={onClick} className="text-[#9D2525] cursor-pointer">
            <MenuIcon/>
        </span>
    )
}