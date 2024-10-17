"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useQuery } from "@/query/useQuery";
import { getAllTopicsAction } from "@/questions/actions/topic/getAllTopicsAction";
import { ReadTopicDto } from "@/questions/models/topic";
import { ChevronsUpDown } from "lucide-react";
import { HTMLAttributes, useState } from "react";

// handle select
type TopicLovProps = {
  onTopicSelect: (selectedTopic: ReadTopicDto) => void;
  selectedTopics: Record<string, unknown>;
  title?: string;
  buttonTitle?: string;
  disabled?: boolean;
};
// selected topic object {id, true}
const TopicLov = ({
  onTopicSelect,
  selectedTopics,
  title,
  className,
  disabled,
}: TopicLovProps & HTMLAttributes<HTMLButtonElement>) => {
  const [open, setOpen] = useState(false);

  const {
    data: topics,
    isLoading,
    error,
  } = useQuery<never, ReadTopicDto[]>({
    queryKey: "Topics",
    queryFn: () => {
      return getAllTopicsAction(null);
    },
  });

  const handleOnSelect = (item: ReadTopicDto) => {
    setOpen(false);
    onTopicSelect(item);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between bg-card", className)}
          disabled={disabled}
        >
          {title ? title : "Add topic ..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command className="w-full">
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {topics
                ?.filter((item) => !selectedTopics || !selectedTopics[item.id])
                .map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => {
                      handleOnSelect(item);
                    }}
                    className="capitalize"
                  >
                    {item.name}
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TopicLov;
