const images = import.meta.glob("../assets/**/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function getImageUrl(url: string): string | undefined {
  return images[`../assets/${url}`];
}
