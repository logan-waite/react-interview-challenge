import React from "react";
import styles from "./styles";

const Card = props => {
    return (
        <div style={{ ...styles.container, ...props.style }}>
            <div style={styles.name}>{props.name}</div>
            <img src={props.image} style={styles.playerImage} alt="player_image" />

            <div>{props.team}</div>
        </div>
    );
};

export default Card;
