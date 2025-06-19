export const teamToWord = (team: string) => {
  switch (team) {
    case "中信兄弟":
      return "/teamWord/word_brothers.png";
    case "統一獅":
      return "/teamWord/word_unilions.png";
    case "統一7-ELEVEn獅":
      return "/teamWord/word_unilions.png";
    case "富邦悍將":
      return "/teamWord/word_fubon.png";
    case "味全龍":
      return "/teamWord/word_dragon.png";
    case "樂天桃猿":
      return "/teamWord/word_rakuten.png";
    case "台鋼雄鷹":
      return "/teamWord/word_tsg.png";
    default:
      return "";
  }
};

export const teamToLogo = (team: string) => {
  switch (team) {
    case "中信兄弟":
      return "/teamLogo/logo_brothers.png";
    case "統一獅":
      return "/teamLogo/logo_unilions.png";
    case "統一7-ELEVEn獅":
      return "/teamLogo/logo_unilions.png";
    case "富邦悍將":
      return "/teamLogo/logo_fubon.png";
    case "味全龍":
      return "/teamLogo/logo_dragon.png";
    case "樂天桃猿":
      return "/teamLogo/logo_rakuten.png";
    case "台鋼雄鷹":
      return "/teamLogo/logo_tsg.png";
    default:
      return "";
  }
};

export const TeamNameAbbreviation = (name: string) => {
  switch (name) {
    case "樂天桃猿":
      return "猿";
    case "富邦悍將":
      return "悍";
    case "中信兄弟":
      return "象";
    case "統一獅":
      return "獅";
    case "台鋼雄鷹":
      return "鷹";
    case "味全龍":
      return "龍";
    default:
      return name;
  }
};
