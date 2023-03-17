declare namespace Chat {
  export interface IndexData {
    object_id: string;
    category: string;
    data: string;
    properties: string;
  }

  export interface NewConversationInfo {
    bot_id: number;
    user_identity: string;
    lang: string;
  }

  export interface Content {
    content: string;
    category?: "plain-text";
  }
}
