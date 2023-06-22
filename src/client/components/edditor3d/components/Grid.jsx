/**
 * Description
 * @param {number} {size
 * @param {import("@react-three/fiber").Color} colorCenterLine
 * @param {import("@react-three/fiber").Color} colorGrid}
 * @returns {gridHelper}
 */
const Grid = ({ size, colorCenterLine, colorGrid }) => {
  return <gridHelper args={[size, size, colorCenterLine, colorGrid]} />;
};
export default Grid;
