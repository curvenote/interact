import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { MessageCallbackArgs } from 'thebe-core';

export type MessagesState = {
  timestamp: number;
  data: MessageCallbackArgs;
}[];

const messages = createSlice({
  name: 'messages',
  initialState: [] as MessagesState,
  reducers: {
    add: (state: MessagesState, action: PayloadAction<MessageCallbackArgs>) => {
      // TODO: limit length
      return [{ timestamp: Date.now(), data: action.payload }, ...state];
    },
    clear: () => {
      return [];
    },
  },
});

export default messages;
