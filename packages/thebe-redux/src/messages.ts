import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageCallbackArgs, ServerStatus } from 'thebe-core';

export type MessagesState = MessageCallbackArgs[];

const messages = createSlice({
  name: "messages",
  initialState: {} as MessagesState,
  reducers: {
    add: (state: MessagesState, action: PayloadAction<MessageCallbackArgs>) => {
      // TODO: limit length
      return [
            action.payload,
            ...state,
        ];
    },
    clear: () => {
      return [];
    },
  },
});

export default messages;