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

const statusTranslations: Record<string, string> = {
  "active": "現役",
  "retired": "非現役",
  "unsigned": "未登入",
  "contract": "合約所屬",
  "independent": "自主培訓",
  "other": "其他"
};

export const statusToTranslation = (status: string): string => {
  return statusTranslations[status] || "UNK";
}