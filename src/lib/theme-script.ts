export const THEME_STORAGE_KEY = "ra-theme";

/**
 * Runs in <head> before first paint: applies the stored theme (dark by default)
 * so there is no flash of the wrong palette.
 */
export const themeBootstrapScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark")t="dark";document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;
