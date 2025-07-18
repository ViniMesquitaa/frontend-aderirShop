import { IMaskInput } from "react-imask";

const InputUI = ({ typeInput, nameLabel, placeHolder, mask }) => {
  return (
    <div className="space-y-1">
      <label htmlFor="fullName" className="text-sm font-medium text-black">
        {nameLabel}
      </label>
      <IMaskInput
        mask={mask}
        type={typeInput}
        name="fullName"
        id="fullName"
        className="w-full px-4 py-3 rounded-lg border-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder={placeHolder}
      />
    </div>
  );
};
export default InputUI;
