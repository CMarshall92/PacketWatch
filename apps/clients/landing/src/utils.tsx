import {
    FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaThreads, FaTwitter, FaXTwitter, FaYoutube
} from "react-icons/fa6";
import { ReactElement } from "react";

export const getPlatformIconByName = (platformName: string): ReactElement | null => {
    switch (platformName) {
        case 'facebook': {
            return <FaFacebook size={24} className="min-w-fit" /> as ReactElement;
        }
        case 'github': {
            return <FaGithub size={24} className="min-w-fit" /> as ReactElement;
        }
        case 'instagram': {
            return <FaInstagram size={24} className="min-w-fit" /> as ReactElement;
        }
        case 'linkedin': {
            return <FaLinkedin size={24} className="min-w-fit" /> as ReactElement;
        }
        case 'threads': {
            return <FaThreads size={24} className="min-w-fit" /> as ReactElement;
        }
        case 'twitter': {
            return <FaTwitter size={24} className="min-w-fit" /> as ReactElement;
        }
        case 'youtube': {
            return <FaYoutube size={24} className="min-w-fit" /> as ReactElement;
        }
        case 'x': {
            return <FaXTwitter size={24} className="min-w-fit" /> as ReactElement;
        }
        default:
            // eslint-disable-next-line no-console
            console.log('Platform name not supported, no icon is returned:', platformName);
            return null;
    }
}
