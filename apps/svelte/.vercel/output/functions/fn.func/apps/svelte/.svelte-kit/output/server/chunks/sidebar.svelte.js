import { x as current_component, y as noop$1, s as setContext, g as getContext, v as value_or_fallback, i as slot, f as store_get, u as unsubscribe_stores, c as bind_props, b as pop, p as push, e as rest_props, j as spread_attributes, k as sanitize_props, w as ensure_array_like, o as element, l as spread_props } from "./index2.js";
import { d as derived, g as get_store_value, w as writable, r as readable, a as readonly } from "./index.js";
import "dequal";
import { nanoid } from "nanoid/non-secure";
import { CalendarDateTime, CalendarDate, ZonedDateTime, parseZonedDateTime, parseDateTime, parseDate, toCalendar, getLocalTimeZone, getDayOfWeek, DateFormatter, startOfMonth, endOfMonth, isSameMonth, isSameDay, isToday } from "@internationalized/date";
import { createFocusTrap as createFocusTrap$1 } from "focus-trap";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function onDestroy(fn) {
  var context = (
    /** @type {import('#server').Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
async function tick() {
}
function last(array) {
  return array[array.length - 1];
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
function isValidIndex(index, arr) {
  return index >= 0 && index < arr.length;
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
function disabledAttr(disabled) {
  return disabled ? true : void 0;
}
({
  type: "hidden",
  "aria-hidden": true,
  hidden: true,
  tabIndex: -1,
  style: styleToString({
    position: "absolute",
    opacity: 0,
    "pointer-events": "none",
    margin: 0,
    transform: "translateX(-100%)"
  })
});
function portalAttr(portal) {
  if (portal !== null) {
    return "";
  }
  return void 0;
}
function lightable(value) {
  function subscribe(run) {
    run(value);
    return () => {
    };
  }
  return { subscribe };
}
function getElementByMeltId(id) {
  if (!isBrowser)
    return null;
  const el = document.querySelector(`[data-melt-id="${id}"]`);
  return isHTMLElement(el) ? el : null;
}
const hiddenAction = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => key !== "action");
    }
  });
};
const isFunctionWithParams = (fn) => {
  return typeof fn === "function";
};
makeElement("empty");
function makeElement(name2, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction({
              ...result(...args2),
              [`data-melt-${name2}`]: "",
              action: action ?? noop
            });
          };
          fn.action = action ?? noop;
          return fn;
        }
        return hiddenAction({
          ...result,
          [`data-melt-${name2}`]: "",
          action: action ?? noop
        });
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn?.();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction({
            ...result(...args2),
            [`data-melt-${name2}`]: "",
            action: action ?? noop
          });
        };
        resultFn.action = action ?? noop;
        return lightable(resultFn);
      }
      return lightable(hiddenAction({
        ...result,
        [`data-melt-${name2}`]: "",
        action: action ?? noop
      }));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function createElHelpers(prefix) {
  const name2 = (part) => part ? `${prefix}-${part}` : prefix;
  const attribute = (part) => `data-melt-${prefix}${part ? `-${part}` : ""}`;
  const selector = (part) => `[data-melt-${prefix}${part ? `-${part}` : ""}]`;
  const getEl = (part) => document.querySelector(selector(part));
  return {
    name: name2,
    attribute,
    selector,
    getEl
  };
}
const isBrowser = typeof document !== "undefined";
const isFunction = (v) => typeof v === "function";
function isElement(element2) {
  return element2 instanceof Element;
}
function isHTMLElement(element2) {
  return element2 instanceof HTMLElement;
}
function isElementDisabled(element2) {
  const ariaDisabled = element2.getAttribute("aria-disabled");
  const disabled = element2.getAttribute("disabled");
  const dataDisabled = element2.hasAttribute("data-disabled");
  if (ariaDisabled === "true" || disabled !== null || dataDisabled) {
    return true;
  }
  return false;
}
function isTouch(event) {
  return event.pointerType === "touch";
}
function isFocusVisible(element2) {
  return element2.matches(":focus-visible");
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isReadable(value) {
  return isObject(value) && "subscribe" in value;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function noop() {
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function addMeltEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  if (typeof handler === "function") {
    const handlerWithMelt = withMelt((_event) => handler(_event));
    events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options));
    return () => {
      events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options));
    };
  }
  return () => noop();
}
function dispatchMeltEvent(originalEvent) {
  const node = originalEvent.currentTarget;
  if (!isHTMLElement(node))
    return null;
  const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
    detail: {
      originalEvent
    },
    cancelable: true
  });
  node.dispatchEvent(customMeltEvent);
  return customMeltEvent;
}
function withMelt(handler) {
  return (event) => {
    const customEvent = dispatchMeltEvent(event);
    if (customEvent?.defaultPrevented)
      return;
    return handler(event);
  };
}
const safeOnMount = (fn) => {
  try {
    noop$1(fn);
  } catch {
    return fn;
  }
};
const safeOnDestroy = (fn) => {
  try {
    onDestroy(fn);
  } catch {
    return fn;
  }
};
function omit(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
function withGet(store) {
  return {
    ...store,
    get: () => get_store_value(store)
  };
}
withGet.writable = function(initial) {
  const internal = writable(initial);
  let value = initial;
  return {
    subscribe: internal.subscribe,
    set(newValue) {
      internal.set(newValue);
      value = newValue;
    },
    update(updater) {
      const newValue = updater(value);
      internal.set(newValue);
      value = newValue;
    },
    get() {
      return value;
    }
  };
};
withGet.derived = function(stores, fn) {
  const subscribers = /* @__PURE__ */ new Map();
  const get = () => {
    const values = Array.isArray(stores) ? stores.map((store) => store.get()) : stores.get();
    return fn(values);
  };
  const subscribe = (subscriber) => {
    const unsubscribers = [];
    const storesArr = Array.isArray(stores) ? stores : [stores];
    storesArr.forEach((store) => {
      unsubscribers.push(store.subscribe(() => {
        subscriber(get());
      }));
    });
    subscriber(get());
    subscribers.set(subscriber, unsubscribers);
    return () => {
      const unsubscribers2 = subscribers.get(subscriber);
      if (unsubscribers2) {
        for (const unsubscribe of unsubscribers2) {
          unsubscribe();
        }
      }
      subscribers.delete(subscriber);
    };
  };
  return {
    get,
    subscribe
  };
};
const overridable = (_store, onChange) => {
  const store = withGet(_store);
  const update = (updater, sideEffect) => {
    store.update((curr) => {
      const next = updater(curr);
      let res = next;
      if (onChange) {
        res = onChange({ curr, next });
      }
      sideEffect?.(res);
      return res;
    });
  };
  const set = (curr) => {
    update(() => curr);
  };
  return {
    ...store,
    update,
    set
  };
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function generateId() {
  return nanoid(10);
}
function generateIds(args) {
  return args.reduce((acc, curr) => {
    acc[curr] = generateId();
    return acc;
  }, {});
}
const kbd = {
  ALT: "Alt",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  BACKSPACE: "Backspace",
  CAPS_LOCK: "CapsLock",
  CONTROL: "Control",
  DELETE: "Delete",
  END: "End",
  ENTER: "Enter",
  ESCAPE: "Escape",
  F1: "F1",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  HOME: "Home",
  META: "Meta",
  PAGE_DOWN: "PageDown",
  PAGE_UP: "PageUp",
  SHIFT: "Shift",
  SPACE: " ",
  TAB: "Tab",
  CTRL: "Control",
  ASTERISK: "*",
  A: "a",
  P: "p"
};
const FIRST_KEYS = [kbd.ARROW_DOWN, kbd.PAGE_UP, kbd.HOME];
const LAST_KEYS = [kbd.ARROW_UP, kbd.PAGE_DOWN, kbd.END];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
const SELECTION_KEYS = [kbd.ENTER, kbd.SPACE];
const isDom = () => typeof window !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
const pt = (v) => isDom() && v.test(getPlatform().toLowerCase());
const ua = (v) => isDom() && v.test(navigator.userAgent);
const isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
const isMac = () => pt(/^mac/) && !isTouchDevice();
const isFirefox = () => ua(/firefox\//i);
const isApple = () => pt(/mac|iphone|ipad|ipod/i);
const isIos = () => isApple() && !isMac();
const LOCK_CLASSNAME = "data-melt-scroll-lock";
function assignStyle(el, style) {
  if (!el)
    return;
  const previousStyle = el.style.cssText;
  Object.assign(el.style, style);
  return () => {
    el.style.cssText = previousStyle;
  };
}
function setCSSProperty(el, property, value) {
  if (!el)
    return;
  const previousValue = el.style.getPropertyValue(property);
  el.style.setProperty(property, value);
  return () => {
    if (previousValue) {
      el.style.setProperty(property, previousValue);
    } else {
      el.style.removeProperty(property);
    }
  };
}
function getPaddingProperty(documentElement) {
  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
  return scrollbarX ? "paddingLeft" : "paddingRight";
}
function removeScroll(_document) {
  const doc = _document ?? document;
  const win = doc.defaultView ?? window;
  const { documentElement, body } = doc;
  const locked = body.hasAttribute(LOCK_CLASSNAME);
  if (locked)
    return noop;
  body.setAttribute(LOCK_CLASSNAME, "");
  const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
  const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
  const paddingProperty = getPaddingProperty(documentElement);
  const scrollbarSidePadding = win.getComputedStyle(body)[paddingProperty];
  const setStyle = () => assignStyle(body, {
    overflow: "hidden",
    [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
  });
  const setIOSStyle = () => {
    const { scrollX, scrollY, visualViewport } = win;
    const offsetLeft = visualViewport?.offsetLeft ?? 0;
    const offsetTop = visualViewport?.offsetTop ?? 0;
    const restoreStyle = assignStyle(body, {
      position: "fixed",
      overflow: "hidden",
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: "0",
      [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
    });
    return () => {
      restoreStyle?.();
      win.scrollTo(scrollX, scrollY);
    };
  };
  const cleanups = [setScrollbarWidthProperty(), isIos() ? setIOSStyle() : setStyle()];
  return () => {
    cleanups.forEach((fn) => fn?.());
    body.removeAttribute(LOCK_CLASSNAME);
  };
}
function effect(stores, fn) {
  let cb = void 0;
  const destroy = derived(stores, (stores2) => {
    cb?.();
    cb = fn(stores2);
  }).subscribe(noop);
  const unsub = () => {
    destroy();
    cb?.();
  };
  safeOnDestroy(unsub);
  return unsub;
}
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
function getPortalParent(node) {
  let parent = node.parentElement;
  while (isHTMLElement(parent) && !parent.hasAttribute("data-portal")) {
    parent = parent.parentElement;
  }
  return parent || "body";
}
function getPortalDestination(node, portalProp) {
  if (portalProp !== void 0)
    return portalProp;
  const portalParent = getPortalParent(node);
  if (portalParent === "body")
    return document.body;
  return null;
}
async function handleFocus(args) {
  const { prop, defaultEl } = args;
  await Promise.all([sleep(1), tick]);
  if (prop === void 0) {
    defaultEl?.focus();
    return;
  }
  const returned = isFunction(prop) ? prop(defaultEl) : prop;
  if (typeof returned === "string") {
    const el = document.querySelector(returned);
    if (!isHTMLElement(el))
      return;
    el.focus();
  } else if (isHTMLElement(returned)) {
    returned.focus();
  }
}
readable(void 0, (set) => {
  function clicked(event) {
    set(event);
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "pointerup", clicked, {
    passive: false,
    capture: true
  });
  return unsubscribe;
});
const documentEscapeKeyStore = readable(void 0, (set) => {
  function keydown(event) {
    if (event && event.key === kbd.ESCAPE) {
      set(event);
    }
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "keydown", keydown, {
    passive: false
  });
  return unsubscribe;
});
const useEscapeKeydown = (node, config = {}) => {
  let unsub = noop;
  function update(config2 = {}) {
    unsub();
    const options = { enabled: true, ...config2 };
    const enabled = isReadable(options.enabled) ? options.enabled : readable(options.enabled);
    unsub = executeCallbacks(
      // Handle escape keydowns
      documentEscapeKeyStore.subscribe((e) => {
        if (!e || !get_store_value(enabled))
          return;
        const target = e.target;
        if (!isHTMLElement(target) || target.closest("[data-escapee]") !== node) {
          return;
        }
        e.preventDefault();
        if (options.ignore) {
          if (isFunction(options.ignore)) {
            if (options.ignore(e))
              return;
          } else if (Array.isArray(options.ignore)) {
            if (options.ignore.length > 0 && options.ignore.some((ignoreEl) => {
              return ignoreEl && target === ignoreEl;
            }))
              return;
          }
        }
        options.handler?.(e);
      }),
      effect(enabled, ($enabled) => {
        if ($enabled) {
          node.dataset.escapee = "";
        } else {
          delete node.dataset.escapee;
        }
      })
    );
  }
  update(config);
  return {
    update,
    destroy() {
      node.removeAttribute("data-escapee");
      unsub();
    }
  };
};
function createFocusTrap(config = {}) {
  let trap;
  const { immediate, ...focusTrapOptions } = config;
  const hasFocus = writable(false);
  const isPaused = writable(false);
  const activate = (opts) => trap?.activate(opts);
  const deactivate = (opts) => {
    trap?.deactivate(opts);
  };
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.set(true);
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.set(false);
    }
  };
  const useFocusTrap = (node) => {
    trap = createFocusTrap$1(node, {
      ...focusTrapOptions,
      onActivate() {
        hasFocus.set(true);
        config.onActivate?.();
      },
      onDeactivate() {
        hasFocus.set(false);
        config.onDeactivate?.();
      }
    });
    if (immediate) {
      activate();
    }
    return {
      destroy() {
        deactivate();
        trap = void 0;
      }
    };
  };
  return {
    useFocusTrap,
    hasFocus: readonly(hasFocus),
    isPaused: readonly(isPaused),
    activate,
    deactivate,
    pause,
    unpause
  };
}
const visibleModals = [];
const useModal = (node, config) => {
  let unsubInteractOutside = noop;
  function removeNodeFromVisibleModals() {
    const index = visibleModals.indexOf(node);
    if (index >= 0) {
      visibleModals.splice(index, 1);
    }
  }
  function update(config2) {
    unsubInteractOutside();
    const { open, onClose, shouldCloseOnInteractOutside, closeOnInteractOutside } = config2;
    sleep(100).then(() => {
      if (open) {
        visibleModals.push(node);
      } else {
        removeNodeFromVisibleModals();
      }
    });
    function isLastModal() {
      return last(visibleModals) === node;
    }
    function closeModal() {
      if (isLastModal() && onClose) {
        onClose();
        removeNodeFromVisibleModals();
      }
    }
    function onInteractOutsideStart(e) {
      const target = e.target;
      if (!isElement(target))
        return;
      if (target && isLastModal()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
    function onInteractOutside(e) {
      if (shouldCloseOnInteractOutside?.(e) && isLastModal()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        closeModal();
      }
    }
    unsubInteractOutside = useInteractOutside(node, {
      onInteractOutsideStart,
      onInteractOutside: closeOnInteractOutside ? onInteractOutside : void 0,
      enabled: open
    }).destroy;
  }
  update(config);
  return {
    update,
    destroy() {
      removeNodeFromVisibleModals();
      unsubInteractOutside();
    }
  };
};
const usePortal = (el, target = "body") => {
  let targetEl;
  if (!isHTMLElement(target) && typeof target !== "string") {
    return {
      destroy: noop
    };
  }
  async function update(newTarget) {
    target = newTarget;
    if (typeof target === "string") {
      targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(`Unknown portal target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
    }
    el.dataset.portal = "";
    targetEl.appendChild(el);
    el.hidden = false;
  }
  function destroy() {
    el.remove();
  }
  update(target);
  return {
    update,
    destroy
  };
};
const useInteractOutside = (node, config) => {
  let unsub = noop;
  let unsubClick = noop;
  let isPointerDown = false;
  let isPointerDownInside = false;
  let ignoreEmulatedMouseEvents = false;
  function update(config2) {
    unsub();
    unsubClick();
    const { onInteractOutside, onInteractOutsideStart, enabled } = config2;
    if (!enabled)
      return;
    function onPointerDown(e) {
      if (onInteractOutside && isValidEvent(e, node)) {
        onInteractOutsideStart?.(e);
      }
      const target = e.target;
      if (isElement(target) && isOrContainsTarget(node, target)) {
        isPointerDownInside = true;
      }
      isPointerDown = true;
    }
    function triggerInteractOutside(e) {
      onInteractOutside?.(e);
    }
    const documentObj = getOwnerDocument(node);
    if (typeof PointerEvent !== "undefined") {
      const onPointerUp = (e) => {
        unsubClick();
        const handler = (e2) => {
          if (shouldTriggerInteractOutside(e2)) {
            triggerInteractOutside(e2);
          }
          resetPointerState();
        };
        if (e.pointerType === "touch") {
          unsubClick = addEventListener(documentObj, "click", handler, {
            capture: true,
            once: true
          });
          return;
        }
        handler(e);
      };
      unsub = executeCallbacks(addEventListener(documentObj, "pointerdown", onPointerDown, true), addEventListener(documentObj, "pointerup", onPointerUp, true));
    } else {
      const onMouseUp = (e) => {
        if (ignoreEmulatedMouseEvents) {
          ignoreEmulatedMouseEvents = false;
        } else if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e);
        }
        resetPointerState();
      };
      const onTouchEnd = (e) => {
        ignoreEmulatedMouseEvents = true;
        if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e);
        }
        resetPointerState();
      };
      unsub = executeCallbacks(addEventListener(documentObj, "mousedown", onPointerDown, true), addEventListener(documentObj, "mouseup", onMouseUp, true), addEventListener(documentObj, "touchstart", onPointerDown, true), addEventListener(documentObj, "touchend", onTouchEnd, true));
    }
  }
  function shouldTriggerInteractOutside(e) {
    if (isPointerDown && !isPointerDownInside && isValidEvent(e, node)) {
      return true;
    }
    return false;
  }
  function resetPointerState() {
    isPointerDown = false;
    isPointerDownInside = false;
  }
  update(config);
  return {
    update,
    destroy() {
      unsub();
      unsubClick();
    }
  };
};
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0)
    return false;
  const target = e.target;
  if (!isElement(target))
    return false;
  const ownerDocument = target.ownerDocument;
  if (!ownerDocument || !ownerDocument.documentElement.contains(target)) {
    return false;
  }
  return node && !isOrContainsTarget(node, target);
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
({
  prefix: "",
  disabled: readable(false),
  required: readable(false),
  name: readable(void 0)
});
const defaultDateDefaults = {
  defaultValue: void 0,
  defaultPlaceholder: void 0,
  granularity: "day"
};
function getDefaultDate(props) {
  const withDefaults = { ...defaultDateDefaults, ...props };
  const { defaultValue, defaultPlaceholder, granularity } = withDefaults;
  if (Array.isArray(defaultValue) && defaultValue.length) {
    return defaultValue[defaultValue.length - 1];
  }
  if (defaultValue && !Array.isArray(defaultValue)) {
    return defaultValue;
  } else if (defaultPlaceholder) {
    return defaultPlaceholder;
  } else {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const calendarDateTimeGranularities = ["hour", "minute", "second"];
    if (calendarDateTimeGranularities.includes(granularity ?? "day")) {
      return new CalendarDateTime(year, month, day, 0, 0, 0);
    }
    return new CalendarDate(year, month, day);
  }
}
function parseStringToDateValue(dateStr, referenceVal) {
  let dateValue;
  if (referenceVal instanceof ZonedDateTime) {
    dateValue = parseZonedDateTime(dateStr);
  } else if (referenceVal instanceof CalendarDateTime) {
    dateValue = parseDateTime(dateStr);
  } else {
    dateValue = parseDate(dateStr);
  }
  return dateValue.calendar !== referenceVal.calendar ? toCalendar(dateValue, referenceVal.calendar) : dateValue;
}
function toDate(dateValue, tz = getLocalTimeZone()) {
  if (dateValue instanceof ZonedDateTime) {
    return dateValue.toDate();
  } else {
    return dateValue.toDate(tz);
  }
}
function isCalendarDateTime(dateValue) {
  return dateValue instanceof CalendarDateTime;
}
function isZonedDateTime(dateValue) {
  return dateValue instanceof ZonedDateTime;
}
function hasTime(dateValue) {
  return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}
function getDaysInMonth(date) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  } else {
    return date.set({ day: 100 }).day;
  }
}
function isBefore(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) < 0;
}
function isAfter(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) > 0;
}
function getLastFirstDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  if (firstDayOfWeek > day) {
    return date.subtract({ days: day + 7 - firstDayOfWeek });
  }
  if (firstDayOfWeek === day) {
    return date;
  }
  return date.subtract({ days: day - firstDayOfWeek });
}
function getNextLastDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  if (day === lastDayOfWeek) {
    return date;
  }
  if (day > lastDayOfWeek) {
    return date.add({ days: 7 - day + lastDayOfWeek });
  }
  return date.add({ days: lastDayOfWeek - day });
}
function createFormatter(initialLocale) {
  let locale = initialLocale;
  function setLocale(newLocale) {
    locale = newLocale;
  }
  function getLocale() {
    return locale;
  }
  function custom(date, options) {
    return new DateFormatter(locale, options).format(date);
  }
  function selectedDate(date, includeTime = true) {
    if (hasTime(date) && includeTime) {
      return custom(toDate(date), {
        dateStyle: "long",
        timeStyle: "long"
      });
    } else {
      return custom(toDate(date), {
        dateStyle: "long"
      });
    }
  }
  function fullMonthAndYear(date) {
    return new DateFormatter(locale, { month: "long", year: "numeric" }).format(date);
  }
  function fullMonth(date) {
    return new DateFormatter(locale, { month: "long" }).format(date);
  }
  function fullYear(date) {
    return new DateFormatter(locale, { year: "numeric" }).format(date);
  }
  function toParts(date, options) {
    if (isZonedDateTime(date)) {
      return new DateFormatter(locale, {
        ...options,
        timeZone: date.timeZone
      }).formatToParts(toDate(date));
    } else {
      return new DateFormatter(locale, options).formatToParts(toDate(date));
    }
  }
  function dayOfWeek(date, length = "narrow") {
    return new DateFormatter(locale, { weekday: length }).format(date);
  }
  function dayPeriod(date) {
    const parts = new DateFormatter(locale, {
      hour: "numeric",
      minute: "numeric"
    }).formatToParts(date);
    const value = parts.find((p) => p.type === "dayPeriod")?.value;
    if (value === "PM") {
      return "PM";
    }
    return "AM";
  }
  const defaultPartOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
  function part(dateObj, type, options = {}) {
    const opts = { ...defaultPartOptions, ...options };
    const parts = toParts(dateObj, opts);
    const part2 = parts.find((p) => p.type === type);
    return part2 ? part2.value : "";
  }
  return {
    setLocale,
    getLocale,
    fullMonth,
    fullYear,
    fullMonthAndYear,
    toParts,
    custom,
    part,
    dayPeriod,
    selectedDate,
    dayOfWeek
  };
}
function dateStore(store, defaultValue) {
  const { set, update, subscribe, get } = withGet(store);
  function add(duration) {
    update((d) => {
      return d.add(duration);
    });
  }
  function nextPage(amount) {
    update((d) => {
      return d.set({ day: 1 }).add({ months: amount });
    });
  }
  function prevPage(amount) {
    update((d) => {
      return d.set({ day: 1 }).subtract({ months: amount });
    });
  }
  function subtract(duration) {
    update((d) => {
      return d.subtract(duration);
    });
  }
  function setDate(fields, disambiguation) {
    if (disambiguation) {
      update((d) => {
        return d.set(fields, disambiguation);
      });
      return;
    }
    update((d) => {
      return d.set(fields);
    });
  }
  function reset() {
    update(() => {
      return defaultValue;
    });
  }
  function toWritable() {
    return {
      set,
      subscribe,
      update,
      get
    };
  }
  return {
    get,
    set,
    update,
    subscribe,
    add,
    subtract,
    setDate,
    reset,
    toWritable,
    nextPage,
    prevPage
  };
}
function initAnnouncer() {
  if (!isBrowser)
    return null;
  let el = document.querySelector("[data-melt-announcer]");
  if (!isHTMLElement(el)) {
    const div = document.createElement("div");
    div.style.cssText = styleToString({
      border: "0px",
      clip: "rect(0px, 0px, 0px, 0px)",
      "clip-path": "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0px",
      position: "absolute",
      "white-space": "nowrap",
      width: "1px"
    });
    div.setAttribute("data-melt-announcer", "");
    div.appendChild(createLog("assertive"));
    div.appendChild(createLog("polite"));
    el = div;
    document.body.insertBefore(el, document.body.firstChild);
  }
  function createLog(kind) {
    const log = document.createElement("div");
    log.role = "log";
    log.ariaLive = kind;
    log.setAttribute("aria-relevant", "additions");
    return log;
  }
  function getLog(kind) {
    if (!isHTMLElement(el))
      return null;
    const log = el.querySelector(`[aria-live="${kind}"]`);
    if (!isHTMLElement(log))
      return null;
    return log;
  }
  return {
    getLog
  };
}
function getAnnouncer() {
  const announcer = initAnnouncer();
  function announce(value, kind = "assertive", timeout = 7500) {
    if (!announcer || !isBrowser)
      return;
    const log = announcer.getLog(kind);
    const content = document.createElement("div");
    if (typeof value === "number") {
      value = value.toString();
    } else if (value === null) {
      value = "Empty";
    } else {
      value = value.trim();
    }
    content.innerText = value;
    if (kind === "assertive") {
      log?.replaceChildren(content);
    } else {
      log?.appendChild(content);
    }
    return setTimeout(() => {
      content.remove();
    }, timeout);
  }
  return {
    announce
  };
}
function isCalendarCell(node) {
  if (!isHTMLElement(node))
    return false;
  if (!node.hasAttribute("data-melt-calendar-cell"))
    return false;
  return true;
}
function getDaysBetween(start, end) {
  const days = [];
  let dCurrent = start.add({ days: 1 });
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    days.push(dCurrent);
    dCurrent = dCurrent.add({ days: 1 });
  }
  return days;
}
function createMonth(props) {
  const { dateObj, weekStartsOn, fixedWeeks, locale } = props;
  const daysInMonth = getDaysInMonth(dateObj);
  const datesArray = Array.from({ length: daysInMonth }, (_, i) => dateObj.set({ day: i + 1 }));
  const firstDayOfMonth = startOfMonth(dateObj);
  const lastDayOfMonth = endOfMonth(dateObj);
  const lastSunday = getLastFirstDayOfWeek(firstDayOfMonth, weekStartsOn, locale);
  const nextSaturday = getNextLastDayOfWeek(lastDayOfMonth, weekStartsOn, locale);
  const lastMonthDays = getDaysBetween(lastSunday.subtract({ days: 1 }), firstDayOfMonth);
  const nextMonthDays = getDaysBetween(lastDayOfMonth, nextSaturday.add({ days: 1 }));
  const totalDays = lastMonthDays.length + datesArray.length + nextMonthDays.length;
  if (fixedWeeks && totalDays < 42) {
    const extraDays = 42 - totalDays;
    let startFrom = nextMonthDays[nextMonthDays.length - 1];
    if (!startFrom) {
      startFrom = dateObj.add({ months: 1 }).set({ day: 1 });
    }
    const extraDaysArray = Array.from({ length: extraDays }, (_, i) => {
      const incr = i + 1;
      return startFrom.add({ days: incr });
    });
    nextMonthDays.push(...extraDaysArray);
  }
  const allDays = lastMonthDays.concat(datesArray, nextMonthDays);
  const weeks = chunk(allDays, 7);
  return {
    value: dateObj,
    dates: allDays,
    weeks
  };
}
function createMonths(props) {
  const { numberOfMonths, dateObj, ...monthProps } = props;
  const months = [];
  if (!numberOfMonths || numberOfMonths === 1) {
    months.push(createMonth({
      ...monthProps,
      dateObj
    }));
    return months;
  }
  months.push(createMonth({
    ...monthProps,
    dateObj
  }));
  for (let i = 1; i < numberOfMonths; i++) {
    const nextMonth = dateObj.add({ months: i });
    months.push(createMonth({
      ...monthProps,
      dateObj: nextMonth
    }));
  }
  return months;
}
function getSelectableCells(calendarId) {
  const node = document.getElementById(calendarId);
  if (!node)
    return [];
  const selectableSelector = `[data-melt-calendar-cell]:not([data-disabled]):not([data-outside-visible-months])`;
  return Array.from(node.querySelectorAll(selectableSelector)).filter((el) => isHTMLElement(el));
}
function setPlaceholderToNodeValue(node, placeholder) {
  const cellValue = node.getAttribute("data-value");
  if (!cellValue)
    return;
  placeholder.set(parseStringToDateValue(cellValue, get_store_value(placeholder)));
}
const defaults$1 = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
const { name: name$1 } = createElHelpers("calendar");
const calendarIdParts = ["calendar", "accessibleHeading"];
function createCalendar(props) {
  const withDefaults = { ...defaults$1, ...props };
  const options = toWritableStores({
    ...omit(withDefaults, "value", "placeholder", "multiple", "ids"),
    multiple: withDefaults.multiple ?? false
  });
  const { preventDeselect, numberOfMonths, pagedNavigation, weekStartsOn, fixedWeeks, calendarLabel, locale, minValue, maxValue, multiple, isDateUnavailable, disabled, readonly: readonly2, weekdayFormat } = options;
  const ids = toWritableStores({ ...generateIds(calendarIdParts), ...withDefaults.ids });
  const defaultDate = getDefaultDate({
    defaultPlaceholder: withDefaults.defaultPlaceholder,
    defaultValue: withDefaults.defaultValue
  });
  const formatter = createFormatter(withDefaults.locale);
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults.onValueChange);
  const placeholderWritable = withDefaults.placeholder ?? writable(withDefaults.defaultPlaceholder ?? defaultDate);
  const placeholder = dateStore(overridable(placeholderWritable, withDefaults.onPlaceholderChange), withDefaults.defaultPlaceholder ?? defaultDate);
  const months = withGet(writable(createMonths({
    dateObj: placeholder.get(),
    weekStartsOn: withDefaults.weekStartsOn,
    locale: withDefaults.locale,
    fixedWeeks: withDefaults.fixedWeeks,
    numberOfMonths: withDefaults.numberOfMonths
  })));
  const visibleMonths = withGet.derived([months], ([$months]) => {
    return $months.map((month) => {
      return month.value;
    });
  });
  const isOutsideVisibleMonths = derived([visibleMonths], ([$visibleMonths]) => {
    return (date) => {
      return !$visibleMonths.some((month) => isSameMonth(date, month));
    };
  });
  const isNextButtonDisabled = withGet.derived([months, maxValue, disabled], ([$months, $maxValue, $disabled]) => {
    if (!$maxValue || !$months.length)
      return false;
    if ($disabled)
      return true;
    const lastMonthInView = $months[$months.length - 1].value;
    const firstMonthOfNextPage = lastMonthInView.add({ months: 1 }).set({ day: 1 });
    return isAfter(firstMonthOfNextPage, $maxValue);
  });
  const isPrevButtonDisabled = withGet.derived([months, minValue, disabled], ([$months, $minValue, $disabled]) => {
    if (!$minValue || !$months.length)
      return false;
    if ($disabled)
      return true;
    const firstMonthInView = $months[0].value;
    const lastMonthOfPrevPage = firstMonthInView.subtract({ months: 1 }).set({ day: 35 });
    return isBefore(lastMonthOfPrevPage, $minValue);
  });
  const isDateDisabled = withGet.derived([options.isDateDisabled, minValue, maxValue, disabled], ([$isDateDisabled, $minValue, $maxValue, $disabled]) => {
    return (date) => {
      if ($isDateDisabled?.(date) || $disabled)
        return true;
      if ($minValue && isBefore(date, $minValue))
        return true;
      if ($maxValue && isBefore($maxValue, date))
        return true;
      return false;
    };
  });
  const isDateSelected = derived([value], ([$value]) => {
    return (date) => {
      if (Array.isArray($value)) {
        return $value.some((d) => isSameDay(d, date));
      } else if (!$value) {
        return false;
      } else {
        return isSameDay($value, date);
      }
    };
  });
  const isInvalid = derived([value, isDateDisabled, options.isDateUnavailable], ([$value, $isDateDisabled, $isDateUnavailable]) => {
    if (Array.isArray($value)) {
      if (!$value.length)
        return false;
      for (const date of $value) {
        if ($isDateDisabled?.(date))
          return true;
        if ($isDateUnavailable?.(date))
          return true;
      }
    } else {
      if (!$value)
        return false;
      if ($isDateDisabled?.($value))
        return true;
      if ($isDateUnavailable?.($value))
        return true;
    }
    return false;
  });
  let announcer = getAnnouncer();
  const headingValue = withGet.derived([months, locale], ([$months, $locale]) => {
    if (!$months.length)
      return "";
    if ($locale !== formatter.getLocale()) {
      formatter.setLocale($locale);
    }
    if ($months.length === 1) {
      const month = $months[0].value;
      return `${formatter.fullMonthAndYear(toDate(month))}`;
    }
    const startMonth = toDate($months[0].value);
    const endMonth = toDate($months[$months.length - 1].value);
    const startMonthName = formatter.fullMonth(startMonth);
    const endMonthName = formatter.fullMonth(endMonth);
    const startMonthYear = formatter.fullYear(startMonth);
    const endMonthYear = formatter.fullYear(endMonth);
    const content = startMonthYear === endMonthYear ? `${startMonthName} - ${endMonthName} ${endMonthYear}` : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
    return content;
  });
  const fullCalendarLabel = withGet.derived([headingValue, calendarLabel], ([$headingValue, $calendarLabel]) => {
    return `${$calendarLabel}, ${$headingValue}`;
  });
  const calendar = makeElement(name$1(), {
    stores: [fullCalendarLabel, isInvalid, disabled, readonly2, ids.calendar],
    returned: ([$fullCalendarLabel, $isInvalid, $disabled, $readonly, $calendarId]) => {
      return {
        id: $calendarId,
        role: "application",
        "aria-label": $fullCalendarLabel,
        "data-invalid": $isInvalid ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0,
        "data-readonly": $readonly ? "" : void 0
      };
    },
    action: (node) => {
      createAccessibleHeading(node, fullCalendarLabel.get());
      announcer = getAnnouncer();
      const unsubKb = addMeltEventListener(node, "keydown", handleCalendarKeydown);
      return {
        destroy() {
          unsubKb();
        }
      };
    }
  });
  const heading = makeElement(name$1("heading"), {
    stores: [disabled],
    returned: ([$disabled]) => {
      return {
        "aria-hidden": true,
        "data-disabled": $disabled ? "" : void 0
      };
    }
  });
  const grid = makeElement(name$1("grid"), {
    stores: [readonly2, disabled],
    returned: ([$readonly, $disabled]) => {
      return {
        tabindex: -1,
        role: "grid",
        "aria-readonly": $readonly ? "true" : void 0,
        "aria-disabled": $disabled ? "true" : void 0,
        "data-readonly": $readonly ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0
      };
    }
  });
  const prevButton = makeElement(name$1("prevButton"), {
    stores: [isPrevButtonDisabled],
    returned: ([$isPrevButtonDisabled]) => {
      const disabled2 = $isPrevButtonDisabled;
      return {
        role: "button",
        type: "button",
        "aria-label": "Previous",
        "aria-disabled": disabled2 ? "true" : void 0,
        "data-disabled": disabled2 ? "" : void 0,
        disabled: disabled2 ? true : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        if (isPrevButtonDisabled.get())
          return;
        prevPage();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const nextButton = makeElement(name$1("nextButton"), {
    stores: [isNextButtonDisabled],
    returned: ([$isNextButtonDisabled]) => {
      const disabled2 = $isNextButtonDisabled;
      return {
        role: "button",
        type: "button",
        "aria-label": "Next",
        "aria-disabled": disabled2 ? "true" : void 0,
        "data-disabled": disabled2 ? "" : void 0,
        disabled: disabled2 ? true : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        if (isNextButtonDisabled.get())
          return;
        nextPage();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const cell = makeElement(name$1("cell"), {
    stores: [
      isDateSelected,
      isDateDisabled,
      isDateUnavailable,
      isOutsideVisibleMonths,
      placeholder
    ],
    returned: ([$isDateSelected, $isDateDisabled, $isDateUnavailable, $isOutsideVisibleMonths, $placeholder]) => {
      return (cellValue, monthValue) => {
        const cellDate = toDate(cellValue);
        const isDisabled = $isDateDisabled?.(cellValue);
        const isUnavailable = $isDateUnavailable?.(cellValue);
        const isDateToday = isToday(cellValue, getLocalTimeZone());
        const isOutsideMonth = !isSameMonth(cellValue, monthValue);
        const isOutsideVisibleMonths2 = $isOutsideVisibleMonths(cellValue);
        const isFocusedDate = isSameDay(cellValue, $placeholder);
        const isSelectedDate = $isDateSelected(cellValue);
        const labelText = formatter.custom(cellDate, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        });
        return {
          role: "button",
          "aria-label": labelText,
          "aria-selected": isSelectedDate ? true : void 0,
          "aria-disabled": isOutsideMonth || isDisabled || isUnavailable ? true : void 0,
          "data-selected": isSelectedDate ? true : void 0,
          "data-value": cellValue.toString(),
          "data-disabled": isDisabled || isOutsideMonth ? "" : void 0,
          "data-unavailable": isUnavailable ? "" : void 0,
          "data-today": isDateToday ? "" : void 0,
          "data-outside-month": isOutsideMonth ? "" : void 0,
          "data-outside-visible-months": isOutsideVisibleMonths2 ? "" : void 0,
          "data-focused": isFocusedDate ? "" : void 0,
          tabindex: isFocusedDate ? 0 : isOutsideMonth || isDisabled ? void 0 : -1
        };
      };
    },
    action: (node) => {
      const getElArgs = () => {
        const value2 = node.getAttribute("data-value");
        const label = node.getAttribute("data-label");
        const disabled2 = node.hasAttribute("data-disabled");
        return {
          value: value2,
          label: label ?? node.textContent ?? null,
          disabled: disabled2 ? true : false
        };
      };
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        handleCellClick(parseStringToDateValue(args.value, placeholder.get()));
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([locale], ([$locale]) => {
    if (formatter.getLocale() === $locale)
      return;
    formatter.setLocale($locale);
  });
  effect([placeholder], ([$placeholder]) => {
    if (!isBrowser || !$placeholder)
      return;
    const $visibleMonths = visibleMonths.get();
    if ($visibleMonths.some((month) => isSameMonth(month, $placeholder))) {
      return;
    }
    const $weekStartsOn = weekStartsOn.get();
    const $locale = locale.get();
    const $fixedWeeks = fixedWeeks.get();
    const $numberOfMonths = numberOfMonths.get();
    const defaultMonthProps = {
      weekStartsOn: $weekStartsOn,
      locale: $locale,
      fixedWeeks: $fixedWeeks,
      numberOfMonths: $numberOfMonths
    };
    months.set(createMonths({
      ...defaultMonthProps,
      dateObj: $placeholder
    }));
  });
  effect([weekStartsOn, locale, fixedWeeks, numberOfMonths], ([$weekStartsOn, $locale, $fixedWeeks, $numberOfMonths]) => {
    const $placeholder = placeholder.get();
    if (!isBrowser || !$placeholder)
      return;
    const defaultMonthProps = {
      weekStartsOn: $weekStartsOn,
      locale: $locale,
      fixedWeeks: $fixedWeeks,
      numberOfMonths: $numberOfMonths
    };
    months.set(createMonths({
      ...defaultMonthProps,
      dateObj: $placeholder
    }));
  });
  effect([fullCalendarLabel], ([$fullCalendarLabel]) => {
    if (!isBrowser)
      return;
    const node = document.getElementById(ids.accessibleHeading.get());
    if (!isHTMLElement(node))
      return;
    node.textContent = $fullCalendarLabel;
  });
  effect([value], ([$value]) => {
    if (Array.isArray($value) && $value.length) {
      const lastValue = $value[$value.length - 1];
      if (lastValue && placeholder.get() !== lastValue) {
        placeholder.set(lastValue);
      }
    } else if (!Array.isArray($value) && $value && placeholder.get() !== $value) {
      placeholder.set($value);
    }
  });
  const weekdays = derived([months, weekdayFormat, locale], ([$months, $weekdayFormat, _]) => {
    if (!$months.length)
      return [];
    return $months[0].weeks[0].map((date) => {
      return formatter.dayOfWeek(toDate(date), $weekdayFormat);
    });
  });
  function createAccessibleHeading(node, label) {
    if (!isBrowser)
      return;
    const div = document.createElement("div");
    div.style.cssText = styleToString({
      border: "0px",
      clip: "rect(0px, 0px, 0px, 0px)",
      "clip-path": "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0px",
      position: "absolute",
      "white-space": "nowrap",
      width: "1px"
    });
    const h2 = document.createElement("div");
    h2.textContent = label;
    h2.id = ids.accessibleHeading.get();
    h2.role = "heading";
    h2.ariaLevel = "2";
    node.insertBefore(div, node.firstChild);
    div.appendChild(h2);
  }
  function nextPage() {
    const $months = months.get();
    const $numberOfMonths = numberOfMonths.get();
    if (pagedNavigation.get()) {
      const firstMonth = $months[0].value;
      placeholder.set(firstMonth.add({ months: $numberOfMonths }));
    } else {
      const firstMonth = $months[0].value;
      const newMonths = createMonths({
        dateObj: firstMonth.add({ months: 1 }),
        weekStartsOn: weekStartsOn.get(),
        locale: locale.get(),
        fixedWeeks: fixedWeeks.get(),
        numberOfMonths: $numberOfMonths
      });
      months.set(newMonths);
      placeholder.set(newMonths[0].value.set({ day: 1 }));
    }
  }
  function prevPage() {
    const $months = months.get();
    const $numberOfMonths = numberOfMonths.get();
    if (pagedNavigation.get()) {
      const firstMonth = $months[0].value;
      placeholder.set(firstMonth.subtract({ months: $numberOfMonths }));
    } else {
      const firstMonth = $months[0].value;
      const newMonths = createMonths({
        dateObj: firstMonth.subtract({ months: 1 }),
        weekStartsOn: weekStartsOn.get(),
        locale: locale.get(),
        fixedWeeks: fixedWeeks.get(),
        numberOfMonths: $numberOfMonths
      });
      months.set(newMonths);
      placeholder.set(newMonths[0].value.set({ day: 1 }));
    }
  }
  function nextYear() {
    placeholder.add({ years: 1 });
  }
  function prevYear() {
    placeholder.subtract({ years: 1 });
  }
  const ARROW_KEYS = [kbd.ARROW_DOWN, kbd.ARROW_UP, kbd.ARROW_LEFT, kbd.ARROW_RIGHT];
  function setYear(year) {
    placeholder.setDate({ year });
  }
  function setMonth(month) {
    placeholder.setDate({ month });
  }
  function handleCellClick(date) {
    const $readonly = readonly2.get();
    if ($readonly)
      return;
    const $isDateDisabled = isDateDisabled.get();
    const $isUnavailable = options.isDateUnavailable.get();
    if ($isDateDisabled?.(date) || $isUnavailable?.(date))
      return;
    value.update((prev) => {
      const $multiple = multiple.get();
      if ($multiple) {
        return handleMultipleUpdate(prev, date);
      } else {
        const next = handleSingleUpdate(prev, date);
        if (!next) {
          announcer.announce("Selected date is now empty.", "polite", 5e3);
        } else {
          announcer.announce(`Selected Date: ${formatter.selectedDate(next, false)}`, "polite");
        }
        return next;
      }
    });
  }
  function handleSingleUpdate(prev, date) {
    if (Array.isArray(prev))
      throw new Error("Invalid value for multiple prop.");
    if (!prev)
      return date;
    const $preventDeselect = preventDeselect.get();
    if (!$preventDeselect && isSameDay(prev, date)) {
      placeholder.set(date);
      return void 0;
    }
    return date;
  }
  function handleMultipleUpdate(prev, date) {
    if (!prev)
      return [date];
    if (!Array.isArray(prev))
      throw new Error("Invalid value for multiple prop.");
    const index = prev.findIndex((d) => isSameDay(d, date));
    const $preventDeselect = preventDeselect.get();
    if (index === -1) {
      return [...prev, date];
    } else if ($preventDeselect) {
      return prev;
    } else {
      const next = prev.filter((d) => !isSameDay(d, date));
      if (!next.length) {
        placeholder.set(date);
        return void 0;
      }
      return next;
    }
  }
  const SELECT_KEYS = [kbd.ENTER, kbd.SPACE];
  function handleCalendarKeydown(e) {
    const currentCell = e.target;
    if (!isCalendarCell(currentCell))
      return;
    if (!ARROW_KEYS.includes(e.key) && !SELECT_KEYS.includes(e.key))
      return;
    e.preventDefault();
    if (e.key === kbd.ARROW_DOWN) {
      shiftFocus(currentCell, 7);
    }
    if (e.key === kbd.ARROW_UP) {
      shiftFocus(currentCell, -7);
    }
    if (e.key === kbd.ARROW_LEFT) {
      shiftFocus(currentCell, -1);
    }
    if (e.key === kbd.ARROW_RIGHT) {
      shiftFocus(currentCell, 1);
    }
    if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
      const cellValue = currentCell.getAttribute("data-value");
      if (!cellValue)
        return;
      handleCellClick(parseStringToDateValue(cellValue, placeholder.get()));
    }
  }
  function shiftFocus(node, add) {
    const candidateCells = getSelectableCells(ids.calendar.get());
    if (!candidateCells.length)
      return;
    const index = candidateCells.indexOf(node);
    const nextIndex = index + add;
    if (isValidIndex(nextIndex, candidateCells)) {
      const nextCell = candidateCells[nextIndex];
      setPlaceholderToNodeValue(nextCell, placeholder);
      return nextCell.focus();
    }
    if (nextIndex < 0) {
      if (isPrevButtonDisabled.get())
        return;
      const $months = months.get();
      const firstMonth = $months[0].value;
      const $numberOfMonths = numberOfMonths.get();
      placeholder.set(firstMonth.subtract({ months: $numberOfMonths }));
      tick().then(() => {
        const newCandidateCells = getSelectableCells(ids.calendar.get());
        if (!newCandidateCells.length) {
          return;
        }
        const newIndex = newCandidateCells.length - Math.abs(nextIndex);
        if (isValidIndex(newIndex, newCandidateCells)) {
          const newCell = newCandidateCells[newIndex];
          setPlaceholderToNodeValue(newCell, placeholder);
          return newCell.focus();
        }
      });
    }
    if (nextIndex >= candidateCells.length) {
      if (isNextButtonDisabled.get())
        return;
      const $months = months.get();
      const firstMonth = $months[0].value;
      const $numberOfMonths = numberOfMonths.get();
      placeholder.set(firstMonth.add({ months: $numberOfMonths }));
      tick().then(() => {
        const newCandidateCells = getSelectableCells(ids.calendar.get());
        if (!newCandidateCells.length) {
          return;
        }
        const newIndex = nextIndex - candidateCells.length;
        if (isValidIndex(newIndex, newCandidateCells)) {
          const nextCell = newCandidateCells[newIndex];
          return nextCell.focus();
        }
      });
    }
  }
  const _isDateDisabled = derived([isDateDisabled, placeholder, minValue, maxValue, disabled], ([$isDateDisabled, $placeholder, $minValue, $maxValue, $disabled]) => {
    return (date) => {
      if ($isDateDisabled?.(date) || $disabled)
        return true;
      if ($minValue && isBefore(date, $minValue))
        return true;
      if ($maxValue && isAfter(date, $maxValue))
        return true;
      if (!isSameMonth(date, $placeholder))
        return true;
      return false;
    };
  });
  const _isDateUnavailable = derived(isDateUnavailable, ($isDateUnavailable) => {
    return (date) => $isDateUnavailable?.(date);
  });
  return {
    elements: {
      calendar,
      heading,
      grid,
      cell,
      nextButton,
      prevButton
    },
    states: {
      placeholder: placeholder.toWritable(),
      months,
      value,
      weekdays,
      headingValue
    },
    helpers: {
      nextPage,
      prevPage,
      nextYear,
      prevYear,
      setYear,
      setMonth,
      isDateDisabled: _isDateDisabled,
      isDateSelected,
      isDateUnavailable: _isDateUnavailable
    },
    options,
    ids
  };
}
({
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  positioning: {
    placement: "bottom"
  },
  closeOnEscape: true,
  closeOnOutsideClick: true,
  onOutsideClick: void 0,
  preventScroll: false,
  forceVisible: false,
  locale: "en",
  granularity: void 0,
  disabled: false,
  readonly: false,
  minValue: void 0,
  maxValue: void 0,
  weekdayFormat: "narrow",
  ...omit(defaults$1, "isDateDisabled", "isDateUnavailable", "value", "locale", "disabled", "readonly", "minValue", "maxValue", "weekdayFormat")
});
const { name } = createElHelpers("dialog");
const defaults = {
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  role: "dialog",
  defaultOpen: false,
  portal: void 0,
  forceVisible: false,
  openFocus: void 0,
  closeFocus: void 0,
  onOutsideClick: void 0
};
const dialogIdParts = ["content", "title", "description"];
function createDialog(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "ids"));
  const { preventScroll, closeOnEscape, closeOnOutsideClick, role, portal, forceVisible, openFocus, closeFocus, onOutsideClick } = options;
  const activeTrigger = withGet.writable(null);
  const ids = toWritableStores({
    ...generateIds(dialogIdParts),
    ...withDefaults.ids
  });
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const isVisible = derived([open, forceVisible], ([$open, $forceVisible]) => {
    return $open || $forceVisible;
  });
  let unsubScroll = noop;
  function handleOpen(e) {
    const el = e.currentTarget;
    const triggerEl = e.currentTarget;
    if (!isHTMLElement(el) || !isHTMLElement(triggerEl))
      return;
    open.set(true);
    activeTrigger.set(triggerEl);
  }
  function handleClose() {
    open.set(false);
    handleFocus({
      prop: closeFocus.get(),
      defaultEl: activeTrigger.get()
    });
  }
  const trigger = makeElement(name("trigger"), {
    stores: [open],
    returned: ([$open]) => {
      return {
        "aria-haspopup": "dialog",
        "aria-expanded": $open,
        type: "button"
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        handleOpen(e);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        handleOpen(e);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const overlay = makeElement(name("overlay"), {
    stores: [isVisible, open],
    returned: ([$isVisible, $open]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": true,
        "data-state": $open ? "open" : "closed"
      };
    },
    action: (node) => {
      let unsubEscapeKeydown = noop;
      if (closeOnEscape.get()) {
        const escapeKeydown = useEscapeKeydown(node, {
          handler: () => {
            handleClose();
          }
        });
        if (escapeKeydown && escapeKeydown.destroy) {
          unsubEscapeKeydown = escapeKeydown.destroy;
        }
      }
      return {
        destroy() {
          unsubEscapeKeydown();
        }
      };
    }
  });
  const content = makeElement(name("content"), {
    stores: [isVisible, ids.content, ids.description, ids.title, open],
    returned: ([$isVisible, $contentId, $descriptionId, $titleId, $open]) => {
      return {
        id: $contentId,
        role: role.get(),
        "aria-describedby": $descriptionId,
        "aria-labelledby": $titleId,
        "aria-modal": $isVisible ? "true" : void 0,
        "data-state": $open ? "open" : "closed",
        tabindex: -1,
        hidden: $isVisible ? void 0 : true,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        })
      };
    },
    action: (node) => {
      let activate = noop;
      let deactivate = noop;
      const destroy = executeCallbacks(effect([open, closeOnOutsideClick, closeOnEscape], ([$open, $closeOnOutsideClick, $closeOnEscape]) => {
        if (!$open)
          return;
        const focusTrap = createFocusTrap({
          immediate: false,
          escapeDeactivates: $closeOnEscape,
          clickOutsideDeactivates: $closeOnOutsideClick,
          allowOutsideClick: true,
          returnFocusOnDeactivate: false,
          fallbackFocus: node
        });
        activate = focusTrap.activate;
        deactivate = focusTrap.deactivate;
        const ac = focusTrap.useFocusTrap(node);
        if (ac && ac.destroy) {
          return ac.destroy;
        } else {
          return focusTrap.deactivate;
        }
      }), effect([closeOnOutsideClick, open], ([$closeOnOutsideClick, $open]) => {
        return useModal(node, {
          open: $open,
          closeOnInteractOutside: $closeOnOutsideClick,
          onClose() {
            handleClose();
          },
          shouldCloseOnInteractOutside(e) {
            onOutsideClick.get()?.(e);
            if (e.defaultPrevented)
              return false;
            return true;
          }
        }).destroy;
      }), effect([closeOnEscape], ([$closeOnEscape]) => {
        if (!$closeOnEscape)
          return noop;
        return useEscapeKeydown(node, { handler: handleClose }).destroy;
      }), effect([isVisible], ([$isVisible]) => {
        tick().then(() => {
          if (!$isVisible) {
            deactivate();
          } else {
            activate();
          }
        });
      }));
      return {
        destroy: () => {
          unsubScroll();
          destroy();
        }
      };
    }
  });
  const portalled = makeElement(name("portalled"), {
    stores: portal,
    returned: ($portal) => ({
      "data-portal": portalAttr($portal)
    }),
    action: (node) => {
      const unsubPortal = effect([portal], ([$portal]) => {
        if ($portal === null)
          return noop;
        const portalDestination = getPortalDestination(node, $portal);
        if (portalDestination === null)
          return noop;
        return usePortal(node, portalDestination).destroy;
      });
      return {
        destroy() {
          unsubPortal();
        }
      };
    }
  });
  const title = makeElement(name("title"), {
    stores: [ids.title],
    returned: ([$titleId]) => ({
      id: $titleId
    })
  });
  const description = makeElement(name("description"), {
    stores: [ids.description],
    returned: ([$descriptionId]) => ({
      id: $descriptionId
    })
  });
  const close = makeElement(name("close"), {
    returned: () => ({
      type: "button"
    }),
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        handleClose();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.SPACE && e.key !== kbd.ENTER)
          return;
        e.preventDefault();
        handleClose();
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([open, preventScroll], ([$open, $preventScroll]) => {
    if (!isBrowser)
      return;
    if ($preventScroll && $open)
      unsubScroll = removeScroll();
    if ($open) {
      const contentEl = document.getElementById(ids.content.get());
      handleFocus({ prop: openFocus.get(), defaultEl: contentEl });
    }
    return () => {
      if (!forceVisible.get()) {
        unsubScroll();
      }
    };
  });
  return {
    ids,
    elements: {
      content,
      trigger,
      title,
      description,
      overlay,
      close,
      portalled
    },
    states: {
      open
    },
    options
  };
}
function createBitAttrs(bit, parts) {
  const attrs = {};
  parts.forEach((part) => {
    attrs[part] = {
      [`data-${bit}-${part}`]: ""
    };
  });
  return (part) => attrs[part];
}
function disabledAttrs(disabled) {
  return disabled ? { "aria-disabled": "true", "data-disabled": "" } : { "aria-disabled": void 0, "data-disabled": void 0 };
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function getOptionUpdater(options) {
  return function(key, value) {
    if (value === void 0)
      return;
    const store = options[key];
    if (store) {
      store.set(value);
    }
  };
}
function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((value, index) => value === arr2[index]);
}
function getDialogData() {
  const NAME = "dialog";
  const PARTS = [
    "close",
    "content",
    "description",
    "overlay",
    "portal",
    "title",
    "trigger"
  ];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getDialogData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const dialog = {
    ...createDialog({ ...removeUndefined(props), role: "dialog", forceVisible: true }),
    getAttrs
  };
  setContext(NAME, dialog);
  return {
    ...dialog,
    updateOption: getOptionUpdater(dialog.options)
  };
}
function getCtx() {
  const { NAME } = getDialogData();
  return getContext(NAME);
}
function Dialog($$payload, $$props) {
  push();
  var $$store_subs;
  let preventScroll = value_or_fallback($$props["preventScroll"], () => void 0);
  let closeOnEscape = value_or_fallback($$props["closeOnEscape"], () => void 0);
  let closeOnOutsideClick = value_or_fallback($$props["closeOnOutsideClick"], () => void 0);
  let portal = value_or_fallback($$props["portal"], () => void 0);
  let open = value_or_fallback($$props["open"], () => void 0);
  let onOpenChange = value_or_fallback($$props["onOpenChange"], () => void 0);
  let openFocus = value_or_fallback($$props["openFocus"], () => void 0);
  let closeFocus = value_or_fallback($$props["closeFocus"], () => void 0);
  let onOutsideClick = value_or_fallback($$props["onOutsideClick"], () => void 0);
  const {
    states: { open: localOpen },
    updateOption,
    ids
  } = setCtx({
    closeOnEscape,
    preventScroll,
    closeOnOutsideClick,
    portal,
    forceVisible: true,
    defaultOpen: open,
    openFocus,
    closeFocus,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.content, ids.description, ids.title], ([$contentId, $descriptionId, $titleId]) => ({
    content: $contentId,
    description: $descriptionId,
    title: $titleId
  }));
  open !== void 0 && localOpen.set(open);
  updateOption("preventScroll", preventScroll);
  updateOption("closeOnEscape", closeOnEscape);
  updateOption("closeOnOutsideClick", closeOnOutsideClick);
  updateOption("portal", portal);
  updateOption("openFocus", openFocus);
  updateOption("closeFocus", closeFocus);
  updateOption("onOutsideClick", onOutsideClick);
  $$payload.out += `<!--[-->`;
  slot(
    $$payload,
    $$props.children,
    {
      get ids() {
        return store_get($$store_subs ??= {}, "$idValues", idValues);
      }
    },
    null
  );
  $$payload.out += `<!--]-->`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, {
    preventScroll,
    closeOnEscape,
    closeOnOutsideClick,
    portal,
    open,
    onOpenChange,
    openFocus,
    closeFocus,
    onOutsideClick
  });
  pop();
}
function Dialog_close($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { close }, getAttrs } = getCtx();
  const attrs = getAttrs("close");
  builder = store_get($$store_subs ??= {}, "$close", close);
  Object.assign(builder, attrs);
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<button${spread_attributes([builder, { "type": "button" }, $$restProps], true, false, "")}><!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `<!--]--></button>`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Dialog_portal($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { portalled }, getAttrs } = getCtx();
  const attrs = getAttrs("portal");
  builder = store_get($$store_subs ??= {}, "$portalled", portalled);
  Object.assign(builder, attrs);
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}><!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `<!--]--></div>`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Dialog_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "el",
    "$$props"
  ]);
  push();
  var $$store_subs;
  let builder;
  let transition = value_or_fallback($$props["transition"], () => void 0);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], () => void 0);
  let inTransition = value_or_fallback($$props["inTransition"], () => void 0);
  let inTransitionConfig = value_or_fallback($$props["inTransitionConfig"], () => void 0);
  let outTransition = value_or_fallback($$props["outTransition"], () => void 0);
  let outTransitionConfig = value_or_fallback($$props["outTransitionConfig"], () => void 0);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let id = value_or_fallback($$props["id"], () => void 0);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { content },
    states: { open },
    ids,
    getAttrs
  } = getCtx();
  const attrs = getAttrs("content");
  if (id) {
    ids.content.set(id);
  }
  builder = store_get($$store_subs ??= {}, "$content", content);
  Object.assign(builder, attrs);
  $$payload.out += `<!--[-->`;
  if (asChild && store_get($$store_subs ??= {}, "$open", open)) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<!--[-->`;
    if (transition && store_get($$store_subs ??= {}, "$open", open)) {
      $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}><!--[-->`;
      slot(
        $$payload,
        $$props.children,
        {
          get builder() {
            return builder;
          }
        },
        null
      );
      $$payload.out += `<!--]--></div>`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += `<!--[-->`;
      if (inTransition && outTransition && store_get($$store_subs ??= {}, "$open", open)) {
        $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}><!--[-->`;
        slot(
          $$payload,
          $$props.children,
          {
            get builder() {
              return builder;
            }
          },
          null
        );
        $$payload.out += `<!--]--></div>`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `<!--[-->`;
        if (inTransition && store_get($$store_subs ??= {}, "$open", open)) {
          $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}><!--[-->`;
          slot(
            $$payload,
            $$props.children,
            {
              get builder() {
                return builder;
              }
            },
            null
          );
          $$payload.out += `<!--]--></div>`;
          $$payload.out += "<!--]-->";
        } else {
          $$payload.out += `<!--[-->`;
          if (outTransition && store_get($$store_subs ??= {}, "$open", open)) {
            $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}><!--[-->`;
            slot(
              $$payload,
              $$props.children,
              {
                get builder() {
                  return builder;
                }
              },
              null
            );
            $$payload.out += `<!--]--></div>`;
            $$payload.out += "<!--]-->";
          } else {
            $$payload.out += `<!--[-->`;
            if (store_get($$store_subs ??= {}, "$open", open)) {
              $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}><!--[-->`;
              slot(
                $$payload,
                $$props.children,
                {
                  get builder() {
                    return builder;
                  }
                },
                null
              );
              $$payload.out += `<!--]--></div>`;
              $$payload.out += "<!--]-->";
            } else {
              $$payload.out += "<!--]!-->";
            }
            $$payload.out += "<!--]!-->";
          }
          $$payload.out += "<!--]!-->";
        }
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, {
    transition,
    transitionConfig,
    inTransition,
    inTransitionConfig,
    outTransition,
    outTransitionConfig,
    asChild,
    id,
    el
  });
  pop();
}
function Dialog_overlay($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "el",
    "$$props"
  ]);
  push();
  var $$store_subs;
  let builder;
  let transition = value_or_fallback($$props["transition"], () => void 0);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], () => void 0);
  let inTransition = value_or_fallback($$props["inTransition"], () => void 0);
  let inTransitionConfig = value_or_fallback($$props["inTransitionConfig"], () => void 0);
  let outTransition = value_or_fallback($$props["outTransition"], () => void 0);
  let outTransitionConfig = value_or_fallback($$props["outTransitionConfig"], () => void 0);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { overlay },
    states: { open },
    getAttrs
  } = getCtx();
  const attrs = getAttrs("overlay");
  builder = store_get($$store_subs ??= {}, "$overlay", overlay);
  Object.assign(builder, attrs);
  $$payload.out += `<!--[-->`;
  if (asChild && store_get($$store_subs ??= {}, "$open", open)) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<!--[-->`;
    if (transition && store_get($$store_subs ??= {}, "$open", open)) {
      $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}></div>`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += `<!--[-->`;
      if (inTransition && outTransition && store_get($$store_subs ??= {}, "$open", open)) {
        $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}></div>`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `<!--[-->`;
        if (inTransition && store_get($$store_subs ??= {}, "$open", open)) {
          $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}></div>`;
          $$payload.out += "<!--]-->";
        } else {
          $$payload.out += `<!--[-->`;
          if (outTransition && store_get($$store_subs ??= {}, "$open", open)) {
            $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}></div>`;
            $$payload.out += "<!--]-->";
          } else {
            $$payload.out += `<!--[-->`;
            if (store_get($$store_subs ??= {}, "$open", open)) {
              $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}></div>`;
              $$payload.out += "<!--]-->";
            } else {
              $$payload.out += "<!--]!-->";
            }
            $$payload.out += "<!--]!-->";
          }
          $$payload.out += "<!--]!-->";
        }
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, {
    transition,
    transitionConfig,
    inTransition,
    inTransitionConfig,
    outTransition,
    outTransitionConfig,
    asChild,
    el
  });
  pop();
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const flyAndScale = (node, params = { y: -8, x: 0, start: 0.95, duration: 150 }) => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;
  const scaleConversion = (valueA, scaleA, scaleB) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;
    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;
    return valueB;
  };
  const styleToString2 = (style2) => {
    return Object.keys(style2).reduce((str, key) => {
      if (style2[key] === void 0)
        return str;
      return str + `${key}:${style2[key]};`;
    }, "");
  };
  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);
      return styleToString2({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t
      });
    },
    easing: cubicOut
  };
};
const defaultAttributes = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }
};
function Icon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "type",
    "name",
    "color",
    "size",
    "stroke",
    "iconNode",
    "$$props"
  ]);
  push();
  let type = $$props["type"];
  let name2 = $$props["name"];
  let color = value_or_fallback($$props["color"], () => "currentColor");
  let size = value_or_fallback($$props["size"], () => 24);
  let stroke = value_or_fallback($$props["stroke"], () => 2);
  let iconNode = $$props["iconNode"];
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    [
      defaultAttributes[type],
      $$restProps,
      { "width": size },
      { "height": size },
      {
        "class": `tabler-icon tabler-icon-${name2} ${$$sanitized_props.class ?? ""}`
      },
      type === "filled" ? { fill: color } : { "stroke-width": stroke, stroke: color }
    ],
    false,
    true,
    ""
  )}><!--[-->`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const $$item = each_array[$$index];
    const [tag, attrs] = $$item;
    $$payload.out += "<!--[-->";
    $$payload.out += `<!--[-->`;
    if (tag)
      element(
        $$payload,
        tag,
        () => {
          $$payload.out += `${spread_attributes([attrs], false, true, "")}`;
        },
        () => {
        }
      );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  }
  $$payload.out += "<!--]-->";
  $$payload.out += `<!--[-->`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `<!--]--></svg>`;
  bind_props($$props, { type, name: name2, color, size, stroke, iconNode });
  pop();
}
function Calendar_event($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      {
        "d": "M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
      }
    ],
    ["path", { "d": "M16 3l0 4" }],
    ["path", { "d": "M8 3l0 4" }],
    ["path", { "d": "M4 11l16 0" }],
    ["path", { "d": "M8 15h2v2h-2z" }]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "calendar-event" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `<!--]-->`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  pop();
}
function Car($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      { "d": "M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }
    ],
    [
      "path",
      {
        "d": "M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
      }
    ],
    [
      "path",
      {
        "d": "M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"
      }
    ]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "car" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `<!--]-->`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  pop();
}
function Road($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    ["path", { "d": "M4 19l4 -14" }],
    ["path", { "d": "M16 5l4 14" }],
    ["path", { "d": "M12 8v-2" }],
    ["path", { "d": "M12 13v-2" }],
    ["path", { "d": "M12 18v-2" }]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "road" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `<!--]-->`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  pop();
}
function Users_group($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      { "d": "M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" }
    ],
    [
      "path",
      {
        "d": "M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"
      }
    ],
    [
      "path",
      { "d": "M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" }
    ],
    ["path", { "d": "M17 10h2a2 2 0 0 1 2 2v1" }],
    [
      "path",
      { "d": "M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" }
    ],
    [
      "path",
      { "d": "M3 13v-1a2 2 0 0 1 2 -2h2" }
    ]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "users-group" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `<!--]-->`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  pop();
}
const linear = (x) => x;
function cubic_out(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function split_css_unit(value) {
  const split = typeof value === "string" && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return split ? [parseFloat(split[1]), split[2] || "px"] : [
    /** @type {number} */
    value,
    "px"
  ];
}
function fade(node, { delay = 0, duration = 400, easing = linear } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function fly(node, { delay = 0, duration = 400, easing = cubic_out, x = 0, y = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  const [x_value, x_unit] = split_css_unit(x);
  const [y_value, y_unit] = split_css_unit(y);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x_value}${x_unit}, ${(1 - t) * y_value}${y_unit});
			opacity: ${target_opacity - od * u}`
  };
}
function slide(node, { delay = 0, duration = 400, easing = cubic_out, axis = "y" } = {}) {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const primary_property = axis === "y" ? "height" : "width";
  const primary_property_value = parseFloat(style[primary_property]);
  const secondary_properties = axis === "y" ? ["top", "bottom"] : ["left", "right"];
  const capitalized_secondary_properties = secondary_properties.map(
    (e) => (
      /** @type {'Left' | 'Right' | 'Top' | 'Bottom'} */
      `${e[0].toUpperCase()}${e.slice(1)}`
    )
  );
  const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
  const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
  const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
  const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
  const border_width_start_value = parseFloat(
    style[`border${capitalized_secondary_properties[0]}Width`]
  );
  const border_width_end_value = parseFloat(
    style[`border${capitalized_secondary_properties[1]}Width`]
  );
  return {
    delay,
    duration,
    easing,
    css: (t) => `overflow: hidden;opacity: ${Math.min(t * 20, 1) * opacity};${primary_property}: ${t * primary_property_value}px;padding-${secondary_properties[0]}: ${t * padding_start_value}px;padding-${secondary_properties[1]}: ${t * padding_end_value}px;margin-${secondary_properties[0]}: ${t * margin_start_value}px;margin-${secondary_properties[1]}: ${t * margin_end_value}px;border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
  };
}
function Cross2($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "size",
    "role",
    "color",
    "ariaLabel",
    "withEvents",
    "$$props"
  ]);
  push();
  const ctx = getContext("iconCtx") ?? {};
  let size = value_or_fallback($$props["size"], () => ctx.size || "24");
  let role = value_or_fallback($$props["role"], () => ctx.role || "img");
  let color = value_or_fallback($$props["color"], () => ctx.color || "currentColor");
  let ariaLabel = value_or_fallback($$props["ariaLabel"], () => "cross 2,");
  let withEvents = value_or_fallback($$props["withEvents"], () => false);
  $$payload.out += `<!--[-->`;
  if (withEvents) {
    $$payload.out += `<svg${spread_attributes(
      [
        { "width": size },
        { "height": size },
        $$restProps,
        { "role": role },
        { "aria-label": ariaLabel },
        { "viewBox": "0 0 15 15" },
        { "fill": color },
        { "xmlns": "http://www.w3.org/2000/svg" }
      ],
      false,
      true,
      ""
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<svg${spread_attributes(
      [
        { "width": size },
        { "height": size },
        $$restProps,
        { "role": role },
        { "aria-label": ariaLabel },
        { "viewBox": "0 0 15 15" },
        { "fill": color },
        { "xmlns": "http://www.w3.org/2000/svg" }
      ],
      false,
      true,
      ""
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { size, role, color, ariaLabel, withEvents });
  pop();
}
function Oval_icon($$payload, $$props) {
  push();
  $$payload.out += `<svg viewBox="0 0 24 24" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 7.5H6C4.34315 7.5 3 8.84315 3 10.5V11.2918C3 12.4281 3.64201 13.4669 4.65836 13.9751L7.30426 15.298C10.2603 16.776 13.7397 16.776 16.6957 15.298L19.3416 13.9751C20.358 13.4669 21 12.4281 21 11.2918V10.5C21 8.84315 19.6569 7.5 18 7.5ZM6 4.5H18C21.3137 4.5 24 7.18629 24 10.5V11.2918C24 13.5644 22.716 15.642 20.6833 16.6584L18.0374 17.9813C14.2368 19.8816 9.76324 19.8816 5.96262 17.9813L3.31672 16.6584C1.28401 15.642 0 13.5644 0 11.2918V10.5C0 7.18629 2.68629 4.5 6 4.5Z" fill="currentColor"></path></svg>`;
  pop();
}
function Sports_car_icon($$payload, $$props) {
  push();
  $$payload.out += `<svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 10.5H21.6215L20.1215 9H21C21.8284 9 22.5 8.32843 22.5 7.5H18.6215L18.0002 6.87868C17.4376 6.31607 16.6746 6 15.8789 6H8.12155C7.3259 6 6.56284 6.31607 6.00023 6.87868L5.37891 7.5H1.5C1.5 8.32843 2.17157 9 3 9H3.87891L2.37891 10.5H1.5C0.671573 10.5 0 11.1716 0 12V16.5C0 17.3284 0.671573 18 1.5 18H3C3.82843 18 4.5 17.3284 4.5 16.5H19.5C19.5 17.3284 20.1716 18 21 18H22.5C23.3284 18 24 17.3284 24 16.5V12C24 11.1716 23.3284 10.5 22.5 10.5ZM19.5002 10.5H4.50023L7.06066 7.93934C7.34196 7.65803 7.7235 7.5 8.12132 7.5H15.8787C16.2765 7.5 16.658 7.65804 16.9393 7.93934L19.5002 10.5ZM8.56066 12.4393L7.81066 13.1893C7.61175 13.3883 7.5 13.658 7.5 13.9393C7.5 14.5251 7.97487 15 8.56066 15H15.4393C16.0251 15 16.5 14.5251 16.5 13.9393C16.5 13.658 16.3883 13.3883 16.1893 13.1893L15.4393 12.4393C15.158 12.158 14.7765 12 14.3787 12H9.62132C9.2235 12 8.84197 12.158 8.56066 12.4393ZM4.79289 13.2071C4.60536 13.3946 4.351 13.5 4.08579 13.5H3V12H6L4.79289 13.2071ZM21 13.5H19.9142C19.649 13.5 19.3946 13.3946 19.2071 13.2071L18 12H21V13.5Z" fill="currentColor"></path></svg>`;
  pop();
}
function Formula_car_icon($$payload, $$props) {
  push();
  $$payload.out += `<svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.95381 9H7.5C6.67157 9 6 9.67157 6 10.5V12.5L4.5 13V12C4.5 11.1716 3.82843 10.5 3 10.5H1.5C0.671573 10.5 0 11.1716 0 12V16.5C0 17.3284 0.671573 18 1.5 18H3C3.82843 18 4.5 17.3284 4.5 16.5V14.5L6.03931 13.9869C6.27193 15.4122 7.50893 16.5 9 16.5H9.85714L10.0714 18H4.5C4.5 18.8284 5.17157 19.5 6 19.5H10.2857L10.2879 19.5151C10.4096 20.3671 11.1393 21 12 21C12.8607 21 13.5904 20.3671 13.7121 19.5151L13.7143 19.5H18C18.8284 19.5 19.5 18.8284 19.5 18H13.9286L14.1429 16.5H15C16.4911 16.5 17.7281 15.4122 17.9607 13.9869L19.5 14.5V16.5C19.5 17.3284 20.1716 18 21 18H22.5C23.3284 18 24 17.3284 24 16.5V12C24 11.1716 23.3284 10.5 22.5 10.5H21C20.1716 10.5 19.5 11.1716 19.5 12V13L18 12.5V10.5C18 9.67157 17.3284 9 16.5 9H15.0461L14.6711 7.5H19.5C20.3284 7.5 21 6.82843 21 6H14.2961L14.2762 5.92025C14.0675 5.08556 13.3176 4.5 12.4572 4.5H11.5428C10.6824 4.5 9.93242 5.08556 9.72375 5.92025L9.70381 6H3C3 6.82843 3.67157 7.5 4.5 7.5H9.32881L8.95381 9ZM15 10.5H16.5V13.5C16.5 14.3284 15.8284 15 15 15H14.3571L15 10.5ZM10.5 9L13.5 9L12.821 6.28405C12.7793 6.11711 12.6293 6 12.4572 6L11.5428 6C11.3707 6 11.2207 6.11711 11.179 6.28405L10.5 9ZM9 10.5H7.5V13.5C7.5 14.3284 8.17157 15 9 15H9.64286L9 10.5Z" fill="currentColor"></path></svg>`;
  pop();
}
function Dirt_oval_icon($$payload, $$props) {
  push();
  $$payload.out += `<svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 3H16C19.7712 3 21.6569 3 22.8284 4.17157C24 5.34315 24 7.22876 24 11V13C24 16.7712 24 18.6569 22.8284 19.8284C21.6569 21 19.7712 21 16 21H8C4.22876 21 2.34315 21 1.17157 19.8284C0 18.6569 0 16.7712 0 13V11C0 7.22876 0 5.34315 1.17157 4.17157C2.34315 3 4.22876 3 8 3ZM9 9H15C16.6569 9 18 10.3431 18 12C18 13.6569 16.6569 15 15 15H9C7.34315 15 6 13.6569 6 12C6 10.3431 7.34315 9 9 9ZM15 6H9C5.68629 6 3 8.68629 3 12C3 15.3137 5.68629 18 9 18H15C18.3137 18 21 15.3137 21 12C21 8.68629 18.3137 6 15 6Z" fill="currentColor"></path></svg>`;
  pop();
}
function Dirt_road_icon($$payload, $$props) {
  push();
  $$payload.out += `<svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 3H16C19.7712 3 21.6569 3 22.8284 4.17157C24 5.34315 24 7.22876 24 11V13C24 16.7712 24 18.6569 22.8284 19.8284C21.6569 21 19.7712 21 16 21H8C4.22876 21 2.34315 21 1.17157 19.8284C0 18.6569 0 16.7712 0 13V11C0 7.22876 0 5.34315 1.17157 4.17157C2.34315 3 4.22876 3 8 3ZM6 18H3V9C3 7.34315 4.34315 6 6 6H10.5C12.1569 6 13.5 7.34315 13.5 9V13C13.5 14.1046 14.3954 15 15.5 15H16C17.1046 15 18 14.1046 18 13V6H21V15C21 16.6569 19.6569 18 18 18H13.5C11.8431 18 10.5 16.6569 10.5 15V11C10.5 9.89543 9.60457 9 8.5 9H8C6.89543 9 6 9.89543 6 11V18Z" fill="currentColor"></path></svg>`;
  pop();
}
let isOpen = false;
let isCollapsed = false;
const sidebar = {
  get isOpen() {
    return isOpen;
  },
  toggle: () => isOpen = !isOpen,
  setIsOpen: (value) => isOpen = value,
  get isCollapsed() {
    return isCollapsed;
  },
  toggleCollapse: () => isCollapsed = !isCollapsed
};
export {
  useEscapeKeydown as $,
  cn as A,
  slide as B,
  Calendar_event as C,
  Car as D,
  Dialog_portal as E,
  fade as F,
  Dialog_overlay as G,
  fly as H,
  Icon as I,
  Dialog_content as J,
  Dialog_close as K,
  Cross2 as L,
  Dialog as M,
  Formula_car_icon as N,
  Oval_icon as O,
  Dirt_oval_icon as P,
  Dirt_road_icon as Q,
  Road as R,
  Sports_car_icon as S,
  sidebar as T,
  Users_group as U,
  isBrowser as V,
  sleep as W,
  wrapArray as X,
  usePortal as Y,
  createFocusTrap as Z,
  useModal as _,
  overridable as a,
  portalAttr as a0,
  getPortalDestination as a1,
  FIRST_LAST_KEYS as a2,
  SELECTION_KEYS as a3,
  isElementDisabled as a4,
  safeOnMount as a5,
  handleFocus as a6,
  removeScroll as a7,
  isElement as a8,
  isFocusVisible as a9,
  isTouch as aa,
  createCalendar as ab,
  disabledAttrs as ac,
  getCtx as ad,
  flyAndScale as ae,
  addMeltEventListener as b,
  tick as c,
  disabledAttr as d,
  executeCallbacks as e,
  generateId as f,
  generateIds as g,
  createElHelpers as h,
  isHTMLElement as i,
  getElementByMeltId as j,
  kbd as k,
  safeOnDestroy as l,
  makeElement as m,
  noop as n,
  omit as o,
  effect as p,
  addEventListener as q,
  isTouchDevice as r,
  styleToString as s,
  toWritableStores as t,
  isFirefox as u,
  removeUndefined as v,
  withGet as w,
  createBitAttrs as x,
  getOptionUpdater as y,
  arraysAreEqual as z
};
