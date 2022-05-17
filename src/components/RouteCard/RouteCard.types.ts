export interface RouteCardProps {
  title: string;
  description: string;
  audience: "developer" | "public" | "private" | "unavailable";
  link: string;
  disabled?: boolean;
}
