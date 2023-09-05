import React from "react";

function FooterSection({
  page,
  formLength,
  handlePrev,
  handleNext,
  handleSubmit,
}) {
  return (
    <div className="flex bg-white border border-pgray-300 h-[112px] justify-between items-center px-4">
      <div>
        {page + 1}/{formLength}
      </div>
      <div className="flex space-x-4">
        {page > 0 && (
          <button
            onClick={handlePrev}
            className="flex items-center text-[16px] font-[700] text-pred-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M12.5275 7.33665H5.08079L8.33412 4.08332C8.59412 3.82332 8.59412 3.39665 8.33412 3.13665C8.07412 2.87665 7.65412 2.87665 7.39412 3.13665L3.00079 7.52998C2.74079 7.78998 2.74079 8.20998 3.00079 8.46998L7.39412 12.8633C7.65412 13.1233 8.07412 13.1233 8.33412 12.8633C8.59412 12.6033 8.59412 12.1833 8.33412 11.9233L5.08079 8.66998H12.5275C12.8941 8.66998 13.1941 8.36998 13.1941 8.00332C13.1941 7.63665 12.8941 7.33665 12.5275 7.33665Z"
                fill="#C70039"
              />
            </svg>
            Back
          </button>
        )}
        {page < formLength - 1 ? (
          <button
            onClick={handleNext}
            className="bg-pred-500 text-white h-[48px] w-[150px] rounded-[99px] text-[16px] font-[700]"
          >
            Next step
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-pred-500 text-white h-[48px] w-[150px] rounded-[99px] text-[16px] font-[700]"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default FooterSection;
