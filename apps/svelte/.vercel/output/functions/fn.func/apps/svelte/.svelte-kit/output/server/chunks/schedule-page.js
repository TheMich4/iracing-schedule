import { e as rest_props, p as push, v as value_or_fallback, o as element, i as slot, j as spread_attributes, c as bind_props, b as pop, k as sanitize_props, s as setContext, g as getContext, f as store_get, u as unsubscribe_stores, m as escape, l as spread_props, q as copy_payload, t as assign_payload, w as ensure_array_like, d as attr } from "./index2.js";
import { V as isBrowser, W as sleep, i as isHTMLElement, w as withGet, X as wrapArray, t as toWritableStores, o as omit, a as overridable, m as makeElement, d as disabledAttr, e as executeCallbacks, b as addMeltEventListener, k as kbd, s as styleToString, n as noop, Y as usePortal, Z as createFocusTrap, _ as useModal, $ as useEscapeKeydown, h as createElHelpers, g as generateIds, a0 as portalAttr, p as effect, c as tick, a1 as getPortalDestination, a2 as FIRST_LAST_KEYS, a3 as SELECTION_KEYS, a4 as isElementDisabled, a5 as safeOnMount, q as addEventListener, a6 as handleFocus, a7 as removeScroll, a8 as isElement, a9 as isFocusVisible, aa as isTouch, x as createBitAttrs, ab as createCalendar, v as removeUndefined, y as getOptionUpdater, z as arraysAreEqual, ac as disabledAttrs, ad as getCtx$6, I as Icon, T as sidebar, C as Calendar_event, A as cn, ae as flyAndScale, E as Dialog_portal$1, F as fade, G as Dialog_overlay$1, J as Dialog_content$1, K as Dialog_close, L as Cross2, M as Dialog, O as Oval_icon, S as Sports_car_icon, N as Formula_car_icon, P as Dirt_oval_icon, Q as Dirt_road_icon, U as Users_group, R as Road, D as Car } from "./sidebar.svelte.js";
import { today, getLocalTimeZone, DateFormatter } from "@internationalized/date";
import { tv } from "tailwind-variants";
import "dequal";
import "clsx";
import { d as derived, w as writable, g as get_store_value } from "./index.js";
import { flip, offset, shift, arrow, size, autoUpdate, computePosition } from "@floating-ui/dom";
import { C as Categories, c as categoryToName } from "./category.js";
function getTabbableNodes(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }
  return nodes;
}
function addHighlight(element2) {
  element2.setAttribute("data-highlighted", "");
}
function removeHighlight(element2) {
  element2.removeAttribute("data-highlighted");
}
function debounce(fn, wait = 500) {
  let timeout = null;
  return function(...args) {
    const later = () => {
      timeout = null;
      fn(...args);
    };
    timeout && clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function derivedVisible(obj) {
  const { open, forceVisible, activeTrigger } = obj;
  return derived([open, forceVisible, activeTrigger], ([$open, $forceVisible, $activeTrigger]) => ($open || $forceVisible) && $activeTrigger !== null);
}
function handleRovingFocus(nextElement) {
  if (!isBrowser)
    return;
  sleep(1).then(() => {
    const currentFocusedElement = document.activeElement;
    if (!isHTMLElement(currentFocusedElement) || currentFocusedElement === nextElement)
      return;
    currentFocusedElement.tabIndex = -1;
    if (nextElement) {
      nextElement.tabIndex = 0;
      nextElement.focus();
    }
  });
}
function getFocusableElements() {
  return Array.from(document.querySelectorAll('a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'));
}
function getNextFocusable(currentElement) {
  const focusableElements = getFocusableElements();
  const currentIndex = focusableElements.indexOf(currentElement);
  const nextIndex = currentIndex + 1;
  const nextElement = focusableElements[nextIndex];
  if (nextIndex < focusableElements.length && isHTMLElement(nextElement)) {
    return nextElement;
  }
  return null;
}
function getPreviousFocusable(currentElement) {
  const focusableElements = getFocusableElements();
  const currentIndex = focusableElements.indexOf(currentElement);
  const previousIndex = currentIndex - 1;
  const prevElement = focusableElements[previousIndex];
  if (previousIndex >= 0 && isHTMLElement(prevElement)) {
    return prevElement;
  }
  return null;
}
const ignoredKeys = /* @__PURE__ */ new Set(["Shift", "Control", "Alt", "Meta", "CapsLock", "NumLock"]);
const defaults$6 = {
  onMatch: handleRovingFocus,
  getCurrentItem: () => document.activeElement
};
function createTypeaheadSearch(args = {}) {
  const withDefaults = { ...defaults$6, ...args };
  const typed = withGet(writable([]));
  const resetTyped = debounce(() => {
    typed.update(() => []);
  });
  const handleTypeaheadSearch = (key, items) => {
    if (ignoredKeys.has(key))
      return;
    const currentItem = withDefaults.getCurrentItem();
    const $typed = get_store_value(typed);
    if (!Array.isArray($typed)) {
      return;
    }
    $typed.push(key.toLowerCase());
    typed.set($typed);
    const candidateItems = items.filter((item) => {
      if (item.getAttribute("disabled") === "true" || item.getAttribute("aria-disabled") === "true" || item.hasAttribute("data-disabled")) {
        return false;
      }
      return true;
    });
    const isRepeated = $typed.length > 1 && $typed.every((char) => char === $typed[0]);
    const normalizeSearch = isRepeated ? $typed[0] : $typed.join("");
    const currentItemIndex = isHTMLElement(currentItem) ? candidateItems.indexOf(currentItem) : -1;
    let wrappedItems = wrapArray(candidateItems, Math.max(currentItemIndex, 0));
    const excludeCurrentItem = normalizeSearch.length === 1;
    if (excludeCurrentItem) {
      wrappedItems = wrappedItems.filter((v) => v !== currentItem);
    }
    const nextItem = wrappedItems.find((item) => item?.innerText && item.innerText.toLowerCase().startsWith(normalizeSearch.toLowerCase()));
    if (isHTMLElement(nextItem) && nextItem !== currentItem) {
      withDefaults.onMatch(nextItem);
    }
    resetTyped();
  };
  return {
    typed,
    resetTyped,
    handleTypeaheadSearch
  };
}
const defaults$5 = {
  disabled: false,
  required: false,
  name: void 0,
  value: "on",
  defaultChecked: false
};
function createCheckbox(props) {
  const withDefaults = { ...defaults$5, ...props };
  const options = toWritableStores(omit(withDefaults, "checked", "defaultChecked"));
  const { disabled, name: name2, required, value } = options;
  const checkedWritable = withDefaults.checked ?? writable(withDefaults.defaultChecked);
  const checked = overridable(checkedWritable, withDefaults?.onCheckedChange);
  const root = makeElement("checkbox", {
    stores: [checked, disabled, required],
    returned: ([$checked, $disabled, $required]) => {
      return {
        "data-disabled": disabledAttr($disabled),
        disabled: disabledAttr($disabled),
        "data-state": $checked === "indeterminate" ? "indeterminate" : $checked ? "checked" : "unchecked",
        type: "button",
        role: "checkbox",
        "aria-checked": $checked === "indeterminate" ? "mixed" : $checked,
        "aria-required": $required
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
        if (e.key === kbd.ENTER)
          e.preventDefault();
      }), addMeltEventListener(node, "click", () => {
        if (disabled.get())
          return;
        checked.update((value2) => {
          if (value2 === "indeterminate")
            return true;
          return !value2;
        });
      }));
      return {
        destroy: unsub
      };
    }
  });
  const input = makeElement("checkbox-input", {
    stores: [checked, name2, value, required, disabled],
    returned: ([$checked, $name, $value, $required, $disabled]) => {
      return {
        type: "checkbox",
        "aria-hidden": true,
        hidden: true,
        tabindex: -1,
        name: $name,
        value: $value,
        checked: $checked === "indeterminate" ? false : $checked,
        required: $required,
        disabled: disabledAttr($disabled),
        style: styleToString({
          position: "absolute",
          opacity: 0,
          "pointer-events": "none",
          margin: 0,
          transform: "translateX(-100%)"
        })
      };
    }
  });
  const isIndeterminate = derived(checked, ($checked) => $checked === "indeterminate");
  const isChecked = derived(checked, ($checked) => $checked === true);
  return {
    elements: {
      root,
      input
    },
    states: {
      checked
    },
    helpers: {
      isIndeterminate,
      isChecked
    },
    options
  };
}
const defaultConfig$1 = {
  strategy: "absolute",
  placement: "top",
  gutter: 5,
  flip: true,
  sameWidth: false,
  overflowPadding: 8
};
const ARROW_TRANSFORM = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function useFloating(reference, floating, opts = {}) {
  if (!floating || !reference || opts === null)
    return {
      destroy: noop
    };
  const options = { ...defaultConfig$1, ...opts };
  const arrowEl = floating.querySelector("[data-arrow=true]");
  const middleware = [];
  if (options.flip) {
    middleware.push(flip({
      boundary: options.boundary,
      padding: options.overflowPadding
    }));
  }
  const arrowOffset = isHTMLElement(arrowEl) ? arrowEl.offsetHeight / 2 : 0;
  if (options.gutter || options.offset) {
    const data = options.gutter ? { mainAxis: options.gutter } : options.offset;
    if (data?.mainAxis != null) {
      data.mainAxis += arrowOffset;
    }
    middleware.push(offset(data));
  }
  middleware.push(shift({
    boundary: options.boundary,
    crossAxis: options.overlap,
    padding: options.overflowPadding
  }));
  if (arrowEl) {
    middleware.push(arrow({ element: arrowEl, padding: 8 }));
  }
  middleware.push(size({
    padding: options.overflowPadding,
    apply({ rects, availableHeight, availableWidth }) {
      if (options.sameWidth) {
        Object.assign(floating.style, {
          width: `${Math.round(rects.reference.width)}px`,
          minWidth: "unset"
        });
      }
      if (options.fitViewport) {
        Object.assign(floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`
        });
      }
    }
  }));
  function compute() {
    if (!reference || !floating)
      return;
    if (isHTMLElement(reference) && !reference.ownerDocument.documentElement.contains(reference))
      return;
    const { placement, strategy } = options;
    computePosition(reference, floating, {
      placement,
      middleware,
      strategy
    }).then((data) => {
      const x = Math.round(data.x);
      const y = Math.round(data.y);
      const [side, align] = getSideAndAlignFromPlacement(data.placement);
      floating.setAttribute("data-side", side);
      floating.setAttribute("data-align", align);
      Object.assign(floating.style, {
        position: options.strategy,
        top: `${y}px`,
        left: `${x}px`
      });
      if (isHTMLElement(arrowEl) && data.middlewareData.arrow) {
        const { x: x2, y: y2 } = data.middlewareData.arrow;
        const dir = data.placement.split("-")[0];
        arrowEl.setAttribute("data-side", dir);
        Object.assign(arrowEl.style, {
          position: "absolute",
          left: x2 != null ? `${x2}px` : "",
          top: y2 != null ? `${y2}px` : "",
          [dir]: `calc(100% - ${arrowOffset}px)`,
          transform: ARROW_TRANSFORM[dir],
          backgroundColor: "inherit",
          zIndex: "inherit"
        });
      }
      return data;
    });
  }
  Object.assign(floating.style, {
    position: options.strategy
  });
  return {
    destroy: autoUpdate(reference, floating, compute)
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
const defaultConfig = {
  floating: {},
  focusTrap: {},
  modal: {},
  escapeKeydown: {},
  portal: "body"
};
const usePopper = (popperElement, args) => {
  popperElement.dataset.escapee = "";
  const { anchorElement, open, options } = args;
  if (!anchorElement || !open || !options) {
    return { destroy: noop };
  }
  const opts = { ...defaultConfig, ...options };
  const callbacks = [];
  if (opts.portal !== null) {
    callbacks.push(usePortal(popperElement, opts.portal).destroy);
  }
  callbacks.push(useFloating(anchorElement, popperElement, opts.floating).destroy);
  if (opts.focusTrap !== null) {
    const { useFocusTrap } = createFocusTrap({
      immediate: true,
      escapeDeactivates: false,
      allowOutsideClick: true,
      returnFocusOnDeactivate: false,
      fallbackFocus: popperElement,
      ...opts.focusTrap
    });
    callbacks.push(useFocusTrap(popperElement).destroy);
  }
  if (opts.modal !== null) {
    callbacks.push(useModal(popperElement, {
      onClose: () => {
        if (isHTMLElement(anchorElement)) {
          open.set(false);
          anchorElement.focus();
        }
      },
      shouldCloseOnInteractOutside: (e) => {
        if (e.defaultPrevented)
          return false;
        if (isHTMLElement(anchorElement) && anchorElement.contains(e.target)) {
          return false;
        }
        return true;
      },
      ...opts.modal
    }).destroy);
  }
  if (opts.escapeKeydown !== null) {
    callbacks.push(useEscapeKeydown(popperElement, {
      enabled: open,
      handler: () => {
        open.set(false);
      },
      ...opts.escapeKeydown
    }).destroy);
  }
  const unsubscribe = executeCallbacks(...callbacks);
  return {
    destroy() {
      unsubscribe();
    }
  };
};
const SUB_OPEN_KEYS = {
  ltr: [...SELECTION_KEYS, kbd.ARROW_RIGHT],
  rtl: [...SELECTION_KEYS, kbd.ARROW_LEFT]
};
const SUB_CLOSE_KEYS = {
  ltr: [kbd.ARROW_LEFT],
  rtl: [kbd.ARROW_RIGHT]
};
const menuIdParts = ["menu", "trigger"];
const defaults$4 = {
  arrowSize: 8,
  positioning: {
    placement: "bottom"
  },
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  portal: void 0,
  loop: false,
  dir: "ltr",
  defaultOpen: false,
  typeahead: true,
  closeOnItemClick: true,
  onOutsideClick: void 0
};
function createMenuBuilder(opts) {
  const { name: name2, selector: selector2 } = createElHelpers(opts.selector);
  const { preventScroll, arrowSize, positioning, closeOnEscape, closeOnOutsideClick, portal, forceVisible, typeahead, loop, closeFocus, disableFocusFirstItem, closeOnItemClick, onOutsideClick } = opts.rootOptions;
  const rootOpen = opts.rootOpen;
  const rootActiveTrigger = opts.rootActiveTrigger;
  const nextFocusable = opts.nextFocusable;
  const prevFocusable = opts.prevFocusable;
  const isUsingKeyboard = withGet.writable(false);
  const lastPointerX = withGet(writable(0));
  const pointerGraceIntent = withGet(writable(null));
  const pointerDir = withGet(writable("right"));
  const currentFocusedItem = withGet(writable(null));
  const pointerMovingToSubmenu = withGet(derived([pointerDir, pointerGraceIntent], ([$pointerDir, $pointerGraceIntent]) => {
    return (e) => {
      const isMovingTowards = $pointerDir === $pointerGraceIntent?.side;
      return isMovingTowards && isPointerInGraceArea(e, $pointerGraceIntent?.area);
    };
  }));
  const { typed, handleTypeaheadSearch } = createTypeaheadSearch();
  const rootIds = toWritableStores({ ...generateIds(menuIdParts), ...opts.ids });
  const isVisible = derivedVisible({
    open: rootOpen,
    forceVisible,
    activeTrigger: rootActiveTrigger
  });
  const rootMenu = makeElement(name2(), {
    stores: [isVisible, portal, rootIds.menu, rootIds.trigger],
    returned: ([$isVisible, $portal, $rootMenuId, $rootTriggerId]) => {
      return {
        role: "menu",
        hidden: $isVisible ? void 0 : true,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        id: $rootMenuId,
        "aria-labelledby": $rootTriggerId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": portalAttr($portal),
        tabindex: -1
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect([isVisible, rootActiveTrigger, positioning, closeOnOutsideClick, portal, closeOnEscape], ([$isVisible, $rootActiveTrigger, $positioning, $closeOnOutsideClick, $portal, $closeOnEscape]) => {
        unsubPopper();
        if (!$isVisible || !$rootActiveTrigger)
          return;
        tick().then(() => {
          unsubPopper();
          setMeltMenuAttribute(node, selector2);
          unsubPopper = usePopper(node, {
            anchorElement: $rootActiveTrigger,
            open: rootOpen,
            options: {
              floating: $positioning,
              modal: {
                closeOnInteractOutside: $closeOnOutsideClick,
                shouldCloseOnInteractOutside: (e) => {
                  onOutsideClick.get()?.(e);
                  if (e.defaultPrevented)
                    return false;
                  if (isHTMLElement($rootActiveTrigger) && $rootActiveTrigger.contains(e.target)) {
                    return false;
                  }
                  return true;
                },
                onClose: () => {
                  rootOpen.set(false);
                  $rootActiveTrigger.focus();
                },
                open: $isVisible
              },
              portal: getPortalDestination(node, $portal),
              escapeKeydown: $closeOnEscape ? void 0 : null
            }
          }).destroy;
        });
      });
      const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
        const target = e.target;
        const menuEl = e.currentTarget;
        if (!isHTMLElement(target) || !isHTMLElement(menuEl))
          return;
        const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
        if (!isKeyDownInside)
          return;
        if (FIRST_LAST_KEYS.includes(e.key)) {
          handleMenuNavigation(e, loop.get() ?? false);
        }
        if (e.key === kbd.TAB) {
          e.preventDefault();
          rootOpen.set(false);
          handleTabNavigation(e, nextFocusable, prevFocusable);
          return;
        }
        const isCharacterKey = e.key.length === 1;
        const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
        if (!isModifierKey && isCharacterKey && typeahead.get() === true) {
          handleTypeaheadSearch(e.key, getMenuItems(menuEl));
        }
      }));
      return {
        destroy() {
          unsubDerived();
          unsubEvents();
          unsubPopper();
        }
      };
    }
  });
  const rootTrigger = makeElement(name2("trigger"), {
    stores: [rootOpen, rootIds.menu, rootIds.trigger],
    returned: ([$rootOpen, $rootMenuId, $rootTriggerId]) => {
      return {
        "aria-controls": $rootMenuId,
        "aria-expanded": $rootOpen,
        "data-state": $rootOpen ? "open" : "closed",
        id: $rootTriggerId,
        tabindex: 0
      };
    },
    action: (node) => {
      applyAttrsIfDisabled(node);
      rootActiveTrigger.update((p) => {
        if (p)
          return p;
        return node;
      });
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        const $rootOpen = rootOpen.get();
        const triggerEl = e.currentTarget;
        if (!isHTMLElement(triggerEl))
          return;
        handleOpen(triggerEl);
        if (!$rootOpen)
          e.preventDefault();
      }), addMeltEventListener(node, "keydown", (e) => {
        const triggerEl = e.currentTarget;
        if (!isHTMLElement(triggerEl))
          return;
        if (!(SELECTION_KEYS.includes(e.key) || e.key === kbd.ARROW_DOWN))
          return;
        e.preventDefault();
        handleOpen(triggerEl);
        const menuId = triggerEl.getAttribute("aria-controls");
        if (!menuId)
          return;
        const menu = document.getElementById(menuId);
        if (!menu)
          return;
        const menuItems = getMenuItems(menu);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const rootArrow = makeElement(name2("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  const overlay = makeElement(name2("overlay"), {
    stores: [isVisible],
    returned: ([$isVisible]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": "true",
        "data-state": stateAttr$1($isVisible)
      };
    },
    action: (node) => {
      let unsubEscapeKeydown = noop;
      if (closeOnEscape.get()) {
        const escapeKeydown = useEscapeKeydown(node, {
          handler: () => {
            rootOpen.set(false);
            const $rootActiveTrigger = rootActiveTrigger.get();
            if ($rootActiveTrigger)
              $rootActiveTrigger.focus();
          }
        });
        if (escapeKeydown && escapeKeydown.destroy) {
          unsubEscapeKeydown = escapeKeydown.destroy;
        }
      }
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
          unsubEscapeKeydown();
          unsubPortal();
        }
      };
    }
  });
  const item = makeElement(name2("item"), {
    returned: () => {
      return {
        role: "menuitem",
        tabindex: -1,
        "data-orientation": "vertical"
      };
    },
    action: (node) => {
      setMeltMenuAttribute(node, selector2);
      applyAttrsIfDisabled(node);
      const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
      }), addMeltEventListener(node, "click", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
        if (e.defaultPrevented) {
          handleRovingFocus(itemEl);
          return;
        }
        if (closeOnItemClick.get()) {
          sleep(1).then(() => {
            rootOpen.set(false);
          });
        }
      }), addMeltEventListener(node, "keydown", (e) => {
        onItemKeyDown(e);
      }), addMeltEventListener(node, "pointermove", (e) => {
        onMenuItemPointerMove(e);
      }), addMeltEventListener(node, "pointerleave", (e) => {
        onMenuItemPointerLeave(e);
      }), addMeltEventListener(node, "focusin", (e) => {
        onItemFocusIn(e);
      }), addMeltEventListener(node, "focusout", (e) => {
        onItemFocusOut(e);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const group = makeElement(name2("group"), {
    returned: () => {
      return (groupId) => ({
        role: "group",
        "aria-labelledby": groupId
      });
    }
  });
  const groupLabel = makeElement(name2("group-label"), {
    returned: () => {
      return (groupId) => ({
        id: groupId
      });
    }
  });
  const checkboxItemDefaults = {
    defaultChecked: false,
    disabled: false
  };
  const createCheckboxItem = (props) => {
    const withDefaults = { ...checkboxItemDefaults, ...props };
    const checkedWritable = withDefaults.checked ?? writable(withDefaults.defaultChecked ?? null);
    const checked = overridable(checkedWritable, withDefaults.onCheckedChange);
    const disabled = writable(withDefaults.disabled);
    const checkboxItem = makeElement(name2("checkbox-item"), {
      stores: [checked, disabled],
      returned: ([$checked, $disabled]) => {
        return {
          role: "menuitemcheckbox",
          tabindex: -1,
          "data-orientation": "vertical",
          "aria-checked": isIndeterminate($checked) ? "mixed" : $checked ? "true" : "false",
          "data-disabled": disabledAttr($disabled),
          "data-state": getCheckedState($checked)
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector2);
        applyAttrsIfDisabled(node);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            handleRovingFocus(itemEl);
            return;
          }
          checked.update((prev) => {
            if (isIndeterminate(prev))
              return true;
            return !prev;
          });
          if (closeOnItemClick.get()) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(checked, ($checked) => $checked === true);
    const _isIndeterminate = derived(checked, ($checked) => $checked === "indeterminate");
    return {
      elements: {
        checkboxItem
      },
      states: {
        checked
      },
      helpers: {
        isChecked,
        isIndeterminate: _isIndeterminate
      },
      options: {
        disabled
      }
    };
  };
  const createMenuRadioGroup = (args = {}) => {
    const valueWritable = args.value ?? writable(args.defaultValue ?? null);
    const value = overridable(valueWritable, args.onValueChange);
    const radioGroup = makeElement(name2("radio-group"), {
      returned: () => ({
        role: "group"
      })
    });
    const radioItemDefaults = {
      disabled: false
    };
    const radioItem = makeElement(name2("radio-item"), {
      stores: [value],
      returned: ([$value]) => {
        return (itemProps) => {
          const { value: itemValue, disabled } = { ...radioItemDefaults, ...itemProps };
          const checked = $value === itemValue;
          return {
            disabled,
            role: "menuitemradio",
            "data-state": checked ? "checked" : "unchecked",
            "aria-checked": checked,
            "data-disabled": disabledAttr(disabled),
            "data-value": itemValue,
            "data-orientation": "vertical",
            tabindex: -1
          };
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector2);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            if (!isHTMLElement(itemEl))
              return;
            handleRovingFocus(itemEl);
            return;
          }
          value.set(itemValue);
          if (closeOnItemClick.get()) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(value, ($value) => {
      return (itemValue) => {
        return $value === itemValue;
      };
    });
    return {
      elements: {
        radioGroup,
        radioItem
      },
      states: {
        value
      },
      helpers: {
        isChecked
      }
    };
  };
  const { elements: { root: separator } } = createSeparator({
    orientation: "horizontal"
  });
  const subMenuDefaults = {
    ...defaults$4,
    disabled: false,
    positioning: {
      placement: "right-start",
      gutter: 8
    }
  };
  const createSubmenu = (args) => {
    const withDefaults = { ...subMenuDefaults, ...args };
    const subOpenWritable = withDefaults.open ?? writable(false);
    const subOpen = overridable(subOpenWritable, withDefaults?.onOpenChange);
    const options = toWritableStores(omit(withDefaults, "ids"));
    const { positioning: positioning2, arrowSize: arrowSize2, disabled } = options;
    const subActiveTrigger = withGet(writable(null));
    const subOpenTimer = withGet(writable(null));
    const pointerGraceTimer = withGet(writable(0));
    const subIds = toWritableStores({ ...generateIds(menuIdParts), ...withDefaults.ids });
    safeOnMount(() => {
      const subTrigger2 = document.getElementById(subIds.trigger.get());
      if (subTrigger2) {
        subActiveTrigger.set(subTrigger2);
      }
    });
    const subIsVisible = derivedVisible({
      open: subOpen,
      forceVisible,
      activeTrigger: subActiveTrigger
    });
    const subMenu = makeElement(name2("submenu"), {
      stores: [subIsVisible, subIds.menu, subIds.trigger],
      returned: ([$subIsVisible, $subMenuId, $subTriggerId]) => {
        return {
          role: "menu",
          hidden: $subIsVisible ? void 0 : true,
          style: styleToString({
            display: $subIsVisible ? void 0 : "none"
          }),
          id: $subMenuId,
          "aria-labelledby": $subTriggerId,
          "data-state": $subIsVisible ? "open" : "closed",
          // unit tests fail on `.closest` if the id starts with a number
          // so using a data attribute
          "data-id": $subMenuId,
          tabindex: -1
        };
      },
      action: (node) => {
        let unsubPopper = noop;
        const unsubDerived = effect([subIsVisible, positioning2], ([$subIsVisible, $positioning]) => {
          unsubPopper();
          if (!$subIsVisible)
            return;
          const activeTrigger = subActiveTrigger.get();
          if (!activeTrigger)
            return;
          tick().then(() => {
            unsubPopper();
            const parentMenuEl = getParentMenu(activeTrigger);
            unsubPopper = usePopper(node, {
              anchorElement: activeTrigger,
              open: subOpen,
              options: {
                floating: $positioning,
                portal: isHTMLElement(parentMenuEl) ? parentMenuEl : void 0,
                modal: null,
                focusTrap: null,
                escapeKeydown: null
              }
            }).destroy;
          });
        });
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
          if (e.key === kbd.ESCAPE) {
            return;
          }
          const target = e.target;
          const menuEl = e.currentTarget;
          if (!isHTMLElement(target) || !isHTMLElement(menuEl))
            return;
          const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
          if (!isKeyDownInside)
            return;
          if (FIRST_LAST_KEYS.includes(e.key)) {
            e.stopImmediatePropagation();
            handleMenuNavigation(e, loop.get() ?? false);
            return;
          }
          const isCloseKey = SUB_CLOSE_KEYS["ltr"].includes(e.key);
          const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
          const isCharacterKey = e.key.length === 1;
          if (isCloseKey) {
            const $subActiveTrigger = subActiveTrigger.get();
            e.preventDefault();
            subOpen.update(() => {
              if ($subActiveTrigger) {
                handleRovingFocus($subActiveTrigger);
              }
              return false;
            });
            return;
          }
          if (e.key === kbd.TAB) {
            e.preventDefault();
            rootOpen.set(false);
            handleTabNavigation(e, nextFocusable, prevFocusable);
            return;
          }
          if (!isModifierKey && isCharacterKey && typeahead.get() === true) {
            handleTypeaheadSearch(e.key, getMenuItems(menuEl));
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          onMenuPointerMove(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          const $subActiveTrigger = subActiveTrigger.get();
          if (isUsingKeyboard.get()) {
            const target = e.target;
            const submenuEl = document.getElementById(subIds.menu.get());
            if (!isHTMLElement(submenuEl) || !isHTMLElement(target))
              return;
            if (!submenuEl.contains(target) && target !== $subActiveTrigger) {
              subOpen.set(false);
            }
          } else {
            const menuEl = e.currentTarget;
            const relatedTarget = e.relatedTarget;
            if (!isHTMLElement(relatedTarget) || !isHTMLElement(menuEl))
              return;
            if (!menuEl.contains(relatedTarget) && relatedTarget !== $subActiveTrigger) {
              subOpen.set(false);
            }
          }
        }));
        return {
          destroy() {
            unsubDerived();
            unsubPopper();
            unsubEvents();
          }
        };
      }
    });
    const subTrigger = makeElement(name2("subtrigger"), {
      stores: [subOpen, disabled, subIds.menu, subIds.trigger],
      returned: ([$subOpen, $disabled, $subMenuId, $subTriggerId]) => {
        return {
          role: "menuitem",
          id: $subTriggerId,
          tabindex: -1,
          "aria-controls": $subMenuId,
          "aria-expanded": $subOpen,
          "data-state": $subOpen ? "open" : "closed",
          "data-disabled": disabledAttr($disabled),
          "aria-haspopop": "menu"
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector2);
        applyAttrsIfDisabled(node);
        subActiveTrigger.update((p) => {
          if (p)
            return p;
          return node;
        });
        const unsubTimer = () => {
          clearTimerStore(subOpenTimer);
          window.clearTimeout(pointerGraceTimer.get());
          pointerGraceIntent.set(null);
        };
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "click", (e) => {
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl) || isElementDisabled(triggerEl))
            return;
          handleRovingFocus(triggerEl);
          if (!subOpen.get()) {
            subOpen.update((prev) => {
              const isAlreadyOpen = prev;
              if (!isAlreadyOpen) {
                subActiveTrigger.set(triggerEl);
                return !prev;
              }
              return prev;
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          const $typed = typed.get();
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl) || isElementDisabled(triggerEl))
            return;
          const isTypingAhead = $typed.length > 0;
          if (isTypingAhead && e.key === kbd.SPACE)
            return;
          if (SUB_OPEN_KEYS["ltr"].includes(e.key)) {
            if (!subOpen.get()) {
              triggerEl.click();
              e.preventDefault();
              return;
            }
            const menuId = triggerEl.getAttribute("aria-controls");
            if (!menuId)
              return;
            const menuEl = document.getElementById(menuId);
            if (!isHTMLElement(menuEl))
              return;
            const firstItem = getMenuItems(menuEl)[0];
            handleRovingFocus(firstItem);
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          if (!isMouse(e))
            return;
          onItemEnter(e);
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl))
            return;
          if (!isFocusWithinSubmenu(subIds.menu.get())) {
            handleRovingFocus(triggerEl);
          }
          const openTimer = subOpenTimer.get();
          if (!subOpen.get() && !openTimer && !isElementDisabled(triggerEl)) {
            subOpenTimer.set(window.setTimeout(() => {
              subOpen.update(() => {
                subActiveTrigger.set(triggerEl);
                return true;
              });
              clearTimerStore(subOpenTimer);
            }, 100));
          }
        }), addMeltEventListener(node, "pointerleave", (e) => {
          if (!isMouse(e))
            return;
          clearTimerStore(subOpenTimer);
          const submenuEl = document.getElementById(subIds.menu.get());
          const contentRect = submenuEl?.getBoundingClientRect();
          if (contentRect) {
            const side = submenuEl?.dataset.side;
            const rightSide = side === "right";
            const bleed = rightSide ? -5 : 5;
            const contentNearEdge = contentRect[rightSide ? "left" : "right"];
            const contentFarEdge = contentRect[rightSide ? "right" : "left"];
            pointerGraceIntent.set({
              area: [
                // Apply a bleed on clientX to ensure that our exit point is
                // consistently within polygon bounds
                { x: e.clientX + bleed, y: e.clientY },
                { x: contentNearEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.bottom },
                { x: contentNearEdge, y: contentRect.bottom }
              ],
              side
            });
            window.clearTimeout(pointerGraceTimer.get());
            pointerGraceTimer.set(window.setTimeout(() => {
              pointerGraceIntent.set(null);
            }, 300));
          } else {
            onTriggerLeave(e);
            if (e.defaultPrevented)
              return;
            pointerGraceIntent.set(null);
          }
        }), addMeltEventListener(node, "focusout", (e) => {
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl))
            return;
          removeHighlight(triggerEl);
          const relatedTarget = e.relatedTarget;
          if (!isHTMLElement(relatedTarget))
            return;
          const menuId = triggerEl.getAttribute("aria-controls");
          if (!menuId)
            return;
          const menu = document.getElementById(menuId);
          if (menu && !menu.contains(relatedTarget)) {
            subOpen.set(false);
          }
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }));
        return {
          destroy() {
            unsubTimer();
            unsubEvents();
          }
        };
      }
    });
    const subArrow = makeElement(name2("subarrow"), {
      stores: arrowSize2,
      returned: ($arrowSize) => ({
        "data-arrow": true,
        style: styleToString({
          position: "absolute",
          width: `var(--arrow-size, ${$arrowSize}px)`,
          height: `var(--arrow-size, ${$arrowSize}px)`
        })
      })
    });
    effect([rootOpen], ([$rootOpen]) => {
      if (!$rootOpen) {
        subActiveTrigger.set(null);
        subOpen.set(false);
      }
    });
    effect([pointerGraceIntent], ([$pointerGraceIntent]) => {
      if (!isBrowser || $pointerGraceIntent)
        return;
      window.clearTimeout(pointerGraceTimer.get());
    });
    effect([subOpen], ([$subOpen]) => {
      if (!isBrowser)
        return;
      if ($subOpen && isUsingKeyboard.get()) {
        sleep(1).then(() => {
          const menuEl = document.getElementById(subIds.menu.get());
          if (!menuEl)
            return;
          const menuItems = getMenuItems(menuEl);
          if (!menuItems.length)
            return;
          handleRovingFocus(menuItems[0]);
        });
      }
      if (!$subOpen) {
        const focusedItem = currentFocusedItem.get();
        const subTriggerEl = document.getElementById(subIds.trigger.get());
        if (focusedItem) {
          sleep(1).then(() => {
            const menuEl = document.getElementById(subIds.menu.get());
            if (!menuEl)
              return;
            if (menuEl.contains(focusedItem)) {
              removeHighlight(focusedItem);
            }
          });
        }
        if (!subTriggerEl || document.activeElement === subTriggerEl)
          return;
        removeHighlight(subTriggerEl);
      }
    });
    return {
      ids: subIds,
      elements: {
        subTrigger,
        subMenu,
        subArrow
      },
      states: {
        subOpen
      },
      options
    };
  };
  safeOnMount(() => {
    const triggerEl = document.getElementById(rootIds.trigger.get());
    if (isHTMLElement(triggerEl) && rootOpen.get()) {
      rootActiveTrigger.set(triggerEl);
    }
    const unsubs = [];
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = () => {
      isUsingKeyboard.set(true);
      unsubs.push(executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true })));
    };
    const keydownListener = (e) => {
      if (e.key === kbd.ESCAPE && closeOnEscape.get()) {
        rootOpen.set(false);
        return;
      }
    };
    unsubs.push(addEventListener(document, "keydown", handleKeyDown, { capture: true }));
    unsubs.push(addEventListener(document, "keydown", keydownListener));
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect([rootOpen, currentFocusedItem], ([$rootOpen, $currentFocusedItem]) => {
    if (!$rootOpen && $currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
  });
  effect([rootOpen], ([$rootOpen]) => {
    if (!isBrowser)
      return;
    if (!$rootOpen) {
      const $rootActiveTrigger = rootActiveTrigger.get();
      if (!$rootActiveTrigger)
        return;
      const $closeFocus = closeFocus.get();
      if (!$rootOpen && $rootActiveTrigger) {
        handleFocus({ prop: $closeFocus, defaultEl: $rootActiveTrigger });
      }
    }
  });
  effect([rootOpen, preventScroll], ([$rootOpen, $preventScroll]) => {
    if (!isBrowser)
      return;
    const unsubs = [];
    if (opts.removeScroll && $rootOpen && $preventScroll) {
      unsubs.push(removeScroll());
    }
    sleep(1).then(() => {
      const menuEl = document.getElementById(rootIds.menu.get());
      if (menuEl && $rootOpen && isUsingKeyboard.get()) {
        if (disableFocusFirstItem.get()) {
          handleRovingFocus(menuEl);
          return;
        }
        const menuItems = getMenuItems(menuEl);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }
    });
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect(rootOpen, ($rootOpen) => {
    if (!isBrowser)
      return;
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = (e) => {
      isUsingKeyboard.set(true);
      if (e.key === kbd.ESCAPE && $rootOpen && closeOnEscape.get()) {
        rootOpen.set(false);
        return;
      }
    };
    return executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true }), addEventListener(document, "keydown", handleKeyDown, { capture: true }));
  });
  function handleOpen(triggerEl) {
    rootOpen.update((prev) => {
      const isOpen = !prev;
      if (isOpen) {
        nextFocusable.set(getNextFocusable(triggerEl));
        prevFocusable.set(getPreviousFocusable(triggerEl));
        rootActiveTrigger.set(triggerEl);
      }
      return isOpen;
    });
  }
  function onItemFocusIn(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement(itemEl))
      return;
    const $currentFocusedItem = currentFocusedItem.get();
    if ($currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
    addHighlight(itemEl);
    currentFocusedItem.set(itemEl);
  }
  function onItemFocusOut(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement(itemEl))
      return;
    removeHighlight(itemEl);
  }
  function onItemEnter(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onItemLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      return;
    }
    const target = e.target;
    if (!isHTMLElement(target))
      return;
    const parentMenuEl = getParentMenu(target);
    if (!parentMenuEl)
      return;
    handleRovingFocus(parentMenuEl);
  }
  function onTriggerLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onMenuPointerMove(e) {
    if (!isMouse(e))
      return;
    const target = e.target;
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget) || !isHTMLElement(target))
      return;
    const $lastPointerX = lastPointerX.get();
    const pointerXHasChanged = $lastPointerX !== e.clientX;
    if (currentTarget.contains(target) && pointerXHasChanged) {
      const newDir = e.clientX > $lastPointerX ? "right" : "left";
      pointerDir.set(newDir);
      lastPointerX.set(e.clientX);
    }
  }
  function onMenuItemPointerMove(e, currTarget = null) {
    if (!isMouse(e))
      return;
    onItemEnter(e);
    if (e.defaultPrevented)
      return;
    if (currTarget) {
      handleRovingFocus(currTarget);
      return;
    }
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget))
      return;
    handleRovingFocus(currentTarget);
  }
  function onMenuItemPointerLeave(e) {
    if (!isMouse(e))
      return;
    onItemLeave(e);
  }
  function onItemKeyDown(e) {
    const $typed = typed.get();
    const isTypingAhead = $typed.length > 0;
    if (isTypingAhead && e.key === kbd.SPACE) {
      e.preventDefault();
      return;
    }
    if (SELECTION_KEYS.includes(e.key)) {
      e.preventDefault();
      const itemEl = e.currentTarget;
      if (!isHTMLElement(itemEl))
        return;
      itemEl.click();
    }
  }
  function isIndeterminate(checked) {
    return checked === "indeterminate";
  }
  function getCheckedState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
  }
  function isPointerMovingToSubmenu(e) {
    return pointerMovingToSubmenu.get()(e);
  }
  function getParentMenu(element2) {
    const parentMenuEl = element2.closest('[role="menu"]');
    if (!isHTMLElement(parentMenuEl))
      return null;
    return parentMenuEl;
  }
  return {
    elements: {
      trigger: rootTrigger,
      menu: rootMenu,
      overlay,
      item,
      group,
      groupLabel,
      arrow: rootArrow,
      separator
    },
    builders: {
      createCheckboxItem,
      createSubmenu,
      createMenuRadioGroup
    },
    states: {
      open: rootOpen
    },
    helpers: {
      handleTypeaheadSearch
    },
    ids: rootIds,
    options: opts.rootOptions
  };
}
function handleTabNavigation(e, nextFocusable, prevFocusable) {
  if (e.shiftKey) {
    const $prevFocusable = prevFocusable.get();
    if ($prevFocusable) {
      e.preventDefault();
      sleep(1).then(() => $prevFocusable.focus());
      prevFocusable.set(null);
    }
  } else {
    const $nextFocusable = nextFocusable.get();
    if ($nextFocusable) {
      e.preventDefault();
      sleep(1).then(() => $nextFocusable.focus());
      nextFocusable.set(null);
    }
  }
}
function getMenuItems(menuElement) {
  return Array.from(menuElement.querySelectorAll(`[data-melt-menu-id="${menuElement.id}"]`)).filter((item) => isHTMLElement(item));
}
function applyAttrsIfDisabled(element2) {
  if (!element2 || !isElementDisabled(element2))
    return;
  element2.setAttribute("data-disabled", "");
  element2.setAttribute("aria-disabled", "true");
}
function clearTimerStore(timerStore) {
  if (!isBrowser)
    return;
  const timer = timerStore.get();
  if (timer) {
    window.clearTimeout(timer);
    timerStore.set(null);
  }
}
function isMouse(e) {
  return e.pointerType === "mouse";
}
function setMeltMenuAttribute(element2, selector2) {
  if (!element2)
    return;
  const menuEl = element2.closest(`${selector2()}, ${selector2("submenu")}`);
  if (!isHTMLElement(menuEl))
    return;
  element2.setAttribute("data-melt-menu-id", menuEl.id);
}
function handleMenuNavigation(e, loop) {
  e.preventDefault();
  const currentFocusedItem = document.activeElement;
  const currentTarget = e.currentTarget;
  if (!isHTMLElement(currentFocusedItem) || !isHTMLElement(currentTarget))
    return;
  const menuItems = getMenuItems(currentTarget);
  if (!menuItems.length)
    return;
  const candidateNodes = menuItems.filter((item) => {
    if (item.hasAttribute("data-disabled") || item.getAttribute("disabled") === "true") {
      return false;
    }
    return true;
  });
  const currentIndex = candidateNodes.indexOf(currentFocusedItem);
  let nextIndex;
  switch (e.key) {
    case kbd.ARROW_DOWN:
      if (loop) {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : currentIndex;
      }
      break;
    case kbd.ARROW_UP:
      if (loop) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : candidateNodes.length - 1;
      } else {
        nextIndex = currentIndex < 0 ? candidateNodes.length - 1 : currentIndex > 0 ? currentIndex - 1 : 0;
      }
      break;
    case kbd.HOME:
      nextIndex = 0;
      break;
    case kbd.END:
      nextIndex = candidateNodes.length - 1;
      break;
    default:
      return;
  }
  handleRovingFocus(candidateNodes[nextIndex]);
}
function isPointerInGraceArea(e, area) {
  if (!area)
    return false;
  const cursorPos = { x: e.clientX, y: e.clientY };
  return isPointInPolygon(cursorPos, area);
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function isFocusWithinSubmenu(submenuId) {
  const activeEl = document.activeElement;
  if (!isHTMLElement(activeEl))
    return false;
  const submenuEl = activeEl.closest(`[data-id="${submenuId}"]`);
  return isHTMLElement(submenuEl);
}
function stateAttr$1(open) {
  return open ? "open" : "closed";
}
const defaults$3 = {
  arrowSize: 8,
  positioning: {
    placement: "bottom-start"
  },
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  portal: void 0,
  loop: false,
  dir: "ltr",
  defaultOpen: false,
  forceVisible: false,
  typeahead: true,
  disableFocusFirstItem: true,
  closeFocus: void 0,
  closeOnItemClick: true,
  onOutsideClick: void 0
};
const { name: name$2, selector } = createElHelpers("context-menu");
function createContextMenu(props) {
  const withDefaults = { ...defaults$3, ...props };
  const rootOptions = toWritableStores(omit(withDefaults, "ids"));
  const { positioning, closeOnOutsideClick, portal, forceVisible, closeOnEscape, loop } = rootOptions;
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const rootOpen = overridable(openWritable, withDefaults?.onOpenChange);
  const rootActiveTrigger = writable(null);
  const nextFocusable = withGet.writable(null);
  const prevFocusable = withGet.writable(null);
  const { elements, builders, ids, options, helpers, states } = createMenuBuilder({
    rootOpen,
    rootOptions,
    rootActiveTrigger: withGet(rootActiveTrigger),
    nextFocusable: withGet(nextFocusable),
    prevFocusable: withGet(prevFocusable),
    selector: "context-menu",
    removeScroll: true,
    ids: withDefaults.ids
  });
  const { handleTypeaheadSearch } = helpers;
  const point = writable(null);
  const virtual = withGet(derived([point], ([$point]) => {
    if ($point === null)
      return null;
    return {
      getBoundingClientRect: () => DOMRect.fromRect({
        width: 0,
        height: 0,
        ...$point
      })
    };
  }));
  const longPressTimer = withGet.writable(0);
  function handleClickOutside(e) {
    rootOptions.onOutsideClick.get()?.(e);
    if (e.defaultPrevented)
      return false;
    const target = e.target;
    if (!(target instanceof Element))
      return false;
    const isClickInsideTrigger = target.closest(`[data-id="${ids.trigger.get()}"]`) !== null;
    if (!isClickInsideTrigger || isLeftClick(e)) {
      return true;
    }
    return false;
  }
  const isVisible = derivedVisible({
    open: rootOpen,
    forceVisible,
    activeTrigger: rootActiveTrigger
  });
  const menu = makeElement(name$2(), {
    stores: [isVisible, portal, ids.menu, ids.trigger],
    returned: ([$isVisible, $portal, $menuId, $triggerId]) => {
      return {
        role: "menu",
        hidden: $isVisible ? void 0 : true,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        id: $menuId,
        "aria-labelledby": $triggerId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": portalAttr($portal),
        tabindex: -1
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect([isVisible, rootActiveTrigger, positioning, closeOnOutsideClick, portal, closeOnEscape], ([$isVisible, $rootActiveTrigger, $positioning, $closeOnOutsideClick, $portal, $closeOnEscape]) => {
        unsubPopper();
        if (!$isVisible || !$rootActiveTrigger)
          return;
        tick().then(() => {
          unsubPopper();
          setMeltMenuAttribute(node, selector);
          const $virtual = virtual.get();
          unsubPopper = usePopper(node, {
            anchorElement: $virtual ? $virtual : $rootActiveTrigger,
            open: rootOpen,
            options: {
              floating: $positioning,
              modal: {
                closeOnInteractOutside: $closeOnOutsideClick,
                onClose: () => {
                  rootOpen.set(false);
                },
                shouldCloseOnInteractOutside: handleClickOutside,
                open: $isVisible
              },
              portal: getPortalDestination(node, $portal),
              escapeKeydown: $closeOnEscape ? void 0 : null
            }
          }).destroy;
        });
      });
      const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
        const target = e.target;
        const menuEl = e.currentTarget;
        if (!isHTMLElement(target) || !isHTMLElement(menuEl))
          return;
        const isKeyDownInside = target.closest("[role='menu']") === menuEl;
        if (!isKeyDownInside)
          return;
        if (FIRST_LAST_KEYS.includes(e.key)) {
          handleMenuNavigation(e, loop.get());
        }
        if (e.key === kbd.TAB) {
          e.preventDefault();
          rootOpen.set(false);
          handleTabNavigation(e, nextFocusable, prevFocusable);
          return;
        }
        const isCharacterKey = e.key.length === 1;
        const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
        if (!isModifierKey && isCharacterKey) {
          handleTypeaheadSearch(e.key, getMenuItems(menuEl));
        }
      }));
      return {
        destroy() {
          unsubDerived();
          unsubEvents();
          unsubPopper();
        }
      };
    }
  });
  const trigger = makeElement(name$2("trigger"), {
    stores: [rootOpen, ids.trigger],
    returned: ([$rootOpen, $triggerId]) => {
      return {
        "data-state": $rootOpen ? "open" : "closed",
        id: $triggerId,
        style: styleToString({
          WebkitTouchCallout: "none"
        }),
        "data-id": $triggerId
      };
    },
    action: (node) => {
      applyAttrsIfDisabled(node);
      const handleOpen = (e) => {
        point.set({
          x: e.clientX,
          y: e.clientY
        });
        nextFocusable.set(getNextFocusable(node));
        prevFocusable.set(getPreviousFocusable(node));
        rootActiveTrigger.set(node);
        rootOpen.set(true);
      };
      const unsubTimer = () => {
        clearTimerStore(longPressTimer);
      };
      const unsub = executeCallbacks(addMeltEventListener(node, "contextmenu", (e) => {
        clearTimerStore(longPressTimer);
        handleOpen(e);
        e.preventDefault();
      }), addMeltEventListener(node, "pointerdown", (e) => {
        if (!isTouchOrPen(e))
          return;
        clearTimerStore(longPressTimer);
        longPressTimer.set(window.setTimeout(() => handleOpen(e), 700));
      }), addMeltEventListener(node, "pointermove", (e) => {
        if (!isTouchOrPen(e))
          return;
        clearTimerStore(longPressTimer);
      }), addMeltEventListener(node, "pointercancel", (e) => {
        if (!isTouchOrPen(e))
          return;
        clearTimerStore(longPressTimer);
      }), addMeltEventListener(node, "pointerup", (e) => {
        if (!isTouchOrPen(e))
          return;
        clearTimerStore(longPressTimer);
      }));
      return {
        destroy() {
          unsubTimer();
          unsub();
        }
      };
    }
  });
  return {
    ids,
    elements: {
      ...elements,
      menu,
      trigger
    },
    states,
    builders,
    options
  };
}
function isTouchOrPen(e) {
  return e.pointerType !== "mouse";
}
function isLeftClick(event) {
  if ("button" in event) {
    return event.button === 0 && event.ctrlKey === false && event.metaKey === false;
  }
  return true;
}
const { name: name$1 } = createElHelpers("hover-card");
const defaults$2 = {
  defaultOpen: false,
  openDelay: 1e3,
  closeDelay: 100,
  positioning: {
    placement: "bottom"
  },
  arrowSize: 8,
  closeOnOutsideClick: true,
  forceVisible: false,
  portal: void 0,
  closeOnEscape: true,
  onOutsideClick: void 0
};
const linkPreviewIdParts = ["trigger", "content"];
function createLinkPreview(props = {}) {
  const withDefaults = { ...defaults$2, ...props };
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const hasSelection = withGet.writable(false);
  const isPointerDownOnContent = withGet.writable(false);
  const containSelection = writable(false);
  const activeTrigger = writable(null);
  const options = toWritableStores(omit(withDefaults, "ids"));
  const { openDelay, closeDelay, positioning, arrowSize, closeOnOutsideClick, forceVisible, portal, closeOnEscape, onOutsideClick } = options;
  const ids = toWritableStores({ ...generateIds(linkPreviewIdParts), ...withDefaults.ids });
  let timeout = null;
  let originalBodyUserSelect;
  const handleOpen = withGet.derived(openDelay, ($openDelay) => {
    return () => {
      if (timeout) {
        window.clearTimeout(timeout);
        timeout = null;
      }
      timeout = window.setTimeout(() => {
        open.set(true);
      }, $openDelay);
    };
  });
  const handleClose = withGet.derived([closeDelay, isPointerDownOnContent, hasSelection], ([$closeDelay, $isPointerDownOnContent, $hasSelection]) => {
    return () => {
      if (timeout) {
        window.clearTimeout(timeout);
        timeout = null;
      }
      if (!$isPointerDownOnContent && !$hasSelection) {
        timeout = window.setTimeout(() => {
          open.set(false);
        }, $closeDelay);
      }
    };
  });
  const trigger = makeElement(name$1("trigger"), {
    stores: [open, ids.trigger, ids.content],
    returned: ([$open, $triggerId, $contentId]) => {
      return {
        role: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": $open,
        "data-state": $open ? "open" : "closed",
        "aria-controls": $contentId,
        id: $triggerId
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "pointerenter", (e) => {
        if (isTouch(e))
          return;
        handleOpen.get()();
      }), addMeltEventListener(node, "pointerleave", (e) => {
        if (isTouch(e))
          return;
        handleClose.get()();
      }), addMeltEventListener(node, "focus", (e) => {
        if (!isElement(e.currentTarget) || !isFocusVisible(e.currentTarget))
          return;
        handleOpen.get()();
      }), addMeltEventListener(node, "blur", () => handleClose.get()()));
      return {
        destroy: unsub
      };
    }
  });
  const isVisible = derivedVisible({ open, forceVisible, activeTrigger });
  const content = makeElement(name$1("content"), {
    stores: [isVisible, portal, ids.content],
    returned: ([$isVisible, $portal, $contentId]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          "pointer-events": $isVisible ? void 0 : "none",
          opacity: $isVisible ? 1 : 0,
          userSelect: "text",
          WebkitUserSelect: "text"
        }),
        id: $contentId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": portalAttr($portal)
      };
    },
    action: (node) => {
      let unsub = noop;
      const unsubTimers = () => {
        if (timeout) {
          window.clearTimeout(timeout);
        }
      };
      let unsubPopper = noop;
      const unsubDerived = effect([isVisible, activeTrigger, positioning, closeOnOutsideClick, portal, closeOnEscape], ([$isVisible, $activeTrigger, $positioning, $closeOnOutsideClick, $portal, $closeOnEscape]) => {
        unsubPopper();
        if (!$isVisible || !$activeTrigger)
          return;
        tick().then(() => {
          unsubPopper();
          unsubPopper = usePopper(node, {
            anchorElement: $activeTrigger,
            open,
            options: {
              floating: $positioning,
              modal: {
                closeOnInteractOutside: $closeOnOutsideClick,
                onClose: () => {
                  open.set(false);
                  $activeTrigger.focus();
                },
                shouldCloseOnInteractOutside: (e) => {
                  onOutsideClick.get()?.(e);
                  if (e.defaultPrevented)
                    return false;
                  if (isHTMLElement($activeTrigger) && $activeTrigger.contains(e.target))
                    return false;
                  return true;
                },
                open: $isVisible
              },
              portal: getPortalDestination(node, $portal),
              focusTrap: null,
              escapeKeydown: $closeOnEscape ? void 0 : null
            }
          }).destroy;
        });
      });
      unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
        const currentTarget = e.currentTarget;
        const target = e.target;
        if (!isHTMLElement(currentTarget) || !isHTMLElement(target))
          return;
        if (currentTarget.contains(target)) {
          containSelection.set(true);
        }
        hasSelection.set(false);
        isPointerDownOnContent.set(true);
      }), addMeltEventListener(node, "pointerenter", (e) => {
        if (isTouch(e))
          return;
        handleOpen.get()();
      }), addMeltEventListener(node, "pointerleave", (e) => {
        if (isTouch(e))
          return;
        handleClose.get()();
      }), addMeltEventListener(node, "focusout", (e) => {
        e.preventDefault();
      }));
      return {
        destroy() {
          unsub();
          unsubPopper();
          unsubTimers();
          unsubDerived();
        }
      };
    }
  });
  const arrow2 = makeElement(name$1("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  effect([containSelection], ([$containSelection]) => {
    if (!isBrowser || !$containSelection)
      return;
    const body = document.body;
    const contentElement = document.getElementById(ids.content.get());
    if (!contentElement)
      return;
    originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect;
    const originalContentUserSelect = contentElement.style.userSelect || contentElement.style.webkitUserSelect;
    body.style.userSelect = "none";
    body.style.webkitUserSelect = "none";
    contentElement.style.userSelect = "text";
    contentElement.style.webkitUserSelect = "text";
    return () => {
      body.style.userSelect = originalBodyUserSelect;
      body.style.webkitUserSelect = originalBodyUserSelect;
      contentElement.style.userSelect = originalContentUserSelect;
      contentElement.style.webkitUserSelect = originalContentUserSelect;
    };
  });
  safeOnMount(() => {
    const triggerEl = document.getElementById(ids.trigger.get());
    if (!triggerEl)
      return;
    activeTrigger.set(triggerEl);
  });
  effect([open], ([$open]) => {
    if (!isBrowser || !$open) {
      hasSelection.set(false);
      return;
    }
    const handlePointerUp = () => {
      containSelection.set(false);
      isPointerDownOnContent.set(false);
      sleep(1).then(() => {
        const isSelection = document.getSelection()?.toString() !== "";
        if (isSelection) {
          hasSelection.set(true);
        }
      });
    };
    document.addEventListener("pointerup", handlePointerUp);
    const contentElement = document.getElementById(ids.content.get());
    if (!contentElement)
      return;
    const tabbables = getTabbableNodes(contentElement);
    tabbables.forEach((tabbable) => tabbable.setAttribute("tabindex", "-1"));
    return () => {
      document.removeEventListener("pointerup", handlePointerUp);
      hasSelection.set(false);
      isPointerDownOnContent.set(false);
    };
  });
  return {
    ids,
    elements: {
      trigger,
      content,
      arrow: arrow2
    },
    states: {
      open
    },
    options
  };
}
const defaults$1 = {
  positioning: {
    placement: "bottom"
  },
  arrowSize: 8,
  defaultOpen: false,
  disableFocusTrap: false,
  closeOnEscape: true,
  preventScroll: false,
  onOpenChange: void 0,
  closeOnOutsideClick: true,
  portal: void 0,
  forceVisible: false,
  openFocus: void 0,
  closeFocus: void 0,
  onOutsideClick: void 0
};
const { name } = createElHelpers("popover");
const popoverIdParts = ["trigger", "content"];
function createPopover(args) {
  const withDefaults = { ...defaults$1, ...args };
  const options = toWritableStores(omit(withDefaults, "open", "ids"));
  const { positioning, arrowSize, disableFocusTrap, preventScroll, closeOnEscape, closeOnOutsideClick, portal, forceVisible, openFocus, closeFocus, onOutsideClick } = options;
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const activeTrigger = withGet.writable(null);
  const ids = toWritableStores({ ...generateIds(popoverIdParts), ...withDefaults.ids });
  safeOnMount(() => {
    activeTrigger.set(document.getElementById(ids.trigger.get()));
  });
  function handleClose() {
    open.set(false);
    const triggerEl = document.getElementById(ids.trigger.get());
    handleFocus({ prop: closeFocus.get(), defaultEl: triggerEl });
  }
  const isVisible = derivedVisible({ open, activeTrigger, forceVisible });
  const content = makeElement(name("content"), {
    stores: [isVisible, portal, ids.content],
    returned: ([$isVisible, $portal, $contentId]) => {
      return {
        hidden: $isVisible && isBrowser ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        id: $contentId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": portalAttr($portal)
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect([
        isVisible,
        activeTrigger,
        positioning,
        disableFocusTrap,
        closeOnEscape,
        closeOnOutsideClick,
        portal
      ], ([$isVisible, $activeTrigger, $positioning, $disableFocusTrap, $closeOnEscape, $closeOnOutsideClick, $portal]) => {
        unsubPopper();
        if (!$isVisible || !$activeTrigger)
          return;
        tick().then(() => {
          unsubPopper();
          unsubPopper = usePopper(node, {
            anchorElement: $activeTrigger,
            open,
            options: {
              floating: $positioning,
              focusTrap: $disableFocusTrap ? null : {
                returnFocusOnDeactivate: false,
                clickOutsideDeactivates: $closeOnOutsideClick,
                allowOutsideClick: true,
                escapeDeactivates: $closeOnEscape
              },
              modal: {
                shouldCloseOnInteractOutside,
                onClose: handleClose,
                open: $isVisible,
                closeOnInteractOutside: $closeOnOutsideClick
              },
              escapeKeydown: $closeOnEscape ? {
                handler: () => {
                  handleClose();
                }
              } : null,
              portal: getPortalDestination(node, $portal)
            }
          }).destroy;
        });
      });
      return {
        destroy() {
          unsubDerived();
          unsubPopper();
        }
      };
    }
  });
  function toggleOpen(triggerEl) {
    open.update((prev) => {
      return !prev;
    });
    if (triggerEl && triggerEl !== activeTrigger.get()) {
      activeTrigger.set(triggerEl);
    }
  }
  function shouldCloseOnInteractOutside(e) {
    onOutsideClick.get()?.(e);
    if (e.defaultPrevented)
      return false;
    const target = e.target;
    const triggerEl = document.getElementById(ids.trigger.get());
    if (triggerEl && isElement(target)) {
      if (target === triggerEl || triggerEl.contains(target))
        return false;
    }
    return true;
  }
  const trigger = makeElement(name("trigger"), {
    stores: [isVisible, ids.content, ids.trigger],
    returned: ([$isVisible, $contentId, $triggerId]) => {
      return {
        role: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": $isVisible ? "true" : "false",
        "data-state": stateAttr($isVisible),
        "aria-controls": $contentId,
        id: $triggerId
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        toggleOpen(node);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        toggleOpen(node);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const overlay = makeElement(name("overlay"), {
    stores: [isVisible],
    returned: ([$isVisible]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": "true",
        "data-state": stateAttr($isVisible)
      };
    },
    action: (node) => {
      let unsubEscapeKeydown = noop;
      let unsubDerived = noop;
      let unsubPortal = noop;
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
      unsubDerived = effect([portal], ([$portal]) => {
        unsubPortal();
        if ($portal === null)
          return;
        const portalDestination = getPortalDestination(node, $portal);
        if (portalDestination === null)
          return;
        unsubPortal = usePortal(node, portalDestination).destroy;
      });
      return {
        destroy() {
          unsubEscapeKeydown();
          unsubDerived();
          unsubPortal();
        }
      };
    }
  });
  const arrow2 = makeElement(name("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  const close = makeElement(name("close"), {
    returned: () => ({
      type: "button"
    }),
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        if (e.defaultPrevented)
          return;
        handleClose();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.defaultPrevented)
          return;
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        toggleOpen();
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([open, activeTrigger, preventScroll], ([$open, $activeTrigger, $preventScroll]) => {
    if (!isBrowser)
      return;
    const unsubs = [];
    if ($open) {
      if (!$activeTrigger) {
        tick().then(() => {
          const triggerEl2 = document.getElementById(ids.trigger.get());
          if (!isHTMLElement(triggerEl2))
            return;
          activeTrigger.set(triggerEl2);
        });
      }
      if ($preventScroll) {
        unsubs.push(removeScroll());
      }
      const triggerEl = $activeTrigger ?? document.getElementById(ids.trigger.get());
      handleFocus({ prop: openFocus.get(), defaultEl: triggerEl });
    }
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  return {
    ids,
    elements: {
      trigger,
      content,
      arrow: arrow2,
      close,
      overlay
    },
    states: {
      open
    },
    options
  };
}
function stateAttr(open) {
  return open ? "open" : "closed";
}
const defaults = {
  orientation: "horizontal",
  decorative: false
};
const createSeparator = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(withDefaults);
  const { orientation, decorative } = options;
  const root = makeElement("separator", {
    stores: [orientation, decorative],
    returned: ([$orientation, $decorative]) => {
      const ariaOrientation = $orientation === "vertical" ? $orientation : void 0;
      return {
        role: $decorative ? "none" : "separator",
        "aria-orientation": ariaOrientation,
        "aria-hidden": $decorative,
        "data-orientation": $orientation
      };
    }
  });
  return {
    elements: {
      root
    },
    options
  };
};
function getAttrs(builders) {
  const attrs = {};
  builders.forEach((builder) => {
    Object.keys(builder).forEach((key) => {
      if (key !== "action") {
        attrs[key] = builder[key];
      }
    });
  });
  return attrs;
}
function Button$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "href",
    "type",
    "builders",
    "el",
    "$$props"
  ]);
  push();
  let href = value_or_fallback($$props["href"], () => void 0);
  let type = value_or_fallback($$props["type"], () => void 0);
  let builders = value_or_fallback($$props["builders"], () => []);
  let el = value_or_fallback($$props["el"], () => void 0);
  const attrs = { "data-button-root": "" };
  $$payload.out += `<!--[-->`;
  if (builders && builders.length) {
    const $$tag = href ? "a" : "button";
    $$payload.out += `<!--[-->`;
    if ($$tag)
      element(
        $$payload,
        $$tag,
        () => {
          $$payload.out += `${spread_attributes(
            [
              { "type": href ? void 0 : type },
              { "href": href },
              { "tabindex": "0" },
              getAttrs(builders),
              $$restProps,
              attrs
            ],
            true,
            false,
            ""
          )}`;
        },
        () => {
          $$payload.out += `<!--[-->`;
          slot($$payload, $$props.children, {}, null);
          $$payload.out += `<!--]-->`;
        }
      );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    const $$tag_1 = href ? "a" : "button";
    $$payload.out += `<!--[-->`;
    if ($$tag_1)
      element(
        $$payload,
        $$tag_1,
        () => {
          $$payload.out += `${spread_attributes(
            [
              { "type": href ? void 0 : type },
              { "href": href },
              { "tabindex": "0" },
              $$restProps,
              attrs
            ],
            true,
            false,
            ""
          )}`;
        },
        () => {
          $$payload.out += `<!--[-->`;
          slot($$payload, $$props.children, {}, null);
          $$payload.out += `<!--]-->`;
        }
      );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { href, type, builders, el });
  pop();
}
function getCalendarData() {
  const NAME = "calendar";
  const PARTS = [
    "root",
    "prev-button",
    "next-button",
    "heading",
    "grid",
    "day",
    "header",
    "grid-head",
    "head-cell",
    "grid-body",
    "cell",
    "grid-row"
  ];
  return { NAME, PARTS };
}
function setCtx$4(props) {
  const { NAME, PARTS } = getCalendarData();
  const getCalendarAttrs = createBitAttrs(NAME, PARTS);
  const calendar = { ...createCalendar(removeUndefined(props)), getCalendarAttrs };
  setContext(NAME, calendar);
  return {
    ...calendar,
    updateOption: getOptionUpdater(calendar.options)
  };
}
function getCtx$5() {
  const { NAME } = getCalendarData();
  const ctx = getContext(NAME);
  return ctx;
}
function Calendar$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "placeholder",
    "onPlaceholderChange",
    "value",
    "onValueChange",
    "preventDeselect",
    "minValue",
    "maxValue",
    "pagedNavigation",
    "weekStartsOn",
    "locale",
    "isDateUnavailable",
    "isDateDisabled",
    "disabled",
    "readonly",
    "fixedWeeks",
    "calendarLabel",
    "weekdayFormat",
    "multiple",
    "asChild",
    "id",
    "numberOfMonths",
    "initialFocus",
    "el",
    "$$props"
  ]);
  push();
  var $$store_subs;
  let builder;
  let placeholder = value_or_fallback($$props["placeholder"], () => void 0);
  let onPlaceholderChange = value_or_fallback($$props["onPlaceholderChange"], () => void 0);
  let value = value_or_fallback($$props["value"], () => void 0);
  let onValueChange = value_or_fallback($$props["onValueChange"], () => void 0);
  let preventDeselect = value_or_fallback($$props["preventDeselect"], () => void 0);
  let minValue = value_or_fallback($$props["minValue"], () => void 0);
  let maxValue = value_or_fallback($$props["maxValue"], () => void 0);
  let pagedNavigation = value_or_fallback($$props["pagedNavigation"], () => void 0);
  let weekStartsOn = value_or_fallback($$props["weekStartsOn"], () => void 0);
  let locale = value_or_fallback($$props["locale"], () => void 0);
  let isDateUnavailable = value_or_fallback($$props["isDateUnavailable"], () => void 0);
  let isDateDisabled = value_or_fallback($$props["isDateDisabled"], () => void 0);
  let disabled = value_or_fallback($$props["disabled"], () => void 0);
  let readonly = value_or_fallback($$props["readonly"], () => void 0);
  let fixedWeeks = value_or_fallback($$props["fixedWeeks"], () => void 0);
  let calendarLabel = value_or_fallback($$props["calendarLabel"], () => void 0);
  let weekdayFormat = value_or_fallback($$props["weekdayFormat"], () => void 0);
  let multiple = value_or_fallback($$props["multiple"], () => false);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let id = value_or_fallback($$props["id"], () => void 0);
  let numberOfMonths = value_or_fallback($$props["numberOfMonths"], () => void 0);
  let initialFocus = value_or_fallback($$props["initialFocus"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { calendar },
    states: {
      value: localValue,
      placeholder: localPlaceholder,
      months: localMonths,
      weekdays
    },
    updateOption,
    ids,
    getCalendarAttrs
  } = setCtx$4({
    defaultPlaceholder: placeholder,
    defaultValue: value,
    preventDeselect,
    minValue,
    maxValue,
    pagedNavigation,
    weekStartsOn,
    locale,
    isDateUnavailable,
    isDateDisabled,
    disabled,
    readonly,
    fixedWeeks,
    calendarLabel,
    weekdayFormat,
    multiple,
    numberOfMonths,
    onPlaceholderChange: ({ next }) => {
      if (placeholder !== next) {
        onPlaceholderChange?.(next);
        placeholder = next;
      }
      return next;
    },
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
  const attrs = getCalendarAttrs("root");
  let months = store_get($$store_subs ??= {}, "$localMonths", localMonths);
  if (id) {
    ids.calendar.set(id);
  }
  value !== void 0 && localValue.set(Array.isArray(value) ? [...value] : value);
  placeholder !== void 0 && localPlaceholder.set(placeholder);
  updateOption("preventDeselect", preventDeselect);
  updateOption("minValue", minValue);
  updateOption("maxValue", maxValue);
  updateOption("pagedNavigation", pagedNavigation);
  updateOption("weekStartsOn", weekStartsOn);
  updateOption("locale", locale);
  updateOption("isDateUnavailable", isDateUnavailable);
  updateOption("isDateDisabled", isDateDisabled);
  updateOption("disabled", disabled);
  updateOption("readonly", readonly);
  updateOption("fixedWeeks", fixedWeeks);
  updateOption("calendarLabel", calendarLabel);
  updateOption("weekdayFormat", weekdayFormat);
  updateOption("numberOfMonths", numberOfMonths);
  builder = store_get($$store_subs ??= {}, "$calendar", calendar);
  Object.assign(builder, attrs);
  months = store_get($$store_subs ??= {}, "$localMonths", localMonths);
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get months() {
          return months;
        },
        get weekdays() {
          return store_get($$store_subs ??= {}, "$weekdays", weekdays);
        },
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
        get months() {
          return months;
        },
        get weekdays() {
          return store_get($$store_subs ??= {}, "$weekdays", weekdays);
        },
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
    placeholder,
    onPlaceholderChange,
    value,
    onValueChange,
    preventDeselect,
    minValue,
    maxValue,
    pagedNavigation,
    weekStartsOn,
    locale,
    isDateUnavailable,
    isDateDisabled,
    disabled,
    readonly,
    fixedWeeks,
    calendarLabel,
    weekdayFormat,
    multiple,
    asChild,
    id,
    numberOfMonths,
    initialFocus,
    el
  });
  pop();
}
function Calendar_day$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "date",
    "month",
    "asChild",
    "el",
    "$$props"
  ]);
  push();
  var $$store_subs;
  let builder, disabled, unavailable, selected;
  let date2 = $$props["date"];
  let month = $$props["month"];
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { cell },
    helpers: {
      isDateDisabled,
      isDateUnavailable,
      isDateSelected
    },
    getCalendarAttrs
  } = getCtx$5();
  const attrs = getCalendarAttrs("day");
  builder = store_get($$store_subs ??= {}, "$cell", cell)(date2, month);
  Object.assign(builder, attrs);
  disabled = store_get($$store_subs ??= {}, "$isDateDisabled", isDateDisabled)(date2);
  unavailable = store_get($$store_subs ??= {}, "$isDateUnavailable", isDateUnavailable)(date2);
  selected = store_get($$store_subs ??= {}, "$isDateSelected", isDateSelected)(date2);
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        },
        get disabled() {
          return disabled;
        },
        get unavailable() {
          return unavailable;
        },
        get selected() {
          return selected;
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
        },
        get disabled() {
          return disabled;
        },
        get unavailable() {
          return unavailable;
        },
        get selected() {
          return selected;
        }
      },
      () => {
        $$payload.out += `${escape(date2.day)}`;
      }
    );
    $$payload.out += `<!--]--></div>`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { date: date2, month, asChild, el });
  pop();
}
function Calendar_grid$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { grid }, getCalendarAttrs } = getCtx$5();
  const attrs = getCalendarAttrs("grid");
  builder = store_get($$store_subs ??= {}, "$grid", grid);
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
    $$payload.out += `<table${spread_attributes([builder, $$restProps], true, false, "")}><!--[-->`;
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
    $$payload.out += `<!--]--></table>`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_grid_body$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { getCalendarAttrs } = getCtx$5();
  const attrs = getCalendarAttrs("grid-body");
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<tbody${spread_attributes([$$restProps, attrs], true, false, "")}><!--[-->`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `<!--]--></tbody>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_cell$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["date", "asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let attrs;
  let date2 = $$props["date"];
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    helpers: { isDateDisabled, isDateUnavailable },
    getCalendarAttrs
  } = getCtx$5();
  attrs = {
    ...getCalendarAttrs("cell"),
    "aria-disabled": store_get($$store_subs ??= {}, "$isDateDisabled", isDateDisabled)(date2) || store_get($$store_subs ??= {}, "$isDateUnavailable", isDateUnavailable)(date2),
    "data-disabled": store_get($$store_subs ??= {}, "$isDateDisabled", isDateDisabled)(date2) ? "" : void 0,
    role: "gridcell"
  };
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get attrs() {
          return attrs;
        }
      },
      null
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<td${spread_attributes([$$restProps, attrs], true, false, "")}><!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get attrs() {
          return attrs;
        }
      },
      null
    );
    $$payload.out += `<!--]--></td>`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { date: date2, asChild, el });
  pop();
}
function Calendar_grid_head$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { getCalendarAttrs } = getCtx$5();
  const attrs = {
    ...getCalendarAttrs("grid-head"),
    "aria-hidden": true
  };
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<thead${spread_attributes([$$restProps, attrs], true, false, "")}><!--[-->`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `<!--]--></thead>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_head_cell$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { getCalendarAttrs } = getCtx$5();
  const attrs = getCalendarAttrs("head-cell");
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<th${spread_attributes([$$restProps, attrs], true, false, "")}><!--[-->`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `<!--]--></th>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_grid_row$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { getCalendarAttrs } = getCtx$5();
  const attrs = getCalendarAttrs("grid-row");
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<tr${spread_attributes([$$restProps, attrs], true, false, "")}><!--[-->`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `<!--]--></tr>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_header$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { getCalendarAttrs } = getCtx$5();
  const attrs = getCalendarAttrs("header");
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<header${spread_attributes([$$restProps, attrs], true, false, "")}><!--[-->`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `<!--]--></header>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_heading$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { heading },
    states: { headingValue },
    getCalendarAttrs
  } = getCtx$5();
  const attrs = getCalendarAttrs("heading");
  builder = store_get($$store_subs ??= {}, "$heading", heading);
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
        },
        get headingValue() {
          return store_get($$store_subs ??= {}, "$headingValue", headingValue);
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
        },
        get headingValue() {
          return store_get($$store_subs ??= {}, "$headingValue", headingValue);
        }
      },
      () => {
        $$payload.out += `${escape(store_get($$store_subs ??= {}, "$headingValue", headingValue))}`;
      }
    );
    $$payload.out += `<!--]--></div>`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_next_button$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { nextButton }, getCalendarAttrs } = getCtx$5();
  const attrs = getCalendarAttrs("next-button");
  builder = store_get($$store_subs ??= {}, "$nextButton", nextButton);
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
function Calendar_prev_button$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { prevButton }, getCalendarAttrs } = getCtx$5();
  const attrs = getCalendarAttrs("prev-button");
  builder = store_get($$store_subs ??= {}, "$prevButton", prevButton);
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
function getCheckboxData() {
  const NAME = "checkbox";
  const PARTS = ["root", "input", "indicator"];
  return {
    NAME,
    PARTS
  };
}
function setCtx$3(props) {
  const { NAME, PARTS } = getCheckboxData();
  const getAttrs2 = createBitAttrs(NAME, PARTS);
  const checkbox = { ...createCheckbox(removeUndefined(props)), getAttrs: getAttrs2 };
  setContext(NAME, checkbox);
  return {
    ...checkbox,
    updateOption: getOptionUpdater(checkbox.options)
  };
}
function getCtx$4() {
  const { NAME } = getCheckboxData();
  return getContext(NAME);
}
function Checkbox$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "checked",
    "disabled",
    "name",
    "required",
    "value",
    "onCheckedChange",
    "asChild",
    "el",
    "$$props"
  ]);
  push();
  var $$store_subs;
  let attrs, builder;
  let checked = value_or_fallback($$props["checked"], () => false);
  let disabled = value_or_fallback($$props["disabled"], () => void 0);
  let name2 = value_or_fallback($$props["name"], () => void 0);
  let required = value_or_fallback($$props["required"], () => void 0);
  let value = value_or_fallback($$props["value"], () => void 0);
  let onCheckedChange = value_or_fallback($$props["onCheckedChange"], () => void 0);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { root },
    states: { checked: localChecked },
    updateOption,
    getAttrs: getAttrs2
  } = setCtx$3({
    defaultChecked: checked,
    disabled,
    name: name2,
    required,
    value,
    onCheckedChange: ({ next }) => {
      if (checked !== next) {
        onCheckedChange?.(next);
        checked = next;
      }
      return next;
    }
  });
  attrs = {
    ...getAttrs2("root"),
    disabled: disabled ? true : void 0
  };
  checked !== void 0 && localChecked.set(checked);
  updateOption("disabled", disabled);
  updateOption("name", name2);
  updateOption("required", required);
  updateOption("value", value);
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
  bind_props($$props, {
    checked,
    disabled,
    name: name2,
    required,
    value,
    onCheckedChange,
    asChild,
    el
  });
  pop();
}
function Checkbox_indicator($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let attrs;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    helpers: { isChecked, isIndeterminate },
    states: { checked },
    getAttrs: getAttrs2
  } = getCtx$4();
  function getStateAttr(state) {
    if (state === "indeterminate")
      return "indeterminate";
    if (state)
      return "checked";
    return "unchecked";
  }
  attrs = {
    ...getAttrs2("indicator"),
    "data-state": getStateAttr(store_get($$store_subs ??= {}, "$checked", checked))
  };
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get attrs() {
          return attrs;
        },
        get isChecked() {
          return store_get($$store_subs ??= {}, "$isChecked", isChecked);
        },
        get isIndeterminate() {
          return store_get($$store_subs ??= {}, "$isIndeterminate", isIndeterminate);
        }
      },
      null
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<div${spread_attributes([$$restProps, attrs], true, false, "")}><!--[-->`;
    slot(
      $$payload,
      $$props.children,
      {
        get attrs() {
          return attrs;
        },
        get isChecked() {
          return store_get($$store_subs ??= {}, "$isChecked", isChecked);
        },
        get isIndeterminate() {
          return store_get($$store_subs ??= {}, "$isIndeterminate", isIndeterminate);
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
function getPositioningUpdater(store) {
  return (props = {}) => {
    return updatePositioning$3(store, props);
  };
}
function updatePositioning$3(store, props) {
  const defaultPositioningProps = {
    side: "bottom",
    align: "center",
    sideOffset: 0,
    alignOffset: 0,
    sameWidth: false,
    avoidCollisions: true,
    collisionPadding: 8,
    fitViewport: false,
    strategy: "absolute",
    overlap: false
  };
  const withDefaults = { ...defaultPositioningProps, ...props };
  store.update((prev) => {
    return {
      ...prev,
      placement: joinPlacement(withDefaults.side, withDefaults.align),
      offset: {
        ...prev.offset,
        mainAxis: withDefaults.sideOffset,
        crossAxis: withDefaults.alignOffset
      },
      gutter: 0,
      sameWidth: withDefaults.sameWidth,
      flip: withDefaults.avoidCollisions,
      overflowPadding: withDefaults.collisionPadding,
      boundary: withDefaults.collisionBoundary,
      fitViewport: withDefaults.fitViewport,
      strategy: withDefaults.strategy,
      overlap: withDefaults.overlap
    };
  });
}
function joinPlacement(side, align) {
  if (align === "center")
    return side;
  return `${side}-${align}`;
}
function getContextMenuData() {
  const NAME = "menu";
  const PARTS = [
    "arrow",
    "checkbox-indicator",
    "checkbox-item",
    "content",
    "group",
    "item",
    "label",
    "radio-group",
    "radio-item",
    "separator",
    "sub-content",
    "sub-trigger",
    "trigger"
  ];
  return {
    NAME,
    PARTS
  };
}
function setCtx$2(props) {
  const { NAME, PARTS } = getContextMenuData();
  const getAttrs2 = createBitAttrs("menu", PARTS);
  const contextMenu = { ...createContextMenu(removeUndefined(props)), getAttrs: getAttrs2 };
  setContext(NAME, contextMenu);
  return {
    ...contextMenu,
    updateOption: getOptionUpdater(contextMenu.options)
  };
}
function getCtx$3() {
  const { NAME } = getContextMenuData();
  return getContext(NAME);
}
function updatePositioning$2(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "start"
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx$3();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
function Context_menu($$payload, $$props) {
  push();
  var $$store_subs;
  let closeOnOutsideClick = value_or_fallback($$props["closeOnOutsideClick"], () => void 0);
  let closeOnEscape = value_or_fallback($$props["closeOnEscape"], () => void 0);
  let portal = value_or_fallback($$props["portal"], () => void 0);
  let open = value_or_fallback($$props["open"], () => void 0);
  let onOpenChange = value_or_fallback($$props["onOpenChange"], () => void 0);
  let preventScroll = value_or_fallback($$props["preventScroll"], () => void 0);
  let loop = value_or_fallback($$props["loop"], () => void 0);
  let dir = value_or_fallback($$props["dir"], () => void 0);
  let typeahead = value_or_fallback($$props["typeahead"], () => void 0);
  let closeFocus = value_or_fallback($$props["closeFocus"], () => void 0);
  let disableFocusFirstItem = value_or_fallback($$props["disableFocusFirstItem"], () => void 0);
  let onOutsideClick = value_or_fallback($$props["onOutsideClick"], () => void 0);
  let closeOnItemClick = value_or_fallback($$props["closeOnItemClick"], () => void 0);
  const {
    states: { open: localOpen },
    updateOption,
    ids
  } = setCtx$2({
    closeOnOutsideClick,
    closeOnEscape,
    portal,
    forceVisible: true,
    defaultOpen: open,
    preventScroll,
    loop,
    dir,
    typeahead,
    disableFocusFirstItem,
    closeFocus,
    onOutsideClick,
    closeOnItemClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.menu, ids.trigger], ([$menuId, $triggerId]) => ({ menu: $menuId, trigger: $triggerId }));
  open !== void 0 && localOpen.set(open);
  updateOption("closeOnItemClick", closeOnItemClick);
  updateOption("closeOnOutsideClick", closeOnOutsideClick);
  updateOption("closeOnEscape", closeOnEscape);
  updateOption("portal", portal);
  updateOption("preventScroll", preventScroll);
  updateOption("loop", loop);
  updateOption("dir", dir);
  updateOption("closeFocus", closeFocus);
  updateOption("disableFocusFirstItem", disableFocusFirstItem);
  updateOption("typeahead", typeahead);
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
    closeOnOutsideClick,
    closeOnEscape,
    portal,
    open,
    onOpenChange,
    preventScroll,
    loop,
    dir,
    typeahead,
    closeFocus,
    disableFocusFirstItem,
    onOutsideClick,
    closeOnItemClick
  });
  pop();
}
function getMenuData() {
  const NAME = "menu";
  const SUB_NAME = "menu-submenu";
  const RADIO_GROUP_NAME = "menu-radiogroup";
  const CHECKBOX_ITEM_NAME = "menu-checkboxitem";
  const RADIO_ITEM_NAME = "menu-radioitem";
  const GROUP_NAME = "menu-group";
  const PARTS = [
    "arrow",
    "checkbox-indicator",
    "checkbox-item",
    "content",
    "group",
    "item",
    "label",
    "radio-group",
    "radio-item",
    "radio-indicator",
    "separator",
    "sub-content",
    "sub-trigger",
    "trigger"
  ];
  return {
    NAME,
    SUB_NAME,
    RADIO_GROUP_NAME,
    CHECKBOX_ITEM_NAME,
    RADIO_ITEM_NAME,
    GROUP_NAME,
    PARTS
  };
}
function getCtx$2() {
  const { NAME } = getMenuData();
  return getContext(NAME);
}
function Menu_item($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "href",
    "asChild",
    "disabled",
    "el",
    "$$props"
  ]);
  push();
  var $$store_subs;
  let builder, attrs;
  let href = value_or_fallback($$props["href"], () => void 0);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let disabled = value_or_fallback($$props["disabled"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { item }, getAttrs: getAttrs2 } = getCtx$2();
  builder = store_get($$store_subs ??= {}, "$item", item);
  attrs = {
    ...getAttrs2("item"),
    ...disabledAttrs(disabled)
  };
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
    const $$tag = href ? "a" : "div";
    $$payload.out += `<!--[-->`;
    if ($$tag)
      element(
        $$payload,
        $$tag,
        () => {
          $$payload.out += `${spread_attributes([{ "href": href }, builder, $$restProps], true, false, "")}`;
        },
        () => {
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
        }
      );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { href, asChild, disabled, el });
  pop();
}
function Context_menu_content$1($$payload, $$props) {
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
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "fitViewport",
    "strategy",
    "overlap",
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
  let alignOffset = value_or_fallback($$props["alignOffset"], () => 0);
  let collisionPadding = value_or_fallback($$props["collisionPadding"], () => 8);
  let avoidCollisions = value_or_fallback($$props["avoidCollisions"], () => true);
  let collisionBoundary = value_or_fallback($$props["collisionBoundary"], () => void 0);
  let fitViewport = value_or_fallback($$props["fitViewport"], () => false);
  let strategy = value_or_fallback($$props["strategy"], () => "absolute");
  let overlap = value_or_fallback($$props["overlap"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { menu },
    states: { open },
    ids,
    getAttrs: getAttrs2
  } = getCtx$3();
  const attrs = getAttrs2("content");
  if (id) {
    ids.menu.set(id);
  }
  builder = store_get($$store_subs ??= {}, "$menu", menu);
  Object.assign(builder, attrs);
  updatePositioning$2({
    alignOffset,
    collisionPadding,
    avoidCollisions,
    collisionBoundary,
    fitViewport,
    strategy,
    overlap
  });
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
    alignOffset,
    collisionPadding,
    avoidCollisions,
    collisionBoundary,
    fitViewport,
    strategy,
    overlap,
    el
  });
  pop();
}
function Context_menu_trigger($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "id", "el", "$$props"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let id = value_or_fallback($$props["id"], () => void 0);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { trigger }, ids, getAttrs: getAttrs2 } = getCtx$3();
  const attrs = getAttrs2("trigger");
  if (id) {
    ids.trigger.set(id);
  }
  builder = store_get($$store_subs ??= {}, "$trigger", trigger);
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
  bind_props($$props, { asChild, id, el });
  pop();
}
function getPopoverData() {
  const NAME = "popover";
  const PARTS = ["arrow", "close", "content", "trigger"];
  return {
    NAME,
    PARTS
  };
}
function setCtx$1(props) {
  const { NAME, PARTS } = getPopoverData();
  const getAttrs2 = createBitAttrs(NAME, PARTS);
  const popover = {
    ...createPopover({
      positioning: {
        placement: "bottom",
        gutter: 0
      },
      ...removeUndefined(props),
      forceVisible: true
    }),
    getAttrs: getAttrs2
  };
  setContext(NAME, popover);
  return {
    ...popover,
    updateOption: getOptionUpdater(popover.options)
  };
}
function getCtx$1() {
  const { NAME } = getPopoverData();
  return getContext(NAME);
}
function updatePositioning$1(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "center"
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx$1();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
function Dialog_title$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["level", "asChild", "id", "el", "$$props"]);
  push();
  var $$store_subs;
  let builder;
  let level = value_or_fallback($$props["level"], () => "h2");
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let id = value_or_fallback($$props["id"], () => void 0);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { title }, ids, getAttrs: getAttrs2 } = getCtx$6();
  const attrs = getAttrs2("title");
  if (id) {
    ids.title.set(id);
  }
  builder = store_get($$store_subs ??= {}, "$title", title);
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
    $$payload.out += `<!--[-->`;
    if (level)
      element(
        $$payload,
        level,
        () => {
          $$payload.out += `${spread_attributes([builder, $$restProps], true, false, "")}`;
        },
        () => {
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
        }
      );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { level, asChild, id, el });
  pop();
}
function Dialog_trigger($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { trigger }, getAttrs: getAttrs2 } = getCtx$6();
  const attrs = getAttrs2("trigger");
  builder = store_get($$store_subs ??= {}, "$trigger", trigger);
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
function Dialog_description$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "id", "el", "$$props"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let id = value_or_fallback($$props["id"], () => void 0);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { description }, ids, getAttrs: getAttrs2 } = getCtx$6();
  const attrs = getAttrs2("description");
  if (id) {
    ids.description.set(id);
  }
  builder = store_get($$store_subs ??= {}, "$description", description);
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
  bind_props($$props, { asChild, id, el });
  pop();
}
function getLinkPreviewData() {
  const NAME = "link-preview";
  const PARTS = ["arrow", "content", "trigger"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getLinkPreviewData();
  const getAttrs2 = createBitAttrs(NAME, PARTS);
  const linkPreview = {
    ...createLinkPreview({
      ...removeUndefined(props),
      forceVisible: true
    }),
    getAttrs: getAttrs2
  };
  setContext(NAME, linkPreview);
  return {
    ...linkPreview,
    updateOption: getOptionUpdater(linkPreview.options)
  };
}
function getCtx() {
  const { NAME } = getLinkPreviewData();
  return getContext(NAME);
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "center"
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
function Link_preview($$payload, $$props) {
  push();
  var $$store_subs;
  let open = value_or_fallback($$props["open"], () => void 0);
  let onOpenChange = value_or_fallback($$props["onOpenChange"], () => void 0);
  let openDelay = value_or_fallback($$props["openDelay"], () => 700);
  let closeDelay = value_or_fallback($$props["closeDelay"], () => 300);
  let closeOnOutsideClick = value_or_fallback($$props["closeOnOutsideClick"], () => void 0);
  let closeOnEscape = value_or_fallback($$props["closeOnEscape"], () => void 0);
  let portal = value_or_fallback($$props["portal"], () => void 0);
  let onOutsideClick = value_or_fallback($$props["onOutsideClick"], () => void 0);
  const {
    states: { open: localOpen },
    updateOption,
    ids
  } = setCtx({
    defaultOpen: open,
    openDelay,
    closeDelay,
    closeOnOutsideClick,
    closeOnEscape,
    portal,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.content, ids.trigger], ([$contentId, $triggerId]) => ({ content: $contentId, trigger: $triggerId }));
  open !== void 0 && localOpen.set(open);
  updateOption("openDelay", openDelay);
  updateOption("closeDelay", closeDelay);
  updateOption("closeOnOutsideClick", closeOnOutsideClick);
  updateOption("closeOnEscape", closeOnEscape);
  updateOption("portal", portal);
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
    open,
    onOpenChange,
    openDelay,
    closeDelay,
    closeOnOutsideClick,
    closeOnEscape,
    portal,
    onOutsideClick
  });
  pop();
}
function Link_preview_content($$payload, $$props) {
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
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
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
  let side = value_or_fallback($$props["side"], () => "bottom");
  let align = value_or_fallback($$props["align"], () => "center");
  let sideOffset = value_or_fallback($$props["sideOffset"], () => 0);
  let alignOffset = value_or_fallback($$props["alignOffset"], () => 0);
  let collisionPadding = value_or_fallback($$props["collisionPadding"], () => 8);
  let avoidCollisions = value_or_fallback($$props["avoidCollisions"], () => true);
  let collisionBoundary = value_or_fallback($$props["collisionBoundary"], () => void 0);
  let sameWidth = value_or_fallback($$props["sameWidth"], () => false);
  let fitViewport = value_or_fallback($$props["fitViewport"], () => false);
  let strategy = value_or_fallback($$props["strategy"], () => "absolute");
  let overlap = value_or_fallback($$props["overlap"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { content },
    states: { open },
    ids,
    getAttrs: getAttrs2
  } = getCtx();
  const attrs = getAttrs2("content");
  if (id) {
    ids.content.set(id);
  }
  builder = store_get($$store_subs ??= {}, "$content", content);
  Object.assign(builder, attrs);
  if (store_get($$store_subs ??= {}, "$open", open)) {
    updatePositioning({
      side,
      align,
      sideOffset,
      alignOffset,
      collisionPadding,
      avoidCollisions,
      collisionBoundary,
      sameWidth,
      fitViewport,
      strategy,
      overlap
    });
  }
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
    side,
    align,
    sideOffset,
    alignOffset,
    collisionPadding,
    avoidCollisions,
    collisionBoundary,
    sameWidth,
    fitViewport,
    strategy,
    overlap,
    el
  });
  pop();
}
function Link_preview_trigger($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "id", "el", "$$props"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let id = value_or_fallback($$props["id"], () => void 0);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { trigger }, ids, getAttrs: getAttrs2 } = getCtx();
  const attrs = getAttrs2("trigger");
  if (id) {
    ids.trigger.set(id);
  }
  builder = store_get($$store_subs ??= {}, "$trigger", trigger);
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
    const $$tag = "a";
    $$payload.out += `<!--[-->`;
    element(
      $$payload,
      $$tag,
      () => {
        $$payload.out += `${spread_attributes([builder, $$restProps, attrs], true, false, "")}`;
      },
      () => {
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
      }
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, id, el });
  pop();
}
function Popover($$payload, $$props) {
  push();
  var $$store_subs;
  let disableFocusTrap = value_or_fallback($$props["disableFocusTrap"], () => void 0);
  let closeOnEscape = value_or_fallback($$props["closeOnEscape"], () => void 0);
  let closeOnOutsideClick = value_or_fallback($$props["closeOnOutsideClick"], () => void 0);
  let preventScroll = value_or_fallback($$props["preventScroll"], () => void 0);
  let portal = value_or_fallback($$props["portal"], () => void 0);
  let open = value_or_fallback($$props["open"], () => void 0);
  let onOpenChange = value_or_fallback($$props["onOpenChange"], () => void 0);
  let openFocus = value_or_fallback($$props["openFocus"], () => void 0);
  let closeFocus = value_or_fallback($$props["closeFocus"], () => void 0);
  let onOutsideClick = value_or_fallback($$props["onOutsideClick"], () => void 0);
  const {
    updateOption,
    states: { open: localOpen },
    ids
  } = setCtx$1({
    disableFocusTrap,
    closeOnEscape,
    closeOnOutsideClick,
    preventScroll,
    portal,
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
    },
    positioning: { gutter: 0, offset: { mainAxis: 1 } }
  });
  const idValues = derived([ids.content, ids.trigger], ([$contentId, $triggerId]) => ({ content: $contentId, trigger: $triggerId }));
  open !== void 0 && localOpen.set(open);
  updateOption("disableFocusTrap", disableFocusTrap);
  updateOption("closeOnEscape", closeOnEscape);
  updateOption("closeOnOutsideClick", closeOnOutsideClick);
  updateOption("preventScroll", preventScroll);
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
    disableFocusTrap,
    closeOnEscape,
    closeOnOutsideClick,
    preventScroll,
    portal,
    open,
    onOpenChange,
    openFocus,
    closeFocus,
    onOutsideClick
  });
  pop();
}
function Popover_content$1($$payload, $$props) {
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
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
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
  let side = value_or_fallback($$props["side"], () => "bottom");
  let align = value_or_fallback($$props["align"], () => "center");
  let sideOffset = value_or_fallback($$props["sideOffset"], () => 0);
  let alignOffset = value_or_fallback($$props["alignOffset"], () => 0);
  let collisionPadding = value_or_fallback($$props["collisionPadding"], () => 8);
  let avoidCollisions = value_or_fallback($$props["avoidCollisions"], () => true);
  let collisionBoundary = value_or_fallback($$props["collisionBoundary"], () => void 0);
  let sameWidth = value_or_fallback($$props["sameWidth"], () => false);
  let fitViewport = value_or_fallback($$props["fitViewport"], () => false);
  let strategy = value_or_fallback($$props["strategy"], () => "absolute");
  let overlap = value_or_fallback($$props["overlap"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { content },
    states: { open },
    ids,
    getAttrs: getAttrs2
  } = getCtx$1();
  const attrs = getAttrs2("content");
  if (id) {
    ids.content.set(id);
  }
  builder = store_get($$store_subs ??= {}, "$content", content);
  Object.assign(builder, attrs);
  if (store_get($$store_subs ??= {}, "$open", open)) {
    updatePositioning$1({
      side,
      align,
      sideOffset,
      alignOffset,
      collisionPadding,
      avoidCollisions,
      collisionBoundary,
      sameWidth,
      fitViewport,
      strategy,
      overlap
    });
  }
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
    side,
    align,
    sideOffset,
    alignOffset,
    collisionPadding,
    avoidCollisions,
    collisionBoundary,
    sameWidth,
    fitViewport,
    strategy,
    overlap,
    el
  });
  pop();
}
function Popover_trigger($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "id", "el", "$$props"]);
  push();
  var $$store_subs;
  let attrs, builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let id = value_or_fallback($$props["id"], () => void 0);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { trigger },
    states: { open },
    ids,
    getAttrs: getAttrs2
  } = getCtx$1();
  const bitsAttrs = getAttrs2("trigger");
  if (id) {
    ids.trigger.set(id);
  }
  attrs = {
    ...bitsAttrs,
    "aria-controls": store_get($$store_subs ??= {}, "$open", open) ? ids.content : void 0
  };
  builder = store_get($$store_subs ??= {}, "$trigger", trigger);
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
  bind_props($$props, { asChild, id, el });
  pop();
}
function Alert_triangle($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    ["path", { "d": "M12 9v4" }],
    [
      "path",
      {
        "d": "M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z"
      }
    ],
    ["path", { "d": "M12 16h.01" }]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "alert-triangle" },
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
function Arrows_up($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    ["path", { "d": "M17 3l0 18" }],
    ["path", { "d": "M4 6l3 -3l3 3" }],
    ["path", { "d": "M20 6l-3 -3l-3 3" }],
    ["path", { "d": "M7 3l0 18" }]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "arrows-up" },
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
function Calendar_week($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      {
        "d": "M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"
      }
    ],
    ["path", { "d": "M16 3v4" }],
    ["path", { "d": "M8 3v4" }],
    ["path", { "d": "M4 11h16" }],
    ["path", { "d": "M8 14v4" }],
    ["path", { "d": "M12 14v4" }],
    ["path", { "d": "M16 14v4" }]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "calendar-week" },
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
function Car_crash($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      {
        "d": "M10 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
      }
    ],
    [
      "path",
      {
        "d": "M7 6l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-5m0 -6h8m-6 0v-5m2 0h-4"
      }
    ],
    ["path", { "d": "M14 8v-2" }],
    ["path", { "d": "M19 12h2" }],
    ["path", { "d": "M17.5 15.5l1.5 1.5" }],
    ["path", { "d": "M17.5 8.5l1.5 -1.5" }]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "car-crash" },
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
function Car_garage($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      { "d": "M5 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" }
    ],
    [
      "path",
      { "d": "M15 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" }
    ],
    [
      "path",
      {
        "d": "M5 20h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"
      }
    ],
    ["path", { "d": "M3 6l9 -4l9 4" }]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "car-garage" },
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
function Check$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [["path", { "d": "M5 12l5 5l10 -10" }]];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "check" },
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
function Clock($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" }
    ],
    ["path", { "d": "M12 7v5l3 3" }]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "clock" },
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
function Cloud_rain($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      {
        "d": "M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7"
      }
    ],
    [
      "path",
      { "d": "M11 13v2m0 3v2m4 -5v2m0 3v2" }
    ]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "cloud-rain" },
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
function Dots_vertical($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      {
        "d": "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
      }
    ],
    [
      "path",
      {
        "d": "M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
      }
    ],
    [
      "path",
      { "d": "M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" }
    ]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "dots-vertical" },
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
function Gps($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      {
        "d": "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
      }
    ],
    ["path", { "d": "M12 17l-1 -4l-4 -1l9 -4z" }]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "gps" },
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
function Info_circle($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" }
    ],
    ["path", { "d": "M12 9h.01" }],
    ["path", { "d": "M11 12h1v4h1" }]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "info-circle" },
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
function Layout_sidebar_left_expand($$payload, $$props) {
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
    ["path", { "d": "M14 10l2 2l-2 2" }]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    {
      type: "outline",
      name: "layout-sidebar-left-expand"
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
function Minus_vertical($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [["path", { "d": "M12 5v14" }]];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "minus-vertical" },
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
function School($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      { "d": "M22 9l-10 -4l-10 4l10 4l10 -4v6" }
    ],
    [
      "path",
      { "d": "M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" }
    ]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "school" },
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
function Settings($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      {
        "d": "M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
      }
    ],
    [
      "path",
      { "d": "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" }
    ]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "settings" },
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
function Star($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      {
        "d": "M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
      }
    ]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "star" },
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
function Stars($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      {
        "d": "M17.8 19.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z"
      }
    ],
    [
      "path",
      {
        "d": "M6.2 19.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z"
      }
    ],
    [
      "path",
      {
        "d": "M12 9.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z"
      }
    ]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "stars" },
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
function Tool($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      {
        "d": "M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5"
      }
    ]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { type: "outline", name: "tool" },
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
let filter = "";
let date = today(getLocalTimeZone());
function getScheduleState() {
  return {
    get filter() {
      return filter;
    },
    set filter(f) {
      filter = f;
    },
    get date() {
      return date;
    },
    set date(d) {
      date = d;
    }
  };
}
const getPreviousTuesday = (_date) => {
  const date2 = new Date(_date);
  const dayOfWeek = date2.getDay();
  if (date2.getDay() === 2) {
    return date2;
  }
  const daysUntilTuesday = (dayOfWeek + 5) % 7;
  date2.setDate(date2.getDate() - daysUntilTuesday);
  return date2;
};
const getDateString = (date2) => {
  const year = date2.getFullYear();
  let month = date2.getMonth() + 1;
  let day = date2.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};
const getPreviousTuesdayString = (date2) => {
  const previousTuesday = getPreviousTuesday(date2);
  return getDateString(previousTuesday);
};
function Page_header($$payload, $$props) {
  push();
  let title = $$props["title"];
  $$payload.out += `<div class="border-b-[1px] border-border p-2 px-4"><div class="flex items-center justify-between"><div class="flex items-center gap-2"><div class="flex items-center gap-2"><!--[-->`;
  if (!sidebar.isOpen) {
    $$payload.out += `<div class="flex items-center gap-2 md:hidden"><button class="flex items-center opacity-60 transition hover:opacity-100 md:hidden"><!--[-->`;
    Layout_sidebar_left_expand($$payload, { class: "size-4" });
    $$payload.out += `<!--]--></button> <!--[-->`;
    Minus_vertical($$payload, { class: "opacity-30" });
    $$payload.out += `<!--]--></div>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <!--[-->`;
  if (sidebar.isCollapsed) {
    $$payload.out += `<div class="hidden items-center gap-2 md:flex"><button class="flex items-center opacity-60 transition hover:opacity-100"><!--[-->`;
    Layout_sidebar_left_expand($$payload, { class: "size-4" });
    $$payload.out += `<!--]--></button> <!--[-->`;
    Minus_vertical($$payload, { class: "size-4 opacity-30" });
    $$payload.out += `<!--]--></div>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <div class="flex items-center gap-1"><!--[-->`;
  Calendar_event($$payload, { class: "size-4" });
  $$payload.out += `<!--]--> <span class="font-semibold">${escape(title)}</span></div></div></div> <div class="flex items-center gap-2"><button class="flex h-[24px] w-[24px] items-center justify-center rounded-full"><!--[-->`;
  Dots_vertical($$payload, { class: "size-3" });
  $$payload.out += `<!--]--></button></div></div></div>`;
  bind_props($$props, { title });
  pop();
}
function Calendar($$payload, $$props) {
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
  let size2 = value_or_fallback($$props["size"], () => ctx.size || "24");
  let role = value_or_fallback($$props["role"], () => ctx.role || "img");
  let color = value_or_fallback($$props["color"], () => ctx.color || "currentColor");
  let ariaLabel = value_or_fallback($$props["ariaLabel"], () => "calendar,");
  let withEvents = value_or_fallback($$props["withEvents"], () => false);
  $$payload.out += `<!--[-->`;
  if (withEvents) {
    $$payload.out += `<svg${spread_attributes(
      [
        { "width": size2 },
        { "height": size2 },
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<svg${spread_attributes(
      [
        { "width": size2 },
        { "height": size2 },
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { size: size2, role, color, ariaLabel, withEvents });
  pop();
}
function Button($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "variant",
    "size",
    "builders",
    "$$props"
  ]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let variant = value_or_fallback($$props["variant"], () => "default");
  let size2 = value_or_fallback($$props["size"], () => "default");
  let builders = value_or_fallback($$props["builders"], () => []);
  $$payload.out += `<!--[-->`;
  Button$1($$payload, spread_props([
    {
      builders,
      class: cn(buttonVariants({ variant, size: size2, className })),
      type: "button"
    },
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
  bind_props($$props, { class: className, variant, size: size2, builders });
  pop();
}
const buttonVariants = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function Calendar_1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "value",
    "placeholder",
    "weekdayFormat",
    "class",
    "$$props"
  ]);
  push();
  let value = value_or_fallback($$props["value"], () => void 0);
  let placeholder = value_or_fallback($$props["placeholder"], () => void 0);
  let weekdayFormat = value_or_fallback($$props["weekdayFormat"], () => "short");
  let className = value_or_fallback($$props["class"], () => void 0);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!--[-->`;
    Calendar$1($$payload2, spread_props([
      {
        get value() {
          return value;
        },
        set value($$value) {
          value = $$value;
          $$settled = false;
        },
        get placeholder() {
          return placeholder;
        },
        set placeholder($$value) {
          placeholder = $$value;
          $$settled = false;
        },
        weekdayFormat,
        class: cn("p-3", className)
      },
      $$restProps,
      {
        children: ($$payload3, $$slotProps) => {
          const months = $$slotProps.months;
          const weekdays = $$slotProps.weekdays;
          $$payload3.out += `<!--[-->`;
          Calendar_header($$payload3, {
            children: ($$payload4, $$slotProps2) => {
              $$payload4.out += `<!--[-->`;
              Calendar_prev_button($$payload4, {});
              $$payload4.out += `<!--]--> <!--[-->`;
              Calendar_heading($$payload4, {});
              $$payload4.out += `<!--]--> <!--[-->`;
              Calendar_next_button($$payload4, {});
              $$payload4.out += `<!--]-->`;
            }
          });
          $$payload3.out += `<!--]--> <!--[-->`;
          Calendar_months($$payload3, {
            children: ($$payload4, $$slotProps2) => {
              const each_array = ensure_array_like(months);
              $$payload4.out += `<!--[-->`;
              for (let $$index_3 = 0; $$index_3 < each_array.length; $$index_3++) {
                const month = each_array[$$index_3];
                $$payload4.out += "<!--[-->";
                $$payload4.out += `<!--[-->`;
                Calendar_grid($$payload4, {
                  children: ($$payload5, $$slotProps3) => {
                    $$payload5.out += `<!--[-->`;
                    Calendar_grid_head($$payload5, {
                      children: ($$payload6, $$slotProps4) => {
                        $$payload6.out += `<!--[-->`;
                        Calendar_grid_row($$payload6, {
                          class: "flex",
                          children: ($$payload7, $$slotProps5) => {
                            const each_array_1 = ensure_array_like(weekdays);
                            $$payload7.out += `<!--[-->`;
                            for (let $$index = 0; $$index < each_array_1.length; $$index++) {
                              const weekday = each_array_1[$$index];
                              $$payload7.out += "<!--[-->";
                              $$payload7.out += `<!--[-->`;
                              Calendar_head_cell($$payload7, {
                                children: ($$payload8, $$slotProps6) => {
                                  $$payload8.out += `${escape(weekday.slice(0, 2))}`;
                                }
                              });
                              $$payload7.out += `<!--]-->`;
                              $$payload7.out += "<!--]-->";
                            }
                            $$payload7.out += "<!--]-->";
                          }
                        });
                        $$payload6.out += `<!--]-->`;
                      }
                    });
                    $$payload5.out += `<!--]--> <!--[-->`;
                    Calendar_grid_body($$payload5, {
                      children: ($$payload6, $$slotProps4) => {
                        const each_array_2 = ensure_array_like(month.weeks);
                        $$payload6.out += `<!--[-->`;
                        for (let $$index_2 = 0; $$index_2 < each_array_2.length; $$index_2++) {
                          const weekDates = each_array_2[$$index_2];
                          $$payload6.out += "<!--[-->";
                          $$payload6.out += `<!--[-->`;
                          Calendar_grid_row($$payload6, {
                            class: "mt-2 w-full",
                            children: ($$payload7, $$slotProps5) => {
                              const each_array_3 = ensure_array_like(weekDates);
                              $$payload7.out += `<!--[-->`;
                              for (let $$index_1 = 0; $$index_1 < each_array_3.length; $$index_1++) {
                                const date2 = each_array_3[$$index_1];
                                $$payload7.out += "<!--[-->";
                                $$payload7.out += `<!--[-->`;
                                Calendar_cell($$payload7, {
                                  date: date2,
                                  children: ($$payload8, $$slotProps6) => {
                                    $$payload8.out += `<!--[-->`;
                                    Calendar_day($$payload8, { date: date2, month: month.value });
                                    $$payload8.out += `<!--]-->`;
                                  }
                                });
                                $$payload7.out += `<!--]-->`;
                                $$payload7.out += "<!--]-->";
                              }
                              $$payload7.out += "<!--]-->";
                            }
                          });
                          $$payload6.out += `<!--]-->`;
                          $$payload6.out += "<!--]-->";
                        }
                        $$payload6.out += "<!--]-->";
                      }
                    });
                    $$payload5.out += `<!--]-->`;
                  }
                });
                $$payload4.out += `<!--]-->`;
                $$payload4.out += "<!--]-->";
              }
              $$payload4.out += "<!--]-->";
            }
          });
          $$payload3.out += `<!--]-->`;
        }
      }
    ]));
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, {
    value,
    placeholder,
    weekdayFormat,
    class: className
  });
  pop();
}
function Calendar_cell($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["date", "class", "$$props"]);
  push();
  let date2 = $$props["date"];
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Calendar_cell$1($$payload, spread_props([
    {
      date: date2,
      class: cn("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-accent [&:has([data-selected][data-outside-month])]:bg-accent/50", className)
    },
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
  bind_props($$props, { date: date2, class: className });
  pop();
}
function Calendar_day($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["date", "month", "class", "$$props"]);
  push();
  let date2 = $$props["date"];
  let month = $$props["month"];
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Calendar_day$1($$payload, spread_props([
    {
      date: date2,
      month,
      class: cn(
        buttonVariants({ variant: "ghost" }),
        "h-8 w-8 p-0 font-normal",
        // Today
        "[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground",
        // Selected
        "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground",
        // Disabled
        "data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
        // Unavailable
        "data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through",
        // Outside months
        "data-[outside-month]:pointer-events-none data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground [&[data-outside-month][data-selected]]:opacity-30",
        className
      )
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const selected = $$slotProps.selected;
        const disabled = $$slotProps.disabled;
        const unavailable = $$slotProps.unavailable;
        const builder = $$slotProps.builder;
        $$payload2.out += `<!--[-->`;
        slot(
          $$payload2,
          $$props.children,
          {
            get selected() {
              return selected;
            },
            get disabled() {
              return disabled;
            },
            get unavailable() {
              return unavailable;
            },
            get builder() {
              return builder;
            }
          },
          () => {
            $$payload2.out += `${escape(date2.day)}`;
          }
        );
        $$payload2.out += `<!--]-->`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, { date: date2, month, class: className });
  pop();
}
function Calendar_grid($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Calendar_grid$1($$payload, spread_props([
    {
      class: cn("w-full border-collapse space-y-1", className)
    },
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
function Calendar_header($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Calendar_header$1($$payload, spread_props([
    {
      class: cn("relative flex w-full items-center justify-between pt-1", className)
    },
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
function Calendar_months($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<div${spread_attributes(
    [
      {
        "class": cn("mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0", className)
      },
      $$restProps
    ],
    true,
    false,
    ""
  )}><!--[-->`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { class: className });
  pop();
}
function Calendar_grid_row($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Calendar_grid_row$1($$payload, spread_props([
    { class: cn("flex", className) },
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
function Calendar_heading($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Calendar_heading$1($$payload, spread_props([
    {
      class: cn("text-sm font-medium", className)
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const headingValue = $$slotProps.headingValue;
        $$payload2.out += `<!--[-->`;
        slot(
          $$payload2,
          $$props.children,
          {
            get headingValue() {
              return headingValue;
            }
          },
          () => {
            $$payload2.out += `${escape(headingValue)}`;
          }
        );
        $$payload2.out += `<!--]-->`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, { class: className });
  pop();
}
function Calendar_grid_body($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Calendar_grid_body$1($$payload, spread_props([
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
function Calendar_grid_head($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Calendar_grid_head$1($$payload, spread_props([
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
function Calendar_head_cell($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Calendar_head_cell$1($$payload, spread_props([
    {
      class: cn("w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground", className)
    },
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
function ChevronRight($$payload, $$props) {
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
  let size2 = value_or_fallback($$props["size"], () => ctx.size || "24");
  let role = value_or_fallback($$props["role"], () => ctx.role || "img");
  let color = value_or_fallback($$props["color"], () => ctx.color || "currentColor");
  let ariaLabel = value_or_fallback($$props["ariaLabel"], () => "chevron right,");
  let withEvents = value_or_fallback($$props["withEvents"], () => false);
  $$payload.out += `<!--[-->`;
  if (withEvents) {
    $$payload.out += `<svg${spread_attributes(
      [
        { "width": size2 },
        { "height": size2 },
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<svg${spread_attributes(
      [
        { "width": size2 },
        { "height": size2 },
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { size: size2, role, color, ariaLabel, withEvents });
  pop();
}
function Calendar_next_button($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Calendar_next_button$1($$payload, spread_props([
    {
      class: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100", className)
    },
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
          () => {
            $$payload2.out += `<!--[-->`;
            ChevronRight($$payload2, { class: "h-4 w-4" });
            $$payload2.out += `<!--]-->`;
          }
        );
        $$payload2.out += `<!--]-->`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, { class: className });
  pop();
}
function ChevronLeft($$payload, $$props) {
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
  let size2 = value_or_fallback($$props["size"], () => ctx.size || "24");
  let role = value_or_fallback($$props["role"], () => ctx.role || "img");
  let color = value_or_fallback($$props["color"], () => ctx.color || "currentColor");
  let ariaLabel = value_or_fallback($$props["ariaLabel"], () => "chevron left,");
  let withEvents = value_or_fallback($$props["withEvents"], () => false);
  $$payload.out += `<!--[-->`;
  if (withEvents) {
    $$payload.out += `<svg${spread_attributes(
      [
        { "width": size2 },
        { "height": size2 },
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<svg${spread_attributes(
      [
        { "width": size2 },
        { "height": size2 },
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { size: size2, role, color, ariaLabel, withEvents });
  pop();
}
function Calendar_prev_button($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Calendar_prev_button$1($$payload, spread_props([
    {
      class: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100", className)
    },
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
          () => {
            $$payload2.out += `<!--[-->`;
            ChevronLeft($$payload2, { class: "h-4 w-4" });
            $$payload2.out += `<!--]-->`;
          }
        );
        $$payload2.out += `<!--]-->`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, { class: className });
  pop();
}
function Popover_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "transition",
    "transitionConfig",
    "align",
    "sideOffset",
    "$$props"
  ]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let transition = value_or_fallback($$props["transition"], () => flyAndScale);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], () => void 0);
  let align = value_or_fallback($$props["align"], () => "center");
  let sideOffset = value_or_fallback($$props["sideOffset"], () => 4);
  $$payload.out += `<!--[-->`;
  Popover_content$1($$payload, spread_props([
    {
      transition,
      transitionConfig,
      align,
      sideOffset
    },
    $$restProps,
    {
      class: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none", className),
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `<!--]-->`;
      }
    }
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    class: className,
    transition,
    transitionConfig,
    align,
    sideOffset
  });
  pop();
}
const Root$3 = Popover;
const Trigger$3 = Popover_trigger;
function Date_picker($$payload, $$props) {
  push();
  const df = new DateFormatter("en-US", { dateStyle: "long" });
  let className = value_or_fallback($$props["class"], () => void 0);
  let value = value_or_fallback($$props["value"], () => void 0);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!--[-->`;
    Root$3($$payload2, {
      children: ($$payload3, $$slotProps) => {
        $$payload3.out += `<!--[-->`;
        Trigger$3($$payload3, {
          asChild: true,
          children: ($$payload4, $$slotProps2) => {
            const builder = $$slotProps2.builder;
            $$payload4.out += `<!--[-->`;
            Button($$payload4, {
              variant: "outline",
              class: cn("w-[240px] justify-start text-left font-normal", !value && "text-muted-foreground", className),
              builders: [builder],
              children: ($$payload5, $$slotProps3) => {
                $$payload5.out += `<!--[-->`;
                Calendar($$payload5, { class: "mr-2 h-4 w-4" });
                $$payload5.out += `<!--]--> ${escape(value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date")}`;
              }
            });
            $$payload4.out += `<!--]-->`;
          }
        });
        $$payload3.out += `<!--]--> <!--[-->`;
        Popover_content($$payload3, {
          class: "w-auto p-0",
          align: "start",
          children: ($$payload4, $$slotProps2) => {
            $$payload4.out += `<!--[-->`;
            Calendar_1($$payload4, {
              get value() {
                return value;
              },
              set value($$value) {
                value = $$value;
                $$settled = false;
              },
              preventDeselect: true,
              weekStartsOn: 2
            });
            $$payload4.out += `<!--]-->`;
          }
        });
        $$payload3.out += `<!--]-->`;
      }
    });
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { class: className, value });
  pop();
}
function Table_filters_button($$payload, $$props) {
  push();
  $$payload.out += `<div class="flex h-[30px] items-center gap-1 rounded-lg border border-border px-2 text-xs font-medium shadow-sm" variant="outline"><!--[-->`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `<!--]--></div>`;
  pop();
}
function Dialog_title($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Dialog_title$1($$payload, spread_props([
    {
      class: cn("text-lg font-semibold leading-none tracking-tight", className)
    },
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
function Dialog_portal($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["$$props"]);
  push();
  $$payload.out += `<!--[-->`;
  Dialog_portal$1($$payload, spread_props([
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
  pop();
}
function Dialog_header($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<div${spread_attributes(
    [
      {
        "class": cn("flex flex-col space-y-1.5 text-center sm:text-left", className)
      },
      $$restProps
    ],
    true,
    false,
    ""
  )}><!--[-->`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { class: className });
  pop();
}
function Dialog_overlay($$payload, $$props) {
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
  Dialog_overlay$1($$payload, spread_props([
    {
      transition,
      transitionConfig,
      class: cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm ", className)
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
function Dialog_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "transition",
    "transitionConfig",
    "$$props"
  ]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let transition = value_or_fallback($$props["transition"], () => flyAndScale);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], () => ({ duration: 200 }));
  $$payload.out += `<!--[-->`;
  Dialog_portal($$payload, {
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<!--[-->`;
      Dialog_overlay($$payload2, {});
      $$payload2.out += `<!--]--> <!--[-->`;
      Dialog_content$1($$payload2, spread_props([
        {
          transition,
          transitionConfig,
          class: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full", className)
        },
        $$restProps,
        {
          children: ($$payload3, $$slotProps2) => {
            $$payload3.out += `<!--[-->`;
            slot($$payload3, $$props.children, {}, null);
            $$payload3.out += `<!--]--> <!--[-->`;
            Dialog_close($$payload3, {
              class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
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
    transition,
    transitionConfig
  });
  pop();
}
function Dialog_description($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Dialog_description$1($$payload, spread_props([
    {
      class: cn("text-sm text-muted-foreground", className)
    },
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
const Root$2 = Dialog;
const Trigger$2 = Dialog_trigger;
function Check($$payload, $$props) {
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
  let size2 = value_or_fallback($$props["size"], () => ctx.size || "24");
  let role = value_or_fallback($$props["role"], () => ctx.role || "img");
  let color = value_or_fallback($$props["color"], () => ctx.color || "currentColor");
  let ariaLabel = value_or_fallback($$props["ariaLabel"], () => "check,");
  let withEvents = value_or_fallback($$props["withEvents"], () => false);
  $$payload.out += `<!--[-->`;
  if (withEvents) {
    $$payload.out += `<svg${spread_attributes(
      [
        { "width": size2 },
        { "height": size2 },
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<svg${spread_attributes(
      [
        { "width": size2 },
        { "height": size2 },
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { size: size2, role, color, ariaLabel, withEvents });
  pop();
}
function Minus($$payload, $$props) {
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
  let size2 = value_or_fallback($$props["size"], () => ctx.size || "24");
  let role = value_or_fallback($$props["role"], () => ctx.role || "img");
  let color = value_or_fallback($$props["color"], () => ctx.color || "currentColor");
  let ariaLabel = value_or_fallback($$props["ariaLabel"], () => "minus,");
  let withEvents = value_or_fallback($$props["withEvents"], () => false);
  $$payload.out += `<!--[-->`;
  if (withEvents) {
    $$payload.out += `<svg${spread_attributes(
      [
        { "width": size2 },
        { "height": size2 },
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<svg${spread_attributes(
      [
        { "width": size2 },
        { "height": size2 },
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
    )}><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z" fill="currentColor"></path></svg>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { size: size2, role, color, ariaLabel, withEvents });
  pop();
}
function Checkbox($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "checked", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let checked = value_or_fallback($$props["checked"], () => false);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!--[-->`;
    Checkbox$1($$payload2, spread_props([
      {
        class: cn("peer box-content h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[disabled=true]:opacity-50", className),
        get checked() {
          return checked;
        },
        set checked($$value) {
          checked = $$value;
          $$settled = false;
        }
      },
      $$restProps,
      {
        children: ($$payload3, $$slotProps) => {
          $$payload3.out += `<!--[-->`;
          Checkbox_indicator($$payload3, {
            class: cn("flex h-4 w-4 items-center justify-center text-current"),
            children: ($$payload4, $$slotProps2) => {
              const isChecked = $$slotProps2.isChecked;
              const isIndeterminate = $$slotProps2.isIndeterminate;
              $$payload4.out += `<!--[-->`;
              if (isIndeterminate) {
                $$payload4.out += `<!--[-->`;
                Minus($$payload4, { class: "h-3.5 w-3.5" });
                $$payload4.out += `<!--]-->`;
                $$payload4.out += "<!--]-->";
              } else {
                $$payload4.out += `<!--[-->`;
                Check($$payload4, {
                  class: cn("h-3.5 w-3.5", !isChecked && "text-transparent")
                });
                $$payload4.out += `<!--]-->`;
                $$payload4.out += "<!--]!-->";
              }
            }
          });
          $$payload3.out += `<!--]-->`;
        }
      }
    ]));
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { class: className, checked });
  pop();
}
function Table_filters_settings($$payload, $$props) {
  push();
  let { columns: columns2, columnState } = $$props;
  const handleVisibilityChange = async (columnId, checked) => {
    console.log("---", columnState);
    columnState.visibility[columnId] = checked;
    await fetch("/api/session/column", {
      method: "PUT",
      body: JSON.stringify({ id: columnId, checked })
    });
  };
  $$payload.out += `<!--[-->`;
  Root$2($$payload, {
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<!--[-->`;
      Trigger$2($$payload2, {
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<!--[-->`;
          Table_filters_button($$payload3, {
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<!--[-->`;
              Settings($$payload4, { class: "size-4 opacity-60" });
              $$payload4.out += `<!--]--> <span>View Settings</span>`;
            }
          });
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!--]--> <!--[-->`;
      Dialog_content($$payload2, {
        children: ($$payload3, $$slotProps2) => {
          const each_array = ensure_array_like(columns2);
          $$payload3.out += `<!--[-->`;
          Dialog_header($$payload3, {
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<!--[-->`;
              Dialog_title($$payload4, {
                children: ($$payload5, $$slotProps4) => {
                  $$payload5.out += `Settings`;
                }
              });
              $$payload4.out += `<!--]--> <!--[-->`;
              Dialog_description($$payload4, {
                children: ($$payload5, $$slotProps4) => {
                  $$payload5.out += `Customize your view`;
                }
              });
              $$payload4.out += `<!--]-->`;
            }
          });
          $$payload3.out += `<!--]--> <div class="flex flex-col gap-1 px-2"><!--[-->`;
          for (let $$index = 0; $$index < each_array.length; $$index++) {
            const column = each_array[$$index];
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<div class="flex items-center gap-1 space-x-2"><!--[-->`;
            Checkbox($$payload3, {
              id: column.id,
              checked: columnState.visibility[column.id] !== false,
              onCheckedChange: (checked) => handleVisibilityChange(column.id, checked)
            });
            $$payload3.out += `<!--]--> <label${attr("for", column.id, false)}>${escape(column.label)}</label></div>`;
            $$payload3.out += "<!--]-->";
          }
          $$payload3.out += "<!--]-->";
          $$payload3.out += `</div>`;
        }
      });
      $$payload2.out += `<!--]-->`;
    }
  });
  $$payload.out += `<!--]-->`;
  pop();
}
function Table_filters($$payload, $$props) {
  push();
  let { columns: columns2, columnState } = $$props;
  const schedule = getScheduleState();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="flex items-center justify-between px-4 py-3"><div class="flex items-center justify-center gap-2"><!--[-->`;
    Date_picker($$payload2, {
      class: "border-ston-200 h-[30px] text-xs font-normal tracking-tight shadow-sm",
      get value() {
        return schedule.date;
      },
      set value($$value) {
        schedule.date = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!--]--></div> <div class="hidden items-center gap-2 md:flex"><!--[-->`;
    Table_filters_settings($$payload2, { columns: columns2, columnState });
    $$payload2.out += `<!--]--></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function Table_body($$payload, $$props) {
  push();
  let columns2 = value_or_fallback($$props["columns"], () => []);
  let favorite = $$props["favorite"];
  let rows = value_or_fallback($$props["rows"], () => []);
  const each_array = ensure_array_like(rows);
  $$payload.out += `<tbody><!--[-->`;
  for (let $$index_1 = 0; $$index_1 < each_array.length; $$index_1++) {
    const row = each_array[$$index_1];
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(columns2);
    $$payload.out += `<tr class="border-b"><!--[-->`;
    for (let $$index = 0; $$index < each_array_1.length; $$index++) {
      const column = each_array_1[$$index];
      $$payload.out += "<!--[-->";
      $$payload.out += `<td${attr("class", cn("border-r last:border-r-0", column.class), false)}><div${attr("class", cn("flex items-center gap-2 p-2", column.contentClass), false)}><!--[-->`;
      if (column.Component) {
        $$payload.out += `<!--[-->`;
        column.Component?.($$payload, { column, favorite, row });
        $$payload.out += `<!--]-->`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `${escape(column.getValue(row))}`;
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += `</div></td>`;
      $$payload.out += "<!--]-->";
    }
    $$payload.out += "<!--]-->";
    $$payload.out += `</tr>`;
    $$payload.out += "<!--]-->";
  }
  $$payload.out += "<!--]-->";
  $$payload.out += `</tbody>`;
  bind_props($$props, { columns: columns2, favorite, rows });
  pop();
}
function Table_header($$payload, $$props) {
  push();
  let columns2 = $$props["columns"];
  const each_array = ensure_array_like(columns2);
  $$payload.out += `<thead class="sticky -top-[1px] z-[10] max-h-[20px] border-y bg-background"><tr class="w-full border-y"><!--[-->`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const column = each_array[$$index];
    $$payload.out += "<!--[-->";
    $$payload.out += `<td${attr("class", cn("border-r last:border-r-0", column.class), false)}><div class="flex items-center gap-1 overflow-hidden text-ellipsis text-nowrap p-2 text-sm font-normal"${attr("title", column.label, false)}><!--[-->`;
    column.Icon?.($$payload, { class: "size-4 opacity-60" });
    $$payload.out += `<!--]--> <span class="w-full overflow-hidden text-ellipsis opacity-70">${escape(column.label)}</span></div></td>`;
    $$payload.out += "<!--]-->";
  }
  $$payload.out += "<!--]-->";
  $$payload.out += `</tr></thead>`;
  bind_props($$props, { columns: columns2 });
  pop();
}
function Table($$payload, $$props) {
  push();
  let columns2 = $$props["columns"];
  let favorite = $$props["favorite"];
  let rows = $$props["rows"];
  $$payload.out += `<table class="h-full w-full min-w-[825px] table-fixed border-collapse text-xs"><!--[-->`;
  Table_header($$payload, { columns: columns2 });
  $$payload.out += `<!--]--><!--[-->`;
  Table_body($$payload, { columns: columns2, favorite, rows });
  $$payload.out += `<!--]--></table>`;
  bind_props($$props, { columns: columns2, favorite, rows });
  pop();
}
function Hover_card_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "align",
    "sideOffset",
    "transition",
    "transitionConfig",
    "$$props"
  ]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let align = value_or_fallback($$props["align"], () => "center");
  let sideOffset = value_or_fallback($$props["sideOffset"], () => 4);
  let transition = value_or_fallback($$props["transition"], () => flyAndScale);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], () => void 0);
  $$payload.out += `<!--[-->`;
  Link_preview_content($$payload, spread_props([
    {
      transition,
      transitionConfig,
      sideOffset,
      align,
      class: cn("z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none", className)
    },
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
  bind_props($$props, {
    class: className,
    align,
    sideOffset,
    transition,
    transitionConfig
  });
  pop();
}
const Root$1 = Link_preview;
const Trigger$1 = Link_preview_trigger;
function Free_icon($$payload, $$props) {
  push();
  $$payload.out += `<div class="w-fit rounded-md border border-gray-400/80 bg-gray-200/40 px-[6px] text-xs text-gray-800 opacity-80 group-hover:opacity-100 dark:border-gray-400/80 dark:bg-gray-800/20 dark:text-gray-400/80">FREE</div>`;
  pop();
}
function Cell_cars($$payload, $$props) {
  push();
  let cars;
  let column = $$props["column"];
  let row = $$props["row"];
  cars = column.getValue(row);
  $$payload.out += `<!--[-->`;
  Root$1($$payload, {
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<!--[-->`;
      Trigger$1($$payload2, {
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<div class="group flex flex-row flex-wrap items-baseline gap-1 text-wrap"><!--[-->`;
          if (row.hasFreeCar) {
            $$payload3.out += `<!--[-->`;
            Free_icon($$payload3);
            $$payload3.out += `<!--]-->`;
            $$payload3.out += "<!--]-->";
          } else {
            $$payload3.out += "<!--]!-->";
          }
          $$payload3.out += ` ${escape(cars)}</div>`;
        }
      });
      $$payload2.out += `<!--]--> <!--[-->`;
      Hover_card_content($$payload2, {
        class: "flex w-fit flex-col gap-2 text-sm",
        children: ($$payload3, $$slotProps2) => {
          const each_array = ensure_array_like(row.cars);
          $$payload3.out += `<div class="text-md font-semibold">Cars:</div> <ul><!--[-->`;
          for (let $$index = 0; $$index < each_array.length; $$index++) {
            const car = each_array[$$index];
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<li>${escape(car.carName)}</li>`;
            $$payload3.out += "<!--]-->";
          }
          $$payload3.out += "<!--]-->";
          $$payload3.out += `</ul>`;
        }
      });
      $$payload2.out += `<!--]-->`;
    }
  });
  $$payload.out += `<!--]-->`;
  bind_props($$props, { column, row });
  pop();
}
function Cell_category($$payload, $$props) {
  push();
  let category;
  let column = $$props["column"];
  let row = $$props["row"];
  category = column.getValue(row);
  $$payload.out += `<div class="category flex flex-row items-center gap-2 svelte-1skwqrs"><!--[-->`;
  if (category === Categories.OVAL) {
    $$payload.out += `<!--[-->`;
    Oval_icon?.($$payload);
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<!--[-->`;
    if (category === Categories.SPORTS_CAR) {
      $$payload.out += `<!--[-->`;
      Sports_car_icon?.($$payload);
      $$payload.out += `<!--]-->`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += `<!--[-->`;
      if (category === Categories.FORMULA_CAR) {
        $$payload.out += `<!--[-->`;
        Formula_car_icon?.($$payload);
        $$payload.out += `<!--]-->`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `<!--[-->`;
        if (category === Categories.DIRT_OVAL) {
          $$payload.out += `<!--[-->`;
          Dirt_oval_icon?.($$payload);
          $$payload.out += `<!--]-->`;
          $$payload.out += "<!--]-->";
        } else {
          $$payload.out += `<!--[-->`;
          if (category === Categories.DIRT_ROAD) {
            $$payload.out += `<!--[-->`;
            Dirt_road_icon?.($$payload);
            $$payload.out += `<!--]-->`;
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
  $$payload.out += ` ${escape(category)}</div>`;
  bind_props($$props, { column, row });
  pop();
}
function Cell_check($$payload, $$props) {
  push();
  let isChecked;
  let column = $$props["column"];
  let row = $$props["row"];
  isChecked = column.getValue(row);
  $$payload.out += `<!--[-->`;
  if (isChecked) {
    $$payload.out += `<!--[-->`;
    Check$1($$payload, { class: "size-3" });
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { column, row });
  pop();
}
const LicenseGroupNames = {
  [
    1
    /* Rookie */
  ]: "Rookie",
  [
    2
    /* D */
  ]: "D class",
  [
    3
    /* C */
  ]: "C class",
  [
    4
    /* B */
  ]: "B class",
  [
    5
    /* A */
  ]: "A class",
  [
    6
    /* Pro */
  ]: "Pro"
};
const LicenseColors = new Proxy(
  {
    [
      1
      /* Rookie */
    ]: "red",
    [
      2
      /* D */
    ]: "orange",
    [
      3
      /* C */
    ]: "yellow",
    [
      4
      /* B */
    ]: "green",
    [
      5
      /* A */
    ]: "blue",
    [
      6
      /* Pro */
    ]: "fuchsia"
  },
  {
    // @ts-expect-error TODO
    get: (target, key) => {
      return target[key] ?? "gray";
    }
  }
);
function Cell_class_icon($$payload, $$props) {
  push();
  let licenseGroup, className, color;
  let column = $$props["column"];
  let row = $$props["row"];
  licenseGroup = column.getValue(row);
  className = LicenseGroupNames[licenseGroup];
  color = LicenseColors[licenseGroup];
  $$payload.out += `<div${attr("class", cn("flex w-fit items-center justify-center rounded-sm px-[6px] py-[2px] text-xs", `border-${color}-400/80 bg-${color}-200/40 border text-${color}-800 dark:text-${color}-400/80 dark:bg-${color}-800/20 dark:border-${color}-800`), false)}>${escape(className)}</div>`;
  bind_props($$props, { column, row });
  pop();
}
function nearestFutureDate(dates, target) {
  if (!target) {
    target = Date.now();
  } else if (target instanceof Date) {
    target = target.getTime();
  }
  let nearest = Infinity;
  let winner = -1;
  dates.forEach(function(date2, index) {
    if (date2 instanceof Date) {
      date2 = date2.getTime();
    }
    if (date2 < target)
      return;
    const distance = Math.abs(date2 - target);
    if (distance < nearest) {
      nearest = distance;
      winner = index;
    }
  });
  return winner;
}
new DateFormatter("en-US", {
  dateStyle: "long"
});
const getRaceTimes = (raceTimeDescriptor, startDate) => {
  const { repeatMinutes, firstSessionTime, sessionTimes } = raceTimeDescriptor;
  if (sessionTimes) {
    return sessionTimes.map((sessionTime) => new Date(sessionTime));
  }
  if (!firstSessionTime || !repeatMinutes)
    return [];
  const start = firstSessionTime.split(":");
  const hToAdd = Math.floor(repeatMinutes / 60);
  const mToAdd = repeatMinutes % 60;
  const times = [];
  let h = +start.at(0), m = +start.at(1);
  const currentDate = /* @__PURE__ */ new Date();
  const raceDate = new Date(startDate) < currentDate ? currentDate.toISOString().split("T")[0] : startDate;
  do {
    const d = new Date(raceDate);
    d.setUTCHours(h);
    d.setMinutes(m);
    d.setSeconds(0);
    h = h + hToAdd;
    m = m + mToAdd;
    if (m >= 60) {
      m = m - 60;
      h = h + 1;
    }
    times.push(d);
  } while (h <= 24 && m <= 60);
  return times;
};
const getMinutesToNextRace = (times) => {
  if (!times || times.length === 0)
    return void 0;
  const time = /* @__PURE__ */ new Date();
  const index = nearestFutureDate(times, time);
  if (index < 0)
    return void 0;
  const date2 = times[index];
  const delta = date2.getTime() - time.getTime();
  const minutes = Math.round(delta / 1e3 / 60);
  return minutes;
};
function Cell_next_race($$payload, $$props) {
  push();
  let times, minutesToNextRace;
  let row = $$props["row"];
  const iconBackClassName = "absolute size-[10px]";
  const iconClassName = "size-[10px] animate-[ping_1.25s_ease-in-out_infinite] opacity-80";
  const getClassName = () => {
    if (minutesToNextRace === void 0)
      return "";
    if (minutesToNextRace <= 2)
      return "bg-red-200/40 text-red-800 border-red-400/80 dark:bg-red-800/20 dark:text-red-400/80 dark:border-800";
    if (minutesToNextRace <= 5)
      return "bg-orange-200/40 text-orange-800 border-orange-400/80 dark:bg-orange-800/20 dark:text-orange-400/80 dark:border-800";
    if (minutesToNextRace <= 10)
      return "bg-yellow-200/40 text-yellow-800 border-yellow-400/80 dark:bg-yellow-800/20 dark:text-yellow-400/80 dark:border-800";
    if (minutesToNextRace <= 30)
      return "bg-green-200/40 text-green-800 border-green-400/80	dark:bg-green-800/20 dark:text-green-400/80 dark:border-800";
    if (minutesToNextRace <= 60)
      return "bg-blue-200/40 text-blue-800 border-blue-400/80 dark:bg-blue-800/20 dark:text-blue-400/80 dark:border-800";
    return "bg-gray-200/40 text-gray-800 border-gray-400/80 dark:bg-gray-800/20 dark:text-gray-400/80 dark:border-800";
  };
  times = getRaceTimes(row.raceTimeDescriptors[0], row.startDate);
  minutesToNextRace = getMinutesToNextRace(times);
  $$payload.out += `<!--[-->`;
  if (minutesToNextRace !== void 0) {
    $$payload.out += `<div${attr("class", cn("flex flex-row items-center gap-1 rounded-md border px-[6px] py-[2px] text-xs", getClassName()), false)}><!--[-->`;
    if (minutesToNextRace <= 5) {
      $$payload.out += `<!--[-->`;
      Alert_triangle($$payload, { class: iconBackClassName });
      $$payload.out += `<!--]--> <!--[-->`;
      Alert_triangle($$payload, { class: iconClassName });
      $$payload.out += `<!--]-->`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += `<!--[-->`;
      if (minutesToNextRace <= 10) {
        $$payload.out += `<!--[-->`;
        Clock($$payload, { class: iconBackClassName });
        $$payload.out += `<!--]--> <!--[-->`;
        Clock($$payload, { class: iconClassName });
        $$payload.out += `<!--]-->`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `<!--[-->`;
        if (minutesToNextRace <= 30) {
          $$payload.out += `<!--[-->`;
          Info_circle($$payload, { class: iconBackClassName });
          $$payload.out += `<!--]--> <!--[-->`;
          Info_circle($$payload, { class: iconClassName });
          $$payload.out += `<!--]-->`;
          $$payload.out += "<!--]-->";
        } else {
          $$payload.out += "<!--]!-->";
        }
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += ` <!--[-->`;
    if (minutesToNextRace <= 1) {
      $$payload.out += `${escape(`Starting now`)}`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += `<!--[-->`;
      if (minutesToNextRace >= 60 * 24) {
        $$payload.out += `${escape(`In ${Math.floor(minutesToNextRace / 60 / 24)} day${Math.floor(minutesToNextRace / 60 / 24) > 1 ? "s" : ""}`)}`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `${escape(`In ${minutesToNextRace} minutes`)}`;
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += `</div>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<div>Unknown</div>`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { row });
  pop();
}
function Context_menu_item($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "inset", "$$props"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let inset = value_or_fallback($$props["inset"], () => void 0);
  $$payload.out += `<!--[-->`;
  Menu_item($$payload, spread_props([
    {
      class: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50", inset && "pl-8", className)
    },
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
  bind_props($$props, { class: className, inset });
  pop();
}
function Context_menu_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "transition",
    "transitionConfig",
    "$$props"
  ]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let transition = value_or_fallback($$props["transition"], () => flyAndScale);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], () => void 0);
  $$payload.out += `<!--[-->`;
  Context_menu_content$1($$payload, spread_props([
    {
      transition,
      transitionConfig,
      class: cn("z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none", className)
    },
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
  bind_props($$props, {
    class: className,
    transition,
    transitionConfig
  });
  pop();
}
const Root = Context_menu;
const Trigger = Context_menu_trigger;
function Favorite_icon($$payload, $$props) {
  push();
  $$payload.out += `<div class="flex h-[18px] w-fit items-center justify-center rounded-md border border-gray-400/80 bg-gray-200/40 px-1 text-xs text-gray-800 opacity-80 group-hover:opacity-100 dark:border-gray-400/80 dark:bg-gray-800/20 dark:text-gray-400/80"><!--[-->`;
  Star($$payload, { class: "size-3 stroke-[3px]" });
  $$payload.out += `<!--]--></div>`;
  pop();
}
function Cell_favorite($$payload, $$props) {
  push();
  let { favorite, id, type } = $$props;
  let isFavorite = favorite[type]?.[id] ?? false;
  $$payload.out += `<!--[-->`;
  Root($$payload, {
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<!--[-->`;
      Trigger($$payload2, {
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<div class="group inline-flex cursor-pointer flex-row items-baseline gap-1"><!--[-->`;
          if (isFavorite) {
            $$payload3.out += `<!--[-->`;
            Favorite_icon($$payload3);
            $$payload3.out += `<!--]-->`;
            $$payload3.out += "<!--]-->";
          } else {
            $$payload3.out += "<!--]!-->";
          }
          $$payload3.out += ` <!--[-->`;
          slot($$payload3, $$props.children, {}, null);
          $$payload3.out += `<!--]--></div>`;
        }
      });
      $$payload2.out += `<!--]--> <!--[-->`;
      Context_menu_content($$payload2, {
        children: ($$payload3, $$slotProps2) => {
          $$payload3.out += `<!--[-->`;
          Context_menu_item($$payload3, {
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<!--[-->`;
              if (isFavorite) {
                $$payload4.out += `Unfavorite`;
                $$payload4.out += "<!--]-->";
              } else {
                $$payload4.out += `Favorite`;
                $$payload4.out += "<!--]!-->";
              }
            }
          });
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!--]-->`;
    }
  });
  $$payload.out += `<!--]-->`;
  pop();
}
function Cell_track($$payload, $$props) {
  push();
  let { favorite, row } = $$props;
  $$payload.out += `<!--[-->`;
  Cell_favorite($$payload, {
    favorite,
    id: row.track.trackId,
    type: "track",
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<div class="group flex flex-row flex-wrap items-baseline gap-1 text-wrap"><!--[-->`;
      if (row.track.isFree) {
        $$payload2.out += `<!--[-->`;
        Free_icon($$payload2);
        $$payload2.out += `<!--]-->`;
        $$payload2.out += "<!--]-->";
      } else {
        $$payload2.out += "<!--]!-->";
      }
      $$payload2.out += ` ${escape(row.track.trackName)}</div>`;
    }
  });
  $$payload.out += `<!--]-->`;
  pop();
}
function Cell_series($$payload, $$props) {
  push();
  let { favorite, row } = $$props;
  $$payload.out += `<!--[-->`;
  Cell_favorite($$payload, {
    favorite,
    id: row.seriesId,
    type: "series",
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<div class="flex-wrap text-wrap">${escape(row.seriesName)}</div>`;
    }
  });
  $$payload.out += `<!--]-->`;
  pop();
}
const columns = [
  {
    Component: Cell_class_icon,
    Icon: School,
    class: "w-[4.75rem]",
    getValue: (row) => row.licenseGroup,
    id: "class",
    label: "Class"
  },
  {
    Component: Cell_category,
    Icon: Gps,
    class: "w-[7rem]",
    getValue: (row) => categoryToName[row.category] ?? "Unknown",
    id: "category",
    label: "Category"
  },
  {
    Component: Cell_series,
    Icon: Users_group,
    class: "w-[250px]",
    getValue: (row) => row.seriesName,
    id: "series",
    label: "Series"
  },
  {
    Component: Cell_track,
    Icon: Road,
    class: "w-[300px]",
    getValue: (row) => row.track.trackName,
    id: "track",
    label: "Track"
  },
  {
    Component: Cell_cars,
    Icon: Car,
    class: "w-[300px]",
    getValue: (row) => row.cars.length === 1 ? row.cars[0].carName : row.cars.map((car) => car.carNameAbbreviated).join(", "),
    id: "cars",
    label: "Cars"
  },
  {
    Component: Cell_next_race,
    Icon: Clock,
    class: "w-36",
    getValue: () => "",
    id: "nextRace",
    label: "Next Race"
  },
  {
    Icon: Arrows_up,
    class: "w-[110px]",
    getValue: (row) => row.startType,
    id: "startType",
    label: "Start Type"
  },
  {
    Icon: Calendar_week,
    class: "w-[4.65rem]",
    contentClass: "justify-center",
    getValue: (row) => row.raceWeekNum,
    id: "week",
    label: "Week"
  },
  {
    Component: Cell_check,
    Icon: Stars,
    class: "w-[5.25rem]",
    contentClass: "justify-center",
    getValue: (row) => row.official,
    id: "official",
    label: "Official"
  },
  {
    Component: Cell_check,
    Icon: Tool,
    class: "w-[4.75rem]",
    contentClass: "justify-center",
    getValue: (row) => row.fixedSetup,
    id: "fixed",
    label: "Fixed Setup"
  },
  {
    Component: Cell_check,
    Icon: Car_garage,
    class: "w-[4.25rem]",
    contentClass: "justify-center",
    getValue: (row) => row.multiclass,
    id: "multiClass",
    label: "Multi Class"
  },
  {
    Icon: Car_crash,
    class: "w-[5rem]",
    getValue: (row) => row.incidentLimit,
    id: "maxIncidents",
    label: "Max Incidents"
  },
  {
    Icon: Cloud_rain,
    class: "w-[3.5rem]",
    getValue: (row) => `${row.weather?.weatherSummary?.maxPrecipRate ?? 0}%`,
    id: "rain",
    label: "Rain Chance"
  }
];
function Schedule_page($$payload, $$props) {
  push();
  let { column, data, favorite, title } = $$props;
  let columns$1 = columns.filter((col) => column.visibility[col.id] !== false);
  $$payload.out += `<div class="h-screen"><!--[-->`;
  Page_header($$payload, { title });
  $$payload.out += `<!--]--> <div class="h-[calc(100%-42px)] flex-1 overflow-hidden"><div class="flex h-full flex-col"><!--[-->`;
  Table_filters($$payload, { columns, columnState: column });
  $$payload.out += `<!--]--> <div class="relative h-full w-full flex-1 overflow-auto px-4"><!--[-->`;
  Table($$payload, { rows: data, columns: columns$1, favorite });
  $$payload.out += `<!--]--></div></div></div></div>`;
  pop();
}
export {
  Schedule_page as S,
  getScheduleState as a,
  getPreviousTuesdayString as g
};
