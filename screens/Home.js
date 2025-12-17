import { useEffect, useState, useMemo, useCallback } from "react";
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar } from "react-native-paper";
import Filters from "../components/Filters";
import { menuData } from "../data/menuData";
import { createTable, getMenuItems, saveMenuItems } from "../data/database";
import Header from "../components/Header";
import HomeHero from "../components/HomeHero";

const sections = ["starters", "mains", "desserts"];
const sectionTitles = ["Starters", "Mains", "Desserts"];

const MenuItem = ({ name, price, description, image }) => (
  <View style={styles.itemContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.itemDescription}>{description}</Text>
      <Text style={styles.itemPrice}>${parseFloat(price).toFixed(2)}</Text>
    </View>
    {image && <Image source={image} style={styles.itemImage} />}
  </View>
);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState([
    false,
    false,
    false,
  ]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    (async () => {
      await createTable();
      let items = await getMenuItems();

      if (!items.length) {
        const textOnly = menuData.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category,
          description: item.description || "",
        }));
        await saveMenuItems(textOnly);
        items = await getMenuItems();
      }

      const withImages = items.map((dbItem) => {
        const source = menuData.find((m) => m.id === dbItem.id);
        return {
          ...dbItem,
          price: parseFloat(dbItem.price),
          image: source?.image || null,
        };
      });

      setMenuItems(withImages);
    })();
  }, []);

  const filteredItems = useMemo(() => {
    let filtered = [...menuItems];

    const activeCats = filterSelections.every((s) => !s)
      ? sections
      : sections.filter((_, i) => filterSelections[i]);

    filtered = filtered.filter((item) => activeCats.includes(item.category));

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [menuItems, searchQuery, filterSelections]);

  const handleFilterChange = (index) => {
    const newSel = [...filterSelections];
    newSel[index] = !newSel[index];
    setFilterSelections(newSel);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Header showBack={false} />
        <HomeHero />
        <View style={styles.menuSection}>
          <Text style={styles.title}>Order for delivery!</Text>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={{ color: "white" }}
            iconColor="white"
            placeholderTextColor="white"
            elevation={0}
          />
          <Filters
            selections={filterSelections}
            onChange={handleFilterChange}
            sections={sectionTitles}
          />
          {filteredItems.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEFEE",
  },
  scrollView: {
    flex: 1,
  },
  menuSection: {
    backgroundColor: "#EDEFEE",
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    color: "#495E57",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#495E57",
  },
  itemContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#333333",
  },
  textContainer: { flex: 1, marginRight: 12 },
  itemName: { fontSize: 20, color: "#FBDABB", fontWeight: "bold" },
  itemDescription: { fontSize: 14, color: "#DDD", marginVertical: 6 },
  itemPrice: { fontSize: 18, color: "#EE9972", fontWeight: "bold" },
  itemImage: { width: 90, height: 90, borderRadius: 10, alignSelf: "center" },
});
