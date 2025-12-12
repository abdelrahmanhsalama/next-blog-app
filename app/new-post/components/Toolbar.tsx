import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";

const buttonStyles = "text-background";

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [formats, setFormats] = useState({
    bold: false,
    italic: false,
  });

  const updateToolbar = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        setFormats({
          bold: selection.hasFormat("bold"),
          italic: selection.hasFormat("italic"),
        });
      }
    });
  }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const buttons = [
    {
      label: "b",
      function: () => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
      },
      isActive: formats.bold,
      extraStyles: "font-bold",
    },
    {
      label: "i",
      function: () => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
      },
      isActive: formats.italic,
      extraStyles: "italic",
    },
    {
      label: "h1",
      function: () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode("h1"));
          }
        });
      },
      isActive: null,
      extraStyles: "",
    },
    {
      label: "h2",
      function: () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode("h2"));
          }
        });
      },
      isActive: null,
      extraStyles: "",
    },
    {
      label: "h3",
      function: () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode("h3"));
          }
        });
      },
      isActive: null,
      extraStyles: "",
    },
  ];

  return (
    <div className="bg-foreground rounded-t p-1 space-x-1">
      {buttons.map((button) => (
        <button
          key={button.label}
          type="button"
          className={`text-background size-7 rounded hover:bg-background/10 cursor-pointer ${
            button.extraStyles
          } ${button.isActive ? "bg-background/10" : ""}`}
          onClick={button.function}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
