export function capitalizeFirstLetter(word: string) {
  if (word === "") return;

  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function interpolateMessage(
  template: string,
  variables: Record<string, string | number>,
): string {
  return template.replace(/\{\{([\w.]+)\}\}/g, (_, key) =>
    variables[key] !== undefined ? String(variables[key]) : "",
  );
}
