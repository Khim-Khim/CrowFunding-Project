import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import { CustomButton } from "./CustomButton";
import { WithdrawModal } from "./WithdrawalModel.jsx";
import { FundCard } from "./FundCard";
import { useStateContext } from "../context";
import { ethers } from "ethers";
export const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const { withdrawDelete, address } = useStateContext(); // Add withdraw function from context

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState("");

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  const handleWithdraw = async (id, amount) => {
    try {
      await withdrawDelete(id, ethers.utils.parseEther(amount.toString()));
      // Refresh campaign list
      console.log(id);
    } catch (error) {
      console.error("Error withdrawing funds:", error);
    }
  };

  const openWithdrawModal = (id) => {
    setSelectedCampaignId(id);
    setShowWithdrawModal(true);
  };

  const closeWithdrawModal = () => {
    setShowWithdrawModal(false);
    setSelectedCampaignId("");
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] dark:text-black text-white  text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign, index) => (
            <div
              className="sm:w-[288px] w-full rounded-[15px] dark:bg-slate-300 bg-[#1c1c24] cursor-pointer"
              key={campaign.id}
            >
              <FundCard
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
              />
              {campaign.owner === address && (
                <CustomButton
                  btnType="button"
                  title="Withdraw"
                  styles="w-[200px] bg-[#8c6dfd] ml-[30px] mb-[30px]"
                  handleClick={() => openWithdrawModal(index)}
                />
              )}
            </div>
          ))}
      </div>
      {showWithdrawModal && (
        <WithdrawModal
          handleWithdraw={(amount) =>
            handleWithdraw(selectedCampaignId, amount)
          }
          handleClose={closeWithdrawModal}
        />
      )}
    </div>
  );
};
