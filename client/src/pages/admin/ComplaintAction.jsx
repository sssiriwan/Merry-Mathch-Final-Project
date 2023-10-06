import { ButtonDemo } from "@/components/base/button/Button";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

function ComplaintAction() {
  const navigate = useNavigate();
  const param = useParams();
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const getComplaint = async () => {
    const result = await axios.get(
      `http://localhost:4000/admin/complaint/${param.complainId}`
    );
    console.log(result.data.data);

    setStatus(result.data.data.complaint_status);
  };

  const handleCancelClick = () => {
    // Show the cancel confirmation modal
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    try {
      const updateComplaint = {
        status: "Cancel",
      };
      const result = await axios.put(
        `http://localhost:4000/admin/complaint/${param.complainId}`,
        updateComplaint
      );

      // Navigate to the complaint detail page
      navigate(`/admin/complain/detail/${param.complainId}`);
    } catch (error) {
      alert(error);
    }

    // Close the cancel modal
    setIsCancelModalOpen(false);
  };

  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  // Function to handle "Resolve Complaint" button click
  const handleResolvelClick = () => {
    // Show the confirmation modal
    setIsModalOpen(true);
  };

  // Function to handle confirmation of resolving the complaint
  const handleConfirmResolve = async () => {
    try {
      const updateComplaint = {
        status: "Resolved",
      };
      const result = await axios.put(
        `http://localhost:4000/admin/complaint/${param.complainId}`,
        updateComplaint
      );

      // Navigate to the complaint detail page
      navigate(`/admin/complain/detail/${param.complainId}`);
    } catch (error) {
      alert(error);
    }

    // Close the modal
    setIsModalOpen(false);
  };

  const handleCancelResolve = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  useEffect(() => {
    getComplaint();
  }, []);

  return (
    <div>
      <Button
        variant="link"
        className="font-bold text-pred-500"
        onClick={() => handleCancelClick()}
      >
        Cancel Complaint
      </Button>
      <ButtonDemo onClick={() => handleResolvelClick()}>
        Resolve Complaint
      </ButtonDemo>
      {isModalOpen && (
        <ConfirmationModal
          message="This complaint is resolved?"
          confirmLabel="Yes, it has been resolved"
          cancelLabel="No, it's not"
          onConfirm={handleConfirmResolve}
          onCancel={handleCancelResolve}
        />
      )}
      {isCancelModalOpen && (
        <ConfirmationModal
          message="Do you sure to cancel this conplaint?"
          confirmLabel="Yes, cancel this complaint"
          cancelLabel="No, give me moretime"
          onConfirm={handleConfirmCancel}
          onCancel={handleCloseCancelModal}
        />
      )}
    </div>
  );
}

export default ComplaintAction;
