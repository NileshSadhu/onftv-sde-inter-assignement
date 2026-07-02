import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { JourneyAction, JourneyTrigger } from "../../types/journey";
import { createJourneyApi } from "../../api/journey.api";
import JourneyForm from "../../components/JourneyForm";

const CreateJourney = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (payload: {
    name: string;
    trigger: JourneyTrigger;
    actions: JourneyAction[];
  }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createJourneyApi(payload);
      navigate("/journeys");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to create journey. Please try again.",
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
            Create Journey
          </h1>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <JourneyForm
            onSubmit={handleCreate}
            isSubmitting={isSubmitting}
            submitLabel="Create Journey"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateJourney;
