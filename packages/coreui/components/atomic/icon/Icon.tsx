import React, { ReactNode } from "react";
import DOMPurify from "dompurify";

// icon type을 설정
import { IconType } from "./Icon.type";
// type에 따른 html 태그
import * as icons from "./Icon.content";

export interface IconProps {
  /** 아이콘 종류 설정 */
  type: IconType;
}

export const Icon = ({ type }: IconProps) => {
  const sanitizedHtml = DOMPurify.sanitize(icons[type]);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>;
};
