import { ButtonDemo } from "@/components/base/button/Button";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ComplaintAction() {
  const navigate = useNavigate();
  const param = useParams();
  const [status, setStatus] = useState("");

  const getComplaint = async () => {
    const result = await axios.get(
      `http://localhost:4000/admin/complaint/${param.complainId}`
    );
    console.log(result.data.data);

    setStatus(result.data.data.complaint_status);
  };

  const handleCancelClick = async () => {
    // Update the status of the complaint to Pending
    try {
     
        const updateComplaint = {
          status: "Cancel",
        };
        const result = await axios.put(
          `http://localhost:4000/admin/complaint/${param.complainId}`,
          updateComplaint
        );
      
            //  Navigate to the complaint page
      navigate(`/admin/complain`);
    } catch (error) {
      alert(error);
    }
  };
  const handleResolvelClick = async () => {
    // Update the status of the complaint to Pending
    try {
     
        const updateComplaint = {
          status: "Resolved",
        };
        const result = await axios.put(
          `http://localhost:4000/admin/complaint/${param.complainId}`,
          updateComplaint
        );
      
    
      //  Navigate to the complaint page มาแก้ภายหลังให้นำไปหน้า ที่แก้เสร็จแล้ว
      navigate(`/admin/complain`);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getComplaint();
  }, []);

  return (
    <div>
      <Button variant="link" className="font-bold text-pred-500" onClick={() => handleCancelClick()}>
        Cancel Complaint
      </Button>
      <ButtonDemo onClick={() => handleResolvelClick()}>Resolve Complaint</ButtonDemo>
    </div>
  );
}

export default ComplaintAction;
