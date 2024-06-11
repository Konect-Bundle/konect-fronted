"use client"
import * as React from "react";

export interface IAppProps {}

export default class KuserHeader extends React.Component<IAppProps> {
  public render() {
    return (
      <div className="fixed z-40 top-0 left-0 w-screen flex ">
        <div
          id="alert-1"
          className="flex justify-between items-center p-3 mb-4 text-gray-100 w-full bg-noir-bold space-x-3"
          role="alert"
        >
          <div className="items-center text-gray-100 flex space-x-2 rounded-md md:text-md text-sm">
            <svg
              className="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div className="ms-3 text-sm font-medium">
              You too, easily get your konect card
            </div>
          </div>
          <div className="md:space-x-4 space-x-2 flex items-center">
            <a href="{{ route('gadgets.list') }}" className="pl-1">
              <button className="!bg-jaune-main !text-noir-bold w-max">
                Get card
              </button>
            </a>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-white text-noir-bold rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
              data-dismiss-target="#alert-1"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
