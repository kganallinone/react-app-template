interface PropertyDescriptionTooltipProps {
  data: any;
  position: { top: number; left: number }; // Keep this for alignment purposes
}

const PropertyDescriptionTooltip = ({
  data,
  position,
}: PropertyDescriptionTooltipProps) => {
  return (
    <div
      className="fixed bg-white border border-gray-300 rounded shadow-lg  text-sm z-50 space-y-2 text-left w-[200px] p-4"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        transform: "translate(-100%, -50%)",
        maxWidth: "200px",
      }}
    >
      <h1 className="font-semibold text-lg text-gray-700">
        {data?.label ? data.label : "----"}
      </h1>

      <div>
        <h2 className="font-semibold text-sm">Usage </h2>
        <p className="text-xs">{data?.usage ? data.usage : "----"}</p>
      </div>
      <div>
        <h2 className="font-semibold text-sm">Type</h2>
        <p className="text-xs">{data?.type ? data.type : "----"}</p>
      </div>
      <div>
        <h2 className="font-semibold text-sm">Description </h2>
        <p className="text-xs">
          {data.description ? data.description : "----"}
        </p>
      </div>
    </div>
  );
};

export default PropertyDescriptionTooltip;
