import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageCallbackArgs, ServerStatus } from 'thebe-core';

export type ServerState = MessageCallbackArgs[];

const servers = createSlice({
  name: "servers",
  initialState: {} as ServerState,
  reducers: {
    add: (state: ServerState, action: PayloadAction<MessageCallbackArgs>) => {
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

export default servers;