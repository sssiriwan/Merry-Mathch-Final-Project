import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";

const h4style = "font-semibold text-pgray-700 mb-2";
const divStyle = "m-5";

function ComplaintDetail() {
    const [complainUserId, setComplainUserId] = useState("John Snow");
    const [complainTitle, setComplainTitle] = useState("I was insulted by Ygritte");
    const [complainDescription, setComplainDescription] = useState("Hello, there was a problem with user 'Ygritte' who insult me. Can you check her out?");
    const [complainCreatedAt, setComplainCreatedAt] = useState(Date);

    return (
        <div className="px-10 py-5">
            <div className={divStyle}>
                <h4 className={h4style}>Complaint by: <small className="text-black">{complainUserId}</small></h4>
            </div>
            <div className="flex justify-center"><hr className="border-pgray-500 border-1 w-[95%]" /></div>
            <div className={divStyle}>
                <h4 className={h4style}>Issue</h4>
                <p>{complainTitle}</p>
            </div>
            <div className={divStyle}>
                <h4 className={h4style}>Description</h4>
                <p>{complainDescription}
                </p>
            </div>
            <div className={divStyle}>
                <h4 className={h4style}>Date Submitted</h4>
                <p>{complainCreatedAt}
                </p>
            </div>
        </div>
    )
}

export default ComplaintDetail