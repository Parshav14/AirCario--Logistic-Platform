import React, { useState, useEffect } from "react";
import { matchDriver } from "../services/matching";

const MatchingAlgorithm = ({ booking }) => {
  const [matchedDriver, setMatchedDriver] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findMatch = async () => {
      setIsLoading(true);
      try {
        const driver = await matchDriver(booking);
        setMatchedDriver(driver);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    findMatch();
  }, [booking]);

  if (isLoading) {
    return (
      <div className="text-center">Finding the best driver for you...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!matchedDriver) {
    return (
      <div className="text-center">
        No drivers available at the moment. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Matched Driver
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {matchedDriver.name}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Vehicle</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {matchedDriver.vehicleType}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Rating</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {matchedDriver.rating}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default MatchingAlgorithm;
