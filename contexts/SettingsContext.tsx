import { createContext, type ReactNode, useContext, useEffect } from "react";
import type { BrewMethod, TempUnit } from "@/data/recipes";
import { usePersistedState } from "@/hooks/usePersistedState";
import { setHapticsEnabled as syncHapticsEnabled } from "@/utils/haptics";

interface SettingsContextType {
  defaultGrinder: string;
  defaultMethod: BrewMethod;
  hapticsEnabled: boolean;
  keepAwake: boolean;
  setDefaultGrinder: (value: string) => Promise<void>;
  setDefaultMethod: (value: BrewMethod) => Promise<void>;
  setHapticsEnabled: (value: boolean) => Promise<void>;
  setKeepAwake: (value: boolean) => Promise<void>;
  setTempUnit: (value: TempUnit) => Promise<void>;
  tempUnit: TempUnit;
}

const throwOutsideProvider = () => {
  throw new Error("useSettings must be used within SettingsProvider");
};

const SettingsContext = createContext<SettingsContextType>({
  defaultGrinder: "c40",
  defaultMethod: "aeropress",
  hapticsEnabled: true,
  keepAwake: true,
  setDefaultGrinder: throwOutsideProvider,
  setDefaultMethod: throwOutsideProvider,
  setHapticsEnabled: throwOutsideProvider,
  setKeepAwake: throwOutsideProvider,
  setTempUnit: throwOutsideProvider,
  tempUnit: "C",
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [tempUnit, setTempUnit] = usePersistedState<TempUnit>("tempUnit", "C");
  const [hapticsEnabled, setHapticsEnabled] = usePersistedState(
    "hapticsEnabled",
    true
  );
  const [keepAwake, setKeepAwake] = usePersistedState("keepAwake", true);
  const [defaultMethod, setDefaultMethod] = usePersistedState<BrewMethod>(
    "defaultMethod",
    "aeropress"
  );
  const [defaultGrinder, setDefaultGrinder] = usePersistedState(
    "defaultGrinder",
    "c40"
  );

  // Mirror the haptics setting into the plain util module the press handlers use.
  useEffect(() => {
    syncHapticsEnabled(hapticsEnabled);
  }, [hapticsEnabled]);

  return (
    <SettingsContext.Provider
      value={{
        defaultGrinder,
        defaultMethod,
        hapticsEnabled,
        keepAwake,
        setDefaultGrinder,
        setDefaultMethod,
        setHapticsEnabled,
        setKeepAwake,
        setTempUnit,
        tempUnit,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
