"use client";

const teamToWord = (team: string) => {
  switch (team) {
    case "中信兄弟":
      return "/teamWord/word_brothers.png";
    case "統一獅":
      return "/teamWord/word_unilion.png";
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

export { teamToWord };
