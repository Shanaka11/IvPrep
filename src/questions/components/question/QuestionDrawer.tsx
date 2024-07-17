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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@/query/useQuery";
import { createFullQuestionAction } from "@/questions/actions/question/createFullQuestionAction";
import { getTopicsForQuestionAction } from "@/questions/actions/question/getTopicsForQuestionAction";
import {
  CreateQuestionDto,
  CreateQuestionSchema,
  ReadQuestionDto,
} from "@/questions/models/question";
import { ReadTopicDto } from "@/questions/models/topic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import TopicLov from "../topic/TopicLov";

type QuestionDrawerProps = {
  open: boolean;
  handleDrawerOpenChange: (open: boolean) => void;
  question?: ReadQuestionDto;
};

const QuestionDrawer = ({
  open,
  handleDrawerOpenChange,
  question,
}: QuestionDrawerProps) => {
  const form = useForm<CreateQuestionDto>({
    resolver: zodResolver(CreateQuestionSchema),
    defaultValues: {
      question: "",
      authorId: "1",
    },
  });

  const {
    isLoading,
    data: topics,
    runQuery,
  } = useQuery<ReadQuestionDto["id"], ReadTopicDto[]>({
    queryKey: "question, topics",
    queryFn: (questionId?: ReadQuestionDto["id"]) => {
      console.log(questionId);
      if (questionId) {
        return getTopicsForQuestionAction(questionId);
      }
      return Promise.resolve([]);
    },
  });

  const [selectedTopics, setSelectedTopics] = useState<
    Record<string, ReadTopicDto>
  >({});

  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      form.reset({
        question: question?.question ?? "",
      });

      if (question?.id) {
        // RunQuery to get the topics
        runQuery(question.id, question.id.toString());
      }
    }
  }, [open, form, question?.question, question?.id, runQuery]);

  // Parser the topics when the data is loaded
  useEffect(() => {
    if (topics) {
      const selectedTopics: Record<string, ReadTopicDto> = {};
      topics.forEach((topic) => {
        selectedTopics[topic.id.toString()] = topic;
      });
      setSelectedTopics(selectedTopics);
    } else {
      setSelectedTopics({});
    }
  }, [topics]);

  const onSubmit = async (data: CreateQuestionDto) => {
    try {
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
          <DrawerTitle>
            {question ? "Update question" : "Add new question"}
          </DrawerTitle>
          <DrawerDescription>
            {question
              ? "Change questions as needed"
              : "Add a new question to the question bank"}
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
            {question ? "Update" : "Add"}
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
