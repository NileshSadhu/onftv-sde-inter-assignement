import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampaignForm, {
  type CampaignFormValues,
} from "../../components/CampaignForm";
import CustomBtn from "../../components/Custombutton";
import { createCampaignApi } from "../../api/campaign.api";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (values: CampaignFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createCampaignApi(values);
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to create campaign. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-4 w-32">
          <CustomBtn
            text="← Back"
            variant="outline"
            onClick={() => navigate(-1)}
          />
        </div>

        <div className="rounded-xl bg-white p-6 shadow sm:p-8">
          <h1 className="mb-6 text-xl font-bold text-[#0F2A4A] sm:text-2xl">
            Create Campaign
          </h1>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <CampaignForm
            onSubmit={handleCreate}
            isSubmitting={isSubmitting}
            submitLabel="Create Campaign"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
