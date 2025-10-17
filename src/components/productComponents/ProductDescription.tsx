import { useState } from "react";

export const ProductDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-16">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === "description"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            الوصف
            {activeTab === "description" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("size-guide")}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === "size-guide"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            المقاسات
            {activeTab === "size-guide" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === "description" ? (
          <div className="text-gray-600 text-sm leading-relaxed max-w-4xl">
            {description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <div className="text-gray-600 text-sm leading-relaxed">
            <p>Size guide information would go here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
