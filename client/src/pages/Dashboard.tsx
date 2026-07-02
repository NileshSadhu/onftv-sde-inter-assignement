import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import CustomBtn from "../components/Custombutton";
import type { Campaign } from "../types/campaign";
import { deleteCampaignApi, fetchCampaigns } from "../api/campaign.api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername ?? "there");
  }, []);

  const loadCampaigns = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchCampaigns();
      setCampaigns(data);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to load campaigns.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const filteredCampaigns = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return campaigns;

    return campaigns.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.audience.toLowerCase().includes(query),
    );
  }, [search, campaigns]);

  const stats = useMemo(() => {
    const published = campaigns.filter((c) => c.status === "Published").length;
    const draft = campaigns.filter((c) => c.status === "Draft").length;
    return { total: campaigns.length, published, draft };
  }, [campaigns]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);

    try {
      await deleteCampaignApi(id);
      setCampaigns((prev) => prev.filter((c) => c._id !== id));
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to delete campaign.");
    } finally {
      setDeletingId(null);
      setConfirmingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-[#0F2A4A]">
            Campaign Dashboard
          </h1>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/journeys")}
              className="text-sm font-medium text-gray-600 hover:text-[#0F2A4A]"
            >
              Journeys
            </button>

            <div className="text-sm font-medium text-gray-600">
              Welcome, {username} 👋
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Top Section */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:w-96">
            <CustomInput
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full md:w-52">
            <CustomBtn
              text="+ Create Campaign"
              onClick={() => navigate("/campaigns/create")}
            />
          </div>
        </div>

        {error && (
          <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-sm text-gray-500">Total Campaigns</h2>
            <p className="mt-2 text-3xl font-bold">{stats.total}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-sm text-gray-500">Published</h2>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {stats.published}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-sm text-gray-500">Draft</h2>
            <p className="mt-2 text-3xl font-bold text-orange-500">
              {stats.draft}
            </p>
          </div>
        </div>

        {/* Campaign List */}
        <div className="rounded-xl bg-white shadow">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Your Campaigns</h2>
          </div>

          {isLoading ? (
            <p className="px-6 py-8 text-sm text-gray-500">
              Loading campaigns...
            </p>
          ) : filteredCampaigns.length === 0 ? (
            <p className="px-6 py-8 text-sm text-gray-500">
              No campaigns found.
            </p>
          ) : (
            <div className="divide-y">
              {filteredCampaigns.map((campaign) => (
                <div
                  key={campaign._id}
                  className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Audience: {campaign.audience}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {confirmingId === campaign._id ? (
                      <>
                        <span className="text-sm text-gray-600">
                          Delete this campaign?
                        </span>
                        <button
                          onClick={() => handleDelete(campaign._id)}
                          disabled={deletingId === campaign._id}
                          className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 disabled:opacity-60"
                        >
                          {deletingId === campaign._id ? "Deleting..." : "Yes"}
                        </button>
                        <button
                          onClick={() => setConfirmingId(null)}
                          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            navigate(`/campaigns/${campaign._id}/edit`)
                          }
                          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => setConfirmingId(campaign._id)}
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

export default Dashboard;
