import secrets from "../secrets";
export default function (context, inject) {
  inject("dataApi", {
    getHome,
  });
  async function getHome(homeId) {
    const url = `https://${secrets.search_app_id}-dsn.algolia.net/1/indexes/homes/${homeId}`;
    const headers = {
      "X-Algolia-API-Key": secrets.search_api_key,
      "X-Algolia-Application-ID": secrets.search_app_id,
    };

    try {
      return unwrap(await fetch(url, { headers }));
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function unwrap(response) {
    const json = await response.json();
    const { ok, status, statusText } = response;
    return {
      json,
      ok,
      status,
      statusText,
    };
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {},
    };
  }
}
