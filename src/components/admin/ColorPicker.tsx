import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import styles from "./ColorPicker.module.scss";

interface ColorPickerProps {
  colors: string[][];
  onChange: (colors: string[][]) => void;
}

const PRESET_COLORS = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#008000",
  "#FFC0CB",
  "#A52A2A",
  "#808080",
  "#FFD700",
  "#C0C0C0",
];

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, onChange }) => {
  const [showColorPicker, setShowColorPicker] = useState<{
    itemIndex: number;
    colorIndex: number;
  } | null>(null);

  const addColorItem = (e: React.MouseEvent) => {
    // console.log("addColorItem", e);
    e.stopPropagation();
    onChange([...colors, ["#000000"]]);
  };

  const removeColorItem = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    onChange(colors.filter((_, i) => i !== index));
  };

  const updateColor = (
    itemIndex: number,
    colorIndex: number,
    color: string,
    e?: React.MouseEvent
  ) => {
    e?.stopPropagation();
    const newColors = [...colors];
    newColors[itemIndex][colorIndex] = color;
    onChange(newColors);
  };

  const addSecondColor = (e: React.MouseEvent, itemIndex: number) => {
    e.stopPropagation();
    const newColors = [...colors];
    if (newColors[itemIndex].length < 2) {
      newColors[itemIndex].push("#FFFFFF");
      onChange(newColors);
    }
  };

  const removeSecondColor = (e: React.MouseEvent, itemIndex: number) => {
    e.stopPropagation();
    const newColors = [...colors];
    if (newColors[itemIndex].length > 1) {
      newColors[itemIndex] = [newColors[itemIndex][0]];
      onChange(newColors);
    }
  };

  const renderColorItem = (colorItem: string[], itemIndex: number) => {
    const isGradient = colorItem.length === 2;
    const background = isGradient
      ? /*`linear-gradient(135deg, ${colorItem[0]} 0%, ${colorItem[1]} 100%)`*/ `linear-gradient(135deg, ${colorItem[1]} 50%, ${colorItem[0]} 50%)`
      : colorItem[0];

    return (
      <div key={itemIndex} className={styles.colorItem}>
        <div
          className={styles.colorPreview}
          style={{ background }}
          title={
            isGradient ? `${colorItem[0]} → ${colorItem[1]}` : colorItem[0]
          }
        >
          <div className={styles.colorActions}>
            {colorItem.map((color, colorIndex) => (
              <button
                type="button"
                key={colorIndex}
                className={styles.editColor}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowColorPicker({ itemIndex, colorIndex });
                }}
                style={{ background: color }}
                title={`تعديل اللون ${colorIndex + 1} `}
              />
            ))}
          </div>
        </div>

        <div className={styles.colorControls}>
          {!isGradient ? (
            <button
              type="button"
              className={styles.addGradientBtn}
              onClick={(e) => addSecondColor(e, itemIndex)}
              title="إضافة لون ثاني (تدرج)"
            >
              <FiPlus /> تدرج
            </button>
          ) : (
            <button
              type="button"
              className={styles.removeGradientBtn}
              onClick={(e) => removeSecondColor(e, itemIndex)}
              title="إزالة التدرج"
            >
              <FiX /> تدرج
            </button>
          )}

          <button
            className={styles.removeItemBtn}
            onClick={(e) => removeColorItem(e, itemIndex)}
            title="حذف"
          >
            <FiX />
          </button>
        </div>

        {showColorPicker?.itemIndex === itemIndex && (
          <div className={styles.colorPickerModal}>
            <div
              className={styles.overlay}
              onClick={() => setShowColorPicker(null)}
            />
            <div className={styles.pickerContent}>
              <h4>اختر اللون {showColorPicker.colorIndex + 1}</h4>

              <div className={styles.customColorInput}>
                <input
                  type="color"
                  value={colorItem[showColorPicker.colorIndex]}
                  onChange={(e) =>
                    updateColor(
                      itemIndex,
                      showColorPicker.colorIndex,
                      e.target.value
                    )
                  }
                />
                <input
                  type="text"
                  value={colorItem[showColorPicker.colorIndex]}
                  onChange={(e) =>
                    updateColor(
                      itemIndex,
                      showColorPicker.colorIndex,
                      e.target.value
                    )
                  }
                  placeholder="#000000"
                />
              </div>

              <div className={styles.presetColors}>
                {PRESET_COLORS.map((presetColor) => (
                  <button
                    type="button"
                    key={presetColor}
                    className={styles.presetColor}
                    style={{ background: presetColor }}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateColor(
                        itemIndex,
                        showColorPicker.colorIndex,
                        presetColor
                      );
                      setShowColorPicker(null);
                    }}
                    title={presetColor}
                  />
                ))}
              </div>

              <button
                type="button"
                className={styles.closePickerBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowColorPicker(null);
                }}
              >
                تم
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.colorPicker}>
      <div className={styles.colorGrid}>
        {colors.map((colorItem, index) => renderColorItem(colorItem, index))}

        <button
          type="button"
          className={styles.addColorBtn}
          onClick={(e) => addColorItem(e)}
        >
          <FiPlus />
          <span>إضافة لون</span>
        </button>
      </div>

      {colors.length === 0 && (
        <p className={styles.hint}>
          أضف الألوان المتاحة للمنتج. يمكنك إضافة لون واحد أو لونين (تدرج)
        </p>
      )}
    </div>
  );
};

export default ColorPicker;
