import { useWindowSize } from "../providers/WindowSizeProvider";

export const Zoom = ({ children, width_mins = [], scales = [], style }) => {
  const { width } = useWindowSize();

  const pairs = width_mins
    .map((min, i) => ({ min, scale: scales[i] }))
    .sort((a, b) => a.min - b.min); // menor a mayor

  let valorZoom = 1;

  for (const { min, scale } of pairs) {
    if (width < min) {
      valorZoom = scale;
      break; // el primer breakpoint mayor que width es el correcto
    }
  }

  return (
    <div
      style={{
        zoom: valorZoom,
        ...style
      }}
    >
      {children}
    </div>
  );
};