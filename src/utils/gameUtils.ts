export const GameType = (type: string) => {
  switch (type) {
    case "A":
      return "一軍例行賽";
    case "B":
      return "明星賽";
    case "C":
      return "一軍總冠軍賽";
    case "D":
      return "二軍例行賽";
    case "E":
      return "一軍季後挑戰賽";
    case "F":
      return "二軍總冠軍賽";
    case "G":
      return "熱身賽";
    case "H":
      return "未來之星邀請賽";
    default:
      return "其他賽事";
  }
};

export const GameStatus = (status: number) => {
  switch (status) {
    case 1:
      return "如果必要才進行";
    case 2:
      return "比賽中";
    case 3:
      return "比賽結束";
    case 4:
      return "先發打序";
    case 5:
      return "取消比賽";
    case 6:
      return "延賽";
    case 7:
      return "保留比賽";
    case 8:
      return "比賽暫停";
    default:
      return "例外狀況";
  }
};

export const GameColor = (status: number) => {
  switch (status) {
    case 1:
      return "bg-gray-200 text-gray-800";
    case 2:
      return "bg-green-200 text-green-800";
    case 3:
      return "bg-red-800 text-red-200";
    case 4:
      return "bg-blue-200 text-blue-800";
    case 5:
      return "bg-red-200 text-red-800";
    case 6:
      return "bg-yellow-200 text-yellow-800";
    case 7:
      return "bg-gray-200 text-gray-800";
    case 8:
      return "bg-gray-800 text-gray-200";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

export const GameLocation = (location: string) => {
  switch (location) {
    case "INT":
      return {
        zh_tw: "洲際",
        en: "Intercontinental", 
      }
    case "TNN":
      return {
        zh_tw: "台南",
        en: "Tainan",
      }
    case "TYN":
      return {
        zh_tw: "桃園",
        en: "Taoyuan",
      }
    case "XZG":
      return {
        zh_tw: "新莊",
        en: "Xinzhuang",
      }
    case "HLN":
      return {
        zh_tw: "花蓮",
        en: "Hualien",
      }
    case "CCL":
      return {
        zh_tw: "澄清湖",
        en: "Cheng Ching Lake",
      }
    case "DLU":
      return {
        zh_tw: "斗六",
        en: "Douliu",
      }
    case "TMU":
      return {
        zh_tw: "天母"
      }
    case "CYI":
      return {
        zh_tw: "嘉義",
        en: "Chiayi",
      }
    case "CYC":
      return {
        zh_tw: "嘉義市",
        en: "Chiayi City",
      }
    case "HCU":
      return {
        zh_tw: "新竹",
        en: "Hsinchu",
      }
    case "PTG":
      return {
        zh_tw: "屏東",
        en: "Pingtung",
      }
    case "TCG":
      return {
        zh_tw: "台中",
        en: "Taichung",
      }
    case "TTG":
      return {
        zh_tw: "台東",
        en: "Taitung",
      }
    case "KLD":
      return {
        zh_tw: "高雄立德",
        en: "Kaohsiung Li De"
      }
    case "CTP":
      return {
        zh_tw: "中信園區",
        en: "CTBC Park"
      }
    case "LDG":
      return {
        zh_tw: "羅東",
        en: "Loudong",
      }
    case "TPE":
      return {
        zh_tw: "台北",
        en: "Taipei",
      }
    case "TPD":
      return {
        zh_tw: "大巨蛋",
        en: "Taipei Dome",
      }
    default:
      return {
        zh_tw: "待定",
        en: "TBD",
      }
  }
}

export const TeamColor = (name: string) => {
  switch (name) {
    case "樂天桃猿":
      return "text-[#671a32]";
    case "富邦悍將":
      return "text-[#004f98]";
    case "中信兄弟":
      return "text-[#f9cc01]";
    case "統一獅":
      return "text-[#ec6c00]";
    case "統一7-ELEVEn獅":
      return "text-[#ec6c00]";
    case "台鋼雄鷹":
      return "text-[#064738]";
    case "味全龍":
      return "text-[#cf152d]";
    default:
      return "text-[#fff]";
  }
};

export const TimeDecoder = (time: string) => {
  return new Date(time).toLocaleString("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};