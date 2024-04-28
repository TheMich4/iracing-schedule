import { v as value_or_fallback, h as head, c as bind_props, b as pop, d as attr, p as push, s as setContext, g as getContext, e as rest_props, f as store_get, i as slot, j as spread_attributes, u as unsubscribe_stores, k as sanitize_props, l as spread_props, m as escape, n as stringify } from "../../chunks/index2.js";
import { d as derived, w as writable } from "../../chunks/index.js";
import "dequal";
import { t as toWritableStores, o as omit, g as generateIds, a as overridable, m as makeElement, d as disabledAttr, e as executeCallbacks, b as addMeltEventListener, s as styleToString$1, c as tick, f as generateId, i as isHTMLElement, h as createElHelpers, k as kbd, j as getElementByMeltId, n as noop, l as safeOnDestroy, w as withGet, p as effect, q as addEventListener$1, r as isTouchDevice, u as isFirefox, v as removeUndefined, x as createBitAttrs, y as getOptionUpdater, z as arraysAreEqual, A as cn, I as Icon, C as Calendar_event, B as slide, D as Car, U as Users_group, R as Road, E as Dialog_portal, F as fade, G as Dialog_overlay, H as fly, J as Dialog_content, K as Dialog_close, L as Cross2, M as Dialog, O as Oval_icon, S as Sports_car_icon, N as Formula_car_icon, P as Dirt_oval_icon, Q as Dirt_road_icon, T as sidebar } from "../../chunks/sidebar.svelte.js";
import { p as page } from "../../chunks/stores.js";
import "clsx";
import { tv } from "tailwind-variants";
let timeoutAction;
let timeoutEnable;
function withoutTransition(action) {
  if (typeof document === "undefined")
    return;
  clearTimeout(timeoutAction);
  clearTimeout(timeoutEnable);
  const style = document.createElement("style");
  const css = document.createTextNode(`* {
     -webkit-transition: none !important;
     -moz-transition: none !important;
     -o-transition: none !important;
     -ms-transition: none !important;
     transition: none !important;
  }`);
  style.appendChild(css);
  const disable = () => document.head.appendChild(style);
  const enable = () => document.head.removeChild(style);
  if (typeof window.getComputedStyle !== "undefined") {
    disable();
    action();
    window.getComputedStyle(style).opacity;
    enable();
    return;
  }
  if (typeof window.requestAnimationFrame !== "undefined") {
    disable();
    action();
    window.requestAnimationFrame(enable);
    return;
  }
  disable();
  timeoutAction = window.setTimeout(() => {
    action();
    timeoutEnable = window.setTimeout(enable, 120);
  }, 120);
}
const noopStorage = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItem: (_key) => null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setItem: (_key, _value) => {
  }
};
const isBrowser = typeof document !== "undefined";
const modes = ["dark", "light", "system"];
const localStorageKey = "mode-watcher-mode";
const userPrefersMode = createUserPrefersMode();
const systemPrefersMode = createSystemMode();
const themeColors = writable(void 0);
const disableTransitions = writable(true);
const derivedMode = createDerivedMode();
function createUserPrefersMode() {
  const defaultValue = "system";
  const storage = isBrowser ? localStorage : noopStorage;
  const initialValue = storage.getItem(localStorageKey);
  let value = isValidMode(initialValue) ? initialValue : defaultValue;
  const { subscribe, set: _set } = writable(value, () => {
    if (!isBrowser)
      return;
    const handler = (e) => {
      if (e.key !== localStorageKey)
        return;
      const newValue = e.newValue;
      if (isValidMode(newValue)) {
        _set(value = newValue);
      } else {
        _set(value = defaultValue);
      }
    };
    addEventListener("storage", handler);
    return () => removeEventListener("storage", handler);
  });
  function set(v) {
    _set(value = v);
    storage.setItem(localStorageKey, value);
  }
  return {
    subscribe,
    set
  };
}
function createSystemMode() {
  const defaultValue = void 0;
  let track = true;
  const { subscribe, set } = writable(defaultValue, () => {
    if (!isBrowser)
      return;
    const handler = (e) => {
      if (!track)
        return;
      set(e.matches ? "light" : "dark");
    };
    const mediaQueryState = window.matchMedia("(prefers-color-scheme: light)");
    mediaQueryState.addEventListener("change", handler);
    return () => mediaQueryState.removeEventListener("change", handler);
  });
  function query() {
    if (!isBrowser)
      return;
    const mediaQueryState = window.matchMedia("(prefers-color-scheme: light)");
    set(mediaQueryState.matches ? "light" : "dark");
  }
  function tracking(active) {
    track = active;
  }
  return {
    subscribe,
    query,
    tracking
  };
}
function createDerivedMode() {
  const { subscribe } = derived([userPrefersMode, systemPrefersMode, themeColors, disableTransitions], ([$userPrefersMode, $systemPrefersMode, $themeColors, $disableTransitions]) => {
    if (!isBrowser)
      return void 0;
    const derivedMode2 = $userPrefersMode === "system" ? $systemPrefersMode : $userPrefersMode;
    function update() {
      const htmlEl = document.documentElement;
      const themeColorEl = document.querySelector('meta[name="theme-color"]');
      if (derivedMode2 === "light") {
        htmlEl.classList.remove("dark");
        htmlEl.style.colorScheme = "light";
        if (themeColorEl && $themeColors) {
          themeColorEl.setAttribute("content", $themeColors.light);
        }
      } else {
        htmlEl.classList.add("dark");
        htmlEl.style.colorScheme = "dark";
        if (themeColorEl && $themeColors) {
          themeColorEl.setAttribute("content", $themeColors.dark);
        }
      }
    }
    if ($disableTransitions) {
      withoutTransition(update);
    } else {
      update();
    }
    return derivedMode2;
  });
  return {
    subscribe
  };
}
function isValidMode(value) {
  if (typeof value !== "string")
    return false;
  return modes.includes(value);
}
function setInitialMode(defaultMode, themeColors2) {
  const rootEl = document.documentElement;
  const mode = localStorage.getItem("mode-watcher-mode") || defaultMode;
  const light = mode === "light" || mode === "system" && window.matchMedia("(prefers-color-scheme: light)").matches;
  rootEl.classList[light ? "remove" : "add"]("dark");
  rootEl.style.colorScheme = light ? "light" : "dark";
  if (themeColors2) {
    const themeMetaEl = document.querySelector('meta[name="theme-color"]');
    if (themeMetaEl) {
      themeMetaEl.setAttribute("content", mode === "light" ? themeColors2.light : themeColors2.dark);
    }
  }
  localStorage.setItem("mode-watcher-mode", mode);
}
function Mode_watcher($$payload, $$props) {
  push();
  let track = value_or_fallback($$props["track"], () => true);
  let defaultMode = value_or_fallback($$props["defaultMode"], () => "system");
  let themeColors$1 = value_or_fallback($$props["themeColors"], () => void 0);
  let disableTransitions$1 = value_or_fallback($$props["disableTransitions"], () => true);
  themeColors.set(themeColors$1);
  disableTransitions.set(disableTransitions$1);
  const args = `"${defaultMode}"${themeColors$1 ? `, ${JSON.stringify(themeColors$1)}` : ""}`;
  head($$payload, ($$payload2) => {
    $$payload2.out += `<!--[-->`;
    if (themeColors$1) {
      $$payload2.out += `<meta name="theme-color"${attr("content", themeColors$1.dark, false)}>`;
      $$payload2.out += "<!--]-->";
    } else {
      $$payload2.out += "<!--]!-->";
    }
    $$payload2.out += ` <!--[-->${`<script nonce="%sveltekit.nonce%">(` + setInitialMode.toString() + `)(` + args + `);<\/script>`}<!--]-->`;
  });
  bind_props($$props, {
    track,
    defaultMode,
    themeColors: themeColors$1,
    disableTransitions: disableTransitions$1
  });
  pop();
}
function clamp(min, value, max) {
  return Math.max(min, Math.min(value, max));
}
const { name: name$1, selector } = createElHelpers("accordion");
const defaults$1 = {
  multiple: false,
  disabled: false,
  forceVisible: false
};
const createAccordion = (props) => {
  const withDefaults = { ...defaults$1, ...props };
  const options = toWritableStores(omit(withDefaults, "value", "onValueChange", "defaultValue"));
  const meltIds = generateIds(["root"]);
  const { disabled, forceVisible } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  const isSelected = (key, v) => {
    if (v === void 0)
      return false;
    if (typeof v === "string")
      return v === key;
    return v.includes(key);
  };
  const isSelectedStore = derived(value, ($value) => {
    return (key) => isSelected(key, $value);
  });
  const root = makeElement(name$1(), {
    returned: () => ({
      "data-melt-id": meltIds.root
    })
  });
  const parseItemProps = (props2) => {
    if (typeof props2 === "string") {
      return { value: props2 };
    } else {
      return props2;
    }
  };
  const parseHeadingProps = (props2) => {
    if (typeof props2 === "number") {
      return { level: props2 };
    } else {
      return props2;
    }
  };
  const item = makeElement(name$1("item"), {
    stores: value,
    returned: ($value) => {
      return (props2) => {
        const { value: itemValue, disabled: disabled2 } = parseItemProps(props2);
        return {
          "data-state": isSelected(itemValue, $value) ? "open" : "closed",
          "data-disabled": disabledAttr(disabled2)
        };
      };
    }
  });
  const trigger = makeElement(name$1("trigger"), {
    stores: [value, disabled],
    returned: ([$value, $disabled]) => {
      return (props2) => {
        const { value: itemValue, disabled: disabled2 } = parseItemProps(props2);
        return {
          disabled: disabledAttr($disabled || disabled2),
          "aria-expanded": isSelected(itemValue, $value) ? true : false,
          "aria-disabled": disabled2 ? true : false,
          "data-disabled": disabledAttr(disabled2),
          "data-value": itemValue,
          "data-state": isSelected(itemValue, $value) ? "open" : "closed"
        };
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        const disabled2 = node.dataset.disabled === "true";
        const itemValue = node.dataset.value;
        if (disabled2 || !itemValue)
          return;
        handleValueUpdate(itemValue);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (![kbd.ARROW_DOWN, kbd.ARROW_UP, kbd.HOME, kbd.END].includes(e.key)) {
          return;
        }
        e.preventDefault();
        if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
          const disabled2 = node.dataset.disabled === "true";
          const itemValue = node.dataset.value;
          if (disabled2 || !itemValue)
            return;
          handleValueUpdate(itemValue);
          return;
        }
        const el = e.target;
        const rootEl = getElementByMeltId(meltIds.root);
        if (!rootEl || !isHTMLElement(el))
          return;
        const items = Array.from(rootEl.querySelectorAll(selector("trigger")));
        const candidateItems = items.filter((item2) => {
          if (!isHTMLElement(item2))
            return false;
          return item2.dataset.disabled !== "true";
        });
        if (!candidateItems.length)
          return;
        const elIdx = candidateItems.indexOf(el);
        if (e.key === kbd.ARROW_DOWN) {
          candidateItems[(elIdx + 1) % candidateItems.length].focus();
        }
        if (e.key === kbd.ARROW_UP) {
          candidateItems[(elIdx - 1 + candidateItems.length) % candidateItems.length].focus();
        }
        if (e.key === kbd.HOME) {
          candidateItems[0].focus();
        }
        if (e.key === kbd.END) {
          candidateItems[candidateItems.length - 1].focus();
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const content = makeElement(name$1("content"), {
    stores: [value, disabled, forceVisible],
    returned: ([$value, $disabled, $forceVisible]) => {
      return (props2) => {
        const { value: itemValue } = parseItemProps(props2);
        const isVisible = isSelected(itemValue, $value) || $forceVisible;
        return {
          "data-state": isVisible ? "open" : "closed",
          "data-disabled": disabledAttr($disabled),
          "data-value": itemValue,
          hidden: isVisible ? void 0 : true,
          style: styleToString$1({
            display: isVisible ? void 0 : "none"
          })
        };
      };
    },
    action: (node) => {
      tick().then(() => {
        const contentId = generateId();
        const triggerId = generateId();
        const parentTrigger = document.querySelector(`${selector("trigger")}, [data-value="${node.dataset.value}"]`);
        if (!isHTMLElement(parentTrigger))
          return;
        node.id = contentId;
        parentTrigger.setAttribute("aria-controls", contentId);
        parentTrigger.id = triggerId;
      });
    }
  });
  const heading = makeElement(name$1("heading"), {
    returned: () => {
      return (props2) => {
        const { level } = parseHeadingProps(props2);
        return {
          role: "heading",
          "aria-level": level,
          "data-heading-level": level
        };
      };
    }
  });
  function handleValueUpdate(itemValue) {
    value.update(($value) => {
      if ($value === void 0) {
        return withDefaults.multiple ? [itemValue] : itemValue;
      }
      if (Array.isArray($value)) {
        if ($value.includes(itemValue)) {
          return $value.filter((v) => v !== itemValue);
        }
        $value.push(itemValue);
        return $value;
      }
      return $value === itemValue ? void 0 : itemValue;
    });
  }
  return {
    ids: meltIds,
    elements: {
      root,
      item,
      trigger,
      content,
      heading
    },
    states: {
      value
    },
    helpers: {
      isSelected: isSelectedStore
    },
    options
  };
};
function debounceCallback(cb, delay) {
  let debounceTimer = 0;
  safeOnDestroy(() => {
    clearTimeout(debounceTimer);
  });
  return () => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(cb, delay);
  };
}
function resizeObserver(node, handleResize) {
  let animationFrame = 0;
  const observer = new ResizeObserver(() => {
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(handleResize);
  });
  observer.observe(node);
  return () => {
    window.cancelAnimationFrame(animationFrame);
    observer.unobserve(node);
  };
}
function addUnlinkedScrollListener(node, handler = noop) {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll)
      handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1])
      return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const [scrollClampMin, scrollClampMax] = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollClampMin, scrollPos, scrollClampMax);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function createStateMachine(initialState, machine) {
  const state = withGet.writable(initialState);
  function reducer(event) {
    const $state = state.get();
    const nextState = machine[$state][event];
    return nextState ?? $state;
  }
  const dispatch = (event) => {
    state.set(reducer(event));
  };
  return {
    state,
    dispatch
  };
}
function createBaseScrollbarAction(state) {
  const { rootState, scrollbarState } = state;
  scrollbarState.isVisible.set(true);
  function handleDragScroll(e) {
    const $domRect = scrollbarState.domRect.get();
    if (!$domRect)
      return;
    const x = e.clientX - $domRect.left;
    const y = e.clientY - $domRect.top;
    const $isHorizontal = scrollbarState.isHorizontal.get();
    if ($isHorizontal) {
      scrollbarState.onDragScroll(x);
    } else {
      scrollbarState.onDragScroll(y);
    }
  }
  function handlePointerDown(e) {
    if (e.button !== 0)
      return;
    const target = e.target;
    if (!isHTMLElement(target))
      return;
    target.setPointerCapture(e.pointerId);
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget))
      return;
    scrollbarState.domRect.set(currentTarget.getBoundingClientRect());
    scrollbarState.prevWebkitUserSelect.set(document.body.style.webkitUserSelect);
    document.body.style.webkitUserSelect = "none";
    const $viewportEl = rootState.viewportEl.get();
    if ($viewportEl) {
      $viewportEl.style.scrollBehavior = "auto";
    }
    handleDragScroll(e);
  }
  function handlePointerMove(e) {
    handleDragScroll(e);
  }
  function handlePointerUp(e) {
    const target = e.target;
    if (!isHTMLElement(target))
      return;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
    document.body.style.webkitUserSelect = scrollbarState.prevWebkitUserSelect.get();
    const $viewportEl = rootState.viewportEl.get();
    if ($viewportEl) {
      $viewportEl.style.scrollBehavior = "";
    }
    scrollbarState.domRect.set(null);
  }
  function handleWheel(e) {
    const target = e.target;
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(target) || !isHTMLElement(currentTarget))
      return;
    const isScrollbarWheel = currentTarget.contains(target);
    if (!isScrollbarWheel)
      return;
    const $sizes = scrollbarState.sizes.get();
    if (!$sizes)
      return;
    const maxScrollPos = $sizes.content - $sizes.viewport;
    scrollbarState.handleWheelScroll(e, maxScrollPos);
  }
  function baseAction(node) {
    scrollbarState.scrollbarEl.set(node);
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "pointerdown", handlePointerDown), addMeltEventListener(node, "pointermove", handlePointerMove), addMeltEventListener(node, "pointerup", handlePointerUp), addEventListener$1(document, "wheel", handleWheel, { passive: false }));
    const unsubResizeContent = effect([rootState.contentEl], ([$contentEl]) => {
      if (!$contentEl)
        return noop;
      return resizeObserver($contentEl, scrollbarState.handleSizeChange);
    });
    return {
      destroy() {
        unsubEvents();
        unsubResizeContent();
      }
    };
  }
  return baseAction;
}
function createAutoScrollbarAction(state) {
  const baseAction = createBaseScrollbarAction(state);
  const { rootState, scrollbarState } = state;
  const handleResize = debounceCallback(() => {
    const $viewportEl = rootState.viewportEl.get();
    if (!$viewportEl)
      return;
    const isOverflowX = $viewportEl.offsetWidth < $viewportEl.scrollWidth;
    const isOverflowY = $viewportEl.offsetHeight < $viewportEl.scrollHeight;
    scrollbarState.isVisible.set(scrollbarState.isHorizontal.get() ? isOverflowX : isOverflowY);
  }, 10);
  function scrollbarAutoAction(node) {
    const unsubBaseAction = baseAction(node)?.destroy;
    handleResize();
    const unsubObservers = [];
    const $viewportEl = rootState.viewportEl.get();
    if ($viewportEl) {
      unsubObservers.push(resizeObserver($viewportEl, handleResize));
    }
    const $contentEl = rootState.contentEl.get();
    if ($contentEl) {
      unsubObservers.push(resizeObserver($contentEl, handleResize));
    }
    return {
      destroy() {
        unsubObservers.forEach((unsub) => unsub());
        unsubBaseAction();
      }
    };
  }
  return scrollbarAutoAction;
}
function createHoverScrollbarAction(state) {
  const baseAction = createBaseScrollbarAction(state);
  const { rootState, scrollbarState } = state;
  scrollbarState.isVisible.set(false);
  let timeout;
  function handlePointerEnter() {
    window.clearTimeout(timeout);
    if (scrollbarState.isVisible.get())
      return;
    const $viewportEl = rootState.viewportEl.get();
    if (!$viewportEl)
      return;
    const isOverflowX = $viewportEl.offsetWidth < $viewportEl.scrollWidth;
    const isOverflowY = $viewportEl.offsetHeight < $viewportEl.scrollHeight;
    scrollbarState.isVisible.set(scrollbarState.isHorizontal.get() ? isOverflowX : isOverflowY);
  }
  function handlePointerLeave() {
    timeout = window.setTimeout(() => {
      if (!scrollbarState.isVisible.get())
        return;
      scrollbarState.isVisible.set(false);
    }, rootState.options.hideDelay.get());
  }
  function scrollbarHoverAction(node) {
    const unsubBaseAction = baseAction(node)?.destroy;
    const scrollAreaEl = node.closest("[data-melt-scroll-area]");
    let unsubScrollAreaListeners = noop;
    if (scrollAreaEl) {
      if (isTouchDevice()) {
        unsubScrollAreaListeners = executeCallbacks(addEventListener$1(scrollAreaEl, "touchstart", handlePointerEnter), addEventListener$1(scrollAreaEl, "touchend", handlePointerLeave));
      } else if (isFirefox()) {
        unsubScrollAreaListeners = executeCallbacks(addEventListener$1(scrollAreaEl, "pointerenter", handlePointerEnter), addEventListener$1(scrollAreaEl, "mouseenter", handlePointerEnter), addEventListener$1(scrollAreaEl, "mouseleave", handlePointerLeave));
      } else {
        unsubScrollAreaListeners = executeCallbacks(addEventListener$1(scrollAreaEl, "pointerenter", handlePointerEnter), addEventListener$1(scrollAreaEl, "pointerleave", handlePointerLeave));
      }
    }
    return {
      destroy() {
        unsubBaseAction?.();
        unsubScrollAreaListeners();
      }
    };
  }
  return scrollbarHoverAction;
}
function createScrollScrollbarAction(state) {
  const baseAction = createBaseScrollbarAction(state);
  const { rootState, scrollbarState } = state;
  const machine = createStateMachine("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  effect([machine.state], ([$status]) => {
    if ($status === "idle") {
      window.setTimeout(() => {
        machine.dispatch("HIDE");
      }, rootState.options.hideDelay.get());
    }
    if ($status === "hidden") {
      scrollbarState.isVisible.set(false);
    } else {
      scrollbarState.isVisible.set(true);
    }
  });
  const debounceScrollEnd = debounceCallback(() => machine.dispatch("SCROLL_END"), 100);
  effect([rootState.viewportEl, scrollbarState.isHorizontal], ([$viewportEl, $isHorizontal]) => {
    const scrollDirection = $isHorizontal ? "scrollLeft" : "scrollTop";
    let unsub = noop;
    if ($viewportEl) {
      let prevScrollPos = $viewportEl[scrollDirection];
      const handleScroll = () => {
        const scrollPos = $viewportEl[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          machine.dispatch("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      unsub = addEventListener$1($viewportEl, "scroll", handleScroll);
    }
    return () => {
      unsub();
    };
  });
  function scrollbarScrollAction(node) {
    const unsubBaseAction = baseAction(node)?.destroy;
    const unsubListeners = executeCallbacks(addEventListener$1(node, "pointerenter", () => machine.dispatch("POINTER_ENTER")), addEventListener$1(node, "pointerleave", () => machine.dispatch("POINTER_LEAVE")));
    return {
      destroy() {
        unsubBaseAction?.();
        unsubListeners();
      }
    };
  }
  return scrollbarScrollAction;
}
function createScrollbarX(state, createAction) {
  const action = createAction(state);
  const { rootState, scrollbarState } = state;
  return makeElement(name("scrollbar"), {
    stores: [scrollbarState.sizes, rootState.options.dir, scrollbarState.isVisible],
    returned: ([$sizes, $dir, $isVisible]) => {
      return {
        style: styleToString$1({
          position: "absolute",
          bottom: 0,
          left: $dir === "rtl" ? "var(--melt-scroll-area-corner-width)" : 0,
          right: $dir === "ltr" ? "var(--melt-scroll-area-corner-width)" : 0,
          "--melt-scroll-area-thumb-width": `${getThumbSize($sizes)}px`,
          visibility: !$isVisible ? "hidden" : void 0
        }),
        "data-state": $isVisible ? "visible" : "hidden"
      };
    },
    action: (node) => {
      const unsubAction = action(node)?.destroy;
      rootState.scrollbarXEl.set(node);
      rootState.scrollbarXEnabled.set(true);
      return {
        destroy() {
          unsubAction?.();
          rootState.scrollbarXEl.set(null);
        }
      };
    }
  });
}
function createScrollbarY(state, createAction) {
  const action = createAction(state);
  const { rootState, scrollbarState } = state;
  return makeElement(name("scrollbar"), {
    stores: [scrollbarState.sizes, rootState.options.dir, scrollbarState.isVisible],
    returned: ([$sizes, $dir, $isVisible]) => {
      return {
        style: styleToString$1({
          position: "absolute",
          top: 0,
          right: $dir === "ltr" ? 0 : void 0,
          left: $dir === "rtl" ? 0 : void 0,
          bottom: "var(--melt-scroll-area-corner-height)",
          "--melt-scroll-area-thumb-height": `${getThumbSize($sizes)}px`,
          visibility: !$isVisible ? "hidden" : void 0
        }),
        "data-state": $isVisible ? "visible" : "hidden"
      };
    },
    action: (node) => {
      const unsubAction = action(node)?.destroy;
      rootState.scrollbarYEl.set(node);
      rootState.scrollbarYEnabled.set(true);
      return {
        destroy() {
          unsubAction?.();
          rootState.scrollbarYEl.set(null);
        }
      };
    }
  });
}
function getScrollbarActionByType(type) {
  switch (type) {
    case "always":
      return createBaseScrollbarAction;
    case "auto":
      return createAutoScrollbarAction;
    case "hover":
      return createHoverScrollbarAction;
    case "scroll":
      return createScrollScrollbarAction;
    default:
      return createBaseScrollbarAction;
  }
}
const { name } = createElHelpers("scroll-area");
const scrollAreaIdParts = [
  "root",
  "viewport",
  "content",
  "scrollbarX",
  "scrollbarY",
  "thumbX",
  "thumbY"
];
const defaults = {
  type: "hover",
  hideDelay: 600,
  dir: "ltr"
};
function createScrollArea(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "ids"));
  const cornerWidth = withGet.writable(0);
  const cornerHeight = withGet.writable(0);
  const scrollbarXEnabled = withGet.writable(false);
  const scrollbarYEnabled = withGet.writable(false);
  const scrollAreaEl = withGet.writable(null);
  const viewportEl = withGet.writable(null);
  const contentEl = withGet.writable(null);
  const scrollbarXEl = withGet.writable(null);
  const scrollbarYEl = withGet.writable(null);
  const ids = toWritableStores({ ...generateIds(scrollAreaIdParts), ...withDefaults.ids });
  const rootState = {
    cornerWidth,
    cornerHeight,
    scrollbarXEnabled,
    scrollbarYEnabled,
    viewportEl,
    contentEl,
    options,
    scrollbarXEl,
    scrollbarYEl,
    scrollAreaEl,
    ids
  };
  const root = makeElement(name(), {
    stores: [cornerWidth, cornerHeight, ids.root],
    returned: ([$cornerWidth, $cornderHeight, $rootId]) => {
      return {
        style: styleToString$1({
          position: "relative",
          "--melt-scroll-area-corner-width": `${$cornerWidth}px`,
          "--melt-scroll-area-corner-height": `${$cornderHeight}px`
        }),
        id: $rootId
      };
    },
    action: (node) => {
      scrollAreaEl.set(node);
      return {
        destroy() {
          scrollAreaEl.set(null);
        }
      };
    }
  });
  const viewport = makeElement(name("viewport"), {
    stores: [scrollbarXEnabled, scrollbarYEnabled, ids.viewport],
    returned: ([$scrollbarXEnabled, $scrollbarYEnabled, $viewportId]) => {
      return {
        style: styleToString$1({
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
          "-webkit-overflow-scrolling": "touch",
          "-webkit-scrollbar": "none",
          "overflow-x": $scrollbarXEnabled ? "scroll" : "hidden",
          "overflow-y": $scrollbarYEnabled ? "scroll" : "hidden"
        }),
        id: $viewportId
      };
    },
    action: (node) => {
      const styleNode = document.createElement("style");
      styleNode.innerHTML = `
				/* Hide scrollbars cross-browser and enable momentum scroll for touch
					devices */
				[data-melt-scroll-area-viewport] {
					scrollbar-width: none;
					-ms-overflow-style: none;
					-webkit-overflow-scrolling: touch;
				}

				[data-melt-scroll-area-viewport]::-webkit-scrollbar {
					display: none;
				}
			`;
      node.parentElement?.insertBefore(styleNode, node);
      viewportEl.set(node);
      return {
        destroy() {
          styleNode.remove();
          viewportEl.set(null);
        }
      };
    }
  });
  const content = makeElement(name("content"), {
    stores: [ids.content],
    returned: ([$contentId]) => {
      return {
        style: styleToString$1({
          "min-width": "100%",
          display: "table"
        }),
        id: $contentId
      };
    },
    action: (node) => {
      contentEl.set(node);
      return {
        destroy() {
          contentEl.set(null);
        }
      };
    }
  });
  function createScrollbar(orientationProp = "vertical") {
    const orientation = withGet.writable(orientationProp);
    const isHorizontal = withGet.writable(orientationProp === "horizontal");
    const domRect = withGet.writable(null);
    const prevWebkitUserSelect = withGet.writable("");
    const pointerOffset = withGet.writable(0);
    const thumbEl = withGet.writable(null);
    const thumbOffset = withGet.writable(0);
    const scrollbarEl = withGet.writable(null);
    const sizes = withGet.writable({
      content: 0,
      viewport: 0,
      scrollbar: {
        size: 0,
        paddingStart: 0,
        paddingEnd: 0
      }
    });
    const isVisible = withGet.writable(false);
    const hasThumb = withGet.derived(sizes, ($sizes) => {
      const thumbRatio = getThumbRatio($sizes.viewport, $sizes.content);
      return Boolean(thumbRatio > 0 && thumbRatio < 1);
    });
    function getScrollPosition(pointerPos, dir) {
      return getScrollPositionFromPointer(pointerPos, pointerOffset.get(), sizes.get(), dir);
    }
    function handleWheelScroll(e, payload) {
      const $viewportEl = viewportEl.get();
      if (!$viewportEl)
        return;
      if (isHorizontal.get()) {
        const scrollPos = $viewportEl.scrollLeft + e.deltaY;
        $viewportEl.scrollLeft = scrollPos;
        if (isScrollingWithinScrollbarBounds(scrollPos, payload)) {
          e.preventDefault();
        }
      } else {
        const scrollPos = $viewportEl.scrollTop + e.deltaY;
        $viewportEl.scrollTop = scrollPos;
        if (isScrollingWithinScrollbarBounds(scrollPos, payload)) {
          e.preventDefault();
        }
      }
    }
    function handleThumbDown(payload) {
      if (isHorizontal.get()) {
        pointerOffset.set(payload.x);
      } else {
        pointerOffset.set(payload.y);
      }
    }
    function handleThumbUp() {
      pointerOffset.set(0);
    }
    function onThumbPositionChange() {
      const $viewportEl = viewportEl.get();
      const $thumbEl = thumbEl.get();
      if (!$viewportEl || !$thumbEl)
        return;
      const scrollPos = isHorizontal.get() ? $viewportEl.scrollLeft : $viewportEl.scrollTop;
      const offset = getThumbOffsetFromScroll(scrollPos, sizes.get(), rootState.options.dir.get());
      thumbOffset.set(offset);
    }
    function onDragScroll(payload) {
      const $viewportEl = viewportEl.get();
      if (!$viewportEl)
        return;
      if (isHorizontal.get()) {
        $viewportEl.scrollLeft = getScrollPosition(payload, rootState.options.dir.get());
      } else {
        $viewportEl.scrollTop = getScrollPosition(payload);
      }
    }
    function handleSizeChange() {
      const $scrollbarEl = scrollbarState.scrollbarEl.get();
      if (!$scrollbarEl)
        return;
      const $isHorizontal = scrollbarState.isHorizontal.get();
      const $viewportEl = rootState.viewportEl.get();
      if ($isHorizontal) {
        scrollbarState.sizes.set({
          content: $viewportEl?.scrollWidth ?? 0,
          viewport: $viewportEl?.offsetWidth ?? 0,
          scrollbar: {
            size: $scrollbarEl.clientWidth ?? 0,
            paddingStart: toInt(getComputedStyle($scrollbarEl).paddingLeft),
            paddingEnd: toInt(getComputedStyle($scrollbarEl).paddingRight)
          }
        });
      } else {
        scrollbarState.sizes.set({
          content: $viewportEl?.scrollHeight ?? 0,
          viewport: $viewportEl?.offsetHeight ?? 0,
          scrollbar: {
            size: $scrollbarEl.clientHeight ?? 0,
            paddingStart: toInt(getComputedStyle($scrollbarEl).paddingLeft),
            paddingEnd: toInt(getComputedStyle($scrollbarEl).paddingRight)
          }
        });
      }
    }
    const scrollbarState = {
      isHorizontal,
      domRect,
      prevWebkitUserSelect,
      pointerOffset,
      thumbEl,
      thumbOffset,
      sizes,
      orientation,
      handleThumbDown,
      handleThumbUp,
      onThumbPositionChange,
      onDragScroll,
      handleWheelScroll,
      hasThumb,
      scrollbarEl,
      isVisible,
      handleSizeChange
    };
    const scrollbarActionByType = getScrollbarActionByType(options.type.get());
    const scrollAreaState = { rootState, scrollbarState };
    const scrollbar = orientationProp === "horizontal" ? createScrollbarX(scrollAreaState, scrollbarActionByType) : createScrollbarY(scrollAreaState, scrollbarActionByType);
    const thumb = createScrollbarThumb(scrollAreaState);
    return {
      scrollbar,
      thumb
    };
  }
  const { scrollbar: scrollbarX, thumb: thumbX } = createScrollbar("horizontal");
  const { scrollbar: scrollbarY, thumb: thumbY } = createScrollbar("vertical");
  const corner = createScrollAreaCorner(rootState);
  return {
    options,
    elements: {
      root,
      viewport,
      content,
      corner,
      scrollbarX,
      scrollbarY,
      thumbX,
      thumbY
    }
  };
}
function createScrollbarThumb(state) {
  const { scrollbarState, rootState } = state;
  function handlePointerDown(e) {
    const thumb2 = e.target;
    if (!isHTMLElement(thumb2))
      return;
    const thumbRect = thumb2.getBoundingClientRect();
    const x = e.clientX - thumbRect.left;
    const y = e.clientY - thumbRect.top;
    scrollbarState.handleThumbDown({ x, y });
  }
  function handlePointerUp(e) {
    scrollbarState.handleThumbUp(e);
  }
  let unsubListener = void 0;
  function handleScroll() {
    if (unsubListener)
      return;
    const $viewportEl = rootState.viewportEl.get();
    if ($viewportEl) {
      unsubListener = addUnlinkedScrollListener($viewportEl, scrollbarState.onThumbPositionChange);
    }
    scrollbarState.onThumbPositionChange();
  }
  const thumb = makeElement(name("thumb"), {
    stores: [scrollbarState.hasThumb, scrollbarState.isHorizontal, scrollbarState.thumbOffset],
    returned: ([$hasThumb, $isHorizontal, $offset]) => {
      return {
        style: styleToString$1({
          width: "var(--melt-scroll-area-thumb-width)",
          height: "var(--melt-scroll-area-thumb-height)",
          transform: $isHorizontal ? `translate3d(${Math.round($offset)}px, 0, 0)` : `translate3d(0, ${Math.round($offset)}px, 0)`
        }),
        "data-state": $hasThumb ? "visible" : "hidden"
      };
    },
    action: (node) => {
      scrollbarState.thumbEl.set(node);
      const unsubEffect = effect([scrollbarState.sizes], ([_]) => {
        const $viewportEl = rootState.viewportEl.get();
        if (!$viewportEl)
          return noop;
        scrollbarState.onThumbPositionChange();
        return addEventListener$1($viewportEl, "scroll", handleScroll);
      });
      const unsubEvents = executeCallbacks(addMeltEventListener(node, "pointerdown", handlePointerDown), addMeltEventListener(node, "pointerup", handlePointerUp));
      return {
        destroy() {
          unsubListener?.();
          unsubEvents();
          unsubEffect();
        }
      };
    }
  });
  return thumb;
}
function createScrollAreaCorner(rootState) {
  const width = writable(0);
  const height = writable(0);
  const hasSize = derived([width, height], ([$width, $height]) => !!$width && !!$height);
  function setCornerHeight() {
    const offsetHeight = rootState.scrollbarXEl.get()?.offsetHeight || 0;
    rootState.cornerHeight.set(offsetHeight);
    height.set(offsetHeight);
  }
  function setCornerWidth() {
    const offsetWidth = rootState.scrollbarYEl.get()?.offsetWidth || 0;
    rootState.cornerWidth.set(offsetWidth);
    width.set(offsetWidth);
  }
  effect([rootState.scrollbarXEl], ([$scrollbarXEl]) => {
    if ($scrollbarXEl) {
      setCornerHeight();
    }
  });
  effect([rootState.scrollbarYEl], ([$scrollbarYEl]) => {
    if ($scrollbarYEl) {
      setCornerWidth();
    }
  });
  const hasBothScrollbarsVisible = derived([rootState.scrollbarXEl, rootState.scrollbarYEl], ([$scrollbarXEl, $scrollbarYEl]) => {
    return !!$scrollbarXEl && !!$scrollbarYEl;
  });
  const hasCorner = derived([rootState.options.type, hasBothScrollbarsVisible], ([$type, $hasBoth]) => {
    return $type !== "scroll" && $hasBoth;
  });
  const shouldDisplay = derived([hasCorner, hasSize], ([$hasCorner, $hasSize]) => $hasCorner && $hasSize);
  const corner = makeElement(name("corner"), {
    stores: [width, height, rootState.options.dir, shouldDisplay],
    returned: ([$width, $height, $dir, $shouldDisplay]) => {
      return {
        style: styleToString$1({
          display: $shouldDisplay ? "block" : "none",
          width: `${$width}px`,
          height: `${$height}px`,
          position: "absolute",
          right: $dir === "ltr" ? 0 : void 0,
          left: $dir === "rtl" ? 0 : void 0,
          bottom: 0
        })
      };
    }
  });
  return corner;
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return `${str}${key}:${style[key]};`;
  }, "");
}
function getAccordionData() {
  const NAME = "accordion";
  const ITEM_NAME = "accordion-item";
  const PARTS = ["root", "content", "header", "item", "trigger"];
  return { NAME, ITEM_NAME, PARTS };
}
function setCtx$1(props) {
  const initAccordion = createAccordion(removeUndefined(props));
  const { NAME, PARTS } = getAccordionData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const accordion = {
    ...initAccordion,
    getAttrs,
    updateOption: getOptionUpdater(initAccordion.options)
  };
  setContext(NAME, accordion);
  return accordion;
}
function getCtx$1() {
  const { NAME } = getAccordionData();
  return getContext(NAME);
}
function setItem(props) {
  const { ITEM_NAME } = getAccordionData();
  setContext(ITEM_NAME, { ...props });
  const ctx = getCtx$1();
  return { ...ctx, props };
}
function getItemProps() {
  const { ITEM_NAME } = getAccordionData();
  return getContext(ITEM_NAME);
}
function getContent() {
  const ctx = getCtx$1();
  const { value: props } = getItemProps();
  return {
    ...ctx,
    props
  };
}
function getTrigger() {
  const ctx = getCtx$1();
  const { value, disabled } = getItemProps();
  return {
    ...ctx,
    props: { value, disabled }
  };
}
function Accordion($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "multiple",
    "value",
    "onValueChange",
    "disabled",
    "asChild",
    "el",
    "$$props"
  ]);
  push();
  var $$store_subs;
  let builder;
  let multiple = value_or_fallback($$props["multiple"], () => false);
  let value = value_or_fallback($$props["value"], () => void 0);
  let onValueChange = value_or_fallback($$props["onValueChange"], () => void 0);
  let disabled = value_or_fallback($$props["disabled"], () => false);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { root },
    states: { value: localValue },
    updateOption,
    getAttrs
  } = setCtx$1({
    multiple,
    disabled,
    defaultValue: value,
    onValueChange: ({ next }) => {
      if (Array.isArray(next)) {
        if (!Array.isArray(value) || !arraysAreEqual(value, next)) {
          onValueChange?.(next);
          value = next;
          return next;
        }
        return next;
      }
      if (value !== next) {
        onValueChange?.(next);
        value = next;
      }
      return next;
    }
  });
  const attrs = getAttrs("root");
  value !== void 0 && localValue.set(Array.isArray(value) ? [...value] : value);
  updateOption("multiple", multiple);
  updateOption("disabled", disabled);
  builder = store_get($$store_subs ??= {}, "$root", root);
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
  bind_props($$props, {
    multiple,
    value,
    onValueChange,
    disabled,
    asChild,
    el
  });
  pop();
}
function Accordion_item$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "value",
    "disabled",
    "asChild",
    "el",
    "$$props"
  ]);
  push();
  var $$store_subs;
  let builder;
  let value = $$props["value"];
  let disabled = value_or_fallback($$props["disabled"], () => void 0);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { item }, props, getAttrs } = setItem({ value, disabled });
  const attrs = getAttrs("item");
  builder = store_get($$store_subs ??= {}, "$item", item)(props);
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
  bind_props($$props, { value, disabled, asChild, el });
  pop();
}
function Accordion_header($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["level", "asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let builder;
  let level = value_or_fallback($$props["level"], () => 3);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { heading: header }, getAttrs } = getCtx$1();
  const attrs = getAttrs("header");
  builder = store_get($$store_subs ??= {}, "$header", header)(level);
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
  bind_props($$props, { level, asChild, el });
  pop();
}
function Accordion_trigger$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { trigger }, props, getAttrs } = getTrigger();
  const attrs = getAttrs("trigger");
  builder = store_get($$store_subs ??= {}, "$trigger", trigger)(props);
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
function Accordion_content$1($$payload, $$props) {
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
    elements: { content },
    helpers: { isSelected },
    props,
    getAttrs
  } = getContent();
  const attrs = getAttrs("content");
  builder = store_get($$store_subs ??= {}, "$content", content)(props);
  Object.assign(builder, attrs);
  $$payload.out += `<!--[-->`;
  if (asChild && store_get($$store_subs ??= {}, "$isSelected", isSelected)(props)) {
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
    if (transition && store_get($$store_subs ??= {}, "$isSelected", isSelected)(props)) {
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
      if (inTransition && outTransition && store_get($$store_subs ??= {}, "$isSelected", isSelected)(props)) {
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
        if (inTransition && store_get($$store_subs ??= {}, "$isSelected", isSelected)(props)) {
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
          if (outTransition && store_get($$store_subs ??= {}, "$isSelected", isSelected)(props)) {
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
            if (store_get($$store_subs ??= {}, "$isSelected", isSelected)(props)) {
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
    el
  });
  pop();
}
function getScrollAreaData() {
  const NAME = "scroll-area";
  const SCROLLBAR_NAME = "scrollbar";
  const PARTS = [
    "scrollbar-x",
    "scrollbar-y",
    "thumb-x",
    "thumb-y",
    "viewport",
    "content",
    "root",
    "corner"
  ];
  return { NAME, PARTS, SCROLLBAR_NAME };
}
function setCtx(props) {
  const { NAME, PARTS } = getScrollAreaData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const scrollArea = { ...createScrollArea(removeUndefined(props)), getAttrs };
  setContext(NAME, scrollArea);
  return {
    ...scrollArea,
    updateOption: getOptionUpdater(scrollArea.options)
  };
}
function getCtx() {
  const { NAME } = getScrollAreaData();
  return getContext(NAME);
}
function setScrollbarOrientation(orientation) {
  const { SCROLLBAR_NAME } = getScrollAreaData();
  return setContext(SCROLLBAR_NAME, orientation);
}
function getScrollbarOrientation() {
  const { SCROLLBAR_NAME } = getScrollAreaData();
  return getContext(SCROLLBAR_NAME);
}
function Scroll_area$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "type",
    "dir",
    "hideDelay",
    "asChild",
    "el",
    "$$props"
  ]);
  push();
  var $$store_subs;
  let builder, attrs;
  let type = value_or_fallback($$props["type"], () => "hover");
  let dir = value_or_fallback($$props["dir"], () => "ltr");
  let hideDelay = value_or_fallback($$props["hideDelay"], () => 600);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { root }, updateOption, getAttrs } = setCtx({ type, dir, hideDelay });
  const bitsAttrs = getAttrs("root");
  const style = styleToString({ overflow: "hidden" });
  builder = store_get($$store_subs ??= {}, "$root", root);
  updateOption("type", type);
  updateOption("dir", dir);
  updateOption("hideDelay", hideDelay);
  attrs = { ...$$restProps, ...bitsAttrs, style };
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
    $$payload.out += `<div${spread_attributes([builder, attrs], true, false, "")}><!--[-->`;
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
  bind_props($$props, { type, dir, hideDelay, asChild, el });
  pop();
}
function Scroll_area_viewport($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let attrs, builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { viewport }, getAttrs } = getCtx();
  const bitsAttrs = getAttrs("viewport");
  attrs = { ...$$restProps, ...bitsAttrs };
  builder = store_get($$store_subs ??= {}, "$viewport", viewport);
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
    $$payload.out += `<div${spread_attributes([builder], true, false, "")}><!--[-->`;
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
function Scroll_area_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let attrs, builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { content }, getAttrs } = getCtx();
  const bitsAttrs = getAttrs("content");
  attrs = { ...$$restProps, ...bitsAttrs };
  builder = store_get($$store_subs ??= {}, "$content", content);
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
    $$payload.out += `<div${spread_attributes([builder], true, false, "")}><!--[-->`;
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
function Scroll_area_scrollbar_y($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let attrs, builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { scrollbarY }, getAttrs } = getCtx();
  const bitsAttrs = getAttrs("scrollbar-y");
  attrs = { ...$$restProps, ...bitsAttrs };
  builder = store_get($$store_subs ??= {}, "$scrollbarY", scrollbarY);
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
    $$payload.out += `<div${spread_attributes([builder], true, false, "")}><!--[-->`;
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
function Scroll_area_scrollbar_x($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let attrs, builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { scrollbarX }, getAttrs } = getCtx();
  const bitsAttrs = getAttrs("scrollbar-x");
  attrs = { ...$$restProps, ...bitsAttrs };
  builder = store_get($$store_subs ??= {}, "$scrollbarX", scrollbarX);
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
    $$payload.out += `<div${spread_attributes([builder], true, false, "")}><!--[-->`;
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
function Scroll_area_scrollbar$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["orientation", "$$props"]);
  push();
  var $$store_subs;
  let orientation = $$props["orientation"];
  const orientationStore = writable(orientation);
  setScrollbarOrientation(orientationStore);
  orientationStore.set(orientation);
  $$payload.out += `<!--[-->`;
  if (store_get($$store_subs ??= {}, "$orientationStore", orientationStore) === "vertical") {
    $$payload.out += `<!--[-->`;
    Scroll_area_scrollbar_y($$payload, spread_props([
      $$restProps,
      {
        children: ($$payload2, $$slotProps) => {
          const builder = $$slotProps.builder;
          $$payload2.out += `<!--[-->`;
          slot(
            $$payload2,
            $$props.children,
            {
              get builder() {
                return builder;
              }
            },
            null
          );
          $$payload2.out += `<!--]-->`;
        }
      }
    ]));
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<!--[-->`;
    Scroll_area_scrollbar_x($$payload, spread_props([
      $$restProps,
      {
        children: ($$payload2, $$slotProps) => {
          const builder = $$slotProps.builder;
          $$payload2.out += `<!--[-->`;
          slot(
            $$payload2,
            $$props.children,
            {
              get builder() {
                return builder;
              }
            },
            null
          );
          $$payload2.out += `<!--]-->`;
        }
      }
    ]));
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { orientation });
  pop();
}
function Scroll_area_thumb_y($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let attrs, builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { thumbY }, getAttrs } = getCtx();
  const bitsAttrs = getAttrs("thumb-y");
  attrs = { ...$$restProps, ...bitsAttrs };
  builder = store_get($$store_subs ??= {}, "$thumbY", thumbY);
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
    $$payload.out += `<div${spread_attributes([builder], true, false, "")}><!--[-->`;
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
function Scroll_area_thumb_x($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let attrs, builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { thumbX }, getAttrs } = getCtx();
  const bitsAttrs = getAttrs("thumb-x");
  attrs = { ...$$restProps, ...bitsAttrs };
  builder = store_get($$store_subs ??= {}, "$thumbX", thumbX);
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
    $$payload.out += `<div${spread_attributes([builder], true, false, "")}><!--[-->`;
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
function Scroll_area_thumb($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["$$props"]);
  push();
  var $$store_subs;
  const orientation = getScrollbarOrientation();
  $$payload.out += `<!--[-->`;
  if (store_get($$store_subs ??= {}, "$orientation", orientation) === "vertical") {
    $$payload.out += `<!--[-->`;
    Scroll_area_thumb_y($$payload, spread_props([
      $$restProps,
      {
        children: ($$payload2, $$slotProps) => {
          const builder = $$slotProps.builder;
          $$payload2.out += `<!--[-->`;
          slot(
            $$payload2,
            $$props.children,
            {
              get builder() {
                return builder;
              }
            },
            null
          );
          $$payload2.out += `<!--]-->`;
        }
      }
    ]));
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<!--[-->`;
    Scroll_area_thumb_x($$payload, spread_props([
      $$restProps,
      {
        children: ($$payload2, $$slotProps) => {
          const builder = $$slotProps.builder;
          $$payload2.out += `<!--[-->`;
          slot(
            $$payload2,
            $$props.children,
            {
              get builder() {
                return builder;
              }
            },
            null
          );
          $$payload2.out += `<!--]-->`;
        }
      }
    ]));
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function Scroll_area_corner($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let attrs, builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { corner }, getAttrs } = getCtx();
  const bitsAttrs = getAttrs("corner");
  attrs = { ...$$restProps, ...bitsAttrs };
  builder = store_get($$store_subs ??= {}, "$corner", corner);
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
    $$payload.out += `<div${spread_attributes([builder], true, false, "")}><!--[-->`;
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
function Scroll_area_scrollbar($$payload, $$props) {
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let orientation = value_or_fallback($$props["orientation"], () => "vertical");
  $$payload.out += `<!--[-->`;
  Scroll_area_scrollbar$1($$payload, {
    orientation,
    class: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px", orientation === "horizontal" && "h-2.5 w-full border-t border-t-transparent p-px", className),
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<!--[-->`;
      slot($$payload2, $$props.children, {}, null);
      $$payload2.out += `<!--]--> <!--[-->`;
      Scroll_area_thumb($$payload2, {
        class: cn("relative rounded-full bg-border", orientation === "vertical" && "flex-1")
      });
      $$payload2.out += `<!--]-->`;
    }
  });
  $$payload.out += `<!--]-->`;
  bind_props($$props, { class: className, orientation });
  pop();
}
function Scroll_area($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "orientation",
    "scrollbarXClasses",
    "scrollbarYClasses",
    "$$props"
  ]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let orientation = value_or_fallback($$props["orientation"], () => "vertical");
  let scrollbarXClasses = value_or_fallback($$props["scrollbarXClasses"], () => "");
  let scrollbarYClasses = value_or_fallback($$props["scrollbarYClasses"], () => "");
  $$payload.out += `<!--[-->`;
  Scroll_area$1($$payload, spread_props([
    $$restProps,
    {
      class: cn("relative overflow-hidden", className),
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        Scroll_area_viewport($$payload2, {
          class: "h-full w-full rounded-[inherit]",
          children: ($$payload3, $$slotProps2) => {
            $$payload3.out += `<!--[-->`;
            Scroll_area_content($$payload3, {
              class: "h-full",
              children: ($$payload4, $$slotProps3) => {
                $$payload4.out += `<!--[-->`;
                slot($$payload4, $$props.children, {}, null);
                $$payload4.out += `<!--]-->`;
              }
            });
            $$payload3.out += `<!--]-->`;
          }
        });
        $$payload2.out += `<!--]--> <!--[-->`;
        if (orientation === "vertical" || orientation === "both") {
          $$payload2.out += `<!--[-->`;
          Scroll_area_scrollbar($$payload2, {
            orientation: "vertical",
            class: scrollbarYClasses
          });
          $$payload2.out += `<!--]-->`;
          $$payload2.out += "<!--]-->";
        } else {
          $$payload2.out += "<!--]!-->";
        }
        $$payload2.out += ` <!--[-->`;
        if (orientation === "horizontal" || orientation === "both") {
          $$payload2.out += `<!--[-->`;
          Scroll_area_scrollbar($$payload2, {
            orientation: "horizontal",
            class: scrollbarXClasses
          });
          $$payload2.out += `<!--]-->`;
          $$payload2.out += "<!--]-->";
        } else {
          $$payload2.out += "<!--]!-->";
        }
        $$payload2.out += ` <!--[-->`;
        Scroll_area_corner($$payload2, {});
        $$payload2.out += `<!--]-->`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    class: className,
    orientation,
    scrollbarXClasses,
    scrollbarYClasses
  });
  pop();
}
function Layout_sidebar_left_collapse($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      {
        "d": "M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
      }
    ],
    ["path", { "d": "M9 4v16" }],
    ["path", { "d": "M15 10l-2 2l2 2" }]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    {
      type: "outline",
      name: "layout-sidebar-left-collapse"
    },
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
function Sidebar_header($$payload, $$props) {
  push();
  let toggleCollapse = $$props["toggleCollapse"];
  let toggle = $$props["toggle"];
  $$payload.out += `<div class="flex items-center justify-between gap-4 px-2"><div class="flex items-center gap-2"><div class="flex size-6 items-center justify-center rounded-md bg-gray-700 text-sm text-white dark:bg-muted-foreground/20">is</div> <button class="flex items-center gap-1 text-sm font-semibold">iracing schedule</button></div> <button class="opacity-60 transition hover:opacity-100 md:hidden"><!--[-->`;
  Layout_sidebar_left_collapse($$payload, { class: "size-4" });
  $$payload.out += `<!--]--></button> <button class="hidden opacity-60 transition hover:opacity-100 md:block"><!--[-->`;
  Layout_sidebar_left_collapse($$payload, { class: "size-4" });
  $$payload.out += `<!--]--></button></div>`;
  bind_props($$props, { toggleCollapse, toggle });
  pop();
}
function Sidebar_button($$payload, $$props) {
  push();
  var $$store_subs;
  let currentRoute;
  let href = $$props["href"];
  let Icon2 = value_or_fallback($$props["Icon"], () => null);
  currentRoute = store_get($$store_subs ??= {}, "$page", page).url.pathname;
  $$payload.out += `<a${attr("class", cn("flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium", currentRoute === href && "bg-muted-foreground/10"), false)}${attr("href", href, false)}><!--[-->`;
  if (Icon2) {
    $$payload.out += `<!--[-->`;
    Icon2($$payload, { class: "size-4 opacity-70" });
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <span>Schedule</span></a>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { href, Icon: Icon2 });
  pop();
}
function Sidebar_quick_actions($$payload, $$props) {
  push();
  var $$store_subs;
  store_get($$store_subs ??= {}, "$page", page).url.pathname;
  $$payload.out += `<div class="flex flex-col gap-2"><!--[-->`;
  Sidebar_button($$payload, { Icon: Calendar_event, href: "/" });
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function Accordion_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "transition",
    "transitionConfig",
    "$$props"
  ]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let transition = value_or_fallback($$props["transition"], () => slide);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], () => ({ duration: 200 }));
  $$payload.out += `<!--[-->`;
  Accordion_content$1($$payload, spread_props([
    {
      class: cn("overflow-hidden text-sm", className),
      transition,
      transitionConfig
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<div class="pb-4 pt-0"><!--[-->`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `<!--]--></div>`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    class: className,
    transition,
    transitionConfig
  });
  pop();
}
function Accordion_item($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "value", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let value = $$props["value"];
  $$payload.out += `<!--[-->`;
  Accordion_item$1($$payload, spread_props([
    { value, class: cn("border-b", className) },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `<!--]-->`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, { class: className, value });
  pop();
}
function ChevronDown($$payload, $$props) {
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
  let ariaLabel = value_or_fallback($$props["ariaLabel"], () => "chevron down,");
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor"></path></svg>`;
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { size, role, color, ariaLabel, withEvents });
  pop();
}
function Accordion_trigger($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "level", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let level = value_or_fallback($$props["level"], () => 3);
  $$payload.out += `<!--[-->`;
  Accordion_header($$payload, {
    level,
    class: "flex",
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<!--[-->`;
      Accordion_trigger$1($$payload2, spread_props([
        {
          class: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", className)
        },
        $$restProps,
        {
          children: ($$payload3, $$slotProps2) => {
            $$payload3.out += `<!--[-->`;
            slot($$payload3, $$props.children, {}, null);
            $$payload3.out += `<!--]--> <!--[-->`;
            ChevronDown($$payload3, {
              class: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
            });
            $$payload3.out += `<!--]-->`;
          }
        }
      ]));
      $$payload2.out += `<!--]-->`;
    }
  });
  $$payload.out += `<!--]-->`;
  bind_props($$props, { class: className, level });
  pop();
}
const Root$1 = Accordion;
function Sidebar_accordion($$payload, $$props) {
  push();
  let label = $$props["label"];
  let value = $$props["value"];
  $$payload.out += `<!--[-->`;
  Accordion_item($$payload, {
    value,
    class: "flex flex-col gap-2 border-b-0",
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<!--[-->`;
      Accordion_trigger($$payload2, {
        asChild: true,
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<button class="group flex items-center gap-2 px-2 text-sm opacity-60"><span class="text-xs font-semibold">${escape(label)}</span></button>`;
        }
      });
      $$payload2.out += `<!--]--> <!--[-->`;
      Accordion_content($$payload2, {
        class: "data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp flex flex-col gap-2 overflow-hidden",
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<!--[-->`;
          slot($$payload3, $$props.children, {}, null);
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!--]-->`;
    }
  });
  $$payload.out += `<!--]-->`;
  bind_props($$props, { label, value });
  pop();
}
function Sidebar_assets($$payload, $$props) {
  push();
  var $$store_subs;
  let currentRoute;
  currentRoute = store_get($$store_subs ??= {}, "$page", page).url.pathname;
  $$payload.out += `<!--[-->`;
  Sidebar_accordion($$payload, {
    label: "Assets",
    value: "assets",
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<a${attr("class", `${stringify(cn("flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium", currentRoute === "/cars" && "active"))} svelte-ydum7i`, false)} href="/cars"><!--[-->`;
      Car($$payload2, { class: "size-4 opacity-70" });
      $$payload2.out += `<!--]--> <span>Cars</span></a> <a${attr("class", `${stringify(cn("flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium", currentRoute === "/series" && "active"))} svelte-ydum7i`, false)} href="/series"><!--[-->`;
      Users_group($$payload2, { class: "size-4 opacity-70" });
      $$payload2.out += `<!--]--> <span>Series</span></a> <a${attr("class", `${stringify(cn("flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium", currentRoute === "/tracks" && "active"))} svelte-ydum7i`, false)} href="/tracks"><!--[-->`;
      Road($$payload2, { class: "size-4 opacity-70" });
      $$payload2.out += `<!--]--> <span>Tracks</span></a>`;
    }
  });
  $$payload.out += `<!--]-->`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function Sheet_portal($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Dialog_portal($$payload, spread_props([
    { class: cn(className) },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `<!--]-->`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, { class: className });
  pop();
}
function Sheet_overlay($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "transition",
    "transitionConfig",
    "$$props"
  ]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let transition = value_or_fallback($$props["transition"], () => fade);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], () => ({ duration: 150 }));
  $$payload.out += `<!--[-->`;
  Dialog_overlay($$payload, spread_props([
    {
      transition,
      transitionConfig,
      class: cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm", className)
    },
    $$restProps
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    class: className,
    transition,
    transitionConfig
  });
  pop();
}
function Sheet_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "side",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "$$props"
  ]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let side = value_or_fallback($$props["side"], () => "right");
  let inTransition = value_or_fallback($$props["inTransition"], () => fly);
  let inTransitionConfig = value_or_fallback($$props["inTransitionConfig"], () => sheetTransitions[side ? side : "right"]["in"]);
  let outTransition = value_or_fallback($$props["outTransition"], () => fly);
  let outTransitionConfig = value_or_fallback($$props["outTransitionConfig"], () => sheetTransitions[side ? side : "right"]["out"]);
  $$payload.out += `<!--[-->`;
  Sheet_portal($$payload, {
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<!--[-->`;
      Sheet_overlay($$payload2, {});
      $$payload2.out += `<!--]--> <!--[-->`;
      Dialog_content($$payload2, spread_props([
        {
          inTransition,
          inTransitionConfig,
          outTransition,
          outTransitionConfig,
          class: cn(sheetVariants({ side }), className)
        },
        $$restProps,
        {
          children: ($$payload3, $$slotProps2) => {
            $$payload3.out += `<!--[-->`;
            slot($$payload3, $$props.children, {}, null);
            $$payload3.out += `<!--]--> <!--[-->`;
            Dialog_close($$payload3, {
              class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
              children: ($$payload4, $$slotProps3) => {
                $$payload4.out += `<!--[-->`;
                Cross2($$payload4, { class: "h-4 w-4" });
                $$payload4.out += `<!--]--> <span class="sr-only">Close</span>`;
              }
            });
            $$payload3.out += `<!--]-->`;
          }
        }
      ]));
      $$payload2.out += `<!--]-->`;
    }
  });
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    class: className,
    side,
    inTransition,
    inTransitionConfig,
    outTransition,
    outTransitionConfig
  });
  pop();
}
const Root = Dialog;
const sheetVariants = tv({
  base: "fixed z-50 gap-4 bg-background p-6 shadow-lg",
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b ",
      bottom: "inset-x-0 bottom-0 border-t",
      left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
      right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm"
    }
  },
  defaultVariants: {
    side: "right"
  }
});
const sheetTransitions = {
  top: {
    in: {
      y: "-100%",
      duration: 500,
      opacity: 1
    },
    out: {
      y: "-100%",
      duration: 300,
      opacity: 1
    }
  },
  bottom: {
    in: {
      y: "100%",
      duration: 500,
      opacity: 1
    },
    out: {
      y: "100%",
      duration: 300,
      opacity: 1
    }
  },
  left: {
    in: {
      x: "-100%",
      duration: 500,
      opacity: 1
    },
    out: {
      x: "-100%",
      duration: 300,
      opacity: 1
    }
  },
  right: {
    in: {
      x: "100%",
      duration: 500,
      opacity: 1
    },
    out: {
      x: "100%",
      duration: 300,
      opacity: 1
    }
  }
};
function Sidebar_sheet($$payload, $$props) {
  push();
  let open = value_or_fallback($$props["open"], () => false);
  let onOpenChange = $$props["onOpenChange"];
  $$payload.out += `<div class="hidden lg:flex"><!--[-->`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `<!--]--></div> <div class="lg:hidden"><!--[-->`;
  Root($$payload, {
    open,
    onOpenChange,
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<!--[-->`;
      Sheet_portal($$payload2, {
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<!--[-->`;
          Sheet_overlay($$payload3, {});
          $$payload3.out += `<!--]--> <!--[-->`;
          Sheet_content($$payload3, {
            class: "p-0",
            side: "left",
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<!--[-->`;
              slot($$payload4, $$props.children, {}, null);
              $$payload4.out += `<!--]-->`;
            }
          });
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!--]-->`;
    }
  });
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { open, onOpenChange });
  pop();
}
function Sidebar_categories($$payload, $$props) {
  push();
  var $$store_subs;
  let currentRoute;
  currentRoute = store_get($$store_subs ??= {}, "$page", page).url.pathname;
  $$payload.out += `<!--[-->`;
  Sidebar_accordion($$payload, {
    label: "Categories",
    value: "categories",
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<a${attr("class", `${stringify(cn("flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium", currentRoute === "/category/oval" && "active"))} svelte-3p15nq`, false)} href="/category/oval"><!--[-->`;
      Oval_icon?.($$payload2);
      $$payload2.out += `<!--]--> <span>Oval</span></a> <a${attr("class", `${stringify(cn("flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium", currentRoute === "/category/sports-car" && "active"))} svelte-3p15nq`, false)} href="/category/sports-car"><!--[-->`;
      Sports_car_icon?.($$payload2);
      $$payload2.out += `<!--]--> <span>Sports Car</span></a> <a${attr("class", `${stringify(cn("flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium", currentRoute === "/category/formula-car" && "active"))} svelte-3p15nq`, false)} href="/category/formula-car"><!--[-->`;
      Formula_car_icon?.($$payload2);
      $$payload2.out += `<!--]--> <span>Formula Car</span></a> <a${attr("class", `${stringify(cn("flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium", currentRoute === "/category/dirt-oval" && "active"))} svelte-3p15nq`, false)} href="/category/dirt-oval"><!--[-->`;
      Dirt_oval_icon?.($$payload2);
      $$payload2.out += `<!--]--> <span>Dirt Oval</span></a> <a${attr("class", `${stringify(cn("flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium", currentRoute === "/category/dirt-road" && "active"))} svelte-3p15nq`, false)} href="/category/dirt-road"><!--[-->`;
      Dirt_road_icon?.($$payload2);
      $$payload2.out += `<!--]--> <span>Dirt Road</span></a>`;
    }
  });
  $$payload.out += `<!--]-->`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function Sun($$payload, $$props) {
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
  let ariaLabel = value_or_fallback($$props["ariaLabel"], () => "sun,");
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614 8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z" fill="currentColor"></path></svg>`;
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614 8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { size, role, color, ariaLabel, withEvents });
  pop();
}
function Moon($$payload, $$props) {
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
  let ariaLabel = value_or_fallback($$props["ariaLabel"], () => "moon,");
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M2.89998 0.499976C2.89998 0.279062 2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.0999756 7.27906 0.0999756 7.49998C0.0999756 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.37201 6.82247 11.0878 3.69887 11.6097C3.45736 11.65 3.20988 11.6772 2.96008 11.6906C2.74563 11.702 2.62729 11.9535 2.77721 12.1072C2.84551 12.1773 2.91535 12.2458 2.98667 12.3128L3.05883 12.3795L3.31883 12.6045L3.50684 12.7532L3.62796 12.8433L3.81491 12.9742L3.99079 13.089C4.11175 13.1651 4.23536 13.2375 4.36157 13.3059L4.62496 13.4412L4.88553 13.5607L5.18837 13.6828L5.43169 13.7686C5.56564 13.8128 5.70149 13.8529 5.83857 13.8885C5.94262 13.9155 6.04767 13.9401 6.15405 13.9622C6.27993 13.9883 6.40713 14.0109 6.53544 14.0298L6.85241 14.0685L7.11934 14.0892C7.24637 14.0965 7.37436 14.1002 7.50322 14.1002C11.1483 14.1002 14.1032 11.1453 14.1032 7.50023C14.1032 7.25044 14.0893 7.00389 14.0623 6.76131L14.0255 6.48407C13.991 6.26083 13.9453 6.04129 13.8891 5.82642C13.8213 5.56709 13.7382 5.31398 13.6409 5.06881L13.5279 4.80132L13.4507 4.63542L13.3766 4.48666C13.2178 4.17773 13.0353 3.88295 12.8312 3.60423L12.6782 3.40352L12.4793 3.16432L12.3157 2.98361L12.1961 2.85951L12.0355 2.70246L11.8134 2.50184L11.4925 2.24191L11.2483 2.06498L10.9562 1.87446L10.6346 1.68894L10.3073 1.52378L10.1938 1.47176L9.95488 1.3706L9.67791 1.2669L9.42566 1.1846L9.10075 1.09489L8.83599 1.03486L8.54406 0.98184ZM10.4032 5.30023C10.4032 4.27588 10.2002 3.29829 9.83244 2.40604C11.7623 3.28995 13.1032 5.23862 13.1032 7.50023C13.1032 10.593 10.596 13.1002 7.50322 13.1002C6.63646 13.1002 5.81597 12.9036 5.08355 12.5522C6.5419 12.0941 7.81081 11.2082 8.74322 10.0416C8.87963 10.2284 9.10028 10.3497 9.34928 10.3497C9.76349 10.3497 10.0993 10.0139 10.0993 9.59971C10.0993 9.24256 9.84965 8.94373 9.51535 8.86816C9.57741 8.75165 9.63653 8.63334 9.6926 8.51332C9.88358 8.63163 10.1088 8.69993 10.35 8.69993C11.0403 8.69993 11.6 8.14028 11.6 7.44993C11.6 6.75976 11.0406 6.20024 10.3505 6.19993C10.3853 5.90487 10.4032 5.60464 10.4032 5.30023Z" fill="currentColor"></path></svg>`;
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M2.89998 0.499976C2.89998 0.279062 2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.0999756 7.27906 0.0999756 7.49998C0.0999756 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.37201 6.82247 11.0878 3.69887 11.6097C3.45736 11.65 3.20988 11.6772 2.96008 11.6906C2.74563 11.702 2.62729 11.9535 2.77721 12.1072C2.84551 12.1773 2.91535 12.2458 2.98667 12.3128L3.05883 12.3795L3.31883 12.6045L3.50684 12.7532L3.62796 12.8433L3.81491 12.9742L3.99079 13.089C4.11175 13.1651 4.23536 13.2375 4.36157 13.3059L4.62496 13.4412L4.88553 13.5607L5.18837 13.6828L5.43169 13.7686C5.56564 13.8128 5.70149 13.8529 5.83857 13.8885C5.94262 13.9155 6.04767 13.9401 6.15405 13.9622C6.27993 13.9883 6.40713 14.0109 6.53544 14.0298L6.85241 14.0685L7.11934 14.0892C7.24637 14.0965 7.37436 14.1002 7.50322 14.1002C11.1483 14.1002 14.1032 11.1453 14.1032 7.50023C14.1032 7.25044 14.0893 7.00389 14.0623 6.76131L14.0255 6.48407C13.991 6.26083 13.9453 6.04129 13.8891 5.82642C13.8213 5.56709 13.7382 5.31398 13.6409 5.06881L13.5279 4.80132L13.4507 4.63542L13.3766 4.48666C13.2178 4.17773 13.0353 3.88295 12.8312 3.60423L12.6782 3.40352L12.4793 3.16432L12.3157 2.98361L12.1961 2.85951L12.0355 2.70246L11.8134 2.50184L11.4925 2.24191L11.2483 2.06498L10.9562 1.87446L10.6346 1.68894L10.3073 1.52378L10.1938 1.47176L9.95488 1.3706L9.67791 1.2669L9.42566 1.1846L9.10075 1.09489L8.83599 1.03486L8.54406 0.98184ZM10.4032 5.30023C10.4032 4.27588 10.2002 3.29829 9.83244 2.40604C11.7623 3.28995 13.1032 5.23862 13.1032 7.50023C13.1032 10.593 10.596 13.1002 7.50322 13.1002C6.63646 13.1002 5.81597 12.9036 5.08355 12.5522C6.5419 12.0941 7.81081 11.2082 8.74322 10.0416C8.87963 10.2284 9.10028 10.3497 9.34928 10.3497C9.76349 10.3497 10.0993 10.0139 10.0993 9.59971C10.0993 9.24256 9.84965 8.94373 9.51535 8.86816C9.57741 8.75165 9.63653 8.63334 9.6926 8.51332C9.88358 8.63163 10.1088 8.69993 10.35 8.69993C11.0403 8.69993 11.6 8.14028 11.6 7.44993C11.6 6.75976 11.0406 6.20024 10.3505 6.19993C10.3853 5.90487 10.4032 5.60464 10.4032 5.30023Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { size, role, color, ariaLabel, withEvents });
  pop();
}
function Theme_switch($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<button class="flex w-full flex-row items-center justify-items-start gap-2 rounded-md px-2 py-1 text-sm font-medium transition-all hover:bg-muted-foreground/10"><!--[-->`;
  if (store_get($$store_subs ??= {}, "$mode", derivedMode) === "dark") {
    $$payload.out += `<!--[-->`;
    Moon($$payload, {
      class: "rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    });
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<!--[-->`;
    Sun($$payload, {
      class: "rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    });
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <span>Toggle theme</span></button>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function Sidebar_root($$payload, $$props) {
  push();
  $$payload.out += `<!--[-->`;
  Sidebar_sheet($$payload, {
    open: sidebar.isOpen,
    onOpenChange: (v) => sidebar.setIsOpen(v),
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<!--[-->`;
      Scroll_area($$payload2, {
        class: cn("flex h-full flex-col justify-between gap-2 overflow-hidden border-r-[1px] border-border bg-stone-50 dark:bg-background", sidebar.isCollapsed ? "w-0" : "w-full"),
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<div class="flex h-full flex-col justify-between gap-2"><div class="flex flex-col"><div class="sticky top-0 z-10 border-b-[1px] border-border bg-stone-50 p-2 dark:bg-background"><!--[-->`;
          Sidebar_header($$payload3, {
            toggleCollapse: sidebar.toggleCollapse,
            toggle: sidebar.toggle
          });
          $$payload3.out += `<!--]--></div> <div class="p-2"><!--[-->`;
          Sidebar_quick_actions($$payload3);
          $$payload3.out += `<!--]--></div> <!--[-->`;
          Root$1($$payload3, {
            multiple: true,
            value: ["categories", "assets", "lists"],
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<div class="p-2"><!--[-->`;
              Sidebar_categories($$payload4);
              $$payload4.out += `<!--]--></div> <div class="p-2"><!--[-->`;
              Sidebar_assets($$payload4);
              $$payload4.out += `<!--]--></div>`;
            }
          });
          $$payload3.out += `<!--]--></div> <div class="p-2"><!--[-->`;
          Theme_switch($$payload3);
          $$payload3.out += `<!--]--></div></div>`;
        }
      });
      $$payload2.out += `<!--]-->`;
    }
  });
  $$payload.out += `<!--]-->`;
  pop();
}
function Tailwind_indicator($$payload, $$props) {
  push();
  $$payload.out += `<!--[-->`;
  {
    $$payload.out += "<!--]!-->";
  }
  pop();
}
function _layout($$payload, $$props) {
  push();
  $$payload.out += `<div class="flex"><!--[-->`;
  Sidebar_root($$payload);
  $$payload.out += `<!--]--> <div class="flex-1"><!--[-->`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `<!--]--></div></div> <!--[-->`;
  Mode_watcher($$payload, {});
  $$payload.out += `<!--]--> <!--[-->`;
  Tailwind_indicator($$payload);
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _layout as default
};
