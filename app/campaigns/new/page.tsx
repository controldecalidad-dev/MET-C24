import { Card } from "@/components/ui";
import { CampaignForm } from "@/components/campaigns/CampaignForm";

export default function NewCampaignPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nueva campaña</h1>
        <p className="text-sm text-gray-500 mt-0.5">Creá el correo y el sistema inyectará el tracking automáticamente al enviarlo por n8n</p>
      </div>
      <Card className="p-6">
        <CampaignForm />
      </Card>
    </div>
  );
}
