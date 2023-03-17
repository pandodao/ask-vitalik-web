import { http } from "./http";

export function getProfile(token: string) {
  return http.get("https://mixin-api.zeromesh.net/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}
