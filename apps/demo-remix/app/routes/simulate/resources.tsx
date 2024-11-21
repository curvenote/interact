import { Link } from '@remix-run/react';

export default function Resources() {
  return (
    <div className="p-3 relative">
      <div className="prose">
        <h1>Compute Resources</h1>
        <Link to="/simulate" className="text-xl text-blue-600 underline absolute top-0 right-0 p-3">
          Back
        </Link>
      </div>
    </div>
  );
}
