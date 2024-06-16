import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../component";
export const Home = () => {
  const [isLoading, setisLoading] = useState(false);
  const { address, contract, getCampaigns } = useStateContext();

  const [campaigns, setcampaigns] = useState([]);
  //the fetchallcampaigns is an async function that fetch another function call getcampaigns which fetches all the campaigns in the smart contract
  const fetchAllCampaigns = async () => {
    setisLoading(true);
    //data being fetch
    const data = await getCampaigns();
    setcampaigns(data);
    //update the state of the campaign
    setisLoading(false);
  };

  //Using the useeffect because am fetching an external function from thirdweb
  useEffect(() => {
    contract && fetchAllCampaigns();
  }, [address, contract]);
  console.log("this is the home,", campaigns);
  return (
    <div>
      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
};
