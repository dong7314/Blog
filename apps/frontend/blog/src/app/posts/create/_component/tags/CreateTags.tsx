"use client";

import { useState } from "react";
import * as styles from "./CreateTags.css";

import { IconButton, Text } from "@frontend/coreui";
import { usePostStore } from "../../_store/postStore";

export default function CreateTags() {
  const postStore = usePostStore();
  const [value, setValue] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [creating, setCreating] = useState<boolean>(false);

  const handleOnClick = () => {
    setCreating(true);
  };

  const addTagList = () => {
    if (value.trim() !== "") {
      if (!tagList.includes(value)) {
        postStore.setTags([value, ...tagList]);
        setTagList((prev) => {
          const updateTagList = [value, ...prev];
          return updateTagList;
        });
      }
    }
    setCreating(false);
    setValue("");
  };

  const deleteTag = (tagValue: string) => {
    const updateTagList = tagList.filter((tag) => {
      return tag !== tagValue;
    });
    postStore.setTags(updateTagList);
    setTagList(updateTagList);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      // focus 아웃 처리
      addTagList();
    }
  };

  return (
    <div className={styles.tagsBox}>
      <IconButton
        onClick={handleOnClick}
        type="plus_circle"
        size="xl"
      ></IconButton>
      {creating && (
        <div className={styles.tagInputBox}>
          <Text weight={500}>#&nbsp;</Text>
          <input
            className={styles.tagInput}
            type="text"
            value={value}
            style={{ width: `${value.length + 5}ch` }}
            onChange={(e) => setValue(e.target.value)}
            onBlur={addTagList}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      )}
      {tagList.length === 0 && !creating && (
        <Text size="s" color="#a5a5a5" className={styles.placeholder}>
          왼쪽 버튼을 클릭해 태그를 추가하세요.
        </Text>
      )}
      {tagList.length !== 0 &&
        tagList.map((tag, index) => {
          return (
            <span className={styles.tag} key={`${tag}-${index}`}>
              <Text
                weight={500}
                size="s"
                color="#0066ff"
                className={styles.lineHeight}
              >
                #&nbsp;
              </Text>
              <Text size="s" color="#0066ff" className={styles.lineHeight}>
                {tag}&nbsp;
              </Text>
              <IconButton
                type="close"
                size="xs"
                onClick={() => {
                  deleteTag(tag);
                }}
              ></IconButton>
            </span>
          );
        })}
    </div>
  );
}
