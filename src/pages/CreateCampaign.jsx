import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../component";
import { checkIfImage } from "../utils";
import { useStateContext } from "../context";
export const CreateCampaign = () => {
  const navigate = useNavigate();
  const { createCampaign } = useStateContext();
  const [isloading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };
  const handlechane = (event) => {
    const { name, value } = event.target;
    setForm((p) => {
      return { ...p, [name]: value };
    });
  };
  console.log(form);
  return (
    <div className="bg-[#1c1c24] dark:bg-slate-300 flex justify-center items-center rounded-[10px] sm:p-10 p-4 flex-col">
      {isloading && <Loader />}

      <div>
        <h1 className="font-epilogue font-bold sm:text-[15px] text-[16px] leading-[28px] dark:text-black text-white">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName=" Your Name *"
            placeholder="Godspower Ufot"
            InputType="text"
            value={form.name}
            name="name"
            handleChange={handlechane}
          />
          <FormField
            labelName=" Campaign Title *"
            placeholder="Input a Title"
            inputType="text"
            name="title"
            value={form.title}
            handleChange={handlechane}
          />
        </div>
        <FormField
          labelName=" Story *"
          placeholder="Tell Your Story"
          isTextArea
          name="description"
          value={form.description}
          handleChange={handlechane}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px]  text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            name="target"
            value={form.target}
            handleChange={handlechane}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            name="deadline"
            value={form.deadline}
            handleChange={handlechane}
          />
        </div>
        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          name="image"
          value={form.image}
          handleChange={handlechane}
        />
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};
