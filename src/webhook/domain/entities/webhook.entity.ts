export interface Webhook {
  instanceName: string;
  webhook: {
    url: string;
    events: string[];
    enabled: boolean;
    webhookByEvents?: boolean;
    webhookBase64?: boolean;
  };
}