import { X } from "lucide-react";
import React from "react";

import { Badge } from "../ui/badge";

type TagProps = {
  title: string;
  handleClose?: () => void;
};

const Tag = ({ title, handleClose }: TagProps) => {
  return (
    <Badge
      className={`capitalize cursor-pointer group  ${handleClose ? "hover:pr-1 transition-all" : undefined}`}
    >
      <span>{title}</span>
      {handleClose && (
        <X
          className="ml-1 h-3 w-3 hidden group-hover:block"
          onClick={handleClose}
        />
      )}
    </Badge>
  );
};

export default Tag;
