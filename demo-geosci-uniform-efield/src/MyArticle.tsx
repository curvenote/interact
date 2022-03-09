import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notebook from "thebe-core/dist/notebook";
import {
  RVar,
  RScope,
  RDisplay,
  RDynamic,
  RRange,
} from "common/dist/react/components";
import {
  MakePageLive,
  Output,
  selectors,
  connect,
  fetchNotebook,
} from "common";
import { notebookData } from "./notebookData";
import { AppDispatch } from "./store";

function ResourceLinks({ stub }: { stub: string }) {
  return (
    <div>
      <p className="source-link">
        [<a href={`${stub}.py`}>source code</a>,{" "}
        <a href={`${stub}.png`} target="_blank" rel="noreferrer">
          png
        </a>
        ]
      </p>
    </div>
  );
}

function MyArticle() {
  const dispatch = useDispatch<AppDispatch>();
  const notebookId = useSelector(selectors.getActiveNotebookId);

  useEffect(() => {
    dispatch(fetchNotebook(notebookData)).then((nb: Notebook) => {
      dispatch(connect.actions.setActiveNotebookId(nb.id));
    });
  }, []);

  return (
    <RScope name="page">
      <div style={{ position: "fixed", top: 0, left: 0, visibility: "hidden" }}>
        <RVar name="sigma0" value={0.001} format=".4f"></RVar>
        <RVar name="sigma1" value={0.1} format=".3f"></RVar>
        <RVar name="sigma2" value={0.00001} format=".5f"></RVar>
        <RVar name="R" value={50} format=".0f"></RVar>
        <RVar name="N" value={50} format=".0f"></RVar>
        <RVar name="E0" value={1} format=".1f"></RVar>
      </div>
      <article className="centered">
        <MakePageLive notebookId={notebookId} local />
        <h1>Conducting sphere in a uniform electric field</h1>
        <p>
          A sphere in a whole-space provides a simple geometry to examine a
          variety of questions and can provide powerful physical insights into a
          variety of problems. Here we examine the case of a conducting sphere
          in a uniform electrostatic field. This scenario gives us a setting to
          examine aspects of the DC resistivity experiment, including the
          behavior of electric potentials, electric fields, current density and
          the build up of charges at interfaces.
        </p>
        <p>
          This interactive example is derived from this section in the{" "}
          <a href="https://em.geosci.xyz/content/maxwell2_static/fields_from_grounded_sources_dcr/electrostatic_sphere.html">
            geosci.xyz courseware
          </a>
          .
        </p>
        <h1>Setup</h1>
        <p>The problem setup is shown in the figure below, where we have</p>
        <ul>
          <li>
            <p>
              a uniform electric field oriented in the -direction:
              {"$\\mathbf{E_0} = E_0 \\mathbf{\\hat{x}}$ ="}{" "}
              <RDynamic
                bind="E0"
                min={0.5}
                max={5}
                step={0.5}
                format=".0f"
              ></RDynamic>
            </p>
          </li>
          <li>
            <p>
              a whole-space background with conductivity $\sigma_0=${" "}
              <RDynamic
                bind="sigma0"
                min={0.001}
                max={0.5}
                step={0.005}
                format=".3f"
              ></RDynamic>
            </p>
          </li>
          <li>
            <p>
              a sphere with radius $R=${" "}
              <RDynamic
                bind="R"
                min={5}
                max={100}
                step={5}
                format=".0f"
              ></RDynamic>{" "}
              and conductivity $\sigma_1=${" "}
              <RDynamic
                bind="sigma1"
                min={0.01}
                max={0.5}
                step={0.01}
                format=".2f"
              ></RDynamic>
            </p>
          </li>
          <li>
            <p>
              the level of discretization for the solution grid $N=${" "}
              <RRange bind="N" min={10} max={100} step={5}></RRange>{" "}
              <RDisplay bindToValue="N" format=".0f"></RDisplay>
            </p>
          </li>
          <li>
            <p>
              the origin of coordinate system coincides with the center of the
              sphere
            </p>
          </li>
        </ul>
        <Output
          notebookId={notebookId}
          cellId="em-plot-setup"
          placeholder={
            <img src="electrostatic_sphere-1.png" alt="environment setup" />
          }
        />
        <ResourceLinks stub="electrostatic_sphere-1" />
        <h2>Governing Equations</h2>
        <p>
          The governing equation for DC resistivity problem can be obtained from
          Maxwell&apos;s equations. We start by considering the zero-frequency
          case, in which case, Maxwell&apos;s equations are
        </p>
        {"$$\\nabla \\times \\mathbf{e} = 0 \\qquad (341)$$"}
        {"$$\\nabla \\times \\mathbf{h} = \\mathbf{j} \\qquad (342)$$"}
        <p>
          Knowing that the curl of the gradient of any scalar potential is
          always zero, according to (341), we can define a scalar potential so
          that the primary electric field is the gradient of a potential. For
          convenience, we define it to be the negative gradient of the
          potential, $V$
        </p>
        {"$$\\mathbf{e} = -\\nabla V (343)$$"}
        <p>
          To define the potential at a point $p$ from an electric field requires
          integration
        </p>
        {"$$V = -\\int_{ref}^p \\mathbf{e} \\cdot \\mathbf{dl} \\qquad (344)$$"}
        <p>
          The choice of reference point $ref$ is arbitrary, but it is often
          convenient to consider the reference point to be infinitely far away,
          so $ref = \infty$. In this case, the electric potential at $p$ is
          equivalent to the amount of work done to bring a positive charge from
          infinity to the point $p$.
        </p>
        <h2>Potentials</h2>
        <p>
          Assuming an x-directed uniform electric field and zero potential at
          infinity, the integration from (344) gives
        </p>
        {"$$V_p = - E_0 x = -E_0 r \\cos\\theta \\qquad (345)$$"}
        <Output
          notebookId={notebookId}
          cellId="em-plot-primary-potenial"
          placeholder={
            <img src="electrostatic_sphere-2.png" alt="primary potential" />
          }
        />
        <ResourceLinks stub="electrostatic_sphere-2" />
        <p>
          The total potential outside the sphere is {"$(r > R)$"} for $R=${" "}
          <RDynamic bind="R" min={5} max={100} step={5} format=".0f"></RDynamic>{" "}
          is
        </p>
        {
          "$$V_1 = -E_0 \\big(1 - \\frac{R^3}{r^3}\\frac{\\sigma_1 - \\sigma_0}{\\sigma_1 + 2\\sigma_0} \\big) r \\cos\\theta \\qquad (346)$$"
        }
        <p>and inside the sphere {"$r < R$"}</p>
        {
          "$$V_2 = -E_0 \\frac{3\\sigma_0}{\\sigma_1+2\\sigma_0}r \\cos\\theta \\qquad (347)$$"
        }
        <p>
          In the figure below, in the left column we see the potentials of the
          conducting sphere. On the right, for contrast we see a resistive
          sphere with a conductivity of $\sigma_2=${" "}
          <RDisplay bindToValue="sigma2" format=".5f"></RDisplay> , below the
          free space conductivity value of $\sigma_0=${" "}
          <RDisplay bindToValue="sigma0" format=".4f"></RDisplay>. Let&apos;s
          adjust some of these parameters and see the impact.
        </p>
        <p>
          Radius, $R$: <RRange bind="R" min={10} max={100} step={5}></RRange>{" "}
          <RDisplay bindToValue="R"></RDisplay>
        </p>
        <p>Conductivies:</p>
        <ul>
          <li>
            <p>
              for the Conductive Sphere, $\sigma_1=${" "}
              <RDynamic
                bind="sigma1"
                min={0.005}
                max={0.5}
                step={0.005}
                format=".3f"
              ></RDynamic>
            </p>
          </li>
          <li>
            <p>
              Free Space, $\sigma_0=${" "}
              <RDynamic
                bind="sigma0"
                min={0.0001}
                max={0.1}
                step={0.0001}
                format=".4f"
              ></RDynamic>
            </p>
          </li>
          <li>
            <p>
              Resistive Sphere, $\sigma_2=${" "}
              <RDisplay bindToValue="sigma2" format=".5f"></RDisplay>
            </p>
          </li>
          <li>
            <p>
              where we should maintain {"$\\sigma_1 > \\sigma_0 > \\sigma_2$"} :{" "}
              <RDisplay bindToValue="sigma1" format=".5f"></RDisplay>
              &nbsp;&gt;&nbsp;
              <RDisplay bindToValue="sigma0" format=".5f"></RDisplay>
              &nbsp;&gt;&nbsp;
              <RDisplay bindToValue="sigma2" format=".5f"></RDisplay>
            </p>
          </li>
        </ul>
        <Output
          notebookId={notebookId}
          cellId="em-plot-potential-field"
          placeholder={
            <img
              src="electrostatic_sphere-3.png"
              alt="potential fields produced"
            />
          }
        />
        <ResourceLinks stub="electrostatic_sphere-3" />
        <h2>Electric Field</h2>
        <p>
          When an external electric field crosses conductivity discontinuities
          within heterogeneous media, it leads to charge buildup on the
          interface, which immediately gives rise to a secondary electric field
          governed by Gauss’s Law, to oppose the change of the primary field.
          Considering that the electric field is defined as the negative
          gradient of the potential, according to (346) and (347), the electric
          field at any point $(x,y,z)$ is
        </p>
        {
          "$$E_1 = E_0\\mathbf{\\hat{x}} + E_0\\frac{\\sigma_1-\\sigma_0}{\\sigma_1+2\\sigma_0}\\frac{R^3}{r^5}\\big[(2x^2 - y^2 - z^2)\\mathbf{\\hat{x}} + (3xy)\\mathbf{\\hat{y}} + (3xz)\\mathbf{\\hat{z}}\\big] ; (r > R)\\qquad (348)$$"
        }
        {
          "$$E_2 = E_0\\frac{3\\sigma_0}{\\sigma_1+2\\sigma_0}\\mathbf{\\hat{x}} ; (r < R) \\qquad (349)$$"
        }
        <Output
          notebookId={notebookId}
          cellId="em-plot-electric-field-lines"
          placeholder={
            <img src="electrostatic_sphere-4.png" alt="electric field lines" />
          }
        />
        <ResourceLinks stub="electrostatic_sphere-4" />
        <p>
          We can again vary the same parameters as previously and see the impact
          on the electric field structure
        </p>
        <p>
          Radius, $R$: <RRange bind="R" min={10} max={100} step={5}></RRange>{" "}
          <RDisplay bindToValue="R"></RDisplay>
        </p>
        <p>Conductivies:</p>
        <ul>
          <li>
            <p>
              for the Conductive Sphere, $\sigma_1=${" "}
              <RDynamic
                bind="sigma1"
                min={0.005}
                max={0.5}
                step={0.005}
                format=".3f"
              ></RDynamic>
            </p>
          </li>
          <li>
            <p>
              Free Space, $\sigma_0=${" "}
              <RDynamic
                bind="sigma0"
                min={0.0001}
                max={0.1}
                step={0.0001}
                format=".4f"
              ></RDynamic>
            </p>
          </li>
          <li>
            <p>
              Resistive Sphere, $\sigma_2=${" "}
              <RDisplay bindToValue="sigma2" format=".5f"></RDisplay>
            </p>
          </li>
          <li>
            <p>
              where we should maintain {"$\\sigma_1 > \\sigma_0 > \\sigma_2$"} :{" "}
              <RDisplay bindToValue="sigma1" format=".5f"></RDisplay>
              &nbsp;&gt;&nbsp;
              <RDisplay bindToValue="sigma0" format=".5f"></RDisplay>
              &nbsp;&gt;&nbsp;
              <RDisplay bindToValue="sigma2" format=".5f"></RDisplay>
            </p>
          </li>
        </ul>
        <p>
          Note that varying the Field Strength, $E_0$:{" "}
          <RDynamic
            bind="E0"
            min={0.5}
            max={10}
            step={0.5}
            format=".1f"
          ></RDynamic>{" "}
          has no effect on the structure of the field but changes potential
          gradients proportionally.
        </p>
      </article>
    </RScope>
  );
}

export default MyArticle;
