"use client";

import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/utils/supabase";
import { format } from "date-fns";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

import { teamToWord } from "@/utils/teamUtils";

const PlayerSchema = z.object({
  id: z.string().min(1, "請輸入球員ID"),
  league: z.enum(["major", "minor"], {
    errorMap: (issue) => {
      if (issue.code === "invalid_enum_value") {
        return { message: "請選擇球員聯盟" };
      }
      return { message: "無效的球員聯盟" };
    },
  }),
  name: z.string().min(1, "請輸入球員姓名"),
  en_name: z.string().min(1, "請輸入球員英文或原文姓名"),
  nationality: z.string().min(1, "請輸入球員國籍"),
  education: z.string().optional(),
  team: z.string().min(1, "請輸入球員所屬球隊"),
  birthday: z.date().min(new Date("1990-01-01"), "請輸入有效的球員生日"),
  debutDate: z
    .date()
    .refine((date) => date > new Date("1990-01-01"), {
      message: "請輸入有效的球員出道日期",
    })
    .optional(),
  draftTeam: z.string().min(1, "請輸入球員選秀球隊").optional(),
  draftYear: z.string().optional(),
  draftRound: z.string().min(1, "請輸入有效的選秀輪次").optional(),
  number: z.string().min(1, "請輸入球員號碼"),
  position: z.string().min(1, "請輸入球員的主要守位"),
  status: z.enum(["active", "retired", "unsigned", "contract", "independent"], {
    errorMap: (issue) => {
      if (issue.code === "invalid_enum_value") {
        return { message: "請選擇球員狀態" };
      }
      return { message: "無效的球員狀態" };
    },
  }),
  avatar: z.string().optional(),
  banner: z.string().optional(),
  height: z.string().min(1, "請輸入球員身高"),
  weight: z.string().min(1, "請輸入球員體重"),
  pitchingHabits: z.string().min(1, "請選擇球員投球習慣"),
  battingHabits: z.string().min(1, "請選擇球員打擊習慣"),
});

export function PlayerForm() {
  const form = useForm<z.infer<typeof PlayerSchema>>({
    resolver: zodResolver(PlayerSchema),
    defaultValues: {
      id: "",
      league: "major",
      name: "",
      en_name: "",
      nationality: "",
      education: "",
      team: "",
      draftTeam: "",
      draftYear: "",
      draftRound: "",
      number: "",
      position: "",
      status: "active",
      avatar: "",
      banner: "",
      height: "",
      weight: "",
      debutDate: new Date(),
      birthday: new Date(),
      pitchingHabits: "",
      battingHabits: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PlayerSchema>) => {
    if (!values.id || !values.name) {
      console.error("Missing required fields");
      return;
    }

    const insertedData = {
      id: values.id,
      league: values.league,
      name: values.name,
      en_name: values.en_name,
      slug:
        values.en_name.trim().toLowerCase().replace(/\s+/g, "-") +
        "-" +
        values.id.toString().padStart(6, "0"),
      nationality: values.nationality,
      education: values.education,
      team: values.team,
      draftTeam: values.draftTeam,
      draftYear: values.draftYear,
      draftRound: values.draftRound,
      number: values.number,
      position: values.position,
      status: values.status,
      avatar: values.avatar,
      banner: values.banner,
      height: values.height,
      weight: values.weight,
      debutDate: values.debutDate ? values.debutDate.toISOString() : null,
      birthday: values.birthday.toISOString(),
      pitchingHabits: values.pitchingHabits,
      battingHabits: values.battingHabits,
    };

    console.table(insertedData);

    const { error } = await supabase.from("players").insert([insertedData]);
    if (error) {
      alert("新增失敗" + error.message);
      console.error("Error inserting player:", error);
    } else {
      alert("新增成功！\n" + `[${insertedData.id}] ${insertedData.name}`);
      form.reset({
        id: "",
        league: "major",
        name: "",
        en_name: "",
        nationality: "",
        education: "",
        team: "",
        draftTeam: "",
        draftYear: "",
        draftRound: "",
        number: "",
        position: "",
        status: "active",
        avatar: "",
        banner: "",
        height: "",
        weight: "",
        debutDate: new Date(),
        birthday: new Date(),
        pitchingHabits: "",
        battingHabits: "",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error("Form submission errors:", errors);
        })}
        className="space-y-4 select-none"
      >
        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>球員ID</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="請輸入球員ID" {...field} />
                </FormControl>
                <FormDescription>球員ID必須為正整數</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="league"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>球員聯盟</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex items-center"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="major" id="league_major" />
                      <Label htmlFor="league_major">一軍</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="minor" id="league_minor" />
                      <Label htmlFor="league_minor">二軍</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormDescription>請選擇球員聯盟</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>球員狀態</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選擇球員狀態" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">現役</SelectItem>
                      <SelectItem value="retired">▲非現役</SelectItem>
                      <SelectItem value="unsigned">#未登入</SelectItem>
                      <SelectItem value="contract">*合約所屬</SelectItem>
                      <SelectItem value="independent">◎自主培訓</SelectItem>
                      <SelectItem value="other">?其他</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>球員位置</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選擇球員位置" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pitcher">[1] 投手 (P)</SelectItem>
                      <SelectItem value="Catcher">[2] 捕手 (C)</SelectItem>
                      <SelectItem value="First-Baseman">
                        [3] 一壘手 (1B)
                      </SelectItem>
                      <SelectItem value="Second-Baseman">
                        [4] 二壘手 (2B)
                      </SelectItem>
                      <SelectItem value="Third-Baseman">
                        [5] 三壘手 (3B)
                      </SelectItem>
                      <SelectItem value="Shortstop">[6] 游擊手 (SS)</SelectItem>
                      <SelectItem value="Left-Field">
                        [7] 左外野手 (LF)
                      </SelectItem>
                      <SelectItem value="Center-Field">
                        [8] 中外野手 (CF)
                      </SelectItem>
                      <SelectItem value="Right-Field">
                        [9] 右外野手 (RF)
                      </SelectItem>
                      <SelectItem value="Infield">內野手 (IF)</SelectItem>
                      <SelectItem value="Outfield">外野手 (OF)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>球員名稱</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入球員名稱" {...field} />
                </FormControl>
                <FormDescription>球員名稱必須為非空的中文字串</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="en_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>球員英文或原文名稱</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入球員英文名稱" {...field} />
                </FormControl>
                <FormDescription>
                  如果球員有原文姓名請先以原文姓名為主，反之英文姓名
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="pitchingHabits"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>投球習慣</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex items-center"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Left" id="P_L" />
                      <Label htmlFor="P_L">左投</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="R" id="P_R" />
                      <Label htmlFor="P_R">右投</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="RightLeft" id="P_RL" />
                      <Label htmlFor="P_RL">左右投</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="battingHabits"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>打擊習慣</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex items-center"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Left" id="B_L" />
                      <Label htmlFor="B_L">左打</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Right" id="B_R" />
                      <Label htmlFor="B_R">右打</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="RightLeft" id="B_RL" />
                      <Label htmlFor="B_RL">左右打</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>球員國籍</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入球員國籍" {...field} />
                </FormControl>
                <FormDescription>球員國籍必須為非空的中文字串</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>球員最高學歷</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入球員學歷" {...field} />
                </FormControl>
                <FormDescription>球員學歷必須為非空的英文字串</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="team"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>球隊</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選擇球隊" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">
                        <Image
                          src={teamToWord("中信兄弟")}
                          alt="中信兄弟"
                          width={15}
                          height={15}
                        />
                        中信兄弟
                      </SelectItem>
                      <SelectItem value="2">
                        <Image
                          src={teamToWord("統一7-ELEVEn獅")}
                          alt="統一7-ELEVEn獅"
                          width={15}
                          height={15}
                        />
                        統一7-ELEVEn獅
                      </SelectItem>
                      <SelectItem value="3">
                        <Image
                          src={teamToWord("樂天桃猿")}
                          alt="樂天桃猿"
                          width={15}
                          height={15}
                        />
                        樂天桃猿
                      </SelectItem>
                      <SelectItem value="4">
                        <Image
                          src={teamToWord("富邦悍將")}
                          alt="富邦悍將"
                          width={15}
                          height={15}
                        />
                        富邦悍將
                      </SelectItem>
                      <SelectItem value="5">
                        <Image
                          src={teamToWord("味全龍")}
                          alt="味全龍"
                          width={15}
                          height={15}
                        />
                        味全龍
                      </SelectItem>
                      <SelectItem value="6">
                        <Image
                          src={teamToWord("台鋼雄鷹")}
                          alt="台鋼雄鷹"
                          width={15}
                          height={15}
                        />
                        台鋼雄鷹
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>球員所屬球隊</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>球員背號</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="請輸入球員背號"
                    {...field}
                  />
                </FormControl>
                <FormDescription>球員背號必須為非空的數字字串</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>球員出生日</FormLabel>
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
                        disabled={(date) => date < new Date("1900-01-01")}
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
            name="debutDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>一軍初登板日</FormLabel>
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
                        disabled={(date) => date < new Date("1900-01-01")}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="draftTeam"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>選秀球隊</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選擇選秀球隊" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">
                        <Image
                          src={teamToWord("中信兄弟")}
                          alt="中信兄弟"
                          width={15}
                          height={15}
                        />
                        中信兄弟
                      </SelectItem>
                      <SelectItem value="2">
                        <Image
                          src={teamToWord("統一7-ELEVEn獅")}
                          alt="統一7-ELEVEn獅"
                          width={15}
                          height={15}
                        />
                        統一7-ELEVEn獅
                      </SelectItem>
                      <SelectItem value="3">
                        <Image
                          src={teamToWord("樂天桃猿")}
                          alt="樂天桃猿"
                          width={15}
                          height={15}
                        />
                        樂天桃猿
                      </SelectItem>
                      <SelectItem value="4">
                        <Image
                          src={teamToWord("富邦悍將")}
                          alt="富邦悍將"
                          width={15}
                          height={15}
                        />
                        富邦悍將
                      </SelectItem>
                      <SelectItem value="5">
                        <Image
                          src={teamToWord("味全龍")}
                          alt="味全龍"
                          width={15}
                          height={15}
                        />
                        味全龍
                      </SelectItem>
                      <SelectItem value="6">
                        <Image
                          src={teamToWord("台鋼雄鷹")}
                          alt="台鋼雄鷹"
                          width={15}
                          height={15}
                        />
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
            name="draftYear"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>選秀年份</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="選擇選秀年份"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="draftRound"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>選秀輪次</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="選擇選秀輪次"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>身高</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="選擇身高"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>單位：公分</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>體重</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="選擇體重"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>單位：公斤</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full cursor-pointer">
          <span>新增球員</span>
        </Button>
      </form>
    </Form>
  );
}
