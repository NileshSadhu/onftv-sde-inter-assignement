import { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import CustomBtn from "./Custombutton";
import { fetchCampaigns } from "../api/campaign.api";
import type { Campaign } from "../types/campaign";
import type {
  ActionType,
  JourneyAction,
  JourneyTrigger,
} from "../types/journey";

export interface JourneyFormValues {
  name: string;
  trigger: JourneyTrigger;
  actionType: ActionType;
  campaignId: string;
  waitDuration: string;
  hasCondition: boolean;
  onYesActionType: ActionType;
  onYesCampaignId: string;
  onNoActionType: ActionType;
  onNoCampaignId: string;
}

interface JourneyFormProps {
  initialValues?: JourneyFormValues;
  onSubmit: (payload: {
    name: string;
    trigger: JourneyTrigger;
    actions: JourneyAction[];
  }) => void | Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const emptyValues: JourneyFormValues = {
  name: "",
  trigger: "USER_REGISTERED",
  actionType: "SEND_EMAIL",
  campaignId: "",
  waitDuration: "",
  hasCondition: false,
  onYesActionType: "SEND_EMAIL",
  onYesCampaignId: "",
  onNoActionType: "SEND_EMAIL",
  onNoCampaignId: "",
};

const JourneyForm = ({
  initialValues = emptyValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save Journey",
}: JourneyFormProps) => {
  const [values, setValues] = useState<JourneyFormValues>(initialValues);
  const [errors, setErrors] = useState({});
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaignsLoading, setCampaignsLoading] = useState(true);
  const [campaignsError, setCampaignsError] = useState<string | null>(null);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch (err: any) {
        setCampaignsError(
          err?.response?.data?.message ?? "Failed to load campaigns.",
        );
      } finally {
        setCampaignsLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  const update = <K extends keyof JourneyFormValues>(
    field: K,
    value: JourneyFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof JourneyFormValues, string>> = {};

    if ((values.name ?? "").trim().length < 3) {
      nextErrors.name = "Journey name must be at least 3 characters.";
    }

    if (values.actionType === "SEND_EMAIL" && !values.campaignId) {
      nextErrors.campaignId = "Select a campaign to send.";
    }

    if (values.actionType === "WAIT") {
      const wait = Number(values.waitDuration);
      if (!values.waitDuration || Number.isNaN(wait) || wait <= 0) {
        nextErrors.waitDuration = "Enter a wait duration greater than 0.";
      }
    }

    if (values.hasCondition) {
      if (values.onYesActionType === "SEND_EMAIL" && !values.onYesCampaignId) {
        nextErrors.onYesCampaignId = "Select a campaign for the Yes outcome.";
      }
      if (values.onNoActionType === "SEND_EMAIL" && !values.onNoCampaignId) {
        nextErrors.onNoCampaignId = "Select a campaign for the No outcome.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const mainAction: JourneyAction = {
      type: values.actionType,
      ...(values.actionType === "SEND_EMAIL" && values.campaignId
        ? { campaignId: values.campaignId }
        : {}),
      ...(values.actionType === "WAIT" && values.waitDuration
        ? { waitDuration: Number(values.waitDuration) }
        : {}),
      ...(values.hasCondition
        ? {
            condition: {
              type: "EMAIL_OPENED" as const,
              onYes: {
                type: values.onYesActionType,
                ...(values.onYesActionType === "SEND_EMAIL" &&
                values.onYesCampaignId
                  ? { campaignId: values.onYesCampaignId }
                  : {}),
              },
              onNo: {
                type: values.onNoActionType,
                ...(values.onNoActionType === "SEND_EMAIL" &&
                values.onNoCampaignId
                  ? { campaignId: values.onNoCampaignId }
                  : {}),
              },
            },
          }
        : {}),
    };

    onSubmit({
      name: values.name,
      trigger: values.trigger,
      actions: [mainAction],
    });
  };

  const selectClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0F2A4A]";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Journey Name
        </label>
        <CustomInput
          placeholder="e.g. New User Onboarding"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Trigger
        </label>
        <select
          value={values.trigger}
          onChange={(e) => update("trigger", e.target.value as JourneyTrigger)}
          className={selectClass}
        >
          <option value="USER_REGISTERED">User Registered</option>
          <option value="SUBSCRIPTION_PURCHASED">Subscription Purchased</option>
          <option value="WEBINAR_REGISTERED">Webinar Registered</option>
          <option value="VIDEO_COMPLETED">Video Completed</option>
        </select>
      </div>

      <div className="rounded-lg border border-dashed border-[#0F2A4A]/40 bg-[#0F2A4A]/5 p-4">
        <p className="mb-3 text-sm font-medium text-[#0F2A4A]">Action</p>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Action Type
            </label>
            <select
              value={values.actionType}
              onChange={(e) =>
                update("actionType", e.target.value as ActionType)
              }
              className={selectClass}
            >
              <option value="SEND_EMAIL">Send Email</option>
              <option value="WAIT">Wait</option>
            </select>
          </div>

          {values.actionType === "SEND_EMAIL" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Campaign
              </label>
              {campaignsError && (
                <p className="mb-2 text-xs text-red-500">{campaignsError}</p>
              )}
              <select
                value={values.campaignId}
                onChange={(e) => update("campaignId", e.target.value)}
                className={selectClass}
                disabled={campaignsLoading}
              >
                <option value="">
                  {campaignsLoading
                    ? "Loading campaigns..."
                    : "Select a campaign"}
                </option>
                {campaigns.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.campaignId && (
                <p className="mt-1 text-xs text-red-500">{errors.campaignId}</p>
              )}
            </div>
          )}

          {values.actionType === "WAIT" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Wait Duration (minutes)
              </label>
              <CustomInput
                type="number"
                placeholder="e.g. 60"
                value={values.waitDuration}
                onChange={(e) => update("waitDuration", e.target.value)}
              />
              {errors.waitDuration && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.waitDuration}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={values.hasCondition}
            onChange={(e) => update("hasCondition", e.target.checked)}
          />
          Add condition (Email Opened?)
        </label>
      </div>

      {values.hasCondition && (
        <div className="rounded-lg border border-dashed border-[#0F2A4A]/40 bg-[#0F2A4A]/5 p-4">
          <p className="mb-3 text-sm font-medium text-[#0F2A4A]">
            Condition: Email Opened?
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Yes branch */}
            <div className="space-y-3 rounded-lg border border-green-200 bg-green-50 p-3">
              <p className="text-xs font-semibold text-green-700">If Yes</p>

              <select
                value={values.onYesActionType}
                onChange={(e) =>
                  update("onYesActionType", e.target.value as ActionType)
                }
                className={selectClass}
              >
                <option value="SEND_EMAIL">Send Email</option>
                <option value="WAIT">Wait</option>
              </select>

              {values.onYesActionType === "SEND_EMAIL" && (
                <>
                  <select
                    value={values.onYesCampaignId}
                    onChange={(e) => update("onYesCampaignId", e.target.value)}
                    className={selectClass}
                    disabled={campaignsLoading}
                  >
                    <option value="">Select a campaign</option>
                    {campaigns.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.onYesCampaignId && (
                    <p className="text-xs text-red-500">
                      {errors.onYesCampaignId}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* No branch */}
            <div className="space-y-3 rounded-lg border border-orange-200 bg-orange-50 p-3">
              <p className="text-xs font-semibold text-orange-700">If No</p>

              <select
                value={values.onNoActionType}
                onChange={(e) =>
                  update("onNoActionType", e.target.value as ActionType)
                }
                className={selectClass}
              >
                <option value="SEND_EMAIL">Send Email</option>
                <option value="WAIT">Wait</option>
              </select>

              {values.onNoActionType === "SEND_EMAIL" && (
                <>
                  <select
                    value={values.onNoCampaignId}
                    onChange={(e) => update("onNoCampaignId", e.target.value)}
                    className={selectClass}
                    disabled={campaignsLoading}
                  >
                    <option value="">Select a campaign</option>
                    {campaigns.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.onNoCampaignId && (
                    <p className="text-xs text-red-500">
                      {errors.onNoCampaignId}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="pt-2">
        <CustomBtn
          type="submit"
          text={isSubmitting ? "Saving..." : submitLabel}
        />
      </div>
    </form>
  );
};

export default JourneyForm;
