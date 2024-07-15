"use client";

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
import {
  CreateQuestionDto,
  CreateQuestionSchema,
} from "@/questions/models/question";
import { zodResolver } from "@hookform/resolvers/zod";
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
  });

  const onSubmit = async (data: CreateQuestionDto) => {
    console.log(data);
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
            {/* Add topics */}
            {/* Add an autocomplete component */}
            <TopicLov />
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
