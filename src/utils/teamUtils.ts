const teamWordMap: Record<string | number, string> = {
  "中信兄弟": "/teamWord/word_brothers.png",
  1: "/teamWord/word_brothers.png",

  "統一獅": "/teamWord/word_unilions.png",
  "統一7-ELEVEn獅": "/teamWord/word_unilions.png",
  2: "/teamWord/word_unilions.png",

  "樂天桃猿": "/teamWord/word_rakuten.png",
  3: "/teamWord/word_rakuten.png",

  "富邦悍將": "/teamWord/word_fubon.png",
  4: "/teamWord/word_fubon.png",

  "味全龍": "/teamWord/word_dragon.png",
  5: "/teamWord/word_dragon.png",

  "台鋼雄鷹": "/teamWord/word_tsg.png",
  6: "/teamWord/word_tsg.png",
};

export const teamToWord = (team: string | number): string => {
  return teamWordMap[team] || "";
};

const teamLogoMap: Record<string, string> = {
  "中信兄弟": "/teamLogo/logo_brothers.png",
  1: "/teamLogo/logo_brothers.png",

  "統一獅": "/teamLogo/logo_unilions.png",
  "統一7-ELEVEn獅": "/teamLogo/logo_unilions.png",
  2: "/teamLogo/logo_unilions.png",

  "樂天桃猿": "/teamLogo/logo_rakuten.png",
  3: "/teamLogo/logo_rakuten.png",

  "富邦悍將": "/teamLogo/logo_fubon.png",
  4: "/teamLogo/logo_fubon.png",

  "味全龍": "/teamLogo/logo_dragon.png",
  5: "/teamLogo/logo_dragon.png",

  "台鋼雄鷹": "/teamLogo/logo_tsg.png",
  6: "/teamLogo/logo_tsg.png",
};

export const teamToLogo = (team: string | number) => {
  return teamLogoMap[team] || "";
};

const TeamNameAbbreviation: Record<string | number, string> = {
  "中信兄弟": "象",
  1: "象",
  "統一獅": "獅",
  "統一7-ELEVEn獅": "獅",
  2: "獅",
  "樂天桃猿": "猿",
  3: "猿",
  "富邦悍將": "悍",
  4: "悍",
  "味全龍": "龍",
  5: "龍",
  "台鋼雄鷹": "鷹",
  6: "鷹",
};

export const teamToAbbreviation = (team: string | number) => {
  return TeamNameAbbreviation[team] || team;
};
