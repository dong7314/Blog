"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./ImagePicker.css";

import { Text, TextButton } from "@frontend/coreui";
import uploadImage from "@/app/_lib/image/uploadImage";
import usePostStore from "../../../_store/postStore";
import deleteImage from "@/app/_lib/image/deleteImage";
import compressImage from "@/app/_lib/image/compressImage";

type Props = {
  url?: string;
};
export default function ImagePicker({ url }: Props) {
  const postStore = usePostStore();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dragRef = useRef<HTMLLabelElement | null>(null);

  const onChangeFile = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFile: File | null = null;

      if (e.type === "drop") {
        selectFile = e.dataTransfer.files[0];
      } else {
        selectFile = e.target.files[0];
      }

      if (selectFile) {
        setFile(selectFile);
      }
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

  const handleUpload = async () => {
    if (file) {
      let converFile = file;
      // file 크기가 10mb 넘을 시에 converting 작업 진행
      if (file.size > 10 * 1024 * 1024) {
        converFile = await compressImage(file);
      }
      const result = await uploadImage(converFile);
      setImageUrl(result.url);
      postStore.setImgUrl(result.url);
    }
  };

  const handleDelete = async () => {
    if (imageUrl) {
      const imageName = imageUrl.split("/").at(-1) as string;
      setFile(null);
      setImageUrl(null);
      postStore.setImgUrl("");
      await deleteImage(imageName);
    }
  };

  useEffect(() => {
    if (url) {
      setImageUrl(url);
    }
  }, [url]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  useEffect(() => {
    if (file) {
      // 이미 선택된 이미지가 있었다면 삭제 후 재업로드
      handleDelete();
      handleUpload();
    }
  }, [file]);

  return (
    <>
      <div className={styles.labelContainer}>
        <Text size="s" color="#262626">
          썸네일
        </Text>
        {imageUrl && (
          <div className={styles.labelContainerButton}>
            <TextButton size="s" color="#262626">
              <label htmlFor="thumbnailUpload" className={styles.hover}>
                재업로드
              </label>
            </TextButton>
            <span className={styles.seperate}>|</span>
            <TextButton size="s" color="#262626" onClick={handleDelete}>
              삭제
            </TextButton>
          </div>
        )}
      </div>
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
          {!imageUrl && (
            <>
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
            </>
          )}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={`${imageUrl.split("/").at(-1)}`}
              className={styles.thumbnailImage}
            />
          )}
        </label>
      </div>
    </>
  );
}
