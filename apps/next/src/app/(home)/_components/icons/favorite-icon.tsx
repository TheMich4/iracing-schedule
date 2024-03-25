import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export const FavoriteIcon = () => {
  return (
    <Badge className="h-[22px] w-fit px-1" size="xs" variant="secondary">
      <Star className="h-3 w-3" />
    </Badge>
  );
};
