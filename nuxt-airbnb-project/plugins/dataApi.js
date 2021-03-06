import secrets from "../secrets";
export default function (context, inject) {
  const headers = {
    "X-Algolia-API-Key": secrets.search_api_key,
    "X-Algolia-Application-ID": secrets.search_app_id,
  };
  inject("dataApi", {
    getHome,
    getReviewsByHomeId,
    getUserByHomeId,
    getHomesByLocation,
  });
  async function getHome(homeId) {
    const url = `https://${secrets.search_app_id}-dsn.algolia.net/1/indexes/homes/${homeId}`;

    try {
      return unwrap(await fetch(url, { headers }));
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getReviewsByHomeId(homeId) {
    try {
      const url = `https://${secrets.search_app_id}-dsn.algolia.net/1/indexes/reviews/query`;
      return unwrap(
        await fetch(url, {
          headers,
          method: "POST",
          body: JSON.stringify({
            filters: `homeId:${homeId}`,
            hitsPerPage: 5,
            attributesToHighlight: [],
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getUserByHomeId(homeId) {
    try {
      const url = `https://${secrets.search_app_id}-dsn.algolia.net/1/indexes/users/query`;
      return unwrap(
        await fetch(url, {
          headers,
          method: "POST",
          body: JSON.stringify({
            filters: `homeId:${homeId}`,
            attributesToHighlight: [],
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getHomesByLocation(lat, lng, radiusInMeters = 1500) {
    try {
      const url = `https://${secrets.search_app_id}-dsn.algolia.net/1/indexes/homes/query`;
      return unwrap(
        await fetch(url, {
          headers,
          method: "POST",
          body: JSON.stringify({
            hitsPerPage: 10,
            aroundRadius: radiusInMeters,
            aroundLatLng: `${lat}, ${lng}`,
            attributesToHighlight: [],
          }),
        })
      );
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
