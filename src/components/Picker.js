import { useSnapshot } from "valtio";
import { state } from "../utils/groundState";
import { HexColorPicker } from "react-colorful";

// Picker with color options to change ground color
function Picker() {
  const snap = useSnapshot(state);

  return (
    <HexColorPicker
      color={snap.groundColor}
      onChange={(color) => (state.groundColor = color)}
    />
  );
}

export default Picker;
