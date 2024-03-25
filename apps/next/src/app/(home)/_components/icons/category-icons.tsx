import * as React from "react";

import { Categories } from "@/data/iracing-consts";

const OvalSvg = () => (
  <svg width="12" height="12" viewBox="0 0 500 500" fill="currentColor">
    <path d="M256 512c-141 0-256-115-256-256l0-224c0-18 14-32 32-32 1 0 63 0 64 0 18 0 32 14 32 32l0 224c0 71 57 128 128 128 71 0 128-57 128-128l0-224c0-18 14-32 32-32 1 0 63 0 64 0 18 0 32 14 32 32l0 224c0 141-115 256-256 256z" />
  </svg>
);
const RoadSvg = () => (
  <svg width="12" height="12" viewBox="0 0 500 500" fill="currentColor">
    <path d="M346 315c-41 10-87 22-132 39-12 5-44 18-51 35-2 4-4 10 0 20 14 33 62 64 80 73 7 3 10 12 8 19-3 8-10 12-18 11-3-1-65-11-132-70-23-20-26-42-25-57 4-42 49-80 75-95 54-33 103-48 138-59 49-16 65-23 65-42 0-69-164-111-283-142-21-5-41-10-59-16-8-2-13-9-12-17 1-8 8-14 16-14l311 0c1 0 3 0 5 1 7 2 180 57 180 199 0 74-77 93-166 115z" />
  </svg>
);
const DirtOvalSvg = () => (
  <svg width="14" height="14" viewBox="0 0 500 500" fill="currentColor">
    <path d="M506 269l-26 102c-29 103-131 163-234 135l-105-29c-103-26-163-131-135-234l26-102c29-103 131-163 234-135l102 26c106 29 166 134 138 237z m-90-141c0-19-13-32-32-32l-16 0c-19 0-32 13-32 32l0 128c0 48-42 83-90 80-41-6-70-42-70-86l0-122c0-19-13-32-32-32l-16 0c-19 0-32 13-32 32l0 122c0 83 61 156 144 166 96 10 176-67 176-160z" />
  </svg>
);
const DirtRoadSvg = () => (
  <svg width="14" height="14" viewBox="0 0 500 500" fill="currentColor">
    <path d="M506 269l-26 102c-29 103-131 163-234 135l-105-29c-103-26-163-131-135-234l26-102c29-103 131-163 234-135l102 26c106 29 166 134 138 237z m-202-173c-3 0-3 0 0 0l-198 0c-4 0-10 3-10 10 0 6 3 9 6 9 13 3 26 7 39 10 73 19 176 45 176 89 0 13-10 16-42 26-19 6-51 16-83 38-19 10-45 32-48 58 0 10 0 22 16 35 42 39 80 45 80 45 3 0 10-3 10-6 0-4 0-10-7-13-6-7-35-26-45-45-3-6 0-10 0-13 4-9 26-19 32-22 29-10 58-19 80-23 58-16 106-28 106-73 0-90-109-122-112-125z" />
  </svg>
);

export const CategoryIcon = ({ category }: { category: string }) => {
  return (
    <div className="mr-2 flex h-4 w-4 rotate-180 items-center justify-center">
      {category === Categories.OVAL && <OvalSvg />}
      {category === Categories.ROAD && <RoadSvg />}
      {category === Categories.DIRT_OVAL && <DirtOvalSvg />}
      {category === Categories.DIRT_ROAD && <DirtRoadSvg />}
    </div>
  );
};
