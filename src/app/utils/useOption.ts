export const isExcludedCreateItemOption = (name: string): boolean => {
  const excludedNames = [
    "Total Expenses",
    "Total Attendees",
    "Leaders",
    "Members",
    "Attendees",
    "Fields",
    "Organizer",
    "Apps",
    "Sponsors",
    "Templates",
    "Groups",
  ];
  return excludedNames.includes(name);
};
