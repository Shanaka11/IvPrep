"use client";

import Tag from "@/components/tag/Tag";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createFullQuestionAction } from "@/questions/actions/question/createFullQuestionAction";
import {
  CreateQuestionDto,
  CreateQuestionSchema,
} from "@/questions/models/question";
import { ReadTopicDto } from "@/questions/models/topic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import TopicLov from "../topic/TopicLov";

type QuestionDrawerProps = {
  open: boolean;
  handleDrawerOpenChange: (open: boolean) => void;
};

const QuestionDrawer = ({
  open,
  handleDrawerOpenChange,
}: QuestionDrawerProps) => {
  const form = useForm<CreateQuestionDto>({
    resolver: zodResolver(CreateQuestionSchema),
    defaultValues: {
      question: "",
      authorId: "1",
    },
  });

  const [selectedTopics, setSelectedTopics] = useState<
    Record<string, ReadTopicDto>
  >({});

  const { toast } = useToast();

  const onSubmit = async (data: CreateQuestionDto) => {
    try {
      console.log(data);
      // Create question
      const question = await createFullQuestionAction(
        data,
        Object.keys(selectedTopics).map((key) => parseInt(key)),
      );
      toast({
        variant: "success",
        title: "Question added successfully",
      });

      form.reset();
      handleDrawerOpenChange(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    }
  };

  const handleTopicSelect = (selectedTopic: ReadTopicDto) => {
    setSelectedTopics((prev) => ({
      ...prev,
      [selectedTopic.id]: selectedTopic,
    }));
  };

  const handleTopicDeselect = (id: ReadTopicDto["id"]) => {
    setSelectedTopics((prev) => {
      const { [id]: omit, ...rest } = prev;
      return rest;
    });
  };

  return (
    <Drawer open={open} onOpenChange={handleDrawerOpenChange} direction="right">
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add new question</DrawerTitle>
          <DrawerDescription>
            Add a new question to the question bank
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            id="TopicEditFrom"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 p-4"
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Question" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Added topics */}
            <div className="flex gap-1 flex-wrap">
              {Object.values(selectedTopics).map((topic) => (
                <Tag
                  title={topic.name}
                  key={topic.id}
                  handleClose={() => handleTopicDeselect(topic.id)}
                />
              ))}
            </div>
            {/* Add topics */}
            {/* Add an autocomplete component */}
            <TopicLov
              onSelect={handleTopicSelect}
              selectedTopics={selectedTopics}
            />
          </form>
        </Form>
        <DrawerFooter>
          <Button
            form="TopicEditForm"
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            Add
            {/* {topic ? "Update" : "Add"} */}
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => handleDrawerOpenChange(false)}
            disabled={form.formState.isSubmitting}
          >
            Cancel
            {/* Cancel */}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default QuestionDrawer;
