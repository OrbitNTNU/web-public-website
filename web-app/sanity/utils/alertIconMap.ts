import {
    WarningAmber,
    Info,
    CheckCircle,
    Error,
    Campaign,
    RocketLaunch,
    Event,
    Notifications,
    Announcement,
    Satellite,
    Public,
    Bolt,
    Science,
    School,
    Engineering,
    Launch,
    Star,
    Celebration,
    Schedule,
    Flag,
} from "@mui/icons-material";

/**
 * Runtime icon map used in AlertStripe component.
 * Keys must match the values stored in Sanity.
 */
export const alertIconMap = {
    WarningAmber,
    Info,
    CheckCircle,
    Error,
    Campaign,
    RocketLaunch,
    Event,
    Notifications,
    Announcement,
    Satellite,
    Public,
    Bolt,
    Science,
    School,
    Engineering,
    Launch,
    Star,
    Celebration,
    Schedule,
    Flag,
};

export type AlertIconName = keyof typeof alertIconMap;
