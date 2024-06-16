import React, { useState } from "react";
import { CustomButton } from "./CustomButton";
import { Loader } from "./Loader";
export const WithdrawModal = ({ handleClose, handleWithdraw }) => {
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setWithdrawalAmount(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await handleWithdraw(withdrawalAmount);
    setIsLoading(false);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-filter backdrop-blur-lg">
      {isLoading && <Loader />}

      <div className="bg-[#2c2f32] dark:bg-white p-6 rounded-lg w-[300px] shadow-lg">
        <h1 className=" font-bold sm:text-[15px] text-[16px] leading-[28px] dark:text-black text-white mb-5">
          WITHDRAW FUNDS
        </h1>
        <input
          type="number"
          placeholder="Enter amount to withdraw"
          value={withdrawalAmount}
          onChange={handleChange}
          className="w-full py-[5px] sm:px-[20px] px-[10px] outline-none border-[3px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[10px] placeholder:text-[#4b5264] rounded-[7px]"
        />
        <div className="flex  justify-around gap-2 mt-4">
          <CustomButton
            btnType="button"
            title="OK"
            styles="bg-[#1dc071] hover:bg-green-600 text-white font-bold py-2 px-4  min-h-[20px] w-[120px] rounded-[7px]"
            handleClick={handleSubmit}
            disabled={isLoading}
          />
          <CustomButton
            btnType="button"
            title="Cancel"
            styles="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4  min-h-[20px] w-[120px] rounded-[7px]"
            handleClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
};
