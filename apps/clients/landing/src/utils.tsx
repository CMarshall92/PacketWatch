import { ReactElement } from "react";

export const getPlatformIconByName = (platformName: string): ReactElement | null => {
    switch (platformName) {
        case 'facebook': {
            return <span className="min-w-fit w-6 h-6 text-2xl">📘</span>;
        }
        case 'github': {
            return <span className="min-w-fit w-6 h-6 text-2xl">🐙</span>;
        }
        case 'instagram': {
            return <span className="min-w-fit w-6 h-6 text-2xl">📷</span>;
        }
        case 'linkedin': {
            return <span className="min-w-fit w-6 h-6 text-2xl">💼</span>;
        }
        case 'threads': {
            return <span className="min-w-fit w-6 h-6 text-2xl">🧵</span>;
        }
        case 'twitter': {
            return <span className="min-w-fit w-6 h-6 text-2xl">🐦</span>;
        }
        case 'youtube': {
            return <span className="min-w-fit w-6 h-6 text-2xl">📺</span>;
        }
        case 'x': {
            return <span className="min-w-fit w-6 h-6 text-2xl">❌</span>;
        }
        default:
            // eslint-disable-next-line no-console
            console.log('Platform name not supported, no icon is returned:', platformName);
            return null;
    }
}
