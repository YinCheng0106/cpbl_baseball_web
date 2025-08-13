"use client";

import { z } from "zod";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/utils/supabase";
import Image from "next/image";

import { teamToWord } from "@/utils/teamUtils";
import { ChevronsUpDown, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const GameSchema = z.object({
  gameNo: z.string().min(1, "比賽編號不能為空"),
  year: z.number().min(1990, "年份不能早於1990年"),
  date: z.date().refine((date) => date >= new Date("1990-01-01"),{
    message: "請輸入有效的比賽日期",
  }),
  type: z.string().min(1, "比賽類型不能為空"),
  time: z.string().min(1, "比賽時間不能為空"),
  location: z.string().min(1, "比賽地點不能為空"),
  homeTeamId: z.string().min(1, "主場隊伍不能為空"),
  awayTeamId: z.string().min(1, "客場隊伍不能為空"),
  homeStarterId: z.string().optional(),
  awayStarterId: z.string().optional(),
});

const locationOptions = [
  { value: "INT", label: "台中洲際棒球場" },
  { value: "TNN", label: "台南市立棒球場" },
  { value: "TYN", label: "樂天桃園棒球場" },
  { value: "XZG", label: "新北市立新莊棒球場" },
  { value: "HLN", label: "花蓮縣立德興棒球場" },
  { value: "CCL", label: "高雄市立澄清湖棒球場" },
  { value: "DLU", label: "斗六棒球場" },
  { value: "TMU", label: "臺北市天母棒球場" },
  { value: "CYI", label: "嘉義縣立棒球場" },
  { value: "CYC", label: "嘉義市立棒球場" },
  { value: "HCU", label: "新竹市立棒球場" },
  { value: "PTG", label: "屏東縣立棒球場" },
  { value: "TCG", label: "教育部體育署臺中棒球場" },
  { value: "TTG", label: "臺東棒球村第一棒球場" },
  { value: "KLD", label: "高雄市立立德棒球場" },
  { value: "CTP", label: "中國信託公益園區" },
  { value: "LDG", label: "宜蘭縣立羅東棒球場" },
  { value: "TPE", label: "台北市立棒球場" },
  { value: "TPD", label: "臺北大巨蛋" }
] as const;

export function GameForm() {
  const form = useForm<z.infer<typeof GameSchema>>({
    resolver: zodResolver(GameSchema),
    defaultValues: {
      gameNo: "",
      year: new Date().getFullYear(),
      date: new Date(),
      type: "",
      time: "18:35",
      location: "",
      homeTeamId: "",
      awayTeamId: "",
      homeStarterId: "",
      awayStarterId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof GameSchema>) => {
    if (!values.gameNo || !values.type || !values.location || !values.homeTeamId || !values.awayTeamId) {
      console.error("Missing required fields");
      return;
    }
    
    const insertedData = {
      gameId: `${values.date.getFullYear()}${values.type}${values.gameNo.padStart(3, '0')}`,
      gameNo: values.gameNo,
      year: values.date.getFullYear(),
      date: values.date,
      time: values.time,
      type: values.type,
      location: values.location,
      homeTeamId: values.homeTeamId,
      awayTeamId: values.awayTeamId,
      homeStarterId: values.homeStarterId,
      awayStarterId: values.awayStarterId,
    }
    console.log("Submitting game data:", insertedData);
    const { error } = await supabase.from("games").insert([insertedData]);
    if (error) {
      alert("新增失敗: " + error.message);
      console.error("Error inserting game data:", error);
    } else {
      alert("新增成功！");
      form.reset({
        gameNo: "",
        year: new Date().getFullYear(),
        date: new Date(),
        type: "",
        time: "18:35",
        location: "",
        homeTeamId: "",
        awayTeamId: "",
        homeStarterId: "",
        awayStarterId: "",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error("Form validation errors:", errors);
        })}
        className="space-y-4 select-none"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>比賽日期</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span>選擇日期</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1990-01-01")}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>比賽時間</FormLabel>
                <FormControl>
                  <Input placeholder="比賽時間 (例: 18:35)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="gameNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>比賽編號</FormLabel>
              <FormControl>
                <Input 
                  placeholder="比賽編號" 
                  {...field}
                />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>比賽類型</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選擇比賽類型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">一軍例行賽</SelectItem>
                      <SelectItem value="E">一軍季後挑戰賽</SelectItem>
                      <SelectItem value="C">一軍總冠軍賽</SelectItem>
                      <SelectItem value="D">二軍例行賽</SelectItem>
                      <SelectItem value="F">二軍總冠軍賽</SelectItem>
                      <SelectItem value="B">明星賽</SelectItem>
                      <SelectItem value="G">熱身賽</SelectItem>
                      <SelectItem value="H">未來之星邀請賽</SelectItem>
                      <SelectItem value="O">其他賽事</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>比賽地點</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value 
                      ? (
                        locationOptions.find(
                          (option) => option.value === field.value
                        )?.label
                      ) : (
                        <span>選擇比賽地點</span>
                      )}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="center">
                  <Command>
                    <CommandInput placeholder="搜尋地點..." />
                    <CommandList>
                      <CommandEmpty>沒有找到地點</CommandEmpty>
                      <CommandGroup>
                        {locationOptions.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => field.onChange(option.value)}
                            className="cursor-pointer ="
                          >
                            <Check 
                              className={cn(
                                field.value === option.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <span>{option.label}</span>
                            <CommandShortcut>{option.value}</CommandShortcut>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="awayTeamId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>客場隊伍</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選擇客場隊伍" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">
                        <Image src={teamToWord("中信兄弟")} alt="中信兄弟" width={15} height={15} />
                        中信兄弟
                      </SelectItem>
                      <SelectItem value="2">
                        <Image src={teamToWord("統一7-ELEVEn獅")} alt="統一7-ELEVEn獅" width={15} height={15} />
                        統一7-ELEVEn獅
                      </SelectItem>
                      <SelectItem value="3">
                        <Image src={teamToWord("樂天桃猿")} alt="樂天桃猿" width={15} height={15} />
                        樂天桃猿
                      </SelectItem>
                      <SelectItem value="4">
                        <Image src={teamToWord("富邦悍將")} alt="富邦悍將" width={15} height={15} />
                        富邦悍將
                      </SelectItem>
                      <SelectItem value="5">
                        <Image src={teamToWord("味全龍")} alt="味全龍" width={15} height={15} />
                        味全龍
                      </SelectItem>
                      <SelectItem value="6">
                        <Image src={teamToWord("台鋼雄鷹")} alt="台鋼雄鷹" width={15} height={15} />
                        台鋼雄鷹
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="homeTeamId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>主場隊伍</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選擇主場隊伍" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">
                        <Image src={teamToWord("中信兄弟")} alt="中信兄弟" width={15} height={15} />
                        中信兄弟
                      </SelectItem>
                      <SelectItem value="2">
                        <Image src={teamToWord("統一7-ELEVEn獅")} alt="統一7-ELEVEn獅" width={15} height={15} />
                        統一7-ELEVEn獅
                      </SelectItem>
                      <SelectItem value="3">
                        <Image src={teamToWord("樂天桃猿")} alt="樂天桃猿" width={15} height={15} />
                        樂天桃猿
                      </SelectItem>
                      <SelectItem value="4">
                        <Image src={teamToWord("富邦悍將")} alt="富邦悍將" width={15} height={15} />
                        富邦悍將
                      </SelectItem>
                      <SelectItem value="5">
                        <Image src={teamToWord("味全龍")} alt="味全龍" width={15} height={15} />
                        味全龍
                      </SelectItem>
                      <SelectItem value="6">
                        <Image src={teamToWord("台鋼雄鷹")} alt="台鋼雄鷹" width={15} height={15} />
                        台鋼雄鷹
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="awayStarterId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>客場先發投手 (可選)</FormLabel>
              <FormControl>
                <Input placeholder="客場先發投手ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="homeStarterId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>主場先發投手 (可選)</FormLabel>
              <FormControl>
                <Input placeholder="主場先發投手ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer">
          新增賽事
        </Button>
      </form>
    </Form>
  );
}
