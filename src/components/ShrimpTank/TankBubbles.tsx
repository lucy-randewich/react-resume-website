import { Box } from "@mui/material";
import { BUBBLE_NAMES, shrimpAssets } from "./shrimp.constants";

export const TankBubbles = () => (
  <>
    {BUBBLE_NAMES.map((bubble) => (
      <Box
        key={bubble}
        component="img"
        src={shrimpAssets.bubble}
        alt=""
        className={`tank-bubble bubble-${bubble}`}
        draggable={false}
      />
    ))}
  </>
);
