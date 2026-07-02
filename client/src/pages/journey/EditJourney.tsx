import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { JourneyFormValues } from "../../components/JourneyForm";
import { fetchJourneyById, updateJourneyApi } from "../../api/journey.api";
import type { JourneyAction, JourneyTrigger } from "../../types/journey";
import CustomBtn from "../../components/Custombutton";
import JourneyForm from "../../components/JourneyForm";

const extractCampaignId = (value: unknown): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "_id" in value) {
    return String((value as { _id: string })._id);
  }
  return "";
};

const EditJourney = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<JourneyFormValues | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadJourney = async () => {
      try {
        const journey = await fetchJourneyById(id);
        const action = journey.actions?.[0];

        setInitialValues({
          name: journey.name ?? "",
          trigger: journey.trigger,
          actionType: action?.type ?? "SEND_EMAIL",
          campaignId: extractCampaignId(action?.campaignId),
          waitDuration: action?.waitDuration ? String(action.waitDuration) : "",
          hasCondition: Boolean(action?.condition),
          onYesActionType: action?.condition?.onYes.type ?? "SEND_EMAIL",
          onYesCampaignId: extractCampaignId(
            action?.condition?.onYes.campaignId,
          ),
          onNoActionType: action?.condition?.onNo.type ?? "SEND_EMAIL",
          onNoCampaignId: extractCampaignId(action?.condition?.onNo.campaignId),
        });
      } catch (err: any) {
        setError(err?.response?.data?.message ?? "Failed to load journey.");
      } finally {
        setIsLoading(false);
      }
    };

    loadJourney();
  }, [id]);

  const handleUpdate = async (payload: {
    name: string;
    trigger: JourneyTrigger;
    actions: JourneyAction[];
  }) => {
    if (!id) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await updateJourneyApi(id, payload);
      navigate("/journeys");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to update journey. Please try again.",
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
            Edit Journey
          </h1>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {isLoading ? (
            <p className="text-sm text-gray-500">Loading journey...</p>
          ) : initialValues ? (
            <JourneyForm
              initialValues={initialValues}
              onSubmit={handleUpdate}
              isSubmitting={isSubmitting}
              submitLabel="Update Journey"
            />
          ) : (
            <p className="text-sm text-gray-500">Journey not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditJourney;
