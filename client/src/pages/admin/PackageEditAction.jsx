import { ButtonDemo, ButtonSecondary } from "@/components/base/button/Button";

function PackageEditAction() {
  return (
    <div className="flex space-x-2">
      <ButtonSecondary>Cancel</ButtonSecondary>
      <ButtonDemo>Edit</ButtonDemo>
    </div>
  );
}

export default PackageEditAction;
