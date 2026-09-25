import {
  BottomSheet,
  BottomSheetView,
} from "@expo/ui/community/bottom-sheet";
import { MenuView } from "@expo/ui/community/menu";
import { useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const actions = [
  { id: "first", title: "First action" },
  { id: "second", title: "Second action" },
];

export default function App() {
  const [description, setDescription] = useState("");
  const [menuEvents, setMenuEvents] = useState("Menu has not opened yet");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <View style={styles.screen}>
      <Pressable style={styles.openSheet} onPress={() => setIsSheetOpen(true)}>
        <Text style={styles.openSheetLabel}>Open sheet</Text>
      </Pressable>

      <BottomSheet
        index={isSheetOpen ? 0 : -1}
        enableDynamicSizing
        enablePanDownToClose={false}
      >
        {isSheetOpen ? (
          <BottomSheetView style={styles.sheet}>
            <View
              onStartShouldSetResponder={() => {
                Keyboard.dismiss();
                return false;
              }}
            >
              <Text style={styles.title}>MenuView IME reproduction</Text>

          <MenuView
            actions={actions}
            onOpenMenu={() => setMenuEvents("onOpenMenu fired")}
            onCloseMenu={() => setMenuEvents("onCloseMenu fired")}
            onPressAction={({ nativeEvent }) =>
              setMenuEvents(`Pressed: ${nativeEvent.event}`)
            }
            style={styles.menu}
          >
            <View style={styles.menuTrigger}>
              <Text style={styles.menuLabel}>Open menu</Text>
            </View>
          </MenuView>

          <Text style={styles.label}>Description</Text>
          <TextInput
            multiline
            placeholder="Tap here to show the keyboard"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.status}>{menuEvents}</Text>
            </View>
          </BottomSheetView>
        ) : null}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", padding: 24 },
  openSheet: {
    alignItems: "center",
    backgroundColor: "#e8f0fe",
    borderRadius: 8,
    padding: 16,
  },
  openSheetLabel: { color: "#0b57d0", fontSize: 16, fontWeight: "600" },
  sheet: { padding: 24 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 24 },
  menu: {
    alignSelf: "flex-end",
    backgroundColor: "#e8f0fe",
    borderRadius: 8,
    width: 260,
  },
  menuTrigger: { alignItems: "center", paddingHorizontal: 16, paddingVertical: 12 },
  menuLabel: { color: "#0b57d0", fontSize: 16, fontWeight: "600" },
  label: { fontSize: 16, marginBottom: 8, marginTop: 32 },
  input: {
    borderColor: "#747775",
    borderRadius: 8,
    borderWidth: 1,
    height: 140,
    padding: 12,
    textAlignVertical: "top",
  },
  status: { marginTop: 16 },
});
