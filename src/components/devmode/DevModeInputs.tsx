import React from "react";
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
