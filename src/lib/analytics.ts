/** Fixed event fields only: no clipboard contents, query strings or user text. */
export function trackInstallAction(action: "command_copy" | "releases_open" | "installer_view") {
  try {
    const target = window as Window & { dataLayer?: unknown[] };
    target.dataLayer ??= [];
    // gtag consumes Arguments objects, including events queued before it loads.
    function queue(...args: unknown[]) {
      void args;
      // eslint-disable-next-line prefer-rest-params -- gtag expects its native Arguments queue format.
      target.dataLayer!.push(arguments);
    }
    queue("event", "install_action", { action, transport_type: "beacon" });
  } catch {
    // Analytics must never break copying or navigation.
  }
}
