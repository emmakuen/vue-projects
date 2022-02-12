import secrets from "../secrets";
export default function (context, inject) {
  inject("dataApi", {
    getHome,
  });
  async function getHome(homeId) {
    const url = `https://${secrets.search_app_id}-dsn.algolia.net/1/indexes/homes/${homeId}`;

    const response = await fetch(url, {
      headers: {
        "X-Algolia-API-Key": secrets.search_api_key,
        "X-Algolia-Application-ID": secrets.search_app_id,
      },
    });

    const json = await response.json();
    return json;
  }
}
