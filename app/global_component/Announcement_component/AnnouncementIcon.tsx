import { Trophy, MapPin, Users, Handshake, TrendingUp } from 'lucide-react';

interface AnnouncementIconProps {
    type: 'award' | 'outlet' | 'townhall' | 'huddle' | 'earning';
    accentHex: string;
}

export default function AnnouncementIcon({ type, accentHex }: AnnouncementIconProps) {
    const iconMap = {
        award:    Trophy,
        outlet:   MapPin,
        townhall: Users,
        huddle:   Handshake,
        earning:  TrendingUp,
    };

    const Icon = iconMap[type];

    return (
        <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{
                background: `${accentHex}18`,
                border: `1px solid ${accentHex}33`,
            }}
        >
            <Icon className="w-5 h-5" style={{ color: accentHex }} />
        </div>
    );
}