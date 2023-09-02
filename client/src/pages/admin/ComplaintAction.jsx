import { ButtonDemo } from "@/components/base/button/Button";
import { Button } from "@/components/ui/button";

function ComplaintAction () {
    return (
        <div className="">
            <Button variant="link" className="font-bold text-pred-500">Cancel Complaint</Button>
            <ButtonDemo>Resolve Complaint</ButtonDemo>
        </div>
    )
}

export default ComplaintAction;