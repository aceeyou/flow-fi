import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import SettingsItem from "@/components/SettingsItem";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Settings = () => {
  return (
    <ScreenWrapper modal style={{ paddingHorizontal: 23, gap: 8 }}>
      <SettingsItem to="managecategories" itemTitle="Categories">
        <FontAwesome6 name="shapes" size={18} color="white" />
      </SettingsItem>
      <SettingsItem to="managecategories" itemTitle="Delete all data">
        <MaterialCommunityIcons
          name="database-off"
          size={24}
          color={colors.red}
        />
      </SettingsItem>
    </ScreenWrapper>
  );
};

export default Settings;
