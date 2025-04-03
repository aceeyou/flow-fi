import { radius } from "@/constants/theme";
import { BaseToast, ErrorToast } from "react-native-toast-message";

/*
  1. Create the config
*/
export const CustomToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "white", borderRadius: radius._15 }}
      contentContainerStyle={{
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 0,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "400",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      contentContainerStyle={{ backgroundColor: "red", borderLeftColor: "red" }}
      text1Style={{
        fontSize: 16,
        color: "white",
      }}
      text2Style={{
        fontSize: 14,
        color: "white",
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  //   tomatoToast: ({ text1, props }) => (
  //     <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
  //       <Text>{text1}</Text>
  //       <Text>{props.uuid}</Text>
  //     </View>
  //   ),
};
