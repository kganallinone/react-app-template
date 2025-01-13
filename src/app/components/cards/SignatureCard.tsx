interface SignatureCardProps {
  branding: any;
  signatureSrc: string;
  name: string;
  title: string;
  company: string;
  companyColor?: string;
}

export const SignatureCard = ({
  branding,
  signatureSrc,
  name,
  title,
  company,
  companyColor = "",
}: SignatureCardProps) => {
  return (
    <div className="relative text-center">
      {signatureSrc && (
        <img
          src={signatureSrc}
          alt="Signature"
          className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-[150px] h-auto"
        />
      )}
      <p
        className="font-bold text-gray-800 mt-10 drop-shadow-lg shadow-white shadow-3xl uppercase"
        style={{
          color: branding?.color?.signature?.name || "#1f2937",
        }}
      >
        {name}
      </p>
      <p
        className="text-gray-700"
        style={{
          color: branding?.color?.signature?.position || "#374151",
        }}
      >
        {title} |{" "}
        <span
          className="font-semibold text-gray-500"
          style={{
            color: branding?.color?.signature?.company
              ? branding?.color?.signature?.company
              : companyColor
              ? companyColor
              : "#6b7280",
          }}
        >
          {company}
        </span>
      </p>
    </div>
  );
};
