"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Save, Trash2, X } from "lucide-react";
import React, { useState } from "react";

import { ReadCommentDto } from "../models/comment";

type CommentProps = {
  comment: ReadCommentDto;
};

const Comment = ({ comment }: CommentProps) => {
  const [editMode, setEditMode] = useState(false);

  const handleEditOnClick = () => {
    setEditMode(true);
  };

  const handleCancleOnClick = () => {
    setEditMode(false);
  };

  return (
    <div className="p-6 w-full">
      <span>{comment.comment}</span>
      <div className="flex justify-end gap-2">
        {editMode ? (
          <>
            <Button title="Save" size="icon" variant="ghost">
              <Save size="16" />
            </Button>
            <Button
              title="Cancel"
              size="icon"
              variant="ghost"
              onClick={handleCancleOnClick}
            >
              <X size="16" />
            </Button>
          </>
        ) : (
          <>
            <Button
              title="Edit"
              size="icon"
              variant="ghost"
              onClick={handleEditOnClick}
            >
              <Pencil size="16" />
            </Button>
            <Button title="Delete" size="icon" variant="ghost">
              <Trash2 size="16" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
