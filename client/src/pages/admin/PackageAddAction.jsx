import { ButtonDemo, ButtonSecondary } from "@/components/base/button/Button";

function PackageAddAction() {
  return (
    <div className="flex space-x-2">
      <ButtonSecondary>Cancel</ButtonSecondary>
      <ButtonDemo>Create</ButtonDemo>
    </div>
  );
}

export default PackageAddAction;
