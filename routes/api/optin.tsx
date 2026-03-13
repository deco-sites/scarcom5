// TODO: Why not using actions?

import { Handlers } from "$fresh/server.ts";

const PORTAL_SUBDOMAIN = "https://www.scarcom.com.br";

export const handler: Handlers = {
  POST: async (req) => {
    const SUBDOMAIN = PORTAL_SUBDOMAIN;

    const data = await req.json();

    const response = await fetch(SUBDOMAIN + "/api/dataentities/NT/documents", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
      },
    });

    const headers = new Headers(response.headers);
    headers.set("access-control-allow-origin", "*");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
