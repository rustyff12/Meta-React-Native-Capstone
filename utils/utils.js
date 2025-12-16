const CATEGORY_ORDER = ["starters", "mains", "desserts"];

const CATEGORY_DISPLAY_NAMES = {
  starters: "Starters",
  mains: "Mains",
  desserts: "Desserts",
};

export function getSectionListData(data) {
  const sectionsMap = {};

  data.forEach((item) => {
    const category = item.category;
    if (!sectionsMap[category]) {
      sectionsMap[category] = [];
    }
    sectionsMap[category].push(item);
  });

  return CATEGORY_ORDER.filter((cat) => sectionsMap[cat]).map((cat) => ({
    title: CATEGORY_DISPLAY_NAMES[cat],
    data: sectionsMap[cat],
  }));
}
