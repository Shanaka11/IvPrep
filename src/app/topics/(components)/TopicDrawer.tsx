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
import { useToast } from "@/components/ui/use-toast";
import { createTopicAction } from "@/questions/actions/topic/insertTopicAction";
import { CreateTopicDto, CreateTopicSchema } from "@/questions/models/topic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type TopicDrawerProps = {
  open: boolean;
  handleDrawerOpenChange: (open: boolean) => void;
};

const TopicDrawer = ({ open, handleDrawerOpenChange }: TopicDrawerProps) => {
  const form = useForm<CreateTopicDto>({
    resolver: zodResolver(CreateTopicSchema),
    defaultValues: {
      name: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: CreateTopicDto) => {
    try {
      await createTopicAction(data);
      toast({
        variant: "success",
        title: "Topic added successfully",
      });
      form.reset();
      handleDrawerOpenChange(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Failed to add topic",
          description: error.message,
        });
      }
      throw error;
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleDrawerOpenChange} direction="right">
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Topic</DrawerTitle>
          <DrawerDescription>
            Add a new topic to the list of topics.
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="Topic" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
            Submit
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => handleDrawerOpenChange(false)}
            disabled={form.formState.isSubmitting}
          >
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TopicDrawer;
