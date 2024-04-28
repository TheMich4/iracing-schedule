function ok(value) {
  return [value, false];
}
function error(value) {
  if (value instanceof Error) {
    return [null, value];
  }
  return [null, new Error(`${value}`)];
}
function uuid({ short } = { short: false }) {
  let dt = (/* @__PURE__ */ new Date()).getTime();
  const BLUEPRINT = short ? "xyxxyxyx" : "xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx";
  const RESULT = BLUEPRINT.replace(/[xy]/g, function check(c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : r & 3 | 8).toString(16);
  });
  return RESULT;
}
let sessionKey = "KITSESSID";
let durationUnix = 60 * 60 * 24 * 7;
const map = /* @__PURE__ */ new Map();
function create({ id, data }) {
  const created = Math.floor(Date.now() / 1e3);
  const duration = durationUnix;
  const expiresAtUnix = created + duration;
  let destroying = false;
  let destroyed = false;
  const events = /* @__PURE__ */ new Map();
  events.set("destroy", []);
  return {
    get id() {
      return id;
    },
    get data() {
      return data;
    },
    get createdUnix() {
      return created;
    },
    get expiresAtUnix() {
      return expiresAtUnix;
    },
    getRemainingSeconds() {
      const now = Math.floor(Date.now() / 1e3);
      const remaining = expiresAtUnix - now;
      return remaining >= 0 ? remaining : 0;
    },
    async destroy() {
      if (destroyed) {
        return ok();
      }
      if (destroying) {
        const self = this;
        return new Promise(function start(resolve) {
          self.addEventListener("destroy", function start2() {
            resolve(ok());
          });
        });
      }
      destroying = true;
      const [, destroyError] = await _interface.delete(id);
      if (destroyError) {
        return error(destroyError);
      }
      destroyed = true;
      const callbacks = events.get("destroy") ?? [];
      for (const callback of callbacks) {
        callback(this);
      }
      return ok();
    },
    addEventListener(event, callback) {
      const callbacks = events.get(event);
      if (!callbacks || callbacks.includes(callback)) {
        return;
      }
      callbacks.push(callback);
    },
    removeEventListener(event, callback) {
      const callbacks = events.get(event);
      if (!callbacks) {
        return;
      }
      callbacks.filter(function pass(callbackLocal) {
        return callbackLocal !== callback;
      });
      events.set(event, callbacks);
    },
    response(body, init) {
      const cookieName = encodeURI(sessionKey);
      const cookieValue = encodeURI(id);
      const cookieExpires = new Date(expiresAtUnix * 1e3).toUTCString();
      return new Response(body, {
        ...init,
        headers: {
          "Set-Cookie": `${cookieName}=${cookieValue}; Expires=${cookieExpires}; Path=/`,
          ...init?.headers
        }
      });
    }
  };
}
let _interface = {
  async exists(id) {
    return ok(map.has(id));
  },
  async isValid(id) {
    const session2 = map.get(id);
    if (!session2) {
      return ok(false);
    }
    return ok(session2.getRemainingSeconds() > 0);
  },
  async has(id) {
    return ok(map.has(id));
  },
  async get(id) {
    return ok(map.get(id));
  },
  async set(id, session2) {
    map.set(id, session2);
    return ok();
  },
  async delete(id) {
    map.delete(id);
    return ok();
  }
};
const session = {
  /**
   * Set the lifetime of all sessions.\
   * Default value is `7` days (which is `60 * 60 * 24 * 7` seconds).
   * @param {{seconds:number}} payload
   */
  setDurationUnix({ seconds }) {
    durationUnix = seconds;
  },
  /**
   * Get the current session operations.
   * @returns {SessionInterface}
   */
  getOperations() {
    return _interface;
  },
  /**
   * Customize your session operations.
   * @param {SessionInterface} operations
   */
  async setOperations(operations) {
    _interface = operations;
  },
  /**
   * Start a parked session from `cookies` or create a new one if no
   * parked session is found or is expired.\
   * @param {StartPayload} payload
   * @returns {Promise<import('svelte-unsafe').Unsafe<import('./types').Session>>}
   */
  async start({ cookies }) {
    let id = cookies.get(sessionKey) ?? "";
    if ("" === id) {
      let exists = true;
      do {
        id = uuid();
        const [existsValue, existsError] = await _interface.exists(id);
        if (existsError) {
          return error(existsError);
        }
        exists = existsValue;
      } while (exists);
    }
    let sessionLocal;
    const [hasValue, hasError] = await _interface.has(id);
    if (hasError) {
      return error(hasError);
    }
    if (hasValue) {
      const [getValue, getError] = await _interface.get(id);
      if (getError) {
        return error(getError);
      }
      sessionLocal = getValue;
    } else {
      sessionLocal = create({ id, data: /* @__PURE__ */ new Map() });
      const [, setError] = await _interface.set(id, sessionLocal);
      if (setError) {
        return error(setError);
      }
    }
    const timer = setTimeout(async function run() {
      await sessionLocal.destroy();
    }, sessionLocal.getRemainingSeconds() * 1e3);
    sessionLocal.addEventListener("destroy", function run() {
      clearTimeout(timer);
    });
    return ok(sessionLocal);
  },
  /**
   * Destroy a session.
   * @param {{id:string}} payload
   * @returns {Promise<import('svelte-unsafe').Unsafe<void>>} Error if no session with the given `id` is found, otherwise success.
   */
  async destroy({ id }) {
    const [getValue, getError] = await _interface.get(id);
    if (getError) {
      return error(getError);
    }
    const session2 = getValue;
    if (!session2) {
      return error(`Session ${id} not found.`);
    }
    const [, deleteError] = await _interface.delete(id);
    if (deleteError) {
      return error(deleteError);
    }
    return ok();
  },
  /**
   * Clear all invalid local sessions.
   * - You should invoke this periodically.
   * - This uses an internal semaphore and too many `flush()` submissions will be ignored silently.
   */
  async flush() {
    if (flushing) {
      return;
    }
    flushing = true;
    const destructors = [];
    for (const [, session2] of map) {
      if (await _interface.isValid(session2.id)) {
        continue;
      }
      destructors.push(session2.destroy());
    }
    await Promise.all(destructors);
    flushing = false;
  }
};
let flushing = false;
async function handle({ event, resolve }) {
  const [sessionLocal, error2] = await session.start({
    cookies: event.cookies
  });
  if (error2) {
    return new Response(error2.message, { status: 500 });
  }
  event.locals.session = sessionLocal;
  const response = await resolve(event);
  for (const [key, value] of sessionLocal.response().headers) {
    response.headers.set(key, value);
  }
  return response;
}
export {
  handle
};
