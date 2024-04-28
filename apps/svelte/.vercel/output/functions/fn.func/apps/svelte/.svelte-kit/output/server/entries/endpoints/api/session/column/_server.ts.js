import { C as COLUMN_KEY } from "../../../../../chunks/column.js";
async function PUT({ locals, request }) {
  const { data, response } = locals.session;
  try {
    const { id, checked } = await request.json();
    const current = data.get(COLUMN_KEY);
    console.log({ id, checked, current });
    data.set(COLUMN_KEY, {
      ...current,
      visibility: {
        ...current.visibility,
        [id]: checked
      }
    });
  } catch (e) {
    console.error(e);
  }
  return response(data.get(COLUMN_KEY));
}
export {
  PUT
};
