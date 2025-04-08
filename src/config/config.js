const API_ORIGIN = "https://api.pusb.or.id/v1";

export const buildProxiedUrl = (path) =>
  `/api/proxy?url=${encodeURIComponent(`${API_ORIGIN}${path}`)}`;
