"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import * as styles from "./ImagePicker.css";

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
      console.log(selectFile);

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
          className={styles.fileLabel}
          htmlFor="thumbnailUpload"
          ref={dragRef}
        >
          파일 첨부
        </label>
      </div>
      <div>{file?.name}</div>
    </>
  );
}
