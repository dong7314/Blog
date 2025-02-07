"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

import * as styles from "./ImagePicker.css";

import { Text } from "@frontend/coreui";
import { composeStyles } from "@vanilla-extract/css";

export default function ImagePicker() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const dragRef = useRef<HTMLLabelElement | null>(null);

  const onChangeFile = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFile: File | null = null;

      if (e.type === "drop") {
        selectFile = e.dataTransfer.files[0];
      } else {
        selectFile = e.target.files[0];
      }

      setFile(selectFile);
    },
    [file],
  );

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFile(e);
      setIsDragging(false);
    },
    [onChangeFile],
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  useEffect(() => {
    if (file) {
      console.log(file);
    }
  }, [file]);

  return (
    <>
      <div className={styles.pickerContainer}>
        <input
          type="file"
          id="thumbnailUpload"
          style={{ display: "none" }}
          onChange={onChangeFile}
        />
        <label
          className={composeStyles(
            styles.fileLabel,
            isDragging ? styles.fileLabelDragging : "",
          )}
          htmlFor="thumbnailUpload"
          ref={dragRef}
        >
          {!isDragging && (
            <>
              <Text color="#a5a5a5" size="s" className={styles.labelText}>
                썸네일 첨부를 위해
              </Text>
              <Text color="#a5a5a5" size="s">
                이미지를 드래그 하거나 여기를 클릭해 주세요.
              </Text>
            </>
          )}
          {isDragging && (
            <>
              <Text color="#a5a5a5" size="s" className={styles.labelText}>
                이미지를 여기에 드롭하세요.
              </Text>
            </>
          )}
        </label>
      </div>
    </>
  );
}
