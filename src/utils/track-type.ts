export interface TrackTypesMap {
  [key: string]: {
    id: number
    name: string
  }
}

export const trackTypes = {
  oval: {
    id: 1,
    name: "Oval",
  },
  road: {
    id: 2,
    name: "Road",
  },
  dirt_oval: {
    id: 3,
    name: "Dirt Oval",
  },
  dirt_road: {
    id: 4,
    name: "Dirt Road",
  },
}

export const trackTypesMap = new Proxy(trackTypes, {
  get: (target: TrackTypesMap, prop) =>
    target[String(prop)] || { id: 0, name: "Unknown" },
})
