"use client";

import { useState } from "react";
import { CodePreview } from "../../components/ui/code-preview";
import {
  SlideOver,
  SlideOverHeader,
  SlideOverContent,
  SlideOverFooter,
} from "@nila-ui/slide-overs";

const basicExampleCode = `function BasicExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Open Slide Over
      </button>

      <SlideOver isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SlideOverHeader onClose={() => setIsOpen(false)}>
          Settings
        </SlideOverHeader>
        <SlideOverContent>
          <div className="px-4 py-6 sm:px-6">
            {/* Content goes here */}
          </div>
        </SlideOverContent>
        <SlideOverFooter>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Save
            </button>
          </div>
        </SlideOverFooter>
      </SlideOver>
    </div>
  );
}`;

const positionExampleCode = `function PositionExample() {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => setIsLeftOpen(true)}
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Open Left
      </button>
      <button
        onClick={() => setIsRightOpen(true)}
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Open Right
      </button>

      <SlideOver
        isOpen={isLeftOpen}
        onClose={() => setIsLeftOpen(false)}
        position="left"
      >
        <SlideOverHeader onClose={() => setIsLeftOpen(false)}>
          Left Slide Over
        </SlideOverHeader>
        <SlideOverContent>
          <div className="p-6">
            <p>This slide-over appears from the left side.</p>
          </div>
        </SlideOverContent>
      </SlideOver>

      <SlideOver
        isOpen={isRightOpen}
        onClose={() => setIsRightOpen(false)}
        position="right"
      >
        <SlideOverHeader onClose={() => setIsRightOpen(false)}>
          Right Slide Over
        </SlideOverHeader>
        <SlideOverContent>
          <div className="p-6">
            <p>This slide-over appears from the right side.</p>
          </div>
        </SlideOverContent>
      </SlideOver>
    </div>
  );
}`;

function BasicExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Open Slide Over
      </button>

      <SlideOver isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SlideOverHeader onClose={() => setIsOpen(false)}>
          Settings
        </SlideOverHeader>
        <SlideOverContent>
          <div className="px-4 py-6 sm:px-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                  Profile
                </h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  This information will be displayed publicly.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-400 dark:focus:ring-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-400 dark:focus:ring-neutral-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </SlideOverContent>
        <SlideOverFooter>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Save
            </button>
          </div>
        </SlideOverFooter>
      </SlideOver>
    </div>
  );
}

function PositionExample() {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => setIsLeftOpen(true)}
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Open Left
      </button>
      <button
        onClick={() => setIsRightOpen(true)}
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Open Right
      </button>

      <SlideOver
        isOpen={isLeftOpen}
        onClose={() => setIsLeftOpen(false)}
        position="left"
      >
        <SlideOverHeader onClose={() => setIsLeftOpen(false)}>
          Left Slide Over
        </SlideOverHeader>
        <SlideOverContent>
          <div className="p-6">
            <p className="text-neutral-900 dark:text-neutral-100">
              This slide-over appears from the left side.
            </p>
          </div>
        </SlideOverContent>
      </SlideOver>

      <SlideOver
        isOpen={isRightOpen}
        onClose={() => setIsRightOpen(false)}
        position="right"
      >
        <SlideOverHeader onClose={() => setIsRightOpen(false)}>
          Right Slide Over
        </SlideOverHeader>
        <SlideOverContent>
          <div className="p-6">
            <p className="text-neutral-900 dark:text-neutral-100">
              This slide-over appears from the right side.
            </p>
          </div>
        </SlideOverContent>
      </SlideOver>
    </div>
  );
}

export default function SlideOversPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Slide Overs
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Slide-overs are panels that slide in from the edge of the screen,
          typically used for secondary content or forms that don't require the
          user's full attention.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <CodePreview
            title="Basic Example"
            description="A simple slide-over with header, content, and footer."
            preview={<BasicExample />}
            code={basicExampleCode}
          />
        </section>

        <section>
          <CodePreview
            title="Position Variants"
            description="Slide-overs can be positioned on the left or right side of the screen."
            preview={<PositionExample />}
            code={positionExampleCode}
          />
        </section>
      </div>
    </div>
  );
}
