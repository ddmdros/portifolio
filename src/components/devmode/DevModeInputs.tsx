import React from "react";
import { Plus } from "lucide-react";
import { updateItemAtIndex } from "../../utils/arrayUtils";

interface TranslatedTextInputProps {
  labelEn: string;
  labelPt: string;
  translationKey: string;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  getTrans: (key: string, lang: "en" | "pt") => string;
  isTextArea?: boolean;
  rows?: number;
}

export const TranslatedTextInput = ({
  labelEn,
  labelPt,
  translationKey,
  updateTrans,
  getTrans,
  isTextArea = false,
  rows = 2,
}: TranslatedTextInputProps) => {
  const commonClasses =
    "w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none";

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1">
          {labelEn}
        </label>
        {isTextArea ? (
          <textarea
            rows={rows}
            value={getTrans(translationKey, "en")}
            onChange={(e) => updateTrans(translationKey, "en", e.target.value)}
            className={commonClasses}
          />
        ) : (
          <input
            type="text"
            value={getTrans(translationKey, "en")}
            onChange={(e) => updateTrans(translationKey, "en", e.target.value)}
            className={commonClasses}
          />
        )}
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1">
          {labelPt}
        </label>
        {isTextArea ? (
          <textarea
            rows={rows}
            value={getTrans(translationKey, "pt")}
            onChange={(e) => updateTrans(translationKey, "pt", e.target.value)}
            className={commonClasses}
          />
        ) : (
          <input
            type="text"
            value={getTrans(translationKey, "pt")}
            onChange={(e) => updateTrans(translationKey, "pt", e.target.value)}
            className={commonClasses}
          />
        )}
      </div>
    </div>
  );
};

interface CustomLinkFieldsProps<T extends { id: string; linkUrl?: string; linkTextKey?: string }> {
  item: T;
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  getTrans: (key: string, lang: "en" | "pt") => string;
  urlLabel?: string;
  urlPlaceholder?: string;
  textKeyPlaceholder?: string;
  defaultTextEn?: string;
  defaultTextPt?: string;
}

export function CustomLinkFields<T extends { id: string; linkUrl?: string; linkTextKey?: string }>({
  item,
  items,
  setItems,
  updateTrans,
  getTrans,
  urlLabel = "Custom Clickable Link URL (Optional)",
  urlPlaceholder = "https://...",
  textKeyPlaceholder = "resume.link.custom.text",
  defaultTextEn = "here",
  defaultTextPt = "aqui",
}: CustomLinkFieldsProps<T>) {
  const itemIdx = items.findIndex((x) => x.id === item.id);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 border-t border-white/5 pt-3">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">
            {urlLabel}
          </label>
          <input
            type="text"
            value={item.linkUrl || ""}
            onChange={(e) => {
              setItems(
                updateItemAtIndex(items, itemIdx, (oldItem) => ({
                  ...oldItem,
                  linkUrl: e.target.value || undefined,
                }))
              );
            }}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
            placeholder={urlPlaceholder}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">
            Custom Clickable Link Text Key (Optional)
          </label>
          <input
            type="text"
            value={item.linkTextKey || ""}
            onChange={(e) => {
              const nextKey = e.target.value || undefined;
              if (nextKey && !getTrans(nextKey, "en") && !getTrans(nextKey, "pt")) {
                updateTrans(nextKey, "en", defaultTextEn);
                updateTrans(nextKey, "pt", defaultTextPt);
              }
              setItems(
                updateItemAtIndex(items, itemIdx, (oldItem) => ({
                  ...oldItem,
                  linkTextKey: nextKey,
                }))
              );
            }}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
            placeholder={textKeyPlaceholder}
          />
        </div>
      </div>

      {item.linkTextKey && (
        <div className="grid md:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Clickable Link Text (English)
            </label>
            <input
              type="text"
              value={getTrans(item.linkTextKey, "en")}
              onChange={(e) => updateTrans(item.linkTextKey!, "en", e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Clickable Link Text (Portuguese)
            </label>
            <input
              type="text"
              value={getTrans(item.linkTextKey, "pt")}
              onChange={(e) => updateTrans(item.linkTextKey!, "pt", e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
            />
          </div>
        </div>
      )}
    </>
  );
}

interface BulletPointsEditorProps<T extends { id: string; descKeys?: string[] }> {
  item: T;
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  getTrans: (key: string, lang: "en" | "pt") => string;
  bulletKeyPrefix: string;
  label?: string;
}

export function BulletPointsEditor<T extends { id: string; descKeys?: string[] }>({
  item,
  items,
  setItems,
  updateTrans,
  getTrans,
  bulletKeyPrefix,
  label = "CV Bullet Points",
}: BulletPointsEditorProps<T>) {
  const itemIdx = items.findIndex((x) => x.id === item.id);
  const descKeys = item.descKeys || [];

  const handleAddBullet = () => {
    const bulletId = descKeys.length + 1;
    const bulletKey = `${bulletKeyPrefix}${bulletId}`;
    updateTrans(bulletKey, "en", "New bullet text (English)");
    updateTrans(bulletKey, "pt", "Texto do marcador (Português)");

    setItems(
      updateItemAtIndex(items, itemIdx, (oldItem) => ({
        ...oldItem,
        descKeys: [...(oldItem.descKeys || []), bulletKey],
      }))
    );
  };

  const handleRemoveBullet = (bKey: string) => {
    setItems(
      updateItemAtIndex(items, itemIdx, (oldItem) => ({
        ...oldItem,
        descKeys: (oldItem.descKeys || []).filter((k) => k !== bKey),
      }))
    );
  };

  return (
    <div className="border-t border-white/5 pt-4 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-accent">
          {label}
        </span>
        <button
          onClick={handleAddBullet}
          className="flex items-center gap-1 text-[10px] bg-white/5 text-gray-300 px-2 py-1 rounded hover:bg-white/10 cursor-pointer"
        >
          <Plus size={10} /> Add Bullet
        </button>
      </div>

      <div className="space-y-3 pl-4 border-l border-white/10">
        {descKeys.map((bKey) => (
          <div key={bKey} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-gray-500">
                Key: {bKey}
              </span>
              <button
                onClick={() => handleRemoveBullet(bKey)}
                className="text-red-400 hover:text-red-500 text-[10px] cursor-pointer"
              >
                Remove
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="text"
                value={getTrans(bKey, "en")}
                onChange={(e) => updateTrans(bKey, "en", e.target.value)}
                className="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                placeholder="English text"
              />
              <input
                type="text"
                value={getTrans(bKey, "pt")}
                onChange={(e) => updateTrans(bKey, "pt", e.target.value)}
                className="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                placeholder="Portuguese text"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface CategoryFilterProps {
  categories: readonly { id: string; label: string }[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  small?: boolean;
}

export function CategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
  small = false,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-1.5 border-b border-white/5 pb-3">
      {categories.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveCategory(tab.id)}
          className={`font-mono rounded border transition-all cursor-pointer select-none ${
            small
              ? "px-1.5 py-0.5 text-[9px]"
              : "px-2.5 py-1 text-[10px]"
          } ${
            activeCategory === tab.id
              ? "bg-accent border-accent text-black font-bold"
              : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
