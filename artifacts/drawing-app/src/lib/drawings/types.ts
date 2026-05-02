export type DrawingCategory =
  | "animaliak"
  | "natura"
  | "ibilgailuak"
  | "fantasia"
  | "superheroiak"
  | "abenturak";

export interface SvgDrawing {
  id: string;
  name: string;
  emoji: string;
  category: DrawingCategory;
  zones: string[];
  defaultColors: Record<string, string>;
  render: (
    colors: Record<string, string>,
    onClick: (zone: string) => void,
  ) => React.ReactElement;
}
