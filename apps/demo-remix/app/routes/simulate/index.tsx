import { Link } from '@remix-run/react';

export default function Simulate() {
  return (
    <div className="p-3 relative">
      <div className="prose">
        <h1>Run Simulations</h1>
        <Link
          to="/simulate/resources"
          className="text-xl text-blue-600 underline absolute top-0 right-0 p-3"
        >
          Resources
        </Link>
      </div>
      <div>Simulation workflow - multi page form</div>
    </div>
  );
}
