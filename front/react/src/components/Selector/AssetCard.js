import React from 'react';
import RoundedButton from 'components/RoundedButton/RoundedButton'
import { FormattedMessage } from "react-intl";

const styles = {
    container: {
        width: "100%",
        borderRadius: "5px",
        padding: "10px",
        backgroundColor: "#212a39",
        marginTop: "8px"
    },
    leftContainer: {
        width: "60%",
        display: "inline-block"
    },
    rigthContainer: {
        width: "40%",
        display: "inline-flex",
        justifyContent: "center",
    },
    schulerName: {
        fontSize: "16px",
    },
    pointAlert: {
        left: "0.5%",
        display: "inline-block",
        marginRight: "5px",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        position: "relative",
        backgroundColor: "green"
    },
}

const AssetCard = (props) => {    
    const { type, name } = props.data

    return (
        <section style={styles.container}>
            <section style={styles.leftContainer}>
                <span style={styles.schulerName}>{type} <strong>{name}</strong></span>
                {/*<br />
                <span style={styles.pointAlert}></span><span>FUNCIONANDO</span>*/}
            </section>
            <section style={styles.rigthContainer}> 
                {
                    !(props.data.id === (props.schema && props.schema.id)) ? 
                    <RoundedButton title = {
                        <FormattedMessage id="menu.connect" defaultMessage="Conectar" />
                    } onClickButton={props.onChangeSchema(props.data)} />
                    : 
                    <span style={styles.textConnected}>
                        <FormattedMessage id="menu.connected" defaultMessage="Conectado" />
                    </span>
                }

            </section>
        </section>
    )
};

export default AssetCard;