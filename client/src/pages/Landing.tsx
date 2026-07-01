import { useNavigate } from "react-router-dom";
import CustomBtn from "../components/Custombutton";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:max-w-md sm:p-10">
        <h1 className="text-center text-lg font-bold text-[#0F2A4A] sm:text-2xl">
          OnferenceTV
        </h1>
        <p className="mt-1 text-center text-xs font-medium text-slate-500 sm:text-sm">
          Software Development Intern Assignment
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <CustomBtn text="Login" onClick={() => navigate("/login")} />
          <CustomBtn
            text="Register"
            variant="outline"
            onClick={() => navigate("/register")}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
