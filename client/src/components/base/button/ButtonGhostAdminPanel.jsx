import { Button } from "@/components/ui/button";
// 
function ButtonGhostAdminPanel(props) {
    return (
        <Button variant="ghost" className="w-full h-16 font-extrabold text-pgray-800 justify-start pl-5 hover:bg-pgray-200 hover:text-pgray-800">
            <img src={props.imgSrc} className="mr-3" />
            {props.title}
        </Button>
    )
}

export default ButtonGhostAdminPanel