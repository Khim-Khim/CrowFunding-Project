import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../component";
export const Profile = () => {
  const [isLoading, setisLoading] = useState(false);
  const [campaigns, setcampaigns] = useState([]);
  const { address, contract, getUserCampaigns } = useStateContext();
  const fetchAllCampaigns = async () => {
    setisLoading(true);
    //data being fetch
    const data = await getUserCampaigns();
    setcampaigns(data);
    //update the state of the campaign
    setisLoading(false);
  };
  //Using the useeffect because am fetching an external function from thirdweb
  useEffect(() => {
    contract && fetchAllCampaigns();
  }, [address, contract]);
  console.log("this is the  all campaign relating to the user,", campaigns);
  return (
    <div>
      <DisplayCampaigns
        title="Your Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
};
