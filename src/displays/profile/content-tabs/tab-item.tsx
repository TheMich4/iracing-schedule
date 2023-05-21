"use client";

import { Check, Star } from "lucide-react";

import { Button } from "~/components/ui/button";

export const TabItem = ({
  label,
  isOwned,
  isFavorite,
}: {
  label: string;
  isOwned: boolean;
  isFavorite: boolean;
}) => {
  return (
    <Button
      className="flex flex-row items-center justify-start gap-2"
      variant="outline"
    >
      {isOwned && (
        <Button className="p-0" size="sm" variant="ghost">
          <Check className="h-4 w-4" />
        </Button>
      )}
      <span>{label}</span>
      {isFavorite && (
        <Button className="p-0" size="sm" variant="ghost">
          <Star className="h-4 w-4" />
        </Button>
      )}
    </Button>
  );
};
