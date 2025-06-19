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

export const Stadium = (location: string) => {
  switch (location) {
    case "INT":
      return {
        shortName: {
          "zh-tw": "洲際",
          en: "Intercontinental",
        },
        fullName: {
          "zh-tw": "台中洲際棒球場",
          en: "Taichung Intercontinental Baseball Stadium",
        }
      };
    case "TNN":
      return {
        shortName: {
          "zh-tw": "台南",
          en: "Tainan",
        },
        fullName: {
          "zh-tw": "台南市立棒球場",
          en: "Tainan Municipal Baseball Stadium",
        }
      };
    case "TYN":
      return {
        shortName: {
          "zh-tw": "桃園",
          en: "Taoyuan",
        },
        fullName: {
          "zh-tw": "樂天桃園棒球場",
          en: "Rakuten Taoyuan Baseball Stadium",
        }
      };
    case "XZG":
      return {
        shortName: {
          "zh-tw": "新莊",
          en: "Xinzhuang",
        },
        fullName: {
          "zh-tw": "新北市立新莊棒球場",
          en: "New Taipei City Xinzhuang Baseball Stadium",
        }
      };
    case "HLN":
      return {
        shortName: {
          "zh-tw": "花蓮",
          en: "Hualien",
        },
        fullName: {
          "zh-tw": "花蓮縣立德興棒球場",
          en: "Hualien Baseball Stadium",
        }
      };
    case "CCL":
      return {
        shortName: {
          "zh-tw": "澄清湖",
          en: "Cheng Ching Lake",
        },
        fullName: {
          "zh-tw": "高雄市立澄清湖棒球場",
          en: "Kaohsiung Chengching Lake Baseball Stadium",
        }
      };
    case "DLU":
      return {
        shortName: {
          "zh-tw": "斗六",
          en: "Douliu",
        },
        fullName: {
          "zh-tw": "斗六棒球場",
          en: "Douliu Baseball Stadium",
        }
      };
    case "TMU":
      return {
        shortName: {
          "zh-tw": "天母",
          en: "Tianmu",
        },
        fullName: {
          "zh-tw": "臺北市天母棒球場",
          en: "Taipei City Tianmu Baseball Stadium",
        }
      };
    case "CYI":
      return {
        shortName: {
          "zh-tw": "嘉義",
          en: "Chiayi",
        },
        fullName: {
          "zh-tw": "嘉義縣立棒球場",
          en: "Chiayi County Baseball Stadium",
        }
      };
    case "CYC":
      return {
        shortName: {
          "zh-tw": "嘉義市",
          en: "Chiayi City",
        },
        fullName: {
          "zh-tw": "嘉義市立棒球場",
          en: "Chiayi City Baseball Stadium",
        }
      };
    case "HCU":
      return {
        shortName: {
          "zh-tw": "新竹",
          en: "Hsinchu",
        },
        fullName: {
          "zh-tw": "新竹市立棒球場",
          en: "Hsinchu Municipal Baseball Stadium",
        }
      };
    case "PTG":
      return {
        shortName: {
          "zh-tw": "屏東",
          en: "Pingtung",
        },
        fullName: {
          "zh-tw": "屏東縣立棒球場",
          en: "Pingtung County Baseball Stadium",
        }
      };
    case "TCG":
      return {
        shortName: {
          "zh-tw": "台中",
          en: "Taichung",
        },
        fullName: {
          "zh-tw": "教育部體育署臺中棒球場",
          en: "Taichung Municipal Baseball Stadium",
        }
      };
    case "TTG":
      return {
        shortName: {
          "zh-tw": "台東",
          en: "Taitung",
        },
        fullName: {
          "zh-tw": "臺東棒球村第一棒球場",
          en: "Taitung Baseball Village No. 1 Stadium",
        }
      };
    case "KLD":
      return {
        shortName: {
          "zh-tw": "高雄立德",
          en: "Kaohsiung Li De",
        },
        fullName: {
          "zh-tw": "高雄市立立德棒球場",
          en: "Kaohsiung City Li De Baseball Stadium",
        }
      };
    case "CTP":
      return {
        shortName: {
          "zh-tw": "園區",
          en: "CTBC Park",
        },
        fullName: {
          "zh-tw": "中國信託公益園區",
          en: "CTBC Park",
        }
      };
    case "LDG":
      return {
        shortName: {
          "zh-tw": "羅東",
          en: "Loudong",
        },
        fullName: {
          "zh-tw": "宜蘭縣立羅東棒球場",
          en: "Loudong Baseball Stadium",
        }
      };
    case "TPE":
      return {
        shortName: {
          "zh-tw": "台北",
          en: "Taipei",
        },
        fullName: {
          "zh-tw": "台北市立棒球場(小巨蛋)",
          en: "Taipei City Baseball Stadium",
        }
      };
    case "TPD":
      return {
        shortName: {
          "zh-tw": "大巨蛋",
          en: "Taipei Dome",
        },
        fullName: {
          "zh-tw": "臺北大巨蛋",
          en: "Taipei Dome",
        }
      };
    default:
      return {
        shortName: {
          "zh-tw": "待定",
          en: "TBD",
        },
        fullName: {
          "zh-tw": "待定",
          en: "TBD",
        }
      };
  }
};

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
