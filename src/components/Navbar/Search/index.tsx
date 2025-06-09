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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { siteMap } from "@/utils/siteMap";
import { DialogTitle } from "@radix-ui/react-dialog";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search({
  className,
  btnClass,
}: {
  className?: string;
  btnClass?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogHeader className="sr-only">
        <DialogTitle>Search</DialogTitle>
        <DialogDescription>Search Site....</DialogDescription>
      </DialogHeader>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "bg-accent hover:bg-accent flex w-64 items-center justify-between gap-2 rounded-md px-2 py-1 hover:shadow",
            className,
          )}
        >
          <SearchIcon
            className={cn(
              "text-muted-foreground hover:bg-accent size-4",
              btnClass,
            )}
          />
          <div>
            <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex items-center gap-1 rounded border px-1.5 py-1 font-mono text-[10px] font-medium opacity-100 select-none">
              <span className="text-xs">⌘</span>J
            </kbd>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0" showCloseButton={false}>
        <Command>
          <CommandInput placeholder="Search Page..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {siteMap.map((group) => {
              return (
                <CommandGroup heading={group.name} key={group.id}>
                  {group.items.map((item) => {
                    if (item.subPath) {
                      return (
                        <div key={item.id}>
                          {item.subPath.map((subItem) => {
                            return (
                              <CommandItem
                                key={subItem.id}
                                onClick={() => {
                                  setOpen(false);
                                  router.push(subItem.path);
                                }}
                                onSelect={() => {
                                  setOpen(false);
                                  router.push(subItem.path);
                                }}
                                value={subItem.path}
                              >
                                {subItem.name}
                              </CommandItem>
                            );
                          })}
                        </div>
                      );
                    }
                    return (
                      <CommandItem
                        key={item.id}
                        onSelect={() => {
                          setOpen(false);
                          router.push(item.path);
                        }}
                        value={item.path}
                        onClick={() => {
                          setOpen(false);
                          router.push(item.path);
                        }}
                      >
                        {item.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
