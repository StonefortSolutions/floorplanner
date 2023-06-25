/**
 * Description
 * @param {number} {size
 * @param {import("@react-three/fiber").Color} colorCenterLine
 * @param {import("@react-three/fiber").Color} colorGrid}
 * @returns {gridHelper}
 */
const Grid = ({ size, colorCenterLine, colorGrid }) => {
  return <gridHelper scale={[2,2,2]} position={[0,.6,0]} args={[size / 2, size / 2, colorCenterLine, colorGrid]} />;
};
export default Grid;
