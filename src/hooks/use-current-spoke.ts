import { useSpokes } from "./use-spokes";

export const useCurrentSpoke = () => {
  const spokes = useSpokes();

  if (location.pathname === "/") {
    return spokes.filter(({ id }) => id === "openvino").at(0);
  }

  return spokes.find(({ href }) =>
    href.includes(location.pathname.split("/").at(1) ?? ""),
  );
};
