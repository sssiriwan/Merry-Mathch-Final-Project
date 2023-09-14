import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";

const h4style = "font-semibold text-pgray-700 mb-2";
const divStyle = "m-5";

function ComplaintDetail(props) {
    // const [complainUserId, setComplainUserId] = useState();
    // const [complainTitle, setComplainTitle] = useState(`${props.title}`);
    // const [complainDescription, setComplainDescription] = useState(`${props.description}`);
    // const [complainCreatedAt, setComplainCreatedAt] = useState(`${props.date}`);

    console.log(complainTitle)

    return (
        <div className="px-10 py-5">
            <div className={divStyle}>
                <h4 className={h4style}>Complaint by: <small className="text-black">{props.name}</small></h4>
            </div>
            <div className="flex justify-center"><hr className="border-pgray-500 border-1 w-[95%]" /></div>
            <div className={divStyle}>
                <h4 className={h4style}>Issue</h4>
                <p>{props.title}</p>
            </div>
            <div className={divStyle}>
                <h4 className={h4style}>Description</h4>
                <p>{props.description}
                </p>
            </div>
            <div className={divStyle}>
                <h4 className={h4style}>Date Submitted</h4>
                <p>{props.date}
                </p>
            </div>
        </div>
    )
}

export default ComplaintDetail