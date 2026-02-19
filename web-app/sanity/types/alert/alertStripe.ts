import { PortableTextBlock } from "sanity";

export type AlertVariant =
    | "laser-lemon"
    | "emerald-fizz"
    | "berry-blast"
    | "sky-mint";

export type AlertIconName =
    | "WarningAmber"
    | "Info"
    | "CheckCircle"
    | "Error"
    | "Campaign"
    | "RocketLaunch"
    | "Event"
    | "Notifications"
    | "Announcement"
    | "Satellite"
    | "Public"
    | "Bolt"
    | "Science"
    | "School"
    | "Engineering"
    | "Launch"
    | "Star"
    | "Celebration"
    | "Schedule"
    | "Flag";

export interface AlertStripe {
    _type: "alertStripe";
    _key: string;
    enabled: boolean;
    variant: AlertVariant;
    icon: AlertIconName;
    title: string;
    content: PortableTextBlock[];
    startDate?: string;
    endDate?: string;
}
