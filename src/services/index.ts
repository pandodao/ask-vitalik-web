import { http } from "./http";

// export function createIndex(data: Chat.IndexData): Promise<any> {
//   return http.post("/indices", { data });
// }

export function createConversation(data: Chat.NewConversationInfo): Promise<any> {
  return http.post("/conversations", { data });
}

export function postToConversation(id: string, data: Chat.Content): Promise<any> {
  return http.post(`/conversations/${id}`, { data });
}

export function readConversation(id: string): Promise<any> {
  return http.get(`/conversations/${id}`);
}
