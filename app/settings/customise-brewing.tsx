import ContentContainer from "@/components/ContentContainer";
import { SegmentedField } from "@/components/SegmentedField";
import { useSettings } from "@/contexts/SettingsContext";
import type { BrewMethod, TempUnit } from "@/data/recipes";

export default function CustomiseBrewingScreen() {
  const { tempUnit, setTempUnit, defaultMethod, setDefaultMethod } =
    useSettings();

  return (
    <ContentContainer headerTitle="Customise Brewing">
      <SegmentedField
        label="Temperature"
        onChange={(value) => setTempUnit(value as TempUnit)}
        options={[
          { label: "Celsius", value: "C" },
          { label: "Fahrenheit", value: "F" },
        ]}
        value={tempUnit}
      />
      <SegmentedField
        label="Default Method"
        onChange={(value) => setDefaultMethod(value as BrewMethod)}
        options={[
          { label: "AeroPress", value: "aeropress" },
          { label: "V60", value: "v60" },
        ]}
        value={defaultMethod}
      />
    </ContentContainer>
  );
}
