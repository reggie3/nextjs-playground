import { Typography } from "@mui/material";
import { Html, Plane } from "@react-three/drei";
import { useSelector } from "react-redux";
import { GAME_FIELD_HEIGHT } from "../../missileCommandGlobals";
import { MissileCommandRootState } from "../../redux/store";
import styles from "./mcScoreWrapper.module.css";

const McScore = () => {
  const { score } = useSelector(
    (state: MissileCommandRootState) => state.gameDataState
  );

  return (
    <group name="mc-score">
      <Plane args={[3, 1, 1]} position={[0, GAME_FIELD_HEIGHT, 0]}>
        <meshBasicMaterial transparent opacity={0} />
        <Html wrapperClass={styles.wrapper} center>
          <Typography>{`Score: ${score}`}</Typography>
        </Html>
      </Plane>
    </group>
  );
};
export default McScore;
