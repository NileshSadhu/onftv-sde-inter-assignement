import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Journey } from "../../types/journey";
import { deleteJourneyApi, fetchJourneys } from "../../api/journey.api";
import CustomBtn from "../../components/Custombutton";

const triggerLabels: Record<Journey["trigger"], string> = {
  USER_REGISTERED: "User Registered",
  SUBSCRIPTION_PURCHASED: "Subscription Purchased",
  WEBINAR_REGISTERED: "Webinar Registered",
  VIDEO_COMPLETED: "Video Completed",
};

const Journeys = () => {
  const navigate = useNavigate();
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadJourneys = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchJourneys();
      setJourneys(data);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to load journeys.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJourneys();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);

    try {
      await deleteJourneyApi(id);
      setJourneys((prev) => prev.filter((j) => j._id !== id));
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to delete journey.");
    } finally {
      setDeletingId(null);
      setConfirmingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#0F2A4A] px-5 py-3 rounded-xl text-white"
          >
            Back
          </button>
          <h1 className="text-2xl font-bold text-[#0F2A4A]">Journeys</h1>
          <div>
            <CustomBtn
              text="Create Journey"
              onClick={() => navigate("/journeys/create")}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {error && (
          <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="rounded-xl bg-white shadow">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Your Journeys</h2>
          </div>

          {isLoading ? (
            <p className="px-6 py-8 text-sm text-gray-500">
              Loading journeys...
            </p>
          ) : journeys.length === 0 ? (
            <p className="px-6 py-8 text-sm text-gray-500">
              No journeys found.
            </p>
          ) : (
            <div className="divide-y">
              {journeys.map((journey) => (
                <div
                  key={journey._id}
                  className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h3 className="font-semibold">{journey.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Trigger: {triggerLabels[journey.trigger]}
                    </p>
                    {journey.actions?.[0]?.condition && (
                      <span className="mt-1 inline-block rounded-full bg-[#0F2A4A]/10 px-2 py-0.5 text-xs font-medium text-[#0F2A4A]">
                        Has condition
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {confirmingId === journey._id ? (
                      <>
                        <span className="text-sm text-gray-600">
                          Delete this journey?
                        </span>
                        <button
                          onClick={() => handleDelete(journey._id)}
                          disabled={deletingId === journey._id}
                          className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 disabled:opacity-60"
                        >
                          {deletingId === journey._id ? "Deleting..." : "Yes"}
                        </button>
                        <button
                          onClick={() => setConfirmingId(null)}
                          className="rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            navigate(`/journeys/${journey._id}/edit`)
                          }
                          className="rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setConfirmingId(journey._id)}
                          className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Journeys;
