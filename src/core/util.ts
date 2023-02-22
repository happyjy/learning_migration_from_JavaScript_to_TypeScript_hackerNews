export function getId() {
  return Number(location.hash.substring(7)) || 1;
}
