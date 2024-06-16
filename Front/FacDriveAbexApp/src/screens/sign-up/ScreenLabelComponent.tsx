import React from "react";
import * as Styles from "./styles.ts";
import Icon from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";

type screenLabelComponent = {
    previousScreen: string
    label: string
}
const ScreenLabelComponent: React.FC<screenLabelComponent> = ({previousScreen, label}) => {
    const { navigate } = useNavigation();

    return(
        <Styles.ScreenLabelContainer>
            <Styles.BackButton onPress={() => navigate(previousScreen)}>
                <Icon name={"arrow-back"} size={30} color={'black'}/>
            </Styles.BackButton>
            <Styles.ScreenLabel>
                {label}
            </Styles.ScreenLabel>
        </Styles.ScreenLabelContainer>
    )
}

export {ScreenLabelComponent}
