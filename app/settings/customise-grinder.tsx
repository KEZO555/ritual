import ContentContainer from "@/components/ContentContainer";
import { StyledButton } from "@/components/StyledButton";
import { useSettings } from "@/contexts/SettingsContext";
import { GRINDERS } from "@/data/recipes";

export default function CustomiseGrinderScreen() {
  const { defaultGrinder, setDefaultGrinder } = useSettings();

  return (
    <ContentContainer headerTitle="Grinder">
      {GRINDERS.map((grinder) => (
        <StyledButton
          key={grinder.id}
          onPress={() => setDefaultGrinder(grinder.id)}
          selected={grinder.id === defaultGrinder}
          text={grinder.name}
        />
      ))}
    </ContentContainer>
  );
}
