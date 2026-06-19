export function getGestationalName(gestationalAgeList, gestationalAge) {
  return (
    gestationalAgeList.find((item) => item.gestationalId === gestationalAge)
      ?.gestationalName ?? gestationalAge ?? "—"
  );
}
