import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Item } from "../../models/itemModels";

type CardContext = {
  card?: CardContents;
};

const CardContext = createContext<CardContext | undefined>(undefined);

function useCardContext() {
  const context = useContext(CardContext);
  return context ?? { card: {} };
}

interface CardContents {
  title?: string;
  image?: string;
  time?: string;
  item?: Item;
  content?: string;
}

type CardProps = PropsWithChildren & {
  onClick?: () => void;
  className?: string;
  card?: CardContents;
};

export const Card = ({ onClick, className, card, children }: CardProps) => {
  return (
    <CardContext.Provider value={{ card }}>
      <div
        className={twMerge(
          "w-full flex flex-col rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-200 relative",
          className
        )}
        onClick={onClick}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
};

Card.Image = function CardImage({
  className,
  src,
}: {
  className?: string;
  src?: string;
}) {
  const { card } = useCardContext();
  const imageSrc = src || card?.item?.coverPhoto || card?.image;

  return imageSrc ? (
    <img
      src={imageSrc}
      alt={card?.title || "Card Image"}
      className={twMerge("w-full h-20 object-cover rounded-full", className)}
    />
  ) : (
    <div
      className={twMerge(
        "w-full h-20 bg-gray-300 flex items-center justify-center text-white text-xl font-bold",
        className
      )}
    >
      {card?.title?.charAt(0).toUpperCase() || "?"}
    </div>
  );
};

Card.Title = function CardTitle({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  const { card } = useCardContext();
  return (
    <h1
      className={twMerge(
        "text-lg font-bold text-red-900 dark:text-white",
        className
      )}
    >
      {title || card?.title || "Default Title"}
    </h1>
  );
};

Card.Text = function CardText({
  className,
  text,
}: {
  className?: string;
  text?: string;
}) {
  const { card } = useCardContext();
  return (
    <p className={twMerge("text-gray-800 dark:text-gray-300", className)}>
      {text || card?.content || "Default text"}
    </p>
  );
};

Card.Comments = function CardComments({ className }: { className?: string }) {
  const { card } = useCardContext();
  const comments = card?.item?.comments || [];
  return (
    <div className={twMerge("text-gray-800 dark:text-gray-300", className)}>
      {comments.length ? (
        <p>{comments[0].message}</p>
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

Card.Content = function CardContent({
  className,
  content,
}: {
  className?: string;
  content?: string;
}) {
  const { card } = useCardContext();
  return (
    <h1 className={twMerge("text-gray-900 dark:text-gray-300", className)}>
      {content || card?.content || "Default content"}
    </h1>
  );
};

Card.Time = function CardTime({
  className,
  time,
  icon,
}: {
  className?: string;
  time?: string;
  icon?: ReactNode;
}) {
  const { card } = useCardContext();
  return (
    <p
      className={twMerge(
        "text-xs text-gray-500 dark:text-gray-400 flex items-center",
        className
      )}
    >
      {icon} {time || card?.time || "No time provided"}
    </p>
  );
};

Card.Date = function CardDate({
  className,
  date,
  icon,
}: {
  className?: string;
  date?: string;
  icon?: ReactNode;
}) {
  const { card } = useCardContext();
  return (
    <p
      className={twMerge(
        "text-xs text-gray-500 dark:text-gray-400 flex items-center",
        className
      )}
    >
      {icon} {date || card?.time || "No date provided"}
    </p>
  );
};

Card.KebabMenu = Object.assign(
  function CardKebabMenu({
    className,
    children,
  }: {
    className?: string;
    children?: ReactNode;
  }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent click from bubbling up
      setIsOpen((prev) => !prev);
    };

    return (
      <div className="relative">
        <div
          className={twMerge(
            "p-3 rounded-lg shadow-md flex items-center cursor-pointer",
            className
          )}
          onClick={toggleMenu}
        >
          <button className="text-gray-900 dark:text-white" aria-label="Menu">
            <BsThreeDotsVertical className="text-xl" />
          </button>
        </div>

        {isOpen && (
          <div className="absolute right-0 top-12 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-md z-50">
            <ul className="text-gray-900 dark:text-white space-y-1 p-3">
              {children}
            </ul>
          </div>
        )}
      </div>
    );
  },
  {
    Item: function CardKebabMenuItem({
      onClick,
      className,
      children,
    }: {
      onClick?: () => void;
      className?: string;
      children?: ReactNode;
    }) {
      return (
        <li
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from closing the menu
            onClick?.();
          }}
          className={twMerge(
            "flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150",
            className
          )}
        >
          {children}
        </li>
      );
    },
  }
);
