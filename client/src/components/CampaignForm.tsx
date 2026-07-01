import { useState } from "react";
import CustomInput from "./CustomInput";
import CustomBtn from "./Custombutton";
import type { CampaignStatus } from "../types/campaign";
import { generateCampaignEmailApi } from "../api/ai.api";

export interface CampaignFormValues {
  name: string;
  objective: string;
  subjectLine: string;
  previewText: string;
  emailContent: string;
  ctaText: string;
  ctaUrl: string;
  audience: string;
  status: CampaignStatus;
}

interface CampaignFormProps {
  initialValues?: CampaignFormValues;
  onSubmit: (values: CampaignFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const emptyValues: CampaignFormValues = {
  name: "",
  objective: "",
  subjectLine: "",
  previewText: "",
  emailContent: "",
  ctaText: "",
  ctaUrl: "",
  audience: "",
  status: "Draft",
};

const CampaignForm = ({
  initialValues = emptyValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save Campaign",
}: CampaignFormProps) => {
  const [values, setValues] = useState<CampaignFormValues>(initialValues);
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleChange =
    (field: keyof CampaignFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = () => {
    const nextErrors: Partial<Record<keyof CampaignFormValues, string>> = {};

    if ((values.name ?? "").trim().length < 3)
      nextErrors.name = "Name must be at least 3 characters.";
    if ((values.objective ?? "").trim().length < 10)
      nextErrors.objective = "Objective must be at least 10 characters.";
    if ((values.subjectLine ?? "").trim().length < 3)
      nextErrors.subjectLine = "Subject line is required.";
    if ((values.previewText ?? "").trim().length < 3)
      nextErrors.previewText = "Preview text is required.";
    if ((values.emailContent ?? "").trim().length < 10)
      nextErrors.emailContent = "Email content is required.";
    if ((values.ctaText ?? "").trim().length < 2)
      nextErrors.ctaText = "CTA text is required.";
    if (!(values.ctaUrl ?? "").trim()) {
      nextErrors.ctaUrl = "CTA URL is required.";
    } else {
      try {
        new URL(values.ctaUrl.trim());
      } catch {
        nextErrors.ctaUrl = "Please provide a valid URL.";
      }
    }
    if (!(values.audience ?? "").trim())
      nextErrors.audience = "Audience is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleGenerate = async () => {
    setAiError(null);

    const hasExistingContent =
      values.subjectLine.trim() ||
      values.previewText.trim() ||
      values.emailContent.trim();

    if (hasExistingContent) {
      const confirmed = window.confirm(
        "This will replace your current subject line, preview text, and email content. Continue?",
      );
      if (!confirmed) return;
    }

    if (
      values.objective.trim().length < 10 ||
      !values.audience.trim() ||
      !values.ctaText.trim()
    ) {
      setAiError(
        "Fill in Objective, Audience, and CTA text first to generate with AI.",
      );
      return;
    }

    setIsGenerating(true);

    try {
      const generated = await generateCampaignEmailApi({
        objective: values.objective,
        audience: values.audience,
        cta: values.ctaText,
      });

      setValues((prev) => ({
        ...prev,
        subjectLine: generated.subjectLine,
        previewText: generated.previewText,
        emailContent: generated.emailContent,
        ctaText: generated.ctaSuggestion,
      }));

      setErrors((prev) => ({
        ...prev,
        subjectLine: undefined,
        previewText: undefined,
        emailContent: undefined,
        ctaText: undefined,
      }));
    } catch (err: any) {
      setAiError(
        err?.response?.data?.message ?? "Failed to generate email content.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Campaign Name
        </label>
        <CustomInput
          placeholder="e.g. Women's Health Webinar"
          value={values.name}
          onChange={handleChange("name")}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Audience
        </label>
        <CustomInput
          placeholder="e.g. OBGYN Doctors"
          value={values.audience}
          onChange={handleChange("audience")}
        />
        {errors.audience && (
          <p className="mt-1 text-xs text-red-500">{errors.audience}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Objective
        </label>
        <textarea
          placeholder="What is the goal of this campaign? (min 10 characters)"
          value={values.objective}
          onChange={handleChange("objective")}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0F2A4A]"
        />
        {errors.objective && (
          <p className="mt-1 text-xs text-red-500">{errors.objective}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          CTA Text
        </label>
        <CustomInput
          placeholder="e.g. Register Now"
          value={values.ctaText}
          onChange={handleChange("ctaText")}
        />
        {errors.ctaText && (
          <p className="mt-1 text-xs text-red-500">{errors.ctaText}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          CTA URL
        </label>
        <CustomInput
          placeholder="https://example.com/register"
          value={values.ctaUrl}
          onChange={handleChange("ctaUrl")}
        />
        {errors.ctaUrl && (
          <p className="mt-1 text-xs text-red-500">{errors.ctaUrl}</p>
        )}
      </div>

      <div className="rounded-lg border border-dashed border-[#0F2A4A]/40 bg-[#0F2A4A]/5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-[#0F2A4A]">
            Email content (fill manually or generate with AI)
          </p>
          <CustomBtn
            type="button"
            variant="outline"
            text={isGenerating ? "Generating..." : "✨ Generate with AI"}
            onClick={handleGenerate}
          />
        </div>
        {aiError && <p className="mb-3 text-xs text-red-500">{aiError}</p>}

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Subject Line
            </label>
            <CustomInput
              placeholder="Email subject line"
              value={values.subjectLine}
              onChange={handleChange("subjectLine")}
            />
            {errors.subjectLine && (
              <p className="mt-1 text-xs text-red-500">{errors.subjectLine}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Preview Text
            </label>
            <CustomInput
              placeholder="Inbox preview text"
              value={values.previewText}
              onChange={handleChange("previewText")}
            />
            {errors.previewText && (
              <p className="mt-1 text-xs text-red-500">{errors.previewText}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email Content
            </label>
            <textarea
              placeholder="Full email body"
              value={values.emailContent}
              onChange={handleChange("emailContent")}
              rows={6}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0F2A4A]"
            />
            {errors.emailContent && (
              <p className="mt-1 text-xs text-red-500">{errors.emailContent}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          value={values.status}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              status: e.target.value as CampaignStatus,
            }))
          }
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0F2A4A]"
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
      </div>

      <div className="pt-2">
        <CustomBtn
          type="submit"
          text={isSubmitting ? "Saving..." : submitLabel}
        />
      </div>
    </form>
  );
};

export default CampaignForm;
