import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "./validations/loginSchema";

const ManageLoginPage = () => {
  return (
    <div className="text-white">
      <div className="pl-3">
        <p className="font-bold text-2xl">Login</p>
      </div>
    </div>
  );
};

export default ManageLoginPage;
