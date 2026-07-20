/** Cloudflare Worker entry point used by OpenAI Sites hosting. */
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
