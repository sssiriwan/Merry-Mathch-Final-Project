import { Input } from "@/components/ui/input";
import { ButtonDemo } from "@/components/base/button/Button";

function PackageSearch({ setSearchItems }) {
  return (
    <div>
      <div className="flex flex-row">
        <Input
          className="flex w-80 p-3 items-center gap-4 rounded-md border border-gray-300 bg-white mr-2"
          placeholder="Search..."
          onChange={(event) => { setSearchItems(event.target.value) }}
        />
        <div>
          <ButtonDemo>
            <a href="/admin/package">+ Add Package</a>
          </ButtonDemo>
        </div>
      </div>
    </div>
  );
}

export default PackageSearch;
