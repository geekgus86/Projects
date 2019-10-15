import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

const CONTAINER_MARGIN = 10;
const CONTAINER_MARGIN_TOP = (Platform.OS === 'ios' ? 30 : 0)

export const colors = {
    white: "#ffffff",
    coolGrey: "#a6a8ab",
    silver: "#d1d1d4",
    azure: "#0099ed",
    mango: "#ffa12e",
    sunYellow: "#fbca31",
    green: "#00cb00",
    greenishTeal: "#36d194",
    lightUrple: "#9673f0",
    lightishBlue: "#545cfc",
    neonBlue: "#24ccfc",
    orangeRed: "#ff2c18",
    orange: "#fc6d27",
    rustyRed: "#c32112",
    ceruleanBlue: "#0071ed",
    tomato: "#f04d41",
    reddish: "#b83a30",
    darkMint: "#46b978",
    darkSkyBlue: "#55c1e9",
    darkGreyBlue: "#243746",
    lighterPurple: "#9672ef",
    silver30: "rgba(209, 209, 212, 0.3)",
    silver10: "rgba(209, 209, 212, 0.1)",
    orangeRed5: "#fff4f6",
    jungleGreen: "#0a8640",
    purpleBlue: "#8E65BA",
    kingBlue: "#034ea2",
    black: "#000000",
}

const theme = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    mainContainer: {
        flexDirection: 'column',
        margin: CONTAINER_MARGIN,
        marginTop: CONTAINER_MARGIN_TOP,
        flex: 1
    },
    initialLoaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.darkGreyBlue
    },
    headerText: {
        fontFamily: 'Gotham Rounded',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'normal',
        lineHeight: 22,
        letterSpacing: -0.41,
        textAlign: 'center',
        color: colors.white
    }
})

export { theme }

