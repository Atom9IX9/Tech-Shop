import Loader from "components/Loader/Loader";
import React from "react";

export default function withSuspense<P>(Component: React.ComponentType & any) {
  return function WithSuspense(props: P) {
    return (
      <React.Suspense
        fallback={
          <div className="suspenseWrapper">
            <Loader />{" "}
          </div>
        }
      >
        <Component {...props} />
      </React.Suspense>
    );
  };
}
