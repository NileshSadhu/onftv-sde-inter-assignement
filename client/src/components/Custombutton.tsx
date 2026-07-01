interface CustomBtnProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "solid" | "outline";
}

const CustomBtn = ({
  text,
  onClick,
  type = "button",
  variant = "solid",
}: CustomBtnProps) => {
  const base =
    "w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition sm:text-base";

  const styles =
    variant === "solid"
      ? "bg-[#0F2A4A] text-white hover:bg-[#123456] active:bg-[#0A1D33]"
      : "border border-[#0F2A4A] text-[#0F2A4A] hover:bg-[#0F2A4A]/5";

  return (
    <button type={type} onClick={onClick} className={`${base} ${styles}`}>
      {text}
    </button>
  );
};

export default CustomBtn;
