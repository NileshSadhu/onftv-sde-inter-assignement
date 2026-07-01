import { useNavigate } from "react-router-dom";
import CustomBtn from "../components/Custombutton";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:max-w-md sm:p-10">
        <p className="text-5xl font-extrabold text-[#0F2A4A] sm:text-6xl">
          404
        </p>
        <h1 className="mt-3 text-lg font-bold text-[#0F2A4A] sm:text-xl">
          Page not found
        </h1>
        <p className="mt-2 text-xs text-slate-500 sm:text-sm">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <CustomBtn
            text="Go Back"
            variant="outline"
            onClick={() => navigate(-1)}
          />
          <CustomBtn text="Home" onClick={() => navigate("/dashboard")} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
