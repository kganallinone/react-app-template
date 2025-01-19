import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { IconType } from "react-icons/lib";

interface SocialMediaButtonProps {
  platform: string;
  url: string;
  icon: IconType; // URL or icon class for the platform
}

const SocialMediaButtons = () => {
  const socialLinks: SocialMediaButtonProps[] = [
    {
      platform: "Facebook",
      url: "https://www.facebook.com/kganallinone",
      icon: FaFacebook,
    },

    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/kganallinone/",
      icon: FaLinkedin,
    },
    {
      platform: "GitHub",
      url: "https://github.com/kganallinone",
      icon: FaGithub,
    },
  ];

  return (
    <div className="social-media-buttons flex justify-center gap-4">
      {socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-button flex items-center gap-2"
        >
          <link.icon /> {link.platform}
        </a>
      ))}
    </div>
  );
};

export default SocialMediaButtons;
