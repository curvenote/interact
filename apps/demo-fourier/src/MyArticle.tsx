import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RVar, RScope, RDisplay, RDynamic, RRange } from 'common/dist/react/components';
import { Output, connect, fetchNotebook, MakePageLive } from 'common';
import { notebookData } from './notebookData';
import { AppDispatch } from './store';

function MyArticle() {
  const dispatch = useDispatch<AppDispatch>();
  // const notebookId = useSelector(selectors.getActiveNotebookId);
  const notebookId = '1234';

  // useEffect(() => {
  //   dispatch(fetchNotebook(notebookData)).then((nb: any) => {
  //     dispatch(connect.actions.setActiveNotebookId(nb.id));
  //   });
  // }, []);

  return (
    <RScope name="page">
      <div style={{ position: 'fixed', top: 0, left: 0, visibility: 'hidden' }}>
        <RVar name="wo" value={0.5} format=".2f"></RVar>
        <RVar name="Tp" value={0.5} format=".2f"></RVar>
        <RVar name="A" value={1.0} format=".2f"></RVar>
        <RVar name="N" value={8} format=".2f"></RVar>
      </div>
      <article className="centered">
        <MakePageLive local notebookId={notebookId} />
        <h1>Fourier Series</h1>
        <p>
          Fourier series are powerful function and signal representation, capable of representing
          any periodic bandlimited signal. Understanding the representation can be tricky, but is
          greatly helped by visualising individual components of the series, which is what we'll do
          here.
        </p>
        <p>
          Citing <a href="https://en.wikipedia.org/wiki/Fourier_series">Wikipedia</a>: A Fourier
          series is a periodic function composed of harmonically related sinusoids comined by a
          weighted summation. With appropriate weights, one cycle (or period) of the summation can
          be made to approximate as arbitrary function in that interval, or the entire function if
          it itself is periodic.
        </p>
        <p>The fourier series representation of a function (Exponential Form) is given by:</p>
        {'$$x_{T}(t)=\\sum_{n=-\\infty}^{\\infty} c_{n} e^{j n \\omega_{0} t}$$'}
        <p>
          Where:
          <ul>
            <li>{'$\\omega_{0}$'} is the fundamental frequency</li>
            <li>$n$ is an integer representing the harmonics of {'$\\omega_{0}$'}</li>
            <li>$c_n$ are the coefficients of the infinite series</li>
          </ul>
        </p>
        <h2>Example - Square Wave</h2>
        <p>
          Let's start with an informative example - representing a Square Wave by it's fourier
          series, this is an interesting example, as how can smooth sinusoids approximate a function
          containing discrete steps?
        </p>
        <p>
          The coefficients of the fourier series for the square wave are given by the following
          expression, each coefficient $c_n$ determining the contribution of a sinusoid at the given
          frequency {'$n\\omega_{0}$'}.
        </p>
        {'$$c_n = \\frac{A}{\\pi n} \\sin \\left(n \\omega_{0} \\frac{T_{p}}{2}\\right)$$'}
        <h2>The Composite Signal</h2>
        <p>
          Given the value of {'$\\omega_{0}$'} is{' '}
          <RDynamic bind="wo" min={0.01} max={0.5} step={0.01} format=".2f"></RDynamic>, $T_p$ is{' '}
          <RDynamic bind="Tp" min={0.01} max={1.0} step={0.01} format=".2f"></RDynamic> and $A$ is{' '}
          <RDynamic bind="A" min={0.5} max={10.0} step={0.5} format=".2f"></RDynamic> the first{' '}
          <RDynamic bind="N" min={1} max={100} step={1} format=".2f"></RDynamic> ($N$) will produce
          a function approximating the square as shown below.
        </p>
        <Output
          notebookId={notebookId}
          cellId="curvenote-cell-id-6"
          placeholder={<img src="composite.png" alt="composite signal" />}
        />
        <p>
          So it turns out that we need quite a lot of components to approximate the square wave
          well, try setting the current value of $N=$
          <RDynamic bind="N" min={1} max={100} step={1} format=".2f"></RDynamic> to the maximum of
          100. The number of components has a significant impact of the final signal and we would
          need the full infiite series in order to converge to a true square wave with instantaneous
          value changes.
        </p>
        <p>
          The parameter $A$ controls amplitude and has no influence on the structure of the
          approximation, try changing it to see, A:{' '}
          <RRange bind="A" min={0.5} max={10} step={0.5}></RRange>{' '}
          <RDisplay bindToValue="A"></RDisplay>
        </p>
        <p>
          The parameters {'$\\omega_{0}$'} (
          <RDynamic bind="wo" min={0.01} max={0.5} step={0.01} format=".2f"></RDynamic>) and $T_p$ (
          <RDynamic bind="Tp" min={0.01} max={1.0} step={0.01} format=".2f"></RDynamic>) have the
          greatest influence on the waveform shape, controlling the periodicity, duty cycle and rate
          convergence of the representation to the target waveform. try adjustuing these in tandem
          so see how the waveform is affected.
        </p>
        <h2>The Series Components</h2>
        <p>
          If you've played with the paramrters above for a while, you may have noticed something
          about {'$\\omega_{0}$'}, known as the fundamental frequency, this controls the capacity
          the series has to represent a function in a given number of compontents. The square wave
          example we have chosen in particular requires high frequency components in order to be
          able to represent the discontinuities at step edges.
        </p>
        <p>
          At lower values of {'$\\omega_{0}$'} the base frequency of the sinusoids become so low
          that The time to converge to a reasonable approximation increases significantly.{' '}
        </p>
        <p>
          Try setting {'$\\omega_{0}$'} to values below $0.1$ and watch what happends to the
          components used to construct the signal,
          {'$\\omega_{0}$'}:<RRange bind="wo" min={0.01} max={0.5} step={0.01}></RRange>{' '}
          <RDisplay bindToValue="wo" format=".2f"></RDisplay>
        </p>
        <Output
          notebookId={notebookId}
          cellId="curvenote-cell-id-5"
          placeholder={<img src="components.png" alt="fourier components" />}
        />
      </article>
    </RScope>
  );
}

export default MyArticle;
