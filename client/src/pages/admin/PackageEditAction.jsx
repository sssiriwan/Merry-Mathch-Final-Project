import { ButtonDemo, ButtonSecondary } from "@/components/base/button/Button";
import { Link } from "react-router-dom";

function PackageEditAction() {
  return (
    <div className="flex space-x-2">
      <ButtonSecondary><Link to="/admin">Cancel</Link></ButtonSecondary>
      <ButtonDemo>Edit</ButtonDemo>
    </div>
  );
}

export default PackageEditAction;
