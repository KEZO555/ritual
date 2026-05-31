import { StyleSheet, View } from "react-native";
import { HapticPressable } from "@/components/HapticPressable";
import { StyledText } from "@/components/StyledText";
import { useInvertColors } from "@/contexts/InvertColorsContext";
import { formatDuration } from "@/data/recipes";
import { n } from "@/utils/scaling";

interface BrewTimerProps {
  elapsed: number;
  onMeasureHeight?: (height: number) => void;
  onReset: () => void;
  onToggle: () => void;
  running: boolean;
  total: number;
}

export function BrewTimer({
  elapsed,
  running,
  total,
  onToggle,
  onReset,
  onMeasureHeight,
}: BrewTimerProps) {
  const { invertColors } = useInvertColors();
  const bg = invertColors ? "white" : "black";
  const fg = invertColors ? "black" : "white";

  const progress = total > 0 ? Math.min(elapsed / total, 1) : 0;

  return (
    <View
      onLayout={(event) => onMeasureHeight?.(event.nativeEvent.layout.height)}
      style={[styles.container, { backgroundColor: bg, borderColor: fg }]}
    >
      <View style={styles.bar}>
        <View style={styles.time}>
          <StyledText style={styles.elapsed}>
            {formatDuration(elapsed)}
          </StyledText>
          {total > 0 ? (
            <StyledText style={styles.total}>
              {` / ${formatDuration(total)}`}
            </StyledText>
          ) : null}
        </View>
        <View style={styles.controls}>
          <HapticPressable onPress={onToggle}>
            <StyledText style={styles.control}>
              {running ? "Pause" : "Start"}
            </StyledText>
          </HapticPressable>
          <HapticPressable onPress={onReset}>
            <StyledText style={styles.control}>Reset</StyledText>
          </HapticPressable>
        </View>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressBase, { backgroundColor: fg }]} />
        <View
          style={[
            styles.progressFill,
            { backgroundColor: fg, width: `${progress * 100}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: n(8),
    borderBottomWidth: n(1),
  },
  bar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: n(10),
    paddingLeft: n(37),
    paddingRight: n(46),
  },
  time: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  elapsed: {
    fontSize: n(40),
  },
  total: {
    fontSize: n(18),
    opacity: 0.5,
  },
  controls: {
    flexDirection: "row",
    gap: n(20),
  },
  control: {
    fontSize: n(22),
  },
  progressTrack: {
    width: "100%",
    height: n(2),
    position: "relative",
  },
  progressBase: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },
  progressFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
});
