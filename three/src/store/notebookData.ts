import { CodeBlock } from "../connect/redux/actions";

export const notebookData: CodeBlock[] = [
  {
    id: "curvenote-cell-id-1",
    source: `
import empymod
import numpy as np
import matplotlib.pyplot as plt
plt.style.use('ggplot')
`,
  },
  {
    id: "curvenote-cell-id-2",
    source: `
freq = np.logspace(-1, 5, 301)  # Frequencies (Hz)
time = np.logspace(-6, 0, 301)  # Times (s)
offset = 100; # @param
src = [0, 0, 0, 0, 0]    # x-dir. source at the origin [x, y, z, azimuth, dip]
rec = [offset, 0, 0, 0, 0]  # x-dir. receiver 100m away from source, inline
cond = 0.01              # @param Conductivity (S/m)
`,
  },
  {
    id: "curvenote-cell-id-3",
    source: `# Collect common parameters
inp = {'src': src, 'rec': rec, 'depth': [], 'res': 1/cond, 'verb': 1}

# Frequency domain
inp['freqtime'] = freq
fee_dip_dip = empymod.bipole(**inp)
fmm_dip_dip = empymod.bipole(msrc=True, mrec=True, **inp)
f_loo_dip = empymod.loop(**inp)

# Time domain
inp['freqtime'] = time

# ee
ee_dip_dip_of = empymod.bipole(signal=-1, **inp)
ee_dip_dip_im = empymod.bipole(signal=0, **inp)
ee_dip_dip_on = empymod.bipole(signal=1, **inp)

# mm dip-dip
dip_dip_of = empymod.bipole(signal=-1, msrc=True, mrec=True, **inp)
dip_dip_im = empymod.bipole(signal=0, msrc=True, mrec=True, **inp)
dip_dip_on = empymod.bipole(signal=1, msrc=True, mrec=True, **inp)

# mm loop-dip
loo_dip_of = empymod.loop(signal=-1, **inp)
loo_dip_im = empymod.loop(signal=0, **inp)
loo_dip_on = empymod.loop(signal=1, **inp)`,
  },
  {
    id: "curvenote-cell-id-4",
    source: `
fs = 16  # Fontsize

# Figure
fig = plt.figure(figsize=(12, 8))

# Frequency Domain
plt.subplot(231)
plt.title(r'$G^{ee}_{\\rm{dip-dip}}$', fontsize=fs)
plt.plot(freq, fee_dip_dip.real, 'C0-', label='Real')
plt.plot(freq, -fee_dip_dip.real, 'C0--')
plt.plot(freq, fee_dip_dip.imag, 'C1-', label='Imag')
plt.plot(freq, -fee_dip_dip.imag, 'C1--')
plt.xscale('log')
plt.yscale('log')
plt.ylim([5e-8, 2e-5])

ax1 = plt.subplot(232)
plt.title(r'$G^{mm}_{\\rm{dip-dip}}$', fontsize=fs)
plt.plot(freq, fmm_dip_dip.real, 'C0-', label='Real')
plt.plot(freq, -fmm_dip_dip.real, 'C0--')
plt.plot(freq, fmm_dip_dip.imag, 'C1-', label='Imag')
plt.plot(freq, -fmm_dip_dip.imag, 'C1--')
plt.xscale('log')
plt.yscale('log')
plt.xlabel('Frequency (Hz)', fontsize=fs-2)
plt.legend()

plt.subplot(233)
plt.title(r'$G^{mm}_{\\rm{loop-dip}}$', fontsize=fs)
plt.plot(freq, f_loo_dip.real, 'C0-', label='Real')
plt.plot(freq, -f_loo_dip.real, 'C0--')
plt.plot(freq, f_loo_dip.imag, 'C1-', label='Imag')
plt.plot(freq, -f_loo_dip.imag, 'C1--')
plt.xscale('log')
plt.yscale('log')
plt.ylim([5e-10, 2e-7])

plt.text(1.05, 0.5, "Frequency Domain", {'fontsize': fs},
         horizontalalignment='left', verticalalignment='center',
         rotation=-90, clip_on=False, transform=plt.gca().transAxes)

# Time Domain
plt.subplot(234)
plt.plot(time, ee_dip_dip_of, 'C0-', label='Step-Off')
plt.plot(time, -ee_dip_dip_of, 'C0--')
plt.plot(time, ee_dip_dip_im, 'C1-', label='Impulse')
plt.plot(time, -ee_dip_dip_im, 'C1--')
plt.plot(time, ee_dip_dip_on, 'C2-', label='Step-On')
plt.plot(time, -ee_dip_dip_on, 'C2--')
plt.xscale('log')
plt.yscale('log')

plt.subplot(235)
plt.plot(time, dip_dip_of, 'C0-', label='Step-Off')
plt.plot(time, -dip_dip_of, 'C0--')
plt.plot(time, dip_dip_im, 'C1-', label='Impulse')
plt.plot(time, -dip_dip_im, 'C1--')
plt.plot(time, dip_dip_on, 'C2-', label='Step-On')
plt.plot(time, -dip_dip_on, 'C2--')
plt.xscale('log')
plt.yscale('log')
plt.xlabel('Time (s)', fontsize=fs-2)
plt.legend()

plt.subplot(236)
plt.plot(time, loo_dip_of, 'C0-', label='Step-Off')
plt.plot(time, -loo_dip_of, 'C0--')
plt.plot(time, loo_dip_im, 'C1-', label='Impulse')
plt.plot(time, -loo_dip_im, 'C1--')
plt.plot(time, loo_dip_on, 'C2-', label='Step-On')
plt.plot(time, -loo_dip_on, 'C2--')
plt.xscale('log')
plt.yscale('log')

plt.text(1.05, 0.5, "Time Domain", {'fontsize': fs},
         horizontalalignment='left', verticalalignment='center',
         rotation=-90, clip_on=False, transform=plt.gca().transAxes)

fig.text(-0.01, 0.5, 'Amplitude; e-rec (V/m); m-rec (A/m)',
         va='center', rotation='vertical', fontsize=fs, color='.4')

plt.tight_layout()
plt.show()
`,
  },
];
