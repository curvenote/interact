import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import Notebook from "thebe-core/dist/notebook";
import compute from "./compute";
import { AppDispatch, State } from "./index";
import ui from "./ui";

interface CodeBlock {
  id: string;
  source: string;
}

const notebookData: CodeBlock[] = [
  {
    id: "curvenote-cell-id-1",
    source: `
import matplotlib.pyplot as plt
import math
import numpy as np
`,
  },
  {
    id: "curvenote-cell-id-2",
    source: `
A = 1 # curvenote:A min:0
T = 0.5 # curvenote:T min:0 max:1
wo = 1*math.pi # curvenote:(wo)*2*math.pi min:0 max:1
N = 20 # curvenote:N min:1
`,
  },
  {
    id: "curvenote-cell-id-3",
    source: `c = [(A/(math.pi*(n+1)))*math.sin((n+1)*wo*(T/2)) for n in range(0,N)]`,
  },
  {
    id: "curvenote-cell-id-4",
    source: `
plt.figure(figsize=(16,5))
plt.bar(range(0,len(c)), c)
plt.grid()
mm = 1.1*np.max(np.abs(plt.ylim()))
plt.ylim(-mm,mm);
`,
  },
  {
    id: "curvenote-cell-id-5",
    source: `
t = np.arange(-math.pi,math.pi,0.01)

X = np.zeros((N, t.shape[0]))
for n in range(0,N):
    X[n, :] = np.real(c[n]*np.exp(-1j*(n+1)*wo*t))

plt.figure(figsize=(16,5))
plt.plot(t,X.T)
plt.grid()
plt.xlim(-3.8,3.8)
plt.title(f'First {N} Fourier Series Coefficients for an even square wave');
if N < 15:
    plt.legend(labels=[f'C{n}' for n in range(0,N)])
`,
  },
  {
    id: "curvenote-cell-id-6",
    source: `
Xs = np.sum(X, axis=0);
plt.figure(figsize=(16,5))
plt.plot(t,Xs)
plt.grid()
plt.xlim(-3.8,3.8)
plt.title(f'Sum of the first {N} Fourier Series Coefficients for an even square wave');
`,
  },
];

export const fetchNotebook =
  (): ThunkAction<Promise<Notebook>, State, unknown, AnyAction> =>
  async (): Promise<Notebook> => {
    // TODO query api to get notebookData
    // load data into thebe
    return Notebook.fromCodeBlocks(notebookData); // TODO will be a thunk
  };

const actions = { ui: ui.actions, compute: compute.actions };

export default actions;
