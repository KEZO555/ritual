import ContentContainer from "@/components/ContentContainer";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { useInvertColors } from "@/contexts/InvertColorsContext";
import { useSettings } from "@/contexts/SettingsContext";

export default function CustomiseTabsScreen() {
  const { invertColors, setInvertColors } = useInvertColors();
  const { hapticsEnabled, setHapticsEnabled, keepAwake, setKeepAwake } =
    useSettings();

  return (
    <ContentContainer headerTitle="Customise Interface">
      <ToggleSwitch
        label="Invert Colours"
        onValueChange={setInvertColors}
        value={invertColors}
      />
      <ToggleSwitch
        label="Haptic Feedback"
        onValueChange={setHapticsEnabled}
        value={hapticsEnabled}
      />
      <ToggleSwitch
        label="Keep Screen Awake"
        onValueChange={setKeepAwake}
        value={keepAwake}
      />
    </ContentContainer>
  );
}
