// SettingFeaturesParties.jsx
import React, { useState, useEffect } from "react";
import { Sun, Image, ToggleLeft, ToggleRight } from "lucide-react";

/**
 * Feature settings -> Parties page.
 * - Two toggles: Party Category and Upload Party Image (persisted to localStorage for demo).
 * - Styles follow your app (Tailwind); active on-color uses #174552 to match earlier changes.
 */

const STORAGE_KEY = "karobar:feature-settings:parties";

export default function SettingFeaturesParties() {
  const [partyCategoryEnabled, setPartyCategoryEnabled] = useState(false);
  const [uploadPartyImageEnabled, setUploadPartyImageEnabled] = useState(true);

  // load demo state from localStorage (so toggles persist across reloads)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setPartyCategoryEnabled(Boolean(parsed.partyCategoryEnabled));
        setUploadPartyImageEnabled(Boolean(parsed.uploadPartyImageEnabled));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ partyCategoryEnabled, uploadPartyImageEnabled })
      );
    } catch (e) {}
  }, [partyCategoryEnabled, uploadPartyImageEnabled]);

  const BLUE = "#174552"; // your custom blue

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Party Settings</h2>

      {/* Card: Party Category */}
      <div className="bg-white border rounded-xl p-5 shadow-sm mb-4 flex items-center justify-between">
        <div>
          <div className="font-medium text-gray-800">Party Category</div>
          <div className="text-sm text-gray-500 mt-1">
            Enable Party Category to effortlessly manage parties
          </div>
        </div>

        {/* Toggle */}
        <button
          aria-pressed={partyCategoryEnabled}
          onClick={() => setPartyCategoryEnabled((s) => !s)}
          className="relative w-14 h-8 rounded-full focus:outline-none"
          style={{
            backgroundColor: partyCategoryEnabled ? BLUE : "#e6e6e6",
            transition: "background-color 170ms ease",
          }}
        >
          <span
            style={{
              display: "block",
              width: 18,
              height: 18,
              background: "white",
              borderRadius: "50%",
              position: "absolute",
              top: 5,
              left: partyCategoryEnabled ? 46 : 8,
              transition: "left 170ms ease",
              boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            }}
          />
        </button>
      </div>

      {/* Card: Upload Party Image */}
      <div className="bg-white border rounded-xl p-5 shadow-sm mb-4 flex items-center justify-between">
        <div>
          <div className="font-medium text-gray-800">Upload Party Image</div>
          <div className="text-sm text-gray-500 mt-1">
            Enable party image uploads to recognize parties easily
          </div>
        </div>

        {/* Toggle */}
        <button
          aria-pressed={uploadPartyImageEnabled}
          onClick={() => setUploadPartyImageEnabled((s) => !s)}
          className="relative w-14 h-8 rounded-full focus:outline-none"
          style={{
            backgroundColor: uploadPartyImageEnabled ? BLUE : "#e6e6e6",
            transition: "background-color 170ms ease",
          }}
        >
          <span
            style={{
              display: "block",
              width: 18,
              height: 18,
              background: "white",
              borderRadius: "50%",
              position: "absolute",
              top: 5,
              left: uploadPartyImageEnabled ? 46 : 8,
              transition: "left 170ms ease",
              boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            }}
          />
        </button>
      </div>

      {/* small help text */}
      <div className="text-sm text-gray-500 mt-6">
        Changes are saved locally for this demo. In production, call your API to save workspace settings.
      </div>
    </div>
  );
}
