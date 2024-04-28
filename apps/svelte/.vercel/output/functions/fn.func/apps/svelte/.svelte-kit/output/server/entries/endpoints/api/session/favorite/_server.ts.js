import { F as FAVORITE_KEY } from "../../../../../chunks/favorite.js";
async function PUT({ locals, request }) {
  const { data, response } = locals.session;
  try {
    const { type, id } = await request.json();
    const current = data.get(FAVORITE_KEY);
    data.set(FAVORITE_KEY, {
      [type]: {
        ...current[type],
        [id]: !current[type]?.[id]
      }
    });
  } catch (e) {
    console.error(e);
  }
  return response(data.get(FAVORITE_KEY));
}
export {
  PUT
};
