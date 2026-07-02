import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CampaignForm, {
  type CampaignFormValues,
} from "../../components/CampaignForm";
import CustomBtn from "../../components/Custombutton";
import { fetchCampaignById, updateCampaignApi } from "../../api/campaign.api";

const EditCampaign = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<CampaignFormValues | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadCampaign = async () => {
      try {
        const campaign = await fetchCampaignById(id);
        setInitialValues({
          name: campaign.name ?? "",
          objective: campaign.objective ?? "",
          subjectLine: campaign.subjectLine ?? "",
          previewText: campaign.previewText ?? "",
          emailContent: campaign.emailContent ?? "",
          ctaText: campaign.ctaText ?? "",
          ctaUrl: campaign.ctaUrl ?? "",
          audience: campaign.audience ?? "",
          status: campaign.status,
        });
      } catch (err: any) {
        setError(err?.response?.data?.message ?? "Failed to load campaign.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCampaign();
  }, [id]);

  const handleUpdate = async (values: CampaignFormValues) => {
    if (!id) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await updateCampaignApi(id, values);
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to update campaign. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-4 w-32">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#0F2A4A] px-5 py-3 rounded-xl text-white"
          >
            Back
          </button>
        </div>

        <div className="rounded-xl p-6 sm:p-8">
          <h1 className="mb-6 text-xl font-bold text-[#0F2A4A] sm:text-2xl">
            Edit Campaign
          </h1>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {isLoading ? (
            <p className="text-sm text-gray-500">Loading campaign...</p>
          ) : initialValues ? (
            <CampaignForm
              initialValues={initialValues}
              onSubmit={handleUpdate}
              isSubmitting={isSubmitting}
              submitLabel="Update Campaign"
            />
          ) : (
            <p className="text-sm text-gray-500">Campaign not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCampaign;
