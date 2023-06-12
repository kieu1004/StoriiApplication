import React from "react";

import { NavigationContainer } from "react-native-screens";
import AuthStack from "./authNavigators";

export default function RootNavigator(){
    return(
        <NavigationContainer>
            <AuthStack/>
        </NavigationContainer>
    )
}