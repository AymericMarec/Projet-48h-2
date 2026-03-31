import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const CARD_WIDTH = 80;
const GAP = 90;

export default function HiddenCat() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentOffset={{ x: CARD_WIDTH + GAP, y: 0 }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.catCard}>
          <Text style={styles.catText}>Chat caché</Text>
        </View>

        <View style={styles.catCard}>
          <Text style={styles.catText}>Chat 1</Text>
        </View>

        <View style={styles.catCard}>
          <Text style={styles.catText}>Chat 2</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: (width - CARD_WIDTH * 2 - GAP) / 2,
    gap: GAP,
  },
  catCard: {
    width: CARD_WIDTH,
    height: 140,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  catText: {
    fontSize: 18,
    fontWeight: "600",
  },
});