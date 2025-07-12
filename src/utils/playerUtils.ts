const PositionAbbreviations: Record<string, string> = {
  "Pitcher": "P",
  "Catcher": "C",
  "First-Baseman": "1B",
  "Second-Baseman": "2B",
  "Third-Baseman": "3B",
  "Shortstop": "SS",
  "Center-Field": "CF",
  "Left-Field": "LF",
  "Right-Field": "RF",
  "Outfielder": "OF",
  "Infielder": "IF",
  "Starter-Pitcher": "SP",
  "Two-Way-Pitcher": "TWP",
  "Relief-Pitcher": "RP",
  "Closer-Pitcher": "CP",
  "Designated-Hitter": "DH",
};

export const positionToAbbreviation = (position: string): string => {
  return PositionAbbreviations[position] || "UNK";
}
